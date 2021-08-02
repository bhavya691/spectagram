import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/Feed';
import CreatePost from '../screens/CreatePost';

const Tab = createMaterialBottomTabNavigator()
const TabNavigator = () => {
    return(
        <Tab.Navigator
        labeled = {false}
        barStyle = {styles.bottomTab}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if(route.name === 'feed'){
                        iconName = focused ? 'book' : 'book-outline'
                    }else if(route.name === 'createPost'){
                        iconName = focused ? 'create' : 'create-outline'
                    }
                    return <Ionicons name={iconName} size={30} color={color} style={{width: 30}}/>
                }
            })}
                activeColor = {'tomato'}
                inactiveColor = {'gray'}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="CreatePost" component={CreatePost} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    bottomTab:{
        backgroundColor: '#2f345b',
        height: '8%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        overflow: 'hidden'
    }
})

export default TabNavigator