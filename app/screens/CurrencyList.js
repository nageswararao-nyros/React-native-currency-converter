import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, StatusBar, View,} from 'react-native';
import {ListItem, Separator} from '../components/List';
import currencies from '../Data/currencies';
import {changeBaseCurrency, changeQuoteCurrency} from '../actions/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
  static propTypes ={
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    primaryColor: PropTypes.string,
  };
  handlePress = (currency) => {
    const {type} = this.props.navigation.state.params;
    if(type==='base'){
      this.props.dispatch(changeBaseCurrency(currency));
    }else if(type==='quote'){
      this.props.dispatch(changeQuoteCurrency(currency));
    }

    this.props.navigation.goBack(null);
  };

  render() {
    let comparisonCurrency = this.props.baseCurrency;
    if(this.props.navigation.state.params.type == 'quote'){
      comparisonCurrency = this.props.quoteCurrency;
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={currencies}
          renderItem={({ item }) => (
          <ListItem 
            text = {item}
            selected ={item === comparisonCurrency}
            onPress={() => this.handlePress(item)}
            iconBackground = {this.props.primaryColor}
          />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent = {Separator}
        />
      </View>
    );
  }
}

const mapStatetoprops = (state) => {
  return{
    baseCurrency: state.currencies.baseCurrency,
    quoteCurrency: state.currencies.quoteCurrency,
    primaryColor: state.themes.primaryColor,
  };


};


export default connect(mapStatetoprops)(CurrencyList);