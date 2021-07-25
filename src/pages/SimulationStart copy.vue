<template>
  <q-page class="flex flex-center bg-grey column">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h5">Aluminium</div>
      </q-card-section>
    </q-card>
    <q-card style="overflow: visible">
      <q-card-section>
        <div
          v-for="(row, index) in rows"
          :key="index"
          class="column text-small"
        >
          <div class="row">
            <div v-for="(column, index) in columns" :key="index">
              <div v-if="check(column, row)" class="bg-red q-pa-xs box">
                <div>300k</div>
              </div>
              <div v-else class="bg-primary q-pa-xs box">
                <div>3159k</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
      <q-card-section>
        <q-btn color="primary" class="q-ma-sm" @click="simulationStart()"
          >Start</q-btn
        >
        <q-btn color="purple" class="q-ma-sm" to="/simulation">Back</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      columns: 50,
      rows: 30,
      search: {
        x: 15,
        y: 15,
      },
      runner: {
        x: true,
        y: true,
      },
    };
  },
  watch: {
    "search.x": function (val) {
      if (this.runner.x) this.simulationX(1);
    },
    "search.y": function (val) {
      if (this.runner.y) this.simulationY(1);
    },
  },
  methods: {
    check(x, y) {
      if (x == this.search.x + 1 && y == this.search.y + 1) return false;
      if (x > this.search.x && y > this.search.y) return true;
      return false;
    },
    simulationX(val) {
      console.log(val);
      setTimeout(() => (this.search.x -= val), 500);
      if (this.search.x < 1) this.runner.x = false;
    },
    simulationY(val) {
      console.log(val);
      setTimeout(() => (this.search.y -= val), 500);
      if (this.search.x < 1) this.runner.y = false;
    },
    simulationStart() {
      this.simulationY(1);
      this.simulationX(1);
    },
  },
});
</script>

<style scoped>
.box {
  width: 24px;
}
.text-small {
  font-size: 7px;
}
</style>
