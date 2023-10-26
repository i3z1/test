document.addEventListener('DOMContentLoaded', function() {
    const changeTextButton = document.getElementById('changeText');

    changeTextButton.addEventListener('click', function() {
        const mainParagraph = document.querySelector('main p');
        mainParagraph.textContent = 'You clicked the button!';
    });
});
