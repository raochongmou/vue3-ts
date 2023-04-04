import { ISearchFormConfig } from '../types';
export const formSearchConfig: ISearchFormConfig = {
  formItems: [
    { 
      field: "name",
      type: "input",
      label: "角色名称", 
      placeholder: "请输入角色名称", 
      id: 1 
    },
    { 
      field: "intro",
      type: "input",
      label: "权限介绍", 
      placeholder: "请输入权限介绍", 
      id: 1 
    },
    {
      field: "createTime",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      },
      id: 4
    }
  ],
  labelWidth: "100",
  adaptiveLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  itemStyle: {
    padding: "10px 30px"
  }
}