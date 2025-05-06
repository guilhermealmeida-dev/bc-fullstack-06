import React, {useState} from 'react';
import {Text, TextInput, TextStyle, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './style';

type CustomTextInputProps = {
  label?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  required?: boolean;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  requiredStyle?: TextStyle;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
};

function CustomTextInput(props: CustomTextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = props.secureTextEntry;

  return (
    <View style={styles.container}>
      {props.label && (
        <Text style={[styles.label, props.labelStyle]}>
          {props.label}
          {props.required && (
            <Text style={[styles.required, props.requiredStyle]}> *</Text>
          )}
        </Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          keyboardType={props.keyboardType ?? 'default'}
          placeholder={props.placeholder}
          style={[
            styles.input,
            props.inputStyle,
            props.error ? {borderColor: 'red'} : null,
            isPasswordInput ? {paddingRight: 40} : null,
          ]}
          secureTextEntry={isPasswordInput && !showPassword}
          value={props.value}
          onChangeText={props.onChangeText}
        />

        {isPasswordInput && (
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => setShowPassword(prev => !prev)}>
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>

      {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
  );
}

export default CustomTextInput;
