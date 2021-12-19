<template>
    <div>
        <Login v-if="!this.$store.getters.isLogined" />
        <Main v-if="this.$store.getters.isLogined" />
    </div>
</template>

<script>
import Main from "@/components/Main.vue";
import Login from "@/components/Login.vue";

export default {
    components: { Main, Login },
};
</script>
