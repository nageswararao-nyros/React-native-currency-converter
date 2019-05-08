import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import moment from 	'moment';
import styles from './styles';
const CurrencyInfo = ({ amount, base,quote, date, conversionRate}) => {
	return(
		<View style={ styles.container } >
			<Text style={ styles.text }>
				{amount} { base } = { conversionRate } { quote } as of { moment(date).format('MMMM D, YYYY')}
			</Text>
		</View>
	)
}

CurrencyInfo.propTypes = {
	base: PropTypes.string,
	quote: PropTypes.string,
	date: PropTypes.object,
	amount: PropTypes.number,
	conversionRate: PropTypes.number
}
export default CurrencyInfo;