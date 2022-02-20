import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Vibration, Platform} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import KeepAwake from 'react-native-keep-awake';

import {Countdown} from '../../components/Countdown';
import {RoundedButton} from '../../components/RoundedButton';
import {Timing} from '../timer/Timing';

import {colors} from '../../utilts/colors';
import {spacing} from '../../utilts/sizes';

interface TimerProps {
  focusSubject: string;
  onTimerEnd: () => void;
  clearSubject: () => void;
}

const DEFAULT_TIME = 10;

export const TimerScreen: FC<TimerProps> = ({
  focusSubject,
  onTimerEnd,
  clearSubject,
}) => {
  const [minutes, setMinutes] = useState<number>(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState(1);
  KeepAwake.activate();

  const onProgress = (progress: number) => {
    setProgress(progress);
  };

  const changeTime = (min: number) => {
    setIsStarted(false);
    setProgress(1);
    setMinutes(min);
  };

  const handleStartStop = () => {
    setIsStarted(!isStarted);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
    KeepAwake.deactivate();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          isPaused={!isStarted}
          onProgress={onProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBarWrapper}>
        <ProgressBar progress={progress} color="#5E84E2" style={{height: 10}} />
      </View>
      <View style={styles.setTimebuttonsWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={handleStartStop} />
        ) : (
          <RoundedButton title="start" onPress={handleStartStop} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title="-"
          onPress={clearSubject}
          size={50}></RoundedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setTimebuttonsWrapper: {
    flex: 0.3,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarWrapper: {
    paddingTop: spacing.sm,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
