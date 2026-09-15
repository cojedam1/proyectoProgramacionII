import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { engine } from './index';

export default function ResultsScreen() {
  const router = useRouter();
  const profile = engine.getUserProfile();

  // Animations
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const starAnims = Array.from({ length: 6 }, () => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    // Trophy entrance
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 80,
      useNativeDriver: true,
    }).start();

    // Fade in content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Stars pop in sequence
    starAnims.forEach((anim, i) => {
      Animated.spring(anim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        delay: 400 + i * 100,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const topics = Object.entries(profile.analytics.topicErrorCount);

  return (
    <View style={styles.bg}>
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />
      <View style={[styles.orb, styles.orb3]} />

      <SafeAreaView style={styles.safe}>
        {/* Floating stars decoration */}
        <View style={styles.starsRow}>
          {starAnims.map((anim, i) => (
            <Animated.Text
              key={i}
              style={[
                styles.starFloat,
                { transform: [{ scale: anim }], opacity: anim },
              ]}
            >
              ⭐
            </Animated.Text>
          ))}
        </View>

        {/* Trophy */}
        <Animated.View
          style={[styles.trophyWrapper, { transform: [{ scale: scaleAnim }] }]}
        >
          <View style={styles.trophyCircle}>
            <Text style={styles.trophyEmoji}>🏆</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.title}>¡Módulo Completado!</Text>
          <Text style={styles.subtitle}>
            ¡Excelente trabajo, {profile.name}! Sigue así. 🚀
          </Text>

          {/* Stats Cards */}
          <View style={styles.statsGrid}>
            <StatCard emoji="⚡" label="XP Total" value={`${profile.xp}`} color="#A78BFA" />
            <StatCard emoji="🔥" label="Racha" value={`${profile.streak}`} color="#F59E0B" />
            <StatCard emoji="❤️" label="Vidas" value={`${profile.lives}`} color="#EF4444" />
          </View>

          {/* Error Analytics */}
          {topics.length > 0 && (
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsTitle}>📊 Temas a Reforzar</Text>
              {topics.map(([topic, count]) => (
                <View key={topic} style={styles.analyticsRow}>
                  <Text style={styles.analyticsTopic}>{topic}</Text>
                  <View style={styles.errorBadge}>
                    <Text style={styles.errorCount}>{count} error{count > 1 ? 'es' : ''}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Buttons */}
          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.replace('/')}
            accessibilityLabel="Volver al inicio"
          >
            <Text style={styles.primaryBtnText}>🏠 Volver al Inicio</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

function StatCard({
  emoji,
  label,
  value,
  color,
}: {
  emoji: string;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={[styles.statCard, { borderColor: color + '55' }]}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const PURPLE = '#7C3AED';
const DARK_BG = '#0F0A1E';
const CARD_BG = '#1A1035';
const CARD_BORDER = '#2D2060';

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: DARK_BG },
  orb: { position: 'absolute', borderRadius: 999 },
  orb1: { width: 300, height: 300, backgroundColor: PURPLE, top: -100, right: -80, opacity: 0.2 },
  orb2: { width: 200, height: 200, backgroundColor: '#1D4ED8', bottom: 60, left: -60, opacity: 0.15 },
  orb3: { width: 150, height: 150, backgroundColor: '#D97706', bottom: 200, right: -40, opacity: 0.12 },
  safe: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  starsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    justifyContent: 'center',
  },
  starFloat: { fontSize: 26 },
  trophyWrapper: { marginBottom: 24 },
  trophyCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#2D1B69',
    borderWidth: 3,
    borderColor: '#A78BFA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 16,
  },
  trophyEmoji: { fontSize: 52 },
  content: { alignItems: 'center', width: '100%' },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: '#A78BFA',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: { fontSize: 24 },
  statValue: { fontSize: 24, fontWeight: '900' },
  statLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  analyticsCard: {
    width: '100%',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    marginBottom: 24,
    gap: 10,
  },
  analyticsTitle: { color: '#fff', fontWeight: '800', fontSize: 16, marginBottom: 4 },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analyticsTopic: { color: '#E9E3FF', fontSize: 14, flex: 1 },
  errorBadge: {
    backgroundColor: '#7F1D1D33',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  errorCount: { color: '#EF4444', fontWeight: '700', fontSize: 12 },
  primaryBtn: {
    width: '100%',
    backgroundColor: PURPLE,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 12,
  },
  primaryBtnText: { color: '#fff', fontWeight: '900', fontSize: 17, letterSpacing: 0.3 },
});
