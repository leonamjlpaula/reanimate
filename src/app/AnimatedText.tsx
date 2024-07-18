import { FontAwesome } from '@expo/vector-icons';

import {
  Text as SkText,
  Canvas,
  useFont,
  vec,
  SweepGradient,
} from '@shopify/react-native-skia';
import { useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View, Text } from 'react-native';
// import AnimateableText from 'react-native-animateable-text';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sfProBold = require('../assets/SF-Pro-Rounded-Bold.ttf');

const AnimatedText = () => {
  const [toggled, setToggled] = useState(false);
  const count = useSharedValue(0);

  const randomCount = () => {
    const nextCount = withTiming(Math.random() * 100 + 1, { duration: 1000 });
    count.value = nextCount;
  };

  const countString = useDerivedValue(() => {
    return Math.floor(count.value).toString();
  });

  const fontSize = 150;
  const font = useFont(sfProBold, fontSize);

  const canvasWidth = 400;
  const canvasHeight = 400;

  const x = useDerivedValue(() => {
    const textWidth = font?.measureText(countString.value).width ?? 0;
    return canvasWidth / 2 - textWidth / 1.85;
  }, [font]);

  const y = useDerivedValue(() => {
    return canvasHeight / 2 + fontSize / 2.8;
  }, [fontSize]);

  const c = useDerivedValue(() => {
    return vec(x.value, y.value);
  });

  return (
    <View style={styles.container}>
      <Switch
        onValueChange={() => {
          setToggled(t => !t);
        }}
        value={toggled}
        style={{ position: 'absolute', top: 50, height: 30 }}
      />
      <Text style={styles.text}>{toggled ? 'Skia' : 'ReText'}</Text>
      {!toggled && <ReText style={styles.count} text={countString} />}
      {toggled && (
        <Canvas
          style={{
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: 'black',
          }}>
          <SkText font={font} color={'black'} text={countString} x={x} y={y}>
            <SweepGradient
              c={c}
              colors={['cyan', 'magenta', 'yellow', 'cyan']}
            />
          </SkText>
        </Canvas>
      )}
      {/* <AnimateableText style={styles.count} text={countString} /> //PREBUILD NEEDED!!!*/}
      <TouchableOpacity onPress={randomCount} style={styles.floatingButton}>
        <FontAwesome name="random" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 150,
    fontWeight: 'bold',
    fontFamily: 'SFProRoundedBold',
    width: 200,
    textAlign: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'SFProRoundedBold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 48,
    right: 32,
    width: 64,
    aspectRatio: 1,
    borderRadius: 32,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AnimatedText;
