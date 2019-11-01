import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DraggableFlatList from '../HOC/DraggableFlatList';

class Example extends Component {
  state = {
    data: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `silver`
    }))
  };

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          marginTop: 10,
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 32
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 10, padding: 10 }}>
        <Text>Test</Text>
        <View style={{ flex: 1, marginTop: 10, padding: 10 }}>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            scrollPercent={5}
            onMoveEnd={({ data }) => this.setState({ data })}
          />
        </View>
      </View>
    );
  }
}

export default Example;
