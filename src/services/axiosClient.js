import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: "https://elearning0706.cybersoft.edu.vn/api",
  // Tự cấu hình cách lấy param mặc định của axios
  // Bỏ qua giá trị null và undefined trong params
  paramsSerializer: (param) => qs.stringify(param, { skipNulls: true }),
});

axiosClient.interceptors.request.use(
  (config) =>{
    // Xử lý trước khi request được gửi lên server
    // Thêm Authorization vào header
    const userInfo = localStorage.getItem("userInfo");
    if(userInfo){
      const { accessToken } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) =>{
    // Xử lý khi request bị lỗi
    return Promise.reject(error)
  }
);

axiosClient.interceptors.response.use(
  (response) =>{
    // Xử lý kết quả trả về từ server
    return response
     
  },
  // Xử lý nếu kết quả trả về bị lỗi
  (error) =>{
    if(error.status === 401){
      // Xử lý log out: clear Storage, đẩy người dùng vào trang login
      
    }
    return Promise.reject(error)
  }
)
export default axiosClient;
