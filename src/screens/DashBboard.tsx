import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../lib/supabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Colaborador = {
  id: string;
  nome: string;
  matricula: string;
  cargo: string;
  escala: string;
  email: string;
  telefone: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export default function Dashboard({ navigation }: Props) {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Colaborador | null>(null);

  async function carregar() {
    setLoading(true);

    const { data, error } = await supabase
      .from("colaboradores")
      .select("*")
      .order("nome");

    if (!error && data) setColaboradores(data);
    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={colaboradores}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelected(item)}
            >
              <Text style={styles.cardName}>{item.nome}</Text>
              <Text style={styles.cardInfo}>Matrícula: {item.matricula}</Text>
              <Text style={styles.cardInfo}>{item.cargo}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddColaborador")}
      >
        <Text style={styles.addButtonText}>+ Adicionar</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selected?.nome}</Text>

            <Text style={styles.modalText}>
              Matrícula: {selected?.matricula}
            </Text>
            <Text style={styles.modalText}>Cargo: {selected?.cargo}</Text>
            <Text style={styles.modalText}>Escala: {selected?.escala}</Text>
            <Text style={styles.modalText}>Email: {selected?.email}</Text>
            <Text style={styles.modalText}>Telefone: {selected?.telefone}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setSelected(null)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardName: {
    fontSize: 20,
    fontWeight: "600",
  },
  cardInfo: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 14,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#007aff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
