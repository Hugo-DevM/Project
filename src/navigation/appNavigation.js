import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';


import LoginScreen from '../screens/Login/LoginScreen';
import InformationScreen from '../screens/Login/InformationScreen';
import GymLocationScreen from '../screens/Accounts/Users/Map/GymLocationScreen';
import ProfileUserScreen from '../screens/Accounts/Users/Profile/ProfileUserScreen';
import HomeScreen from '../screens/Accounts/Admins/HomeScreen';
import GymEventsScreen from '../screens/Accounts/Users/Events/GymEvents';
import ShowEventsScreen from '../screens/Accounts/Users/Events/ShowEvents';
import UserScreen from '../screens/Accounts/Users/UserScreen';
import CreateAccountsScreen from '../screens/Accounts/Admins/CreateAccounts/CreateAccounts';
import TrainerScreen from '../screens/Accounts/Trainers/TrainerScreens/TrainerScreen';
import ProfileTrainerScreen from '../screens/Accounts/Trainers/Profile/ProfileTrainerScreen';
import EditProfileTrainerScreen from '../screens/Accounts/Trainers/Profile/EditProfileTrainerScreen';
import AddEventsScreen from '../screens/Accounts/Admins/Events/addEvents';
import EditEventScreen from '../screens/Accounts/Admins/Events/editEvents';
import SettingsScreen from '../screens/Accounts/Users/Settings/SettingsScreen'
import ListTrainersScreen from '../screens/Accounts/Users/Trainers/ListTrainersScreen'
import EditProfileScreen from '../screens/Accounts/Users/Profile/EditProfileScreen'
import ShowTrainerScreen from '../screens/Accounts/Users/Trainers/ShowTrainerScreen'
import MyTrainerScreen from '../screens/Accounts/Users/Trainers/MyTrainerScreen'
import ShowTrainerAdminScreen from '../screens/Accounts/Admins/Trainer/ShowTrainerAdminScreen'
import ListTrainersAdminScreen from '../screens/Accounts/Admins/Trainer/ListTrainersAdminScreen'
import ListUserScreen from '../screens/Accounts/Trainers/Users/ListUsersScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'today' : 'today-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#eab308',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
          marginTop: 5,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#1D2951',
          paddingBottom: 20,
          height: 90,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={UserScreen}
      />
      <Tab.Screen
        name="Map"
        options={{ headerShown: false }}
        component={GymLocationScreen}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.closeDrawer();
          },
        })}
      />
      <Tab.Screen
        name="Events"
        options={{ headerShown: false }}
        component={GymEventsScreen}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.closeDrawer();
          },
        })}
      />
    </Tab.Navigator>
  );
}

// Drawer User
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Punto Fitness" screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: '#1D2951' },
      headerTintColor: '#eab308',
      headerTitleStyle: { color: '#ffffff', fontSize: 22 },
      headerLeft: () => (
        <Icon
          name="menu"
          size={36}
          color="#eab308"
          style={{ marginLeft: 10 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    })}>
      <Drawer.Screen
        name="Punto Fitness"
        component={TabNavigator}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='home-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileUserScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='person-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='settings-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="Trainers"
        component={ListTrainersScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='barbell-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="My Trainer"
        component={MyTrainerScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='body-outline' size={size} color='#eab308' />)
        }}
      />
    </Drawer.Navigator>
  );
}
//Drawer Trainer
function DrawerTrainerNav() {
  return (
    <Drawer.Navigator initialRouteName="Punto Fitness Trainer" screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: '#1D2951' },
      headerTintColor: '#eab308',
      headerTitleStyle: { color: '#ffffff', fontSize: 22 },
      headerLeft: () => (
        <Icon
          name="menu"
          size={36}
          color="#eab308"
          style={{ marginLeft: 10 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    })}>
      <Drawer.Screen
        name="Punto Fitness Trainer"
        component={TrainerScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='home-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileTrainerScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='person-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='settings-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="Users"
        component={ListUserScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='body-outline' size={size} color='#eab308' />)
        }}
      />
    </Drawer.Navigator>
  );
}

// Drawer Admin
function DrawerAdmin() {
  return (
    <Drawer.Navigator initialRouteName="Punto Fitness Admin" screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: '#1D2951' },
      headerTintColor: '#eab308',
      headerTitleStyle: { color: '#ffffff', fontSize: 22 },
      headerLeft: () => (
        <Icon
          name="menu"
          size={36}
          color="#eab308"
          style={{ marginLeft: 10 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    })}>
      <Drawer.Screen
        name="Punto Fitness Admin"
        component={HomeScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='home-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='settings-outline' size={size} color='#eab308' />)
        }}
      />
      <Drawer.Screen
        name="Trainers"
        component={ListTrainersAdminScreen}
        options={{
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerItemStyle: { backgroundColor: '#1D2951', marginVertical: 10 },
          drawerIcon: ({ color, size }) => (<Icon name='barbell-outline' size={size} color='#eab308' />)
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="InfoScreen"
          options={{ headerShown: false }}
          component={InformationScreen}
        />
        <Stack.Screen
          name="MainDrawer"
          options={{ headerShown: false }}
          component={DrawerNavigator}
        />
        <Stack.Screen
          name="HomeAdmin"
          options={{ headerShown: false }}
          component={DrawerAdmin}
        />
        <Stack.Screen
          name="TrainerScreen"
          options={{ headerShown: false }}
          component={DrawerTrainerNav}
        />
        <Stack.Screen
          name="CreateAccounts"
          options={{ headerShown: false }}
          component={CreateAccountsScreen}
        />
        
        <Stack.Screen
          name="AddEvents"
          options={{ headerShown: false }}
          component={AddEventsScreen}
        />
        <Stack.Screen
          name="EditEvents"
          options={{ headerShown: false }}
          component={EditEventScreen}
        />
        <Stack.Screen
          name="ShowEvents"
          options={{ headerShown: false }}
          component={ShowEventsScreen}
        />
        <Stack.Screen
          name="EditProfile"
          options={{ headerShown: false }}
          component={EditProfileScreen}
        />
        <Stack.Screen
          name="EditProfileTrainer"
          options={{ headerShown: false }}
          component={EditProfileTrainerScreen}
        />
        <Stack.Screen
          name="ShowTrainers"
          options={{ headerShown: false }}
          component={ShowTrainerScreen}
        />
        <Stack.Screen
          name="ShowTrainersAdmin"
          options={{ headerShown: false }}
          component={ShowTrainerAdminScreen}
        />
        <Stack.Screen
          name="ListTrainersAdmin"
          options={{ headerShown: false }}
          component={ListTrainersAdminScreen}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
