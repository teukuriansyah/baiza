import { View, Text, Pressable, ImageBackground } from 'react-native';
import { Plus, Heart } from 'lucide-react-native';
import { Link } from 'expo-router';

interface Props {
  link: any;
  title: string;
  context: string;
  price: number;
  img: string;
  rating: number;
  like: boolean;
  press: () => void;
}

const CardHome = (props: Props) => {
  return (
    <Link href={`/detailMenu/${(props.link)+1}`} asChild>
      <Pressable className="bg-white rounded-xl p-3">
        <View className="relative w-28 h-28 rounded-xl overflow-hidden"><ImageBackground source={{ uri: props.img }} className="w-full h-full p-2 flex-row justify-end items-start" resizeMode="cover"><Pressable onPress={(e) => { e.stopPropagation(); props.press(); }} className="bg-white/80 p-2 rounded-full items-center justify-center"><Heart size={20} color={props.like ? "#dc2626" : "#374151"} fill={props.like ? "#dc2626" : "transparent"} /></Pressable></ImageBackground></View>
        <View className="pt-1"><Text className="font-semibold">⭐ {props.rating}</Text></View>
        <View className="mt-1"><Text className="text-xl font-medium">{props.title?.length > 10 ? `${props.title.slice(0, 10)}...` : props.title}</Text><Text className="text-sm text-gray-400">{props.context?.length > 12 ? `${props.context.slice(0, 12)}...` : props.context}</Text></View>
        <View className="flex-row justify-between items-center mt-2"><Text className="text-xl font-semibold">Rp. {props.price}</Text></View>
      </Pressable>
    </Link>
  );
};

export default CardHome;