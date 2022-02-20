import React, {FC, useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Focus} from './src/features/focus/Focus';
import {FocusHistory} from './src/features/focus/FocusHistory';
import {TimerScreen} from './src/features/timer/TimerScreen';

import {spacing} from './src/utilts/sizes';
import {colors} from './src/utilts/colors';

type TaskInfo = {
  subject: string;
  status: number;
  key: string;
};

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

const App: FC = () => {
  const [focusSubject, setFocusSubject] = useState<string | null | any>(null);
  const [focusHistory, setFocusHistory] = useState<TaskInfo[]>([]);

  const addFocusHistorySubjectWithStatus = (
    subject: string,
    status: number,
  ) => {
    setFocusHistory([
      ...focusHistory,
      {key: String(focusHistory.length + 1), subject, status},
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.backgroundStyle}>
      {focusSubject ? (
        <TimerScreen
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.deepSapphire,
    paddingTop: Platform.OS === 'ios' ? spacing.lg : spacing.md,
    flex: 1,
  },
});

export default App;
