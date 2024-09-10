import './styles/main.scss';
import tools from './assets/tools.json';
import _ from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
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
});