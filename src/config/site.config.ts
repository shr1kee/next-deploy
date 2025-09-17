export const siteConfig = {
    title: "Кино",
    description: "Кино",
    navItems: [
        {href: "/", label: "Фильмы"},
        {href: "/actors", label: "Актеры"},
        {href: "/about", label: "О нас"},
    ],
    pagesContent: {
        "/" : {
            content: "Че-то о чем-то"
        },
        "/actors" : {
            content: "Актеры и актрисы"
        },
        "/about" : {
            content: "Вся дрочь про фильмы, сериалы, актеров, слухи и т.д. и т.п"
        }
    }
}