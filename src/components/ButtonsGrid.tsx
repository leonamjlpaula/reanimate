import { FontAwesome5 } from '@expo/vector-icons';

import { View, Text } from 'react-native';

import TouchableFeedback from './TouchableFeedback';

const buttonsItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'backspace'] as const;

type ButtonItemType = (typeof buttonsItems)[number];

type ButtonsGridProps = {
  onButtonPress: (item: ButtonItemType) => void;
};

const ButtonsGrid = ({ onButtonPress }: ButtonsGridProps) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      {buttonsItems.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              width: '33.333%',
              height: '25%',
              padding: 8,
            }}>
            <TouchableFeedback
              disabled={item === null}
              style={{
                backgroundColor: 'yellow',
                flex: 1,
                borderRadius: 20,
                borderCurve: 'continuous',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onButtonPress(item)}>
              {typeof item === 'number' && (
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'SFProRoundedBold',
                    color: '#fff',
                  }}>
                  {item}
                </Text>
              )}
              {item === 'backspace' && (
                <FontAwesome5 name="backspace" size={24} color="#fff" />
              )}
            </TouchableFeedback>
          </View>
        );
      })}
    </View>
  );
};

export default ButtonsGrid;
