<template>
  <q-page class="flex flex-center bg-grey column">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h5">{{title}}</div>
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
                <div>3159</div>
              </div>
              <div v-else class="bg-primary q-pa-xs box">
                <div>300</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
      <q-card-section>
        <q-btn color="primary" class="q-ma-sm" @click="simutlationClick"
          >Start</q-btn
        >
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
  mounted(){
    var obj = localStorage.getItem("selectedObject");
    this.object = JSON.parse(obj);
    this.title = this.object.material
    console.log(this.object.material);
  },
  data() {
    return {
      columns: 50,
      rows: 30,
      count: 0,
      control: true,
      popup: false,
      object:null,
      title:""
    };
  },
  watch: {
    count: function (val, oldVal) {
      if (this.control) {
        console.log(val);
        setTimeout(() => this.simutlationClick(), 1000);
      } else {
        this.popup = true;
      }
    },
    popup: function (val) {
      if (val) {
        this.count = 0;
      } else {
        this.control = true;
      }
    },
  },
  methods: {
    check(x, y) {
      return this.stepRepeat(x, y);
    },
    simutlationClick() {
      this.count += 1;
    },
    stepRepeat(x, y) {
      var checkX = 15 - this.count;
      var checkY = 16;
      var check = 15 - this.count;
      if (y < checkY && x < checkY) {
        for (var i = this.count; i > 0; i--) {
          checkX += 1;
          checkY -= 1;
          if (x == checkX && y == checkY) {
            if (x == 1 && y == 1) {
              this.control = false;
            }
            return false;
          }
        }
        var valueX = 15 - this.count;
        var valueY = 16;
        for (var j = this.count; j > 0; j--) {
          valueX += 1;
          valueY -= 1;
          var revalue = valueY;
          for (var z = j; z > 0; z--) {
            if (x == valueX && y == revalue) return false;
            revalue -= 1;
          }
        }
      }
      if (x > check && y > check) return true;
      return false;
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
