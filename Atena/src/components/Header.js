import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ usuario, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.infoContainer}>
        <Ionicons name="person-circle" size={46} color="#D4AF37" />
        <Text style={styles.usuarioTexto}>
          {usuario?.nome || "Usuário"}
        </Text>
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={26} color="#D4AF37" />
        <Text style={styles.textoSair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1E3A5F",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#2E4A76",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  usuarioTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  botaoSair: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E4A76",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoSair: {
    color: "#C9A227",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
