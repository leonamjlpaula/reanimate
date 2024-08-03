import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import ButtonsGrid from '../components/ButtonsGrid';
import AnimatedNumber from '../components/AnimatedNumber';

const FamilyNumberInput = () => {
  const { bottom } = useSafeAreaInsets();

  const [number, setNumber] = useState<string>('0');

  const handleNumber = (item: number | string | null) => {
    if (item === 'backspace') {
      if (number.length === 1) {
        setNumber('0');
        return;
      }
      setNumber(prev => prev.slice(0, -1));
    } else if (item !== null) {
      setNumber(prev => {
        if (prev.length === 10) return prev;
        if (prev === '0') return String(item);
        return prev + item.toString();
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          <AnimatedNumber text={number} />
          <LinearGradient
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '55%',
            }}
            locations={[0, 0.9]}
            colors={['rgba(0,0,0,0)', '#000']}
          />
        </View>
        <View style={{ flex: 1, marginBottom: bottom }}>
          <ButtonsGrid onButtonPress={handleNumber} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default FamilyNumberInput;
