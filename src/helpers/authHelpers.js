const ACCESS_TOKEN = 'access_token';
const EXPIRATION_TOKEN = 'expiration_token';
const USER_AUTH = 'user_auth';

//função para gravar os dados do usuario autenticado
//na memória do navegador (localStorage)
export const signIn = (username, accessToken, tokenExpiration) => {
    localStorage.setItem(USER_AUTH, username);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(EXPIRATION_TOKEN, tokenExpiration);
}

//função para retornar o valor do nome do usuario..
export const getUsername = () => {
    return localStorage.getItem(USER_AUTH);
}

//função para retornar o valor do token..
export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}

//função para retornar a data de expiração do token..
export const getTokenExpiration = () => {
    return localStorage.getItem(EXPIRATION_TOKEN);
}

//função para verificar se o token é válido
export const isAuthenticated = () => {
    //verificar se existe um token gravado na localstorage
    //verificar se este token é valido (data de expiração
    //do token é maior do que a data atual)
    return getAccessToken()
              && new Date(getTokenExpiration()) > new Date();
}

//função para fazer o logout do usuario..
export const signOut = () => {
    localStorage.removeItem(USER_AUTH);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRATION_TOKEN);
}

//função para redirecionamento..
export const redirectToAdminPage = () => {
    window.location.href = "/admin";
}

//função para redirecionamento..
export const redirectToLoginPage = () => {
    window.location.href = "/";
}

