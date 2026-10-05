import { View, Text } from 'react-native'
import { useState, useEffect } from "react"
import CardWishlist from '@/components/CardWishlist'
import { getWishlist } from '@/services/UserServices'

export default function wishlist() {
  const [data, setData] = useState()

  const fetching = async() => {
    const rawData = await getWishlist()
    setData(rawData)
  }

  useEffect(() => {
    fetching()
  },[])
  return (
    <View>
      <View className='px-5 py-3'>
        <Text className="text-xl font-semibold ">Saved Dishes</Text>
      </View>
      
      {/* Menu */}
      <View className="px-5 py-3">
        <CardWishlist />
      </View>
    </View>
  )
}