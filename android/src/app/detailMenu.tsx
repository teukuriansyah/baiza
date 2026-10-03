import { View, Text, TextInput, ScrollView, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Minus, ArrowLeft, Heart } from 'lucide-react-native';

const DetailMenu = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}showsVerticalScrollIndicator={false}>

        {/* Background Image */}
        <View>
          <ImageBackground source={require("../assets/screen.png")} className="px-5 py-12 flex-row items-between h-[300px] justify-between">
            <Pressable className="bg-gray-600/40 rounded-full aspect-square p-6 items-center justify-center w-9">
              <ArrowLeft size={24} color="white" />
            </Pressable>
            <Pressable className="bg-gray-600/40 p-6 rounded-full aspect-square items-center justify-center w-9">
              <Heart size={22} color="white" />
            </Pressable>
          </ImageBackground>
        </View>
        
        {/* Title */}
        <View className="px-5 py-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-bold">Title</Text>
            <Text className="text-3xl font-bold text-red-600">Rp. Price</Text>
          </View>
          <View className="mt-1">
            <Text className="font-semibold">⭐ 4.8</Text>
          </View>
        </View>

        {/* Context */}
        <View className="px-5 py-3">
          <View className="px-4 py-2 bg-gray-200 rounded-xl">
            <Text className="text-red-900">Context</Text>
          </View>
        </View>

        {/* Chef notes */}
        <View className="px-5 py-3">
          <View className="flex-row justify-between items-end">
            <Text className="text-2xl font-semibold">Chef's Note</Text>
            <Text className="text-sm text-gray-400">Optional</Text>
          </View>
          <View className="rounded-xl bg-gray-200 h-44 mt-2">
            <TextInput className="px-3 py-2 h-full" multiline textAlignVertical="top" placeholder="e.g. Please put mentai mayo on the side, extra wasabi..." />
          </View>
        </View>

        {/* Quantity */}
        <View className="px-5 py-3">
          <View className="bg-gray-200 rounded-xl px-5 py-3 flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-semibold text-gray-800">Quantity</Text>
            </View>
            <View className="flex-row gap-3 items-center">
              <Pressable className="bg-gray-400 w-8 h-8 rounded-full items-center justify-center active:bg-gray-500">
                <Minus size={18} color="#FFFFFF" strokeWidth={2.5} />
              </Pressable>
              <Text className="text-xl font-bold">1</Text>
              <Pressable className="bg-gray-400 w-8 h-8 rounded-full items-center justify-center active:bg-gray-500">
                <Plus size={18} color="#FFFFFF" strokeWidth={2.5} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar Total Price */}
      <View className="px-5 py-3 flex-row items-center justify-between bg-white border-t border-gray-100">
        <View>
          <Text className="text-gray-400">Total Price</Text>
          <Text className="text-red-600 text-2xl font-semibold">Rp. Price</Text>
        </View>
        <Pressable className="rounded-xl px-6 py-3 bg-red-600 active:bg-red-700">
          <Text className="text-white font-semibold">Add to Cart</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
};

export default DetailMenu;
