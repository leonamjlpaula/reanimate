import { Link } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Reanimate</Text>
        <Link href={'/BouncingSquare'}>Bouncing Square</Link>
        <Link href={'/PanGestureHandler'}>PanGestureHandler</Link>
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
    fontWeight: 'bold',
  },
});
