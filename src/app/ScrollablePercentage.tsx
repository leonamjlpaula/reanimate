import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  clamp,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useCallback, useRef } from 'react';

import { sections } from '../utils/constants';
import { ProgressIndicator } from '../components/ProgressIndicator';

const ScrollablePercentage = () => {
  const progress = useSharedValue(0);
  const scrollHeight = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      progress.value = clamp(
        event.contentOffset.y / (event.contentSize.height - scrollHeight.value),
        0,
        1,
      );
    },
  });

  const scrollRef = useRef<Animated.ScrollView>(null);

  const onReset = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0 });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        onLayout={({ nativeEvent }) => {
          scrollHeight.value = nativeEvent.layout.height;
        }}
        scrollEventThrottle={16} // 1 frame per 16ms = 60fps; 1/60 = 16ms
        contentContainerStyle={styles.scrollable}>
        {sections.map(({ description, title }) => (
          <View key={title} style={styles.sectionContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      <ProgressIndicator
        onReset={onReset}
        progress={progress}
        readingTime={getReadingTime(
          sections
            .map(({ description, title }) => `${title} ${description}`)
            .join(' '),
        )}
      />
    </View>
  );
};

export default ScrollablePercentage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101010',
  },
  scrollable: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 160,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.split(/\s/g).length;
  return Math.ceil(words / wordsPerMinute);
};
