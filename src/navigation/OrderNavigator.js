import React from "react";
import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import OrderTypeScreen from '../screens/order/OrderTypeScreen';
import LocationScreen from '../screens/order/LocationScreen';
import MenuScreen from '../screens/order/MenuScreen';
import CategoryScreen from '../screens/order/CategoryScreen';
import BasketScreen from '../screens/order/BasketScreen';
import ItemScreen from '../screens/order/ItemScreen';
import CheckoutScreen from '../screens/order/CheckoutScreen';
import PaymentScreen from '../screens/order/PaymentScreen';

const Stack = createStackNavigator();

const OrderNavigator = () => (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerStyle: {
                backgroundColor: 'red',
            },
            headerTitleStyle: {
                color: 'white',
            },
            headerTintColor: '#fff',
        }}
    >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Order Type" component={OrderTypeScreen}/>
        <Stack.Screen name="Choose Location" component={LocationScreen}/>
        <Stack.Screen name="Menu" component={MenuScreen}/>
        <Stack.Screen name="Category" component={CategoryScreen} options={
            ({navigation, route}) => ({
                title: route.params.category
            })}/>
        <Stack.Screen name="Basket" component={BasketScreen}/>
        <Stack.Screen name="Item" component={ItemScreen} options={
            ({navigation, route}) => ({
                title: route.params.name
            })}/>
        <Stack.Screen name="Checkout" component={CheckoutScreen}/>
        <Stack.Screen name="Payment" component={PaymentScreen}/>
    </Stack.Navigator>
);

export default OrderNavigator;