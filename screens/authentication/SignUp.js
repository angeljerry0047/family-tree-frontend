import React from 'react';
import i18n from '../../services/i18nService';
import { View, Image, Text } from 'react-native';
import { Icon, Picker, Form, Item, Input, Button } from "native-base";
import { signUp } from '../../services/authenticationService';
import { getTranslatedName, countries } from '../../services/countriesService';
import AuthContainer from './AuthContainer';
import styles from './styles';


export default class SignUp extends React.Component {

  state = {
    country: 'US',
    phoneNumber: null
  }

  updateCountry = (country) => {
    this.setState({ country: country })
  }

  onPhoneNumberChange = (number) => {
    this.setState({ phoneNumber: number });
  }

  renderPickerItems = () => {
    return Object.keys(countries).map(key => {
      return (
        <Picker.Item
          label={getTranslatedName(key, i18n.locale)}
          value={key} key={key}
        />
      );
    });
  }

  phoneDetails = () => {
    const { country, phoneNumber } = this.state;
    return {
      countryCode: Number(countries[country].phone),
      phoneNumber: String(i18n.parseArabicNumber(phoneNumber))
    };
  }

  submit = () => {
    const { country, phoneNumber } = this.state;
    if (country && phoneNumber) {
      const reqBody = this.phoneDetails();
      signUp(reqBody)
        .then(_ => {
          this.verify();
        })
        .catch(e => {
          console.log(e.response)
          alert(e.response.data.Error);
        });
    } else {
      alert(i18n.t('incompleteFormError'));
    }
  }

  verify = () => {
    const { navigate } = this.props.navigation;
    navigate('Verify', { phoneDetails: this.phoneDetails() });
  }

  translatedCountryCode = () => {
    return `+${i18n.translateNumber(countries[this.state.country].phone)}`
  }

  render() {
    return (
      <AuthContainer>
        <View style={[styles.centered, styles.section]}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>{ i18n.t('appName') }</Text>
        </View>
        <Form style={[styles.centered, styles.section]}>
          <Text style={styles.prompt}>
            { i18n.t('confirmCountryCodePrompt') }
          </Text>
          <Item picker style={styles.countryPickerItem}>
            <Picker
              style={[styles.countryPicker, i18n.isRtl ? {flexDirection: 'row-reverse'} : {}]}
              mode="dropdown"
              iosIcon={
                <Icon name={i18n.isRtl ? "arrow-back" : "arrow-forward"} />
              }
              selectedValue={this.state.country}
              onValueChange={this.updateCountry}
            >
              {this.renderPickerItems()}
            </Picker>
          </Item>
          <Item last style={styles.phoneNumberItem}>
            <Input
              style={styles.countryCode}
              value={this.translatedCountryCode()}
              disabled
            />
            <Input
              style={styles.phoneNumber}
              keyboardType="phone-pad"
              placeholder={i18n.t('phoneInputPlaceholder')}
              onChangeText={this.onPhoneNumberChange}
            />
          </Item>
        </Form>
        <View style={[styles.centered, styles.section]}>
          <Button rounded style={styles.submitButton} onPress={this.submit}>
            <Text style={styles.submitButtonText}>{ i18n.t('sendCodeCta') }</Text>
          </Button>
        </View>
      </AuthContainer>
    );
  }
}
