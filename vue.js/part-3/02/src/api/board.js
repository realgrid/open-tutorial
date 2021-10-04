import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
// const PAGESIZE = 10;

export default {
    getArticles: function (page) {
        console.log(page);
        return axios.get(BASE_URL + 'posts');
    },

    getArticle: function (id) {
        return axios.get(BASE_URL + `posts/${id}`);
    },

    postArticle: function (userId, title, body) {
        return axios.post(BASE_URL + 'posts', {
            userId: userId,
            title: title,
            body: body,
        });
    },
}

