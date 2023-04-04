import instanceAxios from "../../index";
import type { 
  IAccount, 
  IDataType, 
  ILoginResult, 
  ILoginConfig, 
  IUserInfoDataType,
  IMenuInfoDataType
} from "./type";

export function loginRequest(data: IAccount) {
  return instanceAxios.post<ILoginConfig<ILoginResult<IDataType>>>({
    url: '/login',
    data
  })
}

export function userInfoRequest(id: number) {
  return instanceAxios.get
  <ILoginConfig<ILoginResult<IUserInfoDataType>>>
  ({
    url: '/users/' + id
  })
}

export function menuInfoRequest(id: number) {
  return instanceAxios.get
  <ILoginConfig<ILoginResult<IMenuInfoDataType>>>
  ({
    url: '/role/' + id + '/menu'
  })
}