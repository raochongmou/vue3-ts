import { ISearchFormConfig } from '../types';
export const formSearchConfig: ISearchFormConfig = {
  formItems: [
    { 
      field: "name",
      type: "input",
      label: "用户名", 
      placeholder: "请输入用户名", 
      id: 1 
    },
    { 
      field: "enable",
      type: "select",
      label: "用户状态", 
      option: [
        { label: "禁用", value: 0 },
        { label: "开启", value: 1 },
      ],
      placeholder: "请选择用户状态", 
      id: 2 
    },
    {
      field: "createAt",
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