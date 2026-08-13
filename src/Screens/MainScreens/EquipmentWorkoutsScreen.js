import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
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

const EquipmentWorkoutsScreen = () => {
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [expandedExercise, setExpandedExercise] = useState(null);

  // Flatten all workouts across all days
  const allWorkouts = useMemo(() => {
    if (!workoutPlan?.daily_workouts) return [];
    return Object.values(workoutPlan.daily_workouts)
      .flat()
      .filter(Boolean)
      .filter(exercise => exercise.equipment); // Only include exercises with equipment
  }, [workoutPlan]);

  // Extract unique equipment from all workouts dynamically
  const equipmentList = useMemo(() => {
    const eqSet = new Set();
    allWorkouts.forEach((w) => {
      if (w.equipment && w.equipment.trim()) {
        eqSet.add(w.equipment);
      }
    });
    return Array.from(eqSet).sort();
  }, [allWorkouts]);

  // Apply equipment filter
  const filteredWorkouts = useMemo(() => {
    if (!selectedEquipment) return allWorkouts;
    
    return allWorkouts.filter(
      (w) => w.equipment && 
      w.equipment.toLowerCase().includes(selectedEquipment.toLowerCase())
    );
  }, [allWorkouts, selectedEquipment]);

  const getEquipmentIcon = (equipment) => {
    if (!equipment) return 'fitness';
    
    const eq = equipment.toLowerCase();
    if (eq.includes('barbell')) return 'dumbbell';
    if (eq.includes('dumbbell')) return 'dumbbell';
    if (eq.includes('machine') || eq.includes('leverage')) return 'cog';
    if (eq.includes('cable')) return 'link';
    if (eq.includes('body weight') || eq.includes('bodyweight')) return 'user';
    if (eq.includes('smith')) return 'weight-hanging';
    if (eq.includes('rack')) return 'th';
    if (eq.includes('cable')) return 'link';
    if (eq.includes('bar')) return 'minus';
    return 'dumbbell';
  };

  const toggleExpand = (exerciseId) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };

  const renderEquipmentFilter = () => (
    <View style={styles.filtersSection}>
      <Text style={styles.sectionTitle}>Filter by Equipment</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {/* All Equipment Filter */}
        <TouchableOpacity 
          style={[
            styles.filterChip,
            selectedEquipment === null && styles.filterChipActive
          ]}
          onPress={() => setSelectedEquipment(null)}
        >
          <Ionicons 
            name="apps" 
            size={16} 
            color={selectedEquipment === null ? '#fff' : darkColors.primary} 
          />
          <Text style={[
            styles.filterChipText,
            selectedEquipment === null && styles.filterChipTextActive
          ]}>
            All
          </Text>
        </TouchableOpacity>

        {/* Equipment Filters */}
        {equipmentList.map((equipment) => (
          <TouchableOpacity 
            key={equipment}
            style={[
              styles.filterChip,
              selectedEquipment === equipment && styles.filterChipActive
            ]}
            onPress={() => setSelectedEquipment(equipment)}
          >
            <FontAwesome5 
              name={getEquipmentIcon(equipment)} 
              size={14} 
              color={selectedEquipment === equipment ? '#fff' : darkColors.primary} 
            />
            <Text style={[
              styles.filterChipText,
              selectedEquipment === equipment && styles.filterChipTextActive
            ]}>
              {equipment}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderMuscleTags = (primary, secondary) => {
    const allMuscles = [primary, ...(secondary || [])].filter(Boolean);
    
    return (
      <View style={styles.musclesContainer}>
        {allMuscles.map((muscle, index) => (
          <View 
            key={muscle} 
            style={[
              styles.muscleChip,
              index === 0 ? styles.primaryMuscleChip : styles.secondaryMuscleChip
            ]}
          >
            <Text style={[
              styles.muscleText,
              index === 0 ? styles.primaryMuscleText : styles.secondaryMuscleText
            ]}>
              {muscle}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderWorkoutItem = ({ item, index }) => {
    const isExpanded = expandedExercise === item.id;
    
    return (
      <LinearGradient 
        colors={["#000000", "#1A1A1A"]} 
        style={[styles.workoutCard, isExpanded && styles.expandedCard]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Workout Header */}
        <TouchableOpacity 
          style={styles.workoutHeader}
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.8}
        >
          <View style={styles.headerLeft}>
            <View style={styles.workoutNumber}>
              <Text style={styles.workoutNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>{item.name}</Text>
              <View style={styles.equipmentBadge}>
                <FontAwesome5 
                  name={getEquipmentIcon(item.equipment)} 
                  size={12} 
                  color={darkColors.primary} 
                />
                <Text style={styles.equipmentText}>{item.equipment}</Text>
              </View>
            </View>
          </View>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={darkColors.textSecondary} 
          />
        </TouchableOpacity>

        {/* Exercise GIF (if available) */}
        {item.gifUrl && (
          <View style={styles.gifContainer}>
            <Image 
              source={{ uri: item.gifUrl }}
              style={styles.gifImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Workout Details */}
        <View style={styles.workoutDetails}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="repeat" size={14} color={darkColors.primary} />
              <Text style={styles.detailLabel}>Sets:</Text>
              <Text style={styles.detailValue}>
                {item.workoutDetails?.sets || 3}
              </Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailItem}>
              <FontAwesome5 name="redo-alt" size={12} color={darkColors.primary} />
              <Text style={styles.detailLabel}>Reps:</Text>
              <Text style={styles.detailValue}>
                {item.workoutDetails?.reps || "8-12"}
              </Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailItem}>
              <Ionicons name="time" size={14} color={darkColors.primary} />
              <Text style={styles.detailLabel}>Rest:</Text>
              <Text style={styles.detailValue}>
                {item.workoutDetails?.restSeconds || 60}s
              </Text>
            </View>
          </View>
          
          {item.workoutDetails?.notes && (
            <View style={styles.notesContainer}>
              <Ionicons name="information-circle" size={14} color={darkColors.warning} />
              <Text style={styles.notesText}>{item.workoutDetails.notes}</Text>
            </View>
          )}
        </View>

        {/* Muscle Information */}
        <View style={styles.muscleInfoSection}>
          <View style={styles.muscleRow}>
            <FontAwesome5 name="star" size={12} color={darkColors.primary} />
            <Text style={styles.muscleLabel}>Target: </Text>
            <Text style={styles.primaryMuscle}>{item.target}</Text>
          </View>
          {item.secondaryMuscles && item.secondaryMuscles.length > 0 && (
            <View style={styles.muscleRow}>
              <Ionicons name="fitness" size={12} color={darkColors.textSecondary} />
              <Text style={styles.muscleLabel}>Secondary: </Text>
              <Text style={styles.secondaryMuscles}>
                {item.secondaryMuscles.join(', ')}
              </Text>
            </View>
          )}
        </View>

        {/* Expanded Content */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            {/* Body Part */}
            <View style={styles.bodyPartContainer}>
              <Ionicons name="body" size={14} color={darkColors.textSecondary} />
              <Text style={styles.bodyPartText}>Body Part: {item.bodyPart}</Text>
            </View>

            {/* Instructions Preview */}
            {item.instructions && item.instructions.length > 0 && (
              <View style={styles.instructionsPreview}>
                <View style={styles.sectionHeader}>
                  <LinearGradient 
                    colors={[darkColors.primary, darkColors.primaryLight]} 
                    style={styles.sectionIcon}
                  >
                    <Ionicons name="list" size={14} color="#fff" />
                  </LinearGradient>
                  <Text style={styles.sectionTitle}>Key Steps</Text>
                </View>
                
                {item.instructions.slice(0, 2).map((instruction, idx) => (
                  <View key={idx} style={styles.instructionItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.instructionText}>
                      {instruction.replace(/^Step:\d+\s*/, '')}
                    </Text>
                  </View>
                ))}
                
                {item.instructions.length > 2 && (
                  <Text style={styles.moreStepsText}>
                    +{item.instructions.length - 2} more steps
                  </Text>
                )}
              </View>
            )}

            {/* Total Reps Calculation */}
            <View style={styles.totalRepsContainer}>
              <View style={styles.totalRepsRow}>
                <FontAwesome5 name="calculator" size={14} color={darkColors.primary} />
                <Text style={styles.totalRepsLabel}>Total Reps: </Text>
                <Text style={styles.totalRepsValue}>
                  {(item.workoutDetails?.sets || 3) * 
                   (parseInt((item.workoutDetails?.reps || "10").split('-')[0]) || 10)}
                </Text>
              </View>
              <Text style={styles.totalRepsDescription}>
                ({item.workoutDetails?.sets || 3} sets × {item.workoutDetails?.reps || "10"} reps)
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>
    );
  };

  // Get user's available equipment from profile
  const userEquipment = workoutPlan?.userProfile?.equipment || "";
  const availableEquipmentList = userEquipment.split(',').map(eq => eq.trim()).filter(eq => eq);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Equipment Workouts</Text>
        <Text style={styles.subtitle}>
          {selectedEquipment 
            ? `${filteredWorkouts.length} ${selectedEquipment} exercises` 
            : `${filteredWorkouts.length} exercises across ${equipmentList.length} equipment types`}
        </Text>
        
        {/* User's Available Equipment */}
        {availableEquipmentList.length > 0 && (
          <View style={styles.availableEquipmentSection}>
            <View style={styles.availableEquipmentHeader}>
              <Ionicons name="checkmark-circle" size={16} color={darkColors.success} />
              <Text style={styles.availableEquipmentTitle}>Your Available Equipment:</Text>
            </View>
            <View style={styles.availableEquipmentTags}>
              {availableEquipmentList.map((equipment, idx) => (
                <View key={idx} style={styles.availableEquipmentTag}>
                  <FontAwesome5 
                    name={getEquipmentIcon(equipment)} 
                    size={12} 
                    color={darkColors.success} 
                  />
                  <Text style={styles.availableEquipmentText}>{equipment}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Equipment Filters */}
      {renderEquipmentFilter()}

      {/* Workouts List */}
      {filteredWorkouts.length > 0 ? (
        <FlatList
          data={filteredWorkouts}
          keyExtractor={(item, index) => item.id || `${item.name}-${index}`}
          renderItem={renderWorkoutItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <LinearGradient colors={["#000000", "#1A1A1A"]} style={styles.emptyCard}>
          <FontAwesome5 name="dumbbell" size={60} color={darkColors.textSecondary} />
          <Text style={styles.emptyTitle}>
            {selectedEquipment 
              ? `No ${selectedEquipment} Exercises` 
              : 'No Exercises Found'}
          </Text>
          <Text style={styles.emptyText}>
            {selectedEquipment 
              ? `No exercises found for "${selectedEquipment}". Try selecting different equipment or check your workout plan.`
              : 'Your workout plan doesn\'t contain any exercises with specified equipment.'}
          </Text>
          
          {/* Equipment Suggestions */}
          {availableEquipmentList.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Try these equipment types:</Text>
              <View style={styles.suggestionsTags}>
                {availableEquipmentList.slice(0, 5).map((equipment, idx) => (
                  <TouchableOpacity 
                    key={idx}
                    style={styles.suggestionTag}
                    onPress={() => setSelectedEquipment(equipment)}
                  >
                    <FontAwesome5 
                      name={getEquipmentIcon(equipment)} 
                      size={12} 
                      color={darkColors.primary} 
                    />
                    <Text style={styles.suggestionText}>{equipment}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          {selectedEquipment && (
            <TouchableOpacity 
              style={styles.clearFilterButton}
              onPress={() => setSelectedEquipment(null)}
            >
              <Text style={styles.clearFilterText}>Show All Exercises</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      )}
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
    marginBottom: 12,
  },
  availableEquipmentSection: {
    marginTop: 12,
  },
  availableEquipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  availableEquipmentTitle: {
    color: darkColors.success,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 6,
  },
  availableEquipmentTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  availableEquipmentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  availableEquipmentText: {
    color: darkColors.success,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 6,
  },
  filtersSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: darkColors.textPrimary,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 12,
  },
  filtersContainer: {
    paddingRight: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: darkColors.border,
  },
  filterChipActive: {
    backgroundColor: darkColors.primary,
    borderColor: darkColors.primary,
  },
  filterChipText: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 6,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 80,
    paddingHorizontal:10
  },
  separator: {
    height: 16,
  },
  workoutCard: {
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
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  workoutNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: darkColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workoutNumberText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    color: darkColors.textPrimary,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 8,
  },
  equipmentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 78, 58, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  equipmentText: {
    color: darkColors.primary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 6,
  },
  gifContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  gifImage: {
    width: '100%',
    height: '100%',
  },
  workoutDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft:10
  },
  detailDivider: {
    width: 1,
    backgroundColor: darkColors.border,
  },
  detailLabel: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 4,
    marginRight: 2,
  },
  detailValue: {
    color: darkColors.textPrimary,
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: darkColors.warning,
  },
  notesText: {
    color: darkColors.warning,
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 8,
    flex: 1,
    lineHeight: 14,
    fontStyle: 'italic',
  },
  muscleInfoSection: {
    marginBottom: 12,
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
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: darkColors.border,
  },
  bodyPartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  bodyPartText: {
    color: darkColors.textPrimary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 8,
  },
  instructionsPreview: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: darkColors.primary,
    marginTop: 8,
    marginRight: 12,
  },
  instructionText: {
    color: darkColors.textPrimary,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 16,
    flex: 1,
  },
  moreStepsText: {
    color: darkColors.textSecondary,
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 16,
    fontStyle: 'italic',
  },
  totalRepsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 8,
  },
  totalRepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  totalRepsLabel: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 6,
  },
  totalRepsValue: {
    color: darkColors.primary,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 2,
  },
  totalRepsDescription: {
    color: darkColors.textSecondary,
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 22,
  },
  musclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  muscleChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  primaryMuscleChip: {
    backgroundColor: 'rgba(243, 78, 58, 0.2)',
    borderWidth: 1,
    borderColor: darkColors.primary,
  },
  secondaryMuscleChip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  primaryMuscleText: {
    color: darkColors.primary,
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
  },
  secondaryMuscleText: {
    color: darkColors.textPrimary,
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
  },
  emptyCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyTitle: {
    color: darkColors.textPrimary,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  suggestionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  suggestionsTitle: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 8,
  },
  suggestionsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  suggestionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 78, 58, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  suggestionText: {
    color: darkColors.primary,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 6,
  },
  clearFilterButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: darkColors.primary,
    borderRadius: 12,
  },
  clearFilterText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
});

export default EquipmentWorkoutsScreen;