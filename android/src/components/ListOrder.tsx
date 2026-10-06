import { View, Text, Image } from 'react-native';
import { Check } from 'lucide-react-native';

interface Props {
  title:string;
  date:any;
  image:string;
  price:number;
  context:string
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
          <Text className="text-sm text-red-900">{props.date}</Text>
        </View>
      </View>
      
      <View className="mt-3 flex-row justify-between">
        <View className="flex-row items-center gap-2">
          <View>
            <Image className="h-12 rounded-xl aspect-square" source={{ uri: props.image}} />
          </View>
          <View>
            <Text className="text-xl font-medium">{props.title.split("").map((d:string,i:number) => i < 6 ? d : i >= 6 && i < 9 ? "." : null)}</Text>
            <Text className="text-sm">Lorem ipsum dolor sit</Text>
          </View>
        </View>
        <View>
          <Text className="text-xl font-medium">Rp. {props.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default ListOrder;
