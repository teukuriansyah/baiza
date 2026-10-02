import { Tabs } from "expo-router";
import Navbar from "../components/Navbar"
import "../../global.css"

export default function RootLayout() {
  return(
    <Tabs>
      <Tabs.Screen name="index" options={{ title:"Home"}} />
      <Tabs.Screen name="notification" options={{ title:"Notification"}} />
      <Tabs.Screen name="order" options={{ title:"Order"}} />
      <Tabs.Screen name="profile" options={{ title:"Profile", header:() => <Navbar title="Profile" />}} />
    </Tabs>
  );
}
