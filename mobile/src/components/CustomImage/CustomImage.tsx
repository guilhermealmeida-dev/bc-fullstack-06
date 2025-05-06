import React from 'react';
import {Image, ImageStyle, View, Text, ImageSourcePropType} from 'react-native';
import {styles} from './style';
import {SERVER_IP} from '../../config/env';

export const localImages = {
  logo: require('../../assets/images/logo.png'),
  trofel: require('../../assets/images/trofel.png'),
  medal: require('../../assets/images/medal.png'),
  elipse3: require('../../assets/images/elipse3.png'),
  elipse4: require('../../assets/images/elipse4.png'),
};

type CustomImageProps = {
  style?: ImageStyle;
  url?: string;
  source?: keyof typeof localImages;
};

function CustomImage(props: CustomImageProps) {
  const {style, url, source} = props;

  let imageSource: ImageSourcePropType;

  if (url) {
    imageSource = {uri: url.replace('localhost', `${SERVER_IP}`)};
  } else if (source && localImages[source]) {
    imageSource = localImages[source];
  } else {
    return <Text>Imagem não fornecida</Text>;
  }

  return (
    <View>
      <Image source={imageSource} style={[styles.image, style]} />
    </View>
  );
}

export default CustomImage;
