import { View, Text, TextInput, ScrollView } from 'react-native';
import { Search } from 'lucide-react-native';
import { useRouter } from "expo-router"
import { useState } from "react"
import ListHome from "../components/ListHome";

const search = () => {
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
    <ScrollView>
      {/* Search Bar */}
      <View className="px-5 py-2">
        <View className="bg-white px-4 py-1.5 rounded-full flex-row items-center gap-3 border border-gray-100 shadow-sm">
          <Search size={20} color="#6b7280" />
          <TextInput className="flex-1 py-1.5 text-base text-gray-800" placeholder="Search sushi, ramen, donburi" placeholderTextColor="#9ca3af" value={searchQuery} onChangeText={onChangeSearchQuery} onSubmitEditing={submitSearch}/>
        </View>
      </View>

      <View className="px-5 py-3 mb-6">
        <View className="mb-3">
          <Text className="text-sm text-gray-400">8 Result found</Text>
        </View>
        <View>
          <ListHome />
        </View>
      </View>
    </ScrollView>
  );
};

export default search;