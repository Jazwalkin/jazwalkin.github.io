# Development Guide

This guide explains the structure and technical details of the Jekyll blog with Chirpy theme and admin functionality.

## Project Structure

```
jekyll-chirpy-blog/
├── _config.yml              # Jekyll configuration
├── _data/                   # Data files
├── _drafts/                 # Unpublished posts
├── _includes/               # Partials for views
│   ├── admin-panel.html     # Admin panel template
│   └── custom-head.html     # Custom head content
├── _layouts/                # Layout templates
├── _posts/                  # Published blog posts
├── _tabs/                   # Tab pages
│   ├── about.md             # About page
│   ├── archives.md          # Archives page
│   ├── categories.md        # Categories page
│   └── tags.md              # Tags page
├── assets/                  # Static assets
│   ├── css/
│   │   └── custom.scss      # Custom styles
│   ├── img/                 # Images
│   └── js/
│       ├── admin.js         # Admin functionality
│       └── custom.js        # Login and session management
├── docs/                    # Documentation
├── Gemfile                  # Ruby dependencies
├── Gemfile.lock             # Ruby dependency versions
├── index.html               # Home page
└── README.md                # Project overview
```

## Key Components

### 1. Jekyll Configuration

The `_config.yml` file contains all Jekyll and Chirpy theme settings. Important settings include:

- Site title, description, and URL
- Author information
- Theme configuration
- Build settings

### 2. Custom Files

The following custom files extend the Chirpy theme:

- **custom-head.html**: Includes custom CSS and JavaScript
- **admin-panel.html**: The admin panel HTML template
- **custom.scss**: Styling for login and admin features
- **custom.js**: Login functionality and session management
- **admin.js**: Admin panel functionality

### 3. JavaScript Architecture

#### Authentication Flow

1. **Login Trigger**: Located in the footer, triggers the login modal
2. **Login Modal**: Accepts username and password
3. **Authentication**: Checks credentials against hardcoded values
4. **Session Management**: Stores session data in localStorage with expiration
5. **Admin UI**: Displays admin panel when authenticated

#### Admin Panel

The admin panel is organized with a tab-based interface:

1. **Tab Navigation**: Handles switching between tabs
2. **Post Management**: CRUD operations for blog posts
3. **Tags Management**: Add/view/delete tags and categories
4. **Settings Management**: Update site settings

### 4. Data Storage

Since this is a client-side implementation, data is stored in the browser's localStorage:

- **blog_posts**: Array of post objects
- **blogSession**: Authentication session data
- **site_settings**: Site configuration settings

In a real implementation, this would be replaced with file system operations or API calls.

## Customization

### Changing Login Credentials

To change the login credentials, edit the following code in `assets/js/custom.js`:

```javascript
// Find this section:
if (username === 'coast' && password === 'DoctorlyCoast25') {
  // Successful login
  
  // Replace with your own credentials:
  if (username === 'your-username' && password === 'your-password') {
    // Successful login
```

### Modifying the Admin Panel

To add or modify admin features:

1. **Add UI Elements**: Edit `_includes/admin-panel.html`
2. **Add Functionality**: Implement in `assets/js/admin.js`
3. **Add Styling**: Update `assets/css/custom.scss`

### Integrating with Backend Services

To make the admin panel interact with a real backend:

1. Replace localStorage operations with API calls
2. Implement authentication with a secure backend
3. Implement CRUD operations for posts via API endpoints

Example API call replacement:

```javascript
// Instead of localStorage:
localStorage.setItem('blog_posts', JSON.stringify(posts));

// Use an API call:
fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionToken
  },
  body: JSON.stringify(post)
})
.then(response => response.json())
.then(data => {
  console.log('Post saved:', data);
})
.catch(error => {
  console.error('Error saving post:', error);
});
```

## Security Considerations

### Client-Side Limitations

The current implementation has several security limitations:

1. **Hardcoded Credentials**: Visible in client-side JavaScript
2. **Client-Side Storage**: Data in localStorage can be modified by users
3. **No Real Authentication**: Session management is simulated

### Improving Security

For a production implementation, consider these improvements:

1. **Server-Side Authentication**: Implement proper auth with JWT or similar
2. **Secure APIs**: Create protected endpoints for admin operations
3. **HTTPS**: Always use HTTPS in production
4. **Input Validation**: Validate all user inputs server-side
5. **Rate Limiting**: Implement login attempt limits

## Testing

To test the admin functionality:

1. Run the Jekyll site locally
2. Navigate to any page
3. Click the hidden trigger in the footer
4. Log in with the credentials
5. Test all admin features

## Browser Compatibility

The admin interface should work in all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Internet Explorer is not supported.