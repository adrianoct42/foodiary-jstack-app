import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../hooks/useAuth"; // ajuste o caminho conforme seu projeto
import { View } from "lucide-react-native";
import { Logo } from "../../components/Logo";
import { ActivityIndicator } from "react-native";

export default function PrivateLayout() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="bg-lime-700 flex-1 items-center justify-center gap-12">
        <Logo width={187} height={60} />
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
