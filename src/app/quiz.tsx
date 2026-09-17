import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Question, UserProfile, engine } from '@/engine/AntigravityEngine';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function QuizScreen() {
  const router = useRouter();

  // Leemos el estado de la sesión desde el engine
  const session = (engine as any).currentSession as {
    title: string;
    questions: Question[];
  } | null;
  const questionIndex: number = (engine as any).currentQuestionIndex ?? 0;
  const profile: UserProfile = engine.getUserProfile();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [explanation, setExplanation] = useState('');
  const [livesLeft, setLivesLeft] = useState(profile.lives);
  const [currentQ, setCurrentQ] = useState<Question | null>(
    session ? session.questions[questionIndex] : null
  );
  const [qIndex, setQIndex] = useState(questionIndex);
  const [totalQ, setTotalQ] = useState(session ? session.questions.length : 0);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateIn();
    updateProgress(qIndex, totalQ);
  }, [qIndex]);

  function animateIn() {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }

  function updateProgress(current: number, total: number) {
    Animated.timing(progressAnim, {
      toValue: total > 0 ? current / total : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function shakeError() {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  }

  function handleSelectAnswer(index: number) {
    if (answerState !== 'unanswered') return;

    setSelectedIndex(index);
    const result = engine.submitAnswer(index);
    setLivesLeft(result.livesLeft);
    setExplanation(result.explanation);

    if (result.isCorrect) {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
      shakeError();
    }
  }

  function handleNext() {
    const { isModuleFinished } = engine.nextQuestion();

    if (isModuleFinished) {
      router.replace('/results');
      return;
    }

    // Refresh local state from engine
    const newSession = (engine as any).currentSession;
    const newIndex: number = (engine as any).currentQuestionIndex;
    const newQ: Question = newSession.questions[newIndex];

    setCurrentQ(newQ);
    setQIndex(newIndex);
    setSelectedIndex(null);
    setAnswerState('unanswered');
    setExplanation('');
  }

  if (!session || !currentQ) {
    return (
      <View style={styles.bg}>
        <SafeAreaView style={styles.centered}>
          <Text style={styles.errorText}>⚠️ No hay sesión activa. Vuelve al inicio.</Text>
          <Pressable style={styles.btn} onPress={() => router.replace('/')}>
            <Text style={styles.btnText}>Ir al Inicio</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    );
  }

  const diffColors: Record<string, string> = {
    easy: '#10B981',
    medium: '#F59E0B',
    hard: '#EF4444',
  };
  const diffColor = diffColors[currentQ.difficulty] ?? '#7C3AED';
  const livesArray = Array.from({ length: 15 }, (_, i) => i < livesLeft);

  return (
    <View style={styles.bg}>
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Pressable
              onPress={() => router.replace('/')}
              style={styles.backBtn}
              accessibilityLabel="Volver al inicio"
            >
              <Text style={styles.backText}>← Inicio</Text>
            </Pressable>
            <View style={styles.livesRow}>
              <Text style={styles.miniHeart}>❤️</Text>
              <Text style={styles.livesCount}>{livesLeft}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBg}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Pregunta {qIndex + 1} de {totalQ}
          </Text>

          {/* Module Title */}
          <Text style={styles.moduleTitle}>{session.title}</Text>

          {/* Difficulty Badge */}
          <View style={[styles.diffBadge, { backgroundColor: diffColor + '22', borderColor: diffColor }]}>
            <Text style={[styles.diffText, { color: diffColor }]}>
              {currentQ.difficulty.toUpperCase()}
            </Text>
          </View>

          {/* Question Card */}
          <Animated.View
            style={[
              styles.questionCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { translateX: shakeAnim }],
              },
            ]}
          >
            <Text style={styles.questionText}>{currentQ.prompt}</Text>
          </Animated.View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                selected={selectedIndex === index}
                answerState={answerState}
                correctIndex={currentQ.correctOptionIndex}
                onPress={() => handleSelectAnswer(index)}
              />
            ))}
          </View>

          {/* Feedback */}
          {answerState !== 'unanswered' && (
            <Animated.View
              style={[
                styles.feedbackCard,
                answerState === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}
            >
              <Text style={styles.feedbackEmoji}>
                {answerState === 'correct' ? '🎉' : '💡'}
              </Text>
              <Text style={styles.feedbackText}>{explanation}</Text>
            </Animated.View>
          )}

          {/* Next Button */}
          {answerState !== 'unanswered' && (
            <Pressable
              style={styles.nextBtn}
              onPress={handleNext}
              accessibilityLabel="Siguiente pregunta"
            >
              <Text style={styles.nextBtnText}>
                {qIndex + 1 >= totalQ ? '🏁 Ver Resultados' : 'Siguiente →'}
              </Text>
            </Pressable>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function OptionButton({
  label,
  index,
  selected,
  answerState,
  correctIndex,
  onPress,
}: {
  label: string;
  index: number;
  selected: boolean;
  answerState: AnswerState;
  correctIndex: number;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const letters = ['A', 'B', 'C', 'D'];

  const isCorrect = index === correctIndex;
  const isAnswered = answerState !== 'unanswered';

  let cardStyle: any = styles.optionCard;
  let textStyle = styles.optionText;
  let letterBg = '#2D1B69';

  if (isAnswered) {
    if (isCorrect) {
      cardStyle = { ...styles.optionCard, ...styles.optionCorrect };
      letterBg = '#10B981';
    } else if (selected && !isCorrect) {
      cardStyle = { ...styles.optionCard, ...styles.optionWrong };
      letterBg = '#EF4444';
    } else {
      cardStyle = [styles.optionCard, { opacity: 0.5 }];
    }
  } else if (selected) {
    cardStyle = { ...styles.optionCard, ...styles.optionSelected };
    letterBg = '#7C3AED';
  }

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isAnswered}
        style={cardStyle}
        accessibilityRole="button"
        accessibilityLabel={`Opción ${letters[index]}: ${label}`}
      >
        <View style={[styles.letterBadge, { backgroundColor: letterBg }]}>
          <Text style={styles.letterText}>{letters[index]}</Text>
        </View>
        <Text style={textStyle}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const PURPLE = '#7C3AED';
const DARK_BG = '#0F0A1E';
const CARD_BG = '#1A1035';
const CARD_BORDER = '#2D2060';

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: DARK_BG },
  orb: { position: 'absolute', borderRadius: 999, opacity: 0.15 },
  orb1: { width: 280, height: 280, backgroundColor: PURPLE, top: -80, right: -60 },
  orb2: { width: 180, height: 180, backgroundColor: '#1D4ED8', bottom: 80, left: -40 },
  safe: { flex: 1 },
  scroll: { padding: 20, paddingTop: Platform.OS === 'android' ? 20 : 0 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: CARD_BG,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  backText: { color: '#A78BFA', fontWeight: '700', fontSize: 14 },
  livesRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  miniHeart: { fontSize: 14 },
  livesCount: { color: '#fff', fontWeight: '700', fontSize: 14, marginLeft: 4 },
  progressBg: {
    height: 8,
    backgroundColor: '#2D2060',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: 8,
    backgroundColor: PURPLE,
    borderRadius: 4,
  },
  progressText: { color: '#9CA3AF', fontSize: 12, marginBottom: 16, fontWeight: '600' },
  moduleTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  diffBadge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 16,
  },
  diffText: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  questionCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 22,
    marginBottom: 20,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  questionText: { color: '#E9E3FF', fontSize: 17, lineHeight: 26, fontWeight: '500' },
  optionsContainer: { gap: 12, marginBottom: 20 },
  optionCard: {
    backgroundColor: CARD_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionSelected: { borderColor: PURPLE, backgroundColor: '#2D1B69' },
  optionCorrect: { borderColor: '#10B981', backgroundColor: '#064E3B22' },
  optionWrong: { borderColor: '#EF4444', backgroundColor: '#7F1D1D22' },
  optionText: { color: '#E9E3FF', fontSize: 15, flex: 1, lineHeight: 22 },
  letterBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  feedbackCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  feedbackCorrect: { backgroundColor: '#064E3B22', borderColor: '#10B981' },
  feedbackWrong: { backgroundColor: '#7F1D1D22', borderColor: '#EF4444' },
  feedbackEmoji: { fontSize: 22 },
  feedbackText: { color: '#E9E3FF', flex: 1, lineHeight: 22, fontSize: 14 },
  nextBtn: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  nextBtnText: { color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 0.3 },
  btn: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 12,
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
