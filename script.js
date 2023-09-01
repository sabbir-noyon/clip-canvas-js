


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

    console.log(data.data);









};


handleApiCategories();






