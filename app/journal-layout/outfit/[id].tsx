// import React from "react";
// import { ScrollView, Alert, Pressable } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useOutfits } from "../../../context/OutfitContext";
// import { Box } from "@/components/ui/box";
// import { VStack } from "@/components/ui/vstack";
// import { HStack } from "@/components/ui/hstack";
// import { Text } from "@/components/ui/text";
// import { Image } from "@/components/ui/image";
// import { Heading } from "@/components/ui/heading";
// import { Button, ButtonText } from "@/components/ui/button";
// import { Ionicons } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";

// export default function OutfitDetails() {
//   const { id } = useLocalSearchParams();
//   const { outfits, toggleFavorite, deleteOutfit, favorites, editOutfit } = useOutfits();
//   const router = useRouter();

//   // Find the outfit with the matching ID
//   const outfit = outfits.find((outfit) => outfit.id === id);
//   const isFavorite = favorites.some((fav) => fav.id === outfit?.id);

//   // Handle if outfit is not found
//   if (!outfit) {
//     return (
//       <Box>
//         <Heading>Outfit not found</Heading>
//         <Button onPress={() => router.back()} variant="outline">
//           <ButtonText>Go Back</ButtonText>
//         </Button>
//       </Box>
//     );
//   }

//   // Format the date
//   const dateAdded = new Date(outfit.dateAdded).toLocaleDateString(undefined, {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <ScrollView>
//       <Box>
//         <Image
//           source={{ uri: outfit.image }}
//           alt={outfit.name}
//           resizeMode="cover"
//         />
//         <Box>
//           <Pressable
//             onPress={() => toggleFavorite(outfit)}
//             style={{ backgroundColor: "transparent" }}>
//             {isFavorite ? (
//               <Entypo name="heart" size={32} color="red" />
//             ) : (
//               <Entypo name="heart-outlined" size={32} color="gray" />
//             )}
//           </Pressable>
//         </Box>
//       </Box>

//       <Box>
//         <VStack space="lg">
//           <Heading size="xl">{outfit.name}</Heading>
//           {outfit.description ? (
//             <VStack space="xs">
//               <Heading size="sm">Description</Heading>
//               <Text>{outfit.description}</Text>
//             </VStack>
//           ) : null}

//           <HStack>
//             <Button
//               onPress={() =>
//                 router.push(`/journal-layout/outfit/edit/${outfit.id}`)
//               }
//               variant="outline">
//               <ButtonText>Edit</ButtonText>
//             </Button>
//             <Button onPress={handleDelete}>
//               <ButtonText>Delete</ButtonText>
//             </Button>
//           </HStack>

//           <HStack space="sm">
//             <Ionicons name="calendar-outline" size={18} />
//             <Text>Added on {dateAdded}</Text>
//           </HStack>
//         </VStack>
//       </Box>
//     </ScrollView>
//   );
// }

// const Divider = () => <Box />;

import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOutfits } from "@/context/OutfitContext";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Heading } from "@/components/ui/heading";

export default function EditOutfit() {
  const { id } = useLocalSearchParams();
  const { outfits, editOutfit, deleteOutfit } = useOutfits();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Find the outfit with the matching ID
  const outfit = outfits.find((outfit) => outfit.id === id);

  // Initialize form with outfit data
  useEffect(() => {
    if (outfit) {
      setName(outfit.name);
      setDescription(outfit.description || "");
      setImage(outfit.image);
    }
  }, [outfit]);

  // Handle if outfit is not found
  if (!outfit) {
    return (
      <Box className="p-4">
        <Heading className="mb-4">Outfit not found</Heading>
        <Button onPress={() => router.back()} variant="outline">
          <ButtonText>Go Back</ButtonText>
        </Button>
      </Box>
    );
  }

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

    // Update the outfit in the context state
    const updatedOutfit = {
      ...outfit,
      name,
      description,
      image,
    };

    editOutfit(outfit.id, updatedOutfit);

    Alert.alert("Success", "Outfit updated successfully!", [
      {
        text: "OK",
        onPress: () => {
          // Navigate back to the outfit details screen
          router.back();
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Outfit",
      "Are you sure you want to delete this outfit? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteOutfit(outfit.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
      <ScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
        <Box className="space-y-6 pb-20">
          <Heading className="text-xl mb-4">Edit Outfit</Heading>

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
              <Box className="h-96 w-full items-center justify-center rounded-lg mb-4">
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

            <Input className="w-full">
              <InputField
                placeholder="Description (optional)"
                value={description}
                onChangeText={setDescription}
              />
            </Input>

            <Box className="flex-row w-full space-x-2">
              <Button
                className="flex-1"
                onPress={() => router.back()}
                variant="outline">
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                className="flex-1"
                onPress={handleSave}
                isDisabled={loading || !name || !image}>
                <ButtonText>
                  {loading ? "Saving..." : "Save Changes"}
                </ButtonText>
              </Button>
            </Box>
              <Button className="bg-red-500 w-full" onPress={handleDelete}>
                <ButtonText>Delete</ButtonText>
              </Button>
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
