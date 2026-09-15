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

// --- SERVICIO DE INTELIGENCIA ARTIFICIAL (IA) ---

export class AIService {
  // Simulación de llamada a OpenAI / Gemini API
  public static async generateSessionQuestions(topic: string): Promise<Question[]> {
    // Determina aleatoriamente entre 10 y 15 preguntas
    const totalQuestions = Math.floor(Math.random() * 6) + 10;
    const questions: Question[] = [];

    // Genera y ordena de más fácil a más difícil
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

    for (let i = 0; i < totalQuestions; i++) {
      const diffIndex = i < 4 ? 0 : i < 8 ? 1 : 2; // Distribución progresiva
      questions.push({
        id: `q_${i}`,
        topic,
        prompt: `[${difficulties[diffIndex].toUpperCase()}] Pregunta ${i + 1} sobre ${topic}`,
        options: ["Opción A", "Opción B", "Opción C", "Opción D"],
        correctOptionIndex: 0,
        explanation: "Explicación guiada sin dar la solución directa.",
        difficulty: difficulties[diffIndex]
      });
    }

    // Ordenar explícitamente: easy -> medium -> hard
    const diffWeight: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3 };
    return questions.sort((a, b) => diffWeight[a.difficulty] - diffWeight[b.difficulty]);
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
  public async loadSession(moduleTitle: string, topic: string): Promise<void> {
    this.checkAndRestoreLives();
    const questions = await AIService.generateSessionQuestions(topic);

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
