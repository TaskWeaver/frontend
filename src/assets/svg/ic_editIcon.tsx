import React from 'react';
import Svg, {G, Path, ClipPath, Rect} from 'react-native-svg';
import {ViewStyle} from 'react-native';

interface EditIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: ViewStyle;
}

const EditIcon: React.FC<EditIconProps> = ({
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
    <ClipPath id="clip0_3388_5102">
      <Rect width="24" height="24" fill="white" />
    </ClipPath>
    <G clipPath="url(#clip0_3388_5102)">
      <Path
        d="M3 17.2505V21.0005H6.75L17.81 9.94055L14.06 6.19055L3 17.2505ZM20.71 7.04055C21.1 6.65055 21.1 6.02055 20.71 5.63055L18.37 3.29055C17.98 2.90055 17.35 2.90055 16.96 3.29055L15.13 5.12055L18.88 8.87055L20.71 7.04055Z"
        fill={color}
      />
    </G>
  </Svg>
);

export default EditIcon;
