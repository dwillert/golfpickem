
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

// let populateTable = () => {

//     for (let i=0; i<playerData.length; i++){
//         let tr = document.createElement("tr");
//         let th = document.createElement("th");
//         // Add Row Header
//         th.innerHTML = playerData[i]["id"];
//         tr.appendChild(th);
//         // Add user
//         let tdUser = document.createElement("td");
//         tdUser.innerHTML = playerData[i]["name"];
//         tr.appendChild(tdUser)
//         // Add Score
//         let tdScore = document.createElement("td");
//         tdScore.innerHTML = playerData[i]["score"];
//         tr.appendChild(tdScore)
//         // add tiebreaker
//         let pTiebreaker = document.createElement("p");
//         pTiebreaker.innerHTML = `Tiebreaker: ${playerData[i]["tiebreaker"]}`;
//         // tr.appendChild(tdScore);
//         playerInput.appendChild(tr)
//         playerInput.appendChild(pTiebreaker)
//         // add row for player
//         for (let j=0; j<playerData[i]["golfers"].length; j++){
//             let divGolfer = document.createElement("div");
//             let pGolfer = document.createElement("p");
//             let pScore = document.createElement("p");
//             let playerName = playerData[i]["golfers"][j]["name"];
//             let playerScore = assignScores(playerName);
//             pGolfer.innerHTML = `${playerName} Score: ${playerScore.score} Thru: ${playerScore.thru}`;
//             // pScore.innerHTML = `Score: ${playerScore}`


            
//             divGolfer.appendChild(pGolfer);
//             // divGolfer.appendChild(pScore);
//             playerInput.appendChild(divGolfer);
//         };
//     };
// };   

// let checkCreds = () => {
//     AWS.config.getCredentials(function(err) {
//       if (err) console.log(err.stack);
//       // credentials not loaded
//       else {
//         console.log("Creds Found");
//       }
//     });
// };

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
        // tableCard.classList.add("")
        let tr = document.createElement("tr");
        // let th = document.createElement("th");
        // Add Row Header
        // th.innerHTML = playerData[i]["id"];
        // tr.appendChild(th);
        // Add user
        let tdUser = document.createElement("th");
        tdUser.innerHTML = playerData[i]["name"];
        tr.appendChild(tdUser)
        // Add Score
        // let tdScore = document.createElement("th");
        // tdScore.innerHTML = playerData[i]["score"];
        // tr.appendChild(tdScore)
        // add tiebreaker
        let pTiebreaker = document.createElement("p");
        pTiebreaker.innerHTML = `Tiebreaker: ${playerData[i]["tiebreaker"]}`;
        // tr.appendChild(tdScore);

        let scoreHeader = document.createElement("tr");
        let tdHeader1 = document.createElement("td");
        let tdHeader2 = document.createElement("td");
        let tdHeader3 = document.createElement("td");
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
            // let divGolfer = document.createElement("div");
            let tdplayer = document.createElement("td");
            // let pGolfer = document.createElement("p");
            let tdScore = document.createElement("td");
            let tdThru = document.createElement("td");

            // let pScore = document.createElement("p");
            let playerName = playerData[i]["golfers"][j]["name"];
            tdplayer.innerHTML = playerName
            let playerScore = assignScores(playerName);
            tdScore.innerHTML = playerScore.score
            tdThru.innerHTML = playerScore.thru
            // pGolfer.innerHTML = `${playerName} Score: ${playerScore.score} Thru: ${playerScore.thru}`;
            // pGolfer.innerHTML = `${playerName}`;
            // pScore.innerHTML = `Score: ${playerScore}`
            
            // console.log("Done", playerName)
            trj.appendChild(tdplayer)
            trj.appendChild(tdScore)
            trj.appendChild(tdThru)
            
            // divGolfer.appendChild(pGolfer);
            // divGolfer.appendChild(pScore);
            tableCard.appendChild(trj);
        };
        addScores();
        licard.appendChild(tableCard)
        let tdScore = document.createElement("th");
        tdScore.innerHTML = playerData[i]["score"];
        tr.appendChild(tdScore)
        licard.appendChild(tr)
        playerCard.appendChild(licard)

    };
};

async function retrieveGolfData(){
    console.log("Running API")

    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:c7fbde0b-bd35-4872-a018-8c5b469af387',
    });

    console.log("Done")
    console.log(AWS.config.credentials)


    const s3Bucket = new AWS.S3({ 
        apiVersion: '2006-03-01',
        signatureVersion: 'v4',
        region: "us-east-1",
    });
    console.log(s3Bucket.config.credentials)
    console.log(s3Bucket.config)
    const params = {
        Bucket: "willert-bucket",
        // Expires: 3000,
        Key: "Projects/GolfPickem/golf_tournament_data.json", 
    };
    const answer = s3Bucket.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);
    });  
    console.log(answer)

    const params2 = {
        Bucket: "willert-bucket",
        Expires: 3000,
        Key: "Projects/GolfPickem/picks_data.json", 
    };
    const url = await s3Bucket
    .getSignedUrl("getObject",params, function (err, urlstr) {
        console.log('The URL is', urlstr);
      });

    const url2 = await s3Bucket
    .getSignedUrl("getObject", params2, function (err, url2str) {
        console.log('The URL is', url2str);
      });


    const res = await axios.get(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        responseType: 'json',
    });

    const res2 = await axios.get(url2, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        responseType: 'json',
    });
    playerData = res2.data
    console.log(playerData)
    const golfData = res.data;
    console.log(golfData);
    leaderboardData = golfData["results"]["leaderboard"]
    tournamentData = golfData["results"]["tournament"]
    console.log(leaderboardData)
    console.log(tournamentData)
    assignTourName();
    // populateTable();
    populateCard();
    renderLeaderboard();
    addScores();
    sortRank();
};

let assignTourName = () => {
    console.log(tournamentData["name"]);
    tourName.innerHTML = `${tournamentData.name} at ${tournamentData.course}`;
};

// let mapGolfers = () => {
//     for(i=0;i< playerData.length;i++){
//         console.log(i)
//         for(j=0;j<playerData[i]["golfers"].length;j++){
//             console.log(i)
//             console.log(playerData[i]["golfers"][j].score);
//             var playerName = playerData[i]["golfers"][j]["name"];
//             console.log(playerName)
//             var score = assignScores(playerName);
//             console.log(score);
//         };
//     };
// };

let assignScores = (player) => {
    let liveScore;
    for(i=0; i<leaderboardData.length; i++){
        if(player === `${leaderboardData[i]["first_name"]} ${leaderboardData[i]["last_name"]}`){
            console.log("YES");
            score = leaderboardData[i]["total_to_par"];
            thru = leaderboardData[i]["holes_played"];
            cutStatus = leaderboardData[i]["status"];
            rounds = leaderboardData[i]["rounds"];
            let liveScore = {"player": player, "score": score, "thru": thru, "status": cutStatus, "rounds": rounds};
            uniqueValue = leaderboardCheck(player)
            if(uniqueValue == true){
                populateLeaderboard(liveScore)
            };
            return liveScore;
        }
    }
    console.log("NO");
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
}

let populateLeaderboard = (liveScore) => {
    leaderBoard.push(liveScore)
};

let renderLeaderboard = () => {
    leaderBoard.sort(compare);
    console.log(leaderBoard)
    for(i=0;i<leaderBoard.length;i++){
        let trLeader = document.createElement("tr");
        let tdLeader = document.createElement("td");
        let tdLeader2 = document.createElement("td");
        let tdLeader3 = document.createElement("td");
        let tdr1 = document.createElement("td");
        let tdr2 = document.createElement("td");
        let tdr3 = document.createElement("td");
        let tdr4 = document.createElement("td");
        tdr1.innerHTML = leaderBoard[i]["rounds"][0]["strokes"];
        tdr2.innerHTML = leaderBoard[i]["rounds"][1]["strokes"];
        tdr3.innerHTML = leaderBoard[i]["rounds"][2]["strokes"];
        tdr4.innerHTML = leaderBoard[i]["rounds"][3]["strokes"];
        tdLeader.innerHTML = leaderBoard[i]["player"];
        tdLeader2.innerHTML = leaderBoard[i]["score"];
        tdLeader3.innerHTML = leaderBoard[i]["thru"];
        trLeader.appendChild(tdLeader);
        trLeader.appendChild(tdLeader2);
        trLeader.appendChild(tdLeader3);
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
                scoreValue += 10;
            };
            scoreValue += leaderBoard[i]["score"];
            return scoreValue;
        };
    };
    return scoreValue;
}

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

function compare( a, b ) {
    if ( a.score < b.score ){
        return -1;
    }
    if ( a.score > b.score ){
        return 1;
    }
    return 0;
}

let sortRank = () => {
    playerData.sort(compare);
    console.log(playerData)
    populateRank();
}

function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}
retrieveGolfData();