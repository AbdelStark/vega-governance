const settings = buildSettings();

function buildSettings() {
    if (localStorage.getItem('settings')) {
        return settingsFromLocalStorage();
    }
    return defaultSettings();
}

function settingsFromLocalStorage() {
    console.log('retrieving settings from local storage');
    try {
        return JSON.parse(localStorage.getItem('settings'));
    } catch (e) {
        console.error(e);
        localStorage.removeItem('settings');
        return defaultSettings();
    }
}

function defaultSettings() {
    console.log('loading default application settings');
    return {
        vega: {
            wallet: {
                endpoint: 'https://wallet.testnet.vega.xyz',
            },
            governance: {
                endpoint: 'https://lb.testnet.vega.xyz/query',
            }
        }
    };
}

export default settings;