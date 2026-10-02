import { View, Text, ScrollView } from 'react-native';
import ListOrder from "../components/ListOrder"

const order = (props: Props) => {
  return (
    <ScrollView>
      <View className="px-5 py-3">
        <View>
          <Text className="text-lg font-medium">Past Deliveries</Text>
        </View>
        <View>
          <ListOrder />
        </View>
      </View>
    </ScrollView>
  );
};

export default order;