import { Link, Stack } from "expo-router";

import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Center className="flex-1">
        <Text className="text-secondary-200">This screen doesn't exist.</Text>

        <Button
          onPress={() => router.push("/journal-layout")}
          className="text-primary-500">
          <ButtonText>Go to home screen!</ButtonText>
        </Button>
      </Center>
    </>
  );
}
