import axios from "axios";

export const generateWorkoutPlan = async (userData) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBNunMEcP-_CGwc4JHk5DPkTH3IU69GLR0",
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a certified strength coach AI. Design personalized gym workout plans based on the user's full fitness profile.
Based on the profile below, generate a personalized workout plan in **pure JSON**.  
NO markdown, NO explanations, NO extra text — only valid JSON.

────────────────────
USER PROFILE
────────────────────
Name: ${userData?.name}
Age: ${userData?.age}
Gender: ${userData?.gender}
Height: ${userData?.height}
Weight: ${userData?.weight}
Current Diet: ${userData?.currentDiet}
Current Physique: ${userData?.currentPhysique}
Goal: ${userData?.goal}
Goal Physique: ${userData?.goalPhysique}
Gym Experience: ${userData?.gymExperience}
Weekly Workout Commitment: ${userData?.weeklyWorkoutCommitment}
Sleep Hours: ${userData?.sleepHours}
Water Intake: ${userData?.waterIntakeLiters}
Energy Level: ${userData?.energyLevel}
Available Equipment: ${userData?.availableEquipment}
Dietary Preferences: ${userData?.dietaryPreferences}
Food Allergies: ${userData?.foodAllergies}
Fitness Challenge: ${userData?.fitnessChallenge}
Special Preferences: Core-focused, short sessions < 45 min

────────────────────
OUTPUT FORMAT
────────────────────
{
  "weekly_split": ["Day 1: Push", "Day 2: Pull", ...],
// REQUIRED: The number of items in "weekly_split" MUST equal the Weekly Workout Commitment: ${userData?.weeklyWorkoutCommitment}
,

  "daily_workouts": {
    "Day 1": [
      {
        "name": "Bench Press",
        "sets": 4,
        "reps": "8-10",
        "equipment": "Barbell",
        "muscles_targeted": ["Chest", "Triceps", "Shoulders"],
        "image_prompt": "high quality gym photo of bench press side view male athlete",
        "proper_form": [
          "Lie flat on the bench with feet firmly planted.",
          "Grip the bar slightly wider than shoulder-width.",
          "Lower the bar to mid-chest, keep elbows at 75 degrees.",
          "Push the bar back up while exhaling."
        ],
        "tips_and_tricks": [
          "Use leg drive for stability.",
          "Squeeze the bar tightly to engage more muscles.",
          "Keep core braced throughout the lift."
        ],
        "common_mistakes": [
          "Lifting feet off the ground.",
          "Flaring elbows too wide.",
          "Bouncing the bar off the chest.",
          "Not using full range of motion."
        ]
      },
      ...
    ],
    ...
  },

  "warmup": [
    {
      "name": "Jumping Jacks",
      "duration": "2 minutes",
      "image_prompt": "cartoon of a person doing jumping jacks, front view"
    },
    ...
  ],

  "cooldown": [
    {
      "name": "Hamstring Stretch",
      "duration": "30 seconds each leg",
      "image_prompt": "female athlete doing standing hamstring stretch, side view"
    },
    ...
  ],

  "notes": "Prioritize sleep, hydrate well, and focus on progressive overload. Rest 60-90s between sets."
}

────────────────────
RULES:
────────────────────
- Return strict JSON. No code blocks, no formatting like \`\`\`, no comments.
- Do NOT add text outside the JSON.
- Exercises MUST include: name, sets, reps, muscles, image_prompt, proper_form, tips_and_tricks, common_mistakes.
- Use 5–8 exercises per day max.
- Match workout intensity and reps to experience level (beginner = 3×12, intermediate = 4×8–10).
- Respect dietary/allergy/equipment constraints.
- Use compound lifts first, isolation second.
- Weekly split must match ${userData?.weeklyWorkoutCommitment} days.
`,
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
    console.error("Error generating workout plan:", error.message);
    throw error;
  }
};
