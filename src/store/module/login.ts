import type { IRootState, ILoginState } from "../types";
import type { Module } from "vuex";
import { loginRequest, userInfoRequest, menuInfoRequest } from "@/service/api/login";
import type { IAccount, IUserInfoDataType, IMenuInfoDataType } from "@/service/api/login/type";
import LocalCache from "@/utils";
import { mapMenuToRoutes, getPermissionMap } from "@/utils/mapMenuToRoutes";
import router from "@/router";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      name: "",
      age: null,
      token: "",
      userInfo: null,
      userMenuList: null,
      permission: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: IUserInfoDataType) {
      state.userInfo = userInfo;
    },
    changeUserMenuList(state, userMenuList: [IMenuInfoDataType]) {
      state.userMenuList = userMenuList;
      const permissions = getPermissionMap(userMenuList);
      console.log("permissions", permissions);
      state.permission = permissions;
      const routes = mapMenuToRoutes(userMenuList);
      routes.forEach(route => {
        router.addRoute("main", route);
      });
    }
  },
  actions: {
    async accountLogin({commit}, payload: IAccount) {
      const res = await loginRequest(payload);
      commit("changeToken", res.data.data.token);
      LocalCache.setCache("token", res.data.data.token);
      const res2 = await userInfoRequest(res.data.data.id);
      commit("changeUserInfo", res2.data.data);
      LocalCache.setCache("userInfo", res2.data.data);
      const res3 = await menuInfoRequest(res.data.data.id);
      commit("changeUserMenuList", res3.data.data);
      LocalCache.setCache("userMenuList", res3.data.data)
      router.push("/main");
    },
    loadLocalLogin({ commit}) {
      const token = LocalCache.getCache("token");
      if(token) {
        commit("changeToken", token);
      }
      const userInfo = LocalCache.getCache("userInfo");
      if(userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenuList = LocalCache.getCache("userMenuList");
      if(userMenuList) {
        commit("changeUserMenuList", userMenuList);
      }
    }
  }
}

export default loginModule;