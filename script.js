const loadCategories = async () =>{
  const res =await fetch('https://openapi.programming-hero.com/api/videos/categories')
  const data = await res.json()
  const categories = data.data
  displayCategory(categories)
}

const displayCategory = allCategory =>{
  const categoriesContainer = document.getElementById('categories-container')
  allCategory.forEach(category =>{
    const button = document.createElement('button');
    button.innerHTML=`
    <button onclick="handleCategoryId(${category.category_id})" class="btn bg-gray-300">${category.category}</button>
    `
    categoriesContainer.appendChild(button)
  })
}




const handleCategoryId = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent=''

  data.data?.forEach((card) => {
    const age = card.others.posted_date
    const parsfo = parseFloat(age)
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-compact w-[350px] p-[24px] bg-base-100 ">
    <figure><img class="h-[200px] cursor-pointer" src="${card.thumbnail}" /></figure>
    <div class="card-body">
    <div class="flex gap-5">
    <div class="flex justify-start">
    <figure><img class="w-[32px] h-[32px] rounded-[50%] cursor-pointer" src="${card.authors[0].profile_picture}" /></figure>
    </div>
    <div>
      <h2 class="card-title text-[18px]">${card.title}</h2>
      <p class="text-[16px] font-[400]">${card.authors[0].profile_name}</p>
        <h2 class="mt-3">${card.others.views} views</h2>
        </div>
        </div>
    </div>
  </div>
        `;

    cardContainer.appendChild(div);
  });
};


loadCategories()
handleCategoryId(1001)
