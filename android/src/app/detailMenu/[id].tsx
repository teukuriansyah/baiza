import { View, Text, TextInput, ScrollView, Pressable, ImageBackground, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Minus, ArrowLeft, Heart } from "lucide-react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { getDataById } from "@/services/MenuServices";
import { getWishlist, postWishlist, deleteWishlist, getCart, postCart, putCart } from "@/services/UserServices";

const DetailMenu = () => {
  const { id } = useLocalSearchParams();
  const [datas, setDatas] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const checkWishlistStatus = useCallback(async (targetId: any) => {
    try {
      const res = await getWishlist();
      const data = res?.data || res || [];
      const wishlistIds = Array.isArray(data) ? data.map((item: any) => typeof item === "object" ? item?.idMenu || item?.id || item?._id : item) : [];
      setIsLiked(wishlistIds.some((item: any) => String(item) === String(targetId)));
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    }
  }, []);

  const fetchingCart = useCallback(async (menuId: any) => {
    try {
      const res = await getCart();
      const cartData = res?.data || [];
      setCart(cartData);
      const item = cartData.find((item: any) => String(item.idMenu) === String(menuId));
      setQuantity(item?.quantity || 1);
    } catch (error) {
      console.error("Cart error:", error);
      setQuantity(1);
    }
  }, []);

  const fetching = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const res = await getDataById(id);
      const menuData = res?.data || res;
      const targetId = menuData?.idMenu || menuData?.id || id;
      setDatas(menuData);
      await Promise.all([checkWishlistStatus(targetId), fetchingCart(targetId)]);
    } catch (error) {
      console.error("Gagal ambil detail menu:", error);
    } finally {
      setLoading(false);
    }
  }, [id, checkWishlistStatus, fetchingCart]);

  useFocusEffect(useCallback(() => { fetching(); }, [fetching]));

  const addToCart = async () => {
    if (!datas?.id) return;
    const item = cart.find((item: any) => String(item.idMenu) === String(datas.id));
    if (item) return await putCart(item.idMenu, quantity);
    await postCart({ idMenu: datas.id, name: datas.name, quantity, price: datas.price, imageUrl:datas.imageUrl });
  };

  const toggleWishlist = async () => {
    const targetId = datas?.idMenu || datas?.id || id;
    if (!targetId) return;

    const previousState = isLiked;
    setIsLiked(!previousState);

    try {
      if (previousState) await deleteWishlist(targetId);
      else await postWishlist(targetId);
    } catch (error) {
      console.error("Gagal toggle wishlist:", error);
      setIsLiked(previousState);
    }
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));
  const totalPrice = (datas?.price || 0) * quantity;

  if (loading) {
    return <SafeAreaView className="flex-1 bg-white items-center justify-center"><ActivityIndicator size="large" color="#dc2626" /></SafeAreaView>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground source={{ uri: datas?.imageUrl }} className="px-5 py-12 flex-row h-[300px] justify-between">
            <Pressable className="bg-gray-600/40 rounded-full aspect-square items-center justify-center w-9 h-9" onPress={() => router.back()}><ArrowLeft size={20} color="white" /></Pressable>
            <Pressable className={`rounded-full aspect-square items-center justify-center w-9 h-9 ${isLiked ? "bg-white/60" : "bg-gray-600/40"}`} onPress={toggleWishlist}><Heart size={20} color={isLiked ? "red" : "white"} fill={isLiked ? "red" : "none"} /></Pressable>
          </ImageBackground>
        </View>
        <View className="px-5 py-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-bold flex-1">{datas?.name}</Text>
            <Text className="text-3xl font-bold text-red-600">Rp. {datas?.price?.toLocaleString("id-ID")}</Text>
          </View>
          <View className="mt-1"><Text className="font-semibold">⭐ {datas?.rating}</Text></View>
        </View>
        <View className="px-5 py-3">
          <View className="px-4 py-2 bg-gray-200 rounded-xl"><Text className="text-red-900">{datas?.description}</Text></View>
        </View>
        <View className="px-5 py-3">
          <View className="flex-row justify-between items-end"><Text className="text-2xl font-semibold">Chef's Note</Text><Text className="text-sm text-gray-400">Optional</Text></View>
          <View className="rounded-xl bg-gray-200 h-44 mt-2"><TextInput className="px-3 py-2 h-full" multiline textAlignVertical="top" placeholder="e.g. Please put mentai mayo on the side, extra wasabi..." /></View>
        </View>
        <View className="px-5 py-3">
          <View className="bg-gray-200 rounded-xl px-5 py-3 flex-row items-center justify-between">
            <View><Text className="text-xl font-semibold text-gray-800">Quantity</Text></View>
            <View className="flex-row gap-3 items-center">
              <Pressable onPress={handleDecrement} className="bg-gray-400 w-8 h-8 rounded-full items-center justify-center active:bg-gray-500"><Minus size={18} color="#FFFFFF" strokeWidth={2.5} /></Pressable>
              <Text className="text-xl font-bold">{quantity}</Text>
              <Pressable onPress={handleIncrement} className="bg-gray-400 w-8 h-8 rounded-full items-center justify-center active:bg-gray-500"><Plus size={18} color="#FFFFFF" strokeWidth={2.5} /></Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="px-5 py-3 flex-row items-center justify-between bg-white border-t border-gray-100">
        <View><Text className="text-gray-400">Total Price</Text><Text className="text-red-600 text-2xl font-semibold">Rp. {totalPrice.toLocaleString("id-ID")}</Text></View>
        <Pressable className="rounded-xl px-6 py-3 bg-red-600 active:bg-red-700" onPress={addToCart}><Text className="text-white font-semibold">Add to Cart</Text></Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DetailMenu;

