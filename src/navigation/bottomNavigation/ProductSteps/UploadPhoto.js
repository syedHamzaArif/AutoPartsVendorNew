/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Left from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePickers from '@fancydevpro/react-native-image-picker';
import CameraRoll from '@react-native-community/cameraroll';

import images from '#assets/';
import {colors} from '#res/colors';

const requestLocationRunTimePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'Athlete Avenue needs access your photos',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      AsyncStorage.setItem('@writePermission', 'true');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return 'false';
  }
};

const options = {
  title: 'Select Image',
  // customButtons: [{name:'image', title: 'Chose photo from gallery'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UploadPhoto = ({data, pressHandler, backwardStep}) => {
  const [image, setImages] = useState(false);
  const [getGallery, setGetGallery] = useState([]);

  let imagePath = '';

  useEffect(() => {
    requestGetGalleryImages();
  }, []);

  // ImagePicker.openPicker({
  //   multiple: true,
  // }).then((images) => {
  //   console.log(images);
  // });

  const requestGetGalleryImages = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      }
      CameraRoll.getPhotos({
        first: 5,
        assetType: 'Photos',
      })
        .then((res) => {
          console.log(
            'file: UploadPhoto.js => line 80 => .then => res',
            res.edges,
          );
          // this.setState({data: res.edges});
          setGetGallery({getGallery: res.edges});
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      return 'false';
    }
  };

  const myImagePicker = async (type) => {
    await AsyncStorage.getItem('@writePermission')
      .then((res) => {
        if (res != null) {
          //console.log('al

          // ImagePicker.openPicker({
          //   multiple: true,
          // }).then((response) => {
          //   console.log(
          //     'file: UploadPhoto.js => line 111 => .then => response',
          //     response,
          //   );
          //   imagePickerCallback(response, type);
          // });

          ImagePickers.showImagePicker(options, (response) => {
            // console.log('myImagePicker -> response', response.path);
            imagePickerCallback(response, type);
          });
        } else {
          const permission = requestLocationRunTimePermission();
          if (permission) {
            // ImagePicker.openPicker({
            //   multiple: true,
            // }).then((response) => {
            //   console.log(
            //     'file: UploadPhoto.js => line 111 => .then => response',
            //     response,
            //   );
            //   imagePickerCallback(response);
            // });
            ImagePickers.showImagePicker(options, (response) =>
              imagePickerCallback(response, type),
            );
            // console.log('allowed');
          } else {
            //console.log('not allowed');
          }
        }
      })
      .catch((err) => alert('err-> ', err));
  };

  const imagePickerCallback = async (response) => {
    if (response.didCancel) {
      //console.log('User cancelled image picker');
    } else if (response.error) {
      //console.log('Image picker error: ', response.error);
    } else if (response.customButton) {
      //console.log('User tapped custom button: ', response.customButton);
    } else {
      setImages(response.uri);
      imagePath = response.uri;
      console.log(
        'file: UploadPhoto.js => line 90 => imagePickerCallback => imagePath',
        imagePath,
      );
      let formData = new FormData();

      formData.append('image', {
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      });
      // console.log(
      //   'file: UploadPhoto.js => line 90 => imagePickerCallback => formData',
      //   formData._parts[0][1].name,
      // );
      //   try {
      //     const result = await Service.uploadFile(formData);
      //     console.log('imagePickerCallback -> result', result);

      //     setImages(result[0].FileLink);
      //   } catch (error) {
      //     console.log('imagePickerCallback -> error', error);
      //   }
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <StatusBar backgroundColor={colors.DARKRED} />
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={images.subCateg}
          style={{width: '100%', height: '28%'}}
        />
      </View>
      <View style={styles.Heading}>
        <Left name="left" size={34} color="white" onPress={backwardStep} />
        <Text style={styles.txt}>Upload Your Photos</Text>
      </View>
      <View style={{marginTop: 100}}>
        <Image
          source={images.imageGroup}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.txtStatus}>
          Uploading photos increases your chance of closing a deal
        </Text>
        {/* {image ? ( */}
        <Image
          style={{width: 100, height: 100, alignSelf: 'center'}}
          source={{
            uri: image,
          }}
          resizeMode="contain"
        />
        {/* ) : null} */}
        <FlatList
          data={getGallery}
          numColumns={3}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item}) => {
            const updatedURI = item.node.image.uri;
            return (
              <Image
                style={{
                  width: 100,
                  height: 120,
                  alignSelf: 'center',
                  backgroundColor: 'red',
                }}
                source={{uri: image}}
                resizeMode="contain"
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={[styles.btn, {marginVertical: 10}]}
          onPress={myImagePicker}>
          <Text style={styles.txtbtn}>Take a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={pressHandler}>
          <Text style={styles.txtbtn}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  car: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
    marginTop: 120,
    // backgroundColor: 'black',
  },
  txtoffer: {
    fontFamily: 'Konnect-Light',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    // backgroundColor: 'black',
  },
  itemShow: {
    borderColor: colors.RED,
    borderRadius: 10,
    width: '30%',
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
    alignItems: 'center',
    padding: 5,
    marginVertical: 10,
    // height: 80,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemText: {
    fontSize: 12,
    fontFamily: 'Konnect-Medium',
    marginVertical: 5,
  },
  Heading: {
    flexDirection: 'row',
    marginTop: 60,
    margin: 10,
    // backgroundColor: 'red'
  },
  txt: {
    color: 'white',
    fontFamily: 'Konnect-Light',
    fontSize: 26,
    marginLeft: 4,
  },
  txtStatus: {
    marginHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'Konnect-Light',
  },
  logo: {
    width: 120,
    height: 120,
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  btn: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.RED,
    padding: 10,
    alignItems: 'center',
  },
  txtbtn: {
    color: 'white',
    fontFamily: 'Konnect-Light',
  },
});

export default UploadPhoto;
