function loadPrologue() {
    const main = document.getElementsByTagName("main");
    const board = document.createElement("board");
    const alink = document.createElement("a");
    const nextButton = document.createElement("button");
    const credits = document.createElement("h2");

    board.style.width = "750px";
    board.style.height = "600px";
    board.style.position = "fixed";
    board.style.padding = 0;
    board.style.backgroundImage = "url(assets/prologue-1.png)";
    board.style.backgroundSize = "cover";
    board.style.backgroundRepeat = "no-repeat";
    board.style.padding = 0;

    nextButton.style.display = "inline-block";
    nextButton.style.width = "176px";
    nextButton.style.height = "25px";
    nextButton.style.position = "fixed";
    // alink.style.border = "1px white solid"; // demo and testing purposes
    nextButton.style.marginLeft = "288px";
    nextButton.style.marginTop = "570px";
    nextButton.style.textAlign = "center";
    nextButton.style.verticalAlign = "center";
    nextButton.innerHTML = "Next";

    credits.id = "titleScreen";
    credits.style.width = "700px";
    credits.style.height = "40px";
    credits.style.lineHeight = "40px";
    credits.style.marginLeft = "25px";
    credits.style.textAlign = "center";
    credits.style.marginTop = "525px";
    credits.style.backgroundColor = "#1e2613";
    credits.style.color = "white";
    credits.style.fontSize = "12pt";
    credits.innerHTML = "There once was a bard named Orpheus, who could make magic with his lyre";

    main[0].append(board);
    alink.append(nextButton);
    board.append(alink);
    board.append(credits);

    alink.onclick = function() {
        board.style.backgroundImage = "url(assets/prologue-2.png)";
        credits.innerHTML = "He fell in love with a maiden named Eurydice";
        alink.onclick = function() {
            board.style.backgroundImage = "url(assets/prologue-3.png)";
            credits.innerHTML = "One day, Eurydice was snatched up by the fearsome Dragon.";
            alink.onclick = function() {
                alink.href = "ballad.html";
            };
        };
    };
}