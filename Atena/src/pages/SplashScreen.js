import React, { useEffect } from "react";
import { View, Image, StyleSheet, Animated, Easing } from "react-native";

export default function SplashScreen({ navigation }) {
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.8);

    useEffect(() => {
        // Animação de fade + zoom
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
        ]).start();

        // Vai pro login depois de 3 segundos
        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../assets/logo.png")}
                style={[
                    styles.logo,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 3000,
    },
});
