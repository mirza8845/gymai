
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabRoutes from './TabRoutes';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/theme';

const Tab = createBottomTabNavigator();

const Homestack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: { backgroundColor: 'black' , paddingTop:RFPercentage(1), height:RFPercentage(8)},
        headerShown: false,
      }}
    >
      {tabRoutes.map(({ name, component, icon }, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={component}
          options={{
            tabBarButton: icon === null ? () => null : undefined, 
            tabBarIcon: icon
              ? ({ focused }) =>
                  focused ? (
                    <icon.active width={28} height={28} />
                  ) : (
                    <icon.inactive width={28} height={28} />
                  )
              : undefined,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Homestack;
