<template>
  <div class="rcm-table">
    <div class="rcm-table-header">
      <slot name="header">
        <div class="rcm-table-header-title">
          {{ title }}
        </div>
      </slot>
      <slot name="headerHandler"></slot>
    </div>
    <el-table 
      :data="usersList" 
      border
      v-bind="expandConfig"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
     >
      <el-table-column 
        v-if="isShowSelect"
        type="selection"
        align="center"
        width="60"
      />
      <el-table-column 
        v-if="isShowIndex"
        type="index"
        label="序号"
        width="80"
        align="center"
      />
      <template v-for="col in tabelConfig" :key="col.prop">
        <el-table-column 
          align="center"
          v-bind="col"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="col.slotName" :row="scope.row">
              {{ scope.row[col.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="rcm-table-footer">
      <slot name="footer">
        
        <!-- :current-page="page.currentPage"
        :page-size="page.pageSize" -->
        <el-pagination
          v-model:current-page="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[2, 3, 5, 8]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "RcmTable",
  props: {
    // 分页相关属性
    pageTotal: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    },
    title: {
      type: String,
      default: ""
    },
    usersList: {
      type: Array,
      required: true
    },
    tabelConfig: {
      type: Array,
      required: true
    },
    isShowSelect: {
      type: Boolean,
      default: false
    },
    isShowIndex: {
      type: Boolean,
      default: false
    },
    // 表格展开配置项
    expandConfig: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    "handleSelectionChange",
    "update:page"
  ],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("handleSelectionChange", value)
    }
    // 分页器
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (val: number) => {
      emit("update:page", { ...props.page, val});
    }
    const handleCurrentChange = (val: number) => {
      emit("update:page", { ...props.page, val});
    }
    return {
      handleSelectionChange,
      small,
      background,
      disabled,
      handleSizeChange,
      handleCurrentChange
    }
  },
})
</script>

<style lang="less" scoped>
.rcm-table {
  .rcm-table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .rcm-table-header-title {}
  }
  .rcm-table-footer {
    display: flex;
    margin-top: 15px;
    justify-content: flex-end;
  }
}
</style>
