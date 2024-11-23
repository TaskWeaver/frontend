import React from 'react';
import Svg, {G, Path, ClipPath, Rect} from 'react-native-svg';
import {ViewStyle} from 'react-native';

interface TrashIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: ViewStyle;
}

const TrashIcon: React.FC<TrashIconProps> = ({
  width = 24,
  height = 24,
  color = 'black',
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    style={style}>
    <ClipPath id="clip0_3388_5103">
      <Rect width="24" height="24" fill="white" />
    </ClipPath>
    <G clipPath="url(#clip0_3388_5103)">
      <Path
        d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
        fill={color}
      />
    </G>
  </Svg>
);

export default TrashIcon;
