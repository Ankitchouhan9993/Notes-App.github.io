const addBtn=document.querySelector('.add-note');
const main=document.querySelector('main');
let EleId=0;
let totalNotes={};
window.onload=()=>{
    if(JSON.parse(localStorage.getItem('notes'))){
    totalNotes=JSON.parse(localStorage.getItem("notes"));
    }
    for(value in totalNotes){
        if(totalNotes[value].localeCompare("")!=1 ){
            EleId++;
        }else{
            const newNote=document.createElement('div');
            newNote.classList.add('noteEl');
            newNote.setAttribute("id",value);
            newNote.innerHTML=`<div class="header"> 
            <i class="material-icons"  onclick="editMe(this.parentElement.parentElement)">edit</i>
            <i class="material-icons" onclick="deleteMe(this.parentElement.parentElement)">delete</i>
            </div>
            <div class="text">
            <textarea  oninput="updateme(this.parentElement.parentElement)">${totalNotes[value]}</textarea>
            <pre class="showContent">${totalNotes[value]}</pre>
            </div>
            `;
            main.appendChild(newNote);
            EleId+=1;
        }
        
    }
}

addBtn.addEventListener('click',()=>{
    const newNote=document.createElement('div');
    newNote.classList.add('noteEl');
    newNote.setAttribute("id",`note${EleId}`);
    newNote.innerHTML=`<div class="header"> 
    <i class="material-icons" onclick="editMe(this.parentElement.parentElement)">edit</i>
    <i class="material-icons" onclick="deleteMe(this.parentElement.parentElement)">delete</i>
    </div>
    <div class="text">
    <textarea oninput="updateme(this.parentElement.parentElement)"></textarea>
    <pre class="showContent"></pre>
    </div>
    `;
    main.appendChild(newNote);
    totalNotes[newNote.id]="";
    EleId+=1;
});
function deleteMe(note){
    if(confirm("are you sure to delete it")){
    delete totalNotes[note.id];
    main.removeChild(note);
    updateLs();
    }
}
function editMe(note){  
note.querySelector('.showContent').classList.toggle('dis');

}
function updateme(note){
console.log(note.querySelector('textarea').value)
const text=note.querySelector('textarea').value;
note.querySelector('.showContent').textContent=text;
totalNotes[note.id]=text;
updateLs();
}
function updateLs(){
    let count=0;
    for(const value in totalNotes){
        if(totalNotes[value]==""){
            delete totalNotes[value];
        }
    }
    for(const value in totalNotes){
        const str=totalNotes[value];
        delete totalNotes[value];
        totalNotes[`note${count}`]=str;
        count++;
    }
    window.localStorage.setItem('notes',JSON.stringify(totalNotes));
}