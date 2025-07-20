import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  HostGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/host-grotesk";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeHeader } from "./components/HomeHeader";
import { MealsList } from "./components/MealsList";
import "./styles/global.css";
import { Home } from "./screens/Home";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
    HostGrotesk_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </View>
  );
}
