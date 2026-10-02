import { View, Text, Pressable, ImageBackground } from 'react-native';
import { Plus, Heart } from 'lucide-react-native';

interface Props {
  // Define your props here
}

const CardWishlist = (props: Props) => {
  return (
    <View className="bg-white rounded-xl p-3">
      {/* Container gambar diset h-44 dan w-full agar melebar sesuai container bg-white */}
      <View className="relative w-full h-44 rounded-xl overflow-hidden">
        <ImageBackground 
          source={require("../assets/screen.png")} 
          className="w-full h-full p-2 flex-row justify-end items-start" 
          resizeMode="cover"
        >
          <Pressable className="bg-white/80 p-2 rounded-full items-center justify-center">
            <Heart size={20} color="#374151" />
          </Pressable>
        </ImageBackground>
      </View>

      <View className="mt-3">
        <Text className="text-xl font-medium">Title</Text>
        <Text className="text-sm text-gray-400">Context</Text>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-xl font-semibold text-red-600">Rp. Price</Text>
        <Pressable className="bg-red-600 px-4 py-2 rounded-full flex-row gap-2 items-center justify-center">
          <Plus size={20} color="white" />
          <Text className="text-white font-semibold">Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CardWishlist;