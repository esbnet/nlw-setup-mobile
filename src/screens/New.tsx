import { useState } from 'react';

import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';

import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado',]

export function New() {

    const [weekDays, setWeekDays] = useState<number[]>([])

    function hundleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(weekDays.filter(day => day !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className='mt-4 text-white font-extrabold text-3xl'>
                    Criar Hábit
                </Text>
                <Text className='mt-4 text-white font-semibold text-base'>
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800  focus:border-yellow-300'
                    placeholder='Ex: Fazer exercícios; Dormir bem; etc...'
                    placeholderTextColor={colors.zinc[700]}
                />

                <Text className='font-semibold mt-4 mb-3 text-white text-base'>
                    Qual a recorrência?
                </Text>

                {avaliableWeekDays.map((weekDay, index) => (
                    <Checkbox
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => hundleToggleWeekDay(index)} />
                ))
                }

                <TouchableOpacity
                    className='w-full h-14 flex-row items-center justify-center bg-yellow-600 rounded-md mt-6'
                >
                    <Feather
                        name='plus'
                        size={24}
                        color={colors.white}
                    />
                    <Text className='font-semibold text-base text-white ml-2'>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

}