import { mount } from "@vue/test-utils";

import Subnav from "@/components/Navigation/Subnav.vue";

describe("Subnav", () => {
  describe("when user is on job page", () => {
    it("displays job count", () => {
      const wrapper = mount(Subnav, {
        global: {
          // using fontawesome component as a stub for testing
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultPage: true,
          };
        },
      });

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });

  describe("when user is not on job page", () => {
    it("does NOT display job count", () => {
      const wrapper = mount(Subnav, {
        global: {
          // using fontawesome component as a stub for testing
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultPage: false,
          };
        },
      });

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
