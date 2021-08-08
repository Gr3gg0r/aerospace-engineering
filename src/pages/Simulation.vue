<template>
  <q-page class="flex flex-center bg-primary q-pa-xl">
    <q-card class="q-pa-md" style="width:500px">
      <q-card-section>
        <div class="text-h6">Choose Material</div>
      </q-card-section>
      <q-card-section>
        <q-select
          outlined
          dense
          label="Material"
          :options="options"
          v-model="select"
        />
      </q-card-section>
      <q-card-section>
        <q-btn color="primary" @click="alert">Start Simulation</q-btn>
      </q-card-section>
      <q-card-section>
        <q-btn color="primary" to="/">HOME</q-btn>
      </q-card-section>
    </q-card>
     <q-dialog v-model="dialog" position="bottom">
    <q-card style="width: 350px">
      <q-card-section class="row">
        <q-btn color="primary"  @click="selectedObject">Rocket Nozel</q-btn>
        <q-space />
        <q-btn color="primary" to="/simulation/start" @click="selectedObject">Iron Cassing</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
  </q-page>
 
</template>

<script>
export default {
  data() {
    return {
      option: ["Please Choose"],
      select: "",
      dialog: false,
      data:[],
    };
  },
  mounted(){
      var selection = localStorage.getItem('material');
      this.data = JSON.parse(selection);
  },
  computed:{
      options() {
          return this.data.map((val)=>val.material);
      }
  },
  methods: {
    alert() {
        this.dialog = !this.dialog;
    },
    selectedObject(){
        var object = this.data.find((obj)=>obj.material===this.select);
        localStorage.setItem("selectedObject",JSON.stringify(object))
        console.log(object);
    }
  },
};
</script>
