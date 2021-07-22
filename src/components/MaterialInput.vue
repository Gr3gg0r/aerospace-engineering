<template>
    <q-card class="q-pa-sm">
        <div class="text-center q-pa-xs text-body">Material {{count}}</div>
        <q-input outlined dense label="Material Name" class="q-pa-xs"></q-input>
        <q-input outlined dense label="Melting Point" class="q-pa-xs"></q-input>
        <q-input outlined dense label="Thermal Conductivity" class="q-pa-xs"></q-input>
        <q-input outlined dense label="Material Density" class="q-pa-xs"></q-input>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        count : Number
    }
})
</script>
