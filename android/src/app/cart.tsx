import { View, Text, ScrollView } from 'react-native';
import { Link } from "expo-router"
import CartList from "../components/CartList";

const Cart = () => {
  return (
    <View className="flex-1 relative">
      
      <ScrollView contentContainerClassName="pb-24">
        {/* Title */}
        <View className="px-5 py-3">
          <Text className="text-3xl font-semibold">Your Cart</Text>
        </View>

        {/* Cart */}
        <View className="px-5 py-3 gap-5">
          <CartList />
          <CartList />
          <CartList />
          <CartList />
          <CartList />
          <CartList />
        </View>
      </ScrollView>

      {/* Total price / Bottom Bar */}
      <View className="bg-white px-5 py-3 flex-row h-20 items-center justify-between absolute bottom-0 w-full border-t border-gray-100">
        <View>
          <Text className="text-red-900 text-sm">Total Payment</Text>
          <Text className="text-red-600 font-bold text-2xl">Rp. Price</Text>
        </View>
        <View>
          <View className="bg-red-600 rounded-full px-5 py-3">
            <Link href="/checkout">
              <Text className="text-white font-medium">Proceed to checkout</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cart;
