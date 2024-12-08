let isActive = false;

// Listener for the extension icon click
chrome.action.onClicked.addListener((tab) => {
    // Toggle the state
    isActive = !isActive;

    // Update the icon based on the toggle state
    const iconPath = isActive ? 'active.png' : 'deactivate.png';
    chrome.action.setIcon({ path: iconPath, tabId: tab.id });

    // Dynamically inject content script into the active tab if not already injected
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: toggleExtension
        },
        () => {
            // Send a message to the content script to toggle functionality
            chrome.tabs.sendMessage(tab.id, { action: 'toggle' });
        }
    );
});

// Function to be injected into the page
function toggleExtension() {
    // Toggle font-family showing functionality
    if (typeof isActive === 'undefined') {
        let isActive = false;
    }

    // Function to show the font-family
    function showFontFamily(event) {
        const fontFamily = getComputedStyle(event.target).fontFamily;
        let tooltip = document.createElement('div');
        tooltip.innerText = fontFamily;
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#000';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '4px 8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = '10000';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.className = 'font-tooltip';
        document.body.appendChild(tooltip);

        event.target.addEventListener('mouseleave', () => {
            tooltip.remove();
        });

        event.target.addEventListener('mousemove', (e) => {
            tooltip.style.top = `${e.pageY + 10}px`;
            tooltip.style.left = `${e.pageX + 10}px`;
        });
    }

    // Activate or deactivate the extension
    function toggleExtension() {
        if (isActive) {
            document.removeEventListener('mouseover', showFontFamily);
        } else {
            document.addEventListener('mouseover', showFontFamily);
        }
        isActive = !isActive;
    }
}
