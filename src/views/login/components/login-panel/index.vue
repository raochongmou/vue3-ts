<template>
  <div class="login-panel">
    <h2>后台管理系统</h2>
    <el-tabs 
      type="border-card" 
      class="demo-tabs" 
      stretch 
      v-model="activeName"
      @tab-click="handleClickTabs"
    >
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="keepPwd">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button style="width: 100%;" @click="login" type="primary" size="mini">登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import LoginAccount from "../login-account/index.vue";
import LoginPhone from "../login-phone/index.vue";
export default defineComponent({
  name: "LoginPanel",
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    let activeName = ref('account');
    const keepPwd = ref(true);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const login = () => {
      accountRef.value?.login(keepPwd.value);
    }
    const handleClickTabs = (activeName) => {
      if(activeName === 'account') {
        
      }
    }
    return {
      keepPwd,
      accountRef,
      login,
      activeName,
      handleClickTabs
    }
  }
})
</script>

<style>
h2 {
  text-align: center;
  margin-bottom: 10px;
}
.account-control {
  display: flex;
  justify-content: space-between;
}
</style>