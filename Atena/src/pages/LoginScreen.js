import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from "react-native";
import { supabase } from "../services/supabaseClient";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            Alert.alert("Erro", "Credenciais inválidas!");
            return;
        }

        navigation.replace("Home");
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput
                placeholder="Senha"
                secureTextEntry
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
            />
            <Button title="Entrar" color="#0077B6" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    input: { width: "80%", borderWidth: 1, borderRadius: 8, padding: 10, marginVertical: 5 },
    logo: { width: 150, height: 150, marginBottom: 30 },
});
