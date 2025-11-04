import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";
import { supabase } from "../services/supabaseClient";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      setCarregando(true);

      // 1️⃣ Cria o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
      });

      if (authError) throw authError;

      const user = authData.user;
      if (!user) throw new Error("Erro ao criar usuário na autenticação.");

      // 2️⃣ Salva também na tabela 'usuarios'
      const { error: dbError } = await supabase.from("usuarios").insert([
        {
          id: user.id,
          nome,
          email: email.trim(),
          senha,
        },
      ]);

      if (dbError) throw dbError;

      // 3️⃣ Feedback ao usuário
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.replace("Login");

    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao cadastrar", error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        placeholder="Nome completo"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <Button
        title={carregando ? "Cadastrando..." : "Cadastrar"}
        color="#0077B6"
        onPress={handleCadastro}
        disabled={carregando}
      />

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  logo: { width: 150, height: 150, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: "#023E8A", marginBottom: 20 },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  link: { color: "#0077B6", marginTop: 15, textDecorationLine: "underline" },
});
