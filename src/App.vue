<template lang="pug">
  div
    TheLayout
</template>

<script lang="ts">

import TheLayout from '@/components/TheLayout.vue';
import { vxm } from '@/store/store';

// const firstInit = async () => {
//   await vxm.myStore.doFirstInit();
// };
//
// firstInit();


export default {
  name: 'App',
  components: { TheLayout },
};


</script>
