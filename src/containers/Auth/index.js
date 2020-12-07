/* eslint-disable no-unused-vars */
import images from '#assets/';
import {colors} from '#res/colors';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

const Login = (props) => {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={colors.PRIMARY} />

      <View style={StyleSheet.absoluteFill}>
        <Image
          source={images.loginBackground}
          style={{width: '100%', height: '100%'}}
          resizeMode="stretch"
        />
      </View>
      <Text style={styles.txtHeader}>AUTOPARTS</Text>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={[styles.btntxt]}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: colors.PRIMARY}]}>
          <Text style={[styles.btntxt, {color: 'white'}]}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-around',
    // alignItems: 'center',
    flex: 1,
  },
  txtHeader: {
    color: 'white',
    fontSize: 40,
    // fontWeight: 'bold',
    fontFamily: 'Konnect-ExtraBold',
    textAlign: 'center',
  },
  btn: {
    marginHorizontal: 50,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
  },
  btntxt: {
    fontFamily: 'Konnect-ExtraBold',
  },
});
export default Login;
