

<template>
  <el-config-provider :locale="zhCn">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  export default defineComponent({
    components: { ElConfigProvider },
    setup() {
      return {
        zhCn
      }
    }
  })
</script>
