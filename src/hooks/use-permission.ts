import { useStore } from "@/store"

export function usePermission(pageName: string, btnType: string): boolean {
  const store = useStore();
  const permission = store.state.loginModule.permission;
  const btn = `system:${pageName.toLowerCase()}:${btnType}`;
  return !!permission.find(item => item === btn);
}