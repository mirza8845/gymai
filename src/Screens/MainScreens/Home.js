import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/AntDesign'

import WorkoutCard from '../../CommonComponent/WorkoutCard'
import gymImg from '../../assets/images/gym.png'
import WomenGym from '../../assets/images/womangym.png'
import MenGym from '../../assets/images/mengym.png'

const Home = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.greetingText}>Hi, Madison</Text>

          <Text style={[styles.descriptionText, { color: colors.text }]}>
            Your Personalised 3-Day Workout Plan is Ready!{'\n'}
            You'll follow a Push-Pull-Legs split—a highly effective way to train your whole body each week.{'\n'}
            Discover your exercises, helpful tips, and step-by-step tutorials to train smarter!
          </Text>

          <TouchableOpacity style={styles.planButton} onPress={() => navigation.navigate('')}>
            <Text style={styles.planButtonText} onPress={()=>navigation.navigate("MyPlan")}>My Plan</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Next Workout</Text>

          <WorkoutCard
            title="Push"
            description="Bench press, shoulder press, l..."
            button="Start now"
          />

          <Text style={styles.sectionTitle}>Discover</Text>

          <View style={styles.imageCardContainer}>
            <View style={styles.textBlock}>
              <Text style={styles.cardTitle}>Myth Busters</Text>
              <Text >Popular fitness myths debunked!</Text>
            </View>
            <Image source={gymImg} style={styles.cardImage} resizeMode="contain" />
          </View>

          <View style={styles.doubleCardRow}>
            <View style={styles.doubleCard}>
              <Image source={WomenGym} style={styles.doubleCardImage} />
              <View style={styles.cardInfoBox}>
              <Text style={[styles.doubleCardTitle, { color: colors.text }]}>
                When Should I Stretch?
              </Text>
              <Text style={[styles.metaInfo, { color: colors.text }]}>
                <Icon name="clockcircleo" size={12} color={colors.text} /> 5 Minutes
              </Text>
              </View>
            </View>

            <View style={styles.doubleCard}>
              <Image source={MenGym} style={styles.doubleCardImage} />
              <View style={styles.cardInfoBox}>
                <Text style={[styles.doubleCardTitle, { color: colors.text }]}>
                  Split squats vs lunges
                </Text>
                <Text style={[styles.metaInfo, { color: colors.text }]}>
                  <Icon name="clockcircleo" size={13} color={colors.text} /> 3 Minutes
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreBtnText}>See More</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Home


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  greetingText: {
    color: '#FFDD03',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 1,
  },
  planButton: {
    width: '40%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFDD03',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  planButtonText: {
    fontSize: 21,
    color: 'black',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 30,
    marginBottom: 10,
  },
  imageCardContainer: {
    height: 130,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  textBlock: {
    width: '50%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 7,
  },
 
  cardImage: {
    width:180,
    height: 700,
  },
  doubleCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  doubleCard: {
    width: '48%',
    overflow: 'hidden',
  },
  doubleCardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardInfoBox: {
    borderWidth: 1,
    borderLeftColor:'white',
    borderRightColor:'white',
    borderBottomColor:'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal:5,
    paddingVertical:10
  },
  doubleCardTitle: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 6,
  },
  metaInfo: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  seeMoreBtn:{
    width: '35%',
    height: 30,
    borderRadius: 20,
    backgroundColor: '#ffff',
    borderWidth: 1,
    textAlign:'center',
    alignItems:'center',
    marginTop:20,
    alignSelf:'flex-end'
  },
 seeMoreBtnText:{
  fontSize: 19,
  color: 'black',
  fontWeight: '500',
 }
})
