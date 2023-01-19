import { ScrollView, Text, View } from 'react-native';

import { generateRangeDatesFromYearStart } from '../util/generate-range-between-dates';

import { DAY_SIZE, HabitDay } from '../components/HabitDay';
import { Header } from '../components/Header';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearsStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearsStart.length;

export function Home() {
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />

      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((day, index) => (
          <Text
            key={`${day}-${index}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className='flex-row flex-wrap'>
          {
            datesFromYearsStart.map((date) => (
              < HabitDay
                key={date.toISOString()}
              />
            ))
          }

          {
            amountOfDaysToFill > 0 && Array
              .from({ length: amountOfDaysToFill })
              .map((_, index) => (
                <View
                  key={index}
                  className='bg-zinc-900 rounded-lg border-1 m-1 border-zinc-800 opacity-40 cursor-not-allowed'
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))
          }
        </View>
      </ScrollView>
    </View>
  )
}
