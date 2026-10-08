import { View, Text, ScrollView, Pressable } from 'react-native'
import { useState, useEffect, useCallback } from "react"
import { getDataUser, getCart } from '@/services/UserServices'
import { useFocusEffect } from 'expo-router'
import { MapPin } from 'lucide-react-native'
import OrderSummaryList from '@/components/OrderSummaryList'

export default function Checkout() {
  const [user, setUser] = useState<any>()
  const [dataCart, setDataCart] = useState<any>()
  const [subtotal, setSubtotal] = useState<number>(0)
  const fetchingUser = async() => {
    const userData = await getDataUser()
    setUser(userData?.data)
  }
  
  const fetching = useCallback(async () => {
    try {
      const { data } = await getCart();
      const rawTotal = data?.map((d:any) => d.quantity*d.price)
      setDataCart(data || []);
      setSubtotal(rawTotal.reduce((sum: number, value: number) => sum + value, 0))
    } catch (error) {
      console.error("Cart error:", error);
    }
  }, []);
    
  useEffect(() => {
    fetchingUser()
  },[])

  useFocusEffect(
    useCallback(() => {
      fetching();
    }, [fetching])
  );
  return (
    <View className="flex-1 bg-gray-100">
      {/* Scrollable Content */}
      <ScrollView contentContainerClassName="pb-24">
        {/* Address */}
        <View className="px-5 py-3">
          <View className="bg-white rounded-xl p-3 flex-row items-start gap-3">
            <View className="bg-red-100 p-2 rounded-full mt-1">
              <MapPin size={20} color="#dc2626" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-semibold">Delivery Address</Text>
                <Text className="font-medium text-red-600">Change</Text>
              </View>
              <View>
                <View className="mt-2 flex-row gap-1 items-end">
                  <Text className="font-semibold">{user?.name}</Text>
                  <Text className="text-sm text-gray-400">{user?.hp}</Text>
                </View>
                <View className="mt-1">
                  <Text className="text-gray-600">{user?.address}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View className="px-5 py-3">
          <View className="px-4 py-2 bg-white rounded-xl">
            <View>
              <Text className="text-xl font-semibold">Order Summary</Text>
            </View>
            <View className="mt-4 gap-3">
              {dataCart?.map((d:any,i:number) => <OrderSummaryList key={i} title={d.name} quantity={d.quantity} price={d.price} image={d.imageUrl}/>)}
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View className="px-5 py-3">
          <View className="px-4 py-2 bg-white rounded-xl">
            <View>
              <Text className="text-xl font-semibold">Payment Method</Text>
            </View>
            <View className="mt-4 gap-4">
              <View className="bg-gray-200 p-2 rounded-xl">
                <Text className="text-xl font-semibold">QRIS Instant</Text>
                <Text className="text-sm text-red-900">BCA, Mandiri, GoPay, OVO, ShopeePay via dynamic QR Code</Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-xl">
                <Text className="text-xl font-semibold">E-Wallet (Gopay/OVO)</Text>
                <Text className="text-sm text-red-900">Pay with your e-wallet</Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-xl">
                <Text className="text-xl font-semibold">Cash on Delivery (COD)</Text>
                <Text className="text-sm text-red-900">Pay with cash upon delivery directly to the Baiza Rider</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Breakdown */}
        <View className="px-5 py-3">
          <View className="px-4 py-2 bg-white rounded-xl">
            <View>
              <Text className="text-xl font-semibold">Payment Breakdown</Text>
            </View>
            <View>    
              <View className="mt-4 gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-red-950">Order Subtotal</Text>
                  <Text className="text-sm">{subtotal}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-red-950">Service Charge</Text>
                  <Text className="text-sm">{subtotal * 0.05}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-red-950">PB1</Text>
                  <Text className="text-sm">{subtotal * 0.1}</Text>
                </View>
              </View>
              <View className="mt-4 border-t border-gray-400 items-center flex-row justify-between">
                <Text className="mt-3 text-xl font-medium">Total Payment</Text>
                <Text className="mt-3 text-3xl text-red-600 font-bold">Rp. {subtotal + (subtotal * 0.1) + (subtotal * 0.05)}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button - Fixed / Absolute Bottom */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 flex-row justify-between items-center border-t border-gray-200">
        <View>
          <Text className="text-gray-400 text-xs font-medium">TOTAL PAYABLE</Text>
          <Text className="text-red-600 font-semibold text-xl">Rp. {subtotal + (subtotal * 0.1) + (subtotal * 0.05)}</Text>
        </View>
        <Pressable className="bg-red-600 rounded-full px-6 py-3 active:opacity-80">
          <Text className="text-white font-bold">Place order</Text>
        </Pressable>
      </View>
    </View>
  )
}