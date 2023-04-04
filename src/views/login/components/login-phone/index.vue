<template>
  <el-form :model="phoneForm" label-width="66px">
    <el-row>
      <el-col>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input v-model="phoneForm.phonenumber" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="验证码" prop="validcode">
          <el-input v-model="phoneForm.validcode"  />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "LoginPhone",
  setup() {
    const phoneForm = reactive({
      phonenumber: "",
      validcode: ""
    });
    return {
      phoneForm
    }
  }
})
</script>

<style>

</style>