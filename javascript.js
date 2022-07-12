import Mustache from "./mustache.js";
window.message = []
let comments = document.querySelector("#showUsers");
if(!(window.localStorage.Information)){
    window.localStorage.setItem("Information","")

}else{
    window.message.push(...JSON.parse(window.localStorage.Information))
    show()
}
function show() {
    let MustacheData = window.message;
    console.log(window.message);
    let template = document.getElementById('Message').innerHTML;
    comments.innerHTML = "";
    for(let i=0;i<MustacheData.length;i++)
        comments.innerHTML += Mustache.render(template,MustacheData[i]);
    window.scrollBy(0,comments.scrollHeight);

}
let frm = document.getElementById("myForm")

frm.addEventListener("submit",(e) => {
        e.preventDefault()
        let name = document.getElementById("name")
        let email = document.getElementById("email")
        let gender = frm.elements["gender"]
        let url = document.getElementById("myURL")
        let loc = document.getElementById("exampleDataList")
        let text = document.getElementById("favourite brand")
        let date = Date();
        let obj = {
            name: name.value,
            email: email.value,
            gender: gender.value,
            url: url.value,
            loc: loc.value,
            text: text.value,
            date:date.toString()
        }
        console.log(obj);
        frm.reset()
        window.message.push(obj)
        window.localStorage.Information = JSON.stringify(window.message)
        show();
    }
)

document.getElementById("deleteButton").addEventListener("click",deleteOldOpinions)
function deleteOldOpinions(e) {
    e.preventDefault();
    window.message = window.message.filter((v)=>{
        return ((Date.now() - Date.parse(v.date))<= 24*60*60*1000)
    });
    window.localStorage.Information = JSON.stringify(window.message);
    show();
}