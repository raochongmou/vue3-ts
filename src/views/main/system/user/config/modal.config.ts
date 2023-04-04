import { ISearchFormConfig } from '../types';
export const pageModalConfig: ISearchFormConfig = {
  formItems: [
    { 
      field: "name",
      type: "input",
      label: "用户名", 
      placeholder: "请输入用户名", 
      id: 1 
    },
    { 
      field: "password",
      type: "input",
      label: "密码", 
      placeholder: "请输入密码", 
      id: 2,
      isHidden: true, 
    },
    { 
      field: "cellphone",
      type: "input",
      label: "电话号码", 
      placeholder: "请输入电话号码", 
      id: 3 
    },
    { 
      field: "departmentId",
      type: "select",
      label: "部门", 
      placeholder: "请选择部门",
      option: [], 
      id: 4
    },
    { 
      field: "roleId",
      type: "select",
      label: "角色", 
      placeholder: "请选择角色",
      option: [], 
      id: 5
    }
  ],
  adaptiveLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24
  }
}