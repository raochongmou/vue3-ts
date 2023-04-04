<template>
  <div class="rcm-form">
    <div class="rcm-form-header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row :gutter="10">
        <el-col v-bind="adaptiveLayout" v-for="form in formItems" :key="form.id">
          <el-form-item :label="form.label" :style="itemStyle" v-if="!form.isHidden">
            <template v-if="form.type === 'input' || form.type === 'password'">
              <el-input 
                v-model="formData[`${form.field}`]"
                :placeholder="form.placeholder" 
                :show-password="form.type === 'password'"
              />
            </template>
            <template v-if="form.type === 'select'">
              <el-select v-model="formData[`${form.field}`]" style="width: 100%;">
                <el-option
                  v-for="option in form.option"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
            <template v-if="form.type === 'datepicker'">
              <el-date-picker 
                v-model="formData[`${form.field}`]"
                style="width: 100%;"
                v-bind="form.otherOptions"
              />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="rcm-form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItems } from '../types';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItems[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "120"
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: "10px 20px"
      })
    },
    adaptiveLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const formData = ref({...props.modelValue});
    // emit("update:modelValue", formData);
    watch(formData, (newValue) => {
      emit("update:modelValue", newValue);
    }, {
      deep: true
    });
    return {
      formData
    }
  },
})
</script>

<style lang="less" scoped>
.rcm-form {
  padding: 1px;
  .rcm-form-header {
    margin: 15px;
    color: red;
    text-align: left;
    
  }
  .rcm-form-footer {
    text-align: right;
    margin-bottom: 15px;
    ::v-deep {
      .el-button:nth-child(2) {
        margin-right: 30px;
      }
    }
  }
}
</style>
