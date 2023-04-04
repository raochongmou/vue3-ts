import { ref } from "vue";
import PageModal from "@/components/page-modal";
type TCallBackFn = () => void;
export function usePageModal(callbackAdd: TCallBackFn, callbackEdit: TCallBackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>('');
  const modalForm = ref({});
  const handleAdd = () => {
    if(pageModalRef.value) {
      modalForm.value = {};
      pageModalRef.value.centerDialogVisible = true;
    }
    callbackAdd && callbackAdd();
  }
  const handleEdit = (row) => {
    if(pageModalRef.value) {
      modalForm.value = {...row};
      pageModalRef.value.centerDialogVisible = true;
    }
    callbackEdit && callbackEdit();
  }
  return [pageModalRef, modalForm, handleAdd, handleEdit]
}
