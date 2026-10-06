import { View, Text, Pressable, ImageBackground } from 'react-native';
import { Plus, Heart } from 'lucide-react-native';

interface Props {
  link: any;
  title: string;
  price: number;
  context: string;
  image: string;
  like: boolean;
  onDelete: any;
}

const CardWishlist = (props: Props) => {
  return (
    <Link href={`/detailMenu/${(props.link) + 1}`} asChild>
      <View className="bg-white rounded-xl p-3">
        <View className="relative w-full h-44 rounded-xl overflow-hidden">
          <ImageBackground
            source={{ uri: props.image }}
            className="w-full h-full p-2 flex-row justify-end items-start"
            resizeMode="cover"
          >
            <Pressable
              className="bg-white/80 p-2 rounded-full items-center justify-center"
              onPress={() => props.onDelete()}
            >
              <Heart
                size={20}
                color={props.like ? "#dc2626" : "#374151"}
                fill={props.like ? "#dc2626" : "transparent"}
              />
            </Pressable>
          </ImageBackground>
        </View>

        <View className="mt-3">
          <Text className="text-xl font-medium">{props.title}</Text>
          <Text className="text-sm text-gray-400">{props.context}</Text>
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-xl font-semibold text-red-600">Rp. {props.price}</Text>
          <Pressable className="bg-red-600 px-4 py-2 rounded-full flex-row gap-2 items-center justify-center">
            <Plus size={20} color="white" />
            <Text className="text-white font-semibold">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </Link>
  );
};

export default CardWishlist;
