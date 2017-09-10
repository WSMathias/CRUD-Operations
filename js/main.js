var list =[];
var inId=-1;
var inName="";
var inPrice=0;
var inDes="";
var ADD=false;
var id =0;
var url="http://localhost:3000/items/";
var jsonXhr = new JSONClient(url);

$( document ).ready(function() {
    loadItems();
});

function showFull(id){
     loadFull(id)
     document.getElementById("full-window").style.display = "block";
     document.getElementById("fulldes").style.display= "block";
}

function done(){
    if(!validateInput()){

        alert("fiels can not be empty")
    }

    else{
        if (ADD){
            addData();
        }
        else{
            id =parseInt(document.getElementById("in_id").value);
            editData();
        }
        closeFull();
    }
}

function closeFull(){
    clear();
    document.getElementById("fulldes").style.display= "none";
    document.getElementById("editform").style.display ="none";
    document.getElementById("full-window").style.display = "none";
}

function addbtn(){
    editItem(-1);
}

function addData(){
    var newItem={name:inName,price:inPrice,description:inDes};
    jsonXhr.post(newItem).then(function (result){
        //console.log(result)//same as new item in text
        console.log("addData")
        loadItems()});
  
}
function editData(){
    var newItem={id:inId,name:inName,price:inPrice,description:inDes};


    jsonXhr.update(newItem).then(function(resulte){
        loadItems();
        },function (e) {
        // handle errors
        }).catch(function (err){
            alert(err);
        });

}

function deleteItem(id){
    
    closeFull()
    jsonXhr.delete(id).then(function(e){
        loadItems();
    },function (e) {
        // handle errors
    }).catch(function (err){
        alert(err);
    });

}
function editItem(id=-1){
    
    showEdit();
    ADD=true;
    if(id>-1){
        loadform(id);
        ADD=false;
    }

}

function validateInput(){
    inId=document.getElementById("in_id").value;
    inName=document.getElementById("in_name").value;
    inPrice=parseInt(document.getElementById("in_price").value);
    inDes=document.getElementById("in_des").value;
    if(inName==""||inPrice==""||inPrice==NaN||inDes==""){
        return false;
    }
    
    return true;
}
function clear(){
    document.getElementById("in_name").value="";
    document.getElementById("in_price").value="";
    document.getElementById("in_des").value="";
}

function showEdit(){
    document.getElementById("fulldes").style.display= "none";
    document.getElementById("full-window").style.display = "block";
    document.getElementById("editform").style.display ="block";    
}

function loadform(id){
    var ld=(list.filter(x => x.id === id))[0];
    document.getElementById("in_id").value=ld.id;
    document.getElementById("in_name").value=ld.name;
    document.getElementById("in_price").value=ld.price;
    document.getElementById("in_des").value=ld.description;
}

function loadFull(id){
    var ld=(list.filter(x => x.id === id))[0];
    var mytool=document.getElementById("tools-full").innerHTML=
    `<a href="#" class="btn btn-warning btn-lg" onclick="editItem(`+id+`)"><span class="glyphicon glyphicon-pencil"></span> </a>
    <a href="#" class="btn btn-danger btn-lg" onclick="deleteItem(`+id+`)"><span class="glyphicon glyphicon-trash"></span> </a>`
    
    document.getElementById("pop-name").textContent=ld.name;
    document.getElementById("pop-price").textContent=ld.price;
    document.getElementById("pop-des").textContent=ld.description;
}

function loadItems(){
    var mybody=document.getElementById("item_list");
    var myNav=document.getElementById("nav-north");
    mybody.innerHTML="";
    myNav.innerHTML="";
    jsonXhr.get().then(function(response){
        list=response;
        for (i in list){
        mybody.innerHTML+=`<div class="col-sm-3  col-xs-6 ibox"  >
        <img src="images/birds.jpg" onclick="showFull(`+list[i].id+`)" class="img-responsive margin"  alt="Image">
        <div class="ibox-text">
        <h3>`+list[i].name+`</h3><h4>`+list[i].price+`</h4>
        <p>`+list[i].description+`</p>
        </div>
        <div class="tools">
            <a href="#" class="btn btn-warning btn-sm" onclick="editItem(`+list[i].id+`)"><span class="glyphicon glyphicon-pencil"></span> </a>
            <a href="#" class="btn btn-danger btn-sm" onclick="deleteItem(`+list[i].id+`)"><span class="glyphicon glyphicon-trash"></span> </a>
        </div>
        </div>`
        myNav.innerHTML+=`<li><a href="#">`+list[i].name+`</a></li>`
       }}).catch(function (err){
           alert(err);
       })

}
