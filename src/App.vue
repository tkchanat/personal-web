<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="model"
      clipped
      app
      class="d-flex justify-space-between"
    >
      <v-list-item>
        <v-list-item-avatar size="100" class="mt-5">
          <v-img src="/images/profile.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Andy Chan</v-list-item-title>
          <v-list-item-subtitle>Game Developer</v-list-item-subtitle>
          <v-list-item-subtitle>Graphics Programmer</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="ma-0"></v-divider>

      <v-list rounded>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in $router.options.routes"
            :key="i"
            :to="item.path"
            style="text-decoration: none"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-divider class="ma-0"></v-divider>
        <v-list-item>
          <v-icon class="mr-4">fa-adjust</v-icon>
          <v-switch v-model="$vuetify.theme.dark" primary inset></v-switch>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar clipped-left app v-if="$vuetify.breakpoint.mobile">
      <v-app-bar-nav-icon @click.stop="model = !model"></v-app-bar-nav-icon>
      <v-toolbar-title>Andy Chan</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <span class="px-4">&copy; Andy Chan {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
      model: null,
      dark: true,
  }),
  computed: {
    items() {
      var items = [{ text: "Home", disabled: false, href: "/" }];
      if (this.$route.path !== "/") {
        for (var i in this.$route.matched) {
          var route = this.$route.matched[i];
          var match = route.path.match(/:(\w+)/);
          items.push({
            text: match === null ? route.name : this.$route.params[match[1]],
            disabled: false,
            href: route.path,
          });
        }
      }
      items[items.length - 1].disabled = true;
      return items;
    },
  },
  metaInfo: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Andy Chan` : "Andy Chan";
    },
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
};
</script>

<style>
/*
 *  STYLE 6
 */

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 10px;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #aaa;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
</style>