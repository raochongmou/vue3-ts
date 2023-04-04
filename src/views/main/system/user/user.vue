<template>
  <div class="user">
    <page-search 
      :pageSearchConfig="formSearchConfig" 
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <page-content 
      ref="pageContentRef" 
      :contentTableConfig="contentTableConfig" 
      pageName="Users"
      @handleAdd="handleAdd"
      @handleEdit="handleEdit"
    >
      <template #status="scope">
        <el-button size="small" plain :type="scope.row.enable ? 'success' : 'danger'">{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
      </template>
    </page-content>
    <page-modal pageName="users" :pageModalConfig="pageModalConfigRef" ref="pageModalRef" :modalForm="modalForm"/>
  </div>
</template>

<script lang="ts">
import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"
import { defineComponent, ref, computed } from "vue"
import { useStore } from "@/store";
import { formSearchConfig } from "./config/form.config"
import { contentTableConfig } from "./config/content.config"
import { pageModalConfig } from "./config/modal.config"
import { usePage } from "@/hooks/use-page-hook";
import { usePageModal } from "@/hooks/use-page-modal";

export default defineComponent({
    name: "user",
    setup() {
      const store = useStore();
      const pageModalConfigRef = computed(() => {
        // 部门下拉列表
        const departmentId = pageModalConfig.formItems.find(item => {
          return item.field === "departmentId";
        });
        const entirDepartment = store.state.entirDepartment.map(item => {
          return {label: item.name, value: item.id};
        });
        departmentId.option = entirDepartment;
        // 角色下拉列表
        const roleId = pageModalConfig.formItems.find(item => {
          return item.field === "roleId";
        });
        const entirRole = store.state.entirRole.map(item => {
          return {label: item.name, value: item.id};
        });
        roleId.option = entirRole;
        return pageModalConfig;
      })
      const callbackAdd = () => {
        const passwordItem = pageModalConfig.formItems.find(item => item.field === "password");
        passwordItem.isHidden = false;
      };
      const callbackEdit = () => {
        const passwordItem = pageModalConfig.formItems.find(item => item.field === "password");
        passwordItem.isHidden = true;
      };
      const [pageContentRef, handleSearch, handleReset] = usePage();
      const [pageModalRef, modalForm, handleAdd, handleEdit] = usePageModal(callbackAdd, callbackEdit);
      const centerDialogVisible = ref(true);
      
      return {
        contentTableConfig,
        formSearchConfig,
        handleSearch,
        handleReset,
        pageContentRef,
        centerDialogVisible,
        pageModalConfigRef,
        handleAdd,
        pageModalRef,
        handleEdit,
        modalForm
      }
    },
    components: { PageSearch, PageContent, PageModal }
})
</script>
