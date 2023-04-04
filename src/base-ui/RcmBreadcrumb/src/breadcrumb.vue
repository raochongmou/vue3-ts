<template>
  <el-breadcrumb separator="/">
    <template v-for="crumb in breadcrumbs" :key="crumb.path">
      <el-breadcrumb-item>
        {{ crumb.name }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumbs } from "../types";

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumbs[]>
    }
  },
  setup() {
    
  },
})
</script>
