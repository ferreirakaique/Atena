import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { supabase } from "../services/supabaseClient";

export default function AddTurmaScreen({ navigation }) {
    const [nome, setNome] = useState("");

    const cadastrar = async () => {
        const { data: userData } = await supabase.auth.getUser();
        const id_professor = userData.user.id;

        if (!nome) return Alert.alert("Erro", "Informe o nome da turma!");

        const { error } = await supabase.from("turmas").insert([{ nome, id_professor }]);
        if (!error) {
            Alert.alert("Sucesso", "Turma cadastrada!");
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome da turma"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />
            <Button title="Cadastrar" color="#0077B6" onPress={cadastrar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
});
