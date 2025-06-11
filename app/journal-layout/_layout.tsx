export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "Outfit Journal",
};

import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function TabLayout() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTitle: "Outfit Journal",
        headerRight: () => (
          <Pressable
            onPress={() => router.push("./add-outfit")}
            style={{ marginRight: 16 }}
            accessibilityLabel="Add Outfit">
            <Ionicons name="add" size={24} color={colors.text} />
          </Pressable>
        ),
      }}>
      <Stack.Screen
        name="add-outfit"
        options={{
          headerTitle: "Add Outfit",
          headerRight: () => undefined, // Hide the add button on this screen
        }}
      />
    </Stack>
  );
}
