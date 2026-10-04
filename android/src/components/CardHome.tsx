import { View, Text, Pressable, ImageBackground } from 'react-native';
import { Plus, Heart } from 'lucide-react-native';
import { Link } from 'expo-router';

interface Props {
  link:string;
  title:string;
  context:string;
  price:number;
  img:string;
  rating:number
}

const CardHome = (props: Props) => {
  return (
    <Link href={`/detailMenu/${props.link}`} className="bg-white rounded-xl p-3">
      <View className="relative w-28 h-28 rounded-xl overflow-hidden">
        <ImageBackground source={{ uri:props.img }} className="w-full h-full p-2 flex-row justify-end items-start" resizeMode="cover">
          <Pressable className="bg-white/80 p-2 rounded-full items-center justify-center">
            <Heart size={20} color="#374151" />
          </Pressable>
        </ImageBackground>
      </View>
      <View className="mt-2">
        <Text className="font-semibold">⭐ {props.rating}</Text>
      </View>
      <View className="mt-1">
        <Text className="text-xl font-medium">{props.title?.split("").map((s,i) => i < 10 ? s : i >= 10 && i < 13 ? "." : null).join("")}</Text>
        <Text className="text-sm text-gray-400">{props.context?.split("").map((s,i) => i < 12 ? s : i >= 12 && i < 15 ? "." : null).join("")}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-xl font-semibold">Rp. {props.price}</Text>
        <Pressable className="bg-red-600 p-2 rounded-full items-center justify-center">
          <Plus size={20} color="white" />
        </Pressable>
      </View>
    </Link>
  );
};

export default CardHome;
