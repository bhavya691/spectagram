import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class PostCard extends React.Component{
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
    await firebase.database().ref("/user/"+firebase.auth().currentUser.uid).on("value", function(snapshot){
      theme = snapshot.val().current_theme;
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
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PostScreen', {
                post: this.props.post,
              })
            }>
            <View style={this.state.light_theme ? styles.cardConLight : styles.cardCon}>
              <View styles={styles.authorCon}>
                <View style={styles.authorImgCon}>
                  <Image
                    source={require('../assets/profile_img.png')}
                    style={styles.profileImg}
                  />
                </View>
                <View styles={styles.authorNameCon}>
                  <Text style={this.state.light_theme ? styles.authorNameLight : styles.authorName}>
                    {this.props.post.author}
                  </Text>
                </View>
              </View>
              <Image
                source={require('../assets/post.jpeg')}
                style={styles.previewImg}
              />
              <View style={styles.captionCon}>
                <Text style={this.state.light_theme ? styles.captionTxtLight : styles.captionTxt}>{this.props.post.caption}</Text>
              </View>
              <View styles={styles.actionCon}>
                <View style={this.state.light_theme ? styles.likeBtnLight : styles.likeBtn}>
                  <Ionicons name={'heart'} size={RFValue(30)} color={'#fff'} />
                  <Text style={this.state.light_theme ? styles.likeTxtLight : styles.likeTxt}>12k</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardConLight:{
    margin: RFValue(15),
    borderRadius: RFValue(20),
    backgroundColor: '#f0f0f0',
  },
  cardCon: {
    margin: RFValue(15),
    borderRadius: RFValue(20),
    backgroundColor: '#2a2a2a',
  },
  authorCon: {
    paddingLeft: RFValue(30),
    justifyContent: 'center',
  },
  authorImgCon: {
    paddingLeft: RFValue(10),
    justifyContent: 'center',
  },
  previewImg: {
    width: '100%',
    height: RFValue(300),
    resizeMode: 'contain',
  },
  profileImg: {
    width: RFValue(50),
    height: RFValue(50),
    resizeMode: 'contain',
    marginVertical: RFValue(10),
    borderRadius: RFValue(50),
    position: 'relative',
  },
  authorNameCon: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  authorNameLight:{
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: '#000',
    position: 'absolute',
    bottom: RFValue(20),
    left: RFValue(80),
  },
  authorName: {
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: '#fff',
    position: 'absolute',
    bottom: RFValue(20),
    left: RFValue(80),
  },
  captionCon: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  captionTxtLight:{
    fontSize: RFValue(13),
    color: '#000',
    fontFamily: 'Bubbleegum-Sans',
  },
  captionTxt: {
    fontSize: RFValue(13),
    color: '#fff',
    fontFamily: 'Bubbleegum-Sans',
  },
  actionCon: {
    paddingTop: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeBtnLight: {
    width: RFValue(160),
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#EB3948',
    borderRadius: RFValue(35),
    alignSelf: 'center',
    marginVertical: RFValue(10),
    shadowColor: '#000',
  },
  likeBtn: {
    width: RFValue(160),
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#EB3948',
    borderRadius: RFValue(35),
    alignSelf: 'center',
    marginVertical: RFValue(10),
    shadowColor: '#fff',
  },
  likeTxtLight: {
    fontSize: RFValue(20),
    color: '#000',
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-Sans'
  },
  likeTxt: {
    fontSize: RFValue(20),
    color: '#fff',
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-Sans'
  },
});
