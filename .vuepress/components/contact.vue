<template>
  <section id="contact" class="text-gray-700 body-font pb-8">
    <div>
      <div class="container mx-auto flex flex-col text-center w-full pb-8 pt-12 px-4">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-800">Contact Me</h1>
        <span class="bg-green-700 w-12 h-1 flex self-center mb-4"></span>
      </div>
    </div>

    <div class="container px-2 mx-auto flex sm:flex-no-wrap flex-wrap">
      <div
        class="w-full lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-0 sm:p-10 flex items-end justify-start relative"
      >
        <iframe
          width="100%"
          height="100%"
          class="absolute inset-0 hidden sm:block"
          frameborder="0"
          title="map"
          marginheight="0"
          marginwidth="0"
          scrolling="no"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26500.125895823097!2d18.683736480834042!3d-33.87636908149919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc517069bb8227%3A0xbc1e066d3caf5d2d!2sBrackenfell%2C%20Cape%20Town!5e0!3m2!1sen!2sza!4v1592043814780!5m2!1sen!2sza"
          style="filter: grayscale(0) contrast(1.2) opacity(0.9);"
        ></iframe>
        <div
          class="bg-white relative flex flex-wrap w-full justify-between py-2 shadow-lg rounded items-start"
        >
          <div class="lg:w-1/2 px-3">
            <h2 class="title-font font-medium text-gray-800 tracking-widest text-sm">ADDRESS</h2>
            <p class="leading-relaxed text-base sm:text-lg">Cape Town</p>
          </div>
          <div class="lg:w-1/2 px-3 lg:mt-0">
            <h2
              class="title-font font-medium text-gray-800 tracking-widest text-base sm:text-lg"
            >EMAIL</h2>
            <a class="text-green-500 leading-relaxed text-base sm:text-lg">jean.snyman@gmail.com</a>
            <h2
              class="title-font font-medium text-gray-800 tracking-widest text-sm sm:text-base mt-4"
            >PHONE</h2>
            <p class="leading-relaxed text-base sm:text-lg">+27849033664</p>
          </div>
        </div>
      </div>
      <div
        class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full py-4 md:py-8 mt-8 md:mt-0 px-3 rounded-lg"
      >
        <h2 class="text-gray-800 text-lg mb-1 font-medium title-font border-none">CONTACT FORM</h2>
        <input
          class="bg-white rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Name"
          type="text"
        />
        <input
          class="bg-white rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Email"
          type="email"
        />
        <textarea
          class="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-green-500 text-base px-4 py-2 mb-4 resize-none"
          placeholder="Message"
        ></textarea>
        <button
          class="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
        >SEND MESSAGE</button>
      </div>
    </div>
    <div class="container mx-auto background_dots w-full h-24 mt-4"></div>
  </section>
</template>
