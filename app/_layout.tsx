import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import utilities from "../tailwind.json";
import * as Notifications from "expo-notifications";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TailwindProvider } from "tailwind-rn";
import { requestNotificationPermission } from "@/services/notificationService";
import { defineGeofenceTask } from "@/services/taskManager";

// Prevent the splash screen from auto-hiding before asset loading is complete.

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();
const GEOFENCE_TASK = "geofenceTask";
export default function RootLayout() {
  useEffect(() => {
    // 通知権限をリクエスト
    requestNotificationPermission();

    // Geofenceのタスクを定義
    defineGeofenceTask(GEOFENCE_TASK);
  }, []);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TailwindProvider utilities={utilities}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TailwindProvider>
  );
}
