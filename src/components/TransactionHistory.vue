<template>
  <div class="transaction-history">
    <div class="transaction-history__header">
      <img src="./../assets/icons/briefcase-transparent.png" />
      <h2>Recent Transactions</h2>
    </div>
    <div class="transaction-history__controls">
      <transaction-history-controls></transaction-history-controls>
    </div>
    <div
      class="transaction-history__transaction-list"
      v-if="sortedTransactions && sortedTransactions.length > 0"
    >
      <transaction-item
        v-for="(transaction, index) in this.sortedTransactions"
        :key="index"
        :transaction="transaction"
      ></transaction-item>
    </div>
    <div v-else>
      <p class="noTransactions">You have no transactions</p>
    </div>
  </div>
</template>

<script>
import TransactionHistoryControls from "./TransactionHistoryControls.vue";
import TransactionItem from "./TransactionItem.vue";

import Sorter from "./../mixins/Sorter.js";

export default {
  name: "TransactionHistory",
  components: {
    TransactionHistoryControls,
    TransactionItem
  },
  mixins: [Sorter],
  data() {
    return {
      sortedTransactions: []
    };
  },
  mounted() {
    this.$store.dispatch("getTransactions");
    this.sortTransactions();
  },
  watch: {
    /*
    * we want to listen for any changes to the sort / filter
    * then reapply the sort

    * the only exception to this is adding a new transaction
    * spec says to put that to the top regardless of sort type / direction

    * usually I'd re-sort on a new transaction too
    * and reset the sort type to "data" and descending direction
    * so the transaction would still be at the top.
    */

    sortDirection: function() {
      this.sortTransactions();
    },
    sortType: function() {
      this.sortTransactions();
    },
    filterValue: function() {
      this.sortTransactions();
    }
  },
  computed: {
    filteredTransactions: function() {
      return this.$store.getters.filteredTransactions;
    },
    sortDirection: function() {
      return this.$store.getters.sortDirection;
    },
    sortType: function() {
      return this.$store.getters.sortType;
    },
    filterValue: function() {
      return this.$store.getters.filterValue;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./../scss/_variables";

.transaction-history {
  width: 70%;
  height: fit-content;
  background-color: $white;
  box-shadow: -2px -2px 10px $box-shadow;
  margin-bottom: 25px;

  @media screen and (max-width: $bp-medium) {
    width: 100%;
    margin-top: 20px;
  }

  &__header {
    display: flex;
    padding: 17px 20px;
    background-color: $blue;

    & img {
      width: 25px;
      height: 25px;
      align-self: center;
    }

    & h2 {
      margin: 0 auto;
      color: $white;
      font-weight: $font-weight-thin;
      font-size: $font-size-larger;
      align-self: center;
    }
  }

  &__transaction-list {
    margin: 15px 15px;
    border-bottom: 2px solid $grey;
    border-right: 2px solid $grey;

    @media screen and (max-width: $bp-smallest) {
      margin: 15px 0;
    }
  }

  &__controls {
    margin: 15px 15px;

    @media screen and (max-width: $bp-smallest) {
      margin: 15px 5px;
    }
  }
}

.noTransactions {
  text-align: center;
  padding: 35px 0;
}
</style>
