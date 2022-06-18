import salaryMonthly from '@/data/salaryMonthly'

let response = {
    data: {
        resultCode: 0,
        errorMsg: ""
    }
}

export default {
    monthly: async function () {
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            response.data = salaryMonthly;
            setTimeout(() => resolve(response), 500);
        });
    },
}