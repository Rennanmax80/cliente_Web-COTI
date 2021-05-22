import axios from 'axios';
import * as config from '../config/apiConfig';
import * as helpers from '../helpers/authHelpers';

//função para acessar o serviço de autenticação da API..
export const post = (user) => {
    return axios.post(config.ENDPOINT + "/Auth", user)
        .then(
            response => {
                return response.data;
            }
        )
}

//configurando o interceptador para que sejam enviado o TOKEN do usuario
//sempre qualquer serviço da API, exceto autenticação, seja executado..
axios.interceptors.request.use(
    config => {

        //verificar se o serviço da API que esta sendo acessado
        //não é o serviço de autenticação..
        if(!config.url.endsWith("api/Auth")){
            //enviando o TOKEN no cabeçalho da requisição..
            config.headers['Authorization'] = 'Bearer ' + helpers.getAccessToken();
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);