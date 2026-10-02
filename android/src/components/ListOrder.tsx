import { View, Text, Image } from 'react-native';
import { Check } from 'lucide-react-native';

interface Props {
  // Define your props here
}

const ListOrder = (props: Props) => {
  return (
    <View className="bg-white rounded-xl p-6">
      <View className="flex-row gap-2 items-center">
        <View className="bg-green-100 p-1.5 rounded-full items-center justify-center">
          <Check size={16} color="#16a34a" />
        </View>
        <View>
          <Text className="font-medium">Delivered</Text>
          <Text className="text-sm text-red-900">tanggal</Text>
        </View>
      </View>
      
      <View className="mt-3 flex-row justify-between">
        <View className="flex-row items-center gap-2">
          <View>
            <Image className="h-12 rounded-xl aspect-square" source={ require("../assets/screen.png") } />
          </View>
          <View>
            <Text className="text-xl font-medium">Title</Text>
            <Text className="text-sm">Context</Text>
          </View>
        </View>
        <View>
          <Text className="text-xl font-medium">Rp. Price</Text>
        </View>
      </View>
    </View>
  );
};

export default ListOrder;
