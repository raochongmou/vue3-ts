// enum EFormType { 
//   'input', 
//   'select',
//   'password', 
//   'datepicker'
// }
type EFormType = 'input' | 'select' | 'password' | 'datepicker';
export interface IFormItems {
  field: string,
  type: EFormType,
  label: string,
  rules?: any,
  placeholder?: any, 
  id: number,
  option?: any[],
  isHidden?: boolean,
  otherOptions?: any
}