import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Left from 'react-native-vector-icons/AntDesign';

import images from '#assets/';
import {colors} from '#res/colors';

const Review = ({props, backwardStep, pressHandler}) => {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <StatusBar backgroundColor={colors.PURPLE} />
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={images.detailBackgroundLogo}
          style={{width: '100%', height: '28%'}}
        />
      </View>
      <View style={styles.Heading}>
        <Left name="left" size={30} color="white" onPress={backwardStep} />
        <Text style={styles.txt}>Review Your Details</Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.txtbtn}>Post Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  Heading: {
    flexDirection: 'row',
    marginTop: 60,
    margin: 10,
  },
  txt: {
    color: 'white',
    fontFamily: 'Konnect-Light',
    fontSize: 26,
    marginLeft: 4,
  },
  btn: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.PURPLE,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  txtbtn: {
    color: 'white',
    fontFamily: 'Konnect-Light',
    fontSize: 18,
  },
});

export default Review;
