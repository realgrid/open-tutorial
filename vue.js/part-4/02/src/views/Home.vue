<template>
    <Login v-if="!this.$store.getters.isLogined" />
    <Main v-if="this.$store.getters.isLogined"/>
</template>

<script>
import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'

export default {
    components: { Main, Login },
}
</script>
