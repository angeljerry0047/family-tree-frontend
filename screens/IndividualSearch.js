import React from 'react';
import axios from 'axios';
import { Button, Text } from 'native-base';
import SearchScreen from './SearchScreen';
import { Entypo } from '@expo/vector-icons';
import i18n from '../services/i18nService';

export default class IndiviualScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    addNewProps = () => {
        const params = this.props.route.params;
        return params && params.addProps;
    }
    
    onAddNew = () => {
        const addProps = this.addNewProps();
        this.props.navigation.push('EditIndividual', addProps)
    }

    renderAddNew = () => {
        const addProps = this.addNewProps();
        if (addProps) {
            return () => (
                <Button transparent onPress={this.onAddNew}>
                    <Text style={styles.addNewBtn}>
                        { i18n.t('addNew') }
                    </Text>
                    <Entypo name="plus" size={32} color='white' />
                </Button>
            );
        }
        return null;
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    handleSelection = (individual) => {
        const addProps = this.props.route.params?.addProps || {};
        let promise = Promise.resolve({});
        if (addProps.addChild) {
            promise = axios.post(`/relationships/children`, {
                parentId: addProps.addTo,
                childId: individual.id
            });
        } else if(addProps.addSpouse) {
            promise = axios.post(`/relationships/spouses`, {
                sourceId: addProps.addTo,
                spouseId: individual.id
            });
        } else if (addProps.addParent) {
            promise = axios.post(`/relationships/children`, {
                parentId: individual.id,
                childId: addProps.addTo
            });
        }
        promise
            .then(() => this.props.navigation.goBack())
            .catch(function(err) {
                alert('An error occurred: ' + err.message);
            });
    }

    render() {
        return (
            <SearchScreen
                renderCustomAction={this.renderAddNew()}
                onCancel={this.onCancel}
                handleSelection={this.handleSelection}
            />
        );
    }
}

const styles = {
    addNewBtn: {
        color: '#fff',
        paddingRight: 0
    }
};