/* eslint-disable no-unused-vars */
import React from 'react';
import {LogBox, View, Text} from 'react-native';
import Index from './src/navigation/Index';

LogBox.ignoreLogs([
  'VirtualizedLists',
  'Cannot',
  "Can't",
  'Failed',
  'componentWillReceiveProps',
  'componentWillMount',
]);
const App = () => {
  return <Index />;
};
export default App;

///

// import React, {Component} from 'react';
// import {
//   View,
//   Image,
//   FlatList,
//   PermissionsAndroid,
//   Platform,
//   Text,
// } from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';

// export default class camera extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: '',
//     };
//   }

//   async componentDidMount() {
//     if (Platform.OS === 'android') {
//       const result = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: 'Permission Explanation',
//           message: 'ReactNativeForYou would like to access your photos!',
//         },
//       );
//       if (result !== 'granted') {
//         console.log('Access to pictures was denied');
//         return;
//       }
//     }

//     CameraRoll.getPhotos({
//       first: 5,
//       assetType: 'Photos',
//     })
//       .then((res) => {
//         this.setState({data: res.edges});
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render() {
//     return (
//       <View style={{flex: 1, backgroundColor: 'grey'}}>
//         <Text>Check</Text>
//         <FlatList
//           data={this.state.data}
//           numColumns={3}
//           contentContainerStyle={{flexGrow: 1}}
//           renderItem={({item}) => {
//             const updatedURI = item.node.image.uri;
//             console.log(
//               'file: App.js => line 84 => camera => render => updatedURI',
//               updatedURI,
//             );
//             return (
//               <Image
//                 style={{
//                   width: 100,
//                   height: 120,
//                 }}
//                 source={{uri: updatedURI}}
//               />
//             );
//           }}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//     );
//   }
// }
