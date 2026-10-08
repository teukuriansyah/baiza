import { View, Text, Image, Pressable } from "react-native";
import { Plus, Minus } from "lucide-react-native";

interface Props {
  title: string;
  image: string;
  quantity: number;
  price: number;
  deleteItem: () => void;
  onPressPlus: () => void;
  onPressMinus:() => void;
}

const CartList = (props: Props) => {
  return (
    <View className="px-4 py-3 rounded-xl bg-white">
      <View className="flex-row gap-3 w-full">
        <Image source={{ uri: props.image }} className="h-24 aspect-square rounded-xl" />
        <View className="w-[65%]">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-medium">{props.title?.length > 10 ? `${props.title.slice(0, 10)}...` : props.title}</Text>
            <Pressable onPress={props.deleteItem}>
              <Text className="text-2xl">X</Text>
            </Pressable>
          </View>
          <View className="mt-3">
            <Text className="text-red-950 text-sm">Rp. {props.price.toLocaleString("id-ID")}</Text>
          </View>
        </View>
      </View>
      <View className="mt-5 flex-row justify-between items-center">
        <View>
          <Text className="text-red-700 text-2xl font-semibold">Rp. {(props.quantity * props.price).toLocaleString("id-ID")}</Text>
        </View>
        <View className="flex-row bg-gray-400 rounded-full p-1 gap-4 w-28 justify-between items-center">
          <Pressable className="bg-white aspect-square rounded-full" onPress={props.onPressMinus}>
            <Minus />
          </Pressable>
          <Text className="text-xl">{props.quantity}</Text>
          <Pressable className="bg-white aspect-square rounded-full" onPress={props.onPressPlus}>
            <Plus />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartList;
