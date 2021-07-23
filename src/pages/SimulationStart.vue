<template>
  <q-page class="flex flex-center bg-grey column">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h5">Aluminium</div>
      </q-card-section>
    </q-card>
    <q-card style=" overflow: visible;">
      <q-card-section>
        <div
          v-for="(column, index) in columns"
          :key="index"
          class="column text-small"
        >
          <div class="row">
            <div v-for="(row, index) in rows" :key="index">
              <div v-if="column < 15 && row < 20" class="bg-primary q-pa-xs box">
                <div>300k</div>
              </div>
              <div v-else class="bg-red q-pa-xs box">
                <div>3159k</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
      <q-card-section>
        <q-btn color="purple" to="/simulation">Back</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      rows: 50,
      columns: 30,
    };
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
