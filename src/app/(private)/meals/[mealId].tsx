import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Logo } from "../../../components/Logo";
import { httpClient } from "../../../services/httpClient";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors } from "../../../styles/colors";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import HorizontalBar from "../../../components/HorizontalBar";
import { StatusBar } from "expo-status-bar";

type MealWithTotals = Meal & {
  totalCalories: number;
  totalProteins: number;
  totalCarbohydrates: number;
  totalFats: number;
};

type Meal = {
  id: string;
  createdAt: string;
  icon: string;
  name: string;
  status: "uploading" | "processing" | "success" | "failed";
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
};

export default function MealDetails() {
  const { mealId } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();

  const { data: meal, isFetching } = useQuery<MealWithTotals>({
    queryKey: ["meal", mealId],
    staleTime: Infinity,
    queryFn: async () => {
      const { data } = await httpClient.get<{ meal: Meal }>(`/meals/${mealId}`);

      let currentTotalCalories: number = 0;
      let currentTotalProteins: number = 0;
      let currentTotalCarbohydrates: number = 0;
      let currentTotalFats: number = 0;

      for (let i = 0; i < data.meal.foods.length; i++) {
        currentTotalCalories += data.meal.foods[i].calories;
        currentTotalProteins += data.meal.foods[i].proteins;
        currentTotalCarbohydrates += data.meal.foods[i].carbohydrates;
        currentTotalFats += data.meal.foods[i].fats;
      }

      return {
        ...data.meal,
        totalCalories: currentTotalCalories,
        totalProteins: currentTotalProteins,
        totalCarbohydrates: currentTotalCarbohydrates,
        totalFats: currentTotalFats,
      };
    },
    refetchInterval: (query) => {
      if (query.state.data?.status === "success") {
        return false;
      }
      return 2_000;
    },
  });

  if (isFetching || meal?.status !== "success") {
    return (
      <View className="bg-lime-700 flex-1 items-center justify-center gap-12">
        <Logo width={187} height={60} />
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  const Separator = () => {
    return (
      <View className="h-px w-full my-4 border-b border-dashed border-gray-500" />
    );
  };

  const { totalCarbohydrates, totalProteins, totalFats } = meal;

  const calculatePercentage = (macronutrients: number) => {
    return Math.round(
      (macronutrients / (totalCarbohydrates + totalProteins + totalFats)) * 100
    );
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={{ backgroundColor: colors.black[700] }} className="h-20">
        <SafeAreaView className="flex-row items-center justify-start">
          <View className="w-12 h-12 flex items-center justify-center">
            <ChevronLeft onPress={router.back} color="white" />
          </View>
          <Text style={{ color: colors.gray[300] }}>Macros Totais</Text>
        </SafeAreaView>
      </View>

      <View className="p-5 gap-6 w-full flex items-center justify-between">
        <View className="flex-row">
          <View className="items-center w-1/3 justify-center">
            <Text className="text-sm text-gray-700">Carboidratos</Text>
            <Text className="font-sans-bold text-support-yellow text-base">
              {Math.round(totalCarbohydrates)}g (
              {calculatePercentage(totalCarbohydrates)}%)
            </Text>
          </View>

          <View className="items-center w-1/3 justify-center">
            <Text className="text-sm text-gray-700">Proteínas</Text>
            <Text className="font-sans-bold text-support-teal text-base">
              {Math.round(totalProteins)}g ({calculatePercentage(totalProteins)}
              %)
            </Text>
          </View>

          <View className="items-center w-1/3 justify-center">
            <Text className="text-sm text-gray-700">Gorduras</Text>
            <Text className="font-sans-bold text-support-orange text-base">
              {Math.round(totalFats)}g ({calculatePercentage(totalFats)}%)
            </Text>
          </View>
        </View>
        <HorizontalBar
          carbohydrates={totalCarbohydrates}
          proteins={totalProteins}
          fats={totalFats}
        />
      </View>
      <Separator />
      <View
        style={{ marginBottom: bottom + 325 }}
        className="flex p-5 gap-6 items-start justify-center"
      >
        <Text className="font-sans-semibold text-2xl">Almoço Fitness</Text>
        <Text
          style={{ color: colors.gray[700] }}
          className="font-sans-medium text-base"
        >
          Itens
        </Text>
        <ScrollView className="w-full">
          {meal.foods.map((mealItem, index) => (
            <React.Fragment key={index}>
              <Text className="p-[14px] font-sans-regular text-base">
                {mealItem.quantity} {mealItem.name}
              </Text>
              <View className="h-px my-4 w-full bg-gray-500" />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
