import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  TextInput,
  ViewPropTypes,
  Text
} from 'react-native';
import Tag from './Tag';
import Suggestion from './Suggestion';

const BACKSPACE = 'Backspace';

export const AutocompleteTags = ({
  tags,
  labelExtractor,
  text,
  onChangeText,
  onChangeTags,
  minInputWidth,
  suggestions,
  suggestionExtractor,
  onSuggestionPress,
  renderSuggestion,
  renderTag,
  inputProps,
  flatListProps,
  containerStyle,
  tagContainerStyle,
  inputContainerStyle,
  inputStyle,
  tagStyle,
  tagTextStyle,
  suggestionContainerStyle,
  suggestionStyle,
  filterSuggestions,
  suggestionTextStyle,
  onTagPress
}) => {
  const inputRef = useRef(null);
  const extractor = suggestionExtractor || labelExtractor;

  const getSuggestions = () => {
    if (filterSuggestions) {
      return filterSuggestions(text);
    }
    if (!text || text === '') {
      return [];
    }
    const regex = new RegExp(`${text.trim()}`, 'i');
    const filtredSuggestions = suggestions.filter(
      item => extractor(item).search(regex) >= 0
    );

    return filtredSuggestions.filter(item => {
      if (tags.find(tag => item.name === tag.name)) {
        return;
      }
      return item;
    });
  };
  const g = getSuggestions(suggestions);

  const handleSuggestionPress = suggestion => {
    onSuggestionPress(suggestion);
    inputRef.current.focus();
  };

  const handleTagPress = tag => {
    if (onTagPress) {
      onTagPress(tag);
    } else {
      onChangeTags(tags.filter(a => a !== tag));
    }
  };

  // eslint-disable-next-line react/prop-types
  const renderSuggestionItem = ({ item }) => {
    if (renderSuggestion) {
      return renderSuggestion(item);
    }
    return (
      <Suggestion
        label={extractor(item)}
        onPress={() => handleSuggestionPress(item)}
        style={suggestionStyle}
        textStyle={suggestionTextStyle}
      />
    );
  };

  const renderTagItem = item => {
    if (renderTag) {
      return renderTag(item);
    }
    return (
      <Tag
        label={labelExtractor(item)}
        key={labelExtractor(item)}
        style={tagStyle}
        textStyle={tagTextStyle}
        onPress={() => handleTagPress(item)}
      />
    );
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current.focus()}
      >
        <View style={[styles.tagContainer, tagContainerStyle]}>
          {tags.map(a => renderTagItem(a))}
          <View
            style={[
              styles.inputContainer,
              inputContainerStyle,
              { flexBasis: minInputWidth }
            ]}
          >
            <TextInput
              value={text}
              onChangeText={onChangeText}
              ref={inputRef}
              style={[styles.input, inputStyle]}
              {...inputProps}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View>
        {!!g.length && (
          <View style={styles.absoluteList}>
            <FlatList
              data={g}
              keyExtractor={a => labelExtractor(a)}
              keyboardShouldPersistTaps="handled"
              renderItem={renderSuggestionItem}
              contentContainerStyle={suggestionContainerStyle}
              {...flatListProps}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2000,
    flex: 1
  },
  tagContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderColor: '#262626',
    borderWidth: 0.5,
    borderRadius: 4,
    minHeight: 35,
    padding: 3,
    flexWrap: 'wrap'
  },
  inputContainer: {
    flexGrow: 1
  },
  input: {},
  relativeList: {},
  absoluteList: {
    marginTop: 5,
    borderColor: '#262626',
    borderWidth: 0.5
  }
});

AutocompleteTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  labelExtractor: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onChangeTags: PropTypes.func.isRequired,
  minInputWidth: PropTypes.number,
  suggestions: PropTypes.arrayOf(PropTypes.any),
  suggestionExtractor: PropTypes.func,
  onSuggestionPress: PropTypes.func,
  onTagPress: PropTypes.func,
  renderSuggestion: PropTypes.func,
  renderTag: PropTypes.func,
  filterSuggestions: PropTypes.func,
  inputProps: PropTypes.shape(TextInput.propTypes),
  flatListProps: PropTypes.shape(FlatList.propTypes),
  containerStyle: ViewPropTypes.style,
  tagContainerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: ViewPropTypes.style,
  tagStyle: ViewPropTypes.style,
  tagTextStyle: Text.propTypes.style,
  suggestionStyle: ViewPropTypes.style,
  suggestionContainerStyle: ViewPropTypes.style,
  suggestionTextStyle: Text.propTypes.style
};

AutocompleteTags.defaultProps = {
  minInputWidth: 100,
  suggestions: [],
  suggestionExtractor: () => {},
  onSuggestionPress: null,
  renderSuggestion: null,
  renderTag: null,
  inputProps: null,
  flatListProps: null,
  tagContainerStyle: null,
  inputContainerStyle: null,
  inputStyle: null,
  tagStyle: null,
  tagTextStyle: null,
  suggestionStyle: null,
  suggestionContainerStyle: null,
  filterSuggestions: null,
  onTagPress: null,
  containerStyle: null,
  suggestionTextStyle: null
};

export default AutocompleteTags;
