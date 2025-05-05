
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homestack from './Homestack';
import Myplan from '../MainScreens/Myplan';
import PullPushDay from '../MainScreens/PullPushDay';
import WorkoutDetails from '../MainScreens/WorkoutDetails';
import AuthStack from './AuthStack';
import EditProfile from '../MainScreens/EditProfile';
import AddExercise from '../MainScreens/AddExercise';
import ExerciseForm from '../MainScreens/ExerciseForm';
import SaveRoutineDate from '../MainScreens/SaveRoutineDate';


const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      {/* <Stack.Screen name="Tabs" component={Homestack} /> 
       <Stack.Screen name="MyPlan" component={Myplan} />
      <Stack.Screen name="PullPushDay" component={PullPushDay} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} /> 
       <Stack.Screen name="AddExercise" component={AddExercise} /> 
      <Stack.S<View>
      <Text style={{color:'black'}}>App</Text>
    </View>creen name="ExerciseForm" component={ExerciseForm} /> */}
      {/* <Stack.Screen name="SaveRoutineDate" component={SaveRoutineDate} /> */}

    </Stack.Navigator>
  );
};

export default MainNavigator;
