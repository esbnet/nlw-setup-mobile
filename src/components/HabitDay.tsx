import clsx from 'clsx';
import dayjs from 'dayjs';
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from 'react-native';


import { generateProgressPercentage } from '../util/generate-progress-percentage';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDOMG = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDOMG + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabit?: number;
  amountCompleted?: number;
  date: Date;
}

export function HabitDay({
  amountOfHabit = 0,
  amountCompleted = 0,
  date,
  ...rest }: Props) {

  const amountAccomplishedPercentage =
    amountOfHabit > 0 ? generateProgressPercentage(amountOfHabit, amountCompleted) : 0
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today)

  return (
    <TouchableOpacity
      className={clsx('rounded-lg border-2 m-1', {
        ["bg-zinc-900 border-zinc-800"]: amountAccomplishedPercentage === 0,
        ["bg-orange-900 border-orange-700"]
          : amountAccomplishedPercentage === 0 && amountAccomplishedPercentage < 20,
        ["bg-orange-800 border-orange-600"]
          : amountAccomplishedPercentage === 20 && amountAccomplishedPercentage < 40,
        ["bg-orange-700 border-orange-500"]
          : amountAccomplishedPercentage === 40 && amountAccomplishedPercentage < 60,
        ["bg-orange-600 border-orange-500"]
          : amountAccomplishedPercentage === 60 && amountAccomplishedPercentage < 80,
        ["bg-orange-500 border-orange-400"]
          : amountAccomplishedPercentage > 80,
        ["border-white border-2"]: isCurrentDay
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.6}
      {...rest}
    />
  )
}