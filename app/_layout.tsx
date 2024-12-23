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
import { Provider } from "react-redux";
import store from "@/redux/store";

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
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </TailwindProvider>
    </Provider>
  );
}
