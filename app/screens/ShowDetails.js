import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import { StatusBar,ScrollView } from 'react-native';
import { SubmitButton } from '../components/SubmitButton';
import { Container } from '../components/Container';
import { SubmittedData } from '../components/SubmittedData';
import { connect } from 'react-redux';
import { changeCurrencyAmount } from '../actions/currencies';

const TEMP_DATE = new Date();

class ShowDetails extends Component{

	static propTypes = {
		baseCurrency: PropTypes.string,
		quoteCurrency: PropTypes.string
	}
	handleBack = () =>{
		this.props.navigation.navigate("Home", {title: "Home"});
	}
	render(){
		return(
			<Container backgroundColor={ this.props.primaryColor }>
				<ScrollView>
					<SubmittedData 
						text= {this.props.baseCurrency}
						amount= {this.props.amount}
						quoteCurrency = {this.props.quoteCurrency}
						quotePrice= {this.props.quotePrice}
						date={TEMP_DATE}
						rate={this.props.comapreRate}
						textColor={this.props.primaryColor}
					/>
					<TouchableOpacity>
					<SubmitButton
					text="Go Back"
					onPress= {this.handleBack}
					textColor={this.props.primaryColor}
					/>
					</TouchableOpacity>
				</ScrollView >
			</Container>
		)
	}
}

const mapStateToProps = ( state ) =>{
  const baseCurrency = state.currencies.baseCurrency
  const quoteCurrency = state.currencies.quoteCurrency
  const amount = state.currencies.amount
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const conversionRate = (quoteCurrency == baseCurrency) ? 1 :rates[quoteCurrency] || 0 ;
  const comapreRate = (1 * conversionRate).toFixed(2);

  return {
    baseCurrency,
    quoteCurrency,
    comapreRate,
    amount: state.currencies.amount,
    quotePrice: state.currencies.quotePrice,
    primaryColor: state.themes.primaryColor,
    conversionRate: rates[quoteCurrency] || 0,
  };
}
export default connect(mapStateToProps)(ShowDetails);