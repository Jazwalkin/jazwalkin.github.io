// Admin functionality for Jekyll Blog

document.addEventListener('DOMContentLoaded', function() {
  // Only initialize admin functionality when user is logged in
  const sessionStr = localStorage.getItem('blogSession');
  
  if (sessionStr) {
    try {
      const session = JSON.parse(sessionStr);
      const now = new Date();
      const expiresAt = new Date(session.expiresAt);
      
      // Check if session is valid and not expired
      if (session.loggedIn && expiresAt > now) {
        initAdminPanel();
      } else {
        // Session expired, clear it
        localStorage.removeItem('blogSession');
      }
    } catch (error) {
      console.error('Error parsing session data:', error);
      localStorage.removeItem('blogSession');
    }
  }
});

// Initialize admin panel functionality
function initAdminPanel() {
  initTabNavigation();
  initMarkdownEditor();
  initPostManagement();
  initTagsManagement();
  initSiteSettings();
  setupLogoutButton();
}

// Initialize tab navigation
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and its content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Initialize markdown editor with toolbar functionality
function initMarkdownEditor() {
  const toolbarButtons = document.querySelectorAll('.markdown-toolbar button');
  const contentTextarea = document.getElementById('post-content');
  
  if (!toolbarButtons.length || !contentTextarea) return;
  
  toolbarButtons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-markdown');
      const textarea = document.getElementById('post-content');
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      
      let replacement = '';
      
      switch(action) {
        case 'bold':
          replacement = `**${selectedText || 'bold text'}**`;
          break;
        case 'italic':
          replacement = `*${selectedText || 'italic text'}*`;
          break;
        case 'heading':
          replacement = `## ${selectedText || 'Heading'}`;
          break;
        case 'link':
          replacement = `[${selectedText || 'link text'}](url)`;
          break;
        case 'image':
          replacement = `![${selectedText || 'alt text'}](image-url)`;
          break;
        case 'code':
          replacement = selectedText ? `\`\`\`\n${selectedText}\n\`\`\`` : "```\ncode block\n```";
          break;
        case 'list':
          replacement = selectedText ? selectedText.split('\n').map(line => `- ${line}`).join('\n') : "- List item\n- Another item";
          break;
      }
      
      // Insert the replacement text
      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
      
      // Set new cursor position
      const newCursorPos = start + replacement.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
  });
}

// Initialize post management functionality
function initPostManagement() {
  // Save draft button functionality
  const saveDraftBtn = document.getElementById('save-draft');
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', () => savePost(false));
  }
  
  // Publish post button functionality
  const publishBtn = document.getElementById('publish-post');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => savePost(true));
  }
  
  // Load existing posts
  loadPosts();
  
  // Post filter functionality
  const filterRadios = document.querySelectorAll('input[name="post-filter"]');
  filterRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      loadPosts(radio.value);
    });
  });
}

// Save post function (draft or published)
function savePost(publish = false) {
  const titleInput = document.getElementById('post-title');
  const dateInput = document.getElementById('post-date');
  const categoriesInput = document.getElementById('post-categories');
  const tagsInput = document.getElementById('post-tags');
  const contentInput = document.getElementById('post-content');
  const postIdInput = document.getElementById('post-id');
  
  if (!titleInput || !contentInput) {
    return alert('Post form is not properly initialized');
  }
  
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  
  if (!title) {
    return alert('Post title is required');
  }
  
  if (!content) {
    return alert('Post content is required');
  }
  
  // Create post data object
  const postData = {
    id: postIdInput && postIdInput.value ? postIdInput.value : Date.now().toString(),
    title: title,
    date: dateInput && dateInput.value ? new Date(dateInput.value).toISOString() : new Date().toISOString(),
    categories: categoriesInput && categoriesInput.value ? categoriesInput.value.split(',').map(c => c.trim()).filter(Boolean) : [],
    tags: tagsInput && tagsInput.value ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean) : [],
    content: content,
    published: publish,
    lastModified: new Date().toISOString()
  };
  
  // Get existing posts from localStorage
  const existingPosts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  
  // Check if we're updating an existing post
  const existingIndex = existingPosts.findIndex(p => p.id === postData.id);
  
  if (existingIndex >= 0) {
    // Update existing post
    existingPosts[existingIndex] = postData;
  } else {
    // Add new post
    existingPosts.push(postData);
  }
  
  // Save updated posts to localStorage
  localStorage.setItem('blog_posts', JSON.stringify(existingPosts));
  
  // Clear the form and reload posts
  clearPostForm();
  loadPosts();
  
  alert(publish ? 'Post published successfully!' : 'Draft saved successfully!');
}

// Clear the post form fields
function clearPostForm() {
  const formElements = [
    'post-title', 'post-date', 'post-categories', 
    'post-tags', 'post-content', 'post-id'
  ];
  
  formElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.value = '';
    }
  });
  
  // Reset button text if they were changed
  const saveDraftBtn = document.getElementById('save-draft');
  const publishBtn = document.getElementById('publish-post');
  
  if (saveDraftBtn) saveDraftBtn.textContent = 'Save as Draft';
  if (publishBtn) publishBtn.textContent = 'Publish Post';
}

// Load posts into the management interface
function loadPosts(filter = 'all') {
  const postsListContainer = document.getElementById('posts-list');
  
  if (!postsListContainer) return;
  
  // Get posts from localStorage
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  
  // Filter posts based on the selected filter
  const filteredPosts = filter === 'all' 
    ? posts 
    : filter === 'published' 
      ? posts.filter(p => p.published) 
      : posts.filter(p => !p.published);
  
  if (filteredPosts.length === 0) {
    postsListContainer.innerHTML = `<p>No ${filter === 'all' ? '' : filter} posts found.</p>`;
    return;
  }
  
  // Sort posts by date (newest first)
  filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Generate HTML for the posts list
  let html = '';
  
  filteredPosts.forEach(post => {
    const formattedDate = new Date(post.date).toLocaleDateString();
    
    html += `
      <div class="post-item" data-id="${post.id}">
        <div class="post-info">
          <h4 class="post-title">${post.title}</h4>
          <div class="post-meta">
            <span class="post-date">${formattedDate}</span>
            <span class="post-status ${post.published ? 'published' : 'draft'}">${post.published ? 'Published' : 'Draft'}</span>
          </div>
        </div>
        <div class="post-actions">
          <button class="edit-post-btn">Edit</button>
          <button class="delete-post-btn">Delete</button>
          ${!post.published ? '<button class="publish-post-btn">Publish</button>' : ''}
        </div>
      </div>
    `;
  });
  
  postsListContainer.innerHTML = html;
  
  // Add event listeners to the post action buttons
  attachPostActionListeners();
}

// Attach event listeners to post action buttons
function attachPostActionListeners() {
  // Edit post button
  document.querySelectorAll('.edit-post-btn').forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.closest('.post-item').getAttribute('data-id');
      editPost(postId);
    });
  });
  
  // Delete post button
  document.querySelectorAll('.delete-post-btn').forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.closest('.post-item').getAttribute('data-id');
      deletePost(postId);
    });
  });
  
  // Publish post button
  document.querySelectorAll('.publish-post-btn').forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.closest('.post-item').getAttribute('data-id');
      publishDraft(postId);
    });
  });
}

// Edit post function
function editPost(postId) {
  // Get post data from localStorage
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return alert('Post not found');
  }
  
  // Switch to the Create/Edit post tab
  document.querySelector('.tab-btn[data-tab="new-post"]').click();
  
  // Fill the form with post data
  document.getElementById('post-title').value = post.title;
  
  // Format the date for the datetime-local input
  if (post.date) {
    const date = new Date(post.date);
    const formattedDate = date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
    document.getElementById('post-date').value = formattedDate;
  }
  
  document.getElementById('post-categories').value = post.categories ? post.categories.join(', ') : '';
  document.getElementById('post-tags').value = post.tags ? post.tags.join(', ') : '';
  document.getElementById('post-content').value = post.content;
  
  // Store the post ID in a hidden input for updating
  let postIdInput = document.getElementById('post-id');
  if (!postIdInput) {
    postIdInput = document.createElement('input');
    postIdInput.type = 'hidden';
    postIdInput.id = 'post-id';
    document.getElementById('create-post-form').appendChild(postIdInput);
  }
  postIdInput.value = postId;
  
  // Update button text
  document.getElementById('save-draft').textContent = 'Update Draft';
  document.getElementById('publish-post').textContent = post.published ? 'Update Published Post' : 'Publish Draft';
}

// Delete post function
function deletePost(postId) {
  if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    return;
  }
  
  // Get posts from localStorage
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  
  // Filter out the post to be deleted
  const updatedPosts = posts.filter(p => p.id !== postId);
  
  // Save the updated posts
  localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
  
  // Reload the posts list
  loadPosts();
  
  alert('Post deleted successfully');
}

// Publish draft function
function publishDraft(postId) {
  // Get posts from localStorage
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  
  // Find the post to update
  const updatedPosts = posts.map(post => {
    if (post.id === postId) {
      return { ...post, published: true };
    }
    return post;
  });
  
  // Save the updated posts
  localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
  
  // Reload the posts list
  loadPosts();
  
  alert('Post published successfully');
}

// Initialize tags and categories management
function initTagsManagement() {
  // Load existing tags and categories
  loadTagsAndCategories();
  
  // Add new category button
  const addCategoryBtn = document.getElementById('add-category');
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', addCategory);
  }
  
  // Add new tag button
  const addTagBtn = document.getElementById('add-tag');
  if (addTagBtn) {
    addTagBtn.addEventListener('click', addTag);
  }
}

// Load tags and categories
function loadTagsAndCategories() {
  const categoriesContainer = document.getElementById('categories-list');
  const tagsContainer = document.getElementById('tags-list');
  
  if (!categoriesContainer || !tagsContainer) return;
  
  // Get posts from localStorage
  const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  
  // Extract unique categories and tags
  const categories = new Set();
  const tags = new Set();
  
  posts.forEach(post => {
    if (post.categories && Array.isArray(post.categories)) {
      post.categories.forEach(category => categories.add(category));
    }
    
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  
  // Generate HTML for categories
  if (categories.size === 0) {
    categoriesContainer.innerHTML = '<p>No categories found</p>';
  } else {
    let categoriesHtml = '';
    categories.forEach(category => {
      categoriesHtml += `
        <div class="tag-item">
          ${category}
          <button class="delete-tag-btn" data-type="category" data-value="${category}">&times;</button>
        </div>
      `;
    });
    categoriesContainer.innerHTML = categoriesHtml;
  }
  
  // Generate HTML for tags
  if (tags.size === 0) {
    tagsContainer.innerHTML = '<p>No tags found</p>';
  } else {
    let tagsHtml = '';
    tags.forEach(tag => {
      tagsHtml += `
        <div class="tag-item">
          ${tag}
          <button class="delete-tag-btn" data-type="tag" data-value="${tag}">&times;</button>
        </div>
      `;
    });
    tagsContainer.innerHTML = tagsHtml;
  }
  
  // Add event listeners for delete buttons
  document.querySelectorAll('.delete-tag-btn').forEach(button => {
    button.addEventListener('click', () => {
      const type = button.getAttribute('data-type');
      const value = button.getAttribute('data-value');
      deleteTagOrCategory(type, value);
    });
  });
}

// Add new category
function addCategory() {
  const newCategoryInput = document.getElementById('new-category');
  
  if (!newCategoryInput) return;
  
  const categoryName = newCategoryInput.value.trim();
  
  if (!categoryName) {
    return alert('Please enter a category name');
  }
  
  // In a real implementation, this would add the category to a Jekyll data file
  // For this demo, we'll just refresh the list and clear the input
  newCategoryInput.value = '';
  loadTagsAndCategories();
  
  alert('Category added successfully');
}

// Add new tag
function addTag() {
  const newTagInput = document.getElementById('new-tag');
  
  if (!newTagInput) return;
  
  const tagName = newTagInput.value.trim();
  
  if (!tagName) {
    return alert('Please enter a tag name');
  }
  
  // In a real implementation, this would add the tag to a Jekyll data file
  // For this demo, we'll just refresh the list and clear the input
  newTagInput.value = '';
  loadTagsAndCategories();
  
  alert('Tag added successfully');
}

// Delete tag or category
function deleteTagOrCategory(type, value) {
  if (!confirm(`Are you sure you want to delete this ${type}? This may affect posts using it.`)) {
    return;
  }
  
  // In a real implementation, this would update Jekyll data files
  // For this demo, we'll just refresh the lists
  loadTagsAndCategories();
  
  alert(`${type === 'category' ? 'Category' : 'Tag'} deleted successfully`);
}

// Initialize site settings functionality
function initSiteSettings() {
  // Load current site settings
  loadSiteSettings();
  
  // Save settings button
  const saveSettingsBtn = document.getElementById('save-settings');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', saveSiteSettings);
  }
}

// Load site settings
function loadSiteSettings() {
  const titleInput = document.getElementById('site-title');
  const descriptionInput = document.getElementById('site-description');
  const authorInput = document.getElementById('site-author');
  const githubInput = document.getElementById('site-github');
  const twitterInput = document.getElementById('site-twitter');
  
  if (!titleInput || !descriptionInput || !authorInput || !githubInput || !twitterInput) return;
  
  // In a real implementation, these would come from the Jekyll _config.yml file
  // For this demo, we'll use localStorage
  const settings = JSON.parse(localStorage.getItem('site_settings') || '{}');
  
  titleInput.value = settings.title || 'My Jekyll Blog';
  descriptionInput.value = settings.description || 'A Jekyll blog with the Chirpy theme';
  authorInput.value = settings.author || 'Site Author';
  githubInput.value = settings.github || '';
  twitterInput.value = settings.twitter || '';
}

// Save site settings
function saveSiteSettings() {
  const titleInput = document.getElementById('site-title');
  const descriptionInput = document.getElementById('site-description');
  const authorInput = document.getElementById('site-author');
  const githubInput = document.getElementById('site-github');
  const twitterInput = document.getElementById('site-twitter');
  
  if (!titleInput || !descriptionInput || !authorInput || !githubInput || !twitterInput) {
    return alert('Settings form is not properly initialized');
  }
  
  // Create settings object
  const settings = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    author: authorInput.value.trim(),
    github: githubInput.value.trim(),
    twitter: twitterInput.value.trim()
  };
  
  // In a real implementation, this would update the Jekyll _config.yml file
  // For this demo, we'll save to localStorage
  localStorage.setItem('site_settings', JSON.stringify(settings));
  
  alert('Site settings saved successfully');
}

// Setup logout button
function setupLogoutButton() {
  const logoutBtn = document.getElementById('admin-logout');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Clear session data
      localStorage.removeItem('blogSession');
      
      // Hide admin elements
      document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = 'none';
      });
      
      // Add session expiration timestamp for security
      localStorage.setItem('sessionExpired', new Date().toISOString());
      
      // Reload the page to ensure all admin features are hidden
      window.location.reload();
    });
  }
}