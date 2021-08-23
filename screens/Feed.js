import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import PostCard from './PostCard';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';

let currentFont = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};
let posts = require('./temp_posts.json');

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FontsLoaded: false,
      light_theme: true,
      posts: []
    };
  }

  async _loadFontAsync() {
    await Font.loadAsync(currentFont);
    this.setState({
      FontsLoaded: true,
    });
  }

  async fetchUser(){
    let theme;
    await firebase.database().ref("/user/" + firebase.auth().currentUser.uid).on("value", function(snapshot){
      theme = snapshot.val().current_theme
    });
    this.setState({
      light_theme: theme === "light" ? true : false
    })
  }

  fetchPosts(){
    firebase.database().ref('/post/').on("value",(snapshot)=>{
      let posts = []
      if(snapshot.val()){
        Object.keys(snapshot.val()).forEach(function (key){
          posts.push({key:key,value:snapshot.val()[key]})
        })
      }
      this.setState({posts:posts})
      this.props.setUpdateToFalse()
    },
    function (err){
      console.log(err)
    })
  }

  componentDidMount() {
    this._loadFontAsync();
    this.fetchUser();
    this.fetchPosts();
  }

  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (!this.state.FontsLoaded) {
      return <AppLoading />;
    } else {
      return (
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
              <Text style={styles.appTitlTxt}>Spectagram</Text>
            </View>
          </View>
          {!this.state.posts[0] ? (
            <View style={styles.noPosts}>
              <Text style={styles.noPostsTxt}>
                No Post Available
              </Text>
              </View>
          ):(
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={posts}
              renderItem={this.renderItem}
            />
            
            </View>
            )
          }
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
    backgroundColor: '#000',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
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
  noPosts:{
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  noPostsTxt:{
    color: '#000',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans'
  },
  cardContainer: {
    flex: 0.85,
  },
});
