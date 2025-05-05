import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Heading from '../../CommonComponent/Heading'
import Workout from './Workout'
import WorkoutCard from '../../CommonComponent/WorkoutCard'
import CalendarPicker from "react-native-calendar-picker";


const SaveRoutineDate = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <SafeAreaView>
            <ScrollView style={{ paddingHorizontal: 30, paddingVertical: 50 }} >
                <View style={{ alignSelf: 'flex-start' }}>
                    <Heading title={'Previous Workouts'} />
                </View>
                <WorkoutCard
                    title={'Pull'}
                    description={'Pullups, face pull, Seated Row...'}
                    time={'45 Mins'} />
                <WorkoutCard
                    title={'Legs'}
                    description={'Barbell squat, Seated leg curl...'}
                    time={'51 Mins'} />
                <TouchableOpacity style={styles.seeMoreBtn}>
                    <Text style={styles.seeMoreBtnText}>See More</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 20 }}>Calendar</Text>
                <CalendarPicker
                    selectedStartDate={selectedDate}
                    onDateChange={(date) => setSelectedDate(date)}
                    allowRangeSelection={false}
                    previousTitle=""
                    nextTitle=""
                    selectedDayTextColor="red"
                    selectedDayColor="black"
                    scaleFactor={400}
                    todayTextStyle={{ fontWeight: 'bold' }}
                    textStyle={{ color: 'white' }}
                    customDayHeaderStyles={() => ({ style: { backgroundColor: 'black' } })}
                    customDayStyles={() => ({ style: { backgroundColor: 'white' } })}
                    customStyles={{
                        calendarBackground: 'black',
                    }}
                    initialDate={null}
                />
                  <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btnText}>Monthly Report</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btnText}>Analytics</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SaveRoutineDate

const styles = StyleSheet.create({
    seeMoreBtn: {
        width: '35%',
        height: 33,
        borderRadius: 20,
        backgroundColor: '#ffff',
        borderWidth: 1,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'flex-end'
    },
    seeMoreBtnText: {
        fontSize: 19,
        color: 'black',
        fontWeight: '500',
    },
    btnContainer:{
        width: '80%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffff',
        borderWidth: 1,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'flex-start',
        textAlign:'center'
    },
    btnText:{
        fontSize: 19,
        color: 'black',
        fontWeight: '500',
    }
})