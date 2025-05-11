/**
 * Navigation utility functions for consistent navigation handling
 */

/**
 * Navigate to a specific route
 * This function provides a consistent way to handle navigation
 * throughout the application and can be extended with analytics or other features
 * 
 * @param {string} path - The path to navigate to
 * @param {boolean} replaceState - Whether to replace the current history entry
 * @param {boolean} forceReload - Whether to force a page reload
 */
export function navigate(path, replaceState = false, forceReload = false) {
  if (forceReload) {
    // Force a full page reload
    window.location.href = path;
    return;
  }
  
  if (replaceState) {
    // Replace the current history entry
    window.history.replaceState({}, '', path);
    
    // Force Next.js router to recognize the change
    window.dispatchEvent(new PopStateEvent('popstate'));
    return;
  }
  
  // Standard navigation - push a new history entry
  window.history.pushState({}, '', path);
  
  // Force Next.js router to recognize the change
  window.dispatchEvent(new PopStateEvent('popstate'));
}

/**
 * Navigate back in history
 */
export function goBack() {
  window.history.back();
} 