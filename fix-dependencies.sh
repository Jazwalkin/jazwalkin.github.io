#!/bin/bash

# Script to fix common dependency issues with Jekyll blog setup

echo "==== Jekyll Blog Dependency Fix ===="
echo "This script will attempt to fix common dependency issues"

# Check for Gemfile.lock and remove it to start fresh
if [ -f "Gemfile.lock" ]; then
  echo "Removing Gemfile.lock to start clean..."
  rm Gemfile.lock
  echo "Done."
fi

# Check for common build tools
echo "Checking for build essentials..."
if command -v apt-get &> /dev/null; then
  echo "Debian/Ubuntu system detected."
  echo "Updating package list and installing build tools..."
  sudo apt-get update
  sudo apt-get install -y build-essential
elif command -v yum &> /dev/null; then
  echo "Red Hat/CentOS system detected."
  echo "Installing development tools..."
  sudo yum groupinstall -y "Development Tools"
elif command -v brew &> /dev/null; then
  echo "macOS system detected."
  echo "Installing development tools via Homebrew..."
  brew install libyaml
else
  echo "Could not detect package manager. You may need to manually install build tools."
fi

# Update ruby gems
echo "Updating RubyGems..."
gem update --system

# Check for bundler and install if needed
if ! command -v bundle &> /dev/null; then
  echo "Installing Bundler..."
  gem install bundler
else
  echo "Updating Bundler..."
  gem update bundler
fi

# Fix specific wdm issue in Gemfile
echo "Checking Gemfile for problematic dependencies..."
if grep -q "wdm" Gemfile; then
  echo "Found WDM gem reference. Commenting it out and adding listen gem instead..."
  sed -i 's/^[[:space:]]*gem[[:space:]]*"wdm".*$/# gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]/' Gemfile
  
  # Check if listen gem is already in Gemfile
  if ! grep -q "listen" Gemfile; then
    echo 'gem "listen", "~> 3.7"' >> Gemfile
  fi
fi

# Install dependencies
echo "Running bundle install..."
bundle install

# Final status check
if [ $? -eq 0 ]; then
  echo "==== Success! ===="
  echo "Dependencies have been installed successfully."
  echo "You can now run: bundle exec jekyll serve"
else
  echo "==== Error ===="
  echo "There were issues installing dependencies."
  echo "Please check the error messages above."
  echo "For more help, see docs/TROUBLESHOOTING.md"
fi