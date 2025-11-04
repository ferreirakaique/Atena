import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { supabase } from "../services/supabaseClient";

export default function AddAtividadeScreen({ route, navigation }) {
    const { turmaId } = route.params;
    const [descricao, setDescricao] = useState("");

    const cadastrar = async () => {
        if (!descricao) return Alert.alert("Erro", "Informe a descrição!");
        await supabase.from("atividades").insert([{ descricao, id_turma: turmaId }]);
        Alert.alert("Sucesso", "Atividade cadastrada!");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Descrição da atividade"
                style={styles.input}
                value={descricao}
                onChangeText={setDescricao}
            />
            <Button title="Cadastrar" color="#0077B6" onPress={cadastrar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
});
