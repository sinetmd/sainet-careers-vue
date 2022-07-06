<template>
  <img
    :src="imageLink"
    alt="profileImage"
    class="w-8 h-8 object-contain rounded-3xl"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink: "https://cdn-icons-png.flaticon.com/512/189/189001.png",
    };
  },
};
</script>
