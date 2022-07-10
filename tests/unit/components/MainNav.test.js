import { mount } from "@vue/test-utils";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("Sainet Careers");
  });

  it("displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
    const navigationMenuItem = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuText = navigationMenuItem.map((item) => item.text());
    expect(navigationMenuText).toEqual([
      "Teams",
      "Locations",
      "Life at Sainet",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const wrapper = mount(MainNav);

      // Find components in our app to be tested
      const logginButton = wrapper.find("[data-test='login-button']");
      expect(logginButton.exists()).toBe(true);
    });
  });

  describe("when user logs in", () => {
    it("displays user profile picture", async () => {
      const wrapper = mount(MainNav);

      // Find components in our app to be tested
      // const logginButton = wrapper.findComponent({ name: "ActionButton" });
      // const profileImage = wrapper.findComponent({ name: "ProfileImage" });
      // This solution is better because we are not so tight copupled with the html
      const profileImage = wrapper.find("[data-test='profile-image'");
      expect(profileImage.exists()).toBe(false);

      const logginButton = wrapper.find("[data-test='login-button']");

      // await logginButton.trigger("click");
      // expect(profileImage.exists()).toBe(true);
    });
  });
});
