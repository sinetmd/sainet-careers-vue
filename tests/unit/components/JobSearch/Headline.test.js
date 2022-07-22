import { nextTick } from "vue"; // like a refresh
import { mount } from "@vue/test-utils";

import Headline from "@/components/JobSearch/Headline";

describe("Headline", () => {
  // before every test starts running
  beforeEach(() => {
    jest.useFakeTimers("legacy");
  });

  // after each test
  afterEach(() => {
    jest.useRealTimers();
  });

  it("displays introductery action verb", () => {
    const wrapper = mount(Headline);
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Build for everyone");
  });

  it("changes action verbe at a consistent interval", () => {
    mount(Headline);
    expect(setInterval).toHaveBeenCalled();
  });

  it("swaps action verb after first interval", async () => {
    const wrapper = mount(Headline);
    jest.runOnlyPendingTimers();
    await nextTick();
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Create for everyone");
  });

  it("removes internal when component dissapears", () => {
    const wrapper = mount(Headline);
    wrapper.unmount(); // unmounts the component
    expect(clearInterval).toHaveBeenCalled();
  });
});
