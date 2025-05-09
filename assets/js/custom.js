// Custom JavaScript for the blog

document.addEventListener('DOMContentLoaded', function() {
  // Login functionality
  setupLoginSystem();
  
  // Check if the user is already logged in
  checkLoggedIn();
});

function setupLoginSystem() {
  // Create login modal
  const loginModal = document.createElement('div');
  loginModal.className = 'login-modal';
  loginModal.innerHTML = `
    <div class="login-form">
      <span class="close">&times;</span>
      <h2>Login</h2>
      <form id="login-form">
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  `;
  document.body.appendChild(loginModal);

  // Event listeners
  // Add click event to the login trigger area
  const loginTrigger = document.querySelector('.login-trigger-area');
  if (loginTrigger) {
    loginTrigger.addEventListener('click', function() {
      loginModal.style.display = 'block';
    });
  }

  const closeBtn = loginModal.querySelector('.close');
  closeBtn.addEventListener('click', function() {
    loginModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check credentials - hardcoded for this example
    // In a real app, this would be handled server-side
    if (username === 'coast' && password === 'DoctorlyCoast25') {
      // Successful login
      const now = new Date();
      const sessionData = {
        loggedIn: true,
        username: username,
        loginTime: now.toISOString(),
        // Session expires in 24 hours
        expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
      };
      
      // Store session data
      localStorage.setItem('blogSession', JSON.stringify(sessionData));
      loginModal.style.display = 'none';
      showAdminFeatures();
    } else {
      // Failed login - just close the modal without error message
      loginModal.style.display = 'none';
    }
    
    // Clear form
    loginForm.reset();
  });
}

function checkLoggedIn() {
  const sessionStr = localStorage.getItem('blogSession');
  
  if (!sessionStr) {
    return false;
  }
  
  try {
    const session = JSON.parse(sessionStr);
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    
    // Check if session is valid and not expired
    if (session.loggedIn && expiresAt > now) {
      showAdminFeatures();
      return true;
    } else {
      // Session expired, clear it
      localStorage.removeItem('blogSession');
      return false;
    }
  } catch (error) {
    console.error('Error parsing session data:', error);
    localStorage.removeItem('blogSession');
    return false;
  }
}

function showAdminFeatures() {
  // Create admin panel if it doesn't exist
  if (!document.querySelector('.admin-panel')) {
    createAdminPanel();
  }
  
  // Show admin elements
  document.querySelectorAll('.admin-only').forEach(function(el) {
    el.style.display = 'block';
  });
  
  // Add logout button to the page
  addLogoutButton();
}

function createAdminPanel() {
  const adminPanel = document.createElement('div');
  adminPanel.className = 'admin-panel admin-only';
  adminPanel.innerHTML = `
    <h2>Admin Panel</h2>
    
    <div class="tab-nav">
      <button class="tab-btn active" data-tab="new-post">New Post</button>
      <button class="tab-btn" data-tab="manage-posts">Manage Posts</button>
      <button class="tab-btn" data-tab="manage-tags">Manage Tags</button>
    </div>
    
    <div id="new-post" class="tab-content active">
      <h3>Create New Post</h3>
      <input type="text" id="post-title" placeholder="Post Title" required>
      <input type="text" id="post-categories" placeholder="Categories (comma separated)">
      <input type="text" id="post-tags" placeholder="Tags (comma separated)">
      <textarea id="post-content" placeholder="Post content in Markdown format"></textarea>
      <button id="save-draft">Save as Draft</button>
      <button id="publish-post">Publish Post</button>
    </div>
    
    <div id="manage-posts" class="tab-content">
      <h3>Manage Existing Posts</h3>
      <div id="posts-list">
        <!-- Posts will be loaded here dynamically -->
        <p>Loading posts...</p>
      </div>
    </div>
    
    <div id="manage-tags" class="tab-content">
      <h3>Manage Tags and Categories</h3>
      <div>
        <h4>Categories</h4>
        <div id="categories-list">
          <!-- Categories will be loaded here dynamically -->
          <p>Loading categories...</p>
        </div>
        <input type="text" id="new-category" placeholder="New Category">
        <button id="add-category">Add Category</button>
      </div>
      <div>
        <h4>Tags</h4>
        <div id="tags-list">
          <!-- Tags will be loaded here dynamically -->
          <p>Loading tags...</p>
        </div>
        <input type="text" id="new-tag" placeholder="New Tag">
        <button id="add-tag">Add Tag</button>
      </div>
    </div>
  `;
  
  // Insert admin panel before the main content
  const mainContent = document.querySelector('.main');
  if (mainContent) {
    mainContent.parentNode.insertBefore(adminPanel, mainContent);
  } else {
    document.body.appendChild(adminPanel);
  }
  
  // Setup tab navigation
  const tabBtns = adminPanel.querySelectorAll('.tab-btn');
  const tabContents = adminPanel.querySelectorAll('.tab-content');
  
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Update active tab button
      tabBtns.forEach(function(btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      // Show the selected tab content
      tabContents.forEach(function(content) {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Setup post management functionality
  setupPostManagement();
  
  // Setup tag management functionality
  setupTagManagement();
}

function setupPostManagement() {
  // In a real implementation, these functions would interact with the Jekyll build system
  // For this example, we'll simulate the functionality with localStorage
  
  // New post functionality
  const saveAsDraft = document.getElementById('save-draft');
  const publishPost = document.getElementById('publish-post');
  
  if (saveAsDraft) {
    saveAsDraft.addEventListener('click', function() {
      savePost(false);
    });
  }
  
  if (publishPost) {
    publishPost.addEventListener('click', function() {
      savePost(true);
    });
  }
  
  // Load existing posts
  loadPosts();
}

function savePost(publish) {
  const title = document.getElementById('post-title').value;
  const categories = document.getElementById('post-categories').value;
  const tags = document.getElementById('post-tags').value;
  const content = document.getElementById('post-content').value;
  
  if (!title || !content) {
    alert('Title and content are required.');
    return;
  }
  
  // Create a post object
  const post = {
    id: Date.now().toString(),
    title: title,
    date: new Date().toISOString(),
    categories: categories.split(',').map(c => c.trim()).filter(c => c),
    tags: tags.split(',').map(t => t.trim()).filter(t => t),
    content: content,
    published: publish
  };
  
  // In a real implementation, this would create a file in the _posts or _drafts directory
  // For this example, we'll store in localStorage
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  posts.push(post);
  localStorage.setItem('blog_posts', JSON.stringify(posts));
  
  // Clear the form
  document.getElementById('post-title').value = '';
  document.getElementById('post-categories').value = '';
  document.getElementById('post-tags').value = '';
  document.getElementById('post-content').value = '';
  
  // Reload posts list
  loadPosts();
  
  alert(publish ? 'Post published successfully!' : 'Draft saved successfully!');
}

function loadPosts() {
  const postsList = document.getElementById('posts-list');
  if (!postsList) return;
  
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  
  if (posts.length === 0) {
    postsList.innerHTML = '<p>No posts found.</p>';
    return;
  }
  
  let html = '';
  posts.forEach(function(post) {
    html += `
      <div class="post-item" data-id="${post.id}">
        <div class="post-item-title">
          ${post.title} 
          <span class="post-status">${post.published ? '(Published)' : '(Draft)'}</span>
        </div>
        <div class="post-item-actions">
          <button class="edit-post">Edit</button>
          <button class="delete-post">Delete</button>
          ${!post.published ? '<button class="publish-post">Publish</button>' : ''}
        </div>
      </div>
    `;
  });
  
  postsList.innerHTML = html;
  
  // Add event listeners for post actions
  postsList.querySelectorAll('.edit-post').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const postId = this.closest('.post-item').getAttribute('data-id');
      editPost(postId);
    });
  });
  
  postsList.querySelectorAll('.delete-post').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const postId = this.closest('.post-item').getAttribute('data-id');
      deletePost(postId);
    });
  });
  
  postsList.querySelectorAll('.publish-post').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const postId = this.closest('.post-item').getAttribute('data-id');
      publishExistingPost(postId);
    });
  });
}

function editPost(postId) {
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  const post = posts.find(p => p.id === postId);
  
  if (!post) return;
  
  // Switch to the new post tab
  document.querySelector('[data-tab="new-post"]').click();
  
  // Fill the form with post data
  document.getElementById('post-title').value = post.title;
  document.getElementById('post-categories').value = post.categories.join(', ');
  document.getElementById('post-tags').value = post.tags.join(', ');
  document.getElementById('post-content').value = post.content;
  
  // Add a hidden field to store the post ID for updating
  let postIdField = document.getElementById('post-id');
  if (!postIdField) {
    postIdField = document.createElement('input');
    postIdField.type = 'hidden';
    postIdField.id = 'post-id';
    document.getElementById('new-post').appendChild(postIdField);
  }
  postIdField.value = postId;
  
  // Change the button text
  document.getElementById('save-draft').textContent = 'Update Draft';
  document.getElementById('publish-post').textContent = 'Update & Publish';
}

function deletePost(postId) {
  if (!confirm('Are you sure you want to delete this post?')) return;
  
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  const updatedPosts = posts.filter(p => p.id !== postId);
  localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
  
  // Reload posts list
  loadPosts();
}

function publishExistingPost(postId) {
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  const updatedPosts = posts.map(p => {
    if (p.id === postId) {
      p.published = true;
    }
    return p;
  });
  localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
  
  // Reload posts list
  loadPosts();
}

function setupTagManagement() {
  // Load existing tags and categories
  loadTagsAndCategories();
  
  // Add event listeners for adding new tags and categories
  const addCategoryBtn = document.getElementById('add-category');
  const addTagBtn = document.getElementById('add-tag');
  
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', function() {
      addCategory();
    });
  }
  
  if (addTagBtn) {
    addTagBtn.addEventListener('click', function() {
      addTag();
    });
  }
}

function loadTagsAndCategories() {
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  
  // Extract unique categories and tags
  const categories = new Set();
  const tags = new Set();
  
  posts.forEach(function(post) {
    post.categories.forEach(function(category) {
      categories.add(category);
    });
    
    post.tags.forEach(function(tag) {
      tags.add(tag);
    });
  });
  
  // Display categories
  const categoriesList = document.getElementById('categories-list');
  if (categoriesList) {
    if (categories.size === 0) {
      categoriesList.innerHTML = '<p>No categories found.</p>';
    } else {
      let html = '';
      categories.forEach(function(category) {
        html += `<div class="tag-item">${category}</div>`;
      });
      categoriesList.innerHTML = html;
    }
  }
  
  // Display tags
  const tagsList = document.getElementById('tags-list');
  if (tagsList) {
    if (tags.size === 0) {
      tagsList.innerHTML = '<p>No tags found.</p>';
    } else {
      let html = '';
      tags.forEach(function(tag) {
        html += `<div class="tag-item">${tag}</div>`;
      });
      tagsList.innerHTML = html;
    }
  }
}

function addCategory() {
  const newCategory = document.getElementById('new-category').value.trim();
  
  if (!newCategory) {
    alert('Please enter a category name.');
    return;
  }
  
  // In a real implementation, this would create or update a category in the Jekyll _data directory
  // For this example, we'll just reload the tags and categories list
  document.getElementById('new-category').value = '';
  loadTagsAndCategories();
  
  alert('Category added successfully!');
}

function addTag() {
  const newTag = document.getElementById('new-tag').value.trim();
  
  if (!newTag) {
    alert('Please enter a tag name.');
    return;
  }
  
  // In a real implementation, this would create or update a tag in the Jekyll _data directory
  // For this example, we'll just reload the tags and categories list
  document.getElementById('new-tag').value = '';
  loadTagsAndCategories();
  
  alert('Tag added successfully!');
}

function addLogoutButton() {
  // Remove existing logout button if any
  const existingLogout = document.getElementById('admin-logout');
  if (existingLogout) {
    existingLogout.remove();
  }
  
  // Create logout button
  const logoutBtn = document.createElement('button');
  logoutBtn.id = 'admin-logout';
  logoutBtn.className = 'admin-only';
  logoutBtn.textContent = 'Logout';
  logoutBtn.style.position = 'fixed';
  logoutBtn.style.bottom = '10px';
  logoutBtn.style.left = '10px';
  logoutBtn.style.zIndex = '1000';
  
  logoutBtn.addEventListener('click', function() {
    // Clear session data
    localStorage.removeItem('blogSession');
    
    // Hide admin elements
    document.querySelectorAll('.admin-only').forEach(function(el) {
      el.style.display = 'none';
    });
    
    // Reload the page to reset all UI components
    window.location.reload();
  });
  
  document.body.appendChild(logoutBtn);
}