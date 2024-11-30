import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddNotificationInputTime = () => {
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');

  // 時間と分の選択肢
  const hours = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', 
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
  ];
  const minutes = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', 
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',
    '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35',
    '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47',
    '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
  ];

  const handleSave = () => {
    alert(`選択した時間: ${selectedHour}:${selectedMinute}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>時間を選択してください</Text>
      <View style={styles.pickerContainer}>
        {/* 時間 Picker */}
        <Picker
          selectedValue={selectedHour}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedHour(itemValue)}
        >
          {hours.map((hour, index) => (
            <Picker.Item key={index} label={hour} value={hour} />
          ))}
        </Picker>

        <Text style={styles.colon}>:</Text>

        {/* 分 Picker */}
        <Picker
          selectedValue={selectedMinute}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMinute(itemValue)}
        >
          {minutes.map((minute, index) => (
            <Picker.Item key={index} label={minute} value={minute} />
          ))}
        </Picker>
      </View>
      {/* <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>保存</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  picker: {
    width: 100,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  colon: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#333',
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

export default AddNotificationInputTime;
