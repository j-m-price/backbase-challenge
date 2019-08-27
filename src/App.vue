<template>
  <div id="app">
    <Header></Header>
    <Account></Account>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Account from "./views/Account.vue";

export default {
  name: "app",
  components: {
    Header,
    Account
  }
};
</script>

<style lang="scss">
@import "./scss/_variables";

html,
body {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0;
  font-family: $font-family;
}

input {
  font-size: $font-size-small;
}
</style>
