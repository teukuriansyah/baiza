import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import CardWishlist from '@/components/CardWishlist';
import { getWishlist, deleteWishlist } from '@/services/UserServices';
import { getData } from '@/services/MenuServices';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetching = useCallback(async () => {
    try {
      setLoading(true);
      const rawData = await getWishlist();
      const rawMenu = await getData();

      // Ekstrak wishlist IDs
      const rawWishlist = rawData?.data || rawData || [];
      const wishlistArray = Array.isArray(rawWishlist) ? rawWishlist : [];
      const wishlistIds = wishlistArray.map((wItem: any) => {
        if (typeof wItem === 'object' && wItem !== null) {
          return String(wItem?.idMenu || wItem?.id || wItem?._id || '');
        }
        return String(wItem);
      }).filter(Boolean);

      // Ekstrak Menu List
      const menuList = rawMenu?.data?.menuItems || rawMenu?.data || rawMenu || [];
      const menuData = Array.isArray(menuList) ? menuList : [];

      // Match item SEKANGLIAGUS menyimpan `originalIndex`-nya dari array menu utama
      const matchedData: any[] = [];
      menuData.forEach((mItem: any, index: number) => {
        const mMenuId = String(mItem?.idMenu || mItem?.id || mItem?._id || '');
        if (wishlistIds.includes(mMenuId)) {
          matchedData.push({
            ...mItem,
            originalIndex: index, // Simpan index asli menu dari list utama
          });
        }
      });

      setWishlistItems(matchedData);
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

    const previousData = [...wishlistItems];

    setWishlistItems((prev) =>
      prev.filter((item) => {
        const itemId = item?.idMenu || item?.id || item?._id;
        return String(itemId) !== String(targetId);
      })
    );

    try {
      await deleteWishlist(targetId);
    } catch (error) {
      console.error("Gagal menghapus wishlist:", error);
      setWishlistItems(previousData);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-5 pt-6 pb-3">
        <Text className="text-2xl font-bold text-gray-900">Saved Dishes</Text>
        <Text className="text-sm text-gray-400">Daftar menu favorit yang kamu simpan</Text>
      </View>

      <View className="px-5 py-2">
        {loading ? (
          <View className="py-10 items-center">
            <ActivityIndicator size="large" color="#dc2626" />
          </View>
        ) : wishlistItems.length === 0 ? (
          <View className="py-10 items-center justify-center">
            <Text className="text-gray-400 font-medium text-base">Belum ada menu tersimpan</Text>
          </View>
        ) : (
          wishlistItems.map((item: any, i: number) => {
            const menuId = item?.idMenu || item?.id || item?._id;
            return (
              <CardWishlist 
                key={menuId || i} 
                title={item?.name} 
                like={true} 
                price={item?.price} 
                context={item?.description} 
                image={item?.imageUrl || item?.image} 
                link={item?.originalIndex}
                onDelete={() => handleDeleteWishlist(menuId)} 
              />
            );
          })
        )}
      </View>
    </ScrollView>
  );
}