<template>
  <q-page class="flex flex-center bg-grey column">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h5">{{ title }}</div>
      </q-card-section>
    </q-card>
    <q-card style="overflow: visible">
      <q-card-section>
        <div v-for="(row, i) in data" :key="i" class="column text-small">
          <div class="row">
            <div v-for="(column, j) in data[i]" :key="j">
              <div v-if="check(i, j, column)" class="bg-red q-pa-xs box">
                <div>{{ column }}</div>
              </div>
              <div v-else class="bg-primary q-pa-xs box">
                <div>{{ column }}</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
      <q-card-section>
        <q-btn color="primary" class="q-ma-sm" @click="startSimulation">
          Start
        </q-btn>
        <q-btn color="purple" class="q-ma-sm" to="/simulation">Back</q-btn>
      </q-card-section>
    </q-card>
    <q-dialog v-model="popup">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Simulation Run Complete</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          The number of seconds it took is , 0.23 seconds
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    var obj = localStorage.getItem("selectedObject");
    this.object = JSON.parse(obj);
    this.title = this.object.material;
    this.data.forEach((column, i) =>
      column.forEach((row, j) => {
        if (i >= 14 && j >= 20) this.data[i][j] = 3159;
      })
    );
  },
  data() {
    return {
      data: new Array(30).fill(0).map(() => new Array(50).fill(300)),
      popup: false,
      object: null,
      title: "",
      count: 0,
      startJ: 20,
      startI: 16,
    };
  },
  watch: {
    data: {
      handler(val, oldVal) {
        console.log("data changes");
      },
      deep: true,
    },
    count: {
      handler(val) {
        setTimeout(() => this.selfAware(), 1000);
      },
    },
    startI: {
      handler(val, oldVal) {
        var j = this.startJ;
        console.log(val);
      },
    },
    startJ: {
      handler(val, oldVal) {
        var i = this.startI;
        console.log(val);
      },
    },
  },
  methods: {
    check(i, j, val) {
      if (val >= 3159) return true;
      return false;
    },
    startSimulation() {
      console.log(this.object.meltingPoint);
      this.count += 1;
    },
    stepRepeat(i, j, val) {},
    selfAware() {
      for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].length; j++) {
          if (j > this.startJ && i > this.startI) break;
          if (this.data[i][j] > 300) {
            if (i > 0) this.calcValue(i - 1, j, this.data[i][j]);
            if (j > 0) this.calcValue(i, j - 1, this.data[i][j]);
          }
        }
      }
    },
    calcValue(i, j, val) {
      if (this.data[i][j] !== val) {
        this.data[i][j] += 200;
        if (this.data[i][j] > this.object.meltingPoint) {
          this.data[i][j] = 3159;
        }
      }
      if (i > 0 || j > 0) this.count += 1;
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
