import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  X,
  Camera,
  Check,
} from 'lucide-react-native';


// ==============================================================================
// 1. MODAL EDITAR MORADOR
// ==============================================================================

export default function EditProfileModal  ({
  visible,
  onClose,
  onSave,
  navigation,
  route 
}) {
  const { token } = route.params ?? {}
  const navigationParams = {
    token
  }
  

  const [docId, setDocId] = useState('110293847582M');
  const [nome, setNome] = useState('Anita');
  const [apelido, setApelido] = useState('Sharma');
  const [telefone, setTelefone] = useState('+258 82 998 8776');
  const [email, setEmail] = useState(
    'anita.sharma@horizonte.co.mz'
  );


  const handleSave = () => {

    const data = {
      docId,
      nome,
      apelido,
      telefone,
      email,
    };

    if (onSave) {
      onSave(data);
    }
  };


  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >

      <TouchableWithoutFeedback onPress={onClose}>

        <View style={styles.modalOverlay}>

          <TouchableWithoutFeedback>

            <View style={styles.bottomSheetContainer}>

              {/* Grabber */}
              <View style={styles.grabber} />


              {/* Header */}
              <View style={styles.modalHeader}>

                <View>

                  <Text style={styles.modalTitle}>
                    Editar Morador
                  </Text>

                  <Text style={styles.modalSubtitle}>
                    Atualize os seus dados pessoais de perfil
                  </Text>

                </View>


                <TouchableOpacity
                  style={styles.closeIconButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >

                  <X
                    size={16}
                    color="#64748b"
                  />

                </TouchableOpacity>

              </View>


              {/* FOTO DE PERFIL */}
              <View style={styles.photoUploadRow}>

                <View style={styles.photoContainer}>

                  <Image
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
                    }}
                    style={styles.photoImage}
                  />

                  <View style={styles.cameraIconBadge}>

                    <Camera
                      size={10}
                      color="#ffffff"
                    />

                  </View>

                </View>


                <View style={styles.photoDetails}>

                  <Text style={styles.photoLabel}>
                    Foto de perfil
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                  >

                    <Text style={styles.changePhotoText}>
                      Alterar fotografia
                    </Text>

                  </TouchableOpacity>

                  <Text style={styles.photoHint}>
                    JPG, PNG até 5MB
                  </Text>

                </View>

              </View>


              {/* FORMULÁRIO */}
              <View style={styles.fieldsContainer}>

                {/* Documento */}
                <View style={styles.fieldGroup}>

                  <Text style={styles.fieldLabel}>
                    DOC.-ID (IDENTIFICAÇÃO)
                  </Text>

                  <TextInput
                    style={styles.textInput}
                    value={docId}
                    onChangeText={setDocId}
                    placeholder="Número do documento"
                  />

                </View>


                {/* Nome + Apelido */}
                <View style={styles.twoColumnRow}>

                  <View
                    style={[
                      styles.fieldGroup,
                      { flex: 1 },
                    ]}
                  >

                    <Text style={styles.fieldLabel}>
                      NOME
                    </Text>

                    <TextInput
                      style={styles.textInput}
                      value={nome}
                      onChangeText={setNome}
                      placeholder="Nome"
                    />

                  </View>


                  <View
                    style={[
                      styles.fieldGroup,
                      { flex: 1 },
                    ]}
                  >

                    <Text style={styles.fieldLabel}>
                      APELIDO
                    </Text>

                    <TextInput
                      style={styles.textInput}
                      value={apelido}
                      onChangeText={setApelido}
                      placeholder="Apelido"
                    />

                  </View>

                </View>


                {/* Telefone */}
                <View style={styles.fieldGroup}>

                  <Text style={styles.fieldLabel}>
                    TELEFONE
                  </Text>

                  <TextInput
                    style={styles.textInput}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    placeholder="Telefone"
                  />

                </View>


                {/* Email */}
                <View style={styles.fieldGroup}>

                  <Text style={styles.fieldLabel}>
                    E-MAIL
                  </Text>

                  <TextInput
                    style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="E-mail"
                  />

                </View>

              </View>


              {/* AÇÕES */}
              <View style={styles.actionGroup}>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                  activeOpacity={0.85}
                >

                  <Check
                    size={16}
                    color="#ffffff"
                    style={{ marginRight: 6 }}
                  />

                  <Text style={styles.saveButtonText}>
                    Guardar Alterações
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.cancelTextButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >

                  <Text style={styles.cancelTextButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>

              </View>

            </View>

          </TouchableWithoutFeedback>

        </View>

      </TouchableWithoutFeedback>

    </Modal>
  );
};


// ==============================================================================
// ESTILOS
// ==============================================================================

const styles = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },


  bottomSheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 28,
  },


  grabber: {
    width: 38,
    height: 4,
    backgroundColor: '#cbd5e1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },


  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },


  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },


  modalSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },


  closeIconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },


  photoUploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    gap: 12,
  },


  photoContainer: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'visible',
  },


  photoImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },


  cameraIconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },


  photoDetails: {
    gap: 1,
  },


  photoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e293b',
  },


  changePhotoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e3a8a',
  },


  photoHint: {
    fontSize: 9,
    color: '#94a3b8',
  },


  fieldsContainer: {
    gap: 10,
    marginBottom: 18,
  },


  fieldGroup: {
    gap: 3,
  },


  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },


  textInput: {
    height: 38,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#0f172a',
  },


  twoColumnRow: {
    flexDirection: 'row',
    gap: 8,
  },


  actionGroup: {
    gap: 8,
  },


  saveButton: {
    height: 42,
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },


  saveButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },


  cancelTextButton: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },


  cancelTextButtonText: {
    fontSize: 12,
    color: '#64748b',
  },


  // ============================================================================
  // MODAL CANCELAR CONVITE
  // ============================================================================

  cancelDialogContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 'auto',
    marginTop: 'auto',
    borderRadius: 16,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 6,
  },


  cancelHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },


  warningIconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },


  cancelTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },


  cancelSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 3,
  },


  visitorSummaryBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },


  visitorSummaryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },


  visitorSummaryMeta: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },


  alertNoticeBox: {
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },


  alertNoticeText: {
    fontSize: 11,
    color: '#991b1b',
    lineHeight: 15,
    textAlign: 'center',
  },


  cancelActions: {
    gap: 8,
  },


  confirmCancelButton: {
    height: 42,
    backgroundColor: '#dc2626',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },


  confirmCancelButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },


  dismissButton: {
    height: 38,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },


  dismissButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },

});