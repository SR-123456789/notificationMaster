import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AddNotificationSlectBottom from "../AddNotification/AddNotificationSelectBottom";
import AddNotificationInputWebPage from "../AddNotification/AddNotificationInputWebPage";
import AddNotificationSelectLocation from "../AddNotification/AddNotficationSelecrLocation";
import AddNotificationInputTime from "../AddNotification/AddNotficationInputTime";

interface AddNotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNotificationDialog = ({
  isOpen,
  onClose,
}: AddNotificationDialogProps) => {
  useEffect(() => {
    if (isOpen) openModal();
    if (!isOpen) closeModal;
  }, [isOpen]);

  const [visible, setVisible] = useState(isOpen);
  const slideAnim = useRef(new Animated.Value(1000)).current; // useRefで保持し続ける
  const [showNotificationMethod, setShowNotificationMethod] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"" | "clock" | "location">("");

  const openModal = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // 表示位置
      duration: 300, // アニメーション時間
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 1000, // 非表示位置
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
    onClose();
  };

  const onInputUrl = (url: string) => {
    setShowNotificationMethod(true);
  }

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
            >
              <Text
                style={{ color: "#059669", fontWeight: "bold", fontSize: 16 }}
              >
                　保存　
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{paddingHorizontal:20}}>
            <AddNotificationInputWebPage onInputUrl={onInputUrl}/>
            <AddNotificationSlectBottom isShow={showNotificationMethod} onSelectMode={setSelectedMethod}/>
            {selectedMethod === "clock" && <AddNotificationInputTime />}
            {selectedMethod === "location" &&<AddNotificationSelectLocation />}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
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
