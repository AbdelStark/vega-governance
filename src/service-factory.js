import VegaWallet from "@/services/VegaWallet";
import VegaGovernanceMock from "@/services/mock/VegaGovernanceMock";
import VegaGovernance from "@/services/VegaGovernance";
import settings from "@/settings";

//const services = buildMockServices();
const services = buildServices();


function buildMockServices() {
    return {
        vegaWallet: new VegaWallet(settings.vega.wallet.endpoint),
        vegaGovernance: new VegaGovernanceMock(),
    };
}

function buildServices() {
    return {
        vegaWallet: new VegaWallet(settings.vega.wallet.endpoint, localStorage.getItem("vega-token")),
        vegaGovernance: new VegaGovernance(settings.vega.governance.endpoint),
    };
}

function buildServicesFromSettings(settings) {
    return {
        vegaWallet: new VegaWallet(settings.vega.wallet.endpoint, localStorage.getItem("vega-token")),
        vegaGovernance: new VegaGovernance(settings.vega.governance.endpoint),
    };
}


export default services;
export {buildServices, buildServicesFromSettings}
