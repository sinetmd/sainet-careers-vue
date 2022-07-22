<template>
  <!-- only one top level parent (best practice) -->
  <div>
    <main-nav />
    <hero />
  </div>
</template>
<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import Hero from "@/components/JobSearch/Hero.vue";

export default {
  name: "App",
  components: {
    MainNav,
    Hero,
  },
};
</script>
