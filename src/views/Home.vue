<template>
  <div>
    <v-row align="center" class="lightbox pa-2 fill-height">
      <v-col class="mx-auto text-center">
        <div class="text-h2 mb-4">Welcome Game Devs!</div>
        <div class="text-h5">Feel free to explore the works I've done.</div>
        <div class="text-h5">Also don't forget to follow me on my social media accounts! 🦀</div>
      </v-col>
    </v-row>

    <v-card max-width="800" class="mx-auto my-8">
      <a
        class="twitter-timeline"
        href="https://twitter.com/tkchanat1?ref_src=twsrc%5Etfw"
      >Tweets by tkchanat1</a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
        type="application/javascript"
      ></script>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  created() {
    window.scrollTo(0, 0);
  },
  track() {
    this.$ga.page("/");
  },
};
</script>
