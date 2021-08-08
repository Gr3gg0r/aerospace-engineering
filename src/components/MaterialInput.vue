<template>
    <q-card class="q-pa-sm">
        <div class="text-center q-pa-xs text-body">Material {{count}}</div>
        <q-input outlined dense v-model="display[index].material" label="Material Name" class="q-pa-xs"></q-input>
        <q-input outlined dense v-model="display[index].meltingPoint" label="Melting Point" class="q-pa-xs"></q-input>
        <q-input outlined dense v-model="display[index].thermal" label="Thermal Conductivity" class="q-pa-xs"></q-input>
        <q-input outlined dense v-model="display[index].density" label="Material Density" class="q-pa-xs"></q-input>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        count : Number,
        displays:Array,
        index:Number,
    },
    data(){
        return {
            display: this.displays,
        }
    }
})
</script>
