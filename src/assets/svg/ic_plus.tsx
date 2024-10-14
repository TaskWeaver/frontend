import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const IcPlus = ({size}: {size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 4V20M20 12L4 12"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default IcPlus;
