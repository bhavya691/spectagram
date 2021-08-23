import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import Feed from '../screens/Feed';
import CreatePost from '../screens/CreatePost';

const Tab = createMaterialBottomTabNavigator()
export default class TabNavigator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            light_theme: true,
            isUpdated: false
        }
    }

    changeUpdated = () => {
        this.setState({isUpdated: true})
    }

    removeUpdated = () => {
        this.setState({isUpdated: false})
    }

    renderFeed = props => {
        return <Feed setUpdateToFalse={this.removeUpdated}{...props} />
    }
    
    renderPost = props => {
        return <CreatePost setUpdateToTrue={this.changeUpdated}{...props} />
    }

    async fetchUser(){
        let theme;
        await firebase.database().ref("/user/" + firebase.auth().currentUser.uid).on("value", function(snapshot){
            theme = snapshot.val().current_theme;
            
        });
        this.setState({
            light_theme: theme === "light" ? true : false
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
                        return <Ionicons name={iconName} size={RFValue(30)} color={color} style={styles.icons}/>
                    }
                })}
                    activeColor = {'tomato'}
                    inactiveColor = {'gray'}
            >
                <Tab.Screen name="Feed" component={this.renderFeed} options={{unmountOnBlur: true}}/>
                <Tab.Screen name="CreatePost" component={this.renderPost} options={{unmountOnBlur: true}}/>
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
    },
    icons:{
        width: RFValue(30),
        height: RFValue(30)
    }
})