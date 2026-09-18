import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Share,
  Alert,
} from 'react-native';

import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  QrCode,
  Copy,
  MessageSquare,
  Share2,
  Download,
} from 'lucide-react-native';

const ShareInviteScreen = ({ navigation, route }) => {
  // Valores recebidos através do React Navigation
  const {
    inviteCode = 'HZ-4029',
    shareUrl = 'horizonte.co.mz/convite/hz-4029',
  } = route?.params || {};

  // Copiar link
  const handleCopyLink = async () => {
    try {
      // Para copiar realmente para o clipboard,
      // recomendamos instalar expo-clipboard.
      Alert.alert(
        'Sucesso',
        'Link copiado para a área de transferência!'
      );
    } catch (error) {
      console.error('Erro ao copiar link:', error);
    }
  };

  // Partilha nativa do dispositivo
  const handleShareNative = async () => {
    try {
      await Share.share({
        message:
          `Passe de Acesso - Edifício Horizonte Azul (Apto 402)\n` +
          `Código: ${inviteCode}\n` +
          `Aceda ao passe: https://${shareUrl}`,
      });
    } catch (error) {
      console.error('Erro ao partilhar:', error);
    }
  };

  // Guardar imagem
  const handleSaveImage = () => {
    Alert.alert(
      'Guardado',
      'Imagem do passe guardada na sua galeria.'
    );
  };

  // Voltar
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <ArrowLeft
            size={18}
            color="#1e3a8a"
          />

          <Text style={styles.backButtonText}>
            Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Partilhar Convite
        </Text>

        <View style={styles.unitBadge}>
          <Text style={styles.unitBadgeText}>
            Apto 402
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* CARTÃO DIGITAL DE ACESSO */}
        <View style={styles.cardAccessContainer}>

          {/* Banner */}
          <View style={styles.cardHeaderBanner}>

            <Building2
              size={16}
              color="#ffffff"
            />

            <View style={styles.bannerBuildingInfo}>
              <Text style={styles.bannerTitle}>
                Edifício Horizon Azul
              </Text>

              <Text style={styles.bannerSubtitle}>
                Apto 402 · Bloco B · 4º Andar
              </Text>
            </View>

            <View style={styles.validBadge}>
              <Text style={styles.validBadgeText}>
                ● Válido
              </Text>
            </View>
          </View>

          {/* BODY */}
          <View style={styles.cardBody}>

            <Text style={styles.hostSubtitle}>
              CONVIDADO POR ANITA SHARMA
            </Text>

            <Text style={styles.visitorName}>
              Carlos Manuel Tembe
            </Text>

            {/* Informação */}
            <View style={styles.detailsRow}>

              <View style={styles.detailItem}>

                <View style={styles.detailLabelRow}>
                  <Calendar
                    size={12}
                    color="#64748b"
                  />

                  <Text style={styles.detailLabel}>
                    Data
                  </Text>
                </View>

                <Text style={styles.detailValue}>
                  Hoje, 09/12/2026
                </Text>
              </View>

              <View style={styles.detailItem}>

                <View style={styles.detailLabelRow}>
                  <Clock
                    size={12}
                    color="#64748b"
                  />

                  <Text style={styles.detailLabel}>
                    Hora Prevista
                  </Text>
                </View>

                <Text style={styles.detailValue}>
                  19:30
                </Text>
              </View>

            </View>

            {/* QR CODE */}
            <View style={styles.qrCodeBox}>
              <QrCode
                size={110}
                color="#1e3a8a"
                strokeWidth={1.5}
              />
            </View>

            {/* CÓDIGO */}
            <View style={styles.codePill}>
              <Text style={styles.codeText}>
                CÓDIGO: {inviteCode}
              </Text>
            </View>

            <Text style={styles.codeHint}>
              Apresentar na recepção ou scan no leitor de acesso
            </Text>

          </View>
        </View>

        {/* PARTILHAR POR LINK */}
        <View style={styles.actionCard}>

          <Text style={styles.actionTitle}>
            🔗 Partilhar por Link
          </Text>

          <Text style={styles.actionDescription}>
            Envie o link direto seguro para o visitante
            aceder ao passe pelo navegador.
          </Text>

          <View style={styles.linkCopyRow}>

            <TextInput
              style={styles.linkField}
              value={shareUrl}
              editable={false}
              selectTextOnFocus={true}
            />

            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopyLink}
              activeOpacity={0.8}
            >
              <Copy
                size={13}
                color="#ffffff"
              />

              <Text style={styles.copyButtonText}>
                Copiar
              </Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={handleShareNative}
            activeOpacity={0.8}
          >
            <MessageSquare
              size={14}
              color="#1e3a8a"
            />

            <Text style={styles.whatsappButtonText}>
              Partilhar Link via WhatsApp / Mensagem
            </Text>
          </TouchableOpacity>

        </View>

        {/* PARTILHAR POR IMAGEM */}
        <View style={styles.actionCard}>

          <Text style={styles.actionTitle}>
            🖼 Partilhar por Imagem
          </Text>

          <Text style={styles.actionDescription}>
            Guarde o cartão visual completo na galeria
            ou partilhe diretamente como foto.
          </Text>

          <TouchableOpacity
            style={styles.primaryActionButton}
            onPress={handleShareNative}
            activeOpacity={0.85}
          >
            <Share2
              size={14}
              color="#ffffff"
            />

            <Text style={styles.primaryActionButtonText}>
              Partilhar Imagem
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryActionButton}
            onPress={handleSaveImage}
            activeOpacity={0.8}
          >
            <Download
              size={14}
              color="#1e293b"
            />

            <Text style={styles.secondaryActionButtonText}>
              Guardar como Imagem
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#faf8ff',
  },

  header: {
    height: 56,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  backButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e3a8a',
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
  },

  unitBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  unitBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 14,
    gap: 12,
    paddingBottom: 28,
  },

  cardAccessContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,

    elevation: 2,
  },

  cardHeaderBanner: {
    backgroundColor: '#1e3a8a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },

  bannerBuildingInfo: {
    flex: 1,
  },

  bannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },

  bannerSubtitle: {
    fontSize: 10,
    color: '#93c5fd',
  },

  validBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  validBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },

  cardBody: {
    padding: 16,
    alignItems: 'center',
  },

  hostSubtitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
  },

  visitorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
    marginBottom: 12,
  },

  detailsRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  detailItem: {
    flex: 1,
  },

  detailLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  detailLabel: {
    fontSize: 9,
    color: '#64748b',
  },

  detailValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 2,
  },

  qrCodeBox: {
    width: 130,
    height: 130,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  codePill: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    marginBottom: 4,
  },

  codeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e3a8a',
    letterSpacing: 0.5,
  },

  codeHint: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },

  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    gap: 10,
  },

  actionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },

  actionDescription: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 16,
  },

  linkCopyRow: {
    flexDirection: 'row',
    gap: 8,
  },

  linkField: {
    flex: 1,
    height: 38,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 11,
    color: '#334155',
  },

  copyButton: {
    height: 38,
    backgroundColor: '#1e3a8a',
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  copyButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },

  whatsappButton: {
    height: 38,
    backgroundColor: '#e0e7ff',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  whatsappButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e3a8a',
  },

  primaryActionButton: {
    height: 38,
    backgroundColor: '#1e3a8a',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  primaryActionButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },

  secondaryActionButton: {
    height: 38,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  secondaryActionButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e293b',
  },

});

export default ShareInviteScreen;
