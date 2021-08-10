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
                <!-- <div>{{ i }},{{ j }}</div> -->
              </div>
              <div v-else class="bg-primary q-pa-xs box">
                <div>{{ column }}</div>
                <!-- <div>{{ i }},{{ j }}</div> -->
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
      <q-card-section>
        <q-btn color="red" class="q-ma-sm" @click="controlClick">
          <div v-if="clickController">Simulation</div>
          <div v-else>One Click</div>
        </q-btn>
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
          The number of seconds it took is , {{ count / 100 }} seconds
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
        if (j > 0) this.data[i][j] = 3159 - 24 * j;
        if (j == 26) this.data[i][j] = 2567;
        if (i == 11 + 1 && j >= 10 + 1 && j <= 13) this.data[i][j] = 300;
        if (i == 10 + 1 && j >= 9 + 1 && j <= 14) this.data[i][j] = 300;
        if (i == 9 + 1 && j >= 8 + 1 && j <= 15) this.data[i][j] = 300;
        if (i == 8 + 1 && j >= 7 + 1 && j <= 16) this.data[i][j] = 300;
        if (i == 7 + 1 && j >= 6 + 1 && j <= 17) this.data[i][j] = 300;
        if (i == 6 + 1 && j >= 5 + 1 && j <= 18) this.data[i][j] = 300;
        if (i == 5 + 1 && j >= 4 + 1 && j <= 19) this.data[i][j] = 300;
        if (i == 4 + 1 && j >= 3 + 1 && j <= 20) this.data[i][j] = 300;
        if (i == 3 + 1 && j >= 2 + 1 && j <= 21) this.data[i][j] = 300;
        if (i == 2 + 1 && j >= 1 + 1 && j <= 22) this.data[i][j] = 300;
        if (i == 1 + 1 && j >= 0 + 1 && j <= 23) this.data[i][j] = 300;
        if (i == 0 + 1 && j >= 0 + 1 && j <= 24) this.data[i][j] = 300;
        if (i == 0 && j >= 0 + 1 && j <= 25) this.data[i][j] = 300;
      })
    );
  },
  data() {
    return {
      data: new Array(19).fill(0).map(() => new Array(27).fill(3159)),
      popup: false,
      object: null,
      title: "",
      count: 0,
      startJ: 20,
      startI: 16,
      controller: true,
      clickController: true,
    };
  },
  watch: {
    data: {
      handler(val, oldVal) {
        console.log(val[0][0]);
        if (val[1][12] > 2500) {
          this.controller = false;
        }
      },
      deep: true,
    },
    count: {
      handler(val) {
        setTimeout(() => this.selfAware(), 500);
      },
    },
  },
  methods: {
    controlClick() {
      this.clickController = !this.clickController;
    },
    check(i, j, val) {
      if (val >= 2500) return true;
      return false;
    },
    startSimulation() {
      this.count += 1;
    },
    stepRepeat(i, j, val) {},
    selfAware() {
      for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].length; j++) {
          var current = parseInt(this.data[i][j]);
          if (i != 0 && current < this.object.meltingPoint) {
            this.calcValue(i, j, current);
          }
        }
      }
      if (this.controller) {
        if (this.clickController) this.count += 1;
      } else {
        this.popup = true;
      }
    },
    calcValue(i, j, val) {
      var bottom = this.data[i + 1][j];
      if (bottom > 300) this.data[i][j] += 200;
      if (this.data[i][j] > this.object.meltingPoint) {
        this.data[i][j] = 3159;
      }
    },
    formula(i, j, val) {
      var time = this.count / 100;
      var times = time / 10;
      var k = this.object.thermal * -1;
      var f = this.object.density;
      const cp = 0.9;
      var temperature = parseInt(this.data[i][j]);

      if (i > 0 && j > 0) {
        var temperatureL = parseInt(this.data[i][j - 1]);
        var temperatureU = parseInt(this.data[i - 1][j]);
      }

      var q = 0;
      var q1 = 0;
      var q2 = 0;
      if (temperature > 300 && i > 0 && j > 0) {
        q1 = k * (this.data[i][j] - val);
        if (temperature !== this.data[i - 1][j] && i > 0 && j > 0) {
          q2 = k * (temperatureU - temperature);
        } else {
          console.log("left");
          q2 = k * (temperatureL - temperature);
        }
        q = q1 - q2;
        q = q.toFixed(2);
      } else {
        q = k * (temperature - val);
        q = q.toFixed(2);
      }

      var calc = (time * q) / (cp * f * times) + temperature;
      try {
        var result = calc.toFixed(2);
      } catch (e) {
        // console.log(time, q, cp, f, times, this.data[i][j]);
        // console.log(calc);
      }
      // console.log(result);

      return result;
    },
  },
});
</script>

<style scoped>
.box {
  width: 45px;
}
.text-small {
  font-size: 10px;
  text-align: center;
}
</style>
