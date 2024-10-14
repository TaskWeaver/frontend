import React from 'react';
import styled from 'styled-components/native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

type Route = {
  key: string;
  name: string;
  params?: object | undefined;
};

const Container = styled.View`
  background-color: #ffffff;
`;

const TabWrapper = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  padding-left: 4px;
  border-bottom-width: 1px;
  border-bottom-color: #fafafa;
`;

const TabButton = styled.TouchableOpacity<{isFocused: boolean}>`
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 0px 16px;
  border-bottom-width: 3px;
  border-bottom-color: ${(props: {isFocused: any}) =>
    props.isFocused ? '#20B767' : 'transparent'};
`;

const TabText = styled.Text<{isFocused: boolean}>`
  font-weight: 700;
  color: ${(props: {isFocused: any}) =>
    props.isFocused ? '#20B767' : '#939393'};
`;

export default function TabBar({
  state,
  navigation,
  descriptors,
}: MaterialTopTabBarProps) {
  return (
    <Container>
      <TabWrapper>
        {state.routes.map((route: Route, index: number) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabButton
              isFocused={isFocused}
              onPress={onPress}
              key={`tab_${index}`}>
              <TabText isFocused={isFocused}>
                {typeof label === 'function'
                  ? label({
                      focused: isFocused,
                      color: isFocused ? '#20B767' : '#939393',
                      children: label.toString(),
                    })
                  : label}
              </TabText>
            </TabButton>
          );
        })}
      </TabWrapper>
    </Container>
  );
}
