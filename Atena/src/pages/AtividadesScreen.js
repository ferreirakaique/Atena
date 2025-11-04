import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../services/supabaseClient";
import Header from "../components/Header";
import { AuthContext } from "../components/AuthContext";

export default function AtividadesScreen({ route, navigation }) {
    const { turmaId, nome } = route.params;
    const { usuario, logout } = useContext(AuthContext);

    const [atividades, setAtividades] = useState([]);
    const [descricao, setDescricao] = useState("");
    const [modalVisivel, setModalVisivel] = useState(false);
    const [carregando, setCarregando] = useState(true);

    const [editarAtividade, setEditarAtividade] = useState(null);
    const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
    const [descricaoEditar, setDescricaoEditar] = useState("");

    const buscarAtividades = async () => {
        if (!turmaId) return;
        setCarregando(true);
        try {
            const { data, error } = await supabase
                .from("atividades")
                .select("*")
                .eq("turma_id", turmaId)
                .order("data_criacao", { ascending: true }); // ordena da mais antiga para a mais recente

            if (error) {
                Alert.alert("Erro", "Não foi possível carregar as atividades.");
            } else {
                setAtividades(data || []);
            }
        } catch (e) {
            console.warn(e);
        } finally {
            setCarregando(false);
        }
    };

    const cadastrarAtividade = async () => {
        if (!descricao.trim()) return Alert.alert("Erro", "Informe a descrição!");

        try {
            const { error } = await supabase.from("atividades").insert([
                {
                    descricao: descricao,
                    turma_id: turmaId,
                    professor_id: usuario.id
                }
            ]);

            if (error) {
                Alert.alert("Erro", "Não foi possível cadastrar a atividade.");
                console.warn(error);
            } else {
                setDescricao("");
                setModalVisivel(false);
                buscarAtividades();
            }
        } catch (e) {
            console.warn(e);
            Alert.alert("Erro", "Algo deu errado ao cadastrar a atividade.");
        }
    };

    const abrirEditarAtividade = (atividade) => {
        setEditarAtividade(atividade);
        setDescricaoEditar(atividade.descricao);
        setModalEditarVisivel(true);
    };
    const salvarEdicao = async () => {
        if (!descricaoEditar.trim()) return Alert.alert("Erro", "Informe a descrição!");

        try {
            const { error } = await supabase
                .from("atividades")
                .update({ descricao: descricaoEditar })
                .eq("id", editarAtividade.id);

            if (error) {
                Alert.alert("Erro", "Não foi possível atualizar a atividade.");
                console.warn(error);
            } else {
                setModalEditarVisivel(false);
                setEditarAtividade(null);
                buscarAtividades();
            }
        } catch (e) {
            console.warn(e);
            Alert.alert("Erro", "Algo deu errado ao editar a atividade.");
        }
    };

    const excluirAtividade = async (id) => {
        Alert.alert("Confirmação", "Deseja realmente excluir esta atividade?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                onPress: async () => {
                    await supabase.from("atividades").delete().eq("id", id);
                    buscarAtividades();
                },
            },
        ]);
    };

    const handleLogout = async () => {
        await logout();
        navigation.replace("Login");
    };

    useEffect(() => {
        buscarAtividades();
    }, [turmaId]);

    const renderItem = ({ item, index }) => (
        <View style={styles.card}>
            <Text style={styles.cardNumero}>Atividade #{index + 1}</Text>
            <Text style={styles.cardDescricao}>{item.descricao}</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => abrirEditarAtividade(item)}
                >
                    <Text style={styles.botaoTxt}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => excluirAtividade(item.id)}
                >
                    <Text style={styles.botaoTxt}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header usuario={usuario} onLogout={handleLogout} />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={26} color="#fff" />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.container}>
                    <View style={styles.turmaBox}>
                        <Text style={styles.turmaTitulo}>Turma: {nome}</Text>
                    </View>

                    <Text style={styles.titulo}>Atividades</Text>

                    {carregando ? (
                        <ActivityIndicator
                            size="large"
                            color="#D4AF37"
                            style={{ marginTop: 30 }}
                        />
                    ) : (
                        <FlatList
                            data={atividades}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            refreshing={carregando}
                            onRefresh={buscarAtividades}
                            ListEmptyComponent={
                                <Text style={styles.vazio}>
                                    Nenhuma atividade cadastrada ainda.
                                </Text>
                            }
                            contentContainerStyle={{ paddingBottom: 100 }}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => setModalVisivel(true)}
                    >
                        <Ionicons name="add-circle-outline" size={22} color="#fff" />
                        <Text style={styles.addBtnTxt}> Cadastrar Atividade</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisivel}
                        onRequestClose={() => setModalVisivel(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitulo}>Cadastrar nova atividade</Text>
                                <TextInput
                                    placeholder="Descrição da atividade"
                                    style={styles.input}
                                    value={descricao}
                                    onChangeText={setDescricao}
                                />
                                <TouchableOpacity
                                    style={styles.btnCadastrar}
                                    onPress={cadastrarAtividade}
                                >
                                    <Text style={styles.btnTxt}>Cadastrar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnCancelar}
                                    onPress={() => setModalVisivel(false)}
                                >
                                    <Text style={styles.btnTxt}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* MODAL DE EDICAO */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalEditarVisivel}
                        onRequestClose={() => setModalEditarVisivel(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitulo}>Editar atividade</Text>
                                <TextInput
                                    placeholder="Descrição da atividade"
                                    style={styles.input}
                                    value={descricaoEditar}
                                    onChangeText={setDescricaoEditar}
                                />
                                <TouchableOpacity
                                    style={styles.btnCadastrar}
                                    onPress={salvarEdicao}
                                >
                                    <Text style={styles.btnTxt}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnCancelar}
                                    onPress={() => setModalEditarVisivel(false)}
                                >
                                    <Text style={styles.btnTxt}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F6F8FB" },
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
    turmaBox: { backgroundColor: "#2E4A76", padding: 12, borderRadius: 10, marginBottom: 15 },
    turmaTitulo: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
    titulo: { fontSize: 22, fontWeight: "bold", color: "#1E3A5F", marginBottom: 15, textAlign: "center" },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 6,
        borderLeftColor: "#C9A227",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    cardNumero: { fontSize: 16, fontWeight: "bold", color: "#1E3A5F", marginBottom: 6 },
    cardDescricao: { fontSize: 15, color: "#333", marginBottom: 10 },
    botaoExcluir: {
        backgroundColor: "#B00020",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    botaoTxt: { color: "#fff", fontWeight: "bold" },
    vazio: { textAlign: "center", color: "#888", marginTop: 20, fontSize: 16 },
    addBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C9A227",
        paddingVertical: 14,
        borderRadius: 10,
        position: "absolute",
        bottom: 64,
        left: 20,
        right: 20,
        elevation: 3,
    },
    addBtnTxt: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 15, padding: 20, elevation: 6 },
    modalTitulo: { fontSize: 18, fontWeight: "bold", color: "#1E3A5F", textAlign: "center", marginBottom: 15 },
    botaoEditar: {
        backgroundColor: "#2E4A76",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 15 },
    btnCadastrar: { backgroundColor: "#2E4A76", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
    btnCancelar: { backgroundColor: "#999", padding: 12, borderRadius: 8, alignItems: "center" },
    btnTxt: { color: "#fff", fontWeight: "bold" },
});
