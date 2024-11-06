<script setup>

import { current } from './ThinkData';


</script>
<template>
    <KeepAlive>
        <component :is="current"></component>
    </KeepAlive>
</template>
<style scoped>
</style>