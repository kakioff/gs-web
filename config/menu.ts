export const recipeMenu = [
        {
            label: "总览",
            key: "/recipe",
        },
        {
            label: "每日菜单",
            key: "/recipe/daily",
        },
        {
            label: "菜谱",
            key: "/recipe/cook-book",
        },
    ],
    gameMenu = [{
        label: "扫雷",
        key: "/games/minesweeper",
    }],
    mainMenu = [
        {
            label: "主页",
            key: "/",
        },
        {
            label: "菜单",
            key: "/recipe",
            children: recipeMenu,
        },
        {
            label: "游戏",
            key: "/games",
            children: gameMenu,
        },
        {
            label: "关于",
            key: "/about",
        },
    ];
