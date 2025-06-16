// Home screen for the Outfit Journal app
// This screen displays a grid of outfits if they exist, or a welcome message if not.

import React from "react";
import { FlatList } from "react-native";
import { useOutfits } from "@/context/OutfitContext";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { useRouter } from "expo-router";
import { OutfitCard } from "@/components/OutfitCard";


export default function Home() {
  const { outfits, toggleFavorite, favorites } = useOutfits();
  const router = useRouter();

  return (
    <Box className="flex-1 p-4">
      {outfits.length === 0 ? (
        // Welcome screen when no outfits exist
        <Center className="flex-1">
          <Heading className="font-bold text-2xl w-3/5 text-center">
            Welcome to the Outfit Journal! Add an outfit to get started!
          </Heading>
          <Divider className="my-[30px] w-[80%]" />
        </Center>
      ) : (
        // Outfit grid when outfits exist
        <>
          <Heading className="text-xl mb-4">Your Outfits</Heading>
          <FlatList
            data={outfits}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => {
              const isFavorite = favorites.some((fav) => fav.id === item.id);
              return (
                <OutfitCard
                  item={item}
                  isFavorite={isFavorite}
                  onPress={() =>
                    router.push(`/journal-layout/outfit/${item.id}`)
                  }
                  onToggleFavorite={() => toggleFavorite(item)}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </>
      )}
    </Box>
  );
}
