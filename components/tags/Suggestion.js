import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'native-base';

const Suggestion = ({ label, onPress, style, textStyle }) => (
  <View>
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 3,
    backgroundColor: 'white'
  },
  label: {
    color: '#262626'
  }
});

Suggestion.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};

Suggestion.defaultProps = {
  style: null,
  textStyle: null
};

export default Suggestion;
