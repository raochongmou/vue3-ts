<template>
  <div class="role">
    <page-search :pageSearchConfig="formSearchConfig" />
    <page-content :contentTableConfig="contentTableConfig" pageName="Role"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import { formSearchConfig } from "./config/form.config"
import { contentTableConfig } from "./config/content.config"

export default defineComponent({
  name: 'role',
  setup() {
    return {
      contentTableConfig,
      formSearchConfig
    }
  },
  components: { 
    PageSearch, 
    PageContent 
  }
})
</script>

<style scoped></style>
