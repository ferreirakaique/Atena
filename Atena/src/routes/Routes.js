import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';

// === Importando suas telas ===
import HomeScreen from '../pages/HomeScreen';
import AtividadesScreen from '../pages/AtividadesScreen';
import AddTurmaScreen from '../pages/AddTurmaScreen';
import LoginScreen from '../pages/LoginScreen';
import CadastroScreen from '../pages/CadastroScreen';
import SplashScreen from '../pages/SplashScreen';

// === Navegadores ===
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// === Tabs (após login) ===
function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1e3a5f',
                    borderTopWidth: 0,
                    height: 100,
                    paddingBottom: 40,
                },
                tabBarActiveTintColor: '#C9A227',
                tabBarInactiveTintColor: '#B0B0B0',
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;
                    const scaleValue = new Animated.Value(1);

                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Atividades') iconName = 'document-text';
                    else if (route.name === 'Turmas') iconName = 'school';

                    // Animação suave ao focar
                    if (focused) {
                        Animated.spring(scaleValue, {
                            toValue: 1.3,
                            friction: 3,
                            useNativeDriver: true,
                        }).start();
                    } else {
                        Animated.spring(scaleValue, {
                            toValue: 1,
                            friction: 3,
                            useNativeDriver: true,
                        }).start();
                    }

                    return (
                        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                            <Ionicons name={iconName} size={26} color={color} />
                        </Animated.View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Turmas" component={AddTurmaScreen} />
        </Tab.Navigator>
    );
}

// === Rotas principais ===
export default function Routes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="AddTurma" component={AddTurmaScreen} />
            <Stack.Screen name="AtividadesScreen" component={AtividadesScreen} />
        </Stack.Navigator>
    );
}
