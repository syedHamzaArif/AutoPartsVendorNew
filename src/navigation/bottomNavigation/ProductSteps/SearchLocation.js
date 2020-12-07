/* eslint-disable no-unused-vars */
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import {
  askForPermissions,
  getCurrentLocation,
  getLocation,
} from '#common/Location';

import images from '#assets/';
import {colors} from '#res/colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAZixPVL0sVwox5_qi2KXo8rvRBM_TpPx8';

const coordinate = [
  {
    latitude: 24.8005028,
    longitude: 67.065124,
  },
  {
    latitude: 24.4005028,
    longitude: 67.865124,
  },
];

const SearchLocation = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();

  // useEffect(() => {
  //   Geocoder.init('AIzaSyAZixPVL0sVwox5_qi2KXo8rvRBM_TpPx8');
  // }, []);

  useEffect(() => {
    askForPermissions();
    // getCurrentLocationhHandler();
  }, []);

  const getCurrentLocationhHandler = async () => {
    try {
      const {latitude, longitude} = await getCurrentLocation();
      // console.log('SaleInvoice -> longitude', longitude);
      // console.log('SaleInvoice -> latitude', latitude);
      if (latitude) {
        // console.log('inside');
        setCurrentRegion({
          latitude,
          longitude,
          //    latitudeDelta,
          //    longitudeDelta,
        });
      }
    } catch (error) {
      console.log('Login -> error', error);
    }
  };

  const [value, setValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');

  const [currentRegion, setCurrentRegion] = useState({
    latitude: 24.8005035,
    longitude: 67.065124,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [destination, setDestination] = useState({
    latitude: 24.3,
    longitude: 67.965124,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  let timer;
  const onRegionChange = (region) => {
    clearTimeout(timer);
    // timer = setTimeout(async () => {
    setCurrentRegion(region);
    // }, 500);
  };

  const onClick = async () => {
    try {
      const result = await getLocation(value);
      console.log('Login -> result', result);
      let updatedCurrentRegion = {
        latitude: result.lat, //24.900917030925566
        longitude: result.lng, //67.077562
        latitudeDelta: currentRegion.latitudeDelta,
        longitudeDelta: currentRegion.longitudeDelta,
      };
      //   navigation.goBack();
      AsyncStorage.setItem('@Address', value);
      setCurrentRegion(updatedCurrentRegion);
      mapRef.current.animateToRegion(updatedCurrentRegion, 300);
    } catch (err) {
      console.log('Login -> err', err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={colors.DARKRED} />
      <View style={StyleSheet.absoluteFill}>
        <Image source={images.subCateg} style={{width: '100%', height: '5%'}} />
      </View>

      {/* <View Style={styles.row}>
        <TextInput
          onSubmitEditing={onClick}
          style={styles.inputLocation}
          onChangeText={(text) => setValue(text)}
          placeholder="Your Full Location"
        />
      </View> */}

      <View style={styles.row}>
        <TextInput
          onSubmitEditing={onClick}
          style={styles.input}
          onChangeText={(text) => setValue(text)}
          placeholder="Your Full Location"
          multiline={true}
        />
        <TouchableOpacity style={styles.btnSearch} onPress={onClick}>
          <Text style={{color: 'white'}}>Search</Text>
        </TouchableOpacity>
      </View>
      {/* <TextInput
        onSubmitEditing={onClickDestination}
        style={styles.input}
        onChangeText={(text) => setDestinationValue(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={onClickDestination}>
        <Text style={{fontSize: 16}}>Search</Text>
      </TouchableOpacity> */}
      <MapView
        ref={mapRef}
        initialRegion={currentRegion}
        // onRegionChangeComplete={onRegionChange}
        style={{height: '60%'}}>
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(currentRegion.latitude),
            longitude: parseFloat(currentRegion.longitude),
          }}
          pinColor={colors.DARKRED}
        />
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(destination.latitude),
            longitude: parseFloat(destination.longitude),
          }}
        />
        {/* <MapViewDirections
          origin={{
            latitude: parseFloat(currentRegion.latitude),
            longitude: parseFloat(currentRegion.longitude),
          }}
          destination={{
            latitude: parseFloat(destination.latitude),
            longitude: parseFloat(destination.longitude),
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="hotpink"
        /> */}
      </MapView>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.goBack({value: value})}>
        <Text style={styles.txtbtn}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  txtbtn: {
    color: 'white',
    fontFamily: 'Konnect-Light',
    fontSize: 18,
  },
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  footer: {
    // position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 80,
    // marginTop: 1000,
  },
  UnderFooter: {
    backgroundColor: '#ebebeb',
    paddingHorizontal: 20,
    // flexDirection: 'row',
  },
  footertxt: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    // backgroundColor: 'red',
    padding: 0,
    paddingHorizontal: 10,
    width: '75%',
  },
  btn: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.DARKRED,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  //   inputLocation: {
  //     padding: ,
  //   },
  row: {
    // margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 50,
    margin: 10,
    marginBottom: 25,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  btnSearch: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: colors.DARKRED,
    elevation: 5,
    borderRadius: 10,
    padding: 5,
  },
});
export default SearchLocation;
