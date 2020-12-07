import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const rowCreator = (item, quantity, rate, amount) => {
  return `<tr><td style="text-align:center;">${item}</td><td style="text-align:center;">${quantity}</td><td style="text-align:center;">${rate}</td><td style="text-align:center;">${amount}</td></tr>`;
};

export const getDate = (date) => {
  var today = date;
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  // const SalesDate = mm + '/' + dd + '/' + yyyy
  today = mm + '-' + dd + '-' + yyyy;
  return today;
};
