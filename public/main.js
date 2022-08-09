const postsList = document.getElementById("card");
let output = "";

const url = "http://localhost:3000/getblog";

//get -read the post

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    display(data);
  });
function display(params) {
    // alert(id)
    let div = document.getElementById("div");
    postsList.innerHTML = "";
  
    for (let i = 0; i < params.length; i++) {
      deleteId = params[i]._id;
      updateId = params[i]._id;
      username = params[i].user;
      title = params[i].title;
      message = params[i].message;
      
      console.log(params.length);
      let div = document.createElement("div");
  
      console.log(params[i].user);
      div.innerHTML = `
      <div class="card mt-4 col-md-6 bg-light">
     <img src="..." class="card-img-top" alt="...">
     <div class="card-body">
      <h3 class="card-title">${params[i].user}</h3>
      <h5 class="card-title">${params[i].title}</h5>
       <p class="card-text">${params[i].message}</p>
     
       <a href="#" class="btn btn-primary" onClick="deleteblog('${params[i]._id}')">Delete</a>
    </div>
     </div>
    `;
    postsList.appendChild(div);
    }
}
function deleteblog(id) {
    console.log(id);
    fetch("http://localhost:3000/delete/" + id, {
      method: "DELETE",
    })
      .then((data) => data.json()) 
      .then((res) => deleteblog(res));
  }





