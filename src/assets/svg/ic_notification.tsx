import * as React from 'react';
import Svg, {Path, Defs, ClipPath, Rect, G} from 'react-native-svg';

const IcNotification = ({size}: {size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_3388_5470)">
      <Path
        d="M12 22C10.9 22 10 21.1 10 20H14C14 21.1 13.1 22 12 22ZM6 16V11C6 7.93 7.63 5.36 10.5 4.68V4C10.5 3.17 11.17 2.5 12 2.5C12.83 2.5 13.5 3.17 13.5 4V4.68C16.36 5.36 18 7.92 18 11V16L20 18V19H4V18L6 16ZM8 17H16V11C16 8.52 14.49 6.5 12 6.5C9.51 6.5 8 8.52 8 11V17Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3388_5470">
        <Rect
          width={size}
          height={size}
          fill="white"
          transform="matrix(-1 0 0 1 24 0)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default IcNotification;
