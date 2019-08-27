import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Account from "@/views/Account.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Account.vue", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store();
  });

  it("renders successfully as a Vue instance", () => {
    const wrapper = shallowMount(Account, { store, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
