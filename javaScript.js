//====================Declarations====================
var btnNext=document.getElementById("secondPage");
var page1=document.getElementById("pageCover");
var page2=document.getElementById("inputPage");
var page3=document.getElementById("mainPage");
var submit=document.getElementById("submitInfo");
var plname,symbol;
//-------------Page1-------------
var inpfname=document.getElementById("fname");
var inpfsymbol=document.getElementById("fsymbol");
var inpsname=document.getElementById("sname");
var inpssymbol=document.getElementById("ssymbol"); 
//-------------Page2-------------
var plShower=document.getElementById("nameShower");
var mainBlocks=document.getElementsByClassName("MBlock");
var tables=document.getElementsByClassName("STable");
var subBlocks=document.getElementsByClassName("SBlock");
var accBlocks=document.getElementsByClassName("tempBlock");
var ownedBlocks=document.getElementsByClassName("ownedBlock");
//-------------Page3-------------
var page4=document.getElementById("endGame");
//-------------Page4-------------
//====================Initializations====================
for(let i=0;i<81;i++){
    subBlocks[i].ariaColIndex=i%9;
    ownedBlocks[Math.floor(i/9)].style.zIndex=-10;
}
//====================Introducing Functions====================
btnNext.onclick=()=>{
    page1.style.zIndex=-1;
    page1.style.display="none";
    page2.style.display="flex";
    page2.style.zIndex=1;
}
function inputChecker(){
    if(inpfname.value==inpsname.value||inpfsymbol.value==inpssymbol.value){
        submit.style.visibility="hidden";
        if(inpfsymbol.value==inpssymbol.value){
            alert("The symbols must be different");
        }
        else if(inpfname.value==inpsname.value){
            alert("Two players must have to different name");
        }
    }
    else{
        submit.style.visibility="visible";
    }
}
inpfname.oninput=()=>{
    inputChecker();
}
inpsname.oninput=()=>{
    inputChecker();
}
inpfsymbol.onchange=()=>{
    inputChecker();
}
inpssymbol.onchange=()=>{
    inputChecker();
}
submit.onclick=()=>{
    myFunc();
}
function myFunc(){
    event.preventDefault();
    console.log("Inputs taken successs");
    plname=[inpfname.value,inpsname.value];
    symbol=[inpfsymbol.value,inpssymbol.value];
    page2.style.zIndex=-10;
    page2.style.display="none";
    page3.style.display="flex";
    page3.style.zIndex=10;
    plShower.textContent="It's "+plname[0]+"'s turn";
}
//====================Main Code for Game====================
var  mIndex=0,sIndex=0,presIndex=0,premIndex=0,moveCount=0,move=0,sBlkCount=[0,0,0,0,0,0,0,0,0],mBlkCount=0;
var Boolean, allAcc=true;
for(let i=0;i<81;i++){
    subBlocks[i].onclick=()=>{
        if(accBlocks[Math.floor(i/9)].ariaRowIndex==1 && subBlocks[i].textContent==""){
            sIndex=Number(subBlocks[i].ariaColIndex);
            mIndex=Number(mainBlocks[Math.floor(i/9)].ariaColIndex);
            if(ownedBlocks[sIndex].style.zIndex!=-10){
                allEnable(1);
                allAcc=true;
            } else {
                if(allAcc){
                    allAcc=false;
                    allEnable(0);
                    
                } else {
                    accBlocks[presIndex].ariaRowIndex=0;
                    accBlocks[presIndex].classList.remove("access");
                }
                accBlocks[sIndex].ariaRowIndex=1;
                accBlocks[sIndex].classList.add("access");
            }
            subBlocks[9*mIndex+sIndex].textContent=symbol[move%2];
            sBlkCount[mIndex]++;
            subChecker(mIndex);
            if(ownedBlocks[sIndex].style.zIndex==-10){
                accBlocks[sIndex].ariaRowIndex=1;
                accBlocks[sIndex].classList.add("access")
                premIndex=mIndex;
                presIndex=sIndex;
            }
            move++;
            plShower.textContent="It's "+plname[move%2]+"'s turn";
        }
    }
}
function allEnable(a){
    if(a==1){
        for(let i=0;i<9;i++){
            if(accBlocks[i].ariaRowIndex==0 && ownedBlocks[i].style.zIndex==-10){
                accBlocks[i].ariaRowIndex=1;
                accBlocks[i].classList.add("access");
            }
        }
    }else if(a==0){
        for(let i=0;i<9;i++){
            if(accBlocks[i].ariaRowIndex==1 && ownedBlocks[i].style.zIndex==-10 || ownedBlocks[i].style.zIndex==10){
                if(ownedBlocks[i].style.zIndex==10){
                    tables[i].style.visibility="hidden";
                }
                accBlocks[i].ariaRowIndex=0;
                accBlocks[i].classList.remove("access");
            }
        }
    }
}
function subChecker(BIndex){
    if(sBlkCount[BIndex]<=9){
        if(subBlocks[9*BIndex+0].textContent==subBlocks[9*BIndex+1].textContent && subBlocks[9*BIndex+1].textContent==subBlocks[9*BIndex+2].textContent && subBlocks[9*BIndex+0].textContent!=""){
            bigBlockProvider(BIndex);
        } else if(subBlocks[9*BIndex+3].textContent==subBlocks[9*BIndex+4].textContent && subBlocks[9*BIndex+4].textContent==subBlocks[9*BIndex+5].textContent && subBlocks[9*BIndex+3].textContent!=""){
            bigBlockProvider(BIndex);
        } else if(subBlocks[9*BIndex+6].textContent==subBlocks[9*BIndex+7].textContent && subBlocks[9*BIndex+7].textContent==subBlocks[9*BIndex+8].textContent && subBlocks[9*BIndex+6].textContent!=""){
            bigBlockProvider(BIndex);
        } else if(subBlocks[9*BIndex+0].textContent==subBlocks[9*BIndex+3].textContent && subBlocks[9*BIndex+3].textContent==subBlocks[9*BIndex+6].textContent && subBlocks[9*BIndex+0].textContent!=""){
            bigBlockProvider(BIndex);
        } else if(subBlocks[9*BIndex+1].textContent==subBlocks[9*BIndex+4].textContent && subBlocks[9*BIndex+4].textContent==subBlocks[9*BIndex+7].textContent && subBlocks[9*BIndex+1].textContent!=""){
            bigBlockProvider(BIndex);
        } else if(subBlocks[9*BIndex+2].textContent==subBlocks[9*BIndex+5].textContent && subBlocks[9*BIndex+5].textContent==subBlocks[9*BIndex+8].textContent && subBlocks[9*BIndex+2].textContent!=""){
            bigBlockProvider(BIndex);
        } else if(subBlocks[9*BIndex+0].textContent==subBlocks[9*BIndex+4].textContent && subBlocks[9*BIndex+4].textContent==subBlocks[9*BIndex+8].textContent && subBlocks[9*BIndex+0].textContent!=""){
            bigBlockProvider(BIndex);
        } else if(subBlocks[9*BIndex+2].textContent==subBlocks[9*BIndex+4].textContent && subBlocks[9*BIndex+4].textContent==subBlocks[9*BIndex+6].textContent && subBlocks[9*BIndex+2].textContent!=""){
            bigBlockProvider(BIndex);
        }else if(sBlkCount[BIndex]==9){
            bigBlockProvider(BIndex);
        }
    } 
    
}
function bigBlockProvider(BIndex){
    mBlkCount++;
    if(sBlkCount[BIndex]==9){
        ownedBlocks[BIndex].textContent="-";
        alert("There is a draw in block no: "+Number(BIndex+1));
    } else {
        ownedBlocks[BIndex].textContent=symbol[move%2];
        alert(plname[move%2] + " owned block no: "+Number(BIndex+1));
    }
    ownedBlocks[BIndex].style.zIndex=10;
    tables[BIndex].style.visibility="hidden";
    accBlocks[BIndex].classList.remove("access");
    if(sIndex==mIndex){
        allEnable(1);
        allAcc=true;
    }
    mainChecker();
}
function mainChecker(){
    if(mBlkCount<=9){
        if(ownedBlocks[0].textContent==ownedBlocks[1].textContent && ownedBlocks[1].textContent==ownedBlocks[2].textContent && ownedBlocks[0].textContent!="" && ownedBlocks[0].textContent!="-"){
            winner();
        } else if(ownedBlocks[3].textContent==ownedBlocks[4].textContent && ownedBlocks[4].textContent==ownedBlocks[5].textContent && ownedBlocks[3].textContent!="" && ownedBlocks[3].textContent!="-"){
            winner();
        } else if(ownedBlocks[6].textContent==ownedBlocks[7].textContent && ownedBlocks[7].textContent==ownedBlocks[8].textContent && ownedBlocks[6].textContent!="" && ownedBlocks[6].textContent!="-"){
            winner();
        } else if(ownedBlocks[0].textContent==ownedBlocks[3].textContent && ownedBlocks[3].textContent==ownedBlocks[6].textContent && ownedBlocks[0].textContent!="" && ownedBlocks[0].textContent!="-"){
            winner();
        } else if(ownedBlocks[1].textContent==ownedBlocks[4].textContent && ownedBlocks[4].textContent==ownedBlocks[7].textContent && ownedBlocks[1].textContent!="" && ownedBlocks[1].textContent!="-"){
            winner();
        } else if(ownedBlocks[2].textContent==ownedBlocks[5].textContent && ownedBlocks[5].textContent==ownedBlocks[8].textContent && ownedBlocks[2].textContent!="" && ownedBlocks[2].textContent!="-"){
            winner();
        } else if(ownedBlocks[0].textContent==ownedBlocks[4].textContent && ownedBlocks[4].textContent==ownedBlocks[8].textContent && ownedBlocks[0].textContent!="" && ownedBlocks[0].textContent!="-"){
            winner();
        } else if(ownedBlocks[2].textContent==ownedBlocks[4].textContent && ownedBlocks[4].textContent==ownedBlocks[6].textContent && ownedBlocks[2].textContent!="" && ownedBlocks[2].textContent!="-"){
            winner();
        }else if(mBlkCount==9){
            setTimeout(()=>{winner();},2000);
        }
    } 
}
function winner(){
    if(mIndex==sIndex)
        accBlocks[sIndex].classList.remove("access");
    let temp1=document.getElementById("statement");
    if(mBlkCount<9){
        temp1.outerText= plname[move%2]+" won the match!!!";
    } else {
        temp1.outerText= "Draw match";
        let temp2=document.getElementsByTagName("i");
        temp2[0].style.display="none";
        temp2[1].style.display="none";
    }
    page3.style.zIndex=-10;
    page3.style.display="none";
    page4.style.display="flex";
    page4.style.zIndex=10;
}