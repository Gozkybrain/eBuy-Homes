import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome icons
import DefaultHome from './DefaultHome';
import GetUser from './access/GetUser';
import CheapList from './CheapList';
import NewList from './NewList';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      shifting={false} // Set to false to disable shifting behavior and the indicator
      labeled={true} // Set to true for labeled tabs
      activeColor="#000" // Active tab text color (black)
      inactiveColor="#000" // Inactive tab text color
      barStyle={{ backgroundColor: '#fff' }} // Set black background for the tab bar
      tabBarOptions={{
        labelStyle: { fontSize: 14 }, // Customize label font size
      }}
    >
      {/* Home tab */}
      <Tab.Screen 
        name="Home" 
        component={DefaultHome} 
        options={{
          // Icon for Home tab
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="landmark" size={20} color={focused ? '#000' : color} />
          ),
          tabBarLabel: 'Home', // Label for Home tab
        }}
      />

      {/* New tab */}
      <Tab.Screen 
        name="New" 
        component={NewList}  
        options={{
          // Icon for New tab
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="cart-plus" size={20} color={focused ? '#000' : color} />
          ),
          tabBarLabel: 'New', // Label for New tab
        }}
      />

   {/* Cheap tab */}
<Tab.Screen 
  name="Cheap" 
  component={CheapList} 
  options={{
    // Icon for Cheap tab
    tabBarIcon: ({ focused, color }) => (
      <FontAwesome5 name="money-bill" size={20} color={focused ? '#000' : color} />
    ),
    tabBarLabel: 'Cheap', // Label for Cheap tab
  }}
/>


      {/* Help tab */}
      <Tab.Screen 
        name="Help" 
        component={GetUser} 
        options={{
          // Icon for Help tab
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="user-tie" size={20} color={focused ? '#000' : color} />
          ),
          tabBarLabel: 'Account', // Label for Help tab
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
