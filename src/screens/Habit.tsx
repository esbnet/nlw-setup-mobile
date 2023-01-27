import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { ScrollView, Text, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { ProgressBar } from '../components/ProgressBar';

interface Params {
    date: string
}

export function Habit() {
    const route = useRoute()
    const { date } = route.params as Params

    const parseDate = dayjs(date)
    const dayOfWeek = parseDate.format('dddd')
    const dayAndMounth = parseDate.format('DD/MM')

    return (
        <View className='flex-1 bg-background px-8 pt-16 text-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <BackButton />

                <View className='flex justify-center items-center'>
                    <MaterialCommunityIcons
                        name='calendar-check-outline'
                        size={50}
                        color={colors.yellow[600]}
                    />
                    <Text className='mt-4 text-zinc-400 font-semibold text-base lowercase'>
                        {dayOfWeek}
                    </Text>

                    <Text className='text-white font-extrabold text-3xl'>
                        {dayAndMounth}
                    </Text>
                </View>

                <ProgressBar progress={10} />

                <View className='mt-4'>
                    <Checkbox
                        title='Beber água'
                        checked={true}
                    />
                    <Checkbox
                        title='Fazer 20 min de aula no Duolingo'
                        checked={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}