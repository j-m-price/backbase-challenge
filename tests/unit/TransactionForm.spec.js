import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TransactionForm from "@/components/TransactionForm.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TransactionForm.vue", () => {
  let actions;
  let getters;
  let store;

  beforeEach(() => {
    actions = {
      setPendingTransaction: jest.fn()
    };
    getters = {
      accountValue: () => "0"
    };
    store = new Vuex.Store({ actions, getters });
  });

  it("renders successfully as a Vue instance", () => {
    const wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("displays error message when accountTo is empty", () => {
    const wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.find(".submit-button").trigger("click");
    expect(wrapper.vm.errorMessage).toBe("Account required");
  });

  it("store action is not dispatched when accountTo is empty", () => {
    const wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.find(".submit-button").trigger("click");
    expect(actions.setPendingTransaction).not.toHaveBeenCalled();
  });

  it("displays error message when accountTo is valid, but ammount isn't", () => {
    let wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.setData({ toAccount: "to Merchant" });
    wrapper.find(".submit-button").trigger("click");
    expect(wrapper.vm.errorMessage).toBe("Amount must be greater than 0");
  });

  it("store action is not dispatched when amount is invalid", () => {
    let wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.setData({ toAccount: "to Merchant" });
    wrapper.find(".submit-button").trigger("click");
    expect(actions.setPendingTransaction).not.toHaveBeenCalled();
  });

  it("doesn't display error message when transaction takes account exactly to threshold", () => {
    let wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.setData({ toAccount: "to Merchant", transactionAmount: 500 });
    wrapper.find(".submit-button").trigger("click");
    expect(wrapper.vm.errorMessage).toBe(null);
  });

  it("displays error message when transaction takes account below threshold", () => {
    let wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.setData({ toAccount: "to Merchant", transactionAmount: 501 });
    wrapper.find(".submit-button").trigger("click");
    expect(wrapper.vm.errorMessage).toBe("Account cannot go below -$500.00");
  });

  it("displays error message when transaction amount is negative", () => {
    let wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.setData({ toAccount: "to Merchant", transactionAmount: -50 });
    wrapper.find(".submit-button").trigger("click");
    expect(wrapper.vm.errorMessage).toBe("Amount must be greater than 0");
  });

  it("no error message when form is valid", () => {
    let wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.setData({ toAccount: "to Merchant", transactionAmount: 100 });
    wrapper.find(".submit-button").trigger("click");
    expect(wrapper.vm.errorMessage).toBe(null);
  });

  it("store action is dispatched when form is valid", () => {
    let wrapper = shallowMount(TransactionForm, {
      store,
      localVue
    });
    wrapper.setData({ toAccount: "to Merchant", transactionAmount: 100 });
    wrapper.find(".submit-button").trigger("click");
    expect(actions.setPendingTransaction).toHaveBeenCalled();
  });
});
