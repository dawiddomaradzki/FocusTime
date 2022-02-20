import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

import {RoundedButton} from '../../components/RoundedButton';
import {fontSizes, spacing} from '../../utilts/sizes';
import {colors} from '../../utilts/colors';

type AddSubject = string | null;

interface RoundedButtonProps {
  addSubject: (text: AddSubject) => void;
}

export const Focus: FC<RoundedButtonProps> = ({addSubject}) => {
  const [subject, setSubject] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.buttonText}
            onSubmitEditing={e => setSubject(e.nativeEvent.text)}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    flex: 1,
    marginRight: spacing.md,
  },
});
