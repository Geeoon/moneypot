import { createRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, createNavigationStack } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import MainScreen from './components/MainScreen';
import NewPlayerScreen from './components/NewPlayerScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  const navRef = createRef();
  return (
    <NavigationContainer ref={navRef}>
      <View style={{flex: 1, backgroundColor: '#155843'}}>
        <Stack.Navigator
          initialRouteName='Main'
          screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#FFF',
        }}>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{title: 'Player Balances'}}
          />
          <Stack.Screen
            name="New Player"
            component={NewPlayerScreen}
            options={{title: 'Add a New Player'}}
          />
        </Stack.Navigator>
      </View>
      <StatusBar style="light"/>
    </NavigationContainer>
  );
}