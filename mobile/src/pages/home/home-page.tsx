import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {styles} from './style';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {useContext, useEffect} from 'react';
import AppContext from '../../context/AppContext';
import PanelHome from '../../components/PanelHome/PanelHome';
import CustomImage, {
  localImages,
} from '../../components/CustomImage/CustomImage';

export default function HomePage() {
  const navigation = useNavigation();
  const {user, isLoged} = useContext(AppContext);
  useEffect(() => {
    if (!user) {
      navigation.reset({index: 0, routes: [{name: 'LoginPage' as never}]});
    }
  }, [user, navigation, isLoged]);
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Home"
        onBackPress={() => navigation.goBack()}
        showBackButton={false}
        style={styles.header}>
        <View style={styles.headercontainer}>
          <CustomImage
            source={localImages.elipse3}
            style={styles.headerbackgroundElipse3}
          />
          <CustomImage
            source={localImages.elipse4}
            style={styles.headerbackgroundElipse4}
          />
          <PanelHome
            mensage="Olá, seja bem vindo"
            user={{
              name: user?.name,
              avatar: user?.avatar!.replace('localhost', '192.168.122.1'),
              level: 10,
            }}
          />
        </View>
      </CustomHeader>
      <Text>Home page</Text>

      <View>
        {isLoged ? (
          <Text>Bem-vindo, {user?.name}!</Text>
        ) : (
          <Text>Você não está logado.</Text>
        )}
      </View>
      <CustomButton
        title="Voltar"
        onPress={() => {
          navigation.reset({index: 0, routes: [{name: 'LoginPage' as never}]});
        }}
      />
    </View>
  );
}
