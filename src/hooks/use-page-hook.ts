import { ref } from "vue"
import PageContent from "@/components/page-content"

export function usePage() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleSearch = (queryList: any) => {
    pageContentRef.value?.getPageLists(queryList);
  };
  const handleReset = () => {
    pageContentRef.value?.getPageLists();
  };
  return [pageContentRef, handleSearch, handleReset];
}