import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import TipCard from './TipCard';
import InfoCard from '../../CommonComponent/InfoCard';
import gymPic from '../../assets/images/womengyms.png';
import Dot from '../../assets/svg/dot.svg';
import Fire from '../../assets/svg/fire.svg';
import Star from '../../assets/svg/star.svg';
import { Fonts } from '../../constants/theme';

const Health = () => {
  const [selectedCategory, setSelectedCategory] = useState('Recovery');
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const nutrition = workoutPlan?.nutrition;
  const recovery = workoutPlan?.recovery;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Category Toggle */}
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

        {/* ───────────── RECOVERY SECTION ───────────── */}
        {selectedCategory === 'Recovery' && recovery && (
          <>
            <TipCard color="#DDFF94">
              Sleep:{'\n\n'}
              Target: {recovery.sleep?.target_hours} hrs/night{'\n'}
              {recovery.sleep?.strategies?.map((s) => `• ${s}`).join('\n')}
            </TipCard>

            <TipCard color="#FF8A8A">
              Active Recovery:{'\n\n'}
              {recovery.active_recovery?.map((a) => `• ${a}`).join('\n')}
            </TipCard>

            <TipCard color="#A6ECFF">
              Water Intake:{'\n\n'}
              Target: {recovery.water_intake?.target_liters} L/day{'\n'}
              {recovery.water_intake?.tips?.map((tip) => `• ${tip}`).join('\n')}
            </TipCard>
          </>
        )}

        {/* ───────────── NUTRITION SECTION ───────────── */}
        {selectedCategory === 'Nutrition' && nutrition && (
          <View>
            {/* Macro Summary */}
            <Text style={styles.nutritionSummaryText}>
              Calorie Goal: {nutrition.calorie_goal}{'\n'}
              Macronutrients{'\n'}
              Protein: {nutrition.macros_g?.protein} g{'\n'}
              Carbs: {nutrition.macros_g?.carbs} g{'\n'}
              Fats: {nutrition.macros_g?.fats} g
            </Text>

            {/* Micronutrient Focus */}
            <TipCard color="#A6ECFF">
              Micronutrient Focus:{'\n\n'}
              {nutrition.micronutrient_focus?.map((item) => `• ${item}`).join('\n')}
            </TipCard>

            {/* Recipe of the Day */}
            <Text style={styles.recipeSectionTitle}>Recipe of the Day</Text>

            <View style={styles.gymPicContainer}>
              <Image source={gymPic} style={styles.gymPic} />
              <Text style={styles.recipeOfTheDayText}>Recipe of the day</Text>
              <View style={styles.recipeDetailsContainer}>
                <Text style={styles.recipeDetailsText}>{nutrition.recipe_of_the_day?.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Dot />
                  <Text style={styles.recipeDetailsSubText}>
                    {nutrition.recipe_of_the_day?.meal_type} • ~15 mins
                  </Text>
                  <Fire style={styles.fireIcon} />
                  <Text style={styles.recipeDetailsSubText}>
                    {nutrition.recipe_of_the_day?.macros?.calories || 0} Cal
                  </Text>
                </View>
                <Star style={styles.starIcon} />
              </View>
            </View>

            {/* Ingredients + Instructions */}
            <TipCard color="#DDFF94">
              Ingredients:{'\n\n'}
              {nutrition.recipe_of_the_day?.ingredients?.map((ing) => `• ${ing}`).join('\n')}
              {'\n\n'}Instructions:{'\n\n'}
              {nutrition.recipe_of_the_day?.instructions?.map((step, i) => `${i + 1}. ${step}`).join('\n')}
            </TipCard>

            {/* Extra Recipes (if any) */}
            {nutrition.recipes?.length > 0 && (
              <>
                <Text style={styles.recipeSectionTitle}>More Ideas</Text>
                {nutrition.recipes.map((rec, idx) => (
                  <InfoCard
                    key={idx}
                    title={rec.title}
                    subtitle={`Meal: ${rec.meal_type}`}
                    imageSource={gymPic}
                  />
                ))}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Health;

// ───────────────────── STYLES ─────────────────────

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
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
  activeButton: {
    backgroundColor: 'white',
  },
  nutritionSummaryText: {
    color: 'white',
    lineHeight: 25,
    fontSize: 15,
    letterSpacing: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    fontFamily: Fonts.Regular,
  },
  recipeSectionTitle: {
    color: 'white',
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 15,
    fontFamily: Fonts.SemiBold,
  },
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
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    fontFamily: Fonts.SemiBold,
  },
  recipeDetailsContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#212020E5',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  recipeDetailsText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fonts.Regular,
  },
  recipeDetailsSubText: {
    color: 'white',
    fontSize: 10,
    letterSpacing: 1,
    fontFamily: Fonts.Regular,
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
