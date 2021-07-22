<template>
  <q-page class="flex flex-center bg-primary">
    <q-card class="q-pa-lg">
      <q-card-section>
        <div class="text-h5">Rocket Nozel Heat Transfer Simulator</div>
      </q-card-section>
      <q-card-section class="text-center q-pa-none">
        <q-btn color="primary" to="/start">Start</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      data: "Press Me",
    };
  },
  watch: {
    data() {
      console.log("Data Changes");
    },
  },
  methods: {
    buttonPress() {
      this.data = "You pressed";
    },
  },
  computed: {
    getText() {
      return "Press ME ";
    },
  },
  beforeCreate() {
    console.log("Before Create");
  },
  created(){},
  beforeMount() {
    console.log("Before Mount");
  },
  mounted() {
    console.log("Mounted");
  },
  beforeUpdate(){
    console.log("Before data Update");
  },
  updated(){
    console.log("Updated");
  },
  beforeUnmount(){
    console.log("Before  Unmount");
  },
  unmounted(){
    console.log("Unmount");
  }
});
</script>
