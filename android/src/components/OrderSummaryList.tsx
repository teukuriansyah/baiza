import { View, Text, Image } from 'react-native'

interface Props {
  title:string;
  quantity:number;
  price:number;
  image:any
}

export default function OrderSummaryList(props:Props) {
  return (
    <View className='flex-row gap-2 w-full rounded-xl'>
      <View>
        <Image source={{ uri:props.image }} className="aspect-square h-16 rounded-xl" />
      </View>
      <View className='flex-1'>
        <View className='flex-row justify-between'>
            <Text className='font-medium text-xl'>{props.quantity} x {props.title?.length > 10 ? `${props.title.slice(0, 10)}...` : props.title}</Text>
            <Text className='font-medium text-xl'>{props.price*props.quantity}</Text>
        </View>
      </View>
    </View>
  )
}