import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class PostScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      FontsLoaded: false
    };
  }
 async _loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      FontsLoaded: true,
    });
  }

  componentDidMount() {
    this._loadFontAsync();
  }

  render() {
    if (!this.state.FontsLoaded) {
      return <AppLoading />;
    } else {
      return(
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
              <Text style={styles.appTitlTxt}>Post</Text>
            </View>
          </View>
        <View style={styles.cardCon}>
          <View styles={styles.authorCon}>
            <View style={styles.authorImgCon}>
              <Image source={require('../assets/profile_img.png')} style={styles.profileImg}/>
            </View>
            <View styles={styles.authorNameCon}>
            <Text style={styles.authorName}>{this.props.route.params.post.author}</Text>
            </View>
          </View>
          <Image source={require('../assets/post.jpeg')} style={styles.previewImg}/>
          <View style={styles.captionCon}>
            <Text style={styles.captionTxt}>{this.props.route.params.post.caption}</Text>
          </View>
          <View styles={styles.actionCon}>
            <View style={styles.likeBtn}>
              <Ionicons name={"heart"} size={RFValue(30)} color={'#fff'} />
              <Text style={styles.likeTxt}>12k</Text>
            </View>
          </View>
        </View>
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
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
  appTitlTxt: {
    color: '#fff',
    fontSize: RFValue(30),
    fontFamily: 'Bubblegum-Sans'
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
  likeTxt:{
    fontSize: RFValue(30),
    color: '#fff',
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-Sans'
  }
});
