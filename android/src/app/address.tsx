import { View, Text, ScrollView, Pressable } from 'react-native'
import { MapPin, Navigation } from 'lucide-react-native'
import { useState, useEffect } from "react"
import { getDataUser } from '@/services/UserServices';
import * as Location from 'expo-location';
import CardAddress from '@/components/CardAddress'

export default function Address() {
  const [user, setUser] = useState<any>()
  const [location,setLocation] = useState<Location.LocationObject | null>(null)
  const [err, setErr] = useState<any>()

  async function getCurrentLocation() {  
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErr('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
  }

  const fetchingUser = async() => {
    const userData = await getDataUser()
    setUser(userData?.data)
  }

  useEffect(() => {
    fetchingUser()
  },[])
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
                  Lat: {location?.coords.latitude}, Lng : {location?.coords.longitude}
                </Text>
              </View>

              <View className="mt-4">
                <Pressable onPress={() => getCurrentLocation()} className="flex-row items-center justify-center gap-2 rounded-full bg-red-800 px-4 py-3">
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
        <CardAddress user={user?.name} address={user?.address} hp={user?.hp}/>
      </View>
    </ScrollView>
  )
}