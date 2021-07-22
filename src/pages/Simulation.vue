<template>
    <q-page class="flex flex-center bg-primary q-pa-xl">
        <q-card class="q-pa-md">
            <q-card-section>
                <div class="text-h6">Choose Material</div>
            </q-card-section>
            <q-card-section>
                <q-select outlined dense label="Material" :options="options" v-model="select" />
            </q-card-section>
            <q-card-section>
                <q-btn color="primary">Start Simulation</q-btn>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
    data(){
        return {
            options:[
                'Please Choose'
            ],
            select:''
        }
    }
}
</script>