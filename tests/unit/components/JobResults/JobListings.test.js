import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios"); // mock the axios

import JobListings from "@/components/JobResults/JobListings.vue";

beforeEach(() => {
  axios.get.mockResolvedValue({ data: Array(15).fill({}) });
});

// clear every single implementation
// that they are isolated from each other
describe("JobListings", () => {
  afterEach(() => {
    axios.get.mockReset(); // clear custom implementation that we have setup mockResolveValue
  });

  const url = "http://myfakeapi.com/jobs";

  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const createConfig = ($route) => ({
    global: {
      mocks: {
        $route,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("fetches jobs", () => {
    axios.get.mockResolvedValue({ data: [] }); // mocking the data from our response
    const $route = createRoute();
    shallowMount(JobListings, createConfig($route));
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it("create a job listing for a maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const queryParams = { page: "1" }; // query params to overwrite the page number in our createRoute()
    const $route = createRoute(queryParams);

    const wrapper = shallowMount(JobListings, createConfig($route));

    await flushPromises(); // ensure data is loaded
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query pramas include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 2");
    });
  });

  describe("when user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    // with fit we tell the jest to run only this test on this file
    // and don't worry about the rest of tests
    it("does not show link to next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));

      await flushPromises();

      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when user is on the last page of job results", () => {
    it("does not show link to next page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));

      await flushPromises();

      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));

      await flushPromises();

      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});
