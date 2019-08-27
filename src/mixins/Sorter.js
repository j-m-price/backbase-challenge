export default {
  /*
   * sorts the filtered transaction list from the store
   * depending on the sort type, the appropriate sort function is called
   * the result is assigned to sortedTransactions
   */
  methods: {
    sortTransactions() {
      let transactions;

      if (this.sortType === "date")
        transactions = this.sortByDate(
          this.sortDirection,
          this.filteredTransactions
        );
      else if (this.sortType === "merchant")
        transactions = this.sortByMerchant(
          this.sortDirection,
          this.filteredTransactions
        );
      else if (this.sortType === "amount")
        transactions = this.sortByAmount(
          this.sortDirection,
          this.filteredTransactions
        );

      this.sortedTransactions = transactions;
    },
    /*
     * all of the sort functions here are very similar
     * the only diffrence is the type of data being compared
     * the direction decides the sort order
     */
    sortByDate(direction, transactions) {
      if (direction === 0) {
        return transactions.sort((a, b) => {
          a = new Date(a.transactionDate);
          b = new Date(b.transactionDate);
          return a > b ? -1 : a < b ? 1 : 0;
        });
      } else {
        return transactions.sort((a, b) => {
          a = new Date(a.transactionDate);
          b = new Date(b.transactionDate);
          return a < b ? -1 : a > b ? 1 : 0;
        });
      }
    },
    sortByMerchant(direction, transactions) {
      if (direction === 0) {
        return transactions.sort((a, b) => {
          a = a.merchant.toLowerCase();
          b = b.merchant.toLowerCase();

          return b < a ? -1 : b > a ? 1 : 0;
        });
      } else {
        return transactions.sort((a, b) => {
          a = a.merchant.toLowerCase();
          b = b.merchant.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });
      }
    },
    sortByAmount(direction, transactions) {
      if (direction === 0) {
        return transactions.sort(
          (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
        );
      } else {
        return transactions.sort(
          (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
        );
      }
    }
  }
};
