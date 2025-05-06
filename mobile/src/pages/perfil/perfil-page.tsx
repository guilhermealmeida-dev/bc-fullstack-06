import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/app-routes';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import CustomImage from '../../components/CustomImage/CustomImage';
import BackButton from '../../components/BackButton/BackButton';
import CustomTitle from '../../components/CustomTitle/CustomTItle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SectionActivityList from '../../components/SectionActivityList/SectionActivityList';
import api from '../../lib/axios';
import SectionCard from '../../components/SectionCardList/SectionCardList';
import { useApp } from '../../hooks/useApp';

type PerfilPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomePage'
>;

function PerfilPage() {
  const navigation = useNavigation<PerfilPageNavigationProp>();
  const {user} = useApp();

  const [userActivities, setUserActivities] = useState([]);
  const [participantActivities, setParticipantActivities] = useState([]);

  const fetchUserActivities = useCallback(async () => {
    try {
      const response = await api.get('/activities/user/creator/all', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUserActivities(response.data);
    } catch (error) {
      console.error('Erro ao buscar atividades do usuário:', error);
    }
  }, [user?.token]);

  const fetchParticipantActivities = useCallback(async () => {
    try {
      const response = await api.get('/activities/user/participant/all', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setParticipantActivities(response.data);
    } catch (error) {
      console.error('Erro ao buscar atividades inscritas:', error);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchUserActivities();
    fetchParticipantActivities();
  }, [fetchUserActivities, fetchParticipantActivities]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Home"
        onBackPress={() => navigation.goBack()}
        showBackButton={false}
        style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.headerNavigation}>
            <View style={styles.headerContainerBack}>
              <BackButton />
            </View>
            <CustomTitle>{'Perfil'}</CustomTitle>
            <View style={styles.headerContainerIcons}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  size={25}
                  color="#000"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="logout" size={25} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerContent}>
            <CustomImage url={user?.avatar} style={styles.headerImageProfile} />
            <CustomTitle style={styles.headerUserName}>
              {user?.name}
            </CustomTitle>
          </View>
        </View>
      </CustomHeader>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SectionCard />

          <SectionActivityList
            title="Suas Atividades"
            isHorizontal
            activities={userActivities}
          />
          <SectionActivityList
            title="Histórico de atividades"
            activities={participantActivities}
            isHorizontal
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PerfilPage;
