<template>
  <v-container>
    <v-card v-for="project in projects" :key="project.title" class="mx-auto my-5" max-width="1000">
      <v-img :src="'/images/'+project.preview_img" height="200px"></v-img>
      <v-card-title>{{ project.title }}</v-card-title>
      <v-card-subtitle>{{ project.description }}</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" text :to="project.title">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import projects from "@/assets/models/projects.json";
export default {
  data: () => ({
    projects,
  }),
};
</script>