import React from "react";
import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import OrderTypeScreen from '../screens/OrderTypeScreen';
import LocationScreen from '../screens/LocationScreen';
import MenuScreen from '../screens/MenuScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => (
    <Stack.Navigator
        initialRouteName="Home"
    >
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Order Type" component={OrderTypeScreen}/>
        <Stack.Screen name="Choose Location" component={LocationScreen}/>
        <Stack.Screen name="Menu" component={MenuScreen}/>
        <Stack.Screen name="Category" component={CategoryScreen} options={
            ({navigation, route}) => ({
                title: route.params.category
            }
            )}/>
    </Stack.Navigator>
);

export default HomeNavigator;