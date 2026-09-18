import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Home,
  Eye,
  EyeOff,
} from 'lucide-react-native';
import { login } from '../../service/auth';

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    if (!username.trim()) {
      Alert.alert(
        'Atenção',
        'Introduza o nome de utilizador.'
      );

      return;
    }

    if (!password.trim()) {
      Alert.alert(
        'Atenção',
        'Introduza a palavra-passe.'
      );

      return;
    }

    /*
     * Neste momento estamos apenas
     * simulando o login.
     *
     * Posteriormente vamos substituir
     * esta parte pela chamada à API FastAPI.
     * try {
      const data = await login(username, password);

      console.log('Login realizado:', data);

      navigation.replace('ResidentDashboardScreen');

    } catch (error) {

      console.error('Erro no login:', error);

      Alert.alert(
        'Erro de autenticação',
        error.message || 'Nome de utilizador ou palavra-passe inválidos.'
      );
    }

    navigation.replace('ResidentDashboardScreen');
  };
     */
    const data = await login(username, password)

    navigation.replace('ResidentDashboardScreen');
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar palavra-passe',
      'A funcionalidade de recuperação será implementada posteriormente.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#faf8ff"
      />

      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        style={styles.container}
      >

        <View style={styles.content}>

          {/* Logo */}
          <View style={styles.logoContainer}>

            <Home
              size={32}
              color="#ffffff"
              strokeWidth={2.2}
            />

          </View>

          {/* Título */}
          <Text style={styles.title}>
            Iniciar Sessão
          </Text>

          {/* Formulário */}
          <View style={styles.form}>

            {/* Nome de utilizador */}
            <View style={styles.fieldGroup}>

              <Text style={styles.label}>
                NOME DE UTILIZADOR
              </Text>

              <TextInput
                style={styles.input}
                placeholder="ex: morador@edificio.pt"
                placeholderTextColor="#94a3b8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
              />

            </View>

            {/* Palavra-passe */}
            <View style={styles.fieldGroup}>

              <View style={styles.passwordLabelRow}>

                <Text style={styles.label}>
                  PALAVRA-PASSE
                </Text>

                <TouchableOpacity
                  onPress={handleForgotPassword}
                  activeOpacity={0.7}
                >

                  <Text style={styles.forgotPasswordText}>
                    Esqueci-me da palavra-passe?
                  </Text>

                </TouchableOpacity>

              </View>

              <View style={styles.passwordInputContainer}>

                <TextInput
                  style={styles.passwordInput}
                  placeholder="Introduza a sua palavra-passe"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />

                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() =>
                    setShowPassword(!showPassword)
                  }
                  activeOpacity={0.7}
                  accessibilityLabel={
                    showPassword
                      ? 'Ocultar palavra-passe'
                      : 'Mostrar palavra-passe'
                  }
                >

                  {showPassword ? (

                    <EyeOff
                      size={18}
                      color="#64748b"
                    />

                  ) : (

                    <Eye
                      size={18}
                      color="#64748b"
                    />

                  )}

                </TouchableOpacity>

              </View>

            </View>

            {/* Botão Entrar */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.85}
            >

              <Text style={styles.loginButtonText}>
                Entrar
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#faf8ff',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  content: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },

  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#1e3a8a',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 20,

    shadowColor: '#1e3a8a',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 28,
    textAlign: 'center',
  },

  form: {
    width: '100%',
    gap: 16,
  },

  fieldGroup: {
    gap: 6,
  },

  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.5,
  },

  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  forgotPasswordText: {
    fontSize: 11,
    color: '#1e3a8a',
    fontWeight: '500',
  },

  input: {
    height: 46,

    backgroundColor: '#ffffff',

    borderWidth: 1,
    borderColor: '#cbd5e1',

    borderRadius: 8,

    paddingHorizontal: 12,

    fontSize: 13,
    color: '#0f172a',
  },

  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#ffffff',

    borderWidth: 1,
    borderColor: '#cbd5e1',

    borderRadius: 8,
  },

  passwordInput: {
    flex: 1,

    height: 46,

    paddingHorizontal: 12,

    fontSize: 13,
    color: '#0f172a',
  },

  eyeButton: {
    paddingHorizontal: 12,

    height: 46,

    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButton: {
    height: 46,

    backgroundColor: '#1e3a8a',

    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 8,
  },

  loginButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },

});