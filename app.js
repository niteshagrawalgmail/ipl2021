const Negative = false;
const selectElems = document.querySelectorAll('select');
const matchSelector = document.querySelector('#matchSelector');
const winnerSelector = document.querySelector('#winnerSelector');
//var msInstance;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        format : 'dd-mm-yyyy',
        onClose : dateSelected
       
    });
    const selectInstances = M.FormSelect.init(selectElems, {});
    //console.log(msInstance);
  }); 

const date = document.querySelector('#date');
const teamBtn = document.querySelector('#teamBtn');
const table = document.querySelector('#teamTable');
const tbodyRef = table.getElementsByTagName('tbody')[0];
const matchBetween = document.querySelector('#matchBetween');


loadEventListeners();

function loadEventListeners(){

    teamBtn.addEventListener('click', getTeams);
    matchSelector.addEventListener('change', matchSelected)

}

function dateSelected(){
    //debugger;
    resetMatchSelector();
    resetWinnerSelector();
    resetMatchBetween();

    let chosenDate = date.value;
    let teams = _getTeamsForGivenDate(chosenDate);
    if (teams.length > 0){
        teams.forEach(function(value){
            let option = document.createElement('option');
            option.value = value;
            option.innerHTML = value;
            matchSelector.appendChild(option);
        });
    }
    M.FormSelect.init(matchSelector, {});
}

function resetMatchBetween(){
    matchBetween.value = '';
}

function matchSelected(){

    let teamVsPlayers = [];
    let chosenDate = date.value;
    let teams = getTeamsForGivenDate(chosenDate);

    let matchSelectorInstance = M.FormSelect.getInstance(matchSelector);
    matchSelectorInstance._setSelectedStates();
    let selectedMatch = matchSelectorInstance.getSelectedValues()[0];
    let selectedTeams = selectedMatch.split(',');
    selectedTeams.forEach(function(value){
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        winnerSelector.appendChild(option);

        //

        
        teamVsPlayers.push(new TeamVsPlayers(value,getPlayersForTeam(value, teams)));

    });

    
    let vs = getFormattedTextForVersus(teamVsPlayers);
    matchBetween.value = vs;
    
    M.FormSelect.init(winnerSelector,{});
}

function TeamVsPlayers(team, players){
    this.team = team;
    this.players = players;
}

function resetMatchSelector(){

    matchSelector.innerHTML = '';

    let emptyOption = document.createElement('option');
    emptyOption.value="";
    emptyOption.innerHTML='Select Match';
    emptyOption.setAttribute('disabled','');
    emptyOption.setAttribute('selected','');

    matchSelector.appendChild(emptyOption);
    M.FormSelect.init(matchSelector, {});
}

function resetWinnerSelector(){

    winnerSelector.innerHTML = '';

    let emptyOption = document.createElement('option');
    emptyOption.value="";
    emptyOption.innerHTML='Select Winner';
    emptyOption.setAttribute('disabled','');
    emptyOption.setAttribute('selected','');

    winnerSelector.appendChild(emptyOption);
    M.FormSelect.init(winnerSelector, {});
}



function getTeams(e){
   // debugger;

   //table.innerHTML = '';

    clearTable();
    let chosenDate = date.value;
    let teams = getTeamsForGivenDate(chosenDate);

    if (teams.length > 0){
        teams.forEach(function(value, index){
            let row = tbodyRef.insertRow();
            for(key in value){
                let cell = row.insertCell();
                let text = document.createTextNode(value[key]);
                cell.setAttribute('id', key+index);
                cell.appendChild(text);
            }

            let abc = row.insertCell();
            let abcinput = document.createElement('input');
            let abclabel = document.createElement('label');
            let abcspan = document.createElement('span');
            abcinput.setAttribute('type','checkbox');
            abcinput.setAttribute('id', 'abccb'+index );
            //abclabel.setAttribute('for', 'cb'+index );

            abclabel.appendChild(abcinput);
            abclabel.appendChild(abcspan);
            abc.appendChild(abclabel);



            let gmd = row.insertCell();
            let gmdinput = document.createElement('input');
            let gmdlabel = document.createElement('label');
            let gmdspan = document.createElement('span');
            gmdinput.setAttribute('type','checkbox');
            gmdinput.setAttribute('id', 'gmdcb'+index );
            //abclabel.setAttribute('for', 'cb'+index );

            gmdlabel.appendChild(gmdinput);
            gmdlabel.appendChild(gmdspan);
            gmd.appendChild(gmdlabel);


            let button = row.insertCell();
            let buttonElement = document.createElement('a');
            buttonElement.onclick = function(e){callme(e)};
            buttonElement.className = 'waves-effect waves-light btn-small';
            buttonElement.innerHTML = '<i class="material-icons">calculate</i>';
            button.appendChild(buttonElement);
        });
    }else{
        console.log('no data');
    }
    
    

  
    e.preventDefault();
}

function callme(e){
    
    let cells;
    if(e.target.classList.contains('btn-small')){
        cells = e.target.parentElement.parentElement.cells;
    }
    if(e.target.classList.contains('material-icons')){
        cells = e.target.parentElement.parentElement.parentElement.cells;
    }


    let sno = cells[0].innerHTML;

    let playerName = document.getElementById('player'+sno).innerHTML;
    console.log((playerName));

    let highRankTeam = document.getElementById('highRankTeam'+sno).innerHTML;
    console.log((highRankTeam));

    
    let lowRankTeam = document.getElementById('lowRankTeam'+sno).innerHTML;
    console.log((lowRankTeam));


    let highTeamPoint = document.getElementById('highTeamPoint'+sno).innerHTML;
    console.log((highTeamPoint));

    let lowTeamPoint = document.getElementById('lowTeamPoint'+sno).innerHTML;
    console.log((lowTeamPoint));


    let abcValue = document.getElementById('abccb'+sno).checked;
    console.log((abcValue));

    let gmdValue = document.getElementById('gmdcb'+sno).checked;
    console.log((gmdValue));

    let matchSelectorInstance = M.FormSelect.getInstance(matchSelector);
    matchSelectorInstance._setSelectedStates();
    console.log(matchSelectorInstance.getSelectedValues()[0]);

    let winnerSelectorInstance = M.FormSelect.getInstance(winnerSelector);
    winnerSelectorInstance._setSelectedStates();
    let winningTeam = winnerSelectorInstance.getSelectedValues()[0]; 
    console.log(winnerSelectorInstance.getSelectedValues()[0]);


    // calculate score
    let score = calculateScore(winningTeam, highRankTeam, lowRankTeam, parseInt(highTeamPoint), parseInt(lowTeamPoint), abcValue, gmdValue)
    alert(playerName + ' scored :  ' + score);

}

function getTeamsForGivenDate(date){

    let teams = [];
    data.forEach(function(value){
        if(value.date === date){
            teams =  value.teams;
            return;
        }
    });

    return teams;
}

function _getTeamsForGivenDate(date){

    let teams = [];
    schedule.forEach(function(value){
        if(value.date === date){
            teams =  value.match;
            return;
        }
    });

    return teams;
}

function clearTable(){
    tbodyRef.innerHTML = '';
}

function calculateScore(winningTeam, highRankTeam, lowRankTeam, highPoint, lowPoint, abc, gmd){

    //debugger;
    
    let hrt = highRankTeam;
    let lrt = lowRankTeam;
    let hp = highPoint;
    let lp = lowPoint;

    if(abc){
        // swap the team
        hrt = lowRankTeam;
        lrt = highRankTeam;
    }

    if(!Negative){
        if(hrt === winningTeam ){
            if(gmd){
                return hp+10;
            }else{
                return hp;
            }
        } else{
            if(gmd){
                return -10;
            }else{
                return 0;
            }
        }
    }else{

        if(hrt === winningTeam ){
            if(gmd){
                return hp+10;
            }else{
                return hp;
            }
        } else{
            if(gmd){
                return -20;
            }else{
                return -10;
            }
        }
    }

}

function getPlayersForTeam(team, teams) {

    let players = [];

    if (teams.length > 0){
        teams.forEach(function(value){

            if(value.highRankTeam === team){
                players.push(value.player);
            }

        });
    }
    return players;
}

function getFormattedTextForVersus(teamAndPlayers){

    
    let formattedText = "";
    let count = 0;

    teamAndPlayers.forEach(function(value){

        formattedText += '[' + value.team + ']';
        formattedText += '-';
        let players = value.players;
        players.forEach(function(p){
            formattedText += p;
            formattedText += ' ';
        });
        if(count === 0){
            formattedText += 'vs ';
        }
        count ++;

    });

    return formattedText;

}
