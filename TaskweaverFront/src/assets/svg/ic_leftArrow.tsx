import * as React from 'react';
import Svg, {Path, Defs, ClipPath, Rect, G} from 'react-native-svg';

const IcLeftArrow = ({size}: {size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Defs>
      <ClipPath id="clip0_3388_10846">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_3388_10846)">
      <Path
        d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
        fill="black"
      />
    </G>
  </Svg>
);

export default IcLeftArrow;
