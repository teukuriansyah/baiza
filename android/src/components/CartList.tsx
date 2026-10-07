import { View, Text, Image, Pressable } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';

interface Props {
  title:string;
  image:string;
  quantity:number;
  price:number;
  deleteItem:any
}

const CartList = (props: Props) => {
  return (
    <View className="px-4 py-3 rounded-xl bg-white">
      <View className="flex-row gap-3 w-full">
        <View>
          <Image source={{ uri:props.image }} className="h-24 aspect-square rounded-xl"/>
        </View>
        <View className="w-[65%]">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-medium">{props.title}</Text>
            <Pressable onPress={() => props.deleteItem}><Text>X</Text></Pressable>
          </View>
          <View className="mt-3">
            <Text className="text-red-950 text-sm">{props.price}</Text>
          </View>
        </View>
      </View>
      <View className="mt-5 flex-row justify-between items-center">
        <View>
          <Text className="text-red-700 text-2xl font-semibold">Rp. {props.quantity*props.price}</Text>
        </View>
        <View className="flex-row bg-gray-400 rounded-full p-1 gap-4 w-28 justify-between">
          <Pressable className="bg-white apsect-square rounded-full"><Minus/></Pressable>
          <Text className="text-xl">${props.quantity}</Text>
          <Pressable className="bg-white apsect-square rounded-full"><Plus /></Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartList;