import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface RoundedButtonProps {
  style?: {};
  textStyle?: {};
  size?: number;
  title: string;
  onPress: () => void;
}

export const RoundedButton: FC<RoundedButtonProps> = ({
  style,
  textStyle,
  size = 125,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]} onPress={onPress}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (size: number) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: '#fff',
      borderWidth: 2,
      justifyContent: 'center',
    },
    text: {
      color: '#fff',
      fontSize: size / 3,
    },
  });
