<template>
  <v-container :style="'max-width: ' + container_width">
    <v-list class="d-flex flex-wrap justify-left">
      <v-card
        v-for="contact in contacts"
        :key="contact.name"
        width="250"
        height="250"
        class="d-inline-block ma-5"
      >
        <v-hover v-slot:default="{ hover }">
          <v-list>
            <v-list-item>
              <v-list-item-icon class="mx-auto">
                <v-icon
                  :color="hover? contact.color: ''"
                  size="140"
                  @click="open_url(contact.url)"
                >{{ contact.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title :color="hover? contact.color: ''" class="title text-center">{{ contact.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-hover>
      </v-card>
    </v-list>
  </v-container>
</template>

<script>
import contacts from "@/assets/models/contacts.json";
export default {
  data: () => ({
    contacts,
  }),
  computed: {
    container_width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "300px";
        case "sm":
          return "610px";
        case "md":
          return "900px";
        case "lg":
        case "xl":
          return "1000px";
      }
      return 0;
    },
  },
  methods: {
    open_url(url) {
      window.open(url);
    },
  },
};
</script>