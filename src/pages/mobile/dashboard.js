import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';

import {
  Building2,
  KeyRound,
  User,
  IdCard,
  Pencil,
  Phone,
  Mail,
  Home,
} from 'lucide-react-native';
import EditProfileModal from './editProfileModal';
import ResidentIDModal from './residentIDModal';

export default function ResidentDashboardScreen({ navigation, route }) {
  const [editProfileVisible, setEditProfileVisible] = useState(false)
  const [idModalVisible, setIdModalVisible] = useState(false);

  const { token } = route.params ?? {};
  const navigationParams = {
    token
  }

  const [dataSet, setDataSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchDashboard = async (token) => {

      try {

        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://192.168.0.181:80/building/clients/members/dashboard/get/${token}`
        );

        if (!response.ok) {

          const errorData = await response
            .json()
            .catch(() => null);

          throw new Error(
            errorData?.detail ||
            `Erro HTTP ${response.status}`
          );
        }
        // const data = JSON.stringify(dados, null, 2);
        const data = await response.json();
        // console.log('TESTE: ',data.member)

        setDataSet(data);

      } catch (error) {

        console.error(
          'Erro ao carregar dashboard:',
          error
        );

        setError(error.message);

      } finally {

        setLoading(false);

      }

    };

    fetchDashboard(token.access_token);

  }, []);



  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.centerContainer}>

          <Text style={styles.loadingText}>
            A carregar dados...
          </Text>

        </View>

      </SafeAreaView>
    );

  }


  // =========================================================
  // ERRO
  // =========================================================

  if (error) {

    return (
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.centerContainer}>

          <Text style={styles.errorTitle}>
            Erro ao carregar o painel
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>

        </View>

      </SafeAreaView>
    );

  }


  // =========================================================
  // SEM DADOS
  // =========================================================

  if (!dataSet) {

    return (
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.centerContainer}>

          <Text>
            Nenhum dado encontrado.
          </Text>

        </View>

      </SafeAreaView>
    );

  }

  // =========================================================
  // MODALS
  // =========================================================
  const handleEditProfile = () => {
    setEditProfileVisible(true)
  };
  const handleCloseEditProfile = () => {
    setEditProfileVisible(false)
  };
  const handleSaveProfile = () => {
    console.log('Funcao por sem implementada')
  }

  const handleOpenID = () => {
    setIdModalVisible(true);
  };
  const handleCloseID = () => {
    setIdModalVisible(false);
  };


  // =========================================================
  // NAVEGAÇÃO
  // =========================================================

  // const handleEditProfile = () => {
  //   navigation.navigate('EditProfileModal', {
  //     ...navigationParams
  //   });
  // };

  const handleNavigateToInvites = () => {
    navigation.navigate('InvitesScreen', {
      ...navigationParams
    });
  };

  const handleNavigateToID = () => {
    navigation.navigate('Identification', {
      ...navigationParams
    });
  };


  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      <View style={styles.header}>

        <Building2
          size={20}
          color="#1e3a8a"
          strokeWidth={2.2}
        />

        <Text style={styles.headerTitle}>
          Painel do Morador
        </Text>

      </View>


      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.card}>

          <View style={styles.profileHeaderRow}>

            <View style={styles.avatarContainer}>

              <Image
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
                }}
                style={styles.avatarImage}
              />

            </View>


            <View style={styles.profileInfo}>

              <Text style={styles.residentName}>

                {dataSet?.member?.name}{' '}

                {dataSet?.member?.surname}

              </Text>


              <Text style={styles.docIdText}>

                BI: {dataSet?.member?.doc_id}

              </Text>

            </View>


            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
              activeOpacity={0.7}
            >

              <Pencil
                size={13}
                color="#1e3a8a"
              />

              <Text style={styles.editButtonText}>
                Editar
              </Text>

            </TouchableOpacity>

          </View>


          <View style={styles.contactsRow}>

            <View style={styles.contactBadge}>

              <Phone
                size={14}
                color="#64748b"
              />

              <View>

                <Text style={styles.contactLabel}>
                  Telefone
                </Text>

                <Text style={styles.contactValue}>
                  {dataSet?.member?.phone}
                </Text>

              </View>

            </View>


            <View style={styles.contactBadge}>

              <Mail
                size={14}
                color="#64748b"
              />

              <View>

                <Text style={styles.contactLabel}>
                  E-mail
                </Text>

                <Text style={styles.contactValue}>
                  {dataSet?.member?.email}
                </Text>

              </View>

            </View>

          </View>

        </View>


        {/* APARTAMENTO */}

        <View style={styles.card}>

          <View style={styles.cardTitleRow}>

            <Home
              size={18}
              color="#1e3a8a"
            />

            <Text style={styles.cardTitle}>
              Dados do Apartamento
            </Text>

          </View>


          <View style={styles.twoColumnRow}>

            <View style={styles.infoBox}>

              <Text style={styles.infoBoxLabel}>
                PISO / BLOCO
              </Text>

              <Text style={styles.infoBoxValueDark}>
                {dataSet?.apartment?.floor}
              </Text>

            </View>


            <View style={styles.infoBox}>

              <Text style={styles.infoBoxLabel}>
                NÚMERO
              </Text>

              <Text style={styles.infoBoxValuePrimary}>
                Apto: {dataSet?.apartment?.number}
              </Text>

            </View>

          </View>


          <View style={styles.subInfoBox}>

            <View style={styles.subInfoTop}>

              <Text style={styles.infoBoxLabel}>
                TIPO
              </Text>

              <Text style={styles.subInfoValue}>
                {dataSet?.apartment?.type}
              </Text>

            </View>

            <Text style={styles.descriptionText}>
              {dataSet?.apartment?.description}
            </Text>

          </View>

        </View>


        {/* EDIFÍCIO */}

        <View style={styles.card}>

          <View style={styles.cardTitleRow}>

            <Building2
              size={18}
              color="#1e3a8a"
            />

            <Text style={styles.cardTitle}>
              Dados do Edifício
            </Text>

          </View>


          <View style={styles.buildingHeader}>

            <Text style={styles.buildingName}>
              {dataSet?.building?.name}
            </Text>

            <Text style={styles.descriptionText}>
              {dataSet?.building?.description}
            </Text>

          </View>


          <View style={styles.keyValueList}>

            <View style={styles.keyValueRow}>

              <Text style={styles.keyText}>
                Telefone
              </Text>

              <Text style={styles.valueText}>
                {dataSet?.contact?.phone}
              </Text>

            </View>


            <View style={styles.keyValueRow}>

              <Text style={styles.keyText}>
                E-mail
              </Text>

              <Text style={styles.valueText}>
                {dataSet?.contact?.email}
              </Text>

            </View>


            <View style={styles.keyValueRow}>

              <Text style={styles.keyText}>
                Website
              </Text>

              <Text style={styles.valueText}>
                {dataSet?.contact?.website}
              </Text>

            </View>

          </View>


          <Text style={styles.sectionDividerLabel}>
            ENDEREÇO
          </Text>


          <View style={styles.twoColumnRow}>

            <View style={styles.infoBox}>

              <Text style={styles.infoBoxLabel}>
                Província / Cidade
              </Text>

              <Text style={styles.infoBoxValueDark}>
                {dataSet?.address?.province}
              </Text>

            </View>


            <View style={styles.infoBox}>

              <Text style={styles.infoBoxLabel}>
                Bairro
              </Text>

              <Text style={styles.infoBoxValueDark}>
                {dataSet?.address?.nearby_hood}
              </Text>

            </View>

          </View>


          <View
            style={[
              styles.infoBox,
              styles.addressBox,
            ]}
          >

            <Text style={styles.infoBoxLabel}>
              Avenida & Número
            </Text>

            <Text style={styles.infoBoxValueDark}>

              {dataSet?.address?.avenue}{' '}

              {dataSet?.address?.number}

            </Text>

          </View>

        </View>

      </ScrollView>


      {/* NAVEGAÇÃO */}

      <View style={styles.bottomNav}>

        <TouchableOpacity
          style={styles.navItem}
          onPress={handleNavigateToInvites}
          activeOpacity={0.7}
        >

          <KeyRound
            size={20}
            color="#64748b"
            strokeWidth={1.8}
          />

          <Text style={styles.navText}>
            Convites
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
        >

          <Building2
            size={20}
            color="#1e3a8a"
            strokeWidth={2.4}
          />

          <Text
            style={[
              styles.navText,
              styles.navTextActive,
            ]}
          >
            Início
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={handleOpenID}
          activeOpacity={0.7}
        >

          <IdCard
            size={30}
            color="#64748b"
            strokeWidth={1.8}
          />

          <Text style={styles.navText}>
            ID
          </Text>

        </TouchableOpacity>

      </View>
      <EditProfileModal
        visible={editProfileVisible}
        onClose={handleCloseEditProfile}
        onSave={handleSaveProfile}
      />

      <ResidentIDModal
        visible={idModalVisible}
        onClose={handleCloseID}
        resident={{
          name: dataSet?.member?.name,
          surname: dataSet?.member?.surname,
          doc_id: dataSet?.member?.doc_id,
          phone: dataSet?.member?.phone,
          email: dataSet?.member?.email,
          building_name: dataSet?.building?.name,
          apartment: dataSet?.apartment?.number,
          photo_url: dataSet?.member?.photo_url,
        }}
        imageUri={dataSet?.member?.barcode_url}
      />

    </SafeAreaView>


  );

}

// ===========================================================
// ESTILOS
// ===========================================================

const styles = StyleSheet.create({

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 8,
  },

  errorText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#faf8ff',
  },

  // ---------------------------------------------------------
  // HEADER
  // ---------------------------------------------------------

  header: {
    height: 56,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },

  // ---------------------------------------------------------
  // CONTAINER
  // ---------------------------------------------------------

  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 14,
    gap: 12,
    paddingBottom: 24,
  },

  // ---------------------------------------------------------
  // CARD
  // ---------------------------------------------------------

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
  },

  // ---------------------------------------------------------
  // PERFIL
  // ---------------------------------------------------------

  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#e2e8f0',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },

  residentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },

  docIdText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  editButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e3a8a',
  },

  // ---------------------------------------------------------
  // CONTACTOS
  // ---------------------------------------------------------

  contactsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },

  contactBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },

  contactLabel: {
    fontSize: 9,
    color: '#64748b',
  },

  contactValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e293b',
  },

  // ---------------------------------------------------------
  // TÍTULO DOS CARDS
  // ---------------------------------------------------------

  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },

  // ---------------------------------------------------------
  // DUAS COLUNAS
  // ---------------------------------------------------------

  twoColumnRow: {
    flexDirection: 'row',
    gap: 8,
  },

  infoBox: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 9,
  },

  addressBox: {
    marginTop: 8,
  },

  infoBoxLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748b',
  },

  infoBoxValueDark: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },

  infoBoxValuePrimary: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e3a8a',
    marginTop: 2,
  },

  // ---------------------------------------------------------
  // SUB INFORMAÇÃO
  // ---------------------------------------------------------

  subInfoBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },

  subInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  subInfoValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0f172a',
  },

  descriptionText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },

  // ---------------------------------------------------------
  // EDIFÍCIO
  // ---------------------------------------------------------

  buildingHeader: {
    marginBottom: 10,
  },

  buildingName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },

  keyValueList: {
    gap: 6,
    marginVertical: 10,
  },

  keyValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  keyText: {
    fontSize: 11,
    color: '#64748b',
  },

  valueText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0f172a',
  },

  linkText: {
    color: '#1e3a8a',
  },

  sectionDividerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 6,
  },

  // ---------------------------------------------------------
  // NAVEGAÇÃO INFERIOR
  // ---------------------------------------------------------

  bottomNav: {
    height: 56,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 2,
  },

  navText: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },

  navTextActive: {
    color: '#1e3a8a',
    fontWeight: '700',
  },

});