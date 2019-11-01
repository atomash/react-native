import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

const Tag = ({ label, onPress, style, textStyle }) => (
  <TouchableOpacity
    activeOpacity={1}
    style={[styles.container, style]}
    onPress={onPress}
  >
    <Text style={[styles.label, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    marginHorizontal: 3,
    marginBottom: 2,
    marginTop: 2,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3
  },
  label: {
    color: '#262626'
  }
});

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};

Tag.defaultProps = {
  style: null,
  textStyle: null
};

export default Tag;
