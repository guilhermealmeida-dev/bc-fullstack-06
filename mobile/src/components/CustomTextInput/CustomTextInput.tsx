import {
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
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
  value?: any;
  onChangeText?: (text: string) => void;
};

function CustomTextInput(props: CustomTextInputProps) {
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
      <TextInput
        keyboardType={props.keyboardType ?? 'default'}
        placeholder={props.placeholder}
        style={[styles.input, props.inputStyle]}
        secureTextEntry={props.secureTextEntry}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
}

export default CustomTextInput;
