import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const ProfileDetail = (props) => {
    return (
        <View style={props.itemStyle}>
            <Text style={styles.personalInfoItemHeader}>{props.header}</Text>
            <Text style={styles.personalInfoItemData}>{props.data}</Text>
        </View>
    );
}

export default ProfileDetail;