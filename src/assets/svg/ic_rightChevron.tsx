import * as React from 'react';
import Svg, {Path, Defs, ClipPath, Rect, G} from 'react-native-svg';

const RightChevron = ({size = 24, color = 'black'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip0_3388_10601">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_3388_10601)">
        <Path
          d="M5.87891 4.12L13.7589 12L5.87891 19.88L7.99891 22L17.9989 12L7.99891 2L5.87891 4.12Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default RightChevron;
