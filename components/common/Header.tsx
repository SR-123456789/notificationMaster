import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setDeleteMode } from "@/redux/actions/commonActions";

interface HeaderProps {
  title: string;
  onCreateNotification: () => void;
}

const Header = ({ title, onCreateNotification }:HeaderProps) => {
const isDeleteMode = useSelector((state: RootState) => state.common.isDeleteMode);
  const dispatch = useDispatch();
  return (
    <View style={{ height: 50, paddingTop: 5, backgroundColor: "" }}>
      <Text style={{ textAlign: "center", fontWeight: "500", fontSize: 16 }}>
        {title}
      </Text>
      <TouchableOpacity style={{ position: "absolute", right: 15, top: 2 }} onPress={()=>onCreateNotification()}>
        <FontAwesome6 name="add" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>dispatch(setDeleteMode(!isDeleteMode))} style={{ position: "absolute", left: 15, top: 4 }}>
        <Text style={{ fontSize: 18, color: "black" }}>編集</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
