<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span v-if="!isCollapse" class="title">rao</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      text-color="#fff"
      :collapse="isCollapse"
      background-color="#0c2135"
      unique-opened
      class="el-menu-vertical-demo"
    >
      <!-- @open="handleOpen"
      @close="handleClose" -->
      <template v-for="item in menuList" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <chat-line-round v-if="item.icon.includes('chat-line-round')" />
                <monitor v-else-if="item.icon.includes('monitor')" />
                <setting v-else-if="item.icon.includes('setting')" />
                <goods v-else-if="item.icon.includes('goods')" />
              </el-icon>
              <span>{{item.name}}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuClick(subItem)">
                <span>{{subItem.name}}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from "@/store";
import { useRouter, useRoute } from 'vue-router';
import { getMenuToMap } from "@/utils/mapMenuToRoutes";
// import { IMenuInfoDataType } from "@/service/api/login/type";

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const menuList  = computed(() => store.state.loginModule.userMenuList); 
    const menuPath = route.path;
    const menu = getMenuToMap(menuList.value, menuPath);
    let defaultActive = ref('2');
    defaultActive.value = menu.id + "";
    const handleMenuClick = (item: any) => {
      router.push({
        path: item.url ?? "/NotFound"
      })
    }
    return {
      menuList,
      defaultActive,
      handleMenuClick
    }
  }
})
</script>

<style scoped lang="less">
::v-deep{
  .el-menu {
    border-right: none !important;
  }
}
.nav-menu {
  height: 100%;
  background-color: #001529;
  
  .logo {
    display: flex;
    height: 50px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .icon-class {
    width: 20px;
    height: 20px;
  }
}
</style>
