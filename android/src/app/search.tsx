import { View, Text, TextInput, ScrollView } from "react-native";
import { Search } from "lucide-react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { getDataBySearch } from "@/services/MenuServices";
import { getCart } from "@/services/UserServices";
import ListHome from "../components/ListHome";

const SearchPage = () => {
  const route = useRouter();
  const { q } = useLocalSearchParams();
  const [datas, setDatas] = useState<any[]>([]);
  const [searchQuery, onChangeSearchQuery] = useState("");

  const submitSearch = () => {
    if (searchQuery.trim() !== "") {
      route.push({ pathname: "/search", params: { q: searchQuery } });
      onChangeSearchQuery("");
    }
  };

  const fetching = useCallback(async () => {
    if (!q) return;

    try {
      const query = Array.isArray(q) ? q[0] : q;
      const data = await getDataBySearch(query);
      console.log(data);
      setDatas(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setDatas([]);
    }
  }, [q]);

  const fetchingCart = useCallback(async () => {
    try {
      const data = await getCart();
      console.log(data);
    } catch (error) {
      console.error("Cart error:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetching();
      fetchingCart();
    }, [fetching, fetchingCart])
  );

  return (
    <ScrollView>
      <View className="px-5 py-2">
        <View className="bg-white px-4 py-1.5 rounded-full flex-row items-center gap-3 border border-gray-100 shadow-sm">
          <Search size={20} color="#6b7280" />
          <TextInput className="flex-1 py-1.5 text-base text-gray-800" placeholder="Search sushi, ramen, donburi" placeholderTextColor="#9ca3af" value={searchQuery} onChangeText={onChangeSearchQuery} onSubmitEditing={submitSearch} />
        </View>
      </View>

      <View className="px-5 py-3 mb-6">
        <View className="mb-3">
          <Text className="text-sm text-gray-400">{datas.length} Result found</Text>
        </View>
        <View className="gap-4">
          {datas.map((d: any, i: number) => <ListHome key={d?.idMenu || d?.id || d?._id || i} link={i} title={d?.name} context={d?.description} price={d?.price} img={d?.imageUrl} rating={d?.rating} />)}
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchPage;