import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Transactions from "./mock-data/transactions.json";
import TransactionBuilder from "./utils/TransactionBuilder.js";

export default new Vuex.Store({
  state: {
    account: {
      value: 5824.76
    },
    transactions: [],
    pendingTransaction: null,
    filterValue: "",
    sort: {
      type: "date",
      direction: 0
    }
  },
  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
    setPendingTransaction(state, transaction) {
      state.pendingTransaction = transaction;
    },
    confirmPendingTransaction(state) {
      const transaction = TransactionBuilder.build(state.pendingTransaction);
      state.transactions.unshift(transaction);
      state.pendingTransaction = null;
      state.account.value -= transaction.amount;
    },
    setFilterValue(state, value) {
      state.filterValue = value;
    },
    setSortType(state, type) {
      state.sort.type = type;
    },
    changeSortDirection(state) {
      let direction = state.sort.direction === 0 ? 1 : 0;
      state.sort.direction = direction;
    }
  },
  actions: {
    getTransactions({ commit }) {
      // this would normally use a http client to get the data.
      // but for this project, we're just using the mock data.
      commit("setTransactions", Transactions.data);
    },

    setPendingTransaction({ commit }, transaction) {
      commit("setPendingTransaction", transaction);
    },
    cancelPendingTransaction({ commit }) {
      commit("setPendingTransaction", null);
    },
    commitPendingTransaction({ commit }) {
      commit("confirmPendingTransaction", null);
    },
    setFilterValue({ commit }, value) {
      commit("setFilterValue", value);
    },
    setSortType({ commit }, type) {
      commit("setSortType", type);
    },
    changeSortDirection({ commit }) {
      commit("changeSortDirection");
    }
  },
  getters: {
    transactions: state => {
      return state.transactions;
    },
    accountValue: state => {
      return state.account.value;
    },
    filterValue: state => {
      return state.filterValue;
    },
    pendingTransaction: state => {
      return state.pendingTransaction;
    },
    sortType: state => {
      return state.sort.type;
    },
    sortDirection: state => {
      return state.sort.direction;
    },
    // this doesn't belong here.
    // move to util file
    // call from component
    filteredTransactions: state => {
      const value = state.filterValue.toLowerCase();
      if (value.trim() === "") return state.transactions;
      return state.transactions.filter(
        ({ merchant, amount, transactionType }) =>
          merchant.toLowerCase().includes(value) ||
          amount.toString().includes(value) ||
          transactionType.toLowerCase().includes(value)
      );
    }
  }
});
