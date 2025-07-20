import { LogOutIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';

export function HomeHeader() {
  return (
    <View className="bg-lime-400 h-[130px]"> 
      <SafeAreaView className="px-4 flex-row items-center justify-between">
        <View>
          <Text className="text-gray-700 text-sm font-sans-regular">Olá, 👋</Text>
          <Text className="text-black-700 text-base font-sans-semibold">Mateus</Text>
        </View>

        <TouchableOpacity className="size-12 items-center justify-center">
          <LogOutIcon size={20} color={colors.black[700]} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
