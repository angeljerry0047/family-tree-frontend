import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import styles from './styles';
import ProfileDetail from './ProfileDetail';
import ProfileImage from './ProfileImage';
import axios from 'axios';
import {userInfo} from '../../services/authenticationService';
import i18n from '../../services/i18nService';
import commonConstants from '../commonConstants';

class ProfileScreen extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.themeColor,
            borderBottomColor: 'transparent',
            height: 0,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            person: null,
        };
    }

    componentDidMount() {
        this.fetchData();
        this.focusListener = this.props.navigation.addListener('focus', this.fetchData);
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    fetchData = () => {
        axios.get(`/individuals/${userInfo.id}`)
            .then(res => {
                const person = res.data;
                this.setState({ person });
            });
    }

    getText = (value) => {
        return ((value == null || value === '') ? '' : value);
    }
    render() {
        const { person } = this.state;
        const { getText } = this;
        if (!this.state.person) { return null; }

        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <View style={styles.topViewRows}>
                        <View style={styles.topViewLeftContainer}>
                            <View style={styles.famliyIdContainer}>
                                <View>
                                    <Text style={styles.headerIds}>#{getText(person.trackingNumber)}</Text>
                                </View>
                                <View>
                                    <Text style={styles.headerText}>{i18n.t('trackingNumber')}</Text>
                                </View>
                            </View>
                            <View style={styles.shareButtonContainer}>
                                <TouchableOpacity style={styles.button}><Text style={styles.headerText}>{i18n.t('share')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.topViewMiddleContainer}>
                            <ProfileImage url={person.url} />

                        </View>
                        <View style={styles.topViewRightContainer}>
                            <View style={styles.generationIdContainer}>
                                <View>
                                    <Text style={styles.headerIds}>#{getText(person.familyNumber)}</Text>
                                </View>
                                <View>
                                    <Text style={styles.headerText}>{i18n.t('familyNumber')}</Text>
                                </View>
                            </View>
                            <View style={styles.editInfoButtonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => { this.props.navigation.push('EditProfile', { person: this.state.person }) }}>
                                    <Text style={styles.headerText}>
                                        {i18n.t('editInfo')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View styles={styles.profileNameContainer}><Text style={styles.headerIds}>{getText(person.name)}</Text></View>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.personalInfoContainer} elevation={5}>
                        <ProfileDetail
                            header={i18n.t('gender')}
                            data={i18n.t(`gender${getText(person.gender)}`)}
                            itemStyle={styles.personalInfoListItem}
                        />
                        <ProfileDetail
                            header={i18n.t('email')}
                            data={getText(person.email)}
                            itemStyle={styles.personalInfoListItem}
                        />
                        <ProfileDetail
                            header={i18n.t('phoneNumber')}
                            data={i18n.translatePhoneNumber(getText(person.phoneNumber))}
                            itemStyle={styles.personalInfoListItem}
                        />
                        <ProfileDetail
                            header={i18n.t('dateOfBirth')}
                            data={i18n.translateDate(getText(person.dateOfBirth))}
                            itemStyle={styles.personalInfoListItem}
                        />
                        <ProfileDetail
                            header={i18n.t('placeOfBirth')}
                            data={getText(person.placeOfBirth)}
                            itemStyle={styles.personalInfoListItem}
                        />
                    </View>
                    <View style={styles.educationContainer} elevation={5}>
                        <ProfileDetail header={i18n.t('education')} data={getText(person.education)} itemStyle={styles.educationInfoListItem} />
                    </View>
                    <View style={styles.occupationContainer} elevation={5}>
                        <ProfileDetail header={i18n.t('occupation')} data={getText(person.occupation)} itemStyle={styles.occupationInfoListItem} />
                    </View>
                    <View style={styles.occupationContainer} elevation={5}>
                        <ProfileDetail header='App Version' data="0.2.0" itemStyle={styles.occupationInfoListItem} />
                    </View>
                </View>
            </View>
        );
    }
}
export default ProfileScreen;