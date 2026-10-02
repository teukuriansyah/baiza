import { View, Text } from 'react-native';
import ListNotification from "../components/ListNotification.tsx"

const notification = () => {
  return (
    <View>
      <View className="px-5 py-4">
        {/* Today */}
        <View>
          <Text className="text-lg font-semibold">Today</Text>
        </View>
        <View className="mt-1">
          <ListNotification />
        </View>

        {/* Earlier */}
        <View className="mt-9">
          <Text className="text-lg font-semibold">Earlier</Text>
        </View>
        <View className="mt-1">
          <ListNotification />
        </View>
      </View>
    </View>
  );
};

export default notification;