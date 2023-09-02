let currentCategory;

const convertToHoursMinutes = (seconds) => {
    const secondsInt = parseInt(seconds);
    const hour =  Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    return `${hour} hrs ${minute} min ago`;
}

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
  
    data.data.forEach((apiCatagories) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <a  onclick="allDataByClick('${apiCatagories.category_id}')" class="tab">${apiCatagories.category}</a>
      `;
      tabGetContainer.appendChild(div);
    });
  };
  
  // Function to render sorted data
  const renderSortedData = (data) => {
    // Clear the cardContainer
    const cardContainer = document.getElementById('card-container-id');
    cardContainer.innerHTML = '';
  
    // Render the sorted data
    data.data.forEach((mainData) => {
      const divForCards = document.createElement('div');
      divForCards.innerHTML = `
        <div class="cards pb-6">
          <div class="card-image">
            <img class="w-full h-72" src=${mainData?.thumbnail}>
          </div>
          ${mainData?.others?.posted_date !== '' ? `<p class=" p-2 bg-gray-950 w-max text-white text-sm font-medium  rounded-lg relative bottom-10  lg:left-60   md:left-72  left-2/4"> ${convertToHoursMinutes(mainData?.others?.posted_date)}</p>` : '' }
          

          <div class="alla-body flex">
            <div class="profile-img h-10 rounded min-w-fit pl-2 mt-5 mr-4">
            ${mainData?.others?.posted_date !== '' ?  `<img class="w-10 h-10 -mt-8 ml-2  rounded-full" src="${mainData?.authors[0].profile_picture}">`   : `<img class="w-10 h-10 mt-2 ml-2  rounded-full" src="${mainData?.authors[0].profile_picture}">` }
              
            </div>
           
            <div class="main">
            ${mainData?.others?.posted_date !== '' ?  `<h4 class="-mt-6 text-2xl font-bold text-[#171717]">${mainData?.title}</h4>`   : ` <h4 class="mt-4 text-2xl font-bold text-[#171717]">${mainData?.title}</h4>` }
             
              <div class="flex">
                <p class="text-xl font-normal mt-3">${mainData?.authors[0].profile_name}</p>
                ${mainData?.authors[0].verified !== false && mainData?.authors[0].verified !== '' ? '<img class="w-8 h-8 mt-2 ml-2" src="icons/Twitter_Verified_Badge.svg.png">' : ''}
              </div>
              <p class="text-xl font-normal mt-2">${mainData?.others?.views}</p>
            </div>
          </div>
        </div>
      `;
      cardContainer.appendChild(divForCards);
    });
  };
  
  // on-clicking data
  const allDataByClick = async (kolamula) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${kolamula}`);
    const data = await response.json();




    currentCategory = kolamula;




    
  
    // Getting Card Container By ID
    const cardContainer = document.getElementById('card-container-id');
    const pseudoSection = document.getElementById('pseudo-section');
  
    // This is Major Part to Make Container  Empty Before
    cardContainer.innerHTML = '';
    pseudoSection.innerHTML = '';
  
    if (data.data.length === 0) {
      // No data found
      const noDataDiv = document.createElement('div');
      noDataDiv.innerHTML = `
        <div class="lg:mt-48 mt-28">
          <img class="my-0 mx-auto text-center" src="icons/Icon.png">
        </div>
        <p class="lg:text-4xl text-3xl font-bold mt-10 text-center">Oops!! Sorry, There is no <br> content here</p>
      `;
      pseudoSection.appendChild(noDataDiv);
    } else {
      // Render the data
      renderSortedData(data);
    }
  };
  
  // Add click event listener to the "Sort By View" button
  const sortByViewButton = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${currentCategory}`);
    const data = await response.json();

    // Sort the data by views in descending order
    data.data.sort((a, b) => {
        const viewsA = parseInt(a.others.views.replace('K', '')) * 1000;
        const viewsB = parseInt(b.others.views.replace('K', '')) * 1000;
        return viewsB - viewsA;
      });
    
  
    // Getting Card Container By ID
    const cardContainer = document.getElementById('card-container-id');
    const pseudoSection = document.getElementById('pseudo-section');
  
    // This is Major Part to Make Container  Empty Before
    cardContainer.innerHTML = '';
    pseudoSection.innerHTML = '';
  
    if (data.data.length === 0) {
      // No data found
      const noDataDiv = document.createElement('div');
      noDataDiv.innerHTML = `
        <div class="lg:mt-48 mt-28">
          <img class="my-0 mx-auto text-center" src="icons/Icon.png">
        </div>
        <p class="lg:text-4xl text-3xl font-bold mt-10 text-center">Oops!! Sorry, There is no <br> content here</p>
      `;
      pseudoSection.appendChild(noDataDiv);
    } else {
      // Render the data
      renderSortedData(data);
    }
  
    // Render the sorted data
    // renderSortedData(data);
  };
  
  // Initial fetch and rendering of data
  allDataByClick(1000);
  handleApiCategories();
  