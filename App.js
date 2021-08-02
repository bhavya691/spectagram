import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Loading from './screens/Loading';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import firebase from 'firebase';
import {firebaseConfig} from './config';

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app()
}
const AppSwitchNavigator = createSwitchNavigator({
  Loading: Loading,
  Login: Login,
  Dashboard: Dashboard
})

const AppContainer = createAppContainer(AppSwitchNavigator)

export default function App(){
  return(
    <AppContainer />
  )
}