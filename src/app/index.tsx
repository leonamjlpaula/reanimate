import { Link } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Reanimate</Text>
        <Link href={'/BouncingSquare'}>Bouncing Square</Link>
        <Link href={'/PanGestureHandler'}>PanGestureHandler</Link>
        <Link href={'/SpaticalTapGesture'}>SpaticalTapGesture</Link>
        <Link href={'/ParallaxAnimation'}>ParallaxAnimation</Link>
        <Link href={'/AnimatedText'}>AnimatedText</Link>
        <Link href={'/ScrollablePercentage'}>ScrollablePercentage</Link>
        <Link href={'/LayoutAnimationsEnteringExiting'}>
          LayoutAnimationsEnteringExiting
        </Link>
        <Link href={'/LayoutAnimationsLists'}>LayoutAnimationsLists</Link>
        <Link href={'/FamilyNumberInput'}>FamilyNumberInput</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontFamily: 'SF-Pro-Rounded-Bold',
    fontWeight: 'bold',
  },
});
