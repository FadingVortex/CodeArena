<script setup>

import { current } from './EditData';

</script>
<template>
    <KeepAlive>
        <component :is="current"></component>
    </KeepAlive>
</template>
<style scoped>
</style>