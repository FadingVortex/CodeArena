<script setup>
import HomeThink from '../HomeThink.vue';
import ThinkMyJobs from './ThinkMyJobs.vue';
import { showNo } from './ThinkData';
import { shallowRef } from 'vue';

const current = shallowRef(HomeThink);
watch(
    showNo, 
    (newValue) => {
        if(newValue === 1) current.value = HomeThink;
        else if(newValue === 2) current.value = ThinkMyJobs;
    },
    {immediate: true}
)
</script>
<template>
    <KeepAlive>
        <component :is="current"></component>
    </KeepAlive>
</template>
<style scoped>
</style>