import tools from './assets/tools.json';

function createToolCards() {
    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';

    const toolContainer = document.createElement('div');
    toolContainer.className = 'tool-container';

    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';

        const toolName = document.createElement('h2');
        toolName.textContent = tool.name;

        const toolDescription = document.createElement('p');
        toolDescription.textContent = tool.description;

        toolCard.appendChild(toolName);
        toolCard.appendChild(toolDescription);
        toolContainer.appendChild(toolCard);
    });

    contentDiv.appendChild(toolContainer);
    return contentDiv;
}

test('check if tools list is correct', () => {
    expect(tools.length).toBe(10);
    expect(tools[0].name).toBe('Webpack');
});

test('renders tools in the DOM', () => {
    document.body.innerHTML = '<div id="content"></div>';
    const contentDiv = createToolCards();
    document.body.appendChild(contentDiv);
    const toolCards = document.querySelectorAll('.tool-card');

    expect(toolCards.length).toBe(10);

    const firstToolCard = toolCards[0];
    expect(firstToolCard.querySelector('h2').textContent).toBe('Webpack');
    expect(firstToolCard.querySelector('p').textContent).toBe(tools[0].description);
});