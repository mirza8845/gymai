
import Home from '../MainScreens/Home';
import Workout from '../MainScreens/Workout';
import JimAI from '../MainScreens/JimAI';
import Health from '../MainScreens/Health';
import Profile from '../MainScreens/Profile';

import HomeIcon from '../../assets/svg/home.svg';
import HomeIconFill from '../../assets/svg/homefill.svg';
import WorkoutIcon from '../../assets/svg/workout.svg';
import WorkoutIconFill from '../../assets/svg/workoutfill.svg';
import JimAIIcon from '../../assets/svg/jimAI.svg';
import JimAIIconFill from '../../assets/svg/jimAIfill.svg';
import HealthIcon from '../../assets/svg/health.svg';
import HealthIconFill from '../../assets/svg/healthfill.svg';
import ProfileIcon from '../../assets/svg/profile.svg';
import ProfileIconFill from '../../assets/svg/profilefill.svg';

const tabRoutes = [
  {
    name: 'Home',
    component: Home,
    icon: {
      active: HomeIconFill,
      inactive: HomeIcon,
    },
  },
  {
    name: 'Workout',
    component: Workout,
    icon: {
      active: WorkoutIconFill,
      inactive: WorkoutIcon,
    },
  },
  {
    name: 'JimAI',
    component: JimAI,
    icon: {
      active: JimAIIconFill,
      inactive: JimAIIcon,
    },
  },
  {
    name: 'Health',
    component: Health,
    icon: {
      active: HealthIconFill,
      inactive: HealthIcon,
    },
  },
  {
    name: 'Profile',
    component: Profile,
    icon: {
      active: ProfileIconFill,
      inactive: ProfileIcon,
    },
  }
];

export default tabRoutes;
