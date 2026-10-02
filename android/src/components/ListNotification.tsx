import { View, Text } from 'react-native';

interface Props {
  // Define your props here
}

const ListNotification = (props: Props) => {
  return (
    <View className="bg-white rounded-xl p-5">
      <View>{/* logo */}</View>
      <View>
        <Text className="text-xl font-semibold">Title</Text>
        <Text className="text-sm text-red-900">Context</Text>
      </View>
    </View>
  );
};

export default ListNotification;