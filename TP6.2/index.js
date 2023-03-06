let list_data = document.getElementById("list_data"); 
const londing = document.getElementById("loading");
let dataLoading =false;
let number_page =1;
let page=0;
let size=10;
let check=1;
let array_data = new Array(900);
function display()
{
    londing.hidden=true; 
    let tmp="";
    const str = localStorage.getItem('data');
    const parseddata = JSON.parse(str);
    if(str!== null && check ==1){
        for(let i=0 ; i<parseddata.data.length;i++){
           console.log(parseddata.data[i])
            tmp +=
            `
                <div class="box_list"> 
                    <p>${i}</p>
                    <p>✈️ : ${parseddata.data[i].airline[0].name} - ${parseddata.data[0].airline[0].country}</p>
                    <p>😀 : ${parseddata.data[i].name} </p>
                </div> 
            `
        }
        document.getElementById("list_data").innerHTML=tmp;
        number_page=parseddata.data.length/10;
        document.getElementById("page").innerHTML = number_page;
        page=parseddata.data.length;
        size=page+10;
    }

    londing.hidden=false;
    console.log(page)
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`).then(async (res) =>{
        let data_list = await res.json();
        const data_json = JSON.stringify(data_list);
        window.localStorage.setItem('data', data_json);
        londing.hidden=true;
        document.getElementById("page").innerHTML = number_page++;
        for(let i=page ; i<data_list.data.length;i++){
           
            tmp +=
            `
                <div class="box_list"> 
                    <p>${i}</p>
                    <p>✈️ : ${data_list.data[i].airline[0].name} - ${data_list.data[0].airline[0].country}</p>
                    <p>😀 : ${data_list.data[i].name} </p>
                </div> 
            `
        }
        document.getElementById("list_data").innerHTML=tmp;
        console.log({page,size})
    })
    
}



list_data.addEventListener("scroll", (event) => {
    const { scrollTop, clientHeight, scrollHeight } = list_data;
    if ((clientHeight + scrollTop) >= scrollHeight) {
      if (!dataLoading) {
        size = page +10;
        display()
        
      }
    }
});
display()
