let submit = document.getElementById("submit");
let subject = document.getElementById("subject");
let question = document.getElementById("question");
let inner2 = document.getElementsByClassName('div1')[0];
let mainDiv = document.getElementsByClassName('maindiv');
let qbutton = document.getElementById('newq');
let responsediv = document.getElementById('responsediv');
let submitR = document.getElementById("submitR");
let v = document.getElementById('v');
let nameR = document.querySelector('#nameR');
let commentR = document.querySelector('#commentR');
let dabba = document.querySelector('.dabba');
let resolve = document.getElementById('resolve');
let listR = document.getElementById('listR');
let ansR = document.getElementsByClassName('ansR')[0];
let count=0;
let index = null;
let likeButton, dislikeButton;

if(localStorage.getItem('id'))
{
    count =   JSON.parse(localStorage.getItem('count'));
}
else{
    localStorage.setItem('count',0);
}
let arr = getItemLocal()||[];

function addItemLocal(obj)
{
    localStorage.setItem("data" , JSON.stringify(obj));
}

function getItemLocal()
{
    return JSON.parse(localStorage.getItem("data")) || [];
}

function show()
{
    inner2.style.display = "block";
    responsediv.style.display = "none";
}
qbutton.addEventListener("click",show);

function all()
 {
    if(subject.value.trim() == "" || question.value.trim() == "")
    {
        alert('Entries Required');
    }

    else
    {
      
        let obj={
            id : count ,
            subject:subject.value,
            question:question.value,
            response : []
        }
        createItem(obj,count);
        
        count++;
        localStorage.setItem('id',JSON.stringify(count));
       

        arr.push(obj);
        addItemLocal(arr);
        subject.value = "";
        question.value = "";
    }
    
 }

 //createItem jo naya div banyega

 function createItem(element,count)
 {
    let dd = document.createElement('div');
            dd.classList.add('firstdiv');
            dd.setAttribute("id",count)
            dd.style.marginTop = "20px";
        
            dabba.appendChild(dd);  
            
        let head = document.createElement('h2');
            head.setAttribute('id','heading');
            head.innerHTML = element.subject;
            
             dd.appendChild(head);
            
            let para = document.createElement('para1');
            para.setAttribute('id','para1');
             para.innerHTML = element.question;
            
             dd.appendChild(para);

  
            
            //  dd.addEventListener("click",()=>response(obj));
 }
 submit.addEventListener("click", all);

 

        let uniqueId = null;

        dabba.addEventListener("click" , function(e)
    {
        const targetDiv = e.target.closest('.firstdiv');
        
        if(e.target.parentNode.tagName=="DIV" && e.target.parentNode.classList.contains("firstdiv"))
            {
                            inner2.style.display = "none";
                             responsediv.style.display = "block";

                             uniqueId = e.target.parentNode.id;
                                console.log(uniqueId)
                             let sub = e.target.parentNode.childNodes[0].innerText;
                             let que = e.target.parentNode.childNodes[1].innerText;
                 
                             let qhead = document.getElementById('qhead');
                             let qpara = document.getElementById('qpara');
                 
                             qhead.innerText = sub;
                             qpara.innerText = que;
                            let localArray = getItemLocal() || [];
                             let   selectedQuestion = localArray.find(element => element.id == uniqueId);
                              console.log(selectedQuestion.response.length)
                            if(selectedQuestion.response.length > 0)
                            {
                                listR.innerHTML = ""

                                hide.style.display = "block";
                                // ansR.style.display = "block";
                                // v.appendChild(ansR);
                                // v.style.visibility  = "visible"
                                console.log("hii");

                                selectedQuestion.response.forEach(item => {
                                    let itemR = document.createElement('li');
                                    itemR.setAttribute("id","itemR");

                                    let ansRH = document.createElement('h3');
                                    let ansRP = document.createElement('p');

                                    ansRH.setAttribute("id","ansRH");
                                    ansRP.setAttribute("id","ansRP");

                                    ansRH.innerText = item.name;
                                    ansRP.innerText = item.comment;

                                    itemR.appendChild(ansRH);
                                    itemR.appendChild(ansRP);
                                    
                                    listR.appendChild(itemR)
                                    ansR.style.display = "block";
                                // v.appendChild(ansR);
                                v.style.visibility  = "visible";

                                let likeButton = document.createElement('button');
                                let dislikeButton = document.createElement('button');
        
                                likeButton.innerText = `👍(0)`;
                                dislikeButton.innerText = `👎(0)`;
        
                                // likeButton.id = `like_${obj1.id}`;
                                // dislikeButton.id = `dislike_${obj1.id}`;
        
                                itemR.appendChild(likeButton);
                                itemR.appendChild(dislikeButton);
        
                                likeButton.style.backgroundColor = "#008080";
                                likeButton.style.border = "none";
                                likeButton.style.fontSize = "20px";
        
                                dislikeButton.style.backgroundColor = "#008080";
                                dislikeButton.style.border = "none";
                                dislikeButton.style.fontSize = "20px";
        
                                likeButton.addEventListener("click", function() {
                                    let currentLikes = parseInt(likeButton.innerText.match(/\d+/)[0]);
                                    likeButton.innerText = `👍(${currentLikes + 1})`;
                                    updateResponseCount(obj1.id, 'likes', currentLikes + 1);
                                });
        
                                dislikeButton.addEventListener("click", function() {
                                    let currentDislikes = parseInt(dislikeButton.innerText.match(/\d+/)[0]);
                                    dislikeButton.innerText = `👎(${currentDislikes + 1})`;
                                    updateResponseCount(obj1.id, 'dislikes', currentdislikes + 1);
                                });
                                });
                            }
                            else {
                                hide.style.display = "none";
                                ansR.style.display = "none";
                                v.style.visibility = "hidden"
                                 listR.innerHTML = ""
                                
                            }
            }
    });

         submitR.addEventListener("click",resAdd);

         function resAdd()
                     {
                        let obj1={
                            id : 1 ,
                            name:nameR.value,
                            comment:commentR.value,
                           like : 0,
                           dislike : 0,
                        }

                        arr.forEach(element => 
                            {
                            console.log(element.id);
                            console.log(uniqueId);
                            if(element.id == uniqueId)
                               {
                                console.log("sdf");
                                element.response.push(obj1);
                                }
                        });

                        localStorage.setItem("data",JSON.stringify(arr));

                         hide.style.display = "block";
                        //   v.style.visibility = "visible";
         
                        //  let rdiv = document.createElement('div');
                        //  rdiv.setAttribute("id","rdiv");
                        //  v.append(rdiv); 
                        
                        let itemR = document.createElement('li');
                                   itemR.setAttribute("id","itemR");
                         let Rhead = document.createElement('h2');
                         Rhead.setAttribute("id","Rhead");
                         Rhead.innerHTML = `${nameR.value}`;

                        //  rdiv.appendChild(Rhead);
         
                         let Rpara = document.createElement('p');
                         Rpara.setAttribute("id","Rpara");
                         Rpara.innerHTML = `${commentR.value}`;
                        itemR.append(Rhead, Rpara)
                        //  rdiv.appendChild(Rpara);
                        listR.append(itemR)
                        ansR.style.display = "block";
                        // v.appendChild(ansR);
                        v.style.visibility  = "visible";
                         likeButton = document.createElement('button');
                         dislikeButton = document.createElement('button');

                        likeButton.innerText = `👍(0)`;
                        dislikeButton.innerText = `👎(0)`;

                        likeButton.id = `like_${obj1.id}`;
                        dislikeButton.id = `dislike_${obj1.id}`;

                        itemR.appendChild(likeButton);
                        itemR.appendChild(dislikeButton);

                        likeButton.style.backgroundColor = "#008080";
                        likeButton.style.border = "none";
                        dislikeButton.style.fontSize = "20px";

                        dislikeButton.style.backgroundColor = "#008080";
                        dislikeButton.style.border = "none";
                        dislikeButton.style.fontSize = "20px";

                        nameR.value = "";
                        commentR.value = "";

                        likeButton.addEventListener("click", function() {
                            let currentLikes = parseInt(likeButton.innerText.match(/\d+/)[0]);
                            likeButton.innerText = `👍(${currentLikes + 1})`;
                            updateResponseCount(obj1.id, 'likes', currentLikes + 1);
                        });

                        dislikeButton.addEventListener("click", function() {
                            let currentDislikes = parseInt(dislikeButton.innerText.match(/\d+/)[0]);
                            dislikeButton.innerText = `👎(${currentDislikes + 1})`;
                            updateResponseCount(obj1.id, 'dislikes', currentdislikes + 1);
                        });
                     }

                     function addResponseToLocalstorage(response, id) {
                        let data = getItemLocal();
                        data.forEach(element => {
                            if(element.id == id) {
                                element.response.push(response);
                            }
                        });
                        addItemLocal(data);
                       
                    }

            window.onload = function()
            {
                let array = getItemLocal();

                array.forEach(element => {
                    createItem(element,element.id);
                });
            }
let heading2 = document.getElementById('hide');

resolve.addEventListener("click",() => {
    let localArray = getItemLocal() || [];
    console.log("sdfsd")
    if(index > -1)
    {
        localArray.splice(index,1);
        addItemLocal(localArray);
        document.getElementById(uniqueId).remove();
    }
    responsediv.style.display = "none";
    inner2.style.display = "block";
    subject.value = "";
    question.value = "";
});