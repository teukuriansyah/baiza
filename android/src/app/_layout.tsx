import { Tabs } from "expo-router";
import Navbar from "../components/Navbar"
import "../../global.css"
import ChildNavbar from "@/components/ChildNavbar";

export default function RootLayout() {
  return(
    <Tabs>
      <Tabs.Screen name="index" options={{ title:"Home"}} />
      <Tabs.Screen name="notification" options={{ title:"Notification"}} />
      <Tabs.Screen name="order" options={{ title:"Order"}} />
      <Tabs.Screen name="profile" options={{ title:"Profile", header:() => <Navbar title="Profile" />}} />
      <Tabs.Screen name="address" options={{ href: null, tabBarStyle: { display: "none" }, header:() => <ChildNavbar title="Address" />}} />
      <Tabs.Screen name="wishlist" options={{ href: null, tabBarStyle: { display: "none" }, header:() => <ChildNavbar title="Wishlist" />}} />
    </Tabs>
  );
}
