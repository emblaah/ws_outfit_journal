import React from "react";
import { ScrollView, Alert, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOutfits } from "../../../context/OutfitContext";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function OutfitDetails() {
  const { id } = useLocalSearchParams();
  const { outfits, toggleFavorite, deleteOutfit, favorites } = useOutfits();
  const router = useRouter();

  // Find the outfit with the matching ID
  const outfit = outfits.find((outfit) => outfit.id === id);
  const isFavorite = favorites.some((fav) => fav.id === outfit?.id);

  // Handle if outfit is not found
  if (!outfit) {
    return (
      <Box>
        <Heading>Outfit not found</Heading>
        <Button onPress={() => router.back()} variant="outline">
          <ButtonText>Go Back</ButtonText>
        </Button>
      </Box>
    );
  }

  // Format the date
  const dateAdded = new Date(outfit.dateAdded).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
    <ScrollView>
      <Box>
        <Image
          source={{ uri: outfit.image }}
          alt={outfit.name}
          resizeMode="cover"
        />
        <Box>
          <Pressable
            onPress={() => toggleFavorite(outfit)}
            style={{ backgroundColor: "transparent" }}>
            {isFavorite ? (
              <Entypo name="heart" size={32} color="red" />
            ) : (
              <Entypo name="heart-outlined" size={32} color="gray" />
            )}
          </Pressable>
        </Box>
      </Box>

      <Box>
        <VStack space="lg">
          <Heading size="xl">{outfit.name}</Heading>
          {outfit.description ? (
            <VStack space="xs">
              <Heading size="sm">Description</Heading>
              <Text>{outfit.description}</Text>
            </VStack>
          ) : null}

          <HStack>
            <Button
              onPress={() =>
                router.push(`/journal-layout/outfit/edit/${outfit.id}`)
              }
              variant="outline">
              <ButtonText>Edit</ButtonText>
            </Button>
            <Button onPress={handleDelete}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </HStack>

          <HStack space="sm">
            <Ionicons name="calendar-outline" size={18} />
            <Text>Added on {dateAdded}</Text>
          </HStack>
        </VStack>
      </Box>
    </ScrollView>
  );
}

const Divider = () => <Box />;
