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
        if (i >= this.startI && j >= this.startJ) this.data[i][j] = 3159;
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
      startJ: 14,
      startI: 14,
      controller: true,
      clickController: true,
    };
  },
  watch: {
    data: {
      handler(val, oldVal) {
        if (val[0][0] == 3159) {
          this.controller = false;
        }
      },
      deep: true,
    },
    count: {
      handler(val) {
        if (this.data[0][0] == 3159) this.selfAware();
        if (val == 1) this.selfAware();
        else setTimeout(() => this.selfAware(), 1000);
      },
    },
    startI: {
      handler(val, oldVal) {
        var j = this.startJ;
      },
    },
    startJ: {
      handler(val, oldVal) {
        var i = this.startI;
      },
    },
  },
  methods: {
    controlClick() {
      this.clickController = !this.clickController;
    },
    check(i, j, val) {
      if (val >= 3159) return true;
      return false;
    },
    startSimulation() {
      this.count += 1;
    },
    stepRepeat(i, j, val) {},
    selfAware() {
      for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].length; j++) {
          if (j > this.startJ && i > this.startI) break;
          var current = this.data[i][j];

          if (this.data[i][j] > 300) {
            if (i > 0 && i <= this.startI && j >= this.startJ)
              this.calcValue(i - 1, j, current, true);
            if (j > 0 && j <= this.startJ && i >= this.startI)
              this.calcValue(i, j - 1, current, false);
          }
          if (i < this.startI && j < this.startJ)
            this.specialCalc(i, j, current); // TODO : this one
        }
      }
      if (this.controller) {
        if (this.clickController) this.count += 1;
      } else {
        this.popup = true;
      }
    },
    // TODO : Aqil anwar
    specialCalc(i, j, val) {
      var bottom = parseInt(this.data[i + 1][j]);
      var right = parseInt(this.data[i][j + 1]);
      var val = parseInt(this.data[i][j]);
      if (bottom > 300 && right > 300 && val < 3159) {
        this.data[i][j] = this.formulaNext(i, j, val, bottom, right);
        // this.data[i][j] += 100;
        if (this.data[i][j] > this.object.meltingPoint) {
          this.data[i][j] = 3159;
          if (this.startI > 0) this.startI -= 1;
          if (this.startJ > 0) this.startJ -= 1;
        }
      }
    },
    // TODO: Aqil.
    formulaNext(i, j, val, valB, valR) {
      var time = this.count / 100;
      var times = time / 10;
      var k = this.object.thermal * -1;
      var f = this.object.density;
      const cp = 0.9;

      //Q YANG BERUBAH
      var q = 0;
      var q1 = k * (val - valB);
      var q2 = k * (val - valR);
      q = q1 + q2;
      // Only modify below this line

      // Only modify above this line
      var calc = (time * q) / (cp * f * times) + val;
      var result = calc.toFixed(2);
      return result;
    },
    calcValue(i, j, val, bool) {
      if (this.data[i][j] == 3159) {
        return;
      }
      this.data[i][j] = this.formula(i, j, val, bool);
      // this.data[i][j] += 100;
      if (this.data[i][j] > this.object.meltingPoint) {
        this.data[i][j] = 3159;
      }
    },
    formula(i, j, val, bool, bottom) {
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
        if (bool && i > 0 && j > 0) {
          q2 = k * (temperatureU - temperature);
        } else {
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
        console.log(calc);
      }

      return result;
    },
  },
});
</script>

<style scoped>
.box {
  width: 26px;
}
.text-small {
  font-size: 7px;
}
</style>
