const postsList = document.getElementById("card");
const addPostForm =document.querySelector('.add-post-form');
const userValue=document.getElementById('user-value');
const titleValue=document.getElementById('title-value');
const bodyValue=document.getElementById('body-value');
const btnSubmit=document.querySelector('.btn');
let output = "";



  const display =(posts)=>{
    posts.forEach(post =>{
        output +=`
        <div class="card mt-4 col-md-6 bg-light">
      <div class="card-body" data-id=${post._id}>
      <h3 class="card-user">${post.user}</h3>
      <h5 class="card-title">${post.title}</h5>
       <p class="card-text">${post.message}</p>
       <a href="#" class="btn btn-primary" id="edit-post">Edit</a>
       <a href="#" class="btn btn-primary" id="delete-post">Delete</a>
     </div>
      </div>
    `;
        
    });
    postsList.innerHTML=output;
  }

  const url = "http://localhost:3000/getblog";

//get -read the post

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    display(data);
  });

  postsList.addEventListener('click',(e)=>{
    // console.log(e.target.id)
    e.preventDefault();
    let delButtonIsPressed=e.target.id=='delete-post';
    let editButtonIsPressed=e.target.id=='edit-post';
    console.log(e.target.parentElement.dataset.id);
    let id=e.target.parentElement.dataset.id

    //Delete request
    if(delButtonIsPressed){
      //console.log('remove post');
      fetch(`${'http://localhost:3000/delete'}/${id}`,{
        method:'DELETE'
      })
      .then(res=>res.json())
      .then(()=>location.reload())
    }
    if(editButtonIsPressed){
      console.log("edit-post");
      const parent=e.target.parentElement;
      let userContent=parent.querySelector('.card-user').textContent;
      let titleContent=parent.querySelector('.card-title').textContent;
      let bodyContent=parent.querySelector('.card-text').textContent;
      console.log(titleContent,bodyContent);
      userValue.value=userContent;
      titleValue.value=titleContent;
      bodyValue.value=bodyContent
    }

    //update-update the existing post
    //method:fetch
    btnSubmit.addEventListener('click',()=>{
      e.preventDefault();
      //console.log('post updated');
      fetch(`${'http://localhost:3000/editblog'}/${id}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          user: userValue.value,
          title:titleValue.value,
          body:bodyValue.value
        })
      })
      .then(res=>res.json())
      .then(()=>location.reload)
    })

  });

  //create insert new post
  //method:post
  addPostForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //console.log(userValue.value);
    fetch('http://localhost:3000/blog',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            user:userValue.value,
            title:titleValue.value,
            message:bodyValue.value

        })
        
    })
    .then(res=>res.json())
    .then((body)=>{
        const dataArr=[];
        dataArr.push(body);
        console.log(dataArr);
        display(dataArr);
    })
    //reset input field to empty
    userValue.value='';
    titleValue.value='';
    bodyValue.value='';

})





