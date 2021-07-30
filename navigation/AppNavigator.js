
import { getUserInfo } from '../services/authenticationService';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from '../screens/authentication/Navigator';

const navPromise = () => getUserInfo()
  .then(([machineId, individualId]) => {
    return (machineId && individualId) ? MainTabNavigator : AuthNavigator
  });

export default navPromise;