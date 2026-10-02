import { View, Text, Image, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

interface Props {
  // Define your props here
}

const ListHome = (props: Props) => {
  return (
    <View className="bg-white px-4 py-4 rounded-xl flex-row gap-4">
      <View>
        <Image className="h-20 aspect-square rounded-xl" source={ require("../assets/screen.png")} />
      </View>
      <View className="flex-1">
        <View className="justify-between">
          <View>
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-semibold">Title</Text>
              <Text className="font-semibold">⭐4.6</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Context</Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg font-semibold">Rp. Price</Text>
            <Pressable className="aspect-square bg-gray-100 p-1 rounded-full items-center justify-center">
              <Plus size={20} color="red" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListHome;