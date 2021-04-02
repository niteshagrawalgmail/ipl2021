document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {format : 'dd-mm-yyyy'});
  });

const date = document.querySelector('#date');
const teamBtn = document.querySelector('#teamBtn');
const table = document.querySelector('#teamTable');
const tbodyRef = table.getElementsByTagName('tbody')[0];

loadEventListeners();

function loadEventListeners(){

    teamBtn.addEventListener('click', getTeams);

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

    debugger;

    let sno = cells[0].innerHTML;
    
    let cellLength = cells.length -3;
    for(let i=1; i < cellLength; i++ ){
        console.log(cells[i].innerHTML);
    }

    let abcValue = document.getElementById('abccb'+sno).checked;
    console.log((abcValue));

    let gmdValue = document.getElementById('gmdcb'+sno).checked;
    console.log((gmdValue));
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

function clearTable(){
    tbodyRef.innerHTML = '';
}

// //Define UI vars

// const form = document.querySelector('#task-form');
// const taskList = document.querySelector('.collection');
// const clearButton = document.querySelector('.clear-tasks');
// const filter = document.querySelector('#filter');
// const taskInput = document.querySelector('#task');

// //Load all event listeners
// loadEventListeners();

// function loadEventListeners(){
//     //Add task event
//     form.addEventListener('submit', addTask);
//     //Remove task event
//     taskList.addEventListener('click', removeTask);
//     //clear task event
//     clearButton.addEventListener('click', clearTasks);
//     //filter task event
//     filter.addEventListener('keyup', filterTasks);
// }

// function addTask(e){
    
//     if(taskInput.value === ''){
//         alert('Add a task');
//     }

//     // create a li element
//     const li = document.createElement('li');
//     //add class
//     li.className = 'collection-item';
//     //create a textNode and append to li
//     li.appendChild(document.createTextNode(taskInput.value));
//     //create a new link
//     const link = document.createElement('a');
//     //Add Class
//     link.className = 'delete-item secondary-content';
//     //add icon
//     link.innerHTML = '<i class="tiny material-icons">delete</i>';
//     //append link to li
//     li.appendChild(link);

//     //Appen li to ul
//     taskList.appendChild(li);

//     //clear input
//     taskInput.value = '';

//     e.preventDefault();
// }

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.fixed-action-btn');
//     var instances = M.FloatingActionButton.init(elems, {
//         direction : 'up'
//     });
//   });


// function removeTask(e){

//     if(e.target.parentElement.classList.contains('delete-item')){
//         if(confirm('Are you sure')){
//             e.target.parentElement.parentElement.remove();
//         }
//     }
// }

// function clearTasks(e){
//     while(taskList.firstChild){
//         taskList.removeChild(taskList.firstChild)
//     }
// }

// function filterTasks(e){

//     const text = e.target.value.toLowerCase();

//     document.querySelectorAll('.collection-item').forEach(function(task){
//         const item = task.firstChild.textContent;
//         if(item.toLowerCase().indexOf(text) != -1){
//             task.style.display = 'block';
//         }else{
//             task.style.display = 'none';
//         }
//     });

// }
