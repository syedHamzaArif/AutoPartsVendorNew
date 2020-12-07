/* eslint-disable no-unused-vars */
import images from '#assets/';
import {colors} from '#res/colors';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const FormItem = ({item, changeHandler}) => {
  const {type, id, fieldName, values, value} = item;
  let element = null;

  switch (type) {
    case 'input':
      element = (
        <View style={styles.mainStyle} key={id}>
          <Text onChangeText={changeHandler.bind(this, id)}>
            {fieldName} An input field will show here
          </Text>
        </View>
      );
      break;
    case 'input-multi':
      element = (
        <View key={id}>
          <TextInput
            placeholder={fieldName}
            value={value ? value : ''}
            onChangeText={changeHandler.bind(this, id)}
          />
        </View>
      );
      break;
    case 'radio':
      element = (
        <View key={id}>
          <Text>{fieldName} A group of radio buttons will show here</Text>
        </View>
      );
      break;
    case 'dd':
      element = (
        <View key={id}>
          <Text>
            {fieldName}A button will show here, Modal will be opened on tapping
          </Text>
        </View>
      );
      break;

    default:
      break;
  }

  return element;
};

const styles = StyleSheet.create({
  mainStyle: {
    // paddingHorizontal: 20
  },
});

export default FormItem;
