import { Text, View, TextInput, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { Search } from 'lucide-react-native';
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { getData, getCategory, getDataByCategory } from "../services/MenuServices";
import { getWishlist, postWishlist } from "@/services/UserServices";
import ListHome from "../components/ListHome";
import CardHome from "../components/CardHome";

export default function Index() {
  const route = useRouter();
  const [datas, setDatas] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any>([])
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

  const fetchingData = async () => {
    try {
      setLoading(true);
      const cat = await getCategory();
      const rawWishlist = await getWishlist()

      setWishlist(rawWishlist.data)
      console.log(rawWishlist)
      setCategory(cat || []);

      if (selectedCategory === "all" || selectedCategory === "") {
        const res = await getData();
        const menuItems = res?.data?.menuItems || [];
        setDatas(menuItems);
        if (menuItems.length > 0) {
          const randoms = Math.floor(Math.random() * menuItems.length);
          setRandom(randoms);
          setRecommendation(menuItems[randoms]);
        }
      } else {
        const data = await getDataByCategory(selectedCategory);
        setDatas(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchingData(); }, [selectedCategory]);

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
          <TextInput className="flex-1 py-1.5 text-base text-gray-800" placeholder="Search sushi, ramen, donburi" placeholderTextColor="#9ca3af" value={searchQuery} onChangeText={onChangeSearchQuery} onSubmitEditing={submitSearch} />
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
            <ListHome link={random} title={recommendation?.name} rating={recommendation?.rating} context={recommendation?.description} price={recommendation?.price} img={recommendation?.imageUrl} />
          </View>
        </View>
      )}

      {/* Category */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 py-3 gap-4">
        {category?.map((d: any, i: number) => <Pressable className={`${(selectedCategory === d?.category) ? "bg-red-600" : "bg-gray-300"} p-2 rounded-full`} key={i} onPress={() => setSelectedCategory(selectedCategory === d?.category ? "all" : d?.category)}><Text className={selectedCategory === d?.category ? "text-white font-semibold" : "text-gray-600"}>{d?.name}</Text></Pressable>)}
      </ScrollView>

      {/* Popular */}
      <View className="px-5 py-3">
        <View className="mb-3">
          <Text className="text-xl font-semibold text-gray-900">Popular</Text>
          <Text className="text-sm text-gray-400">Master crafted, highly rated</Text>
        </View>
        {loading ? <ActivityIndicator size="large" color="#dc2626" /> : <View className="flex-row flex-wrap justify-between">{datas?.map((d: any, i: number) => <View className="w-[48%] mb-3" key={i}><CardHome link={i + 1} title={d?.name} context={d?.description} price={d?.price} img={d?.imageUrl} rating={d?.rating} /></View>)}</View>}
      </View>
    </ScrollView>
  );
}
