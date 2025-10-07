// Core Logic (script.js)

// Global Variables/State: Plan how you’ll manage your posts (e.g., an array of post objects). 
//---- array to store the posts------
let posts = [];

// DOM Element Selection: Get references to your form, input fields, error message elements, post display area, etc.
//---DOM Element Selection---
const postForm = document.getElementById('postForm');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const titleError = document.getElementById('titleError');
const contentError = document.getElementById('contentError');
const postsContainer = document.getElementById('postContainer');

// Load Posts from localStorage: On script load, check localStorage for existing posts. If found, parse them and render them on the page.
//---Loading post from localstorage---
window.addEventListener('DOMContentLoaded', () => {
    const storedPosts = localStorage.getItem('posts');
    if(storedPosts) {
        posts = JSON.parse(storedPosts);
        renderPosts();
    }
})

// Render Posts Function: Create a function that takes the array of posts and dynamically creates the HTML to display them. Each post should include its title, content, an “Edit” button, and a “Delete” button. Ensure new posts are added to the display without needing a page refresh.
//---Rendering the post function---
function renderPosts() {
    postsContainer.innerHTML = '';

    postContent.forEach((post, index) => {
        const postDiv = document.createElement('h3');
        titleEl.textcontent = post.title;

        const contentEl = document.createElement ('p')
        contentEl.textContent = post.content;
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => deletepost(index));

        postDiv.appendChild(tittleEl);
        postDiv.appendChild(contentEl);
        postDiv.appendChild(editBtn);
        postDiv.appendChild(deleteBtn);
        postsContainer.appendChild(postDiv);
    });
}