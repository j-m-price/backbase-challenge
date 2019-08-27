<template>
  <div class="account">
    <transaction-form></transaction-form>
    <transaction-history></transaction-history>
    <transaction-confirmation-modal v-if="transactionConfirmationNeeded"></transaction-confirmation-modal>
  </div>
</template>

<script>
import TransactionForm from "./../components/TransactionForm.vue";
import TransactionHistory from "./../components/TransactionHistory.vue";
import TransactionConfirmationModal from "./../components/TransactionConfirmationModal.vue";

export default {
  name: "Account",
  components: {
    TransactionForm,
    TransactionHistory,
    TransactionConfirmationModal
  },
  computed: {
    // if there's a pending transaction in the store
    // then the confirmation modal is displayed
    transactionConfirmationNeeded: function() {
      return this.$store.getters.pendingTransaction;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./../scss/_variables";

.account {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5%;
  padding-top: 50px;
  // TODO: use variables for this
  min-height: calc(100vh - 127px);
  background: url(./../assets/background.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media screen and (max-width: $bp-medium) {
    flex-direction: column;
  }

  @media screen and (max-width: $bp-small) {
    padding: 0 0.5%;
    padding-top: 20px;
  }

  @media screen and (max-width: $bp-smallest) {
    padding: 0;
    padding-top: 15px;
  }
}
</style>
