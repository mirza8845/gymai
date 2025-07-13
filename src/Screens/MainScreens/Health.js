import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import TipCard from "./TipCard";
import InfoCard from "../../CommonComponent/InfoCard";
import gymPic from "../../assets/images/womengyms.png";
import Dot from "../../assets/svg/dot.svg";
import Fire from "../../assets/svg/fire.svg";
import Star from "../../assets/svg/star.svg";
import { Colors, Fonts } from "../../constants/theme";

const { width } = Dimensions.get("window");

const Health = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recovery");
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const nutrition = workoutPlan?.nutrition;
  const recovery = workoutPlan?.recovery;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Health Overview</Text>

        {/* Category Toggle */}
        <View style={styles.categoryButtonRow}>
          {["Recovery", "Nutrition"].map((type) => (
            <Pressable key={type} style={[styles.categoryButton, selectedCategory === type && styles.activeButton]} onPress={() => setSelectedCategory(type)}>
              <Text style={[styles.categoryButtonText, selectedCategory === type && { color: "#000" }]}>{type}</Text>
            </Pressable>
          ))}
        </View>

        {/* Recovery Section */}
        {selectedCategory === "Recovery" && recovery && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sleep</Text>
              <Text style={styles.cardText}>Target: {recovery.sleep?.target_hours} hrs/night</Text>
              {recovery.sleep?.strategies?.map((s, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {s}
                </Text>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Active Recovery</Text>
              {recovery.active_recovery?.map((a, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {a}
                </Text>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Water Intake</Text>
              <Text style={styles.cardText}>Target: {recovery.water_intake?.target_liters} L/day</Text>
              {recovery.water_intake?.tips?.map((tip, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {tip}
                </Text>
              ))}
            </View>
          </>
        )}

        {/* Nutrition Section */}
        {selectedCategory === "Nutrition" && nutrition && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Macronutrients</Text>
              <Text style={styles.cardText}>Calorie Goal: {nutrition.calorie_goal}</Text>
              <Text style={styles.cardText}>Protein: {nutrition.macros_g?.protein}g</Text>
              <Text style={styles.cardText}>Carbs: {nutrition.macros_g?.carbs}g</Text>
              <Text style={styles.cardText}>Fats: {nutrition.macros_g?.fats}g</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Micronutrient Focus</Text>
              {nutrition.micronutrient_focus?.map((item, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Recipe of the Day</Text>
            <View style={styles.gymPicContainer}>
              <Image source={gymPic} style={styles.gymPic} />
              <Text style={styles.recipeOfTheDayText}>Recipe of the day</Text>
              <View style={styles.recipeDetailsContainer}>
                <Text style={styles.recipeDetailsText}>{nutrition.recipe_of_the_day?.title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Dot />
                  <Text style={styles.recipeDetailsSubText}>{nutrition.recipe_of_the_day?.meal_type} • ~15 mins</Text>
                  <Fire style={styles.fireIcon} />
                  <Text style={styles.recipeDetailsSubText}>{nutrition.recipe_of_the_day?.macros?.calories || 0} Cal</Text>
                </View>
                <Star style={styles.starIcon} />
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Ingredients & Instructions</Text>
              {nutrition.recipe_of_the_day?.ingredients?.map((ing, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {ing}
                </Text>
              ))}
              {nutrition.recipe_of_the_day?.instructions?.map((step, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  {`${i + 1}. ${step}`}
                </Text>
              ))}
            </View>

            {nutrition.recipes?.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>More Ideas</Text>
                {nutrition.recipes.map((rec, idx) => (
                  <InfoCard key={idx} title={rec.title} subtitle={`Meal: ${rec.meal_type}`} imageSource={gymPic} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Health;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, 
  },
  scrollContainer: {
    paddingBottom: 40,
    width:'90%',
    alignSelf:'center',
    marginTop:30
  },
  title: {
    color: "#fff",
    fontSize: 20,
    alignSelf: "center",
    fontFamily: Fonts.Montserrat_Bold,
    marginBottom: 20,
  },
  categoryButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 100,
    paddingVertical: 8,
    alignItems: "center",
  },
  categoryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Medium,
  },
  activeButton: {
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#6D6D6D",
    elevation: 5,
    marginTop:20
  },
  cardTitle: {
    fontSize: 16,
    color: "#FF5722",
    marginBottom: 10,
    fontFamily: Fonts.Montserrat_Bold,
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Medium,
    marginBottom: 4,
  },
  bulletPoint: {
    color: "#888",
    fontSize: 13,
    fontFamily: Fonts.Montserrat_Regular,
    marginBottom: 2,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 30,
    marginBottom: 15,
    fontFamily: Fonts.Montserrat_Bold,
  },
  gymPicContainer: {
    position: "relative",
    marginBottom: 20,
  },
  gymPic: {
    width: "100%",
    borderRadius: 20,
  },
  recipeOfTheDayText: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 20,
    fontFamily: Fonts.Montserrat_Regular,
    color:'white'
  },
  recipeDetailsContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#212020E5",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 55,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  recipeDetailsText: {
    color: "white",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_SemiBold,
  },
  recipeDetailsSubText: {
    color: "white",
    fontSize: 11,
    letterSpacing: 0.5,
    fontFamily: Fonts.Montserrat_Regular,
  },
  fireIcon: {
    paddingHorizontal: 10,
  },
  starIcon: {
    position: "absolute",
    right: 0,
    margin: 8,
    padding: 10,
  },
});
