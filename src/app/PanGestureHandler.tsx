import { StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SQUARE_SIZE = 120;

const PanGestureHandler = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const context = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      context.value = { x: translateX.value, y: translateY.value };
      isDragging.value = true;
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = translationX + context.value.x;
      translateY.value = translationY + context.value.y;
    })
    .onFinalize(() => {
      isDragging.value = false;
    });

  const rotate = useDerivedValue(() => {
    return withSpring(isDragging.value ? '45deg' : '0deg');
  }, []);

  const scale = useDerivedValue(() => {
    return withSpring(isDragging.value ? 0.6 : 1);
  }, []);

  const color = useDerivedValue(() => {
    if (isDragging.value) {
      return '#0099ff';
    }
    const isInTheWhiteSpace = translateY.value < 0;
    const isInTheBlackSpace = translateY.value > 0;
    if (isInTheWhiteSpace) {
      return 'black';
    }
    if (isInTheBlackSpace) {
      return 'white';
    }
    return '#0099ff';
  });

  const animatedColor = useDerivedValue(() => {
    return withTiming(color.value);
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedColor.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        {
          rotate: rotate.value,
        },
      ],
    };
  }, []);

  return (
    //OPTIONALLY wrap the root view with gestureHandlerRootHOC
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.square, rStyle]} />
        </GestureDetector>
        <View style={styles.background} />
      </View>
    </GestureHandlerRootView>
  );
};

export default PanGestureHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SQUARE_SIZE,
    width: SQUARE_SIZE,
    borderRadius: 30,
    borderCurve: 'continuous',
  },
  background: {
    position: 'absolute',
    top: '50%',
    left: 0,
    height: '50%',
    width: '100%',
    backgroundColor: '#000',
    zIndex: -1,
  },
});
