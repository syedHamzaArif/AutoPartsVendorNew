import images from '#assets/';
import {colors} from '#res/colors';
import React, {useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import FormItem from './FormItem';
import Left from 'react-native-vector-icons/AntDesign';

const form = [
  {id: 0, type: 'input', fieldName: 'Name'},
  {id: 1, type: 'input', fieldName: 'mobile'},
  {id: 2, type: 'input', fieldName: 'occupation'},
  {id: 3, type: 'input-multi', fieldName: 'Description'},
  {
    id: 4,
    type: 'radio',
    fieldName: 'Gender',
    values: [
      {valID: '1g', title: 'male'},
      {valID: '2g', title: 'female'},
    ],
  },
  {
    id: 5,
    type: 'dd',
    fieldName: 'sports',
    values: [
      {valID: '1s', title: 'Football'},
      {valID: '2s', title: 'Cricket'},
    ],
  },
];

const Form = ({data, pressHandler, backwardStep}) => {
  const [newForm, setNewForm] = useState(form);

  const changeHandler = (id, text) => {
    console.log('file: Form.js => line 43 => changeHandler => text', text);
    console.log('file: Form.js => line 43 => changeHandler => id', id);
    const updateForm = [...newForm];
    const updatedFormIteration = {...updateForm[id]};
    updatedFormIteration.value = text;
    updateForm[id] = updatedFormIteration;
    console.log(
      'file: Form.js => line 47 => changeHandler => updateForm',
      updateForm,
    );
    setNewForm(updateForm);
  };

  const FormMaping = () => {
    return newForm.map((item, index) => (
      <FormItem key={index} item={item} changeHandler={changeHandler} />
    ));
  };

  return (
    <View style={styles.mainScreen}>
      {/* {newForm.map((item, index) => {
        <FormItem item={item} changeHandler={changeHandler} />;
      })} */}
      <StatusBar backgroundColor={colors.PURPLE} />
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={images.detailBackgroundLogo}
          style={{width: '100%', height: '28%'}}
        />
      </View>
      <View style={styles.Heading}>
        <Left name="left" size={34} color="white" onPress={backwardStep} />
        <Text style={styles.txt}>Include Some Details</Text>
      </View>
      <View style={{marginTop: 100, paddingHorizontal: 20}}>
        <FormMaping />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
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
  itemShow: {
    borderColor: colors.lightBlueBorder,
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

export default Form;
