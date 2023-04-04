<template>
  <el-form ref="loginFormRef" :model="form" :rules="rules" label-width="66px">
    <el-row>
      <el-col>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElForm } from "element-plus";
import localCache from "@/utils";
import { useStore } from "vuex";
export default defineComponent({
  name: "LoginAccount",
  setup() {
    const store = useStore();
    const form = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? ""
    });
    const loginFormRef = ref<InstanceType<typeof ElForm>>();
    const login = (keepPwd) => {
      loginFormRef.value?.validate((valid) => {
        if(valid) {
          if(keepPwd) {
            // 保存本地缓存
            localCache.setCache("name", form.name);
            localCache.setCache("password", form.password);
          } else {
            // 删除本地缓存
            localCache.removeCache("name");
            localCache.removeCache("password");
          }
          // 开始登录验证
          store.dispatch("loginModule/accountLogin", {...form})
        }
      })
    }
    const rules = {
      name: [
        {
          required: true,
          message: "用户名必须要填写!",
          trigger: "blur"
        },
        {
          pattern: /^[a-zA-Z0-9]{5,16}$/,
          message: "用户名长度必须是5~16位的数字或字母组成!",
          trigger: "blur"
        }
      ]
    }
    return {
      rules,
      form,
      login,
      loginFormRef
    }
  }
})
</script>

<style>

</style>