<template>
  <q-page class="flex flex-center bg-primary q-pa-lg">
    <q-card>
      <q-card-section>
        <div class="text-h6">Please Enter The Material Information</div>
      </q-card-section>
      <q-card-section v-for="(display, index) in displays" :key="index">
        <material-input :count="index + 1" />
      </q-card-section>
      <q-card-section class="row">
        <q-btn color="primary" label="Confirm" />
        <q-space />
        <q-btn color="primary" icon="add" @click="onClickAdd" />
        <q-btn color="negative" icon="remove" @click="onClickRemove" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import MaterialInput from "components/MaterialInput.vue";

export default {
  name: "start",
  components: {
    MaterialInput,
  },
  data() {
    return {
      displays: 1,
    };
  },
  methods: {
    onClickAdd() {
      if (this.displays >= 0) {
        this.displays++;
      }
    },
    onClickRemove() {
      if (this.displays > 1) {
        this.displays--;
      }
    },
  },
};
</script>
