import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import AutocompleteTags from '../components/tags';

const suggestions = [
  { name: 'Boris Yeltsin', email: 'boris.yeltsin@abc.com ' },
  { name: 'Tom Boboby', email: 'tom.boboy@abc.com' }
];

const Demo = () => {
  const [text, setText] = useState('');
  const [tags, setTags] = useState([
    { name: 'Fred Hendriks', email: 'fred.hendricks@abc.com' }
  ]);

  const onChangeText = text => {
    setText(text);

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [' ', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      if (!text.trim().length) {
        return setText('');
      }
      const isDuplicate = tags.some(tag => tag.name === text);
      if (isDuplicate) {
        return setText('');
      }
      setTags(tags => [...tags, { name: text }]);
      setText('');
    }
  };

  const handleSuggestionPress = suggestion => {
    setText('');
    setTags(tags => [...tags, suggestion]);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.rowContainer]}>
        <AutocompleteTags
          tags={tags}
          labelExtractor={item => item.name}
          text={text}
          onChangeText={onChangeText}
          onChangeTags={tags => setTags(tags)}
          suggestions={suggestions}
          suggestionExtractor={item => item.name}
          onSuggestionPress={handleSuggestionPress}
          tagContainerStyle={{ backgroundColor: 'white' }}
          inputProps={{
            autoCapitalize: 'none',
            autoCorrect: false
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8
  }
});

export default Demo;
