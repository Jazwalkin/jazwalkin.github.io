# Troubleshooting Guide

This guide addresses common issues you might encounter when setting up or using the Jekyll blog with Chirpy theme.

## Installation Issues

### Bundler Dependency Issues

#### WDM Gem Installation Error

**Error message:**
```
An error occurred while installing wdm (0.1.1), and Bundler cannot continue.
```

**Solution:**
This error occurs on non-Windows systems trying to install the Windows Directory Monitor gem. The WDM gem has been removed from the Gemfile and replaced with the cross-platform 'listen' gem.

If you still encounter this issue:

1. Edit your Gemfile
2. Completely remove or comment out the WDM gem line:
   ```ruby
   # gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
   ```
3. Add the listen gem:
   ```ruby
   gem "listen", "~> 3.7"
   ```
4. If you're using WSL (Windows Subsystem for Linux), you might need additional steps:
   ```bash
   sudo apt-get update
   sudo apt-get install build-essential
   ```
5. Delete the Gemfile.lock file and run `bundle install` again:
   ```bash
   rm Gemfile.lock
   bundle install
   ```

#### Jekyll Dependency Conflicts

**Error message:**
```
Bundler could not find compatible versions for gem "jekyll"
```

**Solution:**
1. Try updating Bundler: `gem update bundler`
2. Delete the Gemfile.lock file and run `bundle install` again
3. If that doesn't work, specify a compatible Jekyll version in your Gemfile:
   ```ruby
   gem "jekyll", "~> 4.2.0"
   ```

### Ruby Version Issues

**Error message:**
```
Your Ruby version is X.X.X, but your Gemfile specified Y.Y.Y
```

**Solution:**
1. Install the required Ruby version using RVM or rbenv
2. Or modify the Gemfile to use your current Ruby version (if it's 2.5.0 or higher)

## Running the Site

### Jekyll Server Won't Start

**Error message:**
```
Address already in use - bind(2) for 127.0.0.1:4000
```

**Solution:**
1. Another process is using port 4000. You can:
   - Find and close the process using that port
   - Use a different port: `bundle exec jekyll serve --port 4001`

### Asset Pipeline Errors

**Error message:**
```
Error: No such file or directory @ rb_sysopen - assets/css/style.scss
```

**Solution:**
1. Make sure you have the required directories (`assets/css/`) created
2. Run `bundle exec jekyll build --trace` to see detailed errors

## Theme Troubles

### Chirpy Theme Not Loading

**Problem:** The site loads but doesn't have the Chirpy theme styling

**Solution:**
1. Verify that the theme is correctly specified in your `_config.yml`:
   ```yml
   theme: jekyll-theme-chirpy
   ```
2. Make sure the theme gem is installed: `bundle info jekyll-theme-chirpy`
3. Try specifying the remote theme method instead:
   ```yml
   remote_theme: cotes2020/jekyll-theme-chirpy
   ```

### Missing Features

**Problem:** Some Chirpy theme features like search or dark mode aren't working

**Solution:**
1. Check that all required JavaScript files are being loaded
2. Verify that you're using a compatible version of the theme
3. Check browser console for JavaScript errors
4. Clear browser cache and reload

## Admin Interface Issues

### Can't Access Admin Panel

**Problem:** The admin login doesn't appear or doesn't work

**Solution:**
1. Check that the custom CSS and JavaScript files are properly included
2. Verify the files locations match what's expected in the HTML
3. Check browser console for JavaScript errors
4. Make sure you're clicking in the exact location of the login trigger (bottom right of footer)

### Admin Functions Not Working

**Problem:** Can't create/edit posts or other admin functions

**Solution:**
1. Check browser console for JavaScript errors
2. Verify that localStorage is available and not full
3. Try using a different browser to rule out browser-specific issues

## Deployment Issues

### GitHub Pages Deployment Fails

**Problem:** Site doesn't build on GitHub Pages

**Solution:**
1. Make sure your `_config.yml` has the correct `baseurl` setting
2. Check GitHub Actions logs for specific errors
3. Ensure you're using a GitHub Pages supported theme or specified remote_theme

### Custom Domain Issues

**Problem:** Custom domain not working with the site

**Solution:**
1. Verify DNS settings according to GitHub Pages documentation
2. Ensure you've added a CNAME file to your repository
3. Check if the site is being served over HTTPS and update links accordingly

## Getting More Help

If you encounter issues not covered in this guide:

1. Check the [Jekyll Troubleshooting Guide](https://jekyllrb.com/docs/troubleshooting/)
2. Look for similar issues in the [Chirpy Theme Repository](https://github.com/cotes2020/jekyll-theme-chirpy/issues)
3. Create an issue in this repository with:
   - Detailed description of the problem
   - Steps to reproduce
   - Your environment details (OS, Ruby version, etc.)
   - Any relevant error messages