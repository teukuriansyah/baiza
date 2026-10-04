import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Home, Bell, ShoppingBag, User, LucideIcon } from "lucide-react-native";
import Navbar from "../components/Navbar";
import ChildNavbar from "@/components/ChildNavbar";
import "../../global.css";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, tabBarStyle: { height: 65, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#E5E7EB", elevation: 0, shadowOpacity: 0 }, tabBarItemStyle: { justifyContent: "center", alignItems: "center" } }}>
      <Tabs.Screen name="index" options={{ title: "Home", header: () => <Navbar title="Home" />, tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={Home} label="Home" /> }} />
      <Tabs.Screen name="notification" options={{ title: "Notification", header: () => <Navbar title="Notification" />, tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={Bell} label="Notification" /> }} />
      <Tabs.Screen name="order" options={{ title: "Order", header: () => <Navbar title="Order History" />, tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={ShoppingBag} label="Order" /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", header: () => <Navbar title="Profile" />, tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={User} label="Profile" /> }} />
      <Tabs.Screen name="detailMenu/[id]" options={{ href: null, headerShown: false, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="search" options={{ href: null, tabBarStyle: { display: "none" }, header: () => <ChildNavbar title="Search" /> }} />
      <Tabs.Screen name="address" options={{ href: null, tabBarStyle: { display: "none" }, header: () => <ChildNavbar title="Address" /> }} />
      <Tabs.Screen name="wishlist" options={{ href: null, tabBarStyle: { display: "none" }, header: () => <ChildNavbar title="Wishlist" /> }} />
      <Tabs.Screen name="cart" options={{ href: null, tabBarStyle: { display: "none" }, header: () => <ChildNavbar title="Cart" /> }} />
      <Tabs.Screen name="checkout" options={{ href: null, tabBarStyle: { display: "none" }, header: () => <ChildNavbar title="Checkout" /> }} />
    </Tabs>
  );
}

function TabItem({ focused, Icon, label }: { focused: boolean; Icon: LucideIcon; label: string }) {
  const iconColor = focused ? "#FFFFFF" : "#8B4513";
  return (
    <View className={`flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[60px] ${focused ? "bg-red-600" : "bg-transparent"}`}>
      <Icon size={18} color={iconColor} />
      <Text className={`text-[10px] leading-3 text-center mt-1 ${focused ? "text-white font-semibold" : "text-[#8B4513] font-normal"}`} numberOfLines={1}>{label}</Text>
    </View>
  );
}