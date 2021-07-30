import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import commonConstants from '../screens/commonConstants';
export const userInfo = {};

export const getUserInfo = () => {
  return AsyncStorage
    .multiGet(['machineId', 'individualId'])
    .then(([machineId, individualId]) => {
      const returnedMachineId = machineId[1];
      const returnedIndividualId = individualId[1];
      
      userInfo.id = returnedIndividualId;
      
      axios.defaults.headers.common['MY_FAM_TREE_MACHINE_ID'] = returnedMachineId;
      axios.defaults.headers.common['MY_FAM_TREE_INDIVIDUAL_ID'] = returnedMachineId;
      
      return [returnedMachineId, returnedIndividualId]
    });
}

export const setUserInfo = (machineId, individualId) => {
  userInfo.id = individualId;
  axios.defaults.headers.common['MY_FAM_TREE_MACHINE_ID'] = machineId;
  axios.defaults.headers.common['MY_FAM_TREE_INDIVIDUAL_ID'] = individualId;
  return AsyncStorage.multiSet([
    ['machineId', machineId],
    ['individualId', individualId]
  ]);
}

export const signUp = (payload) => {
  console.info('url', commonConstants.baseUrl);
  console.info('payload', payload);

  return axios.post(`/auth/signup`, payload);
}

export const verify = (payload) => {
  return axios.post(`/auth/verify`, payload);
}
