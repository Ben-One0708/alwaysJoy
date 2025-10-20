import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const VirtualKeyboard = ({onKeyPress, onBackspace, onSpace, onShift}) => {
  const [isShiftActive, setIsShiftActive] = useState(false);

  const handleKeyPress = (key) => {
    // 觸覺反饋
    Vibration.vibrate(50);
    
    if (key === 'shift') {
      setIsShiftActive(!isShiftActive);
      onShift && onShift(!isShiftActive);
    } else if (key === 'backspace') {
      onBackspace && onBackspace();
    } else if (key === 'space') {
      onSpace && onSpace();
    } else {
      const inputKey = isShiftActive ? key.toUpperCase() : key.toLowerCase();
      onKeyPress && onKeyPress(inputKey);
      
      // 自動關閉 Shift
      if (isShiftActive) {
        setIsShiftActive(false);
        onShift && onShift(false);
      }
    }
  };

  const renderKey = (key, label, isSpecial = false, width = 1) => (
    <TouchableOpacity
      key={key}
      style={[
        styles.key,
        isSpecial && styles.specialKey,
        {width: (width * 80) + (width - 1) * 8},
      ]}
      onPress={() => handleKeyPress(key)}
      activeOpacity={0.7}>
      <LinearGradient
        colors={
          isSpecial
            ? ['#ff6b6b', '#ee5a52']
            : ['#ffffff', '#f8f9fa']
        }
        style={styles.keyGradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Text
          style={[
            styles.keyText,
            isSpecial && styles.specialKeyText,
          ]}>
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderRow = (keys, rowIndex) => (
    <View key={rowIndex} style={styles.keyboardRow}>
      {keys.map((keyData) => {
        if (typeof keyData === 'string') {
          return renderKey(keyData, keyData);
        }
        return renderKey(keyData.key, keyData.label, keyData.special, keyData.width);
      })}
    </View>
  );

  const keyboardLayout = [
    // 第一行
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    // 第二行
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    // 第三行
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', {key: 'backspace', label: '←', special: true, width: 1.5}],
    // 第四行
    [
      {key: 'shift', label: 'Shift', special: true, width: 1.5},
      {key: 'space', label: 'Space', special: true, width: 3},
    ],
  ];

  return (
    <View style={styles.keyboardContainer}>
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={styles.keyboard}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        {keyboardLayout.map((row, index) => renderRow(row, index))}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  keyboard: {
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  keyboardRow: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'center',
  },
  key: {
    height: 60,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  keyGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  keyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  specialKey: {
    backgroundColor: '#ff6b6b',
  },
  specialKeyText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default VirtualKeyboard;
