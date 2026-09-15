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

import { AntigravityEngine, UserProfile } from '@/engine/AntigravityEngine';

// Singleton engine para toda la sesión
export const engine = new AntigravityEngine('Estudiante');

const MODULES = [
  { title: 'Tipos Básicos en TypeScript', topic: 'Tipos en TypeScript' },
  { title: 'Interfaces y Tipos', topic: 'Interfaces TypeScript' },
  { title: 'Clases y POO', topic: 'Programación Orientada a Objetos' },
  { title: 'Genéricos', topic: 'Generics TypeScript' },
  { title: 'Funciones Avanzadas', topic: 'Funciones TypeScript' },
];

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <Text style={[styles.heart, filled ? styles.heartFilled : styles.heartEmpty]}>
      {filled ? '❤️' : '🖤'}
    </Text>
  );
}

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

  const handleStartModule = async (moduleIndex: number) => {
    const mod = MODULES[moduleIndex];
    await engine.loadSession(mod.title, mod.topic);
    refreshProfile();
    router.push('/quiz');
  };

  const livesArray = Array.from({ length: profile.maxLives }, (_, i) => i < profile.lives);

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
              <Text style={styles.livesTitle}>❤️ Vidas disponibles: {profile.lives}/{profile.maxLives}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.heartsScroll}>
                <View style={styles.heartsRow}>
                  {livesArray.map((filled, i) => (
                    <HeartIcon key={i} filled={filled} />
                  ))}
                </View>
              </ScrollView>
              {profile.lives < profile.maxLives && (
                <Text style={styles.livesRestoreHint}>⏱ Las vidas se restauran en 1 hora</Text>
              )}
            </View>

            {/* Modules */}
            <Text style={styles.sectionTitle}>📚 Módulos de Aprendizaje</Text>
            {MODULES.map((mod, index) => (
              <ModuleCard
                key={index}
                index={index}
                title={mod.title}
                topic={mod.topic}
                disabled={profile.lives <= 0}
                onPress={() => handleStartModule(index)}
              />
            ))}

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
}: {
  index: number;
  title: string;
  topic: string;
  disabled: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const icons = ['🧩', '📐', '🏗️', '🔧', '🚀'];

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.moduleCard, disabled && styles.moduleCardDisabled]}
        accessibilityRole="button"
        accessibilityLabel={`Iniciar módulo ${title}`}
      >
        <View style={styles.moduleIcon}>
          <Text style={styles.moduleIconText}>{icons[index % icons.length]}</Text>
        </View>
        <View style={styles.moduleInfo}>
          <Text style={[styles.moduleTitle, disabled && styles.textMuted]}>{title}</Text>
          <Text style={[styles.moduleTopic, disabled && styles.textMuted]}>{topic}</Text>
        </View>
        <Text style={styles.moduleArrow}>{disabled ? '🔒' : '▶'}</Text>
      </Pressable>
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
  livesTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  heartsScroll: {
    flexGrow: 0,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  heart: {
    fontSize: 20,
  },
  heartFilled: {
    opacity: 1,
  },
  heartEmpty: {
    opacity: 0.35,
  },
  livesRestoreHint: {
    color: '#9CA3AF',
    fontSize: 12,
    fontStyle: 'italic',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  moduleCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  moduleCardDisabled: {
    opacity: 0.5,
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#2D1B69',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleIconText: {
    fontSize: 24,
  },
  moduleInfo: {
    flex: 1,
    gap: 3,
  },
  moduleTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
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
});
