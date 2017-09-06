
class HttpClient{
    constructor(url){
        //make sure url ends with "/"
        this.url=url;        
        if(this.url.substr(-1)!="/"){
            this.url=this.url+"/"
        }
        this.qry=""
        this.data="";
        this.xhr = new XMLHttpRequest();
        this.xhr.withCredentials = true;
    }
//xhr.get("?q="query")
get(qry=""){
    var client=this;
    return new Promise(function(resolve,reject){
    client.xhr.open("GET", client.url+qry);
    client.xhr.setRequestHeader("content-type", "application/json");      
    client.xhr.setRequestHeader("cache-control", "no-cache");
    client.xhr.onload = () =>{
        if (client.xhr.status==200){
            console.log(client.xhr.statusText)
            resolve(client.xhr.response);
        }
        else
            reject(client.xhr.statusText)
    } 
    client.xhr.onerror = () => reject("Network Error")
    client.xhr.send("");
    });

}
//xhr.post(data,qry)
post(data,qry=""){
    this.qry=qry;
    this.data=data;
    var client=this; 
    console.log(this.data);  

    //this.data = JSON.parse(this.data);


    return new Promise(function(resolve,reject){
    client.xhr.open("POST", client.url+client.qry);
    client.xhr.setRequestHeader("content-type", "application/json");
    client.xhr.setRequestHeader("cache-control", "no-cache");
    client.xhr.onload = () =>{
        console.log(client.xhr.statusText)        
        if (client.xhr.status==201){
            resolve(client.xhr.responseText);
            console.log(client.xhr.responseText);
        }
        else{
            reject(client.xhr.statusText);
        }
    } 
    client.xhr.onerror = () => reject("Network Error")
    console.log(client.data); 
    client.xhr.send(client.data);                
    });
    

}
//xhr.update(data,id)
update(data,id=""){
    return new Promise(function(resolve,reject){
    client.xhr.open("PUT", this.url+id);
    client.xhr.setRequestHeader("content-type", "application/json");
    client.xhr.setRequestHeader("cache-control", "no-cache");
    client.xhr.onload = () =>{
        if (client.xhr.status==200)
            resolve(client.xhr.response);
        else
            reject(client.xhr.statusText)
    } 
    client.xhr.onerror = () => reject("Network Error")
    client.xhr.send(data); 
    }); 

}
//xhr.delete(id)
delete(id){
    return new Promise(function(resolve,reject){
    client.xhr.open("DELETE", this.url+id);
    client.xhr.setRequestHeader("cache-control", "no-cache");
    client.xhr.onload = () =>{
        if (client.xhr.status==200)
            resolve(client.xhr.response);
        else
            reject(client.xhr.statusText)
    } 
    client.xhr.onerror = () => reject("Network Error")
    client.xhr.send("");
    });
}    
}