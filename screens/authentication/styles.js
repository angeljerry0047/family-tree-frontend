import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const shared = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: '#f5f5f5'
    },
    container: {
      backgroundColor: '#f5f5f5'
    },
    flexRow: {
      flexDirection: 'row'
    },
    content: {
      flexGrow: 1
    },
    centered: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    section: {
      flex: 0.33
    },
    logo: {
      width: 175,
      height: 175
    },
    title: {
      fontSize: 22,
      marginTop: 15,
      color: '#59686b'
    },
    submitButtonText: {
      color: 'white',
      textAlign: 'center'
    }
  });

  const signUp = StyleSheet.create({
    prompt: {
      marginBottom: 50,
      paddingLeft: 50,
      paddingRight: 50
    },
    countryPickerItem: {
      borderBottomColor: Colors.themeColor
    },
    countryPicker: {
      width:  Dimensions.get('window').width - 40
    },
    phoneNumberItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      width:  Dimensions.get('window').width - 40,
      borderBottomColor: Colors.themeColor
    },
    countryCode: {
      flex: 0.20,
      borderRightWidth: 1,
      borderStyle: 'solid',
      borderRightColor: Colors.themeColor
    },
    phoneNumber: {
      flex: 0.80,
      paddingLeft: 10
    },
    submitButton: {
      paddingRight: 65,
      paddingLeft: 65,
      backgroundColor: Colors.themeColor,
      alignSelf: 'center'
    },
  });

  const verify = StyleSheet.create({
    verifyPrompt: {
      flex: 0.14,
      marginRight: 50,
      marginLeft: 50
    },
    verifyPromptTitle: {
      fontSize: 18,
      marginBottom: 25
    },
    verifyInputLabel: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    verifyInput: {
      flex: 0
    },
    submitButtonFloat: {
      backgroundColor: Colors.themeColor,
      alignSelf: 'center',
      flex: 1,
      marginRight: 10,
      marginLeft: 10
    },
    cancelButton: {
      backgroundColor: '#adb5bd'
    },
    resendBtnText: {
      color: '#007bff'
    }
  });

  export default {
    ...shared,
    ...signUp,
    ...verify
  }