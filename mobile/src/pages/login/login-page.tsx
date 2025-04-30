import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomTextLink from '../../components/CustomTextLink/CustomTextLink';
import CustomTitle from '../../components/CustomTitle/CustomTItle';
import CustomImage from '../../components/CustomImage/CustomImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './style';
import AppContext from '../../context/AppContext';
import {User} from '../../types/user';
import {RootStackParamList} from '../../routes/app-routes';

type LoginPageProp = NativeStackNavigationProp<RootStackParamList, 'LoginPage'>;

function LoginPage() {
  const navigation = useNavigation<LoginPageProp>();
  const {setUser} = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  async function handleLogin() {
    try {
      const response = await fetch('http://192.168.122.1:3000/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      });

      if (!response.ok) {
        console.log(response.body);
        throw new Error('Erro ao fazer login');
      }

      const data = await response.json();

      const user: User = {
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        xp: data.xp,
        level: data.level,
        email: data.email,
        token: data.token,
      };
      setUser(user);
      navigation.replace('HomePage');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keybord}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <View style={styles.containerHeaderLogo}>
              <CustomImage source="logo" style={styles.logo} />
            </View>

            <View style={styles.containerHeaderTitle}>
              <CustomTitle>{'Faça Login e comece a treinar'}</CustomTitle>
              <Text style={styles.text}>
                Encontre parceiros para treinar ao ar livre. Conecte-se e comece
                agora! 💪
              </Text>
            </View>
          </View>
          <View style={styles.containerForm}>
            <View style={styles.containerInput}>
              <CustomTextInput
                keyboardType="email-address"
                label="Email"
                placeholder="Ex.: nome@email.com"
                required={true}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <CustomTextInput
                label="Senha"
                placeholder="Ex.: nome123"
                secureTextEntry={true}
                required={true}
                value={senha}
                onChangeText={text => setSenha(text)}
              />
            </View>
            <View style={styles.containerNavigation}>
              <CustomButton title={'Entrar'} onPress={() => handleLogin()} />
              <CustomTextLink
                text="Ainda não tem conta?"
                textlink="Cadastre-se"
                onPress={() => navigation.navigate('RegisterPage')}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default LoginPage;
