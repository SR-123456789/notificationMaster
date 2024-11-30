import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface AddNotificationSelectBottomProps {
  isShow: boolean;
  onSelectMode: (mode: "clock" | "location") => void;
}

const AddNotificationSelectBottom = ({ isShow,onSelectMode }:AddNotificationSelectBottomProps) => {
  const [selectClock, setSelectClock] = useState(false);
  const [selectLocation, setSelectLocation] = useState(false);

  const onSelectClock = () => {
    setSelectClock(true);
    setSelectLocation(false);
    onSelectMode("clock");
  };
  const onSelectLocation = () => {
    setSelectClock(false);
    setSelectLocation(true);
    onSelectMode("location");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        通知を設定する方法を選択してください
      </Text>
      <View style={styles.buttonContainer}>
        {/* 時刻から設定ボタン */}
        <TouchableOpacity
          onPress={() => onSelectClock()}
          style={[
            styles.button,
            {
              borderColor: selectClock ? "#34D399" : "gray",
            },
          ]}
        >
                    <Text style={{textAlign:"center",fontSize:20,marginVertical:10,color:selectClock ? "#34D399" : "gray",fontWeight:900}}>
            時間
          </Text>
          <Entypo
            name="clock"
            size={130}
            color={selectClock ? "#34D399" : "gray"}
            style={{ position: "absolute", right: -20, bottom: -40 }}
                   />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectLocation()}
          style={[
            styles.button,
            {
              borderColor: selectLocation ? "#34D399" : "gray",
            },
          ]}
        >
          <Text style={{textAlign:"center",fontSize:20,marginVertical:10,color:selectLocation ? "#34D399" : "gray",fontWeight:900}}>
            位置情報
          </Text>
          <FontAwesome6 name="map-location-dot"
                      size={100}

            color={selectLocation ? "#34D399" : "gray"}
            style={{ position: "absolute", right: -15, bottom: -20 }}           />

        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    overflow: "hidden",
    height: 150,
    borderRadius: 8,
    borderWidth: 5,
    marginHorizontal: 10,
    flex: 1,
  },
  gradient: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddNotificationSelectBottom;
