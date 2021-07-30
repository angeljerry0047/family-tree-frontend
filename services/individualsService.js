import axios from 'axios';

export default {
    search(query) {
        return axios.get(`/individuals/search/${query}/`);
    },
    getRelationships(userId) {
        return axios.get(`/individuals/relationships/${userId}`);
    },
    getIndividual(userId) {
        return axios.get(`/individuals/${userId}`);
    }
};