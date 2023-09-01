


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
    
    
     //console.log(data.data);


};








    // on-clicking data 
    const allDataByClick = async (kolamula) => {

        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${kolamula}`);

        const data = await response.json();

        //console.log(data.data);

        //console.log(kolamula);

        
        
        // Getting Card Container By ID
        const cardContainer = document.getElementById('card-container-id');

        
        data.data?.forEach((mainData) => {

            //console.log(mainData);

            const divForCards = document.createElement("div");

            divForCards.innerHTML = `
            
            <div class="cards pb-6">

                    <div class="card-image" >
                        <img class=" w-full h-72 " src=${mainData?.thumbnail}>
                        
                    </div>

                    <div class="alla-body  flex">

                        <div class="profile-img  h-10 rounded min-w-fit pl-2 mt-5 mr-4">
                            <img src="images/Screenshot_1.png">
                        </div>

                        <div class="main">
                            <h4 class="mt-4 text-2xl font-bold text-[#171717]">${mainData?.title}</h4>

                            <div class="flex">
                                <p class="text-xl font-normal mt-3">${mainData?.authors[0].profile_name}</p>
                                ${mainData?.authors[0].verified !== false && mainData?.authors[0].verified !=="" ? '<img class="w-8 h-8 mt-2 ml-2" src="icons/Twitter_Verified_Badge.svg.png">' : ''}
                            </div>

                            <p class="text-xl font-normal mt-2">${mainData?.others?.views} </p>


                        </div>
                    
                    </div>
    
                </div>




            `;


            cardContainer.appendChild(divForCards);











        });


   

    }




    handleApiCategories();








