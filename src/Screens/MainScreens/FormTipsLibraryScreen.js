import React, { useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const darkColors = {
  background: "#000000",
  primary: "#F34E3A",
  primaryLight: "#F17C3B",
  surface: "#000000",
  surfaceElevated: "#1A1A1A",
  primaryDark: "#D83A28",
  textPrimary: "#FFFFFF",
  textSecondary: "#888888",
  textMuted: "#666768",
  border: "#3C3C3C",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  gradientStart: "#F34E3A",
  gradientEnd: "#FF6B4A",
};

const FormTipsLibraryScreen = ({ navigation }) => {
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const [expandedExercise, setExpandedExercise] = useState(null);

  // Flatten all daily workouts across all days
  const workouts = useMemo(() => {
    if (!workoutPlan?.daily_workouts) return [];
    return Object.values(workoutPlan.daily_workouts)
      .flat()
      .filter(Boolean);
  }, [workoutPlan]);

  const toggleExpand = (exerciseId) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };

  const renderExerciseInstructions = (instructions) => {
    if (!instructions || !Array.isArray(instructions)) return null;
    
    return instructions.map((instruction, index) => (
      <View key={index} style={styles.instructionItem}>
        <View style={styles.instructionNumber}>
          <Text style={styles.instructionNumberText}>{index + 1}</Text>
        </View>
        <Text style={styles.instructionText}>
          {instruction.replace(/^Step:\d+\s*/, '')}
        </Text>
      </View>
    ));
  };

  const renderMuscleInfo = (primaryTarget, secondaryMuscles) => {
    return (
      <View style={styles.musclesContainer}>
        <View style={styles.muscleRow}>
          <FontAwesome5 name="star" size={12} color={darkColors.primary} />
          <Text style={styles.muscleLabel}>Primary: </Text>
          <Text style={styles.primaryMuscle}>{primaryTarget}</Text>
        </View>
        {secondaryMuscles && secondaryMuscles.length > 0 && (
          <View style={styles.muscleRow}>
            <Ionicons name="fitness" size={12} color={darkColors.textSecondary} />
            <Text style={styles.muscleLabel}>Secondary: </Text>
            <Text style={styles.secondaryMuscles}>
              {secondaryMuscles.join(', ')}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderWorkoutDetails = (workoutDetails) => {
    if (!workoutDetails) return null;
    
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="repeat" size={14} color={darkColors.primary} />
            <Text style={styles.detailText}>Sets: {workoutDetails.sets || 3}</Text>
          </View>
          <View style={styles.detailItem}>
            <FontAwesome5 name="redo-alt" size={12} color={darkColors.primary} />
            <Text style={styles.detailText}>Reps: {workoutDetails.reps || "8-12"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={14} color={darkColors.primary} />
            <Text style={styles.detailText}>Rest: {workoutDetails.restSeconds || 60}s</Text>
          </View>
        </View>
        {workoutDetails.notes && (
          <View style={styles.notesContainer}>
            <Ionicons name="information-circle" size={14} color={darkColors.warning} />
            <Text style={styles.notesText}>{workoutDetails.notes}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderExerciseItem = ({ item, index }) => {
    const isExpanded = expandedExercise === item.id;
    
    return (
      <LinearGradient 
        colors={["#000000", "#1A1A1A"]} 
        style={[styles.exerciseCard, isExpanded && styles.expandedCard]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Exercise Header */}
        <TouchableOpacity 
          style={styles.exerciseHeader}
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.8}
        >
          <View style={styles.headerLeft}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <View style={styles.exerciseMeta}>
                <View style={styles.metaItem}>
                  <FontAwesome5 name="dumbbell" size={12} color={darkColors.textSecondary} />
                  <Text style={styles.metaText}>{item.equipment}</Text>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                  <Ionicons name="body" size={12} color={darkColors.textSecondary} />
                  <Text style={styles.metaText}>{item.bodyPart}</Text>
                </View>
              </View>
            </View>
          </View>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={darkColors.textSecondary} 
          />
        </TouchableOpacity>

        {/* Exercise GIF Preview */}
        {item.gifUrl && (
          <View style={styles.gifContainer}>
            <Image 
              source={{ uri: item.gifUrl }}
              style={styles.gifImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            
            {/* Workout Details */}
            {renderWorkoutDetails(item.workoutDetails)}
            
            {/* Muscle Information */}
            {renderMuscleInfo(item.target, item.secondaryMuscles)}
            
            {/* Instructions */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient 
                  colors={[darkColors.primary, darkColors.primaryLight]} 
                  style={styles.sectionIcon}
                >
                  <Ionicons name="list" size={16} color="#fff" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Step-by-Step Instructions</Text>
              </View>
              <View style={styles.instructionsContainer}>
                {renderExerciseInstructions(item.instructions)}
              </View>
            </View>

            {/* Form Tips Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient 
                  colors={[darkColors.primary, darkColors.primaryLight]} 
                  style={styles.sectionIcon}
                >
                  <Ionicons name="bulb" size={16} color="#fff" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Key Form Points</Text>
              </View>
              
              <View style={styles.formTipsContainer}>
                {/* Proper Form Tips */}
                {item.bodyPart && item.target && (
                  <View style={styles.tipCategory}>
                    <View style={styles.tipCategoryHeader}>
                      <Ionicons name="checkmark-circle" size={14} color={darkColors.success} />
                      <Text style={styles.tipCategoryTitle}>Focus Areas</Text>
                    </View>
                    <View style={styles.tipItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.tipText}>
                        Focus on contracting your {item.target} throughout the movement
                      </Text>
                    </View>
                    {item.secondaryMuscles && item.secondaryMuscles.map((muscle, idx) => (
                      <View key={idx} style={styles.tipItem}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.tipText}>
                          Engage {muscle} for stability and support
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Equipment Tips */}
                {item.equipment && (
                  <View style={styles.tipCategory}>
                    <View style={styles.tipCategoryHeader}>
                      <FontAwesome5 name="toolbox" size={12} color={darkColors.warning} />
                      <Text style={styles.tipCategoryTitle}>Equipment Tips</Text>
                    </View>
                    <View style={styles.tipItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.tipText}>
                        Ensure proper setup of {item.equipment} before starting
                      </Text>
                    </View>
                    <View style={styles.tipItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.tipText}>
                        Adjust equipment to match your body proportions
                      </Text>
                    </View>
                  </View>
                )}

                {/* General Form Tips */}
                <View style={styles.tipCategory}>
                  <View style={styles.tipCategoryHeader}>
                    <Ionicons name="body" size={14} color={darkColors.primary} />
                    <Text style={styles.tipCategoryTitle}>General Tips</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.tipText}>
                      Maintain proper breathing - exhale during exertion
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.tipText}>
                      Keep core engaged throughout the movement
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.tipText}>
                      Control the movement - avoid using momentum
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.tipText}>
                      Maintain proper posture and alignment
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </LinearGradient>
    );
  };

  if (workouts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Form Tips Library</Text>
          <Text style={styles.subtitle}>Master your exercise technique</Text>
        </View>
        <LinearGradient colors={["#000000", "#1A1A1A"]} style={styles.emptyCard}>
          <Ionicons name="fitness-outline" size={60} color={darkColors.textSecondary} />
          <Text style={styles.emptyTitle}>No Exercises Found</Text>
          <Text style={styles.emptyText}>
            Your workout plan doesn't contain any exercises yet.
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('MyPlan')}
          >
            <LinearGradient 
              colors={[darkColors.primary, darkColors.primaryLight]} 
              style={styles.browseButtonGradient}
            >
              <Text style={styles.browseButtonText}>View Your Workout Plan</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Form Tips Library</Text>
        <Text style={styles.subtitle}>
          {workouts.length} exercises • Tap to expand instructions
        </Text>
      </View>

      {/* Exercises List */}
      <FlatList
        data={workouts}
        keyExtractor={(item, index) => item.id || `${item.name}-${index}`}
        renderItem={renderExerciseItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: darkColors.textPrimary,
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 4,
  },
  subtitle: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  listContent: {
    paddingBottom: 80,
    // backgroundColor:"red",
    paddingHorizontal:10
  },
  separator: {
    height: 16,
  },
  exerciseCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  expandedCard: {
    marginVertical: 4,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: darkColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: darkColors.textPrimary,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 4,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 4,
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: darkColors.border,
    marginHorizontal: 8,
  },
  gifContainer: {
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: 150,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  gifImage: {
    width: '100%',
    height: '100%',
  },
  expandedContent: {
    marginTop: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  detailText: {
    color: darkColors.textPrimary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 6,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: darkColors.warning,
  },
  notesText: {
    color: darkColors.warning,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  musclesContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  muscleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  muscleLabel: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 6,
  },
  primaryMuscle: {
    color: darkColors.primary,
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 2,
  },
  secondaryMuscles: {
    color: darkColors.textPrimary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 2,
    flex: 1,
  },
  section: {
    marginTop: 20,
    
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    color: darkColors.textPrimary,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  instructionsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: darkColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructionNumberText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  instructionText: {
    color: darkColors.textPrimary,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    lineHeight: 18,
  },
  formTipsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
  },
  tipCategory: {
    marginBottom: 20,
  },
  tipCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipCategoryTitle: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: darkColors.primary,
    marginTop: 8,
    marginRight: 12,
  },
  tipText: {
    color: darkColors.textPrimary,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 18,
    flex: 1,
  },
  emptyCard: {
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 20,
  },
  emptyTitle: {
    color: darkColors.textPrimary,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  browseButton: {
    width: '100%',
  },
  browseButtonGradient: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
});

export default FormTipsLibraryScreen;