import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import SearchResult from './SearchResult';
import GetAuth from './access/GetAuth';
import GetSeller from './GetSeller';
import SellerInfo from './SellerInfo';

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

        {/* NewPass screen for resetting new password */}
        {/* <Stack.Screen name="NewPass" component={NewPass} options={{ headerShown: false }} /> */}

        {/* EmailReg screen enables users register with email option */}
        {/* <Stack.Screen name="EmailReg" component={EmailReg} options={{ headerShown: false }} /> */}

        {/* AuthMain screen to complete user profile registration with email */}
        {/* <Stack.Screen name="AuthMain" component={AuthMain} options={{ headerShown: false }} /> */}

        {/* VerifyEmail screen to send email OTP verification during registration */}
        {/* <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{ headerShown: false }} /> */}

        {/* New Page Screen is the loader before Home Access */}
        {/* <Stack.Screen name="NewPage" component={NewPage} options={{ headerShown: false }} /> */}

        {/* Home screen after login access */}
        {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
