import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View>
      {
      data.map((item, i) => {
        return (
          <Pressable key={item}
            style={
              item === userOption ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item)}>
            <Text style={styles.option}>{String.fromCharCode("A".charCodeAt(0) + i)+' : '+item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
  },
  unselected: {
    borderRadius: 5,
    padding: 5,
    borderColor: 'blue',
    borderWidth: 1,
    margin: 5,
  },
  selected: {
    borderRadius: 5,
    padding: 5,
    borderColor: 'green',
    borderWidth: 1,
    backgroundColor: 'green',
    margin: 6,
  },
});