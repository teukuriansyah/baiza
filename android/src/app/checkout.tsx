import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native"
import { useState, useEffect, useCallback } from "react"
import { getDataUser, getCart, deleteCart, postDataNotification, postOrderHistory } from "@/services/UserServices"
import { router, useFocusEffect } from "expo-router"
import { MapPin } from "lucide-react-native"
import OrderSummaryList from "@/components/OrderSummaryList"

type CartItem = { idMenu: number; name: string; quantity: number; price: number; imageUrl?: string }
type User = { name?: string; hp?: string; address?: string }

const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`

export default function Checkout() {
  const [user, setUser] = useState<User>()
  const [dataCart, setDataCart] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("QRIS")
  const [loading, setLoading] = useState(false)

  const serviceCharge = Math.round(subtotal * 0.05)
  const pb1 = Math.round(subtotal * 0.1)
  const totalPayment = subtotal + serviceCharge + pb1

  const fetchingUser = useCallback(async () => {
    try {
      const { data } = await getDataUser()
      setUser(data)
    } catch (error) {
      console.error("User fetch error:", error)
    }
  }, [])

  const fetchingCart = useCallback(async () => {
    try {
      const { data = [] } = await getCart()
      const items = data as CartItem[]
      const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
      setDataCart(items)
      setSubtotal(total)
    } catch (error) {
      console.error("Cart error:", error)
    }
  }, [])

  const handleCheckout = async () => {
    if (!dataCart.length) {
      alert("Keranjang kamu kosong!")
      return
    }

    setLoading(true)

    try {
      const orderId = `${Date.now()}`

      await postDataNotification({ title: "Pesanan Sedang Dibuat", message: "Pesanan kamu sedang disiapkan oleh resto.", type: "ORDER_CREATED" })
      await postOrderHistory({ idOrder: orderId, name: dataCart.map((item) => item.name).join(", "), price: totalPayment, imageUrl: dataCart[0]?.imageUrl || "" })
      await Promise.all(dataCart.map((item:any) => deleteCart(item.idMenu)))

      router.replace("/")
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Gagal membuat pesanan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchingUser()
  }, [fetchingUser])

  useFocusEffect(useCallback(() => { fetchingCart() }, [fetchingCart]))

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="pb-28">
        <View className="px-5 py-3">
          <View className="bg-white rounded-xl p-3 flex-row items-start gap-3">
            <View className="bg-red-100 p-2 rounded-full mt-1">
              <MapPin size={20} color="#dc2626" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-semibold">Delivery Address</Text>
                <Pressable>
                  <Text className="font-medium text-red-600">Change</Text>
                </Pressable>
              </View>
              <View className="mt-2">
                <View className="flex-row gap-1 items-end">
                  <Text className="font-semibold">{user?.name || "-"}</Text>
                  <Text className="text-sm text-gray-400">{user?.hp || ""}</Text>
                </View>
                <Text className="text-gray-600 mt-1">{user?.address || "Alamat belum diatur"}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 py-3">
          <View className="px-4 py-3 bg-white rounded-xl">
            <Text className="text-xl font-semibold">Order Summary</Text>
            <View className="mt-4 gap-3">
              {dataCart.length > 0 ? dataCart.map((item) => <OrderSummaryList key={item.idMenu} title={item.name} quantity={item.quantity} price={item.price} image={item.imageUrl} />) : <Text className="text-gray-400">Tidak ada item di keranjang.</Text>}
            </View>
          </View>
        </View>

        <View className="px-5 py-3">
          <View className="px-4 py-3 bg-white rounded-xl">
            <Text className="text-xl font-semibold">Payment Method</Text>
            <View className="mt-4 gap-4">
              <Pressable onPress={() => setPaymentMethod("QRIS")} className={`p-3 rounded-xl ${paymentMethod === "QRIS" ? "bg-red-100 border border-red-600" : "bg-gray-200"}`}>
                <Text className="text-lg font-semibold">QRIS Instant</Text>
                <Text className="text-sm text-gray-600">BCA, Mandiri, GoPay, OVO, ShopeePay via dynamic QR Code</Text>
              </Pressable>
              <Pressable onPress={() => setPaymentMethod("EWALLET")} className={`p-3 rounded-xl ${paymentMethod === "EWALLET" ? "bg-red-100 border border-red-600" : "bg-gray-200"}`}>
                <Text className="text-lg font-semibold">E-Wallet (GoPay/OVO)</Text>
                <Text className="text-sm text-gray-600">Pay with your e-wallet</Text>
              </Pressable>
              <Pressable onPress={() => setPaymentMethod("COD")} className={`p-3 rounded-xl ${paymentMethod === "COD" ? "bg-red-100 border border-red-600" : "bg-gray-200"}`}>
                <Text className="text-lg font-semibold">Cash on Delivery (COD)</Text>
                <Text className="text-sm text-gray-600">Pay with cash upon delivery directly to the Baiza Rider</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="px-5 py-3">
          <View className="px-4 py-3 bg-white rounded-xl">
            <Text className="text-xl font-semibold">Payment Breakdown</Text>
            <View className="mt-4 gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-600">Order Subtotal</Text>
                <Text className="text-sm font-medium">{formatRupiah(subtotal)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-600">Service Charge (5%)</Text>
                <Text className="text-sm font-medium">{formatRupiah(serviceCharge)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-600">PB1 (10%)</Text>
                <Text className="text-sm font-medium">{formatRupiah(pb1)}</Text>
              </View>
            </View>
            <View className="mt-4 pt-3 border-t border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-semibold">Total Payment</Text>
              <Text className="text-2xl text-red-600 font-bold">{formatRupiah(totalPayment)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 flex-row justify-between items-center border-t border-gray-200">
        <View>
          <Text className="text-gray-400 text-xs font-medium">TOTAL PAYABLE</Text>
          <Text className="text-red-600 font-bold text-xl">{formatRupiah(totalPayment)}</Text>
        </View>
        <Pressable onPress={handleCheckout} disabled={loading || !dataCart.length} className={`rounded-full px-6 py-3 active:opacity-80 ${loading || !dataCart.length ? "bg-gray-400" : "bg-red-600"}`}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text className="text-white font-bold">Place order</Text>}
        </Pressable>
      </View>
    </View>
  )
}