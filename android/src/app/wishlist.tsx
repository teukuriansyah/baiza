import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import CardWishlist from '@/components/CardWishlist';
import { getWishlist, deleteWishlist } from '@/services/UserServices';

export default function Wishlist() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetching = useCallback(async () => {
    try {
      setLoading(true);
      const rawData = await getWishlist();
      const wishlistItems = rawData?.data || rawData || [];
      setData(Array.isArray(wishlistItems) ? wishlistItems : []);
    } catch (error) {
      console.error("Gagal mengambil data wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetching();
    }, [fetching])
  );

  const handleDeleteWishlist = async (targetId: any) => {
    if (!targetId) return;

    const previousData = [...data];

  
    setData((prev) => 
      prev.filter((item) => {
        const itemId = item?.idMenu || item?.id || item?._id || item;
        return String(itemId) !== String(targetId);
      })
    );

    try {
      await deleteWishlist(targetId);
    } catch (error) {
      console.error("Gagal menghapus wishlist:", error);
      setData(previousData);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Title */}
      <View className="px-5 pt-6 pb-3">
        <Text className="text-2xl font-bold text-gray-900">Saved Dishes</Text>
        <Text className="text-sm text-gray-400">Daftar menu favorit yang kamu simpan</Text>
      </View>
      
      {/* List Wishlist */}
      <View className="px-5 py-2">
        {loading ? (
          <View className="py-10 items-center">
            <ActivityIndicator size="large" color="#dc2626" />
          </View>
        ) : data.length === 0 ? (
          <View className="py-10 items-center justify-center">
            <Text className="text-gray-400 font-medium text-base">Belum ada menu tersimpan</Text>
          </View>
        ) : (
          data.map((item: any, index: number) => {
            const menuId = item?.idMenu || item?.id || item?._id;
            return (
              <CardWishlist key={menuId || index} title={item?.name} context={item?.description} image={item?.imageUrl} link={index} onDelete={() => handleDeleteWishlist(menuId)}/>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}