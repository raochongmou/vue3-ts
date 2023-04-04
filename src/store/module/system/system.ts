import { IRootState } from "@/store/types"
import { ISystemState } from "./types";
import { Module } from "vuex"
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPageListAxios, delPageDataAxios, editPageDataAxios, addPageDataAxios } from "@/service/api/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    getPageList(state): any {
      return (pageName: string) => {
        pageName = pageName.toLowerCase();
        return state[`${pageName}List`];
      }
    },
    getPageTotal(state): any {
      return (pageName: string) => {
        pageName = pageName.toLowerCase();
        return state[`${pageName}Count`];
      }
    }
  },
  mutations: {
    changeUsersList(state, payload) {
      state.usersList = payload
    },
    changeUsersCount(state, payload) {
      state.usersCount = payload;
    },
    changeRoleList(state, payload) {
      state.roleList = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload;
    },
    changeGoodsList(state, payload) {
      state.goodsList = payload
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload;
    },
    changeMenuList(state, payload) {
      state.menuList = payload
    },
    changeMenuCount(state, payload) {
      state.menuCount = payload;
    },
  },
  actions: {
    async getPageList({commit}, payload) {
      let pageUrl = payload.pageUrl;
      const { data: { data: { list, totalCount } } } = await getPageListAxios(
        '/' + pageUrl + '/list',
        payload.queryList
      );
      // 转成大写
      pageUrl = pageUrl.slice(0, 1).toUpperCase() + pageUrl.slice(1, pageUrl.length);
      commit(`change${pageUrl}Count`, totalCount)
      commit(`change${pageUrl}List`, list)
    },
    // 异步删除
    deleteAction({dispatch}, { pageName, id }) {
      const pageUrl = pageName.toLowerCase();
      ElMessageBox.confirm(
        '是否删除本条数据,继续?',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      )
      .then(async() => {
        const { code, data } = await delPageDataAxios(pageUrl, id);
        if(code === 0) {
          ElMessage({
            type: 'success',
            message: '删除成功!',
          });
          dispatch("getPageList", { pageUrl, queryList: {offset: 0, size: 10} })
        } else {
          ElMessage({
            type: 'error',
            message: `删除失败,${data.data}!`,
          });
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '操作取消!',
        })
      })
    },
    async handleEditAction({dispatch}, {pageName: pageUrl, data, id}) {
      const { data: { code }} = await editPageDataAxios(`/${pageUrl}/${id}`, data);
      if(code === 0) {
        ElMessage({
          type: "success",
          message: "修改成功!"
        });
        dispatch("getPageList", { pageUrl, queryList: {offset: 0, size: 10} })
      } else {
        ElMessage({
          type: "warning",
          message: "修改失败!"
        });
      }
    },
    async handleAddAction({dispatch}, {pageName: pageUrl, data}) {
      const { data: { code }} = await addPageDataAxios(pageUrl, data);
      if(code === 0) {
        ElMessage({
          type: "success",
          message: "新增成功!"
        });
        dispatch("getPageList", { pageUrl, queryList: {offset: 0, size: 10} })
      } else {
        ElMessage({
          type: "warning",
          message: "新增失败!"
        });
      }
    } 
  }
}

export default systemModule;