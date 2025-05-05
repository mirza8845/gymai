import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TipCard from './TipCard';
import Food1 from '../../assets/images/dietFood.png';
import Food2 from '../../assets/images/dietFoodSamon.png';
import InfoCard from '../../CommonComponent/InfoCard';
import gymPic from '../../assets/images/womengyms.png';
import Dot from '../../assets/svg/dot.svg';
import Fire from '../../assets/svg/fire.svg';
import Star from '../../assets/svg/star.svg';

const Health = () => {
  const [selectedCategory, setSelectedCategory] = useState('Recovery');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.categoryButtonRow}>
          <Pressable
            style={[styles.categoryButton, selectedCategory === 'Recovery' && styles.activeButton]}
            onPress={() => setSelectedCategory('Recovery')}
          >
            <Text style={styles.categoryButtonText}>Recovery</Text>
          </Pressable>
          <Pressable
            style={[styles.categoryButton, selectedCategory === 'Nutrition' && styles.activeButton]}
            onPress={() => setSelectedCategory('Nutrition')}
          >
            <Text style={styles.categoryButtonText}>Nutrition</Text>
          </Pressable>
        </View>

        {selectedCategory === 'Recovery' && (
          <>
            <TipCard color="#DDFF94">
              Sleep:{'\n\n'}
              Aim for 7–9 hours of high-quality sleep each night. Maintain a consistent sleep schedule, avoid screens and blue light 30–60 mins before bedtime, and prioritize deep REM sleep to enhance muscle repair, mental clarity, and recovery.
            </TipCard>

            <TipCard color="#FF8A8A">
              Active Recovery:{'\n\n'}
              Incorporate light, low-intensity activities like stretching, yoga, gentle walking, or mobility exercises on rest days. These improve blood flow, reduce muscle stiffness, and help speed up your body's recovery process.
            </TipCard>

            <TipCard color="#A6ECFF">
              Water:{'\n\n'}
              Aim for around 3 liters of water daily to keep hydrated. Good hydration boosts energy, improves focus, supports muscular function, and accelerates overall recovery.
            </TipCard>
          </>
        )}

        {selectedCategory === 'Nutrition' && (
          <View>
            <Text style={styles.nutritionSummaryText}>
              Calorie goal: 2100{'\n'}Macronutrients{'\n'}Protein Goal: 120{'\n'}Carb Goal: 260{'\n'}Fat goal: 60
            </Text>
            <TipCard color="#A6ECFF">
              Micronutrients:{'\n\n'}
              Micronutrients (vitamins & minerals) are essential for energy, immunity, recovery, and overall health. Include a variety of:{'\n'}
              • Fruits & Vegetables: Vitamins A, C, and folate for immunity and recovery.{'\n'}
              • Whole Grains: B vitamins, iron, and magnesium for energy.{'\n'}
              • Dairy & Leafy Greens: Calcium and Vitamin D for bone strength.{'\n'}
              • Nuts, Seeds & Lean Meats: Iron, zinc, and selenium for metabolism and hormonal balance.{'\n'}
              Aim for dietary variety to cover all essential nutrients.
            </TipCard>
            <View>
              <Text style={styles.recipeSectionTitle}>Recipes for you</Text>
              <InfoCard title="Shoulder Press Form" subtitle="Tap to learn more" imageSource={Food1} />
              <InfoCard title="Shoulder Press Form" subtitle="Tap to learn more" imageSource={Food2} />
              <View style={styles.gymPicContainer}>
                <Image source={gymPic} style={styles.gymPic} />
                <Text style={styles.recipeOfTheDayText}>Recipe of the day</Text>
                <View style={styles.recipeDetailsContainer}>
                  <Text style={styles.recipeDetailsText}>Carrot and orange smoothie</Text>
                  <Text style={styles.recipeDetailsSubText}>
                    <Dot />
                    10 Minutes
                    <Fire style={styles.fireIcon} />
                    70 Cal
                  </Text>
                  <Star style={styles.starIcon} />
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 30,
  },
  categoryButtonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#979C9E',
    borderRadius: 100,
    paddingVertical: 7,
    width: '50%',
  },
  categoryButtonText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeButton: {
    backgroundColor: 'white',
  },

  // Recovery/Nutrition Section
  nutritionSummaryText: {
    color: 'white',
    lineHeight: 25,
    fontSize: 15,
    fontWeight: '200',
    letterSpacing: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  recipeSectionTitle: {
    color: 'white',
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 15,
  },

  // Gym Pic and Recipe Overlay
  gymPicContainer: {
    position: 'relative',
  },
  gymPic: {
    width: '100%',
    borderRadius: 30,
  },
  recipeOfTheDayText: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFDD03',
    fontSize: 17,
    fontWeight: '700',
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  recipeDetailsContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#212020E5',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 40,
    letterSpacing: 1,
    paddingHorizontal: 20,
  },
  recipeDetailsText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '200',
  },
  recipeDetailsSubText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '200',
    letterSpacing: 1,
  },
  fireIcon: {
    paddingHorizontal: 10,
  },
  starIcon: {
    position: 'absolute',
    right: 0,
    margin: 8,
    padding: 10,
  },
});

export default Health;
