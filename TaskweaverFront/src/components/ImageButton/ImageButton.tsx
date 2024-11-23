import React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native';

type ImageButtonProps = {
  source: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
  className?: string;
  width: number;
  height: number;
};

const ImageButton: React.FC<ImageButtonProps> = ({
  source,
  onPress,
  className,
  width,
  height,
}) => {
  return (
    <TouchableOpacity onPress={onPress} className={`${className}`}>
      <Image
        source={source}
        resizeMode={'contain'}
        style={{width: width, height: height}}
      />
    </TouchableOpacity>
  );
};

export default ImageButton;
