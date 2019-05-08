import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const SubmitButton = ({text, onPress, textColor}) =>{
	const containerStyles = [styles.textStyles];
	  if (textColor) {
	    containerStyles.push({color:textColor});
	  }
	return(
		<TouchableOpacity style={styles.textStyles} onPress = { onPress }>
			<View  style={styles.btnStyles}>
				<Text style={containerStyles}> {text} </Text>
			</View>
		</TouchableOpacity>
	)
}

SubmitButton.propTypes =  {
	text: PropTypes.string,
	onPress: PropTypes.func
}

export default SubmitButton;