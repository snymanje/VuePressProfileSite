<template>
  <section class="text-gray-700 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-800">Latest Blog Posts</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          This is where I document my work and learnings for my future self
          and then share it with the rest of the world.
        </p>
      </div>
      <div class="flex flex-wrap -mx-4 -my-8">
        <div class="py-8 px-4 lg:w-1/3" v-for="page in files">
          <div class="h-full flex items-start shadow-lg px-1 py-2 rounded">
            <div class="w-12 flex-shrink-0 flex flex-col text-center leading-none">
              <span
                class="text-gray-500 pb-2 mb-2 border-b-2 border-gray-300"
              >{{ getDates(page.frontmatter.date).month }}</span>
              <span
                class="font-medium text-xl text-gray-800 title-font"
              >{{ getDates(page.frontmatter.date).day }}</span>
            </div>
            <div class="flex flex-col pl-6 h-full">
              <div class="mb-auto">
                <h2
                  class="tracking-widest text-xs title-font font-medium text-green-500 mb-1"
                >MACHINE LEARNING</h2>
                <h1 class="title-font text-xl font-medium text-gray-800 mb-3">
                  <a v-bind:href="page.path">{{page.title}}</a>
                </h1>
                <p class="leading-relaxed mb-5">{{page.frontmatter.excerpt}}</p>
              </div>

              <a class="inline-flex items-center">
                <img
                  alt="blog"
                  src="../public/profile9.png"
                  class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                />
                <span class="flex-grow flex flex-col pl-3">
                  <span class="title-font font-medium text-gray-900">Jean Snyman</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    getDates(dateAsString) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const newDate = new Date(dateAsString);
      return {
        day: newDate.getDate(),
        month: monthNames[newDate.getMonth()]
      };
    }
  },
  computed: {
    files() {
      const blogs = this.$site.pages.filter(p => {
        return (
          p.path.indexOf("/pages/") >= 0 && p.relativePath !== "pages/readme.md"
        );
      });
      const blogsSorted = blogs.sort(
        (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      );
      return blogsSorted.slice(0, 3);
    }
  }
};
</script>
