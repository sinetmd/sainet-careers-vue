import { shallowMount } from "@vue/test-utils";

import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", () => {
    const wrapper = shallowMount(MainNav);
    expect(wrapper.text()).toMatch("Sainet Careers");
  });

  it("displays menu items for navigation", () => {
    const wrapper = shallowMount(MainNav);
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
      const wrapper = shallowMount(MainNav);

      // Find components in our app to be tested
      const logginButton = wrapper.find("[data-test='login-button']");
      expect(logginButton.exists()).toBe(true);
    });
  });

  describe("when user logs in", () => {
    it("displays user profile picture", async () => {
      const wrapper = shallowMount(MainNav);

      // Find components in our app to be tested
      // const logginButton = wrapper.findComponent({ name: "ActionButton" });
      // const profileImage = wrapper.findComponent({ name: "ProfileImage" });
      // This solution is better because we are not so tight copupled with the html
      let profileImage = wrapper.find("[data-test='profile-image'");
      expect(profileImage.exists()).toBe(false);

      const logginButton = wrapper.find("[data-test='login-button']");
      await logginButton.trigger("click");

      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    it("displays subnavigation with additional information", async () => {
      const wrapper = shallowMount(MainNav);

      let subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(false);

      const logginButton = wrapper.find("[data-test='login-button']");
      await logginButton.trigger("click");

      subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
