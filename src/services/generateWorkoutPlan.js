import axios from "axios";

// Helper to sanitize Unicode characters
const sanitizeText = (str) =>
  str
    .replace(/\u202F/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00D7/g, "x")
    .replace(/\u00B0/g, " degrees")
    .replace(/[“”]/g, '"')
    .replace(/[’]/g, "'");

export const generateWorkoutPlan = async (userData) => {
  try {
    const prompt = `You are a certified strength & conditioning coach + sports-nutritionist AI.  
Design a fully personalized program that spans WORKOUT-PLANS, DAILY-ROUTINES, RECOVERY, and NUTRITION for a mobile app.  
Return valid JSON only – no Markdown, no code fences, no comments, no extra text.

────────────────────
USER PROFILE
────────────────────
Full Name: ${userData?.fullName}
Age: ${userData?.age}
Gender: ${userData?.gender}
Height (cm): ${userData?.height}
Weight (kg): ${userData?.weight}
Current Physique: ${userData?.currentPhysique}
Goal: ${userData?.goal}
Goal Physique: ${userData?.goalPhysique}
Gym Experience: ${userData?.gymExperience}
Weekly Workout Commitment: ${userData?.weeklyWorkoutCommitment}
Available Equipment: ${userData?.availableEquipment}
Fitness Challenge / Injuries: ${userData?.fitnessChallenge}
Energy Level: ${userData?.energyLevel}
Sleep Hours (avg/night): ${userData?.sleepHours}
Water Intake (L/day): ${userData?.waterIntakeLiters}
Current Diet: ${userData?.currentDiet}
Dietary Preferences: ${userData?.dietaryPreferences}
Food Allergies: ${userData?.foodAllergies}


────────────────────
INSTRUCTION ADDITION (IMPORTANT)
────────────────────
Create a 7-day weekly plan where the number of active workout days matches the user's "Weekly Workout Commitment".  
Distribute rest days as "Day X: Rest".  
Example for 3-day commitment: ["Day 1: Push", "Day 2: Pull", "Day 3: Rest", ..., "Day 7: Rest"].  
Ensure "weekly_split" is always 7 days long with a mix of workout/rest days based on commitment.


────────────────────
OUTPUT FORMAT (STRICT)
────────────────────
{
  "weekly_split": [
    "Day 1: Push", "Day 2: Pull", "Day 3: Rest"
  ],
  "daily_workouts": {
    "Day 1": [
      {
        "name": "Incline Barbell Press",
        "sets": 4,
        "reps": "8-10",
        "equipment": "Barbell",
        "muscles_targeted": ["Chest", "Front Delts", "Triceps"],
        "image_prompt": "high-quality gym photo, male athlete performing incline barbell press, side view",
        "proper_form": [
          "Set bench to ~30 degrees incline.",
          "Retract scapula and keep feet planted."
        ],
        "tips_and_tricks": [
          "Use a controlled 2-sec eccentric."
        ],
        "common_mistakes": [
          "Letting elbows flare past 90 degrees"
        ]
      }
    ]
  },
  "warmup": [
    {
      "name": "Jumping Jacks",
      "duration": "2 min",
      "image_prompt": "cartoon person doing jumping jacks front view"
    }
  ],
  "cooldown": [
    {
      "name": "Standing Hamstring Stretch",
      "duration": "30 sec each leg",
      "image_prompt": "athlete stretching hamstrings side view"
    }
  ],
  "workout_guidelines": {
    "progressive_overload": "Add 2.5 kg or 1–2 reps when you can complete all sets at top of rep range.",
    "rest_times": "60-90 sec for compounds, 45-60 sec for isolation.",
    "volume_intensity": "Aim for 10-20 hard sets per muscle each week; keep 1–3 RIR on final set."
  },
  "recovery": {
    "sleep": {
      "target_hours": ${userData?.sleepHours < 7 ? 8 : userData?.sleepHours},
      "strategies": [
        "Wind-down routine 30 min before bed (no screens).",
        "Dark, cool (18-20 degrees C) bedroom."
      ]
    },
    "active_recovery": [
      "20-min brisk walk or cycling on rest days",
      "10-min mobility flow focusing on hips, T-spine"
    ],
    "water_intake": {
      "target_liters": ${Math.max(userData?.waterIntakeLiters, 3)},
      "tips": [
        "500 ml upon waking",
        "Electrolyte drink post-workout"
      ]
    }
  },
  "nutrition": {
    "calorie_goal": 0,
    "macros_g": {
      "protein": 0,
      "carbs": 0,
      "fats": 0
    },
    "micronutrient_focus": ["Vitamin D", "Magnesium", "Omega-3"],
    "recipe_of_the_day": {
      "title": "High-Protein Chickpea Salad",
      "meal_type": "Lunch",
      "ingredients": [
        "200 g cooked chickpeas",
        "100 g cherry tomatoes"
      ],
      "instructions": [
        "Mix all ingredients."
      ],
      "macros": {
        "calories": 420,
        "protein": 28,
        "carbs": 50,
        "fat": 12
      },
      "image_prompt": "bright overhead photo of colorful chickpea salad in bowl"
    },
    "recipes": []
  },
  "notes": "Prioritize form over load; update weights weekly; log workouts in app."
}

────────────────────
RULES
────────────────────
- Return ONLY the JSON above.
- Do NOT wrap in \`\`\`, or add explanations/comments.
- 5-8 exercises per training day.
- Respect all equipment, dietary, and allergy constraints.
- Adjust sets/reps/intensity to match GymExperience.
- Prioritize compound lifts first, isolation later.
- Calorie & macro targets must align with Goal (cut, maintain, bulk).
- Recipes must exclude FoodAllergies and satisfy DietaryPreferences.
- All image_prompt fields must be short yet descriptive.`;

    const safePrompt = sanitizeText(prompt);

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBNunMEcP-_CGwc4JHk5DPkTH3IU69GLR0",
      {
        contents: [
          {
            parts: [
              {
                text: safePrompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawText = response.data.candidates[0].content.parts[0].text;
    const cleanedJson = rawText.replace(/^```json\n/, "").replace(/\n```$/, "");
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.log("Error generating workout plan:", error.message);
    throw error;
  }
};
