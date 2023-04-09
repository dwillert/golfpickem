
var playerInput = document.getElementById("rowData")
var poolRank = document.getElementById("rank")
var liveLeaderboard = document.getElementById("liveLeaderboard")
var tourName = document.getElementById("tourName")

let tournamentData = {}
let leaderboardData = {}
let leaderBoard = []
let userLeaderboard = []

var playerData = [
    {
        "id": 1,
        "name": "Dan Willert",
        "tiebreaker": -8,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Justin Thomas",
            },
            {
                "id": 2,
                "name": "Scottie Scheffler",
            },
            {
                "id": 3,
                "name": "Jason Day",
            },
            {
                "id": 4,
                "name": "Kurt Kitayama",
            },
            {
                "id": 5,
                "name": "Keegan Bradley",
            },
            {
                "id": 6,
                "name": "Hideki Matsuyama",
            }
        ]
    },
    {
        "id": 2,
        "name": "Sean Rosencrance",
        "tiebreaker": -13,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Jon Rahm",
            },
            {
                "id": 2,
                "name": "Scottie Scheffler",
            },
            {
                "id": 3,
                "name": "Tony Finau",
            },
            {
                "id": 4,
                "name": "Min Woo Lee",
            },
            {
                "id": 5,
                "name": "Charl Schwartzel",
            },
            {
                "id": 6,
                "name": "Adam Svensson",
            }
        ]
    },    
    {
        "id": 3,
        "name": "Nick Williamson",
        "tiebreaker": -5,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Jon Rahm",
            },
            {
                "id": 2,
                "name": "Scottie Scheffler",
            },
            {
                "id": 3,
                "name": "Tony Finau",
            },
            {
                "id": 4,
                "name": "Jason Day",
            },
            {
                "id": 5,
                "name": "Keegan Bradley",
            },
            {
                "id": 6,
                "name": "Kurt Kitayama",
            }
        ]
    },
    {
        "id": 4,
        "name": "Michael Pourchot",
        "tiebreaker": -9,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Jordan Speith",
            },
            {
                "id": 2,
                "name": "Rory McIlroy",
            },
            {
                "id": 3,
                "name": "Jason Day",
            },
            {
                "id": 4,
                "name": "Min Woo Lee",
            },
            {
                "id": 5,
                "name": "Keegan Bradley",
            },
            {
                "id": 6,
                "name": "Harris English",
            }
        ]
    },
    {
        "id": 5,
        "name": "Alex Desverreaux",
        "tiebreaker": -13,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Rory McIlroy",
            },
            {
                "id": 2,
                "name": "Cameron Smith",
            },
            {
                "id": 3,
                "name": "Tony Finau",
            },
            {
                "id": 4,
                "name": "Dustin Johnson",
            },
            {
                "id": 5,
                "name": "Phil Mickelson",
            },
            {
                "id": 6,
                "name": "Gary Woodland",
            }
        ]
    },
    {
        "id": 6,
        "name": "Sean Palmer",
        "tiebreaker": -11,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Rory McIlroy",
            },
            {
                "id": 3,
                "name": "Tony Finau",
            },
            {
                "id": 4,
                "name": "Corey Conners",
            },
            {
                "id": 5,
                "name": "Seamus Power",
            },
            {
                "id": 6,
                "name": "Keegan Bradley",
            }
        ]
    },
    {
        "id": 7,
        "name": "Ricky Dalrymple",
        "tiebreaker": -10,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Jon Rahm",
            },
            {
                "id": 2,
                "name": "Max Homa",
            },
            {
                "id": 3,
                "name": "Viktor Hovland",
            },
            {
                "id": 4,
                "name": "Sungjae Im",
            },
            {
                "id": 5,
                "name": "Keegan Bradley",
            },
            {
                "id": 6,
                "name": "Kurt Kitayama",
            }
        ]
    },
    {
        "id": 8,
        "name": "Beecher Carder",
        "tiebreaker": -7,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Max Homa",
            },
            {
                "id": 3,
                "name": "Dustin Johnson",
            },
            {
                "id": 4,
                "name": "Hideki Matsuyama",
            },
            {
                "id": 5,
                "name": "Harold Varner III",
            },
            {
                "id": 6,
                "name": "Seamus Power",
            }
        ]
    },
    {
        "id": 9,
        "name": "Jordan Bibb",
        "tiebreaker": -13,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Max Homa",
            },
            {
                "id": 3,
                "name": "Brooks Koepka",
            },
            {
                "id": 4,
                "name": "Cameron Young",
            },
            {
                "id": 5,
                "name": "Harold Varner III",
            },
            {
                "id": 6,
                "name": "Seamus Power",
            }
        ]
    },
    {
        "id": 10,
        "name": "Thomas Lowrey",
        "tiebreaker": -4,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Max Homa",
            },
            {
                "id": 3,
                "name": "Tony Finau",
            },
            {
                "id": 4,
                "name": "Jason Day",
            },
            {
                "id": 5,
                "name": "Keegan Bradley",
            },
            {
                "id": 6,
                "name": "Gary Woodland",
            }
        ]
    },
    {
        "id": 11,
        "name": "Mitch Lamb",
        "tiebreaker": -13,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Patrick Cantlay",
            },
            {
                "id": 3,
                "name": "Corey Conners",
            },
            {
                "id": 4,
                "name": "Sungjae Im",
            },
            {
                "id": 5,
                "name": "Keegan Bradley",
            },
            {
                "id": 6,
                "name": "Mackenzie Hughes",
            }
        ]
    },
    {
        "id": 12,
        "name": "Dawson Fielding",
        "tiebreaker": -20,
        "score": 4,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Rory McIlroy",
            },
            {
                "id": 3,
                "name": "Jason Day",
            },
            {
                "id": 4,
                "name": "Dustin Johnson",
            },
            {
                "id": 5,
                "name": "Sam Bennett",
            },
            {
                "id": 6,
                "name": "Thomas Pieters",
            }
        ]
    },
    {
        "id": 13,
        "name": "Matt Seale",
        "tiebreaker": -13,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Justin Thomas",
            },
            {
                "id": 2,
                "name": "Rory McIlroy",
            },
            {
                "id": 3,
                "name": "Shane Lowrey",
            },
            {
                "id": 4,
                "name": "Corey Conners",
            },
            {
                "id": 5,
                "name": "Kurt Kitayama",
            },
            {
                "id": 6,
                "name": "Adam Svensson",
            }
        ]
    },
    {
        "id": 14,
        "name": "jamie Papagno",
        "tiebreaker": -11,
        "score": 4,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Rory McIlroy",
            },
            {
                "id": 3,
                "name": "Shane Lowrey",
            },
            {
                "id": 4,
                "name": "Dustin Johnson",
            },
            {
                "id": 5,
                "name": "Phil Mickelson",
            },
            {
                "id": 6,
                "name": "Danny Willet",
            }
        ]
    },
    {
        "id": 15,
        "name": "Joe Keffler",
        "tiebreaker": -14,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Collin Morikawa",
            },
            {
                "id": 3,
                "name": "Joaquin Niemann",
            },
            {
                "id": 4,
                "name": "Min Woo Lee",
            },
            {
                "id": 5,
                "name": "Kevin Kisner",
            },
            {
                "id": 6,
                "name": "Francesco Molinari",
            }
        ]
    },    
    {
        "id": 16,
        "name": "David Del Grosso",
        "tiebreaker": -14,
        "score": 0,
        "penalty": 0,
        "golfers": [
            {
                "id": 1,
                "name": "Scottie Scheffler",
            },
            {
                "id": 2,
                "name": "Rory McIlroy",
            },
            {
                "id": 3,
                "name": "Sungjae Im",
            },
            {
                "id": 4,
                "name": "Dustin Johnson",
            },
            {
                "id": 5,
                "name": "Kurt Kitayama",
            },
            {
                "id": 6,
                "name": "Thomas Pieters",
            }
        ]
    },
];




let populateTable = () => {

    for (let i=0; i<playerData.length; i++){
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        // Add Row Header
        th.innerHTML = playerData[i]["id"];
        tr.appendChild(th);
        // Add user
        let tdUser = document.createElement("td");
        tdUser.innerHTML = playerData[i]["name"];
        tr.appendChild(tdUser)
        // Add Score
        let tdScore = document.createElement("td");
        tdScore.innerHTML = playerData[i]["score"];
        tr.appendChild(tdScore)
        // add tiebreaker
        let pTiebreaker = document.createElement("p");
        pTiebreaker.innerHTML = `Tiebreaker: ${playerData[i]["tiebreaker"]}`;
        // tr.appendChild(tdScore);
        playerInput.appendChild(tr)
        playerInput.appendChild(pTiebreaker)
        // add row for player
        for (let j=0; j<playerData[i]["golfers"].length; j++){
            let divGolfer = document.createElement("div");
            let pGolfer = document.createElement("p");
            let pScore = document.createElement("p");
            let playerName = playerData[i]["golfers"][j]["name"];
            let playerScore = assignScores(playerName);
            pGolfer.innerHTML = `${playerName} Score: ${playerScore.score} Thru: ${playerScore.thru}`;
            // pScore.innerHTML = `Score: ${playerScore}`


            
            divGolfer.appendChild(pGolfer);
            // divGolfer.appendChild(pScore);
            playerInput.appendChild(divGolfer);
        };
    };
};   

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

async function retrieveGolfData(){
    console.log("Running API")
    const s3Bucket = new AWS.S3({  
        accessKeyId: "",
        secretAccessKey: "",
        signatureVersion: 'v4',
        region: "us-east-1",
    });

    const params = {
        Bucket: "willert-bucket",
        Expires: 3000,
        Key: "Projects/GolfPickem/golf_tournament_data.json", 
      };
    const url = await s3Bucket
    .getSignedUrl("getObject",params)

    const res = await axios.get(url, {
        responseType: 'json',
    });
    const golfData = res.data;
    console.log(golfData);
    leaderboardData = golfData["results"]["leaderboard"]
    tournamentData = golfData["results"]["tournament"]
    console.log(leaderboardData)
    console.log(tournamentData)
    assignTourName();
    populateTable();
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
            let liveScore = {"player": player, "score": score, "thru": thru, "status": cutStatus};
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
        tdLeader.innerHTML = leaderBoard[i]["player"];
        tdLeader2.innerHTML = leaderBoard[i]["score"];
        tdLeader3.innerHTML = leaderBoard[i]["thru"];
        trLeader.appendChild(tdLeader);
        trLeader.appendChild(tdLeader2);
        trLeader.appendChild(tdLeader3);
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