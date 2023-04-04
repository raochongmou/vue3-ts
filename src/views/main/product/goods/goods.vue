<template>
  <div class="goods">
    <page-content 
      ref="pageContentRef" 
      :contentTableConfig="contentTableConfig" 
      pageName="Goods"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 80px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          :zoom-rate="1"
        />
      </template>
      <template #status="scope">
        <el-button size="small" plain :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? '上架' : '下架' }}</el-button>
      </template>
      <template #oldPrice="scope">
        <span>￥{{ scope.row["oldPrice"] }}</span>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from "./config/content.config"
import PageContent from "@/components/page-content"

export default defineComponent({
  name: 'goods',
  setup() {
    return {
      contentTableConfig
    }
  },
  components: { PageContent }
})
</script>

<style scoped></style>
