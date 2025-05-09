# Jekyll Blog with Chirpy Theme

A feature-rich Jekyll blog using the Chirpy theme with a custom hidden admin interface for content management.

## Features

### Chirpy Theme Features

- Responsive design that works on various screen sizes
- Dark/light mode toggle for better reading experience
- SEO-optimized with proper meta tags
- Full-text search capability
- Table of contents for long articles
- Support for comments systems
- Mathematics rendering
- Mermaid diagram and flowchart support
- Customizable image rendering (dark/light mode)
- Pin posts to the top of the list
- Syntax highlighting for code snippets

### Custom Admin Features

- **Hidden Login**: Subtle login access point in the footer
- **Content Management**: Create, edit, and delete posts directly from the browser
- **Markdown Editor**: User-friendly editor with formatting tools
- **Media Embedding**: Support for images, videos, and code snippets
- **Tag Management**: Organize and manage tags and categories
- **Draft System**: Save posts as drafts before publishing
- **User Authentication**: Secure login with session management

## Quick Start

```bash
# Install dependencies
bundle install

# Start the local server
bundle exec jekyll serve
```

Visit `http://localhost:4000` to view your blog.

## Admin Access

The admin interface is hidden from regular users:

1. Look for the invisible login trigger at the bottom-right of the footer
2. Login with:
   - Username: `coast`
   - Password: `DoctorlyCoast25`
3. Access the admin dashboard to manage your content

## Documentation

Detailed documentation is available in the `docs` directory:

- [Setup Guide](docs/SETUP.md) - Installation and configuration
- [Admin Guide](docs/ADMIN.md) - How to use the admin interface
- [Development Guide](docs/DEVELOPMENT.md) - Code structure and customization

## Deployment Options

- **GitHub Pages**: Fast deployment with built-in CI/CD
- **Netlify**: Simple drag-and-drop or Git integration
- **Custom Server**: Deploy to your own web hosting

## Security Notes

This implementation uses client-side authentication and storage for demonstration purposes. For a production site, consider implementing server-side authentication, HTTPS, and other security measures as detailed in the documentation.

## License

This project is available under the [MIT License](LICENSE).

## Acknowledgments

- [Jekyll](https://jekyllrb.com/) - The static site generator
- [Chirpy Theme](https://github.com/cotes2020/jekyll-theme-chirpy) - The base theme