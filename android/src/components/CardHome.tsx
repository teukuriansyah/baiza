import { View, Text, Pressable, ImageBackground } from 'react-native';
import { Plus, Heart } from 'lucide-react-native';

interface Props {
  // Define your props here
}

const CardHome = (props: Props) => {
  return (
    <View className="bg-white rounded-xl p-3">
      <View className="relative w-28 h-28 rounded-xl overflow-hidden">
        <ImageBackground source={require("../assets/screen.png")} className="w-full h-full p-2 flex-row justify-end items-start" resizeMode="cover">
          <Pressable className="bg-white/80 p-2 rounded-full items-center justify-center">
            <Heart size={20} color="#374151" />
          </Pressable>
        </ImageBackground>
      </View>
      <View className="mt-2">
        <Text className="font-semibold">⭐ 4.8</Text>
      </View>
      <View className="mt-1">
        <Text className="text-xl font-medium">Title</Text>
        <Text className="text-sm text-gray-400">Context</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-xl font-semibold">Rp. Price</Text>
        <Pressable className="bg-red-600 p-2 rounded-full items-center justify-center">
          <Plus size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default CardHome;
