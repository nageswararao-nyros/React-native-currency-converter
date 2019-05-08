import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Separator } from '../List';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import moment from  'moment';
const SubmittedData = ({text, amount, quotePrice, quoteCurrency, date, rate, textColor}) => {
  const containerStyles = [styles.info];
    if (textColor) {
      containerStyles.push({color:textColor});
    }
  return(
    <View style={styles.container}>
      <Separator />
      <Text  style={containerStyles}> Date: <Text> { moment(date).format('MMMM D, YYYY')} </Text> </Text>
      <Separator />
      <Text  style={containerStyles}> 1 {text}:  <Text> {rate} {quoteCurrency} </Text> </Text>
      <Separator />
      <Text  style={containerStyles}> {amount} {text}:  <Text> { quotePrice } {quoteCurrency}</Text> </Text>
      <Separator />
    </View>
  );
}

export default SubmittedData;