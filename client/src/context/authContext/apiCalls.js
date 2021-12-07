import axios from "axios";
import axiosInstance from "../../misc/axiosInstance";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions"


export const login = async (isLogin, user, dispatch) => {
    dispatch(loginStart());

    try {
        let res;
        if(isLogin){
            res = await axiosInstance.post("auth/login", user);
        } else {
            console.log(user);
            res = await axiosInstance.post("auth/register", user);
        }
        dispatch(loginSuccess(res.data));
        // console.log(res.data);

    } catch (err) {
        console.log(err);
        dispatch(loginFailure());
    }
}