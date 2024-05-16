import axios from "axios";
import { getSession } from 'next-auth/react';
import Router from 'next/router';

const URL =  process.env.BACKEND

export const privateApi = () => {
  const defaultOptions = {
    baseURL: URL,
    headers:{
      "Content-Type": 'multipart/form-data'
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      // @ts-ignore
      request.headers.Authorization = `${session.accessToken}`;
    }else{
      Router.push('/?unauthorized=true')
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //TODO PESQUISAR MELHOR FORMA DE REDIRECIONAR QUANDO NAO HOUVER QUERY NO BACKEND
      if(error.response.status == 404 || error.response.status == 403){

        if(error.response.status == 403){
          Router.back()
        }

        Router.push('/')

      }
      return Promise.reject(error)
    },
  );

  return instance;
};


export const api = axios.create({
  baseURL: URL
});
