import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import SearchResult from './SearchResult';
import GetAuth from './access/GetAuth';
import GetSeller from './GetSeller';
import SellerInfo from './SellerInfo';
import Loader from './Loader';
import ResetPassword from './access/ResetPassword';

// Setting up a stack navigator
const Stack = createStackNavigator();

// Main component of the application
const App = () => {
  return (
    // Navigation container wraps the entire app
    <NavigationContainer>
      {/* Stack navigator manages the navigation flow */}
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash screen displayed first */}
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />

        {/* Home screen is the main screen of the application */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />

        {/* Home screen is the main screen of the application */}
        <Stack.Screen name="GetAuth" component={GetAuth} options={{ headerShown: false }} />

        {/* Search Result Screen */}
        <Stack.Screen name="SearchResult" component={SearchResult} options={{ headerShown: false }} />

        {/* Seller Info displays a static seller user contact info */}
        <Stack.Screen name="SellerInfo" component={SellerInfo} options={{ headerShown: false }} />

        {/* OTP screen for entering one-time password */}
        <Stack.Screen name="GetSeller" component={GetSeller} options={{ headerShown: false }} />

        {/* Animated Screen to serve loading process */}
        <Stack.Screen name="Loader" component={Loader} options={{ headerShown: false }} />

        {/* Reset Password Screen. */}
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
