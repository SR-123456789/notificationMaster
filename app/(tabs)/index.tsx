import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArupakaHeaderView } from "react-native-header-arupaka-r";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/common/Header";
import AddNotificationDialog from "@/components/common/AddNotificationDialog";
import NotificationListContainer from "@/components/home/NotificationListContainer";

const GEOFENCE_TASK = "geofenceTask";

const Index = () => {
  const [visibleAddNotificationDialog, setVisibleAddNotificationDialog] =
    useState<boolean>(false);

  return (
    <>
      <ArupakaHeaderView
        headerColor="rgba(52, 211, 153, 0.7)"
        content={() => (
          <Header
            title={"WEB通知一覧"}
            onCreateNotification={() => setVisibleAddNotificationDialog(true)}
          />
        )}
      >
        <NotificationListContainer />
        <View style={{ flex: 1, paddingTop: 32, alignItems: "center" }}>
          {/* 新規WEB通知ボタン */}
          <TouchableOpacity
            style={{ width: 250 }}
            onPress={() => setVisibleAddNotificationDialog(true)}
          >
            <LinearGradient
              colors={["#34D399", "#059669"]} // 緑系グラデーション
              style={{
                padding: 16,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}
              >
                + 新規WEB通知
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ArupakaHeaderView>
      <AddNotificationDialog
        isOpen={visibleAddNotificationDialog}
        onClose={() => setVisibleAddNotificationDialog(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    height: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // Androidの影
    shadowColor: "#000", // iOSの影
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#059669",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Index;
