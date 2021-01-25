import React from "react";
import {StatusBar} from "expo-status-bar";
import {DayViewScreen} from "./js/components/day/DayViewScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {
    render = () => (
        <NavigationContainer>
            <StatusBar style="light" backgroundColor="black"/>
            <Stack.Navigator initialRouteName="DayViewScreen">
                <Stack.Screen options={{headerShown: false}} name="DayViewScreen" component={DayViewScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
