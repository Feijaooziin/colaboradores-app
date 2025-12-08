import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { supabase } from "../lib/supabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Picker } from "@react-native-picker/picker";

type Props = NativeStackScreenProps<RootStackParamList, "AddColaborador">;

const CARGOS = [
  "Auxiliar de Operações",
  "Conferente",
  "Operador de Empilhadeira",
  "Assistente Administrativo",
  "Líder de Operações",
  "Supervisor de Operações",
];
const ESCALAS = [
  "19:00 - 04:00 / SEG - SEX",
  "20:00 - 05:00 / DOM - QUI",
  "21:00 - 06:00 / DOM - QUI",
  "22:00 - 07:00 / DOM - QUI",
  "Supervisor",
];

export default function AddColaborador({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cargo, setCargo] = useState("");
  const [escala, setEscala] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  async function salvar() {
    // 🔹 Apenas os obrigatórios
    if (!nome || !matricula || !cargo || !escala) {
      return Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
    }

    setLoading(true);

    const { error } = await supabase.from("colaboradores").insert({
      nome,
      matricula,
      cargo,
      escala,
      email: email.trim() === "" ? null : email,
      telefone: telefone.trim() === "" ? null : telefone,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Erro", "Falha ao cadastrar.");
      return;
    }

    Alert.alert("Sucesso", "Colaborador cadastrado!");
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Matrícula *</Text>
      <TextInput
        style={styles.input}
        value={matricula}
        onChangeText={setMatricula}
      />

      {/* CARGO */}
      <Text style={styles.label}>Cargo *</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={cargo} onValueChange={setCargo}>
          <Picker.Item label="Selecione o cargo" value="" />
          {CARGOS.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      {/* ESCALA */}
      <Text style={styles.label}>Escala *</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={escala} onValueChange={setEscala}>
          <Picker.Item label="Selecione a escala" value="" />
          {ESCALAS.map((e) => (
            <Picker.Item key={e} label={e} value={e} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Email (opcional)</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Telefone (opcional)</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={salvar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Salvando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f6f7fb",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 14,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 6,
  },
  button: {
    backgroundColor: "#007aff",
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
