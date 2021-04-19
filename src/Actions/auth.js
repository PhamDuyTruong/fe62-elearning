import { stringify } from 'qs';
import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST} from '../constants/auth';
import authAPI from '../services/authAPI'
export function login(values){
    return async (dispatch) => {
        dispatch({type:LOGIN_REQUEST});
        try{
            const {data} = await authAPI.login(values);
            dispatch({type:LOGIN_SUCCESS, payload: { data }})
            // Lưu thông tin xuống localStorage để giữ trạng thái đnagư nhập khi user tắt trang web
            localStorage.setItem("userInfo", JSON.stringify(data))

        } catch(error){
            dispatch({type: LOGIN_FAILURE, payload:{error: error.response.data}})
        }
    }
}