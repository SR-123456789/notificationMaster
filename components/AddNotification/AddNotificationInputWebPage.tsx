import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Clipboard from 'expo-clipboard'; // ExpoクリップボードAPI

const AddNotificationInputWebPage = ({ onInputUrl }) => {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);

  const validateUrl = (input) => {
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/;
    return urlPattern.test(input);
  };

  const handleInputChange = (text) => {
    setUrl(text);
    const isValid = validateUrl(text);
    setIsValidUrl(isValid);

    if (isValid) {
      onInputUrl && onInputUrl(text); // propsで渡された関数を呼び出し
    }
  };

  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getStringAsync();
    handleInputChange(clipboardContent); // クリップボードの内容を直接入力欄に設定
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>WEBページのURLを入力してください</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="例: https://example.com"
          placeholderTextColor="#999"
          value={url}
          onChangeText={handleInputChange}
          autoCapitalize="none" // 自動で大文字にしない
          autoCorrect={false} // 自動補正を無効化
          keyboardType="url" // URL入力用のキーボードを使用
        />
        <TouchableOpacity style={styles.pasteButton} onPress={handlePaste}>
          <Text style={styles.pasteButtonText}>ペースト</Text>
        </TouchableOpacity>
      </View>
      {!isValidUrl && url.length > 0 && (
        <Text style={styles.errorText}>有効なURLを入力してください。</Text>
      )}
      {isValidUrl && (
        <View style={styles.preview}>
          <View style={styles.webViewContainer}>
            <WebView
              source={{ uri: url }}
              style={styles.webView}
              onError={() => setIsValidUrl(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#333',
  },
  pasteButton: {
    marginLeft: 10,
    backgroundColor: '#34D399',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  pasteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 10,
  },
  preview: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  previewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 10,
  },
  webViewContainer: {
    width: Dimensions.get('window').width * 0.9, // 画面幅の90%
    height: 200, // 小窓の高さ
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  webView: {
    flex: 1,
  },
});

export default AddNotificationInputWebPage;
