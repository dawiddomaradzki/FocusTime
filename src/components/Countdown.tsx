import React, {FC, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utilts/colors';
import {fontSizes, spacing} from '../utilts/sizes';

interface CountdownProps {
  minutes: number;
  isPaused: boolean;
  onProgress: (progress: number) => void;
  onEnd: () => void;
}

const minutesToMillis = (min: number) => min * 1000 * 60;

const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

export const Countdown: FC<CountdownProps> = ({
  minutes,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const interval = useRef<number>(minutes);
  const countDown = () => {
    setMillis(time => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };
  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minute));
  }, [millis]);

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)} : {formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: fontSizes.xxxl,
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
