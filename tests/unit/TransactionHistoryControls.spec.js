import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TransactionHistoryControls from "@/components/TransactionHistoryControls.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TransactionHistoryControls.vue", () => {
  let actions;
  let getters;
  let store;

  beforeEach(() => {
    actions = {
      setSortType: jest.fn(),
      changeSortDirection: jest.fn()
    };
    getters = {
      sortType: () => "date",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ actions, getters });
  });

  it("renders successfully as a Vue instance", () => {
    const wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("calls store correctly when date control clicked and type = 'date', direction = 0", () => {
    const wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    wrapper.find(".date").trigger("click");
    expect(actions.setSortType).not.toHaveBeenCalled();
    expect(actions.changeSortDirection).toHaveBeenCalled();
  });

  it("calls store correctly when date control clicked and type = 'date', direction = 1", () => {
    actions = {
      setSortType: jest.fn(),
      changeSortDirection: jest.fn()
    };
    getters = {
      sortType: () => "date",
      sortDirection: () => 1
    };
    store = new Vuex.Store({ actions, getters });
    const wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    wrapper.find(".date").trigger("click");
    expect(actions.setSortType).not.toHaveBeenCalled();
    expect(actions.changeSortDirection).toHaveBeenCalled();
  });

  it("calls store correctly when merchant control clicked and type = 'date', direction = 0", () => {
    actions = {
      setSortType: jest.fn(),
      changeSortDirection: jest.fn()
    };
    getters = {
      sortType: () => "date",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ actions, getters });
    const wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    wrapper.find(".merchant").trigger("click");
    expect(actions.changeSortDirection).not.toHaveBeenCalled();
    expect(actions.setSortType).toHaveBeenCalled();
  });

  it("calls store correctly when merchant control clicked and type = 'date', direction = 1", () => {
    actions = {
      setSortType: jest.fn(),
      changeSortDirection: jest.fn()
    };
    getters = {
      sortType: () => "date",
      sortDirection: () => 1
    };
    store = new Vuex.Store({ actions, getters });
    const wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    wrapper.find(".merchant").trigger("click");
    expect(actions.changeSortDirection).not.toHaveBeenCalled();
    expect(actions.setSortType).toHaveBeenCalled();
  });

  it("doesn't display cross when input is ''", () => {
    getters = {
      sortType: () => "date",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ getters });
    const wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    expect(wrapper.html()).not.toContain("clear-input");
  });

  it("displays cross when input is not empty", () => {
    getters = {
      sortType: () => "date",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ getters });
    let wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    wrapper.setData({ filterValue: "tea" });
    expect(wrapper.html()).toContain("clear-input");
  });

  it("calls correct action when clear-input is clicked", () => {
    actions = {
      setFilterValue: jest.fn()
    };
    getters = {
      sortType: () => "date",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    wrapper.setData({ filterValue: "tea" });
    wrapper.find("#clear-input").trigger("click");
    expect(actions.setFilterValue).toHaveBeenCalled();
  });

  it("calls correct action when input-filter is triggered", () => {
    actions = {
      setFilterValue: jest.fn()
    };
    getters = {
      sortType: () => "date",
      sortDirection: () => 0
    };
    store = new Vuex.Store({ actions, getters });
    let wrapper = shallowMount(TransactionHistoryControls, {
      store,
      localVue
    });
    wrapper.setData({ filterValue: "tea" });
    wrapper.find("#input-filter").trigger("input");
    expect(actions.setFilterValue).toHaveBeenCalled();
  });
});
