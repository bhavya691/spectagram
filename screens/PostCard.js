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
      light_theme: true,
      post_id: this.props.post.key,
      post_data: this.props.post.value,
      is_liked: false,
      likes: this.props.post.value.likes
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
    });
    this.setState({
      light_theme: theme === "light" ? true : false
    })
  }

  like_action = () => {
    if(this.state.is_liked){
      firebase.database().ref('post').child(this.state.post_id).child('likes').set(firebase.database.ServerValue.increment(-1));
      this.setState({
        likes: this.state.likes -= 1,
        is_liked: false
      })
    }else{
      firebase.database().ref('post').child(this.state.post_id).child('likes').set(firebase.database.ServerValue.increment(1));
      this.setState({
        likes: this.state.likes += 1,
        is_liked: true
      })
    }
  }

  componentDidMount() {
    this._loadFontAsync();
    this.fetchUser();
  }

  render() {
    let post = this.state.post_data;
    if (!this.state.FontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        image_1: require('../assets/image_1.jpg'),
        image_2: require('../assets/image_2.jpg'),
        image_3: require('../assets/image_3.jpg'),
        image_4: require('../assets/image_4.jpg'),
        image_5: require('../assets/image_5.jpg'),
        image_6: require('../assets/image_6.jpg'),  
        image_7: require('../assets/image_7.jpg'),      
      };
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
                    source={{uri: post.profileImage}}
                    style={styles.profileImg}
                  />
                </View>
                <View styles={styles.authorNameCon}>
                  <Text style={this.state.light_theme ? styles.authorNameLight : styles.authorName}>
                    {post.author}
                  </Text>
                </View>
              </View>
              <Image
                source={preview_images[post.previewImage]}
                style={styles.previewImg}
              />
              <View style={styles.captionCon}>
                <Text style={this.state.light_theme ? styles.captionTxtLight : styles.captionTxt}>{post.caption}</Text>
              </View>
              <View styles={styles.actionCon}>
                <TouchableOpacity onPress={() => this.like_action()} style={this.state.is_liked ? styles.likeBtnLiked : styles.likeBtnDisliked}>
                  <Ionicons name={"heart"} color={this.state.light_theme ? '#000' : '#fff'} size={RFValue(30)} />
                  <Text style={this.state.light_theme ? styles.likeTxtLight : styles.likeTxt}>{this.state.likes}</Text>
                </TouchableOpacity>
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
  likeBtnLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#eb3948',
    borderRadius: RFValue(30)
  },
  likeBtnDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#EB3948',
    borderRadius: RFValue(30),
    borderWidth: RFValue(2)
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
