#!/bin/bash

# Jekyll Blog with Chirpy Theme - Setup Script
# This script helps set up the blog for first-time users

echo "Setting up Jekyll Blog with Chirpy Theme..."

# Check for Ruby installation
if ! command -v ruby &> /dev/null; then
    echo "Ruby is not installed. Please install Ruby 2.5.0 or higher."
    exit 1
fi

# Check Ruby version
ruby_version=$(ruby -v | cut -d' ' -f2)
required_version="2.5.0"

if [ "$(printf '%s\n' "$required_version" "$ruby_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "Ruby version $ruby_version is too old. Please install Ruby 2.5.0 or higher."
    exit 1
fi

# Check for RubyGems
if ! command -v gem &> /dev/null; then
    echo "RubyGems is not installed. Please install RubyGems."
    exit 1
fi

# Install Bundler if not installed
if ! command -v bundle &> /dev/null; then
    echo "Installing Bundler..."
    gem install bundler
fi

# Install Jekyll if not installed
if ! command -v jekyll &> /dev/null; then
    echo "Installing Jekyll..."
    gem install jekyll
fi

# Install dependencies
echo "Installing dependencies..."
bundle install

# Customize site settings
echo "Would you like to customize your site settings now? (y/n)"
read -r customize

if [[ "$customize" =~ ^[Yy]$ ]]; then
    echo "Enter your site title: "
    read -r site_title
    
    echo "Enter your name: "
    read -r author_name
    
    echo "Enter your email (optional): "
    read -r author_email
    
    echo "Enter your GitHub username (optional): "
    read -r github_username
    
    echo "Enter your Twitter username (optional): "
    read -r twitter_username
    
    # Update _config.yml with these values
    if [[ -n "$site_title" ]]; then
        sed -i "s/title: My Jekyll Blog/title: $site_title/" _config.yml
    fi
    
    if [[ -n "$author_name" ]]; then
        sed -i "s/name: Your Name/name: $author_name/" _config.yml
    fi
    
    if [[ -n "$author_email" ]]; then
        sed -i "s/email: your-email@example.com/email: $author_email/" _config.yml
    fi
    
    if [[ -n "$github_username" ]]; then
        sed -i "s/username: username/username: $github_username/" _config.yml
    fi
    
    if [[ -n "$twitter_username" ]]; then
        sed -i "s/username: twitter_username/username: $twitter_username/" _config.yml
    fi
    
    echo "Site settings updated!"
fi

# Start the development server
echo "Would you like to start the development server now? (y/n)"
read -r start_server

if [[ "$start_server" =~ ^[Yy]$ ]]; then
    echo "Starting Jekyll development server..."
    bundle exec jekyll serve
    
    echo "Your blog is now running at http://localhost:4000"
    echo "To access the admin panel, click the invisible button in the bottom-right corner of the footer."
    echo "Login with username 'coast' and password 'DoctorlyCoast25'"
else
    echo "Setup complete!"
    echo "To start the server later, run: bundle exec jekyll serve"
    echo "Your blog will be available at http://localhost:4000"
fi

echo "Thank you for using Jekyll Blog with Chirpy Theme!"