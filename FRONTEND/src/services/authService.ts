
import axios from 'axios';
import env from 'config/env';

export const obterTokenAutomaticamente = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  } else {
    const token = await realizarSolicitacaoParaObterToken();
    if (token) {
      localStorage.setItem('token', token);
      return token;
    }
  }
  return null;
};

export const renovarToken = async () => {
  const token = await realizarSolicitacaoParaObterToken();
  if (token) {
    localStorage.setItem('token', token);
    return token;
  }
}

const realizarSolicitacaoParaObterToken = async () => {
  const response = await axios.post(`${env.REACT_APP_API_URL}/login`, {
    login: env.REACT_APP_API_LOGIN,
    password: env.REACT_APP_API_PASS
  });
  const { token } = response.data;
  return token;

};