import React from 'react';
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
  Pencil,
  Phone,
  Mail,
  Home,
} from 'lucide-react-native';
 import { useState, useEffect } from 'react';

export default function ResidentDashboardScreen({ navigation, route }) {
  // const {loginToken} = route.params ?? {}
  const [dashboard_data, setDashboard_data] = useState([])

  useEffect(() => {
    fetch(
      // setDashboard_data(fetch_dashboard(1)))
        `http://127.0.0.1:8000/building/auth/client/dashboard/get/${1}`)
        .then((res) => res.json())
        .then((data) => setDashboard_data(data))
  },[])

  console.log('DATA: ', dashboard_data['member'])




  // =========================================================
  // NAVEGAÇÃO
  // =========================================================
  const handleEditProfile = () => {
    navigation.navigate('Profile');
  };

  const handleNavigateToInvites = () => {
    navigation.navigate('Invites');
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      {/* =====================================================
          TOP HEADER
      ====================================================== */}
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

      {/* =====================================================
          CONTEÚDO PRINCIPAL
      ====================================================== */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ===================================================
            CARTÃO 1: PERFIL DO MORADOR
        ==================================================== */}
        <View style={styles.card}>

          <View style={styles.profileHeaderRow}>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
                }}
                style={styles.avatarImage}
              />
            </View>

            {/* Informações */}
            <View style={styles.profileInfo}>
              <Text style={styles.residentName}>
                {dashboard_data['member'].name } { dashboard_data['member'].surname}
              </Text>

              <Text style={styles.docIdText}>
                BI: {dashboard_data['member'].doc_id}
              </Text>
            </View>

            {/* Editar */}
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

          {/* =================================================
              CONTACTOS
          ================================================== */}
          <View style={styles.contactsRow}>

            {/* Telefone */}
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
                  {dashboard_data['member'].phone}
                </Text>
              </View>
            </View>

            {/* E-mail */}
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
                  {dashboard_data['member'].email}
                </Text>
              </View>
            </View>

          </View>
        </View>

        {/* ===================================================
            CARTÃO 2: DADOS DO APARTAMENTO
        ==================================================== */}
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

          {/* Piso / Bloco + Número */}
          <View style={styles.twoColumnRow}>

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxLabel}>
                PISO / BLOCO
              </Text>

              <Text style={styles.infoBoxValueDark}>
                {dashboard_data['apartment'].floor}
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxLabel}>
                NÚMERO
              </Text>

              <Text style={styles.infoBoxValuePrimary}>
                Apto: {dashboard_data['apartment'].number}
              </Text>
            </View>

          </View>

          {/* Tipo */}
          <View style={styles.subInfoBox}>

            <View style={styles.subInfoTop}>
              <Text style={styles.infoBoxLabel}>
                TIPO
              </Text>

              <Text style={styles.subInfoValue}>
                {dashboard_data['apartment'].type}
              </Text>
            </View>

            <Text style={styles.descriptionText}>
              {dashboard_data['apartment'].description}
            </Text>

          </View>

        </View>

        {/* ===================================================
            CARTÃO 3: DADOS DO EDIFÍCIO
        ==================================================== */}
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

          {/* Informações principais */}
          <View style={styles.buildingHeader}>

            <Text style={styles.buildingName}>
              {dashboard_data['building'].name}
            </Text>

            <Text style={styles.descriptionText}>
              {dashboard_data['building'].description}
            </Text>

          </View>

          {/* =================================================
              CONTACTOS DO EDIFÍCIO
          ================================================== */}
          <View style={styles.keyValueList}>

            <View style={styles.keyValueRow}>
              <Text style={styles.keyText}>
                Telefone
              </Text>

              <Text style={styles.valueText}>
                {dashboard_data['contact'].phone}
              </Text>
            </View>

            <View style={styles.keyValueRow}>
              <Text style={styles.keyText}>
                E-mail
              </Text>

              <Text
                style={[
                  styles.valueText,
                  styles.linkText,
                ]}
              >
                {dashboard_data['contact'].email}
              </Text>
            </View>

            <View style={styles.keyValueRow}>
              <Text style={styles.keyText}>
                Website
              </Text>

              <Text
                style={[
                  styles.valueText,
                  styles.linkText,
                ]}
              >
                {dashboard_data['contact'].website}
              </Text>
            </View>

          </View>

          {/* =================================================
              ENDEREÇO
          ================================================== */}
          <Text style={styles.sectionDividerLabel}>
            ENDEREÇO
          </Text>

          <View style={styles.twoColumnRow}>

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxLabel}>
                Província / Cidade
              </Text>

              <Text style={styles.infoBoxValueDark}>
                {dashboard_data['address'].province}
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxLabel}>
                Bairro
              </Text>

              <Text style={styles.infoBoxValueDark}>
                {dashboard_data['address'].nearby_hood}
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
              {dashboard_data['address'].avenue} {dashboard_data['address'].number}
            </Text>
          </View>

        </View>

      </ScrollView>

      {/* =====================================================
          NAVEGAÇÃO INFERIOR
      ====================================================== */}
      <View style={styles.bottomNav}>

        {/* Início */}
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

        {/* Convites */}
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

        {/* Perfil */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={handleNavigateToProfile}
          activeOpacity={0.7}
        >
          <User
            size={20}
            color="#64748b"
            strokeWidth={1.8}
          />

          <Text style={styles.navText}>
            Perfil
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}


// ===========================================================
// ESTILOS
// ===========================================================

const styles = StyleSheet.create({

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