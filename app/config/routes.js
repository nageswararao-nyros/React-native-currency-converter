import { createStackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import OptionsList from '../screens/OptionsList';
import Themes from '../screens/Themes';
import ShowDetails from '../screens/ShowDetails';

const HomeStack =  createStackNavigator({
  Home:{
   screen: Home, 
   navigationOptions:{
    header: () => null,
   },
  },
  OptionsList: {
    screen: OptionsList,
    navigationOptions:{
     headerTitle: 'Options',
    },
  },
  Themes: {
    screen: Themes,
    navigationOptions:{
     headerTitle: 'Themes',
    },

  },
  ShowDetails: {
    screen: ShowDetails,
    navigationOptions:{
     headerTitle: 'Submitted Details',
    },

  },
  headerMode: 'screen',

},
);

export default createStackNavigator({
  Home: {
    screen: HomeStack, 
    navigationOptions:{
     header: () => null,
    },
    
  },
  CurrencyList: {
    screen: CurrencyList,
    navigationOptions:({navigation}) => ({
      headerTitle: navigation.state.params.title,
    }),
  },
 },
 {
  mode : 'modal',
 },
);
