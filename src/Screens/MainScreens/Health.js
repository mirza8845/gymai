import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import InfoCard from "../../CommonComponent/InfoCard";
import gymPic from "../../assets/images/womengyms.png";
import { Colors, Fonts } from "../../constants/theme";

const { width } = Dimensions.get("window");

// Map micronutrients to sample foods
const micronutrientFoods = {
  Iron: ["Spinach", "Lentils", "Chickpeas"],
  Calcium: ["Milk", "Yogurt", "Cheese"],
  "Vitamin B12": ["Eggs", "Fish", "Fortified Cereals"],
  "Vitamin D": ["Salmon", "Egg Yolks", "Fortified Milk"],
  "Vitamin C": ["Oranges", "Bell Peppers", "Strawberries"],
  Magnesium: ["Almonds", "Spinach", "Avocado"],
};

const Health = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recovery");
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  
  // Safely extract data with fallbacks
  const nutrition = workoutPlan?.nutrition || {};
  const recovery = workoutPlan?.recovery || {};
  const sleep = recovery?.sleep || {};
  const hydration = recovery?.hydration || {};

  // Get micronutrients from nutrition data
  const getMicronutrients = () => {
    // Extract micronutrients from nutrition focus or create defaults
    const focus = nutrition?.focus || "Calorie surplus";
    if (focus.toLowerCase().includes("build muscle") || focus.toLowerCase().includes("muscle growth")) {
      return ["Iron", "Calcium", "Vitamin D", "Magnesium"];
    }
    return ["Iron", "Calcium", "Vitamin B12", "Vitamin C"];
  };

  // Sample recipe for the day (since it's not in your data)
  const recipeOfTheDay = {
    title: "High-Protein Chicken & Quinoa Bowl",
    meal_type: "Lunch",
    calories: 450,
    prep_time: 15,
    ingredients: [
      "150g chicken breast",
      "1 cup cooked quinoa",
      "1 cup mixed vegetables",
      "1 tbsp olive oil",
      "Spices to taste"
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Grill or bake chicken breast until cooked through",
      "Sauté vegetables in olive oil",
      "Combine all ingredients in a bowl",
      "Season with your favorite spices"
    ]
  };

  // Sample more recipes
  const moreRecipes = [
    {
      title: "Protein Smoothie",
      meal_type: "Breakfast",
      calories: 300,
      prep_time: 5
    },
    {
      title: "Salmon & Sweet Potato",
      meal_type: "Dinner",
      calories: 500,
      prep_time: 25
    },
    {
      title: "Greek Yogurt Parfait",
      meal_type: "Snack",
      calories: 200,
      prep_time: 5
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Health Overview</Text>

        {/* Category Toggle */}
        <View style={styles.categoryButtonRow}>
          {["Recovery", "Nutrition", "Micronutrients"].map((type) => (
            <Pressable
              key={type}
              style={[styles.categoryButton, selectedCategory === type && styles.activeButton]}
              onPress={() => setSelectedCategory(type)}
            >
              <Text style={[styles.categoryButtonText]}>
                {type}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Recovery Section */}
        {selectedCategory === "Recovery" && recovery && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sleep</Text>
              <Text style={styles.cardText}>Target: {sleep?.target_hours || 7} hrs/night</Text>
              {sleep?.tips?.map((tip, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {tip}
                </Text>
              )) || (
                <>
                  <Text style={styles.bulletPoint}>• Consistent sleep schedule</Text>
                  <Text style={styles.bulletPoint}>• Avoid screens 1 hour before bed</Text>
                  <Text style={styles.bulletPoint}>• Keep bedroom cool and dark</Text>
                </>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Active Recovery</Text>
              {recovery?.active_recovery?.map((activity, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {activity}
                </Text>
              )) || (
                <>
                  <Text style={styles.bulletPoint}>• 20min walk</Text>
                  <Text style={styles.bulletPoint}>• Light yoga</Text>
                  <Text style={styles.bulletPoint}>• Foam rolling</Text>
                </>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Hydration</Text>
              <Text style={styles.cardText}>Target: {hydration?.target_liters || 2} L/day</Text>
              {hydration?.tips?.map((tip, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {tip}
                </Text>
              )) || (
                <>
                  <Text style={styles.bulletPoint}>• Drink 500ml upon waking</Text>
                  <Text style={styles.bulletPoint}>• Sip water throughout workouts</Text>
                  <Text style={styles.bulletPoint}>• Monitor urine color</Text>
                </>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Rest Days</Text>
              <Text style={styles.cardText}>{recovery?.rest_days || "Essential for muscle repair and growth"}</Text>
            </View>
          </>
        )}

        {/* Nutrition Section */}
        {selectedCategory === "Nutrition" && nutrition && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Daily Goals</Text>
              <Text style={styles.cardText}>Calories: {nutrition?.daily_calories || 2310} Cal</Text>
              <Text style={styles.cardText}>Protein: {nutrition?.protein_g || 145}g</Text>
              <Text style={styles.cardText}>Carbs: {nutrition?.carbs_g || 264}g</Text>
              <Text style={styles.cardText}>Fats: {nutrition?.fat_g || 66}g</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Nutrition Strategy</Text>
              <Text style={styles.cardText}>Focus: {nutrition?.focus || "Calorie surplus"}</Text>
              <Text style={styles.cardText}>Hydration: {nutrition?.hydration || "2L water daily"}</Text>
              <Text style={styles.cardText}>Meal Timing: {nutrition?.meal_timing || "3 main meals + 2 snacks"}</Text>
            </View>

            <Text style={styles.sectionTitle}>Recipe of the Day</Text>
            <View style={styles.recipeCard}>
              <Image source={gymPic} style={styles.recipeImage} />
              <View style={styles.recipeBadge}>
                <Text style={styles.recipeBadgeText}>Recipe of the day</Text>
              </View>
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipeOfTheDay.title}</Text>
                <View style={styles.recipeDetails}>
                  <Text style={styles.recipeDetail}>{recipeOfTheDay.meal_type}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.recipeDetail}>~{recipeOfTheDay.prep_time} mins</Text>
                  <View style={styles.dot} />
                  <Text style={styles.recipeDetail}>{recipeOfTheDay.calories} Cal</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Ingredients</Text>
              {recipeOfTheDay.ingredients.map((ingredient, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {ingredient}
                </Text>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Instructions</Text>
              {recipeOfTheDay.instructions.map((step, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  {i + 1}. {step}
                </Text>
              ))}
            </View>

            <Text style={styles.sectionTitle}>More Meal Ideas</Text>
            {moreRecipes.map((recipe, idx) => (
              <View key={idx} style={styles.mealCard}>
                <View style={styles.mealInfo}>
                  <Text style={styles.mealTitle}>{recipe.title}</Text>
                  <Text style={styles.mealType}>{recipe.meal_type}</Text>
                  <View style={styles.mealDetails}>
                    <Text style={styles.mealDetail}>~{recipe.prep_time} mins</Text>
                    <View style={styles.smallDot} />
                    <Text style={styles.mealDetail}>{recipe.calories} Cal</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Micronutrients Section */}
        {selectedCategory === "Micronutrients" && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Essential Micronutrients</Text>
              <Text style={styles.cardText}>
                For muscle building and recovery, focus on these key micronutrients:
              </Text>
            </View>

            {getMicronutrients().map((micronutrient, i) => (
              <View key={i} style={styles.micronutrientCard}>
                <Text style={styles.micronutrientTitle}>{micronutrient}</Text>
                <Text style={styles.micronutrientSubtitle}>Why it's important:</Text>
                {micronutrient === "Iron" && (
                  <Text style={styles.micronutrientText}>• Essential for oxygen transport to muscles</Text>
                )}
                {micronutrient === "Calcium" && (
                  <Text style={styles.micronutrientText}>• Supports bone health and muscle function</Text>
                )}
                {micronutrient === "Vitamin D" && (
                  <Text style={styles.micronutrientText}>• Aids calcium absorption and immune function</Text>
                )}
                {micronutrient === "Magnesium" && (
                  <Text style={styles.micronutrientText}>• Involved in muscle contraction and relaxation</Text>
                )}
                {micronutrient === "Vitamin B12" && (
                  <Text style={styles.micronutrientText}>• Supports energy production and nerve function</Text>
                )}
                {micronutrient === "Vitamin C" && (
                  <Text style={styles.micronutrientText}>• Antioxidant that aids collagen production</Text>
                )}
                
                <Text style={styles.micronutrientSubtitle}>Food Sources:</Text>
                {micronutrientFoods[micronutrient]?.map((food, j) => (
                  <Text key={j} style={styles.foodItem}>
                    • {food}
                  </Text>
                ))}
              </View>
            ))}

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tips for Micronutrient Intake</Text>
              <Text style={styles.bulletPoint}>• Eat a variety of colorful fruits and vegetables</Text>
              <Text style={styles.bulletPoint}>• Include lean protein sources</Text>
              <Text style={styles.bulletPoint}>• Consume dairy or dairy alternatives</Text>
              <Text style={styles.bulletPoint}>• Consider fortified foods if needed</Text>
              <Text style={styles.bulletPoint}>• Get regular sunlight exposure for Vitamin D</Text>
            </View>
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
    width: "90%",
    alignSelf: "center",
    marginTop: 30,
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
    fontSize: 13,
    fontFamily: Fonts.Montserrat_Medium,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  card: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 12,
    fontFamily: Fonts.Montserrat_Bold,
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Medium,
    marginBottom: 8,
    lineHeight: 20,
  },
  bulletPoint: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Regular,
    marginBottom: 6,
    lineHeight: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
    fontFamily: Fonts.Montserrat_Bold,
  },
  recipeCard: {
    backgroundColor: "#000",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    position: "relative",
  },
  recipeImage: {
    width: "100%",
    height: 180,
  },
  recipeBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
  },
  recipeBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: Fonts.Montserrat_Medium,
  },
  recipeInfo: {
    padding: 15,
    backgroundColor: "rgba(33, 32, 32, 0.9)",
  },
  recipeTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Bold,
    marginBottom: 8,
  },
  recipeDetails: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  recipeDetail: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: Fonts.Montserrat_Medium,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.textSecondary,
    marginHorizontal: 8,
  },
  mealCard: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Bold,
    marginBottom: 4,
  },
  mealType: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: Fonts.Montserrat_Medium,
    marginBottom: 6,
  },
  mealDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealDetail: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontFamily: Fonts.Montserrat_Regular,
  },
  smallDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textSecondary,
    marginHorizontal: 6,
  },
  micronutrientCard: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  micronutrientTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Bold,
    marginBottom: 10,
  },
  micronutrientSubtitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Medium,
    marginTop: 8,
    marginBottom: 4,
  },
  micronutrientText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Regular,
    marginBottom: 4,
    lineHeight: 20,
  },
  foodItem: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Regular,
    marginBottom: 3,
    lineHeight: 20,
  },
});