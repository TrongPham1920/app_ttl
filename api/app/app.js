import api from "..";
import { API_PATH } from "../client/apiConfig";

//login
export const login = async (props) => {
  return await api.post(API_PATH.LOGIN, props);
};

export const resetpassword = async (props) => {
  return await api.post(API_PATH.RESETPASSWORD, props);
};

export const confirmcode = async (props) => {
  return await api.post(API_PATH.CONFIRMCODE, props);
};

export const resendcode = async (props) => {
  return await api.post(API_PATH.RESENDCODE, props);
};

export const register = async (props) => {
  return await api.post(API_PATH.REGISTER, props);
};

export const category = async () => {
  return await api.get(API_PATH.CATEGORY);
};

export const verifyemail = async (props) => {
  return await api.get(API_PATH.VERIFY_EMAIL, { params: { ...props } });
};

export const updateuser = async (props) => {
  return await api.put(API_PATH.UPDATEUSER, props);
};

export const accommodationuser = async (props) => {
  if (props.benefitId && Array.isArray(props.benefitId)) {
    props.benefitId = `[${props.benefitId.join(",")}]`;
  }
  return await api.get(API_PATH.ACCOMODATIONUSER, { params: { ...props } });
};

export const getAllBenefit = async () => {
  return await api.get(API_PATH.BENEFIT);
};

export const getroom = async (props) => {
  return await api.get(API_PATH.ROOM, { params: { ...props } });
};

export const detailaccommodation = async (id) => {
  const url = API_PATH.DETAIL_ACCOMMODATION.replace(":id", id);
  return await api.get(url);
};

export const getOrder = async (props) => {
  return await api.get(API_PATH.ORDER, { params: { ...props } });
};

export const getOrderDetail = async (id) => {
  const url = API_PATH.ORDERDETAIL.replace(":id", id);
  return await api.get(url);
};

export const deleteOrder = async (props) => {
  return await api.put(API_PATH.DETELEORDER, props);
};

export const getRates = async (props) => {
  return await api.get(API_PATH.RATES, { params: { ...props } });
};

export const createRate = async (props) => {
  return await api.post(API_PATH.CREATERATE, props);
};

export const createOder = async (props) => {
  return await api.post(API_PATH.CREATEORDER, props);
};

export const addIMG = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  try {
    const response = await api.post(API_PATH.ADDIMG, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const loginGoogle = async (props) => {
  return await api.post(API_PATH.LOGIN_GOOGLE, props);
};

export const logout = async () => {
  return await api.delete(API_PATH.LOGOUT);
};

export const sabank = async ()=>{
  return await api.get(API_PATH.SABANK)
}
