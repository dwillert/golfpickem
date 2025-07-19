
export const calculatePlayerScore = (playerName, pickBoard, cutPenalty) => {
    let scoreValue = 0;
    for (let i = 0; i < pickBoard.length; i++) {
        if (playerName === pickBoard[i]["player"]) {
            if (pickBoard[i]["status"] === "cut") {
                scoreValue += cutPenalty * 2;
            }
            scoreValue += pickBoard[i]["score"];
            return scoreValue;
        }
    }
    return scoreValue;
};

const addScores = (playerData) => {
    let totalScore = 0;
    for(let i=0;i<playerData.length;i++){
        for(let j=0; j<playerData[i]["golfers"].length;j++){
            let score = retrievePlayerData(playerData[i]["golfers"][j]["name"]);
            totalScore += score;
        };
        if(playerData[i]["penalty"] != 0){
            totalScore -= playerData[i]["penalty"];
        };
        playerData[i]["score"] = totalScore;
        totalScore = 0;
    };
};

let retrievePlayerData = (player, leaderBoard) => {
    let scoreValue = 0;
    for(let i=0; i<leaderBoard.length;i++){
        if(player === leaderBoard[i]["player"]){
            if(leaderBoard[i]["status"] === "cut"){
                scoreValue += cutPenalty*2;
            };
            scoreValue += leaderBoard[i]["score"];
            return scoreValue;
        };
    };
    return scoreValue;
};