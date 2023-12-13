<template>
  <div>
    <h1>
      欢迎使用vue3
    </h1>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const message = ref("Hello, Vue 3!");

    const greet = () => {
      console.log(message.value);
    };

    onMounted(() => {
      console.log("Component is mounted!");
    });

    return {
      message,
      greet,
    };
  },
};
</script>


<style></style>