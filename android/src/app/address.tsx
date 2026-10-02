import { View, Text, ScrollView, Pressable } from 'react-native'
import { MapPin, Navigation } from 'lucide-react-native'
import CardAddress from '@/components/CardAddress'

export default function Address() {
  return (
    <ScrollView>
      <View className="px-5 py-3">
        <Text className="text-2xl font-semibold">Saved Address</Text>
        <Text className="text-sm text-gray-400">
          Manage delivery destinations for swift checkout
        </Text>
      </View>

      {/* Pinpoint */}
      <View className="px-5 py-3">
        <View className="rounded-xl bg-gray-300 p-4">
          <View className="flex-row items-start gap-3">
            <View className="aspect-square items-center justify-center rounded-full bg-red-800 p-2.5">
              <MapPin size={22} color="white" />
            </View>

            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-600">
                Pinpoint Current GPS Location
              </Text>

              <View className="mt-2 self-start rounded bg-gray-400 px-2 py-0.5">
                <Text className="text-xs font-medium text-gray-700">
                  Lat: , Lng :
                </Text>
              </View>

              <View className="mt-4">
                <Pressable className="flex-row items-center justify-center gap-2 rounded-full bg-red-800 px-4 py-3">
                  <Navigation size={18} color="#ffffff" />
                  <Text className="font-semibold text-white">
                    Use Current Location
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Registered address */}
      <View className="px-5 py-3">
        <Text className="mb-2 text-lg font-semibold">
          Registered Delivery Places
        </Text>
        <CardAddress />
      </View>
    </ScrollView>
  )
}