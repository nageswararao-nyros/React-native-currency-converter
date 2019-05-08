import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const ErrorMsg = ({ error = null}) => {
	return(
		<View>
		  <Text style={styles.textStyle}> {error} </Text>
		</View>
	);
}

export default ErrorMsg;