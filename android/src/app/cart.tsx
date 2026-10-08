import { View, Text, ScrollView } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { getCart, deleteCart, putCart } from "../services/UserServices";
import { useState, useCallback } from "react";
import CartList from "../components/CartList";

const Cart = () => {
  const [dataCart, setDataCart] = useState<any[]>([]);

  const fetching = useCallback(async () => {
    try {
      const { data } = await getCart();
      setDataCart(data || []);
    } catch (error) {
      console.error("Cart error:", error);
    }
  }, []);

  const deleteItem = async (id: string) => {
    try {
      await deleteCart(id);
      setDataCart((prev) => prev.filter((item) => String(item.idMenu) !== String(id)));
    } catch (error) {
      console.error("Delete cart error:", error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      await putCart(id, quantity);
      setDataCart((prev) => prev.map((item) => String(item.idMenu) === String(id) ? { ...item, quantity } : item));
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const onPressMinus = (id: string, quantity: number) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const onPressPlus = (id: string, quantity: number) => {
    updateQuantity(id, quantity + 1);
  };

  useFocusEffect(
    useCallback(() => {
      fetching();
    }, [fetching])
  );

  const totalPrice = dataCart.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <View className="flex-1 relative">
      <ScrollView contentContainerClassName="pb-24">
        <View className="px-5 py-3">
          <Text className="text-3xl font-semibold">Your Cart</Text>
        </View>

        <View className="px-5 py-3 gap-5">
          {dataCart.map((d) => (
            <CartList
              key={d.idMenu}
              title={d.name}
              image={d.imageUrl}
              quantity={d.quantity}
              price={d.price}
              deleteItem={() => deleteItem(d.idMenu)}
              onPressMinus={() => onPressMinus(d.idMenu, d.quantity)}
              onPressPlus={() => onPressPlus(d.idMenu, d.quantity)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="bg-white w-full px-5 py-3 flex-row h-20 items-center justify-between absolute bottom-0 border-t border-gray-100">
        <View>
          <Text className="text-red-900 text-sm">Total Payment</Text>
          <Text className="text-red-600 font-bold text-2xl">Rp. {totalPrice.toLocaleString("id-ID")}</Text>
        </View>

        <View className="bg-red-600 rounded-full px-5 py-3">
          <Link href="/checkout">
            <Text className="text-white font-medium">Proceed to checkout</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Cart;
