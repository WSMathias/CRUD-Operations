class JSONClient{
    //var json =new JSONClient("http://localhost:3000/items/")
    constructor(url){
        //make sure url ends with "/"
        this.url=url;        
        if(this.url.substr(-1)!="/"){
            this.url=this.url+"/"
        }
        this.data="";
        this.id=0;
        this.str="";
        this.xhr = new HttpClient(this.url);

        
    }
//json.get()
    get(){
        var jClient=this;
        return new Promise(function(resolve,reject){
        jClient.xhr.get().then(function(response){
            resolve( JSON.parse(response))
        },function (reponse){
            reject(reponse)
        }
        ).catch(function(err){
            reject(err)
        })
    });//close promise
    
    }
//json.post(data)
    post(data){
        var jClient=this;
        this.data =data;
        if(this.data.id!="undefined"){
            delete this.data.id;
        }
        this.data=JSON.stringify(this.data)
        return new Promise(function(resolve,reject){
        jClient.xhr.post(jClient.data).then(function(result){
            resolve(result)//same as data
        },function (reponse){
            reject(reponse)
        }).catch(function(err){
            reject(err)
        })
    });//close promise
}
//json.update(data)
//make sure data contains "id" if 
    update(data){
        var jClient=this;
        this.data=data;
        if (typeof this.data=="object"){
            if(typeof data.id!="undefined"){
              this.id=this.data.id;
              delete this.data.id;
            }
            this.data =JSON.stringify(this.data)
            return new Promise( function (resolve,reject){
                jClient.xhr.update(jClient.data,jClient.id).then(function(response){
                    resolve(response.responseText)
                },function (reponse){
                    reject(reponse)
                }).catch(function(err){
                    reject(err)
                })
                
            })

             }
        else{
            console.log("expecting data of type object")
        }

    }
//json.delete(data)
    delete(data){
        var jClient=this;
        this.data=data;
        if (typeof this.data=="object"){
            this.id=this.data.id;
        }
        else{
            this.id=this.data;
        }
        return new Promise(function (resolve,reject){
            jClient.xhr.delete(jClient.id).then(function(response){
                resolve(response.responseText)
            },function (reponse){
                reject(reponse)
            }).catch(function(err){
                reject(err)
            })
        })


    }
//json.search(string)
    search(str){
        var jClient=this;
        this.str=str;
        this.str=string;
        return new Promise(function (resolve,reject){
            jClient.xhr.get("?q="+jClient.str).then(function(response){
                return JSON.parse(response.responseText)
            },function (reponse){
                reject(reponse)
            }).catch(function(err){
                reject(err)
            })
        })

    }
}