import { Text, View, TextInput, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { Search } from 'lucide-react-native';
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { getData, getCategory, getDataByCategory } from "../services/MenuServices";
import { getWishlist, postWishlist, deleteWishlist } from "@/services/UserServices";
import ListHome from "../components/ListHome";
import CardHome from "../components/CardHome";

export default function Index() {
  const route = useRouter();
  const [datas, setDatas] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [random, setRandom] = useState(0);
  const [searchQuery, onChangeSearchQuery] = useState("");
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const submitSearch = () => { 
    if (searchQuery.trim() !== "") { 
      route.push({ pathname: "/search", params: { q: searchQuery } }); 
      onChangeSearchQuery(""); 
    } 
  };

  const fetchWishlist = useCallback(async () => {
    try {
      const rawWishlist = await getWishlist();
      const rawData = rawWishlist?.data || rawWishlist || [];
      const wishlistIds = Array.isArray(rawData) 
        ? rawData.map((item: any) => typeof item === 'object' ? (item?.idMenu || item?.id || item?._id) : item) 
        : [];
      setWishlist(wishlistIds.filter(Boolean));
    } catch (error) { 
      console.error("Wishlist error:", error); 
    }
  }, []);

  const fetchingData = useCallback(async () => {
    try {
      setLoading(true);
      const cat = await getCategory();
      setCategory(cat || []);

      if (selectedCategory === "all" || selectedCategory === "") {
        const res = await getData();
        const menuItems = res?.data?.menuItems || res?.data || res || [];
        setDatas(Array.isArray(menuItems) ? menuItems : []);
        if (menuItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * menuItems.length);
          setRandom(randomIndex);
          setRecommendation(menuItems[randomIndex]);
        }
      } else {
        const data = await getDataByCategory(selectedCategory);
        setDatas(Array.isArray(data) ? data : data?.data || []);
      }
    } catch (error) { 
      console.error(error); 
    } finally { 
      setLoading(false); 
    }
  }, [selectedCategory]);

  const toggleWishlist = async (id: any) => {
    if (!id) return;
    const isExist = wishlist.some((wItem) => String(wItem) === String(id));
    
    // Optimistic Update
    if (!isExist) {
      setWishlist((prev) => [...prev, id]);
    } else {
      setWishlist((prev) => prev.filter((item) => String(item) !== String(id)));
    }

    try {
      if (!isExist) {
        await postWishlist(id);
      } else {
        await deleteWishlist(id);
      }
    } catch (error) {
      console.error("Gagal sync wishlist:", error);
      fetchWishlist();
    }
  };

  // Refetch data & wishlist tiap kali halaman ini dapat focus
  useFocusEffect(
    useCallback(() => {
      fetchWishlist();
      fetchingData();
    }, [fetchWishlist, fetchingData])
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Greetings */}
      <View className="px-5 pt-6 pb-2">
        <Text className="text-2xl font-semibold text-gray-900">Good Evening, User</Text>
        <Text className="text-sm text-gray-400 mt-1">Craving fresh authentic sushi?</Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 py-2">
        <View className="bg-white px-4 py-1.5 rounded-full flex-row items-center gap-3 border border-gray-100 shadow-sm">
          <Search size={20} color="#6b7280" />
          <TextInput 
            className="flex-1 py-1.5 text-base text-gray-800" 
            placeholder="Search sushi, ramen, donburi" 
            placeholderTextColor="#9ca3af" 
            value={searchQuery} 
            onChangeText={onChangeSearchQuery} 
            onSubmitEditing={submitSearch} 
          />
        </View>
      </View>

      {/* Chef Recommendations */}
      {recommendation && (
        <View className="px-5 py-3">
          <View className="mb-3">
            <Text className="text-xl font-semibold text-gray-900">Chef Recommendations</Text>
            <Text className="text-sm text-gray-400">Handpicked culinary delights</Text>
          </View>
          <View>
            <ListHome 
              link={random} 
              title={recommendation?.name} 
              rating={recommendation?.rating} 
              context={recommendation?.description} 
              price={recommendation?.price} 
              img={recommendation?.imageUrl} 
            />
          </View>
        </View>
      )}

      {/* Category */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 py-3 gap-4">
        {category?.map((d: any, i: number) => (
          <Pressable 
            className={`${selectedCategory === d?.category ? "bg-red-600" : "bg-gray-300"} p-2 rounded-full`} 
            key={d?.category || i} 
            onPress={() => setSelectedCategory(selectedCategory === d?.category ? "all" : d?.category)}
          >
            <Text className={selectedCategory === d?.category ? "text-white font-semibold" : "text-gray-600"}>{d?.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Popular */}
      <View className="px-5 py-3">
        <View className="mb-3">
          <Text className="text-xl font-semibold text-gray-900">Popular</Text>
          <Text className="text-sm text-gray-400">Master crafted, highly rated</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#dc2626" />
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {datas?.map((d: any, i: number) => { 
              const menuId = d?.idMenu || d?.id || d?._id; 
              return (
                <View className="w-[48%] mb-3" key={menuId || i}>
                  <CardHome 
                    link={i} 
                    title={d?.name} 
                    context={d?.description} 
                    price={d?.price} 
                    img={d?.imageUrl} 
                    rating={d?.rating} 
                    like={wishlist.some((wItem) => String(wItem) === String(menuId))} 
                    press={() => toggleWishlist(menuId)} 
                  />
                </View>
              ); 
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}