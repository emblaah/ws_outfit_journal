import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useOutfits } from "../../context/OutfitContext";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { useRouter } from "expo-router";

export default function AddOutfit() {
  const { addOutfit } = useOutfits();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera permission is required.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        quality: 0.7,
        allowsEditing: true,
        aspect: [4, 5],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Gallery permission is required.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 0.7,
        allowsEditing: true,
        aspect: [4, 5],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image");
    }
  };

  const handleSave = () => {
    if (!name || !image) {
      Alert.alert("Missing info", "Please add a name and photo.");
      return;
    }

    setLoading(true);

    // Add the outfit to the context state
    addOutfit({
      id: Date.now().toString(),
      name,
      description: description,
      image,
      favorite: false,
      dateAdded: new Date().toISOString(),
    });

    Alert.alert("Success", "Outfit added successfully!", [
      {
        text: "OK",
        onPress: () => {
          // Navigate back to the previous screen after successful addition
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Box className="space-y-6">
        <VStack space="md" className="items-center">
          {image ? (
            <Box className="mb-4 rounded-lg overflow-hidden">
              <Image
                source={{ uri: image }}
                alt="Outfit"
                style={styles.image}
                resizeMode="cover"
                className="w-96 h-96 rounded-lg"
              />
            </Box>
          ) : (
            <Box className="h-96 w-full bg-gray-200 items-center justify-center rounded-lg mb-4">
              <Text className="text-gray-500">No image selected</Text>
            </Box>
          )}

          <Box className="flex-row w-full space-x-2 mb-4">
            <Button className="flex-1" onPress={handleTakePhoto}>
              <ButtonText>Take Photo</ButtonText>
            </Button>
            <Button
              className="flex-1"
              onPress={handlePickImage}
              variant="outline">
              <ButtonText>Choose from Gallery</ButtonText>
            </Button>
          </Box>

          <Input className="w-full mb-4">
            <InputField
              placeholder="Outfit name"
              value={name}
              onChangeText={setName}
            />
          </Input>

          <Input className="w-full mb-6">
            <InputField
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
              numberOfLines={4}
              className="h-24"
            />
          </Input>

          <Button
            className="w-full"
            onPress={handleSave}
            isDisabled={loading || !name || !image}>
            <ButtonText>{loading ? "Saving..." : "Save Outfit"}</ButtonText>
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
