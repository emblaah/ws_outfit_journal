export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "Outfit Journal",
};

import { Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function JournalLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitle: "Outfit Journal",
      }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true, // Show the header but without the + button
        }}
      />
      <Stack.Screen
        name="outfit/[id]"
        options={{
          headerTitle: "Outfit Details",
        }}
      />
    </Stack>
  );
}
