import { View, Text, Image } from 'react-native'
import React from 'react'

export default function OrderSummaryList() {
  return (
    <View className='flex-row gap-2 w-full rounded-xl'>
      <View>
        <Image source={require("../assets/screen.png")} className="aspect-square h-16 rounded-xl" />
      </View>
      <View className='flex-1'>
        <View className='flex-row justify-between'>
            <Text className='font-medium text-xl'>Quantity x Title</Text>
            <Text className='font-medium text-xl'>Price</Text>
        </View>
      </View>
    </View>
  )
}