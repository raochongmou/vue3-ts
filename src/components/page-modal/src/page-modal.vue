<template>
  <el-dialog v-model="centerDialogVisible" title="新建用户" width="30%" center destroy-on-close>
    <rcm-form v-model="formData" v-bind="pageModalConfig" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import RcmForm from "@/base-ui"
import { useStore } from "@/store";

export default defineComponent({
  components: { RcmForm },
  props: {
    pageModalConfig: {
      type: Object,
      required: true
    },
    modalForm: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log("props", props.modalForm);
    
    const centerDialogVisible = ref(false);
    const formData = ref({});
    const store = useStore();
    watch(() => props.modalForm, (newVal) => {
      console.log('newVal', newVal);
      for(const item of props.pageModalConfig.formItems) {
        formData.value[`${item.field}`] = newVal[`${item.field}`];
      }
    })
    const handleConfirm = () => {
      console.log("formData.value", formData.value);
      
      centerDialogVisible.value = false;
      let pageName = props.pageName;
      const data = {...formData.value};
      if(Object.keys(formData.value).length) {
        // 编辑
        const { id } = props.modalForm;
        // pageName = `/${pageName}/${id}`;
        store.dispatch("systemModule/handleEditAction", {
          pageName,
          id,
          data
        });
      } else {
        store.dispatch("systemModule/handleAddAction", {
          pageName,
          data
        })
      }
    }
    return {
      centerDialogVisible,
      formData,
      handleConfirm
    }
  },
})
</script>
