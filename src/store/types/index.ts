import type { IUserInfoDataType, IMenuInfoDataType } from "@/service/api/login/type";
import { ISystemState } from "../module/system/types";
export interface ILoginState {
  name: string
  age: number
  token: string
  userInfo: IUserInfoDataType
  userMenuList: [IMenuInfoDataType]
  permission: any[]
} 

export interface IRootState {
  entirDepartment: any[]
  entirRole: any[]
}

export interface IModuleType {
  loginModule: ILoginState,
  systemModule: ISystemState
}

export type IRootStateWithIModuleType = IRootState & IModuleType