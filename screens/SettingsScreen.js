import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');

const data = {
  0: {
    image: 'https://placekitten.com/200/240',
    text: 'Chloe'
  },
  1: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper'
  },
  2: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper'
  },
  3: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar'
  },
  4: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper'
  },
  5: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper'
  },
  6: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar'
  }
};

export default class Basic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native Sortable List</Text>
        <SortableList
          style={styles.list}
          rowActivationTime={100}
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderRow={this._renderRow}
        />
      </View>
    );
  }

  _renderRow = ({ data, active }) => {
    return <Row data={data} active={active} />;
  };
}

class Row extends Component {
  render() {
    const { data, active } = this.props;

    return (
      <View style={styles.row}>
        <Image source={{ uri: data.image }} style={styles.image} />
        <Text style={styles.text}>{data.text}</Text>
        <Button onPress={() => console.log('object')} title="test" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20
      }
    })
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999'
  },

  list: {
    flex: 1
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30
      },

      android: {
        paddingHorizontal: 0
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,

    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30
      }
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25
  },

  text: {
    fontSize: 24,
    color: '#222222'
  }
});
