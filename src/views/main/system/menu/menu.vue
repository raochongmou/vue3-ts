<template>
  <div class="menu">
    <page-content 
      ref="pageContentRef" 
      :contentTableConfig="contentTableConfig" 
      pageName="Menu"
      
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from "./config/content.config"
import PageContent from "@/components/page-content"

export default defineComponent({
  name: 'menu',
  setup() {
    return {
      contentTableConfig
    }
  },
  components: { PageContent }
})
</script>

<style scoped></style>
