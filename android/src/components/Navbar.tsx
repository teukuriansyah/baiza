import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router"
import { ShoppingCart } from 'lucide-react-native'

interface Props {
  title:string
}

const Navbar = (props: Props) => {
  return (
    <SafeAreaView className="px-5 flex-row justify-between items-center">
      <Text className="text-2xl font-medium">{props.title}</Text>
      <Link href="/cart">
        <ShoppingCart size={24} color="#000000" />
      </Link>
    </SafeAreaView>
  );
};

export default Navbar;