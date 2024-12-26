import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Dialog from "react-native-dialog";

interface NotificationCommonSettingProps {
  notificationSentence: string;
  setNotificationSentence: (sentence: string) => void;
  notificationTitle: string;
  setNotificationTitle: (title: string) => void;
}

const NotificationCommonSetting = ({notificationSentence,setNotificationSentence,notificationTitle,setNotificationTitle}:NotificationCommonSettingProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [inputTitle, setInputTitle] = useState("");

  const titleInputRef = useRef<TextInput>(null); // TextInput の参照を作成


  const handleSave = () => {
    setNotificationTitle(inputTitle); // 入力したタイトルを設定
    setIsDialogVisible(false); // ダイアログを閉じる
  };

  const OpenTitleDialolg=()=>{
    setInputTitle(notificationTitle)
    setIsDialogVisible(true)
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
  }

  const [isDialogVisibleSentence, setIsDialogVisibleSentence] = useState(false);
  const [inputSentence, setInputSentence] = useState("");

  const sentenceInputRef = useRef<TextInput>(null); // TextInput の参照を作成


  const sentenceHandleSave = () => {
    setNotificationSentence(inputSentence); // 入力したタイトルを設定
    setIsDialogVisibleSentence(false); // ダイアログを閉じる
  };

  const OpenSentenceDialolg=()=>{
    setInputSentence(notificationSentence)
    setIsDialogVisibleSentence(true)
    setTimeout(() => {
      sentenceInputRef.current?.focus();
    }, 100);
  }

  return (
    <>
      <View>
        <View
          style={{
            justifyContent: "space-between",
            paddingHorizontal: 20,
            backgroundColor: "rgba(240, 240, 240, 1)",
            borderRadius: 4,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 1,
              alignItems: "center",
              height: 40,
              flexDirection: "row",
            }}
            onPress={() => OpenTitleDialolg()}
          >
            <Text style={{ fontSize: 16 }}>通知タイトル</Text>
            <Text style={{ marginLeft: "auto", color: "gray" }}>
              {notificationTitle} {">"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 1,
              alignItems: "center",
              height: 40,
              flexDirection: "row",
            }}
            onPress={() => OpenSentenceDialolg()}
          >
            <Text style={{ fontSize: 16 }}>通知詳細文</Text>
            <Text style={{ marginLeft: "auto", color: "gray" }}>
              {notificationSentence} {">"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ダイアログ */}
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>通知タイトルを設定</Dialog.Title>
        <Dialog.Description>
          通知に使用するタイトルを入力してください。
        </Dialog.Description>
        <TextInput
          ref={titleInputRef} // ref を設定
          style={styles.input}
          placeholder="例: 大阪駅時刻表"
          value={inputTitle}
          onChangeText={(text) => setInputTitle(text)}
          onFocus={() => {
            // フォーカス時に全選択状態にする
            titleInputRef.current?.setNativeProps({
              selection: { start: 0, end: inputTitle.length },
            });
          }}
        />
        <Dialog.Button
          label="キャンセル"
          onPress={() => setIsDialogVisible(false)}
        />
        <Dialog.Button label="保存" onPress={handleSave} />
      </Dialog.Container>

      <Dialog.Container visible={isDialogVisibleSentence}>
        <Dialog.Title>通知タイトルを設定</Dialog.Title>
        <Dialog.Description>
          通知に使用する詳細文を入力してください。
        </Dialog.Description>
        <TextInput
          ref={sentenceInputRef} // ref を設定
          style={styles.input}
          placeholder="例: 検索する手間省けたね"
          value={inputSentence}
          onChangeText={(text) => setInputSentence(text)}
          onFocus={() => {
            // フォーカス時に全選択状態にする
            sentenceInputRef.current?.setNativeProps({
              selection: { start: 0, end: inputSentence.length },
            });
          }}
        />
        <Dialog.Button
          label="キャンセル"
          onPress={() => setIsDialogVisibleSentence(false)}
        />
        <Dialog.Button label="保存" onPress={sentenceHandleSave} />
      </Dialog.Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  touchable: {
    padding: 1,
    alignItems: "center",
    height: 40,
    flexDirection: "row",
  },
  input: {
    height: 30,
    borderWidth: 1,
    borderColor: "rgba(220,220,226,1)",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(229,229,233,1)",
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
  },
});

export default NotificationCommonSetting;
