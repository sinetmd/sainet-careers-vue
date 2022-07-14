<template>
  <section>
    <h1>{{ action }} for everyone</h1>
    <h2>Find your next job at Sainet Corp.</h2>
  </section>
</template>

<script>
export default {
  name: "Headline",
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    // before to get removed from the DOM
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        const currentActionIndex = actions.indexOf(this.action); // 0 starts from build when it's finished
        const nextActionIndex = (currentActionIndex + 1) % 4; // give the index without getting out of the confines of the array
        const nextAction = actions[nextActionIndex];
        this.action = nextAction;
      }, 3000);
    },
  },
};
</script>
