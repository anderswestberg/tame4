"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
const tame_1 = require("../tame");
const dynamic_1 = require("set-interval-async/dynamic");
class AdsWebService {
    constructor(url, amsNetId, configFileUrl = undefined, amsPort = "851") {
        this.url = url;
        this.amsNetId = amsNetId;
        this.configFileUrl = configFileUrl;
        this.amsPort = amsPort;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var plc = new tame_1.TAME({
                        serviceUrl: this.url,
                        amsNetId: this.amsNetId,
                        amsPort: this.amsPort,
                        configFileUrl: this.configFileUrl,
                        adsCheckInterval: 500,
                        onReady: function () {
                            resolve(plc);
                        }
                    });
                    yield plc.open();
                }
                catch (ex) {
                    reject(ex);
                }
            }));
        });
    }
}
exports.AdsWebService = AdsWebService;
exports.plcInit = (isCX8190 = true, useConfigFile = false) => __awaiter(void 0, void 0, void 0, function* () {
    let http = "";
    let host = "";
    let amsNetId = "";
    let configFileUrl = undefined;
    let useProxy = false;
    if (isCX8190) {
        http = "https";
        amsNetId = "5.73.47.143.1.1";
        //host = window.document.location.hostname
        host = "192.168.2.3";
        useProxy = true;
        configFileUrl = "PLC1.tpy";
    }
    else {
        http = "http";
        amsNetId = "81.170.174.167.1.1";
        host = "192.168.2.4";
        useProxy = true;
        configFileUrl = "PLC1.tpy";
    }
    let url = "";
    let proxy = "";
    if (useProxy)
        proxy = "http://localhost:8080/";
    url = proxy + http + "://" + host + "/TcAdsWebService/TcAdsWebService.dll";
    const service = new AdsWebService(url, amsNetId, useConfigFile ? proxy + http + "://" + host + "/" + configFileUrl : undefined);
    return yield service.init();
});
exports.testPlc = () => __awaiter(void 0, void 0, void 0, function* () {
    let plc = yield exports.plcInit(true, false);
    window.myVar = 0;
    window.myStruct = {};
    const divAdsState = document.getElementById("div_AdsState");
    const divDeviceState = document.getElementById("div_DeviceState");
    const divRead = document.getElementById("div_Read");
    const divWrite = document.getElementById("div_Write");
    let writeValue = 0;
    dynamic_1.setIntervalAsync(() => __awaiter(void 0, void 0, void 0, function* () {
        let readValue = yield plc.readDint({ name: "MAIN.Counter", jvar: "myVar" });
        if (readValue) {
            console.log(readValue);
            divRead.innerHTML = readValue.toString();
        }
        else
            console.log("Read error");
        //let struct = await plc?.readStruct({name: "MAIN.PlcStruct", jvar: "myStruct"})
        //console.log((window as any).myStruct)
        yield plc.writeTime({ name: "MAIN.time1b", val: writeValue++ });
        divWrite.innerHTML = writeValue.toString();
        divAdsState.innerHTML = plc.adsStateTxt;
        divDeviceState.innerHTML = plc.deviceState;
    }), 100);
});
exports.testPlc();
//# sourceMappingURL=test.js.map