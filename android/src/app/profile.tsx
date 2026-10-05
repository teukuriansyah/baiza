import { View, Text } from 'react-native';
import { Link } from "expo-router"
import { useState, useEffect } from "react"
import { getDataUser } from '@/services/UserServices';
import { User, MapPin, Heart, LogOut } from 'lucide-react-native';

const Profile = () => {
  const [user, setUser] = useState<any>()
  const fetchingUser = async() => {
    const userData = await getDataUser()
    setUser(userData?.data)
  }
  
    useEffect(() => {
      fetchingUser()
    },[])
  return (
    <View className="flex-1 bg-gray-100">
      {/* Profile */}
      <View className="px-5 py-3">
        <View className="bg-white rounded-xl p-4 flex-row items-center gap-4">
          <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center">
            <User size={28} color="#6B7280" />
          </View>
          <View className="flex-1">
            <View>
              <Text className="text-xl font-semibold">{user?.name}</Text>
            </View>
            <View className="mt-1">
              <Text className="text-red-700 text-sm">{user?.email}</Text>
              <Text className="text-sm text-gray-600">{user?.hp}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Account hub */}
      <View className="px-5 py-3">
        <View className="mb-2">
          <Text className="text-sm text-gray-600 font-medium">ACCOUNT HUB</Text>
        </View>
        <View className="px-4 py-2 bg-white rounded-xl">
          <Link href="/address">
            <View className="border-b border-gray-200 py-3 flex-row gap-3 items-center">
              <MapPin size={22} color="#374151" />
              <View className="flex-1">
                <Text className="text-base font-semibold">Saved Addresses</Text>
                <Text className="text-xs text-gray-400">Real-time driver tracker flash deals</Text>
              </View>
            </View>
          </Link>
          <Link href="/wishlist">
            <View className="border-b border-gray-200 py-3 flex-row gap-3 items-center">
              <Heart size={22} color="#374151" />
              <View className="flex-1">
                <Text className="text-base font-semibold">My Favorites</Text>
                <Text className="text-xs text-gray-400">Real-time driver tracker flash deals</Text>
              </View>
            </View>
          </Link>
        </View>
      </View>

      {/* Logout */}
      <View className="px-5 py-3">
        <View className="py-4 bg-white rounded-xl flex-row items-center justify-center gap-2">
          <LogOut size={20} color="#DC2626" />
          <Text className="text-red-600 font-semibold text-base">Log out from account</Text>
        </View>
      </View>
      
    </View>
  );
};

export default Profile;
