import articles from '@/data/articles'

let response = {
    data: {
        resultCode: 0,
        errorMsg: ""
    }
}

export default {
    list: async function (currentPage) {
        return new Promise((resolve) => {
            response.data.resultCode = 0;

            if (!currentPage) {
                response.data.rows = articles.rows;
                setTimeout(() => resolve(response), 500);
                return;
            }

            response.data.rows = [];

            var startNo = (currentPage - 1) * 10;
            try {
                for (var i=0; i<10; i++) {
                    articles.rows[startNo + i].no = startNo + i + 1;
                    response.data.rows.push(articles.rows[startNo + i]);
                }
            } catch (error) {
                // range 에러 무시
            }

            setTimeout(() => resolve(response), 500);
        });
    },

    findByUserId: async function (userId) {
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            response.data.rows = articles.rows.filter((e) => e.userId === userId);
            setTimeout(() => resolve(response), 500);
        });

    }
}