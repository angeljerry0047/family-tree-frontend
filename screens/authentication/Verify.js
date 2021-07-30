import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'native-base';
import AuthContainer from './AuthContainer';
import ConfirmationInput from 'react-native-confirmation-code-input'
import Colors from '../../constants/Colors';
import EvilIcon from '@expo/vector-icons/EvilIcons'
import styles from './styles';
import { signUp, verify, setUserInfo } from '../../services/authenticationService';
import i18n from '../../services/i18nService';
import AppNavigatorContext from '../../navigation/AppNavigatorContext';

export default class Verify extends React.Component {

  state = {
    code: null
  }

  onFulfill = (code) => {
    this.setState({ code: code });
  }

  cancel = () => {
    this.props.navigation.goBack(null)
  }

  verify = (toggleLogin) => {
    const { navigate } = this.props.navigation;
    const { params } = this.props.route;
    const { code } = this.state;
    if (code) {
      const payload = {
        ...params.phoneDetails,
        verificationNumber: parseInt(i18n.parseArabicNumber(code), 10)
      };
      verify(payload)
        .then(res => {
          setUserInfo(res.data.deviceID.toString(), res.data.individualID.toString())
            .then(res => toggleLogin())
        })
        .catch(e => {
          alert(e.response.data.Error);
        })
    } else {
      alert('Please fill out required information.');
    }
  }

  resendCode = () => {
    const { params } = this.props.route;
    signUp(params.phoneDetails)
      .catch(e => alert(e.response.data.Error));
  }

  render() {
    return (
      <AppNavigatorContext.Consumer>
        {
          (({ toggleLogin }) => (
            <AuthContainer>
              <View style={[styles.centered, { flex: 0.20 }]}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>{i18n.t('appName')}</Text>
              </View>
              <View style={[styles.centered, styles.verifyPrompt]}>
                <Text style={styles.verifyPromptTitle}>{i18n.t('verifyDevice')}</Text>
                <Text>{i18n.t('enterVerificationCode')}</Text>
              </View>
              <View style={[styles.centered, styles.section]}>
                <Text style={styles.verifyInputLabel}>{i18n.t('verificationCode')}</Text>
                <ConfirmationInput
                  codeLength={6}
                  secureTextEntry
                  activeColor={Colors.themeColor}
                  inactiveColor='#adb5bd'
                  onFulfill={this.onFulfill}
                  containerStyle={styles.verifyInput}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.centered, styles.section]}>
                <View style={styles.flexRow}>
                  <Button full rounded style={[styles.submitButtonFloat, styles.cancelButton]} onPress={this.cancel}>
                    <Text style={[styles.submitButtonText]}>{i18n.t('cancel')}</Text>
                  </Button>
                  <Button full rounded style={styles.submitButtonFloat} onPress={() => this.verify(toggleLogin)}>
                    <Text style={styles.submitButtonText}>{i18n.t('verifyDevice')}</Text>
                  </Button>
                </View>
                <View>
                  <Button transparent onPress={this.resendCode}>
                    <EvilIcon size={24} name='undo' color='#007bff' />
                    <Text style={styles.resendBtnText}>{i18n.t('sendNewCode')}</Text>
                  </Button>
                </View>
              </View>
            </AuthContainer>

          ))
        }
      </AppNavigatorContext.Consumer>
    );
  }
}