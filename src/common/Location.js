import {Alert, Dimensions, Linking, PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoding';
import RNLocation from 'react-native-location';

export const {width, height} = Dimensions.get('window');

export const hitSlop = {top: 20, bottom: 20, right: 20, left: 20};

export const askForPermissions = async () => {
  let result;
  let granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )
    .then((response) => {
      result = response;
      return response;
    })
    .catch((err) => {
      throw err;
    });
  if (!granted) {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]).then((response) => {
      console.log('askForPermissions -> response', response);
      if (
        response['android.permission.ACCESS_FINE_LOCATION'] ===
        'never_ask_again'
      ) {
        Alert.alert(
          'Permissions Denied',
          'Go to settings to turn then on',
          [
            {
              text: 'Go to settings',
              onPress: () => Linking.openSettings(),
            },
          ],
          {cancelable: false},
        );
      }
    });
  } else {
    result = true;
  }
  return result;
};

export const getCurrentLocation = async () => {
  let result = false;
  RNLocation.configure({
    distanceFilter: 1,
    interval: 100,
    androidProvider: 'auto',
    desiredAccuracy: {
      ios: 'best',
      android: 'highAccuracy',
    },
  });
  await RNLocation.getLatestLocation(1000).then((position) => {
    if (position) {
      const {latitude, longitude} = position;
      result = {latitude, longitude};
    }
  });
  return result;
};

export const getLocation = async (value) => {
  let result;
  await Geocoder.from(value)
    .then((res) => {
      result = res.results[0].geometry.location;
    })
    .catch((err) => {
      console.log('err', err);
    });
  return result;
};

export const getAddress = async (lat, long) => {
  console.log('long', long);
  console.log('lat', lat);
  let result = false;
  //   const resultlocation = Geocoder.from('Shah faisal')
  //     .then((res) => {
  //       console.log('res', res);
  //     })
  //     .catch((err) => {
  //       console.log('err', err);
  //     });
  await Geocoder.from(lat, long)
    .then((json) => {
      console.log('json', json);
      let city;
      let address;
      let streetAddress;
      console.log('json.results', json.results);
      for (const index in json.results) {
        const element = json.results[index];
        if (element.types[0] === 'route') {
          address = element.formatted_address;
        }
        if (element.types[0] === 'street_address') {
          streetAddress = element.address_components[0].long_name;
        }
        for (const elementIndex in element.address_components) {
          const formatted_address = element.address_components[elementIndex];
          if (formatted_address.types[0] === 'locality') {
            city = formatted_address.long_name;
          }
        }
      }
      result = {address, city, streetAddress};
    })
    .catch((error) => console.log('error', error));
  return result;
};

export const getInitials = (string) => {
  var initials = string.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};
