import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { supabase } from "../services/supabaseClient";

export default function AtividadesScreen({ route, navigation }) {
    const { turmaId, nome } = route.params;
    const [atividades, setAtividades] = useState([]);

    useEffect(() => {
        listar();
    }, []);

    const listar = async () => {
        const { data } = await supabase.from("atividades").select("*").eq("id_turma", turmaId);
        setAtividades(data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Turma: {nome}</Text>
            <Button
                title="Cadastrar Atividade"
                onPress={() => navigation.navigate("AddAtividade", { turmaId })}
            />

            <FlatList
                data={atividades}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>{item.descricao}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    card: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 15, marginVertical: 5 },
});
