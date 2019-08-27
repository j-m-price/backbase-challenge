import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  it("renders successfully as a Vue instance", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("contains one image", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.contains("img")).toBe(true);
    expect(wrapper.html()).toContain('alt="Peachtree Bank Logo"');
  });

  it("image has help text 'Peachtree Bank Logo'", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.html()).toContain('alt="Peachtree Bank Logo"');
  });
});
