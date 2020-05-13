<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <v-card class="mx-auto my-12" max-width="500">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="item.title"></v-card-title>

              <v-card-subtitle v-text="item.amount"></v-card-subtitle>
              <v-btn class="mx-2" fab dark small color="pink" @click="increment">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark  small color="pink" @click="decreament">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
          <!-- Nutrion Distribution
          <v-sparkline
              :labels="labels"
              :fill="fill"
              :gradient="gradient"
              :line-width="width"
              :padding="padding"
              :smooth="radius || false"
              :value="value"
              auto-draw
              style="top: -10px; position:relative"
          ></v-sparkline>-->
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve">Edit</v-btn>
            <v-btn color="deep-purple lighten-2" text @click="reserve">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- //###################################################################################################### -->
  </v-container>
</template>

<script>
export default {
  name: "Home",
  computed: {
    items() {
      return this.$store.state.items;
    }
  },
  data: () => ({
    gradients: [
      ["#222"],
      ["#42b3f4"],
      ["red", "orange", "yellow"],
      ["purple", "violet"],
      ["#00c6ff", "#F0F", "#FF0"],
      ["#f72047", "#ffd200", "#1feaea"]
    ],
    fill: false,
    gradient: ["#00c6ff", "#F0F", "#FF0"],
    radius: 5,
    labels: [" ", "Protein", "Fat", "Carbohydrate", "Water", "Vitamins"],
    value: [200, 675, 410, 390, 310, 460]
    // count: this.$store.state.count,
    // items: store.state.items,
    // items: [
    //   {
    //     color: '#1F7087',
    //     src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
    //     title: 'Supermodel',
    //     artist: 'Foster the People',
    //   },
    //   {
    //     color: '#952175',
    //     src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
    //     title: 'Halcyon Days',
    //     artist: 'Ellie Goulding',
    //   },
    // ],
  }),
  methods: {
    increament() {
       this.$store.commit('increament')
    },
    decreament() {
      this.$store.commit('decreament')
    }
  }
};
</script>
