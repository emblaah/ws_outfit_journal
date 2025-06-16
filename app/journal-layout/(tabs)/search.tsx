import React, { useState, useEffect } from "react";
import { FlatList, Pressable, useColorScheme } from "react-native";
import { useOutfits } from "@/context/OutfitContext";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

export default function SearchScreen() {
  const { outfits, toggleFavorite, favorites } = useOutfits();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<typeof outfits>([]);
  const router = useRouter();
  const colorMode = useColorScheme();
  const isDark = colorMode === "dark";

  useEffect(() => {
    if (searchInput.length > 0) {
      setSearchResults(
        outfits.filter((outfit) => {
          const nameMatch = outfit.name
            .toLowerCase()
            .includes(searchInput.toLowerCase());
          const descriptionMatch = outfit.description
            ? outfit.description
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            : false;
          return nameMatch || descriptionMatch;
        })
      );
    } else {
      setSearchResults([]);
    }
  }, [searchInput, outfits]);

  return (
    <Box className="flex-1 p-4">
      <Input className="mb-4">
        <InputField
          placeholder="Search outfits by title or description..."
          value={searchInput}
          onChangeText={setSearchInput}
          autoFocus
          clearButtonMode="while-editing"
        />
      </Input>

      {searchInput.length > 0 && searchResults.length === 0 && (
        <Text className="text-center my-4">No outfits found</Text>
      )}

      {searchInput.length === 0 && (
        <Text className="text-center my-4">
          Enter a search term to find outfits
        </Text>
      )}

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isFavorite = favorites.some((fav) => fav.id === item.id);
          return (
            <Pressable
              onPress={() => router.push(`/journal-layout/outfit/${item.id}`)}
              style={{ marginBottom: 16 }}>
              <Card className="w-full overflow-hidden">
                <Box className="flex flex-row items-center">
                  <Image
                    source={{ uri: item.image }}
                    alt={item.name}
                    height={80}
                    width={80}
                    resizeMode="cover"
                    className="rounded-lg mr-4"
                  />
                  <VStack>
                    <Text className="font-semibold text-base">{item.name}</Text>
                    {item.description ? (
                      <Text className="text-sm" numberOfLines={2}>
                        {item.description}
                      </Text>
                    ) : null}
                    <Text className="text-xs text-gray-500">
                      {new Date(item.dateAdded).toLocaleDateString()}
                    </Text>
                  </VStack>
                  <Pressable
                    onPress={() => toggleFavorite(item)}
                    className="ml-auto">
                    {isFavorite ? (
                      <Entypo name="heart" size={24} color="red" />
                    ) : (
                      <Entypo name="heart-outlined" size={24} color="gray" />
                    )}
                  </Pressable>
                </Box>
              </Card>
            </Pressable>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={null}
      />
    </Box>
  );
}
