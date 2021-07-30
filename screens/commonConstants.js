import axios from 'axios';

const commonConstants = {
  baseUrl: 'https://myfamtree.azurewebsites.net'
};

axios.defaults.baseURL = commonConstants.baseUrl;

export default commonConstants;