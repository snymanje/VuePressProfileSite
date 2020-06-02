<template>
  <section>
    <div class="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
      <div
        class="lg:w-3/4 md:w-2/4 flex flex-col lg:pr-40 md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
      >
        <h1 class="title-font sm:text-5xl text-4xl mb-2 font-medium text-gray-900">About me</h1>
        <div class="flex mb-4">
          <div class="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
        </div>
        <p class="mb-8 leading-relaxed">
          I'm a Software Engineer with more than 18 years experience in
          Information Technology who loves solving problems with the latest
          tech. I specialize in Full Stack Web Development, Robotic Processes
          Automation and Machine Learning.
        </p>
        <div class="flex justify-center">
          <button
            class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
          >Blog</button>
        </div>
      </div>
      <div class="lg:w-1/4 md:w-2/4 flex flex-col justify-center lg:ml-6 md:ml-1">
        <div>
          <img
            class="mx-auto object-cover object-center rounded-full w-56 h-56"
            alt="hero"
            src="../public/profile9.png"
          />
        </div>
        <div class="flex items-center justify-center mt-3">
          <a href="https://twitter.com/JeanSnyman" class="mx-3 text-gray-500 cursor-pointer">
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path
                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
              />
            </svg>
          </a>
          <a href="https://github.com/snymanje" class="mx-3 text-gray-500 cursor-pointer">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jean-snyman-js/"
            class="mx-3 text-gray-500 cursor-pointer"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0"
              class="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <circle cx="4" cy="4" r="2" stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
