import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Home, Bell, ShoppingBag, User, LucideIcon } from "lucide-react-native";
import Navbar from "../components/Navbar";
import ChildNavbar from "@/components/ChildNavbar";
import "../../global.css";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", header:() => <Navbar title="Home"/>, tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={Home} label="Home" /> }} />
      <Tabs.Screen name="detailMenu" options={{ title: "Detail", tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={Home} label="Detail" />, headerShown:false }} />
      <Tabs.Screen name="notification" options={{ title: "Notification", tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={Bell} label="Notification" />, header:() => <Navbar title="Notification"/> }} />
      <Tabs.Screen name="order" options={{ title: "Order", tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={ShoppingBag} label="Order" />, header:() => <Navbar title="Order History"/> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", header: () => <Navbar title="Profile" />, tabBarIcon: ({ focused }) => <TabItem focused={focused} Icon={User} label="Profile" /> }} />
      <Tabs.Screen name="search" options={{ title: "Search", href: null, tabBarStyle: { display: "none" }, header: () => <ChildNavbar title="Search" /> }} />
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
    <View className={`flex-col items-center justify-center py-5 px-3 rounded-xl min-w-[64px] ${focused ? "bg-red-600" : "bg-transparent"}`}>
      <Icon size={20} color={iconColor} />
      <Text className={`text-[10px] leading-3 text-center mt-1 ${focused ? "text-white font-semibold" : "text-[#8B4513] font-normal"}`} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}
