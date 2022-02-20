import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RoundedButton} from '../../components/RoundedButton';

import {fontSizes, spacing} from '../../utilts/sizes';

const HistoryItem = ({item}) => {
  return (
    <Text style={item.status > 1 ? styles.taskNotDone : styles.taskDone}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({focusHistory, onClear}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>

            <FlatList
              style={styles.listContainer}
              data={focusHistory}
              contentContainerStyle={{flex: 1, alignItems: 'center'}}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  taskDone: {
    color: 'green',
    fontSize: fontSizes.md,
  },
  taskNotDone: {
    color: 'red',
    fontSize: fontSizes.md,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    color: 'white',
  },
  title: {
    fontSize: fontSizes.lg,
    color: 'white',
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
