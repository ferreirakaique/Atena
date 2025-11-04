import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../services/supabaseClient";
import { AuthContext } from "../components/AuthContext";
import Header from "../components/Header";

export default function CadastrarTurma({ navigation }) {
    const { usuario, logout } = useContext(AuthContext); // pega usuário logado do contexto
    
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleCadastro = async () => {
        if (!nome.trim()) {
            Alert.alert("Erro", "O nome da turma é obrigatório!");
            return;
        }

        if (!usuario) {
            Alert.alert("Erro", "Usuário não autenticado!");
            return;
        }

        try {
            setCarregando(true);
            const { error } = await supabase.from("turmas").insert([
                {
                    nome,
                    descricao,
                    professor_id: usuario.id, // garante que a turma pertence ao usuário logado
                },
            ]);

            if (error) throw error;

            Alert.alert("Sucesso", "Turma cadastrada com sucesso!");
            setNome("");
            setDescricao("");
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível cadastrar a turma.");
        } finally {
            setCarregando(false);
        }
    };
    
    const handleLogout = async () => {
        await logout();
        navigation.replace("Login");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Header usuario={usuario} onLogout={handleLogout} />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <Image source={require("../assets/logo.png")} style={styles.logo} />

                    <Text style={styles.title}>Cadastrar Turma</Text>

                    <TextInput
                        placeholder="Nome da turma"
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />

                    <TextInput
                        placeholder="Descrição (opcional)"
                        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
                        value={descricao}
                        onChangeText={setDescricao}
                    />

                    <TouchableOpacity
                        style={[styles.button, carregando && { opacity: 0.7 }]}
                        onPress={handleCadastro}
                        disabled={carregando}
                    >
                        <Text style={styles.buttonText}>
                            {carregando ? "Cadastrando..." : "Cadastrar"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#023E8A",
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        color: "#fff",
        fontSize: 19,
        fontWeight: "bold",
        marginLeft: 6,
    },
    scroll: {
        flexGrow: 1,
        backgroundColor: "#f9f9f9",
        paddingTop: 20,
    },
    container: {
        alignItems: "center",
        padding: 25,
    },
    logo: {
        width: 180,
        height: 180,
        borderRadius: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#023E8A",
        marginBottom: 22,
    },
    input: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        elevation: 2,
    },
    button: {
        backgroundColor: "#023E8A",
        paddingVertical: 14,
        borderRadius: 10,
        width: "90%",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
