import { ref } from 'vue'

interface dataTags {
  success: boolean;
  tags: Tag[];
}

export interface Tag {
  _id: string;
  label: string;
  image: string;
}


export const useTagsStore = defineStore('counter', () => {
  const { $api } = useNuxtApp(); 

const tags = ref<Tag[]>([])

const getTags = () => {
  return tags.value;
}

const fetchTags = async () => {
  if(tags.value.length) return;
  const data: dataTags = await $api('/tags');
  tags.value = data.tags;
}

return {
  getTags,
  fetchTags
}

})