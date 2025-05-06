import React from 'react';
import {View, Text, Alert} from 'react-native';
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
import {styles} from './style';
import {RootStackParamList} from '../../routes/app-routes';
import api from '../../lib/axios';

type RegisterPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RegisterPage'
>;

type FormValues = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Campo obrigatório'),
});

function RegisterPage() {
  const navigation = useNavigation<RegisterPageNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    try {
      await api.post('/auth/register', data);

      Alert.alert('Cadastro realizado', 'Sua conta foi criada com sucesso!', [
        {
          text: 'Fazer login',
          onPress: () => navigation.replace('LoginPage'),
        },
      ]);
    } catch (error: any) {
      const msg =
        error.response?.data?.error || 'Erro ao conectar com o servidor';
      console.error('Erro no cadastro:', msg);
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
            <View style={styles.containerHeaderTitle}>
              <CustomTitle>Crie Sua Conta</CustomTitle>
              <Text style={styles.text}>
                Por favor preencha os dados para prosseguir!
              </Text>
            </View>
          </View>

          <View style={styles.containerForm}>
            <View style={styles.containerInput}>
              <Controller
                control={control}
                name="name"
                render={({field: {onChange, value}}) => (
                  <CustomTextInput
                    label="Nome Completo"
                    placeholder="Ex.: João Silva"
                    required
                    value={value}
                    onChangeText={onChange}
                    error={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="cpf"
                render={({field: {onChange, value}}) => (
                  <CustomTextInput
                    label="CPF"
                    placeholder="Ex.: 123.456.789-00"
                    required
                    value={value}
                    onChangeText={onChange}
                    error={errors.cpf?.message}
                  />
                )}
              />

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
                title="Cadastrar"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              />
              <CustomTextLink
                text="Já possui uma conta?"
                textlink="Login"
                onPress={() => navigation.navigate('LoginPage')}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default RegisterPage;
