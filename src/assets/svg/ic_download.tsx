import React from 'react';
import Svg, {G, Path, ClipPath, Rect} from 'react-native-svg';
import {ViewStyle} from 'react-native';

interface DownloadIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: ViewStyle;
}

const DownloadIcon: React.FC<DownloadIconProps> = ({
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
    <ClipPath id="clip0_3388_5278">
      <Rect width="24" height="24" fill="white" />
    </ClipPath>
    <G clipPath="url(#clip0_3388_5278)">
      <Path
        d="M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19ZM13 12.67L15.59 10.09L17 11.5L12 16.5L7 11.5L8.41 10.09L11 12.67V3H13V12.67Z"
        fill={color}
      />
    </G>
  </Svg>
);

export default DownloadIcon;
