import { shallowMount } from "@vue/test-utils";

import ProfileImage from "@/components/ProfileImage.vue";

describe("ProfileImage", () => {
  it("renders", () => {
    const wrapper = shallowMount(ProfileImage);
    // if component exists (not null, undefined)
    expect(wrapper.exists()).toBe(true);
  });
});
