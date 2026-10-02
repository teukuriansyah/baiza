import { View, Text } from 'react-native'
import React from 'react'
import CardWishlist from '@/components/CardWishlist'

export default function wishlist() {
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