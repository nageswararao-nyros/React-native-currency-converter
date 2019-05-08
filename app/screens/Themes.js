import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem, Separator} from '../components/List';
import {changePrimaryColor} from '../actions/themes';

const styles = EStyleSheet.create({
	$blue: "$primaryBlue",
	$orange: "$primaryOrange",
	$green: "$primaryGreen",
	$purple: "$primaryPurple"
})


class Themes extends Component {

	static propTypes = {
		navigation: PropTypes.object,
		dispatch: PropTypes.func,
		mapStateToProps: PropTypes.string
	}

	handleThemes = (color) =>{
		const { navigation, dispatch } = this.props;
	  dispatch(changePrimaryColor(color));
	  navigation.goBack();
	}
	render(){
		return(
			<ScrollView>
				<StatusBar translucent={false} barStyle="light-content" />
				<ListItem 
					text="Blue"
					onPress={()=>this.handleThemes(styles.$blue)}
					selected
					checkmark= {false}
					iconBackground={styles.$blue}
					/>
					<Separator />
					<ListItem 
					text="Orange"
					onPress={()=>this.handleThemes(styles.$orange)}
					selected
					checkmark= {false}
					iconBackground={styles.$orange}
					/>
					<Separator />
					<ListItem 
					text="Green"
					onPress={()=>this.handleThemes(styles.$green)}
					selected
					checkmark= {false}
					iconBackground={styles.$green}
					/>
					<Separator />
					<ListItem 
					text="Purple"
					onPress={()=>this.handleThemes(styles.$purple)}
					selected
					checkmark= {false}
					iconBackground={styles.$purple}
					/>
					<Separator />
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) =>{
	return{
		primaryColor: state.themes.primaryColor
	}
}

export default connect(mapStateToProps)(Themes);
