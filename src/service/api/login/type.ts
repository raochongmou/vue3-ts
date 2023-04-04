import { AxiosHeaders } from "axios"

export interface IAccount {
  name: string
  password: number 
}

export interface IDataType {
  id: number
  token: string
  name: string
}

export interface ILoginConfig<T = any> {
  config: any
  data: T
  headers: AxiosHeaders
  request: XMLHttpRequest
  status: number
  statusText: string
}

export interface ILoginResult<T = any> {
  code: number,
  data: T[]&T
}

export interface IUserInfoDataType {
  cellphone: number,
  createAt: Date,
  department: IDepartmentType,
  enable: number,
  id: number,
  name: string,
  realname: string,
  role: IRoleType,
  updateAt: string
}
export interface IRoleType {
  id: number,
  name: string,
  intro: string,
  createAt: Date,
  updateAt: Date
}
export interface IDepartmentType {
  createAt: Date,
  id: number
  leader: string,
  name: string,
  parentId: number
  updateAt: Date
}

export interface childrenType {
  children?: [any],
  id?: number,
  name?: string,
  sort?: number,
  type?: number,
  url?: string
}

export interface IMenuInfoDataType {
  children?: [childrenType],
  icon?: string,
  id?: number,
  name?: string,
  sort?: number,
  type?: number,
  url?: string
}
