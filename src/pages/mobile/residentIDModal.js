import React from 'react';

import {
    Modal,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

import {
    X,
    User,
    Phone,
    Mail,
    Building2,
    Home,
    CreditCard,
} from 'lucide-react-native';


export default function ResidentIDModal({
    visible,
    onClose,
    resident,
    imageUri,
}) {

    if (!resident) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >

            <TouchableWithoutFeedback onPress={onClose}>

                <View style={styles.overlay}>

                    <TouchableWithoutFeedback>

                        <View style={styles.card}>

                            {/* HEADER */}
                            <View style={styles.header}>

                                <View>
                                    <Text style={styles.title}>
                                        Cartão de Identificação
                                    </Text>

                                    <Text style={styles.subtitle}>
                                        Identificação do Anfitrião
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                    activeOpacity={0.7}
                                >
                                    <X
                                        size={18}
                                        color="#64748b"
                                    />
                                </TouchableOpacity>

                            </View>


                            {/* FOTO */}
                            <View style={styles.photoSection}>

                                <View style={styles.photoContainer}>

                                    {resident.photo_url ? (

                                        <Image
                                            source={{
                                                uri: resident.photo_url
                                            }}
                                            style={styles.photo}
                                        />

                                    ) : (

                                        <User
                                            size={42}
                                            color="#64748b"
                                        />

                                    )}

                                </View>

                                <Text style={styles.residentName}>
                                    {resident.name} {resident.surname}
                                </Text>

                                <Text style={styles.residentType}>
                                    ANFITRIÃO
                                </Text>

                            </View>


                            {/* DOCUMENTO */}
                            <View style={styles.infoSection}>

                                <View style={styles.infoRow}>

                                    <View style={styles.iconContainer}>
                                        <CreditCard
                                            size={17}
                                            color="#1e3a8a"
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.label}>
                                            DOCUMENTO DE IDENTIFICAÇÃO
                                        </Text>

                                        <Text style={styles.value}>
                                            {resident.doc_id}
                                        </Text>
                                    </View>

                                </View>


                                {/* TELEFONE */}
                                <View style={styles.infoRow}>

                                    <View style={styles.iconContainer}>
                                        <Phone
                                            size={17}
                                            color="#1e3a8a"
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.label}>
                                            TELEFONE
                                        </Text>

                                        <Text style={styles.value}>
                                            {resident.phone}
                                        </Text>
                                    </View>

                                </View>


                                {/* EMAIL */}
                                <View style={styles.infoRow}>

                                    <View style={styles.iconContainer}>
                                        <Mail
                                            size={17}
                                            color="#1e3a8a"
                                        />
                                    </View>

                                    <View style={styles.infoText}>
                                        <Text style={styles.label}>
                                            E-MAIL
                                        </Text>

                                        <Text style={styles.value}>
                                            {resident.email}
                                        </Text>
                                    </View>

                                </View>


                                {/* EDIFÍCIO */}
                                <View style={styles.infoRow}>

                                    <View style={styles.iconContainer}>
                                        <Building2
                                            size={17}
                                            color="#1e3a8a"
                                        />
                                    </View>

                                    <View style={styles.infoText}>

                                        <Text style={styles.label}>
                                            EDIFÍCIO
                                        </Text>

                                        <Text style={styles.value}>
                                            {resident.building_name}
                                        </Text>

                                    </View>

                                </View>


                                {/* APARTAMENTO */}
                                <View style={styles.infoRow}>

                                    <View style={styles.iconContainer}>
                                        <Home
                                            size={17}
                                            color="#1e3a8a"
                                        />
                                    </View>

                                    <View>

                                        <Text style={styles.label}>
                                            APARTAMENTO
                                        </Text>

                                        <Text style={styles.value}>
                                            {resident.apartment}
                                        </Text>

                                    </View>

                                </View>

                            </View>


                            {/* IMAGEM DA API */}
                            <View style={styles.apiImageSection}>

                                <Text style={styles.apiImageLabel}>
                                    IDENTIFICAÇÃO DIGITAL
                                </Text>

                                <View style={styles.apiImageContainer}>

                                    {imageUri ? (

                                        <Image
                                            source={{
                                                uri: imageUri
                                            }}
                                            style={styles.apiImage}
                                            resizeMode="contain"
                                        />

                                    ) : (

                                        <Text style={styles.noImageText}>
                                            Imagem não disponível
                                        </Text>

                                    )}

                                </View>

                            </View>


                        </View>

                    </TouchableWithoutFeedback>

                </View>

            </TouchableWithoutFeedback>

        </Modal>
    );
}
const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },

  card: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 28,
    maxHeight: '92%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },

  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },

  photoContainer: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  residentName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#0f172a',
  },

  residentType: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#1e3a8a',
  },

  infoSection: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 14,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  infoText: {
    flex: 1,
  },

  label: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 2,
  },

  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
  },

  apiImageSection: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
    marginTop: 2,
  },

  apiImageLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 8,
  },

  apiImageContainer: {
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  apiImage: {
    width: '100%',
    height: '100%',
  },

  noImageText: {
    fontSize: 12,
    color: '#94a3b8',
  },

});