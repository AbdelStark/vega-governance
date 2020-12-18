const settings = buildSettings();

function buildSettings() {
    if (localStorage.getItem('settings')) {
        return settingsFromLocalStorage();
    }
    const settings = defaultSettings();
    localStorage.setItem("settings", JSON.stringify(settings));
    return settings;
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

function updateSettingsOnLocalStorage(updater) {
    console.log('updating settings on local storage');
    try {
        const settings = JSON.parse(localStorage.getItem('settings'));

        updater(settings);
        localStorage.setItem("settings", JSON.stringify(settings));
    } catch (e) {
        console.error(e);
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
export {settingsFromLocalStorage, updateSettingsOnLocalStorage}
