import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/screens/DashBboard";
import AddColaborador from "./src/screens/AddColaborador";

export type RootStackParamList = {
  Dashboard: undefined;
  AddColaborador: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: "Colaboradores" }}
        />

        <Stack.Screen
          name="AddColaborador"
          component={AddColaborador}
          options={{ title: "Adicionar Colaborador" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
