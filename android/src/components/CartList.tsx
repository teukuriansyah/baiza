import { View, Text, Image, Pressable } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';

interface Props {
  // Define your props here
}

const CartList = (props: Props) => {
  return (
    <View className="px-4 py-3 rounded-xl bg-white">
      <View className="flex-row gap-3 w-full">
        <View>
          <Image source={require("../assets/screen.png")} className="h-24 aspect-square rounded-xl"/>
        </View>
        <View className="w-[65%]">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-medium">Title</Text>
            <Pressable><Text>X</Text></Pressable>
          </View>
          <View className="mt-3">
            <Text className="text-red-950 text-sm">Context</Text>
            <Text className="text-red-950 text-sm">Price</Text>
          </View>
        </View>
      </View>
      <View className="mt-5 flex-row justify-between items-center">
        <View>
          <Text className="text-red-700 text-2xl font-semibold">Rp. Price</Text>
        </View>
        <View className="flex-row bg-gray-400 rounded-full p-1 gap-4 w-28 justify-between">
          <Pressable className="bg-white apsect-square rounded-full"><Minus/></Pressable>
          <Text className="text-xl">1</Text>
          <Pressable className="bg-white apsect-square rounded-full"><Plus /></Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartList;