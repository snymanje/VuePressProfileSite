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
            src="profile9.png"
          />
        </div>
        <div class="flex items-center justify-center mt-3">
          <a
            href="https://twitter.com/JeanSnyman"
            class="mx-3 text-gray-500 cursor-pointer hover:text-green-500"
          >
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
          <a
            href="https://github.com/snymanje"
            class="mx-3 text-gray-500 cursor-pointer hover:text-green-500"
          >
            <svg
              class="fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>GitHub</title>
              <path
                d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jean-snyman-js/"
            class="mx-3 text-gray-500 cursor-pointer hover:text-green-500"
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
