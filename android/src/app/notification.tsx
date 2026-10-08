import { View, Text } from 'react-native';
import { getDataNotification } from "../services/UserServices";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router"
import ListNotification from "../components/ListNotification";

const Notification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetching = async () => {
    try {
      const { data } = await getDataNotification();
      setNotifications(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetching();
    }, [fetching])
  );

  const isToday = (dateString: string) => {
    if (!dateString) return false;
    const itemDate = new Date(dateString).toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    return itemDate === today;
  };

  const todayNotifications = notifications.filter((item) => isToday(item?.createdAt));
  const earlierNotifications = notifications.filter((item) => !isToday(item?.createdAt));

  return (
    <View className="px-5 py-4">
      {/* Today Section */}
      <View>
        <Text className="text-lg font-semibold">Today</Text>
      </View>
      <View className="mt-1">
        {todayNotifications.length > 0 ? (
          todayNotifications.map((item, index) => (
            <ListNotification key={item.id || index} title={item.title} context={item.message} type={item.type}/>
          ))
        ) : (
          <Text className="text-gray-400 my-2">No notifications today</Text>
        )}
      </View>

      {/* Earlier Section */}
      <View className="mt-9">
        <Text className="text-lg font-semibold">Earlier</Text>
      </View>
      <View className="mt-1 gap-3">
        {earlierNotifications.length > 0 ? (
          earlierNotifications.map((item, index) => (
            <ListNotification key={item.id || index} title={item.title} context={item.message} type={item.type}/>
          ))
        ) : (
          <Text className="text-gray-400 my-2">No earlier notifications</Text>
        )}
      </View>
    </View>
  );
};

export default Notification;
