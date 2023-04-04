<template>
  <div>
    <div class="user-search">
      <RcmForm v-bind="pageSearchConfig" v-model="formData">
        <template #header>
          高级搜索
        </template>
        <template #footer>
          <el-button @click="handleSearch" type="primary" size="small" icon="Search">搜索</el-button>
          <el-button @click="handleReset" type="success" palin size="small" icon="RefreshLeft">重置</el-button>
        </template>
      </RcmForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import RcmForm from '@/base-ui';

export default defineComponent({
  props: {
    pageSearchConfig: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const formData = ref();
    const copyFormData: any = {};
    for(const key of props.pageSearchConfig.formItems) {
      copyFormData[key.field] = "";
    }
    formData.value = copyFormData;
    const handleReset = () => {
      for(const item of props.pageSearchConfig.formItems) {
        formData.value[item.field] = "";
      }
      emit("handleReset");
    };
    const handleSearch = () => {
      emit("handleSearch", formData.value);
    }
    return {
      formData,
      handleReset,
      handleSearch
    }
  },
  components: { RcmForm }
})
</script>
