<template>
  <h1>Hello</h1>
</template>

<script>
import apiBoard from '@/api/board'

export default {
  mounted() {
    apiBoard.getArticle(1)
      .then(function (response) {
        console.log("getArticle", response);
      })
      .catch(function (e) {
        console.log(e);
      });

    apiBoard.getArticles(0)
      .then(function (response) {
        console.log("getArticles", response);
      })
      .catch(function (e) {
        console.log(e);
      });

    apiBoard.postArticle("userId", "title", "body")
      .then(function (response) {
        console.log("postArticle", response);
      })
      .catch(function (e) {
        console.log(e);
      });
  }
}
</script>