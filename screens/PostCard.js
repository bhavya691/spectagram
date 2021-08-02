import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FontsLoaded: false,
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
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PostScreen', {
                post: this.props.post,
              })
            }>
            <View style={styles.cardCon}>
              <View styles={styles.authorCon}>
                <View style={styles.authorImgCon}>
                  <Image
                    source={require('../assets/profile_img.png')}
                    style={styles.profileImg}
                  />
                </View>
                <View styles={styles.authorNameCon}>
                  <Text style={styles.authorName}>
                    {this.props.post.author}
                  </Text>
                </View>
              </View>
              <Image
                source={require('../assets/post.jpeg')}
                style={styles.previewImg}
              />
              <View style={styles.captionCon}>
                <Text style={styles.captionTxt}>{this.props.post.caption}</Text>
              </View>
              <View styles={styles.actionCon}>
                <View style={styles.likeBtn}>
                  <Ionicons name={'heart'} size={RFValue(30)} color={'#fff'} />
                  <Text style={styles.likeTxt}>12k</Text>
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
  likeTxt: {
    fontSize: RFValue(20),
    color: '#fff',
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-Sans'
  },
});
