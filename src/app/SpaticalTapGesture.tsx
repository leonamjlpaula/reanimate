import { StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const CIRCLE_RADIUS = 30;

const SpaticalTapGesture = () => {
  const left = useSharedValue(0);
  const top = useSharedValue(0);
  const scale = useSharedValue(0);

  const previousLeft = useSharedValue(0);
  const previousTop = useSharedValue(0);

  const animatedLeft = useDerivedValue(() => {
    return withTiming(left.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  });

  const animatedTop = useDerivedValue(() => {
    return withTiming(top.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  });

  const tapGesture = Gesture.Tap()
    .onBegin(event => {
      previousLeft.value = left.value;
      previousTop.value = top.value;
      left.value = event.x - CIRCLE_RADIUS;
      top.value = event.y - CIRCLE_RADIUS;
    })
    .onFinalize(() => {
      scale.value = withSpring(0);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      left: left.value,
      top: top.value,
      transform: [{ scale: scale.value }],
    };
  }, []);

  const rPreviousStyle = useAnimatedStyle(() => {
    return {
      left: previousLeft.value,
      top: previousTop.value,
    };
  }, []);

  const rMagicCircleStyle = useAnimatedStyle(() => {
    return {
      left: animatedLeft.value,
      top: animatedTop.value,
    };
  }, []);

  //React to the change in the position of the circle. Similar to useEffect
  //Fires on mounting
  useAnimatedReaction(
    () => {
      return left.value;
    },
    (current, previous) => {
      //If the position of the circle changes and it is not the initial position, then animate the scale of the circle
      if (current !== previous && current !== 0) {
        cancelAnimation(scale);
        scale.value = 0;
        scale.value = withSpring(1, { mass: 0.5 });
      }
    },
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={styles.container}>
          <Animated.View style={[styles.baseCircle, rStyle]} />
          <Animated.View style={[styles.baseCircle, rPreviousStyle]} />
          <Animated.View
            style={[styles.baseCircle, styles.blueCircle, rMagicCircleStyle]}
          />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  baseCircle: {
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: '#2f2f2f',
    position: 'absolute',
  },
  blueCircle: {
    backgroundColor: '#0074d3',
  },
});

export default SpaticalTapGesture;
