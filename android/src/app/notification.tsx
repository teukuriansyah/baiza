import { View, Text, ScrollView } from 'react-native';
import { getDataNotification } from "../services/UserServices";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import ListNotification from "../components/ListNotification";

const Notification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetching = useCallback(async () => {
    try {
      const { data } = await getDataNotification();
      setNotifications(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetching();
    }, [fetching])
  );

  const isToday = (dateString: string) => {
    if (!dateString) return false;
    
    const itemDate = new Date(dateString);
    const today = new Date();

    if (isNaN(itemDate.getTime())) return false;

    // Membandingkan Tanggal, Bulan, dan Tahun berdasarkan Waktu Lokal HP User
    return (
      itemDate.getDate() === today.getDate() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getFullYear() === today.getFullYear()
    );
  };

  const todayNotifications = notifications.filter((item) => isToday(item?.createdAt));
  const earlierNotifications = notifications.filter((item) => !isToday(item?.createdAt));

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-5 py-4 pb-10">
      {/* Today Section */}
      <View>
        <Text className="text-lg font-semibold text-gray-900">Today</Text>
        <View className="mt-2 gap-3">
          {todayNotifications.length > 0 ? (
            todayNotifications.map((item, index) => (
              <ListNotification 
                key={item.id || index} 
                title={item.title} 
                context={item.message} 
                type={item.type}
              />
            ))
          ) : (
            <Text className="text-gray-400 my-1">No notifications today</Text>
          )}
        </View>
      </View>

      {/* Earlier Section */}
      <View className="mt-8">
        <Text className="text-lg font-semibold text-gray-900">Earlier</Text>
        <View className="mt-2 gap-3">
          {earlierNotifications.length > 0 ? (
            earlierNotifications.map((item, index) => (
              <ListNotification 
                key={item.id || index} 
                title={item.title} 
                context={item.message} 
                type={item.type}
              />
            ))
          ) : (
            <Text className="text-gray-400 my-1">No earlier notifications</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Notification;