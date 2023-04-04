import { createStore, Store, useStore as useVuexStore } from "vuex";
import type { IRootState, IRootStateWithIModuleType } from "./types";
import loginModule from "./module/login";
import systemModule from "./module/system/system";
import { getDepDataAxios, getRoleDataAxios } from "@/service/api/main/system/system";

const store = createStore<IRootState>({
  state: () => {
    return {
      entirDepartment: [],
      entirRole: []
    }
  },
  mutations: {
    updateEntirDepData(state, paload) {
      state.entirDepartment = paload;
    },
    updateEntirRoleData(state, payload) {
      state.entirRole = payload
    }
  },
  actions: {
    // 部门和角色获取
    async getInitialAction({commit}) {
      const { data: { data: { list: departList }} } = await getDepDataAxios("/department/list", {
        offset: 0,
        size: 1000
      });
      const { data: { data: { list: roleList }} } = await getRoleDataAxios("/role/list", {
        offset: 0,
        size: 1000
      });
      commit("updateEntirDepData", departList);
      commit("updateEntirRoleData", roleList);
    }
  },
  modules: {
    loginModule,
    systemModule
  }
})

export function initVuex() {
  store.dispatch("loginModule/loadLocalLogin");
  store.dispatch("getInitialAction");
}

export function useStore(): Store<IRootStateWithIModuleType> {
  return useVuexStore();
}

export default store;