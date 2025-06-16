import React from "react";
import { FlatList } from "react-native";
import { useOutfits } from "../../../context/OutfitContext";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { OutfitCard } from "@/components/OutfitCard";

export default function FavoritesTab() {
  const { favorites, toggleFavorite } = useOutfits();
  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <Center className="flex-1 flex items-center justify-center">
        <Heading className="font-bold text-2xl text-center">Favorites</Heading>
        <Divider className="my-[30px] w-[80%]" />
        <Text className="text-center">Add favorites to see here!</Text>
      </Center>
    );
  }

  return (
    <Box className="flex-1 p-4">
      <Heading className="text-xl mb-4">Your Favorites</Heading>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => {
          return (
            <OutfitCard
              item={item}
              isFavorite={true}
              onPress={() => router.push(`/journal-layout/outfit/${item.id}`)}
              onToggleFavorite={() => toggleFavorite(item)}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Box>
  );
}
