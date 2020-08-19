<template>
  <v-container style="max-width: 1200px">
    <v-tabs v-model="tab" centered icons-and-text>
      <v-tab v-for="tag in tags" :key="tag">
        {{ tag }}
        <v-icon>{{ tag_icon(tag) }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="tag in tags" :key="tag">
        <v-container class="d-flex flex-wrap justify-center">
          <v-card
            v-for="(project, i) in projects(tag)"
            :key="i"
            class="ma-5"
            width="400"
            min-width="360"
            :max-height="project.title !== 'ghost' ? '' : 0"
            :to="project.title"
            style="text-decoration: none"
          >
            <div v-if="project.title !== 'ghost'">
              <v-img :src="'/images/'+project.gallery[0]" max-height="200px"></v-img>
              <v-card-title>{{ project.title }}</v-card-title>
              <v-card-subtitle>
                <div>{{ project.date }}</div>
                <div>{{ project.description }}</div>
              </v-card-subtitle>
              <v-card-actions class="d-flex flex-wrap justify-left">
                <v-chip small class="ma-1" color="primary">{{ project.category }}</v-chip>
                <v-chip small class="ma-1" v-for="tag in project.tags" :key="tag">{{ tag }}</v-chip>
              </v-card-actions>
              <v-card-actions></v-card-actions>
            </div>
          </v-card>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import projects from "@/assets/models/projects.json";
export default {
  created() {
    window.scrollTo(0, 0);
  },
  data: () => ({
    chips: [],
    tab: null,
  }),
  computed: {
    tags() {
      var array = projects
        .filter((x) => x.title !== "ghost")
        .map((x) => x.category)
        .flat();
      return [...new Set(array)];
    },
  },
  methods: {
    projects(tag) {
      return projects.filter((x) => x.category === tag || x.title === "ghost");
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    tag_icon(tag) {
      switch (tag) {
        case "Graphics":
          return "fa-palette";
        case "Software":
          return "fa-code";
        case "Game":
          return "fa-gamepad";
        default:
          return "fa-link";
      }
    },
  },
  metaInfo: {
    title: "Project Overview",
  },
  track() {
    this.$ga.page("/project");
  },
};
</script>