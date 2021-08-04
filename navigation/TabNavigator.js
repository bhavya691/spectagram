import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Feed from '../screens/Feed';
import CreatePost from '../screens/CreatePost';

const Tab = createMaterialBottomTabNavigator()
export default class TabNavigator extends React.Component{
    constructor(props){
        super(props);
        this.satte = {
            light_theme: true
        }
    }

    async fetchUser(){
        let theme;
        await firebase.database().ref("/user/" + firebase.auth().currentUser.uid).on("value", function(snapshot){
            theme = snapshot.val().current_theme;
            this.setState({
                light_theme: theme === "light"
            })
        })
    }

    componentDidMount(){
        this.fetchUser();
    }
    render(){
        return(
            <Tab.Navigator
            labeled = {false}
            barStyle = {this.state.light_theme ? styles.bottomTabLight : styles.bottomTab}
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
}


const styles = StyleSheet.create({
    bottomTabLight:{
        backgroundColor: '#d0d0d0',
        height: '8%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        overflow: 'hidden'
    },
    bottomTab:{
        backgroundColor: '#2f345b',
        height: '8%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        overflow: 'hidden'
    }
})