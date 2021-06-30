import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNvigator from './navigation/DrawerNavigator';

export default function App(){
  return(
    <NavigationContainer>
      <DrawerNvigator />
    </NavigationContainer>
  )
}