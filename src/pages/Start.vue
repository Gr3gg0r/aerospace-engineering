<template>
  <q-page class="flex flex-center bg-primary q-pa-lg">
    <q-card>
      <q-card-section>
        <div class="text-h6">Please Enter The Material Information</div>
      </q-card-section>
      <q-card-section v-for="(display, index) in displays" :key="index">
        <q-card class="q-pa-sm">
          <div class="text-center q-pa-xs text-body">
            Material {{ index + 1 }}
          </div>
          <q-input
            outlined
            dense
            v-model="displays[index].material"
            label="Material Name"
            class="q-pa-xs"
          ></q-input>
          <q-input
            outlined
            dense
            v-model.number="displays[index].meltingPoint"
            label="Melting Point"
            class="q-pa-xs"
          ></q-input>
          <q-input
            outlined
            dense
            v-model.number="displays[index].thermal"
            label="Thermal Conductivity"
            class="q-pa-xs"
          ></q-input>
          <q-input
            outlined
            dense
            v-model.number="displays[index].density"
            label="Material Density"
            class="q-pa-xs"
          ></q-input>
        </q-card>
      </q-card-section>
      <q-card-section class="row">
        <q-btn color="primary" label="Confirm" to="/simulation"  @click="submit" />
        <q-space />
        <q-btn color="primary" icon="add" @click="onClickAdd" />
        <q-btn color="negative" icon="remove" @click="onClickRemove" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "start",
  data() {
    return {
      displays: [
        {
          material: "Aluminium",
          meltingPoint: 1515,
          thermal: 45,
          density: 7150,
        },
      ],
    };
  },
  methods: {
    onClickAdd() {
      if (this.displays.length >= 0) {
        this.displays.push({
          material: "",
          meltingPoint: "",
          thermal: "",
          density: "",
        });
      }
    },
    onClickRemove() {
      if (this.displays.length > 1) {
        this.displays.pop();
      }
    },
    submit() {
      localStorage.setItem('material', JSON.stringify(this.displays));
      console.log(JSON.parse(localStorage.getItem('material')));
    }
  },
};
</script>
