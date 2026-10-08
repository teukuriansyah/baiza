import { View, Text, ScrollView } from 'react-native';
import { getOrderHistory } from '@/services/UserServices';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import ListOrder from "../components/ListOrder"

const order = () => {
  const [dataOrder, setDataOrder] = useState([])

  const fetching = async() => {
    const { items } = await getOrderHistory()
    setDataOrder(items)
  }
  useFocusEffect(
    useCallback(() => {
      fetching();
    }, [fetching])
  );
  return (
    <ScrollView>
      <View className="px-5 py-3">
        <View>
          <Text className="text-lg font-medium">Past Deliveries</Text>
        </View>
        <View className='gap-2'>
          {dataOrder?.map((d:any,i:number) => <ListOrder key={i} image={d.imageUrl} title={d.name} price={d.price} context={d?.description} date={d.createdAt.toLocaleString("id-ID")}/>)}
        </View>
      </View>
    </ScrollView>
  );
};

export default order;