<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :permanent="permanent"
      :src="bg"
      :absolute="absolute"
      dark
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <!-- This in Case Items have no Children -->
          <v-list-item
            v-else
            :key="item.text"
            link
            :to="item.href"
          >
            <v-list-item-action>
              <v-icon >{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="transparent"
      inverted-scroll
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span >Bio Einkauszettel</span>
      </v-toolbar-title>
      
      <!-- <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img></v-avatar>
      </v-btn> -->
    </v-app-bar>
    <v-content>
      <v-container class="px-4 py-0 fill-height" fluid>
                <v-row class="fill-height">
                    <v-col>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-col>
                </v-row>
            </v-container>
    </v-content>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="addItems"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <Dialog/>


  </v-app>
</template>

<script>
import Dialog from './components/Dialog.vue'
  export default {
    components: {
      Dialog
    },
    props: {
      source: String,
    },
    data: () => ({
      // App Drawer properties
      dialog: false,
      drawer: false,
      right: false,
      permanent: false,
      miniVariant: false,
      expandOnHover: false,
      background: true,
      absolute: false,
      color: '',
      // Items in the App Drawer
      items: [
        { icon: 'mdi-home', text: 'Home', href: '/' },
        { icon: 'mdi-video-3d', text: 'Three', href: '/three' },
        { icon: 'mdi-graph', text: 'Force Graph', href: '/forcegraph' },
        { icon: 'mdi-pizza', text: 'Unreal Bloom', href: '/unrealbloom' },
        { icon: 'mdi-point', text: 'Interactive Points', href: '/interactivepoints' },
        { icon: 'mdi-shader', text: 'Shaders', href: '/shaders' },


        // { icon: 'mdi-github', text: 'Github.io', href: '/githubio' },
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'Labels',
        //   model: true,
        //   children: [
        //     { icon: 'mdi-plus', text: 'Create label' },
        //   ],
        // },
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'More',
        //   model: false,
        //   children: [
        //     { text: 'Import' },
        //     { text: 'Export' },
        //     { text: 'Print' },
        //     { text: 'Undo changes' },
        //     { text: 'Other contacts' },
        //   ],
        // },
        // { icon: 'mdi-settings', text: 'Settings' },
        // { icon: 'mdi-message', text: 'Send feedback' },
        // { icon: 'mdi-help-circle', text: 'Help' },
        // { icon: 'mdi-cellphone-link', text: 'App downloads' },
        // { icon: 'mdi-keyboard', text: 'Go to the old version' },
      ],
    }),
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
    methods: {
      addItems() {
        this.$store.state.dialog = !this.$store.state.dialog 
      },
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;      
    },
    }
  }
</script>