<template>
  <div>
    <v-parallax src="/images/snow.jpg" height=400></v-parallax>
    <v-container>
      <p
        class="my-5"
        data-aos="fade-in"
        data-aos-duration="1000"
        data-aos-delay="250"
      >{{ myself.description }}</p>
      <hr />
      <div class="my-5">
        <h1>EDUCATION</h1>
        <div v-for="edu in myself.education" :key="edu.institution">
          <v-icon>{{ edu.icon }}</v-icon>
          <h3>{{ edu.institution }}</h3>
          <p>{{ edu.description }}</p>
          <ul style="text-align: left !important; position: relative; left: calc(50% - 200px)">
            <li style="color: #AAA" v-for="(work, index) in edu.coursework" :key="index">{{ work }}</li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="my-5">
        <h1>SKILLS</h1>
        <div v-for="skill in myself.skills" :key="skill.caption">
          <v-icon>{{ skill.icon }}</v-icon>
          <h3>{{ skill.category }}</h3>
          <p style="color: #AAA">{{ skill.caption }}</p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import myself from "@/assets/models/myself.json";
export default {
  data() {
    return {
      myself,
    };
  },
};
</script>