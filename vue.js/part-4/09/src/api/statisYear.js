import statisYears from '@/data/statisYears'

let response = {
    data: {
        resultCode: 0,
        errorMsg: ""
    }
}

export default {
    list: async function () {
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            response.data.rows = statisYears.rows.sort((a, b) => {
                const tempA = a.year + a.gender;
                const tempB = b.year + b.gender;
                if (tempA > tempB) return 1;
                if (tempA === tempB) return 0;
                if (tempA < tempB) return -1;
            });
            setTimeout(() => resolve(response), 500);
        });
    },
}