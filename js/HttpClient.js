
class HttpClient{
    constructor(url){
        //make sure url ends with "/"
        this.url=url;        
        if(this.url.substr(-1)!="/"){
            this.url=this.url+"/"
        }
        this.id=""
        this.qry=""
        this.data=""
    }
//xhr.get("?q="query")
get(qry=""){
    var client=this;
    return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", client.url+qry);
    xhr.setRequestHeader("content-type", "application/json");      
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.onload = () =>{
        if (xhr.status==200){
            console.log(xhr.statusText)
            resolve(xhr.response);
        }
        else
            reject(xhr.statusText)
    } 
    xhr.onerror = () => reject("Network Error")
    xhr.send("");
    });

}
//xhr.post(data,qry)
post(data,qry=""){
    this.qry=qry;
    this.data=data;
    var client=this; 
    // console.log(this.data);
    return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", client.url+client.qry);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.onload = () =>{     
        if (xhr.status==201){
            //console.log(xhr.responseText);//same as data
            resolve(xhr.responseText);
            
        }
        else{
            reject(xhr.responseText);
        }
    } 
    xhr.onerror = () =>{
        reject("Network Error")
    }
    // console.log(client.data); 
    xhr.send(client.data);                
    });
    

}
//xhr.update(data,id)
update(data,id=""){
    var client=this;
    this.data=data;
    this.id=id;
    return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("PUT", client.url+client.id);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.onload = () =>{
        if (xhr.status==200)
            resolve(xhr.response);
        else{
            reject(xhr.responseText)
        }
    } 
    xhr.onerror = () => reject("Network Error")
    xhr.send(client.data); 
    }); 

}
//xhr.delete(id)
delete(id){
    var client=this;
    this.id=id;
    return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("DELETE", client.url+client.id);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.onload = () =>{
        console.log(xhr.responseText);
        if (xhr.status==200)
            resolve(xhr.response);
        else{
            reject(xhr.responseText)
        }
    } 
    xhr.onerror = () => reject("Network Error")
    xhr.send("");
    });
}    
}