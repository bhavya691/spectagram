import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, SafeAreaView, Switch} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';
let customFont = {"Bubblegum-Sans": require('../assets/fonts/BubblegumSans-Regular.ttf')}

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded: false,
            name: '',
            profile_image: '',
            isEnabled: false,
            light_theme: true
        }
    }

    async _loadFontAsync(){
        await Font.loadAsync(customFont)
        this.setState({
            fontsLoaded: true
        })
    }

    componentDidMount(){
        this._loadFontAsync();
        this.fetchUser();
    }

    toggleSwitch(){
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? 'dark' : 'light';
        const updates = {}
        updates['/user/'+firebase.auth().currentUser.uid + '/current_theme'] = theme;
        firebase.database().ref().update(updates);
        this.setState({
            isEnabled: !previous_state, light_theme: previous_state
        })
    }

    async fetchUser(){
        let theme, name, image;
        await firebase.database().ref('/user/'+firebase.auth().currentUser.uid).on("value", function (snapshot){
            theme = snapshot.val().current_theme;
            name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
            image = snapshot.val().profile_picture;
        })
        this.setState({
            light_theme: theme === 'light' ? true : false,
            isEnabled: theme === 'light' ? false : true,
            name: name,
            profile_image: image
        })
    }

    render(){
        if(!this.state.fontsLoaded){
            return <AppLoading />
        }else{
            return(
                <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image source={require('../assets/logo.png')} style={styles.iconImage} />
                        </View>
                        <View style={styles.appTitlTxtCon}>
                            <Text style={this.state.light_theme ? styles.appTitlTxtLight : styles.appTitlTxt}>Spectagram</Text>
                        </View>
                    </View>
                    <View style={styles.screenContainer}>
                        <View style={styles.profileImgCon}>
                            <Image source={{uri: this.state.profile_image}} style={styles.profile_image}/>
                            <View style={styles.nameCon}>
                                <Text style={this.state.light_theme ? styles.nameTxtLight : styles.nameTxt}>{this.state.name}</Text>
                            </View>
                            <View stylee={styles.themeCon}>
                                <View style={styles.themeTxtCon}>
                                    <Text style={this.state.themeTxt ? styles.themeTxtLight : styles.themeTxt}>Dark Theme</Text>
                                </View>
                                <Switch
                                style={{
                                    transform: [{scaleX: 1.3, scaleY: 1.3}]
                                }}
                                trackColor={{false:'#767577', true:'#fff'}}
                                thumbColor={this.state.isEnabled ? '#ee8249' : '#f4f3f4'}
                                ios_backgroundColor='#3e3e3e'
                                onValueChange={() => this.toggleSwitch()}
                                value={this.state.isEnabled}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            )
    }
    }
}

const styles = StyleSheet.create({
    containerLight:{
        flex: 1,
        backgroundColor: '#fff'
    },
    container:{
        flex:1,
        backgroundColor: '#000'
    },
    droidSafeArea:{
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(40)
    },
    appTitle: {
        flex: 0.1,
        flexDirection: 'row',
        alignSelf: 'center',
        width: '30%',
        marginBottom: '7%'
    },
    appIcon: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    appTitlTxtCon: {
        flex: 0.8,
        justifyContent: 'center',
    },
    appTitlTxtLight:{
        color: '#000',
        fontSize: RFValue(30),
        fontFamily: 'Bubblegum-Sans'
    },  
    appTitlTxt: {
        color: '#fff',
        fontSize: RFValue(30),
        fontFamily: 'Bubblegum-Sans'
    },
    screenContainer:{
        flex:0.85
    },
    profileImgCon:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile_image:{
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70)
    },
    nameTxtLight:{
        color: '#000',
        fontSize: RFValue(40),
        fontFamily: 'Bubblegum-Sans',
        marginTop: RFValue(10)
    },
    nameTxt:{
        color: '#fff',
        fontSize: RFValue(40),
        fontFamily: 'Bubblegum-Sans',
        marginTop: RFValue(10)
    },
    themeCon:{
        flex: 0.2,
        marginTop: RFValue(20),
        flexDirection: 'row',
        marginTop: RFValue(20)
    },
    themeTxtLight:{
        color: '#000',
        fontFamily: 'Bubblegum-Sans',
        fontSize: RFValue(30),
        marginRight: RFValue(15)
    },
    themeTxt:{
        color: '#fff',
        fontFamily: 'Bubblegum-Sans',
        fontSize: RFValue(30),
        marginRight: RFValue(15)
    },
})