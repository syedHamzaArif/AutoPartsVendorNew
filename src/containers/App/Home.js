/* eslint-disable no-unused-vars */
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
  useWindowDimensions,
  TouchableHighlight,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import images from '#assets/';
import {colors} from '#res/colors';
import {width, height} from '#util/';

const Home = (props) => {
  const carouselRef = useRef(null);

  const data = [
    {
      id: 0,
      title: 'Total Sales',
      subtitle: 'AUTOPARTS',
      cardNumber: '4375 8534 5678 9010',
      color: colors.BLACK,
    },
    {
      id: 1,
      title: 'Total Sales',
      subtitle: 'AUTOPARTS',
      cardNumber: '4375 8534 5678 9010',
      color: colors.GREEN,
    },
    {
      id: 2,
      title: 'Total Sales',
      subtitle: 'AUTOPARTS',
      cardNumber: '4375 8534 5678 9010',
      color: colors.RED,
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        underlayColor="#ffffff00"
        style={[styles.root, {backgroundColor: item.color}]}>
        <View style={styles.rowHeader}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.autoParts}>{item.subtitle}</Text>
          </View>
          <Text style={styles.Money}>Money</Text>
        </View>
        <View>
          <Text style={styles.pinText}>Card Pin Code</Text>
          <View style={styles.rowFooter}>
            <Text style={styles.cardNum}>{item.cardNumber}</Text>
            <Text style={styles.smallnumb}>000 11 11 11 001</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={colors.GREEN} />
      <Text style={styles.Welcome}>Welcome</Text>
      <Text style={styles.Name}>Foud Pervaiz</Text>
      <View style={styles.onBoardView}>
        <Carousel
          ref={carouselRef}
          scrollToOverflowEnabled
          data={data}
          renderItem={_renderItem}
          firstItem={1}
          // scrollEnabled={false}
          // onSnapToItem={(index) => setStep(index)}
          sliderWidth={useWindowDimensions().width}
          itemWidth={useWindowDimensions().width * 0.79}
        />
      </View>
      {/* <View style={{marginTop: 20}} /> */}

      <View>
        <View style={styles.CardRow}>
          <TouchableOpacity style={styles.Card}>
            <Text style={styles.subtxt}>Orders</Text>
            <Image
              source={images.OrdersHome}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Card}>
            <Text style={styles.subtxt}>Promotions</Text>
            <Image
              source={images.PromotionHome}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.CardRow}>
          <TouchableOpacity style={styles.Card}>
            <Text style={styles.subtxt}>Product</Text>
            <Image
              source={images.ProductHome}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Card}>
            <Text style={styles.subtxt}>Reviews</Text>
            <Image
              source={images.RewiewsHome}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.CardRow}>
          <TouchableOpacity style={styles.Card}>
            <Text style={styles.subtxt}>Sales</Text>
            <Image
              source={images.SalesHome}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Card}>
            <Text style={styles.subtxt}>Payment</Text>
            <Image
              source={images.PaymentHome}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.CardRow}>
          <TouchableOpacity style={styles.Card}>
            <Text style={styles.subtxt}>Reports</Text>
            <Image
              source={images.ReportsHome}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Card}>
            <Text style={styles.subtxt}>Returns</Text>
            <Image
              source={images.ReturnsHOme}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  Welcome: {
    fontSize: 18,
    fontFamily: 'Konnect-Regular',
  },
  Name: {
    fontFamily: 'Konnect-Regular',
    fontSize: 26,
    // fontWeight: 'bold',
  },
  CardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
    // padding: 10,
    // marginRight: 10,
  },
  Card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: colors.grey,
    elevation: 5,
    borderRadius: 14,
    width: '47%',
    padding: 10,
  },
  image: {
    alignSelf: 'flex-end',
    height: 35,
    width: 35,
  },
  subtxt: {
    fontFamily: 'Konnect-Light',
  },
  descriptionText: {
    width: width * 0.8,
    textAlign: 'center',
    color: 'white',
  },
  root: {
    borderRadius: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: 10,
    height: '100%',
  },
  title: {
    fontFamily: 'Konnect-Medium',
    color: 'white',
  },
  autoParts: {
    fontFamily: 'Konnect-Medium',
    fontSize: 20,
    color: 'white',
  },
  Money: {
    fontSize: 24,
    fontFamily: 'Konnect-SemiBold',
    color: 'white',
  },
  rowFooter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardNum: {
    fontFamily: 'Konnect-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  smallnumb: {
    fontFamily: 'Konnect-Medium',
    color: 'white',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
  },
  pinText: {
    color: 'white',
    fontFamily: 'Konnect-Medium',
    fontSize: 12,
  },
  onBoardView: {
    height: height * 0.22,
    marginBottom: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
export default Home;
