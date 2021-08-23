import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import firebase from 'firebase';
export default class CustomSidebarMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            light_theme: true
        }
    }
    componentDidMount(){
        let theme;
        firebase.database().ref('/user/'+firebase.auth().currentUser.uid).on("value",function(snapshot){
            theme = snapshot.val().current_theme
        });
        this.setState({light_theme : theme === 'light' ? true : false})
    }
    render(){
        props = this.props;
        return(
            <View style={{flex: 1, backgroundColor: this.state.light_theme ? '#fff' : '#2f345b'}}>
                <Image source={require('../assets/logo.png')} style={styles.profileIcon}/>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props}/>
                </DrawerContentScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileIcon:{
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70),
        alignSelf: 'center',
        marginTop: RFValue(60),
        resizeMode: 'contain'
    }
})