/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, FlatList} from 'react-native';

import {colors} from '#res/colors';
import images from '#assets/';
import StepIndicator from 'react-native-step-indicator';
import Category from './ProductSteps/Category';
import {set} from 'react-native-reanimated';
import Form from './ProductSteps/Form';
import SubCategory from './ProductSteps/SubCategory';
import UploadPhoto from './ProductSteps/UploadPhoto';
import {ScrollView} from 'react-native-gesture-handler';
import LocationScreeen from './ProductSteps/LocationScreeen';
import Review from './ProductSteps/Review';

const Sell = (props) => {
  const [step, setStep] = useState(0);

  const labels = ['1', '2', '3', '4', '5'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#293747',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#293747',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#293747',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#293747',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#293747',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#293747',
  };

  const data = [
    {
      id: 0,
      Name: 'LED & lightning',
      image: images.sellLogo,
    },
    {
      id: 1,
      Name: 'Extractor',
      image: images.sellLogo,
    },
    {
      id: 2,
      Name: 'Car Care',
      image: images.sellLogo,
    },
    {
      id: 3,
      Name: 'LED & lightning',
      image: images.sellLogo,
    },
    {
      id: 4,
      Name: 'LED & lightning',
      image: images.sellLogo,
    },
    {
      id: 5,
      Name: 'LED & lightning',
      image: images.sellLogo,
    },
    {
      id: 6,
      Name: 'LED & lightning',
      image: images.sellLogo,
    },
    {
      id: 7,
      Name: 'LED & lightning',
      image: images.sellLogo,
    },
  ];

  const forwardStep = () => {
    const updatedStep = parseInt(step + 1, 10);
    setStep(updatedStep);
    return updatedStep;
  };

  const backwardStep = () => {
    const updatedStep = parseInt(step - 1, 10);
    setStep(updatedStep);
  };

  const pressHandler = (type) => {
    switch (type) {
      case 'category':
        const updated = forwardStep();
        break;

      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {(step === 0 && (
        <Category
          data={data}
          pressHandler={pressHandler.bind(this, 'category')}
        />
      )) ||
        (step === 1 && (
          <SubCategory
            data={data}
            pressHandler={pressHandler.bind(this, 'category')}
            backwardStep={backwardStep}
          />
        )) ||
        (step === 2 && <Form backwardStep={backwardStep} />) ||
        (step === 3 && (
          <UploadPhoto
            pressHandler={pressHandler.bind(this, 'category')}
            backwardStep={backwardStep}
          />
        )) ||
        (step === 4 && (
          <LocationScreeen
            backwardStep={backwardStep}
            pressHandler={pressHandler.bind(this, 'category')}
          />
        )) ||
        (step === 5 && (
          <Review
            backwardStep={backwardStep}
            pressHandler={pressHandler.bind(this, 'category')}
          />
        ))}
      <View style={{marginVertical: 20}}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={step}
          labels={labels}
          onPress={(_step) => setStep(_step)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flexGrow: 1,
  },
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
});
export default Sell;
