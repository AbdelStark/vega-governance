import VegaWallet from "@/services/VegaWallet";
import VegaGovernanceMock from "@/services/mock/VegaGovernanceMock";
import VegaGovernance from "@/services/VegaGovernance";
import settings from "@/settings";

const services = buildMockServices();

function buildMockServices() {
    return {
        vegaWallet: new VegaWallet(settings.vega.wallet.endpoint),
        vegaGovernance: new VegaGovernanceMock(),
    };
}

function buildServices() {
    return {
        vegaWallet: new VegaWallet(settings.vega.wallet.endpoint),
        vegaGovernance: new VegaGovernance(settings.vega.governance.endpoint),
    };
}

export default services;
