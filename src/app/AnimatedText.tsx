import { FontAwesome } from '@expo/vector-icons';

import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AnimatedText = () => {
  const [count, setCount] = useState(100);

  const randomCount = () => {
    setCount(Math.floor(Math.random() * 100 + 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity onPress={randomCount} style={styles.floatingButton}>
        <FontAwesome name="random" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 48,
    right: 20,
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 50,
  },
  count: {
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
});

export default AnimatedText;
