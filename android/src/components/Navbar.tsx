import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title:string
}

const Navbar = (props: Props) => {
  return (
    <SafeAreaView className="px-5">
      <Text className="text-2xl font-medium">{props.title}</Text>
    </SafeAreaView>
  );
};

export default Navbar;