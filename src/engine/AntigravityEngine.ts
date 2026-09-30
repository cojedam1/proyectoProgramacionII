// --- MODELOS DE DATOS ---

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: Difficulty;
  hint?: string;
}

export interface UserAnalytics {
  topicErrorCount: Record<string, number>; // Registra temas con más fallos
}

export interface UserProfile {
  id: string;
  name: string;
  lives: number;
  maxLives: number;
  lastLivesRestoreTimestamp: number; // Para la recarga en 1 hora
  streak: number;
  lastActiveDate?: string; // Fecha en formato YYYY-MM-DD para calcular la racha diaria
  xp: number;
  analytics: UserAnalytics;
}

export interface SessionModule {
  id: string;
  title: string;
  topic: string;
  isUnlocked: boolean;
  isAiGenerated?: boolean;
  questions: Question[];
}

import { questionBank } from '@/data/questionBank';

// --- AI SERVICE ---

export class AIService {
  private static getApiKey(): string | undefined {
    return process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  }

  // Generates questions via Gemini API or local question bank
  public static async generateSessionQuestions(topic: string, isAiGenerated: boolean = false): Promise<Question[]> {
    if (isAiGenerated) {
      return this.generateAiQuestionsForTopic(topic, 5);
    }

    let questions = questionBank[topic] || [];

    if (questions.length === 0) {
      return this.generateAiQuestionsForTopic(topic, 5);
    }

    return questions;
  }

  // Calls Gemini API with model fallback chain; falls back to local bank on failure
  public static async generateAiQuestionsForTopic(topic: string, count: number = 5): Promise<Question[]> {
    const apiKey = this.getApiKey();

    if (apiKey && apiKey.trim().length > 0 && !apiKey.includes('tu_api_key')) {
      try {
        const formattedTopic = topic.replace(/_/g, ' ');
        const promptText = `Eres un tutor experto en TypeScript. Genera exactamente ${count} preguntas de opción múltiple para el tema "${formattedTopic}".
Genera un arreglo JSON con exactamente la siguiente estructura:
[
  {
    "prompt": "Enunciado claro de la pregunta",
    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
    "correctOptionIndex": 0,
    "explanation": "Explicación concisa y educativa",
    "difficulty": "medium"
  }
]
Condiciones:
- correctOptionIndex debe ser un número entero entre 0 y 3 (varía las respuestas correctas).
- difficulty debe ser "easy", "medium" o "hard".
- Responde ÚNICAMENTE con el objeto JSON válido.`;

        const cleanApiKey = apiKey.trim();
        console.log(`[AIService] Requesting questions from Gemini for: "${topic}"...`);

        // Fallback model list — tries newest first, falls back on 503
        const fallbackModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest', 'gemini-1.5-flash'];

        for (const model of fallbackModels) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanApiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: promptText }] }],
                  generationConfig: {
                    responseMimeType: 'application/json',
                    temperature: 0.7,
                  },
                }),
              }
            );

            if (response.ok) {
              const data = await response.json();
              const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (rawText) {
                const parsed = JSON.parse(rawText);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  console.log(`[AIService] Questions generated successfully with model ${model}.`);
                  return parsed.map((q: any, i: number) => ({
                    id: `q_gemini_${topic}_${Date.now()}_${i}`,
                    topic,
                    prompt: `[Gemini IA]: ${q.prompt}`,
                    options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
                    correctOptionIndex: typeof q.correctOptionIndex === 'number' && q.correctOptionIndex >= 0 && q.correctOptionIndex <= 3 ? q.correctOptionIndex : 0,
                    explanation: `[Gemini IA]: ${q.explanation || 'Explicación generada por IA.'}`,
                    difficulty: (['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium') as Difficulty,
                  }));
                }
              }
            } else {
              const status = response.status;
              if (status === 429) {
                console.warn(`[AIService] Rate limit reached (HTTP 429). Stopping retries.`);
                break; // Detener reintentos para no malgastar cuota si el límite de usuario fue alcanzado
              }
              console.warn(`[AIService] Model ${model} unavailable (HTTP ${status}). Trying next...`);
            }
          } catch (modelErr) {
            console.warn(`[AIService] Error calling ${model}:`, modelErr);
          }
        }
      } catch (error) {
        console.warn('[AIService] Network or API error, using local fallback:', error);
      }
    } else {
      console.warn('[AIService] No valid EXPO_PUBLIC_GEMINI_API_KEY found. Using local bank.');
    }

    return this.generateLocalFallbackQuestions(topic);
  }

  // Local fallback question generator when no API key or no network
  private static generateLocalFallbackQuestions(topic: string): Question[] {
    const formattedTopic = topic.replace(/_/g, ' ');
    const sourceQuestions = questionBank[topic] || [];

    if (sourceQuestions.length > 0) {
      const selected = [...sourceQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);

      return selected.map((q, i) => {
        const originalCorrectOption = q.options[q.correctOptionIndex];
        const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
        const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);

        return {
          ...q,
          id: `q_ai_${topic}_${Date.now()}_${i}`,
          prompt: `[IA Refuerzo]: ${q.prompt}`,
          options: shuffledOptions,
          correctOptionIndex: newCorrectIndex,
          explanation: `[IA Refuerzo - ${formattedTopic}]: ${q.explanation}`,
        };
      });
    }

    return [
      {
        id: `q_ai_gen_1`,
        topic,
        prompt: `[IA Refuerzo]: En ${formattedTopic}, ¿cuál es el mecanismo principal para garantizar la seguridad de tipos?`,
        options: [
          'Usar el tipo any en todas las variables',
          'Aplicar anotaciones de tipo estáticas y verificación del compilador',
          'Desactivar el análisis de TypeScript',
          'Convertir todas las variables a objetos'
        ],
        correctOptionIndex: 1,
        explanation: `[IA Refuerzo]: TypeScript verifica tipos estáticamente para prevenir errores en tiempo de compilación.`,
        difficulty: 'easy'
      },
      {
        id: `q_ai_gen_2`,
        topic,
        prompt: `[IA Ejercicio]: ¿Qué beneficio clave aporta utilizar ${formattedTopic} correctamente?`,
        options: [
          'Prevenir errores de asignación e incompatibilidad antes de ejecutar el código',
          'Prevenir errores de asignación e incompatibilidad antes de ejecutar el código',
          'Hacer que el código corra más rápido en el navegador',
          'Eliminar las funciones de JavaScript',
          'Aumentar el tamaño del archivo compilado'
        ],
        correctOptionIndex: 0,
        explanation: `[IA Refuerzo]: El chequeo de tipos estático evita errores comunes de tiempo de ejecución.`,
        difficulty: 'medium'
      },
      {
        id: `q_ai_gen_3`,
        topic,
        prompt: `[IA Desafío]: ¿Cuál de los siguientes enunciados es FALSO sobre ${formattedTopic}?`,
        options: [
          'Mejora la navegación y autocompletado en el editor',
          'Facilita la refactorización segura del código',
          'Las comprobaciones de tipo se ejecutan en tiempo de ejecución dentro del navegador',
          'Permite detectar incoherencias en los datos'
        ],
        correctOptionIndex: 2,
        explanation: `[IA Refuerzo]: Los tipos en TypeScript son eliminados durante la transpilación y NO se ejecutan en tiempo de ejecución.`,
        difficulty: 'hard'
      }
    ];
  }

  // Explains a compiler error via Gemini
  public static async explainCompilerError(errorLog: string): Promise<string> {
    const apiKey = this.getApiKey();
    if (apiKey && apiKey.trim().length > 0 && !apiKey.includes('tu_api_key')) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `Explica este error de compilación de TypeScript para un estudiante en máximo 2 oraciones sencillas y da un consejo práctico:\n${errorLog}` }] }],
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return `[Tutor Gemini IA]: ${text.trim()}`;
        }
      } catch (e) {
        // Fallback
      }
    }
    return `[Tutor IA]: El compilador indica un problema en el tipado. Intenta revisar si el valor retornado coincide con la interfaz declarada.`;
  }

  // Code quality reviewer
  public static reviewCodeQuality(code: string): { bonusXP: number; feedback: string } {
    const usesStrictTypes = !code.includes("any");
    return {
      bonusXP: usesStrictTypes ? 50 : 0,
      feedback: usesStrictTypes
        ? "¡Excelente uso de tipado estricto! Ganaste +50 XP."
        : "Evita usar 'any' para mantener la seguridad de tipos."
    };
  }
}

// --- ENGINE ---

export class AntigravityEngine {
  private user: UserProfile;
  private currentSession: SessionModule | null = null;
  private currentQuestionIndex: number = 0;
  private readonly ONE_HOUR_MS = 60 * 60 * 1000;

  constructor(userName: string, onModuleCompletedCallback?: () => void) {
    this.user = {
      id: "usr_101",
      name: userName,
      lives: 15,
      maxLives: 15,
      lastLivesRestoreTimestamp: Date.now(),
      streak: 0,
      xp: 0,
      analytics: { topicErrorCount: {} }
    };
  }

  // Verifica si ha pasado más de un día sin actividad para reiniciar la racha a 0
  public checkStreakReset(): void {
    if (!this.user.lastActiveDate) return;
    const today = new Date().toISOString().split('T')[0];
    const lastDate = new Date(this.user.lastActiveDate);
    const currentDate = new Date(today);
    const diffInTime = currentDate.getTime() - lastDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (diffInDays > 1) {
      this.user.streak = 0;
    }
  }

  // Actualiza la racha diaria al completar actividad
  public updateDailyStreak(): void {
    const today = new Date().toISOString().split('T')[0];
    if (!this.user.lastActiveDate) {
      this.user.lastActiveDate = today;
      this.user.streak = 1;
      return;
    }

    if (this.user.lastActiveDate === today) {
      // Ya cuenta con actividad hoy, la racha se mantiene igual
      return;
    }

    const lastDate = new Date(this.user.lastActiveDate);
    const currentDate = new Date(today);
    const diffInTime = currentDate.getTime() - lastDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (diffInDays === 1) {
      this.user.streak += 1;
    } else {
      this.user.streak = 1;
    }
    this.user.lastActiveDate = today;
  }

  // Lives restore check (1 hour interval)
  public checkAndRestoreLives(): void {
    this.checkStreakReset();
    const now = Date.now();
    const timeElapsed = now - this.user.lastLivesRestoreTimestamp;

    if (timeElapsed >= this.ONE_HOUR_MS && this.user.lives < this.user.maxLives) {
      this.user.lives = this.user.maxLives;
      this.user.lastLivesRestoreTimestamp = now;
    }
  }

  private isFetchingLazy: boolean = false;

  // Loads a session with AI-generated or local questions
  public async loadSession(moduleTitle: string, topic: string, isAiGenerated: boolean = false): Promise<void> {
    this.checkAndRestoreLives();
    const questions = await AIService.generateSessionQuestions(topic, isAiGenerated);

    this.currentSession = {
      id: `mod_${Date.now()}`,
      title: moduleTitle,
      topic,
      isUnlocked: true,
      isAiGenerated,
      questions
    };
    this.currentQuestionIndex = 0;
  }

  // Triggers a background lazy-load of 5 more questions when approaching the end
  public async triggerLazyLoadIfNeeded(): Promise<void> {
    if (!this.currentSession || !this.currentSession.isAiGenerated || this.isFetchingLazy) return;

    const totalQuestions = this.currentSession.questions.length;
    // Dispara lazy loading cuando el usuario esté en la pregunta 4 (índice 3 de 5), 9 (índice 8 de 10), etc.
    if (this.currentQuestionIndex >= totalQuestions - 2) {
      this.isFetchingLazy = true;
      console.log(`[AntigravityEngine] Lazy loading: fetching 5 more questions for "${this.currentSession.topic}"...`);

      try {
        const batch = await AIService.generateAiQuestionsForTopic(this.currentSession.topic, 5);
        if (this.currentSession && batch.length > 0) {
          this.currentSession.questions.push(...batch);
          console.log(`[AntigravityEngine] Lazy load complete. Total questions in session: ${this.currentSession.questions.length}`);
        }
      } catch (err) {
        console.warn('[AntigravityEngine] Lazy load error:', err);
      } finally {
        this.isFetchingLazy = false;
      }
    }
  }

  // Processes the selected answer for the current question
  public submitAnswer(selectedIndex: number): { isCorrect: boolean; explanation: string; livesLeft: number } {
    this.checkAndRestoreLives();

    if (!this.currentSession) throw new Error("No hay una sesión activa.");
    if (this.user.lives <= 0) return { isCorrect: false, explanation: "Sin vidas disponibles. Espera a que se reabastezcan.", livesLeft: 0 };

    const currentQ = this.currentSession.questions[this.currentQuestionIndex];
    const isCorrect = selectedIndex === currentQ.correctOptionIndex;

    // Disparar carga diferida (lazy load) en background
    this.triggerLazyLoadIfNeeded().catch(() => { });

    if (isCorrect) {
      this.user.xp += 20;
      return { isCorrect: true, explanation: "¡Correcto!", livesLeft: this.user.lives };
    } else {
      // Restar 1 vida por respuesta incorrecta
      this.user.lives = Math.max(0, this.user.lives - 1);

      // Track error analytics per topic
      const topic = currentQ.topic;
      this.user.analytics.topicErrorCount[topic] = (this.user.analytics.topicErrorCount[topic] || 0) + 1;

      return {
        isCorrect: false,
        explanation: currentQ.explanation,
        livesLeft: this.user.lives
      };
    }
  }

  // Advances to the next question or marks session as complete
  public nextQuestion(): { isModuleFinished: boolean } {
    if (!this.currentSession) return { isModuleFinished: true };

    if (this.currentQuestionIndex < this.currentSession.questions.length - 1) {
      this.currentQuestionIndex++;
      return { isModuleFinished: false };
    } else {
      // Module complete
      this.triggerCompletionAnimation();
      this.updateDailyStreak();
      return { isModuleFinished: true };
    }
  }

  // Placeholder for confetti/completion animation
  private triggerCompletionAnimation(): void {
    // Si usas la librería 'canvas-confetti' en el Frontend:
    // window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    console.log('Module complete. Confetti animation would fire here.');
  }

  public getUserProfile(): UserProfile {
    this.checkAndRestoreLives();
    return this.user;
  }
}

// Singleton engine para toda la sesión
export const engine = new AntigravityEngine('Estudiante');
