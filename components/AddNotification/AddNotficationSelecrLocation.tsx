import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Keyboard } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Slider from '@react-native-community/slider';

interface AddNotificationSelectLocationProps {
  onLocationSelect: (location: { latitude: number; longitude: number; radius: number }) => void;
}

const AddNotificationSelectLocation = ({ onLocationSelect }: AddNotificationSelectLocationProps) => {
  const [region, setRegion] = useState({
    latitude: 35.6895, // 初期の中心座標（例: 東京）
    longitude: 139.6917,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [radius, setRadius] = useState(200); // 初期の半径（メートル）
  const [searchQuery, setSearchQuery] = useState(''); // 検索クエリ
  const [showPin, setShowPin] = useState(false); // ピンを表示するかどうか
  const markerY = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false); // アニメーションが実行中かどうかを管理

  const handleSearch = async () => {
    try {
      Keyboard.dismiss(); // キーボードを閉じる
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0', // 必須
          },
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        const location = data[0];
        setRegion((prev) => ({
          ...prev,
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
        }));
      } else {
        alert('場所が見つかりませんでした');
      }
    } catch (error: any) {
      alert('エラーが発生しました: ' + error.message);
    }
  };

  const handleRegionChange = useCallback(() => {
    if (!isAnimating.current) {
      isAnimating.current = true; // アニメーション開始
      setShowPin(true); // ピンを表示
      Animated.timing(markerY, {
        toValue: -20, // アイコンが浮く高さ
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [markerY]);

  const handleRegionChangeComplete = useCallback(
    (newRegion: any) => {
      setRegion((prev) => ({
        ...prev,
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: newRegion.latitudeDelta,
        longitudeDelta: newRegion.longitudeDelta,
      }));
      Animated.timing(markerY, {
        toValue: 0, // 元の位置に戻る
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false; // アニメーション終了
        setShowPin(false); // ピンを非表示
      });
      onLocationSelect({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        radius,
        notifyOnExit: false,
        notifyOnEnter: true,
      });
    },
    [markerY]
  );

  const handleRadiusChange = (value: number) => {
    setRadius(value);
    onLocationSelect({
      latitude: region.latitude,
      longitude: region.longitude,
      radius:value,
    });
  };

  const handleSave = () => {
    if (onLocationSelect) {
      onLocationSelect({
        latitude: region.latitude,
        longitude: region.longitude,
        radius,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>場所を選択してください</Text>
      {/* 検索バー */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="地名を入力"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>検索</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChange={handleRegionChange}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {/* 半径を示す円 */}
          <Circle
            center={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            radius={radius}
            strokeColor="rgba(0, 255, 0, 0.5)" // 緑色の枠
            fillColor="rgba(0, 255, 0, 0.2)" // 半透明の緑色
          />
          {/* 地図上に刺さるアイコン */}
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            pinColor="red"
          />
        </MapView>
        {/* 中央アイコンのアニメーション */}
        {showPin && (
          <Animated.View
            style={[
              styles.centerMarker,
              {
                transform: [{ translateY: markerY }],
              },
            ]}
          >
            <Text style={styles.centerMarkerIcon}>📍</Text>
          </Animated.View>
        )}
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>半径: {radius} メートル</Text>
        <Slider
          style={styles.slider}
          minimumValue={50}
          maximumValue={2000}
          step={50}
          value={radius}
          onValueChange={handleRadiusChange}
          minimumTrackTintColor="#34D399"
          maximumTrackTintColor="#D1D5DB"
          thumbTintColor="#34D399"
        />
      </View>
      {/* <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>場所を保存</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#34D399',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '100%',
    height: 300,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centerMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 30, // マーカーの幅
    height: 30, // マーカーの高さ
    marginLeft: -15, // 幅の半分を左に移動
    marginTop: -15, // 高さの半分を上に移動
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerMarkerIcon: {
    fontSize: 30, // アイコンのサイズ
    color: 'red',
  },
  sliderContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  saveButton: {
    backgroundColor: '#34D399',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddNotificationSelectLocation;
