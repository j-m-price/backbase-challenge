<template>
  <div class="header">
    <img :src="this.logo" alt="Peachtree Bank Logo" />
  </div>
</template>

<script>
import Logo from "./../assets/icons/logo.jpg";
export default {
  name: "Header",
  data() {
    return {
      logo: Logo
    };
  }
};
</script>

<style scoped lang="scss">
@import "./../scss/_variables";

.header {
  width: 100%;
  display: flex;
  border-bottom: 2px solid $orange;

  & img {
    padding: 20px 5%;
    height: 35px;

    @media screen and (max-width: $bp-smallest) {
      max-width: 250px;
    }
  }
}
</style>
