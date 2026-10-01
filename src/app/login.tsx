import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';

const PURPLE = '#7C3AED';
const DARK_BG = '#0F0A1E';
const CARD_BG = '#1A1035';
const CARD_BORDER = '#2D2060';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos.');
      return;
    }

    if (!isLogin && !username.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa tu nombre de usuario.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Contraseñas no coinciden', 'Las contraseñas ingresadas no coinciden.');
      return;
    }

    setLoading(true);
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });
      if (error) {
        Alert.alert('Error al iniciar sesión', error.message);
      } else {
        router.replace('/');
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: { name: username.trim() }
        }
      });
      if (error) {
        Alert.alert('Error al registrarse', error.message);
      } else {
        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            name: username.trim(),
            xp: 0,
            streak: 0,
            updated_at: new Date().toISOString(),
          });
        }
        Alert.alert('¡Cuenta Creada!', `Bienvenido, ${username.trim()}`);
        router.replace('/');
      }
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background glowing orbs matching app theme */}
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <View style={styles.content}>
        {/* Mode Indicator Badge */}
        <View style={[styles.badge, isLogin ? styles.badgeLogin : styles.badgeSignUp]}>
          <Text style={styles.badgeText}>
            {isLogin ? 'INICIO DE SESIÓN' : 'REGISTRO'}
          </Text>
        </View>

        <Text style={styles.title}>
          {isLogin ? 'Bienvenido' : 'Crear nueva cuenta'}
        </Text>
        <Text style={styles.subtitle}>
          {isLogin
            ? 'Ingresa tus datos para continuar tu aprendizaje'
            : 'Llena los campos para registrar tu nuevo usuario'}
        </Text>

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Nombre de Usuario"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {!isLogin && (
          <TextInput
            style={[styles.input, styles.confirmInput]}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}

        <TouchableOpacity
          style={[styles.button, isLogin ? styles.buttonLogin : styles.buttonSignUp]}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? 'Iniciar Sesión' : 'Registrar Cuenta'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => {
            setIsLogin(!isLogin);
            setConfirmPassword('');
          }}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? '¿No tienes cuenta? Toca aquí para Registrarte'
              : '¿Ya tienes cuenta? Toca aquí para Iniciar Sesión'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
    justifyContent: 'center',
    padding: 24,
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
    top: -80,
    right: -60,
  },
  orb2: {
    width: 220,
    height: 220,
    backgroundColor: '#1D4ED8',
    bottom: -40,
    left: -50,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: 'center',
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeLogin: {
    backgroundColor: 'rgba(108, 71, 255, 0.2)',
    borderColor: '#6C47FF',
    borderWidth: 1,
  },
  badgeSignUp: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: '#10B981',
    borderWidth: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#A099BD',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#120B24',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2A1F4C',
  },
  confirmInput: {
    borderColor: '#10B981',
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonLogin: {
    backgroundColor: '#6C47FF',
  },
  buttonSignUp: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 22,
    alignItems: 'center',
  },
  switchText: {
    color: '#C4B5FD',
    fontSize: 13,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
