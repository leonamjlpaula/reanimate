import { FontAwesome } from '@expo/vector-icons';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SquareSize = 120;

const BouncingSquare = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  // position animation shared values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      //ORDER IS VERY IMPORTANT!: translate before rotating
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          // rotate.value = withRepeat(withTiming(rotate.value + 90), 4, true);
          rotate.value = withTiming(rotate.value + 90);
        }}
        style={[styles.square, rStyle]}
      />
      <TouchableOpacity
        style={styles.button}
        onLongPress={() => {
          scale.value = withTiming(1);
          translateX.value = withTiming(0);
          translateY.value = withTiming(0);
        }}
        onPress={() => {
          const MaxTranslationAmount = 100;
          // We want to update translateX between [-100, 100]
          const tX =
            Math.random() * MaxTranslationAmount * 2 - MaxTranslationAmount;
          const tY =
            Math.random() * MaxTranslationAmount * 2 - MaxTranslationAmount;
          translateX.value = withSpring(tX);
          translateY.value = withSpring(tY);
        }}>
        <FontAwesome name="home" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 64,
    width: 64,
    backgroundColor: '#111',
    borderRadius: 32,
    position: 'absolute',
    bottom: 48,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: SquareSize,
    width: SquareSize,
    backgroundColor: '#00a6ff',
    borderRadius: 30,
    borderCurve: 'continuous',
  },
});

export default BouncingSquare;
