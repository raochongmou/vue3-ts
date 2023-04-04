export const contentTableConfig = {
  isShowIndex: true,
  isShowSelect: true,
  title: "用户列表",
  tabelConfig: [
    { prop: "name", label: "用户名", minWidth: "100" },
    { prop: "intro", label: "权限介绍", minWidth: "100" },
    { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
    { prop: "createAt", label: "创建时间", minWidth: "250", slotName: "createAt" },
    { prop: "updateAt", label: "更新时间", minWidth: "250", slotName: "updateAt" },
    { label: "操作", minWidth: "120", slotName: "actions" },
  ]
}