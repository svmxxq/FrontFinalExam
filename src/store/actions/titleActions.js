export const updateExampleData = (data) => ({
    type: 'EXAMPLE_ACTION',
    payload: data,
});

export const updateHeaderTitle = (title) => ({
    type: 'UPDATE_HEADER_TITLE',
    payload: title,
});
