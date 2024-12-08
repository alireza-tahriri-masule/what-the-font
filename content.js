// Declare the variable in global scope
let isActive = false;

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

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggle') {
        toggleExtension();
    }
});
