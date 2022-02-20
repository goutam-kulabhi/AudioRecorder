import React, {Component, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob'

// const audioRecorderPlayer = new AudioRecorderPlayer();

export default class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
   // this.audioRecorderPlayer.setSubscriptionDuration(0.09);
  }

  callApi = () => {

    RNFetchBlob.fetch('POST', 'https://eowwiem239m5ucq.m.pipedream.net', {
    //Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, [
    // part file from storage
    { name : 'audio', filename : 'vid.mp4', data: RNFetchBlob.wrap('file:////data/user/0/com.audiorecorder/cache/sound.mp4')},
    
    
  ]).then((resp) => {
    console.log("success "+ resp)
  }).catch((err) => {
    console.log("error "+ err)
  })





    // return fetch('https://eowwiem239m5ucq.m.pipedream.net',{
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       firstParam: 'yourValue',
    //       secondParam: 'yourOtherValue'
    //     })
    //   })
    // .then((response) => response.json())
    // .then((json) => {
    //   console.log(json)
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  onStartRecord = async () => {
    if (Platform.OS === 'android') {
        try {
          const grants = await requestMultiple([
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
          ]);
      
          console.log('write external stroage', grants);
      
          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            'granted' &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
           'granted' &&
            grants['android.permission.RECORD_AUDIO'] ===
            'granted'
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    const path = 'hello.mp4';
    // const audioSet = {

    //   AudioEncoderAndroid: AudioEncoderAndroidType.AAC,

    //   AudioSourceAndroid: AudioSourceAndroidType.MIC,

    //   AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,

    //   AVNumberOfChannelsKeyIOS: 2,

    //   AVFormatIDKeyIOS: AVEncodingOption.aac,

    // };

    // console.log('audioSet', audioSet);

    const uri = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener(e => {
       // console.log("e " + JSON.stringify(e))
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
    });
    console.log(`uri: ${uri}, recordTime: ${this.state.recordTime}, recordSecs: ${this.state.recordSecs}`);
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();

    this.audioRecorderPlayer.removeRecordBackListener();

    this.setState({
      recordSecs: 0,
    });

    console.log(result + this.state.recordTime);
  };

  render() {
    return (
      <View>
        <Text>Recorder</Text>
        <Text>{this.state.recordTime}</Text>
        <TouchableOpacity
          onPress={() => this.onStartRecord()}
          style={styles.recordButton}>
          <Text>Start Record</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.onStopRecord()}
          style={styles.recordButton}>
          <Text>Stop Record</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.callApi()}
          style={styles.recordButton}>
          <Text>Call Api</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  recordButton: {
    height: 30,
    width: 100,
    backgroundColor: '#8C5376',
    marginTop: 30
  },
});
