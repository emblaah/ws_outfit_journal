import React from "react";
import { Pressable } from "react-native";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import Entypo from "@expo/vector-icons/Entypo";

interface OutfitCardProps {
  item: any;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  item,
  isFavorite,
  onPress,
  onToggleFavorite,
}) => (
  <Pressable style={{ width: "48%", marginBottom: 16 }} onPress={onPress}>
    <Card className="w-full overflow-hidden h-full">
      <Box className="flex flex-row justify-between">
        <Image
          source={{ uri: item.image }}
          alt={item.name}
          height={180}
          resizeMode="cover"
        />
        <Pressable onPress={onToggleFavorite}>
          {isFavorite ? (
            <Entypo name="heart" size={24} color="red" />
          ) : (
            <Entypo name="heart-outlined" size={24} color="gray" />
          )}
        </Pressable>
      </Box>
      <Box>
        <VStack space="xs">
          <Text className="font-semibold text-base" numberOfLines={1}>
            {item.name}
          </Text>
          {item.description ? (
            <Text className="text-sm" numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </VStack>
      </Box>
      <Box>
        <Text className="text-xs">
          {new Date(item.dateAdded).toLocaleDateString()}
        </Text>
      </Box>
    </Card>
  </Pressable>
);
