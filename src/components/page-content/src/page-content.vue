<template>
  <div class="page-content">
    <rcm-table 
      :usersList="list" 
      :pageTotal="pageTotal"
      v-bind="contentTableConfig"
      v-model:page="page"
      @handle-selection-change="handleSelectionChange"
    >
      <template #headerHandler="scope">
        <div>
          <!-- <el-button type="primary" size="small">查阅</el-button> -->
          <el-button v-if="showAdd" type="primary" size="small" @click="handleAdd">新建</el-button>
          <el-button v-if="showUpdate" type="primary" size="small">编辑</el-button>
          <el-button v-if="showDelete" plain type="danger" size="small" icon="Delete" @click="handleDelete(scope)"/>
          <el-button plain size="small" icon="Refresh"/>
        </div>
      </template>
      <template #createAt="scope">
        <strong>
          {{ $filters.formatTime(scope.row.createAt) }}
        </strong>
      </template>
      <template #updateAt="scope">
        <strong>
          {{ $filters.formatTime(scope.row.updateAt) }}
        </strong>
      </template>
      <!-- 由最外层父组件决定该插槽内容,而不是每增加一个特殊插槽就在该位置放一个 -->
      <template v-for="other in otherPropSlots" :key="other.prop" #[other.slotName]="scope">
        <template v-if="other.slotName">
          <slot :name="other.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <template #actions="scope">
        <el-row>
          <el-col :span="12">
            <el-button v-if="showUpdate" type="text" size="small" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
          </el-col>
          <el-col :span="12">
            <el-button v-if="showDelete" type="text" size="small" icon="delete" @click="handleDelete(scope)">删除</el-button>
          </el-col>
        </el-row>
      </template>
    </rcm-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { RcmTable } from "@/base-ui"
import { useStore } from "@/store"
import { usePermission } from "@/hooks/use-permission";

export default defineComponent({
  name: "PageContent",
  props: {
    pageName: {
      type: String,
      required: true
    },
    contentTableConfig: {
      type: Object,
      required: true
    }
  },
  // emits: ["handleAdd"],
  setup(props, { emit }) {
    const store = useStore();
    // 按钮权限
    const showAdd = usePermission(props.pageName, "create");
    const showDelete = usePermission(props.pageName, "delete");
    const showUpdate = usePermission(props.pageName, "update");
    const showQuery = usePermission(props.pageName, "query");
    const page = ref({
      pageSize: 2,
      currentPage: 1
    });
    watch(page, () => getPageLists())
    const getPageLists = (queryLists?: any) => {
      if(!showQuery) return;
      store.dispatch("systemModule/getPageList", {
        pageUrl: props.pageName,
        queryList: {
          offset: (page.value.currentPage - 1) * page.value.pageSize,
          size: page.value.pageSize,
          ...queryLists
        }
      });
    }
    getPageLists();
    const list = computed(() => store.getters["systemModule/getPageList"](props.pageName))
    const pageTotal = computed(() => store.getters["systemModule/getPageTotal"](props.pageName));
    const handleSelectionChange = (value: any) => {
      console.log('value', value);
    };
    // 插槽的使用
    const otherPropSlots = props.contentTableConfig.tabelConfig.filter(item => {
      if(item.slotName === "createAt" 
      || item.slotName === "updateAt"
      || item.slotName === "actions"
      ) {
        return false;
      }
      return true;
    });

    // 删除
    const handleDelete = ({row}) => {
      const { id } = row;
      
      store.dispatch("systemModule/deleteAction", { id, pageName: props.pageName });
    }
    const handleAdd = () => {
      emit("handleAdd");
    }
    const handleEdit = (row) => {
      emit("handleEdit", row);
    }
    return {
      list,
      page,
      pageTotal,
      handleSelectionChange,
      getPageLists,
      otherPropSlots,
      showAdd,
      showUpdate,
      showDelete,
      handleDelete,
      handleAdd,
      handleEdit
    }
  },
  components: { RcmTable }
})
</script>


<style lang="less" scoped>
.page-content {
  padding: 30px;
  border-top: 25px solid #f5f5f5;
}
::v-deep {
  .el-table .el-table__cell {
    position: static;
  }
}

</style>