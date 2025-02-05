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
import * as Linking from "expo-linking";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TailwindProvider } from "tailwind-rn";
import { requestNotificationPermission } from "@/services/notificationService";
import { defineGeofenceTask } from "@/services/taskManager";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";

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

  useEffect(() => {
    // 通知タップ時のリスナー設定
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const url = response.notification.request.content.data.url as string;
        if (url) {
          Linking.openURL(url); // URLを開く
        }
      }
    );

    // クリーンアップ: リスナーを解除
    return () => {
      subscription.remove();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}
