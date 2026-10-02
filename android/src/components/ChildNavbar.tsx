import { View, Text } from 'react-native'
import { Link } from "expo-router"
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft } from 'lucide-react-native'

interface Props {
  title: string
}

export default function ChildNavbar(props: Props) {
  return (
    <SafeAreaView edges={['top']}>
      <View className="flex-row items-center gap-3 px-5 py-2">
        <Link href="/profile" asChild>
          <ArrowLeft size={24} color="#000000" />
        </Link>
        <Text className="text-xl font-semibold text-gray-900">
          {props.title}
        </Text>
      </View>
    </SafeAreaView>
  )
}