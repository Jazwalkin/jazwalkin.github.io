# Jekyll Blog with Chirpy Theme - Setup Guide

This guide will walk you through the process of setting up your Jekyll blog with the Chirpy theme and admin functionality.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

1. **Ruby** (version 2.5.0 or higher)
2. **RubyGems**
3. **Jekyll** and **Bundler** gems
4. **Git** (optional but recommended)

## Installation

### Step 1: Clone or Download the Repository

```bash
git clone https://github.com/your-username/jekyll-chirpy-blog.git
cd jekyll-chirpy-blog
```

Or download and extract the ZIP file.

### Step 2: Install Dependencies

```bash
bundle install
```

This will install all the necessary gems specified in the Gemfile, including Jekyll and the Chirpy theme.

### Step 3: Customize Configuration

Edit the `_config.yml` file to customize your blog settings:

```yaml
# Site information
title: Your Blog Title
tagline: Your Blog Tagline
description: Detailed description of your blog
url: 'https://yourdomain.com'  # Replace with your actual domain

# Author information
github:
  username: your-github-username
twitter:
  username: your-twitter-username
social:
  name: Your Name
  email: your-email@example.com
  links:
    - https://twitter.com/your-twitter-username
    - https://github.com/your-github-username

# Additional settings
# ...
```

### Step 4: Local Development

Start the local development server:

```bash
bundle exec jekyll serve
```

This will start a local server at `http://localhost:4000` where you can preview your blog.

## Features

### Standard Chirpy Theme Features

The Chirpy theme comes with many features out of the box:

- Responsive design
- Dark/light mode toggle
- Pinned posts
- Table of contents
- Search
- Comments system
- Tags and categories
- Archive by date
- And more!

### Custom Admin Functionality

This blog includes a hidden admin panel that can be accessed by:

1. Clicking the invisible button in the bottom-right corner of the footer
2. Entering the credentials:
   - Username: `coast`
   - Password: `DoctorlyCoast25`

The admin panel allows you to:

- Create and publish posts with a Markdown editor
- Edit existing posts
- Manage tags and categories
- Delete posts
- Update site settings

## Writing Posts

### Using the Admin Interface

1. Log in to the admin panel
2. Click on "Create Post" tab
3. Fill in the post details:
   - Title
   - Date
   - Categories (comma-separated)
   - Tags (comma-separated)
   - Content (in Markdown format)
4. Click "Save as Draft" or "Publish Post"

### Manual Method (via File System)

1. Create a new file in the `_posts` directory with the naming convention `YYYY-MM-DD-title.md`
2. Add front matter at the top of the file:

```yaml
---
title: Your Post Title
date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [Category1, Category2]
tags: [tag1, tag2]
---
```

3. Write your post content in Markdown format
4. Save the file and rebuild the site

## Deployment

### Option 1: GitHub Pages

1. Create a GitHub repository
2. Push your Jekyll site to the repository
3. Configure GitHub Pages in the repository settings
4. Your site will be available at `https://username.github.io/repository-name`

### Option 2: Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Create a new site from Git
3. Connect your GitHub repository
4. Configure the build settings:
   - Build command: `jekyll build` or `bundle exec jekyll build`
   - Publish directory: `_site`
5. Deploy your site

### Option 3: Custom Web Server

1. Build your site:

```bash
bundle exec jekyll build
```

2. Upload the contents of the `_site` directory to your web server

## Authentication Security Notes

- This implementation uses client-side authentication for demonstration purposes
- For a production site, consider implementing:
  - Server-side authentication
  - Hashed passwords
  - HTTPS protocol
  - Rate limiting for login attempts

## Troubleshooting

### Common Issues

- **Jekyll build errors**: Make sure all dependencies are correctly installed
- **Missing theme components**: Verify that the Chirpy theme is properly installed
- **Admin panel not working**: Check browser console for JavaScript errors

For more help, please [create an issue](https://github.com/your-username/jekyll-chirpy-blog/issues) in the repository.

## License

This project is open-source and available under the [MIT License](LICENSE).