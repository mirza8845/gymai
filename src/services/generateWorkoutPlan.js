import axios from "axios";

/* EXERCISE DB WORKOUT ENGINE - COMPLETE VERSION*/
class ExerciseDBWorkoutGenerator {
  constructor() {
    this.baseUrl = "https://exercisedb-api.vercel.app/api/v1";
    this.cache = new Map();
    this.cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
    this.isGenerating = false;
    this.lastRequestTime = 0;
  }

  /* RATE LIMIT HANDLING */
  async throttleRequest() {
    if (this.isGenerating) {
      throw {
        code: "REQUEST_IN_PROGRESS",
        message: "A workout generation is already in progress. Please wait.",
      };
    }
    
    this.isGenerating = true;
    
    const now = Date.now();
    const timeSinceLast = now - this.lastRequestTime;
    
    if (timeSinceLast < 1000) {
      await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLast));
    }
    
    this.lastRequestTime = Date.now();
  }

  /* EXERCISE FETCHING METHODS */
  async fetchExercises(endpoint, params = {}) {
    try {
      const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
      const cached = this.cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
        return cached.data;
      }

      let url = `${this.baseUrl}/${endpoint}`;
      console.log(`📡 Fetching: ${url}`);
      
      const response = await axios.get(url, {
        params,
        timeout: 15000,
      });

      const responseData = response.data;
      
      // Handle different response structures
      let exercisesArray = [];
      if (responseData) {
        if (Array.isArray(responseData.data)) {
          exercisesArray = responseData.data;
        } else if (Array.isArray(responseData)) {
          exercisesArray = responseData;
        } else if (responseData.success && Array.isArray(responseData.data)) {
          exercisesArray = responseData.data;
        }
      }
      
      console.log(`Fetched ${exercisesArray.length} exercises from ${endpoint}`);
      this.cache.set(cacheKey, { data: exercisesArray, timestamp: Date.now() });
      return exercisesArray;
      
    } catch (error) {
      console.error(` Error fetching ${endpoint}:`, error.message);
      
      if (error.code === 'ECONNABORTED') {
        throw {
          code: "TIMEOUT",
          message: "Exercise database request timed out.",
        };
      }
      
      if (!error.response) {
        throw {
          code: "NETWORK_ERROR",
          message: "Cannot connect to exercise database.",
        };
      }
      
      return [];
    }
  }

  /* API ENDPOINTS */
  async getAllBodyParts() {
    const bodyParts = await this.fetchExercises("bodyparts");
    if (bodyParts && bodyParts.length > 0 && typeof bodyParts[0] === 'object') {
      return bodyParts.map(item => item.name).filter(Boolean);
    }
    return bodyParts || [];
  }

  async getAllEquipment() {
    const equipment = await this.fetchExercises("equipments");
    if (equipment && equipment.length > 0 && typeof equipment[0] === 'object') {
      return equipment.map(item => item.name).filter(Boolean);
    }
    return equipment || [];
  }

  async getAllTargetMuscles() {
    const targets = await this.fetchExercises("muscles");
    if (targets && targets.length > 0 && typeof targets[0] === 'object') {
      return targets.map(item => item.name).filter(Boolean);
    }
    return targets || [];
  }

  async getExercisesByBodyPart(bodyPart, limit = 30) {
    try {
      const cleanBodyPart = this.cleanBodyPartName(bodyPart);
      console.log(`Getting exercises for body part: ${cleanBodyPart}`);
      
      return await this.fetchExercises(`bodyparts/${cleanBodyPart}/exercises`, { limit });
    } catch (error) {
      console.error(`Error getting exercises for ${bodyPart}:`, error);
      return [];
    }
  }

  async getExercisesByEquipment(equipment, limit = 30) {
    try {
      const cleanEquipment = this.cleanEquipmentName(equipment);
      console.log(`Getting exercises for equipment: ${cleanEquipment}`);
      
      return await this.fetchExercises(`equipments/${cleanEquipment}/exercises`, { limit });
    } catch (error) {
      console.error(`Error getting exercises for equipment ${equipment}:`, error);
      return [];
    }
  }

  async searchExercises(query, limit = 20) {
    try {
      console.log(`Searching exercises for: ${query}`);
      const results = await this.fetchExercises("exercises", { q: query, limit });
      
      if (!results || results.length === 0) {
        const bodyPartResults = await this.getExercisesByBodyPart(query, limit);
        return bodyPartResults;
      }
      
      return results;
    } catch (error) {
      console.error(`Error searching exercises for ${query}:`, error);
      return [];
    }
  }

  getExerciseGifUrl(id) {
    if (!id) return null;
    return `https://static.exercisedb.dev/media/${id}.gif`;
  }

  /* 
     CLEANING AND NORMALIZATION
   */
  cleanBodyPartName(bodyPart) {
    const mappings = {
      "chest": "chest",
      "back": "back",
      "shoulders": "shoulders",
      "upper arms": "upper arms",
      "lower arms": "lower arms",
      "upper legs": "upper legs",
      "lower legs": "lower legs",
      "waist": "waist",
      "cardio": "cardio",
      "neck": "neck",
      "triceps": "upper arms",
      "biceps": "upper arms",
      "abs": "waist",
      "core": "waist",
      "glutes": "upper legs",
      "hamstrings": "upper legs",
      "quads": "upper legs",
      "calves": "lower legs",
      "forearms": "lower arms"
    };
    
    const lowerBodyPart = bodyPart.toLowerCase().trim();
    return mappings[lowerBodyPart] || bodyPart;
  }

  cleanEquipmentName(equipment) {
    const mappings = {
      "body weight": "body weight",
      "dumbbell": "dumbbell",
      "barbell": "barbell",
      "kettlebell": "kettlebell",
      "cable": "cable",
      "machine": "leverage machine",
      "band": "band",
      "resistance band": "band",
      "smith machine": "smith machine",
      "cable machine": "cable",
      "pull up bar": "body weight",
      "dip bars": "body weight",
      "leg machines": "leverage machine",
      "back machines": "leverage machine",
      "everything": ""
    };
    
    const lowerEquipment = equipment.toLowerCase().trim();
    return mappings[lowerEquipment] || equipment;
  }

  /* 
     WORKOUT TEMPLATES - COMPLETE
   */
  normalizeGoal(goal) {
    const goalMap = {
      "muscle gain": "Build Muscle",
      "build muscle": "Build Muscle",
      "gain muscle": "Build Muscle",
      "weight loss": "Lose Weight",
      "lose weight": "Lose Weight",
      "fat loss": "Lose Weight",
      "strength": "Strength",
      "get stronger": "Strength",
      "endurance": "Endurance",
      "stamina": "Endurance",
      "toning": "Toning",
      "tone up": "Toning",
      "get toned": "Toning"
    };
    
    return goalMap[goal.toLowerCase()] || "Build Muscle";
  }

  getWorkoutTemplate(userData) {
    // Normalize goal names
    const goal = this.normalizeGoal(userData.goal);
    const gymExperience = userData.gymExperience || "Beginner";
    const weeklyWorkoutCommitment = parseInt(userData.weeklyWorkoutCommitment) || 3;

    // Return template based on goal
    if (goal === "Build Muscle") {
      return {
        focus: "Muscle Growth",
        split: this.getMuscleBuildingSplit(weeklyWorkoutCommitment),
        sets: { beginner: 3, intermediate: 4, advanced: 4 },
        reps: { beginner: "8-12", intermediate: "6-10", advanced: "4-8" },
        rest: 60,
        musclePriority: ["chest", "back", "upper legs", "shoulders", "upper arms"],
      };
    } else if (goal === "Lose Weight") {
      return {
        focus: "Fat Loss",
        split: this.getFatLossSplit(weeklyWorkoutCommitment),
        sets: { beginner: 2, intermediate: 3, advanced: 3 },
        reps: { beginner: "12-15", intermediate: "10-15", advanced: "8-12" },
        rest: 30,
        musclePriority: ["cardio", "waist", "full body"],
      };
    } else if (goal === "Strength") {
      return {
        focus: "Strength",
        split: this.getStrengthSplit(weeklyWorkoutCommitment),
        sets: { beginner: 3, intermediate: 4, advanced: 5 },
        reps: { beginner: "5-8", intermediate: "3-6", advanced: "1-5" },
        rest: 90,
        musclePriority: ["chest", "back", "upper legs", "shoulders"],
      };
    } else if (goal === "Endurance") {
      return {
        focus: "Endurance",
        split: this.getEnduranceSplit(weeklyWorkoutCommitment),
        sets: { beginner: 2, intermediate: 3, advanced: 3 },
        reps: { beginner: "15-20", intermediate: "12-20", advanced: "10-15" },
        rest: 20,
        musclePriority: ["cardio", "full body", "upper legs"],
      };
    } else if (goal === "Toning") {
      return {
        focus: "Toning",
        split: this.getToningSplit(weeklyWorkoutCommitment),
        sets: { beginner: 3, intermediate: 3, advanced: 4 },
        reps: { beginner: "12-15", intermediate: "10-15", advanced: "8-12" },
        rest: 45,
        musclePriority: ["chest", "back", "upper arms", "waist", "upper legs"],
      };
    } else {
      // Default to Build Muscle
      return {
        focus: "Muscle Growth",
        split: this.getMuscleBuildingSplit(weeklyWorkoutCommitment),
        sets: { beginner: 3, intermediate: 4, advanced: 4 },
        reps: { beginner: "8-12", intermediate: "6-10", advanced: "4-8" },
        rest: 60,
        musclePriority: ["chest", "back", "upper legs", "shoulders", "upper arms"],
      };
    }
  }

  /* 
     WORKOUT SPLITS - ALL METHODS ADDED
   */
  getMuscleBuildingSplit(days) {
    const splits = {
      1: ["Full Body"],
      2: ["Upper Body", "Lower Body"],
      3: ["Push", "Pull", "Legs"],
      4: ["Push", "Pull", "Legs", "Upper Body"],
      5: ["Push", "Pull", "Legs", "Upper Body", "Lower Body"],
      6: ["Push", "Pull", "Legs", "Push", "Pull", "Cardio"],
      7: ["Push", "Pull", "Legs", "Upper Body", "Lower Body", "Cardio", "Rest"],
    };
    return splits[days] || splits[3];
  }

  getFatLossSplit(days) {
    const splits = {
      1: ["Full Body HIIT"],
      2: ["Cardio + Strength", "HIIT Circuit"],
      3: ["HIIT Upper", "HIIT Lower", "Cardio"],
      4: ["Circuit A", "Circuit B", "HIIT", "Cardio"],
      5: ["Full Body HIIT", "Upper Circuit", "Lower Circuit", "Cardio", "Active Recovery"],
      6: ["HIIT", "Strength", "Cardio", "HIIT", "Strength", "Active Recovery"],
      7: ["HIIT", "Circuit", "Cardio", "Strength", "Yoga", "Active Recovery", "Rest"],
    };
    return splits[days] || splits[3];
  }

  getStrengthSplit(days) {
    const splits = {
      1: ["Full Body Strength"],
      2: ["Upper Strength", "Lower Strength"],
      3: ["Squat Focus", "Bench Focus", "Deadlift Focus"],
      4: ["Heavy Upper", "Heavy Lower", "Accessory Upper", "Accessory Lower"],
      5: ["Squat", "Bench", "Deadlift", "Overhead Press", "Accessory"],
      6: ["Heavy Push", "Heavy Pull", "Heavy Legs", "Accessory Push", "Accessory Pull", "Accessory Legs"],
      7: ["Squat", "Bench", "Deadlift", "Overhead Press", "Accessory", "Mobility", "Rest"],
    };
    return splits[days] || splits[3];
  }

  getEnduranceSplit(days) {
    const splits = {
      1: ["Long Cardio"],
      2: ["Cardio + Strength", "Endurance Cardio"],
      3: ["Running", "Cycling", "Swimming"],
      4: ["Cardio", "Strength Endurance", "Cardio", "Active Recovery"],
      5: ["Running", "Cycling", "Swimming", "Strength", "Active Recovery"],
      6: ["Long Cardio", "Interval Training", "Strength", "Cardio", "Active Recovery", "Rest"],
      7: ["Running", "Cycling", "Swimming", "Strength", "Yoga", "Active Recovery", "Rest"],
    };
    return splits[days] || splits[3];
  }

  getToningSplit(days) {
    const splits = {
      1: ["Full Body Tone"],
      2: ["Upper Tone", "Lower Tone"],
      3: ["Push Tone", "Pull Tone", "Legs Tone"],
      4: ["Upper Body", "Lower Body", "Core Focus", "Cardio Tone"],
      5: ["Chest & Triceps", "Back & Biceps", "Legs", "Shoulders", "Core & Cardio"],
      6: ["Upper", "Lower", "Full Body", "Cardio", "Core", "Active Recovery"],
      7: ["Upper", "Lower", "Full Body", "Cardio", "Core", "Yoga", "Rest"],
    };
    return splits[days] || splits[3];
  }

  /* 
     EQUIPMENT HANDLING
   */
  getEquipmentFilter(userEquipment) {
    if (!userEquipment) return [];
    
    let equipmentList = [];
    if (Array.isArray(userEquipment)) {
      equipmentList = userEquipment;
    } else if (typeof userEquipment === 'string') {
      equipmentList = [userEquipment];
    }
    
    const equipmentMap = {
      "Everything": [],
      "Full Gym": [],
      "Home Gym": ["dumbbell", "barbell", "kettlebell", "band"],
      "Bodyweight": ["body weight"],
      "No Equipment": ["body weight"],
      "Dumbbells Only": ["dumbbell"],
      "Barbells Only": ["barbell"],
      "Resistance Bands": ["band"],
      "Cable machine": ["cable"],
      "Smith machine": ["smith machine"],
      "Back extension": ["body weight"],
      "Barbell": ["barbell"],
      "Back machines": ["leverage machine"],
      "Pull up/Dip bars": ["body weight"],
      "Leg machines": ["leverage machine"]
    };
    
    const filters = [];
    equipmentList.forEach(equipment => {
      const cleanEq = equipment.trim();
      if (equipmentMap[cleanEq]) {
        filters.push(...equipmentMap[cleanEq]);
      } else {
        for (const [key, value] of Object.entries(equipmentMap)) {
          if (cleanEq.toLowerCase().includes(key.toLowerCase()) || 
              key.toLowerCase().includes(cleanEq.toLowerCase())) {
            filters.push(...value);
            break;
          }
        }
      }
    });
    
    return [...new Set(filters)];
  }

  /* 
     EXERCISE SELECTION
   */
  mapWorkoutDayToMuscles(workoutDay) {
    const day = workoutDay.toLowerCase();
    
    const mappings = {
      "push": ["chest", "shoulders", "upper arms"],
      "pull": ["back", "upper arms"],
      "legs": ["upper legs", "lower legs"],
      "upper": ["chest", "back", "shoulders", "upper arms"],
      "lower": ["upper legs", "lower legs"],
      "chest": ["chest"],
      "back": ["back"],
      "shoulders": ["shoulders"],
      "arms": ["upper arms"],
      "cardio": ["cardio"],
      "hiit": ["cardio"],
      "core": ["waist"],
      "full body": ["chest", "back", "upper legs", "shoulders"]
    };
    
    for (const [key, muscles] of Object.entries(mappings)) {
      if (day.includes(key)) {
        return muscles;
      }
    }
    
    return ["chest", "back", "upper legs"];
  }

  async selectExercisesForWorkout(userData, workoutDay) {
    try {
      console.log(`Building ${workoutDay} workout...`);
      const template = this.getWorkoutTemplate(userData);
      const experience = (userData.gymExperience || "Beginner").toLowerCase();
      
      const muscleGroups = this.mapWorkoutDayToMuscles(workoutDay);
      console.log(`Muscle groups for ${workoutDay}:`, muscleGroups);
      
      const equipmentFilter = this.getEquipmentFilter(userData.availableEquipment);
      console.log(`Equipment filter:`, equipmentFilter);
      
      const selectedExercises = [];
      
      for (const muscleGroup of muscleGroups) {
        console.log(`Getting exercises for ${muscleGroup}...`);
        
        let exercises = await this.getExercisesByBodyPart(muscleGroup, 40);
        
        if (!exercises || exercises.length === 0) {
          console.log(`No exercises found for ${muscleGroup}, trying search...`);
          exercises = await this.searchExercises(muscleGroup, 30);
        }
        
        if (equipmentFilter.length > 0 && exercises.length > 0) {
          const filteredExercises = exercises.filter(ex => {
            const exEquipment = ex.equipments ? ex.equipments[0] : "";
            const exEquipmentLower = exEquipment.toLowerCase();
            return equipmentFilter.some(equip => 
              exEquipmentLower.includes(equip.toLowerCase()) || 
              equip.toLowerCase().includes(exEquipmentLower)
            );
          });
          
          if (filteredExercises.length > 0) {
            exercises = filteredExercises;
          } else {
            console.log(`No exercises match equipment filter for ${muscleGroup}`);
          }
        }
        
        exercises = this.filterByExperienceLevel(exercises, experience);
        
        const count = this.getExerciseCount(muscleGroup, experience);
        console.log(`🎯 Selecting ${count} exercises for ${muscleGroup}...`);
        
        const selected = this.selectRandomExercises(exercises, count);
        
        const formatted = selected.map(ex => 
          this.formatExerciseForWorkout(ex, template, experience, muscleGroup)
        );
        
        selectedExercises.push(...formatted);
      }
      
      console.log(` ${workoutDay}: Selected ${selectedExercises.length} exercises`);
      return selectedExercises;
      
    } catch (error) {
      console.error(` Error building ${workoutDay} workout:`, error);
      return [];
    }
  }

  filterByExperienceLevel(exercises, experience) {
    if (!Array.isArray(exercises) || exercises.length === 0) return [];
    
    const beginnerFriendly = [
      "machine", "assisted", "seated", "cable", "dumbbell", 
      "bodyweight", "incline", "wall", "kneeling"
    ];
    
    const advancedKeywords = [
      "barbell", "weighted", "single", "one-arm", "plyometric",
      "explosive", "clean", "snatch", "overhead"
    ];
    
    if (experience === "beginner") {
      return exercises.filter(ex => {
        const name = (ex.name || "").toLowerCase();
        const hasBeginnerFriendly = beginnerFriendly.some(keyword => name.includes(keyword));
        const hasAdvanced = advancedKeywords.some(keyword => name.includes(keyword));
        return hasBeginnerFriendly || !hasAdvanced;
      });
    }
    
    return exercises;
  }

  getExerciseCount(muscleGroup, experience) {
    const counts = {
      "chest": { beginner: 3, intermediate: 4, advanced: 4 },
      "back": { beginner: 3, intermediate: 4, advanced: 4 },
      "upper legs": { beginner: 3, intermediate: 4, advanced: 4 },
      "lower legs": { beginner: 2, intermediate: 3, advanced: 3 },
      "shoulders": { beginner: 2, intermediate: 3, advanced: 3 },
      "upper arms": { beginner: 2, intermediate: 3, advanced: 3 },
      "cardio": { beginner: 1, intermediate: 1, advanced: 1 },
      "waist": { beginner: 2, intermediate: 3, advanced: 4 },
    };
    
    return counts[muscleGroup]?.[experience] || 2;
  }

  selectRandomExercises(exercises, count) {
    if (!Array.isArray(exercises) || exercises.length === 0) {
      console.log("No exercises to select from");
      return [];
    }
    
    if (exercises.length <= count) {
      return exercises;
    }
    
    const shuffled = [...exercises];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  }

  formatExerciseForWorkout(exercise, template, experience, muscleGroup) {
    const sets = template.sets[experience] || 3;
    const reps = template.reps[experience] || "8-12";
    
    const exerciseId = exercise.exerciseId || exercise.id || `ex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const exerciseName = exercise.name || "Exercise";
    const bodyParts = exercise.bodyParts || [muscleGroup];
    const equipments = exercise.equipments || ["Body Weight"];
    const targetMuscles = exercise.targetMuscles || [muscleGroup];
    const instructions = exercise.instructions || ["Perform with proper form and control"];
    const secondaryMuscles = exercise.secondaryMuscles || [];
    
    return {
      id: exerciseId,
      name: exerciseName,
      bodyPart: bodyParts[0] || muscleGroup,
      equipment: equipments[0] || "Body Weight",
      target: targetMuscles[0] || muscleGroup,
      gifUrl: this.getExerciseGifUrl(exerciseId),
      workoutDetails: {
        sets: sets,
        reps: reps,
        restSeconds: template.rest || 60,
        notes: `Focus on ${muscleGroup}`,
      },
      instructions: instructions,
      secondaryMuscles: secondaryMuscles,
    };
  }

  /* 
     DATA PARSING
   */
  parseWeight(weightInput) {
    if (!weightInput) return 70;
    
    const weightStr = weightInput.toString().toLowerCase();
    const match = weightStr.match(/(\d+(?:\.\d+)?)/);
    
    if (match) {
      const weight = parseFloat(match[1]);
      if (weight > 30 && weight < 200) {
        return weight;
      }
    }
    
    return 70;
  }

  parseHeight(heightInput) {
    if (!heightInput) return 175;
    
    const heightStr = heightInput.toString().toLowerCase();
    const match = heightStr.match(/(\d+(?:\.\d+)?)/);
    
    if (match) {
      const height = parseFloat(match[1]);
      if (height < 3) {
        return Math.round(height * 100);
      }
      if (height >= 100 && height <= 250) {
        return height;
      }
    }
    
    return 175;
  }

  /* 
     COMPLETE PLAN GENERATION
   */
  async generateWorkoutPlan(userData) {
    try {
      await this.throttleRequest();
      
      console.log("🏋️ Generating workout plan...");
      
      const weeklyWorkoutCommitment = parseInt(userData.weeklyWorkoutCommitment) || 3;
      const goal = this.normalizeGoal(userData.goal);
      const weight = this.parseWeight(userData.weight);
      const height = this.parseHeight(userData.height);
      
      console.log(`User: ${userData.fullName || "User"}`);
      console.log(`Goal: ${goal}`);
      console.log(`Days per week: ${weeklyWorkoutCommitment}`);
      console.log(` Weight: ${weight} kg`);
      
      const template = this.getWorkoutTemplate({
        ...userData,
        goal: goal,
        weeklyWorkoutCommitment: weeklyWorkoutCommitment
      });
      
      const split = template.split;

      const dailyWorkouts = {};
      const weeklySplit = [];

      for (let i = 0; i < 7; i++) {
        const dayNum = i + 1;
        if (i < split.length) {
          const dayType = split[i];
          weeklySplit.push(`Day ${dayNum}: ${dayType}`);
          console.log(`Building Day ${dayNum}: ${dayType}`);
          
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          
          dailyWorkouts[`Day ${dayNum}`] = await this.selectExercisesForWorkout(userData, dayType);
        } else {
          weeklySplit.push(`Day ${dayNum}: Rest`);
          dailyWorkouts[`Day ${dayNum}`] = [];
        }
      }

      const warmup = await this.generateWarmup();
      const cooldown = await this.generateCooldown();

      const nutrition = this.generateNutritionPlan({
        ...userData,
        weight: weight,
        goal: goal
      });

      return {
        userProfile: this.formatUserProfile(userData, weight, height),
        goal: goal,
        weekly_split: weeklySplit,
        daily_workouts: dailyWorkouts,
        warmup,
        cooldown,
        workout_guidelines: this.generateWorkoutGuidelines(template, userData),
        recovery: this.generateRecoveryPlan(userData, weight),
        nutrition,
        generatedAt: new Date().toISOString(),
        source: "ExerciseDB (Free API)",
      };
      
    } catch (error) {
      console.error(" Generation failed:", error);
      throw error;
    } finally {
      this.isGenerating = false;
    }
  }

  /* 
     NUTRITION CALCULATION
   */
  generateNutritionPlan(userData) {
    const weight = userData.weight || 70;
    const goal = this.normalizeGoal(userData.goal);
    
    const plans = {
      "Build Muscle": {
        calories: Math.round(weight * 35),
        protein: Math.round(weight * 2.2),
        carbs: Math.round(weight * 4),
        fat: Math.round(weight * 1),
      },
      "Lose Weight": {
        calories: Math.round(weight * 25),
        protein: Math.round(weight * 2),
        carbs: Math.round(weight * 2),
        fat: Math.round(weight * 0.8),
      },
      "Strength": {
        calories: Math.round(weight * 33),
        protein: Math.round(weight * 2.5),
        carbs: Math.round(weight * 3),
        fat: Math.round(weight * 1.2),
      },
      "Endurance": {
        calories: Math.round(weight * 40),
        protein: Math.round(weight * 1.8),
        carbs: Math.round(weight * 6),
        fat: Math.round(weight * 1),
      },
      "Toning": {
        calories: Math.round(weight * 30),
        protein: Math.round(weight * 2),
        carbs: Math.round(weight * 3),
        fat: Math.round(weight * 0.9),
      },
    };
    
    const plan = plans[goal] || plans["Build Muscle"];
    
    return {
      daily_calories: plan.calories,
      protein_g: plan.protein,
      carbs_g: plan.carbs,
      fat_g: plan.fat,
      meal_timing: "3 main meals + 2 snacks",
      hydration: `${Math.round(weight * 0.035)}L water daily`,
      focus: goal === "Lose Weight" ? "Calorie deficit" : "Calorie surplus",
    };
  }

  /* ================================
     RECOVERY PLAN
  ================================ */
  generateRecoveryPlan(userData, weight) {
    const hydrationLiters = weight ? Math.round(weight * 0.035) : 2.5;
    
    return {
      sleep: {
        target_hours: 7,
        tips: ["Consistent sleep schedule", "Avoid screens 1 hour before bed"],
      },
      hydration: {
        target_liters: hydrationLiters,
        tips: ["Drink 500ml upon waking", "Sip water throughout workouts"],
      },
      active_recovery: ["20min walk", "Light yoga", "Foam rolling"],
      rest_days: "Essential for muscle repair and growth",
    };
  }

  /* 
     USER PROFILE FORMATTING
   */
  formatUserProfile(userData, weight, height) {
    return {
      name: userData.fullName || "User",
      age: userData.age || 25,
      gender: userData.gender || "Not specified",
      height: `${height} cm`,
      weight: `${weight} kg`,
      goal: this.normalizeGoal(userData.goal),
      experience: userData.gymExperience || "Beginner",
      equipment: Array.isArray(userData.availableEquipment) 
        ? userData.availableEquipment.join(", ")
        : userData.availableEquipment || "Full Gym",
      weekly_workouts: userData.weeklyWorkoutCommitment || "3",
    };
  }

  /* 
     WARMUP & COOLDOWN
   */
  async generateWarmup() {
    return [
      { name: "Jumping Jacks", duration: "2 min", type: "cardio" },
      { name: "Arm Circles", duration: "1 min", type: "mobility" },
      { name: "Leg Swings", duration: "1 min", type: "mobility" },
      { name: "Bodyweight Squats", duration: "1 min", type: "activation" },
      { name: "Cat-Cow Stretch", duration: "1 min", type: "mobility" },
    ];
  }

  async generateCooldown() {
    return [
      { name: "Full Body Stretch", duration: "5 min", type: "stretching" },
      { name: "Deep Breathing", duration: "2 min", type: "recovery" },
      { name: "Child's Pose", duration: "1 min", type: "stretching" },
    ];
  }

  generateWorkoutGuidelines(template, userData) {
    const experience = (userData.gymExperience || "Beginner").toLowerCase();
    
    return {
      focus: template.focus,
      intensity: "Leave 2-3 reps in reserve",
      rest_between_sets: `${template.rest} seconds`,
      rest_between_exercises: "60-90 seconds",
      progression: "Increase weight by 2.5-5% when you can complete all reps",
      form: "Quality over quantity - maintain strict form",
      frequency: `${userData.weeklyWorkoutCommitment || 3} days per week`,
      warmup: "Always warm up for 5-10 minutes",
      cooldown: "Stretch for 5 minutes post-workout",
    };
  }
}

/* 
   EXPORTED FUNCTIONS
 */
const workoutGenerator = new ExerciseDBWorkoutGenerator();

export const generateExerciseDBWorkoutPlan = async (userData) => {
  try {
    console.log("🚀 Starting workout generation...");
    
    if (!userData.goal) {
      throw { code: "VALIDATION_ERROR", message: "Goal is required" };
    }
    
    const defaultData = {
      fullName: "User",
      age: 25,
      gender: "Not specified",
      height: 175,
      weight: 70,
      gymExperience: "Beginner",
      availableEquipment: "Full Gym",
      weeklyWorkoutCommitment: 3,
      ...userData,
    };
    
    const plan = await workoutGenerator.generateWorkoutPlan(defaultData);
    console.log(" Workout plan generated successfully!");
    return plan;
    
  } catch (error) {
    console.error(" Failed to generate workout:", error);
    
    if (error.code) {
      throw error;
    }
    
    throw {
      code: "GENERATION_FAILED",
      message: error.message || "Failed to generate workout plan",
      details: "Please try again",
    };
  }
};

export const getExerciseCategories = async () => {
  try {
    const [bodyParts, equipment, targets] = await Promise.all([
      workoutGenerator.getAllBodyParts(),
      workoutGenerator.getAllEquipment(),
      workoutGenerator.getAllTargetMuscles(),
    ]);
    
    return {
      bodyParts: bodyParts || [],
      equipment: equipment || [],
      targets: targets || [],
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { bodyParts: [], equipment: [], targets: [] };
  }
};

export const searchExercises = async (query, limit = 10) => {
  return workoutGenerator.searchExercises(query, limit);
};

export const canGenerateWorkout = () => {
  return !workoutGenerator.isGenerating;
};