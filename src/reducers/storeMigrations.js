const migrations = {
    0: (state) => ({
        ...state,
        auth: {},
    }),
    1: (state) => ({
        ...state,
        auth: {},
    }),
};

const lastVersion = Object.keys(migrations)[Object.keys(migrations).length - 1];

export { migrations, lastVersion };
