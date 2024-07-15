import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { ListImage } from '../components/ListImage';

const Images = [
  'https://images.unsplash.com/photo-1712174863129-dcbd52938915?q=100&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1621897100070-055b183ead92?q=100&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1623093386041-a0915e5a1ca4?q=100&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1513883524931-aaab83bcb19b?q=100&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const { width: WindowWidth } = Dimensions.get('window');
const ListImageWidth = WindowWidth * 0.8;

const ItemInternalPadding = 10;
const ItemContainerWidth = ListImageWidth + ItemInternalPadding * 2;

const ListPadding = (WindowWidth - ItemContainerWidth) / 2;

const ParallaxAnimation = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        snapToInterval={ItemContainerWidth}
        decelerationRate={'fast'}
        contentContainerStyle={{
          alignItems: 'center',
          paddingLeft: ListPadding,
          paddingRight: ListPadding,
        }}>
        {Images.map(uri => (
          <ListImage
            uri={uri}
            key={uri}
            itemWidth={ListImageWidth}
            style={{
              marginHorizontal: ItemInternalPadding,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ParallaxAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
