


// calling blog.html

const openBlog = () => {

    const newHtml = "blog.html"; 

    window.open(newHtml, '_blank');
}





// Start The Functionality 

// fetching categories api 

const handleApiCategories = async () => {


    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");

    const data = await response.json();


     // getting tab container for the dynamic tabs
     const tabGetContainer = document.getElementById('tab-get-container');

        data.data.forEach((apiCatagories)=> {

        const div = document.createElement("div");

        div.innerHTML=`

        <a onclick = "allDataByClick('${apiCatagories.category_id}')" class="tab">${apiCatagories.category}</a> 
        
        
        ` ;


        tabGetContainer.appendChild(div);

    } );
    
    
     //console.log(data.data[0]);


};








    // on-clicking data 
    const allDataByClick = (kolamula) => {

        console.log(kolamula);


   









    }









    handleApiCategories();








