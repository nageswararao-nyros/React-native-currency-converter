import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

const SwapButton = ({onPress, text}) =>(
	<TouchableOpacity style={styles.container} onPress = { onPress }>
		<View style={styles.wrapper}>
			<Image resizeMode="contain" style={styles.icon} source={require('./images/icon.png')} />
			<Text style={styles.text} > { text } </Text>
		</View>
	</TouchableOpacity>
);

SwapButton.propTypes = {
	text: PropTypes.string,
	onPress: PropTypes.func
}

export default SwapButton;