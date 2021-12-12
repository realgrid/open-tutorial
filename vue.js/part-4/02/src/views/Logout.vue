<template>
    <div>
        Hi
    </div>
</template>

<script>
import apiManagers from '@/api/manager'

export default {
    mounted() {
        apiManagers.signout();
        this.$router.push({path: "/"});
    }
}
</script>