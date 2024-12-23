import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AddNotificationSlectBottom from "../AddNotification/AddNotificationSelectBottom";
import AddNotificationInputWebPage from "../AddNotification/AddNotificationInputWebPage";
import AddNotificationSelectLocation from "../AddNotification/AddNotficationSelecrLocation";
import AddNotificationInputTime from "../AddNotification/AddNotficationInputTime";
import {
  reverseGeocodeWithNominatim,
  setupGeofences,
} from "../../services/locationService";
import { NotificationListItem, NotificationRegion } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { addNotification } from "@/redux/actions/notificationActions";
import { RootState } from "@/redux/store";

const GEOFENCE_TASK = "geofenceTask";

interface AddNotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNotificationDialog = ({
  isOpen,
  onClose,
}: AddNotificationDialogProps) => {
  const dispatch = useDispatch();
  const notificationList = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  useEffect(() => {
    if (isOpen) openModal();
    if (!isOpen) closeModal;
  }, [isOpen]);

  const [visible, setVisible] = useState(isOpen);
  const slideAnim = useRef(new Animated.Value(1000)).current; // useRefで保持し続ける
  const [showNotificationMethod, setShowNotificationMethod] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "" | "clock" | "location"
  >("");
  const [notificationURL, setNotificationURL] = useState("");
  const [notificationTime, setNotificationTime] = useState("");
  const [notificationLocation, setNotificationLocation] = useState<any | null>(
    null
  );

  const openModal = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // 表示位置
      duration: 300, // アニメーション時間
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    // Alert.alert(JSON.stringify(notificationLocation));
    Animated.timing(slideAnim, {
      toValue: 1000, // 非表示位置
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
    onClose();
  };

  const onInputUrl = (url: string) => {
    setNotificationURL(url);
    setShowNotificationMethod(true);
  };

  const addGeofenceRegion = async () => {
    // Todo: 記入されていない情報の追加記載

    const beforeNotificationList = notificationList.filter(
      (item) => item.type === "location" && item.isActive === true
    );

    if (beforeNotificationList.length >= 20) {
      Alert.alert("位置通知の登録は20個までです");
      return;
    }

    const notification: NotificationListItem = {
      type: "location",
      isActive: true,
      title: await reverseGeocodeWithNominatim(
        notificationLocation.latitude,
        notificationLocation.longitude
      ),
      id: uuidv4(),
      notificationID: uuidv4(),
      url: notificationURL,
      time: notificationTime,
      latitude: notificationLocation.latitude,
      longitude: notificationLocation.longitude,
      radius: notificationLocation.radius,
      notifyOnEnter: notificationLocation.notifyOnEnter,
      notifyOnExit: notificationLocation.notifyOnExit,
    };

    dispatch(addNotification(notification));
    beforeNotificationList.push(notification);
    console.log("now", beforeNotificationList);

    // if (!notificationLocation) return;
    // if (!geofences) {
    //   Alert.alert('ジオフェンスを設定してください');
    //   return;
    // }

    setupGeofences(beforeNotificationList, GEOFENCE_TASK);
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 16,
              paddingHorizontal: 20,
              // backgroundColor: "rgba(240, 240, 240, 1)", // 背景色を薄いグレーに
            }}
          >
            {/* キャンセルボタン */}
            <TouchableOpacity
              style={{
                padding: 1,
                borderRadius: 4,
              }}
              onPress={closeModal}
            >
              <Text
                style={{ color: "#059669", fontWeight: "bold", fontSize: 16 }}
              >
                キャンセル
              </Text>
            </TouchableOpacity>

            {/* 中央のテキスト */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              WEB通知の追加
            </Text>

            {/* 保存ボタン */}
            <TouchableOpacity
              style={{
                padding: 1,
                borderRadius: 4,
              }}
              onPress={addGeofenceRegion}
            >
              <Text
                style={{ color: "#059669", fontWeight: "bold", fontSize: 16 }}
              >
                　保存　
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <AddNotificationInputWebPage onInputUrl={onInputUrl} />
            <AddNotificationSlectBottom
              isShow={showNotificationMethod}
              onSelectMode={setSelectedMethod}
            />
            {selectedMethod === "clock" && <AddNotificationInputTime />}
            {selectedMethod === "location" && (
              <AddNotificationSelectLocation
                onLocationSelect={setNotificationLocation}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={addGeofenceRegion}
            >
              <Text style={styles.closeButtonText}>登録</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
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
    backgroundColor: "#F9FAFB",
    paddingVertical: 20,
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
    marginTop: 20,
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

export default AddNotificationDialog;
