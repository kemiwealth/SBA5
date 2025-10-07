// Core Logic (script.js)

// Global Variables/State: Plan how you’ll manage your posts (e.g., an array of post objects).
//---- array to store the posts------
let posts = [];

// DOM Element Selection: Get references to your form, input fields, error message elements, post display area, etc.
//---DOM Element Selection---
const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");
const postsContainer = document.getElementById("postsContainer");

// Load Posts from localStorage: On script load, check localStorage for existing posts. If found, parse them and render them on the page.
//---Loading post from localstorage---
window.addEventListener("DOMContentLoaded", () => {
  const storedPosts = localStorage.getItem("posts");
  if (storedPosts) {
    posts = JSON.parse(storedPosts);
    renderPosts();
  }
});

// Render Posts Function: Create a function that takes the array of posts and dynamically creates the HTML to display them. Each post should include its title, content, an “Edit” button, and a “Delete” button. Ensure new posts are added to the display without needing a page refresh.
//---Rendering the post function---
function renderPosts() {
  postsContainer.innerHTML = "";

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const titleEl = document.createElement('h3');
    titleEl.textcontent = post.title;

    const contentEl = document.createElement('p');
    contentEl.textContent = post.content;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editPost(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deletePost(index));

    postDiv.appendChild(titleEl);
    postDiv.appendChild(contentEl);
    postDiv.appendChild(editBtn);
    postDiv.appendChild(deleteBtn);
    postsContainer.appendChild(postDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  //--- Form Submission---
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // to clear any existing error messages
    titleError.textContent = "";
    contentError.textContent = "";

    // to validate inputs
    const titleValue = postTitle.value.trim();
    const contentValue = postContent.value.trim();

    let valid = true;

    if (titleValue === "") {
      titleError.textContent = "Title is required";
      valid = false;
    }

    if (contentValue === "") {
      contentError.textContent = "Content is required";
      valid = false;
    }

    if (!valid) return;

    // Adding a new post object
    const newPost = {
      title: titleValue,
      content: contentValue,
    };

    posts.push(newPost);
    // Saving to localStorage
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts(); // Re-render posts

    // Clearing the form fields
    postForm.reset();
  });

  function editPost(index) {
    const post = posts[index];

    // Prefill form with post data
    postTitle.value = post.title;
    postContent.value = post.content;

    // Remove the old post (it will be replaced after editing)
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }

  // ---------------------------
  // Delete Post Function
  // ---------------------------
  function deletePost(index) {
    posts.splice(index, 1); // Remove post from array
    localStorage.setItem("posts", JSON.stringify(posts)); // Update localStorage
    renderPosts(); // Refresh the displayed list
  }
});

console.log(postForm, titleError, contentError, postsContainer);

// this is a test post to make sure it works
