import type { StyleProp, ViewStyle } from 'react-native';
import { Image, View } from 'react-native';

type ListImageProps = {
  uri: string;
  itemWidth: number;
  style: StyleProp<ViewStyle>;
};

export const ListImage = ({ uri, itemWidth, style }: ListImageProps) => {
  return (
    <View style={style}>
      <Image
        key={uri}
        source={{ uri }}
        style={{ width: itemWidth, aspectRatio: 0.6, borderRadius: 20 }}
      />
    </View>
  );
};
