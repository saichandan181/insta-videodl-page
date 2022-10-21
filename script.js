const search=document.getElementById("search")
const input=document.getElementById("inputbox")
const invalid=document.getElementById('cover')
const download =document.getElementById('download')
const load=document.getElementById('load')

const SERVER="https://instadloader.herokuapp.com/"
search.addEventListener("click",(e)=>{
    download.style.display='none'
    document.getElementById('thumbnailholder').innerHTML=""
    if(input.value=="")
        return
    load.style.display='flex'
    var url=input.value
    fetch(SERVER,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            link:url
        })
    })
    .then(res=>res.json())
    .then(res=>{
        load.style.display='none'
        if(res.isSuccess){
            var thumbnail=null
            if(res.data.type==='mp4'){
               thumbnail=document.createElement('video')
                thumbnail.src=res.data.url
                thumbnail.controls=true
            }
            else{
               thumbnail=new Image()
               thumbnail.onerror=()=>setTimeout(()=>{thumbnail.src=SERVER+res.id+'.'+res.data.type},2000)
               thumbnail.onerror()
            }
            thumbnail.style.width='400px'
            thumbnail.style.height='400px'
            document.getElementById('thumbnailholder').appendChild(thumbnail)
            input.value=""
            download.style.display="flex"
            download.setAttribute('href',res.data.url)
            download.click()
        }
        else{
            try{
                document.documentElement.scrollTop=0;
                document.body.scrollTop=0
            }
            catch(err){}
            document.body.style.overflow="hidden"
            invalid.style.display="flex"
        }
    })

   
})
document.getElementById("clear").addEventListener("click",e=>input.value="")
document.getElementById("paste").addEventListener("click",(e)=>navigator.clipboard.readText().then(val=>input.value=val))
document.getElementById('closebutton').addEventListener("click",()=>{invalid.style.display="none";document.body.style.overflow="auto"})




