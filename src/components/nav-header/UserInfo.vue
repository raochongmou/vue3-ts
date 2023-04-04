<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        size="small"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <span>{{ name }}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
        <el-dropdown-item>用户信息</el-dropdown-item>
        <el-dropdown-item>系统设置</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore();
    const name = computed(() => {
      return store.state.loginModule.userInfo.name
    });
    return {
      name
    }
  },
})
</script>

<style scoped>
.el-dropdown-link {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>