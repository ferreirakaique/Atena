import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import { supabase } from "../services/supabaseClient";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../components/AuthContext";

export default function HomeScreen({ navigation }) {
    const { usuario, logout } = useContext(AuthContext);
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lista turmas do professor
    const listarTurmas = async () => {
        if (!usuario) return;

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("turmas")
                .select("*")
                .eq("professor_id", usuario.id);

            if (!error) setTurmas(data || []);
        } catch (e) {
            console.warn("Erro ao listar turmas:", e);
        } finally {
            setLoading(false);
        }
    };

    // Excluir turma
    const excluirTurma = async (id) => {
        try {
            const { data: atividades } = await supabase
                .from("atividades")
                .select("*")
                .eq("id_turma", id);

            if (atividades.length > 0) {
                Alert.alert(
                    "Erro",
                    "Você não pode excluir uma turma com atividades cadastradas."
                );
                return;
            }

            await supabase.from("turmas").delete().eq("id", id);
            listarTurmas(); // atualiza lista
        } catch (e) {
            console.warn("Erro ao excluir turma:", e);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigation.replace("Login");
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            listarTurmas();
        });
        return unsubscribe;
    }, [navigation, usuario]);


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#D4AF37" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header usuario={usuario} onLogout={handleLogout} />

            <View style={styles.container}>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.titulo}>Bem-vindo, </Text>
                    <Text style={[styles.titulo, { color: "#D4AF37", fontWeight: '800' }]}>{usuario?.nome || usuario?.email || "Usuário"}</Text>
                </View>


                <TouchableOpacity
                    style={styles.botaoCadastrar}
                    onPress={() =>
                        navigation.navigate("AddTurma", {
                        })
                    }
                >
                    <Text style={styles.botaoCadastrarTexto}>＋ Cadastrar Turma</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 20, color: "#1E3A5F", fontWeight: "bold" }}>
                    Suas Turmas:
                </Text>
                <FlatList
                    data={turmas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.nome}>{item.nome}</Text>

                            <View style={styles.botoesCard}>
                                <TouchableOpacity
                                    style={[styles.botao, { backgroundColor: "#D4AF37" }]}
                                    onPress={() =>
                                        navigation.navigate("AtividadesScreen", {
                                            turmaId: item.id,
                                            nome: item.nome,
                                        })
                                    }
                                >
                                    <Text style={styles.textoBotao}>Visualizar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.botao, { backgroundColor: "#B00020" }]}
                                    onPress={() =>
                                        Alert.alert(
                                            "Confirmação",
                                            "Deseja realmente excluir esta turma?",
                                            [
                                                { text: "Cancelar", style: "cancel" },
                                                { text: "Excluir", onPress: () => excluirTurma(item.id) },
                                            ]
                                        )
                                    }
                                >
                                    <Text style={styles.textoBotao}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.vazio}>Nenhuma turma cadastrada.</Text>
                    }
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E3A5F",
    },
    container: { flex: 1, padding: 20 },
    titulo: { fontSize: 22, color: "#1E3A5F", fontWeight: "bold", marginBottom: 15 },
    botaoCadastrar: {
        backgroundColor: "#C9A227",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
    },
    botaoCadastrarTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    card: { backgroundColor: "#2E4A76", borderRadius: 10, padding: 15, marginVertical: 8 },
    nome: { fontSize: 18, color: "#fff", fontWeight: "bold", marginBottom: 10 },
    botoesCard: { flexDirection: "row", justifyContent: "space-between" },
    botao: { flex: 1, padding: 10, borderRadius: 8, marginHorizontal: 5, alignItems: "center" },
    textoBotao: { color: "#fff", fontWeight: "bold" },
    vazio: { color: "#1E3A5F", textAlign: "center", marginTop: 40, fontSize: 16 },
});
