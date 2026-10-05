import { View, Text } from 'react-native';
import { Utensils, CookingPot, Bike, Bell } from 'lucide-react-native';

interface Props {
  title: string;
  context: string;
  type: 'ORDER_DELIVERED' | 'ORDER_SHIPPED' | 'ORDER_CREATED' | string;
}

const ListNotification = ({ title, context, type }: Props) => {
  const renderIcon = () => {
    switch (type) {
      case 'ORDER_DELIVERED': // Makanan sampai / diterima
        return (
          <View className="bg-green-100 p-2.5 rounded-full">
            <Utensils size={24} color="#16a34a" />
          </View>
        );
      case 'ORDER_SHIPPED': // Kurir/Driver lagi antar makanan
        return (
          <View className="bg-blue-100 p-2.5 rounded-full">
            <Bike size={24} color="#2563eb" />
          </View>
        );
      case 'ORDER_CREATED': // Makanan lagi disiapin / dimasak
        return (
          <View className="bg-amber-100 p-2.5 rounded-full">
            <CookingPot size={24} color="#d97706" />
          </View>
        );
      default:
        return (
          <View className="bg-gray-100 p-2.5 rounded-full">
            <Bell size={24} color="#4b5563" />
          </View>
        );
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 my-1.5 flex-row items-center gap-x-3.5 shadow-sm border border-gray-100">
      {renderIcon()}

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">{title}</Text>
        <Text className="text-sm text-gray-500 mt-0.5" numberOfLines={2}>
          {context}
        </Text>
      </View>
    </View>
  );
};

export default ListNotification;
