// static/script.js
document.addEventListener("DOMContentLoaded", function () {
    const gradient1 = document.getElementById('gradient1');
    const gradient2 = document.getElementById('gradient2');

    let lastRadius = generateRandomBorderRadius();
    updateBorderRadiusKeyframes(lastRadius, lastRadius);

    let toggle = false;

    // Initialize gradients at start
    gradient1.style.background = `linear-gradient(to right, ${generateRandomColor()}, ${generateRandomColor()})`;
    gradient2.style.background = `linear-gradient(to right, ${generateRandomColor()}, ${generateRandomColor()})`;

    setInterval(() => {
        const nextRadius = generateRandomBorderRadius();
        updateBorderRadiusKeyframes(lastRadius, nextRadius);
        lastRadius = nextRadius;

        if (toggle) {
            // Prepare next gradient in the background
            gradient2.style.background = `linear-gradient(to right, ${generateRandomColor()}, ${generateRandomColor()})`;
            // Smooth transition
            gradient1.style.opacity = 1;
            gradient2.style.opacity = 0;
        } else {
            // Prepare next gradient in the background
            gradient1.style.background = `linear-gradient(to right, ${generateRandomColor()}, ${generateRandomColor()})`;
            // Smooth transition
            gradient1.style.opacity = 0;
            gradient2.style.opacity = 1;
        }
        toggle = !toggle;

    }, 2000); // Adjust this as needed to sync with the CSS animation duration
});

function updateBorderRadiusKeyframes(startRadius, endRadius) {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = `
        @keyframes morph-radius {
            from { border-radius: ${startRadius}; }
            to { border-radius: ${endRadius}; }
        }
    `;
    // Replace the previous style element
    const previousStyle = document.head.querySelector('style[type="text/css"]');
    if (previousStyle) {
        document.head.removeChild(previousStyle);
    }
    document.head.appendChild(styleSheet);
}

function generateRandomBorderRadius() {
    let topLeft = 10 + Math.random() * 90;
    let topRight = 10 + Math.random() * 90;
    let bottomRight = 10 + Math.random() * 90;
    let bottomLeft = 10 + Math.random() * 90;
    return `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`;
}

function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}
