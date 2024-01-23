const userForm = document.querySelector('#userForm');
const infoContainer = document.querySelector('.info');
const searchContainer = document.querySelector("#sub-container-2")
const highContainer = document.querySelector("#previous-Searches");
const head = document.querySelector('h2');
const input = document.querySelector('input');

let previousSearches = [];
let SearchLength = 4;

function keepConst(newArr, lengthLimit, item) {
    if (newArr.length < lengthLimit) {
        newArr.push(item);
        console.log(newArr)
    }
    else {
        newArr.push(item);
        newArr.shift();
        console.log(newArr);
    }
}

const displayDropdown = (searchArr, param) => {
    if (searchArr.length > 0 & param.length != 0) {
        const dropdownHTML = searchArr.map((item) => {
            return `<div class = "search" >${item}</div>`
        }).join('');

        searchContainer.innerHTML = dropdownHTML;


        highContainer.style.display = "flex"
        searchContainer.style.display = "block"

    }

    else {
        highContainer.style.display = "none"
        searchContainer.style.display = "none";
    }
}



userForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = userForm.elements.username;
    loadPeople(usernameInput.value)
    keepConst(previousSearches, SearchLength, usernameInput.value)
    highContainer.style.display = "none"
    searchContainer.style.display = "none";
    usernameInput.value = '';
    
});

input.addEventListener('input', function () {
    displayDropdown(previousSearches, input.value)
    head.innerText = `Welcome, ${input.value}`;

    searchContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'DIV') {
            input.value = event.target.textContent;
            head.innerHTML = `Welcome, ${input.value}`
            searchContainer.style.display = 'none';
            highContainer.style.display = "none"
        }
    });
    if (input.value === '') {
        head.innerText = "";


    }

})




const addInfo = (username, userData) => {
    const index = ["login", "followers", "following", "name", "bio", "public_gists", "public_repos", "id"]

    for (let item of index) {
        let elements = document.querySelector(`.${item}`);
        let content = `<h3>${item.toUpperCase()}</h3> <div> ${userData[item]} </div`;
        
        let newContent = content.replace("null", "Not Provided")
        
        elements.innerHTML = newContent;
        


    }
    infoContainer.style.display = "grid"
}

const loadPeople = async (username) => {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) {
            
            if (res.status === 404) {
              console.log('User not found:', username);
              alert("User Not Found! Try Again")
              location.reload();
            } else {
              console.error('Error fetching data. Status:', res.status);
              location.reload();
        }}
        
        const resData = await res.json();
        console.log(res)
        addInfo(username,resData)
        
    } catch (e) {
        console.log("ERROR!!!", e);
    }
};






