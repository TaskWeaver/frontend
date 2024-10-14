import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const PlusFriends = () => {
  return (
    <Svg width="25" height="17" viewBox="0 0 25 17" fill="none">
      <Path
        d="M23 17C24.1046 17 25.025 16.0612 24.5249 15.0763C24.4612 14.9509 24.3912 14.8266 24.3149 14.7039C23.8626 13.9759 23.1997 13.3145 22.364 12.7574C21.5282 12.2002 20.5361 11.7583 19.4442 11.4567C18.3522 11.1552 17.1819 11 16 11C14.8181 11 13.6478 11.1552 12.5558 11.4567C11.4639 11.7583 10.4718 12.2002 9.63604 12.7574C8.80031 13.3145 8.13738 13.9759 7.68508 14.7039C7.60883 14.8266 7.53881 14.9509 7.47509 15.0763C6.97505 16.0612 7.89543 17 9 17L23 17Z"
        fill="black"
      />
      <Circle cx="16" cy="5" r="4" fill="black" />
      <Path d="M1 7.5H8" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <Path
        d="M4.5 4L4.5 11"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default PlusFriends;
