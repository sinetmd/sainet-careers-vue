<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>

    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import JobListing from "@/components/JobResults/JobListing.vue";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    currentPage() {
      const pageString = this.$route.query.page || "1";
      return Number.parseInt(pageString);
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.jobs.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedJobs() {
      // if page property does not exist in our query obj
      // we will fallback to our string of 1
      const pageString = this.$route.query.page || "1";
      const pageNumber = Number.parseInt(pageString); // parse to number
      // page 1 => 1-1 = 0 => first job at index 0; page 2 => 2-1=1 => 1*10 = 10 first item on page 2 is 10th
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10; // page 1 -> lastIndexJob = 10
      return this.jobs.slice(firstJobIndex, lastJobIndex); // return an array of first job index and last job index
    },
  },
  async mounted() {
    const baseUrl = process.env.VUE_APP_API_URL;
    const response = await axios.get(`${baseUrl}/jobs`);
    this.jobs = response.data;
  },
};
</script>
