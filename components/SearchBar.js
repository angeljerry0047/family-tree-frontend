import React, { Component } from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import i18n from '../services/i18nService';

export default class SearchBar extends Component {
    handleCancel() {
        Keyboard.dismiss();
        if(this.props.onCancel) this.props.onCancel();
    }

    render() {
        return (
            <Header searchBar rounded style={styles.searchContainer}>
                { this.props.onCancel ?
                    <Button transparent onPress={() => this.handleCancel()}>
                        <Text style={styles.backBtn}>
                            <Ionicons name="md-arrow-back" size={32} />
                        </Text>
                    </Button>
                    :
                    null
                }
                <Item style={styles.searchInput}>
                    <Icon name="ios-search" style={styles.searchIcon} />
                    <Input
                        ref="textbox"
                        placeholder={i18n.t('search')}
                        onChangeText={this.props.onChangeText}
                    />
                </Item>
                { this.props.renderCustomAction ? this.props.renderCustomAction() : null }
            </Header>
        );
    }
}

const styles = {
    searchContainer: {
        backgroundColor: '#20c67d',
    },
    searchInput: {
        backgroundColor: '#fff'
    },
    backBtn: {
        color: '#fff',
        paddingLeft: 0
    },
    searchIcon: {
        color: '#20c67d'
    }
};