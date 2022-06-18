<template>
    <RealReport ref="realReport" />
</template>

<script>
/* eslint-disable */

import RealReport from '@/components/RealReport';
import salary from '@/api/salary';
import salaryMonthly from '@/report/salaryMonthly';

export default {
    components: {
        RealReport
    },

    mounted() {
        salary.monthly()
            .then((response) => {
                this.$refs.realReport.preview(salaryMonthly, response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
</script>
