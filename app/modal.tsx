import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect, useRouter } from "expo-router";

export default function ModalScreen() {
  const router = useRouter();
  return (
    <Box className=" flex flex-1 items-center justify-center">
      <Redirect href="/journal-layout" />
      <Box className="my-[30px] h-1 w-[80%]" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Button onPress={() => router.push("/journal-layout")}>
        <ButtonText>Go to Home!</ButtonText>
      </Button>
    </Box>
  );
}
