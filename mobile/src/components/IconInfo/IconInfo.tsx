import React from 'react';
import { Text, TextStyle, View, ViewStyle} from 'react-native';

type IconInfoProp = {
  info: string | number;
  icon: {
    name: string;
    size: number;
    color: string;
    Component: React.ComponentType<{
      name: string;
      size?: number;
      color?: any; // aceita tudo, inclusive OpaqueColorValue
    }>;
  };
  styleContainer: ViewStyle;
  textStyle: TextStyle;
};

function IconInfo({icon, info, styleContainer, textStyle}: IconInfoProp) {
  const {Component, name, size, color} = icon;

  return (
    <View style={styleContainer}>
      <Component name={name} size={size} color={color} />
      <Text style={textStyle}>{info}</Text>
    </View>
  );
}

export default IconInfo;
