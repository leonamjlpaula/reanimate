import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type ListImageProps = {
  uri: string;
  imageWidth: number;
  itemWidth: number;
  style: StyleProp<ViewStyle>;
  scrollOffset: SharedValue<number>;
  index: number;
};
const { width: screenWidth } = Dimensions.get('window');

const ParallaxIntensity = screenWidth / 2;

export const ListImage = ({
  uri,
  imageWidth,
  itemWidth,
  style,
  scrollOffset,
  index,
}: ListImageProps) => {
  const inputRange = [
    itemWidth * (index - 1),
    itemWidth * index,
    itemWidth * (index + 1),
  ];

  const rImageStyle = useAnimatedStyle(() => {
    const translateX = interpolate(scrollOffset.value, inputRange, [
      -ParallaxIntensity,
      0,
      ParallaxIntensity,
    ]);

    return {
      transform: [
        {
          scale: 1.7,
        },
        {
          translateX,
        },
      ],
    };
  });

  const rContainerStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollOffset.value, inputRange, [1, 1.05, 1]);

    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        style,
        { overflow: 'hidden', borderRadius: 20 },
        rContainerStyle,
      ]}>
      <Animated.Image
        key={uri}
        source={{ uri }}
        style={[
          {
            width: imageWidth,
            aspectRatio: 0.6,
            resizeMode: 'cover',
            borderRadius: 20,
          },
          rImageStyle,
        ]}
      />
    </Animated.View>
  );
};
