import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextLink from '../../components/CustomTextLink/CustomTextLink';
import CustomTitle from '../../components/CustomTitle/CustomTItle';
import CustomImage from '../../components/CustomImage/CustomImage';

import {styles} from './style';
import {User} from '../../types/user';
import {RootStackParamList} from '../../routes/app-routes';
import api from '../../lib/axios';
import {useApp} from '../../hooks/useApp';

type RegisterPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginPage'
>;

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

function RegisterPage() {
  const navigation = useNavigation<RegisterPageNavigationProp>();
  const {setUser} = useApp();

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    try {
      const response = await api.post('/auth/sign-in', data);

      const user: User = response.data;
      setUser(user);
      navigation.replace('HomePage');
    } catch (error: any) {
      const msg =
        error.response?.data?.error || 'Erro ao conectar com o servidor';

      if (msg.toLowerCase().includes('usuário')) {
        setError('email', {message: msg});
      } else if (msg.toLowerCase().includes('senha')) {
        setError('password', {message: msg});
      } else {
        console.error('Erro no login:', msg);
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keybord}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
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
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <CustomTextInput
                    keyboardType="email-address"
                    label="Email"
                    placeholder="Ex.: nome@email.com"
                    required
                    value={value}
                    onChangeText={onChange}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value}}) => (
                  <CustomTextInput
                    label="Senha"
                    placeholder="Ex.: nome123"
                    secureTextEntry
                    required
                    value={value}
                    onChangeText={onChange}
                    error={errors.password?.message}
                  />
                )}
              />
            </View>

            <View style={styles.containerNavigation}>
              <CustomButton
                title="Entrar"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              />
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

export default RegisterPage;
