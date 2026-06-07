import {Tabs} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#68D9E3',
            headerStyle: {
                backgroundColor: '#152440'
            },
            headerShadowVisible: false,
            headerTintColor: '#68D9E3',
            tabBarStyle: {
                backgroundColor: '#152440',
            },
        }}
    >  
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={color} />),
            }}
        />
        <Tabs.Screen
            name="about"
            options={{
                title: "About",
                tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? "information-circle" : "information-circle-outline"} size={24} color={color} />),
            }}
        />
        <Tabs.Screen
            name="topic-selection"
            options={{
                title: "Topic Selection",
                tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? "list" : "list-outline"} size={24} color={color} />),
            }}
        />
    </Tabs>
  );
}