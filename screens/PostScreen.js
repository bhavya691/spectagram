import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class PostScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      FontsLoaded: false,
      light_theme: true
    };
  }
 async _loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      FontsLoaded: true,
    });
  }

  async fetchUser(){
    let theme;
    await firebase.database().ref("/user/" + firebase.auth().currentUser.uid).on("value", function(snapshot){
      theme = snapshot.val().current_theme
      this.setState({
        light_theme: theme === "light"
      })
    })
  }

  componentDidMount() {
    this._loadFontAsync();
    this.fetchUser();
  }

  render() {
    if (!this.state.FontsLoaded) {
      return <AppLoading />;
    } else {
      return(
       <View style={this.state.light_theme ? styles.containerLight : styles.container}>
       <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.appTitlTxtCon}>
              <Text style={this.state.light_theme ? styles.appTitlTxtLight : styles.appTitlTxt}>Post</Text>
            </View>
          </View>
        <View style={this.state.light_theme ? styles.cardConLight : styles.cardCon}>
          <View styles={styles.authorCon}>
            <View style={styles.authorImgCon}>
              <Image source={require('../assets/profile_img.png')} style={styles.profileImg}/>
            </View>
            <View styles={styles.authorNameCon}>
            <Text style={this.state.light_theme ? styles.authorNameLight : styles.authorName}>{this.props.route.params.post.author}</Text>
            </View>
          </View>
          <Image source={require('../assets/post.jpeg')} style={styles.previewImg}/>
          <View style={styles.captionCon}>
            <Text style={this.state.light_theme ? styles.captionTxtLight : styles.captionTxt}>{this.props.route.params.post.caption}</Text>
          </View>
          <View styles={styles.actionCon}>
            <View style={this.state.light_theme ? styles.likeBtnLight : styles.likeBtn}>
              <Ionicons name={"heart"} size={RFValue(30)} color={'#fff'} />
              <Text style={this.state.light_theme ? styles.likeTxtLight : styles.likeTxt}>12k</Text>
            </View>
          </View>
        </View>
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  containerLight:{
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  droidSafeArea:{
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(25)
  },
  appTitle: {
    marginTop: RFValue(5),
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: RFValue(50),
    height: RFValue(50),
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
  cardConLight:{
    margin: RFValue(15),
    marginTop: RFValue(50),
    borderRadius: RFValue(20),
    backgroundColor: '#f0f0f0',
    paddingVertical: RFValue(20),
    paddingBottom: RFValue(20)
  },
  cardCon:{
    margin: RFValue(15),
    marginTop: RFValue(50),
    borderRadius: RFValue(20),
    backgroundColor: '#2a2a2a',
    paddingVertical: RFValue(20),
    paddingBottom: RFValue(20)
  },
  authorCon:{
    paddingLeft: RFValue(30),
    justifyContent: "center"
  },
  authorImgCon:{
    paddingLeft: RFValue(10),
    justifyContent: "center",
  },
  previewImg:{
    width: '100%',
    height: RFValue(300),
    resizeMode: "contain"
  },
  profileImg:{
    width: RFValue(50),
    height: RFValue(50),
    resizeMode: 'contain',
    marginVertical: RFValue(10),
    borderRadius: RFValue(50),
    position: "relative"
  },
  authorNameCon:{
    paddingLeft: RFValue(20),
    justifyContent: "center",
  },
  authorNameLight:{
    fontSize: RFValue(25),
    color: '#000',
    position: "absolute",
    bottom: RFValue(20),
    left: RFValue(80),
    fontFamily: 'Bubblegum-Sans'
  },
  authorName:{
    fontSize: RFValue(25),
    color: '#fff',
    position: "absolute",
    bottom: RFValue(20),
    left: RFValue(80),
    fontFamily: 'Bubblegum-Sans'
  },
  captionCon:{
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  captionTxtLight:{
    fontSize: RFValue(13),
    color: '#000',
    fontFamily: 'Bubblegum-Sans'
  },
  captionTxt:{
    fontSize: RFValue(13),
    color: '#fff',
    fontFamily: 'Bubblegum-Sans'
  },
  actionCon:{
    paddingTop: RFValue(10),
    justifyContent: "center",
    alignItems: "center"
  },
  likeBtnLight:{
    width: RFValue(200),
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: '#EB3948',
    borderRadius: RFValue(35),
    alignSelf: "center",
    marginVertical: RFValue(15),
    shadowColor: '#000',
  },
  likeBtn:{
    width: RFValue(200),
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: '#EB3948',
    borderRadius: RFValue(35),
    alignSelf: "center",
    marginVertical: RFValue(15),
    shadowColor: '#fff',
  },
  likeTxtLight:{
    fontSize: RFValue(30),
    color: '#000',
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-Sans'
  },
  likeTxt:{
    fontSize: RFValue(30),
    color: '#fff',
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-Sans'
  }
});
