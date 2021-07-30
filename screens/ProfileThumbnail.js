import React from 'react';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import {Text, Thumbnail, Button} from 'native-base';
import _ from 'lodash';

export default (props) => {
    const onPress = props.onPress || (() => true);
    const onLongPress = props.onLongPress || (() => true);
    return (
        <TouchableHighlight onPress={onPress} onLongPress={onLongPress} style={{flex: _.get(props, 'style.flex', 1)}} >
            <View style={Object.assign({}, styles.thumbnail, props.style)}>
                <Thumbnail large={props.large === true} style={{flex: 4}} source={{uri: props.imageUrl || 'https://raw.githubusercontent.com/Infernus101/ProfileUI/0690f5e61a9f7af02c30342d4d6414a630de47fc/icon.png'}} />
                <Text style={{flex: 1, fontSize: props.large ? 16 : 12}}>{props.name}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = {
    thumbnail: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};