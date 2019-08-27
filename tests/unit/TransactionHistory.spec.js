import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TransactionHistory from "@/components/TransactionHistory.vue";

import Transactions from "@/mock-data/transactions.json";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TransactionHistory.vue", () => {
  let actions;
  let getters;
  let store;

  beforeEach(() => {
    actions = {
      getTransactions: jest.fn()
    };
    getters = {
      filteredTransactions: () => []
    };
    store = new Vuex.Store({ actions, getters });
  });

  it("renders successfully as a Vue instance", () => {
    const wrapper = shallowMount(TransactionHistory, { store, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("calls getTransactions() when mounted", () => {
    const wrapper = shallowMount(TransactionHistory, { store, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(actions.getTransactions).toHaveBeenCalled();
  });

  it("renders 'You have no transactions' when filteredTransactions is empty", () => {
    const wrapper = shallowMount(TransactionHistory, { store, localVue });
    expect(wrapper.html()).toContain("You have no transactions");
  });

  it("doesn't render 'You have no transactions' when sortedTransactions contains a valid transaction", () => {
    actions = {
      getTransactions: jest.fn()
    };
    getters = {
      filteredTransactions: () => []
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistory, { store, localVue });
    wrapper.setData({ sortedTransactions: Transactions.data });
    expect(wrapper.html()).not.toContain("You have no transactions");
  });

  it("renders a header with an image", () => {
    const wrapper = shallowMount(TransactionHistory, { store, localVue });
    expect(wrapper.contains(".transaction-history__header > img")).toBe(true);
  });

  it("sorts by date correctly when store type = 'date' and direction = 0", () => {
    actions = {
      getTransactions: jest.fn()
    };
    getters = {
      filteredTransactions: () => Transactions.data,
      sortType: () => "date",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistory, { store, localVue });
    wrapper.setData({ sortedTransactions: Transactions.data });
    wrapper.vm.sortTransactions();
    expect(wrapper.vm.sortedTransactions[0].transactionDate).toBe(
      1476933842000
    );
  });

  it("sorts by date correctly when store type = 'date' and direction = 1", () => {
    actions = {
      getTransactions: jest.fn()
    };
    getters = {
      filteredTransactions: () => Transactions.data,
      sortType: () => "date",
      sortDirection: () => 1
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistory, { store, localVue });
    wrapper.setData({ sortedTransactions: Transactions.data });
    wrapper.vm.sortTransactions();
    expect(wrapper.vm.sortedTransactions[0].transactionDate).toBe(
      1476455042000
    );
  });

  it("sorts by merchant correctly when store type = 'merchant' and direction = 0", () => {
    actions = {
      getTransactions: jest.fn()
    };
    getters = {
      filteredTransactions: () => Transactions.data,
      sortType: () => "merchant",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistory, { store, localVue });
    wrapper.setData({ sortedTransactions: Transactions.data });
    wrapper.vm.sortTransactions();
    expect(wrapper.vm.sortedTransactions[0].merchant).toBe("Whole Foods");
  });

  it("sorts by merchant correctly when store type = 'merchant' and direction = 1", () => {
    actions = {
      getTransactions: jest.fn()
    };
    getters = {
      filteredTransactions: () => Transactions.data,
      sortType: () => "merchant",
      sortDirection: () => 1
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistory, { store, localVue });
    wrapper.setData({ sortedTransactions: Transactions.data });
    wrapper.vm.sortTransactions();
    expect(wrapper.vm.sortedTransactions[0].merchant).toBe("7-Eleven");
  });

  it("sorts by amount correctly when store type = 'amount' and direction = 0", () => {
    actions = {
      getTransactions: jest.fn()
    };
    getters = {
      filteredTransactions: () => Transactions.data,
      sortType: () => "amount",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistory, { store, localVue });
    wrapper.setData({ sortedTransactions: Transactions.data });
    wrapper.vm.sortTransactions();
    expect(wrapper.vm.sortedTransactions[0].amount).toBe("142.95");
  });

  it("sorts by amount correctly when store type = 'amount' and direction = 1", () => {
    actions = {
      getTransactions: jest.fn()
    };
    getters = {
      filteredTransactions: () => Transactions.data,
      sortType: () => "amount",
      sortDirection: () => 1
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistory, { store, localVue });
    wrapper.setData({ sortedTransactions: Transactions.data });
    wrapper.vm.sortTransactions();
    expect(wrapper.vm.sortedTransactions[0].amount).toBe("19.72");
  });
});
