import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Keyframe } from 'react-native-reanimated';

//Keyframes don't have a type because yoiu can create keys with numbers to
//specify how your animation should behave

const InitialKeyFrame = {
  opacity: 0,
  transform: [{ perspective: 100 }, { translateY: 75 }, { rotateX: '-25deg' }],
};

const EndKeyFrame = {
  opacity: 1,
  transform: [{ perspective: 100 }, { translateY: 0 }, { rotateX: '0deg' }],
};

const CustomFlipIn = new Keyframe({
  from: InitialKeyFrame,
  to: EndKeyFrame,
});

const CustomFlipOut = new Keyframe({
  from: EndKeyFrame,
  to: InitialKeyFrame,
});

const LayoutAnimationsEnteringExiting = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setToggled(p => !p)}
      style={styles.container}>
      {toggled && (
        <Animated.View
          entering={CustomFlipIn}
          exiting={CustomFlipOut}
          style={styles.square}
        />
      )}
    </TouchableOpacity>
  );
};

export default LayoutAnimationsEnteringExiting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: 120,
    aspectRatio: 1,
    backgroundColor: '#0086e6',
    borderRadius: 20,
    borderCurve: 'continuous',
  },
});
