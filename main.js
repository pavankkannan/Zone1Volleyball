const players = document.querySelectorAll(".player");
const court = document.querySelector(".court");
const playerSize = 50;
const playerRadius = playerSize/2;

let currentPlayer = null;
const onDrag = (e) => {
    if (!currentPlayer) {
        return;
    }
    const {movementX, movementY} = e;
    const playerStyle = window.getComputedStyle(currentPlayer);
    const leftValue = parseInt(playerStyle.left);
    const topValue = parseInt(playerStyle.top);
    const x = leftValue + movementX;
    const y = topValue + movementY;
    const position = currentPlayer.dataset.position;

    if (position === "leftBack") {
        const middleBack = document.querySelector(".player[data-position='middleBack']");
        const mbStyle = window.getComputedStyle(middleBack);
        const mbx = parseInt(mbStyle.left);

        const leftFront = document.querySelector(".player[data-position='leftFront']");
        const lfStyle = window.getComputedStyle(leftFront);
        const lfy = parseInt(lfStyle.top);
        if (x >= (mbx-20) || y <= (lfy+20) || x<= courtLeft || y >= (courtTop+courtHeight-playerSize)) {
            return;
        } 
    }

    if (position === "leftFront") {
        const leftBack = document.querySelector(".player[data-position='leftBack']");
        const lbStyle = window.getComputedStyle(leftBack);
        const lby = parseInt(lbStyle.top);

        const middleFront = document.querySelector(".player[data-position='middleFront']");
        const mfStyle = window.getComputedStyle(middleFront);
        const mfx = parseInt(mfStyle.left);
        if (x >= (mfx-20) ||  y >= (lby-20) || x<= courtLeft || y <= courtTop) {
            return;
        } 
    }

    if (position === "middleFront") {
        const leftFront = document.querySelector(".player[data-position='leftFront']");
        const lfStyle = window.getComputedStyle(leftFront);
        const lfx = parseInt(lfStyle.left);

        const rightFront = document.querySelector(".player[data-position='rightFront']");
        const rfStyle = window.getComputedStyle(rightFront);
        const rfx = parseInt(rfStyle.left);

        const middleBack = document.querySelector(".player[data-position='middleBack']");
        const mbStyle = window.getComputedStyle(middleBack);
        const mby = parseInt(mbStyle.top);

        if (x <= (lfx+20) || x >= (rfx-20) || y >= (mby-20) || y <= courtTop) {
            return;
        } 
    }

    if (position === "middleBack") {
      const leftBack = document.querySelector(".player[data-position='leftBack']");
      const lbStyle = window.getComputedStyle(leftBack);
      const lbx = parseInt(lbStyle.left);

      const rightBack = document.querySelector(".player[data-position='rightBack']");
      const rbStyle = window.getComputedStyle(rightBack);
      const rbx = parseInt(rbStyle.left);

      const middleFront = document.querySelector(".player[data-position='middleFront']");
      const mfStyle = window.getComputedStyle(middleFront);
      const mfy = parseInt(mfStyle.top);

      if (x <= (lbx+20) || x >= (rbx-20) || y <= (mfy+20) || y >= (courtTop+courtHeight-playerSize)) {
        return;
      } 
  }

    if (position === "rightFront") {
        const middleFront = document.querySelector(".player[data-position='middleFront']");
        const mfStyle = window.getComputedStyle(middleFront);
        const mfx = parseInt(mfStyle.left);

        const rightBack = document.querySelector(".player[data-position='rightBack']");
        const rbStyle = window.getComputedStyle(rightBack);
        const rby = parseInt(rbStyle.top);
        if (x <= (mfx+20) || y >= (rby-20)|| x>= (courtLeft+courtWidth-playerSize) || y <= courtTop) {
            return;
        } 
    }

    if (position === "rightBack") {
        const middleBack = document.querySelector(".player[data-position='middleBack']");
        const mbStyle = window.getComputedStyle(middleBack);
        const mbx = parseInt(mbStyle.left);

        const rightFront = document.querySelector(".player[data-position='rightFront']");
        const rfStyle = window.getComputedStyle(rightFront);
        const rfy = parseInt(rfStyle.top);
        if (x <= (mbx+20) || y <= (rfy+20) || x>= (courtLeft+courtWidth-playerSize) || y >= (courtTop+courtHeight-playerSize)) {
            return;
        } 
    }

    currentPlayer.style.left = `${x}px`;
    currentPlayer.style.top = `${y}px`; 
}

const offsets = court.getBoundingClientRect();
const courtTop = offsets.top;
const courtLeft = offsets.left;
const courtWidth = offsets.width;
const courtHeight = offsets.height;

Array.from(players).forEach((player) => {

    const position = player.dataset.position;

    if (position === "leftFront") {
      player.style.left = (courtWidth * .25) + courtLeft - playerRadius + "px";
      player.style.top = (courtHeight * .33) + courtTop - playerRadius + "px";
    }
    
    if (position === "leftBack") {
      player.style.left = (courtWidth * .25) + courtLeft - playerRadius + "px";
      player.style.top = (courtHeight * .66) + courtTop - playerRadius + "px";
    }

    if (position === "middleFront") {
      player.style.left = (courtWidth * .50) + courtLeft - playerRadius + "px";
      player.style.top = (courtHeight * .33) + courtTop - playerRadius + "px";
    }

    if (position === "middleBack") {
      player.style.left = (courtWidth * .50) + courtLeft - playerRadius + "px";
      player.style.top = (courtHeight * .66) + courtTop - playerRadius + "px";
    }

    if (position === "rightFront") {
      player.style.left = (courtWidth * .75) + courtLeft - playerRadius + "px";
      player.style.top = (courtHeight * .33) + courtTop - playerRadius + "px";
    }

    if (position === "rightBack") {
      player.style.left = (courtWidth * .75) + courtLeft - playerRadius + "px";
      player.style.top = (courtHeight * .66) + courtTop - playerRadius + "px";
    }


    player.addEventListener("mousedown", (e) => {
      currentPlayer = player;
      court.addEventListener("mousemove", onDrag);
    });
})
document.addEventListener("mouseup", (e) => {
    court.removeEventListener("mousemove", onDrag);
});

function toggleNav() {
    const element = document.getElementById("sidebar");
    if (element.style.display == "none") {
        element.style.display = "flex";
    } else {
        element.style.display = "none";
    }
}