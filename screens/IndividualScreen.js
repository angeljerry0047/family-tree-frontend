import React from 'react';
import {ScrollView, StyleSheet, View, Alert} from 'react-native';
import {Icon, Card, CardItem, Text, Button}from 'native-base';
import color from '../constants/Colors';
import {userInfo} from '../services/authenticationService';
import individualService from '../services/individualsService';
import ProfileThumbnail from './ProfileThumbnail';
import i18n from '../services/i18nService';
import axios from 'axios';

import _ from 'lodash';

class IndividualScreen extends React.Component {
  state = {
    modalVisible: false
  };

  static navigationOptions = ({navigation, route}) => {
    return {
      title: route?.params?.personName || '',
      headerRight: () => (
        <Button style={{backgroundColor: 'transparent'}} onPress={() => navigation.push('EditIndividual', {id: route.params?.id || userInfo.id})}>
        <Icon type="FontAwesome" name='pencil' style={{fontSize: 20, color: color.themeColor}} />
        </Button>
      )
    };
  };

  didFocus = () => {
    const curUser = userInfo.id;
    const selectedId = this.props.route.params?.id || curUser;
    this.setState({userId: selectedId});

    individualService.getRelationships(selectedId)
      .then(response => {
        this.setState({curUserInfo: response.data});
        this.props.navigation.setParams({personName: response.data.individual.name});
      })
      .catch(err => {
        alert(err);
      });
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', (e) => this.didFocus(e));
  }

  componentWillUnmount() {
    this.focusListener();
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  navigate(userId, direction) {
    if (userId) {
      this.props.navigation.push('IndividualScreen', {id: userId});
    }
  }

  startAddChild() {
    this.props.navigation.push('IndividualSearch', {
      addProps: {
        pageTitle: i18n.t('addChild'),
        addChild: true,
        addTo: this.state.userId,
        stacksToPopOnSuccess: 2
      }
    });
  }

  startAddParent() {
    this.props.navigation.push('IndividualSearch', {
      addProps: {
        pageTitle: i18n.t('addParent'),
        addParent: true,
        addTo: this.state.userId,
        stacksToPopOnSuccess: 2
      }
    });
  }

  startAddSpouse() {
    this.props.navigation.push('IndividualSearch', {
      addProps: {
        pageTitle: i18n.t('addSpouse'),
        addSpouse: true,
        addTo: this.state.userId,
        stacksToPopOnSuccess: 2
      }
    });
  }

  startDeleteRelationship(relationshipId) {
    axios.delete(`/relationships/${relationshipId}`)
      .catch(function (err) {
        Alert.alert(err.response);
      });

    this.didFocus();
  }

  deleteIndivisual(individual) {
    Alert.alert(
      i18n.t('delete'),
      i18n.t('confirmDelete') + ' ' + individual.firstName + i18n.t('questionMark'),
      [
        {text: i18n.t('yes'), onPress: () => this.startDeleteIndivisual(individual.id)},
        {
          text: i18n.t('no'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  startDeleteIndivisual(userId) {
    axios.delete(`/individuals/${userId}`)
    .catch((err) => {
        Alert.alert(err.response);
    });
    this.props.navigation.goBack();
    this.didFocus();
  }

  confirmDeleteRelationship(relationship) {

   Alert.alert(
      i18n.t('delete'),
      i18n.t('confirmDelete') + ' ' + relationship.firstName + i18n.t('questionMark'),
      [
        {text: i18n.t('yes'), onPress: () => this.startDeleteRelationship(relationship.relationshipId)},
        {
          text: i18n.t('no'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  
  }
  render() {
    const {curUserInfo} = this.state;
    const {individual, spouses, children} = curUserInfo ? curUserInfo : {};
    const father = curUserInfo ? curUserInfo.father || {} : {};
    const mother = curUserInfo ? curUserInfo.mother || {} : {};

    return (
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          {curUserInfo && <View>
            <Card style={styles.cardContainer}>
              <CardItem header>
                <View style={{flex: 1}}>
                  <Button rounded style={styles.tags}>
                    <Text style={styles.white}>Parents</Text>
                  </Button>
                </View>
              </CardItem>
              <CardItem>
                <View style={styles.pageRow}>
                  <ProfileThumbnail
                    style={{flex: 2}}
                    name={father.name}
                    imageUrl={father.imageUrl}
                    onPress={() => this.navigate(father.id)}
                  />
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon style={{textAlign: 'center', color: 'red'}} name='heart' />
                  </View>
                  {mother.id ? 
                    <ProfileThumbnail onPress={() => this.navigate(mother.id)} style={{flex: 2}} name={mother.name} imageUrl={mother.imageUrl} />
                  :
                  <Button style={styles.add} onPress={() => this.startAddParent()}>
                    <Icon name='add' style={{fontSize: 40, color: color.themeColor}} />
                  </Button>

                  }
                </View>
              </CardItem>
            </Card>
            <Card style={styles.cardContainer}>
              <CardItem header>
                <ProfileThumbnail name={individual.name} imageUrl={individual.imageUrl} large={true} />
              </CardItem>
              <CardItem>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}} >
                    {individual.dateOfBirth && <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text>Date of Birth</Text>
                      <Text>{individual.dateOfBirth || ''}</Text>
                    </View>}
                    {individual.occupation && <View>
                      <Text>Occupation</Text>
                      <Text>{individual.occupation || ''}</Text>
                    </View>}
                  </View>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.green}>Phone Number</Text>
                    <Text>{individual.phoneNumber || ''}</Text>
                  </View>
                  {children.length === 0 &&
                  <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    <Button style={styles.delete} onPress={() => this.deleteIndivisual(individual)}>
                      <Icon name='trash' style={{fontSize: 20, color: 'red'}} />
                    </Button>
                  </View>
                  }
                </View>
              </CardItem>
            </Card>
            <Card style={styles.cardContainer}>
              <CardItem header>
                <View style={{flex: 1}}>
                  <Button rounded style={styles.tags}>
                    <Text style={styles.white}>Spouse</Text>
                  </Button>
                </View>
              </CardItem>
              <ScrollView horizontal={true} >
                <CardItem>
                  <View style={styles.flexStart}>
                    {
                      spouses.map(s => (
                        <ProfileThumbnail
                          key={s.id}
                          name={s.name}
                          imageUrl={s.imageUrl}
                          onPress={() => this.navigate(s.id)}
                          onLongPress={() => this.confirmDeleteRelationship(s)}
                        />
                      ))
                    }
                    <Button style={styles.add} onPress={() => this.startAddSpouse()}>
                      <Icon name='add' style={{fontSize: 40, color: color.themeColor}} />
                    </Button>
                  </View>
                </CardItem>
              </ScrollView>
            </Card>
            <Card style={styles.cardContainer}>
              <CardItem header>
                <View style={{flex: 1}}>
                  <Button rounded style={styles.tags} >
                    <Text style={styles.white}>Children</Text>
                  </Button>
                </View>
              </CardItem>
              <ScrollView horizontal={true} >
                <CardItem>
                  <View style={styles.flexStart}>
                    {
                      children.map(s => (
                        <ProfileThumbnail
                          key={s.id}
                          name={s.firstName}
                          imageUrl={s.imageUrl}
                          style={{marginRight: 25}}
                          onPress={() => this.navigate(s.id)}
                          onLongPress={() => this.confirmDeleteRelationship(s)}
                        />
                      ))
                    }
                    <Button style={styles.add} onPress={() => this.startAddChild()} >
                      <Icon name='add' style={{fontSize: 40, color: color.themeColor}} />
                    </Button>
                  </View>
                </CardItem>
              </ScrollView>
            </Card>
          </View>
          }
        </View>
      </ScrollView>

    );
  }
}

export default IndividualScreen;

const styles = StyleSheet.create({
  pageRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  flexStart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  spouseContainer: {
    flexDirection: 'row'
  },
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  scrollViewContainer: {
    backgroundColor: '#f4fafe',
  },
  container: {
    paddingTop: 15,
    display: 'flex',
    flex: 1,
  },
  familyNameBtn: {
    backgroundColor: '#fff',
  },
  tags: {
    backgroundColor: '#20c67d',
    alignSelf: 'center'
  },
  green: {
    color: '#20c67d',
    fontWeight: 'bold'
  },
  white: {
    color: '#fff'
  },
  thumbnail: {
    display: 'flex',
    resizeMode: 'contain',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add: {
    display: 'flex',
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: '#dff7ee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    display: 'flex',
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: 'rgba(249,62,62,.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    display: 'flex',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#dff7ee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  name: {
    marginTop: -20,
    textAlign: 'center',
    backgroundColor: '#fff'
  }
});
