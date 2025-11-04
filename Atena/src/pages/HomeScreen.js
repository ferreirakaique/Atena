import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { supabase } from "../services/supabaseClient";

export default function HomeScreen({ navigation }) {
    const [turmas, setTurmas] = useState([]);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUsuario(data.user);
        if (data.user) listarTurmas(data.user.id);
    };

    const listarTurmas = async (userId) => {
        const { data, error } = await supabase
            .from("turmas")
            .select("*")
            .eq("id_professor", userId);

        if (!error) setTurmas(data);
    };

    const excluirTurma = async (id) => {
        const { data: atividades } = await supabase
            .from("atividades")
            .select("*")
            .eq("id_turma", id);

        if (atividades.length > 0) {
            Alert.alert("Erro", "Você não pode excluir uma turma com atividades cadastradas.");
            return;
        }

        await supabase.from("turmas").delete().eq("id", id);
        listarTurmas(usuario.id);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigation.replace("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Bem-vindo, {usuario?.email}</Text>
            <Button title="Cadastrar Turma" onPress={() => navigation.navigate("AddTurma")} />

            <FlatList
                data={turmas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Button
                            title="Ver Atividades"
                            onPress={() =>
                                navigation.navigate("Atividades", { turmaId: item.id, nome: item.nome })
                            }
                        />
                        <Button title="Excluir" color="red" onPress={() => excluirTurma(item.id)} />
                    </View>
                )}
            />

            <Button title="Sair" color="gray" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    card: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 15, marginVertical: 5 },
    nome: { fontSize: 16, fontWeight: "bold" },
});
