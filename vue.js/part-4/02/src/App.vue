<template>
    <router-view />
</template>

<script>
import 'element-plus/dist/index.css'

export default {
    mounted() {
        console.log("isLogined", this.$store.getters.isLogined);
    }
}
</script>
