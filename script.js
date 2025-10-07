// Core Logic (script.js)

// Global Variables/State: Plan how you’ll manage your posts (e.g., an array of post objects).
//---- array to store the posts------
let posts = [];
let editMode = false;
let editPostId = null;

// DOM Element Selection: Get references to your form, input fields, error message elements, post display area, etc.
//---DOM Element Selection---
const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");
const postsContainer = document.getElementById("postsContainer");
const submitButton = postForm.querySelector("button")

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

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    const titleEl = document.createElement("h3");
    titleEl.textContent = post.title;

    const contentEl = document.createElement("p");
    contentEl.textContent = post.content;

    const timestampEl = document.createElement("small");
    timestampEl.textContent = `Posted on: ${post.timestamp}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEdit(post.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deletePost(post.id));

    postDiv.appendChild(titleEl);
    postDiv.appendChild(contentEl);
    postDiv.appendChild(editBtn);
    postDiv.appendChild(deleteBtn);
    postsContainer.appendChild(postDiv);
  });
}

// document.addEventListener("DOMContentLoaded", () => {
// ---------------------------
// Delete Post Function
// ---------------------------
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

  if (editMode && editPostId !== null) {
    const postIndex = posts.findIndex((p) => p.id === editPostId);
    if (postIndex !== -1) {
      posts[postIndex].title = titleValue;
      posts[postIndex].content = contentValue;
      posts[postIndex].timestamp = new Date().toLocaleString();
    }

    editMode = false;
    editPostId = null;
    submitButton.textContent = "Submit Post";
  } else {
    // Adding a new post object with Id, and timestamp
    const newPost = {
      id: Date.now(), // ---> creates a unique ID based on current time
      title: titleValue,
      content: contentValue,
      timestamp: new Date().toLocaleDateString(), // ---> READ TIMESTAMP
    };

    // adding new post to the array
    posts.push(newPost);
  }
  // Saving updated post to localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // re-render the posts
  renderPosts();

  // Clearing the form fields
  postForm.reset();
});

function startEdit(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  postTitle.value = post.title;
  postContent.value = post.content;

  editMode = true;
  editPostId = postId;
  submitButton.textContent = "Update Post";
}

// ---------------------------
// Delete Post Function
// ---------------------------
function deletePost(postId) {
  posts = posts.filter((post) => post.id !== postId);

  // Update localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // Re-render posts
  renderPosts();
}
// });

console.log(postForm, titleError, contentError, postsContainer);

// this is a test post to make sure it works
