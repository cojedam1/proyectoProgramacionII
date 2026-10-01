// --- MODELOS DE DATOS ---

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  topic: string;
  conceptIntro?: string; // Micro-concepto explicativo previo
  prompt: string;        // Pregunta práctica ("¿Qué imprime?", "Completa el código")
  codeSnippet?: string;  // Bloque de código TypeScript en editor IDE
  isCodeOptions?: boolean; // Si es true, renderiza botones con estilo de código
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: Difficulty;
  hint?: string;
}

export interface UserAnalytics {
  topicErrorCount: Record<string, number>;   // Registra temas con más fallos
  topicSuccessCount: Record<string, number>; // Registra aciertos por tema
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

// --- UTILS DE ALEATORIEDAD ---

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleQuestion(q: Question): Question {
  const originalCorrectOption = q.options[q.correctOptionIndex];
  const shuffledOptions = shuffleArray(q.options);
  const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);

  return {
    ...q,
    options: shuffledOptions,
    correctOptionIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
  };
}

export function enrichQuestion(q: Question, topic: string): Question {
  const formattedTopic = topic.replace(/_/g, ' ');

  // 1. Píldora Informativa (conceptIntro)
  let conceptIntro = q.conceptIntro;
  if (!conceptIntro || conceptIntro.trim().length === 0) {
    if (q.explanation && q.explanation.length > 5) {
      const cleanExp = q.explanation.replace(/\[.*?\]:?\s*/g, '');
      conceptIntro = cleanExp.split('.')[0] + '.';
    } else {
      conceptIntro = `Concepto clave sobre ${formattedTopic} en TypeScript.`;
    }
  }

  // 2. Bloque IDE de Código (codeSnippet)
  let codeSnippet = q.codeSnippet;
  if (!codeSnippet || codeSnippet.trim().length === 0) {
    const codeMatch = q.prompt.match(/`([^`]+)`/g);
    if (codeMatch && codeMatch.length > 0) {
      codeSnippet = codeMatch.map((m) => m.replace(/`/g, '')).join('\n');
    } else {
      codeSnippet = `// ${formattedTopic}\n// Revisa la estructura:\nlet resultado = ${JSON.stringify(q.options[q.correctOptionIndex])};`;
    }
  }

  return {
    ...q,
    conceptIntro,
    codeSnippet,
    isCodeOptions: q.isCodeOptions ?? true,
  };
}

// --- AI SERVICE ---

export class AIService {
  private static getApiKey(): string | undefined {
    return process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  }

  // Per-topic session offset tracker so each session picks a different slice
  private static topicOffset: Record<string, number> = {};

  // Generates questions via Gemini API or local question bank in aleatory order
  public static async generateSessionQuestions(topic: string, isAiGenerated: boolean = false): Promise<Question[]> {
    let questions: Question[] = [];

    if (isAiGenerated) {
      questions = await this.generateAiQuestionsForTopic(topic, 5);
    } else {
      const sourceQuestions = questionBank[topic] || [];
      if (sourceQuestions.length === 0) {
        questions = await this.generateAiQuestionsForTopic(topic, 5);
      } else {
        // Shuffle with proper Fisher-Yates, then pick 5 from a rotating offset so
        // each session feels fresh even if the same topic is replayed immediately
        const shuffled = shuffleArray([...sourceQuestions]);
        questions = shuffled.slice(0, Math.min(5, shuffled.length));
      }
    }

    // ENRIQUECER CON PÍLDORA INFORMATIVA Y CÓDIGO IDE + MEZCLAR ALEATORIAMENTE
    const enriched = questions.map((q) => enrichQuestion(q, topic));
    const shuffledQuestions = shuffleArray(enriched);
    return shuffledQuestions.map((q) => shuffleQuestion(q));
  }

  // Calls Gemini API with model fallback chain; falls back to local bank on failure
  public static async generateAiQuestionsForTopic(topic: string, count: number = 5): Promise<Question[]> {
    const rawKey = this.getApiKey() ?? '';
    // Strip accidental whitespace, newlines, and stray @ characters
    const cleanApiKey = rawKey.replace(/[\s@]/g, '');

    // Validar que exista una clave con longitud mínima (soporta formatos clásicos "AIza..." y nuevos "AQ...")
    if (cleanApiKey.length < 20) {
      if (cleanApiKey.length === 0) {
        console.warn('[AIService] EXPO_PUBLIC_GEMINI_API_KEY no está configurada. Usando banco local.');
      } else {
        console.warn(`[AIService] API key demasiado corta (${cleanApiKey.length} caracteres). Usando banco local.`);
      }
      return this.generateLocalFallbackQuestions(topic);
    }

    const formattedTopic = topic.replace(/_/g, ' ');
    const promptText = `Eres un tutor interactivo de TypeScript estilo Mimo y SoloLearn. Genera exactamente ${count} ejercicios prácticos basados en CÓDIGO para el tema "${formattedTopic}".
Responde ÚNICAMENTE con un arreglo JSON válido con esta estructura exacta:
[
  {
    "conceptIntro": "Una oración clara explicando el micro-concepto involucrado",
    "prompt": "¿Qué imprime este código? (o 'Completa la línea' / 'Identifica el error')",
    "codeSnippet": "let ciudad: string = \\"Tokyo\\";\\nconsole.log(ciudad);",
    "isCodeOptions": true,
    "options": ["\\"ciudad\\"", "ciudad", "Tokyo", "undefined"],
    "correctOptionIndex": 2,
    "explanation": "Explicación concisa y educativa de por qué ese es el resultado",
    "difficulty": "easy"
  }
]
Condiciones:
- codeSnippet debe ser código TypeScript válido y legible.
- options debe tener exactamente 4 opciones de respuesta cortas y claras.
- correctOptionIndex debe ser un número entero de 0 a 3.`;

    console.log(`[AIService] Solicitando preguntas a Gemini para: "${topic}"...`);

    // Fallback model list — tries active models in priority order
    const fallbackModels = [
      'gemini-3.5-flash',
      'gemini-3.5-flash-lite',
      'gemini-3.7-flash',
      'gemini-3.8-flash',
      'gemini-flash-latest',
    ];

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
            try {
              const parsed = JSON.parse(rawText);
              if (Array.isArray(parsed) && parsed.length > 0) {
                console.log(`[AIService] ✅ Preguntas generadas con ${model} (${parsed.length} preguntas).`);
                return parsed.map((q: any, i: number) => ({
                  id: `q_gemini_${topic}_${Date.now()}_${i}`,
                  topic,
                  conceptIntro: q.conceptIntro || `Concepto clave sobre ${formattedTopic}`,
                  prompt: q.prompt || `¿Qué imprime el siguiente código?`,
                  codeSnippet: q.codeSnippet || undefined,
                  isCodeOptions: q.isCodeOptions ?? true,
                  options: Array.isArray(q.options) && q.options.length === 4
                    ? q.options
                    : ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
                  correctOptionIndex:
                    typeof q.correctOptionIndex === 'number' &&
                    q.correctOptionIndex >= 0 &&
                    q.correctOptionIndex <= 3
                      ? q.correctOptionIndex
                      : 0,
                  explanation: q.explanation || 'Explicación generada por IA.',
                  difficulty: (['easy', 'medium', 'hard'].includes(q.difficulty)
                    ? q.difficulty
                    : 'medium') as Difficulty,
                }));
              }
            } catch (parseErr) {
              console.warn(`[AIService] Error parseando JSON del modelo ${model}:`, parseErr);
            }
          }
        } else {
          const status = response.status;
          let errorBody = '';
          try { errorBody = await response.text(); } catch (_) {}
          if (status === 401 || status === 403) {
            console.warn(`[AIService] ❌ HTTP ${status} — API key rechazada. Respuesta: ${errorBody.slice(0, 300)}`);
            break; // No tiene sentido reintentar si la key es inválida
          } else if (status === 429) {
            console.warn(`[AIService] ⚠️ Rate limit alcanzado (HTTP 429). Deteniendo reintentos.`);
            break;
          } else if (status === 400) {
            console.warn(`[AIService] ❌ HTTP 400 Bad Request con ${model}. Respuesta: ${errorBody.slice(0, 300)}`);
          } else {
            console.warn(`[AIService] Modelo ${model} no disponible (HTTP ${status}). Intentando siguiente...`);
          }
        }
      } catch (modelErr) {
        console.warn(`[AIService] Error de red al llamar a ${model}:`, modelErr);
      }
    }

    console.warn('[AIService] Todos los modelos fallaron. Usando banco local de preguntas.');
    return this.generateLocalFallbackQuestions(topic);
  }

  // Local fallback question generator when no API key or no network
  private static generateLocalFallbackQuestions(topic: string): Question[] {
    const sourceQuestions = questionBank[topic] || [];

    if (sourceQuestions.length > 0) {
      // Use proper Fisher-Yates shuffle (via shuffleArray) — biased sort() removed
      const shuffled = shuffleArray([...sourceQuestions]);

      // Rotate starting offset so replaying same topic gives different questions
      const poolSize = shuffled.length;
      const offset = (AIService.topicOffset[topic] ?? 0) % poolSize;
      AIService.topicOffset[topic] = (offset + 5) % poolSize;

      const rotated = [...shuffled.slice(offset), ...shuffled.slice(0, offset)];
      const selected = rotated.slice(0, Math.min(5, poolSize));

      return selected.map((q, i) => ({
        ...q,
        id: `q_ai_${topic}_${Date.now()}_${i}`,
        // No ugly [IA Refuerzo] prefix — the question speaks for itself
      }));
    }

    return [
      {
        id: `q_ai_gen_1`,
        topic,
        conceptIntro: `Al imprimir una variable en TypeScript, la consola muestra el valor almacenado en su interior.`,
        prompt: `¿Qué imprimirá el siguiente código en la consola?`,
        codeSnippet: `let ciudad: string = "Tokyo";\nconsole.log(ciudad);`,
        isCodeOptions: true,
        options: ['"ciudad"', 'ciudad', 'Tokyo', 'undefined'],
        correctOptionIndex: 2,
        explanation: `Al imprimir 'ciudad', el programa devuelve la cadena de texto almacenada: "Tokyo".`,
        difficulty: 'easy'
      },
      {
        id: `q_ai_gen_2`,
        topic,
        conceptIntro: `Las variables declaradas con 'const' son de solo lectura y no pueden ser reasignadas.`,
        prompt: `¿Cuál es el resultado de ejecutar este código?`,
        codeSnippet: `const edad = 25;\nedad = 26;\nconsole.log(edad);`,
        isCodeOptions: true,
        options: ['26', 'Error de compilación (TypeError)', '25', 'undefined'],
        correctOptionIndex: 1,
        explanation: `Reasignar una constante declarada con 'const' lanza un error de compilación en TypeScript.`,
        difficulty: 'medium'
      },
      {
        id: `q_ai_gen_3`,
        topic,
        conceptIntro: `El tipo booleano solo puede contener dos valores primitivos: true o false.`,
        prompt: `Completa el espacio en blanco para asignar un booleano válido:`,
        codeSnippet: `let esValido: boolean = ___;`,
        isCodeOptions: true,
        options: ['true', '"true"', '1', 'Boolean()'],
        correctOptionIndex: 0,
        explanation: `El valor primitivo booleano directo en TypeScript es 'true' o 'false'.`,
        difficulty: 'easy'
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

// ============================================================================
// CLASE PRINCIPAL: AntigravityEngine
// Administra el estado del estudiante: vidas, rachas, XP acumulada,
// sesiones activas de preguntas y el diagnóstico analítico de temas.
// ============================================================================
export class AntigravityEngine {
  private user: UserProfile; // Datos del perfil del estudiante actual
  private currentSession: SessionModule | null = null; // Módulo o sesión en curso
  private currentQuestionIndex: number = 0; // Índice de la pregunta actual (0 a 4)
  private readonly ONE_HOUR_MS = 60 * 60 * 1000; // 1 hora en milisegundos para recarga de vidas

  constructor(userName: string, onModuleCompletedCallback?: () => void) {
    // Inicialización del perfil por defecto
    this.user = {
      id: "usr_101",
      name: userName,
      lives: 15, // 15 vidas iniciales para permitir amplio aprendizaje
      maxLives: 15,
      lastLivesRestoreTimestamp: Date.now(),
      streak: 0,
      xp: 0,
      analytics: { topicErrorCount: {}, topicSuccessCount: {} }
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

    const topic = currentQ.topic;
    if (!this.user.analytics.topicSuccessCount) this.user.analytics.topicSuccessCount = {};
    if (!this.user.analytics.topicErrorCount) this.user.analytics.topicErrorCount = {};

    if (isCorrect) {
      this.user.xp += 20;
      this.user.analytics.topicSuccessCount[topic] = (this.user.analytics.topicSuccessCount[topic] || 0) + 1;

      // Reducir errores registrados al practicar y responder correctamente
      if (this.user.analytics.topicErrorCount[topic] && this.user.analytics.topicErrorCount[topic] > 0) {
        this.user.analytics.topicErrorCount[topic] -= 1;
        // Si llega a 0, se elimina del mapa de áreas débiles al haber sido superado
        if (this.user.analytics.topicErrorCount[topic] <= 0) {
          delete this.user.analytics.topicErrorCount[topic];
        }
      }

      // Always return the full explanation so the user learns WHY the answer is correct
      return { isCorrect: true, explanation: currentQ.explanation, livesLeft: this.user.lives };
    } else {
      // Restar 1 vida por respuesta incorrecta
      this.user.lives = Math.max(0, this.user.lives - 1);

      // Track error analytics per topic
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
