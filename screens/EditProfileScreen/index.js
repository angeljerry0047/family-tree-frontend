import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Item, Picker, Icon } from 'native-base';
import Colors from '../../constants/Colors';
import styles from './styles';
import FormTextInput from './FormTextInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios';

import individualService from '../../services/individualsService';
import i18n from '../../services/i18nService';
import commonConstants from '../commonConstants';

export default class EditProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        const person = this.props.route.params?.person || {};
        this.state = {
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName,
            dateOfBirth: person.dateOfBirth ? new Date(person.dateOfBirth) : null,
            dateOfDeath: person.dateOfDeath ? new Date(person.dateOfDeath) : null,
            placeOfBirth: person.placeOfBirth,
            phoneNumber: person.phoneNumber,
            email: person.email,
            education: person.education,
            occupation: person.occupation,
            gender: person.gender,
            isDeceased: person.isDeceased,
            isBirthDateTimePickerVisible: false,
            isDeathDateTimePickerVisible: false,
            countryCode: person.countryCode
        };
        this._showBirthDateTimePicker = () => this.setState({ isBirthDateTimePickerVisible: true });

        this._hideBirthDateTimePicker = () => this.setState({ isBirthDateTimePickerVisible: false });

        this._handleBirthDatePicked = (date) => {
            this.setState({ dateOfBirth: date });
            this._hideBirthDateTimePicker();
        };

        this._showDeathDateTimePicker = () => this.setState({ isDeathDateTimePickerVisible: true });

        this._hideDeathDateTimePicker = () => this.setState({ isDeathDateTimePickerVisible: false });

        this._handleDeathDatePicked = (date) => {
            this.setState({ dateOfDeath: date });
            this._hideDeathDateTimePicker();
        };
        this.save = () => {
            const updatedUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dateOfBirth: this.state.dateOfBirth,
                dateOfDeath: this.state.dateOfDeath,
                placeOfBirth: this.state.placeOfBirth,
                phoneNumber: this.state.phoneNumber,
                emailAddress: this.state.email,
                education: this.state.education,
                occupation: this.state.occupation,
                gender: this.state.gender === 'Male' ? 0 : 1,
                isDeceased: this.state.isDeceased,
                id: this.state.id,
                countryCode: this.state.countryCode
            };
            const addChildMode = this.props.route.params?.addChild || false;
            const screensToPop = this.props.route.params?.stacksToPopOnSuccess || 1;
            if(addChildMode) {
                const parentId = this.props.route.params?.addTo;

                return axios.post(`/individuals`, updatedUser)
                    .then(response => {
                        const newUser = response.data;
                        return axios.post(`/relationships/children`, {
                            parentId,
                            childId: newUser.id
                        });
                    })
                    .then(() => this.props.navigation.pop(screensToPop))
                    .catch(function(err) {
                        alert('An error occurred: ' + err.message);
                    });;
            }

            const addSourceMode = this.props.route.params?.addSpouse || false;
            if(addSourceMode) {
                const sourceId = this.props.route.params?.addTo;

                return axios.post(`/individuals`, updatedUser)
                    .then(response => {
                        const newUser = response.data;
                        return axios.post(`/relationships/spouses`, {
                            sourceId,
                            spouseId: newUser.id
                        });
                    })
                    .then(() => this.props.navigation.pop(screensToPop))
                    .catch(function(err) {
                        console.info('err', err);
                        alert('An error occurred: ' + err.message);
                    });
            }
            axios.post(`/individuals/update/${this.state.id}`, updatedUser)
                .then(res => {
                    this.props.navigation.goBack();
                })
                .catch(function(err) {
                  alert('An error occurred: ' + err.message);
                });
        };
    }

    componentDidMount() {
        const userId = this.props.route.params?.id;
        if(userId) {
            individualService.getIndividual(userId)
                .then(response => {
                    response.data.dateOfBirth = response.data.dateOfBirth ? new Date(response.data.dateOfBirth) : null;
                    response.data.dateOfDeath = response.data.dateOfDeath ? new Date(response.data.dateOfDeath) : null;
                    this.setState(response.data);
                });
        }
    }

    onGenderChange(value) {
        this.setState({
            gender: value
        });
    }
    onLivingStatusChange(value) {
        this.setState({
            isDeceased: value
        });
    }

    static navigationOptions = ({ route, navigation }) => {
        return {
          title: route.params?.pageTitle,
          headerStyle: {
            backgroundColor: Colors.themeColor,
            borderBottomColor: 'transparent',
            height: 0,
          },
          headerLeft: null
        };
    };
    render() {
        const pageTitle = this.props.route.params?.pageTitle || i18n.t('editProfile');
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={styles.headerText}>{i18n.t('cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {pageTitle}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={this.save}>
                            <Text style={styles.headerText}>{i18n.t('save')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.formContainer}>
                    <FormTextInput header={i18n.t('firstName')} value={this.state.firstName} onChangeText={(text) => this.setState({ firstName: text })} />
                    <FormTextInput header={i18n.t('lastName')} value={this.state.lastName} onChangeText={(text) => this.setState({ lastName: text })} />
                    <View style={styles.formGroup}>
                        <Text style={i18n.withRtlTextStyle([styles.inputLabel])}>{i18n.t('gender')}</Text>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={[i18n.isRtl ? {flexDirection: 'row-reverse'} : {}]}
                                placeholder={i18n.t('selectGender')}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.gender}
                                onValueChange={this.onGenderChange.bind(this)}
                            >
                                <Picker.Item label={i18n.t('genderMale')} value="Male" />
                                <Picker.Item label={i18n.t('genderFemale')} value="Female" />
                            </Picker>
                        </Item>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={i18n.withRtlTextStyle([styles.inputLabel])}>{i18n.t('dateOfBirth')}</Text>
                        <TouchableOpacity onPress={this._showBirthDateTimePicker}>
                            <Text style={i18n.withRtlTextStyle([])}>
                                {this.state.dateOfBirth ? i18n.translateDate(this.state.dateOfBirth) : i18n.t('pickDate')}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            titleIOS={i18n.t('pickDate')}
                            confirmTextIOS={i18n.t('confirm')}
                            cancelTextIOS={i18n.t('cancel')}
                            locale={i18n.locale}
                            date={this.state.dateOfBirth || new Date()}
                            isVisible={this.state.isBirthDateTimePickerVisible}
                            onConfirm={this._handleBirthDatePicked}
                            onCancel={this._hideBirthDateTimePicker}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={i18n.withRtlTextStyle([styles.inputLabel])}>{i18n.t('aliveStatus')}</Text>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={[i18n.isRtl ? {flexDirection: 'row-reverse'} : {}]}
                                placeholder={i18n.t('selectLivingStatus')}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.isDeceased}
                                onValueChange={this.onLivingStatusChange.bind(this)}
                            >
                                <Picker.Item label={i18n.t('deceased')} value={true} />
                                <Picker.Item label={i18n.t('alive')} value={false} />
                            </Picker>
                        </Item>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={i18n.withRtlTextStyle([styles.inputLabel])}>{i18n.t('dateOfDeath')}</Text>
                        <TouchableOpacity onPress={this._showDeathDateTimePicker}>
                            <Text style={i18n.withRtlTextStyle([])}>{this.state.dateOfDeath ? i18n.translateDate(this.state.dateOfDeath) : i18n.t('pickDate')}</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            titleIOS={i18n.t('pickDate')}
                            confirmTextIOS={i18n.t('confirm')}
                            cancelTextIOS={i18n.t('cancel')}
                            locale={i18n.locale}
                            date={this.state.dateOfDeath|| new Date()}
                            isVisible={this.state.isDeathDateTimePickerVisible}
                            onConfirm={this._handleDeathDatePicked}
                            onCancel={this._hideDeathDateTimePicker}
                        />
                    </View>
                    <FormTextInput header={i18n.t('placeOfBirth')} value={this.state.placeOfBirth} onChangeText={(text) => this.setState({ placeOfBirth: text })} />
                    <FormTextInput header={i18n.t('phoneNumber')} value={this.state.phoneNumber} onChangeText={(text) => this.setState({ phoneNumber: text })} />
                    <FormTextInput header={i18n.t('email')} value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                    <FormTextInput header={i18n.t('education')} value={this.state.education} onChangeText={(text) => this.setState({ education: text })} />
                    <FormTextInput header={i18n.t('occupation')} value={this.state.occupation} onChangeText={(text) => this.setState({ occupation: text })} />
                </ScrollView>
            </View>
        );
    }
}