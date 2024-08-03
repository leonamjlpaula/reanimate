import { useMemo } from 'react';
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const AnimatedNumber = ({ text }: { text: string }) => {
  const numbers = useMemo(() => {
    return text.split('') as Array<string>;
  }, [text]);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(1.05 - 0.05 * numbers.length) }],
    };
  }, [numbers.length]);

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        rContainerStyle,
      ]}>
      {numbers.map((number, i) => (
        <Animated.Text
          key={i + number} //Keys must be unique to have a proper animation
          layout={LinearTransition}
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={{
            color: '#fff',
            fontSize: 90,
            textAlign: 'center',
            fontFamily: 'SFProRoundedBold',
            marginHorizontal: 2,
          }}>
          {number}
        </Animated.Text>
      ))}
    </Animated.View>
  );
};

export default AnimatedNumber;
