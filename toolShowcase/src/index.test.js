const tools = require('./assets/tools.json');

test('check if tools list is correct', () => {
    expect(tools.length).toBe(10);
    expect(tools[0].name).toBe('Webpack');
});