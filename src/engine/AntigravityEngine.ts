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
  xp: number;
  badges: string[];
  analytics: UserAnalytics;
}

export interface SessionModule {
  id: string;
  title: string;
  topic: string;
  isUnlocked: boolean;
  questions: Question[];
}

import { questionBank } from '@/data/questionBank';

// --- SERVICIO DE INTELIGENCIA ARTIFICIAL (IA) ---

export class AIService {
  // Genera preguntas (vía IA o banco de preguntas)
  public static async generateSessionQuestions(topic: string, isAiGenerated: boolean = false): Promise<Question[]> {
    if (isAiGenerated) {
      return this.generateAiQuestionsForTopic(topic);
    }

    let questions = questionBank[topic] || [];

    if (questions.length === 0) {
      return this.generateAiQuestionsForTopic(topic);
    }

    return questions;
  }

  // Generador de ejercicios personalizados de IA adaptados al tema
  public static generateAiQuestionsForTopic(topic: string): Question[] {
    const formattedTopic = topic.replace(/_/g, ' ');
    const sourceQuestions = questionBank[topic] || [];

    // Si el tema existe en el banco, seleccionamos preguntas del tema y aleatorizamos las opciones
    // para que el índice de la respuesta correcta varíe (A, B, C, D) y sea 100% preciso para la subsección.
    if (sourceQuestions.length > 0) {
      const selected = [...sourceQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);

      return selected.map((q, i) => {
        const originalCorrectOption = q.options[q.correctOptionIndex];
        // Aleatorizar el orden de las 4 opciones para variar la posición de la respuesta correcta
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

    // Si es un tema personalizado sin banco directo, generamos preguntas con respuestas variadas (B, A, C)
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
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
        correctOptionIndex: 1, // Respuesta B
        explanation: `[IA Refuerzo]: TypeScript verifica tipos estáticamente para prevenir errores en tiempo de compilación.`,
        difficulty: 'easy'
      },
      {
        id: `q_ai_gen_2`,
        topic,
        prompt: `[IA Ejercicio]: ¿Qué beneficio clave aporta utilizar ${formattedTopic} correctamente?`,
        options: [
          'Prevenir errores de asignación e incompatibilidad antes de ejecutar el código',
          'Hacer que el código corra más rápido en el navegador',
          'Eliminar las funciones de JavaScript',
          'Aumentar el tamaño del archivo compilado'
        ],
        correctOptionIndex: 0, // Respuesta A
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
        correctOptionIndex: 2, // Respuesta C
        explanation: `[IA Refuerzo]: Los tipos en TypeScript son eliminados durante la transpilación y NO se ejecutan en tiempo de ejecución.`,
        difficulty: 'hard'
      }
    ];
  }

  // Tutor Explicador de Errores (Imagen 2 - Módulo 1)
  public static explainCompilerError(errorLog: string): string {
    return `[Tutor IA]: El compilador indica un problema en el tipado. Intenta revisar si el valor retornado coincide con la interfaz declarada.`;
  }

  // Revisor de Calidad de Código (Imagen 2 - Módulo 3)
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

// --- MOTOR PRINCIPAL (ANTIGRAVITY ENGINE) ---

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
      badges: [],
      analytics: { topicErrorCount: {} }
    };
  }

  // Gestión y restablecimiento de vidas (1 hora)
  public checkAndRestoreLives(): void {
    const now = Date.now();
    const timeElapsed = now - this.user.lastLivesRestoreTimestamp;

    if (timeElapsed >= this.ONE_HOUR_MS && this.user.lives < this.user.maxLives) {
      this.user.lives = this.user.maxLives;
      this.user.lastLivesRestoreTimestamp = now;
    }
  }

  // Carga e inicia una sesión con preguntas generadas por IA
  public async loadSession(moduleTitle: string, topic: string, isAiGenerated: boolean = false): Promise<void> {
    this.checkAndRestoreLives();
    const questions = await AIService.generateSessionQuestions(topic, isAiGenerated);

    this.currentSession = {
      id: `mod_${Date.now()}`,
      title: moduleTitle,
      topic,
      isUnlocked: true,
      questions
    };
    this.currentQuestionIndex = 0;
  }

  // Procesamiento de respuestas por pregunta
  public submitAnswer(selectedIndex: number): { isCorrect: boolean; explanation: string; livesLeft: number } {
    this.checkAndRestoreLives();

    if (!this.currentSession) throw new Error("No hay una sesión activa.");
    if (this.user.lives <= 0) return { isCorrect: false, explanation: "Sin vidas disponibles. Espera a que se reabastezcan.", livesLeft: 0 };

    const currentQ = this.currentSession.questions[this.currentQuestionIndex];
    const isCorrect = selectedIndex === currentQ.correctOptionIndex;

    if (isCorrect) {
      this.user.xp += 20;
      return { isCorrect: true, explanation: "¡Correcto!", livesLeft: this.user.lives };
    } else {
      // Restar 1 vida por respuesta incorrecta
      this.user.lives = Math.max(0, this.user.lives - 1);

      // Registrar analítica de errores por tema (Imagen 1)
      const topic = currentQ.topic;
      this.user.analytics.topicErrorCount[topic] = (this.user.analytics.topicErrorCount[topic] || 0) + 1;

      return {
        isCorrect: false,
        explanation: currentQ.explanation,
        livesLeft: this.user.lives
      };
    }
  }

  // Avanza de pregunta o activa animación de finalización
  public nextQuestion(): { isModuleFinished: boolean } {
    if (!this.currentSession) return { isModuleFinished: true };

    if (this.currentQuestionIndex < this.currentSession.questions.length - 1) {
      this.currentQuestionIndex++;
      return { isModuleFinished: false };
    } else {
      // Módulo Completado -> Activar animación y otorgar logros
      this.triggerCompletionAnimation();
      this.user.streak += 1;
      return { isModuleFinished: true };
    }
  }

  // Animación de serpentinas / Confetti al finalizar el curso/módulo
  private triggerCompletionAnimation(): void {
    // Si usas la librería 'canvas-confetti' en el Frontend:
    // window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    console.log("🎉 ¡MÓDULO COMPLETADO! Lanzando animación de serpentinas y confetti...");
  }

  public getUserProfile(): UserProfile {
    this.checkAndRestoreLives();
    return this.user;
  }
}

// Singleton engine para toda la sesión
export const engine = new AntigravityEngine('Estudiante');
