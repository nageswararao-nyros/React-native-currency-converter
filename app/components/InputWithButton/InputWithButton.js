import PropTypes from 'prop-types';
import React from 'react';
import {
  View, TextInput, TouchableHighlight, Text,
} from 'react-native';
import color from 'color';
import styles from './styles';

const InputWithButton = ({
  editable,
  onPress,
  buttonText,
  customIcon,
  textColor,
  error=null,
  ...props
}) => {
  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier,
  );
  const btnError = [styles.buttonContainer];
  const containerStyles = [styles.container];
  if (editable === false) {
    containerStyles.push(styles.containerDisabled);
  }

  if(error){
    containerStyles.push({borderWidth: 1.5, borderColor: '#ff0000'})
    btnError.push({borderWidth: 1.5, borderColor: '#ff0000'})
  }

  const buttonTextStyles = [styles.buttonText];
  if (textColor) {
    buttonTextStyles.push({ color: textColor });
  }

  return (
    <View style={containerStyles}>
      <TouchableHighlight
        onPress={onPress}
        style={styles.buttonContainer}
        underlayColor={underlayColor}
      >
      <Text style={buttonTextStyles}>{buttonText} {customIcon}</Text>
      </TouchableHighlight>
      <View style={styles.separator} />
      <TextInput style={styles.input} underlineColorAndroid="transparent" {...props} />
    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,
  textColor: PropTypes.string,
  customIcon: PropTypes.element,
  error:PropTypes.string
};

export default InputWithButton;