import { useLocalSearchParams, useRouter } from 'expo-router';
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

import { theoryBank, TheoryModule } from '@/data/theoryBank';
import { engine } from '@/engine/AntigravityEngine';

// Agrupador de temas por sección para la navegación entre subsecciones
const SECTIONS_TOPICS = [
  {
    sectionTitle: '1. Fundamentos de TypeScript',
    topics: ['tipos_primitivos', 'variables_constantes', 'arrays_tuplas'],
  },
  {
    sectionTitle: '2. Tipos Compuestos',
    topics: ['interfaces', 'type_aliases', 'enums'],
  },
  {
    sectionTitle: '3. Funciones',
    topics: ['tipado_funciones', 'funciones_flecha', 'sobrecarga_funciones'],
  },
  {
    sectionTitle: '4. Programación Orientada a Objetos',
    topics: ['clases_constructores', 'herencia_polimorfismo', 'modificadores_acceso'],
  },
  {
    sectionTitle: '5. Tipos Avanzados',
    topics: ['genericos', 'utility_types', 'tipos_condicionales'],
  },
  {
    sectionTitle: '6. Módulos y Ecosistema',
    topics: ['modulos_importaciones', 'decoradores', 'tsconfig'],
  },
];

export default function TheoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ topic?: string }>();
  
  // Tema seleccionado (por defecto tipos_primitivos)
  const initialTopic = params.topic && theoryBank[params.topic] ? params.topic : 'tipos_primitivos';
  const [currentTopicKey, setCurrentTopicKey] = useState<string>(initialTopic);

  const currentTheory: TheoryModule = theoryBank[currentTopicKey] || theoryBank['tipos_primitivos'];

  // Animación al cambiar de tema
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [currentTopicKey]);

  // Encuentra los temas hermanos dentro de la misma sección
  const currentSection = SECTIONS_TOPICS.find((s) => s.topics.includes(currentTopicKey)) || SECTIONS_TOPICS[0];

  const handleStartPractice = async () => {
    await engine.loadSession(currentTheory.title, currentTheory.topic, false);
    router.push('/quiz');
  };

  return (
    <View style={styles.bg}>
      {/* Esferas decorativas de fondo */}
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <SafeAreaView style={styles.safe}>
        {/* Barra superior de navegación */}
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Volver</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Módulo de Teoría</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Pestañas de subsecciones dentro de la sección actual */}
        <View style={styles.subsectionsBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
            {currentSection.topics.map((tKey) => {
              const moduleData = theoryBank[tKey];
              const isActive = tKey === currentTopicKey;
              return (
                <Pressable
                  key={tKey}
                  onPress={() => setCurrentTopicKey(tKey)}
                  style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {moduleData?.title || tKey}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {/* Header del tema */}
            <View style={styles.titleCard}>
              <Text style={styles.sectionBadge}>{currentTheory.sectionTitle}</Text>
              <Text style={styles.topicTitle}>{currentTheory.title}</Text>
              <Text style={styles.summaryText}>{currentTheory.summary}</Text>
            </View>


            {/* Bloque de Código Explicativo */}
            <View style={styles.codeCard}>
              <View style={styles.codeHeader}>
                <View style={styles.codeDots}>
                  <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
                  <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
                  <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
                </View>
                <Text style={styles.codeLanguage}>TypeScript</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.codeScroll}>
                <Text style={styles.codeText}>{currentTheory.codeExample}</Text>
              </ScrollView>
            </View>

            {/* Tips y Errores comunes */}
            <View style={styles.tipsCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardIcon}>🧠</Text>
                <Text style={styles.cardTitle}>Tips & Buenas Prácticas</Text>
              </View>
              {currentTheory.tips.map((tip, idx) => (
                <Text key={idx} style={styles.tipText}>
                  {tip}
                </Text>
              ))}
            </View>

            {/* Botón de acción principal: Ir a Ejercicios */}
            <Pressable onPress={handleStartPractice} style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>🚀 Comenzar Ejercicios Prácticos</Text>
            </Pressable>

            <View style={{ height: 40 }} />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const DARK_BG = '#0F0A1E';
const CARD_BG = '#1A1035';
const CARD_BORDER = '#2D2060';
const PURPLE = '#7C3AED';
const PURPLE_LIGHT = '#A78BFA';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.15,
  },
  orb1: {
    width: 260,
    height: 260,
    backgroundColor: '#7C3AED',
    top: -60,
    right: -40,
  },
  orb2: {
    width: 320,
    height: 320,
    backgroundColor: '#3B82F6',
    bottom: -80,
    left: -80,
  },
  safe: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#251749',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  backText: {
    color: PURPLE_LIGHT,
    fontWeight: '600',
    fontSize: 14,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  subsectionsBar: {
    borderBottomWidth: 1,
    borderBottomColor: CARD_BORDER,
    paddingVertical: 8,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#160D2E',
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  tabBtnActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE_LIGHT,
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  scroll: {
    padding: 16,
  },
  titleCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    marginBottom: 16,
  },
  sectionBadge: {
    color: PURPLE_LIGHT,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  topicTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  summaryText: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 22,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  cardIcon: {
    fontSize: 18,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  conceptItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    color: PURPLE_LIGHT,
    fontSize: 16,
    marginRight: 8,
    lineHeight: 20,
  },
  conceptText: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  codeCard: {
    backgroundColor: '#090514',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#3B296B',
    marginBottom: 16,
    overflow: 'hidden',
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#140C28',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#251749',
  },
  codeDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  codeLanguage: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
  },
  codeScroll: {
    padding: 14,
  },
  codeText: {
    color: '#A7F3D0',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
  tipsCard: {
    backgroundColor: '#1E1438',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#3B296B',
    marginBottom: 20,
  },
  tipText: {
    color: '#E0E7FF',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  actionBtn: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
