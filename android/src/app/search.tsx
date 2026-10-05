import { View, Text, TextInput, ScrollView } from 'react-native';
import { Search } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState, useEffect } from "react"
import ListHome from "../components/ListHome";
import { getDataBySearch } from '@/services/MenuServices';

const search = () => {
  const route = useRouter()
  const { q } = useLocalSearchParams()
  const [datas, setDatas] = useState<any>()
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

  const fetching = async() => {
    const data = await getDataBySearch(q)
    console.log(data)
    setDatas(data)
  }

  useEffect(() => {
    fetching()
  },[])
  
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
          <Text className="text-sm text-gray-400">{datas?.length} Result found</Text>
        </View>
        <View className="gap-4">
          {datas?.map((d:any,i:number) => <ListHome key={i} title={d.name} context={d.description} price={d.price} img={d.imageUrl} rating={d.rating}/>)}
        </View>
      </View>
    </ScrollView>
  );
};

export default search;