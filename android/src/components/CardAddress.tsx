import { View, Text } from 'react-native'
import { Home } from 'lucide-react-native'

export default function CardAddress() {
  return (
    <View className="rounded-lg bg-white px-5 py-3 shadow-sm border-l-4 border-red-600">
      <View className="flex-row items-center gap-2">
        <View className="bg-red-200 rounded-full aspect-square p-2"><Home size={20} color="#f70a0a" /></View>
        <Text className="text-lg font-semibold">Home</Text>
      </View>

      <View className="mt-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-sm font-medium">User</Text>
          <Text className="text-sm text-gray-500">+62 123456789</Text>
        </View>
        <View className="mt-1 flex-row items-center">
          <Text className="text-base text-gray-700">Jl. Jalan</Text>
        </View>
      </View>
    </View>
  )
}