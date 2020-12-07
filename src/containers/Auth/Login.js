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
  ScrollView,
  StatusBar,
} from 'react-native';
import Lock from 'react-native-vector-icons/FontAwesome';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasword, setShowPasword] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={colors.PRIMARY} />

      <View style={StyleSheet.absoluteFill}>
        <Image
          source={images.loginBackground}
          style={{width: '100%', height: '100%'}}
          resizeMode="stretch"
        />
      </View>
      <Text style={styles.txtHeader}>Login</Text>
      <Image
        source={images.HomeLogo}
        style={styles.image}
        resizeMode="stretch"
      />
      <View>
        <TextInput
          style={[styles.input, {marginBottom: 30}]}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          placeholder="User Name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <View style={[styles.inputRow, {justifyContent: 'space-between'}]}>
          <TextInput
            style={[styles.inputpassword, {marginBottom: 50}]}
            secureTextEntry={showPasword ? false : true}
            autoCapitalize="none"
            value={password}
            placeholder="Password"
            placeholderTextColor="grey"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          {showPasword === false ? (
            <TouchableOpacity
              onPress={() => setShowPasword(true)}
              hitSlop={{right: 20, left: 20, top: 20, bottom: 20}}>
              <Lock
                name={'lock'}
                size={28}
                style={{margin: 6}}
                color={colors.PRIMARY}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setShowPasword(false)}
              hitSlop={{right: 20, left: 20, top: 20, bottom: 20}}>
              <Lock
                name={'unlock-alt'}
                size={28}
                style={{margin: 6}}
                color={colors.PRIMARY}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: colors.PRIMARY}]}
          onPress={() => props.navigation.navigate('HomeScreen')}>
          <Text style={[styles.btntxt, {color: 'white'}]}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    // alignItems: 'center',
    flexGrow: 1,
    paddingVertical: 10,
  },
  txtHeader: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Konnect-ExtraBold',
    textAlign: 'center',
  },
  input: {
    marginHorizontal: 50,
    // alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 18,
    // padding: 15,
    // marginBottom: 80,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 50,
  },
  inputRow: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 45,
    marginHorizontal: 50,
    marginVertical: 4,
    backgroundColor: 'white',
  },
  inputpassword: {
    height: 45,
    width: '70%',
    marginLeft: 10,
  },
  btn: {
    marginHorizontal: 30,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 15,
    marginTop: 50,
  },
  btntxt: {
    fontFamily: 'Konnect-ExtraBold',
  },
});
export default Login;
