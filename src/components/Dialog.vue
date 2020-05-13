<template>
    <v-dialog
      v-model="dialog"
      width="400px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Add Item
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                
              </v-row>
            </v-col>            
            <v-col cols="12">
              <v-text-field
                v-model="title"
                prepend-icon="mdi-pizza"
                placeholder="Item"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="amount"
                prepend-icon="mdi-hamburger"
                placeholder="Amount"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="src"
                prepend-icon="mdi-image"
                placeholder="Image"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions align="center">
          <v-spacer></v-spacer>
          <v-btn
            x-large
            color="error"
            @click="cancel"
          >Cancel</v-btn>
          
          <v-btn
            x-large
            color="primary"
            @click="addItem"
          >Add</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'Dialog',
    computed: {
      dialog () {
        return this.$store.state.dialog
      }
    },
    data: () => ({
      src: '',
      title: '',
      amount: '',
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
      addItem() {
        var item = {
          src: this.src,
          title: this.title,
          amount: this.amount,
        }
        this.$store.commit('appendItem', item)
      },
      cancel() {
        this.$store.state.dialog = false
      }
    }
  }
</script>