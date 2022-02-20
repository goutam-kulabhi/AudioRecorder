import React from "react";
import {View, Text,TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Recorder from "./Recorder";
//import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

const App = () => {

  // if (Platform.OS === 'android') {
  //   try {
  //     const grants = await requestMultiple([
  //       PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  //       PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  //       PERMISSIONS.ANDROID.RECORD_AUDIO,
  //     ]);
  
  //     console.log('write external stroage', grants);
  
  //     if (
  //       grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
  //       'granted' &&
  //       grants['android.permission.READ_EXTERNAL_STORAGE'] ===
  //      'granted' &&
  //       grants['android.permission.RECORD_AUDIO'] ===
  //       'granted'
  //     ) {
  //       console.log('Permissions granted');
  //     } else {
  //       console.log('All required permissions not granted');
  //       return;
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     return;
  //   }
  // }

  return(
    <View style={styles.display}>
      <Recorder />
    </View>
  )
}

const styles = StyleSheet.create({
  display: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  }
});

export default App;