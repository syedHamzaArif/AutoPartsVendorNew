import images from '#assets/';
import {colors} from '#res/colors';
import React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Left from 'react-native-vector-icons/AntDesign';

const SubCategory = ({data, pressHandler, backwardStep}) => {
  const DataList = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={pressHandler}
        style={styles.itemShow}>
        <Image
          source={item.image}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <Text style={styles.itemText}>{item.Name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={colors.DARKRED} />
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={images.subCateg}
          style={{width: '100%', height: '28%'}}
        />
      </View>
      <View style={styles.Heading}>
        <Left name="left" size={34} color="white" onPress={backwardStep} />
        <Text style={styles.txt}>LED & Lightening</Text>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={DataList}
          // horizontal={true}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1, marginTop: 100}}
          // contentContainerStyle={styles.flatlist}
        />
      </View>
    </>
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
  },
  txt: {
    color: 'white',
    fontFamily: 'Konnect-Light',
    fontSize: 26,
    marginLeft: 4,
  },
});

export default SubCategory;
