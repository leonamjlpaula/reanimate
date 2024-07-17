import { FontAwesome } from '@expo/vector-icons';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const AnimatedText = () => {
  const count = useSharedValue(0);

  const randomCount = () => {
    const nextCount = withTiming(Math.random() * 100 + 1, { duration: 1000 });
    count.value = nextCount;
  };

  const countString = useDerivedValue(() => {
    return Math.floor(count.value).toString();
  });

  return (
    <View style={styles.container}>
      <ReText style={styles.count} text={countString} />
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
    fontFamily: 'SFProRoundedBold',
    width: 200,
    textAlign: 'center',
  },
});

export default AnimatedText;
