let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let categorys= document.getElementById('categorys');
let submit= document.getElementById('submit');
let title= document.getElementById('title');

let mood = 'create';
let tmp;
let not_found='not found';

//get total

function getTotal() {
    if (price.value !== '' && taxes.valuo !== '' && ads.value !== '' ) {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//creat product
let datapro;
if(localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}else{
    datapro = [];
}
submit.onclick =function () {
    let newpro={
        title:title.value.toLowerCase(), 
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:categorys.value.toLowerCase(), 
    }
    //count of product
    if(title.value !== '' && price.value !== '' && categorys.value !== '' && newpro.count<=50){
        if (mood === 'create'){
            if (newpro.count>1){
                for (let i=0 ;i<newpro.count ;i++){
                    datapro.push(newpro);
                }
                }else{
                    datapro.push(newpro);
                }
        }else{
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'creat';
            count.style.display = 'block';
    
        } 
        //fun clear data 
        cleardata()
            }
//save data localstorage
localStorage.setItem('product' , JSON.stringify(datapro));    
//read data
showData()

}

//clear data input
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    categorys.value = '';

}
//read data(show data)
function showData(){
    getTotal();
    let table ='';
    for (let i=0 ; i<datapro.length ;i++){
        table += `
        <tr>   
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateItem(${i})" id="update">update</button></td>
            <td><button onclick="deletItem(${i})" id="delete">delete</button></td>
        </tr>
    `;
    } 
    document.getElementById('tbody').innerHTML=table;
    //add delete button
    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deletAll()">delete all(${datapro.length})</button>`
        }else{
            btnDelete.innerHTML = '';
        }
}

//read data
showData();


//delete item
function deletItem(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}
// function delete all
function deletAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}


//update data
function updateItem(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';
    categorys.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}
//search
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if ( id == 'search_title') {
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'search by'+searchMood;
    search.focus(); 
    search.value='';
    showData();
}

// function searchData(value)
// {
//     let table='';
//     if(searchMood=='title' )
//         {
//         for(let i=0 ; i < datapro.length ;i++){
//             if( datapro[i].title.includes(value.toLowerCase())){
//                 table += `
//                 <tr>   
//                     <td>${i}</td>
//                     <td>${datapro[i].title}</td>
//                     <td>${datapro[i].price}</td>
//                     <td>${datapro[i].taxes}</td>
//                     <td>${datapro[i].ads}</td>
//                     <td>${datapro[i].discount}</td>
//                     <td>${datapro[i].total}</td>
//                     <td>${datapro[i].category}</td>
//                     <td><button onclick="updateItem(${i})" id="update">update</button></td>
//                     <td><button onclick="deletItem(${i})" id="delete">delete</button></td>
//                 </tr>
//             `;
//             }
//         }
//         } else{
//             for(let i=0 ; i < datapro.length ;i++){
//                 if( datapro[i].category.includes(value.toLowerCase())){
//                     table += `
//                     <tr>   
//                         <td>${i}</td>
//                         <td>${datapro[i].title}</td>
//                         <td>${datapro[i].price}</td>
//                         <td>${datapro[i].taxes}</td>
//                         <td>${datapro[i].ads}</td>
//                         <td>${datapro[i].discount}</td>
//                         <td>${datapro[i].total}</td>
//                         <td>${datapro[i].category}</td>
//                         <td><button onclick="updateItem(${i})" id="update">update</button></td>
//                         <td><button onclick="deletItem(${i})" id="delete">delete</button></td>
//                     </tr>
//                 `;
//                 }else{
//                     table = `
                
//                     <tr>   
//                     <td>${not_found}</td>
//                     </tr>
// `;
//                 }
//             }
//     }
//     document.getElementById('tbody').innerHTML=table;
// }
function searchData(value) {
    let table = '';
    let found = false; // Flag to check if any results are found
    for (let i = 0; i < datapro.length; i++) {
        if (searchMood == 'title') {
        
                if (datapro[i].title.toLowerCase().includes(value.toLowerCase())) {
                    table += `
                    <tr>   
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                    </tr>
                    `;
                    found = true; // At least one result is found
                }
            
        } else if (searchMood == 'category') {
            
                if (datapro[i].category.toLowerCase().includes(value.toLowerCase())) {
                    table += `
                    <tr>   
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                    </tr>
                    `;
                    found = true; // At least one result is found
                }
            
        }
    }
    // If no results are found, display a "not found" message
    if (!found) {
        table = `
        <tr>
            <td colspan="10" style="text-align: center; color: red;">No results found!</td>
        </tr>
        `;
    }

    // Update the table body with the search results
    document.getElementById('tbody').innerHTML = table;
}
