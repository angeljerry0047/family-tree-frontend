
import styles from './styles';
import { Textarea } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity, TextInput } from 'react-native';
import i18n from '../../services/i18nService';

export default class FormTextInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.formGroup}>
                <Text style={i18n.withRtlTextStyle([styles.inputLabel])}>{this.props.header}</Text>
                <Textarea style={i18n.withRtlTextStyle([styles.textInput])} rowSpan={1} bordered value={this.props.value} onChangeText={this.props.onChangeText} />
            </View>
        );
    }
}