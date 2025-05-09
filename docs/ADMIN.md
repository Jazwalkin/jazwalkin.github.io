# Admin Functionality Guide

This guide explains how to use the admin functionality of your Jekyll blog with the Chirpy theme.

## Accessing the Admin Panel

The admin panel is hidden from regular users to maintain security:

1. Scroll to the bottom of any page on your blog
2. Look for an invisible clickable area in the bottom-right corner of the footer
3. Click this area to open the login modal
4. Enter the following credentials:
   - Username: `coast`
   - Password: `DoctorlyCoast25`

## Admin Panel Features

The admin panel consists of four main sections:

### 1. Create Post

This tab allows you to create new blog posts with the following fields:

- **Title**: The title of your post
- **Date**: Publication date (defaults to current date/time if left empty)
- **Categories**: Comma-separated list of categories
- **Tags**: Comma-separated list of tags
- **Content**: Markdown editor for your post content
  - Use the toolbar buttons for common Markdown formatting
  - You can also write Markdown directly

Actions:
- **Save as Draft**: Saves the post without publishing it
- **Publish Post**: Saves and publishes the post immediately

### 2. Manage Posts

This tab displays all your posts with options to filter by status:

- **All**: Shows all posts
- **Published**: Shows only published posts
- **Drafts**: Shows only draft posts

For each post, you can:
- **Edit**: Open the post in the editor for modifications
- **Delete**: Remove the post permanently (asks for confirmation)
- **Publish**: For drafts, allows publishing without editing

### 3. Tags & Categories

This tab helps you manage your blog's taxonomy:

- **Categories**: View all categories used across your posts
  - Add new categories
  - Delete existing categories

- **Tags**: View all tags used across your posts
  - Add new tags
  - Delete existing tags

Note: Adding or deleting tags/categories does not automatically update posts that use them. You'll need to edit affected posts manually.

### 4. Settings

This tab allows you to update basic site settings:

- **Site Title**: The main title of your blog
- **Site Description**: A brief description of your blog
- **Author Name**: Your name as the blog author
- **Social Links**: Your GitHub and Twitter usernames

## Post Editor Features

### Markdown Toolbar

The post editor includes a Markdown toolbar with buttons for:

- **Bold**: Wraps selected text with `**`
- **Italic**: Wraps selected text with `*`
- **Heading**: Adds `## ` before selected text
- **Link**: Converts selected text to `[selected text](url)`
- **Image**: Inserts image Markdown `![alt text](image-url)`
- **Code**: Wraps selected text in triple backticks for code blocks
- **List**: Converts selected lines to bullet points

### Front Matter

When you create a post through the admin interface, the system automatically generates the front matter for you. The front matter includes:

```yaml
---
title: Your Post Title
date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [Category1, Category2]
tags: [tag1, tag2]
---
```

## Logging Out

To log out from the admin interface:

1. Click the "Logout" button in the bottom-left corner
2. The page will reload and you'll be returned to the normal viewing mode

## Security Considerations

- The login credentials are hardcoded in the JavaScript file for this demo
- Session data is stored in the browser's localStorage with a 24-hour expiration
- For production use, consider implementing a more secure authentication system
- All admin activities are performed client-side in this implementation

## Limitations

- This admin interface operates entirely in the browser and doesn't actually modify the Jekyll files directly
- In a real implementation, the admin actions would need to create/modify/delete actual files in the `_posts` directory
- The settings changes are simulated and don't actually modify the `_config.yml` file

## Extending the Admin Interface

To extend the admin interface with additional functionality:

1. Add new tabs in the `admin-panel.html` file
2. Create corresponding JavaScript functions in `admin.js`
3. Update the CSS in `custom.scss` for any new UI elements