import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView , Text, Platform} from 'react-native';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { connectAlert } from '../components/Alert';
import { InputWithButton } from '../components/InputWithButton';
import { SwapButton } from '../components/SwapButton';
import { Header } from '../components/Header';
import { ErrorMsg } from '../components/ErrorMsg';
import { CurrencyInfo } from '../components/CurrencyInfo';
import { changeCurrencyAmount, swapCurrency, getInitialConversion, setQuotePrice } from '../actions/currencies';
import { connect } from 'react-redux';
import { SubmitButton } from '../components/SubmitButton'
import { Ionicons } from '@expo/vector-icons';

const TEMP_DATE = new Date();
const TEMP_CONVERSION_RATE = 0.797;
const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_SIZE = 23;


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      error_msg: "",
      value: this.props.amount.toString()
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    const { currencyError, alertWithType } = this.props;
    if (nextProps.currencyError && !currencyError) {
      alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

  handleChangeText = (amount) => {
    const regex = /[0-9]+/g
    const textValid = regex.test(amount)
    if(textValid){
      this.setState({error_msg: ""})
      this.props.dispatch(changeCurrencyAmount(amount));
    }else{
      this.setState({value: ''})
    }
  };

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate("CurrencyList", {title: " Base Currency ", type: "base"});
  };

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate("CurrencyList", {title: " Quote Currency ", type:"quote"});
  };

  handleSwap = () => {
    this.props.dispatch(swapCurrency());
  };

  HederPress = () =>{
    this.props.navigation.navigate("OptionsList", {title: " Options "});
  }

  handleSubmit = () =>{
    if(this.props.amount == ""){
      this.setState({error_msg: "This Field Required"})
    }else{
      this.props.dispatch(setQuotePrice(this.props.quotePrice));
      this.props.navigation.navigate("ShowDetails", {title: "ShowDetails"});
    }
  }

  render() {
    return (
      <Container backgroundColor={ this.props.primaryColor }>
        <StatusBar backgroundColor={this.props.primaryColor} barStyle="light-content" />
        <Header
          onPress = {this.HederPress}
        />
        <KeyboardAvoidingView behavior="padding">
        <Logo tintColor={ this.props.primaryColor }/>
        <InputWithButton
          buttonText={this.props.baseCurrency}
          customIcon={
            <Ionicons name={`${ICON_PREFIX}-arrow-dropdown`} size={ICON_SIZE} color={this.props.primaryColor} />
          }
          onPress={this.handlePressBaseCurrency}
          defaultValue={this.state.value}
          keyboardType="numeric"
          error= {this.state.error_msg}
          onChangeText={this.handleChangeText}
          textColor= {this.props.primaryColor}
        />
        <InputWithButton
          editable={false}
          buttonText={this.props.quoteCurrency}
          onPress={this.handlePressQuoteCurrency}
          value={this.props.quotePrice}
          customIcon={
            <Ionicons name={`${ICON_PREFIX}-arrow-dropdown`} size={ICON_SIZE} color={this.props.primaryColor} />
          }
          textColor= {this.props.primaryColor}
        />
        <CurrencyInfo
          base={this.props.baseCurrency}
          quote={this.props.quoteCurrency}
          date= {TEMP_DATE}
          amount= {this.props.amount}
          conversionRate={this.props.quotePrice}
        />
        <SwapButton
          text= "Reverse Currencies"
          onPress= {this.handleSwap}
         />
         <SubmitButton
         text= "Submit"
         onPress={this.handleSubmit}
         textColor={this.props.primaryColor}
         />
         </KeyboardAvoidingView>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency
  const quoteCurrency = state.currencies.quoteCurrency
  const amount = state.currencies.amount
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const conversionRate = (quoteCurrency == baseCurrency) ? 1 :rates[quoteCurrency] || 0 ;
  const quotePrice = (amount * conversionRate).toFixed(2);

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    quotePrice,
    // conversionRate: rates[quoteCurrency] || 0,
    // conversionRate: (quoteCurrency == baseCurrency) ? 1 :rates[quoteCurrency] || 0,
    conversionRate,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    isFetching: conversionSelector.isFetching,
    primaryColor: state.themes.primaryColor,
    currencyError: state.currencies.error,
  };
}

export default connect(mapStateToProps)(connectAlert(Home));
