import React from "react";
import { View } from "react-native";

type HorizontalBarProps = {
  carbohydrates: number;
  proteins: number;
  fats: number;
};

const HorizontalBar = ({
  carbohydrates,
  proteins,
  fats,
}: HorizontalBarProps) => {
  const total = carbohydrates + proteins + fats || 1;
  const percentageCarbohydrates = carbohydrates / total;
  const percentageProteins = proteins / total;
  const percentageFats = fats / total;

  return (
    <View className="w-full h-1 rounded-full overflow-hidden bg-neutral-300 flex-row">
      <View
        className="bg-support-yellow h-full"
        style={{ flex: percentageCarbohydrates }}
      />
      <View
        className="bg-support-teal h-full"
        style={{ flex: percentageProteins }}
      />
      <View
        className="bg-support-orange h-full"
        style={{ flex: percentageFats }}
      />
    </View>
  );
};

export default HorizontalBar;
