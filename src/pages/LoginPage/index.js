import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Input, FormGroup, Label, Alert } from "reactstrap";
import {useDispatch, useSelector} from 'react-redux';
import {login} from 'src/Actions/auth'
import { Redirect, useLocation } from "react-router";
import qs from 'qs'

// controlled component: Control tất cả mọi thứ trên giao diện bằng state và props
// Uncontrolled component: Control giao diện không thông qua state hoặc props
// Cả useState lẫn useRef đều dùng để lưu trữ data
// Khac: khi state thay đổi component bị render lại, khi ref thay đổi thì component không bị réder lại

// Tạo schema validation, bản chất của nó để khai báo những cái rule 
const schema = yup.object().shape({
    taiKhoan: yup.string().required("Tài khoản không được để trống").min(5, "Tài khoản phải từ 5 đến 20 ký tự").max(20, "Tài khoản phải từ 5 đến 20 ký tự"),
    matKhau: yup.string().required("Mật khẩu không được để trống")
})
export default function LoginPage() {
  const dispatch = useDispatch();
  const {userInfo, isLoading, error} =  useSelector(state => state.auth);
  // const inputTaiKhoan = useRef();
  // const inputMatKhau = useRef();
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    // Sử dụng khi UI component không sử dụng register
    control,
  } = useForm({
      resolver: yupResolver(schema)
  });

  const handleLogin = (value) => {
    // console.log(inputTaiKhoan.current.value);
    // console.log(inputMatKhau.current.value)
    console.log(value);
    dispatch(login(value));
    // Dispatch action đăng nhập
  };
  // Khi userInfo có đăng nhập sẽ chuyển người dùng về trang home
  if(userInfo){
    const { redirectTo }   = qs.parse(location.search, {ignoreQueryPrefix: true});
     if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
      return <Redirect to="/" />
  }

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h1>Login Page</h1>

      <div className="form-group">
        <label>Tài Khoản</label>
        <input
          type="text"
          className="form-control"
        {...register("taiKhoan"
        // Sử dụng yup để validate nên đoạn này không cần
        //     required: { value: true, message: "Tài khoản không được để trống" },
        //     minLength: {
        //       value: 5,
        //       message: "Tài khoản phải từ 5 đến 20 ký tự",
        //     },
        //     maxLength: {
        //       value: 20,
        //       message: "Tài khoản phải từ 5 đến 20 ký tự",
        //     },
        )}
        />
      </div>
      {errors.taiKhoan && (
        <div className="alert alert-danger">{errors.taiKhoan.message}</div>
      )}
      {/* <div className="form-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          {...register("matKhau", { required: true })}
        />
      </div>
      {errors.matKhau && (
        <div className="alert alert-danger">Mật khẩu không được để trống</div>
      )} */}
      {/* <FormGroup>
          <Label>
              Mật khẩu
          </Label>
          <Input type="password" {...register("matKhau", { required: {value: true, message: "Mật khẩu không được để trống" },})}></Input>
          {errors.matKhau && (<Alert color="success">{errors.matKhau.message}</Alert>)}
      </FormGroup> */}
      {/* Sử dụng UI component không sử dụng được register */}
      <FormGroup>
        <Label>Mật khẩu</Label>
        <Controller
          name="matKhau"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Mật khẩu không được để trống" },
          }}
          render={({ field }) => {
            return <Input {...field} />;
          }}
        ></Controller>
        {errors.matKhau && (<Alert color="success">{errors.matKhau.message}</Alert>)}
      </FormGroup>
      {error && <Alert color="danger">{error}</Alert>}
      <button className="btn btn-success">Đăng Nhập</button>
    </form>
  );
}
