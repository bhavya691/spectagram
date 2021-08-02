import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, Image } from 'react-native';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';

let customFont = {'Bubblegum-Sans' : require('../assets/fonts/BubblegumSans-Regular.ttf')}
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded: false
        }
    }

    async _loadFontAsync(){
        Font.loadAsync(customFont)
        this.setState({
            fontsLoaded: true
        })
    }

    componentDidMount(){
        this._loadFontAsync()
    }

    isUserEquual = (googleUser, firebaseUser) => {
        if(firebaseUser){
            var providerData = firebaseUser.providerData;
            for(var i = 0; i < providerData; i++){
                if(providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID 
                    && providerData[i].uid === googleUser.getBasicProfile().getId()){
                    return true;
                }
            }
        }
        return false
    }

    onSignIn = (googleUser) => {
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe()
            if(!this.isUserEquual(googleUser, firebaseUser)){
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                )
                firebase.auth().signInWithCredential(credential).then(function(result){
                    if(result.additionalUserInfo.isNewUser){
                        firenase.database.ref('/user/' + result.user.uid).set({
                            gmail: result.user.email,
                            profile_picture: result.additionalUserInfo.profile.picture,
                            locale: result.additionalUserInfo.profile.locale,
                            first_name: result.additionalUserInfo.given_name,
                            last_name: result.additionalUserInfo.family_name,
                            current_theme: 'dark'
                        }).then(function(snapshot){})
                    }
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    var email = error.email;
                    var credential = error.credential
                })
            }else{
                console.log('User already signed in firebase')
            }
        })
    }

    signInWithGoogleAsync = async() => {
        try{
            const results = await Google.logInAsync({
                behavior: 'web',
                androidClientId: '16964289930-ilottbaq4f4f93gf2km7h6hvnfkm7i7u.apps.googleusercontent.com',
                iosClientId: '16964289930-n8k8u5dq4sgt69tihfpd921l8mk47t72.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            })
            if(results.type === 'success'){
                this.onSignIn(results)
                return results.accessToken;
            }else{
                return {cancelled : true};
            }
        }catch (e){
            console.log(e.message);
            return{error : true};
        }
    }



    render() {
        if(!this.state.fontsLoaded){
            return <AppLoading />
        }else{
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={styles.iconImage}
                            />
                        </View>
                        <View style={styles.appTitlTxtCon}>
                            <Text style={styles.appTitlTxt}>Spectagram</Text>
                        </View>
                    </View>
                    <View style-={styles.welcomeTxtContainer}>
                        <Text style={styles.welcomeTxt}>Welcome to Spectagram</Text>
                    </View>
                    <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.signInWithGoogleAsync()}>
                        <Image source={require('../assets/camera.png')} style={styles.icon}/>
                        <Text style={styles.text}>Sign In with google account</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000',
        overflow: 'hidden'
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
    appTitlTxt: {
        color: '#fff',
        fontSize: RFValue(30),
        fontFamily: 'Bubblegum-Sans'
    },
    welcomeTxtContainer:{
        flex: 0.5,
    },
    welcomeTxt:{
        fontSize: RFValue(30),
        fontWeight: 'bold',
        color: '#eea249',
        alignSelf: 'center',
        marginBottom: '7%'
    },
    btnContainer:{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    button:{
        borderWidth: RFValue(2),
        backgroundColor: '#fff',
        borderColor: '#fff',
        padding: RFValue(10),
        borderRadius: RFValue(30),
        height: RFValue(50),
        width: RFValue(350),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    icon:{
        width: RFValue(60),
        height: RFValue(500),
        resizeMode: 'contain'
    },
    text:{
        color: '#000',
        fontWeight: '500',
        fontSize: RFValue(18)
    }
})