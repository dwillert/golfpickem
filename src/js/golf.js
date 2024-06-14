
var playerInput = document.getElementById("rowData")
var poolRank = document.getElementById("rank")
var liveLeaderboard = document.getElementById("liveLeaderboard")
var tourName = document.getElementById("tourName")
var playerCard = document.getElementById("player_cards")

let tournamentData = {}
let leaderboardData = {}
let leaderBoard = []
let userLeaderboard = []
var playerData = [];
const cutPenalty = 0

let populateRank = () => {
    for(i=0;i<playerData.length;i++){
        let trRank = document.createElement("tr");
        let thRank = document.createElement("th");
        let tdRank = document.createElement("td");
        let tdRank2 = document.createElement("td");
        let tdRank3 = document.createElement("td");
        thRank.innerHTML = i+1;
        tdRank.innerHTML = playerData[i]["name"];
        tdRank2.innerHTML = playerData[i]["score"];
        tdRank3.innerHTML = playerData[i]["tiebreaker"];
        trRank.appendChild(thRank);
        trRank.appendChild(tdRank);
        trRank.appendChild(tdRank2);
        trRank.appendChild(tdRank3);
        poolRank.appendChild(trRank)
    };
};

let populateCard = () => {
    for(let i=0;i<playerData.length;i++){
        let licard = document.createElement("li");
        licard.classList.add("cards_item")
        let tableCard = document.createElement("table");
        tableCard.setAttribute("class", "table table-striped table-responsive")
        let tr = document.createElement("tr");
        tr.setAttribute("id", "cardTop")
        // Add user
        let tdUser = document.createElement("th");
        tdUser.setAttribute("id", "cardUser");
        tdUser.innerHTML = playerData[i]["name"];
        tr.appendChild(tdUser)
        // add tiebreaker
        let pTiebreaker = document.createElement("p");
        pTiebreaker.innerHTML = `Tiebreaker: ${playerData[i]["tiebreaker"]}`;

        let scoreHeader = document.createElement("tr");
        // Write loop for this in future
        let tdHeader1 = document.createElement("td");
        let tdHeader2 = document.createElement("td");
        let tdHeader3 = document.createElement("td")
        tdHeader1.setAttribute("id", "cardHeader");
        tdHeader2.setAttribute("id", "cardHeader");
        tdHeader3.setAttribute("id", "cardHeader");
        tdHeader1.innerHTML = "Player";
        tdHeader2.innerHTML = "Score";
        tdHeader3.innerHTML = "Thru";
        scoreHeader.appendChild(tdHeader1)
        scoreHeader.appendChild(tdHeader2)
        scoreHeader.appendChild(tdHeader3)

        score_array = ["Player", "Score", "Thru"];
        
        tableCard.appendChild(tr)
        tableCard.appendChild(pTiebreaker)
        tableCard.appendChild(scoreHeader)
        
        // add row for player
        for (let j=0; j<playerData[i]["golfers"].length; j++){
            let trj = document.createElement("tr")
            let tdplayer = document.createElement("td");
            let tdScore = document.createElement("td");
            let tdThru = document.createElement("td");

            let playerName = playerData[i]["golfers"][j]["name"];
            let playerScore = assignScores(playerName, "card");
            if (playerScore.status === "cut"){
                tdplayer.innerHTML = `${playerName}`
                tdplayer.setAttribute("id", "cut")
                tdThru.setAttribute("id", "cut")
                tdScore.setAttribute("id", "cut")
                tdThru.innerHTML = `(CUT: +${cutPenalty})`
            } else {
                tdplayer.innerHTML = playerName
                tdThru.innerHTML = playerScore.thru
            };
            tdScore.innerHTML = playerScore.score
            
            trj.appendChild(tdplayer)
            trj.appendChild(tdScore)
            trj.appendChild(tdThru)
            
            tableCard.appendChild(trj);
        };
        addScores();
        licard.appendChild(tableCard)
        let tdScore = document.createElement("th");
        tdScore.setAttribute("id", "cardTotalScore")
        tdScore.innerHTML = playerData[i]["score"];
        tr.appendChild(tdScore)
        licard.appendChild(tr)
        playerCard.appendChild(licard)

    };
};

const getObjectS3 = async (client, bucket, key) => {
    try {
        const params = {
            Bucket: bucket,
            Key: key
        }
        const data = await client.getObject(params).promise();
        let datastr = data.Body.toString('utf-8');
        let data_json = JSON.parse(datastr);
        return data_json;
    } catch (e) {
        throw new Error(`Could not retrieve file ${e.message}`)
    }
};

const listObjectsV2 = async (client, bucket, prefix) => {
    try {
        const params = {
            "Bucket": bucket,
        }
        const data = await client.listObjects(params).promise();
        for (let i=0; i<data["Contents"].length; i++){
            if (data["Contents"][i]["Key"].startsWith(prefix)){
                return data["Contents"][i]["Key"]
            }
        }
        return
    } catch (e) {
        throw new Error(`Could not retrieve file ${e.message}`)
    }
};

const retrieveGolfData = async () => {

    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:c7fbde0b-bd35-4872-a018-8c5b469af387',
    });

    const s3Bucket = new AWS.S3({ 
        apiVersion: '2006-03-01',
        signatureVersion: 'v4',
        region: "us-east-1",
    });
    const tourn_file = await listObjectsV2(s3Bucket, "golfpickem-bucket", "golf_tournament_data")
    const picks_file = await listObjectsV2(s3Bucket, "golfpickem-bucket", "picks_data")
    const golfData = await getObjectS3(s3Bucket, "golfpickem-bucket", tourn_file);
    console.log("GOLF DATA",golfData);
    playerData = await getObjectS3(s3Bucket, "golfpickem-bucket", picks_file);
    console.log("PLAYER DATA", playerData);

    leaderboardData = golfData["results"]["leaderboard"]
    tournamentData = golfData["results"]["tournament"]
    assignTourName();
    populateCard();
    renderLeaderboard();
    addScores();
    sortRank();
};


let assignTourName = () => {
    console.log(tournamentData["name"]);
    tourName.innerHTML = `${tournamentData.name} at ${tournamentData.course}`;
};

const assignScores = (player, type) => {
    for(i=0; i<leaderboardData.length; i++){
        if(player === `${leaderboardData[i]["first_name"]} ${leaderboardData[i]["last_name"]}`){
            score = leaderboardData[i]["total_to_par"];
            cutStatus = leaderboardData[i]["status"];
            rounds = leaderboardData[i]["rounds"];
            position = leaderboardData[i]["position"];
            chosenCount = 0
            if(leaderboardData[i]["holes_played"] === 0 && leaderboardData[i]["status"] === "complete"){
                thru = "F";
            } else if (leaderboardData[i]["holes_played"] === 0 && leaderboardData[i]["status"] === "cut"){
                thru = "CUT";
            } else {
                thru = leaderboardData[i]["holes_played"];
            }
            let liveScore = {"player": player, "score": score, "thru": thru, "status": cutStatus, "rounds": rounds, "chosenCount": chosenCount, "position": position};
            if(type === "card"){
                uniqueValue = leaderboardCheck(player)
                if(uniqueValue == true){
                    liveScore.chosenCount += 1
                    populateLeaderboard(liveScore)
                } else{
                    updateLeaderboardCount(player)
                };
                return liveScore;
            } else if(type === "leaderboard"){
                uniqueValue = leaderboardCheck(player)
                if(uniqueValue == true){
                    populateLeaderboard(liveScore)
                };
                return true;
            };
        };
    };
    liveScore = "ERR";
    return liveScore;
};

let leaderboardCheck = (player) => {
    let unique = true;
    for(i=0; i<leaderBoard.length;i++){
        if(player === leaderBoard[i]["player"]){
            unique = false;
            return unique;
        };
    };
    return unique;
};

let populateLeaderboard = (liveScore) => {
    leaderBoard.push(liveScore)
};

let updateLeaderboardCount = (player) => {
    for(i=0;i<leaderBoard.length;i++){
        if(leaderBoard[i]["player"] === player){
            leaderBoard[i]["chosenCount"] += 1;
        }
    }
};

let renderLeaderboard = () => {
    for(j=0;j<leaderboardData.length;j++){
        assignScores(`${leaderboardData[j]["first_name"]} ${leaderboardData[j]["last_name"]}`, "leaderboard");
    };
    leaderBoard.sort(compareRank);
    for(i=0;i<leaderBoard.length;i++){
        let trLeader = document.createElement("tr");
        let tdLeader = document.createElement("td");
        let tdLeader2 = document.createElement("td");
        let tdLeader3 = document.createElement("td");
        let tdLeader4 = document.createElement("td");
        let tdLeader5 = document.createElement("td");
        let tdr1 = document.createElement("td");
        let tdr2 = document.createElement("td");
        let tdr3 = document.createElement("td");
        let tdr4 = document.createElement("td");
        tdr1.innerHTML = leaderBoard[i]["rounds"][0]["strokes"];
        tdr2.innerHTML = leaderBoard[i]["rounds"][1]["strokes"];
        tdr3.innerHTML = leaderBoard[i]["rounds"][2]["strokes"];
        tdr4.innerHTML = leaderBoard[i]["rounds"][3]["strokes"];
        tdLeader.innerHTML = leaderBoard[i]["position"];
        tdLeader2.innerHTML = leaderBoard[i]["player"];
        tdLeader3.innerHTML = leaderBoard[i]["score"];
        tdLeader4.innerHTML = leaderBoard[i]["thru"];
        if(leaderBoard[i]["chosenCount"] != 0){
            tdLeader5.innerHTML = leaderBoard[i]["chosenCount"];
        } else {
            tdLeader5.innerHTML = ""
        };
        trLeader.appendChild(tdLeader);
        trLeader.appendChild(tdLeader2);
        trLeader.appendChild(tdLeader3);
        trLeader.appendChild(tdLeader4);
        trLeader.appendChild(tdLeader5);
        trLeader.appendChild(tdr1);
        trLeader.appendChild(tdr2);
        trLeader.appendChild(tdr3);
        trLeader.appendChild(tdr4);
        liveLeaderboard.appendChild(trLeader)
    };
};

let retrievePlayerData = (player) => {
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

let addScores = () => {
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

function compareRank( a, b ) {
    if ( a.position < b.position ){
        return -1;
    }
    if ( a.position > b.position ){
        return 1;
    }
    return 0;
};

function compareScore( a, b ) {
    if ( a.score < b.score ){
        return -1;
    }
    if ( a.score > b.score ){
        return 1;
    }
    return 0;
};

let sortRank = () => {
    playerData.sort(compareScore);
    populateRank();
};

function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    };
    document.getElementById(tabName).style.display = "block";
};

retrieveGolfData();