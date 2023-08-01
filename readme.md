# Link Sanitizer Browser Extension

Removes all sort of tracking parameters in URL's you open.
There are lots of similar extensions but this one I can most certainly trust. I would suggest you to be careful as well, giving random browser extensions access to your complete browsing history.

> If you encounter any issues or have suggestions for improvements, feel free to open an issue or a pull request.

<img width="263" alt="image" src="https://github.com/anthonyringoet/link-sanitizer-extension/assets/576905/ea170742-4cb8-4daf-8279-c0424ea923db">

## Testing

This extension doesn't require a traditional "build" step, as it's composed of raw JavaScript that both Chrome and Firefox can run directly. To test it, you'll want to load the extension in your browser and navigate to various websites.

## Zip for distribution

```sh
zip -r link-sanitizer-extension.zip . -x "*todo.txt*" "*.zip" "*.gitignore" "*.md" ".git/*"
```

### Loading the Extension in Chrome/Edge

1. Open Chrome and navigate to `chrome://extensions` or `edge://extensions`.
2. Enable "Developer mode" in the top right corner if it's not already enabled.
3. Click on "Load unpacked".
4. Navigate to the directory containing the `manifest.json` file, and select it.
5. The extension should now be loaded in Chrome. You can navigate to a site with tracking parameters in the URL to see it in action.

### Loading the Extension in Firefox

1. Open Firefox and navigate to `about:debugging`.
2. Click on "This Firefox".
3. Click on "Load Temporary Add-on…".
4. Navigate to your extension's directory and select any file (e.g., `manifest.json`).
5. Firefox will load your extension for the current session.
