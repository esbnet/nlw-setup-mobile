import { useState } from 'react';

import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';

import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { api } from '../lib/axios';

const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado',]

export function New() {

    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState("")

    function hundleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(weekDays.filter(day => day !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function hadleCreateNewHabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                Alert.alert("Atenção!", "É necessário incluir um hábito e ao menos uma frequência!")
            } else {
                await api.post('/habits', { title, weekDays })
                setTitle('')
                setWeekDays([])
                Alert.alert("Informação!", "Novo hábito criado com sucesso!")
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Erro Grave!", "Não foi possível criar o hábito, tente novamente!  ")
        } finally {

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
                    onChangeText={setTitle}
                    value={title}
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
                    activeOpacity={0.7}
                    onPress={hadleCreateNewHabit}
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
        </View >
    )

}