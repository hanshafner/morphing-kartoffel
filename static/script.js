// static/script.js
document.addEventListener("DOMContentLoaded", function () {
    const gradient1 = document.getElementById('gradient1');
    const gradient2 = document.getElementById('gradient2');

    let lastRadius = generateRandomBorderRadius();
    updateBorderRadiusKeyframes(lastRadius, lastRadius);

    // Initialize with initial colors
    let colors1 = [generateRandomColor(), generateRandomColor()];
    let colors2 = [generateRandomColor(), generateRandomColor()];

    gradient1.style.background = `linear-gradient(to right, ${colors1[0]}, ${colors1[1]})`;
    gradient2.style.background = `linear-gradient(to right, ${colors2[0]}, ${colors2[1]})`;
    gradient2.style.opacity = 0;  // Start with gradient2 invisible

    let toggle = true;

    setInterval(() => {
        const nextRadius = generateRandomBorderRadius();
        updateBorderRadiusKeyframes(lastRadius, nextRadius);
        lastRadius = nextRadius;

      // Prepare next set of colors based on the last set of the other gradient
        if (toggle) {
            colors2 = [colors1[0], colors1[1]];  // Copy end colors from gradient1 to start for gradient2
            colors2 = [generateRandomColor(), generateRandomColor()]; // Then generate new ending colors
            gradient2.style.background = `linear-gradient(to right, ${colors2[0]}, ${colors2[1]})`;
            gradient1.style.opacity = 0;
            gradient2.style.opacity = 1;
        } else {
            colors1 = [colors2[0], colors2[1]]; // Copy end colors from gradient2 to start for gradient1
            colors1 = [generateRandomColor(), generateRandomColor()]; // Then generate new ending colors
            gradient1.style.background = `linear-gradient(to right, ${colors1[0]}, ${colors1[1]})`;
            gradient1.style.opacity = 1;
            gradient2.style.opacity = 0;
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
