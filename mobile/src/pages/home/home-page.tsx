import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import AppContext from '../../context/AppContext';
import PanelHome from '../../components/PanelHome/PanelHome';
import {Activity} from '../../types/activity';
import ContentList from '../../components/SectionActivityList/SectionActivityList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/app-routes';
import SectionCategoryList from '../../components/SectionCategoryList/SectionCategoryList';
import api from '../../lib/axios';
import {Category} from '../../types/category';
import Feather from 'react-native-vector-icons/Feather';

type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomePage'
>;

export default function HomePage() {
  const navigation = useNavigation<HomePageNavigationProp>();
  const {user} = useContext(AppContext);
  const [recomendations, setRecomendations] = useState<Activity[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;

  const fetchRecomendations = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.get(
        `/activities?page=0&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      if (response.data.activities?.length > 0) {
        const filtered = response.data.activities.filter(
          (activity: Activity) => activity.creator.id !== user?.id,
        );
        setRecomendations(filtered);
      }
    } catch (error) {
      console.error('Erro ao buscar atividades', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, isLoading]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get('/activities/types', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setCategoryList(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    }
  }, [user?.token]);

  useEffect(() => {
    if (!user) {
      navigation.reset({index: 0, routes: [{name: 'LoginPage'}]});
    }
  }, [user, navigation]);

  useEffect(() => {
    if (user?.token) {
      fetchRecomendations();
      fetchCategories();
    }
  }, [user?.token, fetchRecomendations, fetchCategories]);

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Home"
        onBackPress={() => navigation.goBack()}
        showBackButton={false}
        style={styles.header}>
        <View>
          <View>
            <View style={styles.elipse3} />
            <View style={styles.elipse4} />
          </View>
          <View style={styles.headercontainer}>
            <PanelHome
              mensage="Olá, seja bem vindo"
              user={{
                name: user?.name,
                avatar: user?.avatar,
                level: user?.level,
              }}
              onPress={() => navigation.navigate('PerfilPage')}
            />
          </View>
        </View>
      </CustomHeader>

      <View style={styles.content}>
        <View style={styles.containerRecommendations}>
          <ContentList
            title="Recomendações"
            activities={recomendations}
            renderAction={() => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ActivityPage', {
                    preferences: undefined,
                    categories: categoryList,
                  })
                }>
                <Text style={styles.buttonSeeMore}>Ver mais</Text>
              </TouchableOpacity>
            )}
            isHorizontal={false}
          />
        </View>

        <View style={styles.containerCategory}>
          <SectionCategoryList
            categories={categoryList}
            onCategoryPress={categoria => {
              navigation.navigate('ActivityPage', {
                preferences: [categoria.id],
                categories: categoryList,
              });
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          navigation.reset({index: 0, routes: [{name: 'LoginPage' as never}]})
        }>
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
