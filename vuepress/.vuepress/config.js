module.exports = {
    head: [["script", { src: "https://code.jquery.com/jquery-3.4.1.min.js" }]],

    title: "RealGrid",
    description: "사람과 데이터를 잇다",

    themeConfig: {
        sidebar: "auto",
        nav: [
            { text: "Home", link: "/" },
            { text: "About", link: "https://realgrid.com/" },
        ],
    },
    markdown: {
        lineNumbers: true,
    },
};
