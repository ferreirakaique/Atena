import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/pages/LoginScreen";
import HomeScreen from "./src/pages/HomeScreen";
import AddTurmaScreen from "./src/pages/AddTurmaScreen";
import AtividadesScreen from "./src/pages/AtividadesScreen";
import AddAtividadeScreen from "./src/pages/AddAtividadeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTurma" component={AddTurmaScreen} />
        <Stack.Screen name="Atividades" component={AtividadesScreen} />
        <Stack.Screen name="AddAtividade" component={AddAtividadeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
