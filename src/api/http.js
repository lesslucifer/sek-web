import { API_URL } from "../utils/env";
import Storage from "../utils/storage";
import axios from "axios";
import Swal from "sweetalert2";
import _ from "lodash";

const connCache = new Map()

function makeHTTP(roomId) {
  if (connCache.has(roomId)) return connCache.get(roomId)
  // create an axios instance
  const service = axios.create({
    baseURL: API_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000, // request timeout
  });

  // request interceptor
  service.interceptors.request.use(
    (config) => {
      // do something before request is sent
  
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["Authorization"] = `Bearer ${Storage.getToken()}`
      config.headers["x-room-id"] = roomId
  
      return config;
    },
    (error) => {
      // do something with request error
      console.error(error); // for debug
      return Promise.reject(error);
    }
  );
  
  // response interceptor
  // service.interceptors.response.use(
  //   /**
  //    * If you want to get http information such as headers or status
  //    * Please return  response => response
  //    */
  
  //   /**
  //    * Determine the request status by custom code
  //    * Here is just an example
  //    * You can also judge the status by HTTP Status Code
  //    */
  //   (response) => {
  //     const res = response.data;
  //     return res;
  //   },
  //   (error) => {
  //     // handle 401 error
  //     if (error.response && error.response.status === 401) {
  //       const token = getAccessToken();
  //       if (token == null) {
  //         return logOut();
  //       }
  
  //       const tokenObj = parseJwtToken(token);
  //       if (tokenIsExpired(tokenObj)) {
  //         return logOut();
  //       }
  //     }
  
  //     console.error(error); // for debug
  //     return Promise.reject(error);
  //   }
  // );

  service.verifyUser = () => verifyUser(service)
  
  connCache.set(roomId, service)
  return service
}

export const verifyUser = async (service) => {
  try {
    if (!Storage.getToken()) throw new Error(`NO_TOKEN`)

    const resp = await service.get('/players/me', {
      headers: {
        'Authorization': `Bearer ${Storage.getToken()}`
      }
    })

    const uid = resp.data?.data?.playerId
    if (!uid) throw new Error(`Cannot verify user`)

    Storage.setUserId(uid)
    return uid
  } catch (err) {
    try {
      if (_.get(err, 'response.status') === 401 || _.get(err, 'message') === 'NO_TOKEN') {
        return await setupUser(service)
      }
      throw new Error('Cannot setup user')
    }
    catch (err) {
      Swal.fire(`Server error`, 'Cannot setup user! The page will be reloaded automatically', 'error').then(() => {
        window.location = '/'
      })
    }
  }
}

const setupUser = async (service) => {
  const resp = await service.post('/players')
  if (!resp.data?.data?.access_token || !resp.data?.data?.playerId) throw new Error(`Error, cannot setup user; Invalid response data`)
  Storage.setToken(resp.data?.data?.access_token)
  Storage.setUserId(resp.data?.data?.playerId)
  return Storage.getUserId()
}

export default makeHTTP