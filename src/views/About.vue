<template>
  <div>
    <v-parallax src="/images/snow.jpg" height="400"></v-parallax>
    <v-container style="max-width: 1000px">
      <p class="my-5">{{ myself.description }}</p>
      <hr />
      <div class="my-5">
        <h3>Skills</h3>
        <v-list>
          <v-list-item v-for="skill in myself.skills" :key="skill.caption">
            <v-list-item-icon>
              <v-icon>{{ skill.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ skill.category }}</v-list-item-title>
              <v-list-item-subtitle>{{ skill.caption }}</v-list-item-subtitle>
              <v-row>
                <v-col v-for="tool in skill.items" :key="tool.name" class="text-center" style="max-width: 100px">
                  <v-avatar>
                    <img :src="`/images/icons/`+tool.img" :alt="tool.name" />
                  </v-avatar>
                  <div>{{ tool.name }}</div>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <hr />
      <div class="my-5">
        <h3>Education</h3>
        <v-list-item v-for="edu in myself.education" :key="edu.institution">
          <v-list-item-content>
            <v-list-item-title>{{ edu.institution }}</v-list-item-title>
            <v-list-item-subtitle>{{ edu.description }}</v-list-item-subtitle>
            <ul class="mt-2">
              <li v-for="(work, index) in edu.coursework" :key="index">{{ work }}</li>
            </ul>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-container>
  </div>
</template>

<script>
import myself from "@/assets/models/myself.json";
export default {
  created() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      myself,
    };
  },
  metaInfo: {
    title: "About",
  },
  track() {
    this.$ga.page("/about");
  },
};
</script>