
import Home from '../MainScreens/Home';
import Workout from '../MainScreens/Workout';
import Health from '../MainScreens/Health';
import Profile from '../MainScreens/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const tabRoutes = [
  {
    name: 'Home',
    component: Home,
    icon: {
      active: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size} />
      ),
      inactive: ({ color, size }) => (
        <MaterialCommunityIcons name="home-outline" color={color} size={size} />
      ),
    },
  },
  {
    name: 'Statics',
    component: Workout,
    icon: {
      active: ({ color, size }) => (
        <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
      ),
      inactive: ({ color, size }) => (
        <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
      ),
    },
  },
  {
    name: 'Health',
    component: Health,
    icon: {
      active: ({ color, size }) => (
        <MaterialCommunityIcons name="heart" color={color} size={size} />
      ),
      inactive: ({ color, size }) => (
        <MaterialCommunityIcons name="heart-outline" color={color} size={size} />
      ),
    },
  },
  {
    name: 'Profile',
    component: Profile,
    icon: {
      active: ({ color, size }) => (
        <MaterialCommunityIcons name="account" color={color} size={size} />
      ),
      inactive: ({ color, size }) => (
        <MaterialCommunityIcons name="account-outline" color={color} size={size} />
      ),
    },
  },
];

export default tabRoutes;
