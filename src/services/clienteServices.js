import axios from 'axios';
import * as config from '../config/apiConfig';

const resource = config.ENDPOINT + "/Clientes";

export const post = (cliente) => {
    return axios.post(resource, cliente)
        .then(
            response => {
                return response.data;
            }
        );
}

export const put = (cliente) => {
    return axios.put(resource, cliente)
        .then(
            response => {
                return response.data;
            }
        );
}

export const remove = (id) => {
    return axios.delete(resource + "/" + id)
        .then(
            response => {
                return response.data;
            }
        );
}

export const getAll = () => {
    return axios.get(resource)
        .then(
            response => {
                return response.data;
            }
        );
}

export const getById = (id) => {
    return axios.get(resource + "/" + id)
        .then(
            response => {
                return response.data;
            }
        );
}

export const getHistorico = () => {
    return axios.get(resource + "/historico")
        .then(
            response => {
                return response.data;
            }
        );
}


