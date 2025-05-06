import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import {SafeAreaView, View} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SectionCategoryList from '../../components/SectionCategoryList/SectionCategoryList';
import SectionActivityList from '../../components/SectionActivityList/SectionActivityList';
import {styles} from './style';
import {Category} from '../../types/category';
import {Activity} from '../../types/activity';
import {RootStackParamList} from '../../routes/app-routes';
import api from '../../lib/axios';
import CustomTitle from '../../components/CustomTitle/CustomTItle';
import { useApp } from '../../hooks/useApp';

type ActivityPageNavigationRouteProp = RouteProp<
  RootStackParamList,
  'ActivityPage'
>;
function ActivityPage() {
  const route = useRoute<ActivityPageNavigationRouteProp>();
  const {preferences, categories} = route.params;
  const {user} = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [communityActivities, setCommunityActivities] = useState<Activity[]>(
    [],
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const headerTitle = useCallback(() => {
    return (
      <View style={styles.containerTitle}>
        <CustomTitle>{selectedCategory?.name || 'Carregando...'}</CustomTitle>
      </View>
    );
  }, [selectedCategory]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation, headerTitle]);

  const fetchActivities = useCallback(
    async (categoryId: string) => {
      try {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) {
          return;
        }
        const [userRes, communityRes] = await Promise.all([
          api.get('/activities/user/creator/all', {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }),
          api.get('/activities/all', {
            params: {
              typeId: categoryId,
              orderBy: 'createdAt',
              order: 'desc',
            },
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }),
        ]);

        setUserActivities(
          (userRes.data || []).filter(
            (activity: Activity) => activity.type === category.name,
          ),
        );

        setCommunityActivities(
          (communityRes.data || []).filter(
            (activity: Activity) =>
              activity.type === category.name &&
              activity.creator.id !== user?.id,
          ),
        );
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      }
    },
    [user, categories],
  );

  useEffect(() => {
    if (selectedCategory) {
      fetchActivities(selectedCategory.id);
    }
  }, [selectedCategory, fetchActivities]);

  useEffect(() => {
    const preferidas = preferences
      ? categories.filter(cat => preferences.includes(cat.id))
      : [];

    const categoria =
      preferidas.length > 0
        ? preferidas[Math.floor(Math.random() * preferidas.length)]
        : categories[Math.floor(Math.random() * categories.length)];

    setSelectedCategory(categoria);
  }, [categories, preferences]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <SectionCategoryList
            categories={categories}
            onCategoryPress={categoria => setSelectedCategory(categoria)}
          />
        </View>
        <View>
          <SectionActivityList
            title="Minhas atividades"
            activities={userActivities}
            showToggleButton={true}
            isHorizontal
          />
        </View>

        <View style={styles.containerActivitiesComunity}>
          <SectionActivityList
            title="Atividades da comunidade"
            activities={communityActivities}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ActivityPage;
