import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Building2,
  KeyRound,
  User,
  IdCard,
  PlusCircle,
  Link,
  Image as ImageIcon,
  XCircle,
  Calendar,
  Clock,
} from 'lucide-react-native';
import ResidentIDModal from './residentIDModal';


export default function InvitesScreen({ navigation, route }) {
  const [idModalVisible, setIdModalVisible] = useState(false);
  const { token } = route.params ?? {}
  const navigationParams = {
    token
  }

  const [dataSet, setDataSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [visitorName, setVisitorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');


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
  const handleOpenID = () => {
    setIdModalVisible(true);
  };
  const handleCloseID = () => {
    setIdModalVisible(false);
  };



  /*
   * Histórico de convites
   *
   * Em JavaScript não precisamos declarar
   * interface ou type.
   */
  const historyItems = [
    {
      id: '1',
      visitorName: 'Marcos Macuácua',
      date: '12 Out, 10:00',
      status: 'Esperando Check Out',
    },
    {
      id: '2',
      visitorName: 'Sofia Ribeiro',
      date: 'Ontem, 14:00',
      status: 'Visita Concluída',
    },
    {
      id: '3',
      visitorName: 'Empresa Limpeza Express',
      date: '10 Out, 09:00',
      status: 'Convite Expirado',
    },
    {
      id: '4',
      visitorName: 'João Pedro Alves',
      date: '08 Out, 18:00',
      status: 'Convite Cancelado',
    },
  ];


  /*
   * Renderiza o estado do convite
   */
  const renderStatusBadge = (status) => {

    switch (status) {

      case 'Esperando Check In':

        return (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: '#eff6ff',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: '#2563eb',
                },
              ]}
            >
              ● {status}
            </Text>
          </View>
        );


      case 'Esperando Check Out':

        return (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: '#fef3c7',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: '#d97706',
                },
              ]}
            >
              {status}
            </Text>
          </View>
        );


      case 'Visita Concluída':

        return (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: '#dcfce7',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: '#16a34a',
                },
              ]}
            >
              {status}
            </Text>
          </View>
        );


      case 'Convite Expirado':

        return (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: '#f1f5f9',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: '#64748b',
                },
              ]}
            >
              {status}
            </Text>
          </View>
        );


      case 'Convite Cancelado':

        return (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: '#fee2e2',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: '#ef4444',
                },
              ]}
            >
              {status}
            </Text>
          </View>
        );


      default:

        return null;
    }
  };


  /*
   * Emitir convite
   */
  const handleCreateInvite = () => {

    if (!visitorName.trim()) {

      Alert.alert(
        'Atenção',
        'Introduza o nome do visitante.'
      );

      return;
    }


    if (!date.trim()) {

      Alert.alert(
        'Atenção',
        'Introduza a data da visita.'
      );

      return;
    }


    if (!time.trim()) {

      Alert.alert(
        'Atenção',
        'Introduza a hora da visita.'
      );

      return;
    }


    /*
     * Por enquanto apenas simulamos
     * a criação do convite.
     *
     * Posteriormente esta função poderá
     * chamar a API FastAPI.
     */

    Alert.alert(
      'Convite Emitido',
      `Convite criado para ${visitorName}.`
    );
  };


  /*
   * Partilhar link
   */
  const handleShareLink = () => {

    Alert.alert(
      'Partilhar Link',
      'A funcionalidade de partilha do link será implementada.'
    );
  };


  /*
   * Partilhar imagem
   */
  const handleShareImage = () => {

    Alert.alert(
      'Partilhar Imagem',
      'A funcionalidade de partilha da imagem será implementada.'
    );
  };


  /*
   * Cancelar convite
   */
  const handleCancelInvite = () => {

    Alert.alert(
      'Cancelar Convite',
      'Tem certeza de que deseja cancelar este convite?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: () => {

            Alert.alert(
              'Convite Cancelado',
              'O convite foi cancelado com sucesso.'
            );

          },
        },
      ]
    );
  };



  /*
   * Navegação
   */
  const goToHome = () => {

    navigation.navigate('ResidentDashboardScreen', {
      ...navigationParams
    });
  };

  const handleNavigateToID = () => {
    navigation.navigate('Identification');
  };


  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />


      {/* =====================================
          TOP BAR
          ===================================== */}

      <View style={styles.header}>

        <View style={styles.headerLeft}>

          <Building2
            size={20}
            color="#1e3a8a"
            strokeWidth={2.2}
          />

          <Text style={styles.headerTitle}>
            Gestão de Convites
          </Text>

        </View>


        <View style={styles.unitBadge}>

          <Text style={styles.unitBadgeText}>
            Apt { dataSet?.apartment?.number}
          </Text>

        </View>

      </View>


      {/* =====================================
          CONTEÚDO
          ===================================== */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >


        {/* =====================================
            1. CRIAR CONVITE
            ===================================== */}

        <View style={styles.card}>

          <View style={styles.cardHeaderRow}>

            <View style={styles.row}>

              <PlusCircle
                size={15}
                color="#1e3a8a"
              />

              <Text style={styles.cardSectionTitle}>
                Criar Convite
              </Text>

            </View>


            <Text style={styles.cardSubtitle}>
              Novo registo
            </Text>

          </View>


          {/* Nome */}
          <View style={styles.formGroup}>

            <Text style={styles.inputLabel}>
              Nome Completo
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: Carlos Manuel Tembe"
              placeholderTextColor="#94a3b8"
              value={visitorName}
              onChangeText={setVisitorName}
              autoCapitalize="words"
              autoCorrect={false}
            />

          </View>


          {/* Data + Hora */}
          <View style={styles.twoColumnRow}>

            {/* Data */}
            <View
              style={[
                styles.formGroup,
                {
                  flex: 1,
                },
              ]}
            >

              <Text style={styles.inputLabel}>
                Data
              </Text>

              <View style={styles.iconInputContainer}>

                <TextInput
                  placeholder='AAAA-MM-DD'
                  placeholderTextColor="#94a3b8"
                  style={styles.inputWithIcon}
                  value={date}
                  onChangeText={setDate}
                />

                <Calendar
                  size={15}
                  color="#64748b"
                  style={styles.inputIcon}
                />

              </View>

            </View>


            {/* Hora */}
            <View
              style={[
                styles.formGroup,
                {
                  flex: 1,
                },
              ]}
            >

              <Text style={styles.inputLabel}>
                Hora
              </Text>

              <View style={styles.iconInputContainer}>

                <TextInput
                  placeholder='HH:MM'
                  placeholderTextColor="#94a3b8"
                  style={styles.inputWithIcon}
                  value={time}
                  onChangeText={setTime}
                />

                <Clock
                  size={15}
                  color="#64748b"
                  style={styles.inputIcon}
                />

              </View>

            </View>

          </View>


          {/* Descrição */}
          <View style={styles.formGroup}>

            <Text style={styles.inputLabel}>
              Descrição
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: Almoço em família, Reunião de trabalho"
              placeholderTextColor="#94a3b8"
              value={description}
              onChangeText={setDescription}
              autoCapitalize="sentences"
              multiline={false}
            />

          </View>


          {/* Botão */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleCreateInvite}
            activeOpacity={0.85}
          >

            <Text style={styles.primaryButtonText}>
              Emitir Convite
            </Text>

          </TouchableOpacity>

        </View>


        {/* =====================================
            2. CONVITE ATUAL
            ===================================== */}

        <View style={styles.card}>

          <View style={styles.cardHeaderRow}>

            <Text style={styles.cardSectionTitle}>
              Convite Atual
            </Text>

            {renderStatusBadge(
              dataSet?.member?.visitors[0].status
            )}

          </View>


          <View style={styles.currentInviteInfo}>

            <Text style={styles.currentVisitorName}>
              {dataSet?.member?.visitors[0].name}
            </Text>

            <Text style={styles.currentVisitorMeta}>
              Data/Hora: {dataSet?.member?.visitors[0].date} / 
              {dataSet?.member?.visitors[0].time} 
            </Text>
            <Text style={styles.currentVisitorMeta}>
              * {dataSet?.member?.visitors[0].description}
            </Text>

          </View>


          {/* Botões */}
          <View style={styles.twoColumnRow}>

            {/* Partilhar Link */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleShareLink}
              activeOpacity={0.75}
            >

              <Link
                size={13}
                color="#1e3a8a"
              />

              <Text style={styles.secondaryButtonText}>
                Partilhar Link
              </Text>

            </TouchableOpacity>


            {/* Partilhar Imagem */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleShareImage}
              activeOpacity={0.75}
            >

              <ImageIcon
                size={13}
                color="#1e3a8a"
              />

              <Text style={styles.secondaryButtonText}>
                Partilhar Imagem
              </Text>

            </TouchableOpacity>

          </View>


          {/* Cancelar */}
          <TouchableOpacity
            style={styles.cancelLinkButton}
            onPress={handleCancelInvite}
            activeOpacity={0.7}
          >

            <XCircle
              size={13}
              color="#dc2626"
            />

            <Text style={styles.cancelLinkText}>
              Cancelar Convite
            </Text>

          </TouchableOpacity>

        </View>


        {/* =====================================
            3. HISTÓRICO
            ===================================== */}

        <View style={styles.card}>

          <View style={styles.cardHeaderRow}>

            <Text style={styles.historyTitle}>
              HISTÓRICO DE CONVITES
            </Text>

            <Text style={styles.historyCount}>
              {dataSet?.member?.visitors.length} convites
            </Text>

          </View>


          <View style={styles.historyList}>

            {dataSet?.member?.visitors.map(
              (item, index) => (

                <View
                  key={item.id}
                  style={[
                    styles.historyItemRow,

                    index < dataSet?.member?.visitors.length - 1
                      ? styles.historyItemBorder
                      : null,
                  ]}
                >
                  <View style={styles.historyItemLeft}>

                    <Text style={styles.historyVisitorName}>
                      {item.name}
                    </Text>

                    <Text style={styles.historyDate}>
                      {item.date} / {item.time}
                    </Text>

                  </View>


                  {renderStatusBadge(
                    item.status
                  )}

                </View>

              )
            )}

          </View>

        </View>

      </ScrollView>


      {/* =====================================
          BOTTOM NAVIGATION
          ===================================== */}

      <View style={styles.bottomNav}>

        {/* Início */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={goToHome}
          activeOpacity={0.7}
        >

          <Building2
            size={20}
            color="#64748b"
            strokeWidth={1.8}
          />

          <Text style={styles.navText}>
            Início
          </Text>

        </TouchableOpacity>


        {/* Convites */}
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
        >

          <KeyRound
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
            Convites
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


/* =========================================
   STYLES
   ========================================= */

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


  /* Header */
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


  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },


  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
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


  /* Container */
  container: {
    flex: 1,
  },


  scrollContent: {
    padding: 14,
    gap: 12,
    paddingBottom: 24,
  },


  /* Card */
  card: {
    backgroundColor: '#ffffff',

    borderRadius: 12,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    padding: 14,
  },


  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 10,
  },


  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },


  cardSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },


  cardSubtitle: {
    fontSize: 10,
    color: '#64748b',
  },


  /* Form */
  formGroup: {
    marginBottom: 10,
    gap: 4,
  },


  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },


  input: {
    height: 38,

    backgroundColor: '#ffffff',

    borderWidth: 1,
    borderColor: '#cbd5e1',

    borderRadius: 6,

    paddingHorizontal: 10,

    fontSize: 12,
    color: '#0f172a',
  },


  /* Data / Hora */
  twoColumnRow: {
    flexDirection: 'row',
    gap: 8,
  },


  iconInputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },


  inputWithIcon: {
    height: 38,

    backgroundColor: '#ffffff',

    borderWidth: 1,
    borderColor: '#cbd5e1',

    borderRadius: 6,

    paddingHorizontal: 10,
    paddingRight: 32,

    fontSize: 12,
    color: '#0f172a',
  },


  inputIcon: {
    position: 'absolute',
    right: 10,
  },


  /* Botão principal */
  primaryButton: {
    height: 40,

    backgroundColor: '#1e3a8a',

    borderRadius: 6,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 4,
  },


  primaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },


  /* Convite atual */
  currentInviteInfo: {
    marginBottom: 12,
  },


  currentVisitorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },


  currentVisitorMeta: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },


  /* Botões secundários */
  secondaryButton: {
    flex: 1,

    height: 36,

    backgroundColor: '#f1f5f9',

    borderRadius: 6,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 6,
  },


  secondaryButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e3a8a',
  },


  /* Cancelar */
  cancelLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 5,

    marginTop: 10,
    paddingVertical: 4,
  },


  cancelLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#dc2626',
  },


  /* Histórico */
  historyTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.3,
  },


  historyCount: {
    fontSize: 10,
    color: '#64748b',
  },


  historyList: {
    marginTop: 2,
  },


  historyItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 9,
  },


  historyItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },


  historyItemLeft: {
    flex: 1,
  },


  historyVisitorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },


  historyDate: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 1,
  },


  /* Status */
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },


  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },


  /* Bottom Navigation */
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