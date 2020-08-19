<template>
  <v-container>
    <v-btn color="primary" text rounded @click="go_back()">
      <v-icon left>fa-chevron-left</v-icon>Back
    </v-btn>

    <v-card max-width="1000" class="mx-auto">
      <v-list-item>
        <v-list-item-title>
          <v-icon>fa-calendar-alt</v-icon>
          <span class="mx-3">{{ project.date }}</span>
        </v-list-item-title>
      </v-list-item>

      <v-img
        v-if="project.gallery.length == 1"
        :src="'/images/'+project.gallery[0]"
        style="max-height:500px"
      ></v-img>
      <v-carousel continuous cycle v-else-if="project.gallery.length > 1">
        <v-carousel-item
          v-for="(imagePath, i) in project.gallery"
          :key="i"
          :src="'/images/'+imagePath"
        ></v-carousel-item>
      </v-carousel>

      <v-list-item>
        <v-list-item-content>
          <div class="text-h4">{{ project.title }}</div>
        </v-list-item-content>
      </v-list-item>
      <vue-markdown
        class="vue-markdown pa-5"
      >{{ require("!raw-loader!@/assets/markdowns/"+project.markdown).default }}</vue-markdown>
    </v-card>
  </v-container>
</template>

<script>
import projects from "@/assets/models/projects.json";
export default {
  created() {
    window.scrollTo(0, 0);
  },
  data: () => ({}),
  methods: {
    go_back() {
      window.history.back();
    },
  },
  computed: {
    project() {
      return projects.find((e) => e.title === this.$route.params.detail);
    },
  },
  metaInfo() {
    return {
      title: this.$route.params.detail,
    };
  },
  track() {
    this.$ga.page("/project" + this.$route.params.detail);
  },
};
</script>

<style>
.vue-markdown p {
  text-align: justify;
  text-justify: inter-word;
}
.vue-markdown img {
  padding: 2rem;
  width: 100%;
}
.vue-markdown table {
  border-collapse: collapse;
  width: 100%;
}
.vue-markdown table td img {
  padding: 0.5rem;
}
.v-application pre > code {
  background-color: unset !important;
}
/* 
:not(pre) > code[class*="language-"], pre[class*="language-"] {
    background: unset !important;
} */
</style>