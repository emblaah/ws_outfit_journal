// import React, { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { useOutfits } from "../../../context/OutfitContext";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function CalendarTab() {
  const { outfits, toggleFavorite, favorites } = useOutfits();
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState<string>(today);

  // Filter outfits by selected date (compare only the date part)
  const outfitsForDate = selectedDate
    ? outfits.filter(
        (outfit) =>
          outfit.dateAdded && outfit.dateAdded.slice(0, 10) === selectedDate
      )
    : [];

  return (
    <Box className="flex-1 p-4">
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={
          selectedDate
            ? {
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: "blue",
                },
              }
            : {}
        }
      />

      <Divider className="my-4" />

      <Heading className="text-lg mb-2">
        {selectedDate
          ? `Outfits for ${selectedDate}`
          : "Select a date to see outfits"}
      </Heading>

      {selectedDate && outfitsForDate.length === 0 && (
        <Text className="text-center mb-4">No outfits for this date.</Text>
      )}

      <FlatList
        data={outfitsForDate}
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
