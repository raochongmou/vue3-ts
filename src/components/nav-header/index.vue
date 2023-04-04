<template>
  <div class="nav-header">
    <el-icon class="fold-icon" @click="handleFold">
      <Fold v-if="isFold"/>
      <Expand v-else/>
    </el-icon>
    <div class="content">
      <RcmBreadcrumb :breadcrumbs="breadcrumbs" />
      <user-info/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './UserInfo.vue';
import { RcmBreadcrumb,  IBreadcrumbs } from "@/base-ui";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { getBreadcrumbs } from "@/utils/mapMenuToRoutes";

export default defineComponent({
  components: { UserInfo, RcmBreadcrumb },
  emits: ['foldChange'],
  setup(props, {emit}) {
    let isFold = ref(false);
    const handleFold = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };
    
    
    
    // const currentRoutePath = computed(() => {
    //   return useRoute().path
    // });
    const breadcrumbs = computed(() => {
      const userMenu = useStore().state.loginModule.userMenuList;
      const currentRoutePath = useRoute().path;
      return getBreadcrumbs(userMenu, currentRoutePath);
    });
    return {
      handleFold,
      breadcrumbs,
      isFold
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  .fold-icon {
    font-size: 30px;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    align-items: center;
  }
}
</style>
