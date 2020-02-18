import 'babel-polyfill'
import { TAME } from '../tame'
import { setIntervalAsync } from 'set-interval-async/dynamic'

export class AdsWebService {
    constructor(public url: string, public amsNetId: string, public configFileUrl: string | undefined = undefined, public amsPort = "851") {
    }
    async init() {
        return new Promise<TAME>(async (resolve, reject) => {
            try {
                var plc = new TAME({
                    serviceUrl: this.url,
                    amsNetId: this.amsNetId,
                    amsPort: this.amsPort,
                    configFileUrl: this.configFileUrl,
                    adsCheckInterval: 500,
                    onReady: function () {
                        resolve(plc)
                    }
                })
                await plc.open();
            } catch (ex) {
                reject(ex)
            }
        })
    }
}

export const plcInit = async (isCX8190 = true, useConfigFile = false) => {
    let http = ""
    let host = ""
    let amsNetId = ""
    let configFileUrl = undefined
    let useProxy = false
    if (isCX8190) {
        http = "https"
        amsNetId = "5.73.47.143.1.1"
        //host = window.document.location.hostname
        host = "192.168.2.3"
        useProxy = true
        configFileUrl = "PLC1.tpy"
    } else {
        http = "http"
        amsNetId = "81.170.174.167.1.1"
        host = "192.168.2.4"
        useProxy = true
        configFileUrl = "PLC1.tpy"
    }
    let url = ""
    let proxy = ""
    if (useProxy)
        proxy = "http://localhost:8080/"
    url = proxy + http + "://" + host + "/TcAdsWebService/TcAdsWebService.dll"
    const service = new AdsWebService(url, amsNetId, useConfigFile ? proxy + http + "://" + host + "/" + configFileUrl : undefined)
    return await service.init()
}

export const testPlc = async () => {
    let plc = await plcInit(true, false)
    ;(window as any).myVar = 0
    ;(window as any).myStruct = {}
    const divAdsState = document.getElementById("div_AdsState")
    const divDeviceState = document.getElementById("div_DeviceState")
    const divRead = document.getElementById("div_Read")
    const divWrite = document.getElementById("div_Write")
    let writeValue = 0
    setIntervalAsync(async () => {
        let readValue = await plc.readDint({name:"MAIN.Counter", jvar:"myVar"})
        if (readValue) {
            console.log(readValue)
            divRead.innerHTML = readValue.toString()
        } else
            console.log("Read error")
        //let struct = await plc?.readStruct({name: "MAIN.PlcStruct", jvar: "myStruct"})
        //console.log((window as any).myStruct)
        await plc.writeTime({ name:"MAIN.time1b", val: writeValue++ })
        divWrite.innerHTML = writeValue.toString()
        divAdsState.innerHTML = plc.adsStateTxt
        divDeviceState.innerHTML = plc.deviceState
    }, 100)
}

testPlc()
