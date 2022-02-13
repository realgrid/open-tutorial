<template>
    <div>
        <Login v-if="!this.$store.getters.isLogined" />
        <Logined v-if="this.$store.getters.isLogined" />
    </div>
</template>

<script>
import 'element-plus/dist/index.css'
import Login from "@/components/Login.vue";
import Logined from "@/components/Logined.vue";

export default {
    components: { Login, Logined },

    mounted() {
        console.log("isLogined", this.$store.getters.isLogined);
    }
}
</script>

<style>
body {
    margin: 0px;
}
</style>