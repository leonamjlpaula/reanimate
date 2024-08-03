import type { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TouchableFeedbackProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};
const TouchableFeedback: React.FC<TouchableFeedbackProps> = ({
  children,
  onPress,
  disabled,
  style,
}) => {
  const isActive = useSharedValue(false);

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      isActive.value = true;
    })
    .onTouchesUp(() => {
      if (onPress) runOnJS(onPress)();
    })
    .onFinalize(() => {
      isActive.value = false;
    });

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isActive.value ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
      ),
      transform: [
        {
          scale: withTiming(isActive.value ? 0.95 : 1),
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[rButtonStyle, style]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default TouchableFeedback;
