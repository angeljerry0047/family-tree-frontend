
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class ProfileImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.url) {
            return (<TouchableHighlight style={styles.profileImgContainer}></TouchableHighlight>);
        }
        return (
            <TouchableHighlight style={styles.profileImgContainer}>

                <Image source={{ uri: this.props.url }} style={styles.profileImg} />

            </TouchableHighlight>
        );
    }
}