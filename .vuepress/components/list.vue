<template>
  <section class="text-gray-700 body-font">
    <div class="container px-2 py-2 mx-auto">
      <div class="flex flex-wrap text-center w-full px-4 my-10 mx-auto">
        <button
          @click="selectedTag = undefined"
          class="bg-green-500 text-white hover:bg-green-800 hover:text-white focus:outline-none font-semibold py-2 px-3 mr-2 mb-2 rounded shadow"
        >All</button>
        <button
          @click="selectedTag = $event.target.innerText"
          v-for="tag in getTags"
          class="text-gray-800 hover:bg-green-800 hover:text-white focus:outline-none font-semibold py-2 px-3 mr-2 mb-2 rounded shadow"
        >{{ tag }}</button>
      </div>
      <div class="flex flex-wrap mx-4 my-8">
        <div class="py-8 px-2 lg:w-1/3 w-full" v-for="page in files">
          <div class="h-full flex items-start shadow-lg px-1 py-2 rounded">
            <div class="w-12 flex-shrink-0 flex flex-col text-center leading-none">
              <span
                class="text-gray-500 pb-2 mb-2 border-b-2 border-gray-300"
              >{{ getDates(page.frontmatter.date).month }}</span>
              <span
                class="font-medium text-xl text-gray-800 title-font"
              >{{ getDates(page.frontmatter.date).day }}</span>
            </div>
            <div class="flex flex-col px-6 h-full">
              <div class="mb-auto">
                <h2
                  class="tracking-widest text-xs title-font font-medium text-green-500 mb-1"
                >{{page.frontmatter.tags[0].toUpperCase()}}</h2>
                <h1 class="title-font text-xl font-medium text-gray-800 my-2">
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
                  <span class="title-font font-medium text-gray-800">Jean Snyman</span>
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
  data() {
    return {
      selectedTag: undefined
    };
  },
  methods: {
    /* changeTag(event) {
      console.log(event);
    }, */
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
        if (this.selectedTag === undefined) {
          return (
            p.path.indexOf("/pages/") >= 0 &&
            p.relativePath !== "pages/readme.md"
          );
        } else {
          return (
            p.path.indexOf("/pages/") >= 0 &&
            p.relativePath !== "pages/readme.md" &&
            p.frontmatter.tags[0] === this.selectedTag
          );
        }
      });

      return blogs.sort(
        (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      );
    },
    getTags() {
      const pages = this.$site.pages.filter(p => {
        return (
          p.path.indexOf("/pages/") >= 0 && p.relativePath !== "pages/readme.md"
        );
      });

      const tags = pages.map(page => {
        return page.frontmatter.tags[0];
      });
      return [...new Set(tags)];
    }
  }
};
</script>
