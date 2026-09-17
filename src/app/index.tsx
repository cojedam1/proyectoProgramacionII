import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AntigravityEngine, UserProfile, engine } from '@/engine/AntigravityEngine';

const SECTIONS = [
  {
    title: '1. Fundamentos de TypeScript',
    modules: [
      { title: 'Tipos Primitivos', topic: 'tipos_primitivos' },
      { title: 'Variables y Constantes', topic: 'variables_constantes' },
      { title: 'Arrays y Tuplas', topic: 'arrays_tuplas' },
    ],
  },
  {
    title: '2. Tipos Compuestos',
    modules: [
      { title: 'Interfaces', topic: 'interfaces' },
      { title: 'Type Aliases y Uniones', topic: 'type_aliases' },
      { title: 'Enums', topic: 'enums' },
    ],
  },
  {
    title: '3. Funciones',
    modules: [
      { title: 'Tipado de Funciones', topic: 'tipado_funciones' },
      { title: 'Funciones Flecha y Callbacks', topic: 'funciones_flecha' },
      { title: 'Sobrecarga de Funciones', topic: 'sobrecarga_funciones' },
    ],
  },
  {
    title: '4. Programación Orientada a Objetos',
    modules: [
      { title: 'Clases y Constructores', topic: 'clases_constructores' },
      { title: 'Herencia y Polimorfismo', topic: 'herencia_polimorfismo' },
      { title: 'Modificadores de Acceso', topic: 'modificadores_acceso' },
    ],
  },
  {
    title: '5. Tipos Avanzados',
    modules: [
      { title: 'Genéricos', topic: 'genericos' },
      { title: 'Utility Types', topic: 'utility_types' },
      { title: 'Tipos Condicionales y Mapped', topic: 'tipos_condicionales' },
    ],
  },
  {
    title: '6. Módulos y Ecosistema',
    modules: [
      { title: 'Módulos e Importaciones', topic: 'modulos_importaciones' },
      { title: 'Decoradores', topic: 'decoradores' },
      { title: 'Configuración tsconfig', topic: 'tsconfig' },
    ],
  },
];

function PulseAnimation({ children }: { children: React.ReactNode }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 900, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [scale]);

  return <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>;
}

export default function HomeScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(engine.getUserProfile());
  const [userName, setUserName] = useState(profile.name);
  const [editingName, setEditingName] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const refreshProfile = () => setProfile(engine.getUserProfile());

  const handleStartModule = async (mod: { title: string; topic: string }, isAiGenerated: boolean = false) => {
    await engine.loadSession(mod.title, mod.topic, isAiGenerated);
    refreshProfile();
    router.push('/quiz');
  };

  return (
    <View style={styles.bg}>
      {/* Gradient orbs decorativos */}
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.avatarWrapper}>
                <PulseAnimation>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {profile.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                </PulseAnimation>
              </View>

              {editingName ? (
                <TextInput
                  style={styles.nameInput}
                  value={userName}
                  onChangeText={setUserName}
                  onBlur={() => setEditingName(false)}
                  autoFocus
                  placeholder="Tu nombre"
                  placeholderTextColor="#888"
                />
              ) : (
                <Pressable onPress={() => setEditingName(true)}>
                  <Text style={styles.greeting}>¡Hola, {profile.name}! 👋</Text>
                </Pressable>
              )}
              <Text style={styles.subtitle}>Continúa aprendiendo TypeScript</Text>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>⚡</Text>
                <Text style={styles.statValue}>{profile.xp}</Text>
                <Text style={styles.statLabel}>XP Total</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>🔥</Text>
                <Text style={styles.statValue}>{profile.streak}</Text>
                <Text style={styles.statLabel}>Racha</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>🏆</Text>
                <Text style={styles.statValue}>{profile.badges.length}</Text>
                <Text style={styles.statLabel}>Logros</Text>
              </View>
            </View>

            {/* Lives */}
            <View style={styles.livesCard}>
              <View style={styles.livesRowSingle}>
                <Text style={styles.heartSingle}>❤️</Text>
                <View style={styles.livesInfo}>
                  <Text style={styles.livesTitle}>Vidas disponibles: {profile.lives} / {profile.maxLives}</Text>
                  {profile.lives < profile.maxLives ? (
                    <Text style={styles.livesRestoreHint}>⏱ Las vidas se restauran en 1 hora</Text>
                  ) : (
                    <Text style={styles.livesRestoreHint}>Vidas al máximo</Text>
                  )}
                </View>
              </View>
            </View>

            {/* Modules by Sections */}
            {SECTIONS.map((section, secIndex) => (
              <View key={secIndex} style={styles.sectionContainer}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Pressable
                    onPress={() => router.push({ pathname: '/theory', params: { topic: section.modules[0].topic } })}
                    style={styles.sectionTheoryHeaderBtn}
                  >
                    <Text style={styles.sectionTheoryHeaderBtnText}>📖 Teoría de la Sección</Text>
                  </Pressable>
                </View>

                {section.modules.map((mod, index) => (
                  <ModuleCard
                    key={`${secIndex}-${index}`}
                    index={index}
                    title={mod.title}
                    topic={mod.topic}
                    disabled={profile.lives <= 0}
                    onPress={() => handleStartModule(mod, false)}
                    onTheoryPress={() => router.push({ pathname: '/theory', params: { topic: mod.topic } })}
                  />
                ))}
              </View>
            ))}

            {/* Section 7: Ejercicios Personalizados (IA) */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>7. Ejercicios Personalizados (IA)</Text>
              {Object.entries(profile.analytics.topicErrorCount).length > 0 ? (
                Object.entries(profile.analytics.topicErrorCount).map(([topic, count], index) => {
                  const topicName = topic.replace(/_/g, ' ');
                  const title = `${topicName.charAt(0).toUpperCase() + topicName.slice(1)} (${count} fallo${count > 1 ? 's' : ''})`;
                  return (
                    <ModuleCard
                      key={`ai-custom-${index}`}
                      index={index}
                      title={title}
                      topic={topic}
                      disabled={profile.lives <= 0}
                      onPress={() => handleStartModule({ title: `IA: ${title}`, topic }, true)}
                      onTheoryPress={() => router.push({ pathname: '/theory', params: { topic } })}
                    />
                  );
                })
              ) : (
                <View style={styles.aiEmptyCard}>
                  <Text style={styles.aiEmptyTitle}>🤖 Sin áreas de oportunidad registradas</Text>
                  <Text style={styles.aiEmptyText}>
                    A medida que resuelvas módulos y cometas algunos errores, la IA detectará tus temas débiles y creará ejercicios de refuerzo personalizados aquí.
                  </Text>
                  <Pressable
                    style={styles.aiPracticeBtn}
                    onPress={() => handleStartModule({ title: 'Práctica Libre de Refuerzo IA', topic: 'tipos_primitivos' }, true)}
                    disabled={profile.lives <= 0}
                  >
                    <Text style={styles.aiPracticeBtnText}>⚡ Generar Práctica de Prueba con IA</Text>
                  </Pressable>
                </View>
              )}
            </View>

            <View style={{ height: 40 }} />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ModuleCard({
  index,
  title,
  topic,
  disabled,
  onPress,
  onTheoryPress,
}: {
  index: number;
  title: string;
  topic: string;
  disabled: boolean;
  onPress: () => void;
  onTheoryPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <View style={[styles.moduleCard, disabled && styles.moduleCardDisabled]}>
        <View style={styles.moduleIcon}>
          <Text style={styles.moduleIconText}>{index + 1}</Text>
        </View>
        <View style={styles.moduleInfo}>
          <Text style={[styles.moduleTitle, disabled && styles.textMuted]}>{title}</Text>
          <Text style={styles.moduleTopicSub}>Subsección: {topic.replace(/_/g, ' ')}</Text>
        </View>
        <View style={styles.moduleActionsRow}>
          <Pressable
            onPress={onTheoryPress}
            style={styles.theoryBadgeBtn}
            accessibilityLabel={`Leer teoría de ${title}`}
          >
            <Text style={styles.theoryBadgeText}>📖 Teoría</Text>
          </Pressable>

          <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            style={styles.quizStartBtn}
            accessibilityLabel={`Iniciar ejercicios de ${title}`}
          >
            <Text style={styles.quizStartText}>{disabled ? '🔒' : '▶ Quiz'}</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const PURPLE = '#7C3AED';
const PURPLE_LIGHT = '#A78BFA';
const DARK_BG = '#0F0A1E';
const CARD_BG = '#1A1035';
const CARD_BORDER = '#2D2060';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.18,
  },
  orb1: {
    width: 320,
    height: 320,
    backgroundColor: PURPLE,
    top: -100,
    right: -80,
  },
  orb2: {
    width: 200,
    height: 200,
    backgroundColor: '#1D4ED8',
    bottom: 100,
    left: -60,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 12,
  },
  avatarWrapper: {
    marginBottom: 14,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 10,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: PURPLE_LIGHT,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 180,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 6,
    letterSpacing: 0.4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: PURPLE_LIGHT,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  livesCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    marginBottom: 24,
    gap: 10,
  },
  livesRowSingle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heartSingle: {
    fontSize: 28,
  },
  livesInfo: {
    flex: 1,
    gap: 2,
  },
  livesTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  livesRestoreHint: {
    color: '#9CA3AF',
    fontSize: 12,
    fontStyle: 'italic',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 17,
    letterSpacing: 0.2,
    flex: 1,
  },
  sectionTheoryHeaderBtn: {
    backgroundColor: '#251749',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  sectionTheoryHeaderBtnText: {
    color: PURPLE_LIGHT,
    fontSize: 12,
    fontWeight: '700',
  },
  moduleCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  moduleCardDisabled: {
    opacity: 0.5,
  },
  moduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#2D1B69',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: PURPLE_LIGHT,
  },
  moduleInfo: {
    flex: 1,
    gap: 2,
  },
  moduleTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  moduleTopicSub: {
    color: '#9CA3AF',
    fontSize: 11,
    textTransform: 'capitalize',
  },
  moduleActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  theoryBadgeBtn: {
    backgroundColor: '#26194C',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D2975',
  },
  theoryBadgeText: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '700',
  },
  quizStartBtn: {
    backgroundColor: PURPLE,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  quizStartText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  moduleTopic: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  moduleArrow: {
    color: PURPLE_LIGHT,
    fontSize: 16,
    fontWeight: '700',
  },
  textMuted: {
    color: '#6B7280',
  },
  aiEmptyCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 18,
    gap: 10,
  },
  aiEmptyTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  aiEmptyText: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 18,
  },
  aiPracticeBtn: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  aiPracticeBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
});
