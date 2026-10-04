import { View, Text, Image, Pressable } from 'react-native';
import { Link } from "expo-router"
import { Plus } from 'lucide-react-native';

interface Props {
  link:number;
  title:string;
  context:string;
  price:number;
  img:string;
  rating:number
}

const ListHome = (props: Props) => {
  return (
    <Link href="/detailMenu" className="bg-white px-4 py-4 rounded-xl flex-row gap-4">
      <View>
        <Image className="h-20 aspect-square rounded-xl" source={{ uri:props.img }} />
      </View>
      <View className="flex-1">
        <View className="justify-between">
          <View>
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-semibold">{props.title?.split("").map((d,i) => i < 13 ? d : i >= 13 && i < 16 ? ".":null).join("")}</Text>
              <Text className="font-semibold">⭐{props.rating}</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">{props.context?.split("").map((d,i) => i < 26 ? d : i >= 26 && i < 29 ? ".":null).join("")}</Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg font-semibold">Rp. {props.price}</Text>
            <Pressable className="aspect-square bg-gray-100 p-1 rounded-full items-center justify-center">
              <Plus size={20} color="red" />
            </Pressable>
          </View>
        </View>
      </View>
    </Link>
  );
};

export default ListHome;