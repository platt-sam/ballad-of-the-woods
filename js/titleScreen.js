function loadTitleScreen() {
    const main = document.getElementsByTagName("main");
    const board = document.createElement("board");
    const alink = document.createElement("a");
    const credits = document.createElement("h2");

    board.style.width = "750px";
    board.style.height = "600px";
    board.style.position = "fixed";
    board.style.padding = 0;
    board.style.backgroundImage = "url(assets/title-page-rough.jpeg)";
    board.style.backgroundSize = "cover";
    board.style.backgroundRepeat = "no-repeat";
    board.style.padding = 0;

    alink.style.display = "inline-block";
    alink.style.width = "176px";
    alink.style.height = "49px";
    alink.style.position = "fixed";
    alink.style.border = "1px #49211b solid";
    alink.style.marginLeft = "288px";
    alink.style.marginTop = "371px";
    alink.href = "topdown.html";

    credits.id = "titleScreen";
    credits.style.textAlign = "center";
    credits.style.marginTop = "450px";
    credits.style.color = "#49211b";
    credits.style.textShadow = "1px 1px #914331";
    credits.style.fontSize = "12pt";
    credits.innerHTML = "Created by<br/>Dean Wilson, Gianna McCardell, Sam Platt";

    main[0].append(board);
    board.append(alink);
    board.append(credits);

    console.log("Hello?");
}