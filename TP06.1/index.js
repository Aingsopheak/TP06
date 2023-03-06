let list_data = document.getElementById("list_data"); 
const londing = document.getElementById("loading");
let dataLoading =false;
let number_page =1;
let page=0;
let size=10;
function display()
{
    londing.hidden=false   
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`).then(async (res) =>{
        let data_list = await res.json();
        londing.hidden=true;
        let tmp = "";  
        console.log(data_list.data.length);
        document.getElementById("page").innerHTML = number_page++;
        for(let i=0 ; i<data_list.data.length;i++){
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
        page = page +10;
        size = page +10;
        display()     
      }
    }
});
display()


