import { Text, View, TextInput, ScrollView } from "react-native";
import { Search } from 'lucide-react-native';
import { useRouter } from "expo-router"
import { useState } from "react"
import ListHome from "../components/ListHome";
import CardHome from "../components/CardHome";

export default function Index() {
  const route = useRouter()
  const [searchQuery, onChangeSearchQuery] = useState("")

  const submitSearch = () => {
    if(searchQuery !== "") {
      route.push({
        pathname:"/search",
        params:{q:searchQuery}
      })
    }
    onChangeSearchQuery("")
  }
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
          <TextInput className="flex-1 py-1.5 text-base text-gray-800" placeholder="Search sushi, ramen, donburi" placeholderTextColor="#9ca3af" value={searchQuery} onChangeText={onChangeSearchQuery} onSubmitEditing={submitSearch}/>
        </View>
      </View>

      {/* Popular */}
      <View className="px-5 py-3">
        <View className="mb-3">
          <Text className="text-xl font-semibold text-gray-900">Popular</Text>
          <Text className="text-sm text-gray-400">Master crafted, highly rated</Text>
        </View>
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] mb-3"><CardHome /></View>
          <View className="w-[48%] mb-3"><CardHome /></View>
          <View className="w-[48%] mb-3"><CardHome /></View>
          <View className="w-[48%] mb-3"><CardHome /></View>
        </View>
      </View>

      {/* Chef Recommendations */}
      <View className="px-5 py-3 mb-6">
        <View className="mb-3">
          <Text className="text-xl font-semibold text-gray-900">Chef Recommendations</Text>
          <Text className="text-sm text-gray-400">Handpicked culinary delights</Text>
        </View>
        <View>
          <ListHome />
        </View>
      </View>
    </ScrollView>
  );
}
