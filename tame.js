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
class TAME {
    constructor(service) {
        this.service = service;
        this.version = 'V4.3.1 171120';
        this.weekdShortNames = {
            ge: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        };
        this.weekdLongNames = {
            ge: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        };
        this.monthsShortNames = {
            ge: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dez']
        };
        this.monthsLongNames = {
            ge: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        };
        this.indexGroups = {
            M: 16416,
            MX: 16417,
            DB: 16448,
            I: 61472,
            IX: 61473,
            Q: 61488,
            QX: 61489,
            Upload: 61451,
            UploadInfo: 61452,
            HandleByName: 61443,
            ValueByHandle: 61445,
            ReleaseHandle: 61446,
            SumRd: 61568,
            SumWr: 61569,
            SumRdWr: 61570 //SumUpReadWriteRequest
        };
        //Lenght of PLC data types in bytes.
        this.plcTypeLen = {
            BOOL: 1,
            BYTE: 1,
            USINT: 1,
            SINT: 1,
            WORD: 2,
            UINT: 2,
            INT: 2,
            INT16: 2,
            INT1DP: 2,
            INT2DP: 2,
            DWORD: 4,
            UDINT: 4,
            DINT: 4,
            TIME: 4,
            TOD: 4,
            TIME_OF_DAY: 4,
            DATE: 4,
            DT: 4,
            DATE_AND_TIME: 4,
            POINTER: 4,
            REAL: 4,
            LREAL: 8,
            STRING: 80,
            EndStruct: 0 //should be 0!
        };
        //ADS states
        this.adsStates = [
            "INVALID",
            "IDLE",
            "RESET",
            "INIT",
            "START",
            "RUN",
            "STOP",
            "SAVECFG",
            "POWERGOOD",
            "ERROR",
            "SHUTDOWN",
            "SUSPEND",
            "RESUME",
            "CONFIG",
            "RECONFIG"
        ];
        this.symTable = {};
        this.dataTypeTable = {};
        this.serviceInfo = {};
        this.handleCache = {};
        //Generate a Base64 alphabet for the encoder. Using an array or object to
        //store the alphabet the en-/decoder runs faster than with the commonly
        //used string. At least with the browsers of 2009. ;-)
        this.b64Enc = (() => {
            var ret = {}, str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', i;
            for (i = 0; i < str.length; i++) {
                ret[i] = str.charAt(i);
            }
            return ret;
        })();
        //Generate a Base64 alphabet for the decoder.
        this.b64Dec = (() => {
            var ret = {}, str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', i;
            for (i = 0; i < str.length; i++) {
                ret[str.charAt(i)] = i;
            }
            return ret;
        })();
        /**
         * The shortcuts for reading and writing data.
         *
         * @param {Object} args
         */
        this.writeBool = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'BOOL', args); });
        this.writeByte = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'BYTE', args); });
        this.writeUsint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'USINT', args); });
        this.writeSint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'SINT', args); });
        this.writeWord = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'WORD', args); });
        this.writeUint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'UINT', args); });
        this.writeInt = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'INT', args); });
        this.writeInt1Dp = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'INT1DP', args); });
        this.writeInt2Dp = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'INT2DP', args); });
        this.writeDword = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'DWORD', args); });
        this.writeUdint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'UDINT', args); });
        this.writeDint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'DINT', args); });
        this.writeReal = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'REAL', args); });
        this.writeLreal = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'LREAL', args); });
        this.writeString = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'STRING', args); });
        this.writeTime = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'TIME', args); });
        this.writeTod = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'TOD', args); });
        this.writeDate = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'DATE', args); });
        this.writeDt = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.writeSingle('Write', 'DT', args); });
        this.readBool = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'BOOL', args); });
        this.readByte = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'BYTE', args); });
        this.readUsint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'USINT', args); });
        this.readSint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'SINT', args); });
        this.readWord = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'WORD', args); });
        this.readUint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'UINT', args); });
        this.readInt = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'INT', args); });
        this.readInt1Dp = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'INT1DP', args); });
        this.readInt2Dp = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'INT2DP', args); });
        this.readDword = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'DWORD', args); });
        this.readUdint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'UDINT', args); });
        this.readDint = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'DINT', args); });
        this.readReal = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'REAL', args); });
        this.readLreal = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'LREAL', args); });
        this.readString = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'STRING', args); });
        this.readTime = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'TIME', args); });
        this.readTod = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'TOD', args); });
        this.readDate = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'DATE', args); });
        this.readDt = (args) => __awaiter(this, void 0, void 0, function* () { return yield this.readSingle('Read', 'DT', args); });
        this.writeStruct = (args) => this.createStructDescriptor('Write', args);
        this.readStruct = (args) => this.createStructDescriptor('Read', args);
        this.writeArrayOfBool = (args) => this.createArrayDescriptor('Write', 'BOOL', args);
        this.writeArrayOfByte = (args) => this.createArrayDescriptor('Write', 'BYTE', args);
        this.writeArrayOfUsint = (args) => this.createArrayDescriptor('Write', 'USINT', args);
        this.writeArrayOfSint = (args) => this.createArrayDescriptor('Write', 'SINT', args);
        this.writeArrayOfWord = (args) => this.createArrayDescriptor('Write', 'WORD', args);
        this.writeArrayOfUint = (args) => this.createArrayDescriptor('Write', 'UINT', args);
        this.writeArrayOfInt = (args) => this.createArrayDescriptor('Write', 'INT', args);
        this.writeArrayOfInt1Dp = (args) => this.createArrayDescriptor('Write', 'INT1DP', args);
        this.writeArrayOfInt2Dp = (args) => this.createArrayDescriptor('Write', 'INT2DP', args);
        this.writeArrayOfDword = (args) => this.createArrayDescriptor('Write', 'DWORD', args);
        this.writeArrayOfUdint = (args) => this.createArrayDescriptor('Write', 'UDINT', args);
        this.writeArrayOfDint = (args) => this.createArrayDescriptor('Write', 'DINT', args);
        this.writeArrayOfReal = (args) => this.createArrayDescriptor('Write', 'REAL', args);
        this.writeArrayOfLreal = (args) => this.createArrayDescriptor('Write', 'LREAL', args);
        this.writeArrayOfString = (args) => this.createArrayDescriptor('Write', 'STRING', args);
        this.writeArrayOfTime = (args) => this.createArrayDescriptor('Write', 'TIME', args);
        this.writeArrayOfTod = (args) => this.createArrayDescriptor('Write', 'TOD', args);
        this.writeArrayOfDate = (args) => this.createArrayDescriptor('Write', 'DATE', args);
        this.writeArrayOfDt = (args) => this.createArrayDescriptor('Write', 'DT', args);
        this.writeArrayOfStruct = (args) => this.createArrayDescriptor('Write', 'STRUCT', args);
        this.readArrayOfBool = (args) => this.createArrayDescriptor('Read', 'BOOL', args);
        this.readArrayOfByte = (args) => this.createArrayDescriptor('Read', 'BYTE', args);
        this.readArrayOfUsint = (args) => this.createArrayDescriptor('Read', 'USINT', args);
        this.readArrayOfSint = (args) => this.createArrayDescriptor('Read', 'SINT', args);
        this.readArrayOfWord = (args) => this.createArrayDescriptor('Read', 'WORD', args);
        this.readArrayOfUint = (args) => this.createArrayDescriptor('Read', 'UINT', args);
        this.readArrayOfInt = (args) => this.createArrayDescriptor('Read', 'INT', args);
        this.readArrayOfInt1Dp = (args) => this.createArrayDescriptor('Read', 'INT1DP', args);
        this.readArrayOfInt2Dp = (args) => this.createArrayDescriptor('Read', 'INT2DP', args);
        this.readArrayOfDword = (args) => this.createArrayDescriptor('Read', 'DWORD', args);
        this.readArrayOfUdint = (args) => this.createArrayDescriptor('Read', 'UDINT', args);
        this.readArrayOfDint = (args) => this.createArrayDescriptor('Read', 'DINT', args);
        this.readArrayOfReal = (args) => this.createArrayDescriptor('Read', 'REAL', args);
        this.readArrayOfLreal = (args) => this.createArrayDescriptor('Read', 'LREAL', args);
        this.readArrayOfString = (args) => this.createArrayDescriptor('Read', 'STRING', args);
        this.readArrayOfTime = (args) => this.createArrayDescriptor('Read', 'TIME', args);
        this.readArrayOfTod = (args) => this.createArrayDescriptor('Read', 'TOD', args);
        this.readArrayOfDate = (args) => this.createArrayDescriptor('Read', 'DATE', args);
        this.readArrayOfDt = (args) => this.createArrayDescriptor('Read', 'DT', args);
        this.readArrayOfStruct = (args) => this.createArrayDescriptor('Read', 'STRUCT', args);
        this.configXmlHttpReq = null;
        this.log('TAME library version: ' + this.version);
        //Set language for names of days and months, default is german.
        this.lang = (typeof service.language === 'string') ? service.language : 'ge',
            //Alignment
            this.alignment = 0,
            //Array for the request acknowledgement counter.
            this.currReq = [0],
            //The Symbol Table for accessing variables per name.
            this.symTable = {},
            //this.symTableOk = false,
            this.dataTypeTable = {},
            //this.dataTypeTableOk = false,
            this.serviceInfo = {},
            //Variables of the UploadInfo 
            this.symbolCount = 0, this.uploadLength = 0,
            //Object to store the handles
            this.handleCache = {},
            this.handleNames = [];
        //======================================================================================
        //                                Check Client Parameter
        //======================================================================================
        //URL of the TcAdsWebService.dll
        if (typeof service.serviceUrl !== 'string') {
            this.log('TAME library error: Service URL is not a string!');
            return;
        }
        //AMS NetID of the PLC
        if (typeof service.amsNetId !== 'string' && (typeof service.configFileUrl !== 'string' || service.dontFetchSymbols === true)) {
            this.log('TAME library error: NetId is not defined and there is no URL for fetching the TPY file or fetching the symbols is deactivated!');
            return;
        }
        //AMS Port Number of the Runtime System
        if (service.amsPort === undefined && (typeof service.configFileUrl !== 'string' || service.dontFetchSymbols === true)) {
            service.amsPort = '801';
            this.log('TAME library warning: AMS port number is not set! Default port 801 will be used.');
        }
        else if (typeof service.amsPort === 'number') {
            this.log('TAME library warning: AMS port number is not a string! Trying to convert it.');
            service.amsPort = service.amsPort.toString(10);
        }
        if (parseInt(service.amsPort, 10) < 801 || parseInt(service.amsPort, 10) > 891) {
            this.log('TAME library error: AMS Port Number (' + parseInt(service.amsPort, 10) + ') is out of range (801-891)!');
            return;
        }
        //Data alignment, x86 and TC2 uses a 1 byte alignment, for an ARM and TC2 set it to 4 and
        //for TC3 generally to 8; 
        //dataAlign4 is depricated
        if (service.dataAlign4 === true) {
            this.alignment = 4;
        }
        else if (service.alignment === undefined && (typeof service.configFileUrl !== 'string' || service.dontFetchSymbols === true)) {
            this.alignment = 1;
        }
        else if (typeof service.alignment === 'string') {
            this.alignment = parseInt(service.alignment, 10);
        }
        else if (typeof service.alignment === 'number') {
            this.alignment = service.alignment;
        }
        //Global synchronous XMLHTTPRequests
        if (service.syncXmlHttp === true) {
            this.log('TAME library info: The "syncXmlHttp" parameter is set to true. Synchronous XMLHttpRequests will be used by default.');
        }
        else {
            //Don't let it undefined
            service.syncXmlHttp = false;
        }
        //Username/password
        if (typeof service.serviceUser === 'string' && typeof service.servicePassword === 'string') {
            this.log('TAME library info: Username and password set. Authenticated requests will be used.');
        }
        else {
            service.serviceUser = null;
            service.servicePassword = null;
        }
        //Global use of handles
        if (service.useHandles === true) {
            this.log('TAME library info: The "useHandles" parameter is set to true. Handles will be used by default.');
        }
        //Don't check for missing data types (thats a problem with some TwinCAT libs)
        if (service.skipMissingTypes === true) {
            this.log('TAME library info: The "skipMissingTypes" parameter is set to true. TAME just drops a log message if there are TwinCAT libs with missing data types.');
        }
        else {
            service.skipMissingTypes = false;
        }
        //Cyclic ADS checks (experimental).
        if (!isNaN(service.adsCheckInterval) && service.adsCheckInterval >= 1) {
            this.log('TAME library info: Cyclic ADS state checks enabled. Interval time: ' + service.adsCheckInterval + ' ms.');
        }
        //======================================================================================
        //                                Initialize Properties
        //======================================================================================
        //Set language specific names of days and months.
        this.dateNames = {
            weekdShort: this.weekdShortNames[this.lang],
            weekdLong: this.weekdLongNames[this.lang],
            monthsShort: this.monthsShortNames[this.lang],
            monthsLong: this.monthsLongNames[this.lang]
        };
        //Maximum string length.
        this.maxStringLen = 255;
        //Maximum count of dropped requests after a request
        //was not acknowledged (in conjunction with a reqest ID).
        this.maxDropReq = 10;
        //Check limits of numeric variables before sending them to the PLC
        this.useCheckBounds = true;
        //ADS states
        this.adsState = null;
        this.adsStateTxt = '';
        this.deviceState = null;
        //Ready states
        this.symTableReady = false;
        this.dataTypeTableReady = false;
        this.handleCacheReady = false;
        //XMLHttpRequest timeout
        this.xmlHttpReqTimeout = 5000;
        /**
         * Get the names of the PLC variables using the upload info.
         */
        if (service.dontFetchSymbols === true) {
            this.log('TAME library warning: Reading of the UploadInfo and the TPY file deactivated. Symbol Table could not be created.');
            if (this.alignment !== 1 && this.alignment !== 4 && this.alignment !== 8) {
                this.log('TAME library warning: The value for the alignment should be 1, 4 or 8.');
            }
            this.log('TAME library info: Target information: NetId: ' + service.amsNetId + ', AMS port: ' + service.amsPort + ' , alignment: ' + this.alignment);
            if (service.syncXmlHttp !== true) {
                window.setTimeout(this.onReady, 1);
            }
        }
        else {
            if (typeof service.configFileUrl == 'string') {
                this.log('TAME library info: Fetching the TPY file from the webserver.');
                //Get the symbol file and parse it. Upload Info will be fetched after.
                this.getConfigFile();
            }
            else {
                //Start getting the Upload Info.
                this.checkGetUploadInfo();
            }
        }
    }
    log(message) {
        try {
            window.console.log(message);
        }
        catch (e) {
            alert(message);
        }
    }
    //======================================================================================
    //                                 Helper Functions
    //======================================================================================
    /**
     * Decode variable names passed as strings and return the object,
     * store data values if they are passed too.
     *
     * @param {String} name     The name of a JavaScript variable or a property.
     * @param {Object} data     Data values to store in the variable/property.
     * @param {Object} obj      The object containing the property to store the data in.
     *                          Used with createArrayDescriptor and createStructDescriptor
     *                          for better performance.
     */
    parseVarName(name, data, obj, prefix, suffix) {
        var arr = [], last = 0, a = [], i = 0;
        if (typeof name === 'number') {
            arr[0] = name.toString(10);
        }
        else if (typeof name === 'string') {
            arr = name.split('.');
        }
        else {
            this.log('TAME library error: Can\'t parse name of object/variable. Name is not a string or number!');
            this.log(name);
            return;
        }
        if (obj === undefined) {
            obj = window;
        }
        last = arr.length - 1;
        //Walk through the tiers
        while (i < last) {
            //Check if the passed name points to an array.
            if (arr[i].charAt(arr[i].length - 1) === ']') {
                a = arr[i].substring(0, arr[i].length - 1).split('[');
                obj = obj[a[0]][a[1]];
            }
            else {
                //Create an array if object is not defined.
                //This can happen when an array of structure is
                //not defined.
                if (obj[arr[i]] === undefined) {
                    obj[arr[i]] = [];
                }
                obj = obj[arr[i]];
            }
            i++;
        }
        //Last element
        if (arr[i].charAt(arr[i].length - 1) === ']') {
            //If last item of the name is an array
            a = arr[i].substring(0, arr[i].length - 1).split('[');
            obj = obj[a[0]];
            //Store data if passed.
            if (data !== undefined) {
                if (typeof prefix === 'string') {
                    data = prefix + data;
                }
                if (typeof suffix === 'string') {
                    data = data + suffix;
                }
                obj[a[1]] = data;
            }
            return obj[a[1]];
        }
        //Store data if passed.
        if (data !== undefined) {
            if (typeof prefix === 'string') {
                data = prefix + data;
            }
            if (typeof suffix === 'string') {
                data = data + suffix;
            }
            obj[arr[i]] = data;
        }
        return obj[arr[i]];
    }
    /**
     * Check if a passed string length is valid.
     *
     * @param {Number} len
     */
    isValidStringLen(len) {
        if (len === undefined) {
            return false;
        }
        if (!isNaN(len) && len > 0 && len <= this.maxStringLen) {
            return true;
        }
        this.log('TAME library error: User defined string length not valid! length: ' + len);
        this.log('Max. string length: ' + this.maxStringLen);
        return false;
    }
    /**
     * The function returns the IndexGroup for a PLC variable address.
     *
     * @param {Object} req          An object with the address or the name for the request.
     * @return {Number} indexGroup  The IndexGroup for the ADS request.
     */
    getIndexGroup(req) {
        var indexGroup;
        if (req.addr) {
            //Try to get the IndexGroup by address
            if (typeof req.addr === 'string' && req.addr.charAt(0) === '%') {
                if (req.addr.charAt(2) === 'X') {
                    //Bit addresses.
                    indexGroup = this.indexGroups[req.addr.substr(1, 2)];
                }
                else {
                    //Byte addresses.
                    indexGroup = this.indexGroups[req.addr.substr(1, 1)];
                }
            }
            else {
                this.log('TAME library error: Wrong address definition, should be a string and start with "%"!');
                this.log(req);
                return;
            }
        }
        else if (req.useHandle === true || this.service.useHandles === true && req.useHandle !== false) {
            //Get the IndexGroup for the Value By Handle Request
            indexGroup = this.indexGroups.ValueByHandle;
        }
        else if (req.symbolName) {
            //Try to get the IndexGroup by name
            if (typeof req.symbolName === 'string') {
                try {
                    indexGroup = this.symTable[req.symbolName].indexGroup;
                }
                catch (e) {
                    this.log('TAME library error: Can\'t get the IndexGroup for this request!');
                    this.log('TAME library error: Please check the variable name.');
                    this.log(e);
                    this.log(req);
                    return;
                }
            }
            else {
                this.log('TAME library error: Varible name should be a string!');
                this.log(req);
                return;
            }
        }
        else {
            this.log('TAME library error: No name, address or handle for the variable/request defined!');
            this.log(req);
            return;
        }
        if (isNaN(indexGroup)) {
            this.log('TAME library error: IndexGroup is not a number, check address or name definition of the variable/request!');
            this.log(req);
        }
        return indexGroup;
    }
    /**
     * The function returns the IndexOffset for a PLC variable address.
     *
     * @param {Object} req          An object with the address or the name for the request.
     * @return {Number} indexOffset The IndexOffset for the ADS request.
     */
    getIndexOffset(req) {
        var indexOffset, numString = '', mxaddr = [], i, dataType, itemArray, splittedType, bitoffs, subitem;
        if (req.addr) {
            //Try to get the IndexOffset by address
            if (typeof req.addr === 'string' && req.addr.charAt(0) === '%') {
                if (req.addr.charAt(2) === 'X') {
                    //Bit req.addresses.
                    numString = req.addr.substr(3);
                    mxaddr = numString.split('.');
                    indexOffset = parseInt(mxaddr[0], 10) * 8 + parseInt(mxaddr[1], 10);
                }
                else {
                    //Byte addresses.
                    indexOffset = parseInt(req.addr.substr(3), 10);
                    //Address offset is used if only one item of an array
                    //should be sent.
                    if (typeof req.addrOffset === 'number') {
                        indexOffset += req.addrOffset;
                    }
                }
            }
            else {
                this.log('TAME library error: Wrong address definition, should be a string and start with "%"!');
                this.log(req);
                return;
            }
        }
        else if (req.useHandle === true || this.service.useHandles === true && req.useHandle !== false) {
            //Try to get the handle for this request
            if (this.handleCacheReady === true) {
                //Get handle code
                indexOffset = this.handleCache[req.fullSymbolName];
                if (isNaN(indexOffset)) {
                    this.log('TAME library error: Could not get the handle for this symbol name: ' + req.fullSymbolName);
                    this.log(req);
                    return;
                }
            }
            else {
                this.log('TAME library error: Could not get the handle for this request. Handle cache is not ready.');
                this.log(req);
                return;
            }
        }
        else if (req.symbolName) {
            //Try to get the IndexOffset by name.
            if (typeof req.symbolName === 'string') {
                try {
                    //Get the offset from the symbol table
                    indexOffset = this.symTable[req.symbolName].indexOffset;
                    if (typeof req.symbolNameArrIdx === 'number') {
                        indexOffset += this.symTable[req.symbolName].itemSize * (req.symbolNameArrIdx - this.symTable[req.symbolName].arrStartIdx);
                    }
                    //Address offset is used if only one item of an array
                    //should be sent.
                    if (typeof req.addrOffset === 'number') {
                        indexOffset += req.addrOffset;
                    }
                    //Add a manually defined bit offset.
                    if (typeof req.offs === 'string') {
                        indexOffset += parseInt(req.offs, 10) / 8;
                    }
                    else if (typeof req.offs === 'number') {
                        indexOffset += req.offs / 8;
                    }
                    //Get the bit offset if a subitem is given.
                    if (req.dataTypeNames.length > 0) {
                        itemArray = req.dataTypeNames;
                        dataType = this.symTable[req.symbolName].dataType;
                        //Go through the array with the subitems and add the offsets
                        for (i = 0; i < itemArray.length; i++) {
                            subitem = this.dataTypeTable[dataType].subItems[itemArray[i]];
                            indexOffset += subitem.bitOffset / 8;
                            //Calculate the offset.
                            if (typeof req.dataTypeArrIdx[i] === 'number') {
                                indexOffset += subitem.itemSize * (req.dataTypeArrIdx[i] - subitem.arrStartIdx);
                            }
                            //Get the data type for the next round
                            dataType = this.dataTypeTable[dataType].subItems[itemArray[i]].dataType;
                        }
                    }
                }
                catch (e) {
                    this.log('TAME library error: Can\'t get the IndexOffset for this request!');
                    this.log('TAME library error: Please check the variable definition (name/offs/subitem).');
                    this.log(e);
                    this.log(req);
                    return;
                }
            }
            else {
                this.log('TAME library error: Varible name should be a string!');
                this.log(req);
                return;
            }
        }
        else {
            this.log('TAME library error: Neither a name nor an address for the variable/request defined!');
            this.log(req);
            return;
        }
        if (isNaN(indexOffset)) {
            this.log('TAME library error: IndexOffset is not a number, check address or name definition of the variable/request.');
            this.log('IndexOffset: ' + indexOffset);
            this.log(req);
        }
        return indexOffset;
    }
    /**
     * The function parses the PLC variable name, looks in the symbol and data type table and
     * returns an object with the necessary information.
     *
     * @param {Object} item          An object with at least the address or the name for the request.
     * @return {Objecct} itemInfo    An object with the information about the item.
     *
     */
    getItemInformation(item) {
        var itemInfo = {}, arrPlcVarName, splitType;
        if (typeof item.name === 'string') {
            item.name = item.name.toUpperCase();
            arrPlcVarName = item.name.split('.');
        }
        else {
            //Return if no symbol name is given
            return itemInfo;
        }
        //Get the symbol name.
        itemInfo.fullSymbolName = item.name;
        if (arrPlcVarName[0] === '') {
            //Global variable
            itemInfo.symbolName = '.' + arrPlcVarName[1];
        }
        else {
            //Variable of an instance
            itemInfo.symbolName = arrPlcVarName[0] + '.' + arrPlcVarName[1];
        }
        //Cut an array index
        if (itemInfo.symbolName.charAt(itemInfo.symbolName.length - 1) === ']') {
            //Cut the array index and store it
            splitType = itemInfo.symbolName.substring(0, itemInfo.symbolName.length - 1).split('[');
            itemInfo.symbolName = splitType[0];
            itemInfo.symbolNameArrIdx = parseInt(splitType[1], 10);
        }
        //Leave the rest as an array and add it to the itemInfo
        itemInfo.dataTypeNames = arrPlcVarName.slice(2);
        var arr = [], typeArray, dataType, i;
        //Get information from the tables
        if (this.symTableReady && this.dataTypeTableReady && itemInfo.dataTypeNames.length > 0) {
            //Try to get the subitem type from the symbol table && data type table
            typeArray = itemInfo.dataTypeNames;
            dataType = this.symTable[itemInfo.symbolName].dataType;
            itemInfo.dataTypeArrIdx = [];
            //Go for the last subitem
            i = 0;
            do {
                //Check if the subitem is an array
                if (typeArray[i].charAt(typeArray[i].length - 1) === ']') {
                    //Cut the array index and store it in an extra array
                    splitType = typeArray[i].substring(0, typeArray[i].length - 1).split('[');
                    typeArray[i] = splitType[0];
                    itemInfo.dataTypeArrIdx[i] = parseInt(splitType[1], 10);
                }
                if (this.dataTypeTable[dataType].subItems[typeArray[i]].pointer === true) {
                    this.log('TAME library error: PLC variable ' + [typeArray[i]] + ' is a pointer! Can\'t get the variable value.');
                }
                //Get the type of the next subitem
                if (i === typeArray.length - 1) {
                    break;
                }
                dataType = this.dataTypeTable[dataType].subItems[typeArray[i]].dataType;
                i++;
            } while (i < typeArray.length);
            //Get the type of the subitem
            try {
                itemInfo.type = this.dataTypeTable[dataType].subItems[typeArray[i]].type;
                itemInfo.arrayLength = this.dataTypeTable[dataType].subItems[typeArray[i]].arrayLength;
                itemInfo.arrayDataType = this.dataTypeTable[dataType].subItems[typeArray[i]].arrayDataType;
                itemInfo.dataType = this.dataTypeTable[dataType].subItems[typeArray[i]].dataType;
                itemInfo.itemSize = this.dataTypeTable[dataType].subItems[typeArray[i]].itemSize;
                if (itemInfo.size === undefined) {
                    itemInfo.size = this.dataTypeTable[dataType].subItems[typeArray[i]].size;
                }
                itemInfo.bitOffset = this.dataTypeTable[dataType].subItems[typeArray[i]].bitOffset;
                itemInfo.offs = item.offs;
                if (itemInfo.type === 'STRING' || itemInfo.arrayDataType === 'STRING') {
                    itemInfo.stringLength = this.dataTypeTable[dataType].subItems[typeArray[i]].stringLength;
                    itemInfo.format = itemInfo.stringLength; //compatibility
                }
                else if (typeof item.format === 'string') {
                    itemInfo.format = item.format;
                }
                else if (typeof item.decPlaces === 'number') {
                    itemInfo.format = item.decPlaces;
                }
                else if (typeof item.dp === 'number') {
                    itemInfo.format = item.dp;
                }
                if (itemInfo.dataTypeArrIdx[i] !== undefined && itemInfo.type === 'ARRAY') {
                    itemInfo.type = this.dataTypeTable[dataType].subItems[typeArray[i]].arrayDataType;
                    itemInfo.size = this.dataTypeTable[dataType].subItems[typeArray[i]].itemSize;
                }
            }
            catch (e) {
                this.log('TAME library error: A problem occured while reading a data type from the data type table!');
                this.log(e);
                this.log(item);
            }
        }
        else if (this.symTableReady) {
            //Try to get the type from the symbol table
            if (typeof this.symTable[item.name] == 'object') {
                try {
                    itemInfo.type = this.symTable[item.name].type;
                    itemInfo.arrayLength = this.symTable[item.name].arrayLength;
                    itemInfo.arrayDataType = this.symTable[item.name].arrayDataType;
                    itemInfo.dataType = this.symTable[item.name].dataType;
                    itemInfo.itemSize = this.symTable[item.name].itemSize;
                    if (itemInfo.size === undefined) {
                        itemInfo.size = this.symTable[item.name].size;
                    }
                    itemInfo.bitOffset = this.symTable[item.name].bitOffset;
                    itemInfo.offs = item.offs;
                    if (itemInfo.type === 'STRING' || itemInfo.arrayDataType === 'STRING') {
                        itemInfo.stringLength = this.symTable[item.name].stringLength;
                        itemInfo.format = itemInfo.stringLength; //compatibility
                    }
                    else if (typeof item.format === 'string') {
                        itemInfo.format = item.format;
                    }
                    else if (typeof item.decPlaces === 'number') {
                        itemInfo.format = item.decPlaces;
                    }
                    else if (typeof item.dp === 'number') {
                        itemInfo.format = item.dp;
                    }
                    if (itemInfo.symbolNameArrIdx !== undefined && itemInfo.type === 'ARRAY') {
                        itemInfo.type = this.symTable[item.name].arrayDataType;
                        itemInfo.size = this.symTable[item.name].itemSize;
                    }
                }
                catch (e) {
                    this.log('TAME library error: A problem occured while reading a data type from the symbol table!');
                    this.log(e);
                    this.log(item);
                }
            }
            else {
                if (typeof item.type != 'string') {
                    this.log('TAME library error: Neither an entry for this symbol in the symbol table nor the type defined by user!');
                    this.log(item);
                }
            }
        }
        //Override type if defined by user
        if (typeof item.type == 'string') {
            //Type is defined by user, try to split it
            arr = item.type.split('.');
            if (arr.length > 2) {
                //Join the formatting string if there were points in it.
                arr[1] = arr.slice(1).join('.');
            }
            //Set the user defined type if it's not an array or structure
            if (itemInfo.type !== 'ARRAY' && itemInfo.type !== 'USER') {
                itemInfo.type = arr[0];
            }
            //Type depending code
            if (itemInfo.type === 'STRING' && arr[1] !== undefined) {
                arr[1] = parseInt(arr[1], 10);
                if (this.isValidStringLen(arr[1])) {
                    itemInfo.format = arr[1];
                    itemInfo.stringLength = itemInfo.format;
                    itemInfo.size = itemInfo.format++; //Termination
                }
                else {
                    itemInfo.format = this.plcTypeLen.STRING;
                    this.log('TAME library warning: Length of string variable not defined: ' + item.name);
                    this.log('TAME library warning: A length of 80 characters (TwinCAT default) will be used.');
                }
            }
            else if (itemInfo.type === 'ARRAY') {
                //Quick and dirty
                itemInfo.arrayDataType = arr[0];
                itemInfo.format = arr[1];
                /*
                itemInfo.arrayLength = dataTypeTable[dataType].subItems[typeArray[i]].arrayLength;
                itemInfo.arrayDataType = dataTypeTable[dataType].subItems[typeArray[i]].arrayDataType;
                itemInfo.dataType = dataTypeTable[dataType].subItems[typeArray[i]].dataType;
                itemInfo.itemSize = dataTypeTable[dataType].subItems[typeArray[i]].itemSize;
                */
            }
            else if (itemInfo.type === 'USER') {
                /*
                Maybe in a future version.
                */
            }
            else {
                itemInfo.format = arr[1];
                itemInfo.size = this.plcTypeLen[itemInfo.type];
            }
            //Override format if extra information is given
            if (typeof item.format === 'string') {
                itemInfo.format = item.format;
            }
            else if (typeof item.decPlaces === 'number') {
                itemInfo.format = item.decPlaces;
            }
            else if (typeof item.dp === 'number') {
                itemInfo.format = item.dp;
            }
            /*
            this.log('item');
            this.log(item);
            this.log('itemInfo');
            this.log(itemInfo);
            */
        }
        if (typeof itemInfo.type != 'string') {
            this.log('TAME library error: Could not get the type of the item!');
            this.log(item);
        }
        /*
        this.log('itemInfo');
        this.log(itemInfo);
        */
        return itemInfo;
    }
    /**
     * This function creates a XMLHttpRequest object.
     *
     * @return {Object} xmlHttpReq  A XMLHttpRequest.
     */
    createXMLHttpReq() {
        var xmlHttpReq;
        if (window.XMLHttpRequest) {
            //Create the XMLHttpRequest object.
            //Mozilla, Opera, Safari and Internet Explorer (> v7)
            xmlHttpReq = new window.XMLHttpRequest();
        }
        else {
            //Internet Explorer 6 and older
            try {
                xmlHttpReq = new window.ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) {
                try {
                    xmlHttpReq = new window.ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (ex) {
                    xmlHttpReq = null;
                    this.log('TAME library error: Failed Creating XMLHttpRequest-Object!');
                }
            }
        }
        return xmlHttpReq;
    }
    adsReqSend(adsReq) {
        var soapReq;
        //Cancel the request, if the last on with the same ID is not finished.
        if (typeof adsReq.reqDescr.id === 'number' && this.currReq[adsReq.reqDescr.id] > 0) {
            this.log('TAME library warning: Request dropped (last request with ID ' + adsReq.reqDescr.id + ' not finished!)');
            this.currReq[adsReq.reqDescr.id]++;
            if (this.currReq[adsReq.reqDescr.id] <= this.maxDropReq) {
                return;
            }
            //Automatic acknowleding after a count of 'maxDropReq' to
            //prevent stucking.
            this.currReq[adsReq.reqDescr.id] = 0;
        }
        //Create the XMLHttpRequest object.
        this.xmlHttpReq = this.createXMLHttpReq();
        //Generate the SOAP request.
        soapReq = '<?xml version=\'1.0\' encoding=\'utf-8\'?>';
        soapReq += '<soap:Envelope xmlns:xsi=\'http://www.w3.org/2001/XMLSchema-instance\' ';
        soapReq += 'xmlns:xsd=\'http://www.w3.org/2001/XMLSchema\' ';
        soapReq += 'xmlns:soap=\'http://schemas.xmlsoap.org/soap/envelope/\'>';
        soapReq += '<soap:Body><q1:';
        soapReq += adsReq.method;
        soapReq += ' xmlns:q1=\'http://beckhoff.org/message/\'><netId xsi:type=\'xsd:string\'>';
        soapReq += this.service.amsNetId;
        soapReq += '</netId><nPort xsi:type=\'xsd:int\'>';
        soapReq += this.service.amsPort;
        soapReq += '</nPort>';
        if (adsReq.indexGroup !== undefined) {
            soapReq += '<indexGroup xsi:type=\'xsd:unsignedInt\'>';
            soapReq += adsReq.indexGroup;
            soapReq += '</indexGroup>';
        }
        if (adsReq.indexOffset !== undefined) {
            soapReq += '<indexOffset xsi:type=\'xsd:unsignedInt\'>';
            soapReq += adsReq.indexOffset;
            soapReq += '</indexOffset>';
        }
        if ((adsReq.method === 'Read' || adsReq.method === 'ReadWrite') && adsReq.reqDescr.readLength > 0) {
            soapReq += '<cbRdLen xsi:type=\'xsd:int\'>';
            soapReq += adsReq.reqDescr.readLength;
            soapReq += '</cbRdLen>';
        }
        if (adsReq.pData && adsReq.pData.length > 0) {
            soapReq += '<pData xsi:type=\'xsd:base64Binary\'>';
            soapReq += adsReq.pData;
            soapReq += '</pData>';
        }
        if (adsReq.pwrData && adsReq.pwrData.length > 0) {
            soapReq += '<pwrData xsi:type=\'xsd:base64Binary\'>';
            soapReq += adsReq.pwrData;
            soapReq += '</pwrData>';
        }
        soapReq += '</q1:';
        soapReq += adsReq.method;
        soapReq += '></soap:Body></soap:Envelope>';
        //Send the AJAX request.
        if (typeof this.xmlHttpReq === 'object') {
            this.xmlHttpReq.open('POST', this.service.serviceUrl, true, this.service.serviceUser, this.service.servicePassword);
            this.xmlHttpReq.setRequestHeader('SOAPAction', 'http://beckhoff.org/action/TcAdsSync.' + adsReq.method);
            this.xmlHttpReq.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
            this.xmlHttpReq.timeout = this.xmlHttpReqTimeout;
            this.xmlHttpReq.ontimeout = (e) => {
                this.log('TAME library error: XMLHttpRequest timed out. Timeout ' + this.xmlHttpReqTimeout + ' milliseconds.');
                this.log(e);
                if (typeof adsReq.reqDescr.ot === 'function') {
                    //on timeout function
                    adsReq.reqDescr.ot();
                }
            };
            this.xmlHttpReq.onreadystatechange = () => {
                if (this.xmlHttpReq.readyState === 4) {
                    if (this.xmlHttpReq.status === 200) {
                        //request OK
                        this.parseResponse(adsReq);
                    }
                    else {
                        //request failed
                        this.log('TAME library error: XMLHttpRequest returns an error. Status code : ' + this.xmlHttpReq.status);
                        if (typeof adsReq.reqDescr.oe === 'function') {
                            //on error function
                            adsReq.reqDescr.oe();
                        }
                    }
                }
            };
            this.xmlHttpReq.send(soapReq);
            //Request with index 'id' sent.
            if (typeof adsReq.reqDescr.id === 'number') {
                this.currReq[adsReq.reqDescr.id] = 1;
            }
        }
    }
    adsReqSendAsync(adsReq) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var soapReq;
                //Cancel the request, if the last on with the same ID is not finished.
                if (typeof adsReq.reqDescr.id === 'number' && this.currReq[adsReq.reqDescr.id] > 0) {
                    this.log('TAME library warning: Request dropped (last request with ID ' + adsReq.reqDescr.id + ' not finished!)');
                    this.currReq[adsReq.reqDescr.id]++;
                    if (this.currReq[adsReq.reqDescr.id] <= this.maxDropReq) {
                        return;
                    }
                    //Automatic acknowleding after a count of 'maxDropReq' to
                    //prevent stucking.
                    this.currReq[adsReq.reqDescr.id] = 0;
                }
                //Create the XMLHttpRequest object.
                this.xmlHttpReq = this.createXMLHttpReq();
                //Generate the SOAP request.
                soapReq = '<?xml version=\'1.0\' encoding=\'utf-8\'?>';
                soapReq += '<soap:Envelope xmlns:xsi=\'http://www.w3.org/2001/XMLSchema-instance\' ';
                soapReq += 'xmlns:xsd=\'http://www.w3.org/2001/XMLSchema\' ';
                soapReq += 'xmlns:soap=\'http://schemas.xmlsoap.org/soap/envelope/\'>';
                soapReq += '<soap:Body><q1:';
                soapReq += adsReq.method;
                soapReq += ' xmlns:q1=\'http://beckhoff.org/message/\'><netId xsi:type=\'xsd:string\'>';
                soapReq += this.service.amsNetId;
                soapReq += '</netId><nPort xsi:type=\'xsd:int\'>';
                soapReq += this.service.amsPort;
                soapReq += '</nPort>';
                if (adsReq.indexGroup !== undefined) {
                    soapReq += '<indexGroup xsi:type=\'xsd:unsignedInt\'>';
                    soapReq += adsReq.indexGroup;
                    soapReq += '</indexGroup>';
                }
                if (adsReq.indexOffset !== undefined) {
                    soapReq += '<indexOffset xsi:type=\'xsd:unsignedInt\'>';
                    soapReq += adsReq.indexOffset;
                    soapReq += '</indexOffset>';
                }
                if ((adsReq.method === 'Read' || adsReq.method === 'ReadWrite') && adsReq.reqDescr.readLength > 0) {
                    soapReq += '<cbRdLen xsi:type=\'xsd:int\'>';
                    soapReq += adsReq.reqDescr.readLength;
                    soapReq += '</cbRdLen>';
                }
                if (adsReq.pData && adsReq.pData.length > 0) {
                    soapReq += '<pData xsi:type=\'xsd:base64Binary\'>';
                    soapReq += adsReq.pData;
                    soapReq += '</pData>';
                }
                if (adsReq.pwrData && adsReq.pwrData.length > 0) {
                    soapReq += '<pwrData xsi:type=\'xsd:base64Binary\'>';
                    soapReq += adsReq.pwrData;
                    soapReq += '</pwrData>';
                }
                soapReq += '</q1:';
                soapReq += adsReq.method;
                soapReq += '></soap:Body></soap:Envelope>';
                //Send the AJAX request.
                if (typeof this.xmlHttpReq === 'object') {
                    this.xmlHttpReq.open('POST', this.service.serviceUrl, true, this.service.serviceUser, this.service.servicePassword);
                    this.xmlHttpReq.setRequestHeader('SOAPAction', 'http://beckhoff.org/action/TcAdsSync.' + adsReq.method);
                    this.xmlHttpReq.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                    this.xmlHttpReq.timeout = this.xmlHttpReqTimeout;
                    this.xmlHttpReq.ontimeout = (e) => {
                        this.log('TAME library error: XMLHttpRequest timed out. Timeout ' + this.xmlHttpReqTimeout + ' milliseconds.');
                        this.log(e);
                        if (typeof adsReq.reqDescr.ot === 'function') {
                            //on timeout function
                            adsReq.reqDescr.ot();
                        }
                        reject(e);
                    };
                    this.xmlHttpReq.onreadystatechange = () => {
                        if (this.xmlHttpReq.readyState === 4) {
                            if (this.xmlHttpReq.status === 200) {
                                //request OK                           
                                resolve(this.parseResponse(adsReq));
                            }
                            else {
                                //request failed
                                this.log('TAME library error: XMLHttpRequest returns an error. Status code : ' + this.xmlHttpReq.status);
                                if (typeof adsReq.reqDescr.oe === 'function') {
                                    //on error function
                                    adsReq.reqDescr.oe();
                                }
                                reject('TAME library error: XMLHttpRequest returns an error. Status code : ' + this.xmlHttpReq.status);
                            }
                        }
                    };
                    this.xmlHttpReq.send(soapReq);
                    //Request with index 'id' sent.
                    if (typeof adsReq.reqDescr.id === 'number') {
                        this.currReq[adsReq.reqDescr.id] = 1;
                    }
                }
            });
        });
    }
    /**
     * Create the objects for SOAP and XMLHttpRequest and send the request.
     *
     * @param {Object} adsReq   The object containing the arguments of the ADS request.
     */
    createRequest(adsReq) {
        if (adsReq.reqDescr === undefined) {
            adsReq.reqDescr = {};
        }
        else if (adsReq.reqDescr.debug) {
            this.log(adsReq);
        }
        adsReq.send = () => this.adsReqSend(adsReq);
        return adsReq;
    }
    /**
     * Function for checking the input values when writing numeric PLC variables.
     *
     * @param {Object} item
     * @param {String} type
     * @param {Number} min
     * @param {Number} max
     */
    checkValue(item, type, min, max) {
        var val;
        //Test if value is valid.
        if (typeof item.val === 'string') {
            if (type === 'REAL' || type === 'LREAL') {
                val = parseFloat(item.val);
            }
            else {
                val = parseInt(item.val, 10);
            }
        }
        else if (typeof item.val === 'number') {
            val = item.val;
        }
        else {
            this.log('TAME library error: Wrong variable type for a numeric variable in write request!');
            this.log('TAME library error: Variable type should be number or string, but is ' + typeof item.val);
            this.log(item);
            val = 0;
        }
        if (isNaN(val)) {
            val = 0;
            this.log('TAME library error: Value of a numeric variable in write request is not a number.');
            this.log(item);
        }
        //Check bounds
        if (this.useCheckBounds === true) {
            if (type === 'LREAL') {
                if (!isFinite(val)) {
                    this.log('TAME library warning: Limit for LREAL value exceeded!');
                    this.log('Upper limit: ' + Number.MAX_VALUE);
                    this.log('Lower limit: ' + Number.MIN_VALUE);
                    this.log('value: ' + val);
                    this.log(item);
                }
            }
            else if (type === 'REAL') {
                if (val > 0) {
                    if (val < 1.175495e-38) {
                        this.log('TAME library warning: Lower limit for positive REAL value exceeded!');
                        this.log('limit: 1.175495e-38');
                        this.log('value: ' + val);
                        this.log(item);
                        val = 1.175495e-38;
                    }
                    else if (val > 3.402823e+38) {
                        this.log('TAME library warning: Upper limit for positive REAL value exceeded!');
                        this.log('limit: 3.402823e+38');
                        this.log('value: ' + val);
                        this.log(item);
                        val = 3.402823e+38;
                    }
                }
                else if (val < 0) {
                    if (val > -1.175495e-38) {
                        this.log('TAME library warning: Upper limit for negative REAL value exceeded!');
                        this.log('limit: -1.175495e-38');
                        this.log('value: ' + val);
                        this.log(item);
                        val = -1.175495e-38;
                    }
                    else if (val < -3.402823e+38) {
                        this.log('TAME library warning: Lower limit for negative REAL value exceeded!');
                        this.log('limit: -3.402823e+38');
                        this.log('value: ' + val);
                        this.log(item);
                        val = -3.402823e+38;
                    }
                }
            }
            else {
                if (val < min) {
                    this.log('TAME library warning: Lower limit for numeric value exceeded!');
                    this.log('type: ' + type);
                    this.log('limit: ' + min);
                    this.log('value: ' + val);
                    this.log(item);
                    val = min;
                }
                else if (val > max) {
                    this.log('TAME library warning: Upper limit for numeric value exceeded!');
                    this.log('type: ' + type);
                    this.log('limit: ' + max);
                    this.log('value: ' + val);
                    this.log(item);
                    val = max;
                }
            }
        }
        return val;
    }
    /**
     * Get type and format and return it in an array. Create an
     * item.type entry if it doesn't exist.
     *
     * @param {Object} item     An item of a variable list.
     * @return {Array} arr      An array with type and format.
     */
    getTypeAndFormat(item) {
        var arr = [], typeArray, dataType, i;
        if (typeof item.type === 'string') {
            //Type is defined
            arr = item.type.split('.');
            if (arr.length > 2) {
                //Join the formatting string if there were points in it.
                arr[1] = arr.slice(1).join('.');
            }
        }
        else {
            this.log('TAME library error: Could not get the type of the item (function getTypeAndFormat())!');
            this.log(item);
        }
        return arr;
    }
    /**
     * Create a structure definition based on the information in the data table.
     *
     * @param {String}  structname  The name of the structure in the data table.
     * @return {Object} struct      An object containing the items of the structure.
     */
    createStructDef(structname) {
        var struct = {}, subitem, subitems;
        subitems = this.dataTypeTable[structname].subItems;
        for (subitem in subitems) {
            if (subitems[subitem].type === "USER") {
                //Creating a nested structue definition works, but parsing doesn't
                this.log('TAME library error: Automatic creating of nested structures is not supported (yet)!');
                struct[subitem] = this.createStructDef(subitems[subitem].dataType);
            }
            else {
                if (subitems.hasOwnProperty(subitem)) {
                    struct[subitem] = subitems[subitem].fullType;
                }
            }
        }
        return struct;
    }
    //======================================================================================
    //                                  Encoder Functions
    //======================================================================================
    /**
     * Conversion of ASCII(0-9, a-f, A-F) charcodes to numbers 0-15
     *
     * @param {Number} charcode
     */
    charcodeToDual(charcode) {
        if ((charcode >= 0x61) && (charcode <= 0x66)) {
            return (charcode - 0x57); //a-f
        }
        if ((charcode >= 0x41) && (charcode <= 0x46)) {
            return (charcode - 0x37); //A-F
        }
        if ((charcode >= 0x30) && (charcode <= 0x39)) {
            return (charcode - 0x30); //0-9
        }
        return 0;
    }
    /**
     * Convert a number into an array of bytes.
     *
     * @param {Number} value
     * @param {Number} varlen
     */
    numToByteArr(value, varlen) {
        var bytes = [], hex = value.toString(16), i;
        while (hex.length < varlen * 2) {
            hex = '0' + hex;
        }
        for (i = 0; i < varlen; i++) {
            bytes[(varlen - 1) - i] =
                ((this.charcodeToDual(hex.charCodeAt(i * 2)) * 16) +
                    this.charcodeToDual(hex.charCodeAt((i * 2) + 1)));
        }
        return bytes;
    }
    /**
     * Convert a JavaScript floating point number to a PLC REAL value.
     *
     * @param {Number} num
     */
    floatToReal(num) {
        var mant = 0, real = 0, bas, abs, tmp, exp, i;
        abs = Math.abs(num);
        if (num !== 0) {
            //Find exponent and base.
            for (i = 128; i > -127; i--) {
                tmp = abs / Math.pow(2, i);
                if (tmp >= 2) {
                    break;
                }
                exp = i;
                bas = tmp;
            }
            exp += 127;
            bas = bas.toString(2);
            //Create the mantissa.
            for (i = 2; i < 25; i++) {
                mant <<= 1;
                if (bas.charAt(i) === '1') {
                    mant += 1;
                }
            }
            if (bas.charAt(25) === '1') {
                mant += 1;
            }
            //Create the REAL value.
            real = exp; //exponent
            real <<= 23;
            real += mant; //mantissa
            if (num < 0) {
                //Create negative sign.
                real += 2147483648;
            }
        }
        return real;
    }
    /**
         * Convert a JavaScript floating point number to a PLC LREAL value.
         * Cause it's a 64 bit value, we have to split it in two 32 bit integer.
         *
         * @param {Number} num
         */
    floatToLreal(num) {
        var mant = 0, mant2 = 0, lreal = {
            part1: 0,
            part2: 0
        }, abs, tmp, exp, firstbit, bas, i;
        abs = Math.abs(num);
        if (num !== 0) {
            //Find exponent and base.
            for (i = 1024; i >= -1023; i--) {
                tmp = abs / Math.pow(2, i);
                if (tmp >= 2) {
                    break;
                }
                exp = i;
                bas = tmp;
            }
            exp += 1023;
            bas = bas.toString(2);
            //Create the mantissa.
            for (i = 2; i < 22; i++) {
                mant <<= 1;
                if (bas.charAt(i) === '1') {
                    mant += 1;
                }
            }
            if (bas.charAt(i) === '1') {
                firstbit = true;
            }
            i++;
            for (i; i < 54; i++) {
                mant2 <<= 1;
                if (bas.charAt(i) === '1') {
                    mant2 += 1;
                }
            }
            //Create the LREAL value.
            lreal.part1 = exp; //exponent
            lreal.part1 <<= 20;
            lreal.part1 += mant; //mantissa
            if (num < 0) {
                //Create negative sign.
                lreal.part1 += 2147483648;
            }
            lreal.part2 = mant2;
            if (firstbit === true) {
                lreal.part2 += 2147483648;
            }
        }
        return lreal;
    }
    /**
     * Convert a value to value in milliseconds, depending
     * on the format string.
     *
     * @param {Number} time
     * @param {String} format
     */
    toMillisec(time, format) {
        var tmp;
        switch (format) {
            case '#d':
            case '#dd':
                tmp = time * 86400000; //days
                break;
            case '#h':
            case '#hh':
                tmp = time * 3600000; //hours
                break;
            case '#m':
            case '#mm':
                tmp = time * 60000; //minutes
                break;
            case '#s':
            case '#ss':
                tmp = time * 1000; //seconds
                break;
            case '#ms':
            case '#msmsms': //milliseconds
                tmp = time;
                break;
            default:
                tmp = time;
                break;
        }
        return tmp;
    }
    /**
     * Convert a TOD string to a value of milliseconds.
     *
     * @param {Number} time
     * @param {String} format
     */
    stringToTime(timestring, format) {
        var arrFormat = format.split('#'), arrlen = arrFormat.length, regex = /:|\.|-|_/, time = 0, cnt = 0, tmp, i, arrValues, splitterOk;
        //Check if a valid splitter is given
        for (i = 1; i < arrlen; i++) {
            if (regex.test(arrFormat[i]) === true) {
                splitterOk = true;
            }
        }
        if (splitterOk !== true) {
            this.log('TAME library error: No separator ( : . - _ ) for TOD string found!');
            this.log('String: ' + timestring);
            this.log('Format: ' + format);
            //Although we could try to split the timestring in case of a 
            //wrong formatting string, we don't do it.
            return 0;
        }
        arrValues = timestring.split(regex);
        for (i = 1; i < arrlen; i++) {
            switch (arrFormat[i]) {
                case 'h':
                case 'hh':
                    tmp = parseInt(arrValues[cnt], 10) * 3600000;
                    cnt++;
                    break;
                case 'm':
                case 'mm':
                    tmp = parseInt(arrValues[cnt], 10) * 60000;
                    cnt++;
                    break;
                case 's':
                case 'ss':
                    tmp = parseInt(arrValues[cnt], 10) * 1000;
                    cnt++;
                    break;
                case 'ms':
                case 'msmsms':
                    tmp = parseInt(arrValues[cnt], 10);
                    cnt++;
                    break;
                default:
                    tmp = 0;
            }
            time += tmp;
        }
        return time;
    }
    /**
     * Base64 encoder
     *
     * @param {Array} data
     */
    encodeBase64(data) {
        return btoa(String.fromCharCode(...data));
    }
    /**
     * Function for converting the data values to a byte array.
     *
     * @param {Object} item     An item of the item list of a request descriptor.
     * @param {String} type     Contains the data type
     * @param {String} format   The formatting string.
     * @param {Number} len      Data length.
     * @return {Array} bytes    An array containing the data as byte values.
     */
    dataToByteArray(item, type, format, len) {
        var bytes = [], val, strlen, sl, i;
        //If no value is passed, set value to zero and log an error message.
        if (item.val === undefined) {
            switch (type) {
                case 'STRING':
                    item.val = '';
                    break;
                case 'DATE':
                case 'DT':
                case 'TOD':
                case 'TIME_OF_DAY':
                case 'DATE_AND_TIME':
                    item.val = new Date();
                    break;
                default:
                    item.val = 0;
                    break;
            }
            this.log('TAME library warning: Value of a variable in write request is not defined!');
            this.log(item);
        }
        //Depending on the data type, convert the values to a byte array.
        switch (type) {
            case 'BOOL':
                if (item.val) {
                    bytes[0] = 1;
                }
                else {
                    bytes[0] = 0;
                }
                break;
            case 'BYTE':
            case 'USINT':
                val = this.checkValue(item, type, 0, 255);
                bytes = this.numToByteArr(val, len);
                break;
            case 'SINT':
                val = this.checkValue(item, type, -128, 127);
                if (val < 0) {
                    val = val + 256;
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'WORD':
            case 'UINT':
                val = this.checkValue(item, type, 0, 65535);
                bytes = this.numToByteArr(val, len);
                break;
            case 'INT':
            case 'INT16':
                val = this.checkValue(item, type, -32768, 32767);
                if (val < 0) {
                    val = val + 65536;
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'INT1DP':
                item.val = Math.round(item.val * 10);
                val = this.checkValue(item, type, -32768, 32767);
                if (val < 0) {
                    val = val + 65536;
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'INT2DP':
                item.val = Math.round(item.val * 100);
                val = this.checkValue(item, type, -32768, 32767);
                if (val < 0) {
                    val = val + 65536;
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'DWORD':
            case 'UDINT':
                val = this.checkValue(item, type, 0, 4294967295);
                bytes = this.numToByteArr(val, len);
                break;
            case 'DINT':
                val = this.checkValue(item, type, -2147483648, 2147483647);
                if (val < 0) {
                    val = val + 4294967296;
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'REAL':
                val = this.checkValue(item, type, -2147483648, 2147483647);
                val = this.floatToReal(val);
                bytes = this.numToByteArr(val, len);
                break;
            case 'LREAL':
                val = this.checkValue(item, type, -2147483648, 2147483647);
                val = this.floatToLreal(val);
                //Length set to 4, cause type length is 8 and there are 2 parts
                bytes = this.numToByteArr(val.part2, 4);
                bytes = bytes.concat(this.numToByteArr(val.part1, 4));
                break;
            case 'DATE':
                if (typeof item.val === 'object') {
                    //Delete the time portion.
                    item.val.setHours(0);
                    item.val.setMinutes(0);
                    item.val.setSeconds(0);
                    //Convert the date object in seconds since 1.1.1970 and
                    //set the time zone to UTC.
                    val = item.val.getTime() / 1000 - item.val.getTimezoneOffset() * 60;
                }
                else {
                    this.log('TAME library error: Value of a DATE variable in write request is not a date object!');
                    this.log(item);
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'DT':
            case 'DATE_AND_TIME':
                if (typeof item.val === 'object') {
                    //Convert the date object in seconds since 1.1.1970 and
                    //set the time zone to UTC.
                    val = item.val.getTime() / 1000 - item.val.getTimezoneOffset() * 60;
                }
                else {
                    this.log('TAME library error: Value of a DT variable in write request is not a date object!');
                    this.log(item);
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'TOD':
            case 'TIME_OF_DAY':
                if (typeof item.val === 'object') {
                    //Delete the date portion.
                    item.val.setYear(1970);
                    item.val.setMonth(0);
                    item.val.setDate(1);
                    //Convert the date object in seconds since 1.1.1970 and
                    //set the time zone to UTC.
                    val = item.val.getTime() - item.val.getTimezoneOffset() * 60000;
                }
                else if (typeof item.val === 'string') {
                    //If the time value is a string
                    if (format === '' || format === undefined) {
                        format = '#hh#:#mm';
                        this.log('TAME library warning: No format given for TOD string! Using default #hh#:#mm.');
                        this.log(item);
                    }
                    val = this.stringToTime(item.val, format);
                }
                else {
                    this.log('TAME library error: TOD value in write request is wether a date object nor a string!');
                    this.log(item);
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'STRING':
                //If no length is given, set it to 80 characters (TwinCAT default).                 
                strlen = (format === undefined) ? this.plcTypeLen.STRING : parseInt(format, 10);
                if (this.isValidStringLen(strlen)) {
                    //If the given string length is valid and shorter then the string
                    //then use the given value to avoid an overflow, otherwise use
                    //the real string length.
                    sl = strlen < item.val.length ? strlen : item.val.length;
                    for (i = 0; i < sl; i++) {
                        bytes[i] = item.val.charCodeAt(i);
                    }
                    //Fill the string up to the given length, if necessary.
                    for (i; i < strlen; i++) {
                        bytes[i] = 0;
                    }
                    //Termination, the real string length in the PLC is
                    //the defined length + 1.
                    bytes[i] = 0;
                }
                break;
            case 'TIME':
                val = parseInt(item.val, 10);
                if (isNaN(val)) {
                    this.log('TAME library warning: Value of a TIME variable in write request is not defined!');
                    this.log(item);
                    val = 0;
                }
                val = this.toMillisec(val, format);
                if (val < 0) {
                    val = 0;
                    this.log('TAME library warning: Lower limit for TIME variable in write request exceeded!)');
                    this.log('value: ' + item.val + format);
                    this.log(item);
                }
                else if (val > 4294967295) {
                    val = 4294967295;
                    this.log('TAME library warning: Upper limit for TIME variable in write request exceeded!)');
                    this.log('value: ' + item.val + format);
                    this.log(item);
                }
                bytes = this.numToByteArr(val, len);
                break;
            case 'EndStruct':
                //Do nothing.
                break;
            default:
                this.log('TAME library error: Unknown data type in write request : ' + type);
                break;
        }
        return bytes;
    }
    //======================================================================================
    //                                  Decoder Functions
    //======================================================================================
    /**
     * Convert a number to a hex string.
     *
     * @param {Number} value
     */
    numToHexString(value) {
        var ret = value.toString(16);
        if ((ret.length % 2) !== 0) {
            ret = '0' + ret;
        }
        return ret;
    }
    /**
     * Set a fixed length of an integer by adding leading
     * zeros(i.e. change 2 to 02).
     *
     * @param {Number} numb
     * @param {Number} places
     */
    fixNumbLength(numb, places) {
        places = (isNaN(places)) ? 0 : places;
        var str = numb.toString(10);
        while (str.length < places) {
            str = '0' + str;
        }
        return str;
    }
    /**
     * Convert a date object to a formatted string.
     *
     * @param {Date} time
     * @param {String} format
     */
    dateToString(time, format) {
        var arr = format.split('#'), arrlen = arr.length, tstring = '', tmp, i;
        for (i = 1; i < arrlen; i++) {
            switch (arr[i]) {
                //Date formatting.
                case 'D':
                    tmp = time.getDate();
                    break;
                case 'DD':
                    tmp = time.getDate();
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 'WD':
                    tmp = time.getDay();
                    break;
                case 'WKD':
                    tmp = this.dateNames.weekdShort[time.getDay()];
                    break;
                case 'WEEKDAY':
                    tmp = this.dateNames.weekdLong[time.getDay()];
                    break;
                case 'M':
                    tmp = time.getMonth() + 1;
                    break;
                case 'MM':
                    tmp = time.getMonth() + 1;
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 'MON':
                    tmp = this.dateNames.monthsShort[time.getMonth()];
                    break;
                case 'MONTH':
                    tmp = this.dateNames.monthsLong[time.getMonth()];
                    break;
                case 'YY':
                    tmp = time.getYear();
                    while (tmp > 100) {
                        tmp -= 100;
                    }
                    break;
                case 'YYYY':
                    tmp = time.getFullYear();
                    break;
                //Time formatting.
                case 'h':
                    tmp = time.getHours();
                    break;
                case 'hh':
                    tmp = time.getHours();
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 'm':
                    tmp = time.getMinutes();
                    break;
                case 'mm':
                    tmp = time.getMinutes();
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 's':
                    tmp = time.getSeconds();
                    break;
                case 'ss':
                    tmp = time.getSeconds();
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 'ms':
                    tmp = time.getMilliseconds();
                    break;
                case 'msmsms':
                    tmp = time.getMilliseconds();
                    tmp = this.fixNumbLength(tmp, 3);
                    break;
                default:
                    tmp = arr[i];
                    break;
            }
            tstring = tstring + tmp;
        }
        return tstring;
    }
    /**
     * Convert a number with a value in milliseconds to a formatted string.
     *
     * @param {Number} time
     * @param {String} format
     */
    timeToString(time, format) {
        var arr = format.split('#'), arrlen = arr.length, tstring = '', tmp, i;
        for (i = 1; i < arrlen; i++) {
            switch (arr[i]) {
                case 'd':
                    if (arrlen <= 2) {
                        tmp = time / 86400000;
                    }
                    else {
                        tmp = Math.floor(time / 86400000);
                        time = time % 86400000;
                    }
                    break;
                case 'dd':
                    if (arrlen <= 2) {
                        tmp = time / 86400000;
                    }
                    else {
                        tmp = Math.floor(time / 86400000);
                        time = time % 86400000;
                    }
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 'h':
                    if (arrlen <= 2) {
                        tmp = time / 3600000;
                    }
                    else {
                        tmp = Math.floor(time / 3600000);
                        time = time % 3600000;
                    }
                    break;
                case 'hh':
                    if (arrlen <= 2) {
                        tmp = time / 3600000;
                    }
                    else {
                        tmp = Math.floor(time / 3600000);
                        time = time % 3600000;
                    }
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 'm':
                    if (arrlen <= 2) {
                        tmp = time / 60000;
                    }
                    else {
                        tmp = Math.floor(time / 60000);
                        time = time % 60000;
                    }
                    break;
                case 'mm':
                    if (arrlen <= 2) {
                        tmp = time / 60000;
                    }
                    else {
                        tmp = Math.floor(time / 60000);
                        time = time % 60000;
                    }
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 's':
                    if (arrlen <= 2) {
                        tmp = time / 1000;
                    }
                    else {
                        tmp = Math.floor(time / 1000);
                        time = time % 1000;
                    }
                    break;
                case 'ss':
                    if (arrlen <= 2) {
                        tmp = time / 1000;
                    }
                    else {
                        tmp = Math.floor(time / 1000);
                        time = time % 1000;
                    }
                    tmp = this.fixNumbLength(tmp, 2);
                    break;
                case 'ms':
                    tmp = time;
                    break;
                case 'msmsms':
                    tmp = time;
                    tmp = this.fixNumbLength(tmp, 3);
                    break;
                default:
                    tmp = arr[i];
                    break;
            }
            tstring = tstring + tmp;
        }
        return tstring;
    }
    /**
     * Convert data string to USINT/BYTE.
     *
     * @param {String} string
     */
    parsePlcUsint(string) {
        var hexs = this.numToHexString(string.charCodeAt(0));
        return parseInt(hexs, 16);
    }
    /**
     * Convert data string to SINT.
     *
     * @param {String} string
     */
    parsePlcSint(string) {
        var dec = this.parsePlcUsint(string);
        if (dec > 127) {
            dec = dec - 256;
        }
        return dec;
    }
    /**
     * Convert data string to UINT/WORD.
     *
     * @param {String} string
     */
    parsePlcUint(string) {
        var hexs = this.numToHexString(string.charCodeAt(1));
        hexs += this.numToHexString(string.charCodeAt(0));
        return parseInt(hexs, 16);
    }
    /**
     * Convert data string to INT.
     *
     * @param {String} string
     */
    parsePlcInt(string) {
        var dec = this.parsePlcUint(string);
        if (dec > 32767) {
            dec = dec - 65536;
        }
        return dec;
    }
    /**
     * Convert data string to UDINT/DWORD.
     *
     * @param {String} string
     */
    parsePlcUdint(string) {
        var hexs = this.numToHexString(string.charCodeAt(3));
        hexs += this.numToHexString(string.charCodeAt(2));
        hexs += this.numToHexString(string.charCodeAt(1));
        hexs += this.numToHexString(string.charCodeAt(0));
        return parseInt(hexs, 16);
    }
    /**
     * Convert data string to DINT.
     *
     * @param {String} string
     */
    parsePlcDint(string) {
        var dec = this.parsePlcUdint(string);
        if (dec > 2147483647) {
            dec = dec - 4294967296;
        }
        return dec;
    }
    /**
     * Convert data string to a formatted time string
     *
     * @param {String} string
     * @param {String} format
     */
    parsePlcTime(string, format) {
        var time = this.parsePlcUdint(string);
        if (format === undefined) {
            return time; //Unformatted: value in milliseconds.
        }
        return (this.timeToString(time, format));
    }
    /**
     * Convert data string to a formatted time of day string.
     *
     * @param {String} string
     * @param {String} format
     */
    parsePlcTod(string, format) {
        //Create a date object (time base in the PLC are milliseconds)
        var time = new Date(this.parsePlcUdint(string));
        //Time zone correction.
        time = new Date(time.getTime() + time.getTimezoneOffset() * 60000);
        if (format === undefined) {
            return time;
        }
        return (this.dateToString(time, format));
    }
    /**
     * Convert data string to a formatted date/time of day string.
     *
     * @param {String} string
     * @param {String} format
     */
    parsePlcDate(string, format) {
        //Converte to milliseconds an create a date object
        //(time base of DATE/DT variables in the PLC are seconds since 1.1.1970)
        var date = new Date(this.parsePlcUdint(string) * 1000);
        //Time zone correction.
        date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        if (format === undefined) {
            return date;
        }
        return (this.dateToString(date, format));
    }
    /**
     * Convert data string of a REAL variable
     * to a JavaScript floating point number.
     *
     * @param {String} string
     */
    parsePlcReal(string) {
        var mant = 1, dual = 0.5, num = this.parsePlcUdint(string), sign, exp, i;
        //Return if value is zero. 
        if (num === 0) {
            return 0;
        }
        //Check the sign bit.
        sign = ((num >>> 31) === 1) ? '-' : '+';
        num <<= 1; //Delete the sign bit.
        //Calculate the exponent.
        exp = (num >>> 24) - 127;
        //Calculate the 23 bit mantissa: Shift bits to left and evaluate them.
        num <<= 8;
        for (i = 1; i <= 23; i++) {
            mant += num < 0 ? dual : 0; //Add if left (sign bit) bit is true.
            num <<= 1;
            dual /= 2;
        }
        return parseFloat(sign + (mant * Math.pow(2, exp)));
    }
    /**
     * Convert data string of a LREAL variable
     * to a JavaScript floating point number.
     *
     * @param {String} string
     */
    parsePlcLreal(string) {
        var num = this.parsePlcUdint(string.substring(4, 8)), num2 = this.parsePlcUdint(string.substring(0, 4)), i = 12, mant = 1, dual = 0.5, sign, exp;
        //Return if value is zero. 
        if (num === 0 && num2 === 0) {
            return 0;
        }
        //Check the sign bit.
        sign = ((num >>> 31) === 1) ? '-' : '+';
        num <<= 1; //Delete the sign bit.
        //Calculate the exponent.
        exp = (num >>> 21) - 1023;
        //Calculate the mantissa. Shift bits to left and evaluate them.
        //Part 1.
        num <<= 11;
        while (i < 32) {
            mant += num < 0 ? dual : 0; //Add if left (sign bit) bit is true.
            num <<= 1;
            dual /= 2;
            i++;
        }
        //Part 2.
        if ((num2 >>> 31) === 1) {
            mant += dual;
            num2 <<= 1;
            dual /= 2;
        }
        while (i < 64) {
            mant += num2 < 0 ? dual : 0; //Add if left (sign bit) bit is true.
            num2 <<= 1;
            dual /= 2;
            i++;
        }
        return parseFloat(sign + (mant * Math.pow(2, exp)));
    }
    /**
     * Convert data string to string by simply cutting of superfluous characters.
     *
     * @param {String} string
     */
    parsePlcString(string) {
        /*
        var len = string.length;
        for (var i = 0; i < len; i++) {
            if (string.charCodeAt(i) === 0) {
                break;
            }
        }
        return string.substr(0, i);
        */
        return string.split(String.fromCharCode(0))[0];
    }
    /**
     * Base64 decoder
     *
     * @param {String} data
     */
    decodeBase64(data) {
        return atob(data);
    }
    /**
     * Convert B64-substrings to data.
     *
     * @param {String} dataString
     * @param {String} type
     * @param {String, Number} format
     * @return {Mixed} data
     *
     */
    subStringToData(dataString, type, format) {
        var data;
        switch (type) {
            case 'BOOL':
                //Does this work????? Seems like.
                data = (dataString.charCodeAt(0) != '0');
                break;
            case 'BYTE':
            case 'USINT':
                data = this.parsePlcUsint(dataString);
                break;
            case 'SINT':
                data = this.parsePlcSint(dataString);
                break;
            case 'WORD':
            case 'UINT':
                data = this.parsePlcUint(dataString);
                break;
            case 'INT':
            case 'INT16':
                data = this.parsePlcInt(dataString);
                break;
            case 'INT1DP':
                data = ((this.parsePlcInt(dataString)) / 10).toFixed(1);
                break;
            case 'INT2DP':
                data = ((this.parsePlcInt(dataString)) / 100).toFixed(2);
                break;
            case 'DWORD':
            case 'UDINT':
                data = this.parsePlcUdint(dataString);
                break;
            case 'DINT':
                data = this.parsePlcDint(dataString);
                break;
            case 'REAL':
                data = this.parsePlcReal(dataString);
                if (format !== undefined) {
                    data = data.toFixed(parseInt(format, 10));
                }
                break;
            case 'LREAL':
                data = this.parsePlcLreal(dataString);
                if (format !== undefined) {
                    data = data.toFixed(parseInt(format, 10));
                }
                break;
            case 'STRING':
                data = this.parsePlcString(dataString);
                break;
            case 'TOD':
            case 'TIME_OF_DAY':
                data = this.parsePlcTod(dataString, format);
                break;
            case 'TIME':
                data = this.parsePlcTime(dataString, format);
                break;
            case 'DT':
            case 'DATE':
            case 'DATE_AND_TIME':
                data = this.parsePlcDate(dataString, format);
                break;
            case 'EndStruct':
                //Just do nothing.
                break;
            default:
                this.log('TAME library error: Unknown data type at parsing read request: ' + type);
                break;
        }
        return data;
    }
    /**
     * Decode the response string of a Read Request and store the data.
     *
     * @param {Object} adsReq   ADS Reqest Object
     */
    parseReadReq(adsReq) {
        let response, itemList = adsReq.reqDescr.items, arrType = [], strAddr = 0, item, dataString, dataSubString, strlen, len, plen, mod, type, format, idx, listlen, startaddr;
        let result;
        try {
            response = this.xmlHttpReq.responseXML.documentElement;
            dataString = this.decodeBase64(response.getElementsByTagName('ppData')[0].firstChild.data);
            //Run through the elements in the item list.
            for (idx = 0, listlen = itemList.length; idx < listlen; idx++) {
                item = itemList[idx];
                //Get type and formatting string.
                arrType = this.getTypeAndFormat(item);
                type = arrType[0];
                format = arrType[1];
                //Get the length of the data types.
                len = this.plcTypeLen[type];
                switch (type) {
                    case 'STRING':
                        if (format !== undefined) {
                            strlen = parseInt(format, 10);
                        }
                        len = (this.isValidStringLen(strlen) ? strlen : len) + 1;
                        break;
                    case 'EndStruct':
                        //Set the length of the padding bytes at the end of the structure
                        //"EndStruct" is only used with "readArrayOfStructures/writeArrayOfStructures".
                        len = item.val;
                        break;
                }
                //Set the length for calculating padding bytes
                plen = len < this.alignment ? len : this.alignment;
                //Calculate the place of the element in the data string
                if (adsReq.reqDescr.seq !== true) {
                    //If variable addresses are used.
                    startaddr = this.getIndexOffset(adsReq.reqDescr);
                    strAddr = item.addr - startaddr;
                }
                else if (adsReq.reqDescr.calcAlignment === true && plen > 1 && type !== 'EndStruct' && type !== 'STRING' && strAddr > 0) {
                    //Compute the address for the alignment in case of a structure.
                    mod = strAddr % plen;
                    if (mod > 0) {
                        strAddr += plen - mod;
                    }
                }
                //Slice the string and decode the data
                dataSubString = dataString.substr(strAddr, len);
                result = this.subStringToData(dataSubString, type, format);
                //Parse the name of the JavaScript variable and write the data to it
                if (type !== 'EndStruct') {
                    this.parseVarName(item.jvar, result, adsReq.reqDescr.dataObj, item.prefix, item.suffix);
                }
                //Set the next address
                if (adsReq.reqDescr.seq === true) {
                    strAddr += len;
                }
            }
        }
        catch (e) {
            this.log('TAME library error: Parsing of Read Request failed:' + e);
            this.log(item);
            return result;
        }
        return result;
    }
    /**
     * Decode the response string of a SumReadRequest and store the data.
     *
     * @param {Object} adsReq   ADS Request Object
     */
    parseSumReadReq(adsReq) {
        var response, itemList = adsReq.reqDescr.items, arrType = [], strAddr = 0, subStrAddr = 0, dataObj = window, vlenMax = 0, item, dataString, dataSubString, data, len, type, format, idx, listlen, errorCode, jvar, i, arrayLength, itemSize, itemInfo;
        /**
         * Slice a piece out of the substring, convert the data and write it
         * to the JavaScript variable.
         */
        const parseSubStringSlice = () => {
            var strlen, subStrSlice;
            if (type === 'STRING') {
                if (format !== undefined) {
                    strlen = parseInt(format, 10);
                }
                else if (typeof itemInfo.stringLength === 'number') {
                    strlen = itemInfo.stringLength;
                }
                len = (this.isValidStringLen(strlen) ? strlen : len) + 1;
            }
            //Take a piece of the data sub string
            subStrSlice = dataSubString.substr(subStrAddr, len);
            //Convert the data
            data = this.subStringToData(subStrSlice, type, format);
            //Parse the name of the JavaScript variable and write the data to it
            this.parseVarName(jvar, data, dataObj, item.prefix, item.suffix);
            subStrAddr += len;
        };
        /**
         * Parse the stucture definition and compute the data of
         * the substring.
         */
        const parseStructure = () => {
            var j, defArr, lenArrElem, lastDefArr, mod, elem;
            /**
             * Function for adjusting the address of the data in the string
             * if an alignment is used.
             */
            const checkAlignment = () => {
                var vlen, mod;
                if (this.alignment > 1 && type !== 'STRING' && type !== 'EndStruct') {
                    //Set the length for calculating padding bytes
                    vlen = len < this.alignment ? len : this.alignment;
                    //Compute the address for the alignment.
                    if (vlen > 1 && subStrAddr > 0) {
                        mod = subStrAddr % vlen;
                        if (mod > 0) {
                            subStrAddr += vlen - mod;
                        }
                    }
                    //Store the maximum length of the PLC variables
                    //for inserting padding bytes at the end of the structure.
                    if (vlen > vlenMax) {
                        vlenMax = vlen;
                    }
                }
            };
            //Check structure definition
            if (typeof item.def === 'string') {
                item.def = this.parseVarName(item.def);
            }
            else if (this.dataTypeTableReady === true && item.def === undefined) {
                item.def = this.createStructDef(itemInfo.dataType);
            }
            else if (typeof item.def !== 'object') {
                this.log('TAME library error: No structure defininition found (parseSumReadReq())!');
                this.log(item);
            }
            for (elem in item.def) {
                if (item.def.hasOwnProperty(elem)) {
                    defArr = item.def[elem].split('.');
                    if (defArr[0] === 'ARRAY') {
                        lenArrElem = parseInt(defArr[1], 10);
                        lastDefArr = defArr.length - 1;
                        for (j = 0; j < lenArrElem; j++) {
                            type = defArr[2];
                            if (defArr[lastDefArr] === 'SP') {
                                jvar = elem + j;
                                if (lastDefArr >= 4) {
                                    format = defArr.slice(3, -1).join('.');
                                }
                            }
                            else {
                                jvar = elem + '.' + j;
                                if (lastDefArr >= 3) {
                                    format = defArr.slice(3).join('.');
                                }
                            }
                            //Add index in case of an array of struct
                            if (i !== null) {
                                jvar = i + '.' + jvar;
                            }
                            len = this.plcTypeLen[type];
                            checkAlignment();
                            parseSubStringSlice();
                        }
                    }
                    else {
                        //Check if we are in an array of struct
                        if (i !== null) {
                            jvar = i + '.' + elem;
                        }
                        else {
                            jvar = elem;
                        }
                        type = defArr[0];
                        if (defArr.length > 2) {
                            defArr[1] = defArr.slice(1).join('.');
                        }
                        format = defArr[1];
                        len = this.plcTypeLen[type];
                        checkAlignment();
                        parseSubStringSlice();
                    }
                }
            }
            //Calculate the padding bytes at the end of the structure
            if (this.alignment > 1 && vlenMax > 1 && type !== 'STRING' && type !== 'EndStruct') {
                if (vlenMax > this.alignment) {
                    vlenMax = this.alignment;
                }
                mod = subStrAddr % vlenMax;
                if (mod > 0) {
                    subStrAddr += vlenMax - mod;
                }
            }
        };
        try {
            response = this.xmlHttpReq.responseXML.documentElement;
            dataString = this.decodeBase64(response.getElementsByTagName('ppRdData')[0].firstChild.data);
            //Read the error codes of the ADS sub commands.
            for (idx = 0, listlen = itemList.length; idx < listlen; idx++) {
                dataSubString = dataString.substr(strAddr, 4);
                errorCode = this.subStringToData(dataSubString, 'DWORD');
                if (errorCode !== 0) {
                    this.log('TAME library error: ADS sub command error while processing a SumReadRequest!');
                    this.log('Error code: ' + errorCode);
                    this.log(itemList[idx]);
                }
                strAddr += 4;
            }
            //Run through the elements in the item list.
            for (idx = 0; idx < listlen; idx++) {
                item = itemList[idx];
                itemInfo = this.getItemInformation(item);
                //Get type and formatting string.
                type = itemInfo.type;
                format = itemInfo.format;
                //Get the length of the data types.
                itemSize = itemInfo.size;
                //Reset counter for arrays.
                i = null;
                //Slice the string and decode the data
                dataSubString = dataString.substr(strAddr, itemSize);
                switch (type) {
                    case 'ARRAY':
                        dataObj = this.parseVarName(item.jvar);
                        subStrAddr = 0;
                        arrayLength = itemInfo.arrayLength;
                        if (itemInfo.arrayDataType === 'USER') {
                            for (i = 0; i < arrayLength; i++) {
                                parseStructure();
                            }
                        }
                        else {
                            type = itemInfo.arrayDataType;
                            len = this.plcTypeLen[type];
                            for (i = 0; i < arrayLength; i++) {
                                jvar = i;
                                parseSubStringSlice();
                            }
                        }
                        break;
                    case 'USER':
                        dataObj = this.parseVarName(item.jvar);
                        subStrAddr = 0;
                        parseStructure();
                        break;
                    default:
                        //Convert the data
                        dataObj = window;
                        data = this.subStringToData(dataSubString, type, format);
                        //Parse the name of the JavaScript variable and write the data to it
                        this.parseVarName(item.jvar, data, dataObj, item.prefix, item.suffix);
                }
                //Set the next string address
                strAddr += itemSize;
            }
        }
        catch (e) {
            this.log('TAME library error: Parsing of SumReadRequest failed:' + e);
            this.log(item);
            return;
        }
    }
    /**
     * Decode the response string of a SumWriteRequest.
     *
     * @param {Object} adsReq   ADS Request Object
     */
    parseSumWriteReq(adsReq) {
        var response, itemList = adsReq.reqDescr.items, arrType = [], arrDeletedHdl = [], strAddr = 0, subStrAddr = 0, dataObj = window, item, dataString, dataSubString, data, len, type, format, idx, listlen, errorCode, delIdx, symName;
        //Just look for errors.
        try {
            response = this.xmlHttpReq.responseXML.documentElement;
            dataString = this.decodeBase64(response.getElementsByTagName('ppRdData')[0].firstChild.data);
            //Read the error codes of the ADS sub commands.
            for (idx = 0, listlen = itemList.length; idx < listlen; idx++) {
                dataSubString = dataString.substr(strAddr, 4);
                errorCode = this.subStringToData(dataSubString, 'DWORD');
                if (errorCode === 0) {
                    //Release handles request?
                    if (adsReq.reqDescr.isRelHdlReq === true) {
                        symName = itemList[idx].toUpperCase();
                        //Remove the handle from the cache
                        delete this.handleCache[symName];
                        //Delete the handle in the handle list
                        delIdx = this.handleNames.indexOf(symName);
                        delete this.handleNames[delIdx];
                        arrDeletedHdl[idx] = symName;
                    }
                }
                else {
                    this.log('TAME library error: ADS sub command error while processing a SumReadRequest!');
                    this.log('Error code: ' + errorCode);
                    this.log(itemList[idx]);
                }
                strAddr += 4;
            }
            //Release handles request?
            if (adsReq.reqDescr.isRelHdlReq === true) {
                //Remove deleted items
                for (idx = this.handleNames.length - 1; idx >= 0; idx--) {
                    if (this.handleNames[idx] === undefined) {
                        this.handleNames.splice(idx, 1);
                    }
                }
                if (this.handleNames.length === 0) {
                    this.handleCacheReady = false;
                    this.log('TAME library info: All handles released.');
                }
                else {
                    this.log('TAME library info: Released handles:');
                    this.log(arrDeletedHdl);
                }
            }
        }
        catch (e) {
            this.log('TAME library error: Parsing of SumWriteRequest failed:' + e);
            this.log(item);
            return;
        }
    }
    /**
     * Decode the response string of a ADS State Request and store the data.
     *
     * @param {Object} adsReq   ADS Reqest Object
     */
    parseAdsState(adsReq) {
        var response;
        try {
            response = this.xmlHttpReq.responseXML.documentElement;
            this.adsState = parseInt(response.getElementsByTagName('pAdsState')[0].firstChild.data, 10);
            this.adsStateTxt = this.adsStates[this.adsState];
            this.deviceState = parseInt(response.getElementsByTagName('pDeviceState')[0].firstChild.data, 10);
        }
        catch (e) {
            this.log('TAME library error: Parsing of ADS Read State Request failed:' + e);
            return;
        }
    }
    /**
     * Decode the response string of a ReadWrite Request and store the handles.
     *
     * @param {Object} adsReq   ADS Request Object
     */
    parseHandles(adsReq) {
        var response, arrSymNames = this.handleNames, strAddr = 0, subStrAddr = 0, dataString, dataSubString, handleVal, idx, arrlen, errorCode, returnLen;
        response = this.xmlHttpReq.responseXML.documentElement;
        dataString = this.decodeBase64(response.getElementsByTagName('ppRdData')[0].firstChild.data);
        //Read the error codes and the return length of the ADS sub commands.
        for (idx = 0, arrlen = arrSymNames.length; idx < arrlen; idx++) {
            dataSubString = dataString.substr(strAddr, 4);
            errorCode = this.subStringToData(dataSubString, 'DWORD');
            strAddr += 4;
            dataSubString = dataString.substr(strAddr, 4);
            returnLen = this.subStringToData(dataSubString, 'DWORD');
            strAddr += 4;
            if (errorCode !== 0) {
                this.log('TAME library error: Error while reading a handle from the PLC!');
                this.log('Error code: ' + errorCode);
                this.log('Handle: ' + arrSymNames[idx]);
                throw 'Handle request aborted!';
            }
        }
        //Run through the elements in the symbolName list,
        //get the data out of the string and store it in the cache.
        for (idx = 0; idx < arrlen; idx++) {
            //Slice the string and decode the data
            dataSubString = dataString.substr(strAddr, 4);
            handleVal = this.subStringToData(dataSubString, 'DWORD');
            strAddr += 4;
            this.handleCache[arrSymNames[idx]] = handleVal;
        }
        this.handleCacheReady = true;
        this.log('TAME library info: Handle cache ready.');
    }
    writeSingle(method, type, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqDescr = this.createSingleDescriptor(method, type, args);
            let adsReq = this.writeReq(reqDescr);
            this.createRequest(adsReq);
            let value = yield this.adsReqSendAsync(adsReq);
            return value;
        });
    }
    readSingle(method, type, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqDescr = this.createSingleDescriptor(method, type, args);
            let adsReq = this.readReq(reqDescr);
            this.createRequest(adsReq);
            let value = yield this.adsReqSendAsync(adsReq);
            return value;
        });
    }
    //======================================================================================
    //                     Functions for Creating Request Descriptors
    //======================================================================================  
    /**
     * Create the Request Descriptor for a single variable. An item list
     * with a single array item is generated.
     *
     * @param {String} method   The method, either "Read" or "Write".
     * @param {String} type     The PLC data type.
     * @param {Object} args     The arguments for building for the Request Descriptor.
     */
    createSingleDescriptor(method, type, args) {
        var reqDescr = {}, len, itemInfo;
        args.type = type; //To prevent error messages in getItemInformation()
        itemInfo = this.getItemInformation(args);
        len = this.plcTypeLen[type];
        switch (type) {
            case 'STRING':
                //Change the read length if a value is given.
                if (this.isValidStringLen(args.strlen)) {
                    type += '.' + args.strlen;
                    len = args.strlen;
                }
                else if (typeof itemInfo.stringLength === 'number') {
                    len = itemInfo.stringLength;
                    type += '.' + len;
                }
                else {
                    this.log('TAME library error: Could not get the length of the string for this request!');
                    this.log(args);
                }
                len++; //Termination
                break;
            case 'TIME':
            case 'TOD':
            case 'DT':
            case 'DATE':
            case 'DATE_AND_TIME':
            case 'TIME_OF_DAY':
                //Append the format string to the data type.
                if (typeof args.format === 'string') {
                    type += '.' + args.format;
                }
                break;
            case 'REAL':
            case 'LREAL':
                //Append the number of decimal places to the data type.
                if (typeof args.decPlaces === 'number') {
                    type += '.' + args.decPlaces;
                }
                else if (typeof args.dp === 'number') {
                    type += '.' + args.dp;
                }
                break;
        }
        //Create the Request Descriptor.
        reqDescr = {
            addr: args.addr,
            symbolName: itemInfo.symbolName,
            dataTypeNames: itemInfo.dataTypeNames,
            dataTypeArrIdx: itemInfo.dataTypeArrIdx,
            symbolNameArrIdx: itemInfo.symbolNameArrIdx,
            fullSymbolName: args.name,
            useHandle: args.handle,
            id: args.id,
            oc: args.oc,
            ocd: args.ocd,
            oe: args.oe,
            ot: args.ot,
            readLength: len,
            debug: args.debug,
            sync: args.sync,
            offs: args.offs,
            seq: true,
            items: [{
                    val: args.val,
                    jvar: args.jvar,
                    type: type,
                    prefix: args.prefix,
                    suffix: args.suffix
                }]
        };
        return reqDescr;
    }
    /**
     * Create a Request Descriptor for an array. An item list of
     * single variables is generated.
     *
     * @param {String} method   The method, either "Read" or "Write".
     * @param {String} type     The data type of the PLC variable.
     * @param {Object} args     The arguments for building the Request Descriptor.
     */
    createArrayDescriptor(method, type, args) {
        var reqDescr = {}, dataObj = {}, arrayLength, addrOffset, cnt = 0, i = 0, j = 0, len, defArr = [], lenArrElem, lastDefArr, structByteLen = 0, strlen, vlen, vlenMax = 0, endPadLen = 0, mod, addr, wrtOneOnly, arrSymType, itemInfo;
        itemInfo = this.getItemInformation(args);
        //Get the object of the stored data, direct with 'val'
        //for a write request or parsing the name if 'jvar' is given.
        if (method === 'Write' && typeof args.val === 'object') {
            dataObj = args.val;
        }
        else if (typeof args.jvar === 'string') {
            dataObj = this.parseVarName(args.jvar);
        }
        else {
            this.log('TAME library error: No data object for this ' + method + '-Request defined!');
        }
        if (typeof args.arrlen === 'number') {
            //Override array length if manually set
            arrayLength = args.arrlen;
        }
        else if (itemInfo.arrayLength !== undefined) {
            //Get the array length from the symbol table.
            arrayLength = itemInfo.arrayLength;
        }
        else {
            this.log('TAME library error: Can\'t get the array length for this request!');
            this.log(args);
        }
        //Check if only one item should be written.
        if (typeof args.item === 'number' && !isNaN(args.item) && method === 'Write') {
            wrtOneOnly = true;
            if (args.item < 0 || args.item > arrayLength - 1) {
                this.log('TAME library error: Wrong value for "item"!');
                this.log('item: ' + args.item);
                this.log('Last array index: ' + (arrayLength - 1));
            }
        }
        /**
         * Function for creating an descriptor for array of structures.
         */
        const createStructArr = () => {
            var elem;
            //Parse the name of the structure definiton, if it is passed
            //as a string.
            if (typeof args.def === 'string') {
                args.def = this.parseVarName(args.def);
            }
            else if (this.dataTypeTableReady === true && args.def === undefined) {
                args.def = this.createStructDef(itemInfo.dataType);
            }
            else if (typeof args.def !== 'object') {
                this.log('TAME library error: No structure definition found!');
            }
            //Calculate the length of the structure and the padding bytes
            for (elem in args.def) {
                if (args.def.hasOwnProperty(elem)) {
                    //Separate data type and length.
                    defArr = args.def[elem].split('.');
                    if (defArr[0] === 'ARRAY') {
                        lenArrElem = parseInt(defArr[1], 10);
                        defArr.shift();
                        defArr.shift();
                    }
                    else {
                        lenArrElem = 1;
                    }
                    for (i = 0; i < lenArrElem; i++) {
                        //Set the length of the PLC variable.
                        if (defArr[0] === 'STRING') {
                            if (typeof defArr[1] === 'string') {
                                strlen = parseInt(defArr[1], 10);
                            }
                            vlen = (this.isValidStringLen(strlen) ? strlen : this.plcTypeLen[defArr[0]]) + 1;
                        }
                        else {
                            vlen = this.plcTypeLen[defArr[0]];
                        }
                        //Add the length of the PLC variables
                        if (this.alignment > 1 && vlen > 1 && defArr[0] !== 'STRING' && structByteLen > 0) {
                            mod = structByteLen % vlen;
                            if (mod > 0) {
                                structByteLen += vlen - mod;
                            }
                        }
                        structByteLen += vlen;
                    }
                    //Store the maximum length of the PLC variables
                    //for inserting padding bytes at the end of the structure.
                    if (this.alignment > 1 && vlen > vlenMax && defArr[0] !== 'STRING') {
                        vlenMax = vlen;
                    }
                }
            }
            //Calculate the padding bytes at the end of the structure
            if (this.alignment > 1 && vlenMax > 1 && defArr[0] !== 'STRING') {
                if (vlenMax > this.alignment) {
                    vlenMax = this.alignment;
                }
                mod = structByteLen % vlenMax;
                if (mod > 0) {
                    endPadLen = vlenMax - mod;
                    structByteLen += endPadLen;
                }
            }
            //Set the address offset and the length to 1 
            //if only one item should be sent.
            if (wrtOneOnly) {
                addrOffset = structByteLen * args.item;
                arrayLength = 1;
            }
            reqDescr = {
                addr: args.addr,
                symbolName: itemInfo.symbolName,
                dataTypeNames: itemInfo.dataTypeNames,
                fullSymbolName: args.name,
                addrOffset: addrOffset,
                useHandle: args.handle,
                id: args.id,
                oc: args.oc,
                ocd: args.ocd,
                oe: args.oe,
                ot: args.ot,
                debug: args.debug,
                readLength: structByteLen * arrayLength,
                seq: true,
                calcAlignment: true,
                dataObj: dataObj,
                sync: args.sync,
                offs: args.offs,
                items: []
            };
            //Create the item list.
            //Although jvar isn't necessary for write requests,
            //it's good for easier debugging.
            for (i = 0; i < arrayLength; i++) {
                for (elem in args.def) {
                    if (args.def.hasOwnProperty(elem)) {
                        defArr = args.def[elem].split('.');
                        if (defArr[0] === 'ARRAY') {
                            lenArrElem = parseInt(defArr[1], 10);
                            lastDefArr = defArr.length - 1;
                            for (j = 0; j < lenArrElem; j++) {
                                if (defArr[lastDefArr] === 'SP') {
                                    reqDescr.items[cnt] = {
                                        jvar: i + '.' + elem + j
                                    };
                                    if (lastDefArr === 4) {
                                        reqDescr.items[cnt].type = defArr[2] + '.' + defArr[3];
                                    }
                                    else {
                                        reqDescr.items[cnt].type = defArr[2];
                                    }
                                }
                                else {
                                    reqDescr.items[cnt] = {
                                        jvar: i + '.' + elem + '.' + j
                                    };
                                    if (lastDefArr === 3) {
                                        reqDescr.items[cnt].type = defArr[2] + '.' + defArr[3];
                                    }
                                    else {
                                        reqDescr.items[cnt].type = defArr[2];
                                    }
                                }
                                if (method === 'Write') {
                                    if (wrtOneOnly) {
                                        if (defArr[lastDefArr] === 'SP') {
                                            reqDescr.items[cnt].val = dataObj[args.item][elem + j];
                                        }
                                        else {
                                            reqDescr.items[cnt].val = dataObj[args.item][elem][j];
                                        }
                                    }
                                    else {
                                        if (defArr[lastDefArr] === 'SP') {
                                            reqDescr.items[cnt].val = dataObj[i][elem + j];
                                        }
                                        else {
                                            reqDescr.items[cnt].val = dataObj[i][elem][j];
                                        }
                                    }
                                }
                                cnt++;
                            }
                        }
                        else {
                            reqDescr.items[cnt] = {
                                jvar: i + '.' + elem,
                                type: args.def[elem]
                            };
                            if (method === 'Write') {
                                if (wrtOneOnly) {
                                    reqDescr.items[cnt].val = dataObj[args.item][elem];
                                }
                                else {
                                    reqDescr.items[cnt].val = dataObj[i][elem];
                                }
                            }
                            cnt++;
                        }
                    }
                }
                //Set an item as a mark at the end of the structure
                //for inserting padding bytes in "writeReq" and "readReq" later.
                if (this.alignment > 1) {
                    reqDescr.items[cnt] = {
                        type: 'EndStruct',
                        val: endPadLen
                    };
                    cnt++;
                }
            }
        };
        /**
         * Function for creating a descriptor for a simple array.
         */
        const createSimpleArr = () => {
            len = this.plcTypeLen[type];
            switch (type) {
                case 'STRING':
                    if (this.isValidStringLen(args.strlen)) {
                        //Change the read length if a value is given.
                        type += '.' + args.strlen;
                        len = args.strlen;
                    }
                    else if (typeof itemInfo.stringLength === 'number') {
                        len = itemInfo.stringLength;
                        type += '.' + len;
                    }
                    else {
                        this.log('TAME library error: Could not get the length of the string for this request!');
                        this.log(args);
                    }
                    len++; //Termination
                    break;
                case 'TIME':
                case 'TOD':
                case 'DT':
                case 'DATE':
                case 'DATE_AND_TIME':
                case 'TIME_OF_DAY':
                    //Append the format string to the data type.
                    if (typeof args.format === 'string') {
                        type += '.' + args.format;
                    }
                    break;
                case 'REAL':
                case 'LREAL':
                    //Append the number of decimal places to the data type.
                    if (typeof args.decPlaces === 'number') {
                        type += '.' + args.decPlaces;
                    }
                    else if (typeof args.dp === 'number') {
                        type += '.' + args.dp;
                    }
                    break;
            }
            //Set the address offset and the length to 1 
            //if only one item should be sent.
            if (wrtOneOnly) {
                addrOffset = args.item * len;
                arrayLength = 1;
            }
            reqDescr = {
                addr: args.addr,
                symbolName: itemInfo.symbolName,
                dataTypeNames: itemInfo.dataTypeNames,
                dataTypeArrIdx: itemInfo.dataTypeArrIdx,
                symbolNameArrIdx: itemInfo.symbolNameArrIdx,
                fullSymbolName: args.name,
                useHandle: args.handle,
                addrOffset: addrOffset,
                id: args.id,
                oc: args.oc,
                ocd: args.ocd,
                oe: args.oe,
                ot: args.ot,
                readLength: len * arrayLength,
                debug: args.debug,
                seq: true,
                dataObj: dataObj,
                items: []
            };
            //Create the item list.
            //Although jvar isn't necessary for write requests,
            //it's good for easier debugging.
            for (i = 0; i < arrayLength; i++) {
                reqDescr.items[i] = {
                    jvar: i,
                    type: type
                };
                if (method === 'Write') {
                    if (wrtOneOnly) {
                        reqDescr.items[i].val = dataObj[args.item];
                    }
                    else {
                        reqDescr.items[i].val = dataObj[i];
                    }
                }
            }
        };
        if (type === 'STRUCT') {
            createStructArr();
        }
        else {
            createSimpleArr();
        }
        //Call the send function.
        if (method === 'Write') {
            this.writeReq(reqDescr);
        }
        else {
            this.readReq(reqDescr);
        }
    }
    /**
     * Create a Request Descriptor for a structure,
     * a structure definition has to be passed as one of the arguments,
     * from wich the item list is created.
     *
     * @param {String} method   The method, either "Read" or "Write".
     * @param {Object} args     The arguments for building the Request Descriptor.
     */
    createStructDescriptor(method, args) {
        var reqDescr = {}, //Request Descriptor
        dataObj = {}, //object wich holds the data for write requests 
        defArr = [], //subelements of a structure definition item
        cnt = 0, lastDefArr, lenArrElem, elem, j, itemInfo;
        itemInfo = this.getItemInformation(args);
        //Get the object of the stored data, direct with 'val'
        //for a write request or parsing the name if 'jvar' is given.
        if (method === 'Write' && typeof args.val === 'object') {
            dataObj = args.val;
        }
        else if (typeof args.jvar === 'string') {
            dataObj = this.parseVarName(args.jvar);
        }
        else {
            this.log('TAME library error: No data object for this ' + method + '-Request defined!');
        }
        //Parse the name of the structure definiton, if it is passed
        //as a string.
        if (typeof args.def === 'string') {
            args.def = this.parseVarName(args.def);
        }
        else if (this.dataTypeTableReady === true && args.def === undefined) {
            args.def = this.createStructDef(itemInfo.dataType);
        }
        else if (typeof args.def !== 'object') {
            this.log('TAME library error: No structure defininition found (createArrayDescriptor())!');
            this.log(args);
        }
        reqDescr = {
            addr: args.addr,
            symbolName: itemInfo.symbolName,
            dataTypeNames: itemInfo.dataTypeNames,
            dataTypeArrIdx: itemInfo.dataTypeArrIdx,
            symbolNameArrIdx: itemInfo.symbolNameArrIdx,
            fullSymbolName: args.name,
            useHandle: args.handle,
            id: args.id,
            oc: args.oc,
            ocd: args.ocd,
            oe: args.oe,
            ot: args.ot,
            debug: args.debug,
            seq: true,
            calcAlignment: true,
            dataObj: dataObj,
            sync: args.sync,
            offs: args.offs,
            items: []
        };
        //Create the item list.
        //Although jvar isn't necessary for write requests,
        //it's good for easier debugging.
        for (elem in args.def) {
            if (args.def.hasOwnProperty(elem)) {
                defArr = args.def[elem].split('.');
                if (defArr[0] === 'ARRAY') {
                    lenArrElem = parseInt(defArr[1], 10);
                    lastDefArr = defArr.length - 1;
                    for (j = 0; j < lenArrElem; j++) {
                        if (defArr[lastDefArr] === 'SP') {
                            reqDescr.items[cnt] = {
                                jvar: elem + j
                            };
                            if (lastDefArr === 4) {
                                reqDescr.items[cnt].type = defArr[2] + '.' + defArr[3];
                            }
                            else {
                                reqDescr.items[cnt].type = defArr[2];
                            }
                        }
                        else {
                            reqDescr.items[cnt] = {
                                jvar: elem + '.' + j
                            };
                            if (lastDefArr === 3) {
                                reqDescr.items[cnt].type = defArr[2] + '.' + defArr[3];
                            }
                            else {
                                reqDescr.items[cnt].type = defArr[2];
                            }
                        }
                        if (method === 'Write') {
                            if (defArr[lastDefArr] === 'SP') {
                                reqDescr.items[cnt].val = dataObj[elem + j];
                            }
                            else {
                                reqDescr.items[cnt].val = dataObj[elem][j];
                            }
                        }
                        cnt++;
                    }
                }
                else {
                    reqDescr.items[cnt] = {
                        jvar: elem,
                        type: args.def[elem]
                    };
                    if (method === 'Write') {
                        reqDescr.items[cnt].val = dataObj[elem];
                    }
                    cnt++;
                }
            }
        }
        //Call the send function
        if (method === 'Write') {
            this.writeReq(reqDescr);
        }
        else {
            this.readReq(reqDescr);
        }
    }
    //======================================================================================
    //                                Public Methods
    //======================================================================================
    /**
     * This is the function for creating a write request. Depending on the
     * values and PLC data types passed in the variable list a byte array is
     * created and the function for sending the request is called.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    writeReq(reqDescr) {
        var itemList = reqDescr.items, adsReq = {}, pData = [], arrType = [], bytes = [], type, format, listlen, len, val, pcount, mod, item, i, idx;
        //Set the variable name to upper case.
        if (typeof reqDescr.name === 'string') {
            reqDescr.name = reqDescr.name.toUpperCase();
        }
        //Run through the elements in the item list.
        for (idx = 0, listlen = itemList.length; idx < listlen; idx++) {
            item = itemList[idx];
            //Get type and formatting string.
            arrType = this.getTypeAndFormat(item);
            type = arrType[0];
            format = arrType[1];
            //Length of the data type.
            //Maximum lenght is limited to 4 (due to structure padding),
            //the lenght of strings is calculated later.
            if (isNaN(this.plcTypeLen[type])) {
                this.log('TAME library error: Could not get the length of the data type: ' + type);
                this.log('TAME library error: Probably wrong type definition. Please check the manual.');
                this.log(reqDescr);
                return;
            }
            //Padding within structures.
            //"calcAlignment" is only set in "writeStruct/readStruct" and
            //"writeArrayOfStruct/readArrayOfStruct"
            len = (this.plcTypeLen[type] < this.alignment) ? this.plcTypeLen[type] : this.alignment;
            if (reqDescr.calcAlignment === true && len > 1 && type !== 'STRING' && type !== 'EndStruct' && pData.length > 0) {
                mod = pData.length % len;
                if (mod > 0) {
                    pcount = len - mod;
                    for (i = 1; i <= pcount; i++) {
                        pData.push(0);
                    }
                }
            }
            //Convert data, depending on the type
            if (type === 'EndStruct') {
                //Calculate the padding bytes at the end of the structure
                //"EndStruct" is only used with "readArrayOfStructures/writeArrayOfStructures".
                for (i = 1; i <= item.val; i++) {
                    pData.push(0);
                }
            }
            else {
                //Convert the data to a byte array.
                bytes = this.dataToByteArray(item, type, format, this.plcTypeLen[type]);
                //Summarise the data.     
                pData = pData.concat(bytes);
            }
        }
        //Convert the data to Base64.
        if (pData && pData.length > 0) {
            pData = this.encodeBase64(pData);
        }
        //Generate the ADS request object and call the send function.
        adsReq = {
            method: 'Write',
            indexGroup: this.getIndexGroup(reqDescr),
            indexOffset: this.getIndexOffset(reqDescr),
            pData: pData,
            reqDescr: reqDescr
        };
        return adsReq;
    }
    ;
    /**
     * This is the function for creating a read request. If no value for the
     * data length ist passed, calculate the value and then call the function
     * for sending the request.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    readReq(reqDescr) {
        var adsReq = {}, itemList = reqDescr.items, arrType = [], item, format, type, listlen, mod, vlen, strlen, idx, startaddr;
        //Calculate the data length if no argument is given.
        if (typeof reqDescr.readLength !== 'number') {
            reqDescr.readLength = 0;
            for (idx = 0, listlen = itemList.length; idx < listlen; idx++) {
                item = itemList[idx];
                //Get type and formatting string.
                arrType = this.getTypeAndFormat(item);
                type = arrType[0];
                format = arrType[1];
                //Set the length of the PLC variable.
                if (isNaN(this.plcTypeLen[type])) {
                    this.log('TAME library error: Could not get the length of the data type: ' + type);
                    this.log('TAME library error: Probably wrong type definition. Please check the manual.');
                    this.log(reqDescr);
                    return;
                }
                if (type === 'STRING') {
                    if (typeof format === 'string') {
                        strlen = parseInt(format, 10);
                    }
                    vlen = (this.isValidStringLen(strlen) ? strlen : this.plcTypeLen[type]) + 1;
                }
                else {
                    vlen = this.plcTypeLen[type];
                }
                if (reqDescr.seq === true) {
                    //Add the length of the PLC variables if continuously addressing is used.
                    if (reqDescr.calcAlignment === true && vlen > 1 && type !== 'EndStruct' && type !== 'STRING' && reqDescr.readLength > 0) {
                        mod = reqDescr.readLength % vlen;
                        if (mod > 0) {
                            reqDescr.readLength += vlen - mod;
                        }
                    }
                    reqDescr.readLength += vlen;
                }
                else {
                    //Last element if single addresses are given.
                    startaddr = this.getIndexOffset(reqDescr);
                    reqDescr.readLength = vlen + item.addr - startaddr;
                }
            }
        }
        //Generate the ADS request object and call the send function.
        adsReq = {
            method: 'Read',
            indexGroup: this.getIndexGroup(reqDescr),
            indexOffset: this.getIndexOffset(reqDescr),
            reqDescr: reqDescr
        };
        return adsReq;
    }
    ;
    /**
     * This is the function for creating a sum read request.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    sumReadReq(reqDescr) {
        var adsReq = {}, itemList = reqDescr.items, arrType = [], reqBuffer = [], bytes = [], listlen = itemList.length, dummy = {}, type, format, item, idx, len, pwrData, itemInfo;
        //Preset the read lenth with the number of byte for error codes.
        reqDescr.readLength = listlen * 4;
        //Build the Request Buffer
        for (idx = 0; idx < listlen; idx++) {
            item = itemList[idx];
            itemInfo = this.getItemInformation(item);
            //Length of the data type.
            len = itemInfo.size;
            reqDescr.readLength += len;
            //Build the request buffer.
            //The function dataToByteArray expects an item with a value for
            //converting, so a dummy object is used here.
            dummy.val = this.getIndexGroup(itemInfo);
            bytes = this.dataToByteArray(dummy, 'UDINT', format, 4);
            reqBuffer = reqBuffer.concat(bytes);
            dummy.val = this.getIndexOffset(itemInfo);
            bytes = this.dataToByteArray(dummy, 'UDINT', format, 4);
            reqBuffer = reqBuffer.concat(bytes);
            dummy.val = len;
            bytes = this.dataToByteArray(dummy, 'UDINT', format, 4);
            reqBuffer = reqBuffer.concat(bytes);
        }
        //Convert the request buffer to Base64 coded data.
        if (reqBuffer.length > 0) {
            pwrData = this.encodeBase64(reqBuffer);
        }
        //Generate the ADS request object and call the send function.
        adsReq = {
            method: 'ReadWrite',
            indexGroup: this.indexGroups.SumRd,
            indexOffset: itemList.length,
            pwrData: pwrData,
            reqDescr: reqDescr
        };
        this.createRequest(adsReq).send();
    }
    ;
    /**
     * This is the function for creating a sum write request.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    sumWriteReq(reqDescr) {
        var adsReq = {}, itemList = reqDescr.items, arrType = [], reqBuffer = [], bytes = [], listlen = itemList.length, dummy = {}, vlenMax = 0, type, format, item, idx, len, pwrData, i, k, arrayLength, mod, pcount, itemInfo;
        /**
         * Function for getting the length of a variable.
         */
        const getVarLength = () => {
            var strlen;
            len = this.plcTypeLen[type];
            if (type === 'STRING') {
                if (format !== undefined) {
                    strlen = parseInt(format, 10);
                }
                else if (typeof itemInfo.stringLength === 'number') {
                    strlen = itemInfo.stringLength;
                }
                format = (this.isValidStringLen(strlen) ? strlen : len);
            }
        };
        /*
            * Parse the stucture definition.
            */
        const parseStruct = () => {
            var j, defArr, lenArrElem, lastDefArr, mod, elem, subBuffer = [];
            /**
             * Function for adding padding bytes if an alignment is used.
             */
            const checkAlignment = () => {
                var vlen, k;
                if (this.alignment > 1 && type !== 'STRING' && type !== 'EndStruct') {
                    //Set the length for calculating padding bytes
                    vlen = len < this.alignment ? len : this.alignment;
                    //Compute the padding bytes for the alignment.
                    if (vlen > 1 && subBuffer.length > 0) {
                        mod = subBuffer.length % vlen;
                        if (mod > 0) {
                            pcount = vlen - mod;
                            for (k = 1; k <= pcount; k++) {
                                subBuffer.push(0);
                            }
                        }
                    }
                    //Store the maximum length of the PLC variables
                    //for inserting padding bytes at the end of the structure.
                    if (vlen > vlenMax) {
                        vlenMax = vlen;
                    }
                }
            };
            //Check structure definition
            if (typeof item.def === 'string') {
                item.def = this.parseVarName(item.def);
            }
            else if (this.dataTypeTableReady === true && item.def === undefined) {
                item.def = this.createStructDef(itemInfo.dataType);
            }
            else if (typeof item.def !== 'object') {
                this.log('TAME library error: No structure defininition found (sumWriteReq())!');
                this.log(item);
            }
            //Walk through the structure definiton
            for (elem in item.def) {
                if (item.def.hasOwnProperty(elem)) {
                    try {
                        defArr = item.def[elem].split('.');
                        if (defArr[0] === 'ARRAY') {
                            lenArrElem = parseInt(defArr[1], 10);
                            lastDefArr = defArr.length - 1;
                            for (j = 0; j < lenArrElem; j++) {
                                type = defArr[2];
                                if (defArr[lastDefArr] === 'SP') {
                                    if (lastDefArr >= 4) {
                                        format = defArr.slice(3, -1).join('.');
                                    }
                                }
                                else {
                                    if (lastDefArr >= 3) {
                                        format = defArr.slice(3).join('.');
                                    }
                                }
                                //Add index in case of an array of struct
                                if (i !== null) {
                                    if (defArr[lastDefArr] === 'SP') {
                                        dummy.val = item.val[i][elem + j];
                                    }
                                    else {
                                        dummy.val = item.val[i][elem][j];
                                    }
                                }
                                else {
                                    dummy.val = item.val[elem][j];
                                }
                                getVarLength();
                                checkAlignment();
                                bytes = this.dataToByteArray(dummy, type, format, len);
                                subBuffer = subBuffer.concat(bytes);
                            }
                        }
                        else {
                            //Check if we are in an array of struct
                            if (i !== null) {
                                dummy.val = item.val[i][elem];
                            }
                            else {
                                dummy.val = item.val[elem];
                            }
                            type = defArr[0];
                            if (defArr.length > 2) {
                                defArr[1] = defArr.slice(1).join('.');
                            }
                            format = defArr[1];
                            getVarLength();
                            checkAlignment();
                            bytes = this.dataToByteArray(dummy, type, format, len);
                            subBuffer = subBuffer.concat(bytes);
                        }
                    }
                    catch (e) {
                        this.log('TAME library error: Could not set values for a structure in SumWriteReq: ' + e);
                        this.log(item);
                    }
                }
            }
            //Calculate the padding bytes at the end of the structure.
            if (this.alignment > 1 && vlenMax > 1 && defArr[0] !== 'STRING' && defArr[0] !== 'EndStruct') {
                mod = subBuffer.length % vlenMax;
                if (mod > 0) {
                    pcount = vlenMax - mod;
                    for (k = 1; k <= pcount; k++) {
                        subBuffer.push(0);
                    }
                }
            }
            //Add the subPuffer with the structure data to the request buffer.
            reqBuffer = reqBuffer.concat(subBuffer);
        };
        //Preset the read length with the number of byte for error codes.
        reqDescr.readLength = listlen * 4;
        //Write the general command information to the Request Buffer
        for (idx = 0; idx < listlen; idx++) {
            item = itemList[idx];
            itemInfo = this.getItemInformation(item);
            //Get type and formatting string.
            type = itemInfo.type;
            format = itemInfo.format;
            //Length of the data type.
            len = itemInfo.size;
            //Build the request buffer.
            //The function dataToByteArray expects an item with a value for
            //converting, so a dummy object is used here.
            dummy.val = this.getIndexGroup(itemInfo);
            bytes = this.dataToByteArray(dummy, 'UDINT', format, 4);
            reqBuffer = reqBuffer.concat(bytes);
            dummy.val = this.getIndexOffset(itemInfo);
            bytes = this.dataToByteArray(dummy, 'UDINT', format, 4);
            reqBuffer = reqBuffer.concat(bytes);
            dummy.val = len;
            bytes = this.dataToByteArray(dummy, 'UDINT', format, 4);
            reqBuffer = reqBuffer.concat(bytes);
        }
        //Write the data to the Request Buffer
        for (idx = 0; idx < listlen; idx++) {
            item = itemList[idx];
            itemInfo = this.getItemInformation(item);
            //Get type and formatting string.
            type = itemInfo.type;
            format = itemInfo.format;
            //Length of the data type.
            len = itemInfo.size;
            //Reset counter for arrays.
            i = null;
            //Build the request buffer.
            //The function dataToByteArray expects an item with a value for
            //converting, so a dummy object is used here.
            switch (type) {
                case 'ARRAY':
                    arrayLength = parseInt(itemInfo.arrayLength, 10);
                    if (arrayLength !== item.val.length) {
                        this.log('TAME library error: Array length in JS differs from the length in the PLC!');
                        this.log('Length in JS: ' + item.val.length);
                        this.log('Length in PLC: ' + arrayLength);
                        this.log(item);
                        return;
                    }
                    if (itemInfo.arrayDataType === 'USER') {
                        //Array of structures.
                        for (i = 0; i < arrayLength; i++) {
                            parseStruct();
                        }
                    }
                    else {
                        //Plain array.
                        type = itemInfo.arrayDataType;
                        if (type === 'STRING') {
                            format = itemInfo.stringLength;
                        }
                        else {
                            len = itemInfo.itemSize;
                        }
                        for (i = 0; i < arrayLength; i++) {
                            dummy.val = item.val[i];
                            bytes = this.dataToByteArray(dummy, type, format, len);
                            reqBuffer = reqBuffer.concat(bytes);
                        }
                    }
                    break;
                case 'USER':
                    //Structures.
                    parseStruct();
                    break;
                default:
                    //Simple data types.
                    if (type === 'STRING') {
                        format = itemInfo.stringLength;
                    }
                    else {
                        len = itemInfo.size;
                    }
                    bytes = this.dataToByteArray(item, type, format, len);
                    reqBuffer = reqBuffer.concat(bytes);
            }
        }
        //Convert the request buffer to Base64 coded data.
        if (reqBuffer.length > 0) {
            pwrData = this.encodeBase64(reqBuffer);
        }
        //Generate the ADS request object and call the send function.
        adsReq = {
            method: 'ReadWrite',
            indexGroup: this.indexGroups.SumWr,
            indexOffset: itemList.length,
            pwrData: pwrData,
            reqDescr: reqDescr
        };
        this.createRequest(adsReq).send();
    }
    ;
    /**
     * This is the function for reading the ADS state.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    readAdsState(reqDescr) {
        //Generate the ADS request object and call the send function.
        var oefunct;
        if (reqDescr === undefined) {
            reqDescr = {};
        }
        else if (typeof reqDescr.oe == 'function') {
            //Save the original on-error function if exist.
            oefunct = reqDescr.oe;
        }
        //On-error-function, reset the state
        reqDescr.oe = () => {
            this.log('TAME library error: ADS state request failed.');
            this.adsState = null;
            this.adsStateTxt = '';
            this.deviceState = null;
            if (typeof oefunct == 'function') {
                oefunct();
            }
        };
        var adsReq = {
            method: 'ReadState',
            reqDescr: reqDescr
        };
        this.createRequest(adsReq).send();
    }
    ;
    /**
     *  Prints the cached handles to the console.
     */
    logHandleCache() {
        this.log(this.handleCache);
    }
    ;
    /**
     *  Prints the symbol table to the console.
     */
    logSymbols() {
        this.log(this.symTable);
    }
    ;
    /**
     *  Prints the data type table to the console.
     */
    logDataTypes() {
        this.log(this.dataTypeTable);
    }
    ;
    /**
     * Converts the Symbol Table to a JSON string.
     *
     * @return {Array}  jstr    The Symbol Table as a JSON string .
     */
    getSymbolsAsJSON() {
        var jstr;
        if (typeof JSON !== 'object') {
            this.log('TAME library error: No JSON parser found.');
        }
        else {
            try {
                jstr = JSON.stringify(this.symTable);
                return jstr;
            }
            catch (e) {
                this.log('TAME library error: Could not convert the Symbol Table to JSON:' + e);
            }
        }
    }
    ;
    /**
     * Reads the Symbol Table from a JSON string
     *
     * @param {String}  jstr    A JSON string with the symbols.
     */
    setSymbolsFromJSON(jstr) {
        if (typeof JSON !== 'object') {
            this.log('TAME library error: No JSON parser found.');
        }
        else {
            try {
                this.symTable = JSON.parse(jstr);
            }
            catch (e) {
                this.log('TAME library error: Could not create the Symbol Table from JSON:' + e);
                return;
            }
            this.symTableReady = true;
            this.log('TAME library info: Symbol Table successfully created from JSON data.');
        }
    }
    ;
    /**
     * Converts the Data Type Table to a JSON string.
     *
     * @return {Array}  jstr    The Data Type Table as a JSON string .
     */
    getDataTypesAsJSON() {
        var jstr;
        if (typeof JSON !== 'object') {
            this.log('TAME library error: No JSON parser found.');
        }
        else {
            try {
                jstr = JSON.stringify(this.dataTypeTable);
                return jstr;
            }
            catch (e) {
                this.log('TAME library error: Could not convert the Data Type Table to JSON:' + e);
            }
        }
    }
    ;
    /**
     * Reads the Data Type Table from a JSON string
     *
     * @param {String}  jstr    A JSON string with the data types.
     */
    setDataTypesFromJSON(jstr) {
        if (typeof JSON !== 'object') {
            this.log('TAME library error: No JSON parser found.');
        }
        else {
            try {
                this.dataTypeTable = JSON.parse(jstr);
            }
            catch (e) {
                this.log('TAME library error: Could not create the Data Type Table from JSON:' + e);
                return;
            }
            this.dataTypeTableReady = true;
            this.log('TAME library info: Data Type Table successfully created from JSON data.');
        }
    }
    ;
    /**
     * Process the webservice's server response.
     *
     * @param {Object} adsReq   The object containing the arguments of the ADS request.
     */
    parseResponse(adsReq) {
        let response, errorCode, errorText;
        let result;
        //Acknowledge the receive of a request with index 'id'.
        if (typeof adsReq.reqDescr.id === 'number') {
            this.currReq[adsReq.reqDescr.id] = 0;
        }
        //Check if the XML data object is valid.
        if (this.xmlHttpReq.responseXML === null) {
            this.log('TAME library error: Request contains no XML data. Object "responseXML" is null.');
            this.log('TAME library error: This is the "responseText":');
            this.log(this.xmlHttpReq.responseText);
            if (typeof adsReq.reqDescr.oe === 'function') {
                //on error function
                adsReq.reqDescr.oe();
            }
            return;
        }
        //Get the response
        try {
            response = this.xmlHttpReq.responseXML.documentElement;
        }
        catch (e) {
            this.log('TAME library error: No XML data in server response: ' + e);
            if (typeof adsReq.reqDescr.oe === 'function') {
                //on error function
                adsReq.reqDescr.oe();
            }
            return;
        }
        //Look for errors in the response string (i.e. ADS errors).
        try {
            //Get errors
            errorText = response.getElementsByTagName('faultstring')[0].firstChild.data;
            try {
                errorCode = response.getElementsByTagName('errorcode')[0].firstChild.data;
            }
            catch (e) {
                errorCode = '-';
            }
            this.log('TAME library error: Message from server:  ' + errorText + ' (' + errorCode + ')');
            if (typeof adsReq.reqDescr.oe === 'function') {
                //on error function
                adsReq.reqDescr.oe();
            }
            return;
        }
        catch (ex) {
            //All fine
            errorCode = 0;
        }
        //Normalize data (esp. for Firefox, who splits data in 4k chunks).
        if (typeof response.normalize === 'function') {
            response.normalize();
        }
        //Decode data if it's a read request.
        if (adsReq.method === 'ReadState') {
            this.parseAdsState(adsReq);
        }
        else if (adsReq.method === 'Read' || adsReq.method === 'ReadWrite') {
            switch (adsReq.indexGroup) {
                case this.indexGroups.UploadInfo:
                    this.parseUploadInfo(adsReq);
                    break;
                case this.indexGroups.Upload:
                    this.parseUpload(adsReq);
                    break;
                case this.indexGroups.SumRd:
                    this.parseSumReadReq(adsReq);
                    break;
                case this.indexGroups.SumWr:
                    this.parseSumWriteReq(adsReq);
                    break;
                case this.indexGroups.SumRdWr:
                    this.parseHandles(adsReq);
                    break;
                default:
                    result = this.parseReadReq(adsReq);
            }
        }
        //Call the On-Complete-Script.
        if (typeof adsReq.reqDescr.oc === 'function') {
            if (typeof adsReq.reqDescr.ocd === 'number') {
                window.setTimeout(adsReq.reqDescr.oc, adsReq.reqDescr.ocd);
            }
            else {
                adsReq.reqDescr.oc();
            }
        }
        return result;
    }
    ;
    /**
     * Get the handles from the PLC.
     *
     * @param {Array} arrSymNames   Array with the symbol names.
     */
    getHandles(reqDescr) {
        var adsReq = {}, reqBuffer = [], arrlen = reqDescr.symbols.length, bytes, idx, len, pwrData, format, symname, i;
        this.log('TAME library info: Fetching handles from the PLC.');
        //Read lenth with the number of byte for error codes.
        //4 bytes requested data, 4 bytes for errorcode and 4 bytes for the length
        reqDescr.readLength = arrlen * 12;
        //Build the Request Buffer
        for (idx = 0; idx < arrlen; idx++) {
            //Build the request buffer.
            //IndexGroup
            bytes = this.numToByteArr(this.indexGroups.HandleByName, 4);
            reqBuffer = reqBuffer.concat(bytes);
            //IndexOffset is always 0
            bytes = this.numToByteArr(0, 4);
            reqBuffer = reqBuffer.concat(bytes);
            //Handle size (4 bytes)
            bytes = this.numToByteArr(4, 4);
            reqBuffer = reqBuffer.concat(bytes);
            //String length
            bytes = this.numToByteArr(reqDescr.symbols[idx].length, 4);
            reqBuffer = reqBuffer.concat(bytes);
        }
        //Add symbol names
        for (idx = 0; idx < arrlen; idx++) {
            symname = reqDescr.symbols[idx].toUpperCase();
            //Store it for later use
            this.handleNames[idx] = symname;
            //Add symbol names to the buffer
            bytes = [];
            for (i = 0; i < symname.length; i++) {
                bytes[i] = symname.charCodeAt(i);
            }
            reqBuffer = reqBuffer.concat(bytes);
        }
        //Convert the request buffer to Base64 coded data.
        if (reqBuffer.length > 0) {
            pwrData = this.encodeBase64(reqBuffer);
        }
        //Generate the ADS request object and call the send function.
        adsReq = {
            method: 'ReadWrite',
            indexGroup: this.indexGroups.SumRdWr,
            indexOffset: arrlen,
            pwrData: pwrData,
            reqDescr: reqDescr
        };
        this.createRequest(adsReq).send();
    }
    ;
    /**
     * This is the function for releasing the cached handles.
     *
     */
    releaseHandles(reqDescr) {
        var adsReq = {}, reqBuffer = [], bytes = [], arrlen = 0, symNames = [], i = 0, idx, pwrData;
        this.log('TAME library info: Releasing handles.');
        //Check if a request descriptor exists
        if (reqDescr === undefined) {
            reqDescr = {};
        }
        //Check if a user defined handle list exists
        if (reqDescr.symbols !== undefined) {
            arrlen = reqDescr.symbols.length;
            for (idx = 0; idx < arrlen; idx++) {
                symNames[idx] = reqDescr.symbols[idx].toUpperCase();
            }
        }
        else {
            arrlen = this.handleNames.length;
            symNames = this.handleNames;
        }
        //Preset the read length with the number of byte for error codes.
        reqDescr.readLength = arrlen * 4;
        //Write the general command information to the Request Buffer
        for (idx = 0; idx < arrlen; idx++) {
            //Build the request buffer.
            //IndexGroup
            bytes = this.numToByteArr(this.indexGroups.ReleaseHandle, 4);
            reqBuffer = reqBuffer.concat(bytes);
            //IndexOffset is always 0
            bytes = this.numToByteArr(0, 4);
            reqBuffer = reqBuffer.concat(bytes);
            //Handle size (4 bytes)
            bytes = this.numToByteArr(4, 4);
            reqBuffer = reqBuffer.concat(bytes);
        }
        //Add handles codes
        for (idx = 0; idx < arrlen; idx++) {
            if (typeof this.handleCache[symNames[idx]] === 'number') {
                bytes = this.numToByteArr(this.handleCache[symNames[idx]], 4);
                reqBuffer = reqBuffer.concat(bytes);
            }
            else {
                this.log('TAME library error: Handle for symbol name ' + symNames[idx] + ' does not exist in handle cache!');
                throw 'Releasing Handles aborted!';
            }
        }
        //Convert the request buffer to Base64 coded data.
        if (reqBuffer.length > 0) {
            pwrData = this.encodeBase64(reqBuffer);
        }
        //Add the symbol names for parsing the response
        reqDescr.items = symNames;
        //This is a Release Handles Request
        reqDescr.isRelHdlReq = true;
        //Generate the ADS request object and call the send function.
        adsReq = {
            method: 'ReadWrite',
            indexGroup: this.indexGroups.SumWr,
            indexOffset: arrlen,
            pwrData: pwrData,
            reqDescr: reqDescr
        };
        this.createRequest(adsReq).send();
    }
    ;
    //======================================================================================
    //                   Methods for Creating the Symbol Table from Upload
    //                                 or the TPY File
    //======================================================================================   
    /**
     *  Get the upload info.
     */
    getUploadInfo() {
        //Generate the ADS request object and call the send function.
        var adsReq = {
            method: 'Read',
            indexGroup: this.indexGroups.UploadInfo,
            indexOffset: 0,
            reqDescr: {
                readLength: 8
                //sync: false
            }
        };
        this.createRequest(adsReq).send();
    }
    /**
     * Parse the upload information and call the request for
     * reading the upload data.
     *
     * @param {Object} adsReq   An ADS Request Descriptor.
     */
    parseUploadInfo(adsReq) {
        var response, dataString, dataSubString, data, adsReq2;
        try {
            response = this.xmlHttpReq.responseXML.documentElement;
            dataString = this.decodeBase64(response.getElementsByTagName('ppData')[0].firstChild.data);
            dataSubString = dataString.substr(0, 4);
            this.symbolCount = this.subStringToData(dataSubString, 'DWORD');
            dataSubString = dataString.substr(4, 4);
            this.uploadLength = this.subStringToData(dataSubString, 'DWORD');
        }
        catch (e) {
            this.log('TAME library error: Parsing of UploadInfo failed:' + e);
            return;
        }
        adsReq2 = {
            method: 'Read',
            indexGroup: this.indexGroups.Upload,
            indexOffset: 0,
            reqDescr: {
                readLength: this.uploadLength
                //sync: false
            }
        };
        this.createRequest(adsReq2).send();
    }
    /**
     * Parse the upload data and an object (symTable) with the symbol names
     * as the properties.
     *
     * @param {Object} adsReq   An ADS Request Descriptor.
     */
    parseUpload(adsReq) {
        var response, strAddr = 0, igOffs = 4, ioOffs = 8, sizeOffs = 12, nameOffs = 30, dataString, dataSubString, data, cnt, infoLen, nameAndType, typeArr, arrayLength, type, elem;
        try {
            response = this.xmlHttpReq.responseXML.documentElement;
            dataString = this.decodeBase64(response.getElementsByTagName('ppData')[0].firstChild.data);
            for (cnt = 0; cnt < this.symbolCount; cnt++) {
                //Get the length of the symbol information.
                dataSubString = dataString.substr(strAddr, 4);
                infoLen = this.subStringToData(dataSubString, 'DWORD');
                //Get name and type.
                nameAndType = dataString.substring(strAddr + nameOffs, (strAddr + infoLen)).split(String.fromCharCode(0));
                var name = nameAndType[0].toUpperCase();
                //Create an entry.
                this.symTable[name] = {
                    typeString: nameAndType[1],
                    indexGroup: this.subStringToData(dataString.substr(strAddr + igOffs, 4), 'DWORD'),
                    indexOffset: this.subStringToData(dataString.substr(strAddr + ioOffs, 4), 'DWORD'),
                    size: this.subStringToData(dataString.substr(strAddr + sizeOffs, 4), 'DWORD')
                };
                //Set additional information.
                typeArr = nameAndType[1].split(" ");
                if (typeArr[0] === 'ARRAY') {
                    //Type
                    this.symTable[name].type = typeArr[0];
                    //Array Length
                    arrayLength = typeArr[1].substring(1, typeArr[1].length - 1);
                    arrayLength = arrayLength.split('..');
                    this.symTable[name].arrStartIdx = parseInt(arrayLength[0], 10);
                    arrayLength = parseInt(arrayLength[1], 10) - parseInt(arrayLength[0], 10) + 1;
                    this.symTable[name].arrayLength = arrayLength;
                    //Data type of the array.
                    type = typeArr[3].split('(');
                    if (type[1] !== undefined) {
                        type[1] = type[1].substr(0, type[1].length - 1);
                        this.symTable[name].fullType = typeArr[0] + '.' + arrayLength + '.' + type[0] + '.' + type[1];
                        this.symTable[name].stringLength = parseInt(type[1], 10);
                    }
                    else {
                        this.symTable[name].fullType = typeArr[0] + '.' + arrayLength + '.' + type[0];
                    }
                    //Item length
                    this.symTable[name].itemSize = this.symTable[name].size / arrayLength;
                    //Check if variable is a user defined data type,
                    this.symTable[name].arrayDataType = 'USER';
                    for (elem in this.plcTypeLen) {
                        if (this.plcTypeLen.hasOwnProperty(elem)) {
                            if (type[0] === elem) {
                                this.symTable[name].arrayDataType = type[0];
                            }
                        }
                    }
                    if (this.symTable[name].arrayDataType === 'USER') {
                        this.symTable[name].dataType = type[0];
                    }
                }
                else {
                    type = typeArr[0].split('(');
                    if (type[1] !== undefined) {
                        //String
                        type[1] = type[1].substr(0, type[1].length - 1);
                        this.symTable[name].fullType = type[0] + '.' + type[1];
                        this.symTable[name].stringLength = parseInt(type[1], 10);
                    }
                    else {
                        this.symTable[name].fullType = type[0];
                    }
                    //Check if variable is a user defined data type,
                    this.symTable[name].type = 'USER';
                    for (elem in this.plcTypeLen) {
                        if (this.plcTypeLen.hasOwnProperty(elem)) {
                            if (type[0] === elem) {
                                this.symTable[name].type = type[0];
                            }
                        }
                    }
                    if (this.symTable[name].type === 'USER') {
                        this.symTable[name].dataType = type[0];
                    }
                }
                strAddr += infoLen;
            }
            this.symTableReady = true;
            this.log('TAME library info: End of fetching the symbols.');
            this.log('TAME library info: Symbol table ready.');
            if (this.service.syncXmlHttp !== true) {
                this.onReady();
            }
        }
        catch (e) {
            this.log('TAME library error: Parsing of uploaded symbol information failed:' + e);
            return;
        }
    }
    /**
    * Get the symbol-file (*.tpy) from the server and create
    * an object (symTable) with the symbol names as the properties.
    */
    getConfigFile() {
        this.configXmlHttpReq = this.createXMLHttpReq();
        var symbolArray = [], configFile, name, allSymbols, typeArr, arrayLength, type, elem, tcVersion, i;
        this.log('TAME library info: Start reading the TPY file.');
        //HTTPRequest
        this.configXmlHttpReq.open('GET', this.service.configFileUrl, !this.service.syncXmlHttp, this.service.serviceUser, this.service.servicePassword);
        this.configXmlHttpReq.setRequestHeader('Content-Type', 'text/xml');
        this.configXmlHttpReq.onload = () => {
            //Create a DOM object from XML
            if (typeof DOMParser != 'undefined') {
                try {
                    configFile = (new DOMParser()).parseFromString(this.configXmlHttpReq.responseText, "text/xml");
                }
                catch (e) {
                    this.log('TAME library error: Creating a DOM object from TPY failed:' + e);
                    return;
                }
            }
            else {
                this.log('TAME library error: Can\'t parse the symbol file cause your browser does not provide a DOMParser function.');
            }
            //Get the information about the PLC and the routing
            if (typeof this.service.amsNetId !== 'string' || typeof this.service.amsPort !== 'string' || this.alignment === 0) {
                this.log('TAME library info: Start reading the service information from the TPY file.');
                try {
                    this.serviceInfo = {
                        netId: configFile.getElementsByTagName('NetId')[0].childNodes[0].nodeValue,
                        port: configFile.getElementsByTagName('Port')[0].childNodes[0].nodeValue
                    };
                    tcVersion = configFile.getElementsByTagName('TwinCATVersion')[0].childNodes[0].nodeValue.charAt(0);
                    if (tcVersion === '2') {
                        this.serviceInfo.alignment = parseInt(configFile.getElementsByTagName('PackSize')[0].childNodes[0].nodeValue, 10);
                    }
                    else if (tcVersion === '3') {
                        this.serviceInfo.alignment = 8;
                    }
                    else {
                        this.log('TAME library error: Could not determine the TwinCAT version.');
                    }
                    this.log('TAME library info: End of reading the service information from the TPY file.');
                }
                catch (e) {
                    this.log('TAME library error: An error occured while reading service information from the TPY file:');
                    this.log(e);
                }
            }
            else {
                this.log('TAME library info: NetId, port and alignment manually set. Skip reading the service information from the TPY file.');
            }
            //Create the symbol table
            if (this.service.forceUploadUsage !== true) {
                this.log('TAME library info: Start reading the symbols from the TPY file.');
                try {
                    //Create an Array of the Elements with "Symbol" as tag name.
                    allSymbols = configFile.getElementsByTagName('Symbols')[0];
                    symbolArray = allSymbols.getElementsByTagName('Symbol');
                    //Get the name of the symbol and create an object property with it.
                    //symTable is declared outside in the constructor function.
                    for (i = 0; i < symbolArray.length; i++) {
                        name = symbolArray[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue.toUpperCase();
                        this.symTable[name] = {
                            typeString: symbolArray[i].getElementsByTagName('Type')[0].childNodes[0].nodeValue.toUpperCase(),
                            indexGroup: parseInt(symbolArray[i].getElementsByTagName('IGroup')[0].childNodes[0].nodeValue, 10),
                            indexOffset: parseInt(symbolArray[i].getElementsByTagName('IOffset')[0].childNodes[0].nodeValue, 10),
                            bitSize: parseInt(symbolArray[i].getElementsByTagName('BitSize')[0].childNodes[0].nodeValue, 10)
                        };
                        this.symTable[name].size = (this.symTable[name].bitSize >= 8) ? this.symTable[name].bitSize / 8 : this.symTable[name].bitSize;
                        //Set additional information.
                        typeArr = this.symTable[name].typeString.split(" ");
                        if (typeArr[0] === 'ARRAY') {
                            //Type
                            this.symTable[name].type = typeArr[0];
                            //Array length
                            arrayLength = typeArr[1].substring(1, typeArr[1].length - 1);
                            arrayLength = arrayLength.split('..');
                            this.symTable[name].arrStartIdx = parseInt(arrayLength[0], 10);
                            arrayLength = parseInt(arrayLength[1], 10) - parseInt(arrayLength[0], 10) + 1;
                            this.symTable[name].arrayLength = arrayLength;
                            //Data type of the array.
                            type = typeArr[3].split('(');
                            if (type[1] !== undefined) {
                                type[1] = type[1].substr(0, type[1].length - 1);
                                this.symTable[name].fullType = typeArr[0] + '.' + arrayLength + '.' + type[0] + '.' + type[1];
                                this.symTable[name].stringLength = parseInt(type[1], 10);
                            }
                            else {
                                this.symTable[name].fullType = typeArr[0] + '.' + arrayLength + '.' + type[0];
                            }
                            //Item length
                            this.symTable[name].itemSize = this.symTable[name].size / arrayLength;
                            //Check if variable is a user defined data type,
                            this.symTable[name].arrayDataType = 'USER';
                            for (elem in this.plcTypeLen) {
                                if (this.plcTypeLen.hasOwnProperty(elem)) {
                                    if (type[0] === elem) {
                                        this.symTable[name].arrayDataType = type[0];
                                    }
                                }
                            }
                            if (this.symTable[name].arrayDataType === 'USER') {
                                this.symTable[name].dataType = type[0];
                            }
                        }
                        else {
                            type = typeArr[0].split('(');
                            if (type[1] !== undefined) {
                                //String
                                type[1] = type[1].substr(0, type[1].length - 1);
                                this.symTable[name].fullType = type[0] + '.' + type[1];
                                this.symTable[name].stringLength = parseInt(type[1], 10);
                            }
                            else {
                                this.symTable[name].fullType = type[0];
                            }
                            //Check if variable is a user defined data type,
                            this.symTable[name].type = 'USER';
                            for (elem in this.plcTypeLen) {
                                if (this.plcTypeLen.hasOwnProperty(elem)) {
                                    if (type[0] === elem) {
                                        this.symTable[name].type = type[0];
                                    }
                                }
                            }
                            if (this.symTable[name].type === 'USER') {
                                this.symTable[name].dataType = type[0];
                            }
                        }
                    }
                    this.symTableReady = true;
                    this.log('TAME library info: End of reading the symbols from the TPY file.');
                    this.log('TAME library info: Symbol table ready.');
                }
                catch (e) {
                    this.log('TAME library error: An error occured while parsing the symbol file:');
                    this.log(e);
                }
            }
            else {
                this.log('TAME library info: Reading the symbols from the TPY file is deactivated.');
            }
            //Get the data types.
            var allDataTypes, dataTypeArray, subItemArray, sName, fullName;
            if (true) {
                this.log('TAME library info: Start reading the data types from the TPY file.');
                try {
                    //Create an Array of the Elements with "DataType" as tag name.
                    allDataTypes = configFile.getElementsByTagName('DataTypes')[0];
                    dataTypeArray = allDataTypes.getElementsByTagName('DataType');
                    //Get the name of the data type and create an object property with it.
                    //dataTypeTable is declared outside in the constructor function.
                    //Arrays first
                    for (i = 0; i < dataTypeArray.length; i++) {
                        fullName = dataTypeArray[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue.toUpperCase();
                        name = fullName.split(" ")[0];
                        if (name === 'ARRAY') {
                            this.dataTypeTable[fullName] = {
                                //type: dataTypeArray[i].getElementsByTagName('Type')[0].childNodes[0].nodeValue.toUpperCase(),
                                bitSize: parseInt(dataTypeArray[i].getElementsByTagName('BitSize')[0].childNodes[0].nodeValue, 10)
                            };
                            this.dataTypeTable[fullName].size = this.dataTypeTable[fullName].bitSize / 8;
                        }
                    }
                    //Then the rest
                    for (i = 0; i < dataTypeArray.length; i++) {
                        fullName = dataTypeArray[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue.toUpperCase();
                        name = fullName.split(" ")[0];
                        if (name !== 'ARRAY') {
                            this.dataTypeTable[name] = {
                                //type: dataTypeArray[i].getElementsByTagName('Type')[0].childNodes[0].nodeValue.toUpperCase(),
                                bitSize: parseInt(dataTypeArray[i].getElementsByTagName('BitSize')[0].childNodes[0].nodeValue, 10),
                                subItems: {}
                            };
                            this.dataTypeTable[name].size = this.dataTypeTable[name].bitSize / 8;
                            //Get the SubItems
                            subItemArray = dataTypeArray[i].getElementsByTagName('SubItem');
                            for (var j = 0; j < subItemArray.length; j++) {
                                sName = subItemArray[j].getElementsByTagName('Name')[0].childNodes[0].nodeValue.toUpperCase();
                                //Only SubItems with type information (problem occurs with TC3 and some libs)
                                if (subItemArray[j].getElementsByTagName('Type').length > 0) {
                                    //sName = subItemArray[j].getElementsByTagName('Name')[0].childNodes[0].nodeValue.toUpperCase();
                                    this.dataTypeTable[name].subItems[sName] = {
                                        typeString: subItemArray[j].getElementsByTagName('Type')[0].childNodes[0].nodeValue.toUpperCase(),
                                        pointer: subItemArray[j].getElementsByTagName('Type')[0].hasAttribute('Pointer'),
                                        bitSize: parseInt(subItemArray[j].getElementsByTagName('BitSize')[0].childNodes[0].nodeValue, 10)
                                    };
                                    if (subItemArray[j].getElementsByTagName('BitOffs')[0] !== undefined) {
                                        this.dataTypeTable[name].subItems[sName].bitOffset = parseInt(subItemArray[j].getElementsByTagName('BitOffs')[0].childNodes[0].nodeValue, 10);
                                    }
                                    this.dataTypeTable[name].subItems[sName].size = (this.dataTypeTable[name].subItems[sName].bitSize >= 8) ? this.dataTypeTable[name].subItems[sName].bitSize / 8 : this.dataTypeTable[name].subItems[sName].bitSize;
                                    //Set additional information
                                    typeArr = this.dataTypeTable[name].subItems[sName].typeString.split(" ");
                                    if (typeArr[0] === 'ARRAY') {
                                        //Type
                                        this.dataTypeTable[name].subItems[sName].type = typeArr[0];
                                        //Array Length
                                        arrayLength = typeArr[1].substring(1, typeArr[1].length - 1);
                                        arrayLength = arrayLength.split('..');
                                        this.dataTypeTable[name].subItems[sName].arrStartIdx = parseInt(arrayLength[0], 10);
                                        arrayLength = parseInt(arrayLength[1], 10) - parseInt(arrayLength[0], 10) + 1;
                                        this.dataTypeTable[name].subItems[sName].arrayLength = arrayLength;
                                        //Data type of the array.
                                        type = typeArr[3].split('(');
                                        if (type[1] !== undefined) {
                                            type[1] = type[1].substr(0, type[1].length - 1);
                                            this.dataTypeTable[name].subItems[sName].fullType = typeArr[0] + '.' + arrayLength + '.' + type[0] + '.' + type[1];
                                            this.dataTypeTable[name].subItems[sName].stringLength = parseInt(type[1], 10);
                                        }
                                        else {
                                            this.dataTypeTable[name].subItems[sName].fullType = typeArr[0] + '.' + arrayLength + '.' + type[0];
                                        }
                                        //Check added cause there are undefined data types some TwinCAT libs                                         
                                        if (this.service.skipMissingTypes === true && this.dataTypeTable[this.dataTypeTable[name].subItems[sName].typeString] === undefined) {
                                            this.log('TAME library error: Data type missing in TPY file:');
                                            this.log(this.dataTypeTable[name].subItems[sName]);
                                            this.log('TAME library warning: Access to symbols using this data type will return wrong results:');
                                            this.log(name);
                                            this.log('TAME library info: Use handles to access symbols using this data type.');
                                        }
                                        else {
                                            if (this.dataTypeTable[this.dataTypeTable[name].subItems[sName].typeString] === undefined) {
                                                this.log('TAME library error: Data type missing in TPY file!');
                                                this.log('TAME library info: If you don\'t use this data type you can set the client parameter "skipMissingTypes" to true.');
                                            }
                                            this.dataTypeTable[name].subItems[sName].bitSize = this.dataTypeTable[this.dataTypeTable[name].subItems[sName].typeString].bitSize;
                                            this.dataTypeTable[name].subItems[sName].size = this.dataTypeTable[this.dataTypeTable[name].subItems[sName].typeString].size;
                                        }
                                        //Item length
                                        this.dataTypeTable[name].subItems[sName].itemSize = this.dataTypeTable[name].subItems[sName].size / arrayLength;
                                        //Check if variable is a user defined data type,
                                        this.dataTypeTable[name].subItems[sName].arrayDataType = 'USER';
                                        for (elem in this.plcTypeLen) {
                                            if (this.plcTypeLen.hasOwnProperty(elem)) {
                                                if (type[0] === elem) {
                                                    this.dataTypeTable[name].subItems[sName].arrayDataType = type[0];
                                                }
                                            }
                                        }
                                        if (this.dataTypeTable[name].subItems[sName].arrayDataType === 'USER') {
                                            this.dataTypeTable[name].subItems[sName].dataType = type[0];
                                        }
                                    }
                                    else {
                                        type = typeArr[0].split('(');
                                        if (type[1] !== undefined) {
                                            //String
                                            type[1] = type[1].substr(0, type[1].length - 1);
                                            this.dataTypeTable[name].subItems[sName].fullType = type[0] + '.' + type[1];
                                            this.dataTypeTable[name].subItems[sName].stringLength = parseInt(type[1], 10);
                                        }
                                        else {
                                            this.dataTypeTable[name].subItems[sName].fullType = type[0];
                                        }
                                        //Check if variable is a user defined data type,
                                        this.dataTypeTable[name].subItems[sName].type = 'USER';
                                        for (elem in this.plcTypeLen) {
                                            if (this.plcTypeLen.hasOwnProperty(elem)) {
                                                if (type[0] === elem) {
                                                    this.dataTypeTable[name].subItems[sName].type = type[0];
                                                }
                                            }
                                        }
                                        if (this.dataTypeTable[name].subItems[sName].type === 'USER') {
                                            this.dataTypeTable[name].subItems[sName].dataType = type[0];
                                        }
                                    }
                                }
                                else {
                                    this.log('TAME library warning: Skipping SubItem with no type information: Data type: ' + name + ' ,SubItem: ' + sName);
                                }
                            }
                        }
                    }
                    this.dataTypeTableReady = true;
                    this.log('TAME library info: End of reading the data types from the TPY file.');
                    this.log('TAME library info: Data type table ready.');
                    //Get Upload Info
                    this.checkGetUploadInfo();
                }
                catch (e) {
                    this.log('TAME library error: An error occured while creating the data type information:');
                    this.log('Type: ' + fullName);
                    this.log('SubItem: ' + sName);
                    this.log(e);
                }
            }
        };
        this.configXmlHttpReq.send(null);
    }
    /**
     *  Set the service parameter with the values read from the TPY file.
     */
    setServiceParamFromTPY() {
        if (typeof this.service.amsNetId !== 'string') {
            this.service.amsNetId = this.serviceInfo.netId;
            this.log('TAME library info: No NetId definition found. NetId from TPY file will be used.');
        }
        if (typeof this.service.amsPort !== 'string') {
            this.service.amsPort = this.serviceInfo.port;
            this.log('TAME library info: No AMS port definition found. Port number from TPY file will be used.');
        }
        if (this.alignment === 0) {
            if (this.serviceInfo.alignment !== undefined) {
                this.alignment = this.serviceInfo.alignment;
                this.log('TAME library info: No alignment parameter found. Alignment from TPY file will be used.');
            }
            else {
                this.alignment = 1;
                this.log('TAME library warning: Can\'t get a value for the data aligment. Default value for alignment is used (1). This works only with TC2 and x86 processors.');
            }
        }
        if (this.alignment !== 1 && this.alignment !== 4 && this.alignment !== 8) {
            this.log('TAME library warning: The value for the alignment should be 1, 4 or 8.');
        }
        this.log('TAME library info: Target information: NetId: ' + this.service.amsNetId + ', AMS port: ' + this.service.amsPort + ' , alignment: ' + this.alignment);
    }
    /**
     * Check if the UploadInfo has to be fetched.
     */
    checkGetUploadInfo() {
        this.setServiceParamFromTPY();
        if (typeof this.service.configFileUrl != 'string' || this.service.forceUploadUsage === true) {
            this.log('TAME library info: Start fetching the symbols from PLC.');
            //Get the UploadInfo.
            try {
                this.getUploadInfo();
            }
            catch (e) {
                this.log('TAME library error: Could\'nt fetch the symbol information from the PLC:' + e);
                return;
            }
        }
        else {
            if (this.service.syncXmlHttp !== true) {
                this.onReady();
            }
        }
    }
    /**
     * Call the onReady function.
     */
    onReady() {
        //On-ready-function
        if (typeof this.service.onReady === 'function') {
            this.log('TAME library info: Calling the "onReady" function.');
            this.service.onReady();
        }
        else {
            this.log('TAME library error: No "onReady" function defined. Check the manual.');
        }
        //Start cyclic ADS checks if defined
        if (!isNaN(this.service.adsCheckInterval) && this.service.adsCheckInterval >= 1) {
            this.log('TAME library info: Start cyclic reading of ADS state.');
            setInterval(this.readAdsState, this.service.adsCheckInterval);
        }
    }
}
exports.TAME = TAME;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFhLElBQUk7SUF1SWIsWUFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUF0SS9CLFlBQU8sR0FBRyxlQUFlLENBQUE7UUFDekIsb0JBQWUsR0FBRztZQUNkLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUM5QyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDeEQsQ0FBQTtRQUNELG1CQUFjLEdBQUc7WUFDYixFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFDckYsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO1NBQ3JGLENBQUE7UUFDRCxxQkFBZ0IsR0FBRztZQUNmLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3hGLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFD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QSxDQUFBO1FBQ3pFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3ZFLGdCQUFXLEdBQUcsQ0FBTyxJQUFJLEVBQUUsRUFBRSxnREFBQyxPQUFBLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBLEdBQUEsQ0FBQTtRQUM3RSxnQkFBVyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDN0UsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsY0FBUyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDekUsY0FBUyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDekUsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsZ0JBQVcsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzdFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3ZFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBRXJFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3BFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFB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QUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsMEVBQTBFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pGLE9BQU87YUFDVjtTQUNKO2FBQU07WUFDSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtnQkFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2xCO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0gsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsc0VBQXNFLENBQUMsQ0FBQztTQUNwRjtRQUNELG9DQUFvQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixJQUFJLENBQUMsRUFBRTtZQUM3RSxJQUFJLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7WUFDbEUsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0wsQ0FBQztDQUVKO0FBcHpKRCxvQkFvekpDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRBTUUge1xuICAgIHZlcnNpb24gPSAnVjQuMy4xIDE3MTEyMCdcbiAgICB3ZWVrZFNob3J0TmFtZXMgPSB7XG4gICAgICAgIGdlOiBbJ1NvJywgJ01vJywgJ0RpJywgJ01pJywgJ0RvJywgJ0ZyJywgJ1NhJ10sXG4gICAgICAgIGVuOiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddXG4gICAgfVxuICAgIHdlZWtkTG9uZ05hbWVzID0ge1xuICAgICAgICBnZTogWydTb25udGFnJywgJ01vbnRhZycsICdEaWVuc3RhZycsICdNaXR0d29jaCcsICdEb25uZXJzdGFnJywgJ0ZyZWl0YWcnLCAnU2Ftc3RhZyddLFxuICAgICAgICBlbjogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG4gICAgfVxuICAgIG1vbnRoc1Nob3J0TmFtZXMgPSB7XG4gICAgICAgIGdlOiBbJ0phbicsICdGZWInLCAnTXJ6JywgJ0FwcicsICdNYWknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09rdCcsICdOb3YnLCAnRGV6J10sXG4gICAgICAgIGVuOiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZXonXVxuICAgIH1cbiAgICBtb250aHNMb25nTmFtZXMgPSB7XG4gICAgICAgIGdlOiBbJ0phbnVhcicsICdGZWJydWFyJywgJ03DpHJ6JywgJ0FwcmlsJywgJ01haScsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPa3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlemVtYmVyJ10sXG4gICAgICAgIGVuOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXVxuICAgIH1cbiAgICBkYXRlTmFtZXM6IHsgd2Vla2RTaG9ydDogYW55OyB3ZWVrZExvbmc6IGFueTsgbW9udGhzU2hvcnQ6IGFueTsgbW9udGhzTG9uZzogYW55IH1cbiAgICBtYXhTdHJpbmdMZW46IG51bWJlclxuICAgIG1heERyb3BSZXE6IG51bWJlclxuICAgIHVzZUNoZWNrQm91bmRzOiBib29sZWFuXG4gICAgYWRzU3RhdGU6IGFueVxuICAgIGFkc1N0YXRlVHh0OiBzdHJpbmdcbiAgICBkZXZpY2VTdGF0ZTogYW55XG4gICAgc3ltVGFibGVSZWFkeTogYm9vbGVhblxuICAgIGRhdGFUeXBlVGFibGVSZWFkeTogYm9vbGVhblxuICAgIGhhbmRsZUNhY2hlUmVhZHk6IGJvb2xlYW5cbiAgICB4bWxIdHRwUmVxVGltZW91dDogbnVtYmVyXG5cbiAgICBpbmRleEdyb3VwcyA9IHtcbiAgICAgICAgTTogMTY0MTYsICAgIC8vUExDIG1lbW9yeSByYW5nZSglTSBmaWVsZCksIFJFQURfTSAtIFdSSVRFX01cbiAgICAgICAgTVg6IDE2NDE3LCAgIC8vUExDIG1lbW9yeSByYW5nZSglTVggZmllbGQpLCBSRUFEX01YIC0gV1JJVEVfTVhcbiAgICAgICAgREI6IDE2NDQ4LCAgIC8vRGF0YSByYW5nZVxuICAgICAgICBJOiA2MTQ3MiwgICAgLy9QTEMgcHJvY2VzcyBkaWFncmFtIG9mIHRoZSBwaHlzaWNhbCBpbnB1dHMoJUkgZmllbGQpLCBSRUFEX0kgLSBXUklURV9JXG4gICAgICAgIElYOiA2MTQ3MywgICAvL1BMQyBwcm9jZXNzIGRpYWdyYW0gb2YgdGhlIHBoeXNpY2FsIGlucHV0cyglSVggZmllbGQpLCBSRUFEX0lYIC0gV1JJVEVfSVhcbiAgICAgICAgUTogNjE0ODgsICAgIC8vUExDIHByb2Nlc3MgZGlhZ3JhbSBvZiB0aGUgcGh5c2ljYWwgb3V0cHV0cyglUSBmaWVsZCksIFJFQURfUSAtIFdSSVRFX1FcbiAgICAgICAgUVg6IDYxNDg5LCAgIC8vUExDIHByb2Nlc3MgZGlhZ3JhbSBvZiB0aGUgcGh5c2ljYWwgb3V0cHV0cyglUVggZmllbGQpLCBSRUFEX1FYIC0gV1JJVEVfUVhcbiAgICAgICAgVXBsb2FkOiA2MTQ1MSwgICAgICAvL0NvbnRhaW5zIHRoZSBzeW1ib2wgaW5mb3JtYXRpb25cbiAgICAgICAgVXBsb2FkSW5mbzogNjE0NTIsICAvL0xlbmd0aCBhbmQgbnVtYmVyIG9mIHRoZSBzeW1ib2wgaW5mb3JtYXRpb24gICAgICAgIFxuICAgICAgICBIYW5kbGVCeU5hbWU6IDYxNDQzLFxuICAgICAgICBWYWx1ZUJ5SGFuZGxlOiA2MTQ0NSxcbiAgICAgICAgUmVsZWFzZUhhbmRsZTogNjE0NDYsXG4gICAgICAgIFN1bVJkOiA2MTU2OCwgICAgICAgLy9TdW1VcFJlYWRSZXF1ZXN0XG4gICAgICAgIFN1bVdyOiA2MTU2OSwgICAgICAgLy9TdW1VcFdyaXRlUmVxdWVzdFxuICAgICAgICBTdW1SZFdyOiA2MTU3MCAgICAgIC8vU3VtVXBSZWFkV3JpdGVSZXF1ZXN0XG4gICAgfVxuXG4gICAgLy9MZW5naHQgb2YgUExDIGRhdGEgdHlwZXMgaW4gYnl0ZXMuXG4gICAgcGxjVHlwZUxlbiA9IHtcbiAgICAgICAgQk9PTDogMSxcbiAgICAgICAgQllURTogMSxcbiAgICAgICAgVVNJTlQ6IDEsXG4gICAgICAgIFNJTlQ6IDEsXG4gICAgICAgIFdPUkQ6IDIsXG4gICAgICAgIFVJTlQ6IDIsXG4gICAgICAgIElOVDogMixcbiAgICAgICAgSU5UMTY6IDIsXG4gICAgICAgIElOVDFEUDogMixcbiAgICAgICAgSU5UMkRQOiAyLFxuICAgICAgICBEV09SRDogNCxcbiAgICAgICAgVURJTlQ6IDQsXG4gICAgICAgIERJTlQ6IDQsXG4gICAgICAgIFRJTUU6IDQsICAgICAgICAgIC8vdGltZSBiYXNlIGluIFBMQzogbWlsbGlzZWNvbmRzXG4gICAgICAgIFRPRDogNCwgICAgICAgICAgIC8vdGltZSBiYXNlIGluIFBMQzogbWlsbGlzZWNvbmRzXG4gICAgICAgIFRJTUVfT0ZfREFZOiA0LCAgIC8vVHdpbkNBVDMsIHRpbWUgYmFzZSBpbiBQTEM6IG1pbGxpc2Vjb25kc1xuICAgICAgICBEQVRFOiA0LCAgICAgICAgICAvL3RpbWUgYmFzZSBpbiBQTEM6IHNlY29uZHNcbiAgICAgICAgRFQ6IDQsICAgICAgICAgICAgLy90aW1lIGJhc2UgaW4gUExDOiBzZWNvbmRzXG4gICAgICAgIERBVEVfQU5EX1RJTUU6IDQsIC8vVHdpbkNBVDMsIHRpbWUgYmFzZSBpbiBQTEM6IHNlY29uZHNcbiAgICAgICAgUE9JTlRFUjogNCxcbiAgICAgICAgUkVBTDogNCxcbiAgICAgICAgTFJFQUw6IDgsXG4gICAgICAgIFNUUklORzogODAsICAgIC8vd2l0aG91dCB0ZXJtaW5hdGlvblxuICAgICAgICBFbmRTdHJ1Y3Q6IDAgICAvL3Nob3VsZCBiZSAwIVxuICAgIH1cblxuICAgIC8vQURTIHN0YXRlc1xuICAgIGFkc1N0YXRlcyA9IFtcbiAgICAgICAgXCJJTlZBTElEXCIsXG4gICAgICAgIFwiSURMRVwiLFxuICAgICAgICBcIlJFU0VUXCIsXG4gICAgICAgIFwiSU5JVFwiLFxuICAgICAgICBcIlNUQVJUXCIsXG4gICAgICAgIFwiUlVOXCIsXG4gICAgICAgIFwiU1RPUFwiLFxuICAgICAgICBcIlNBVkVDRkdcIixcbiAgICAgICAgXCJQT1dFUkdPT0RcIixcbiAgICAgICAgXCJFUlJPUlwiLFxuICAgICAgICBcIlNIVVRET1dOXCIsXG4gICAgICAgIFwiU1VTUEVORFwiLFxuICAgICAgICBcIlJFU1VNRVwiLFxuICAgICAgICBcIkNPTkZJR1wiLFxuICAgICAgICBcIlJFQ09ORklHXCJcbiAgICBdXG4gICAgbGFuZzogYW55XG4gICAgYWxpZ25tZW50OiBudW1iZXJcbiAgICBjdXJyUmVxOiBudW1iZXJbXVxuICAgIHN5bVRhYmxlID0ge31cbiAgICBkYXRhVHlwZVRhYmxlID0ge31cbiAgICBzZXJ2aWNlSW5mbyA9IHt9IGFzIGFueVxuICAgIHN5bWJvbENvdW50OiBudW1iZXJcbiAgICB1cGxvYWRMZW5ndGg6IG51bWJlclxuICAgIGhhbmRsZUNhY2hlID0ge31cbiAgICBoYW5kbGVOYW1lczogYW55W11cbiAgICB4bWxIdHRwUmVxOiBhbnlcbiAgICBsb2cobWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhbGVydChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL0dlbmVyYXRlIGEgQmFzZTY0IGFscGhhYmV0IGZvciB0aGUgZW5jb2Rlci4gVXNpbmcgYW4gYXJyYXkgb3Igb2JqZWN0IHRvXG4gICAgLy9zdG9yZSB0aGUgYWxwaGFiZXQgdGhlIGVuLS9kZWNvZGVyIHJ1bnMgZmFzdGVyIHRoYW4gd2l0aCB0aGUgY29tbW9ubHlcbiAgICAvL3VzZWQgc3RyaW5nLiBBdCBsZWFzdCB3aXRoIHRoZSBicm93c2VycyBvZiAyMDA5LiA7LSlcbiAgICBiNjRFbmMgPSAoKCkgPT4ge1xuICAgICAgICB2YXIgcmV0ID0ge30sXG4gICAgICAgICAgICBzdHIgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLycsXG4gICAgICAgICAgICBpOiBudW1iZXI7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJldFtpXSA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KSgpO1xuXG4gICAgLy9HZW5lcmF0ZSBhIEJhc2U2NCBhbHBoYWJldCBmb3IgdGhlIGRlY29kZXIuXG4gICAgYjY0RGVjID0gKCgpID0+IHtcbiAgICAgICAgdmFyIHJldCA9IHt9LFxuICAgICAgICAgICAgc3RyID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JyxcbiAgICAgICAgICAgIGk6IG51bWJlcjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmV0W3N0ci5jaGFyQXQoaSldID0gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0pKCk7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNlcnZpY2U6IGFueSkge1xuXG4gICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgdmVyc2lvbjogJyArIHRoaXMudmVyc2lvbik7XG5cbiAgICAgICAgLy9TZXQgbGFuZ3VhZ2UgZm9yIG5hbWVzIG9mIGRheXMgYW5kIG1vbnRocywgZGVmYXVsdCBpcyBnZXJtYW4uXG4gICAgICAgIHRoaXMubGFuZyA9ICh0eXBlb2Ygc2VydmljZS5sYW5ndWFnZSA9PT0gJ3N0cmluZycpID8gc2VydmljZS5sYW5ndWFnZSA6ICdnZScsXG5cbiAgICAgICAgLy9BbGlnbm1lbnRcbiAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSAwLFxuXG4gICAgICAgIC8vQXJyYXkgZm9yIHRoZSByZXF1ZXN0IGFja25vd2xlZGdlbWVudCBjb3VudGVyLlxuICAgICAgICB0aGlzLmN1cnJSZXEgPSBbMF0sXG5cbiAgICAgICAgLy9UaGUgU3ltYm9sIFRhYmxlIGZvciBhY2Nlc3NpbmcgdmFyaWFibGVzIHBlciBuYW1lLlxuICAgICAgICB0aGlzLnN5bVRhYmxlID0ge30sXG4gICAgICAgIC8vdGhpcy5zeW1UYWJsZU9rID0gZmFsc2UsXG4gICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZSA9IHt9LFxuICAgICAgICAvL3RoaXMuZGF0YVR5cGVUYWJsZU9rID0gZmFsc2UsXG4gICAgICAgIHRoaXMuc2VydmljZUluZm8gPSB7fSxcblxuICAgICAgICAvL1ZhcmlhYmxlcyBvZiB0aGUgVXBsb2FkSW5mbyBcbiAgICAgICAgdGhpcy5zeW1ib2xDb3VudCA9IDAsIHRoaXMudXBsb2FkTGVuZ3RoID0gMCxcblxuICAgICAgICAvL09iamVjdCB0byBzdG9yZSB0aGUgaGFuZGxlc1xuICAgICAgICB0aGlzLmhhbmRsZUNhY2hlID0ge30sXG4gICAgICAgIHRoaXMuaGFuZGxlTmFtZXMgPSBbXTtcblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoZWNrIENsaWVudCBQYXJhbWV0ZXJcbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8vVVJMIG9mIHRoZSBUY0Fkc1dlYlNlcnZpY2UuZGxsXG4gICAgICAgIGlmICh0eXBlb2Ygc2VydmljZS5zZXJ2aWNlVXJsICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogU2VydmljZSBVUkwgaXMgbm90IGEgc3RyaW5nIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BTVMgTmV0SUQgb2YgdGhlIFBMQ1xuICAgICAgICBpZiAodHlwZW9mIHNlcnZpY2UuYW1zTmV0SWQgIT09ICdzdHJpbmcnICYmICh0eXBlb2Ygc2VydmljZS5jb25maWdGaWxlVXJsICE9PSAnc3RyaW5nJyB8fCBzZXJ2aWNlLmRvbnRGZXRjaFN5bWJvbHMgPT09IHRydWUpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBOZXRJZCBpcyBub3QgZGVmaW5lZCBhbmQgdGhlcmUgaXMgbm8gVVJMIGZvciBmZXRjaGluZyB0aGUgVFBZIGZpbGUgb3IgZmV0Y2hpbmcgdGhlIHN5bWJvbHMgaXMgZGVhY3RpdmF0ZWQhJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL0FNUyBQb3J0IE51bWJlciBvZiB0aGUgUnVudGltZSBTeXN0ZW1cbiAgICAgICAgaWYgKHNlcnZpY2UuYW1zUG9ydCA9PT0gdW5kZWZpbmVkICYmICh0eXBlb2Ygc2VydmljZS5jb25maWdGaWxlVXJsICE9PSAnc3RyaW5nJyB8fCBzZXJ2aWNlLmRvbnRGZXRjaFN5bWJvbHMgPT09IHRydWUpKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLmFtc1BvcnQgPSAnODAxJztcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogQU1TIHBvcnQgbnVtYmVyIGlzIG5vdCBzZXQhIERlZmF1bHQgcG9ydCA4MDEgd2lsbCBiZSB1c2VkLicpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXJ2aWNlLmFtc1BvcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IEFNUyBwb3J0IG51bWJlciBpcyBub3QgYSBzdHJpbmchIFRyeWluZyB0byBjb252ZXJ0IGl0LicpO1xuICAgICAgICAgICAgc2VydmljZS5hbXNQb3J0ID0gc2VydmljZS5hbXNQb3J0LnRvU3RyaW5nKDEwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyc2VJbnQoc2VydmljZS5hbXNQb3J0LCAxMCkgPCA4MDEgfHwgcGFyc2VJbnQoc2VydmljZS5hbXNQb3J0LCAxMCkgPiA4OTEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFNUyBQb3J0IE51bWJlciAoJyArIHBhcnNlSW50KHNlcnZpY2UuYW1zUG9ydCwgMTApICsgJykgaXMgb3V0IG9mIHJhbmdlICg4MDEtODkxKSEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRGF0YSBhbGlnbm1lbnQsIHg4NiBhbmQgVEMyIHVzZXMgYSAxIGJ5dGUgYWxpZ25tZW50LCBmb3IgYW4gQVJNIGFuZCBUQzIgc2V0IGl0IHRvIDQgYW5kXG4gICAgICAgIC8vZm9yIFRDMyBnZW5lcmFsbHkgdG8gODsgXG4gICAgICAgIC8vZGF0YUFsaWduNCBpcyBkZXByaWNhdGVkXG4gICAgICAgIGlmIChzZXJ2aWNlLmRhdGFBbGlnbjQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWxpZ25tZW50ID0gNDtcbiAgICAgICAgfSBlbHNlIGlmIChzZXJ2aWNlLmFsaWdubWVudCA9PT0gdW5kZWZpbmVkICYmICh0eXBlb2Ygc2VydmljZS5jb25maWdGaWxlVXJsICE9PSAnc3RyaW5nJyB8fCBzZXJ2aWNlLmRvbnRGZXRjaFN5bWJvbHMgPT09IHRydWUpKSB7XG4gICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlcnZpY2UuYWxpZ25tZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSBwYXJzZUludChzZXJ2aWNlLmFsaWdubWVudCwgMTApO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXJ2aWNlLmFsaWdubWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuYWxpZ25tZW50ID0gc2VydmljZS5hbGlnbm1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dsb2JhbCBzeW5jaHJvbm91cyBYTUxIVFRQUmVxdWVzdHNcbiAgICAgICAgaWYgKHNlcnZpY2Uuc3luY1htbEh0dHAgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogVGhlIFwic3luY1htbEh0dHBcIiBwYXJhbWV0ZXIgaXMgc2V0IHRvIHRydWUuIFN5bmNocm9ub3VzIFhNTEh0dHBSZXF1ZXN0cyB3aWxsIGJlIHVzZWQgYnkgZGVmYXVsdC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vRG9uJ3QgbGV0IGl0IHVuZGVmaW5lZFxuICAgICAgICAgICAgc2VydmljZS5zeW5jWG1sSHR0cCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Vc2VybmFtZS9wYXNzd29yZFxuICAgICAgICBpZiAodHlwZW9mIHNlcnZpY2Uuc2VydmljZVVzZXIgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBzZXJ2aWNlLnNlcnZpY2VQYXNzd29yZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogVXNlcm5hbWUgYW5kIHBhc3N3b3JkIHNldC4gQXV0aGVudGljYXRlZCByZXF1ZXN0cyB3aWxsIGJlIHVzZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VVc2VyID0gbnVsbDtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZVBhc3N3b3JkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2xvYmFsIHVzZSBvZiBoYW5kbGVzXG4gICAgICAgIGlmIChzZXJ2aWNlLnVzZUhhbmRsZXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogVGhlIFwidXNlSGFuZGxlc1wiIHBhcmFtZXRlciBpcyBzZXQgdG8gdHJ1ZS4gSGFuZGxlcyB3aWxsIGJlIHVzZWQgYnkgZGVmYXVsdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRG9uJ3QgY2hlY2sgZm9yIG1pc3NpbmcgZGF0YSB0eXBlcyAodGhhdHMgYSBwcm9ibGVtIHdpdGggc29tZSBUd2luQ0FUIGxpYnMpXG4gICAgICAgIGlmIChzZXJ2aWNlLnNraXBNaXNzaW5nVHlwZXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogVGhlIFwic2tpcE1pc3NpbmdUeXBlc1wiIHBhcmFtZXRlciBpcyBzZXQgdG8gdHJ1ZS4gVEFNRSBqdXN0IGRyb3BzIGEgbG9nIG1lc3NhZ2UgaWYgdGhlcmUgYXJlIFR3aW5DQVQgbGlicyB3aXRoIG1pc3NpbmcgZGF0YSB0eXBlcy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2tpcE1pc3NpbmdUeXBlcyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DeWNsaWMgQURTIGNoZWNrcyAoZXhwZXJpbWVudGFsKS5cbiAgICAgICAgaWYgKCFpc05hTihzZXJ2aWNlLmFkc0NoZWNrSW50ZXJ2YWwpICYmIHNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEN5Y2xpYyBBRFMgc3RhdGUgY2hlY2tzIGVuYWJsZWQuIEludGVydmFsIHRpbWU6ICcgKyBzZXJ2aWNlLmFkc0NoZWNrSW50ZXJ2YWwgKyAnIG1zLicpO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5pdGlhbGl6ZSBQcm9wZXJ0aWVzXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvL1NldCBsYW5ndWFnZSBzcGVjaWZpYyBuYW1lcyBvZiBkYXlzIGFuZCBtb250aHMuXG4gICAgICAgIHRoaXMuZGF0ZU5hbWVzID0ge1xuICAgICAgICAgICAgd2Vla2RTaG9ydDogdGhpcy53ZWVrZFNob3J0TmFtZXNbdGhpcy5sYW5nXSxcbiAgICAgICAgICAgIHdlZWtkTG9uZzogdGhpcy53ZWVrZExvbmdOYW1lc1t0aGlzLmxhbmddLFxuICAgICAgICAgICAgbW9udGhzU2hvcnQ6IHRoaXMubW9udGhzU2hvcnROYW1lc1t0aGlzLmxhbmddLFxuICAgICAgICAgICAgbW9udGhzTG9uZzogdGhpcy5tb250aHNMb25nTmFtZXNbdGhpcy5sYW5nXVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vTWF4aW11bSBzdHJpbmcgbGVuZ3RoLlxuICAgICAgICB0aGlzLm1heFN0cmluZ0xlbiA9IDI1NTtcblxuICAgICAgICAvL01heGltdW0gY291bnQgb2YgZHJvcHBlZCByZXF1ZXN0cyBhZnRlciBhIHJlcXVlc3RcbiAgICAgICAgLy93YXMgbm90IGFja25vd2xlZGdlZCAoaW4gY29uanVuY3Rpb24gd2l0aCBhIHJlcWVzdCBJRCkuXG4gICAgICAgIHRoaXMubWF4RHJvcFJlcSA9IDEwO1xuXG4gICAgICAgIC8vQ2hlY2sgbGltaXRzIG9mIG51bWVyaWMgdmFyaWFibGVzIGJlZm9yZSBzZW5kaW5nIHRoZW0gdG8gdGhlIFBMQ1xuICAgICAgICB0aGlzLnVzZUNoZWNrQm91bmRzID0gdHJ1ZTtcblxuICAgICAgICAvL0FEUyBzdGF0ZXNcbiAgICAgICAgdGhpcy5hZHNTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWRzU3RhdGVUeHQgPSAnJztcbiAgICAgICAgdGhpcy5kZXZpY2VTdGF0ZSA9IG51bGw7XG5cbiAgICAgICAgLy9SZWFkeSBzdGF0ZXNcbiAgICAgICAgdGhpcy5zeW1UYWJsZVJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFuZGxlQ2FjaGVSZWFkeSA9IGZhbHNlO1xuXG4gICAgICAgIC8vWE1MSHR0cFJlcXVlc3QgdGltZW91dFxuICAgICAgICB0aGlzLnhtbEh0dHBSZXFUaW1lb3V0ID0gNTAwMDtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIG5hbWVzIG9mIHRoZSBQTEMgdmFyaWFibGVzIHVzaW5nIHRoZSB1cGxvYWQgaW5mby5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChzZXJ2aWNlLmRvbnRGZXRjaFN5bWJvbHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogUmVhZGluZyBvZiB0aGUgVXBsb2FkSW5mbyBhbmQgdGhlIFRQWSBmaWxlIGRlYWN0aXZhdGVkLiBTeW1ib2wgVGFibGUgY291bGQgbm90IGJlIGNyZWF0ZWQuJyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCAhPT0gMSAmJiB0aGlzLmFsaWdubWVudCAhPT0gNCAmJiB0aGlzLmFsaWdubWVudCAhPT0gOCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVGhlIHZhbHVlIGZvciB0aGUgYWxpZ25tZW50IHNob3VsZCBiZSAxLCA0IG9yIDguJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogVGFyZ2V0IGluZm9ybWF0aW9uOiBOZXRJZDogJyArIHNlcnZpY2UuYW1zTmV0SWQgKyAnLCBBTVMgcG9ydDogJyArIHNlcnZpY2UuYW1zUG9ydCArICcgLCBhbGlnbm1lbnQ6ICcgKyB0aGlzLmFsaWdubWVudCk7XG5cbiAgICAgICAgICAgIGlmIChzZXJ2aWNlLnN5bmNYbWxIdHRwICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5vblJlYWR5LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEZldGNoaW5nIHRoZSBUUFkgZmlsZSBmcm9tIHRoZSB3ZWJzZXJ2ZXIuJyk7XG4gICAgICAgICAgICAgICAgLy9HZXQgdGhlIHN5bWJvbCBmaWxlIGFuZCBwYXJzZSBpdC4gVXBsb2FkIEluZm8gd2lsbCBiZSBmZXRjaGVkIGFmdGVyLlxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29uZmlnRmlsZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL1N0YXJ0IGdldHRpbmcgdGhlIFVwbG9hZCBJbmZvLlxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tHZXRVcGxvYWRJbmZvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWxwZXIgRnVuY3Rpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIHZhcmlhYmxlIG5hbWVzIHBhc3NlZCBhcyBzdHJpbmdzIGFuZCByZXR1cm4gdGhlIG9iamVjdCxcbiAgICAgKiBzdG9yZSBkYXRhIHZhbHVlcyBpZiB0aGV5IGFyZSBwYXNzZWQgdG9vLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAgICBUaGUgbmFtZSBvZiBhIEphdmFTY3JpcHQgdmFyaWFibGUgb3IgYSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAgICAgRGF0YSB2YWx1ZXMgdG8gc3RvcmUgaW4gdGhlIHZhcmlhYmxlL3Byb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogICAgICBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHByb3BlcnR5IHRvIHN0b3JlIHRoZSBkYXRhIGluLiBcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlZCB3aXRoIGNyZWF0ZUFycmF5RGVzY3JpcHRvciBhbmQgY3JlYXRlU3RydWN0RGVzY3JpcHRvciBcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5cbiAgICAgKi9cbiAgICBwYXJzZVZhck5hbWUobmFtZSwgZGF0YT8sIG9iaj8sIHByZWZpeD8sIHN1ZmZpeD8pIHtcblxuICAgICAgICB2YXIgYXJyID0gW10sXG4gICAgICAgICAgICBsYXN0ID0gMCxcbiAgICAgICAgICAgIGEgPSBbXSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGFyclswXSA9IG5hbWUudG9TdHJpbmcoMTApO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYXJyID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ2FuXFwndCBwYXJzZSBuYW1lIG9mIG9iamVjdC92YXJpYWJsZS4gTmFtZSBpcyBub3QgYSBzdHJpbmcgb3IgbnVtYmVyIScpO1xuICAgICAgICAgICAgdGhpcy5sb2cobmFtZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9iaiA9IHdpbmRvdztcbiAgICAgICAgfVxuICAgICAgICBsYXN0ID0gYXJyLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgLy9XYWxrIHRocm91Z2ggdGhlIHRpZXJzXG4gICAgICAgIHdoaWxlIChpIDwgbGFzdCkge1xuICAgICAgICAgICAgLy9DaGVjayBpZiB0aGUgcGFzc2VkIG5hbWUgcG9pbnRzIHRvIGFuIGFycmF5LlxuICAgICAgICAgICAgaWYgKGFycltpXS5jaGFyQXQoYXJyW2ldLmxlbmd0aCAtIDEpID09PSAnXScpIHtcbiAgICAgICAgICAgICAgICBhID0gYXJyW2ldLnN1YnN0cmluZygwLCBhcnJbaV0ubGVuZ3RoIC0gMSkuc3BsaXQoJ1snKTtcbiAgICAgICAgICAgICAgICBvYmogPSBvYmpbYVswXV1bYVsxXV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGFuIGFycmF5IGlmIG9iamVjdCBpcyBub3QgZGVmaW5lZC5cbiAgICAgICAgICAgICAgICAvL1RoaXMgY2FuIGhhcHBlbiB3aGVuIGFuIGFycmF5IG9mIHN0cnVjdHVyZSBpc1xuICAgICAgICAgICAgICAgIC8vbm90IGRlZmluZWQuXG4gICAgICAgICAgICAgICAgaWYgKG9ialthcnJbaV1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW2FycltpXV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqID0gb2JqW2FycltpXV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICAvL0xhc3QgZWxlbWVudFxuICAgICAgICBpZiAoYXJyW2ldLmNoYXJBdChhcnJbaV0ubGVuZ3RoIC0gMSkgPT09ICddJykge1xuICAgICAgICAgICAgLy9JZiBsYXN0IGl0ZW0gb2YgdGhlIG5hbWUgaXMgYW4gYXJyYXlcbiAgICAgICAgICAgIGEgPSBhcnJbaV0uc3Vic3RyaW5nKDAsIGFycltpXS5sZW5ndGggLSAxKS5zcGxpdCgnWycpO1xuICAgICAgICAgICAgb2JqID0gb2JqW2FbMF1dO1xuXG4gICAgICAgICAgICAvL1N0b3JlIGRhdGEgaWYgcGFzc2VkLlxuICAgICAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJlZml4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gcHJlZml4ICsgZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWZmaXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhICsgc3VmZml4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYmpbYVsxXV0gPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9ialthWzFdXTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy9TdG9yZSBkYXRhIGlmIHBhc3NlZC5cbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmVmaXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHByZWZpeCArIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1ZmZpeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSArIHN1ZmZpeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ialthcnJbaV1dID0gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqW2FycltpXV07XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgcGFzc2VkIHN0cmluZyBsZW5ndGggaXMgdmFsaWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlblxuICAgICAqL1xuICAgIGlzVmFsaWRTdHJpbmdMZW4obGVuKSB7XG4gICAgICAgIGlmIChsZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNOYU4obGVuKSAmJiBsZW4gPiAwICYmIGxlbiA8PSB0aGlzLm1heFN0cmluZ0xlbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVXNlciBkZWZpbmVkIHN0cmluZyBsZW5ndGggbm90IHZhbGlkISBsZW5ndGg6ICcgKyBsZW4pO1xuICAgICAgICB0aGlzLmxvZygnTWF4LiBzdHJpbmcgbGVuZ3RoOiAnICsgdGhpcy5tYXhTdHJpbmdMZW4pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gcmV0dXJucyB0aGUgSW5kZXhHcm91cCBmb3IgYSBQTEMgdmFyaWFibGUgYWRkcmVzcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVxICAgICAgICAgIEFuIG9iamVjdCB3aXRoIHRoZSBhZGRyZXNzIG9yIHRoZSBuYW1lIGZvciB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGluZGV4R3JvdXAgIFRoZSBJbmRleEdyb3VwIGZvciB0aGUgQURTIHJlcXVlc3QuIFxuICAgICAqL1xuICAgIGdldEluZGV4R3JvdXAocmVxKSB7XG4gICAgICAgIHZhciBpbmRleEdyb3VwO1xuXG4gICAgICAgIGlmIChyZXEuYWRkcikge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSBJbmRleEdyb3VwIGJ5IGFkZHJlc3NcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLmFkZHIgPT09ICdzdHJpbmcnICYmIHJlcS5hZGRyLmNoYXJBdCgwKSA9PT0gJyUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5hZGRyLmNoYXJBdCgyKSA9PT0gJ1gnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQml0IGFkZHJlc3Nlcy5cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhHcm91cCA9IHRoaXMuaW5kZXhHcm91cHNbcmVxLmFkZHIuc3Vic3RyKDEsIDIpXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL0J5dGUgYWRkcmVzc2VzLlxuICAgICAgICAgICAgICAgICAgICBpbmRleEdyb3VwID0gdGhpcy5pbmRleEdyb3Vwc1tyZXEuYWRkci5zdWJzdHIoMSwgMSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogV3JvbmcgYWRkcmVzcyBkZWZpbml0aW9uLCBzaG91bGQgYmUgYSBzdHJpbmcgYW5kIHN0YXJ0IHdpdGggXCIlXCIhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVxLnVzZUhhbmRsZSA9PT0gdHJ1ZSB8fCB0aGlzLnNlcnZpY2UudXNlSGFuZGxlcyA9PT0gdHJ1ZSAmJiByZXEudXNlSGFuZGxlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgLy9HZXQgdGhlIEluZGV4R3JvdXAgZm9yIHRoZSBWYWx1ZSBCeSBIYW5kbGUgUmVxdWVzdFxuICAgICAgICAgICAgaW5kZXhHcm91cCA9IHRoaXMuaW5kZXhHcm91cHMuVmFsdWVCeUhhbmRsZTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXEuc3ltYm9sTmFtZSkge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSBJbmRleEdyb3VwIGJ5IG5hbWVcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLnN5bWJvbE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhHcm91cCA9IHRoaXMuc3ltVGFibGVbcmVxLnN5bWJvbE5hbWVdLmluZGV4R3JvdXA7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDYW5cXCd0IGdldCB0aGUgSW5kZXhHcm91cCBmb3IgdGhpcyByZXF1ZXN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQbGVhc2UgY2hlY2sgdGhlIHZhcmlhYmxlIG5hbWUuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBWYXJpYmxlIG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gbmFtZSwgYWRkcmVzcyBvciBoYW5kbGUgZm9yIHRoZSB2YXJpYWJsZS9yZXF1ZXN0IGRlZmluZWQhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKGluZGV4R3JvdXApKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBJbmRleEdyb3VwIGlzIG5vdCBhIG51bWJlciwgY2hlY2sgYWRkcmVzcyBvciBuYW1lIGRlZmluaXRpb24gb2YgdGhlIHZhcmlhYmxlL3JlcXVlc3QhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4R3JvdXA7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gcmV0dXJucyB0aGUgSW5kZXhPZmZzZXQgZm9yIGEgUExDIHZhcmlhYmxlIGFkZHJlc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlcSAgICAgICAgICBBbiBvYmplY3Qgd2l0aCB0aGUgYWRkcmVzcyBvciB0aGUgbmFtZSBmb3IgdGhlIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBpbmRleE9mZnNldCBUaGUgSW5kZXhPZmZzZXQgZm9yIHRoZSBBRFMgcmVxdWVzdC4gXG4gICAgICovXG4gICAgZ2V0SW5kZXhPZmZzZXQocmVxKSB7XG4gICAgICAgIHZhciBpbmRleE9mZnNldCwgbnVtU3RyaW5nID0gJycsIG14YWRkciA9IFtdLCBpLCBkYXRhVHlwZSwgaXRlbUFycmF5LCBzcGxpdHRlZFR5cGUsIGJpdG9mZnMsIHN1Yml0ZW07XG5cbiAgICAgICAgaWYgKHJlcS5hZGRyKSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIEluZGV4T2Zmc2V0IGJ5IGFkZHJlc3NcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLmFkZHIgPT09ICdzdHJpbmcnICYmIHJlcS5hZGRyLmNoYXJBdCgwKSA9PT0gJyUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5hZGRyLmNoYXJBdCgyKSA9PT0gJ1gnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQml0IHJlcS5hZGRyZXNzZXMuXG4gICAgICAgICAgICAgICAgICAgIG51bVN0cmluZyA9IHJlcS5hZGRyLnN1YnN0cigzKTtcbiAgICAgICAgICAgICAgICAgICAgbXhhZGRyID0gbnVtU3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gcGFyc2VJbnQobXhhZGRyWzBdLCAxMCkgKiA4ICsgcGFyc2VJbnQobXhhZGRyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9CeXRlIGFkZHJlc3Nlcy5cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSBwYXJzZUludChyZXEuYWRkci5zdWJzdHIoMyksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgLy9BZGRyZXNzIG9mZnNldCBpcyB1c2VkIGlmIG9ubHkgb25lIGl0ZW0gb2YgYW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgLy9zaG91bGQgYmUgc2VudC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuYWRkck9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ICs9IHJlcS5hZGRyT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBXcm9uZyBhZGRyZXNzIGRlZmluaXRpb24sIHNob3VsZCBiZSBhIHN0cmluZyBhbmQgc3RhcnQgd2l0aCBcIiVcIiEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXEudXNlSGFuZGxlID09PSB0cnVlIHx8IHRoaXMuc2VydmljZS51c2VIYW5kbGVzID09PSB0cnVlICYmIHJlcS51c2VIYW5kbGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIGhhbmRsZSBmb3IgdGhpcyByZXF1ZXN0XG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVDYWNoZVJlYWR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy9HZXQgaGFuZGxlIGNvZGVcbiAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IHRoaXMuaGFuZGxlQ2FjaGVbcmVxLmZ1bGxTeW1ib2xOYW1lXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc05hTihpbmRleE9mZnNldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgaGFuZGxlIGZvciB0aGlzIHN5bWJvbCBuYW1lOiAnICsgcmVxLmZ1bGxTeW1ib2xOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgaGFuZGxlIGZvciB0aGlzIHJlcXVlc3QuIEhhbmRsZSBjYWNoZSBpcyBub3QgcmVhZHkuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVxLnN5bWJvbE5hbWUpIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgSW5kZXhPZmZzZXQgYnkgbmFtZS5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLnN5bWJvbE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIG9mZnNldCBmcm9tIHRoZSBzeW1ib2wgdGFibGVcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSB0aGlzLnN5bVRhYmxlW3JlcS5zeW1ib2xOYW1lXS5pbmRleE9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5zeW1ib2xOYW1lQXJySWR4ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gdGhpcy5zeW1UYWJsZVtyZXEuc3ltYm9sTmFtZV0uaXRlbVNpemUgKiAocmVxLnN5bWJvbE5hbWVBcnJJZHggLSB0aGlzLnN5bVRhYmxlW3JlcS5zeW1ib2xOYW1lXS5hcnJTdGFydElkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL0FkZHJlc3Mgb2Zmc2V0IGlzIHVzZWQgaWYgb25seSBvbmUgaXRlbSBvZiBhbiBhcnJheVxuICAgICAgICAgICAgICAgICAgICAvL3Nob3VsZCBiZSBzZW50LlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5hZGRyT2Zmc2V0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gcmVxLmFkZHJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgYSBtYW51YWxseSBkZWZpbmVkIGJpdCBvZmZzZXQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLm9mZnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSBwYXJzZUludChyZXEub2ZmcywgMTApIC8gODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVxLm9mZnMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSByZXEub2ZmcyAvIDg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIGJpdCBvZmZzZXQgaWYgYSBzdWJpdGVtIGlzIGdpdmVuLlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLmRhdGFUeXBlTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUFycmF5ID0gcmVxLmRhdGFUeXBlTmFtZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IHRoaXMuc3ltVGFibGVbcmVxLnN5bWJvbE5hbWVdLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9HbyB0aHJvdWdoIHRoZSBhcnJheSB3aXRoIHRoZSBzdWJpdGVtcyBhbmQgYWRkIHRoZSBvZmZzZXRzXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViaXRlbSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbaXRlbUFycmF5W2ldXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSBzdWJpdGVtLmJpdE9mZnNldCAvIDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIG9mZnNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5kYXRhVHlwZUFycklkeFtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gc3ViaXRlbS5pdGVtU2l6ZSAqIChyZXEuZGF0YVR5cGVBcnJJZHhbaV0gLSBzdWJpdGVtLmFyclN0YXJ0SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIGRhdGEgdHlwZSBmb3IgdGhlIG5leHQgcm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbaXRlbUFycmF5W2ldXS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDYW5cXCd0IGdldCB0aGUgSW5kZXhPZmZzZXQgZm9yIHRoaXMgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGxlYXNlIGNoZWNrIHRoZSB2YXJpYWJsZSBkZWZpbml0aW9uIChuYW1lL29mZnMvc3ViaXRlbSkuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBWYXJpYmxlIG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTmVpdGhlciBhIG5hbWUgbm9yIGFuIGFkZHJlc3MgZm9yIHRoZSB2YXJpYWJsZS9yZXF1ZXN0IGRlZmluZWQhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKGluZGV4T2Zmc2V0KSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogSW5kZXhPZmZzZXQgaXMgbm90IGEgbnVtYmVyLCBjaGVjayBhZGRyZXNzIG9yIG5hbWUgZGVmaW5pdGlvbiBvZiB0aGUgdmFyaWFibGUvcmVxdWVzdC4nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdJbmRleE9mZnNldDogJyArIGluZGV4T2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhPZmZzZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHBhcnNlcyB0aGUgUExDIHZhcmlhYmxlIG5hbWUsIGxvb2tzIGluIHRoZSBzeW1ib2wgYW5kIGRhdGEgdHlwZSB0YWJsZSBhbmQgXG4gICAgICogcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgbmVjZXNzYXJ5IGluZm9ybWF0aW9uLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtICAgICAgICAgIEFuIG9iamVjdCB3aXRoIGF0IGxlYXN0IHRoZSBhZGRyZXNzIG9yIHRoZSBuYW1lIGZvciB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY2N0fSBpdGVtSW5mbyAgICBBbiBvYmplY3Qgd2l0aCB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGl0ZW0uXG4gICAgICogXG4gICAgICovXG4gICAgZ2V0SXRlbUluZm9ybWF0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIGl0ZW1JbmZvID0ge30gYXMgYW55LCBhcnJQbGNWYXJOYW1lLCBzcGxpdFR5cGU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBpdGVtLm5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGFyclBsY1Zhck5hbWUgPSBpdGVtLm5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vUmV0dXJuIGlmIG5vIHN5bWJvbCBuYW1lIGlzIGdpdmVuXG4gICAgICAgICAgICByZXR1cm4gaXRlbUluZm87XG4gICAgICAgIH1cblxuICAgICAgICAvL0dldCB0aGUgc3ltYm9sIG5hbWUuXG4gICAgICAgIGl0ZW1JbmZvLmZ1bGxTeW1ib2xOYW1lID0gaXRlbS5uYW1lO1xuICAgICAgICBpZiAoYXJyUGxjVmFyTmFtZVswXSA9PT0gJycpIHtcbiAgICAgICAgICAgIC8vR2xvYmFsIHZhcmlhYmxlXG4gICAgICAgICAgICBpdGVtSW5mby5zeW1ib2xOYW1lID0gJy4nICsgYXJyUGxjVmFyTmFtZVsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vVmFyaWFibGUgb2YgYW4gaW5zdGFuY2VcbiAgICAgICAgICAgIGl0ZW1JbmZvLnN5bWJvbE5hbWUgPSBhcnJQbGNWYXJOYW1lWzBdICsgJy4nICsgYXJyUGxjVmFyTmFtZVsxXTtcbiAgICAgICAgfVxuICAgICAgICAvL0N1dCBhbiBhcnJheSBpbmRleFxuICAgICAgICBpZiAoaXRlbUluZm8uc3ltYm9sTmFtZS5jaGFyQXQoaXRlbUluZm8uc3ltYm9sTmFtZS5sZW5ndGggLSAxKSA9PT0gJ10nKSB7XG4gICAgICAgICAgICAvL0N1dCB0aGUgYXJyYXkgaW5kZXggYW5kIHN0b3JlIGl0XG4gICAgICAgICAgICBzcGxpdFR5cGUgPSBpdGVtSW5mby5zeW1ib2xOYW1lLnN1YnN0cmluZygwLCBpdGVtSW5mby5zeW1ib2xOYW1lLmxlbmd0aCAtIDEpLnNwbGl0KCdbJyk7XG4gICAgICAgICAgICBpdGVtSW5mby5zeW1ib2xOYW1lID0gc3BsaXRUeXBlWzBdO1xuICAgICAgICAgICAgaXRlbUluZm8uc3ltYm9sTmFtZUFycklkeCA9IHBhcnNlSW50KHNwbGl0VHlwZVsxXSwgMTApO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL0xlYXZlIHRoZSByZXN0IGFzIGFuIGFycmF5IGFuZCBhZGQgaXQgdG8gdGhlIGl0ZW1JbmZvXG4gICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXMgPSBhcnJQbGNWYXJOYW1lLnNsaWNlKDIpO1xuXG4gICAgICAgIHZhciBhcnIgPSBbXSwgdHlwZUFycmF5LCBkYXRhVHlwZSwgaTtcblxuICAgICAgICAvL0dldCBpbmZvcm1hdGlvbiBmcm9tIHRoZSB0YWJsZXNcbiAgICAgICAgaWYgKHRoaXMuc3ltVGFibGVSZWFkeSAmJiB0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSAmJiBpdGVtSW5mby5kYXRhVHlwZU5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgc3ViaXRlbSB0eXBlIGZyb20gdGhlIHN5bWJvbCB0YWJsZSAmJiBkYXRhIHR5cGUgdGFibGVcbiAgICAgICAgICAgIHR5cGVBcnJheSA9IGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXM7XG4gICAgICAgICAgICBkYXRhVHlwZSA9IHRoaXMuc3ltVGFibGVbaXRlbUluZm8uc3ltYm9sTmFtZV0uZGF0YVR5cGU7XG4gICAgICAgICAgICBpdGVtSW5mby5kYXRhVHlwZUFycklkeCA9IFtdO1xuICAgICAgICAgICAgLy9HbyBmb3IgdGhlIGxhc3Qgc3ViaXRlbVxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHRoZSBzdWJpdGVtIGlzIGFuIGFycmF5XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVBcnJheVtpXS5jaGFyQXQodHlwZUFycmF5W2ldLmxlbmd0aCAtIDEpID09PSAnXScpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9DdXQgdGhlIGFycmF5IGluZGV4IGFuZCBzdG9yZSBpdCBpbiBhbiBleHRyYSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBzcGxpdFR5cGUgPSB0eXBlQXJyYXlbaV0uc3Vic3RyaW5nKDAsIHR5cGVBcnJheVtpXS5sZW5ndGggLSAxKS5zcGxpdCgnWycpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlQXJyYXlbaV0gPSBzcGxpdFR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4W2ldID0gcGFyc2VJbnQoc3BsaXRUeXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5wb2ludGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBMQyB2YXJpYWJsZSAnICsgW3R5cGVBcnJheVtpXV0gKyAnIGlzIGEgcG9pbnRlciEgQ2FuXFwndCBnZXQgdGhlIHZhcmlhYmxlIHZhbHVlLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSB0eXBlIG9mIHRoZSBuZXh0IHN1Yml0ZW1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdHlwZUFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgfSB3aGlsZSAoaSA8IHR5cGVBcnJheS5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvL0dldCB0aGUgdHlwZSBvZiB0aGUgc3ViaXRlbVxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnR5cGUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0udHlwZTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheUxlbmd0aCA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5hcnJheUxlbmd0aDtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheURhdGFUeXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uaXRlbVNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uaXRlbVNpemU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtSW5mby5iaXRPZmZzZXQgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uYml0T2Zmc2V0O1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLm9mZnMgPSBpdGVtLm9mZnM7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8udHlwZSA9PT0gJ1NUUklORycgfHwgaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoOyAvL2NvbXBhdGliaWxpdHlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kZWNQbGFjZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZGVjUGxhY2VzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZHAgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZHA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4W2ldICE9PSB1bmRlZmluZWQgJiYgaXRlbUluZm8udHlwZSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby50eXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uaXRlbVNpemU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQSBwcm9ibGVtIG9jY3VyZWQgd2hpbGUgcmVhZGluZyBhIGRhdGEgdHlwZSBmcm9tIHRoZSBkYXRhIHR5cGUgdGFibGUhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN5bVRhYmxlUmVhZHkpIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgdHlwZSBmcm9tIHRoZSBzeW1ib2wgdGFibGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby50eXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5TGVuZ3RoID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmFycmF5TGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheURhdGFUeXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5pdGVtU2l6ZSA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5pdGVtU2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLnNpemU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5iaXRPZmZzZXQgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uYml0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5vZmZzID0gaXRlbS5vZmZzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby50eXBlID09PSAnU1RSSU5HJyB8fCBpdGVtSW5mby5hcnJheURhdGFUeXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDsgLy9jb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZGVjUGxhY2VzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5kZWNQbGFjZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZHAgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmRwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLnN5bWJvbE5hbWVBcnJJZHggIT09IHVuZGVmaW5lZCAmJiBpdGVtSW5mby50eXBlID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby50eXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLml0ZW1TaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEEgcHJvYmxlbSBvY2N1cmVkIHdoaWxlIHJlYWRpbmcgYSBkYXRhIHR5cGUgZnJvbSB0aGUgc3ltYm9sIHRhYmxlIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udHlwZSAhPSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBOZWl0aGVyIGFuIGVudHJ5IGZvciB0aGlzIHN5bWJvbCBpbiB0aGUgc3ltYm9sIHRhYmxlIG5vciB0aGUgdHlwZSBkZWZpbmVkIGJ5IHVzZXIhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy9PdmVycmlkZSB0eXBlIGlmIGRlZmluZWQgYnkgdXNlclxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0udHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy9UeXBlIGlzIGRlZmluZWQgYnkgdXNlciwgdHJ5IHRvIHNwbGl0IGl0XG4gICAgICAgICAgICBhcnIgPSBpdGVtLnR5cGUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIC8vSm9pbiB0aGUgZm9ybWF0dGluZyBzdHJpbmcgaWYgdGhlcmUgd2VyZSBwb2ludHMgaW4gaXQuXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gYXJyLnNsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU2V0IHRoZSB1c2VyIGRlZmluZWQgdHlwZSBpZiBpdCdzIG5vdCBhbiBhcnJheSBvciBzdHJ1Y3R1cmVcbiAgICAgICAgICAgIGlmIChpdGVtSW5mby50eXBlICE9PSAnQVJSQVknICYmIGl0ZW1JbmZvLnR5cGUgIT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnR5cGUgPSBhcnJbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1R5cGUgZGVwZW5kaW5nIGNvZGVcbiAgICAgICAgICAgIGlmIChpdGVtSW5mby50eXBlID09PSAnU1RSSU5HJyAmJiBhcnJbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFyclsxXSA9IHBhcnNlSW50KGFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oYXJyWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBhcnJbMV07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnN0cmluZ0xlbmd0aCA9IGl0ZW1JbmZvLmZvcm1hdDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc2l6ZSA9IGl0ZW1JbmZvLmZvcm1hdCsrOyAvL1Rlcm1pbmF0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gdGhpcy5wbGNUeXBlTGVuLlNUUklORztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMZW5ndGggb2Ygc3RyaW5nIHZhcmlhYmxlIG5vdCBkZWZpbmVkOiAnICsgaXRlbS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBBIGxlbmd0aCBvZiA4MCBjaGFyYWN0ZXJzIChUd2luQ0FUIGRlZmF1bHQpIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtSW5mby50eXBlID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgLy9RdWljayBhbmQgZGlydHlcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheURhdGFUeXBlID0gYXJyWzBdO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGFyclsxXTtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5TGVuZ3RoID0gZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5hcnJheUxlbmd0aDtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheURhdGFUeXBlID0gZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5hcnJheURhdGFUeXBlO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlID0gZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5pdGVtU2l6ZSA9IGRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uaXRlbVNpemU7XG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbUluZm8udHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBNYXliZSBpbiBhIGZ1dHVyZSB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGFyclsxXTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gdGhpcy5wbGNUeXBlTGVuW2l0ZW1JbmZvLnR5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9PdmVycmlkZSBmb3JtYXQgaWYgZXh0cmEgaW5mb3JtYXRpb24gaXMgZ2l2ZW5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5mb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5mb3JtYXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRlY1BsYWNlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmRlY1BsYWNlcztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZHAgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5kcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICB0aGlzLmxvZygnaXRlbScpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICB0aGlzLmxvZygnaXRlbUluZm8nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW1JbmZvKTtcbiAgICAgICAgICAgICovXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGl0ZW1JbmZvLnR5cGUgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIHR5cGUgb2YgdGhlIGl0ZW0hJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMubG9nKCdpdGVtSW5mbycpO1xuICAgICAgICB0aGlzLmxvZyhpdGVtSW5mbyk7XG4gICAgICAgICovXG5cbiAgICAgICAgcmV0dXJuIGl0ZW1JbmZvO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gICAgICogXG4gICAgICogQHJldHVybiB7T2JqZWN0fSB4bWxIdHRwUmVxICBBIFhNTEh0dHBSZXF1ZXN0LlxuICAgICAqL1xuICAgIGNyZWF0ZVhNTEh0dHBSZXEoKSB7XG4gICAgICAgIHZhciB4bWxIdHRwUmVxO1xuXG4gICAgICAgIGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gICAgICAgICAgICAvL01vemlsbGEsIE9wZXJhLCBTYWZhcmkgYW5kIEludGVybmV0IEV4cGxvcmVyICg+IHY3KVxuICAgICAgICAgICAgeG1sSHR0cFJlcSA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vSW50ZXJuZXQgRXhwbG9yZXIgNiBhbmQgb2xkZXJcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeG1sSHR0cFJlcSA9IG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB4bWxIdHRwUmVxID0gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHhtbEh0dHBSZXEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBGYWlsZWQgQ3JlYXRpbmcgWE1MSHR0cFJlcXVlc3QtT2JqZWN0IScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geG1sSHR0cFJlcTtcbiAgICB9XG5cblxuICAgIGFkc1JlcVNlbmQoYWRzUmVxKSB7XG5cbiAgICAgICAgdmFyIHNvYXBSZXE7XG5cbiAgICAgICAgLy9DYW5jZWwgdGhlIHJlcXVlc3QsIGlmIHRoZSBsYXN0IG9uIHdpdGggdGhlIHNhbWUgSUQgaXMgbm90IGZpbmlzaGVkLlxuICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5pZCA9PT0gJ251bWJlcicgJiYgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFJlcXVlc3QgZHJvcHBlZCAobGFzdCByZXF1ZXN0IHdpdGggSUQgJyArIGFkc1JlcS5yZXFEZXNjci5pZCArICcgbm90IGZpbmlzaGVkISknKTtcbiAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdKys7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPD0gdGhpcy5tYXhEcm9wUmVxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9BdXRvbWF0aWMgYWNrbm93bGVkaW5nIGFmdGVyIGEgY291bnQgb2YgJ21heERyb3BSZXEnIHRvXG4gICAgICAgICAgICAvL3ByZXZlbnQgc3R1Y2tpbmcuXG4gICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA9IDA7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vQ3JlYXRlIHRoZSBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gICAgICAgIHRoaXMueG1sSHR0cFJlcSA9IHRoaXMuY3JlYXRlWE1MSHR0cFJlcSgpO1xuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIFNPQVAgcmVxdWVzdC5cbiAgICAgICAgc29hcFJlcSA9ICc8P3htbCB2ZXJzaW9uPVxcJzEuMFxcJyBlbmNvZGluZz1cXCd1dGYtOFxcJz8+JztcbiAgICAgICAgc29hcFJlcSArPSAnPHNvYXA6RW52ZWxvcGUgeG1sbnM6eHNpPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlXFwnICc7XG4gICAgICAgIHNvYXBSZXEgKz0gJ3htbG5zOnhzZD1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYVxcJyAnO1xuICAgICAgICBzb2FwUmVxICs9ICd4bWxuczpzb2FwPVxcJ2h0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3NvYXAvZW52ZWxvcGUvXFwnPic7XG4gICAgICAgIHNvYXBSZXEgKz0gJzxzb2FwOkJvZHk+PHExOic7XG4gICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLm1ldGhvZDtcbiAgICAgICAgc29hcFJlcSArPSAnIHhtbG5zOnExPVxcJ2h0dHA6Ly9iZWNraG9mZi5vcmcvbWVzc2FnZS9cXCc+PG5ldElkIHhzaTp0eXBlPVxcJ3hzZDpzdHJpbmdcXCc+JztcbiAgICAgICAgc29hcFJlcSArPSB0aGlzLnNlcnZpY2UuYW1zTmV0SWQ7XG4gICAgICAgIHNvYXBSZXEgKz0gJzwvbmV0SWQ+PG5Qb3J0IHhzaTp0eXBlPVxcJ3hzZDppbnRcXCc+JztcbiAgICAgICAgc29hcFJlcSArPSB0aGlzLnNlcnZpY2UuYW1zUG9ydDtcbiAgICAgICAgc29hcFJlcSArPSAnPC9uUG9ydD4nO1xuXG4gICAgICAgIGlmIChhZHNSZXEuaW5kZXhHcm91cCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8aW5kZXhHcm91cCB4c2k6dHlwZT1cXCd4c2Q6dW5zaWduZWRJbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLmluZGV4R3JvdXA7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L2luZGV4R3JvdXA+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzUmVxLmluZGV4T2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxpbmRleE9mZnNldCB4c2k6dHlwZT1cXCd4c2Q6dW5zaWduZWRJbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLmluZGV4T2Zmc2V0O1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9pbmRleE9mZnNldD4nO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWQnIHx8IGFkc1JlcS5tZXRob2QgPT09ICdSZWFkV3JpdGUnKSAmJiBhZHNSZXEucmVxRGVzY3IucmVhZExlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxjYlJkTGVuIHhzaTp0eXBlPVxcJ3hzZDppbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnJlcURlc2NyLnJlYWRMZW5ndGg7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L2NiUmRMZW4+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzUmVxLnBEYXRhICYmIGFkc1JlcS5wRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8cERhdGEgeHNpOnR5cGU9XFwneHNkOmJhc2U2NEJpbmFyeVxcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEucERhdGE7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L3BEYXRhPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkc1JlcS5wd3JEYXRhICYmIGFkc1JlcS5wd3JEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxwd3JEYXRhIHhzaTp0eXBlPVxcJ3hzZDpiYXNlNjRCaW5hcnlcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnB3ckRhdGE7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L3B3ckRhdGE+JztcbiAgICAgICAgfVxuICAgICAgICBzb2FwUmVxICs9ICc8L3ExOic7XG4gICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLm1ldGhvZDtcbiAgICAgICAgc29hcFJlcSArPSAnPjwvc29hcDpCb2R5Pjwvc29hcDpFbnZlbG9wZT4nO1xuXG4gICAgICAgIC8vU2VuZCB0aGUgQUpBWCByZXF1ZXN0LlxuICAgICAgICBpZiAodHlwZW9mIHRoaXMueG1sSHR0cFJlcSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLm9wZW4oJ1BPU1QnLCB0aGlzLnNlcnZpY2Uuc2VydmljZVVybCwgdHJ1ZSwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VVc2VyLCB0aGlzLnNlcnZpY2Uuc2VydmljZVBhc3N3b3JkKTtcblxuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ1NPQVBBY3Rpb24nLCAnaHR0cDovL2JlY2tob2ZmLm9yZy9hY3Rpb24vVGNBZHNTeW5jLicgKyBhZHNSZXEubWV0aG9kKTtcbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWw7IGNoYXJzZXQ9dXRmLTgnKTtcblxuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnRpbWVvdXQgPSB0aGlzLnhtbEh0dHBSZXFUaW1lb3V0O1xuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLm9udGltZW91dCA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogWE1MSHR0cFJlcXVlc3QgdGltZWQgb3V0LiBUaW1lb3V0ICcgKyB0aGlzLnhtbEh0dHBSZXFUaW1lb3V0ICsgJyBtaWxsaXNlY29uZHMuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9vbiB0aW1lb3V0IGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueG1sSHR0cFJlcS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnhtbEh0dHBSZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVxdWVzdCBPS1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVJlc3BvbnNlKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlcXVlc3QgZmFpbGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBYTUxIdHRwUmVxdWVzdCByZXR1cm5zIGFuIGVycm9yLiBTdGF0dXMgY29kZSA6ICcgKyB0aGlzLnhtbEh0dHBSZXEuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vbiBlcnJvciBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5zZW5kKHNvYXBSZXEpO1xuXG4gICAgICAgICAgICAvL1JlcXVlc3Qgd2l0aCBpbmRleCAnaWQnIHNlbnQuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5pZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBhZHNSZXFTZW5kQXN5bmMoYWRzUmVxKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdmFyIHNvYXBSZXE7XG5cbiAgICAgICAgICAgIC8vQ2FuY2VsIHRoZSByZXF1ZXN0LCBpZiB0aGUgbGFzdCBvbiB3aXRoIHRoZSBzYW1lIElEIGlzIG5vdCBmaW5pc2hlZC5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLmlkID09PSAnbnVtYmVyJyAmJiB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFJlcXVlc3QgZHJvcHBlZCAobGFzdCByZXF1ZXN0IHdpdGggSUQgJyArIGFkc1JlcS5yZXFEZXNjci5pZCArICcgbm90IGZpbmlzaGVkISknKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSsrO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA8PSB0aGlzLm1heERyb3BSZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0F1dG9tYXRpYyBhY2tub3dsZWRpbmcgYWZ0ZXIgYSBjb3VudCBvZiAnbWF4RHJvcFJlcScgdG9cbiAgICAgICAgICAgICAgICAvL3ByZXZlbnQgc3R1Y2tpbmcuXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPSAwO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEgPSB0aGlzLmNyZWF0ZVhNTEh0dHBSZXEoKTtcblxuICAgICAgICAgICAgLy9HZW5lcmF0ZSB0aGUgU09BUCByZXF1ZXN0LlxuICAgICAgICAgICAgc29hcFJlcSA9ICc8P3htbCB2ZXJzaW9uPVxcJzEuMFxcJyBlbmNvZGluZz1cXCd1dGYtOFxcJz8+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxzb2FwOkVudmVsb3BlIHhtbG5zOnhzaT1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVxcJyAnO1xuICAgICAgICAgICAgc29hcFJlcSArPSAneG1sbnM6eHNkPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hXFwnICc7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICd4bWxuczpzb2FwPVxcJ2h0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3NvYXAvZW52ZWxvcGUvXFwnPic7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8c29hcDpCb2R5PjxxMTonO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEubWV0aG9kO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnIHhtbG5zOnExPVxcJ2h0dHA6Ly9iZWNraG9mZi5vcmcvbWVzc2FnZS9cXCc+PG5ldElkIHhzaTp0eXBlPVxcJ3hzZDpzdHJpbmdcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gdGhpcy5zZXJ2aWNlLmFtc05ldElkO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9uZXRJZD48blBvcnQgeHNpOnR5cGU9XFwneHNkOmludFxcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSB0aGlzLnNlcnZpY2UuYW1zUG9ydDtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvblBvcnQ+JztcblxuICAgICAgICAgICAgaWYgKGFkc1JlcS5pbmRleEdyb3VwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8aW5kZXhHcm91cCB4c2k6dHlwZT1cXCd4c2Q6dW5zaWduZWRJbnRcXCc+JztcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5pbmRleEdyb3VwO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvaW5kZXhHcm91cD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkc1JlcS5pbmRleE9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPGluZGV4T2Zmc2V0IHhzaTp0eXBlPVxcJ3hzZDp1bnNpZ25lZEludFxcJz4nO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLmluZGV4T2Zmc2V0O1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvaW5kZXhPZmZzZXQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWQnIHx8IGFkc1JlcS5tZXRob2QgPT09ICdSZWFkV3JpdGUnKSAmJiBhZHNSZXEucmVxRGVzY3IucmVhZExlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8Y2JSZExlbiB4c2k6dHlwZT1cXCd4c2Q6aW50XFwnPic7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEucmVxRGVzY3IucmVhZExlbmd0aDtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8L2NiUmRMZW4+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhZHNSZXEucERhdGEgJiYgYWRzUmVxLnBEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8cERhdGEgeHNpOnR5cGU9XFwneHNkOmJhc2U2NEJpbmFyeVxcJz4nO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnBEYXRhO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvcERhdGE+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhZHNSZXEucHdyRGF0YSAmJiBhZHNSZXEucHdyRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPHB3ckRhdGEgeHNpOnR5cGU9XFwneHNkOmJhc2U2NEJpbmFyeVxcJz4nO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnB3ckRhdGE7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPC9wd3JEYXRhPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L3ExOic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5tZXRob2Q7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc+PC9zb2FwOkJvZHk+PC9zb2FwOkVudmVsb3BlPic7XG5cbiAgICAgICAgICAgIC8vU2VuZCB0aGUgQUpBWCByZXF1ZXN0LlxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnhtbEh0dHBSZXEgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEub3BlbignUE9TVCcsIHRoaXMuc2VydmljZS5zZXJ2aWNlVXJsLCB0cnVlLCB0aGlzLnNlcnZpY2Uuc2VydmljZVVzZXIsIHRoaXMuc2VydmljZS5zZXJ2aWNlUGFzc3dvcmQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ1NPQVBBY3Rpb24nLCAnaHR0cDovL2JlY2tob2ZmLm9yZy9hY3Rpb24vVGNBZHNTeW5jLicgKyBhZHNSZXEubWV0aG9kKTtcbiAgICAgICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQveG1sOyBjaGFyc2V0PXV0Zi04Jyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEudGltZW91dCA9IHRoaXMueG1sSHR0cFJlcVRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLm9udGltZW91dCA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFhNTEh0dHBSZXF1ZXN0IHRpbWVkIG91dC4gVGltZW91dCAnICsgdGhpcy54bWxIdHRwUmVxVGltZW91dCArICcgbWlsbGlzZWNvbmRzLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vb24gdGltZW91dCBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm90KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnhtbEh0dHBSZXEucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueG1sSHR0cFJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVxdWVzdCBPSyAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5wYXJzZVJlc3BvbnNlKGFkc1JlcSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVxdWVzdCBmYWlsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBYTUxIdHRwUmVxdWVzdCByZXR1cm5zIGFuIGVycm9yLiBTdGF0dXMgY29kZSA6ICcgKyB0aGlzLnhtbEh0dHBSZXEuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL29uIGVycm9yIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ1RBTUUgbGlicmFyeSBlcnJvcjogWE1MSHR0cFJlcXVlc3QgcmV0dXJucyBhbiBlcnJvci4gU3RhdHVzIGNvZGUgOiAnICsgdGhpcy54bWxIdHRwUmVxLnN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNlbmQoc29hcFJlcSk7XG5cbiAgICAgICAgICAgICAgICAvL1JlcXVlc3Qgd2l0aCBpbmRleCAnaWQnIHNlbnQuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3IuaWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBvYmplY3RzIGZvciBTT0FQIGFuZCBYTUxIdHRwUmVxdWVzdCBhbmQgc2VuZCB0aGUgcmVxdWVzdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgVGhlIG9iamVjdCBjb250YWluaW5nIHRoZSBhcmd1bWVudHMgb2YgdGhlIEFEUyByZXF1ZXN0LlxuICAgICAqL1xuICAgIGNyZWF0ZVJlcXVlc3QoYWRzUmVxKSB7XG5cbiAgICAgICAgaWYgKGFkc1JlcS5yZXFEZXNjciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhZHNSZXEucmVxRGVzY3IgPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmIChhZHNSZXEucmVxRGVzY3IuZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGFkc1JlcSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZHNSZXEuc2VuZCA9ICgpID0+IHRoaXMuYWRzUmVxU2VuZChhZHNSZXEpXG4gICAgICAgIHJldHVybiBhZHNSZXE7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBmb3IgY2hlY2tpbmcgdGhlIGlucHV0IHZhbHVlcyB3aGVuIHdyaXRpbmcgbnVtZXJpYyBQTEMgdmFyaWFibGVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWluXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFxuICAgICAqL1xuICAgIGNoZWNrVmFsdWUoaXRlbTogeyB2YWw6IHN0cmluZyB9LCB0eXBlOiBzdHJpbmcsIG1pbjogc3RyaW5nIHwgbnVtYmVyLCBtYXg6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB2YXIgdmFsO1xuXG4gICAgICAgIC8vVGVzdCBpZiB2YWx1ZSBpcyB2YWxpZC5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnUkVBTCcgfHwgdHlwZSA9PT0gJ0xSRUFMJykge1xuICAgICAgICAgICAgICAgIHZhbCA9IHBhcnNlRmxvYXQoaXRlbS52YWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBwYXJzZUludChpdGVtLnZhbCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLnZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHZhbCA9IGl0ZW0udmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogV3JvbmcgdmFyaWFibGUgdHlwZSBmb3IgYSBudW1lcmljIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBWYXJpYWJsZSB0eXBlIHNob3VsZCBiZSBudW1iZXIgb3Igc3RyaW5nLCBidXQgaXMgJyArIHR5cGVvZiBpdGVtLnZhbCk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4odmFsKSkge1xuICAgICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhbHVlIG9mIGEgbnVtZXJpYyB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGlzIG5vdCBhIG51bWJlci4nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGVjayBib3VuZHNcbiAgICAgICAgaWYgKHRoaXMudXNlQ2hlY2tCb3VuZHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnTFJFQUwnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZSh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogTGltaXQgZm9yIExSRUFMIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVXBwZXIgbGltaXQ6ICcgKyBOdW1iZXIuTUFYX1ZBTFVFKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ0xvd2VyIGxpbWl0OiAnICsgTnVtYmVyLk1JTl9WQUxVRSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1JFQUwnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA8IDEuMTc1NDk1ZS0zOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMb3dlciBsaW1pdCBmb3IgcG9zaXRpdmUgUkVBTCB2YWx1ZSBleGNlZWRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaW1pdDogMS4xNzU0OTVlLTM4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSAxLjE3NTQ5NWUtMzg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsID4gMy40MDI4MjNlKzM4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFVwcGVyIGxpbWl0IGZvciBwb3NpdGl2ZSBSRUFMIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAzLjQwMjgyM2UrMzgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IDMuNDAyODIzZSszODtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID4gLTEuMTc1NDk1ZS0zOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBVcHBlciBsaW1pdCBmb3IgbmVnYXRpdmUgUkVBTCB2YWx1ZSBleGNlZWRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaW1pdDogLTEuMTc1NDk1ZS0zOCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gLTEuMTc1NDk1ZS0zODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPCAtMy40MDI4MjNlKzM4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IExvd2VyIGxpbWl0IGZvciBuZWdhdGl2ZSBSRUFMIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAtMy40MDI4MjNlKzM4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSAtMy40MDI4MjNlKzM4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgbWluKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogTG93ZXIgbGltaXQgZm9yIG51bWVyaWMgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd0eXBlOiAnICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaW1pdDogJyArIG1pbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBtaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA+IG1heCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFVwcGVyIGxpbWl0IGZvciBudW1lcmljIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndHlwZTogJyArIHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGltaXQ6ICcgKyBtYXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gbWF4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdHlwZSBhbmQgZm9ybWF0IGFuZCByZXR1cm4gaXQgaW4gYW4gYXJyYXkuIENyZWF0ZSBhblxuICAgICAqIGl0ZW0udHlwZSBlbnRyeSBpZiBpdCBkb2Vzbid0IGV4aXN0LiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAgICAgQW4gaXRlbSBvZiBhIHZhcmlhYmxlIGxpc3QuXG4gICAgICogQHJldHVybiB7QXJyYXl9IGFyciAgICAgIEFuIGFycmF5IHdpdGggdHlwZSBhbmQgZm9ybWF0LiBcbiAgICAgKi9cbiAgICBnZXRUeXBlQW5kRm9ybWF0KGl0ZW0pIHtcbiAgICAgICAgdmFyIGFyciA9IFtdLCB0eXBlQXJyYXksIGRhdGFUeXBlLCBpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbS50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy9UeXBlIGlzIGRlZmluZWRcbiAgICAgICAgICAgIGFyciA9IGl0ZW0udHlwZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgLy9Kb2luIHRoZSBmb3JtYXR0aW5nIHN0cmluZyBpZiB0aGVyZSB3ZXJlIHBvaW50cyBpbiBpdC5cbiAgICAgICAgICAgICAgICBhcnJbMV0gPSBhcnIuc2xpY2UoMSkuam9pbignLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgdHlwZSBvZiB0aGUgaXRlbSAoZnVuY3Rpb24gZ2V0VHlwZUFuZEZvcm1hdCgpKSEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc3RydWN0dXJlIGRlZmluaXRpb24gYmFzZWQgb24gdGhlIGluZm9ybWF0aW9uIGluIHRoZSBkYXRhIHRhYmxlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgc3RydWN0bmFtZSAgVGhlIG5hbWUgb2YgdGhlIHN0cnVjdHVyZSBpbiB0aGUgZGF0YSB0YWJsZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHN0cnVjdCAgICAgIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpdGVtcyBvZiB0aGUgc3RydWN0dXJlLiBcbiAgICAgKi9cbiAgICBjcmVhdGVTdHJ1Y3REZWYoc3RydWN0bmFtZSkge1xuICAgICAgICB2YXIgc3RydWN0ID0ge30sIHN1Yml0ZW0sIHN1Yml0ZW1zO1xuXG4gICAgICAgIHN1Yml0ZW1zID0gdGhpcy5kYXRhVHlwZVRhYmxlW3N0cnVjdG5hbWVdLnN1Ykl0ZW1zO1xuXG4gICAgICAgIGZvciAoc3ViaXRlbSBpbiBzdWJpdGVtcykge1xuICAgICAgICAgICAgaWYgKHN1Yml0ZW1zW3N1Yml0ZW1dLnR5cGUgPT09IFwiVVNFUlwiKSB7XG4gICAgICAgICAgICAgICAgLy9DcmVhdGluZyBhIG5lc3RlZCBzdHJ1Y3R1ZSBkZWZpbml0aW9uIHdvcmtzLCBidXQgcGFyc2luZyBkb2Vzbid0XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQXV0b21hdGljIGNyZWF0aW5nIG9mIG5lc3RlZCBzdHJ1Y3R1cmVzIGlzIG5vdCBzdXBwb3J0ZWQgKHlldCkhJyk7XG4gICAgICAgICAgICAgICAgc3RydWN0W3N1Yml0ZW1dID0gdGhpcy5jcmVhdGVTdHJ1Y3REZWYoc3ViaXRlbXNbc3ViaXRlbV0uZGF0YVR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViaXRlbXMuaGFzT3duUHJvcGVydHkoc3ViaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RydWN0W3N1Yml0ZW1dID0gc3ViaXRlbXNbc3ViaXRlbV0uZnVsbFR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJ1Y3Q7XG4gICAgfVxuXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmNvZGVyIEZ1bmN0aW9uc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnNpb24gb2YgQVNDSUkoMC05LCBhLWYsIEEtRikgY2hhcmNvZGVzIHRvIG51bWJlcnMgMC0xNVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjaGFyY29kZVxuICAgICAqL1xuICAgIGNoYXJjb2RlVG9EdWFsKGNoYXJjb2RlKSB7XG4gICAgICAgIGlmICgoY2hhcmNvZGUgPj0gMHg2MSkgJiYgKGNoYXJjb2RlIDw9IDB4NjYpKSB7XG4gICAgICAgICAgICByZXR1cm4gKGNoYXJjb2RlIC0gMHg1Nyk7ICAvL2EtZlxuICAgICAgICB9XG4gICAgICAgIGlmICgoY2hhcmNvZGUgPj0gMHg0MSkgJiYgKGNoYXJjb2RlIDw9IDB4NDYpKSB7XG4gICAgICAgICAgICByZXR1cm4gKGNoYXJjb2RlIC0gMHgzNyk7ICAvL0EtRlxuICAgICAgICB9XG4gICAgICAgIGlmICgoY2hhcmNvZGUgPj0gMHgzMCkgJiYgKGNoYXJjb2RlIDw9IDB4MzkpKSB7XG4gICAgICAgICAgICByZXR1cm4gKGNoYXJjb2RlIC0gMHgzMCk7ICAvLzAtOVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBudW1iZXIgaW50byBhbiBhcnJheSBvZiBieXRlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFybGVuXG4gICAgICovXG4gICAgbnVtVG9CeXRlQXJyKHZhbHVlLCB2YXJsZW4pIHtcbiAgICAgICAgdmFyIGJ5dGVzID0gW10sXG4gICAgICAgICAgICBoZXggPSB2YWx1ZS50b1N0cmluZygxNiksXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIHdoaWxlIChoZXgubGVuZ3RoIDwgdmFybGVuICogMikge1xuICAgICAgICAgICAgaGV4ID0gJzAnICsgaGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHZhcmxlbjsgaSsrKSB7XG4gICAgICAgICAgICBieXRlc1sodmFybGVuIC0gMSkgLSBpXSA9XG4gICAgICAgICAgICAgICAgKCh0aGlzLmNoYXJjb2RlVG9EdWFsKGhleC5jaGFyQ29kZUF0KGkgKiAyKSkgKiAxNikgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJjb2RlVG9EdWFsKGhleC5jaGFyQ29kZUF0KChpICogMikgKyAxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgSmF2YVNjcmlwdCBmbG9hdGluZyBwb2ludCBudW1iZXIgdG8gYSBQTEMgUkVBTCB2YWx1ZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtXG4gICAgICovXG4gICAgZmxvYXRUb1JlYWwobnVtKSB7XG5cbiAgICAgICAgdmFyIG1hbnQgPSAwLFxuICAgICAgICAgICAgcmVhbCA9IDAsXG4gICAgICAgICAgICBiYXMsIGFicywgdG1wLCBleHAsIGk7XG5cbiAgICAgICAgYWJzID0gTWF0aC5hYnMobnVtKTtcblxuICAgICAgICBpZiAobnVtICE9PSAwKSB7XG4gICAgICAgICAgICAvL0ZpbmQgZXhwb25lbnQgYW5kIGJhc2UuXG4gICAgICAgICAgICBmb3IgKGkgPSAxMjg7IGkgPiAtMTI3OyBpLS0pIHtcbiAgICAgICAgICAgICAgICB0bXAgPSBhYnMgLyBNYXRoLnBvdygyLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAodG1wID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV4cCA9IGk7XG4gICAgICAgICAgICAgICAgYmFzID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwICs9IDEyNztcbiAgICAgICAgICAgIGJhcyA9IGJhcy50b1N0cmluZygyKTtcbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBtYW50aXNzYS5cbiAgICAgICAgICAgIGZvciAoaSA9IDI7IGkgPCAyNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbWFudCA8PD0gMTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzLmNoYXJBdChpKSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hbnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmFzLmNoYXJBdCgyNSkgPT09ICcxJykge1xuICAgICAgICAgICAgICAgIG1hbnQgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBSRUFMIHZhbHVlLlxuICAgICAgICAgICAgcmVhbCA9IGV4cDsgLy9leHBvbmVudFxuICAgICAgICAgICAgcmVhbCA8PD0gMjM7XG4gICAgICAgICAgICByZWFsICs9IG1hbnQ7IC8vbWFudGlzc2FcbiAgICAgICAgICAgIGlmIChudW0gPCAwKSB7XG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgbmVnYXRpdmUgc2lnbi5cbiAgICAgICAgICAgICAgICByZWFsICs9IDIxNDc0ODM2NDg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAgICAqIENvbnZlcnQgYSBKYXZhU2NyaXB0IGZsb2F0aW5nIHBvaW50IG51bWJlciB0byBhIFBMQyBMUkVBTCB2YWx1ZS5cbiAgICAgICAgICogQ2F1c2UgaXQncyBhIDY0IGJpdCB2YWx1ZSwgd2UgaGF2ZSB0byBzcGxpdCBpdCBpbiB0d28gMzIgYml0IGludGVnZXIuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtXG4gICAgICAgICAqL1xuICAgIGZsb2F0VG9McmVhbChudW0pIHtcbiAgICAgICAgdmFyIG1hbnQgPSAwLFxuICAgICAgICAgICAgbWFudDIgPSAwLFxuICAgICAgICAgICAgbHJlYWwgPSB7XG4gICAgICAgICAgICAgICAgcGFydDE6IDAsXG4gICAgICAgICAgICAgICAgcGFydDI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhYnMsIHRtcCwgZXhwLCBmaXJzdGJpdCwgYmFzLCBpO1xuXG4gICAgICAgIGFicyA9IE1hdGguYWJzKG51bSk7XG5cbiAgICAgICAgaWYgKG51bSAhPT0gMCkge1xuICAgICAgICAgICAgLy9GaW5kIGV4cG9uZW50IGFuZCBiYXNlLlxuICAgICAgICAgICAgZm9yIChpID0gMTAyNDsgaSA+PSAtMTAyMzsgaS0tKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gYWJzIC8gTWF0aC5wb3coMiwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKHRtcCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBleHAgPSBpO1xuICAgICAgICAgICAgICAgIGJhcyA9IHRtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cCArPSAxMDIzO1xuICAgICAgICAgICAgYmFzID0gYmFzLnRvU3RyaW5nKDIpO1xuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIG1hbnRpc3NhLlxuICAgICAgICAgICAgZm9yIChpID0gMjsgaSA8IDIyOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtYW50IDw8PSAxO1xuICAgICAgICAgICAgICAgIGlmIChiYXMuY2hhckF0KGkpID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFudCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiYXMuY2hhckF0KGkpID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICBmaXJzdGJpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBmb3IgKGk7IGkgPCA1NDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbWFudDIgPDw9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGJhcy5jaGFyQXQoaSkgPT09ICcxJykge1xuICAgICAgICAgICAgICAgICAgICBtYW50MiArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBMUkVBTCB2YWx1ZS5cbiAgICAgICAgICAgIGxyZWFsLnBhcnQxID0gZXhwOyAvL2V4cG9uZW50XG4gICAgICAgICAgICBscmVhbC5wYXJ0MSA8PD0gMjA7XG4gICAgICAgICAgICBscmVhbC5wYXJ0MSArPSBtYW50OyAvL21hbnRpc3NhXG4gICAgICAgICAgICBpZiAobnVtIDwgMCkge1xuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIG5lZ2F0aXZlIHNpZ24uXG4gICAgICAgICAgICAgICAgbHJlYWwucGFydDEgKz0gMjE0NzQ4MzY0ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxyZWFsLnBhcnQyID0gbWFudDI7XG4gICAgICAgICAgICBpZiAoZmlyc3RiaXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBscmVhbC5wYXJ0MiArPSAyMTQ3NDgzNjQ4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBscmVhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgdmFsdWUgdG8gdmFsdWUgaW4gbWlsbGlzZWNvbmRzLCBkZXBlbmRpbmdcbiAgICAgKiBvbiB0aGUgZm9ybWF0IHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICB0b01pbGxpc2VjKHRpbWUsIGZvcm1hdCkge1xuICAgICAgICB2YXIgdG1wO1xuICAgICAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgICAgICAgY2FzZSAnI2QnOlxuICAgICAgICAgICAgY2FzZSAnI2RkJzpcbiAgICAgICAgICAgICAgICB0bXAgPSB0aW1lICogODY0MDAwMDA7Ly9kYXlzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcjaCc6XG4gICAgICAgICAgICBjYXNlICcjaGgnOlxuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgKiAzNjAwMDAwOyAvL2hvdXJzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcjbSc6XG4gICAgICAgICAgICBjYXNlICcjbW0nOlxuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgKiA2MDAwMDsgICAvL21pbnV0ZXNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJyNzJzpcbiAgICAgICAgICAgIGNhc2UgJyNzcyc6XG4gICAgICAgICAgICAgICAgdG1wID0gdGltZSAqIDEwMDA7ICAgIC8vc2Vjb25kc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnI21zJzpcbiAgICAgICAgICAgIGNhc2UgJyNtc21zbXMnOiAgICAgICAgICAgLy9taWxsaXNlY29uZHNcbiAgICAgICAgICAgICAgICB0bXAgPSB0aW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0bXAgPSB0aW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0bXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIFRPRCBzdHJpbmcgdG8gYSB2YWx1ZSBvZiBtaWxsaXNlY29uZHMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gICAgICovXG4gICAgc3RyaW5nVG9UaW1lKHRpbWVzdHJpbmcsIGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyRm9ybWF0ID0gZm9ybWF0LnNwbGl0KCcjJyksXG4gICAgICAgICAgICBhcnJsZW4gPSBhcnJGb3JtYXQubGVuZ3RoLFxuICAgICAgICAgICAgcmVnZXggPSAvOnxcXC58LXxfLyxcbiAgICAgICAgICAgIHRpbWUgPSAwLFxuICAgICAgICAgICAgY250ID0gMCxcbiAgICAgICAgICAgIHRtcCwgaSwgYXJyVmFsdWVzLCBzcGxpdHRlck9rO1xuXG4gICAgICAgIC8vQ2hlY2sgaWYgYSB2YWxpZCBzcGxpdHRlciBpcyBnaXZlblxuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJybGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChyZWdleC50ZXN0KGFyckZvcm1hdFtpXSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcGxpdHRlck9rID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcGxpdHRlck9rICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBzZXBhcmF0b3IgKCA6IC4gLSBfICkgZm9yIFRPRCBzdHJpbmcgZm91bmQhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZygnU3RyaW5nOiAnICsgdGltZXN0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmxvZygnRm9ybWF0OiAnICsgZm9ybWF0KTtcbiAgICAgICAgICAgIC8vQWx0aG91Z2ggd2UgY291bGQgdHJ5IHRvIHNwbGl0IHRoZSB0aW1lc3RyaW5nIGluIGNhc2Ugb2YgYSBcbiAgICAgICAgICAgIC8vd3JvbmcgZm9ybWF0dGluZyBzdHJpbmcsIHdlIGRvbid0IGRvIGl0LlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBhcnJWYWx1ZXMgPSB0aW1lc3RyaW5nLnNwbGl0KHJlZ2V4KTtcblxuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJybGVuOyBpKyspIHtcblxuICAgICAgICAgICAgc3dpdGNoIChhcnJGb3JtYXRbaV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICBjYXNlICdoaCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHBhcnNlSW50KGFyclZhbHVlc1tjbnRdLCAxMCkgKiAzNjAwMDAwO1xuICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbW0nOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBwYXJzZUludChhcnJWYWx1ZXNbY250XSwgMTApICogNjAwMDA7XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzcyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHBhcnNlSW50KGFyclZhbHVlc1tjbnRdLCAxMCkgKiAxMDAwO1xuICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbXMnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ21zbXNtcyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHBhcnNlSW50KGFyclZhbHVlc1tjbnRdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZSArPSB0bXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmFzZTY0IGVuY29kZXJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhXG4gICAgICovXG4gICAgZW5jb2RlQmFzZTY0KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZSguLi5kYXRhKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBmb3IgY29udmVydGluZyB0aGUgZGF0YSB2YWx1ZXMgdG8gYSBieXRlIGFycmF5LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtICAgICBBbiBpdGVtIG9mIHRoZSBpdGVtIGxpc3Qgb2YgYSByZXF1ZXN0IGRlc2NyaXB0b3IuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgICAgIENvbnRhaW5zIHRoZSBkYXRhIHR5cGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0ICAgVGhlIGZvcm1hdHRpbmcgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZW4gICAgICBEYXRhIGxlbmd0aC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYnl0ZXMgICAgQW4gYXJyYXkgY29udGFpbmluZyB0aGUgZGF0YSBhcyBieXRlIHZhbHVlcy5cbiAgICAgKi9cbiAgICBkYXRhVG9CeXRlQXJyYXkoaXRlbSwgdHlwZSwgZm9ybWF0LCBsZW4pIHtcblxuICAgICAgICB2YXIgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIHZhbCwgc3RybGVuLCBzbCwgaTtcblxuICAgICAgICAvL0lmIG5vIHZhbHVlIGlzIHBhc3NlZCwgc2V0IHZhbHVlIHRvIHplcm8gYW5kIGxvZyBhbiBlcnJvciBtZXNzYWdlLlxuICAgICAgICBpZiAoaXRlbS52YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnREFURSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnRFQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1RPRCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnVElNRV9PRl9EQVknOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RBVEVfQU5EX1RJTUUnOlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFZhbHVlIG9mIGEgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCBpcyBub3QgZGVmaW5lZCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9EZXBlbmRpbmcgb24gdGhlIGRhdGEgdHlwZSwgY29udmVydCB0aGUgdmFsdWVzIHRvIGEgYnl0ZSBhcnJheS5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdCT09MJzpcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS52YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZXNbMF0gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGVzWzBdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdCWVRFJzpcbiAgICAgICAgICAgIGNhc2UgJ1VTSU5UJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgMCwgMjU1KTtcbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1NJTlQnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAtMTI4LCAxMjcpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCArIDI1NjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdXT1JEJzpcbiAgICAgICAgICAgIGNhc2UgJ1VJTlQnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAwLCA2NTUzNSk7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQnOlxuICAgICAgICAgICAgY2FzZSAnSU5UMTYnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAtMzI3NjgsIDMyNzY3KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwgKyA2NTUzNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQxRFAnOlxuICAgICAgICAgICAgICAgIGl0ZW0udmFsID0gTWF0aC5yb3VuZChpdGVtLnZhbCAqIDEwKTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgLTMyNzY4LCAzMjc2Nyk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsICsgNjU1MzY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSU5UMkRQJzpcbiAgICAgICAgICAgICAgICBpdGVtLnZhbCA9IE1hdGgucm91bmQoaXRlbS52YWwgKiAxMDApO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAtMzI3NjgsIDMyNzY3KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwgKyA2NTUzNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEV09SRCc6XG4gICAgICAgICAgICBjYXNlICdVRElOVCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIDAsIDQyOTQ5NjcyOTUpO1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRElOVCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0yMTQ3NDgzNjQ4LCAyMTQ3NDgzNjQ3KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwgKyA0Mjk0OTY3Mjk2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1JFQUwnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAtMjE0NzQ4MzY0OCwgMjE0NzQ4MzY0Nyk7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5mbG9hdFRvUmVhbCh2YWwpO1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnTFJFQUwnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAtMjE0NzQ4MzY0OCwgMjE0NzQ4MzY0Nyk7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5mbG9hdFRvTHJlYWwodmFsKTtcbiAgICAgICAgICAgICAgICAvL0xlbmd0aCBzZXQgdG8gNCwgY2F1c2UgdHlwZSBsZW5ndGggaXMgOCBhbmQgdGhlcmUgYXJlIDIgcGFydHNcbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbC5wYXJ0MiwgNCk7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSBieXRlcy5jb25jYXQodGhpcy5udW1Ub0J5dGVBcnIodmFsLnBhcnQxLCA0KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvL0RlbGV0ZSB0aGUgdGltZSBwb3J0aW9uLlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRIb3VycygwKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwuc2V0TWludXRlcygwKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwuc2V0U2Vjb25kcygwKTtcbiAgICAgICAgICAgICAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRlIG9iamVjdCBpbiBzZWNvbmRzIHNpbmNlIDEuMS4xOTcwIGFuZFxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgdGltZSB6b25lIHRvIFVUQy5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gaXRlbS52YWwuZ2V0VGltZSgpIC8gMTAwMCAtIGl0ZW0udmFsLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBWYWx1ZSBvZiBhIERBVEUgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCBpcyBub3QgYSBkYXRlIG9iamVjdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRFQnOlxuICAgICAgICAgICAgY2FzZSAnREFURV9BTkRfVElNRSc6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRlIG9iamVjdCBpbiBzZWNvbmRzIHNpbmNlIDEuMS4xOTcwIGFuZFxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgdGltZSB6b25lIHRvIFVUQy5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gaXRlbS52YWwuZ2V0VGltZSgpIC8gMTAwMCAtIGl0ZW0udmFsLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBWYWx1ZSBvZiBhIERUIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgaXMgbm90IGEgZGF0ZSBvYmplY3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RPRCc6XG4gICAgICAgICAgICBjYXNlICdUSU1FX09GX0RBWSc6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9EZWxldGUgdGhlIGRhdGUgcG9ydGlvbi5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwuc2V0WWVhcigxOTcwKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwuc2V0TW9udGgoMCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsLnNldERhdGUoMSk7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29udmVydCB0aGUgZGF0ZSBvYmplY3QgaW4gc2Vjb25kcyBzaW5jZSAxLjEuMTk3MCBhbmRcbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgdGhlIHRpbWUgem9uZSB0byBVVEMuXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGl0ZW0udmFsLmdldFRpbWUoKSAtIGl0ZW0udmFsLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLnZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JZiB0aGUgdGltZSB2YWx1ZSBpcyBhIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnJyB8fCBmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gJyNoaCM6I21tJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogTm8gZm9ybWF0IGdpdmVuIGZvciBUT0Qgc3RyaW5nISBVc2luZyBkZWZhdWx0ICNoaCM6I21tLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy5zdHJpbmdUb1RpbWUoaXRlbS52YWwsIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVE9EIHZhbHVlIGluIHdyaXRlIHJlcXVlc3QgaXMgd2V0aGVyIGEgZGF0ZSBvYmplY3Qgbm9yIGEgc3RyaW5nIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgICAgICAgICAgIC8vSWYgbm8gbGVuZ3RoIGlzIGdpdmVuLCBzZXQgaXQgdG8gODAgY2hhcmFjdGVycyAoVHdpbkNBVCBkZWZhdWx0KS4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN0cmxlbiA9IChmb3JtYXQgPT09IHVuZGVmaW5lZCkgPyB0aGlzLnBsY1R5cGVMZW4uU1RSSU5HIDogcGFyc2VJbnQoZm9ybWF0LCAxMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKHN0cmxlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JZiB0aGUgZ2l2ZW4gc3RyaW5nIGxlbmd0aCBpcyB2YWxpZCBhbmQgc2hvcnRlciB0aGVuIHRoZSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgLy90aGVuIHVzZSB0aGUgZ2l2ZW4gdmFsdWUgdG8gYXZvaWQgYW4gb3ZlcmZsb3csIG90aGVyd2lzZSB1c2VcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgcmVhbCBzdHJpbmcgbGVuZ3RoLlxuICAgICAgICAgICAgICAgICAgICBzbCA9IHN0cmxlbiA8IGl0ZW0udmFsLmxlbmd0aCA/IHN0cmxlbiA6IGl0ZW0udmFsLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzW2ldID0gaXRlbS52YWwuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL0ZpbGwgdGhlIHN0cmluZyB1cCB0byB0aGUgZ2l2ZW4gbGVuZ3RoLCBpZiBuZWNlc3NhcnkuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaTsgaSA8IHN0cmxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBieXRlc1tpXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9UZXJtaW5hdGlvbiwgdGhlIHJlYWwgc3RyaW5nIGxlbmd0aCBpbiB0aGUgUExDIGlzXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIGRlZmluZWQgbGVuZ3RoICsgMS5cbiAgICAgICAgICAgICAgICAgICAgYnl0ZXNbaV0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RJTUUnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHBhcnNlSW50KGl0ZW0udmFsLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBWYWx1ZSBvZiBhIFRJTUUgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCBpcyBub3QgZGVmaW5lZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudG9NaWxsaXNlYyh2YWwsIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMb3dlciBsaW1pdCBmb3IgVElNRSB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGV4Y2VlZGVkISknKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgaXRlbS52YWwgKyBmb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA+IDQyOTQ5NjcyOTUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gNDI5NDk2NzI5NTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBVcHBlciBsaW1pdCBmb3IgVElNRSB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGV4Y2VlZGVkISknKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgaXRlbS52YWwgKyBmb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdFbmRTdHJ1Y3QnOlxuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZy5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVW5rbm93biBkYXRhIHR5cGUgaW4gd3JpdGUgcmVxdWVzdCA6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBieXRlcztcblxuICAgIH1cblxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVjb2RlciBGdW5jdGlvbnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgbnVtYmVyIHRvIGEgaGV4IHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKi9cbiAgICBudW1Ub0hleFN0cmluZyh2YWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gdmFsdWUudG9TdHJpbmcoMTYpO1xuICAgICAgICBpZiAoKHJldC5sZW5ndGggJSAyKSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0ID0gJzAnICsgcmV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgZml4ZWQgbGVuZ3RoIG9mIGFuIGludGVnZXIgYnkgYWRkaW5nIGxlYWRpbmcgXG4gICAgICogemVyb3MoaS5lLiBjaGFuZ2UgMiB0byAwMikuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG51bWJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcGxhY2VzXG4gICAgICovXG4gICAgZml4TnVtYkxlbmd0aChudW1iLCBwbGFjZXMpIHtcbiAgICAgICAgcGxhY2VzID0gKGlzTmFOKHBsYWNlcykpID8gMCA6IHBsYWNlcztcbiAgICAgICAgdmFyIHN0ciA9IG51bWIudG9TdHJpbmcoMTApO1xuICAgICAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IHBsYWNlcykge1xuICAgICAgICAgICAgc3RyID0gJzAnICsgc3RyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIGRhdGUgb2JqZWN0IHRvIGEgZm9ybWF0dGVkIHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHRpbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gICAgICovXG4gICAgZGF0ZVRvU3RyaW5nKHRpbWUsIGZvcm1hdCkge1xuXG4gICAgICAgIHZhciBhcnIgPSBmb3JtYXQuc3BsaXQoJyMnKSxcbiAgICAgICAgICAgIGFycmxlbiA9IGFyci5sZW5ndGgsXG4gICAgICAgICAgICB0c3RyaW5nID0gJycsXG4gICAgICAgICAgICB0bXAsIGk7XG5cbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFycmxlbjsgaSsrKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgLy9EYXRlIGZvcm1hdHRpbmcuXG4gICAgICAgICAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdERCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnV0QnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldERheSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdXS0QnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmRhdGVOYW1lcy53ZWVrZFNob3J0W3RpbWUuZ2V0RGF5KCldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdXRUVLREFZJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5kYXRlTmFtZXMud2Vla2RMb25nW3RpbWUuZ2V0RGF5KCldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTU0nOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTU9OJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5kYXRlTmFtZXMubW9udGhzU2hvcnRbdGltZS5nZXRNb250aCgpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTU9OVEgnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmRhdGVOYW1lcy5tb250aHNMb25nW3RpbWUuZ2V0TW9udGgoKV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1lZJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0bXAgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCAtPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnWVlZWSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAvL1RpbWUgZm9ybWF0dGluZy5cbiAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRIb3VycygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoaCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW0nOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldFNlY29uZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3MnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldFNlY29uZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21zJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbXNtc21zJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IGFycltpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0c3RyaW5nID0gdHN0cmluZyArIHRtcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHN0cmluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgbnVtYmVyIHdpdGggYSB2YWx1ZSBpbiBtaWxsaXNlY29uZHMgdG8gYSBmb3JtYXR0ZWQgc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHRpbWVUb1N0cmluZyh0aW1lLCBmb3JtYXQpIHtcbiAgICAgICAgdmFyIGFyciA9IGZvcm1hdC5zcGxpdCgnIycpLFxuICAgICAgICAgICAgYXJybGVuID0gYXJyLmxlbmd0aCxcbiAgICAgICAgICAgIHRzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgIHRtcCwgaTtcblxuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJybGVuOyBpKyspIHtcblxuICAgICAgICAgICAgc3dpdGNoIChhcnJbaV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmxlbiA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lIC8gODY0MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBNYXRoLmZsb29yKHRpbWUgLyA4NjQwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDg2NDAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RkJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmxlbiA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lIC8gODY0MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBNYXRoLmZsb29yKHRpbWUgLyA4NjQwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDg2NDAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmxlbiA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lIC8gMzYwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDM2MDAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgJSAzNjAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmxlbiA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lIC8gMzYwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDM2MDAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgJSAzNjAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmxlbiA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lIC8gNjAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBNYXRoLmZsb29yKHRpbWUgLyA2MDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDYwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmxlbiA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lIC8gNjAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBNYXRoLmZsb29yKHRpbWUgLyA2MDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDYwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmxlbiA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgJSAxMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NzJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmxlbiA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgJSAxMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtcyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21zbXNtcyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBhcnJbaV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHN0cmluZyA9IHRzdHJpbmcgKyB0bXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRzdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBVU0lOVC9CWVRFLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1VzaW50KHN0cmluZykge1xuICAgICAgICB2YXIgaGV4cyA9IHRoaXMubnVtVG9IZXhTdHJpbmcoc3RyaW5nLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoaGV4cywgMTYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gU0lOVC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNTaW50KHN0cmluZykge1xuICAgICAgICB2YXIgZGVjID0gdGhpcy5wYXJzZVBsY1VzaW50KHN0cmluZyk7XG4gICAgICAgIGlmIChkZWMgPiAxMjcpIHtcbiAgICAgICAgICAgIGRlYyA9IGRlYyAtIDI1NjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVjO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gVUlOVC9XT1JELlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1VpbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBoZXhzID0gdGhpcy5udW1Ub0hleFN0cmluZyhzdHJpbmcuY2hhckNvZGVBdCgxKSk7XG4gICAgICAgIGhleHMgKz0gdGhpcy5udW1Ub0hleFN0cmluZyhzdHJpbmcuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgIHJldHVybiBwYXJzZUludChoZXhzLCAxNik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBJTlQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjSW50KHN0cmluZykge1xuICAgICAgICB2YXIgZGVjID0gdGhpcy5wYXJzZVBsY1VpbnQoc3RyaW5nKTtcbiAgICAgICAgaWYgKGRlYyA+IDMyNzY3KSB7XG4gICAgICAgICAgICBkZWMgPSBkZWMgLSA2NTUzNjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVjO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gVURJTlQvRFdPUkQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjVWRpbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBoZXhzID0gdGhpcy5udW1Ub0hleFN0cmluZyhzdHJpbmcuY2hhckNvZGVBdCgzKSk7XG4gICAgICAgIGhleHMgKz0gdGhpcy5udW1Ub0hleFN0cmluZyhzdHJpbmcuY2hhckNvZGVBdCgyKSk7XG4gICAgICAgIGhleHMgKz0gdGhpcy5udW1Ub0hleFN0cmluZyhzdHJpbmcuY2hhckNvZGVBdCgxKSk7XG4gICAgICAgIGhleHMgKz0gdGhpcy5udW1Ub0hleFN0cmluZyhzdHJpbmcuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgIHJldHVybiBwYXJzZUludChoZXhzLCAxNik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBESU5ULlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY0RpbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBkZWMgPSB0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nKTtcbiAgICAgICAgaWYgKGRlYyA+IDIxNDc0ODM2NDcpIHtcbiAgICAgICAgICAgIGRlYyA9IGRlYyAtIDQyOTQ5NjcyOTY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlYztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIGEgZm9ybWF0dGVkIHRpbWUgc3RyaW5nXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICBwYXJzZVBsY1RpbWUoc3RyaW5nLCBmb3JtYXQpIHtcbiAgICAgICAgdmFyIHRpbWUgPSB0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nKTtcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZTsgICAgLy9VbmZvcm1hdHRlZDogdmFsdWUgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy50aW1lVG9TdHJpbmcodGltZSwgZm9ybWF0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBhIGZvcm1hdHRlZCB0aW1lIG9mIGRheSBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICBwYXJzZVBsY1RvZChzdHJpbmcsIGZvcm1hdCkge1xuICAgICAgICAvL0NyZWF0ZSBhIGRhdGUgb2JqZWN0ICh0aW1lIGJhc2UgaW4gdGhlIFBMQyBhcmUgbWlsbGlzZWNvbmRzKVxuICAgICAgICB2YXIgdGltZSA9IG5ldyBEYXRlKHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcpKTtcblxuICAgICAgICAvL1RpbWUgem9uZSBjb3JyZWN0aW9uLlxuICAgICAgICB0aW1lID0gbmV3IERhdGUodGltZS5nZXRUaW1lKCkgKyB0aW1lLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMCk7XG5cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZVRvU3RyaW5nKHRpbWUsIGZvcm1hdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gYSBmb3JtYXR0ZWQgZGF0ZS90aW1lIG9mIGRheSBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICBwYXJzZVBsY0RhdGUoc3RyaW5nLCBmb3JtYXQpIHtcbiAgICAgICAgLy9Db252ZXJ0ZSB0byBtaWxsaXNlY29uZHMgYW4gY3JlYXRlIGEgZGF0ZSBvYmplY3RcbiAgICAgICAgLy8odGltZSBiYXNlIG9mIERBVEUvRFQgdmFyaWFibGVzIGluIHRoZSBQTEMgYXJlIHNlY29uZHMgc2luY2UgMS4xLjE5NzApXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZykgKiAxMDAwKTtcblxuICAgICAgICAvL1RpbWUgem9uZSBjb3JyZWN0aW9uLlxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMCk7XG5cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZVRvU3RyaW5nKGRhdGUsIGZvcm1hdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgb2YgYSBSRUFMIHZhcmlhYmxlXG4gICAgICogdG8gYSBKYXZhU2NyaXB0IGZsb2F0aW5nIHBvaW50IG51bWJlci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNSZWFsKHN0cmluZykge1xuICAgICAgICB2YXIgbWFudCA9IDEsXG4gICAgICAgICAgICBkdWFsID0gMC41LFxuICAgICAgICAgICAgbnVtID0gdGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZyksXG4gICAgICAgICAgICBzaWduLCBleHAsIGk7XG5cbiAgICAgICAgLy9SZXR1cm4gaWYgdmFsdWUgaXMgemVyby4gXG4gICAgICAgIGlmIChudW0gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIC8vQ2hlY2sgdGhlIHNpZ24gYml0LlxuICAgICAgICBzaWduID0gKChudW0gPj4+IDMxKSA9PT0gMSkgPyAnLScgOiAnKyc7XG4gICAgICAgIG51bSA8PD0gMTsgLy9EZWxldGUgdGhlIHNpZ24gYml0LlxuICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgZXhwb25lbnQuXG4gICAgICAgIGV4cCA9IChudW0gPj4+IDI0KSAtIDEyNztcbiAgICAgICAgLy9DYWxjdWxhdGUgdGhlIDIzIGJpdCBtYW50aXNzYTogU2hpZnQgYml0cyB0byBsZWZ0IGFuZCBldmFsdWF0ZSB0aGVtLlxuICAgICAgICBudW0gPDw9IDg7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPD0gMjM7IGkrKykge1xuICAgICAgICAgICAgbWFudCArPSBudW0gPCAwID8gZHVhbCA6IDA7IC8vQWRkIGlmIGxlZnQgKHNpZ24gYml0KSBiaXQgaXMgdHJ1ZS5cbiAgICAgICAgICAgIG51bSA8PD0gMTtcbiAgICAgICAgICAgIGR1YWwgLz0gMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzaWduICsgKG1hbnQgKiBNYXRoLnBvdygyLCBleHApKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyBvZiBhIExSRUFMIHZhcmlhYmxlXG4gICAgICogdG8gYSBKYXZhU2NyaXB0IGZsb2F0aW5nIHBvaW50IG51bWJlci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNMcmVhbChzdHJpbmcpIHtcbiAgICAgICAgdmFyIG51bSA9IHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcuc3Vic3RyaW5nKDQsIDgpKSxcbiAgICAgICAgICAgIG51bTIgPSB0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nLnN1YnN0cmluZygwLCA0KSksXG4gICAgICAgICAgICBpID0gMTIsXG4gICAgICAgICAgICBtYW50ID0gMSxcbiAgICAgICAgICAgIGR1YWwgPSAwLjUsXG4gICAgICAgICAgICBzaWduLCBleHA7XG5cbiAgICAgICAgLy9SZXR1cm4gaWYgdmFsdWUgaXMgemVyby4gXG4gICAgICAgIGlmIChudW0gPT09IDAgJiYgbnVtMiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgLy9DaGVjayB0aGUgc2lnbiBiaXQuXG4gICAgICAgIHNpZ24gPSAoKG51bSA+Pj4gMzEpID09PSAxKSA/ICctJyA6ICcrJztcbiAgICAgICAgbnVtIDw8PSAxOyAvL0RlbGV0ZSB0aGUgc2lnbiBiaXQuXG4gICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBleHBvbmVudC5cbiAgICAgICAgZXhwID0gKG51bSA+Pj4gMjEpIC0gMTAyMztcbiAgICAgICAgLy9DYWxjdWxhdGUgdGhlIG1hbnRpc3NhLiBTaGlmdCBiaXRzIHRvIGxlZnQgYW5kIGV2YWx1YXRlIHRoZW0uXG4gICAgICAgIC8vUGFydCAxLlxuICAgICAgICBudW0gPDw9IDExO1xuICAgICAgICB3aGlsZSAoaSA8IDMyKSB7XG4gICAgICAgICAgICBtYW50ICs9IG51bSA8IDAgPyBkdWFsIDogMDsgLy9BZGQgaWYgbGVmdCAoc2lnbiBiaXQpIGJpdCBpcyB0cnVlLlxuICAgICAgICAgICAgbnVtIDw8PSAxO1xuICAgICAgICAgICAgZHVhbCAvPSAyO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIC8vUGFydCAyLlxuICAgICAgICBpZiAoKG51bTIgPj4+IDMxKSA9PT0gMSkge1xuICAgICAgICAgICAgbWFudCArPSBkdWFsO1xuICAgICAgICAgICAgbnVtMiA8PD0gMTtcbiAgICAgICAgICAgIGR1YWwgLz0gMjtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaSA8IDY0KSB7XG4gICAgICAgICAgICBtYW50ICs9IG51bTIgPCAwID8gZHVhbCA6IDA7IC8vQWRkIGlmIGxlZnQgKHNpZ24gYml0KSBiaXQgaXMgdHJ1ZS5cbiAgICAgICAgICAgIG51bTIgPDw9IDE7XG4gICAgICAgICAgICBkdWFsIC89IDI7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc2lnbiArIChtYW50ICogTWF0aC5wb3coMiwgZXhwKSkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBzdHJpbmcgYnkgc2ltcGx5IGN1dHRpbmcgb2Ygc3VwZXJmbHVvdXMgY2hhcmFjdGVycy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNTdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIC8qXG4gICAgICAgIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyaW5nLnN1YnN0cigwLCBpKTtcbiAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHN0cmluZy5zcGxpdChTdHJpbmcuZnJvbUNoYXJDb2RlKDApKVswXTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEJhc2U2NCBkZWNvZGVyXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAgICAgKi9cbiAgICBkZWNvZGVCYXNlNjQoZGF0YSkge1xuICAgICAgICByZXR1cm4gYXRvYihkYXRhKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgQjY0LXN1YnN0cmluZ3MgdG8gZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtTdHJpbmcsIE51bWJlcn0gZm9ybWF0XG4gICAgICogQHJldHVybiB7TWl4ZWR9IGRhdGFcbiAgICAgKiBcbiAgICAgKi9cbiAgICBzdWJTdHJpbmdUb0RhdGEoZGF0YVN0cmluZywgdHlwZSwgZm9ybWF0Pykge1xuICAgICAgICB2YXIgZGF0YTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0JPT0wnOlxuICAgICAgICAgICAgICAgIC8vRG9lcyB0aGlzIHdvcms/Pz8/PyBTZWVtcyBsaWtlLlxuICAgICAgICAgICAgICAgIGRhdGEgPSAoZGF0YVN0cmluZy5jaGFyQ29kZUF0KDApICE9ICcwJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdCWVRFJzpcbiAgICAgICAgICAgIGNhc2UgJ1VTSU5UJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1VzaW50KGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU0lOVCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNTaW50KGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnV09SRCc6XG4gICAgICAgICAgICBjYXNlICdVSU5UJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1VpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQnOlxuICAgICAgICAgICAgY2FzZSAnSU5UMTYnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjSW50KGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSU5UMURQJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gKCh0aGlzLnBhcnNlUGxjSW50KGRhdGFTdHJpbmcpKSAvIDEwKS50b0ZpeGVkKDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSU5UMkRQJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gKCh0aGlzLnBhcnNlUGxjSW50KGRhdGFTdHJpbmcpKSAvIDEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RXT1JEJzpcbiAgICAgICAgICAgIGNhc2UgJ1VESU5UJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1VkaW50KGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRElOVCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNEaW50KGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnUkVBTCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNSZWFsKGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS50b0ZpeGVkKHBhcnNlSW50KGZvcm1hdCwgMTApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdMUkVBTCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNMcmVhbChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEudG9GaXhlZChwYXJzZUludChmb3JtYXQsIDEwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1N0cmluZyhkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RPRCc6XG4gICAgICAgICAgICBjYXNlICdUSU1FX09GX0RBWSc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNUb2QoZGF0YVN0cmluZywgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RJTUUnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjVGltZShkYXRhU3RyaW5nLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRFQnOlxuICAgICAgICAgICAgY2FzZSAnREFURSc6XG4gICAgICAgICAgICBjYXNlICdEQVRFX0FORF9USU1FJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY0RhdGUoZGF0YVN0cmluZywgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0VuZFN0cnVjdCc6XG4gICAgICAgICAgICAgICAgLy9KdXN0IGRvIG5vdGhpbmcuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFVua25vd24gZGF0YSB0eXBlIGF0IHBhcnNpbmcgcmVhZCByZXF1ZXN0OiAnICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgdGhlIHJlc3BvbnNlIHN0cmluZyBvZiBhIFJlYWQgUmVxdWVzdCBhbmQgc3RvcmUgdGhlIGRhdGEuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIEFEUyBSZXFlc3QgT2JqZWN0XG4gICAgICovXG4gICAgcGFyc2VSZWFkUmVxKGFkc1JlcSkge1xuXG4gICAgICAgIGxldCByZXNwb25zZSxcbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gYWRzUmVxLnJlcURlc2NyLml0ZW1zLFxuICAgICAgICAgICAgYXJyVHlwZSA9IFtdLFxuICAgICAgICAgICAgc3RyQWRkciA9IDAsXG4gICAgICAgICAgICBpdGVtLCBkYXRhU3RyaW5nLCBkYXRhU3ViU3RyaW5nLCBzdHJsZW4sIGxlbiwgcGxlbiwgbW9kLCB0eXBlLCBmb3JtYXQsIGlkeCwgbGlzdGxlbiwgc3RhcnRhZGRyO1xuICAgICAgICBsZXQgcmVzdWx0OiBhbnlcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICByZXNwb25zZSA9IHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBkYXRhU3RyaW5nID0gdGhpcy5kZWNvZGVCYXNlNjQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BwRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG5cbiAgICAgICAgICAgIC8vUnVuIHRocm91Z2ggdGhlIGVsZW1lbnRzIGluIHRoZSBpdGVtIGxpc3QuXG4gICAgICAgICAgICBmb3IgKGlkeCA9IDAsIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGg7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgICAgIC8vR2V0IHR5cGUgYW5kIGZvcm1hdHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgICAgIGFyclR5cGUgPSB0aGlzLmdldFR5cGVBbmRGb3JtYXQoaXRlbSk7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGFyclR5cGVbMF07XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gYXJyVHlwZVsxXTtcblxuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBsZW5ndGggb2YgdGhlIGRhdGEgdHlwZXMuXG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBwYXJzZUludChmb3JtYXQsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9ICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSA/IHN0cmxlbiA6IGxlbikgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VuZFN0cnVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIG9mIHRoZSBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cIkVuZFN0cnVjdFwiIGlzIG9ubHkgdXNlZCB3aXRoIFwicmVhZEFycmF5T2ZTdHJ1Y3R1cmVzL3dyaXRlQXJyYXlPZlN0cnVjdHVyZXNcIi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IGl0ZW0udmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGxlbmd0aCBmb3IgY2FsY3VsYXRpbmcgcGFkZGluZyBieXRlc1xuICAgICAgICAgICAgICAgIHBsZW4gPSBsZW4gPCB0aGlzLmFsaWdubWVudCA/IGxlbiA6IHRoaXMuYWxpZ25tZW50O1xuXG4gICAgICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIHBsYWNlIG9mIHRoZSBlbGVtZW50IGluIHRoZSBkYXRhIHN0cmluZ1xuICAgICAgICAgICAgICAgIGlmIChhZHNSZXEucmVxRGVzY3Iuc2VxICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vSWYgdmFyaWFibGUgYWRkcmVzc2VzIGFyZSB1c2VkLlxuICAgICAgICAgICAgICAgICAgICBzdGFydGFkZHIgPSB0aGlzLmdldEluZGV4T2Zmc2V0KGFkc1JlcS5yZXFEZXNjcik7XG4gICAgICAgICAgICAgICAgICAgIHN0ckFkZHIgPSBpdGVtLmFkZHIgLSBzdGFydGFkZHI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhZHNSZXEucmVxRGVzY3IuY2FsY0FsaWdubWVudCA9PT0gdHJ1ZSAmJiBwbGVuID4gMSAmJiB0eXBlICE9PSAnRW5kU3RydWN0JyAmJiB0eXBlICE9PSAnU1RSSU5HJyAmJiBzdHJBZGRyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvL0NvbXB1dGUgdGhlIGFkZHJlc3MgZm9yIHRoZSBhbGlnbm1lbnQgaW4gY2FzZSBvZiBhIHN0cnVjdHVyZS5cbiAgICAgICAgICAgICAgICAgICAgbW9kID0gc3RyQWRkciAlIHBsZW47XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJBZGRyICs9IHBsZW4gLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1NsaWNlIHRoZSBzdHJpbmcgYW5kIGRlY29kZSB0aGUgZGF0YVxuICAgICAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCBsZW4pO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsIHR5cGUsIGZvcm1hdCk7XG5cbiAgICAgICAgICAgICAgICAvL1BhcnNlIHRoZSBuYW1lIG9mIHRoZSBKYXZhU2NyaXB0IHZhcmlhYmxlIGFuZCB3cml0ZSB0aGUgZGF0YSB0byBpdFxuICAgICAgICAgICAgICAgIGlmICh0eXBlICE9PSAnRW5kU3RydWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmp2YXIsIHJlc3VsdCwgYWRzUmVxLnJlcURlc2NyLmRhdGFPYmosIGl0ZW0ucHJlZml4LCBpdGVtLnN1ZmZpeCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIG5leHQgYWRkcmVzc1xuICAgICAgICAgICAgICAgIGlmIChhZHNSZXEucmVxRGVzY3Iuc2VxID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gbGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGFyc2luZyBvZiBSZWFkIFJlcXVlc3QgZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIHRoZSByZXNwb25zZSBzdHJpbmcgb2YgYSBTdW1SZWFkUmVxdWVzdCBhbmQgc3RvcmUgdGhlIGRhdGEuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIEFEUyBSZXF1ZXN0IE9iamVjdFxuICAgICAqL1xuICAgIHBhcnNlU3VtUmVhZFJlcShhZHNSZXEpIHtcblxuICAgICAgICB2YXIgcmVzcG9uc2UsXG4gICAgICAgICAgICBpdGVtTGlzdCA9IGFkc1JlcS5yZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIHN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgc3ViU3RyQWRkciA9IDAsXG4gICAgICAgICAgICBkYXRhT2JqID0gd2luZG93LFxuICAgICAgICAgICAgdmxlbk1heCA9IDAsXG4gICAgICAgICAgICBpdGVtLCBkYXRhU3RyaW5nLCBkYXRhU3ViU3RyaW5nLCBkYXRhLCBsZW4sIHR5cGUsIGZvcm1hdCwgaWR4LCBsaXN0bGVuLCBlcnJvckNvZGUsIGp2YXIsIGksXG4gICAgICAgICAgICBhcnJheUxlbmd0aCwgaXRlbVNpemUsIGl0ZW1JbmZvO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNsaWNlIGEgcGllY2Ugb3V0IG9mIHRoZSBzdWJzdHJpbmcsIGNvbnZlcnQgdGhlIGRhdGEgYW5kIHdyaXRlIGl0XG4gICAgICAgICAqIHRvIHRoZSBKYXZhU2NyaXB0IHZhcmlhYmxlLiAgXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBwYXJzZVN1YlN0cmluZ1NsaWNlID0gKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgc3RybGVuLCBzdWJTdHJTbGljZTtcblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IHBhcnNlSW50KGZvcm1hdCwgMTApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW1JbmZvLnN0cmluZ0xlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RybGVuID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZW4gPSAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKHN0cmxlbikgPyBzdHJsZW4gOiBsZW4pICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UYWtlIGEgcGllY2Ugb2YgdGhlIGRhdGEgc3ViIHN0cmluZ1xuICAgICAgICAgICAgc3ViU3RyU2xpY2UgPSBkYXRhU3ViU3RyaW5nLnN1YnN0cihzdWJTdHJBZGRyLCBsZW4pO1xuICAgICAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRhXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoc3ViU3RyU2xpY2UsIHR5cGUsIGZvcm1hdCk7XG4gICAgICAgICAgICAvL1BhcnNlIHRoZSBuYW1lIG9mIHRoZSBKYXZhU2NyaXB0IHZhcmlhYmxlIGFuZCB3cml0ZSB0aGUgZGF0YSB0byBpdFxuICAgICAgICAgICAgdGhpcy5wYXJzZVZhck5hbWUoanZhciwgZGF0YSwgZGF0YU9iaiwgaXRlbS5wcmVmaXgsIGl0ZW0uc3VmZml4KTtcblxuICAgICAgICAgICAgc3ViU3RyQWRkciArPSBsZW47XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUGFyc2UgdGhlIHN0dWN0dXJlIGRlZmluaXRpb24gYW5kIGNvbXB1dGUgdGhlIGRhdGEgb2ZcbiAgICAgICAgICogdGhlIHN1YnN0cmluZy5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHBhcnNlU3RydWN0dXJlID0gKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgaiwgZGVmQXJyLCBsZW5BcnJFbGVtLCBsYXN0RGVmQXJyLCBtb2QsIGVsZW07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRnVuY3Rpb24gZm9yIGFkanVzdGluZyB0aGUgYWRkcmVzcyBvZiB0aGUgZGF0YSBpbiB0aGUgc3RyaW5nXG4gICAgICAgICAgICAgKiBpZiBhbiBhbGlnbm1lbnQgaXMgdXNlZC4gXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrQWxpZ25tZW50ID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZsZW4sIG1vZDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdHlwZSAhPT0gJ1NUUklORycgJiYgdHlwZSAhPT0gJ0VuZFN0cnVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIGxlbmd0aCBmb3IgY2FsY3VsYXRpbmcgcGFkZGluZyBieXRlc1xuICAgICAgICAgICAgICAgICAgICB2bGVuID0gbGVuIDwgdGhpcy5hbGlnbm1lbnQgPyBsZW4gOiB0aGlzLmFsaWdubWVudDtcblxuICAgICAgICAgICAgICAgICAgICAvL0NvbXB1dGUgdGhlIGFkZHJlc3MgZm9yIHRoZSBhbGlnbm1lbnQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2bGVuID4gMSAmJiBzdWJTdHJBZGRyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kID0gc3ViU3RyQWRkciAlIHZsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlN0ckFkZHIgKz0gdmxlbiAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vU3RvcmUgdGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgIC8vZm9yIGluc2VydGluZyBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZsZW4gPiB2bGVuTWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bGVuTWF4ID0gdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DaGVjayBzdHJ1Y3R1cmUgZGVmaW5pdGlvblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmRlZiA9IHRoaXMucGFyc2VWYXJOYW1lKGl0ZW0uZGVmKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPT09IHRydWUgJiYgaXRlbS5kZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGVmID0gdGhpcy5jcmVhdGVTdHJ1Y3REZWYoaXRlbUluZm8uZGF0YVR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kZWYgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gc3RydWN0dXJlIGRlZmluaW5pdGlvbiBmb3VuZCAocGFyc2VTdW1SZWFkUmVxKCkpIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGVsZW0gaW4gaXRlbS5kZWYpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRlZi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZkFyciA9IGl0ZW0uZGVmW2VsZW1dLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbMF0gPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbkFyckVsZW0gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REZWZBcnIgPSBkZWZBcnIubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5BcnJFbGVtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gZGVmQXJyWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhciA9IGVsZW0gKyBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBkZWZBcnIuc2xpY2UoMywgLTEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXIgPSBlbGVtICsgJy4nICsgajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPj0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZGVmQXJyLnNsaWNlKDMpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0FkZCBpbmRleCBpbiBjYXNlIG9mIGFuIGFycmF5IG9mIHN0cnVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXIgPSBpICsgJy4nICsganZhcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGlnbm1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1YlN0cmluZ1NsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHdlIGFyZSBpbiBhbiBhcnJheSBvZiBzdHJ1Y3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganZhciA9IGkgKyAnLicgKyBlbGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGRlZkFyclswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnIubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkFyclsxXSA9IGRlZkFyci5zbGljZSgxKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBkZWZBcnJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FsaWdubWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdWJTdHJpbmdTbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB2bGVuTWF4ID4gMSAmJiB0eXBlICE9PSAnU1RSSU5HJyAmJiB0eXBlICE9PSAnRW5kU3RydWN0Jykge1xuICAgICAgICAgICAgICAgIGlmICh2bGVuTWF4ID4gdGhpcy5hbGlnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmxlbk1heCA9IHRoaXMuYWxpZ25tZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2QgPSBzdWJTdHJBZGRyICUgdmxlbk1heDtcbiAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJTdHJBZGRyICs9IHZsZW5NYXggLSBtb2Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgPSB0aGlzLmRlY29kZUJhc2U2NChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHBSZERhdGEnKVswXS5maXJzdENoaWxkLmRhdGEpO1xuXG4gICAgICAgICAgICAvL1JlYWQgdGhlIGVycm9yIGNvZGVzIG9mIHRoZSBBRFMgc3ViIGNvbW1hbmRzLlxuICAgICAgICAgICAgZm9yIChpZHggPSAwLCBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIDQpO1xuICAgICAgICAgICAgICAgIGVycm9yQ29kZSA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBRFMgc3ViIGNvbW1hbmQgZXJyb3Igd2hpbGUgcHJvY2Vzc2luZyBhIFN1bVJlYWRSZXF1ZXN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnRXJyb3IgY29kZTogJyArIGVycm9yQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW1MaXN0W2lkeF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gNDtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL1J1biB0aHJvdWdoIHRoZSBlbGVtZW50cyBpbiB0aGUgaXRlbSBsaXN0LlxuICAgICAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgICAgICBpdGVtSW5mbyA9IHRoaXMuZ2V0SXRlbUluZm9ybWF0aW9uKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICAgICAgdHlwZSA9IGl0ZW1JbmZvLnR5cGU7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gaXRlbUluZm8uZm9ybWF0O1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgdGhlIGxlbmd0aCBvZiB0aGUgZGF0YSB0eXBlcy5cbiAgICAgICAgICAgICAgICBpdGVtU2l6ZSA9IGl0ZW1JbmZvLnNpemU7XG5cbiAgICAgICAgICAgICAgICAvL1Jlc2V0IGNvdW50ZXIgZm9yIGFycmF5cy5cbiAgICAgICAgICAgICAgICBpID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8vU2xpY2UgdGhlIHN0cmluZyBhbmQgZGVjb2RlIHRoZSBkYXRhXG4gICAgICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIGl0ZW1TaXplKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0FSUkFZJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFPYmogPSB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmp2YXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViU3RyQWRkciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IGl0ZW1JbmZvLmFycmF5TGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3RydWN0dXJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gaXRlbUluZm8uYXJyYXlEYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhciA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3ViU3RyaW5nU2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVVNFUic6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhT2JqID0gdGhpcy5wYXJzZVZhck5hbWUoaXRlbS5qdmFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlN0ckFkZHIgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdHJ1Y3R1cmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhT2JqID0gd2luZG93O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsIHR5cGUsIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1BhcnNlIHRoZSBuYW1lIG9mIHRoZSBKYXZhU2NyaXB0IHZhcmlhYmxlIGFuZCB3cml0ZSB0aGUgZGF0YSB0byBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVZhck5hbWUoaXRlbS5qdmFyLCBkYXRhLCBkYXRhT2JqLCBpdGVtLnByZWZpeCwgaXRlbS5zdWZmaXgpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBuZXh0IHN0cmluZyBhZGRyZXNzXG4gICAgICAgICAgICAgICAgc3RyQWRkciArPSBpdGVtU2l6ZTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIFN1bVJlYWRSZXF1ZXN0IGZhaWxlZDonICsgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIHRoZSByZXNwb25zZSBzdHJpbmcgb2YgYSBTdW1Xcml0ZVJlcXVlc3QuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIEFEUyBSZXF1ZXN0IE9iamVjdFxuICAgICAqL1xuICAgIHBhcnNlU3VtV3JpdGVSZXEoYWRzUmVxKSB7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlLFxuICAgICAgICAgICAgaXRlbUxpc3QgPSBhZHNSZXEucmVxRGVzY3IuaXRlbXMsXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICBhcnJEZWxldGVkSGRsID0gW10sXG4gICAgICAgICAgICBzdHJBZGRyID0gMCxcbiAgICAgICAgICAgIHN1YlN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgZGF0YU9iaiA9IHdpbmRvdyxcbiAgICAgICAgICAgIGl0ZW0sIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIGRhdGEsIGxlbiwgdHlwZSwgZm9ybWF0LCBpZHgsIGxpc3RsZW4sIGVycm9yQ29kZSwgZGVsSWR4LCBzeW1OYW1lO1xuXG5cbiAgICAgICAgLy9KdXN0IGxvb2sgZm9yIGVycm9ycy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgPSB0aGlzLmRlY29kZUJhc2U2NChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHBSZERhdGEnKVswXS5maXJzdENoaWxkLmRhdGEpO1xuXG4gICAgICAgICAgICAvL1JlYWQgdGhlIGVycm9yIGNvZGVzIG9mIHRoZSBBRFMgc3ViIGNvbW1hbmRzLlxuICAgICAgICAgICAgZm9yIChpZHggPSAwLCBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIDQpO1xuICAgICAgICAgICAgICAgIGVycm9yQ29kZSA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yQ29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvL1JlbGVhc2UgaGFuZGxlcyByZXF1ZXN0P1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWRzUmVxLnJlcURlc2NyLmlzUmVsSGRsUmVxID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeW1OYW1lID0gaXRlbUxpc3RbaWR4XS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhlIGhhbmRsZSBmcm9tIHRoZSBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuaGFuZGxlQ2FjaGVbc3ltTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0RlbGV0ZSB0aGUgaGFuZGxlIGluIHRoZSBoYW5kbGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsSWR4ID0gdGhpcy5oYW5kbGVOYW1lcy5pbmRleE9mKHN5bU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuaGFuZGxlTmFtZXNbZGVsSWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyckRlbGV0ZWRIZGxbaWR4XSA9IHN5bU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBRFMgc3ViIGNvbW1hbmQgZXJyb3Igd2hpbGUgcHJvY2Vzc2luZyBhIFN1bVJlYWRSZXF1ZXN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnRXJyb3IgY29kZTogJyArIGVycm9yQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW1MaXN0W2lkeF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJBZGRyICs9IDQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vUmVsZWFzZSBoYW5kbGVzIHJlcXVlc3Q/XG4gICAgICAgICAgICBpZiAoYWRzUmVxLnJlcURlc2NyLmlzUmVsSGRsUmVxID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgZGVsZXRlZCBpdGVtc1xuICAgICAgICAgICAgICAgIGZvciAoaWR4ID0gdGhpcy5oYW5kbGVOYW1lcy5sZW5ndGggLSAxOyBpZHggPj0gMDsgaWR4LS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlTmFtZXNbaWR4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU5hbWVzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZU5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNhY2hlUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBBbGwgaGFuZGxlcyByZWxlYXNlZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFJlbGVhc2VkIGhhbmRsZXM6Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGFyckRlbGV0ZWRIZGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGFyc2luZyBvZiBTdW1Xcml0ZVJlcXVlc3QgZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERlY29kZSB0aGUgcmVzcG9uc2Ugc3RyaW5nIG9mIGEgQURTIFN0YXRlIFJlcXVlc3QgYW5kIHN0b3JlIHRoZSBkYXRhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBBRFMgUmVxZXN0IE9iamVjdFxuICAgICAqL1xuICAgIHBhcnNlQWRzU3RhdGUoYWRzUmVxKSB7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmFkc1N0YXRlID0gcGFyc2VJbnQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BBZHNTdGF0ZScpWzBdLmZpcnN0Q2hpbGQuZGF0YSwgMTApO1xuICAgICAgICAgICAgdGhpcy5hZHNTdGF0ZVR4dCA9IHRoaXMuYWRzU3RhdGVzW3RoaXMuYWRzU3RhdGVdO1xuICAgICAgICAgICAgdGhpcy5kZXZpY2VTdGF0ZSA9IHBhcnNlSW50KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwRGV2aWNlU3RhdGUnKVswXS5maXJzdENoaWxkLmRhdGEsIDEwKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGFyc2luZyBvZiBBRFMgUmVhZCBTdGF0ZSBSZXF1ZXN0IGZhaWxlZDonICsgZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgdGhlIHJlc3BvbnNlIHN0cmluZyBvZiBhIFJlYWRXcml0ZSBSZXF1ZXN0IGFuZCBzdG9yZSB0aGUgaGFuZGxlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQURTIFJlcXVlc3QgT2JqZWN0XG4gICAgICovXG4gICAgcGFyc2VIYW5kbGVzKGFkc1JlcSkge1xuXG4gICAgICAgIHZhciByZXNwb25zZSxcbiAgICAgICAgICAgIGFyclN5bU5hbWVzID0gdGhpcy5oYW5kbGVOYW1lcyxcbiAgICAgICAgICAgIHN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgc3ViU3RyQWRkciA9IDAsXG4gICAgICAgICAgICBkYXRhU3RyaW5nLCBkYXRhU3ViU3RyaW5nLCBoYW5kbGVWYWwsIGlkeCwgYXJybGVuLCBlcnJvckNvZGUsIHJldHVybkxlbjtcblxuICAgICAgICByZXNwb25zZSA9IHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIGRhdGFTdHJpbmcgPSB0aGlzLmRlY29kZUJhc2U2NChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHBSZERhdGEnKVswXS5maXJzdENoaWxkLmRhdGEpO1xuXG4gICAgICAgIC8vUmVhZCB0aGUgZXJyb3IgY29kZXMgYW5kIHRoZSByZXR1cm4gbGVuZ3RoIG9mIHRoZSBBRFMgc3ViIGNvbW1hbmRzLlxuICAgICAgICBmb3IgKGlkeCA9IDAsIGFycmxlbiA9IGFyclN5bU5hbWVzLmxlbmd0aDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICBlcnJvckNvZGUgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcbiAgICAgICAgICAgIHN0ckFkZHIgKz0gNDtcblxuICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIDQpO1xuICAgICAgICAgICAgcmV0dXJuTGVuID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG4gICAgICAgICAgICBzdHJBZGRyICs9IDQ7XG5cbiAgICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBFcnJvciB3aGlsZSByZWFkaW5nIGEgaGFuZGxlIGZyb20gdGhlIFBMQyEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnRXJyb3IgY29kZTogJyArIGVycm9yQ29kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ0hhbmRsZTogJyArIGFyclN5bU5hbWVzW2lkeF0pO1xuICAgICAgICAgICAgICAgIHRocm93ICdIYW5kbGUgcmVxdWVzdCBhYm9ydGVkISc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL1J1biB0aHJvdWdoIHRoZSBlbGVtZW50cyBpbiB0aGUgc3ltYm9sTmFtZSBsaXN0LFxuICAgICAgICAvL2dldCB0aGUgZGF0YSBvdXQgb2YgdGhlIHN0cmluZyBhbmQgc3RvcmUgaXQgaW4gdGhlIGNhY2hlLlxuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGFycmxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgLy9TbGljZSB0aGUgc3RyaW5nIGFuZCBkZWNvZGUgdGhlIGRhdGFcbiAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCA0KTtcbiAgICAgICAgICAgIGhhbmRsZVZhbCA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuICAgICAgICAgICAgc3RyQWRkciArPSA0O1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNhY2hlW2FyclN5bU5hbWVzW2lkeF1dID0gaGFuZGxlVmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVDYWNoZVJlYWR5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEhhbmRsZSBjYWNoZSByZWFkeS4nKTtcbiAgICB9XG5cbiAgICBhc3luYyB3cml0ZVNpbmdsZShtZXRob2QsIHR5cGUsIGFyZ3MpIHtcbiAgICAgICAgbGV0IHJlcURlc2NyID0gdGhpcy5jcmVhdGVTaW5nbGVEZXNjcmlwdG9yKG1ldGhvZCwgdHlwZSwgYXJncylcbiAgICAgICAgbGV0IGFkc1JlcSA9IHRoaXMud3JpdGVSZXEocmVxRGVzY3IpXG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpXG4gICAgICAgIGxldCB2YWx1ZSA9IGF3YWl0IHRoaXMuYWRzUmVxU2VuZEFzeW5jKGFkc1JlcSlcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZFNpbmdsZShtZXRob2QsIHR5cGUsIGFyZ3MpIHtcbiAgICAgICAgbGV0IHJlcURlc2NyID0gdGhpcy5jcmVhdGVTaW5nbGVEZXNjcmlwdG9yKG1ldGhvZCwgdHlwZSwgYXJncylcbiAgICAgICAgbGV0IGFkc1JlcSA9IHRoaXMucmVhZFJlcShyZXFEZXNjcilcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSlcbiAgICAgICAgbGV0IHZhbHVlID0gYXdhaXQgdGhpcy5hZHNSZXFTZW5kQXN5bmMoYWRzUmVxKVxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBGdW5jdGlvbnMgZm9yIENyZWF0aW5nIFJlcXVlc3QgRGVzY3JpcHRvcnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICBcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgUmVxdWVzdCBEZXNjcmlwdG9yIGZvciBhIHNpbmdsZSB2YXJpYWJsZS4gQW4gaXRlbSBsaXN0XG4gICAgICogd2l0aCBhIHNpbmdsZSBhcnJheSBpdGVtIGlzIGdlbmVyYXRlZC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kICAgVGhlIG1ldGhvZCwgZWl0aGVyIFwiUmVhZFwiIG9yIFwiV3JpdGVcIi5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAgICAgVGhlIFBMQyBkYXRhIHR5cGUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFyZ3MgICAgIFRoZSBhcmd1bWVudHMgZm9yIGJ1aWxkaW5nIGZvciB0aGUgUmVxdWVzdCBEZXNjcmlwdG9yLlxuICAgICAqL1xuICAgIGNyZWF0ZVNpbmdsZURlc2NyaXB0b3IobWV0aG9kLCB0eXBlLCBhcmdzKSB7XG5cbiAgICAgICAgdmFyIHJlcURlc2NyID0ge30sXG4gICAgICAgICAgICBsZW4sIGl0ZW1JbmZvO1xuXG4gICAgICAgIGFyZ3MudHlwZSA9IHR5cGU7IC8vVG8gcHJldmVudCBlcnJvciBtZXNzYWdlcyBpbiBnZXRJdGVtSW5mb3JtYXRpb24oKVxuXG4gICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oYXJncyk7XG4gICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICAgICAgICAgICAgLy9DaGFuZ2UgdGhlIHJlYWQgbGVuZ3RoIGlmIGEgdmFsdWUgaXMgZ2l2ZW4uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihhcmdzLnN0cmxlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLnN0cmxlbjtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gYXJncy5zdHJsZW47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgbGVuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgc3RyaW5nIGZvciB0aGlzIHJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZW4rKzsgLy9UZXJtaW5hdGlvblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVElNRSc6XG4gICAgICAgICAgICBjYXNlICdUT0QnOlxuICAgICAgICAgICAgY2FzZSAnRFQnOlxuICAgICAgICAgICAgY2FzZSAnREFURSc6XG4gICAgICAgICAgICBjYXNlICdEQVRFX0FORF9USU1FJzpcbiAgICAgICAgICAgIGNhc2UgJ1RJTUVfT0ZfREFZJzpcbiAgICAgICAgICAgICAgICAvL0FwcGVuZCB0aGUgZm9ybWF0IHN0cmluZyB0byB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncy5mb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnUkVBTCc6XG4gICAgICAgICAgICBjYXNlICdMUkVBTCc6XG4gICAgICAgICAgICAgICAgLy9BcHBlbmQgdGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB0byB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncy5kZWNQbGFjZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5kZWNQbGFjZXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJncy5kcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmRwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ3JlYXRlIHRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuXG4gICAgICAgIHJlcURlc2NyID0ge1xuICAgICAgICAgICAgYWRkcjogYXJncy5hZGRyLFxuICAgICAgICAgICAgc3ltYm9sTmFtZTogaXRlbUluZm8uc3ltYm9sTmFtZSxcbiAgICAgICAgICAgIGRhdGFUeXBlTmFtZXM6IGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXMsXG4gICAgICAgICAgICBkYXRhVHlwZUFycklkeDogaXRlbUluZm8uZGF0YVR5cGVBcnJJZHgsXG4gICAgICAgICAgICBzeW1ib2xOYW1lQXJySWR4OiBpdGVtSW5mby5zeW1ib2xOYW1lQXJySWR4LFxuICAgICAgICAgICAgZnVsbFN5bWJvbE5hbWU6IGFyZ3MubmFtZSxcbiAgICAgICAgICAgIHVzZUhhbmRsZTogYXJncy5oYW5kbGUsXG4gICAgICAgICAgICBpZDogYXJncy5pZCxcbiAgICAgICAgICAgIG9jOiBhcmdzLm9jLFxuICAgICAgICAgICAgb2NkOiBhcmdzLm9jZCxcbiAgICAgICAgICAgIG9lOiBhcmdzLm9lLFxuICAgICAgICAgICAgb3Q6IGFyZ3Mub3QsXG4gICAgICAgICAgICByZWFkTGVuZ3RoOiBsZW4sXG4gICAgICAgICAgICBkZWJ1ZzogYXJncy5kZWJ1ZyxcbiAgICAgICAgICAgIHN5bmM6IGFyZ3Muc3luYyxcbiAgICAgICAgICAgIG9mZnM6IGFyZ3Mub2ZmcyxcbiAgICAgICAgICAgIHNlcTogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgIHZhbDogYXJncy52YWwsXG4gICAgICAgICAgICAgICAganZhcjogYXJncy5qdmFyLFxuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgcHJlZml4OiBhcmdzLnByZWZpeCxcbiAgICAgICAgICAgICAgICBzdWZmaXg6IGFyZ3Muc3VmZml4XG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVxRGVzY3JcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFJlcXVlc3QgRGVzY3JpcHRvciBmb3IgYW4gYXJyYXkuIEFuIGl0ZW0gbGlzdCBvZlxuICAgICAqIHNpbmdsZSB2YXJpYWJsZXMgaXMgZ2VuZXJhdGVkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgICBUaGUgbWV0aG9kLCBlaXRoZXIgXCJSZWFkXCIgb3IgXCJXcml0ZVwiLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlICAgICBUaGUgZGF0YSB0eXBlIG9mIHRoZSBQTEMgdmFyaWFibGUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFyZ3MgICAgIFRoZSBhcmd1bWVudHMgZm9yIGJ1aWxkaW5nIHRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuXG4gICAgICovXG4gICAgY3JlYXRlQXJyYXlEZXNjcmlwdG9yKG1ldGhvZCwgdHlwZSwgYXJncykge1xuXG4gICAgICAgIHZhciByZXFEZXNjciA9IHt9IGFzIGFueSxcbiAgICAgICAgICAgIGRhdGFPYmogPSB7fSxcbiAgICAgICAgICAgIGFycmF5TGVuZ3RoLFxuICAgICAgICAgICAgYWRkck9mZnNldCxcbiAgICAgICAgICAgIGNudCA9IDAsXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGogPSAwLFxuICAgICAgICAgICAgbGVuLFxuICAgICAgICAgICAgZGVmQXJyID0gW10sXG4gICAgICAgICAgICBsZW5BcnJFbGVtLFxuICAgICAgICAgICAgbGFzdERlZkFycixcbiAgICAgICAgICAgIHN0cnVjdEJ5dGVMZW4gPSAwLFxuICAgICAgICAgICAgc3RybGVuLFxuICAgICAgICAgICAgdmxlbixcbiAgICAgICAgICAgIHZsZW5NYXggPSAwLFxuICAgICAgICAgICAgZW5kUGFkTGVuID0gMCxcbiAgICAgICAgICAgIG1vZCxcbiAgICAgICAgICAgIGFkZHIsXG4gICAgICAgICAgICB3cnRPbmVPbmx5LFxuICAgICAgICAgICAgYXJyU3ltVHlwZSxcbiAgICAgICAgICAgIGl0ZW1JbmZvO1xuXG4gICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oYXJncyk7XG5cbiAgICAgICAgLy9HZXQgdGhlIG9iamVjdCBvZiB0aGUgc3RvcmVkIGRhdGEsIGRpcmVjdCB3aXRoICd2YWwnXG4gICAgICAgIC8vZm9yIGEgd3JpdGUgcmVxdWVzdCBvciBwYXJzaW5nIHRoZSBuYW1lIGlmICdqdmFyJyBpcyBnaXZlbi5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJyAmJiB0eXBlb2YgYXJncy52YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBkYXRhT2JqID0gYXJncy52YWw7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MuanZhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGFPYmogPSB0aGlzLnBhcnNlVmFyTmFtZShhcmdzLmp2YXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gZGF0YSBvYmplY3QgZm9yIHRoaXMgJyArIG1ldGhvZCArICctUmVxdWVzdCBkZWZpbmVkIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmFycmxlbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIC8vT3ZlcnJpZGUgYXJyYXkgbGVuZ3RoIGlmIG1hbnVhbGx5IHNldFxuICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBhcmdzLmFycmxlbjtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtSW5mby5hcnJheUxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL0dldCB0aGUgYXJyYXkgbGVuZ3RoIGZyb20gdGhlIHN5bWJvbCB0YWJsZS5cbiAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gaXRlbUluZm8uYXJyYXlMZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDYW5cXCd0IGdldCB0aGUgYXJyYXkgbGVuZ3RoIGZvciB0aGlzIHJlcXVlc3QhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hlY2sgaWYgb25seSBvbmUgaXRlbSBzaG91bGQgYmUgd3JpdHRlbi5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzLml0ZW0gPT09ICdudW1iZXInICYmICFpc05hTihhcmdzLml0ZW0pICYmIG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgd3J0T25lT25seSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoYXJncy5pdGVtIDwgMCB8fCBhcmdzLml0ZW0gPiBhcnJheUxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBXcm9uZyB2YWx1ZSBmb3IgXCJpdGVtXCIhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2l0ZW06ICcgKyBhcmdzLml0ZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdMYXN0IGFycmF5IGluZGV4OiAnICsgKGFycmF5TGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZ1bmN0aW9uIGZvciBjcmVhdGluZyBhbiBkZXNjcmlwdG9yIGZvciBhcnJheSBvZiBzdHJ1Y3R1cmVzLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgY3JlYXRlU3RydWN0QXJyID0gKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgZWxlbTtcbiAgICAgICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIHN0cnVjdHVyZSBkZWZpbml0b24sIGlmIGl0IGlzIHBhc3NlZFxuICAgICAgICAgICAgLy9hcyBhIHN0cmluZy5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncy5kZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgYXJncy5kZWYgPSB0aGlzLnBhcnNlVmFyTmFtZShhcmdzLmRlZik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID09PSB0cnVlICYmIGFyZ3MuZGVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhcmdzLmRlZiA9IHRoaXMuY3JlYXRlU3RydWN0RGVmKGl0ZW1JbmZvLmRhdGFUeXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MuZGVmICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIHN0cnVjdHVyZSBkZWZpbml0aW9uIGZvdW5kIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJ1Y3R1cmUgYW5kIHRoZSBwYWRkaW5nIGJ5dGVzXG4gICAgICAgICAgICBmb3IgKGVsZW0gaW4gYXJncy5kZWYpIHtcblxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmRlZi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vU2VwYXJhdGUgZGF0YSB0eXBlIGFuZCBsZW5ndGguXG4gICAgICAgICAgICAgICAgICAgIGRlZkFyciA9IGFyZ3MuZGVmW2VsZW1dLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IHBhcnNlSW50KGRlZkFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZBcnIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbkFyckVsZW0gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbkFyckVsZW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlZkFyclsxXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RybGVuID0gcGFyc2VJbnQoZGVmQXJyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZsZW4gPSAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKHN0cmxlbikgPyBzdHJsZW4gOiB0aGlzLnBsY1R5cGVMZW5bZGVmQXJyWzBdXSkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bGVuID0gdGhpcy5wbGNUeXBlTGVuW2RlZkFyclswXV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQWRkIHRoZSBsZW5ndGggb2YgdGhlIFBMQyB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdmxlbiA+IDEgJiYgZGVmQXJyWzBdICE9PSAnU1RSSU5HJyAmJiBzdHJ1Y3RCeXRlTGVuID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZCA9IHN0cnVjdEJ5dGVMZW4gJSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cnVjdEJ5dGVMZW4gKz0gdmxlbiAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJ1Y3RCeXRlTGVuICs9IHZsZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9TdG9yZSB0aGUgbWF4aW11bSBsZW5ndGggb2YgdGhlIFBMQyB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICAgICAgLy9mb3IgaW5zZXJ0aW5nIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxICYmIHZsZW4gPiB2bGVuTWF4ICYmIGRlZkFyclswXSAhPT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZsZW5NYXggPSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdmxlbk1heCA+IDEgJiYgZGVmQXJyWzBdICE9PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgIGlmICh2bGVuTWF4ID4gdGhpcy5hbGlnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmxlbk1heCA9IHRoaXMuYWxpZ25tZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2QgPSBzdHJ1Y3RCeXRlTGVuICUgdmxlbk1heDtcbiAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBlbmRQYWRMZW4gPSB2bGVuTWF4IC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICBzdHJ1Y3RCeXRlTGVuICs9IGVuZFBhZExlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vU2V0IHRoZSBhZGRyZXNzIG9mZnNldCBhbmQgdGhlIGxlbmd0aCB0byAxIFxuICAgICAgICAgICAgLy9pZiBvbmx5IG9uZSBpdGVtIHNob3VsZCBiZSBzZW50LlxuICAgICAgICAgICAgaWYgKHdydE9uZU9ubHkpIHtcbiAgICAgICAgICAgICAgICBhZGRyT2Zmc2V0ID0gc3RydWN0Qnl0ZUxlbiAqIGFyZ3MuaXRlbTtcbiAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcURlc2NyID0ge1xuICAgICAgICAgICAgICAgIGFkZHI6IGFyZ3MuYWRkcixcbiAgICAgICAgICAgICAgICBzeW1ib2xOYW1lOiBpdGVtSW5mby5zeW1ib2xOYW1lLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlTmFtZXM6IGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXMsXG4gICAgICAgICAgICAgICAgZnVsbFN5bWJvbE5hbWU6IGFyZ3MubmFtZSxcbiAgICAgICAgICAgICAgICBhZGRyT2Zmc2V0OiBhZGRyT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHVzZUhhbmRsZTogYXJncy5oYW5kbGUsXG4gICAgICAgICAgICAgICAgaWQ6IGFyZ3MuaWQsXG4gICAgICAgICAgICAgICAgb2M6IGFyZ3Mub2MsXG4gICAgICAgICAgICAgICAgb2NkOiBhcmdzLm9jZCxcbiAgICAgICAgICAgICAgICBvZTogYXJncy5vZSxcbiAgICAgICAgICAgICAgICBvdDogYXJncy5vdCxcbiAgICAgICAgICAgICAgICBkZWJ1ZzogYXJncy5kZWJ1ZyxcbiAgICAgICAgICAgICAgICByZWFkTGVuZ3RoOiBzdHJ1Y3RCeXRlTGVuICogYXJyYXlMZW5ndGgsXG4gICAgICAgICAgICAgICAgc2VxOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbGNBbGlnbm1lbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZGF0YU9iajogZGF0YU9iaixcbiAgICAgICAgICAgICAgICBzeW5jOiBhcmdzLnN5bmMsXG4gICAgICAgICAgICAgICAgb2ZmczogYXJncy5vZmZzLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgICAgIC8vQWx0aG91Z2gganZhciBpc24ndCBuZWNlc3NhcnkgZm9yIHdyaXRlIHJlcXVlc3RzLFxuICAgICAgICAgICAgLy9pdCdzIGdvb2QgZm9yIGVhc2llciBkZWJ1Z2dpbmcuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIGFyZ3MuZGVmKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGVmLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZkFyciA9IGFyZ3MuZGVmW2VsZW1dLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbMF0gPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5BcnJFbGVtID0gcGFyc2VJbnQoZGVmQXJyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERlZkFyciA9IGRlZkFyci5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbkFyckVsZW07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGkgKyAnLicgKyBlbGVtICsgalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdICsgJy4nICsgZGVmQXJyWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGkgKyAnLicgKyBlbGVtICsgJy4nICsgalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdICsgJy4nICsgZGVmQXJyWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod3J0T25lT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2FyZ3MuaXRlbV1bZWxlbSArIGpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialthcmdzLml0ZW1dW2VsZW1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbaV1bZWxlbSArIGpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialtpXVtlbGVtXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyOiBpICsgJy4nICsgZWxlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogYXJncy5kZWZbZWxlbV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdydE9uZU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialthcmdzLml0ZW1dW2VsZW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2ldW2VsZW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2V0IGFuIGl0ZW0gYXMgYSBtYXJrIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAgIC8vZm9yIGluc2VydGluZyBwYWRkaW5nIGJ5dGVzIGluIFwid3JpdGVSZXFcIiBhbmQgXCJyZWFkUmVxXCIgbGF0ZXIuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0VuZFN0cnVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWw6IGVuZFBhZExlblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgZGVzY3JpcHRvciBmb3IgYSBzaW1wbGUgYXJyYXkuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBjcmVhdGVTaW1wbGVBcnIgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oYXJncy5zdHJsZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NoYW5nZSB0aGUgcmVhZCBsZW5ndGggaWYgYSB2YWx1ZSBpcyBnaXZlbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5zdHJsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBhcmdzLnN0cmxlbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBsZW47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSBsZW5ndGggb2YgdGhlIHN0cmluZyBmb3IgdGhpcyByZXF1ZXN0IScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGVuKys7IC8vVGVybWluYXRpb25cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnVElNRSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnVE9EJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnREFURSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnREFURV9BTkRfVElNRSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnVElNRV9PRl9EQVknOlxuICAgICAgICAgICAgICAgICAgICAvL0FwcGVuZCB0aGUgZm9ybWF0IHN0cmluZyB0byB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3MuZm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmZvcm1hdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdSRUFMJzpcbiAgICAgICAgICAgICAgICBjYXNlICdMUkVBTCc6XG4gICAgICAgICAgICAgICAgICAgIC8vQXBwZW5kIHRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmRlY1BsYWNlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5kZWNQbGFjZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGFyZ3MuZHAgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3MuZHA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vU2V0IHRoZSBhZGRyZXNzIG9mZnNldCBhbmQgdGhlIGxlbmd0aCB0byAxIFxuICAgICAgICAgICAgLy9pZiBvbmx5IG9uZSBpdGVtIHNob3VsZCBiZSBzZW50LlxuICAgICAgICAgICAgaWYgKHdydE9uZU9ubHkpIHtcbiAgICAgICAgICAgICAgICBhZGRyT2Zmc2V0ID0gYXJncy5pdGVtICogbGVuO1xuICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxRGVzY3IgPSB7XG4gICAgICAgICAgICAgICAgYWRkcjogYXJncy5hZGRyLFxuICAgICAgICAgICAgICAgIHN5bWJvbE5hbWU6IGl0ZW1JbmZvLnN5bWJvbE5hbWUsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVOYW1lczogaXRlbUluZm8uZGF0YVR5cGVOYW1lcyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZUFycklkeDogaXRlbUluZm8uZGF0YVR5cGVBcnJJZHgsXG4gICAgICAgICAgICAgICAgc3ltYm9sTmFtZUFycklkeDogaXRlbUluZm8uc3ltYm9sTmFtZUFycklkeCxcbiAgICAgICAgICAgICAgICBmdWxsU3ltYm9sTmFtZTogYXJncy5uYW1lLFxuICAgICAgICAgICAgICAgIHVzZUhhbmRsZTogYXJncy5oYW5kbGUsXG4gICAgICAgICAgICAgICAgYWRkck9mZnNldDogYWRkck9mZnNldCxcbiAgICAgICAgICAgICAgICBpZDogYXJncy5pZCxcbiAgICAgICAgICAgICAgICBvYzogYXJncy5vYyxcbiAgICAgICAgICAgICAgICBvY2Q6IGFyZ3Mub2NkLFxuICAgICAgICAgICAgICAgIG9lOiBhcmdzLm9lLFxuICAgICAgICAgICAgICAgIG90OiBhcmdzLm90LFxuICAgICAgICAgICAgICAgIHJlYWRMZW5ndGg6IGxlbiAqIGFycmF5TGVuZ3RoLFxuICAgICAgICAgICAgICAgIGRlYnVnOiBhcmdzLmRlYnVnLFxuICAgICAgICAgICAgICAgIHNlcTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkYXRhT2JqOiBkYXRhT2JqLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgICAgIC8vQWx0aG91Z2gganZhciBpc24ndCBuZWNlc3NhcnkgZm9yIHdyaXRlIHJlcXVlc3RzLFxuICAgICAgICAgICAgLy9pdCdzIGdvb2QgZm9yIGVhc2llciBkZWJ1Z2dpbmcuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2ldID0ge1xuICAgICAgICAgICAgICAgICAgICBqdmFyOiBpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3cnRPbmVPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tpXS52YWwgPSBkYXRhT2JqW2FyZ3MuaXRlbV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tpXS52YWwgPSBkYXRhT2JqW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ1NUUlVDVCcpIHtcbiAgICAgICAgICAgIGNyZWF0ZVN0cnVjdEFycigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3JlYXRlU2ltcGxlQXJyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVSZXEocmVxRGVzY3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWFkUmVxKHJlcURlc2NyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgUmVxdWVzdCBEZXNjcmlwdG9yIGZvciBhIHN0cnVjdHVyZSxcbiAgICAgKiBhIHN0cnVjdHVyZSBkZWZpbml0aW9uIGhhcyB0byBiZSBwYXNzZWQgYXMgb25lIG9mIHRoZSBhcmd1bWVudHMsXG4gICAgICogZnJvbSB3aWNoIHRoZSBpdGVtIGxpc3QgaXMgY3JlYXRlZC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kICAgVGhlIG1ldGhvZCwgZWl0aGVyIFwiUmVhZFwiIG9yIFwiV3JpdGVcIi5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAgICAgVGhlIGFyZ3VtZW50cyBmb3IgYnVpbGRpbmcgdGhlIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBjcmVhdGVTdHJ1Y3REZXNjcmlwdG9yKG1ldGhvZCwgYXJncykge1xuXG4gICAgICAgIHZhciByZXFEZXNjciA9IHt9IGFzIGFueSwgICAgICAvL1JlcXVlc3QgRGVzY3JpcHRvclxuICAgICAgICAgICAgZGF0YU9iaiA9IHt9LCAgICAgICAvL29iamVjdCB3aWNoIGhvbGRzIHRoZSBkYXRhIGZvciB3cml0ZSByZXF1ZXN0cyBcbiAgICAgICAgICAgIGRlZkFyciA9IFtdLCAgICAgICAgLy9zdWJlbGVtZW50cyBvZiBhIHN0cnVjdHVyZSBkZWZpbml0aW9uIGl0ZW1cbiAgICAgICAgICAgIGNudCA9IDAsXG4gICAgICAgICAgICBsYXN0RGVmQXJyLFxuICAgICAgICAgICAgbGVuQXJyRWxlbSxcbiAgICAgICAgICAgIGVsZW0sXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgaXRlbUluZm87XG5cbiAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihhcmdzKTtcblxuICAgICAgICAvL0dldCB0aGUgb2JqZWN0IG9mIHRoZSBzdG9yZWQgZGF0YSwgZGlyZWN0IHdpdGggJ3ZhbCdcbiAgICAgICAgLy9mb3IgYSB3cml0ZSByZXF1ZXN0IG9yIHBhcnNpbmcgdGhlIG5hbWUgaWYgJ2p2YXInIGlzIGdpdmVuLlxuICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnICYmIHR5cGVvZiBhcmdzLnZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGRhdGFPYmogPSBhcmdzLnZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJncy5qdmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YU9iaiA9IHRoaXMucGFyc2VWYXJOYW1lKGFyZ3MuanZhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBkYXRhIG9iamVjdCBmb3IgdGhpcyAnICsgbWV0aG9kICsgJy1SZXF1ZXN0IGRlZmluZWQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1BhcnNlIHRoZSBuYW1lIG9mIHRoZSBzdHJ1Y3R1cmUgZGVmaW5pdG9uLCBpZiBpdCBpcyBwYXNzZWRcbiAgICAgICAgLy9hcyBhIHN0cmluZy5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmRlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGFyZ3MuZGVmID0gdGhpcy5wYXJzZVZhck5hbWUoYXJncy5kZWYpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID09PSB0cnVlICYmIGFyZ3MuZGVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFyZ3MuZGVmID0gdGhpcy5jcmVhdGVTdHJ1Y3REZWYoaXRlbUluZm8uZGF0YVR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmRlZiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIHN0cnVjdHVyZSBkZWZpbmluaXRpb24gZm91bmQgKGNyZWF0ZUFycmF5RGVzY3JpcHRvcigpKSEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxRGVzY3IgPSB7XG4gICAgICAgICAgICBhZGRyOiBhcmdzLmFkZHIsXG4gICAgICAgICAgICBzeW1ib2xOYW1lOiBpdGVtSW5mby5zeW1ib2xOYW1lLFxuICAgICAgICAgICAgZGF0YVR5cGVOYW1lczogaXRlbUluZm8uZGF0YVR5cGVOYW1lcyxcbiAgICAgICAgICAgIGRhdGFUeXBlQXJySWR4OiBpdGVtSW5mby5kYXRhVHlwZUFycklkeCxcbiAgICAgICAgICAgIHN5bWJvbE5hbWVBcnJJZHg6IGl0ZW1JbmZvLnN5bWJvbE5hbWVBcnJJZHgsXG4gICAgICAgICAgICBmdWxsU3ltYm9sTmFtZTogYXJncy5uYW1lLFxuICAgICAgICAgICAgdXNlSGFuZGxlOiBhcmdzLmhhbmRsZSxcbiAgICAgICAgICAgIGlkOiBhcmdzLmlkLFxuICAgICAgICAgICAgb2M6IGFyZ3Mub2MsXG4gICAgICAgICAgICBvY2Q6IGFyZ3Mub2NkLFxuICAgICAgICAgICAgb2U6IGFyZ3Mub2UsXG4gICAgICAgICAgICBvdDogYXJncy5vdCxcbiAgICAgICAgICAgIGRlYnVnOiBhcmdzLmRlYnVnLFxuICAgICAgICAgICAgc2VxOiB0cnVlLFxuICAgICAgICAgICAgY2FsY0FsaWdubWVudDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGFPYmo6IGRhdGFPYmosXG4gICAgICAgICAgICBzeW5jOiBhcmdzLnN5bmMsXG4gICAgICAgICAgICBvZmZzOiBhcmdzLm9mZnMsXG4gICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgfTtcblxuICAgICAgICAvL0NyZWF0ZSB0aGUgaXRlbSBsaXN0LlxuICAgICAgICAvL0FsdGhvdWdoIGp2YXIgaXNuJ3QgbmVjZXNzYXJ5IGZvciB3cml0ZSByZXF1ZXN0cyxcbiAgICAgICAgLy9pdCdzIGdvb2QgZm9yIGVhc2llciBkZWJ1Z2dpbmcuXG4gICAgICAgIGZvciAoZWxlbSBpbiBhcmdzLmRlZikge1xuXG4gICAgICAgICAgICBpZiAoYXJncy5kZWYuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcblxuICAgICAgICAgICAgICAgIGRlZkFyciA9IGFyZ3MuZGVmW2VsZW1dLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVmQXJyWzBdID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbkFyckVsZW0gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdERlZkFyciA9IGRlZkFyci5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGVuQXJyRWxlbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhcjogZWxlbSArIGpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXSArICcuJyArIGRlZkFyclszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyOiBlbGVtICsgJy4nICsgalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdICsgJy4nICsgZGVmQXJyWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbZWxlbSArIGpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialtlbGVtXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdmFyOiBlbGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogYXJncy5kZWZbZWxlbV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2VsZW1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2FsbCB0aGUgc2VuZCBmdW5jdGlvblxuICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlUmVxKHJlcURlc2NyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVhZFJlcShyZXFEZXNjcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQdWJsaWMgTWV0aG9kc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHdyaXRlIHJlcXVlc3QuIERlcGVuZGluZyBvbiB0aGVcbiAgICAgKiB2YWx1ZXMgYW5kIFBMQyBkYXRhIHR5cGVzIHBhc3NlZCBpbiB0aGUgdmFyaWFibGUgbGlzdCBhIGJ5dGUgYXJyYXkgaXNcbiAgICAgKiBjcmVhdGVkIGFuZCB0aGUgZnVuY3Rpb24gZm9yIHNlbmRpbmcgdGhlIHJlcXVlc3QgaXMgY2FsbGVkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgcmVxRGVzY3IgICAgVGhlIFJlcXVlc3QgRGVzY3JpcHRvci4gQmVzaWRlcyBvdGhlciBpbmZvcm1hdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGFsbG9jYXRpb24gb2YgUExDIGFuZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSmF2YVNjcmlwdCB2YXJpYWJsZXMgaW4gYW4gaXRlbSBsaXN0LlxuICAgICAqL1xuICAgIHdyaXRlUmVxKHJlcURlc2NyKSB7XG5cbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gcmVxRGVzY3IuaXRlbXMsXG4gICAgICAgICAgICBhZHNSZXEgPSB7fSxcbiAgICAgICAgICAgIHBEYXRhID0gW10gYXMgYW55LFxuICAgICAgICAgICAgYXJyVHlwZSA9IFtdLFxuICAgICAgICAgICAgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIHR5cGUsIGZvcm1hdCwgbGlzdGxlbiwgbGVuLCB2YWwsIHBjb3VudCwgbW9kLCBpdGVtLCBpLCBpZHg7XG5cbiAgICAgICAgLy9TZXQgdGhlIHZhcmlhYmxlIG5hbWUgdG8gdXBwZXIgY2FzZS5cbiAgICAgICAgaWYgKHR5cGVvZiByZXFEZXNjci5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVxRGVzY3IubmFtZSA9IHJlcURlc2NyLm5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vUnVuIHRocm91Z2ggdGhlIGVsZW1lbnRzIGluIHRoZSBpdGVtIGxpc3QuXG4gICAgICAgIGZvciAoaWR4ID0gMCwgbGlzdGxlbiA9IGl0ZW1MaXN0Lmxlbmd0aDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgIC8vR2V0IHR5cGUgYW5kIGZvcm1hdHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgYXJyVHlwZSA9IHRoaXMuZ2V0VHlwZUFuZEZvcm1hdChpdGVtKTtcbiAgICAgICAgICAgIHR5cGUgPSBhcnJUeXBlWzBdO1xuICAgICAgICAgICAgZm9ybWF0ID0gYXJyVHlwZVsxXTtcblxuICAgICAgICAgICAgLy9MZW5ndGggb2YgdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgIC8vTWF4aW11bSBsZW5naHQgaXMgbGltaXRlZCB0byA0IChkdWUgdG8gc3RydWN0dXJlIHBhZGRpbmcpLFxuICAgICAgICAgICAgLy90aGUgbGVuZ2h0IG9mIHN0cmluZ3MgaXMgY2FsY3VsYXRlZCBsYXRlci5cbiAgICAgICAgICAgIGlmIChpc05hTih0aGlzLnBsY1R5cGVMZW5bdHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGU6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQcm9iYWJseSB3cm9uZyB0eXBlIGRlZmluaXRpb24uIFBsZWFzZSBjaGVjayB0aGUgbWFudWFsLicpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcURlc2NyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vUGFkZGluZyB3aXRoaW4gc3RydWN0dXJlcy5cbiAgICAgICAgICAgIC8vXCJjYWxjQWxpZ25tZW50XCIgaXMgb25seSBzZXQgaW4gXCJ3cml0ZVN0cnVjdC9yZWFkU3RydWN0XCIgYW5kXG4gICAgICAgICAgICAvL1wid3JpdGVBcnJheU9mU3RydWN0L3JlYWRBcnJheU9mU3RydWN0XCJcbiAgICAgICAgICAgIGxlbiA9ICh0aGlzLnBsY1R5cGVMZW5bdHlwZV0gPCB0aGlzLmFsaWdubWVudCkgPyB0aGlzLnBsY1R5cGVMZW5bdHlwZV0gOiB0aGlzLmFsaWdubWVudDtcblxuICAgICAgICAgICAgaWYgKHJlcURlc2NyLmNhbGNBbGlnbm1lbnQgPT09IHRydWUgJiYgbGVuID4gMSAmJiB0eXBlICE9PSAnU1RSSU5HJyAmJiB0eXBlICE9PSAnRW5kU3RydWN0JyAmJiBwRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbW9kID0gcERhdGEubGVuZ3RoICUgbGVuO1xuICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBjb3VudCA9IGxlbiAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8PSBwY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcERhdGEucHVzaCgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9Db252ZXJ0IGRhdGEsIGRlcGVuZGluZyBvbiB0aGUgdHlwZVxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgLy9cIkVuZFN0cnVjdFwiIGlzIG9ubHkgdXNlZCB3aXRoIFwicmVhZEFycmF5T2ZTdHJ1Y3R1cmVzL3dyaXRlQXJyYXlPZlN0cnVjdHVyZXNcIi5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IGl0ZW0udmFsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcERhdGEucHVzaCgwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vQ29udmVydCB0aGUgZGF0YSB0byBhIGJ5dGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShpdGVtLCB0eXBlLCBmb3JtYXQsIHRoaXMucGxjVHlwZUxlblt0eXBlXSk7XG4gICAgICAgICAgICAgICAgLy9TdW1tYXJpc2UgdGhlIGRhdGEuICAgICBcbiAgICAgICAgICAgICAgICBwRGF0YSA9IHBEYXRhLmNvbmNhdChieXRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGEgdG8gQmFzZTY0LlxuICAgICAgICBpZiAocERhdGEgJiYgcERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcERhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChwRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1dyaXRlJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuZ2V0SW5kZXhHcm91cChyZXFEZXNjciksXG4gICAgICAgICAgICBpbmRleE9mZnNldDogdGhpcy5nZXRJbmRleE9mZnNldChyZXFEZXNjciksXG4gICAgICAgICAgICBwRGF0YTogcERhdGEsXG4gICAgICAgICAgICByZXFEZXNjcjogcmVxRGVzY3JcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGFkc1JlcVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHJlYWQgcmVxdWVzdC4gSWYgbm8gdmFsdWUgZm9yIHRoZVxuICAgICAqIGRhdGEgbGVuZ3RoIGlzdCBwYXNzZWQsIGNhbGN1bGF0ZSB0aGUgdmFsdWUgYW5kIHRoZW4gY2FsbCB0aGUgZnVuY3Rpb24gXG4gICAgICogZm9yIHNlbmRpbmcgdGhlIHJlcXVlc3QuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICByZXFEZXNjciAgICBUaGUgUmVxdWVzdCBEZXNjcmlwdG9yLiBCZXNpZGVzIG90aGVyIGluZm9ybWF0aW9uXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9iamVjdCBjb250YWlucyB0aGUgYWxsb2NhdGlvbiBvZiBQTEMgYW5kXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IHZhcmlhYmxlcyBpbiBhbiBpdGVtIGxpc3QuXG4gICAgICovXG4gICAgcmVhZFJlcShyZXFEZXNjcikge1xuXG4gICAgICAgIHZhciBhZHNSZXEgPSB7fSxcbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gcmVxRGVzY3IuaXRlbXMsXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICBpdGVtLCBmb3JtYXQsIHR5cGUsIGxpc3RsZW4sIG1vZCwgdmxlbiwgc3RybGVuLCBpZHgsIHN0YXJ0YWRkcjtcblxuICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgZGF0YSBsZW5ndGggaWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4uXG4gICAgICAgIGlmICh0eXBlb2YgcmVxRGVzY3IucmVhZExlbmd0aCAhPT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCA9IDA7XG5cbiAgICAgICAgICAgIGZvciAoaWR4ID0gMCwgbGlzdGxlbiA9IGl0ZW1MaXN0Lmxlbmd0aDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtTGlzdFtpZHhdO1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICAgICAgYXJyVHlwZSA9IHRoaXMuZ2V0VHlwZUFuZEZvcm1hdChpdGVtKTtcbiAgICAgICAgICAgICAgICB0eXBlID0gYXJyVHlwZVswXTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBhcnJUeXBlWzFdO1xuXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlLlxuICAgICAgICAgICAgICAgIGlmIChpc05hTih0aGlzLnBsY1R5cGVMZW5bdHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgZGF0YSB0eXBlOiAnICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFByb2JhYmx5IHdyb25nIHR5cGUgZGVmaW5pdGlvbi4gUGxlYXNlIGNoZWNrIHRoZSBtYW51YWwuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcURlc2NyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBwYXJzZUludChmb3JtYXQsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2bGVuID0gKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihzdHJsZW4pID8gc3RybGVuIDogdGhpcy5wbGNUeXBlTGVuW3R5cGVdKSArIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxRGVzY3Iuc2VxID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQWRkIHRoZSBsZW5ndGggb2YgdGhlIFBMQyB2YXJpYWJsZXMgaWYgY29udGludW91c2x5IGFkZHJlc3NpbmcgaXMgdXNlZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcURlc2NyLmNhbGNBbGlnbm1lbnQgPT09IHRydWUgJiYgdmxlbiA+IDEgJiYgdHlwZSAhPT0gJ0VuZFN0cnVjdCcgJiYgdHlwZSAhPT0gJ1NUUklORycgJiYgcmVxRGVzY3IucmVhZExlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZCA9IHJlcURlc2NyLnJlYWRMZW5ndGggJSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoICs9IHZsZW4gLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCArPSB2bGVuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vTGFzdCBlbGVtZW50IGlmIHNpbmdsZSBhZGRyZXNzZXMgYXJlIGdpdmVuLlxuICAgICAgICAgICAgICAgICAgICBzdGFydGFkZHIgPSB0aGlzLmdldEluZGV4T2Zmc2V0KHJlcURlc2NyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCA9IHZsZW4gKyBpdGVtLmFkZHIgLSBzdGFydGFkZHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWQnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5nZXRJbmRleEdyb3VwKHJlcURlc2NyKSxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiB0aGlzLmdldEluZGV4T2Zmc2V0KHJlcURlc2NyKSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYWRzUmVxXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgc3VtIHJlYWQgcmVxdWVzdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gIHJlcURlc2NyICAgIFRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuIEJlc2lkZXMgb3RoZXIgaW5mb3JtYXRpb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb2JqZWN0IGNvbnRhaW5zIHRoZSBhbGxvY2F0aW9uIG9mIFBMQyBhbmRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEphdmFTY3JpcHQgdmFyaWFibGVzIGluIGFuIGl0ZW0gbGlzdC5cbiAgICAgKi9cbiAgICBzdW1SZWFkUmVxKHJlcURlc2NyKSB7XG4gICAgICAgIHZhciBhZHNSZXEgPSB7fSxcbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gcmVxRGVzY3IuaXRlbXMsXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICByZXFCdWZmZXIgPSBbXSxcbiAgICAgICAgICAgIGJ5dGVzID0gW10sXG4gICAgICAgICAgICBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoLFxuICAgICAgICAgICAgZHVtbXkgPSB7fSBhcyBhbnksXG4gICAgICAgICAgICB0eXBlLCBmb3JtYXQsIGl0ZW0sIGlkeCwgbGVuLCBwd3JEYXRhLCBpdGVtSW5mbztcblxuICAgICAgICAvL1ByZXNldCB0aGUgcmVhZCBsZW50aCB3aXRoIHRoZSBudW1iZXIgb2YgYnl0ZSBmb3IgZXJyb3IgY29kZXMuXG4gICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggPSBsaXN0bGVuICogNDtcblxuICAgICAgICAvL0J1aWxkIHRoZSBSZXF1ZXN0IEJ1ZmZlclxuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtTGlzdFtpZHhdO1xuXG4gICAgICAgICAgICBpdGVtSW5mbyA9IHRoaXMuZ2V0SXRlbUluZm9ybWF0aW9uKGl0ZW0pO1xuXG4gICAgICAgICAgICAvL0xlbmd0aCBvZiB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uc2l6ZTtcblxuICAgICAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCArPSBsZW47XG5cbiAgICAgICAgICAgIC8vQnVpbGQgdGhlIHJlcXVlc3QgYnVmZmVyLlxuICAgICAgICAgICAgLy9UaGUgZnVuY3Rpb24gZGF0YVRvQnl0ZUFycmF5IGV4cGVjdHMgYW4gaXRlbSB3aXRoIGEgdmFsdWUgZm9yXG4gICAgICAgICAgICAvL2NvbnZlcnRpbmcsIHNvIGEgZHVtbXkgb2JqZWN0IGlzIHVzZWQgaGVyZS5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IHRoaXMuZ2V0SW5kZXhHcm91cChpdGVtSW5mbyk7XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IHRoaXMuZ2V0SW5kZXhPZmZzZXQoaXRlbUluZm8pO1xuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgJ1VESU5UJywgZm9ybWF0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICBkdW1teS52YWwgPSBsZW47XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ29udmVydCB0aGUgcmVxdWVzdCBidWZmZXIgdG8gQmFzZTY0IGNvZGVkIGRhdGEuXG4gICAgICAgIGlmIChyZXFCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcHdyRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHJlcUJ1ZmZlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWRXcml0ZScsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmluZGV4R3JvdXBzLlN1bVJkLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IGl0ZW1MaXN0Lmxlbmd0aCxcbiAgICAgICAgICAgIHB3ckRhdGE6IHB3ckRhdGEsXG4gICAgICAgICAgICByZXFEZXNjcjogcmVxRGVzY3JcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSkuc2VuZCgpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHN1bSB3cml0ZSByZXF1ZXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgcmVxRGVzY3IgICAgVGhlIFJlcXVlc3QgRGVzY3JpcHRvci4gQmVzaWRlcyBvdGhlciBpbmZvcm1hdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGFsbG9jYXRpb24gb2YgUExDIGFuZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSmF2YVNjcmlwdCB2YXJpYWJsZXMgaW4gYW4gaXRlbSBsaXN0LlxuICAgICAqL1xuICAgIHN1bVdyaXRlUmVxKHJlcURlc2NyKSB7XG4gICAgICAgIHZhciBhZHNSZXEgPSB7fSxcbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gcmVxRGVzY3IuaXRlbXMsXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICByZXFCdWZmZXIgPSBbXSxcbiAgICAgICAgICAgIGJ5dGVzID0gW10sXG4gICAgICAgICAgICBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoLFxuICAgICAgICAgICAgZHVtbXkgPSB7fSBhcyBhbnksXG4gICAgICAgICAgICB2bGVuTWF4ID0gMCxcbiAgICAgICAgICAgIHR5cGUsIGZvcm1hdCwgaXRlbSwgaWR4LCBsZW4sIHB3ckRhdGEsIGksIGssIGFycmF5TGVuZ3RoLCBtb2QsIHBjb3VudCwgaXRlbUluZm87XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRnVuY3Rpb24gZm9yIGdldHRpbmcgdGhlIGxlbmd0aCBvZiBhIHZhcmlhYmxlLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgZ2V0VmFyTGVuZ3RoID0gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIHN0cmxlbjtcblxuICAgICAgICAgICAgbGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RybGVuID0gcGFyc2VJbnQoZm9ybWF0LCAxMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcm1hdCA9ICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSA/IHN0cmxlbiA6IGxlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgICAgKiBQYXJzZSB0aGUgc3R1Y3R1cmUgZGVmaW5pdGlvbi5cbiAgICAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHBhcnNlU3RydWN0ID0gKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgaiwgZGVmQXJyLCBsZW5BcnJFbGVtLCBsYXN0RGVmQXJyLCBtb2QsIGVsZW0sIHN1YkJ1ZmZlciA9IFtdO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEZ1bmN0aW9uIGZvciBhZGRpbmcgcGFkZGluZyBieXRlcyBpZiBhbiBhbGlnbm1lbnQgaXMgdXNlZC4gXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrQWxpZ25tZW50ID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZsZW4sIGs7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBsZW5ndGggZm9yIGNhbGN1bGF0aW5nIHBhZGRpbmcgYnl0ZXNcbiAgICAgICAgICAgICAgICAgICAgdmxlbiA9IGxlbiA8IHRoaXMuYWxpZ25tZW50ID8gbGVuIDogdGhpcy5hbGlnbm1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9Db21wdXRlIHRoZSBwYWRkaW5nIGJ5dGVzIGZvciB0aGUgYWxpZ25tZW50LlxuICAgICAgICAgICAgICAgICAgICBpZiAodmxlbiA+IDEgJiYgc3ViQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZCA9IHN1YkJ1ZmZlci5sZW5ndGggJSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwY291bnQgPSB2bGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoayA9IDE7IGsgPD0gcGNvdW50OyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViQnVmZmVyLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9TdG9yZSB0aGUgbWF4aW11bSBsZW5ndGggb2YgdGhlIFBMQyB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICAgICAgLy9mb3IgaW5zZXJ0aW5nIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodmxlbiA+IHZsZW5NYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZsZW5NYXggPSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NoZWNrIHN0cnVjdHVyZSBkZWZpbml0aW9uXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGVmID0gdGhpcy5wYXJzZVZhck5hbWUoaXRlbS5kZWYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSA9PT0gdHJ1ZSAmJiBpdGVtLmRlZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kZWYgPSB0aGlzLmNyZWF0ZVN0cnVjdERlZihpdGVtSW5mby5kYXRhVHlwZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRlZiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBzdHJ1Y3R1cmUgZGVmaW5pbml0aW9uIGZvdW5kIChzdW1Xcml0ZVJlcSgpKSEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9XYWxrIHRocm91Z2ggdGhlIHN0cnVjdHVyZSBkZWZpbml0b25cbiAgICAgICAgICAgIGZvciAoZWxlbSBpbiBpdGVtLmRlZikge1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGVmLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZkFyciA9IGl0ZW0uZGVmW2VsZW1dLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbMF0gPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5BcnJFbGVtID0gcGFyc2VJbnQoZGVmQXJyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERlZkFyciA9IGRlZkFyci5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5BcnJFbGVtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPj0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyci5zbGljZSgzLCAtMSkuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPj0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyci5zbGljZSgzKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0FkZCBpbmRleCBpbiBjYXNlIG9mIGFuIGFycmF5IG9mIHN0cnVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2ldW2VsZW0gKyBqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkudmFsID0gaXRlbS52YWxbaV1bZWxlbV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1teS52YWwgPSBpdGVtLnZhbFtlbGVtXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFZhckxlbmd0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FsaWdubWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCB0eXBlLCBmb3JtYXQsIGxlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkJ1ZmZlciA9IHN1YkJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHdlIGFyZSBpbiBhbiBhcnJheSBvZiBzdHJ1Y3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1teS52YWwgPSBpdGVtLnZhbFtpXVtlbGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1teS52YWwgPSBpdGVtLnZhbFtlbGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gZGVmQXJyWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnIubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZBcnJbMV0gPSBkZWZBcnIuc2xpY2UoMSkuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBkZWZBcnJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VmFyTGVuZ3RoKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FsaWdubWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksIHR5cGUsIGZvcm1hdCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJCdWZmZXIgPSBzdWJCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3Qgc2V0IHZhbHVlcyBmb3IgYSBzdHJ1Y3R1cmUgaW4gU3VtV3JpdGVSZXE6ICcgKyBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmUuXG4gICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxICYmIHZsZW5NYXggPiAxICYmIGRlZkFyclswXSAhPT0gJ1NUUklORycgJiYgZGVmQXJyWzBdICE9PSAnRW5kU3RydWN0Jykge1xuICAgICAgICAgICAgICAgIG1vZCA9IHN1YkJ1ZmZlci5sZW5ndGggJSB2bGVuTWF4O1xuICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBjb3VudCA9IHZsZW5NYXggLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoayA9IDE7IGsgPD0gcGNvdW50OyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YkJ1ZmZlci5wdXNoKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0FkZCB0aGUgc3ViUHVmZmVyIHdpdGggdGhlIHN0cnVjdHVyZSBkYXRhIHRvIHRoZSByZXF1ZXN0IGJ1ZmZlci5cbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoc3ViQnVmZmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vUHJlc2V0IHRoZSByZWFkIGxlbmd0aCB3aXRoIHRoZSBudW1iZXIgb2YgYnl0ZSBmb3IgZXJyb3IgY29kZXMuXG4gICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggPSBsaXN0bGVuICogNDtcblxuICAgICAgICAvL1dyaXRlIHRoZSBnZW5lcmFsIGNvbW1hbmQgaW5mb3JtYXRpb24gdG8gdGhlIFJlcXVlc3QgQnVmZmVyXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oaXRlbSk7XG5cbiAgICAgICAgICAgIC8vR2V0IHR5cGUgYW5kIGZvcm1hdHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgdHlwZSA9IGl0ZW1JbmZvLnR5cGU7XG4gICAgICAgICAgICBmb3JtYXQgPSBpdGVtSW5mby5mb3JtYXQ7XG5cbiAgICAgICAgICAgIC8vTGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zaXplO1xuXG4gICAgICAgICAgICAvL0J1aWxkIHRoZSByZXF1ZXN0IGJ1ZmZlci5cbiAgICAgICAgICAgIC8vVGhlIGZ1bmN0aW9uIGRhdGFUb0J5dGVBcnJheSBleHBlY3RzIGFuIGl0ZW0gd2l0aCBhIHZhbHVlIGZvclxuICAgICAgICAgICAgLy9jb252ZXJ0aW5nLCBzbyBhIGR1bW15IG9iamVjdCBpcyB1c2VkIGhlcmUuXG4gICAgICAgICAgICBkdW1teS52YWwgPSB0aGlzLmdldEluZGV4R3JvdXAoaXRlbUluZm8pO1xuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgJ1VESU5UJywgZm9ybWF0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICBkdW1teS52YWwgPSB0aGlzLmdldEluZGV4T2Zmc2V0KGl0ZW1JbmZvKTtcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksICdVRElOVCcsIGZvcm1hdCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgZHVtbXkudmFsID0gbGVuO1xuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgJ1VESU5UJywgZm9ybWF0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvL1dyaXRlIHRoZSBkYXRhIHRvIHRoZSBSZXF1ZXN0IEJ1ZmZlclxuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtTGlzdFtpZHhdO1xuXG4gICAgICAgICAgICBpdGVtSW5mbyA9IHRoaXMuZ2V0SXRlbUluZm9ybWF0aW9uKGl0ZW0pO1xuXG4gICAgICAgICAgICAvL0dldCB0eXBlIGFuZCBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgICAgICAgIHR5cGUgPSBpdGVtSW5mby50eXBlO1xuICAgICAgICAgICAgZm9ybWF0ID0gaXRlbUluZm8uZm9ybWF0O1xuXG4gICAgICAgICAgICAvL0xlbmd0aCBvZiB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uc2l6ZTtcblxuICAgICAgICAgICAgLy9SZXNldCBjb3VudGVyIGZvciBhcnJheXMuXG4gICAgICAgICAgICBpID0gbnVsbDtcblxuICAgICAgICAgICAgLy9CdWlsZCB0aGUgcmVxdWVzdCBidWZmZXIuXG4gICAgICAgICAgICAvL1RoZSBmdW5jdGlvbiBkYXRhVG9CeXRlQXJyYXkgZXhwZWN0cyBhbiBpdGVtIHdpdGggYSB2YWx1ZSBmb3JcbiAgICAgICAgICAgIC8vY29udmVydGluZywgc28gYSBkdW1teSBvYmplY3QgaXMgdXNlZCBoZXJlLlxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBUlJBWSc6XG5cbiAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBwYXJzZUludChpdGVtSW5mby5hcnJheUxlbmd0aCwgMTApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheUxlbmd0aCAhPT0gaXRlbS52YWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBcnJheSBsZW5ndGggaW4gSlMgZGlmZmVycyBmcm9tIHRoZSBsZW5ndGggaW4gdGhlIFBMQyEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdMZW5ndGggaW4gSlM6ICcgKyBpdGVtLnZhbC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ0xlbmd0aCBpbiBQTEM6ICcgKyBhcnJheUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby5hcnJheURhdGFUeXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQXJyYXkgb2Ygc3RydWN0dXJlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdHJ1Y3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9QbGFpbiBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBpdGVtSW5mby5hcnJheURhdGFUeXBlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLml0ZW1TaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksIHR5cGUsIGZvcm1hdCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdVU0VSJzpcbiAgICAgICAgICAgICAgICAgICAgLy9TdHJ1Y3R1cmVzLlxuICAgICAgICAgICAgICAgICAgICBwYXJzZVN0cnVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL1NpbXBsZSBkYXRhIHR5cGVzLlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLnNpemU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShpdGVtLCB0eXBlLCBmb3JtYXQsIGxlbik7XG4gICAgICAgICAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9Db252ZXJ0IHRoZSByZXF1ZXN0IGJ1ZmZlciB0byBCYXNlNjQgY29kZWQgZGF0YS5cbiAgICAgICAgaWYgKHJlcUJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwd3JEYXRhID0gdGhpcy5lbmNvZGVCYXNlNjQocmVxQnVmZmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZFdyaXRlJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuaW5kZXhHcm91cHMuU3VtV3IsXG4gICAgICAgICAgICBpbmRleE9mZnNldDogaXRlbUxpc3QubGVuZ3RoLFxuICAgICAgICAgICAgcHdyRGF0YTogcHdyRGF0YSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIHJlYWRpbmcgdGhlIEFEUyBzdGF0ZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gIHJlcURlc2NyICAgIFRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuIEJlc2lkZXMgb3RoZXIgaW5mb3JtYXRpb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb2JqZWN0IGNvbnRhaW5zIHRoZSBhbGxvY2F0aW9uIG9mIFBMQyBhbmRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEphdmFTY3JpcHQgdmFyaWFibGVzIGluIGFuIGl0ZW0gbGlzdC5cbiAgICAgKi9cbiAgICByZWFkQWRzU3RhdGUocmVxRGVzY3IpIHtcbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuXG4gICAgICAgIHZhciBvZWZ1bmN0O1xuXG4gICAgICAgIGlmIChyZXFEZXNjciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXFEZXNjciA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXFEZXNjci5vZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvL1NhdmUgdGhlIG9yaWdpbmFsIG9uLWVycm9yIGZ1bmN0aW9uIGlmIGV4aXN0LlxuICAgICAgICAgICAgb2VmdW5jdCA9IHJlcURlc2NyLm9lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Pbi1lcnJvci1mdW5jdGlvbiwgcmVzZXQgdGhlIHN0YXRlXG4gICAgICAgIHJlcURlc2NyLm9lID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQURTIHN0YXRlIHJlcXVlc3QgZmFpbGVkLicpO1xuICAgICAgICAgICAgdGhpcy5hZHNTdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmFkc1N0YXRlVHh0ID0gJyc7XG4gICAgICAgICAgICB0aGlzLmRldmljZVN0YXRlID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvZWZ1bmN0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvZWZ1bmN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWRTdGF0ZScsXG4gICAgICAgICAgICByZXFEZXNjcjogcmVxRGVzY3JcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSkuc2VuZCgpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqICBQcmludHMgdGhlIGNhY2hlZCBoYW5kbGVzIHRvIHRoZSBjb25zb2xlLlxuICAgICAqL1xuICAgIGxvZ0hhbmRsZUNhY2hlICgpIHtcbiAgICAgICAgdGhpcy5sb2codGhpcy5oYW5kbGVDYWNoZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqICBQcmludHMgdGhlIHN5bWJvbCB0YWJsZSB0byB0aGUgY29uc29sZS5cbiAgICAgKi9cbiAgICBsb2dTeW1ib2xzKCkge1xuICAgICAgICB0aGlzLmxvZyh0aGlzLnN5bVRhYmxlKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiAgUHJpbnRzIHRoZSBkYXRhIHR5cGUgdGFibGUgdG8gdGhlIGNvbnNvbGUuXG4gICAgICovXG4gICAgbG9nRGF0YVR5cGVzKCkge1xuICAgICAgICB0aGlzLmxvZyh0aGlzLmRhdGFUeXBlVGFibGUpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBTeW1ib2wgVGFibGUgdG8gYSBKU09OIHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gIGpzdHIgICAgVGhlIFN5bWJvbCBUYWJsZSBhcyBhIEpTT04gc3RyaW5nIC4gXG4gICAgICovXG4gICAgZ2V0U3ltYm9sc0FzSlNPTigpIHtcbiAgICAgICAgdmFyIGpzdHI7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBKU09OICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gSlNPTiBwYXJzZXIgZm91bmQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGpzdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnN5bVRhYmxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ganN0cjtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgY29udmVydCB0aGUgU3ltYm9sIFRhYmxlIHRvIEpTT046JyArIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogUmVhZHMgdGhlIFN5bWJvbCBUYWJsZSBmcm9tIGEgSlNPTiBzdHJpbmdcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIGpzdHIgICAgQSBKU09OIHN0cmluZyB3aXRoIHRoZSBzeW1ib2xzLlxuICAgICAqL1xuICAgIHNldFN5bWJvbHNGcm9tSlNPTihqc3RyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgSlNPTiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIEpTT04gcGFyc2VyIGZvdW5kLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlID0gSlNPTi5wYXJzZShqc3RyKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgY3JlYXRlIHRoZSBTeW1ib2wgVGFibGUgZnJvbSBKU09OOicgKyBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN5bVRhYmxlUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTeW1ib2wgVGFibGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgZnJvbSBKU09OIGRhdGEuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgRGF0YSBUeXBlIFRhYmxlIHRvIGEgSlNPTiBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHJldHVybiB7QXJyYXl9ICBqc3RyICAgIFRoZSBEYXRhIFR5cGUgVGFibGUgYXMgYSBKU09OIHN0cmluZyAuIFxuICAgICAqL1xuICAgIGdldERhdGFUeXBlc0FzSlNPTigpIHtcbiAgICAgICAgdmFyIGpzdHI7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBKU09OICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gSlNPTiBwYXJzZXIgZm91bmQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGpzdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFUeXBlVGFibGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBqc3RyO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBjb252ZXJ0IHRoZSBEYXRhIFR5cGUgVGFibGUgdG8gSlNPTjonICsgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyB0aGUgRGF0YSBUeXBlIFRhYmxlIGZyb20gYSBKU09OIHN0cmluZ1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAganN0ciAgICBBIEpTT04gc3RyaW5nIHdpdGggdGhlIGRhdGEgdHlwZXMuXG4gICAgICovXG4gICAgc2V0RGF0YVR5cGVzRnJvbUpTT04oanN0cikge1xuICAgICAgICBpZiAodHlwZW9mIEpTT04gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBKU09OIHBhcnNlciBmb3VuZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlID0gSlNPTi5wYXJzZShqc3RyKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgY3JlYXRlIHRoZSBEYXRhIFR5cGUgVGFibGUgZnJvbSBKU09OOicgKyBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IERhdGEgVHlwZSBUYWJsZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCBmcm9tIEpTT04gZGF0YS4nKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIHdlYnNlcnZpY2UncyBzZXJ2ZXIgcmVzcG9uc2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIFRoZSBvYmplY3QgY29udGFpbmluZyB0aGUgYXJndW1lbnRzIG9mIHRoZSBBRFMgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBwYXJzZVJlc3BvbnNlKGFkc1JlcSkge1xuXG4gICAgICAgIGxldCByZXNwb25zZSwgZXJyb3JDb2RlLCBlcnJvclRleHQ7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueVxuXG4gICAgICAgIC8vQWNrbm93bGVkZ2UgdGhlIHJlY2VpdmUgb2YgYSByZXF1ZXN0IHdpdGggaW5kZXggJ2lkJy5cbiAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3IuaWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoZWNrIGlmIHRoZSBYTUwgZGF0YSBvYmplY3QgaXMgdmFsaWQuXG4gICAgICAgIGlmICh0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFJlcXVlc3QgY29udGFpbnMgbm8gWE1MIGRhdGEuIE9iamVjdCBcInJlc3BvbnNlWE1MXCIgaXMgbnVsbC4nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFRoaXMgaXMgdGhlIFwicmVzcG9uc2VUZXh0XCI6Jyk7XG4gICAgICAgICAgICB0aGlzLmxvZyh0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy9vbiBlcnJvciBmdW5jdGlvblxuICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZXQgdGhlIHJlc3BvbnNlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIFhNTCBkYXRhIGluIHNlcnZlciByZXNwb25zZTogJyArIGUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvL29uIGVycm9yIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm9lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL0xvb2sgZm9yIGVycm9ycyBpbiB0aGUgcmVzcG9uc2Ugc3RyaW5nIChpLmUuIEFEUyBlcnJvcnMpLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy9HZXQgZXJyb3JzXG4gICAgICAgICAgICBlcnJvclRleHQgPSByZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZmF1bHRzdHJpbmcnKVswXS5maXJzdENoaWxkLmRhdGE7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVycm9yQ29kZSA9IHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdlcnJvcmNvZGUnKVswXS5maXJzdENoaWxkLmRhdGE7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDb2RlID0gJy0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTWVzc2FnZSBmcm9tIHNlcnZlcjogICcgKyBlcnJvclRleHQgKyAnICgnICsgZXJyb3JDb2RlICsgJyknKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvL29uIGVycm9yIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm9lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAvL0FsbCBmaW5lXG4gICAgICAgICAgICBlcnJvckNvZGUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Ob3JtYWxpemUgZGF0YSAoZXNwLiBmb3IgRmlyZWZveCwgd2hvIHNwbGl0cyBkYXRhIGluIDRrIGNodW5rcykuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2Uubm9ybWFsaXplID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXNwb25zZS5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRGVjb2RlIGRhdGEgaWYgaXQncyBhIHJlYWQgcmVxdWVzdC5cbiAgICAgICAgaWYgKGFkc1JlcS5tZXRob2QgPT09ICdSZWFkU3RhdGUnKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGFyc2VBZHNTdGF0ZShhZHNSZXEpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWQnIHx8IGFkc1JlcS5tZXRob2QgPT09ICdSZWFkV3JpdGUnKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYWRzUmVxLmluZGV4R3JvdXApIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuaW5kZXhHcm91cHMuVXBsb2FkSW5mbzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVVwbG9hZEluZm8oYWRzUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmluZGV4R3JvdXBzLlVwbG9hZDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVVwbG9hZChhZHNSZXEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuaW5kZXhHcm91cHMuU3VtUmQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VTdW1SZWFkUmVxKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5pbmRleEdyb3Vwcy5TdW1XcjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVN1bVdyaXRlUmVxKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5pbmRleEdyb3Vwcy5TdW1SZFdyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlSGFuZGxlcyhhZHNSZXEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnBhcnNlUmVhZFJlcShhZHNSZXEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9DYWxsIHRoZSBPbi1Db21wbGV0ZS1TY3JpcHQuXG4gICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vY2QgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoYWRzUmVxLnJlcURlc2NyLm9jLCBhZHNSZXEucmVxRGVzY3Iub2NkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGhhbmRsZXMgZnJvbSB0aGUgUExDLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFyclN5bU5hbWVzICAgQXJyYXkgd2l0aCB0aGUgc3ltYm9sIG5hbWVzLlxuICAgICAqL1xuICAgIGdldEhhbmRsZXMocmVxRGVzY3IpIHtcblxuICAgICAgICB2YXIgYWRzUmVxID0ge30sXG4gICAgICAgICAgICByZXFCdWZmZXIgPSBbXSxcbiAgICAgICAgICAgIGFycmxlbiA9IHJlcURlc2NyLnN5bWJvbHMubGVuZ3RoLFxuICAgICAgICAgICAgYnl0ZXMsIGlkeCwgbGVuLCBwd3JEYXRhLCBmb3JtYXQsIHN5bW5hbWUsIGk7XG5cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBGZXRjaGluZyBoYW5kbGVzIGZyb20gdGhlIFBMQy4nKTtcblxuICAgICAgICAvL1JlYWQgbGVudGggd2l0aCB0aGUgbnVtYmVyIG9mIGJ5dGUgZm9yIGVycm9yIGNvZGVzLlxuICAgICAgICAvLzQgYnl0ZXMgcmVxdWVzdGVkIGRhdGEsIDQgYnl0ZXMgZm9yIGVycm9yY29kZSBhbmQgNCBieXRlcyBmb3IgdGhlIGxlbmd0aFxuICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gYXJybGVuICogMTI7XG5cbiAgICAgICAgLy9CdWlsZCB0aGUgUmVxdWVzdCBCdWZmZXJcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIC8vQnVpbGQgdGhlIHJlcXVlc3QgYnVmZmVyLlxuICAgICAgICAgICAgLy9JbmRleEdyb3VwXG4gICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHRoaXMuaW5kZXhHcm91cHMuSGFuZGxlQnlOYW1lLCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICAvL0luZGV4T2Zmc2V0IGlzIGFsd2F5cyAwXG4gICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKDAsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIC8vSGFuZGxlIHNpemUgKDQgYnl0ZXMpXG4gICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKDQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIC8vU3RyaW5nIGxlbmd0aFxuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycihyZXFEZXNjci5zeW1ib2xzW2lkeF0ubGVuZ3RoLCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BZGQgc3ltYm9sIG5hbWVzXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuICAgICAgICAgICAgc3ltbmFtZSA9IHJlcURlc2NyLnN5bWJvbHNbaWR4XS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgICAgICAvL1N0b3JlIGl0IGZvciBsYXRlciB1c2VcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTmFtZXNbaWR4XSA9IHN5bW5hbWU7XG5cbiAgICAgICAgICAgIC8vQWRkIHN5bWJvbCBuYW1lcyB0byB0aGUgYnVmZmVyXG4gICAgICAgICAgICBieXRlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHN5bW5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBieXRlc1tpXSA9IHN5bW5hbWUuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL0NvbnZlcnQgdGhlIHJlcXVlc3QgYnVmZmVyIHRvIEJhc2U2NCBjb2RlZCBkYXRhLlxuICAgICAgICBpZiAocmVxQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHB3ckRhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChyZXFCdWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkV3JpdGUnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5pbmRleEdyb3Vwcy5TdW1SZFdyLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IGFycmxlbixcbiAgICAgICAgICAgIHB3ckRhdGE6IHB3ckRhdGEsXG4gICAgICAgICAgICByZXFEZXNjcjogcmVxRGVzY3JcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSkuc2VuZCgpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIGZvciByZWxlYXNpbmcgdGhlIGNhY2hlZCBoYW5kbGVzLlxuICAgICAqIFxuICAgICAqL1xuICAgIHJlbGVhc2VIYW5kbGVzKHJlcURlc2NyKSB7XG4gICAgICAgIHZhciBhZHNSZXEgPSB7fSxcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IFtdLFxuICAgICAgICAgICAgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIGFycmxlbiA9IDAsXG4gICAgICAgICAgICBzeW1OYW1lcyA9IFtdLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBpZHgsIHB3ckRhdGE7XG5cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBSZWxlYXNpbmcgaGFuZGxlcy4nKTtcblxuICAgICAgICAvL0NoZWNrIGlmIGEgcmVxdWVzdCBkZXNjcmlwdG9yIGV4aXN0c1xuICAgICAgICBpZiAocmVxRGVzY3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVxRGVzY3IgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICAvL0NoZWNrIGlmIGEgdXNlciBkZWZpbmVkIGhhbmRsZSBsaXN0IGV4aXN0c1xuICAgICAgICBpZiAocmVxRGVzY3Iuc3ltYm9scyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhcnJsZW4gPSByZXFEZXNjci5zeW1ib2xzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIHN5bU5hbWVzW2lkeF0gPSByZXFEZXNjci5zeW1ib2xzW2lkeF0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycmxlbiA9IHRoaXMuaGFuZGxlTmFtZXMubGVuZ3RoO1xuICAgICAgICAgICAgc3ltTmFtZXMgPSB0aGlzLmhhbmRsZU5hbWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9QcmVzZXQgdGhlIHJlYWQgbGVuZ3RoIHdpdGggdGhlIG51bWJlciBvZiBieXRlIGZvciBlcnJvciBjb2Rlcy5cbiAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCA9IGFycmxlbiAqIDQ7XG5cbiAgICAgICAgLy9Xcml0ZSB0aGUgZ2VuZXJhbCBjb21tYW5kIGluZm9ybWF0aW9uIHRvIHRoZSBSZXF1ZXN0IEJ1ZmZlclxuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGFycmxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgLy9CdWlsZCB0aGUgcmVxdWVzdCBidWZmZXIuXG4gICAgICAgICAgICAvL0luZGV4R3JvdXBcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodGhpcy5pbmRleEdyb3Vwcy5SZWxlYXNlSGFuZGxlLCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICAvL0luZGV4T2Zmc2V0IGlzIGFsd2F5cyAwXG4gICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKDAsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIC8vSGFuZGxlIHNpemUgKDQgYnl0ZXMpXG4gICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKDQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FkZCBoYW5kbGVzIGNvZGVzXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmhhbmRsZUNhY2hlW3N5bU5hbWVzW2lkeF1dID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodGhpcy5oYW5kbGVDYWNoZVtzeW1OYW1lc1tpZHhdXSwgNCk7XG4gICAgICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEhhbmRsZSBmb3Igc3ltYm9sIG5hbWUgJyArIHN5bU5hbWVzW2lkeF0gKyAnIGRvZXMgbm90IGV4aXN0IGluIGhhbmRsZSBjYWNoZSEnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyAnUmVsZWFzaW5nIEhhbmRsZXMgYWJvcnRlZCEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9Db252ZXJ0IHRoZSByZXF1ZXN0IGJ1ZmZlciB0byBCYXNlNjQgY29kZWQgZGF0YS5cbiAgICAgICAgaWYgKHJlcUJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwd3JEYXRhID0gdGhpcy5lbmNvZGVCYXNlNjQocmVxQnVmZmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQWRkIHRoZSBzeW1ib2wgbmFtZXMgZm9yIHBhcnNpbmcgdGhlIHJlc3BvbnNlXG4gICAgICAgIHJlcURlc2NyLml0ZW1zID0gc3ltTmFtZXM7XG5cbiAgICAgICAgLy9UaGlzIGlzIGEgUmVsZWFzZSBIYW5kbGVzIFJlcXVlc3RcbiAgICAgICAgcmVxRGVzY3IuaXNSZWxIZGxSZXEgPSB0cnVlO1xuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZFdyaXRlJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuaW5kZXhHcm91cHMuU3VtV3IsXG4gICAgICAgICAgICBpbmRleE9mZnNldDogYXJybGVuLFxuICAgICAgICAgICAgcHdyRGF0YTogcHdyRGF0YSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzaG9ydGN1dHMgZm9yIHJlYWRpbmcgYW5kIHdyaXRpbmcgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXJnc1xuICAgICAqL1xuICAgIHdyaXRlQm9vbCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdCT09MJywgYXJncylcbiAgICB3cml0ZUJ5dGUgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnQllURScsIGFyZ3MpXG4gICAgd3JpdGVVc2ludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdVU0lOVCcsIGFyZ3MpXG4gICAgd3JpdGVTaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1NJTlQnLCBhcmdzKVxuICAgIHdyaXRlV29yZCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdXT1JEJywgYXJncylcbiAgICB3cml0ZVVpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnVUlOVCcsIGFyZ3MpXG4gICAgd3JpdGVJbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnSU5UJywgYXJncylcbiAgICB3cml0ZUludDFEcCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdJTlQxRFAnLCBhcmdzKVxuICAgIHdyaXRlSW50MkRwID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0lOVDJEUCcsIGFyZ3MpXG4gICAgd3JpdGVEd29yZCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdEV09SRCcsIGFyZ3MpXG4gICAgd3JpdGVVZGludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdVRElOVCcsIGFyZ3MpXG4gICAgd3JpdGVEaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0RJTlQnLCBhcmdzKVxuICAgIHdyaXRlUmVhbCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdSRUFMJywgYXJncylcbiAgICB3cml0ZUxyZWFsID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0xSRUFMJywgYXJncylcbiAgICB3cml0ZVN0cmluZyA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdTVFJJTkcnLCBhcmdzKVxuICAgIHdyaXRlVGltZSA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdUSU1FJywgYXJncylcbiAgICB3cml0ZVRvZCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdUT0QnLCBhcmdzKVxuICAgIHdyaXRlRGF0ZSA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdEQVRFJywgYXJncylcbiAgICB3cml0ZUR0ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0RUJywgYXJncylcblxuICAgIHJlYWRCb29sID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdCT09MJywgYXJncylcbiAgICByZWFkQnl0ZSA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnQllURScsIGFyZ3MpXG4gICAgcmVhZFVzaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdVU0lOVCcsIGFyZ3MpXG4gICAgcmVhZFNpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1NJTlQnLCBhcmdzKVxuICAgIHJlYWRXb3JkID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdXT1JEJywgYXJncylcbiAgICByZWFkVWludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnVUlOVCcsIGFyZ3MpXG4gICAgcmVhZEludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnSU5UJywgYXJncylcbiAgICByZWFkSW50MURwID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdJTlQxRFAnLCBhcmdzKVxuICAgIHJlYWRJbnQyRHAgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0lOVDJEUCcsIGFyZ3MpXG4gICAgcmVhZER3b3JkID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdEV09SRCcsIGFyZ3MpXG4gICAgcmVhZFVkaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdVRElOVCcsIGFyZ3MpXG4gICAgcmVhZERpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0RJTlQnLCBhcmdzKVxuICAgIHJlYWRSZWFsID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdSRUFMJywgYXJncylcbiAgICByZWFkTHJlYWwgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0xSRUFMJywgYXJncylcbiAgICByZWFkU3RyaW5nID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdTVFJJTkcnLCBhcmdzKVxuICAgIHJlYWRUaW1lID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdUSU1FJywgYXJncylcbiAgICByZWFkVG9kID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdUT0QnLCBhcmdzKVxuICAgIHJlYWREYXRlID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdEQVRFJywgYXJncylcbiAgICByZWFkRHQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0RUJywgYXJncylcblxuICAgIHdyaXRlU3RydWN0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlU3RydWN0RGVzY3JpcHRvcignV3JpdGUnLCBhcmdzKVxuICAgIHJlYWRTdHJ1Y3QgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVTdHJ1Y3REZXNjcmlwdG9yKCdSZWFkJywgYXJncylcblxuICAgIHdyaXRlQXJyYXlPZkJvb2wgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0JPT0wnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkJ5dGUgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0JZVEUnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlVzaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdVU0lOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mU2ludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnU0lOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mV29yZCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnV09SRCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mVWludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnVUlOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mSW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdJTlQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkludDFEcCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnSU5UMURQJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZJbnQyRHAgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0lOVDJEUCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mRHdvcmQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0RXT1JEJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZVZGludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnVURJTlQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkRpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0RJTlQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlJlYWwgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1JFQUwnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkxyZWFsID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdMUkVBTCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mU3RyaW5nID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdTVFJJTkcnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlRpbWUgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1RJTUUnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlRvZCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnVE9EJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZEYXRlID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdEQVRFJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZEdCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnRFQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlN0cnVjdCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnU1RSVUNUJywgYXJncylcblxuICAgIHJlYWRBcnJheU9mQm9vbCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdCT09MJywgYXJncylcbiAgICByZWFkQXJyYXlPZkJ5dGUgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnQllURScsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZVc2ludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdVU0lOVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZTaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1NJTlQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mV29yZCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdXT1JEJywgYXJncylcbiAgICByZWFkQXJyYXlPZlVpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnVUlOVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZJbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnSU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZkludDFEcCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdJTlQxRFAnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mSW50MkRwID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0lOVDJEUCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZEd29yZCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdEV09SRCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZVZGludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdVRElOVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZEaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0RJTlQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mUmVhbCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdSRUFMJywgYXJncylcbiAgICByZWFkQXJyYXlPZkxyZWFsID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0xSRUFMJywgYXJncylcbiAgICByZWFkQXJyYXlPZlN0cmluZyA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdTVFJJTkcnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mVGltZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdUSU1FJywgYXJncylcbiAgICByZWFkQXJyYXlPZlRvZCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdUT0QnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mRGF0ZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdEQVRFJywgYXJncylcbiAgICByZWFkQXJyYXlPZkR0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0RUJywgYXJncylcbiAgICByZWFkQXJyYXlPZlN0cnVjdCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdTVFJVQ1QnLCBhcmdzKVxuICAgIFxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gICAgICAgICAgICAgICAgICAgTWV0aG9kcyBmb3IgQ3JlYXRpbmcgdGhlIFN5bWJvbCBUYWJsZSBmcm9tIFVwbG9hZFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgdGhlIFRQWSBGaWxlXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAgIFxuXG4gICAgLyoqXG4gICAgICogIEdldCB0aGUgdXBsb2FkIGluZm8uIFxuICAgICAqL1xuXG4gICAgZ2V0VXBsb2FkSW5mbygpIHtcbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICB2YXIgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZCcsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmluZGV4R3JvdXBzLlVwbG9hZEluZm8sXG4gICAgICAgICAgICBpbmRleE9mZnNldDogMCxcbiAgICAgICAgICAgIHJlcURlc2NyOiB7XG4gICAgICAgICAgICAgICAgcmVhZExlbmd0aDogOFxuICAgICAgICAgICAgICAgIC8vc3luYzogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSkuc2VuZCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgdGhlIHVwbG9hZCBpbmZvcm1hdGlvbiBhbmQgY2FsbCB0aGUgcmVxdWVzdCBmb3IgXG4gICAgICogcmVhZGluZyB0aGUgdXBsb2FkIGRhdGEuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIEFuIEFEUyBSZXF1ZXN0IERlc2NyaXB0b3IuXG4gICAgICovXG4gICAgcGFyc2VVcGxvYWRJbmZvKGFkc1JlcSkge1xuICAgICAgICB2YXIgcmVzcG9uc2UsIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIGRhdGEsIGFkc1JlcTI7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgPSB0aGlzLmRlY29kZUJhc2U2NChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHBEYXRhJylbMF0uZmlyc3RDaGlsZC5kYXRhKTtcbiAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cigwLCA0KTtcbiAgICAgICAgICAgIHRoaXMuc3ltYm9sQ291bnQgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcbiAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cig0LCA0KTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTGVuZ3RoID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBhcnNpbmcgb2YgVXBsb2FkSW5mbyBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRzUmVxMiA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWQnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5pbmRleEdyb3Vwcy5VcGxvYWQsXG4gICAgICAgICAgICBpbmRleE9mZnNldDogMCxcbiAgICAgICAgICAgIHJlcURlc2NyOiB7XG4gICAgICAgICAgICAgICAgcmVhZExlbmd0aDogdGhpcy51cGxvYWRMZW5ndGhcbiAgICAgICAgICAgICAgICAvL3N5bmM6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEyKS5zZW5kKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSB0aGUgdXBsb2FkIGRhdGEgYW5kIGFuIG9iamVjdCAoc3ltVGFibGUpIHdpdGggdGhlIHN5bWJvbCBuYW1lcyBcbiAgICAgKiBhcyB0aGUgcHJvcGVydGllcy4gXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIEFuIEFEUyBSZXF1ZXN0IERlc2NyaXB0b3IuXG4gICAgICovXG4gICAgcGFyc2VVcGxvYWQoYWRzUmVxKSB7XG4gICAgICAgIHZhciByZXNwb25zZSxcbiAgICAgICAgICAgIHN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgaWdPZmZzID0gNCxcbiAgICAgICAgICAgIGlvT2ZmcyA9IDgsXG4gICAgICAgICAgICBzaXplT2ZmcyA9IDEyLFxuICAgICAgICAgICAgbmFtZU9mZnMgPSAzMCxcbiAgICAgICAgICAgIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIGRhdGEsIGNudCwgaW5mb0xlbiwgbmFtZUFuZFR5cGUsIHR5cGVBcnIsIGFycmF5TGVuZ3RoLCB0eXBlLCBlbGVtO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBkYXRhU3RyaW5nID0gdGhpcy5kZWNvZGVCYXNlNjQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BwRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG5cbiAgICAgICAgICAgIGZvciAoY250ID0gMDsgY250IDwgdGhpcy5zeW1ib2xDb3VudDsgY250KyspIHtcbiAgICAgICAgICAgICAgICAvL0dldCB0aGUgbGVuZ3RoIG9mIHRoZSBzeW1ib2wgaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIDQpO1xuICAgICAgICAgICAgICAgIGluZm9MZW4gPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcblxuICAgICAgICAgICAgICAgIC8vR2V0IG5hbWUgYW5kIHR5cGUuXG4gICAgICAgICAgICAgICAgbmFtZUFuZFR5cGUgPSBkYXRhU3RyaW5nLnN1YnN0cmluZyhzdHJBZGRyICsgbmFtZU9mZnMsIChzdHJBZGRyICsgaW5mb0xlbikpLnNwbGl0KFN0cmluZy5mcm9tQ2hhckNvZGUoMCkpO1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gbmFtZUFuZFR5cGVbMF0udG9VcHBlckNhc2UoKTtcblxuXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYW4gZW50cnkuXG4gICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZVN0cmluZzogbmFtZUFuZFR5cGVbMV0sXG4gICAgICAgICAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIgKyBpZ09mZnMsIDQpLCAnRFdPUkQnKSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIgKyBpb09mZnMsIDQpLCAnRFdPUkQnKSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciArIHNpemVPZmZzLCA0KSwgJ0RXT1JEJylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy9TZXQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICB0eXBlQXJyID0gbmFtZUFuZFR5cGVbMV0uc3BsaXQoXCIgXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVBcnJbMF0gPT09ICdBUlJBWScpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL1R5cGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gdHlwZUFyclswXTtcblxuICAgICAgICAgICAgICAgICAgICAvL0FycmF5IExlbmd0aFxuICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IHR5cGVBcnJbMV0uc3Vic3RyaW5nKDEsIHR5cGVBcnJbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gYXJyYXlMZW5ndGguc3BsaXQoJy4uJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyU3RhcnRJZHggPSBwYXJzZUludChhcnJheUxlbmd0aFswXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IHBhcnNlSW50KGFycmF5TGVuZ3RoWzFdLCAxMCkgLSBwYXJzZUludChhcnJheUxlbmd0aFswXSwgMTApICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheUxlbmd0aCA9IGFycmF5TGVuZ3RoO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9EYXRhIHR5cGUgb2YgdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclszXS5zcGxpdCgnKCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlQXJyWzBdICsgJy4nICsgYXJyYXlMZW5ndGggKyAnLicgKyB0eXBlWzBdICsgJy4nICsgdHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uc3RyaW5nTGVuZ3RoID0gcGFyc2VJbnQodHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL0l0ZW0gbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uaXRlbVNpemUgPSB0aGlzLnN5bVRhYmxlW25hbWVdLnNpemUgLyBhcnJheUxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID0gJ1VTRVInO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT09IGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlEYXRhVHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmRhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHR5cGVBcnJbMF0uc3BsaXQoJygnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVsxXSA9IHR5cGVbMV0uc3Vic3RyKDAsIHR5cGVbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZVswXSArICcuJyArIHR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnN0cmluZ0xlbmd0aCA9IHBhcnNlSW50KHR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB2YXJpYWJsZSBpcyBhIHVzZXIgZGVmaW5lZCBkYXRhIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9ICdVU0VSJztcbiAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIHRoaXMucGxjVHlwZUxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxjVHlwZUxlbi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzBdID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5kYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdHJBZGRyICs9IGluZm9MZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN5bVRhYmxlUmVhZHkgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEVuZCBvZiBmZXRjaGluZyB0aGUgc3ltYm9scy4nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3ltYm9sIHRhYmxlIHJlYWR5LicpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLnN5bmNYbWxIdHRwICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlYWR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGFyc2luZyBvZiB1cGxvYWRlZCBzeW1ib2wgaW5mb3JtYXRpb24gZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ1htbEh0dHBSZXEgPSBudWxsXG4gICAgLyoqXG4gICAgKiBHZXQgdGhlIHN5bWJvbC1maWxlICgqLnRweSkgZnJvbSB0aGUgc2VydmVyIGFuZCBjcmVhdGVcbiAgICAqIGFuIG9iamVjdCAoc3ltVGFibGUpIHdpdGggdGhlIHN5bWJvbCBuYW1lcyBhcyB0aGUgcHJvcGVydGllcy4gXG4gICAgKi9cbiAgICBnZXRDb25maWdGaWxlKCkge1xuXG4gICAgICAgIHRoaXMuY29uZmlnWG1sSHR0cFJlcSA9IHRoaXMuY3JlYXRlWE1MSHR0cFJlcSgpXG4gICAgICAgIHZhciBzeW1ib2xBcnJheSA9IFtdLFxuICAgICAgICAgICAgY29uZmlnRmlsZSwgbmFtZSwgYWxsU3ltYm9scywgdHlwZUFyciwgYXJyYXlMZW5ndGgsIHR5cGUsIGVsZW0sXG4gICAgICAgICAgICB0Y1ZlcnNpb24sIGk7XG5cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTdGFydCByZWFkaW5nIHRoZSBUUFkgZmlsZS4nKTtcblxuICAgICAgICAvL0hUVFBSZXF1ZXN0XG4gICAgICAgIHRoaXMuY29uZmlnWG1sSHR0cFJlcS5vcGVuKCdHRVQnLCB0aGlzLnNlcnZpY2UuY29uZmlnRmlsZVVybCwgIXRoaXMuc2VydmljZS5zeW5jWG1sSHR0cCwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VVc2VyLCB0aGlzLnNlcnZpY2Uuc2VydmljZVBhc3N3b3JkKTtcbiAgICAgICAgdGhpcy5jb25maWdYbWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbCcpO1xuXG4gICAgICAgIHRoaXMuY29uZmlnWG1sSHR0cFJlcS5vbmxvYWQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgRE9NIG9iamVjdCBmcm9tIFhNTFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBET01QYXJzZXIgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWdGaWxlID0gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHRoaXMuY29uZmlnWG1sSHR0cFJlcS5yZXNwb25zZVRleHQsIFwidGV4dC94bWxcIik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDcmVhdGluZyBhIERPTSBvYmplY3QgZnJvbSBUUFkgZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ2FuXFwndCBwYXJzZSB0aGUgc3ltYm9sIGZpbGUgY2F1c2UgeW91ciBicm93c2VyIGRvZXMgbm90IHByb3ZpZGUgYSBET01QYXJzZXIgZnVuY3Rpb24uJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9HZXQgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBQTEMgYW5kIHRoZSByb3V0aW5nXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZS5hbXNOZXRJZCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIHRoaXMuc2VydmljZS5hbXNQb3J0ICE9PSAnc3RyaW5nJyB8fCB0aGlzLmFsaWdubWVudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3RhcnQgcmVhZGluZyB0aGUgc2VydmljZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV0SWQ6IGNvbmZpZ0ZpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ05ldElkJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0OiBjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdQb3J0JylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0Y1ZlcnNpb24gPSBjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUd2luQ0FUVmVyc2lvbicpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLmNoYXJBdCgwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGNWZXJzaW9uID09PSAnMicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUluZm8uYWxpZ25tZW50ID0gcGFyc2VJbnQoY29uZmlnRmlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnUGFja1NpemUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRjVmVyc2lvbiA9PT0gJzMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbmZvLmFsaWdubWVudCA9IDg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZGV0ZXJtaW5lIHRoZSBUd2luQ0FUIHZlcnNpb24uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBFbmQgb2YgcmVhZGluZyB0aGUgc2VydmljZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgcmVhZGluZyBzZXJ2aWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIFRQWSBmaWxlOicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogTmV0SWQsIHBvcnQgYW5kIGFsaWdubWVudCBtYW51YWxseSBzZXQuIFNraXAgcmVhZGluZyB0aGUgc2VydmljZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgc3ltYm9sIHRhYmxlXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLmZvcmNlVXBsb2FkVXNhZ2UgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IHJlYWRpbmcgdGhlIHN5bWJvbHMgZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgYW4gQXJyYXkgb2YgdGhlIEVsZW1lbnRzIHdpdGggXCJTeW1ib2xcIiBhcyB0YWcgbmFtZS5cbiAgICAgICAgICAgICAgICAgICAgYWxsU3ltYm9scyA9IGNvbmZpZ0ZpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1N5bWJvbHMnKVswXTtcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sQXJyYXkgPSBhbGxTeW1ib2xzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdTeW1ib2wnKTtcblxuICAgICAgICAgICAgICAgICAgICAvL0dldCB0aGUgbmFtZSBvZiB0aGUgc3ltYm9sIGFuZCBjcmVhdGUgYW4gb2JqZWN0IHByb3BlcnR5IHdpdGggaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vc3ltVGFibGUgaXMgZGVjbGFyZWQgb3V0c2lkZSBpbiB0aGUgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzeW1ib2xBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHN5bWJvbEFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOYW1lJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVN0cmluZzogc3ltYm9sQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R5cGUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4R3JvdXA6IHBhcnNlSW50KHN5bWJvbEFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdJR3JvdXAnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0OiBwYXJzZUludChzeW1ib2xBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnSU9mZnNldCcpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0U2l6ZTogcGFyc2VJbnQoc3ltYm9sQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdFNpemUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5zaXplID0gKHRoaXMuc3ltVGFibGVbbmFtZV0uYml0U2l6ZSA+PSA4KSA/IHRoaXMuc3ltVGFibGVbbmFtZV0uYml0U2l6ZSAvIDggOiB0aGlzLnN5bVRhYmxlW25hbWVdLmJpdFNpemU7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVBcnIgPSB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGVTdHJpbmcuc3BsaXQoXCIgXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZUFyclswXSA9PT0gJ0FSUkFZJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gdHlwZUFyclswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQXJyYXkgbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSB0eXBlQXJyWzFdLnN1YnN0cmluZygxLCB0eXBlQXJyWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gYXJyYXlMZW5ndGguc3BsaXQoJy4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJTdGFydElkeCA9IHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBwYXJzZUludChhcnJheUxlbmd0aFsxXSwgMTApIC0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMF0sIDEwKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheUxlbmd0aCA9IGFycmF5TGVuZ3RoO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRGF0YSB0eXBlIG9mIHRoZSBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclszXS5zcGxpdCgnKCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVsxXSA9IHR5cGVbMV0uc3Vic3RyKDAsIHR5cGVbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlQXJyWzBdICsgJy4nICsgYXJyYXlMZW5ndGggKyAnLicgKyB0eXBlWzBdICsgJy4nICsgdHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5zdHJpbmdMZW5ndGggPSBwYXJzZUludCh0eXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JdGVtIGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uaXRlbVNpemUgPSB0aGlzLnN5bVRhYmxlW25hbWVdLnNpemUgLyBhcnJheUxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlEYXRhVHlwZSA9ICdVU0VSJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzBdID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5kYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzBdLnNwbGl0KCcoJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVbMV0gPSB0eXBlWzFdLnN1YnN0cigwLCB0eXBlWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZVswXSArICcuJyArIHR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uc3RyaW5nTGVuZ3RoID0gcGFyc2VJbnQodHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9ICdVU0VSJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzBdID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5kYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVJlYWR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEVuZCBvZiByZWFkaW5nIHRoZSBzeW1ib2xzIGZyb20gdGhlIFRQWSBmaWxlLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN5bWJvbCB0YWJsZSByZWFkeS4nKTtcblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSBwYXJzaW5nIHRoZSBzeW1ib2wgZmlsZTonKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFJlYWRpbmcgdGhlIHN5bWJvbHMgZnJvbSB0aGUgVFBZIGZpbGUgaXMgZGVhY3RpdmF0ZWQuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9HZXQgdGhlIGRhdGEgdHlwZXMuXG4gICAgICAgICAgICB2YXIgYWxsRGF0YVR5cGVzLCBkYXRhVHlwZUFycmF5LCBzdWJJdGVtQXJyYXksIHNOYW1lLCBmdWxsTmFtZTtcblxuICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IHJlYWRpbmcgdGhlIGRhdGEgdHlwZXMgZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgYW4gQXJyYXkgb2YgdGhlIEVsZW1lbnRzIHdpdGggXCJEYXRhVHlwZVwiIGFzIHRhZyBuYW1lLlxuICAgICAgICAgICAgICAgICAgICBhbGxEYXRhVHlwZXMgPSBjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdEYXRhVHlwZXMnKVswXTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGVBcnJheSA9IGFsbERhdGFUeXBlcy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnRGF0YVR5cGUnKTtcblxuICAgICAgICAgICAgICAgICAgICAvL0dldCB0aGUgbmFtZSBvZiB0aGUgZGF0YSB0eXBlIGFuZCBjcmVhdGUgYW4gb2JqZWN0IHByb3BlcnR5IHdpdGggaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vZGF0YVR5cGVUYWJsZSBpcyBkZWNsYXJlZCBvdXRzaWRlIGluIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgLy9BcnJheXMgZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGFUeXBlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lID0gZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnTmFtZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gZnVsbE5hbWUuc3BsaXQoXCIgXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdBUlJBWScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtmdWxsTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdHlwZTogZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdFNpemU6IHBhcnNlSW50KGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdFNpemUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbZnVsbE5hbWVdLnNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZnVsbE5hbWVdLmJpdFNpemUgLyA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vVGhlbiB0aGUgcmVzdFxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YVR5cGVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWUgPSBkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOYW1lJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBmdWxsTmFtZS5zcGxpdChcIiBcIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSAhPT0gJ0FSUkFZJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3R5cGU6IGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R5cGUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXRTaXplOiBwYXJzZUludChkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdCaXRTaXplJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViSXRlbXM6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5iaXRTaXplIC8gODtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBTdWJJdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykl0ZW1BcnJheSA9IGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1N1Ykl0ZW0nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3ViSXRlbUFycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNOYW1lID0gc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOYW1lJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Pbmx5IFN1Ykl0ZW1zIHdpdGggdHlwZSBpbmZvcm1hdGlvbiAocHJvYmxlbSBvY2N1cnMgd2l0aCBUQzMgYW5kIHNvbWUgbGlicylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zTmFtZSA9IHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnTmFtZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVTdHJpbmc6IHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUeXBlJylbMF0uaGFzQXR0cmlidXRlKCdQb2ludGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0U2l6ZTogcGFyc2VJbnQoc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdCaXRTaXplJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdE9mZnMnKVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5iaXRPZmZzZXQgPSBwYXJzZUludChzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdE9mZnMnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uc2l6ZSA9ICh0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmJpdFNpemUgPj0gOCkgPyB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmJpdFNpemUgLyA4IDogdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5iaXRTaXplO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlQXJyID0gdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlU3RyaW5nLnNwbGl0KFwiIFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVBcnJbMF0gPT09ICdBUlJBWScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZSA9IHR5cGVBcnJbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0FycmF5IExlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gdHlwZUFyclsxXS5zdWJzdHJpbmcoMSwgdHlwZUFyclsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IGFycmF5TGVuZ3RoLnNwbGl0KCcuLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyU3RhcnRJZHggPSBwYXJzZUludChhcnJheUxlbmd0aFswXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMV0sIDEwKSAtIHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyYXlMZW5ndGggPSBhcnJheUxlbmd0aDtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EYXRhIHR5cGUgb2YgdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzNdLnNwbGl0KCcoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnN0cmluZ0xlbmd0aCA9IHBhcnNlSW50KHR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmZ1bGxUeXBlID0gdHlwZUFyclswXSArICcuJyArIGFycmF5TGVuZ3RoICsgJy4nICsgdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGFkZGVkIGNhdXNlIHRoZXJlIGFyZSB1bmRlZmluZWQgZGF0YSB0eXBlcyBzb21lIFR3aW5DQVQgbGlicyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZS5za2lwTWlzc2luZ1R5cGVzID09PSB0cnVlICYmIHRoaXMuZGF0YVR5cGVUYWJsZVt0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGVTdHJpbmddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogRGF0YSB0eXBlIG1pc3NpbmcgaW4gVFBZIGZpbGU6Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IEFjY2VzcyB0byBzeW1ib2xzIHVzaW5nIHRoaXMgZGF0YSB0eXBlIHdpbGwgcmV0dXJuIHdyb25nIHJlc3VsdHM6Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFVzZSBoYW5kbGVzIHRvIGFjY2VzcyBzeW1ib2xzIHVzaW5nIHRoaXMgZGF0YSB0eXBlLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFUeXBlVGFibGVbdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlU3RyaW5nXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBEYXRhIHR5cGUgbWlzc2luZyBpbiBUUFkgZmlsZSEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogSWYgeW91IGRvblxcJ3QgdXNlIHRoaXMgZGF0YSB0eXBlIHlvdSBjYW4gc2V0IHRoZSBjbGllbnQgcGFyYW1ldGVyIFwic2tpcE1pc3NpbmdUeXBlc1wiIHRvIHRydWUuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5iaXRTaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW3RoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZVN0cmluZ10uYml0U2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5zaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW3RoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZVN0cmluZ10uc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSXRlbSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLml0ZW1TaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5zaXplIC8gYXJyYXlMZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmFycmF5RGF0YVR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIHRoaXMucGxjVHlwZUxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyYXlEYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyYXlEYXRhVHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclswXS5zcGxpdCgnKCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1N0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5mdWxsVHlwZSA9IHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnN0cmluZ0xlbmd0aCA9IHBhcnNlSW50KHR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmZ1bGxUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIHRoaXMucGxjVHlwZUxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogU2tpcHBpbmcgU3ViSXRlbSB3aXRoIG5vIHR5cGUgaW5mb3JtYXRpb246IERhdGEgdHlwZTogJyArIG5hbWUgKyAnICxTdWJJdGVtOiAnICsgc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRW5kIG9mIHJlYWRpbmcgdGhlIGRhdGEgdHlwZXMgZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRGF0YSB0eXBlIHRhYmxlIHJlYWR5LicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vR2V0IFVwbG9hZCBJbmZvXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tHZXRVcGxvYWRJbmZvKCk7XG5cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgY3JlYXRpbmcgdGhlIGRhdGEgdHlwZSBpbmZvcm1hdGlvbjonKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1R5cGU6ICcgKyBmdWxsTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdTdWJJdGVtOiAnICsgc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jb25maWdYbWxIdHRwUmVxLnNlbmQobnVsbCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBTZXQgdGhlIHNlcnZpY2UgcGFyYW1ldGVyIHdpdGggdGhlIHZhbHVlcyByZWFkIGZyb20gdGhlIFRQWSBmaWxlLlxuICAgICAqL1xuICAgIHNldFNlcnZpY2VQYXJhbUZyb21UUFkoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXJ2aWNlLmFtc05ldElkICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmFtc05ldElkID0gdGhpcy5zZXJ2aWNlSW5mby5uZXRJZDtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogTm8gTmV0SWQgZGVmaW5pdGlvbiBmb3VuZC4gTmV0SWQgZnJvbSBUUFkgZmlsZSB3aWxsIGJlIHVzZWQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZS5hbXNQb3J0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmFtc1BvcnQgPSB0aGlzLnNlcnZpY2VJbmZvLnBvcnQ7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IE5vIEFNUyBwb3J0IGRlZmluaXRpb24gZm91bmQuIFBvcnQgbnVtYmVyIGZyb20gVFBZIGZpbGUgd2lsbCBiZSB1c2VkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlSW5mby5hbGlnbm1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25tZW50ID0gdGhpcy5zZXJ2aWNlSW5mby5hbGlnbm1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBObyBhbGlnbm1lbnQgcGFyYW1ldGVyIGZvdW5kLiBBbGlnbm1lbnQgZnJvbSBUUFkgZmlsZSB3aWxsIGJlIHVzZWQuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25tZW50ID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IENhblxcJ3QgZ2V0IGEgdmFsdWUgZm9yIHRoZSBkYXRhIGFsaWdtZW50LiBEZWZhdWx0IHZhbHVlIGZvciBhbGlnbm1lbnQgaXMgdXNlZCAoMSkuIFRoaXMgd29ya3Mgb25seSB3aXRoIFRDMiBhbmQgeDg2IHByb2Nlc3NvcnMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgIT09IDEgJiYgdGhpcy5hbGlnbm1lbnQgIT09IDQgJiYgdGhpcy5hbGlnbm1lbnQgIT09IDgpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVGhlIHZhbHVlIGZvciB0aGUgYWxpZ25tZW50IHNob3VsZCBiZSAxLCA0IG9yIDguJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFRhcmdldCBpbmZvcm1hdGlvbjogTmV0SWQ6ICcgKyB0aGlzLnNlcnZpY2UuYW1zTmV0SWQgKyAnLCBBTVMgcG9ydDogJyArIHRoaXMuc2VydmljZS5hbXNQb3J0ICsgJyAsIGFsaWdubWVudDogJyArIHRoaXMuYWxpZ25tZW50KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBVcGxvYWRJbmZvIGhhcyB0byBiZSBmZXRjaGVkLlxuICAgICAqL1xuICAgIGNoZWNrR2V0VXBsb2FkSW5mbygpIHtcblxuICAgICAgICB0aGlzLnNldFNlcnZpY2VQYXJhbUZyb21UUFkoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZS5jb25maWdGaWxlVXJsICE9ICdzdHJpbmcnIHx8IHRoaXMuc2VydmljZS5mb3JjZVVwbG9hZFVzYWdlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IGZldGNoaW5nIHRoZSBzeW1ib2xzIGZyb20gUExDLicpO1xuICAgICAgICAgICAgLy9HZXQgdGhlIFVwbG9hZEluZm8uXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXBsb2FkSW5mbygpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkXFwnbnQgZmV0Y2ggdGhlIHN5bWJvbCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBQTEM6JyArIGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2Uuc3luY1htbEh0dHAgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVhZHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgdGhlIG9uUmVhZHkgZnVuY3Rpb24uXG4gICAgICovXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgLy9Pbi1yZWFkeS1mdW5jdGlvblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZS5vblJlYWR5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IENhbGxpbmcgdGhlIFwib25SZWFkeVwiIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLm9uUmVhZHkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIFwib25SZWFkeVwiIGZ1bmN0aW9uIGRlZmluZWQuIENoZWNrIHRoZSBtYW51YWwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9TdGFydCBjeWNsaWMgQURTIGNoZWNrcyBpZiBkZWZpbmVkXG4gICAgICAgIGlmICghaXNOYU4odGhpcy5zZXJ2aWNlLmFkc0NoZWNrSW50ZXJ2YWwpICYmIHRoaXMuc2VydmljZS5hZHNDaGVja0ludGVydmFsID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3RhcnQgY3ljbGljIHJlYWRpbmcgb2YgQURTIHN0YXRlLicpO1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5yZWFkQWRzU3RhdGUsIHRoaXMuc2VydmljZS5hZHNDaGVja0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19