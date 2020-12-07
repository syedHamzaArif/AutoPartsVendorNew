import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import {colors} from '#res/colors';
import images from '#assets/';
import Left from 'react-native-vector-icons/AntDesign';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const LocationScreeen = ({props, pressHandler, backwardStep}) => {
  const [address, setAddress] = useState('');
  console.log(
    'file: LocationScreeen.js => line 17 => LocationScreeen => props',
    props,
  );
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
        // AsyncStorage.removeItem('@Address');
      AsyncStorage.getItem('@Address').then((value) => setAddress(value));
    }, []),
  );

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.DARKGREEN} />
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={images.backgroundCell}
          style={{width: '100%', height: '28%'}}
        />
      </View>
      <View>
        <View style={styles.Heading}>
          <Left name="left" size={24} color="white" onPress={backwardStep} />
          <Text style={styles.txt}>Confirm Your Location</Text>
        </View>

        <TouchableOpacity
          style={styles.LocationView}
          onPress={() => navigation.navigate('SearchLocation')}>
          <View>
            <Text style={styles.txtLocation}>Location</Text>
            <Text multiline={true} style={styles.setTxtLocation}>
              {address}
            </Text>
          </View>
          <Left name="right" size={24} color="black" style={{marginTop: 8}} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn} onPress={pressHandler}>
        <Text style={styles.txtbtn}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around',
  },
  Heading: {
    flexDirection: 'row',
    marginTop: 30,
    margin: 10,
  },
  txt: {
    color: 'white',
    fontFamily: 'Konnect-Light',
    fontSize: 22,
    marginLeft: 4,
  },
  LocationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderBottomColor: 'black',
    marginHorizontal: 30,
    marginTop: 60,
  },
  btn: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.GREEN,
    padding: 10,
    alignItems: 'center',
  },
  txtbtn: {
    color: 'white',
    fontFamily: 'Konnect-Light',
    fontSize: 16,
  },
  setTxtLocation: {
    fontFamily: 'Konnect-Light',
    fontSize: 16,
  },
  txtLocation: {
    fontFamily: 'Konnect-SemiBold',
    fontSize: 16,
  },
});

export default LocationScreeen;
