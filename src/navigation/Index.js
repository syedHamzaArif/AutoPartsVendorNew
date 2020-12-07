/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import ProfileIcon from 'react-native-vector-icons/AntDesign';
import MyStoreIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from '#containers/Auth/';
import LoginScreen from '#containers/Auth/Login';
import Home from '#containers/App/Home';
import Onboard from '#containers/onboard/Onboard';
import {AuthContext} from '#context/';
import {colors} from '#res/colors';
import MyStore from './bottomNavigation/MyStore';
import Profile from './bottomNavigation/Profile';
import Menu from './bottomNavigation/Menu';
import Sell from './bottomNavigation/Sell';
import SearchLocation from './bottomNavigation/ProductSteps/SearchLocation';

import images from '#assets/';
import SplashScreen from 'react-native-splash-screen';
import Geocoder from 'react-native-geocoding';

// import {AuthContext} from '../context/index';
// import Onboard from '../containers/Onboard/Onboard';
// import Login from '../containers/Auth/Login/index';
// import Home from '../containers/App/Home';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={(params) => ({
      // gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      // cardStyle: { opacity: 1, shadowOpacity: 1 }
    })}
    mode="card"
    headerMode="none">
    <AuthStack.Screen
      options={{headerTitle: 'Login'}}
      name="Login"
      component={Login}
    />
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    {/* appstack component */}
    <HomeStack.Screen name="HomeScreen" component={BottomHome} />
    <HomeStack.Screen name="SearchLocation" component={SearchLocation} />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const AppStackScreen = () => (
  <HomeStack.Navigator
    // initialRouteName={Home}
    screenOptions={(params) => ({
      // gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      // cardStyle: { opacity: 1, shadowOpacity: 1 }
    })}
    mode="card"
    headerMode="none">
    <HomeStack.Screen name="HomeScreen" component={Home} />
  </HomeStack.Navigator>
);
const Tab = createBottomTabNavigator();

const BottomHome = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      tabBarOptions={{
        activeTintColor: colors.primaryGreen,
        inactiveTintColor: 'black',
        // activeBackgroundColor: 'green',
        // inactiveBackgroundColor: 'white',
        // activeBackgroundColor: colors.primaryGreen,
        // inactiveBackgroundColor: 'grey',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <HomeIcon name="home" size={25} />,
        }}
      />

      <Tab.Screen
        name="MY STORE"
        component={MyStore}
        options={{
          tabBarIcon: () => <MyStoreIcon name="store-outline" size={30} />,
        }}
      />

      <Tab.Screen
        name="SELL"
        component={Sell}
        options={{
          tabBarIcon: () => (
            <Image
              source={images.sell}
              // source={iconName3}
              resizeMode="contain"
              style={styles.logo}
            />
          ),
          title: '',
        }}
      />

      <Tab.Screen
        name="PROFILE"
        component={Profile}
        options={{
          tabBarIcon: () => <ProfileIcon name="profile" size={25} />,
        }}
      />
      <Tab.Screen
        name="MENU"
        component={Menu}
        options={{
          tabBarIcon: () => (
            <Image
              source={images.menu}
              // source={iconName3}
              resizeMode="contain"
              style={styles.logo}
            />
          ),
          title: '',
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = ({onboarding, userToken}) => {
  onboarding = true;
  userToken = false;
  return (
    <RootStack.Navigator headerMode="none">
      {onboarding ? (
        userToken ? (
          <RootStack.Screen name="App" component={AppStackScreen} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackScreen} />
        )
      ) : (
        <RootStack.Screen name="Onboard" component={Onboard} />
      )}
    </RootStack.Navigator>
  );
};

const Index = () => {
  const [userToken, setUserToken] = useState(false);
  const [onboarding, setOnboarding] = useState('');
  const flashMessageRef = useRef(null);

  const init = async () => {
    Geocoder.init('AIzaSyAZixPVL0sVwox5_qi2KXo8rvRBM_TpPx8');
  };
  // const init = async () => {
  //   // AsyncStorage.removeItem('@token');
  //   try {
  //     await AsyncStorage.getItem('@onboarding').then((value) =>
  //       setOnboarding(value),
  //     );
  //     await AsyncStorage.getItem('@token').then(async (value) => {
  //       try {
  //         const result = await Service.verifyToken(value);
  //         console.log('init -> result', result);
  //         setUserToken(value);
  //       } catch (error) {
  //         console.log('init -> error', error);
  //       } finally {
  //         SplashScreen.hide();
  //       }
  //     });
  //   } catch (error) {
  //     console.log('file: Index.js => line 194 => init => error', error);
  //   } finally {
  //     SplashScreen.hide();
  //   }
  // };

  useEffect(() => {
    init();
  }, []);

  const authContext = useMemo(() => {
    return {
      showFlashMessage: (body) => {
        showMessage(body);
      },
      login: (token) => {
        setUserToken(token);
      },
      onboard: () => {
        setOnboarding('true');
        AsyncStorage.setItem('@onboarding', 'true');
      },
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} onboarding={onboarding} />
      </NavigationContainer>
      <FlashMessage ref={flashMessageRef} />
    </AuthContext.Provider>
  );
};
const styles = StyleSheet.create({
  logo: {
    height: 80,
    // height: '80%',
    // width: '10%',
  },
});

export default Index;
