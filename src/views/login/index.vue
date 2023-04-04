<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from "./components/login-panel/index.vue";

  export default defineComponent({
    name: "login",
    components: {
      LoginPanel
    }
  })
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
}
</style>