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
    }
    log(message) {
        try {
            window.console.log(message);
        }
        catch (e) {
            alert(message);
        }
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Get the names of the PLC variables using the upload info.
             */
            if (this.service.dontFetchSymbols === true) {
                this.log('TAME library warning: Reading of the UploadInfo and the TPY file deactivated. Symbol Table could not be created.');
                if (this.alignment !== 1 && this.alignment !== 4 && this.alignment !== 8) {
                    this.log('TAME library warning: The value for the alignment should be 1, 4 or 8.');
                }
                this.log('TAME library info: Target information: NetId: ' + this.service.amsNetId + ', AMS port: ' + this.service.amsPort + ' , alignment: ' + this.alignment);
                if (this.service.syncXmlHttp !== true) {
                    window.setTimeout(this.onReady, 1);
                }
            }
            else {
                if (typeof this.service.configFileUrl == 'string') {
                    this.log('TAME library info: Fetching the TPY file from the webserver.');
                    //Get the symbol file and parse it. Upload Info will be fetched after.
                    yield this.getConfigFile();
                }
                else {
                    //Start getting the Upload Info.
                    yield this.checkGetUploadInfo();
                }
            }
        });
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
        return __awaiter(this, void 0, void 0, function* () {
            this.configXmlHttpReq = this.createXMLHttpReq();
            var symbolArray = [], configFile, name, allSymbols, typeArr, arrayLength, type, elem, tcVersion, i;
            this.log('TAME library info: Start reading the TPY file.');
            //HTTPRequest
            this.configXmlHttpReq.open('GET', this.service.configFileUrl, !this.service.syncXmlHttp, this.service.serviceUser, this.service.servicePassword);
            this.configXmlHttpReq.setRequestHeader('Content-Type', 'text/xml');
            this.configXmlHttpReq.onload = () => __awaiter(this, void 0, void 0, function* () {
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
                        yield this.checkGetUploadInfo();
                    }
                    catch (e) {
                        this.log('TAME library error: An error occured while creating the data type information:');
                        this.log('Type: ' + fullName);
                        this.log('SubItem: ' + sName);
                        this.log(e);
                    }
                }
            });
            this.configXmlHttpReq.send(null);
        });
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
        return __awaiter(this, void 0, void 0, function* () {
            this.setServiceParamFromTPY();
            if (typeof this.service.configFileUrl != 'string' || this.service.forceUploadUsage === true) {
                this.log('TAME library info: Start fetching the symbols from PLC.');
                //Get the UploadInfo.
                try {
                    yield this.getUploadInfo();
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
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFhLElBQUk7SUF1SWIsWUFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUF0SS9CLFlBQU8sR0FBRyxlQUFlLENBQUE7UUFDekIsb0JBQWUsR0FBRztZQUNkLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUM5QyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDeEQsQ0FBQTtRQUNELG1CQUFjLEdBQUc7WUFDYixFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFDckYsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO1NBQ3JGLENBQUE7UUFDRCxxQkFBZ0IsR0FBRztZQUNmLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3hGLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFD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QSxDQUFBO1FBQ3pFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3ZFLGdCQUFXLEdBQUcsQ0FBTyxJQUFJLEVBQUUsRUFBRSxnREFBQyxPQUFBLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBLEdBQUEsQ0FBQTtRQUM3RSxnQkFBVyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDN0UsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsY0FBUyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDekUsY0FBUyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDekUsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsZ0JBQVcsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzdFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3ZFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBRXJFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3BFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFB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WyJleHBvcnQgY2xhc3MgVEFNRSB7XG4gICAgdmVyc2lvbiA9ICdWNC4zLjEgMTcxMTIwJ1xuICAgIHdlZWtkU2hvcnROYW1lcyA9IHtcbiAgICAgICAgZ2U6IFsnU28nLCAnTW8nLCAnRGknLCAnTWknLCAnRG8nLCAnRnInLCAnU2EnXSxcbiAgICAgICAgZW46IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J11cbiAgICB9XG4gICAgd2Vla2RMb25nTmFtZXMgPSB7XG4gICAgICAgIGdlOiBbJ1Nvbm50YWcnLCAnTW9udGFnJywgJ0RpZW5zdGFnJywgJ01pdHR3b2NoJywgJ0Rvbm5lcnN0YWcnLCAnRnJlaXRhZycsICdTYW1zdGFnJ10sXG4gICAgICAgIGVuOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J11cbiAgICB9XG4gICAgbW9udGhzU2hvcnROYW1lcyA9IHtcbiAgICAgICAgZ2U6IFsnSmFuJywgJ0ZlYicsICdNcnonLCAnQXByJywgJ01haScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2t0JywgJ05vdicsICdEZXonXSxcbiAgICAgICAgZW46IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RleiddXG4gICAgfVxuICAgIG1vbnRoc0xvbmdOYW1lcyA9IHtcbiAgICAgICAgZ2U6IFsnSmFudWFyJywgJ0ZlYnJ1YXInLCAnTcOkcnonLCAnQXByaWwnLCAnTWFpJywgJ0p1bmknLCAnSnVsaScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09rdG9iZXInLCAnTm92ZW1iZXInLCAnRGV6ZW1iZXInXSxcbiAgICAgICAgZW46IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG4gICAgfVxuICAgIGRhdGVOYW1lczogeyB3ZWVrZFNob3J0OiBhbnk7IHdlZWtkTG9uZzogYW55OyBtb250aHNTaG9ydDogYW55OyBtb250aHNMb25nOiBhbnkgfVxuICAgIG1heFN0cmluZ0xlbjogbnVtYmVyXG4gICAgbWF4RHJvcFJlcTogbnVtYmVyXG4gICAgdXNlQ2hlY2tCb3VuZHM6IGJvb2xlYW5cbiAgICBhZHNTdGF0ZTogYW55XG4gICAgYWRzU3RhdGVUeHQ6IHN0cmluZ1xuICAgIGRldmljZVN0YXRlOiBhbnlcbiAgICBzeW1UYWJsZVJlYWR5OiBib29sZWFuXG4gICAgZGF0YVR5cGVUYWJsZVJlYWR5OiBib29sZWFuXG4gICAgaGFuZGxlQ2FjaGVSZWFkeTogYm9vbGVhblxuICAgIHhtbEh0dHBSZXFUaW1lb3V0OiBudW1iZXJcblxuICAgIGluZGV4R3JvdXBzID0ge1xuICAgICAgICBNOiAxNjQxNiwgICAgLy9QTEMgbWVtb3J5IHJhbmdlKCVNIGZpZWxkKSwgUkVBRF9NIC0gV1JJVEVfTVxuICAgICAgICBNWDogMTY0MTcsICAgLy9QTEMgbWVtb3J5IHJhbmdlKCVNWCBmaWVsZCksIFJFQURfTVggLSBXUklURV9NWFxuICAgICAgICBEQjogMTY0NDgsICAgLy9EYXRhIHJhbmdlXG4gICAgICAgIEk6IDYxNDcyLCAgICAvL1BMQyBwcm9jZXNzIGRpYWdyYW0gb2YgdGhlIHBoeXNpY2FsIGlucHV0cyglSSBmaWVsZCksIFJFQURfSSAtIFdSSVRFX0lcbiAgICAgICAgSVg6IDYxNDczLCAgIC8vUExDIHByb2Nlc3MgZGlhZ3JhbSBvZiB0aGUgcGh5c2ljYWwgaW5wdXRzKCVJWCBmaWVsZCksIFJFQURfSVggLSBXUklURV9JWFxuICAgICAgICBROiA2MTQ4OCwgICAgLy9QTEMgcHJvY2VzcyBkaWFncmFtIG9mIHRoZSBwaHlzaWNhbCBvdXRwdXRzKCVRIGZpZWxkKSwgUkVBRF9RIC0gV1JJVEVfUVxuICAgICAgICBRWDogNjE0ODksICAgLy9QTEMgcHJvY2VzcyBkaWFncmFtIG9mIHRoZSBwaHlzaWNhbCBvdXRwdXRzKCVRWCBmaWVsZCksIFJFQURfUVggLSBXUklURV9RWFxuICAgICAgICBVcGxvYWQ6IDYxNDUxLCAgICAgIC8vQ29udGFpbnMgdGhlIHN5bWJvbCBpbmZvcm1hdGlvblxuICAgICAgICBVcGxvYWRJbmZvOiA2MTQ1MiwgIC8vTGVuZ3RoIGFuZCBudW1iZXIgb2YgdGhlIHN5bWJvbCBpbmZvcm1hdGlvbiAgICAgICAgXG4gICAgICAgIEhhbmRsZUJ5TmFtZTogNjE0NDMsXG4gICAgICAgIFZhbHVlQnlIYW5kbGU6IDYxNDQ1LFxuICAgICAgICBSZWxlYXNlSGFuZGxlOiA2MTQ0NixcbiAgICAgICAgU3VtUmQ6IDYxNTY4LCAgICAgICAvL1N1bVVwUmVhZFJlcXVlc3RcbiAgICAgICAgU3VtV3I6IDYxNTY5LCAgICAgICAvL1N1bVVwV3JpdGVSZXF1ZXN0XG4gICAgICAgIFN1bVJkV3I6IDYxNTcwICAgICAgLy9TdW1VcFJlYWRXcml0ZVJlcXVlc3RcbiAgICB9XG5cbiAgICAvL0xlbmdodCBvZiBQTEMgZGF0YSB0eXBlcyBpbiBieXRlcy5cbiAgICBwbGNUeXBlTGVuID0ge1xuICAgICAgICBCT09MOiAxLFxuICAgICAgICBCWVRFOiAxLFxuICAgICAgICBVU0lOVDogMSxcbiAgICAgICAgU0lOVDogMSxcbiAgICAgICAgV09SRDogMixcbiAgICAgICAgVUlOVDogMixcbiAgICAgICAgSU5UOiAyLFxuICAgICAgICBJTlQxNjogMixcbiAgICAgICAgSU5UMURQOiAyLFxuICAgICAgICBJTlQyRFA6IDIsXG4gICAgICAgIERXT1JEOiA0LFxuICAgICAgICBVRElOVDogNCxcbiAgICAgICAgRElOVDogNCxcbiAgICAgICAgVElNRTogNCwgICAgICAgICAgLy90aW1lIGJhc2UgaW4gUExDOiBtaWxsaXNlY29uZHNcbiAgICAgICAgVE9EOiA0LCAgICAgICAgICAgLy90aW1lIGJhc2UgaW4gUExDOiBtaWxsaXNlY29uZHNcbiAgICAgICAgVElNRV9PRl9EQVk6IDQsICAgLy9Ud2luQ0FUMywgdGltZSBiYXNlIGluIFBMQzogbWlsbGlzZWNvbmRzXG4gICAgICAgIERBVEU6IDQsICAgICAgICAgIC8vdGltZSBiYXNlIGluIFBMQzogc2Vjb25kc1xuICAgICAgICBEVDogNCwgICAgICAgICAgICAvL3RpbWUgYmFzZSBpbiBQTEM6IHNlY29uZHNcbiAgICAgICAgREFURV9BTkRfVElNRTogNCwgLy9Ud2luQ0FUMywgdGltZSBiYXNlIGluIFBMQzogc2Vjb25kc1xuICAgICAgICBQT0lOVEVSOiA0LFxuICAgICAgICBSRUFMOiA0LFxuICAgICAgICBMUkVBTDogOCxcbiAgICAgICAgU1RSSU5HOiA4MCwgICAgLy93aXRob3V0IHRlcm1pbmF0aW9uXG4gICAgICAgIEVuZFN0cnVjdDogMCAgIC8vc2hvdWxkIGJlIDAhXG4gICAgfVxuXG4gICAgLy9BRFMgc3RhdGVzXG4gICAgYWRzU3RhdGVzID0gW1xuICAgICAgICBcIklOVkFMSURcIixcbiAgICAgICAgXCJJRExFXCIsXG4gICAgICAgIFwiUkVTRVRcIixcbiAgICAgICAgXCJJTklUXCIsXG4gICAgICAgIFwiU1RBUlRcIixcbiAgICAgICAgXCJSVU5cIixcbiAgICAgICAgXCJTVE9QXCIsXG4gICAgICAgIFwiU0FWRUNGR1wiLFxuICAgICAgICBcIlBPV0VSR09PRFwiLFxuICAgICAgICBcIkVSUk9SXCIsXG4gICAgICAgIFwiU0hVVERPV05cIixcbiAgICAgICAgXCJTVVNQRU5EXCIsXG4gICAgICAgIFwiUkVTVU1FXCIsXG4gICAgICAgIFwiQ09ORklHXCIsXG4gICAgICAgIFwiUkVDT05GSUdcIlxuICAgIF1cbiAgICBsYW5nOiBhbnlcbiAgICBhbGlnbm1lbnQ6IG51bWJlclxuICAgIGN1cnJSZXE6IG51bWJlcltdXG4gICAgc3ltVGFibGUgPSB7fVxuICAgIGRhdGFUeXBlVGFibGUgPSB7fVxuICAgIHNlcnZpY2VJbmZvID0ge30gYXMgYW55XG4gICAgc3ltYm9sQ291bnQ6IG51bWJlclxuICAgIHVwbG9hZExlbmd0aDogbnVtYmVyXG4gICAgaGFuZGxlQ2FjaGUgPSB7fVxuICAgIGhhbmRsZU5hbWVzOiBhbnlbXVxuICAgIHhtbEh0dHBSZXE6IGFueVxuICAgIGxvZyhtZXNzYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vR2VuZXJhdGUgYSBCYXNlNjQgYWxwaGFiZXQgZm9yIHRoZSBlbmNvZGVyLiBVc2luZyBhbiBhcnJheSBvciBvYmplY3QgdG9cbiAgICAvL3N0b3JlIHRoZSBhbHBoYWJldCB0aGUgZW4tL2RlY29kZXIgcnVucyBmYXN0ZXIgdGhhbiB3aXRoIHRoZSBjb21tb25seVxuICAgIC8vdXNlZCBzdHJpbmcuIEF0IGxlYXN0IHdpdGggdGhlIGJyb3dzZXJzIG9mIDIwMDkuIDstKVxuICAgIGI2NEVuYyA9ICgoKSA9PiB7XG4gICAgICAgIHZhciByZXQgPSB7fSxcbiAgICAgICAgICAgIHN0ciA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcbiAgICAgICAgICAgIGk6IG51bWJlcjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmV0W2ldID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0pKCk7XG5cbiAgICAvL0dlbmVyYXRlIGEgQmFzZTY0IGFscGhhYmV0IGZvciB0aGUgZGVjb2Rlci5cbiAgICBiNjREZWMgPSAoKCkgPT4ge1xuICAgICAgICB2YXIgcmV0ID0ge30sXG4gICAgICAgICAgICBzdHIgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nLFxuICAgICAgICAgICAgaTogbnVtYmVyO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXRbc3RyLmNoYXJBdChpKV0gPSBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSkoKTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VydmljZTogYW55KSB7XG5cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB2ZXJzaW9uOiAnICsgdGhpcy52ZXJzaW9uKTtcblxuICAgICAgICAvL1NldCBsYW5ndWFnZSBmb3IgbmFtZXMgb2YgZGF5cyBhbmQgbW9udGhzLCBkZWZhdWx0IGlzIGdlcm1hbi5cbiAgICAgICAgdGhpcy5sYW5nID0gKHR5cGVvZiBzZXJ2aWNlLmxhbmd1YWdlID09PSAnc3RyaW5nJykgPyBzZXJ2aWNlLmxhbmd1YWdlIDogJ2dlJyxcblxuICAgICAgICAvL0FsaWdubWVudFxuICAgICAgICB0aGlzLmFsaWdubWVudCA9IDAsXG5cbiAgICAgICAgLy9BcnJheSBmb3IgdGhlIHJlcXVlc3QgYWNrbm93bGVkZ2VtZW50IGNvdW50ZXIuXG4gICAgICAgIHRoaXMuY3VyclJlcSA9IFswXSxcblxuICAgICAgICAvL1RoZSBTeW1ib2wgVGFibGUgZm9yIGFjY2Vzc2luZyB2YXJpYWJsZXMgcGVyIG5hbWUuXG4gICAgICAgIHRoaXMuc3ltVGFibGUgPSB7fSxcbiAgICAgICAgLy90aGlzLnN5bVRhYmxlT2sgPSBmYWxzZSxcbiAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlID0ge30sXG4gICAgICAgIC8vdGhpcy5kYXRhVHlwZVRhYmxlT2sgPSBmYWxzZSxcbiAgICAgICAgdGhpcy5zZXJ2aWNlSW5mbyA9IHt9LFxuXG4gICAgICAgIC8vVmFyaWFibGVzIG9mIHRoZSBVcGxvYWRJbmZvIFxuICAgICAgICB0aGlzLnN5bWJvbENvdW50ID0gMCwgdGhpcy51cGxvYWRMZW5ndGggPSAwLFxuXG4gICAgICAgIC8vT2JqZWN0IHRvIHN0b3JlIHRoZSBoYW5kbGVzXG4gICAgICAgIHRoaXMuaGFuZGxlQ2FjaGUgPSB7fSxcbiAgICAgICAgdGhpcy5oYW5kbGVOYW1lcyA9IFtdO1xuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hlY2sgQ2xpZW50IFBhcmFtZXRlclxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLy9VUkwgb2YgdGhlIFRjQWRzV2ViU2VydmljZS5kbGxcbiAgICAgICAgaWYgKHR5cGVvZiBzZXJ2aWNlLnNlcnZpY2VVcmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBTZXJ2aWNlIFVSTCBpcyBub3QgYSBzdHJpbmchJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL0FNUyBOZXRJRCBvZiB0aGUgUExDXG4gICAgICAgIGlmICh0eXBlb2Ygc2VydmljZS5hbXNOZXRJZCAhPT0gJ3N0cmluZycgJiYgKHR5cGVvZiBzZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgIT09ICdzdHJpbmcnIHx8IHNlcnZpY2UuZG9udEZldGNoU3ltYm9scyA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5ldElkIGlzIG5vdCBkZWZpbmVkIGFuZCB0aGVyZSBpcyBubyBVUkwgZm9yIGZldGNoaW5nIHRoZSBUUFkgZmlsZSBvciBmZXRjaGluZyB0aGUgc3ltYm9scyBpcyBkZWFjdGl2YXRlZCEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQU1TIFBvcnQgTnVtYmVyIG9mIHRoZSBSdW50aW1lIFN5c3RlbVxuICAgICAgICBpZiAoc2VydmljZS5hbXNQb3J0ID09PSB1bmRlZmluZWQgJiYgKHR5cGVvZiBzZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgIT09ICdzdHJpbmcnIHx8IHNlcnZpY2UuZG9udEZldGNoU3ltYm9scyA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHNlcnZpY2UuYW1zUG9ydCA9ICc4MDEnO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBBTVMgcG9ydCBudW1iZXIgaXMgbm90IHNldCEgRGVmYXVsdCBwb3J0IDgwMSB3aWxsIGJlIHVzZWQuJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlcnZpY2UuYW1zUG9ydCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogQU1TIHBvcnQgbnVtYmVyIGlzIG5vdCBhIHN0cmluZyEgVHJ5aW5nIHRvIGNvbnZlcnQgaXQuJyk7XG4gICAgICAgICAgICBzZXJ2aWNlLmFtc1BvcnQgPSBzZXJ2aWNlLmFtc1BvcnQudG9TdHJpbmcoMTApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJzZUludChzZXJ2aWNlLmFtc1BvcnQsIDEwKSA8IDgwMSB8fCBwYXJzZUludChzZXJ2aWNlLmFtc1BvcnQsIDEwKSA+IDg5MSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQU1TIFBvcnQgTnVtYmVyICgnICsgcGFyc2VJbnQoc2VydmljZS5hbXNQb3J0LCAxMCkgKyAnKSBpcyBvdXQgb2YgcmFuZ2UgKDgwMS04OTEpIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9EYXRhIGFsaWdubWVudCwgeDg2IGFuZCBUQzIgdXNlcyBhIDEgYnl0ZSBhbGlnbm1lbnQsIGZvciBhbiBBUk0gYW5kIFRDMiBzZXQgaXQgdG8gNCBhbmRcbiAgICAgICAgLy9mb3IgVEMzIGdlbmVyYWxseSB0byA4OyBcbiAgICAgICAgLy9kYXRhQWxpZ240IGlzIGRlcHJpY2F0ZWRcbiAgICAgICAgaWYgKHNlcnZpY2UuZGF0YUFsaWduNCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSA0O1xuICAgICAgICB9IGVsc2UgaWYgKHNlcnZpY2UuYWxpZ25tZW50ID09PSB1bmRlZmluZWQgJiYgKHR5cGVvZiBzZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgIT09ICdzdHJpbmcnIHx8IHNlcnZpY2UuZG9udEZldGNoU3ltYm9scyA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWxpZ25tZW50ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VydmljZS5hbGlnbm1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IHBhcnNlSW50KHNlcnZpY2UuYWxpZ25tZW50LCAxMCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlcnZpY2UuYWxpZ25tZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSBzZXJ2aWNlLmFsaWdubWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2xvYmFsIHN5bmNocm9ub3VzIFhNTEhUVFBSZXF1ZXN0c1xuICAgICAgICBpZiAoc2VydmljZS5zeW5jWG1sSHR0cCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUaGUgXCJzeW5jWG1sSHR0cFwiIHBhcmFtZXRlciBpcyBzZXQgdG8gdHJ1ZS4gU3luY2hyb25vdXMgWE1MSHR0cFJlcXVlc3RzIHdpbGwgYmUgdXNlZCBieSBkZWZhdWx0LicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9Eb24ndCBsZXQgaXQgdW5kZWZpbmVkXG4gICAgICAgICAgICBzZXJ2aWNlLnN5bmNYbWxIdHRwID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL1VzZXJuYW1lL3Bhc3N3b3JkXG4gICAgICAgIGlmICh0eXBlb2Ygc2VydmljZS5zZXJ2aWNlVXNlciA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHNlcnZpY2Uuc2VydmljZVBhc3N3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBVc2VybmFtZSBhbmQgcGFzc3dvcmQgc2V0LiBBdXRoZW50aWNhdGVkIHJlcXVlc3RzIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZVVzZXIgPSBudWxsO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlUGFzc3dvcmQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HbG9iYWwgdXNlIG9mIGhhbmRsZXNcbiAgICAgICAgaWYgKHNlcnZpY2UudXNlSGFuZGxlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUaGUgXCJ1c2VIYW5kbGVzXCIgcGFyYW1ldGVyIGlzIHNldCB0byB0cnVlLiBIYW5kbGVzIHdpbGwgYmUgdXNlZCBieSBkZWZhdWx0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Eb24ndCBjaGVjayBmb3IgbWlzc2luZyBkYXRhIHR5cGVzICh0aGF0cyBhIHByb2JsZW0gd2l0aCBzb21lIFR3aW5DQVQgbGlicylcbiAgICAgICAgaWYgKHNlcnZpY2Uuc2tpcE1pc3NpbmdUeXBlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUaGUgXCJza2lwTWlzc2luZ1R5cGVzXCIgcGFyYW1ldGVyIGlzIHNldCB0byB0cnVlLiBUQU1FIGp1c3QgZHJvcHMgYSBsb2cgbWVzc2FnZSBpZiB0aGVyZSBhcmUgVHdpbkNBVCBsaWJzIHdpdGggbWlzc2luZyBkYXRhIHR5cGVzLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VydmljZS5za2lwTWlzc2luZ1R5cGVzID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL0N5Y2xpYyBBRFMgY2hlY2tzIChleHBlcmltZW50YWwpLlxuICAgICAgICBpZiAoIWlzTmFOKHNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCkgJiYgc2VydmljZS5hZHNDaGVja0ludGVydmFsID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogQ3ljbGljIEFEUyBzdGF0ZSBjaGVja3MgZW5hYmxlZC4gSW50ZXJ2YWwgdGltZTogJyArIHNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCArICcgbXMuJyk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbml0aWFsaXplIFByb3BlcnRpZXNcbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8vU2V0IGxhbmd1YWdlIHNwZWNpZmljIG5hbWVzIG9mIGRheXMgYW5kIG1vbnRocy5cbiAgICAgICAgdGhpcy5kYXRlTmFtZXMgPSB7XG4gICAgICAgICAgICB3ZWVrZFNob3J0OiB0aGlzLndlZWtkU2hvcnROYW1lc1t0aGlzLmxhbmddLFxuICAgICAgICAgICAgd2Vla2RMb25nOiB0aGlzLndlZWtkTG9uZ05hbWVzW3RoaXMubGFuZ10sXG4gICAgICAgICAgICBtb250aHNTaG9ydDogdGhpcy5tb250aHNTaG9ydE5hbWVzW3RoaXMubGFuZ10sXG4gICAgICAgICAgICBtb250aHNMb25nOiB0aGlzLm1vbnRoc0xvbmdOYW1lc1t0aGlzLmxhbmddXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9NYXhpbXVtIHN0cmluZyBsZW5ndGguXG4gICAgICAgIHRoaXMubWF4U3RyaW5nTGVuID0gMjU1O1xuXG4gICAgICAgIC8vTWF4aW11bSBjb3VudCBvZiBkcm9wcGVkIHJlcXVlc3RzIGFmdGVyIGEgcmVxdWVzdFxuICAgICAgICAvL3dhcyBub3QgYWNrbm93bGVkZ2VkIChpbiBjb25qdW5jdGlvbiB3aXRoIGEgcmVxZXN0IElEKS5cbiAgICAgICAgdGhpcy5tYXhEcm9wUmVxID0gMTA7XG5cbiAgICAgICAgLy9DaGVjayBsaW1pdHMgb2YgbnVtZXJpYyB2YXJpYWJsZXMgYmVmb3JlIHNlbmRpbmcgdGhlbSB0byB0aGUgUExDXG4gICAgICAgIHRoaXMudXNlQ2hlY2tCb3VuZHMgPSB0cnVlO1xuXG4gICAgICAgIC8vQURTIHN0YXRlc1xuICAgICAgICB0aGlzLmFkc1N0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZHNTdGF0ZVR4dCA9ICcnO1xuICAgICAgICB0aGlzLmRldmljZVN0YXRlID0gbnVsbDtcblxuICAgICAgICAvL1JlYWR5IHN0YXRlc1xuICAgICAgICB0aGlzLnN5bVRhYmxlUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYW5kbGVDYWNoZVJlYWR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy9YTUxIdHRwUmVxdWVzdCB0aW1lb3V0XG4gICAgICAgIHRoaXMueG1sSHR0cFJlcVRpbWVvdXQgPSA1MDAwO1xuICAgIH1cblxuICAgIGFzeW5jIG9wZW4oKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIG5hbWVzIG9mIHRoZSBQTEMgdmFyaWFibGVzIHVzaW5nIHRoZSB1cGxvYWQgaW5mby5cbiAgICAgICAgICovXG4gICAgICAgIGlmICh0aGlzLnNlcnZpY2UuZG9udEZldGNoU3ltYm9scyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBSZWFkaW5nIG9mIHRoZSBVcGxvYWRJbmZvIGFuZCB0aGUgVFBZIGZpbGUgZGVhY3RpdmF0ZWQuIFN5bWJvbCBUYWJsZSBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ICE9PSAxICYmIHRoaXMuYWxpZ25tZW50ICE9PSA0ICYmIHRoaXMuYWxpZ25tZW50ICE9PSA4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBUaGUgdmFsdWUgZm9yIHRoZSBhbGlnbm1lbnQgc2hvdWxkIGJlIDEsIDQgb3IgOC4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUYXJnZXQgaW5mb3JtYXRpb246IE5ldElkOiAnICsgdGhpcy5zZXJ2aWNlLmFtc05ldElkICsgJywgQU1TIHBvcnQ6ICcgKyB0aGlzLnNlcnZpY2UuYW1zUG9ydCArICcgLCBhbGlnbm1lbnQ6ICcgKyB0aGlzLmFsaWdubWVudCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2Uuc3luY1htbEh0dHAgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLm9uUmVhZHksIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZS5jb25maWdGaWxlVXJsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBGZXRjaGluZyB0aGUgVFBZIGZpbGUgZnJvbSB0aGUgd2Vic2VydmVyLicpO1xuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBzeW1ib2wgZmlsZSBhbmQgcGFyc2UgaXQuIFVwbG9hZCBJbmZvIHdpbGwgYmUgZmV0Y2hlZCBhZnRlci5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldENvbmZpZ0ZpbGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9TdGFydCBnZXR0aW5nIHRoZSBVcGxvYWQgSW5mby5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNoZWNrR2V0VXBsb2FkSW5mbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVscGVyIEZ1bmN0aW9uc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIERlY29kZSB2YXJpYWJsZSBuYW1lcyBwYXNzZWQgYXMgc3RyaW5ncyBhbmQgcmV0dXJuIHRoZSBvYmplY3QsXG4gICAgICogc3RvcmUgZGF0YSB2YWx1ZXMgaWYgdGhleSBhcmUgcGFzc2VkIHRvby5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgICAgVGhlIG5hbWUgb2YgYSBKYXZhU2NyaXB0IHZhcmlhYmxlIG9yIGEgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgICAgIERhdGEgdmFsdWVzIHRvIHN0b3JlIGluIHRoZSB2YXJpYWJsZS9wcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqICAgICAgVGhlIG9iamVjdCBjb250YWluaW5nIHRoZSBwcm9wZXJ0eSB0byBzdG9yZSB0aGUgZGF0YSBpbi4gXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIFVzZWQgd2l0aCBjcmVhdGVBcnJheURlc2NyaXB0b3IgYW5kIGNyZWF0ZVN0cnVjdERlc2NyaXB0b3IgXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UuXG4gICAgICovXG4gICAgcGFyc2VWYXJOYW1lKG5hbWUsIGRhdGE/LCBvYmo/LCBwcmVmaXg/LCBzdWZmaXg/KSB7XG5cbiAgICAgICAgdmFyIGFyciA9IFtdLFxuICAgICAgICAgICAgbGFzdCA9IDAsXG4gICAgICAgICAgICBhID0gW10sXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBhcnJbMF0gPSBuYW1lLnRvU3RyaW5nKDEwKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGFyciA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENhblxcJ3QgcGFyc2UgbmFtZSBvZiBvYmplY3QvdmFyaWFibGUuIE5hbWUgaXMgbm90IGEgc3RyaW5nIG9yIG51bWJlciEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKG5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmogPSB3aW5kb3c7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdCA9IGFyci5sZW5ndGggLSAxO1xuXG4gICAgICAgIC8vV2FsayB0aHJvdWdoIHRoZSB0aWVyc1xuICAgICAgICB3aGlsZSAoaSA8IGxhc3QpIHtcbiAgICAgICAgICAgIC8vQ2hlY2sgaWYgdGhlIHBhc3NlZCBuYW1lIHBvaW50cyB0byBhbiBhcnJheS5cbiAgICAgICAgICAgIGlmIChhcnJbaV0uY2hhckF0KGFycltpXS5sZW5ndGggLSAxKSA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgYSA9IGFycltpXS5zdWJzdHJpbmcoMCwgYXJyW2ldLmxlbmd0aCAtIDEpLnNwbGl0KCdbJyk7XG4gICAgICAgICAgICAgICAgb2JqID0gb2JqW2FbMF1dW2FbMV1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhbiBhcnJheSBpZiBvYmplY3QgaXMgbm90IGRlZmluZWQuXG4gICAgICAgICAgICAgICAgLy9UaGlzIGNhbiBoYXBwZW4gd2hlbiBhbiBhcnJheSBvZiBzdHJ1Y3R1cmUgaXNcbiAgICAgICAgICAgICAgICAvL25vdCBkZWZpbmVkLlxuICAgICAgICAgICAgICAgIGlmIChvYmpbYXJyW2ldXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialthcnJbaV1dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iaiA9IG9ialthcnJbaV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9MYXN0IGVsZW1lbnRcbiAgICAgICAgaWYgKGFycltpXS5jaGFyQXQoYXJyW2ldLmxlbmd0aCAtIDEpID09PSAnXScpIHtcbiAgICAgICAgICAgIC8vSWYgbGFzdCBpdGVtIG9mIHRoZSBuYW1lIGlzIGFuIGFycmF5XG4gICAgICAgICAgICBhID0gYXJyW2ldLnN1YnN0cmluZygwLCBhcnJbaV0ubGVuZ3RoIC0gMSkuc3BsaXQoJ1snKTtcbiAgICAgICAgICAgIG9iaiA9IG9ialthWzBdXTtcblxuICAgICAgICAgICAgLy9TdG9yZSBkYXRhIGlmIHBhc3NlZC5cbiAgICAgICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZWZpeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHByZWZpeCArIGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3VmZml4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSArIHN1ZmZpeDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqW2FbMV1dID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmpbYVsxXV07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RvcmUgZGF0YSBpZiBwYXNzZWQuXG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJlZml4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBwcmVmaXggKyBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWZmaXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEgKyBzdWZmaXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmpbYXJyW2ldXSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ialthcnJbaV1dO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIHBhc3NlZCBzdHJpbmcgbGVuZ3RoIGlzIHZhbGlkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5cbiAgICAgKi9cbiAgICBpc1ZhbGlkU3RyaW5nTGVuKGxlbikge1xuICAgICAgICBpZiAobGVuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzTmFOKGxlbikgJiYgbGVuID4gMCAmJiBsZW4gPD0gdGhpcy5tYXhTdHJpbmdMZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFVzZXIgZGVmaW5lZCBzdHJpbmcgbGVuZ3RoIG5vdCB2YWxpZCEgbGVuZ3RoOiAnICsgbGVuKTtcbiAgICAgICAgdGhpcy5sb2coJ01heC4gc3RyaW5nIGxlbmd0aDogJyArIHRoaXMubWF4U3RyaW5nTGVuKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHJldHVybnMgdGhlIEluZGV4R3JvdXAgZm9yIGEgUExDIHZhcmlhYmxlIGFkZHJlc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlcSAgICAgICAgICBBbiBvYmplY3Qgd2l0aCB0aGUgYWRkcmVzcyBvciB0aGUgbmFtZSBmb3IgdGhlIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBpbmRleEdyb3VwICBUaGUgSW5kZXhHcm91cCBmb3IgdGhlIEFEUyByZXF1ZXN0LiBcbiAgICAgKi9cbiAgICBnZXRJbmRleEdyb3VwKHJlcSkge1xuICAgICAgICB2YXIgaW5kZXhHcm91cDtcblxuICAgICAgICBpZiAocmVxLmFkZHIpIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgSW5kZXhHcm91cCBieSBhZGRyZXNzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5hZGRyID09PSAnc3RyaW5nJyAmJiByZXEuYWRkci5jaGFyQXQoMCkgPT09ICclJykge1xuICAgICAgICAgICAgICAgIGlmIChyZXEuYWRkci5jaGFyQXQoMikgPT09ICdYJykge1xuICAgICAgICAgICAgICAgICAgICAvL0JpdCBhZGRyZXNzZXMuXG4gICAgICAgICAgICAgICAgICAgIGluZGV4R3JvdXAgPSB0aGlzLmluZGV4R3JvdXBzW3JlcS5hZGRyLnN1YnN0cigxLCAyKV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9CeXRlIGFkZHJlc3Nlcy5cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhHcm91cCA9IHRoaXMuaW5kZXhHcm91cHNbcmVxLmFkZHIuc3Vic3RyKDEsIDEpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFdyb25nIGFkZHJlc3MgZGVmaW5pdGlvbiwgc2hvdWxkIGJlIGEgc3RyaW5nIGFuZCBzdGFydCB3aXRoIFwiJVwiIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcS51c2VIYW5kbGUgPT09IHRydWUgfHwgdGhpcy5zZXJ2aWNlLnVzZUhhbmRsZXMgPT09IHRydWUgJiYgcmVxLnVzZUhhbmRsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vR2V0IHRoZSBJbmRleEdyb3VwIGZvciB0aGUgVmFsdWUgQnkgSGFuZGxlIFJlcXVlc3RcbiAgICAgICAgICAgIGluZGV4R3JvdXAgPSB0aGlzLmluZGV4R3JvdXBzLlZhbHVlQnlIYW5kbGU7XG4gICAgICAgIH0gZWxzZSBpZiAocmVxLnN5bWJvbE5hbWUpIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgSW5kZXhHcm91cCBieSBuYW1lXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5zeW1ib2xOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4R3JvdXAgPSB0aGlzLnN5bVRhYmxlW3JlcS5zeW1ib2xOYW1lXS5pbmRleEdyb3VwO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ2FuXFwndCBnZXQgdGhlIEluZGV4R3JvdXAgZm9yIHRoaXMgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGxlYXNlIGNoZWNrIHRoZSB2YXJpYWJsZSBuYW1lLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVmFyaWJsZSBuYW1lIHNob3VsZCBiZSBhIHN0cmluZyEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIG5hbWUsIGFkZHJlc3Mgb3IgaGFuZGxlIGZvciB0aGUgdmFyaWFibGUvcmVxdWVzdCBkZWZpbmVkIScpO1xuICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTihpbmRleEdyb3VwKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogSW5kZXhHcm91cCBpcyBub3QgYSBudW1iZXIsIGNoZWNrIGFkZHJlc3Mgb3IgbmFtZSBkZWZpbml0aW9uIG9mIHRoZSB2YXJpYWJsZS9yZXF1ZXN0IScpO1xuICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleEdyb3VwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHJldHVybnMgdGhlIEluZGV4T2Zmc2V0IGZvciBhIFBMQyB2YXJpYWJsZSBhZGRyZXNzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXEgICAgICAgICAgQW4gb2JqZWN0IHdpdGggdGhlIGFkZHJlc3Mgb3IgdGhlIG5hbWUgZm9yIHRoZSByZXF1ZXN0LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gaW5kZXhPZmZzZXQgVGhlIEluZGV4T2Zmc2V0IGZvciB0aGUgQURTIHJlcXVlc3QuIFxuICAgICAqL1xuICAgIGdldEluZGV4T2Zmc2V0KHJlcSkge1xuICAgICAgICB2YXIgaW5kZXhPZmZzZXQsIG51bVN0cmluZyA9ICcnLCBteGFkZHIgPSBbXSwgaSwgZGF0YVR5cGUsIGl0ZW1BcnJheSwgc3BsaXR0ZWRUeXBlLCBiaXRvZmZzLCBzdWJpdGVtO1xuXG4gICAgICAgIGlmIChyZXEuYWRkcikge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSBJbmRleE9mZnNldCBieSBhZGRyZXNzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5hZGRyID09PSAnc3RyaW5nJyAmJiByZXEuYWRkci5jaGFyQXQoMCkgPT09ICclJykge1xuICAgICAgICAgICAgICAgIGlmIChyZXEuYWRkci5jaGFyQXQoMikgPT09ICdYJykge1xuICAgICAgICAgICAgICAgICAgICAvL0JpdCByZXEuYWRkcmVzc2VzLlxuICAgICAgICAgICAgICAgICAgICBudW1TdHJpbmcgPSByZXEuYWRkci5zdWJzdHIoMyk7XG4gICAgICAgICAgICAgICAgICAgIG14YWRkciA9IG51bVN0cmluZy5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IHBhcnNlSW50KG14YWRkclswXSwgMTApICogOCArIHBhcnNlSW50KG14YWRkclsxXSwgMTApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQnl0ZSBhZGRyZXNzZXMuXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gcGFyc2VJbnQocmVxLmFkZHIuc3Vic3RyKDMpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIC8vQWRkcmVzcyBvZmZzZXQgaXMgdXNlZCBpZiBvbmx5IG9uZSBpdGVtIG9mIGFuIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIC8vc2hvdWxkIGJlIHNlbnQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLmFkZHJPZmZzZXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSByZXEuYWRkck9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogV3JvbmcgYWRkcmVzcyBkZWZpbml0aW9uLCBzaG91bGQgYmUgYSBzdHJpbmcgYW5kIHN0YXJ0IHdpdGggXCIlXCIhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVxLnVzZUhhbmRsZSA9PT0gdHJ1ZSB8fCB0aGlzLnNlcnZpY2UudXNlSGFuZGxlcyA9PT0gdHJ1ZSAmJiByZXEudXNlSGFuZGxlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSBoYW5kbGUgZm9yIHRoaXMgcmVxdWVzdFxuICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlQ2FjaGVSZWFkeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vR2V0IGhhbmRsZSBjb2RlXG4gICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSB0aGlzLmhhbmRsZUNhY2hlW3JlcS5mdWxsU3ltYm9sTmFtZV07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oaW5kZXhPZmZzZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIGhhbmRsZSBmb3IgdGhpcyBzeW1ib2wgbmFtZTogJyArIHJlcS5mdWxsU3ltYm9sTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIGhhbmRsZSBmb3IgdGhpcyByZXF1ZXN0LiBIYW5kbGUgY2FjaGUgaXMgbm90IHJlYWR5LicpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcS5zeW1ib2xOYW1lKSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIEluZGV4T2Zmc2V0IGJ5IG5hbWUuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5zeW1ib2xOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBvZmZzZXQgZnJvbSB0aGUgc3ltYm9sIHRhYmxlXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gdGhpcy5zeW1UYWJsZVtyZXEuc3ltYm9sTmFtZV0uaW5kZXhPZmZzZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuc3ltYm9sTmFtZUFycklkeCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ICs9IHRoaXMuc3ltVGFibGVbcmVxLnN5bWJvbE5hbWVdLml0ZW1TaXplICogKHJlcS5zeW1ib2xOYW1lQXJySWR4IC0gdGhpcy5zeW1UYWJsZVtyZXEuc3ltYm9sTmFtZV0uYXJyU3RhcnRJZHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9BZGRyZXNzIG9mZnNldCBpcyB1c2VkIGlmIG9ubHkgb25lIGl0ZW0gb2YgYW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgLy9zaG91bGQgYmUgc2VudC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuYWRkck9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ICs9IHJlcS5hZGRyT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vQWRkIGEgbWFudWFsbHkgZGVmaW5lZCBiaXQgb2Zmc2V0LlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5vZmZzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gcGFyc2VJbnQocmVxLm9mZnMsIDEwKSAvIDg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcS5vZmZzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gcmVxLm9mZnMgLyA4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBiaXQgb2Zmc2V0IGlmIGEgc3ViaXRlbSBpcyBnaXZlbi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS5kYXRhVHlwZU5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1BcnJheSA9IHJlcS5kYXRhVHlwZU5hbWVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgPSB0aGlzLnN5bVRhYmxlW3JlcS5zeW1ib2xOYW1lXS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR28gdGhyb3VnaCB0aGUgYXJyYXkgd2l0aCB0aGUgc3ViaXRlbXMgYW5kIGFkZCB0aGUgb2Zmc2V0c1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW1BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yml0ZW0gPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW2l0ZW1BcnJheVtpXV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gc3ViaXRlbS5iaXRPZmZzZXQgLyA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBvZmZzZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuZGF0YVR5cGVBcnJJZHhbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ICs9IHN1Yml0ZW0uaXRlbVNpemUgKiAocmVxLmRhdGFUeXBlQXJySWR4W2ldIC0gc3ViaXRlbS5hcnJTdGFydElkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBkYXRhIHR5cGUgZm9yIHRoZSBuZXh0IHJvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW2l0ZW1BcnJheVtpXV0uZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ2FuXFwndCBnZXQgdGhlIEluZGV4T2Zmc2V0IGZvciB0aGlzIHJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBsZWFzZSBjaGVjayB0aGUgdmFyaWFibGUgZGVmaW5pdGlvbiAobmFtZS9vZmZzL3N1Yml0ZW0pLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVmFyaWJsZSBuYW1lIHNob3VsZCBiZSBhIHN0cmluZyEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5laXRoZXIgYSBuYW1lIG5vciBhbiBhZGRyZXNzIGZvciB0aGUgdmFyaWFibGUvcmVxdWVzdCBkZWZpbmVkIScpO1xuICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTihpbmRleE9mZnNldCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEluZGV4T2Zmc2V0IGlzIG5vdCBhIG51bWJlciwgY2hlY2sgYWRkcmVzcyBvciBuYW1lIGRlZmluaXRpb24gb2YgdGhlIHZhcmlhYmxlL3JlcXVlc3QuJyk7XG4gICAgICAgICAgICB0aGlzLmxvZygnSW5kZXhPZmZzZXQ6ICcgKyBpbmRleE9mZnNldCk7XG4gICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4T2Zmc2V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiBwYXJzZXMgdGhlIFBMQyB2YXJpYWJsZSBuYW1lLCBsb29rcyBpbiB0aGUgc3ltYm9sIGFuZCBkYXRhIHR5cGUgdGFibGUgYW5kIFxuICAgICAqIHJldHVybnMgYW4gb2JqZWN0IHdpdGggdGhlIG5lY2Vzc2FyeSBpbmZvcm1hdGlvbi5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAgICAgICAgICBBbiBvYmplY3Qgd2l0aCBhdCBsZWFzdCB0aGUgYWRkcmVzcyBvciB0aGUgbmFtZSBmb3IgdGhlIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7T2JqZWNjdH0gaXRlbUluZm8gICAgQW4gb2JqZWN0IHdpdGggdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBpdGVtLlxuICAgICAqIFxuICAgICAqL1xuICAgIGdldEl0ZW1JbmZvcm1hdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciBpdGVtSW5mbyA9IHt9IGFzIGFueSwgYXJyUGxjVmFyTmFtZSwgc3BsaXRUeXBlO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbS5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaXRlbS5uYW1lID0gaXRlbS5uYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBhcnJQbGNWYXJOYW1lID0gaXRlbS5uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL1JldHVybiBpZiBubyBzeW1ib2wgbmFtZSBpcyBnaXZlblxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1JbmZvO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZXQgdGhlIHN5bWJvbCBuYW1lLlxuICAgICAgICBpdGVtSW5mby5mdWxsU3ltYm9sTmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgaWYgKGFyclBsY1Zhck5hbWVbMF0gPT09ICcnKSB7XG4gICAgICAgICAgICAvL0dsb2JhbCB2YXJpYWJsZVxuICAgICAgICAgICAgaXRlbUluZm8uc3ltYm9sTmFtZSA9ICcuJyArIGFyclBsY1Zhck5hbWVbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL1ZhcmlhYmxlIG9mIGFuIGluc3RhbmNlXG4gICAgICAgICAgICBpdGVtSW5mby5zeW1ib2xOYW1lID0gYXJyUGxjVmFyTmFtZVswXSArICcuJyArIGFyclBsY1Zhck5hbWVbMV07XG4gICAgICAgIH1cbiAgICAgICAgLy9DdXQgYW4gYXJyYXkgaW5kZXhcbiAgICAgICAgaWYgKGl0ZW1JbmZvLnN5bWJvbE5hbWUuY2hhckF0KGl0ZW1JbmZvLnN5bWJvbE5hbWUubGVuZ3RoIC0gMSkgPT09ICddJykge1xuICAgICAgICAgICAgLy9DdXQgdGhlIGFycmF5IGluZGV4IGFuZCBzdG9yZSBpdFxuICAgICAgICAgICAgc3BsaXRUeXBlID0gaXRlbUluZm8uc3ltYm9sTmFtZS5zdWJzdHJpbmcoMCwgaXRlbUluZm8uc3ltYm9sTmFtZS5sZW5ndGggLSAxKS5zcGxpdCgnWycpO1xuICAgICAgICAgICAgaXRlbUluZm8uc3ltYm9sTmFtZSA9IHNwbGl0VHlwZVswXTtcbiAgICAgICAgICAgIGl0ZW1JbmZvLnN5bWJvbE5hbWVBcnJJZHggPSBwYXJzZUludChzcGxpdFR5cGVbMV0sIDEwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9MZWF2ZSB0aGUgcmVzdCBhcyBhbiBhcnJheSBhbmQgYWRkIGl0IHRvIHRoZSBpdGVtSW5mb1xuICAgICAgICBpdGVtSW5mby5kYXRhVHlwZU5hbWVzID0gYXJyUGxjVmFyTmFtZS5zbGljZSgyKTtcblxuICAgICAgICB2YXIgYXJyID0gW10sIHR5cGVBcnJheSwgZGF0YVR5cGUsIGk7XG5cbiAgICAgICAgLy9HZXQgaW5mb3JtYXRpb24gZnJvbSB0aGUgdGFibGVzXG4gICAgICAgIGlmICh0aGlzLnN5bVRhYmxlUmVhZHkgJiYgdGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgJiYgaXRlbUluZm8uZGF0YVR5cGVOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIHN1Yml0ZW0gdHlwZSBmcm9tIHRoZSBzeW1ib2wgdGFibGUgJiYgZGF0YSB0eXBlIHRhYmxlXG4gICAgICAgICAgICB0eXBlQXJyYXkgPSBpdGVtSW5mby5kYXRhVHlwZU5hbWVzO1xuICAgICAgICAgICAgZGF0YVR5cGUgPSB0aGlzLnN5bVRhYmxlW2l0ZW1JbmZvLnN5bWJvbE5hbWVdLmRhdGFUeXBlO1xuICAgICAgICAgICAgaXRlbUluZm8uZGF0YVR5cGVBcnJJZHggPSBbXTtcbiAgICAgICAgICAgIC8vR28gZm9yIHRoZSBsYXN0IHN1Yml0ZW1cbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgLy9DaGVjayBpZiB0aGUgc3ViaXRlbSBpcyBhbiBhcnJheVxuICAgICAgICAgICAgICAgIGlmICh0eXBlQXJyYXlbaV0uY2hhckF0KHR5cGVBcnJheVtpXS5sZW5ndGggLSAxKSA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ3V0IHRoZSBhcnJheSBpbmRleCBhbmQgc3RvcmUgaXQgaW4gYW4gZXh0cmEgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgc3BsaXRUeXBlID0gdHlwZUFycmF5W2ldLnN1YnN0cmluZygwLCB0eXBlQXJyYXlbaV0ubGVuZ3RoIC0gMSkuc3BsaXQoJ1snKTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZUFycmF5W2ldID0gc3BsaXRUeXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5kYXRhVHlwZUFycklkeFtpXSA9IHBhcnNlSW50KHNwbGl0VHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0ucG9pbnRlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQTEMgdmFyaWFibGUgJyArIFt0eXBlQXJyYXlbaV1dICsgJyBpcyBhIHBvaW50ZXIhIENhblxcJ3QgZ2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0aGUgdHlwZSBvZiB0aGUgbmV4dCBzdWJpdGVtXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHR5cGVBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAgIH0gd2hpbGUgKGkgPCB0eXBlQXJyYXkubGVuZ3RoKTtcblxuICAgICAgICAgICAgLy9HZXQgdGhlIHR5cGUgb2YgdGhlIHN1Yml0ZW1cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBpdGVtSW5mby50eXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLnR5cGU7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uYXJyYXlMZW5ndGggPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uYXJyYXlMZW5ndGg7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5hcnJheURhdGFUeXBlO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLml0ZW1TaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLml0ZW1TaXplO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLnNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLnNpemU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbUluZm8uYml0T2Zmc2V0ID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmJpdE9mZnNldDtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5vZmZzID0gaXRlbS5vZmZzO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLnR5cGUgPT09ICdTVFJJTkcnIHx8IGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnN0cmluZ0xlbmd0aCA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDsgLy9jb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5mb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZm9ybWF0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZGVjUGxhY2VzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmRlY1BsYWNlcztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRwID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmRwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby5kYXRhVHlwZUFycklkeFtpXSAhPT0gdW5kZWZpbmVkICYmIGl0ZW1JbmZvLnR5cGUgPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8udHlwZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5hcnJheURhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLml0ZW1TaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEEgcHJvYmxlbSBvY2N1cmVkIHdoaWxlIHJlYWRpbmcgYSBkYXRhIHR5cGUgZnJvbSB0aGUgZGF0YSB0eXBlIHRhYmxlIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zeW1UYWJsZVJlYWR5KSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIHR5cGUgZnJvbSB0aGUgc3ltYm9sIHRhYmxlXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8udHlwZSA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS50eXBlO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheUxlbmd0aCA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5hcnJheUxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5hcnJheURhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5kYXRhVHlwZSA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uaXRlbVNpemUgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uaXRlbVNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLnNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc2l6ZSA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5zaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uYml0T2Zmc2V0ID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmJpdE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8ub2ZmcyA9IGl0ZW0ub2ZmcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8udHlwZSA9PT0gJ1NUUklORycgfHwgaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnN0cmluZ0xlbmd0aCA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7IC8vY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRlY1BsYWNlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZGVjUGxhY2VzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRwID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5kcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby5zeW1ib2xOYW1lQXJySWR4ICE9PSB1bmRlZmluZWQgJiYgaXRlbUluZm8udHlwZSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8udHlwZSA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5hcnJheURhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc2l6ZSA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5pdGVtU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBIHByb2JsZW0gb2NjdXJlZCB3aGlsZSByZWFkaW5nIGEgZGF0YSB0eXBlIGZyb20gdGhlIHN5bWJvbCB0YWJsZSEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnR5cGUgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTmVpdGhlciBhbiBlbnRyeSBmb3IgdGhpcyBzeW1ib2wgaW4gdGhlIHN5bWJvbCB0YWJsZSBub3IgdGhlIHR5cGUgZGVmaW5lZCBieSB1c2VyIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vT3ZlcnJpZGUgdHlwZSBpZiBkZWZpbmVkIGJ5IHVzZXJcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vVHlwZSBpcyBkZWZpbmVkIGJ5IHVzZXIsIHRyeSB0byBzcGxpdCBpdFxuICAgICAgICAgICAgYXJyID0gaXRlbS50eXBlLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAvL0pvaW4gdGhlIGZvcm1hdHRpbmcgc3RyaW5nIGlmIHRoZXJlIHdlcmUgcG9pbnRzIGluIGl0LlxuICAgICAgICAgICAgICAgIGFyclsxXSA9IGFyci5zbGljZSgxKS5qb2luKCcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1NldCB0aGUgdXNlciBkZWZpbmVkIHR5cGUgaWYgaXQncyBub3QgYW4gYXJyYXkgb3Igc3RydWN0dXJlXG4gICAgICAgICAgICBpZiAoaXRlbUluZm8udHlwZSAhPT0gJ0FSUkFZJyAmJiBpdGVtSW5mby50eXBlICE9PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby50eXBlID0gYXJyWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9UeXBlIGRlcGVuZGluZyBjb2RlXG4gICAgICAgICAgICBpZiAoaXRlbUluZm8udHlwZSA9PT0gJ1NUUklORycgJiYgYXJyWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhcnJbMV0gPSBwYXJzZUludChhcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKGFyclsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gYXJyWzFdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zdHJpbmdMZW5ndGggPSBpdGVtSW5mby5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnNpemUgPSBpdGVtSW5mby5mb3JtYXQrKzsgLy9UZXJtaW5hdGlvblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IHRoaXMucGxjVHlwZUxlbi5TVFJJTkc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogTGVuZ3RoIG9mIHN0cmluZyB2YXJpYWJsZSBub3QgZGVmaW5lZDogJyArIGl0ZW0ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogQSBsZW5ndGggb2YgODAgY2hhcmFjdGVycyAoVHdpbkNBVCBkZWZhdWx0KSB3aWxsIGJlIHVzZWQuJyk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbUluZm8udHlwZSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgIC8vUXVpY2sgYW5kIGRpcnR5XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9IGFyclswXTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBhcnJbMV07XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheUxlbmd0aCA9IGRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uYXJyYXlMZW5ndGg7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9IGRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uYXJyYXlEYXRhVHlwZTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5kYXRhVHlwZSA9IGRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uaXRlbVNpemUgPSBkYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLml0ZW1TaXplO1xuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1JbmZvLnR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgTWF5YmUgaW4gYSBmdXR1cmUgdmVyc2lvbi5cbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBhcnJbMV07XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uc2l6ZSA9IHRoaXMucGxjVHlwZUxlbltpdGVtSW5mby50eXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vT3ZlcnJpZGUgZm9ybWF0IGlmIGV4dHJhIGluZm9ybWF0aW9uIGlzIGdpdmVuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZm9ybWF0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kZWNQbGFjZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5kZWNQbGFjZXM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRwID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgdGhpcy5sb2coJ2l0ZW0nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5sb2coJ2l0ZW1JbmZvJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtSW5mbyk7XG4gICAgICAgICAgICAqL1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtSW5mby50eXBlICE9ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSB0eXBlIG9mIHRoZSBpdGVtIScpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICB0aGlzLmxvZygnaXRlbUluZm8nKTtcbiAgICAgICAgdGhpcy5sb2coaXRlbUluZm8pO1xuICAgICAgICAqL1xuXG4gICAgICAgIHJldHVybiBpdGVtSW5mbztcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGEgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0LlxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge09iamVjdH0geG1sSHR0cFJlcSAgQSBYTUxIdHRwUmVxdWVzdC5cbiAgICAgKi9cbiAgICBjcmVhdGVYTUxIdHRwUmVxKCkge1xuICAgICAgICB2YXIgeG1sSHR0cFJlcTtcblxuICAgICAgICBpZiAod2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0LlxuICAgICAgICAgICAgLy9Nb3ppbGxhLCBPcGVyYSwgU2FmYXJpIGFuZCBJbnRlcm5ldCBFeHBsb3JlciAoPiB2NylcbiAgICAgICAgICAgIHhtbEh0dHBSZXEgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0ludGVybmV0IEV4cGxvcmVyIDYgYW5kIG9sZGVyXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHhtbEh0dHBSZXEgPSBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgeG1sSHR0cFJlcSA9IG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgICAgICB4bWxIdHRwUmVxID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogRmFpbGVkIENyZWF0aW5nIFhNTEh0dHBSZXF1ZXN0LU9iamVjdCEnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhtbEh0dHBSZXE7XG4gICAgfVxuXG5cbiAgICBhZHNSZXFTZW5kKGFkc1JlcSkge1xuXG4gICAgICAgIHZhciBzb2FwUmVxO1xuXG4gICAgICAgIC8vQ2FuY2VsIHRoZSByZXF1ZXN0LCBpZiB0aGUgbGFzdCBvbiB3aXRoIHRoZSBzYW1lIElEIGlzIG5vdCBmaW5pc2hlZC5cbiAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3IuaWQgPT09ICdudW1iZXInICYmIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdID4gMCkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBSZXF1ZXN0IGRyb3BwZWQgKGxhc3QgcmVxdWVzdCB3aXRoIElEICcgKyBhZHNSZXEucmVxRGVzY3IuaWQgKyAnIG5vdCBmaW5pc2hlZCEpJyk7XG4gICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSsrO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdIDw9IHRoaXMubWF4RHJvcFJlcSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vQXV0b21hdGljIGFja25vd2xlZGluZyBhZnRlciBhIGNvdW50IG9mICdtYXhEcm9wUmVxJyB0b1xuICAgICAgICAgICAgLy9wcmV2ZW50IHN0dWNraW5nLlxuICAgICAgICAgICAgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPSAwO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL0NyZWF0ZSB0aGUgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0LlxuICAgICAgICB0aGlzLnhtbEh0dHBSZXEgPSB0aGlzLmNyZWF0ZVhNTEh0dHBSZXEoKTtcblxuICAgICAgICAvL0dlbmVyYXRlIHRoZSBTT0FQIHJlcXVlc3QuXG4gICAgICAgIHNvYXBSZXEgPSAnPD94bWwgdmVyc2lvbj1cXCcxLjBcXCcgZW5jb2Rpbmc9XFwndXRmLThcXCc/Pic7XG4gICAgICAgIHNvYXBSZXEgKz0gJzxzb2FwOkVudmVsb3BlIHhtbG5zOnhzaT1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVxcJyAnO1xuICAgICAgICBzb2FwUmVxICs9ICd4bWxuczp4c2Q9XFwnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWFcXCcgJztcbiAgICAgICAgc29hcFJlcSArPSAneG1sbnM6c29hcD1cXCdodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy9zb2FwL2VudmVsb3BlL1xcJz4nO1xuICAgICAgICBzb2FwUmVxICs9ICc8c29hcDpCb2R5PjxxMTonO1xuICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5tZXRob2Q7XG4gICAgICAgIHNvYXBSZXEgKz0gJyB4bWxuczpxMT1cXCdodHRwOi8vYmVja2hvZmYub3JnL21lc3NhZ2UvXFwnPjxuZXRJZCB4c2k6dHlwZT1cXCd4c2Q6c3RyaW5nXFwnPic7XG4gICAgICAgIHNvYXBSZXEgKz0gdGhpcy5zZXJ2aWNlLmFtc05ldElkO1xuICAgICAgICBzb2FwUmVxICs9ICc8L25ldElkPjxuUG9ydCB4c2k6dHlwZT1cXCd4c2Q6aW50XFwnPic7XG4gICAgICAgIHNvYXBSZXEgKz0gdGhpcy5zZXJ2aWNlLmFtc1BvcnQ7XG4gICAgICAgIHNvYXBSZXEgKz0gJzwvblBvcnQ+JztcblxuICAgICAgICBpZiAoYWRzUmVxLmluZGV4R3JvdXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPGluZGV4R3JvdXAgeHNpOnR5cGU9XFwneHNkOnVuc2lnbmVkSW50XFwnPic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5pbmRleEdyb3VwO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9pbmRleEdyb3VwPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkc1JlcS5pbmRleE9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8aW5kZXhPZmZzZXQgeHNpOnR5cGU9XFwneHNkOnVuc2lnbmVkSW50XFwnPic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5pbmRleE9mZnNldDtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvaW5kZXhPZmZzZXQ+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGFkc1JlcS5tZXRob2QgPT09ICdSZWFkJyB8fCBhZHNSZXEubWV0aG9kID09PSAnUmVhZFdyaXRlJykgJiYgYWRzUmVxLnJlcURlc2NyLnJlYWRMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8Y2JSZExlbiB4c2k6dHlwZT1cXCd4c2Q6aW50XFwnPic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5yZXFEZXNjci5yZWFkTGVuZ3RoO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9jYlJkTGVuPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkc1JlcS5wRGF0YSAmJiBhZHNSZXEucERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPHBEYXRhIHhzaTp0eXBlPVxcJ3hzZDpiYXNlNjRCaW5hcnlcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnBEYXRhO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9wRGF0YT4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZHNSZXEucHdyRGF0YSAmJiBhZHNSZXEucHdyRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8cHdyRGF0YSB4c2k6dHlwZT1cXCd4c2Q6YmFzZTY0QmluYXJ5XFwnPic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5wd3JEYXRhO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9wd3JEYXRhPic7XG4gICAgICAgIH1cbiAgICAgICAgc29hcFJlcSArPSAnPC9xMTonO1xuICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5tZXRob2Q7XG4gICAgICAgIHNvYXBSZXEgKz0gJz48L3NvYXA6Qm9keT48L3NvYXA6RW52ZWxvcGU+JztcblxuICAgICAgICAvL1NlbmQgdGhlIEFKQVggcmVxdWVzdC5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnhtbEh0dHBSZXEgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5vcGVuKCdQT1NUJywgdGhpcy5zZXJ2aWNlLnNlcnZpY2VVcmwsIHRydWUsIHRoaXMuc2VydmljZS5zZXJ2aWNlVXNlciwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VQYXNzd29yZCk7XG5cbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdTT0FQQWN0aW9uJywgJ2h0dHA6Ly9iZWNraG9mZi5vcmcvYWN0aW9uL1RjQWRzU3luYy4nICsgYWRzUmVxLm1ldGhvZCk7XG4gICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQveG1sOyBjaGFyc2V0PXV0Zi04Jyk7XG5cbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS50aW1lb3V0ID0gdGhpcy54bWxIdHRwUmVxVGltZW91dDtcbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5vbnRpbWVvdXQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFhNTEh0dHBSZXF1ZXN0IHRpbWVkIG91dC4gVGltZW91dCAnICsgdGhpcy54bWxIdHRwUmVxVGltZW91dCArICcgbWlsbGlzZWNvbmRzLicpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm90ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vb24gdGltZW91dCBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnhtbEh0dHBSZXEucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54bWxIdHRwUmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlcXVlc3QgT0tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VSZXNwb25zZShhZHNSZXEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXF1ZXN0IGZhaWxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogWE1MSHR0cFJlcXVlc3QgcmV0dXJucyBhbiBlcnJvci4gU3RhdHVzIGNvZGUgOiAnICsgdGhpcy54bWxIdHRwUmVxLnN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vb24gZXJyb3IgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEuc2VuZChzb2FwUmVxKTtcblxuICAgICAgICAgICAgLy9SZXF1ZXN0IHdpdGggaW5kZXggJ2lkJyBzZW50LlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3IuaWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgYWRzUmVxU2VuZEFzeW5jKGFkc1JlcSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHZhciBzb2FwUmVxO1xuXG4gICAgICAgICAgICAvL0NhbmNlbCB0aGUgcmVxdWVzdCwgaWYgdGhlIGxhc3Qgb24gd2l0aCB0aGUgc2FtZSBJRCBpcyBub3QgZmluaXNoZWQuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5pZCA9PT0gJ251bWJlcicgJiYgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBSZXF1ZXN0IGRyb3BwZWQgKGxhc3QgcmVxdWVzdCB3aXRoIElEICcgKyBhZHNSZXEucmVxRGVzY3IuaWQgKyAnIG5vdCBmaW5pc2hlZCEpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0rKztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPD0gdGhpcy5tYXhEcm9wUmVxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9BdXRvbWF0aWMgYWNrbm93bGVkaW5nIGFmdGVyIGEgY291bnQgb2YgJ21heERyb3BSZXEnIHRvXG4gICAgICAgICAgICAgICAgLy9wcmV2ZW50IHN0dWNraW5nLlxuICAgICAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdID0gMDtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0LlxuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxID0gdGhpcy5jcmVhdGVYTUxIdHRwUmVxKCk7XG5cbiAgICAgICAgICAgIC8vR2VuZXJhdGUgdGhlIFNPQVAgcmVxdWVzdC5cbiAgICAgICAgICAgIHNvYXBSZXEgPSAnPD94bWwgdmVyc2lvbj1cXCcxLjBcXCcgZW5jb2Rpbmc9XFwndXRmLThcXCc/Pic7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8c29hcDpFbnZlbG9wZSB4bWxuczp4c2k9XFwnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2VcXCcgJztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJ3htbG5zOnhzZD1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYVxcJyAnO1xuICAgICAgICAgICAgc29hcFJlcSArPSAneG1sbnM6c29hcD1cXCdodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy9zb2FwL2VudmVsb3BlL1xcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPHNvYXA6Qm9keT48cTE6JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLm1ldGhvZDtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJyB4bWxuczpxMT1cXCdodHRwOi8vYmVja2hvZmYub3JnL21lc3NhZ2UvXFwnPjxuZXRJZCB4c2k6dHlwZT1cXCd4c2Q6c3RyaW5nXFwnPic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IHRoaXMuc2VydmljZS5hbXNOZXRJZDtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvbmV0SWQ+PG5Qb3J0IHhzaTp0eXBlPVxcJ3hzZDppbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gdGhpcy5zZXJ2aWNlLmFtc1BvcnQ7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L25Qb3J0Pic7XG5cbiAgICAgICAgICAgIGlmIChhZHNSZXEuaW5kZXhHcm91cCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPGluZGV4R3JvdXAgeHNpOnR5cGU9XFwneHNkOnVuc2lnbmVkSW50XFwnPic7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEuaW5kZXhHcm91cDtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8L2luZGV4R3JvdXA+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhZHNSZXEuaW5kZXhPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxpbmRleE9mZnNldCB4c2k6dHlwZT1cXCd4c2Q6dW5zaWduZWRJbnRcXCc+JztcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5pbmRleE9mZnNldDtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8L2luZGV4T2Zmc2V0Pic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKGFkc1JlcS5tZXRob2QgPT09ICdSZWFkJyB8fCBhZHNSZXEubWV0aG9kID09PSAnUmVhZFdyaXRlJykgJiYgYWRzUmVxLnJlcURlc2NyLnJlYWRMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPGNiUmRMZW4geHNpOnR5cGU9XFwneHNkOmludFxcJz4nO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnJlcURlc2NyLnJlYWRMZW5ndGg7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPC9jYlJkTGVuPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWRzUmVxLnBEYXRhICYmIGFkc1JlcS5wRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPHBEYXRhIHhzaTp0eXBlPVxcJ3hzZDpiYXNlNjRCaW5hcnlcXCc+JztcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5wRGF0YTtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8L3BEYXRhPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWRzUmVxLnB3ckRhdGEgJiYgYWRzUmVxLnB3ckRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxwd3JEYXRhIHhzaTp0eXBlPVxcJ3hzZDpiYXNlNjRCaW5hcnlcXCc+JztcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5wd3JEYXRhO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvcHdyRGF0YT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9xMTonO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEubWV0aG9kO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPjwvc29hcDpCb2R5Pjwvc29hcDpFbnZlbG9wZT4nO1xuXG4gICAgICAgICAgICAvL1NlbmQgdGhlIEFKQVggcmVxdWVzdC5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy54bWxIdHRwUmVxID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLm9wZW4oJ1BPU1QnLCB0aGlzLnNlcnZpY2Uuc2VydmljZVVybCwgdHJ1ZSwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VVc2VyLCB0aGlzLnNlcnZpY2Uuc2VydmljZVBhc3N3b3JkKTtcblxuICAgICAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdTT0FQQWN0aW9uJywgJ2h0dHA6Ly9iZWNraG9mZi5vcmcvYWN0aW9uL1RjQWRzU3luYy4nICsgYWRzUmVxLm1ldGhvZCk7XG4gICAgICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbDsgY2hhcnNldD11dGYtOCcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnRpbWVvdXQgPSB0aGlzLnhtbEh0dHBSZXFUaW1lb3V0O1xuICAgICAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5vbnRpbWVvdXQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBYTUxIdHRwUmVxdWVzdCB0aW1lZCBvdXQuIFRpbWVvdXQgJyArIHRoaXMueG1sSHR0cFJlcVRpbWVvdXQgKyAnIG1pbGxpc2Vjb25kcy4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm90ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL29uIHRpbWVvdXQgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54bWxIdHRwUmVxLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnhtbEh0dHBSZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlcXVlc3QgT0sgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMucGFyc2VSZXNwb25zZShhZHNSZXEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlcXVlc3QgZmFpbGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogWE1MSHR0cFJlcXVlc3QgcmV0dXJucyBhbiBlcnJvci4gU3RhdHVzIGNvZGUgOiAnICsgdGhpcy54bWxIdHRwUmVxLnN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vbiBlcnJvciBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdUQU1FIGxpYnJhcnkgZXJyb3I6IFhNTEh0dHBSZXF1ZXN0IHJldHVybnMgYW4gZXJyb3IuIFN0YXR1cyBjb2RlIDogJyArIHRoaXMueG1sSHR0cFJlcS5zdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5zZW5kKHNvYXBSZXEpO1xuXG4gICAgICAgICAgICAgICAgLy9SZXF1ZXN0IHdpdGggaW5kZXggJ2lkJyBzZW50LlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLmlkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgb2JqZWN0cyBmb3IgU09BUCBhbmQgWE1MSHR0cFJlcXVlc3QgYW5kIHNlbmQgdGhlIHJlcXVlc3QuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIFRoZSBvYmplY3QgY29udGFpbmluZyB0aGUgYXJndW1lbnRzIG9mIHRoZSBBRFMgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBjcmVhdGVSZXF1ZXN0KGFkc1JlcSkge1xuXG4gICAgICAgIGlmIChhZHNSZXEucmVxRGVzY3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAoYWRzUmVxLnJlcURlc2NyLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhhZHNSZXEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRzUmVxLnNlbmQgPSAoKSA9PiB0aGlzLmFkc1JlcVNlbmQoYWRzUmVxKVxuICAgICAgICByZXR1cm4gYWRzUmVxO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gZm9yIGNoZWNraW5nIHRoZSBpbnB1dCB2YWx1ZXMgd2hlbiB3cml0aW5nIG51bWVyaWMgUExDIHZhcmlhYmxlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1pblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhcbiAgICAgKi9cbiAgICBjaGVja1ZhbHVlKGl0ZW06IHsgdmFsOiBzdHJpbmcgfSwgdHlwZTogc3RyaW5nLCBtaW46IHN0cmluZyB8IG51bWJlciwgbWF4OiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdmFyIHZhbDtcblxuICAgICAgICAvL1Rlc3QgaWYgdmFsdWUgaXMgdmFsaWQuXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbS52YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ1JFQUwnIHx8IHR5cGUgPT09ICdMUkVBTCcpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBwYXJzZUZsb2F0KGl0ZW0udmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsID0gcGFyc2VJbnQoaXRlbS52YWwsIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS52YWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2YWwgPSBpdGVtLnZhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFdyb25nIHZhcmlhYmxlIHR5cGUgZm9yIGEgbnVtZXJpYyB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IScpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVmFyaWFibGUgdHlwZSBzaG91bGQgYmUgbnVtYmVyIG9yIHN0cmluZywgYnV0IGlzICcgKyB0eXBlb2YgaXRlbS52YWwpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBWYWx1ZSBvZiBhIG51bWVyaWMgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCBpcyBub3QgYSBudW1iZXIuJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hlY2sgYm91bmRzXG4gICAgICAgIGlmICh0aGlzLnVzZUNoZWNrQm91bmRzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ0xSRUFMJykge1xuICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IExpbWl0IGZvciBMUkVBTCB2YWx1ZSBleGNlZWRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1VwcGVyIGxpbWl0OiAnICsgTnVtYmVyLk1BWF9WQUxVRSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdMb3dlciBsaW1pdDogJyArIE51bWJlci5NSU5fVkFMVUUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdSRUFMJykge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPCAxLjE3NTQ5NWUtMzgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogTG93ZXIgbGltaXQgZm9yIHBvc2l0aXZlIFJFQUwgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGltaXQ6IDEuMTc1NDk1ZS0zOCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gMS4xNzU0OTVlLTM4O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA+IDMuNDAyODIzZSszOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBVcHBlciBsaW1pdCBmb3IgcG9zaXRpdmUgUkVBTCB2YWx1ZSBleGNlZWRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaW1pdDogMy40MDI4MjNlKzM4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSAzLjQwMjgyM2UrMzg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA+IC0xLjE3NTQ5NWUtMzgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVXBwZXIgbGltaXQgZm9yIG5lZ2F0aXZlIFJFQUwgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGltaXQ6IC0xLjE3NTQ5NWUtMzgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IC0xLjE3NTQ5NWUtMzg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsIDwgLTMuNDAyODIzZSszOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMb3dlciBsaW1pdCBmb3IgbmVnYXRpdmUgUkVBTCB2YWx1ZSBleGNlZWRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaW1pdDogLTMuNDAyODIzZSszOCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gLTMuNDAyODIzZSszODtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IG1pbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IExvd2VyIGxpbWl0IGZvciBudW1lcmljIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndHlwZTogJyArIHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGltaXQ6ICcgKyBtaW4pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gbWluO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWwgPiBtYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBVcHBlciBsaW1pdCBmb3IgbnVtZXJpYyB2YWx1ZSBleGNlZWRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3R5cGU6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAnICsgbWF4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IG1heDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHR5cGUgYW5kIGZvcm1hdCBhbmQgcmV0dXJuIGl0IGluIGFuIGFycmF5LiBDcmVhdGUgYW5cbiAgICAgKiBpdGVtLnR5cGUgZW50cnkgaWYgaXQgZG9lc24ndCBleGlzdC4gXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gICAgIEFuIGl0ZW0gb2YgYSB2YXJpYWJsZSBsaXN0LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBhcnIgICAgICBBbiBhcnJheSB3aXRoIHR5cGUgYW5kIGZvcm1hdC4gXG4gICAgICovXG4gICAgZ2V0VHlwZUFuZEZvcm1hdChpdGVtKSB7XG4gICAgICAgIHZhciBhcnIgPSBbXSwgdHlwZUFycmF5LCBkYXRhVHlwZSwgaTtcblxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0udHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vVHlwZSBpcyBkZWZpbmVkXG4gICAgICAgICAgICBhcnIgPSBpdGVtLnR5cGUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIC8vSm9pbiB0aGUgZm9ybWF0dGluZyBzdHJpbmcgaWYgdGhlcmUgd2VyZSBwb2ludHMgaW4gaXQuXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gYXJyLnNsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIHR5cGUgb2YgdGhlIGl0ZW0gKGZ1bmN0aW9uIGdldFR5cGVBbmRGb3JtYXQoKSkhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHN0cnVjdHVyZSBkZWZpbml0aW9uIGJhc2VkIG9uIHRoZSBpbmZvcm1hdGlvbiBpbiB0aGUgZGF0YSB0YWJsZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIHN0cnVjdG5hbWUgIFRoZSBuYW1lIG9mIHRoZSBzdHJ1Y3R1cmUgaW4gdGhlIGRhdGEgdGFibGUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBzdHJ1Y3QgICAgICBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgaXRlbXMgb2YgdGhlIHN0cnVjdHVyZS4gXG4gICAgICovXG4gICAgY3JlYXRlU3RydWN0RGVmKHN0cnVjdG5hbWUpIHtcbiAgICAgICAgdmFyIHN0cnVjdCA9IHt9LCBzdWJpdGVtLCBzdWJpdGVtcztcblxuICAgICAgICBzdWJpdGVtcyA9IHRoaXMuZGF0YVR5cGVUYWJsZVtzdHJ1Y3RuYW1lXS5zdWJJdGVtcztcblxuICAgICAgICBmb3IgKHN1Yml0ZW0gaW4gc3ViaXRlbXMpIHtcbiAgICAgICAgICAgIGlmIChzdWJpdGVtc1tzdWJpdGVtXS50eXBlID09PSBcIlVTRVJcIikge1xuICAgICAgICAgICAgICAgIC8vQ3JlYXRpbmcgYSBuZXN0ZWQgc3RydWN0dWUgZGVmaW5pdGlvbiB3b3JrcywgYnV0IHBhcnNpbmcgZG9lc24ndFxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEF1dG9tYXRpYyBjcmVhdGluZyBvZiBuZXN0ZWQgc3RydWN0dXJlcyBpcyBub3Qgc3VwcG9ydGVkICh5ZXQpIScpO1xuICAgICAgICAgICAgICAgIHN0cnVjdFtzdWJpdGVtXSA9IHRoaXMuY3JlYXRlU3RydWN0RGVmKHN1Yml0ZW1zW3N1Yml0ZW1dLmRhdGFUeXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Yml0ZW1zLmhhc093blByb3BlcnR5KHN1Yml0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cnVjdFtzdWJpdGVtXSA9IHN1Yml0ZW1zW3N1Yml0ZW1dLmZ1bGxUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RydWN0O1xuICAgIH1cblxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5jb2RlciBGdW5jdGlvbnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJzaW9uIG9mIEFTQ0lJKDAtOSwgYS1mLCBBLUYpIGNoYXJjb2RlcyB0byBudW1iZXJzIDAtMTVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY2hhcmNvZGVcbiAgICAgKi9cbiAgICBjaGFyY29kZVRvRHVhbChjaGFyY29kZSkge1xuICAgICAgICBpZiAoKGNoYXJjb2RlID49IDB4NjEpICYmIChjaGFyY29kZSA8PSAweDY2KSkge1xuICAgICAgICAgICAgcmV0dXJuIChjaGFyY29kZSAtIDB4NTcpOyAgLy9hLWZcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGNoYXJjb2RlID49IDB4NDEpICYmIChjaGFyY29kZSA8PSAweDQ2KSkge1xuICAgICAgICAgICAgcmV0dXJuIChjaGFyY29kZSAtIDB4MzcpOyAgLy9BLUZcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGNoYXJjb2RlID49IDB4MzApICYmIChjaGFyY29kZSA8PSAweDM5KSkge1xuICAgICAgICAgICAgcmV0dXJuIChjaGFyY29kZSAtIDB4MzApOyAgLy8wLTlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgbnVtYmVyIGludG8gYW4gYXJyYXkgb2YgYnl0ZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhcmxlblxuICAgICAqL1xuICAgIG51bVRvQnl0ZUFycih2YWx1ZSwgdmFybGVuKSB7XG4gICAgICAgIHZhciBieXRlcyA9IFtdLFxuICAgICAgICAgICAgaGV4ID0gdmFsdWUudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICB3aGlsZSAoaGV4Lmxlbmd0aCA8IHZhcmxlbiAqIDIpIHtcbiAgICAgICAgICAgIGhleCA9ICcwJyArIGhleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB2YXJsZW47IGkrKykge1xuICAgICAgICAgICAgYnl0ZXNbKHZhcmxlbiAtIDEpIC0gaV0gPVxuICAgICAgICAgICAgICAgICgodGhpcy5jaGFyY29kZVRvRHVhbChoZXguY2hhckNvZGVBdChpICogMikpICogMTYpICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyY29kZVRvRHVhbChoZXguY2hhckNvZGVBdCgoaSAqIDIpICsgMSkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIEphdmFTY3JpcHQgZmxvYXRpbmcgcG9pbnQgbnVtYmVyIHRvIGEgUExDIFJFQUwgdmFsdWUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG51bVxuICAgICAqL1xuICAgIGZsb2F0VG9SZWFsKG51bSkge1xuXG4gICAgICAgIHZhciBtYW50ID0gMCxcbiAgICAgICAgICAgIHJlYWwgPSAwLFxuICAgICAgICAgICAgYmFzLCBhYnMsIHRtcCwgZXhwLCBpO1xuXG4gICAgICAgIGFicyA9IE1hdGguYWJzKG51bSk7XG5cbiAgICAgICAgaWYgKG51bSAhPT0gMCkge1xuICAgICAgICAgICAgLy9GaW5kIGV4cG9uZW50IGFuZCBiYXNlLlxuICAgICAgICAgICAgZm9yIChpID0gMTI4OyBpID4gLTEyNzsgaS0tKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gYWJzIC8gTWF0aC5wb3coMiwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKHRtcCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBleHAgPSBpO1xuICAgICAgICAgICAgICAgIGJhcyA9IHRtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cCArPSAxMjc7XG4gICAgICAgICAgICBiYXMgPSBiYXMudG9TdHJpbmcoMik7XG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgbWFudGlzc2EuXG4gICAgICAgICAgICBmb3IgKGkgPSAyOyBpIDwgMjU7IGkrKykge1xuICAgICAgICAgICAgICAgIG1hbnQgPDw9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGJhcy5jaGFyQXQoaSkgPT09ICcxJykge1xuICAgICAgICAgICAgICAgICAgICBtYW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJhcy5jaGFyQXQoMjUpID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICBtYW50ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgUkVBTCB2YWx1ZS5cbiAgICAgICAgICAgIHJlYWwgPSBleHA7IC8vZXhwb25lbnRcbiAgICAgICAgICAgIHJlYWwgPDw9IDIzO1xuICAgICAgICAgICAgcmVhbCArPSBtYW50OyAvL21hbnRpc3NhXG4gICAgICAgICAgICBpZiAobnVtIDwgMCkge1xuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIG5lZ2F0aXZlIHNpZ24uXG4gICAgICAgICAgICAgICAgcmVhbCArPSAyMTQ3NDgzNjQ4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0IGEgSmF2YVNjcmlwdCBmbG9hdGluZyBwb2ludCBudW1iZXIgdG8gYSBQTEMgTFJFQUwgdmFsdWUuXG4gICAgICAgICAqIENhdXNlIGl0J3MgYSA2NCBiaXQgdmFsdWUsIHdlIGhhdmUgdG8gc3BsaXQgaXQgaW4gdHdvIDMyIGJpdCBpbnRlZ2VyLlxuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG51bVxuICAgICAgICAgKi9cbiAgICBmbG9hdFRvTHJlYWwobnVtKSB7XG4gICAgICAgIHZhciBtYW50ID0gMCxcbiAgICAgICAgICAgIG1hbnQyID0gMCxcbiAgICAgICAgICAgIGxyZWFsID0ge1xuICAgICAgICAgICAgICAgIHBhcnQxOiAwLFxuICAgICAgICAgICAgICAgIHBhcnQyOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWJzLCB0bXAsIGV4cCwgZmlyc3RiaXQsIGJhcywgaTtcblxuICAgICAgICBhYnMgPSBNYXRoLmFicyhudW0pO1xuXG4gICAgICAgIGlmIChudW0gIT09IDApIHtcbiAgICAgICAgICAgIC8vRmluZCBleHBvbmVudCBhbmQgYmFzZS5cbiAgICAgICAgICAgIGZvciAoaSA9IDEwMjQ7IGkgPj0gLTEwMjM7IGktLSkge1xuICAgICAgICAgICAgICAgIHRtcCA9IGFicyAvIE1hdGgucG93KDIsIGkpO1xuICAgICAgICAgICAgICAgIGlmICh0bXAgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhwID0gaTtcbiAgICAgICAgICAgICAgICBiYXMgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHAgKz0gMTAyMztcbiAgICAgICAgICAgIGJhcyA9IGJhcy50b1N0cmluZygyKTtcbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBtYW50aXNzYS5cbiAgICAgICAgICAgIGZvciAoaSA9IDI7IGkgPCAyMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbWFudCA8PD0gMTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzLmNoYXJBdChpKSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hbnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmFzLmNoYXJBdChpKSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgZmlyc3RiaXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgZm9yIChpOyBpIDwgNTQ7IGkrKykge1xuICAgICAgICAgICAgICAgIG1hbnQyIDw8PSAxO1xuICAgICAgICAgICAgICAgIGlmIChiYXMuY2hhckF0KGkpID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFudDIgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgTFJFQUwgdmFsdWUuXG4gICAgICAgICAgICBscmVhbC5wYXJ0MSA9IGV4cDsgLy9leHBvbmVudFxuICAgICAgICAgICAgbHJlYWwucGFydDEgPDw9IDIwO1xuICAgICAgICAgICAgbHJlYWwucGFydDEgKz0gbWFudDsgLy9tYW50aXNzYVxuICAgICAgICAgICAgaWYgKG51bSA8IDApIHtcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBuZWdhdGl2ZSBzaWduLlxuICAgICAgICAgICAgICAgIGxyZWFsLnBhcnQxICs9IDIxNDc0ODM2NDg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBscmVhbC5wYXJ0MiA9IG1hbnQyO1xuICAgICAgICAgICAgaWYgKGZpcnN0Yml0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgbHJlYWwucGFydDIgKz0gMjE0NzQ4MzY0ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbHJlYWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIHZhbHVlIHRvIHZhbHVlIGluIG1pbGxpc2Vjb25kcywgZGVwZW5kaW5nXG4gICAgICogb24gdGhlIGZvcm1hdCBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gICAgICovXG4gICAgdG9NaWxsaXNlYyh0aW1lLCBmb3JtYXQpIHtcbiAgICAgICAgdmFyIHRtcDtcbiAgICAgICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgICAgIGNhc2UgJyNkJzpcbiAgICAgICAgICAgIGNhc2UgJyNkZCc6XG4gICAgICAgICAgICAgICAgdG1wID0gdGltZSAqIDg2NDAwMDAwOy8vZGF5c1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnI2gnOlxuICAgICAgICAgICAgY2FzZSAnI2hoJzpcbiAgICAgICAgICAgICAgICB0bXAgPSB0aW1lICogMzYwMDAwMDsgLy9ob3Vyc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnI20nOlxuICAgICAgICAgICAgY2FzZSAnI21tJzpcbiAgICAgICAgICAgICAgICB0bXAgPSB0aW1lICogNjAwMDA7ICAgLy9taW51dGVzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcjcyc6XG4gICAgICAgICAgICBjYXNlICcjc3MnOlxuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgKiAxMDAwOyAgICAvL3NlY29uZHNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJyNtcyc6XG4gICAgICAgICAgICBjYXNlICcjbXNtc21zJzogICAgICAgICAgIC8vbWlsbGlzZWNvbmRzXG4gICAgICAgICAgICAgICAgdG1wID0gdGltZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdG1wID0gdGltZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG1wO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBUT0Qgc3RyaW5nIHRvIGEgdmFsdWUgb2YgbWlsbGlzZWNvbmRzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHN0cmluZ1RvVGltZSh0aW1lc3RyaW5nLCBmb3JtYXQpIHtcbiAgICAgICAgdmFyIGFyckZvcm1hdCA9IGZvcm1hdC5zcGxpdCgnIycpLFxuICAgICAgICAgICAgYXJybGVuID0gYXJyRm9ybWF0Lmxlbmd0aCxcbiAgICAgICAgICAgIHJlZ2V4ID0gLzp8XFwufC18Xy8sXG4gICAgICAgICAgICB0aW1lID0gMCxcbiAgICAgICAgICAgIGNudCA9IDAsXG4gICAgICAgICAgICB0bXAsIGksIGFyclZhbHVlcywgc3BsaXR0ZXJPaztcblxuICAgICAgICAvL0NoZWNrIGlmIGEgdmFsaWQgc3BsaXR0ZXIgaXMgZ2l2ZW5cbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFycmxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVnZXgudGVzdChhcnJGb3JtYXRbaV0pID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BsaXR0ZXJPayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3BsaXR0ZXJPayAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gc2VwYXJhdG9yICggOiAuIC0gXyApIGZvciBUT0Qgc3RyaW5nIGZvdW5kIScpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1N0cmluZzogJyArIHRpbWVzdHJpbmcpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ0Zvcm1hdDogJyArIGZvcm1hdCk7XG4gICAgICAgICAgICAvL0FsdGhvdWdoIHdlIGNvdWxkIHRyeSB0byBzcGxpdCB0aGUgdGltZXN0cmluZyBpbiBjYXNlIG9mIGEgXG4gICAgICAgICAgICAvL3dyb25nIGZvcm1hdHRpbmcgc3RyaW5nLCB3ZSBkb24ndCBkbyBpdC5cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJyVmFsdWVzID0gdGltZXN0cmluZy5zcGxpdChyZWdleCk7XG5cbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFycmxlbjsgaSsrKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYXJyRm9ybWF0W2ldKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnaGgnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBwYXJzZUludChhcnJWYWx1ZXNbY250XSwgMTApICogMzYwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gcGFyc2VJbnQoYXJyVmFsdWVzW2NudF0sIDEwKSAqIDYwMDAwO1xuICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3MnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBwYXJzZUludChhcnJWYWx1ZXNbY250XSwgMTApICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21zJzpcbiAgICAgICAgICAgICAgICBjYXNlICdtc21zbXMnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBwYXJzZUludChhcnJWYWx1ZXNbY250XSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWUgKz0gdG1wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJhc2U2NCBlbmNvZGVyXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YVxuICAgICAqL1xuICAgIGVuY29kZUJhc2U2NChkYXRhKSB7XG4gICAgICAgIHJldHVybiBidG9hKFN0cmluZy5mcm9tQ2hhckNvZGUoLi4uZGF0YSkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gZm9yIGNvbnZlcnRpbmcgdGhlIGRhdGEgdmFsdWVzIHRvIGEgYnl0ZSBhcnJheS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAgICAgQW4gaXRlbSBvZiB0aGUgaXRlbSBsaXN0IG9mIGEgcmVxdWVzdCBkZXNjcmlwdG9yLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlICAgICBDb250YWlucyB0aGUgZGF0YSB0eXBlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdCAgIFRoZSBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuICAgICAgRGF0YSBsZW5ndGguXG4gICAgICogQHJldHVybiB7QXJyYXl9IGJ5dGVzICAgIEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGRhdGEgYXMgYnl0ZSB2YWx1ZXMuXG4gICAgICovXG4gICAgZGF0YVRvQnl0ZUFycmF5KGl0ZW0sIHR5cGUsIGZvcm1hdCwgbGVuKSB7XG5cbiAgICAgICAgdmFyIGJ5dGVzID0gW10sXG4gICAgICAgICAgICB2YWwsIHN0cmxlbiwgc2wsIGk7XG5cbiAgICAgICAgLy9JZiBubyB2YWx1ZSBpcyBwYXNzZWQsIHNldCB2YWx1ZSB0byB6ZXJvIGFuZCBsb2cgYW4gZXJyb3IgbWVzc2FnZS5cbiAgICAgICAgaWYgKGl0ZW0udmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RUJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUT0QnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1RJTUVfT0ZfREFZJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEQVRFX0FORF9USU1FJzpcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBWYWx1ZSBvZiBhIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgaXMgbm90IGRlZmluZWQhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRGVwZW5kaW5nIG9uIHRoZSBkYXRhIHR5cGUsIGNvbnZlcnQgdGhlIHZhbHVlcyB0byBhIGJ5dGUgYXJyYXkuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnQk9PTCc6XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGVzWzBdID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBieXRlc1swXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQllURSc6XG4gICAgICAgICAgICBjYXNlICdVU0lOVCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIDAsIDI1NSk7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTSU5UJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgLTEyOCwgMTI3KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwgKyAyNTY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnV09SRCc6XG4gICAgICAgICAgICBjYXNlICdVSU5UJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgMCwgNjU1MzUpO1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSU5UJzpcbiAgICAgICAgICAgIGNhc2UgJ0lOVDE2JzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgLTMyNzY4LCAzMjc2Nyk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsICsgNjU1MzY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSU5UMURQJzpcbiAgICAgICAgICAgICAgICBpdGVtLnZhbCA9IE1hdGgucm91bmQoaXRlbS52YWwgKiAxMCk7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0zMjc2OCwgMzI3NjcpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCArIDY1NTM2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVDJEUCc6XG4gICAgICAgICAgICAgICAgaXRlbS52YWwgPSBNYXRoLnJvdW5kKGl0ZW0udmFsICogMTAwKTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgLTMyNzY4LCAzMjc2Nyk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsICsgNjU1MzY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRFdPUkQnOlxuICAgICAgICAgICAgY2FzZSAnVURJTlQnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAwLCA0Mjk0OTY3Mjk1KTtcbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RJTlQnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAtMjE0NzQ4MzY0OCwgMjE0NzQ4MzY0Nyk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsICsgNDI5NDk2NzI5NjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdSRUFMJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgLTIxNDc0ODM2NDgsIDIxNDc0ODM2NDcpO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuZmxvYXRUb1JlYWwodmFsKTtcbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0xSRUFMJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgLTIxNDc0ODM2NDgsIDIxNDc0ODM2NDcpO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuZmxvYXRUb0xyZWFsKHZhbCk7XG4gICAgICAgICAgICAgICAgLy9MZW5ndGggc2V0IHRvIDQsIGNhdXNlIHR5cGUgbGVuZ3RoIGlzIDggYW5kIHRoZXJlIGFyZSAyIHBhcnRzXG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwucGFydDIsIDQpO1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gYnl0ZXMuY29uY2F0KHRoaXMubnVtVG9CeXRlQXJyKHZhbC5wYXJ0MSwgNCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnREFURSc6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9EZWxldGUgdGhlIHRpbWUgcG9ydGlvbi5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwuc2V0SG91cnMoMCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsLnNldE1pbnV0ZXMoMCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsLnNldFNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29udmVydCB0aGUgZGF0ZSBvYmplY3QgaW4gc2Vjb25kcyBzaW5jZSAxLjEuMTk3MCBhbmRcbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgdGhlIHRpbWUgem9uZSB0byBVVEMuXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGl0ZW0udmFsLmdldFRpbWUoKSAvIDEwMDAgLSBpdGVtLnZhbC5nZXRUaW1lem9uZU9mZnNldCgpICogNjA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVmFsdWUgb2YgYSBEQVRFIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgaXMgbm90IGEgZGF0ZSBvYmplY3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RUJzpcbiAgICAgICAgICAgIGNhc2UgJ0RBVEVfQU5EX1RJTUUnOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS52YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29udmVydCB0aGUgZGF0ZSBvYmplY3QgaW4gc2Vjb25kcyBzaW5jZSAxLjEuMTk3MCBhbmRcbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgdGhlIHRpbWUgem9uZSB0byBVVEMuXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGl0ZW0udmFsLmdldFRpbWUoKSAvIDEwMDAgLSBpdGVtLnZhbC5nZXRUaW1lem9uZU9mZnNldCgpICogNjA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVmFsdWUgb2YgYSBEVCB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGlzIG5vdCBhIGRhdGUgb2JqZWN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdUT0QnOlxuICAgICAgICAgICAgY2FzZSAnVElNRV9PRl9EQVknOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS52YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vRGVsZXRlIHRoZSBkYXRlIHBvcnRpb24uXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsLnNldFllYXIoMTk3MCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsLnNldE1vbnRoKDApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXREYXRlKDEpO1xuICAgICAgICAgICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGUgb2JqZWN0IGluIHNlY29uZHMgc2luY2UgMS4xLjE5NzAgYW5kXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSB0aW1lIHpvbmUgdG8gVVRDLlxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBpdGVtLnZhbC5nZXRUaW1lKCkgLSBpdGVtLnZhbC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS52YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlIHRpbWUgdmFsdWUgaXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJycgfHwgZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9ICcjaGgjOiNtbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IE5vIGZvcm1hdCBnaXZlbiBmb3IgVE9EIHN0cmluZyEgVXNpbmcgZGVmYXVsdCAjaGgjOiNtbS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuc3RyaW5nVG9UaW1lKGl0ZW0udmFsLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFRPRCB2YWx1ZSBpbiB3cml0ZSByZXF1ZXN0IGlzIHdldGhlciBhIGRhdGUgb2JqZWN0IG5vciBhIHN0cmluZyEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICAvL0lmIG5vIGxlbmd0aCBpcyBnaXZlbiwgc2V0IGl0IHRvIDgwIGNoYXJhY3RlcnMgKFR3aW5DQVQgZGVmYXVsdCkuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzdHJsZW4gPSAoZm9ybWF0ID09PSB1bmRlZmluZWQpID8gdGhpcy5wbGNUeXBlTGVuLlNUUklORyA6IHBhcnNlSW50KGZvcm1hdCwgMTApO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihzdHJsZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlIGdpdmVuIHN0cmluZyBsZW5ndGggaXMgdmFsaWQgYW5kIHNob3J0ZXIgdGhlbiB0aGUgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlbiB1c2UgdGhlIGdpdmVuIHZhbHVlIHRvIGF2b2lkIGFuIG92ZXJmbG93LCBvdGhlcndpc2UgdXNlXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIHJlYWwgc3RyaW5nIGxlbmd0aC5cbiAgICAgICAgICAgICAgICAgICAgc2wgPSBzdHJsZW4gPCBpdGVtLnZhbC5sZW5ndGggPyBzdHJsZW4gOiBpdGVtLnZhbC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBieXRlc1tpXSA9IGl0ZW0udmFsLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9GaWxsIHRoZSBzdHJpbmcgdXAgdG8gdGhlIGdpdmVuIGxlbmd0aCwgaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGk7IGkgPCBzdHJsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXNbaV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vVGVybWluYXRpb24sIHRoZSByZWFsIHN0cmluZyBsZW5ndGggaW4gdGhlIFBMQyBpc1xuICAgICAgICAgICAgICAgICAgICAvL3RoZSBkZWZpbmVkIGxlbmd0aCArIDEuXG4gICAgICAgICAgICAgICAgICAgIGJ5dGVzW2ldID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdUSU1FJzpcbiAgICAgICAgICAgICAgICB2YWwgPSBwYXJzZUludChpdGVtLnZhbCwgMTApO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVmFsdWUgb2YgYSBUSU1FIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgaXMgbm90IGRlZmluZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnRvTWlsbGlzZWModmFsLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogTG93ZXIgbGltaXQgZm9yIFRJTUUgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCBleGNlZWRlZCEpJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIGl0ZW0udmFsICsgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiA0Mjk0OTY3Mjk1KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IDQyOTQ5NjcyOTU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVXBwZXIgbGltaXQgZm9yIFRJTUUgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCBleGNlZWRlZCEpJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIGl0ZW0udmFsICsgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRW5kU3RydWN0JzpcbiAgICAgICAgICAgICAgICAvL0RvIG5vdGhpbmcuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFVua25vd24gZGF0YSB0eXBlIGluIHdyaXRlIHJlcXVlc3QgOiAnICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYnl0ZXM7XG5cbiAgICB9XG5cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlY29kZXIgRnVuY3Rpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIG51bWJlciB0byBhIGhleCBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICovXG4gICAgbnVtVG9IZXhTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgdmFyIHJldCA9IHZhbHVlLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgaWYgKChyZXQubGVuZ3RoICUgMikgIT09IDApIHtcbiAgICAgICAgICAgIHJldCA9ICcwJyArIHJldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhIGZpeGVkIGxlbmd0aCBvZiBhbiBpbnRlZ2VyIGJ5IGFkZGluZyBsZWFkaW5nIFxuICAgICAqIHplcm9zKGkuZS4gY2hhbmdlIDIgdG8gMDIpLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1iXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBsYWNlc1xuICAgICAqL1xuICAgIGZpeE51bWJMZW5ndGgobnVtYiwgcGxhY2VzKSB7XG4gICAgICAgIHBsYWNlcyA9IChpc05hTihwbGFjZXMpKSA/IDAgOiBwbGFjZXM7XG4gICAgICAgIHZhciBzdHIgPSBudW1iLnRvU3RyaW5nKDEwKTtcbiAgICAgICAgd2hpbGUgKHN0ci5sZW5ndGggPCBwbGFjZXMpIHtcbiAgICAgICAgICAgIHN0ciA9ICcwJyArIHN0cjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBkYXRlIG9iamVjdCB0byBhIGZvcm1hdHRlZCBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtEYXRlfSB0aW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIGRhdGVUb1N0cmluZyh0aW1lLCBmb3JtYXQpIHtcblxuICAgICAgICB2YXIgYXJyID0gZm9ybWF0LnNwbGl0KCcjJyksXG4gICAgICAgICAgICBhcnJsZW4gPSBhcnIubGVuZ3RoLFxuICAgICAgICAgICAgdHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgdG1wLCBpO1xuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcnJsZW47IGkrKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFycltpXSkge1xuICAgICAgICAgICAgICAgIC8vRGF0ZSBmb3JtYXR0aW5nLlxuICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnREQnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1dEJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXREYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnV0tEJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5kYXRlTmFtZXMud2Vla2RTaG9ydFt0aW1lLmdldERheSgpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnV0VFS0RBWSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZGF0ZU5hbWVzLndlZWtkTG9uZ1t0aW1lLmdldERheSgpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ01PTic6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZGF0ZU5hbWVzLm1vbnRoc1Nob3J0W3RpbWUuZ2V0TW9udGgoKV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ01PTlRIJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5kYXRlTmFtZXMubW9udGhzTG9uZ1t0aW1lLmdldE1vbnRoKCldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdZWSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0WWVhcigpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodG1wID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgLT0gMTAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1lZWVknOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgLy9UaW1lIGZvcm1hdHRpbmcuXG4gICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGgnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldEhvdXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NzJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtcyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TWlsbGlzZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21zbXNtcyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TWlsbGlzZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBhcnJbaV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHN0cmluZyA9IHRzdHJpbmcgKyB0bXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRzdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIG51bWJlciB3aXRoIGEgdmFsdWUgaW4gbWlsbGlzZWNvbmRzIHRvIGEgZm9ybWF0dGVkIHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICB0aW1lVG9TdHJpbmcodGltZSwgZm9ybWF0KSB7XG4gICAgICAgIHZhciBhcnIgPSBmb3JtYXQuc3BsaXQoJyMnKSxcbiAgICAgICAgICAgIGFycmxlbiA9IGFyci5sZW5ndGgsXG4gICAgICAgICAgICB0c3RyaW5nID0gJycsXG4gICAgICAgICAgICB0bXAsIGk7XG5cbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFycmxlbjsgaSsrKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJsZW4gPD0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZSAvIDg2NDAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gODY0MDAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgJSA4NjQwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkZCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJsZW4gPD0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZSAvIDg2NDAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gODY0MDAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgJSA4NjQwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJsZW4gPD0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZSAvIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBNYXRoLmZsb29yKHRpbWUgLyAzNjAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgMzYwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoaCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJsZW4gPD0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZSAvIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBNYXRoLmZsb29yKHRpbWUgLyAzNjAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgMzYwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJsZW4gPD0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZSAvIDYwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gNjAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgJSA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJsZW4gPD0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZSAvIDYwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gNjAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgJSA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJsZW4gPD0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBNYXRoLmZsb29yKHRpbWUgLyAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzcyc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJsZW4gPD0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBNYXRoLmZsb29yKHRpbWUgLyAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbXMnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtc21zbXMnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gYXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRzdHJpbmcgPSB0c3RyaW5nICsgdG1wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0c3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gVVNJTlQvQllURS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNVc2ludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGhleHMgPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGhleHMsIDE2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIFNJTlQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjU2ludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRlYyA9IHRoaXMucGFyc2VQbGNVc2ludChzdHJpbmcpO1xuICAgICAgICBpZiAoZGVjID4gMTI3KSB7XG4gICAgICAgICAgICBkZWMgPSBkZWMgLSAyNTY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlYztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIFVJTlQvV09SRC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNVaW50KHN0cmluZykge1xuICAgICAgICB2YXIgaGV4cyA9IHRoaXMubnVtVG9IZXhTdHJpbmcoc3RyaW5nLmNoYXJDb2RlQXQoMSkpO1xuICAgICAgICBoZXhzICs9IHRoaXMubnVtVG9IZXhTdHJpbmcoc3RyaW5nLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoaGV4cywgMTYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gSU5ULlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY0ludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRlYyA9IHRoaXMucGFyc2VQbGNVaW50KHN0cmluZyk7XG4gICAgICAgIGlmIChkZWMgPiAzMjc2Nykge1xuICAgICAgICAgICAgZGVjID0gZGVjIC0gNjU1MzY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlYztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIFVESU5UL0RXT1JELlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1VkaW50KHN0cmluZykge1xuICAgICAgICB2YXIgaGV4cyA9IHRoaXMubnVtVG9IZXhTdHJpbmcoc3RyaW5nLmNoYXJDb2RlQXQoMykpO1xuICAgICAgICBoZXhzICs9IHRoaXMubnVtVG9IZXhTdHJpbmcoc3RyaW5nLmNoYXJDb2RlQXQoMikpO1xuICAgICAgICBoZXhzICs9IHRoaXMubnVtVG9IZXhTdHJpbmcoc3RyaW5nLmNoYXJDb2RlQXQoMSkpO1xuICAgICAgICBoZXhzICs9IHRoaXMubnVtVG9IZXhTdHJpbmcoc3RyaW5nLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoaGV4cywgMTYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gRElOVC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNEaW50KHN0cmluZykge1xuICAgICAgICB2YXIgZGVjID0gdGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZyk7XG4gICAgICAgIGlmIChkZWMgPiAyMTQ3NDgzNjQ3KSB7XG4gICAgICAgICAgICBkZWMgPSBkZWMgLSA0Mjk0OTY3Mjk2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBhIGZvcm1hdHRlZCB0aW1lIHN0cmluZ1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gICAgICovXG4gICAgcGFyc2VQbGNUaW1lKHN0cmluZywgZm9ybWF0KSB7XG4gICAgICAgIHZhciB0aW1lID0gdGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZyk7XG4gICAgICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWU7ICAgIC8vVW5mb3JtYXR0ZWQ6IHZhbHVlIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMudGltZVRvU3RyaW5nKHRpbWUsIGZvcm1hdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gYSBmb3JtYXR0ZWQgdGltZSBvZiBkYXkgc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gICAgICovXG4gICAgcGFyc2VQbGNUb2Qoc3RyaW5nLCBmb3JtYXQpIHtcbiAgICAgICAgLy9DcmVhdGUgYSBkYXRlIG9iamVjdCAodGltZSBiYXNlIGluIHRoZSBQTEMgYXJlIG1pbGxpc2Vjb25kcylcbiAgICAgICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nKSk7XG5cbiAgICAgICAgLy9UaW1lIHpvbmUgY29ycmVjdGlvbi5cbiAgICAgICAgdGltZSA9IG5ldyBEYXRlKHRpbWUuZ2V0VGltZSgpICsgdGltZS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApO1xuXG4gICAgICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVUb1N0cmluZyh0aW1lLCBmb3JtYXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIGEgZm9ybWF0dGVkIGRhdGUvdGltZSBvZiBkYXkgc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gICAgICovXG4gICAgcGFyc2VQbGNEYXRlKHN0cmluZywgZm9ybWF0KSB7XG4gICAgICAgIC8vQ29udmVydGUgdG8gbWlsbGlzZWNvbmRzIGFuIGNyZWF0ZSBhIGRhdGUgb2JqZWN0XG4gICAgICAgIC8vKHRpbWUgYmFzZSBvZiBEQVRFL0RUIHZhcmlhYmxlcyBpbiB0aGUgUExDIGFyZSBzZWNvbmRzIHNpbmNlIDEuMS4xOTcwKVxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcpICogMTAwMCk7XG5cbiAgICAgICAgLy9UaW1lIHpvbmUgY29ycmVjdGlvbi5cbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApO1xuXG4gICAgICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVUb1N0cmluZyhkYXRlLCBmb3JtYXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIG9mIGEgUkVBTCB2YXJpYWJsZVxuICAgICAqIHRvIGEgSmF2YVNjcmlwdCBmbG9hdGluZyBwb2ludCBudW1iZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjUmVhbChzdHJpbmcpIHtcbiAgICAgICAgdmFyIG1hbnQgPSAxLFxuICAgICAgICAgICAgZHVhbCA9IDAuNSxcbiAgICAgICAgICAgIG51bSA9IHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcpLFxuICAgICAgICAgICAgc2lnbiwgZXhwLCBpO1xuXG4gICAgICAgIC8vUmV0dXJuIGlmIHZhbHVlIGlzIHplcm8uIFxuICAgICAgICBpZiAobnVtID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICAvL0NoZWNrIHRoZSBzaWduIGJpdC5cbiAgICAgICAgc2lnbiA9ICgobnVtID4+PiAzMSkgPT09IDEpID8gJy0nIDogJysnO1xuICAgICAgICBudW0gPDw9IDE7IC8vRGVsZXRlIHRoZSBzaWduIGJpdC5cbiAgICAgICAgLy9DYWxjdWxhdGUgdGhlIGV4cG9uZW50LlxuICAgICAgICBleHAgPSAobnVtID4+PiAyNCkgLSAxMjc7XG4gICAgICAgIC8vQ2FsY3VsYXRlIHRoZSAyMyBiaXQgbWFudGlzc2E6IFNoaWZ0IGJpdHMgdG8gbGVmdCBhbmQgZXZhbHVhdGUgdGhlbS5cbiAgICAgICAgbnVtIDw8PSA4O1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IDIzOyBpKyspIHtcbiAgICAgICAgICAgIG1hbnQgKz0gbnVtIDwgMCA/IGR1YWwgOiAwOyAvL0FkZCBpZiBsZWZ0IChzaWduIGJpdCkgYml0IGlzIHRydWUuXG4gICAgICAgICAgICBudW0gPDw9IDE7XG4gICAgICAgICAgICBkdWFsIC89IDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc2lnbiArIChtYW50ICogTWF0aC5wb3coMiwgZXhwKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgb2YgYSBMUkVBTCB2YXJpYWJsZVxuICAgICAqIHRvIGEgSmF2YVNjcmlwdCBmbG9hdGluZyBwb2ludCBudW1iZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjTHJlYWwoc3RyaW5nKSB7XG4gICAgICAgIHZhciBudW0gPSB0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nLnN1YnN0cmluZyg0LCA4KSksXG4gICAgICAgICAgICBudW0yID0gdGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZy5zdWJzdHJpbmcoMCwgNCkpLFxuICAgICAgICAgICAgaSA9IDEyLFxuICAgICAgICAgICAgbWFudCA9IDEsXG4gICAgICAgICAgICBkdWFsID0gMC41LFxuICAgICAgICAgICAgc2lnbiwgZXhwO1xuXG4gICAgICAgIC8vUmV0dXJuIGlmIHZhbHVlIGlzIHplcm8uIFxuICAgICAgICBpZiAobnVtID09PSAwICYmIG51bTIgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIC8vQ2hlY2sgdGhlIHNpZ24gYml0LlxuICAgICAgICBzaWduID0gKChudW0gPj4+IDMxKSA9PT0gMSkgPyAnLScgOiAnKyc7XG4gICAgICAgIG51bSA8PD0gMTsgLy9EZWxldGUgdGhlIHNpZ24gYml0LlxuICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgZXhwb25lbnQuXG4gICAgICAgIGV4cCA9IChudW0gPj4+IDIxKSAtIDEwMjM7XG4gICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBtYW50aXNzYS4gU2hpZnQgYml0cyB0byBsZWZ0IGFuZCBldmFsdWF0ZSB0aGVtLlxuICAgICAgICAvL1BhcnQgMS5cbiAgICAgICAgbnVtIDw8PSAxMTtcbiAgICAgICAgd2hpbGUgKGkgPCAzMikge1xuICAgICAgICAgICAgbWFudCArPSBudW0gPCAwID8gZHVhbCA6IDA7IC8vQWRkIGlmIGxlZnQgKHNpZ24gYml0KSBiaXQgaXMgdHJ1ZS5cbiAgICAgICAgICAgIG51bSA8PD0gMTtcbiAgICAgICAgICAgIGR1YWwgLz0gMjtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICAvL1BhcnQgMi5cbiAgICAgICAgaWYgKChudW0yID4+PiAzMSkgPT09IDEpIHtcbiAgICAgICAgICAgIG1hbnQgKz0gZHVhbDtcbiAgICAgICAgICAgIG51bTIgPDw9IDE7XG4gICAgICAgICAgICBkdWFsIC89IDI7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGkgPCA2NCkge1xuICAgICAgICAgICAgbWFudCArPSBudW0yIDwgMCA/IGR1YWwgOiAwOyAvL0FkZCBpZiBsZWZ0IChzaWduIGJpdCkgYml0IGlzIHRydWUuXG4gICAgICAgICAgICBudW0yIDw8PSAxO1xuICAgICAgICAgICAgZHVhbCAvPSAyO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNpZ24gKyAobWFudCAqIE1hdGgucG93KDIsIGV4cCkpKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gc3RyaW5nIGJ5IHNpbXBseSBjdXR0aW5nIG9mIHN1cGVyZmx1b3VzIGNoYXJhY3RlcnMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjU3RyaW5nKHN0cmluZykge1xuICAgICAgICAvKlxuICAgICAgICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHN0cmluZy5jaGFyQ29kZUF0KGkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmluZy5zdWJzdHIoMCwgaSk7XG4gICAgICAgICovXG4gICAgICAgIHJldHVybiBzdHJpbmcuc3BsaXQoU3RyaW5nLmZyb21DaGFyQ29kZSgwKSlbMF07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBCYXNlNjQgZGVjb2RlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gICAgICovXG4gICAgZGVjb2RlQmFzZTY0KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGF0b2IoZGF0YSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IEI2NC1zdWJzdHJpbmdzIHRvIGRhdGEuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFTdHJpbmdcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nLCBOdW1iZXJ9IGZvcm1hdFxuICAgICAqIEByZXR1cm4ge01peGVkfSBkYXRhXG4gICAgICogXG4gICAgICovXG4gICAgc3ViU3RyaW5nVG9EYXRhKGRhdGFTdHJpbmcsIHR5cGUsIGZvcm1hdD8pIHtcbiAgICAgICAgdmFyIGRhdGE7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdCT09MJzpcbiAgICAgICAgICAgICAgICAvL0RvZXMgdGhpcyB3b3JrPz8/Pz8gU2VlbXMgbGlrZS5cbiAgICAgICAgICAgICAgICBkYXRhID0gKGRhdGFTdHJpbmcuY2hhckNvZGVBdCgwKSAhPSAnMCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQllURSc6XG4gICAgICAgICAgICBjYXNlICdVU0lOVCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNVc2ludChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1NJTlQnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjU2ludChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1dPUkQnOlxuICAgICAgICAgICAgY2FzZSAnVUlOVCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNVaW50KGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSU5UJzpcbiAgICAgICAgICAgIGNhc2UgJ0lOVDE2JzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY0ludChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVDFEUCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9ICgodGhpcy5wYXJzZVBsY0ludChkYXRhU3RyaW5nKSkgLyAxMCkudG9GaXhlZCgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVDJEUCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9ICgodGhpcy5wYXJzZVBsY0ludChkYXRhU3RyaW5nKSkgLyAxMDApLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEV09SRCc6XG4gICAgICAgICAgICBjYXNlICdVRElOVCc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNVZGludChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RJTlQnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjRGludChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1JFQUwnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjUmVhbChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEudG9GaXhlZChwYXJzZUludChmb3JtYXQsIDEwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnTFJFQUwnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjTHJlYWwoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnRvRml4ZWQocGFyc2VJbnQoZm9ybWF0LCAxMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNTdHJpbmcoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdUT0QnOlxuICAgICAgICAgICAgY2FzZSAnVElNRV9PRl9EQVknOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjVG9kKGRhdGFTdHJpbmcsIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdUSU1FJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1RpbWUoZGF0YVN0cmluZywgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RUJzpcbiAgICAgICAgICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgICAgICAgY2FzZSAnREFURV9BTkRfVElNRSc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNEYXRlKGRhdGFTdHJpbmcsIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdFbmRTdHJ1Y3QnOlxuICAgICAgICAgICAgICAgIC8vSnVzdCBkbyBub3RoaW5nLlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBVbmtub3duIGRhdGEgdHlwZSBhdCBwYXJzaW5nIHJlYWQgcmVxdWVzdDogJyArIHR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIHRoZSByZXNwb25zZSBzdHJpbmcgb2YgYSBSZWFkIFJlcXVlc3QgYW5kIHN0b3JlIHRoZSBkYXRhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBBRFMgUmVxZXN0IE9iamVjdFxuICAgICAqL1xuICAgIHBhcnNlUmVhZFJlcShhZHNSZXEpIHtcblxuICAgICAgICBsZXQgcmVzcG9uc2UsXG4gICAgICAgICAgICBpdGVtTGlzdCA9IGFkc1JlcS5yZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIHN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgaXRlbSwgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgc3RybGVuLCBsZW4sIHBsZW4sIG1vZCwgdHlwZSwgZm9ybWF0LCBpZHgsIGxpc3RsZW4sIHN0YXJ0YWRkcjtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55XG5cbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcERhdGEnKVswXS5maXJzdENoaWxkLmRhdGEpO1xuXG4gICAgICAgICAgICAvL1J1biB0aHJvdWdoIHRoZSBlbGVtZW50cyBpbiB0aGUgaXRlbSBsaXN0LlxuICAgICAgICAgICAgZm9yIChpZHggPSAwLCBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0eXBlIGFuZCBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgICAgICAgICAgICBhcnJUeXBlID0gdGhpcy5nZXRUeXBlQW5kRm9ybWF0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBhcnJUeXBlWzBdO1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGFyclR5cGVbMV07XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0aGUgbGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGVzLlxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RybGVuID0gcGFyc2VJbnQoZm9ybWF0LCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKHN0cmxlbikgPyBzdHJsZW4gOiBsZW4pICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdFbmRTdHJ1Y3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIGxlbmd0aCBvZiB0aGUgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXCJFbmRTdHJ1Y3RcIiBpcyBvbmx5IHVzZWQgd2l0aCBcInJlYWRBcnJheU9mU3RydWN0dXJlcy93cml0ZUFycmF5T2ZTdHJ1Y3R1cmVzXCIuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBpdGVtLnZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBsZW5ndGggZm9yIGNhbGN1bGF0aW5nIHBhZGRpbmcgYnl0ZXNcbiAgICAgICAgICAgICAgICBwbGVuID0gbGVuIDwgdGhpcy5hbGlnbm1lbnQgPyBsZW4gOiB0aGlzLmFsaWdubWVudDtcblxuICAgICAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBwbGFjZSBvZiB0aGUgZWxlbWVudCBpbiB0aGUgZGF0YSBzdHJpbmdcbiAgICAgICAgICAgICAgICBpZiAoYWRzUmVxLnJlcURlc2NyLnNlcSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvL0lmIHZhcmlhYmxlIGFkZHJlc3NlcyBhcmUgdXNlZC5cbiAgICAgICAgICAgICAgICAgICAgc3RhcnRhZGRyID0gdGhpcy5nZXRJbmRleE9mZnNldChhZHNSZXEucmVxRGVzY3IpO1xuICAgICAgICAgICAgICAgICAgICBzdHJBZGRyID0gaXRlbS5hZGRyIC0gc3RhcnRhZGRyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWRzUmVxLnJlcURlc2NyLmNhbGNBbGlnbm1lbnQgPT09IHRydWUgJiYgcGxlbiA+IDEgJiYgdHlwZSAhPT0gJ0VuZFN0cnVjdCcgJiYgdHlwZSAhPT0gJ1NUUklORycgJiYgc3RyQWRkciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9Db21wdXRlIHRoZSBhZGRyZXNzIGZvciB0aGUgYWxpZ25tZW50IGluIGNhc2Ugb2YgYSBzdHJ1Y3R1cmUuXG4gICAgICAgICAgICAgICAgICAgIG1vZCA9IHN0ckFkZHIgJSBwbGVuO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyQWRkciArPSBwbGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9TbGljZSB0aGUgc3RyaW5nIGFuZCBkZWNvZGUgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgbGVuKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCB0eXBlLCBmb3JtYXQpO1xuXG4gICAgICAgICAgICAgICAgLy9QYXJzZSB0aGUgbmFtZSBvZiB0aGUgSmF2YVNjcmlwdCB2YXJpYWJsZSBhbmQgd3JpdGUgdGhlIGRhdGEgdG8gaXRcbiAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gJ0VuZFN0cnVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVZhck5hbWUoaXRlbS5qdmFyLCByZXN1bHQsIGFkc1JlcS5yZXFEZXNjci5kYXRhT2JqLCBpdGVtLnByZWZpeCwgaXRlbS5zdWZmaXgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBuZXh0IGFkZHJlc3NcbiAgICAgICAgICAgICAgICBpZiAoYWRzUmVxLnJlcURlc2NyLnNlcSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdHJBZGRyICs9IGxlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBhcnNpbmcgb2YgUmVhZCBSZXF1ZXN0IGZhaWxlZDonICsgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY29kZSB0aGUgcmVzcG9uc2Ugc3RyaW5nIG9mIGEgU3VtUmVhZFJlcXVlc3QgYW5kIHN0b3JlIHRoZSBkYXRhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBBRFMgUmVxdWVzdCBPYmplY3RcbiAgICAgKi9cbiAgICBwYXJzZVN1bVJlYWRSZXEoYWRzUmVxKSB7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlLFxuICAgICAgICAgICAgaXRlbUxpc3QgPSBhZHNSZXEucmVxRGVzY3IuaXRlbXMsXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICBzdHJBZGRyID0gMCxcbiAgICAgICAgICAgIHN1YlN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgZGF0YU9iaiA9IHdpbmRvdyxcbiAgICAgICAgICAgIHZsZW5NYXggPSAwLFxuICAgICAgICAgICAgaXRlbSwgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgZGF0YSwgbGVuLCB0eXBlLCBmb3JtYXQsIGlkeCwgbGlzdGxlbiwgZXJyb3JDb2RlLCBqdmFyLCBpLFxuICAgICAgICAgICAgYXJyYXlMZW5ndGgsIGl0ZW1TaXplLCBpdGVtSW5mbztcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTbGljZSBhIHBpZWNlIG91dCBvZiB0aGUgc3Vic3RyaW5nLCBjb252ZXJ0IHRoZSBkYXRhIGFuZCB3cml0ZSBpdFxuICAgICAgICAgKiB0byB0aGUgSmF2YVNjcmlwdCB2YXJpYWJsZS4gIFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcGFyc2VTdWJTdHJpbmdTbGljZSA9ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIHN0cmxlbiwgc3ViU3RyU2xpY2U7XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBwYXJzZUludChmb3JtYXQsIDEwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtSW5mby5zdHJpbmdMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGVuID0gKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihzdHJsZW4pID8gc3RybGVuIDogbGVuKSArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vVGFrZSBhIHBpZWNlIG9mIHRoZSBkYXRhIHN1YiBzdHJpbmdcbiAgICAgICAgICAgIHN1YlN0clNsaWNlID0gZGF0YVN1YlN0cmluZy5zdWJzdHIoc3ViU3RyQWRkciwgbGVuKTtcbiAgICAgICAgICAgIC8vQ29udmVydCB0aGUgZGF0YVxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKHN1YlN0clNsaWNlLCB0eXBlLCBmb3JtYXQpO1xuICAgICAgICAgICAgLy9QYXJzZSB0aGUgbmFtZSBvZiB0aGUgSmF2YVNjcmlwdCB2YXJpYWJsZSBhbmQgd3JpdGUgdGhlIGRhdGEgdG8gaXRcbiAgICAgICAgICAgIHRoaXMucGFyc2VWYXJOYW1lKGp2YXIsIGRhdGEsIGRhdGFPYmosIGl0ZW0ucHJlZml4LCBpdGVtLnN1ZmZpeCk7XG5cbiAgICAgICAgICAgIHN1YlN0ckFkZHIgKz0gbGVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhcnNlIHRoZSBzdHVjdHVyZSBkZWZpbml0aW9uIGFuZCBjb21wdXRlIHRoZSBkYXRhIG9mXG4gICAgICAgICAqIHRoZSBzdWJzdHJpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBwYXJzZVN0cnVjdHVyZSA9ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIGosIGRlZkFyciwgbGVuQXJyRWxlbSwgbGFzdERlZkFyciwgbW9kLCBlbGVtO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEZ1bmN0aW9uIGZvciBhZGp1c3RpbmcgdGhlIGFkZHJlc3Mgb2YgdGhlIGRhdGEgaW4gdGhlIHN0cmluZ1xuICAgICAgICAgICAgICogaWYgYW4gYWxpZ25tZW50IGlzIHVzZWQuIFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBjaGVja0FsaWdubWVudCA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIHZhciB2bGVuLCBtb2Q7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBsZW5ndGggZm9yIGNhbGN1bGF0aW5nIHBhZGRpbmcgYnl0ZXNcbiAgICAgICAgICAgICAgICAgICAgdmxlbiA9IGxlbiA8IHRoaXMuYWxpZ25tZW50ID8gbGVuIDogdGhpcy5hbGlnbm1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9Db21wdXRlIHRoZSBhZGRyZXNzIGZvciB0aGUgYWxpZ25tZW50LlxuICAgICAgICAgICAgICAgICAgICBpZiAodmxlbiA+IDEgJiYgc3ViU3RyQWRkciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZCA9IHN1YlN0ckFkZHIgJSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJTdHJBZGRyICs9IHZsZW4gLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL1N0b3JlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICAvL2ZvciBpbnNlcnRpbmcgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2bGVuID4gdmxlbk1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmxlbk1heCA9IHZsZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2hlY2sgc3RydWN0dXJlIGRlZmluaXRpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kZWYgPSB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmRlZik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID09PSB0cnVlICYmIGl0ZW0uZGVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmRlZiA9IHRoaXMuY3JlYXRlU3RydWN0RGVmKGl0ZW1JbmZvLmRhdGFUeXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZGVmICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIHN0cnVjdHVyZSBkZWZpbmluaXRpb24gZm91bmQgKHBhcnNlU3VtUmVhZFJlcSgpKSEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChlbGVtIGluIGl0ZW0uZGVmKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kZWYuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBkZWZBcnIgPSBpdGVtLmRlZltlbGVtXS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyWzBdID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5BcnJFbGVtID0gcGFyc2VJbnQoZGVmQXJyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGVmQXJyID0gZGVmQXJyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGVuQXJyRWxlbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXIgPSBlbGVtICsgajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPj0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZGVmQXJyLnNsaWNlKDMsIC0xKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gZWxlbSArICcuJyArIGo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyci5zbGljZSgzKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BZGQgaW5kZXggaW4gY2FzZSBvZiBhbiBhcnJheSBvZiBzdHJ1Y3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gaSArICcuJyArIGp2YXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxpZ25tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdWJTdHJpbmdTbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB3ZSBhcmUgaW4gYW4gYXJyYXkgb2Ygc3RydWN0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXIgPSBpICsgJy4nICsgZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganZhciA9IGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBkZWZBcnJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZBcnJbMV0gPSBkZWZBcnIuc2xpY2UoMSkuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZGVmQXJyWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGlnbm1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3ViU3RyaW5nU2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdmxlbk1heCA+IDEgJiYgdHlwZSAhPT0gJ1NUUklORycgJiYgdHlwZSAhPT0gJ0VuZFN0cnVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodmxlbk1heCA+IHRoaXMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZsZW5NYXggPSB0aGlzLmFsaWdubWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9kID0gc3ViU3RyQWRkciAlIHZsZW5NYXg7XG4gICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViU3RyQWRkciArPSB2bGVuTWF4IC0gbW9kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBkYXRhU3RyaW5nID0gdGhpcy5kZWNvZGVCYXNlNjQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BwUmREYXRhJylbMF0uZmlyc3RDaGlsZC5kYXRhKTtcblxuICAgICAgICAgICAgLy9SZWFkIHRoZSBlcnJvciBjb2RlcyBvZiB0aGUgQURTIHN1YiBjb21tYW5kcy5cbiAgICAgICAgICAgIGZvciAoaWR4ID0gMCwgbGlzdGxlbiA9IGl0ZW1MaXN0Lmxlbmd0aDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCA0KTtcbiAgICAgICAgICAgICAgICBlcnJvckNvZGUgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQURTIHN1YiBjb21tYW5kIGVycm9yIHdoaWxlIHByb2Nlc3NpbmcgYSBTdW1SZWFkUmVxdWVzdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ0Vycm9yIGNvZGU6ICcgKyBlcnJvckNvZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtTGlzdFtpZHhdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdHJBZGRyICs9IDQ7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9SdW4gdGhyb3VnaCB0aGUgZWxlbWVudHMgaW4gdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtTGlzdFtpZHhdO1xuXG4gICAgICAgICAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihpdGVtKTtcblxuICAgICAgICAgICAgICAgIC8vR2V0IHR5cGUgYW5kIGZvcm1hdHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgICAgIHR5cGUgPSBpdGVtSW5mby50eXBlO1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGl0ZW1JbmZvLmZvcm1hdDtcblxuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBsZW5ndGggb2YgdGhlIGRhdGEgdHlwZXMuXG4gICAgICAgICAgICAgICAgaXRlbVNpemUgPSBpdGVtSW5mby5zaXplO1xuXG4gICAgICAgICAgICAgICAgLy9SZXNldCBjb3VudGVyIGZvciBhcnJheXMuXG4gICAgICAgICAgICAgICAgaSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvL1NsaWNlIHRoZSBzdHJpbmcgYW5kIGRlY29kZSB0aGUgZGF0YVxuICAgICAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCBpdGVtU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdBUlJBWSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhT2JqID0gdGhpcy5wYXJzZVZhck5hbWUoaXRlbS5qdmFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlN0ckFkZHIgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBpdGVtSW5mby5hcnJheUxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby5hcnJheURhdGFUeXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN0cnVjdHVyZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGl0ZW1JbmZvLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXIgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1YlN0cmluZ1NsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1VTRVInOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU9iaiA9IHRoaXMucGFyc2VWYXJOYW1lKGl0ZW0uanZhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJTdHJBZGRyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3RydWN0dXJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29udmVydCB0aGUgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU9iaiA9IHdpbmRvdztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCB0eXBlLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9QYXJzZSB0aGUgbmFtZSBvZiB0aGUgSmF2YVNjcmlwdCB2YXJpYWJsZSBhbmQgd3JpdGUgdGhlIGRhdGEgdG8gaXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VWYXJOYW1lKGl0ZW0uanZhciwgZGF0YSwgZGF0YU9iaiwgaXRlbS5wcmVmaXgsIGl0ZW0uc3VmZml4KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgbmV4dCBzdHJpbmcgYWRkcmVzc1xuICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gaXRlbVNpemU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGFyc2luZyBvZiBTdW1SZWFkUmVxdWVzdCBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERlY29kZSB0aGUgcmVzcG9uc2Ugc3RyaW5nIG9mIGEgU3VtV3JpdGVSZXF1ZXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBBRFMgUmVxdWVzdCBPYmplY3RcbiAgICAgKi9cbiAgICBwYXJzZVN1bVdyaXRlUmVxKGFkc1JlcSkge1xuXG4gICAgICAgIHZhciByZXNwb25zZSxcbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gYWRzUmVxLnJlcURlc2NyLml0ZW1zLFxuICAgICAgICAgICAgYXJyVHlwZSA9IFtdLFxuICAgICAgICAgICAgYXJyRGVsZXRlZEhkbCA9IFtdLFxuICAgICAgICAgICAgc3RyQWRkciA9IDAsXG4gICAgICAgICAgICBzdWJTdHJBZGRyID0gMCxcbiAgICAgICAgICAgIGRhdGFPYmogPSB3aW5kb3csXG4gICAgICAgICAgICBpdGVtLCBkYXRhU3RyaW5nLCBkYXRhU3ViU3RyaW5nLCBkYXRhLCBsZW4sIHR5cGUsIGZvcm1hdCwgaWR4LCBsaXN0bGVuLCBlcnJvckNvZGUsIGRlbElkeCwgc3ltTmFtZTtcblxuXG4gICAgICAgIC8vSnVzdCBsb29rIGZvciBlcnJvcnMuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBkYXRhU3RyaW5nID0gdGhpcy5kZWNvZGVCYXNlNjQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BwUmREYXRhJylbMF0uZmlyc3RDaGlsZC5kYXRhKTtcblxuICAgICAgICAgICAgLy9SZWFkIHRoZSBlcnJvciBjb2RlcyBvZiB0aGUgQURTIHN1YiBjb21tYW5kcy5cbiAgICAgICAgICAgIGZvciAoaWR4ID0gMCwgbGlzdGxlbiA9IGl0ZW1MaXN0Lmxlbmd0aDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCA0KTtcbiAgICAgICAgICAgICAgICBlcnJvckNvZGUgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnJvckNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9SZWxlYXNlIGhhbmRsZXMgcmVxdWVzdD9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkc1JlcS5yZXFEZXNjci5pc1JlbEhkbFJlcSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ltTmFtZSA9IGl0ZW1MaXN0W2lkeF0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoZSBoYW5kbGUgZnJvbSB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhhbmRsZUNhY2hlW3N5bU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9EZWxldGUgdGhlIGhhbmRsZSBpbiB0aGUgaGFuZGxlIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbElkeCA9IHRoaXMuaGFuZGxlTmFtZXMuaW5kZXhPZihzeW1OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhhbmRsZU5hbWVzW2RlbElkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJEZWxldGVkSGRsW2lkeF0gPSBzeW1OYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQURTIHN1YiBjb21tYW5kIGVycm9yIHdoaWxlIHByb2Nlc3NpbmcgYSBTdW1SZWFkUmVxdWVzdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ0Vycm9yIGNvZGU6ICcgKyBlcnJvckNvZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtTGlzdFtpZHhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyQWRkciArPSA0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1JlbGVhc2UgaGFuZGxlcyByZXF1ZXN0P1xuICAgICAgICAgICAgaWYgKGFkc1JlcS5yZXFEZXNjci5pc1JlbEhkbFJlcSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIGRlbGV0ZWQgaXRlbXNcbiAgICAgICAgICAgICAgICBmb3IgKGlkeCA9IHRoaXMuaGFuZGxlTmFtZXMubGVuZ3RoIC0gMTsgaWR4ID49IDA7IGlkeC0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZU5hbWVzW2lkeF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVOYW1lcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYWNoZVJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogQWxsIGhhbmRsZXMgcmVsZWFzZWQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBSZWxlYXNlZCBoYW5kbGVzOicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhhcnJEZWxldGVkSGRsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBhcnNpbmcgb2YgU3VtV3JpdGVSZXF1ZXN0IGZhaWxlZDonICsgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgdGhlIHJlc3BvbnNlIHN0cmluZyBvZiBhIEFEUyBTdGF0ZSBSZXF1ZXN0IGFuZCBzdG9yZSB0aGUgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQURTIFJlcWVzdCBPYmplY3RcbiAgICAgKi9cbiAgICBwYXJzZUFkc1N0YXRlKGFkc1JlcSkge1xuXG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5hZHNTdGF0ZSA9IHBhcnNlSW50KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwQWRzU3RhdGUnKVswXS5maXJzdENoaWxkLmRhdGEsIDEwKTtcbiAgICAgICAgICAgIHRoaXMuYWRzU3RhdGVUeHQgPSB0aGlzLmFkc1N0YXRlc1t0aGlzLmFkc1N0YXRlXTtcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlU3RhdGUgPSBwYXJzZUludChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncERldmljZVN0YXRlJylbMF0uZmlyc3RDaGlsZC5kYXRhLCAxMCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBhcnNpbmcgb2YgQURTIFJlYWQgU3RhdGUgUmVxdWVzdCBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIHRoZSByZXNwb25zZSBzdHJpbmcgb2YgYSBSZWFkV3JpdGUgUmVxdWVzdCBhbmQgc3RvcmUgdGhlIGhhbmRsZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIEFEUyBSZXF1ZXN0IE9iamVjdFxuICAgICAqL1xuICAgIHBhcnNlSGFuZGxlcyhhZHNSZXEpIHtcblxuICAgICAgICB2YXIgcmVzcG9uc2UsXG4gICAgICAgICAgICBhcnJTeW1OYW1lcyA9IHRoaXMuaGFuZGxlTmFtZXMsXG4gICAgICAgICAgICBzdHJBZGRyID0gMCxcbiAgICAgICAgICAgIHN1YlN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgaGFuZGxlVmFsLCBpZHgsIGFycmxlbiwgZXJyb3JDb2RlLCByZXR1cm5MZW47XG5cbiAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICBkYXRhU3RyaW5nID0gdGhpcy5kZWNvZGVCYXNlNjQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BwUmREYXRhJylbMF0uZmlyc3RDaGlsZC5kYXRhKTtcblxuICAgICAgICAvL1JlYWQgdGhlIGVycm9yIGNvZGVzIGFuZCB0aGUgcmV0dXJuIGxlbmd0aCBvZiB0aGUgQURTIHN1YiBjb21tYW5kcy5cbiAgICAgICAgZm9yIChpZHggPSAwLCBhcnJsZW4gPSBhcnJTeW1OYW1lcy5sZW5ndGg7IGlkeCA8IGFycmxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIDQpO1xuICAgICAgICAgICAgZXJyb3JDb2RlID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG4gICAgICAgICAgICBzdHJBZGRyICs9IDQ7XG5cbiAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCA0KTtcbiAgICAgICAgICAgIHJldHVybkxlbiA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuICAgICAgICAgICAgc3RyQWRkciArPSA0O1xuXG4gICAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogRXJyb3Igd2hpbGUgcmVhZGluZyBhIGhhbmRsZSBmcm9tIHRoZSBQTEMhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ0Vycm9yIGNvZGU6ICcgKyBlcnJvckNvZGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdIYW5kbGU6ICcgKyBhcnJTeW1OYW1lc1tpZHhdKTtcbiAgICAgICAgICAgICAgICB0aHJvdyAnSGFuZGxlIHJlcXVlc3QgYWJvcnRlZCEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9SdW4gdGhyb3VnaCB0aGUgZWxlbWVudHMgaW4gdGhlIHN5bWJvbE5hbWUgbGlzdCxcbiAgICAgICAgLy9nZXQgdGhlIGRhdGEgb3V0IG9mIHRoZSBzdHJpbmcgYW5kIHN0b3JlIGl0IGluIHRoZSBjYWNoZS5cbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIC8vU2xpY2UgdGhlIHN0cmluZyBhbmQgZGVjb2RlIHRoZSBkYXRhXG4gICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICBoYW5kbGVWYWwgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcbiAgICAgICAgICAgIHN0ckFkZHIgKz0gNDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDYWNoZVthcnJTeW1OYW1lc1tpZHhdXSA9IGhhbmRsZVZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2FjaGVSZWFkeSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBIYW5kbGUgY2FjaGUgcmVhZHkuJyk7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGVTaW5nbGUobWV0aG9kLCB0eXBlLCBhcmdzKSB7XG4gICAgICAgIGxldCByZXFEZXNjciA9IHRoaXMuY3JlYXRlU2luZ2xlRGVzY3JpcHRvcihtZXRob2QsIHR5cGUsIGFyZ3MpXG4gICAgICAgIGxldCBhZHNSZXEgPSB0aGlzLndyaXRlUmVxKHJlcURlc2NyKVxuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKVxuICAgICAgICBsZXQgdmFsdWUgPSBhd2FpdCB0aGlzLmFkc1JlcVNlbmRBc3luYyhhZHNSZXEpXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIGFzeW5jIHJlYWRTaW5nbGUobWV0aG9kLCB0eXBlLCBhcmdzKSB7XG4gICAgICAgIGxldCByZXFEZXNjciA9IHRoaXMuY3JlYXRlU2luZ2xlRGVzY3JpcHRvcihtZXRob2QsIHR5cGUsIGFyZ3MpXG4gICAgICAgIGxldCBhZHNSZXEgPSB0aGlzLnJlYWRSZXEocmVxRGVzY3IpXG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpXG4gICAgICAgIGxldCB2YWx1ZSA9IGF3YWl0IHRoaXMuYWRzUmVxU2VuZEFzeW5jKGFkc1JlcSlcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgRnVuY3Rpb25zIGZvciBDcmVhdGluZyBSZXF1ZXN0IERlc2NyaXB0b3JzXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAgXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIFJlcXVlc3QgRGVzY3JpcHRvciBmb3IgYSBzaW5nbGUgdmFyaWFibGUuIEFuIGl0ZW0gbGlzdFxuICAgICAqIHdpdGggYSBzaW5nbGUgYXJyYXkgaXRlbSBpcyBnZW5lcmF0ZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCAgIFRoZSBtZXRob2QsIGVpdGhlciBcIlJlYWRcIiBvciBcIldyaXRlXCIuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgICAgIFRoZSBQTEMgZGF0YSB0eXBlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzICAgICBUaGUgYXJndW1lbnRzIGZvciBidWlsZGluZyBmb3IgdGhlIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBjcmVhdGVTaW5nbGVEZXNjcmlwdG9yKG1ldGhvZCwgdHlwZSwgYXJncykge1xuXG4gICAgICAgIHZhciByZXFEZXNjciA9IHt9LFxuICAgICAgICAgICAgbGVuLCBpdGVtSW5mbztcblxuICAgICAgICBhcmdzLnR5cGUgPSB0eXBlOyAvL1RvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMgaW4gZ2V0SXRlbUluZm9ybWF0aW9uKClcblxuICAgICAgICBpdGVtSW5mbyA9IHRoaXMuZ2V0SXRlbUluZm9ybWF0aW9uKGFyZ3MpO1xuICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgICAgICAgICAgIC8vQ2hhbmdlIHRoZSByZWFkIGxlbmd0aCBpZiBhIHZhbHVlIGlzIGdpdmVuLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oYXJncy5zdHJsZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5zdHJsZW47XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IGFyZ3Muc3RybGVuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW1JbmZvLnN0cmluZ0xlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGxlbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSBsZW5ndGggb2YgdGhlIHN0cmluZyBmb3IgdGhpcyByZXF1ZXN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGVuKys7IC8vVGVybWluYXRpb25cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RJTUUnOlxuICAgICAgICAgICAgY2FzZSAnVE9EJzpcbiAgICAgICAgICAgIGNhc2UgJ0RUJzpcbiAgICAgICAgICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgICAgICAgY2FzZSAnREFURV9BTkRfVElNRSc6XG4gICAgICAgICAgICBjYXNlICdUSU1FX09GX0RBWSc6XG4gICAgICAgICAgICAgICAgLy9BcHBlbmQgdGhlIGZvcm1hdCBzdHJpbmcgdG8gdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3MuZm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3MuZm9ybWF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1JFQUwnOlxuICAgICAgICAgICAgY2FzZSAnTFJFQUwnOlxuICAgICAgICAgICAgICAgIC8vQXBwZW5kIHRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3MuZGVjUGxhY2VzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3MuZGVjUGxhY2VzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MuZHAgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5kcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NyZWF0ZSB0aGUgUmVxdWVzdCBEZXNjcmlwdG9yLlxuICAgICAgICByZXFEZXNjciA9IHtcbiAgICAgICAgICAgIGFkZHI6IGFyZ3MuYWRkcixcbiAgICAgICAgICAgIHN5bWJvbE5hbWU6IGl0ZW1JbmZvLnN5bWJvbE5hbWUsXG4gICAgICAgICAgICBkYXRhVHlwZU5hbWVzOiBpdGVtSW5mby5kYXRhVHlwZU5hbWVzLFxuICAgICAgICAgICAgZGF0YVR5cGVBcnJJZHg6IGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4LFxuICAgICAgICAgICAgc3ltYm9sTmFtZUFycklkeDogaXRlbUluZm8uc3ltYm9sTmFtZUFycklkeCxcbiAgICAgICAgICAgIGZ1bGxTeW1ib2xOYW1lOiBhcmdzLm5hbWUsXG4gICAgICAgICAgICB1c2VIYW5kbGU6IGFyZ3MuaGFuZGxlLFxuICAgICAgICAgICAgaWQ6IGFyZ3MuaWQsXG4gICAgICAgICAgICBvYzogYXJncy5vYyxcbiAgICAgICAgICAgIG9jZDogYXJncy5vY2QsXG4gICAgICAgICAgICBvZTogYXJncy5vZSxcbiAgICAgICAgICAgIG90OiBhcmdzLm90LFxuICAgICAgICAgICAgcmVhZExlbmd0aDogbGVuLFxuICAgICAgICAgICAgZGVidWc6IGFyZ3MuZGVidWcsXG4gICAgICAgICAgICBzeW5jOiBhcmdzLnN5bmMsXG4gICAgICAgICAgICBvZmZzOiBhcmdzLm9mZnMsXG4gICAgICAgICAgICBzZXE6IHRydWUsXG4gICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICB2YWw6IGFyZ3MudmFsLFxuICAgICAgICAgICAgICAgIGp2YXI6IGFyZ3MuanZhcixcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHByZWZpeDogYXJncy5wcmVmaXgsXG4gICAgICAgICAgICAgICAgc3VmZml4OiBhcmdzLnN1ZmZpeFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlcURlc2NyXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBSZXF1ZXN0IERlc2NyaXB0b3IgZm9yIGFuIGFycmF5LiBBbiBpdGVtIGxpc3Qgb2ZcbiAgICAgKiBzaW5nbGUgdmFyaWFibGVzIGlzIGdlbmVyYXRlZC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kICAgVGhlIG1ldGhvZCwgZWl0aGVyIFwiUmVhZFwiIG9yIFwiV3JpdGVcIi5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAgICAgVGhlIGRhdGEgdHlwZSBvZiB0aGUgUExDIHZhcmlhYmxlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzICAgICBUaGUgYXJndW1lbnRzIGZvciBidWlsZGluZyB0aGUgUmVxdWVzdCBEZXNjcmlwdG9yLlxuICAgICAqL1xuICAgIGNyZWF0ZUFycmF5RGVzY3JpcHRvcihtZXRob2QsIHR5cGUsIGFyZ3MpIHtcblxuICAgICAgICB2YXIgcmVxRGVzY3IgPSB7fSBhcyBhbnksXG4gICAgICAgICAgICBkYXRhT2JqID0ge30sXG4gICAgICAgICAgICBhcnJheUxlbmd0aCxcbiAgICAgICAgICAgIGFkZHJPZmZzZXQsXG4gICAgICAgICAgICBjbnQgPSAwLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGxlbixcbiAgICAgICAgICAgIGRlZkFyciA9IFtdLFxuICAgICAgICAgICAgbGVuQXJyRWxlbSxcbiAgICAgICAgICAgIGxhc3REZWZBcnIsXG4gICAgICAgICAgICBzdHJ1Y3RCeXRlTGVuID0gMCxcbiAgICAgICAgICAgIHN0cmxlbixcbiAgICAgICAgICAgIHZsZW4sXG4gICAgICAgICAgICB2bGVuTWF4ID0gMCxcbiAgICAgICAgICAgIGVuZFBhZExlbiA9IDAsXG4gICAgICAgICAgICBtb2QsXG4gICAgICAgICAgICBhZGRyLFxuICAgICAgICAgICAgd3J0T25lT25seSxcbiAgICAgICAgICAgIGFyclN5bVR5cGUsXG4gICAgICAgICAgICBpdGVtSW5mbztcblxuICAgICAgICBpdGVtSW5mbyA9IHRoaXMuZ2V0SXRlbUluZm9ybWF0aW9uKGFyZ3MpO1xuXG4gICAgICAgIC8vR2V0IHRoZSBvYmplY3Qgb2YgdGhlIHN0b3JlZCBkYXRhLCBkaXJlY3Qgd2l0aCAndmFsJ1xuICAgICAgICAvL2ZvciBhIHdyaXRlIHJlcXVlc3Qgb3IgcGFyc2luZyB0aGUgbmFtZSBpZiAnanZhcicgaXMgZ2l2ZW4uXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScgJiYgdHlwZW9mIGFyZ3MudmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZGF0YU9iaiA9IGFyZ3MudmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmp2YXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhT2JqID0gdGhpcy5wYXJzZVZhck5hbWUoYXJncy5qdmFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIGRhdGEgb2JqZWN0IGZvciB0aGlzICcgKyBtZXRob2QgKyAnLVJlcXVlc3QgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYXJncy5hcnJsZW4gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAvL092ZXJyaWRlIGFycmF5IGxlbmd0aCBpZiBtYW51YWxseSBzZXRcbiAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gYXJncy5hcnJsZW47XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbUluZm8uYXJyYXlMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy9HZXQgdGhlIGFycmF5IGxlbmd0aCBmcm9tIHRoZSBzeW1ib2wgdGFibGUuXG4gICAgICAgICAgICBhcnJheUxlbmd0aCA9IGl0ZW1JbmZvLmFycmF5TGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ2FuXFwndCBnZXQgdGhlIGFycmF5IGxlbmd0aCBmb3IgdGhpcyByZXF1ZXN0IScpO1xuICAgICAgICAgICAgdGhpcy5sb2coYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoZWNrIGlmIG9ubHkgb25lIGl0ZW0gc2hvdWxkIGJlIHdyaXR0ZW4uXG4gICAgICAgIGlmICh0eXBlb2YgYXJncy5pdGVtID09PSAnbnVtYmVyJyAmJiAhaXNOYU4oYXJncy5pdGVtKSAmJiBtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgIHdydE9uZU9ubHkgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGFyZ3MuaXRlbSA8IDAgfHwgYXJncy5pdGVtID4gYXJyYXlMZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogV3JvbmcgdmFsdWUgZm9yIFwiaXRlbVwiIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdpdGVtOiAnICsgYXJncy5pdGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnTGFzdCBhcnJheSBpbmRleDogJyArIChhcnJheUxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbiBmb3IgY3JlYXRpbmcgYW4gZGVzY3JpcHRvciBmb3IgYXJyYXkgb2Ygc3RydWN0dXJlcy5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGNyZWF0ZVN0cnVjdEFyciA9ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIGVsZW07XG4gICAgICAgICAgICAvL1BhcnNlIHRoZSBuYW1lIG9mIHRoZSBzdHJ1Y3R1cmUgZGVmaW5pdG9uLCBpZiBpdCBpcyBwYXNzZWRcbiAgICAgICAgICAgIC8vYXMgYSBzdHJpbmcuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3MuZGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGFyZ3MuZGVmID0gdGhpcy5wYXJzZVZhck5hbWUoYXJncy5kZWYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSA9PT0gdHJ1ZSAmJiBhcmdzLmRlZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYXJncy5kZWYgPSB0aGlzLmNyZWF0ZVN0cnVjdERlZihpdGVtSW5mby5kYXRhVHlwZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmRlZiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBzdHJ1Y3R1cmUgZGVmaW5pdGlvbiBmb3VuZCEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiB0aGUgc3RydWN0dXJlIGFuZCB0aGUgcGFkZGluZyBieXRlc1xuICAgICAgICAgICAgZm9yIChlbGVtIGluIGFyZ3MuZGVmKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXJncy5kZWYuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL1NlcGFyYXRlIGRhdGEgdHlwZSBhbmQgbGVuZ3RoLlxuICAgICAgICAgICAgICAgICAgICBkZWZBcnIgPSBhcmdzLmRlZltlbGVtXS5zcGxpdCgnLicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbMF0gPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbkFyckVsZW0gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZkFyci5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5BcnJFbGVtID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5BcnJFbGVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBsZW5ndGggb2YgdGhlIFBMQyB2YXJpYWJsZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbMF0gPT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZBcnJbMV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IHBhcnNlSW50KGRlZkFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bGVuID0gKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihzdHJsZW4pID8gc3RybGVuIDogdGhpcy5wbGNUeXBlTGVuW2RlZkFyclswXV0pICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmxlbiA9IHRoaXMucGxjVHlwZUxlbltkZWZBcnJbMF1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0FkZCB0aGUgbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxICYmIHZsZW4gPiAxICYmIGRlZkFyclswXSAhPT0gJ1NUUklORycgJiYgc3RydWN0Qnl0ZUxlbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2QgPSBzdHJ1Y3RCeXRlTGVuICUgdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJ1Y3RCeXRlTGVuICs9IHZsZW4gLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RydWN0Qnl0ZUxlbiArPSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vU3RvcmUgdGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgIC8vZm9yIGluc2VydGluZyBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB2bGVuID4gdmxlbk1heCAmJiBkZWZBcnJbMF0gIT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bGVuTWF4ID0gdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlXG4gICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxICYmIHZsZW5NYXggPiAxICYmIGRlZkFyclswXSAhPT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICBpZiAodmxlbk1heCA+IHRoaXMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZsZW5NYXggPSB0aGlzLmFsaWdubWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9kID0gc3RydWN0Qnl0ZUxlbiAlIHZsZW5NYXg7XG4gICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kUGFkTGVuID0gdmxlbk1heCAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgc3RydWN0Qnl0ZUxlbiArPSBlbmRQYWRMZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1NldCB0aGUgYWRkcmVzcyBvZmZzZXQgYW5kIHRoZSBsZW5ndGggdG8gMSBcbiAgICAgICAgICAgIC8vaWYgb25seSBvbmUgaXRlbSBzaG91bGQgYmUgc2VudC5cbiAgICAgICAgICAgIGlmICh3cnRPbmVPbmx5KSB7XG4gICAgICAgICAgICAgICAgYWRkck9mZnNldCA9IHN0cnVjdEJ5dGVMZW4gKiBhcmdzLml0ZW07XG4gICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXFEZXNjciA9IHtcbiAgICAgICAgICAgICAgICBhZGRyOiBhcmdzLmFkZHIsXG4gICAgICAgICAgICAgICAgc3ltYm9sTmFtZTogaXRlbUluZm8uc3ltYm9sTmFtZSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZU5hbWVzOiBpdGVtSW5mby5kYXRhVHlwZU5hbWVzLFxuICAgICAgICAgICAgICAgIGZ1bGxTeW1ib2xOYW1lOiBhcmdzLm5hbWUsXG4gICAgICAgICAgICAgICAgYWRkck9mZnNldDogYWRkck9mZnNldCxcbiAgICAgICAgICAgICAgICB1c2VIYW5kbGU6IGFyZ3MuaGFuZGxlLFxuICAgICAgICAgICAgICAgIGlkOiBhcmdzLmlkLFxuICAgICAgICAgICAgICAgIG9jOiBhcmdzLm9jLFxuICAgICAgICAgICAgICAgIG9jZDogYXJncy5vY2QsXG4gICAgICAgICAgICAgICAgb2U6IGFyZ3Mub2UsXG4gICAgICAgICAgICAgICAgb3Q6IGFyZ3Mub3QsXG4gICAgICAgICAgICAgICAgZGVidWc6IGFyZ3MuZGVidWcsXG4gICAgICAgICAgICAgICAgcmVhZExlbmd0aDogc3RydWN0Qnl0ZUxlbiAqIGFycmF5TGVuZ3RoLFxuICAgICAgICAgICAgICAgIHNlcTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYWxjQWxpZ25tZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGFPYmo6IGRhdGFPYmosXG4gICAgICAgICAgICAgICAgc3luYzogYXJncy5zeW5jLFxuICAgICAgICAgICAgICAgIG9mZnM6IGFyZ3Mub2ZmcyxcbiAgICAgICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBpdGVtIGxpc3QuXG4gICAgICAgICAgICAvL0FsdGhvdWdoIGp2YXIgaXNuJ3QgbmVjZXNzYXJ5IGZvciB3cml0ZSByZXF1ZXN0cyxcbiAgICAgICAgICAgIC8vaXQncyBnb29kIGZvciBlYXNpZXIgZGVidWdnaW5nLlxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGZvciAoZWxlbSBpbiBhcmdzLmRlZikge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmRlZi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZBcnIgPSBhcmdzLmRlZltlbGVtXS5zcGxpdCgnLicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyWzBdID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IHBhcnNlSW50KGRlZkFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REZWZBcnIgPSBkZWZBcnIubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5BcnJFbGVtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyOiBpICsgJy4nICsgZWxlbSArIGpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXSArICcuJyArIGRlZkFyclszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyOiBpICsgJy4nICsgZWxlbSArICcuJyArIGpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXSArICcuJyArIGRlZkFyclszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdydE9uZU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialthcmdzLml0ZW1dW2VsZW0gKyBqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbYXJncy5pdGVtXVtlbGVtXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2ldW2VsZW0gKyBqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbaV1bZWxlbV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhcjogaSArICcuJyArIGVsZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGFyZ3MuZGVmW2VsZW1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3cnRPbmVPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbYXJncy5pdGVtXVtlbGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialtpXVtlbGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1NldCBhbiBpdGVtIGFzIGEgbWFyayBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAvL2ZvciBpbnNlcnRpbmcgcGFkZGluZyBieXRlcyBpbiBcIndyaXRlUmVxXCIgYW5kIFwicmVhZFJlcVwiIGxhdGVyLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdFbmRTdHJ1Y3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsOiBlbmRQYWRMZW5cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIGRlc2NyaXB0b3IgZm9yIGEgc2ltcGxlIGFycmF5LlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgY3JlYXRlU2ltcGxlQXJyID0gKCkgPT4ge1xuICAgICAgICAgICAgbGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKGFyZ3Muc3RybGVuKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGFuZ2UgdGhlIHJlYWQgbGVuZ3RoIGlmIGEgdmFsdWUgaXMgZ2l2ZW4uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3Muc3RybGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gYXJncy5zdHJsZW47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW1JbmZvLnN0cmluZ0xlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgbGVuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcgZm9yIHRoaXMgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxlbisrOyAvL1Rlcm1pbmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1RJTUUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1RPRCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnRFQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RBVEVfQU5EX1RJTUUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1RJTUVfT0ZfREFZJzpcbiAgICAgICAgICAgICAgICAgICAgLy9BcHBlbmQgdGhlIGZvcm1hdCBzdHJpbmcgdG8gdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUkVBTCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnTFJFQUwnOlxuICAgICAgICAgICAgICAgICAgICAvL0FwcGVuZCB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncy5kZWNQbGFjZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3MuZGVjUGxhY2VzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBhcmdzLmRwID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmRwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1NldCB0aGUgYWRkcmVzcyBvZmZzZXQgYW5kIHRoZSBsZW5ndGggdG8gMSBcbiAgICAgICAgICAgIC8vaWYgb25seSBvbmUgaXRlbSBzaG91bGQgYmUgc2VudC5cbiAgICAgICAgICAgIGlmICh3cnRPbmVPbmx5KSB7XG4gICAgICAgICAgICAgICAgYWRkck9mZnNldCA9IGFyZ3MuaXRlbSAqIGxlbjtcbiAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcURlc2NyID0ge1xuICAgICAgICAgICAgICAgIGFkZHI6IGFyZ3MuYWRkcixcbiAgICAgICAgICAgICAgICBzeW1ib2xOYW1lOiBpdGVtSW5mby5zeW1ib2xOYW1lLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlTmFtZXM6IGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXMsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVBcnJJZHg6IGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4LFxuICAgICAgICAgICAgICAgIHN5bWJvbE5hbWVBcnJJZHg6IGl0ZW1JbmZvLnN5bWJvbE5hbWVBcnJJZHgsXG4gICAgICAgICAgICAgICAgZnVsbFN5bWJvbE5hbWU6IGFyZ3MubmFtZSxcbiAgICAgICAgICAgICAgICB1c2VIYW5kbGU6IGFyZ3MuaGFuZGxlLFxuICAgICAgICAgICAgICAgIGFkZHJPZmZzZXQ6IGFkZHJPZmZzZXQsXG4gICAgICAgICAgICAgICAgaWQ6IGFyZ3MuaWQsXG4gICAgICAgICAgICAgICAgb2M6IGFyZ3Mub2MsXG4gICAgICAgICAgICAgICAgb2NkOiBhcmdzLm9jZCxcbiAgICAgICAgICAgICAgICBvZTogYXJncy5vZSxcbiAgICAgICAgICAgICAgICBvdDogYXJncy5vdCxcbiAgICAgICAgICAgICAgICByZWFkTGVuZ3RoOiBsZW4gKiBhcnJheUxlbmd0aCxcbiAgICAgICAgICAgICAgICBkZWJ1ZzogYXJncy5kZWJ1ZyxcbiAgICAgICAgICAgICAgICBzZXE6IHRydWUsXG4gICAgICAgICAgICAgICAgZGF0YU9iajogZGF0YU9iaixcbiAgICAgICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBpdGVtIGxpc3QuXG4gICAgICAgICAgICAvL0FsdGhvdWdoIGp2YXIgaXNuJ3QgbmVjZXNzYXJ5IGZvciB3cml0ZSByZXF1ZXN0cyxcbiAgICAgICAgICAgIC8vaXQncyBnb29kIGZvciBlYXNpZXIgZGVidWdnaW5nLlxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAganZhcjogaSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAod3J0T25lT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbaV0udmFsID0gZGF0YU9ialthcmdzLml0ZW1dO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbaV0udmFsID0gZGF0YU9ialtpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdTVFJVQ1QnKSB7XG4gICAgICAgICAgICBjcmVhdGVTdHJ1Y3RBcnIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNyZWF0ZVNpbXBsZUFycigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlUmVxKHJlcURlc2NyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVhZFJlcShyZXFEZXNjcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFJlcXVlc3QgRGVzY3JpcHRvciBmb3IgYSBzdHJ1Y3R1cmUsXG4gICAgICogYSBzdHJ1Y3R1cmUgZGVmaW5pdGlvbiBoYXMgdG8gYmUgcGFzc2VkIGFzIG9uZSBvZiB0aGUgYXJndW1lbnRzLFxuICAgICAqIGZyb20gd2ljaCB0aGUgaXRlbSBsaXN0IGlzIGNyZWF0ZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCAgIFRoZSBtZXRob2QsIGVpdGhlciBcIlJlYWRcIiBvciBcIldyaXRlXCIuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFyZ3MgICAgIFRoZSBhcmd1bWVudHMgZm9yIGJ1aWxkaW5nIHRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuXG4gICAgICovXG4gICAgY3JlYXRlU3RydWN0RGVzY3JpcHRvcihtZXRob2QsIGFyZ3MpIHtcblxuICAgICAgICB2YXIgcmVxRGVzY3IgPSB7fSBhcyBhbnksICAgICAgLy9SZXF1ZXN0IERlc2NyaXB0b3JcbiAgICAgICAgICAgIGRhdGFPYmogPSB7fSwgICAgICAgLy9vYmplY3Qgd2ljaCBob2xkcyB0aGUgZGF0YSBmb3Igd3JpdGUgcmVxdWVzdHMgXG4gICAgICAgICAgICBkZWZBcnIgPSBbXSwgICAgICAgIC8vc3ViZWxlbWVudHMgb2YgYSBzdHJ1Y3R1cmUgZGVmaW5pdGlvbiBpdGVtXG4gICAgICAgICAgICBjbnQgPSAwLFxuICAgICAgICAgICAgbGFzdERlZkFycixcbiAgICAgICAgICAgIGxlbkFyckVsZW0sXG4gICAgICAgICAgICBlbGVtLFxuICAgICAgICAgICAgaixcbiAgICAgICAgICAgIGl0ZW1JbmZvO1xuXG4gICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oYXJncyk7XG5cbiAgICAgICAgLy9HZXQgdGhlIG9iamVjdCBvZiB0aGUgc3RvcmVkIGRhdGEsIGRpcmVjdCB3aXRoICd2YWwnXG4gICAgICAgIC8vZm9yIGEgd3JpdGUgcmVxdWVzdCBvciBwYXJzaW5nIHRoZSBuYW1lIGlmICdqdmFyJyBpcyBnaXZlbi5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJyAmJiB0eXBlb2YgYXJncy52YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBkYXRhT2JqID0gYXJncy52YWw7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MuanZhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGFPYmogPSB0aGlzLnBhcnNlVmFyTmFtZShhcmdzLmp2YXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gZGF0YSBvYmplY3QgZm9yIHRoaXMgJyArIG1ldGhvZCArICctUmVxdWVzdCBkZWZpbmVkIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9QYXJzZSB0aGUgbmFtZSBvZiB0aGUgc3RydWN0dXJlIGRlZmluaXRvbiwgaWYgaXQgaXMgcGFzc2VkXG4gICAgICAgIC8vYXMgYSBzdHJpbmcuXG4gICAgICAgIGlmICh0eXBlb2YgYXJncy5kZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBhcmdzLmRlZiA9IHRoaXMucGFyc2VWYXJOYW1lKGFyZ3MuZGVmKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSA9PT0gdHJ1ZSAmJiBhcmdzLmRlZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhcmdzLmRlZiA9IHRoaXMuY3JlYXRlU3RydWN0RGVmKGl0ZW1JbmZvLmRhdGFUeXBlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJncy5kZWYgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBzdHJ1Y3R1cmUgZGVmaW5pbml0aW9uIGZvdW5kIChjcmVhdGVBcnJheURlc2NyaXB0b3IoKSkhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcURlc2NyID0ge1xuICAgICAgICAgICAgYWRkcjogYXJncy5hZGRyLFxuICAgICAgICAgICAgc3ltYm9sTmFtZTogaXRlbUluZm8uc3ltYm9sTmFtZSxcbiAgICAgICAgICAgIGRhdGFUeXBlTmFtZXM6IGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXMsXG4gICAgICAgICAgICBkYXRhVHlwZUFycklkeDogaXRlbUluZm8uZGF0YVR5cGVBcnJJZHgsXG4gICAgICAgICAgICBzeW1ib2xOYW1lQXJySWR4OiBpdGVtSW5mby5zeW1ib2xOYW1lQXJySWR4LFxuICAgICAgICAgICAgZnVsbFN5bWJvbE5hbWU6IGFyZ3MubmFtZSxcbiAgICAgICAgICAgIHVzZUhhbmRsZTogYXJncy5oYW5kbGUsXG4gICAgICAgICAgICBpZDogYXJncy5pZCxcbiAgICAgICAgICAgIG9jOiBhcmdzLm9jLFxuICAgICAgICAgICAgb2NkOiBhcmdzLm9jZCxcbiAgICAgICAgICAgIG9lOiBhcmdzLm9lLFxuICAgICAgICAgICAgb3Q6IGFyZ3Mub3QsXG4gICAgICAgICAgICBkZWJ1ZzogYXJncy5kZWJ1ZyxcbiAgICAgICAgICAgIHNlcTogdHJ1ZSxcbiAgICAgICAgICAgIGNhbGNBbGlnbm1lbnQ6IHRydWUsXG4gICAgICAgICAgICBkYXRhT2JqOiBkYXRhT2JqLFxuICAgICAgICAgICAgc3luYzogYXJncy5zeW5jLFxuICAgICAgICAgICAgb2ZmczogYXJncy5vZmZzLFxuICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9DcmVhdGUgdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgLy9BbHRob3VnaCBqdmFyIGlzbid0IG5lY2Vzc2FyeSBmb3Igd3JpdGUgcmVxdWVzdHMsXG4gICAgICAgIC8vaXQncyBnb29kIGZvciBlYXNpZXIgZGVidWdnaW5nLlxuICAgICAgICBmb3IgKGVsZW0gaW4gYXJncy5kZWYpIHtcblxuICAgICAgICAgICAgaWYgKGFyZ3MuZGVmLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG5cbiAgICAgICAgICAgICAgICBkZWZBcnIgPSBhcmdzLmRlZltlbGVtXS5zcGxpdCgnLicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICBsZW5BcnJFbGVtID0gcGFyc2VJbnQoZGVmQXJyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3REZWZBcnIgPSBkZWZBcnIubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbkFyckVsZW07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGVsZW0gKyBqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl0gKyAnLicgKyBkZWZBcnJbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhcjogZWxlbSArICcuJyArIGpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXSArICcuJyArIGRlZkFyclszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2VsZW0gKyBqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbZWxlbV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAganZhcjogZWxlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGFyZ3MuZGVmW2VsZW1dXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialtlbGVtXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0NhbGwgdGhlIHNlbmQgZnVuY3Rpb25cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgdGhpcy53cml0ZVJlcShyZXFEZXNjcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRSZXEocmVxRGVzY3IpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHVibGljIE1ldGhvZHNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSB3cml0ZSByZXF1ZXN0LiBEZXBlbmRpbmcgb24gdGhlXG4gICAgICogdmFsdWVzIGFuZCBQTEMgZGF0YSB0eXBlcyBwYXNzZWQgaW4gdGhlIHZhcmlhYmxlIGxpc3QgYSBieXRlIGFycmF5IGlzXG4gICAgICogY3JlYXRlZCBhbmQgdGhlIGZ1bmN0aW9uIGZvciBzZW5kaW5nIHRoZSByZXF1ZXN0IGlzIGNhbGxlZC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gIHJlcURlc2NyICAgIFRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuIEJlc2lkZXMgb3RoZXIgaW5mb3JtYXRpb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb2JqZWN0IGNvbnRhaW5zIHRoZSBhbGxvY2F0aW9uIG9mIFBMQyBhbmRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEphdmFTY3JpcHQgdmFyaWFibGVzIGluIGFuIGl0ZW0gbGlzdC5cbiAgICAgKi9cbiAgICB3cml0ZVJlcShyZXFEZXNjcikge1xuXG4gICAgICAgIHZhciBpdGVtTGlzdCA9IHJlcURlc2NyLml0ZW1zLFxuICAgICAgICAgICAgYWRzUmVxID0ge30sXG4gICAgICAgICAgICBwRGF0YSA9IFtdIGFzIGFueSxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIGJ5dGVzID0gW10sXG4gICAgICAgICAgICB0eXBlLCBmb3JtYXQsIGxpc3RsZW4sIGxlbiwgdmFsLCBwY291bnQsIG1vZCwgaXRlbSwgaSwgaWR4O1xuXG4gICAgICAgIC8vU2V0IHRoZSB2YXJpYWJsZSBuYW1lIHRvIHVwcGVyIGNhc2UuXG4gICAgICAgIGlmICh0eXBlb2YgcmVxRGVzY3IubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlcURlc2NyLm5hbWUgPSByZXFEZXNjci5uYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1J1biB0aHJvdWdoIHRoZSBlbGVtZW50cyBpbiB0aGUgaXRlbSBsaXN0LlxuICAgICAgICBmb3IgKGlkeCA9IDAsIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGg7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtTGlzdFtpZHhdO1xuXG4gICAgICAgICAgICAvL0dldCB0eXBlIGFuZCBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgICAgICAgIGFyclR5cGUgPSB0aGlzLmdldFR5cGVBbmRGb3JtYXQoaXRlbSk7XG4gICAgICAgICAgICB0eXBlID0gYXJyVHlwZVswXTtcbiAgICAgICAgICAgIGZvcm1hdCA9IGFyclR5cGVbMV07XG5cbiAgICAgICAgICAgIC8vTGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICAvL01heGltdW0gbGVuZ2h0IGlzIGxpbWl0ZWQgdG8gNCAoZHVlIHRvIHN0cnVjdHVyZSBwYWRkaW5nKSxcbiAgICAgICAgICAgIC8vdGhlIGxlbmdodCBvZiBzdHJpbmdzIGlzIGNhbGN1bGF0ZWQgbGF0ZXIuXG4gICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wbGNUeXBlTGVuW3R5cGVdKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgZGF0YSB0eXBlOiAnICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUHJvYmFibHkgd3JvbmcgdHlwZSBkZWZpbml0aW9uLiBQbGVhc2UgY2hlY2sgdGhlIG1hbnVhbC4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXFEZXNjcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1BhZGRpbmcgd2l0aGluIHN0cnVjdHVyZXMuXG4gICAgICAgICAgICAvL1wiY2FsY0FsaWdubWVudFwiIGlzIG9ubHkgc2V0IGluIFwid3JpdGVTdHJ1Y3QvcmVhZFN0cnVjdFwiIGFuZFxuICAgICAgICAgICAgLy9cIndyaXRlQXJyYXlPZlN0cnVjdC9yZWFkQXJyYXlPZlN0cnVjdFwiXG4gICAgICAgICAgICBsZW4gPSAodGhpcy5wbGNUeXBlTGVuW3R5cGVdIDwgdGhpcy5hbGlnbm1lbnQpID8gdGhpcy5wbGNUeXBlTGVuW3R5cGVdIDogdGhpcy5hbGlnbm1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChyZXFEZXNjci5jYWxjQWxpZ25tZW50ID09PSB0cnVlICYmIGxlbiA+IDEgJiYgdHlwZSAhPT0gJ1NUUklORycgJiYgdHlwZSAhPT0gJ0VuZFN0cnVjdCcgJiYgcERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG1vZCA9IHBEYXRhLmxlbmd0aCAlIGxlbjtcbiAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwY291bnQgPSBsZW4gLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDE7IGkgPD0gcGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBEYXRhLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ29udmVydCBkYXRhLCBkZXBlbmRpbmcgb24gdGhlIHR5cGVcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnRW5kU3RydWN0Jykge1xuICAgICAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAgIC8vXCJFbmRTdHJ1Y3RcIiBpcyBvbmx5IHVzZWQgd2l0aCBcInJlYWRBcnJheU9mU3RydWN0dXJlcy93cml0ZUFycmF5T2ZTdHJ1Y3R1cmVzXCIuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8PSBpdGVtLnZhbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBEYXRhLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGEgdG8gYSBieXRlIGFycmF5LlxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoaXRlbSwgdHlwZSwgZm9ybWF0LCB0aGlzLnBsY1R5cGVMZW5bdHlwZV0pO1xuICAgICAgICAgICAgICAgIC8vU3VtbWFyaXNlIHRoZSBkYXRhLiAgICAgXG4gICAgICAgICAgICAgICAgcERhdGEgPSBwRGF0YS5jb25jYXQoYnl0ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRhIHRvIEJhc2U2NC5cbiAgICAgICAgaWYgKHBEYXRhICYmIHBEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHBEYXRhID0gdGhpcy5lbmNvZGVCYXNlNjQocERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdXcml0ZScsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmdldEluZGV4R3JvdXAocmVxRGVzY3IpLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IHRoaXMuZ2V0SW5kZXhPZmZzZXQocmVxRGVzY3IpLFxuICAgICAgICAgICAgcERhdGE6IHBEYXRhLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhZHNSZXFcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSByZWFkIHJlcXVlc3QuIElmIG5vIHZhbHVlIGZvciB0aGVcbiAgICAgKiBkYXRhIGxlbmd0aCBpc3QgcGFzc2VkLCBjYWxjdWxhdGUgdGhlIHZhbHVlIGFuZCB0aGVuIGNhbGwgdGhlIGZ1bmN0aW9uIFxuICAgICAqIGZvciBzZW5kaW5nIHRoZSByZXF1ZXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgcmVxRGVzY3IgICAgVGhlIFJlcXVlc3QgRGVzY3JpcHRvci4gQmVzaWRlcyBvdGhlciBpbmZvcm1hdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGFsbG9jYXRpb24gb2YgUExDIGFuZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSmF2YVNjcmlwdCB2YXJpYWJsZXMgaW4gYW4gaXRlbSBsaXN0LlxuICAgICAqL1xuICAgIHJlYWRSZXEocmVxRGVzY3IpIHtcblxuICAgICAgICB2YXIgYWRzUmVxID0ge30sXG4gICAgICAgICAgICBpdGVtTGlzdCA9IHJlcURlc2NyLml0ZW1zLFxuICAgICAgICAgICAgYXJyVHlwZSA9IFtdLFxuICAgICAgICAgICAgaXRlbSwgZm9ybWF0LCB0eXBlLCBsaXN0bGVuLCBtb2QsIHZsZW4sIHN0cmxlbiwgaWR4LCBzdGFydGFkZHI7XG5cbiAgICAgICAgLy9DYWxjdWxhdGUgdGhlIGRhdGEgbGVuZ3RoIGlmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLlxuICAgICAgICBpZiAodHlwZW9mIHJlcURlc2NyLnJlYWRMZW5ndGggIT09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGlkeCA9IDAsIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGg7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgICAgIC8vR2V0IHR5cGUgYW5kIGZvcm1hdHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgICAgIGFyclR5cGUgPSB0aGlzLmdldFR5cGVBbmRGb3JtYXQoaXRlbSk7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGFyclR5cGVbMF07XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gYXJyVHlwZVsxXTtcblxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBsZW5ndGggb2YgdGhlIFBMQyB2YXJpYWJsZS5cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wbGNUeXBlTGVuW3R5cGVdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSBsZW5ndGggb2YgdGhlIGRhdGEgdHlwZTogJyArIHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQcm9iYWJseSB3cm9uZyB0eXBlIGRlZmluaXRpb24uIFBsZWFzZSBjaGVjayB0aGUgbWFudWFsLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXFEZXNjcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RybGVuID0gcGFyc2VJbnQoZm9ybWF0LCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmxlbiA9ICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSA/IHN0cmxlbiA6IHRoaXMucGxjVHlwZUxlblt0eXBlXSkgKyAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcURlc2NyLnNlcSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvL0FkZCB0aGUgbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGVzIGlmIGNvbnRpbnVvdXNseSBhZGRyZXNzaW5nIGlzIHVzZWQuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXFEZXNjci5jYWxjQWxpZ25tZW50ID09PSB0cnVlICYmIHZsZW4gPiAxICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHJlcURlc2NyLnJlYWRMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2QgPSByZXFEZXNjci5yZWFkTGVuZ3RoICUgdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCArPSB2bGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggKz0gdmxlbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL0xhc3QgZWxlbWVudCBpZiBzaW5nbGUgYWRkcmVzc2VzIGFyZSBnaXZlbi5cbiAgICAgICAgICAgICAgICAgICAgc3RhcnRhZGRyID0gdGhpcy5nZXRJbmRleE9mZnNldChyZXFEZXNjcik7XG4gICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggPSB2bGVuICsgaXRlbS5hZGRyIC0gc3RhcnRhZGRyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuZ2V0SW5kZXhHcm91cChyZXFEZXNjciksXG4gICAgICAgICAgICBpbmRleE9mZnNldDogdGhpcy5nZXRJbmRleE9mZnNldChyZXFEZXNjciksXG4gICAgICAgICAgICByZXFEZXNjcjogcmVxRGVzY3JcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGFkc1JlcVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHN1bSByZWFkIHJlcXVlc3QuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICByZXFEZXNjciAgICBUaGUgUmVxdWVzdCBEZXNjcmlwdG9yLiBCZXNpZGVzIG90aGVyIGluZm9ybWF0aW9uXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9iamVjdCBjb250YWlucyB0aGUgYWxsb2NhdGlvbiBvZiBQTEMgYW5kXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IHZhcmlhYmxlcyBpbiBhbiBpdGVtIGxpc3QuXG4gICAgICovXG4gICAgc3VtUmVhZFJlcShyZXFEZXNjcikge1xuICAgICAgICB2YXIgYWRzUmVxID0ge30sXG4gICAgICAgICAgICBpdGVtTGlzdCA9IHJlcURlc2NyLml0ZW1zLFxuICAgICAgICAgICAgYXJyVHlwZSA9IFtdLFxuICAgICAgICAgICAgcmVxQnVmZmVyID0gW10sXG4gICAgICAgICAgICBieXRlcyA9IFtdLFxuICAgICAgICAgICAgbGlzdGxlbiA9IGl0ZW1MaXN0Lmxlbmd0aCxcbiAgICAgICAgICAgIGR1bW15ID0ge30gYXMgYW55LFxuICAgICAgICAgICAgdHlwZSwgZm9ybWF0LCBpdGVtLCBpZHgsIGxlbiwgcHdyRGF0YSwgaXRlbUluZm87XG5cbiAgICAgICAgLy9QcmVzZXQgdGhlIHJlYWQgbGVudGggd2l0aCB0aGUgbnVtYmVyIG9mIGJ5dGUgZm9yIGVycm9yIGNvZGVzLlxuICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gbGlzdGxlbiAqIDQ7XG5cbiAgICAgICAgLy9CdWlsZCB0aGUgUmVxdWVzdCBCdWZmZXJcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihpdGVtKTtcblxuICAgICAgICAgICAgLy9MZW5ndGggb2YgdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLnNpemU7XG5cbiAgICAgICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggKz0gbGVuO1xuXG4gICAgICAgICAgICAvL0J1aWxkIHRoZSByZXF1ZXN0IGJ1ZmZlci5cbiAgICAgICAgICAgIC8vVGhlIGZ1bmN0aW9uIGRhdGFUb0J5dGVBcnJheSBleHBlY3RzIGFuIGl0ZW0gd2l0aCBhIHZhbHVlIGZvclxuICAgICAgICAgICAgLy9jb252ZXJ0aW5nLCBzbyBhIGR1bW15IG9iamVjdCBpcyB1c2VkIGhlcmUuXG4gICAgICAgICAgICBkdW1teS52YWwgPSB0aGlzLmdldEluZGV4R3JvdXAoaXRlbUluZm8pO1xuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgJ1VESU5UJywgZm9ybWF0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICBkdW1teS52YWwgPSB0aGlzLmdldEluZGV4T2Zmc2V0KGl0ZW1JbmZvKTtcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksICdVRElOVCcsIGZvcm1hdCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgZHVtbXkudmFsID0gbGVuO1xuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgJ1VESU5UJywgZm9ybWF0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvL0NvbnZlcnQgdGhlIHJlcXVlc3QgYnVmZmVyIHRvIEJhc2U2NCBjb2RlZCBkYXRhLlxuICAgICAgICBpZiAocmVxQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHB3ckRhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChyZXFCdWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkV3JpdGUnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5pbmRleEdyb3Vwcy5TdW1SZCxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiBpdGVtTGlzdC5sZW5ndGgsXG4gICAgICAgICAgICBwd3JEYXRhOiBwd3JEYXRhLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpLnNlbmQoKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzdW0gd3JpdGUgcmVxdWVzdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gIHJlcURlc2NyICAgIFRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuIEJlc2lkZXMgb3RoZXIgaW5mb3JtYXRpb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb2JqZWN0IGNvbnRhaW5zIHRoZSBhbGxvY2F0aW9uIG9mIFBMQyBhbmRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEphdmFTY3JpcHQgdmFyaWFibGVzIGluIGFuIGl0ZW0gbGlzdC5cbiAgICAgKi9cbiAgICBzdW1Xcml0ZVJlcShyZXFEZXNjcikge1xuICAgICAgICB2YXIgYWRzUmVxID0ge30sXG4gICAgICAgICAgICBpdGVtTGlzdCA9IHJlcURlc2NyLml0ZW1zLFxuICAgICAgICAgICAgYXJyVHlwZSA9IFtdLFxuICAgICAgICAgICAgcmVxQnVmZmVyID0gW10sXG4gICAgICAgICAgICBieXRlcyA9IFtdLFxuICAgICAgICAgICAgbGlzdGxlbiA9IGl0ZW1MaXN0Lmxlbmd0aCxcbiAgICAgICAgICAgIGR1bW15ID0ge30gYXMgYW55LFxuICAgICAgICAgICAgdmxlbk1heCA9IDAsXG4gICAgICAgICAgICB0eXBlLCBmb3JtYXQsIGl0ZW0sIGlkeCwgbGVuLCBwd3JEYXRhLCBpLCBrLCBhcnJheUxlbmd0aCwgbW9kLCBwY291bnQsIGl0ZW1JbmZvO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZ1bmN0aW9uIGZvciBnZXR0aW5nIHRoZSBsZW5ndGggb2YgYSB2YXJpYWJsZS5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGdldFZhckxlbmd0aCA9ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBzdHJsZW47XG5cbiAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IHBhcnNlSW50KGZvcm1hdCwgMTApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW1JbmZvLnN0cmluZ0xlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RybGVuID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3JtYXQgPSAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKHN0cmxlbikgPyBzdHJsZW4gOiBsZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgICogUGFyc2UgdGhlIHN0dWN0dXJlIGRlZmluaXRpb24uXG4gICAgICAgICAgICAqL1xuICAgICAgICBjb25zdCBwYXJzZVN0cnVjdCA9ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIGosIGRlZkFyciwgbGVuQXJyRWxlbSwgbGFzdERlZkFyciwgbW9kLCBlbGVtLCBzdWJCdWZmZXIgPSBbXTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBGdW5jdGlvbiBmb3IgYWRkaW5nIHBhZGRpbmcgYnl0ZXMgaWYgYW4gYWxpZ25tZW50IGlzIHVzZWQuIFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBjaGVja0FsaWdubWVudCA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIHZhciB2bGVuLCBrO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB0eXBlICE9PSAnU1RSSU5HJyAmJiB0eXBlICE9PSAnRW5kU3RydWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIGZvciBjYWxjdWxhdGluZyBwYWRkaW5nIGJ5dGVzXG4gICAgICAgICAgICAgICAgICAgIHZsZW4gPSBsZW4gPCB0aGlzLmFsaWdubWVudCA/IGxlbiA6IHRoaXMuYWxpZ25tZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQ29tcHV0ZSB0aGUgcGFkZGluZyBieXRlcyBmb3IgdGhlIGFsaWdubWVudC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZsZW4gPiAxICYmIHN1YkJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2QgPSBzdWJCdWZmZXIubGVuZ3RoICUgdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGNvdW50ID0gdmxlbiAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGsgPSAxOyBrIDw9IHBjb3VudDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkJ1ZmZlci5wdXNoKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vU3RvcmUgdGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgIC8vZm9yIGluc2VydGluZyBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZsZW4gPiB2bGVuTWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bGVuTWF4ID0gdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DaGVjayBzdHJ1Y3R1cmUgZGVmaW5pdGlvblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmRlZiA9IHRoaXMucGFyc2VWYXJOYW1lKGl0ZW0uZGVmKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPT09IHRydWUgJiYgaXRlbS5kZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGVmID0gdGhpcy5jcmVhdGVTdHJ1Y3REZWYoaXRlbUluZm8uZGF0YVR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kZWYgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gc3RydWN0dXJlIGRlZmluaW5pdGlvbiBmb3VuZCAoc3VtV3JpdGVSZXEoKSkhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vV2FsayB0aHJvdWdoIHRoZSBzdHJ1Y3R1cmUgZGVmaW5pdG9uXG4gICAgICAgICAgICBmb3IgKGVsZW0gaW4gaXRlbS5kZWYpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRlZi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZBcnIgPSBpdGVtLmRlZltlbGVtXS5zcGxpdCgnLicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyWzBdID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IHBhcnNlSW50KGRlZkFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REZWZBcnIgPSBkZWZBcnIubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGVuQXJyRWxlbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBkZWZBcnJbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBkZWZBcnIuc2xpY2UoMywgLTEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBkZWZBcnIuc2xpY2UoMykuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BZGQgaW5kZXggaW4gY2FzZSBvZiBhbiBhcnJheSBvZiBzdHJ1Y3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1teS52YWwgPSBpdGVtLnZhbFtpXVtlbGVtICsgal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2ldW2VsZW1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkudmFsID0gaXRlbS52YWxbZWxlbV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRWYXJMZW5ndGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGlnbm1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgdHlwZSwgZm9ybWF0LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJCdWZmZXIgPSBzdWJCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB3ZSBhcmUgaW4gYW4gYXJyYXkgb2Ygc3RydWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkudmFsID0gaXRlbS52YWxbaV1bZWxlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkudmFsID0gaXRlbS52YWxbZWxlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGRlZkFyclswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyWzFdID0gZGVmQXJyLnNsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZGVmQXJyWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFZhckxlbmd0aCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGlnbm1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCB0eXBlLCBmb3JtYXQsIGxlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViQnVmZmVyID0gc3ViQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IHNldCB2YWx1ZXMgZm9yIGEgc3RydWN0dXJlIGluIFN1bVdyaXRlUmVxOiAnICsgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlLlxuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB2bGVuTWF4ID4gMSAmJiBkZWZBcnJbMF0gIT09ICdTVFJJTkcnICYmIGRlZkFyclswXSAhPT0gJ0VuZFN0cnVjdCcpIHtcbiAgICAgICAgICAgICAgICBtb2QgPSBzdWJCdWZmZXIubGVuZ3RoICUgdmxlbk1heDtcbiAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwY291bnQgPSB2bGVuTWF4IC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGsgPSAxOyBrIDw9IHBjb3VudDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJCdWZmZXIucHVzaCgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9BZGQgdGhlIHN1YlB1ZmZlciB3aXRoIHRoZSBzdHJ1Y3R1cmUgZGF0YSB0byB0aGUgcmVxdWVzdCBidWZmZXIuXG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KHN1YkJ1ZmZlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvL1ByZXNldCB0aGUgcmVhZCBsZW5ndGggd2l0aCB0aGUgbnVtYmVyIG9mIGJ5dGUgZm9yIGVycm9yIGNvZGVzLlxuICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gbGlzdGxlbiAqIDQ7XG5cbiAgICAgICAgLy9Xcml0ZSB0aGUgZ2VuZXJhbCBjb21tYW5kIGluZm9ybWF0aW9uIHRvIHRoZSBSZXF1ZXN0IEJ1ZmZlclxuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtTGlzdFtpZHhdO1xuXG4gICAgICAgICAgICBpdGVtSW5mbyA9IHRoaXMuZ2V0SXRlbUluZm9ybWF0aW9uKGl0ZW0pO1xuXG4gICAgICAgICAgICAvL0dldCB0eXBlIGFuZCBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgICAgICAgIHR5cGUgPSBpdGVtSW5mby50eXBlO1xuICAgICAgICAgICAgZm9ybWF0ID0gaXRlbUluZm8uZm9ybWF0O1xuXG4gICAgICAgICAgICAvL0xlbmd0aCBvZiB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uc2l6ZTtcblxuICAgICAgICAgICAgLy9CdWlsZCB0aGUgcmVxdWVzdCBidWZmZXIuXG4gICAgICAgICAgICAvL1RoZSBmdW5jdGlvbiBkYXRhVG9CeXRlQXJyYXkgZXhwZWN0cyBhbiBpdGVtIHdpdGggYSB2YWx1ZSBmb3JcbiAgICAgICAgICAgIC8vY29udmVydGluZywgc28gYSBkdW1teSBvYmplY3QgaXMgdXNlZCBoZXJlLlxuICAgICAgICAgICAgZHVtbXkudmFsID0gdGhpcy5nZXRJbmRleEdyb3VwKGl0ZW1JbmZvKTtcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksICdVRElOVCcsIGZvcm1hdCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgZHVtbXkudmFsID0gdGhpcy5nZXRJbmRleE9mZnNldChpdGVtSW5mbyk7XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IGxlbjtcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksICdVRElOVCcsIGZvcm1hdCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy9Xcml0ZSB0aGUgZGF0YSB0byB0aGUgUmVxdWVzdCBCdWZmZXJcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihpdGVtKTtcblxuICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICB0eXBlID0gaXRlbUluZm8udHlwZTtcbiAgICAgICAgICAgIGZvcm1hdCA9IGl0ZW1JbmZvLmZvcm1hdDtcblxuICAgICAgICAgICAgLy9MZW5ndGggb2YgdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLnNpemU7XG5cbiAgICAgICAgICAgIC8vUmVzZXQgY291bnRlciBmb3IgYXJyYXlzLlxuICAgICAgICAgICAgaSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vQnVpbGQgdGhlIHJlcXVlc3QgYnVmZmVyLlxuICAgICAgICAgICAgLy9UaGUgZnVuY3Rpb24gZGF0YVRvQnl0ZUFycmF5IGV4cGVjdHMgYW4gaXRlbSB3aXRoIGEgdmFsdWUgZm9yXG4gICAgICAgICAgICAvL2NvbnZlcnRpbmcsIHNvIGEgZHVtbXkgb2JqZWN0IGlzIHVzZWQgaGVyZS5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQVJSQVknOlxuXG4gICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gcGFyc2VJbnQoaXRlbUluZm8uYXJyYXlMZW5ndGgsIDEwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlMZW5ndGggIT09IGl0ZW0udmFsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQXJyYXkgbGVuZ3RoIGluIEpTIGRpZmZlcnMgZnJvbSB0aGUgbGVuZ3RoIGluIHRoZSBQTEMhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnTGVuZ3RoIGluIEpTOiAnICsgaXRlbS52YWwubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdMZW5ndGggaW4gUExDOiAnICsgYXJyYXlMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0FycmF5IG9mIHN0cnVjdHVyZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3RydWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUGxhaW4gYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gaXRlbUluZm8uYXJyYXlEYXRhVHlwZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5pdGVtU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1teS52YWwgPSBpdGVtLnZhbFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCB0eXBlLCBmb3JtYXQsIGxlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnVVNFUic6XG4gICAgICAgICAgICAgICAgICAgIC8vU3RydWN0dXJlcy5cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VTdHJ1Y3QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9TaW1wbGUgZGF0YSB0eXBlcy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoaXRlbSwgdHlwZSwgZm9ybWF0LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ29udmVydCB0aGUgcmVxdWVzdCBidWZmZXIgdG8gQmFzZTY0IGNvZGVkIGRhdGEuXG4gICAgICAgIGlmIChyZXFCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcHdyRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHJlcUJ1ZmZlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWRXcml0ZScsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmluZGV4R3JvdXBzLlN1bVdyLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IGl0ZW1MaXN0Lmxlbmd0aCxcbiAgICAgICAgICAgIHB3ckRhdGE6IHB3ckRhdGEsXG4gICAgICAgICAgICByZXFEZXNjcjogcmVxRGVzY3JcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSkuc2VuZCgpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIGZvciByZWFkaW5nIHRoZSBBRFMgc3RhdGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICByZXFEZXNjciAgICBUaGUgUmVxdWVzdCBEZXNjcmlwdG9yLiBCZXNpZGVzIG90aGVyIGluZm9ybWF0aW9uXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9iamVjdCBjb250YWlucyB0aGUgYWxsb2NhdGlvbiBvZiBQTEMgYW5kXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IHZhcmlhYmxlcyBpbiBhbiBpdGVtIGxpc3QuXG4gICAgICovXG4gICAgcmVhZEFkc1N0YXRlKHJlcURlc2NyKSB7XG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cblxuICAgICAgICB2YXIgb2VmdW5jdDtcblxuICAgICAgICBpZiAocmVxRGVzY3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVxRGVzY3IgPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVxRGVzY3Iub2UgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy9TYXZlIHRoZSBvcmlnaW5hbCBvbi1lcnJvciBmdW5jdGlvbiBpZiBleGlzdC5cbiAgICAgICAgICAgIG9lZnVuY3QgPSByZXFEZXNjci5vZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vT24tZXJyb3ItZnVuY3Rpb24sIHJlc2V0IHRoZSBzdGF0ZVxuICAgICAgICByZXFEZXNjci5vZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFEUyBzdGF0ZSByZXF1ZXN0IGZhaWxlZC4nKTtcbiAgICAgICAgICAgIHRoaXMuYWRzU3RhdGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5hZHNTdGF0ZVR4dCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5kZXZpY2VTdGF0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2VmdW5jdCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgb2VmdW5jdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkU3RhdGUnLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpLnNlbmQoKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiAgUHJpbnRzIHRoZSBjYWNoZWQgaGFuZGxlcyB0byB0aGUgY29uc29sZS5cbiAgICAgKi9cbiAgICBsb2dIYW5kbGVDYWNoZSAoKSB7XG4gICAgICAgIHRoaXMubG9nKHRoaXMuaGFuZGxlQ2FjaGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAgUHJpbnRzIHRoZSBzeW1ib2wgdGFibGUgdG8gdGhlIGNvbnNvbGUuXG4gICAgICovXG4gICAgbG9nU3ltYm9scygpIHtcbiAgICAgICAgdGhpcy5sb2codGhpcy5zeW1UYWJsZSk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogIFByaW50cyB0aGUgZGF0YSB0eXBlIHRhYmxlIHRvIHRoZSBjb25zb2xlLlxuICAgICAqL1xuICAgIGxvZ0RhdGFUeXBlcygpIHtcbiAgICAgICAgdGhpcy5sb2codGhpcy5kYXRhVHlwZVRhYmxlKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgU3ltYm9sIFRhYmxlIHRvIGEgSlNPTiBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHJldHVybiB7QXJyYXl9ICBqc3RyICAgIFRoZSBTeW1ib2wgVGFibGUgYXMgYSBKU09OIHN0cmluZyAuIFxuICAgICAqL1xuICAgIGdldFN5bWJvbHNBc0pTT04oKSB7XG4gICAgICAgIHZhciBqc3RyO1xuXG4gICAgICAgIGlmICh0eXBlb2YgSlNPTiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIEpTT04gcGFyc2VyIGZvdW5kLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBqc3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zeW1UYWJsZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzdHI7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGNvbnZlcnQgdGhlIFN5bWJvbCBUYWJsZSB0byBKU09OOicgKyBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIHRoZSBTeW1ib2wgVGFibGUgZnJvbSBhIEpTT04gc3RyaW5nXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBqc3RyICAgIEEgSlNPTiBzdHJpbmcgd2l0aCB0aGUgc3ltYm9scy5cbiAgICAgKi9cbiAgICBzZXRTeW1ib2xzRnJvbUpTT04oanN0cikge1xuICAgICAgICBpZiAodHlwZW9mIEpTT04gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBKU09OIHBhcnNlciBmb3VuZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZSA9IEpTT04ucGFyc2UoanN0cik7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGNyZWF0ZSB0aGUgU3ltYm9sIFRhYmxlIGZyb20gSlNPTjonICsgZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3ltYm9sIFRhYmxlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIGZyb20gSlNPTiBkYXRhLicpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIERhdGEgVHlwZSBUYWJsZSB0byBhIEpTT04gc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge0FycmF5fSAganN0ciAgICBUaGUgRGF0YSBUeXBlIFRhYmxlIGFzIGEgSlNPTiBzdHJpbmcgLiBcbiAgICAgKi9cbiAgICBnZXREYXRhVHlwZXNBc0pTT04oKSB7XG4gICAgICAgIHZhciBqc3RyO1xuXG4gICAgICAgIGlmICh0eXBlb2YgSlNPTiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIEpTT04gcGFyc2VyIGZvdW5kLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBqc3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhVHlwZVRhYmxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ganN0cjtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgY29udmVydCB0aGUgRGF0YSBUeXBlIFRhYmxlIHRvIEpTT046JyArIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogUmVhZHMgdGhlIERhdGEgVHlwZSBUYWJsZSBmcm9tIGEgSlNPTiBzdHJpbmdcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIGpzdHIgICAgQSBKU09OIHN0cmluZyB3aXRoIHRoZSBkYXRhIHR5cGVzLlxuICAgICAqL1xuICAgIHNldERhdGFUeXBlc0Zyb21KU09OKGpzdHIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBKU09OICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gSlNPTiBwYXJzZXIgZm91bmQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZSA9IEpTT04ucGFyc2UoanN0cik7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGNyZWF0ZSB0aGUgRGF0YSBUeXBlIFRhYmxlIGZyb20gSlNPTjonICsgZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBEYXRhIFR5cGUgVGFibGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgZnJvbSBKU09OIGRhdGEuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzIHRoZSB3ZWJzZXJ2aWNlJ3Mgc2VydmVyIHJlc3BvbnNlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGFyZ3VtZW50cyBvZiB0aGUgQURTIHJlcXVlc3QuXG4gICAgICovXG4gICAgcGFyc2VSZXNwb25zZShhZHNSZXEpIHtcblxuICAgICAgICBsZXQgcmVzcG9uc2UsIGVycm9yQ29kZSwgZXJyb3JUZXh0O1xuICAgICAgICBsZXQgcmVzdWx0OiBhbnlcblxuICAgICAgICAvL0Fja25vd2xlZGdlIHRoZSByZWNlaXZlIG9mIGEgcmVxdWVzdCB3aXRoIGluZGV4ICdpZCcuXG4gICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLmlkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGVjayBpZiB0aGUgWE1MIGRhdGEgb2JqZWN0IGlzIHZhbGlkLlxuICAgICAgICBpZiAodGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBSZXF1ZXN0IGNvbnRhaW5zIG5vIFhNTCBkYXRhLiBPYmplY3QgXCJyZXNwb25zZVhNTFwiIGlzIG51bGwuJyk7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBUaGlzIGlzIHRoZSBcInJlc3BvbnNlVGV4dFwiOicpO1xuICAgICAgICAgICAgdGhpcy5sb2codGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vb24gZXJyb3IgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2V0IHRoZSByZXNwb25zZVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBYTUwgZGF0YSBpbiBzZXJ2ZXIgcmVzcG9uc2U6ICcgKyBlKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy9vbiBlcnJvciBmdW5jdGlvblxuICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Mb29rIGZvciBlcnJvcnMgaW4gdGhlIHJlc3BvbnNlIHN0cmluZyAoaS5lLiBBRFMgZXJyb3JzKS5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vR2V0IGVycm9yc1xuICAgICAgICAgICAgZXJyb3JUZXh0ID0gcmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ZhdWx0c3RyaW5nJylbMF0uZmlyc3RDaGlsZC5kYXRhO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBlcnJvckNvZGUgPSByZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZXJyb3Jjb2RlJylbMF0uZmlyc3RDaGlsZC5kYXRhO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGVycm9yQ29kZSA9ICctJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE1lc3NhZ2UgZnJvbSBzZXJ2ZXI6ICAnICsgZXJyb3JUZXh0ICsgJyAoJyArIGVycm9yQ29kZSArICcpJyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy9vbiBlcnJvciBmdW5jdGlvblxuICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgLy9BbGwgZmluZVxuICAgICAgICAgICAgZXJyb3JDb2RlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vTm9ybWFsaXplIGRhdGEgKGVzcC4gZm9yIEZpcmVmb3gsIHdobyBzcGxpdHMgZGF0YSBpbiA0ayBjaHVua3MpLlxuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLm5vcm1hbGl6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmVzcG9uc2Uubm9ybWFsaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0RlY29kZSBkYXRhIGlmIGl0J3MgYSByZWFkIHJlcXVlc3QuXG4gICAgICAgIGlmIChhZHNSZXEubWV0aG9kID09PSAnUmVhZFN0YXRlJykge1xuXG4gICAgICAgICAgICB0aGlzLnBhcnNlQWRzU3RhdGUoYWRzUmVxKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGFkc1JlcS5tZXRob2QgPT09ICdSZWFkJyB8fCBhZHNSZXEubWV0aG9kID09PSAnUmVhZFdyaXRlJykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFkc1JlcS5pbmRleEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmluZGV4R3JvdXBzLlVwbG9hZEluZm86XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VVcGxvYWRJbmZvKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5pbmRleEdyb3Vwcy5VcGxvYWQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VVcGxvYWQoYWRzUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmluZGV4R3JvdXBzLlN1bVJkOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlU3VtUmVhZFJlcShhZHNSZXEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuaW5kZXhHcm91cHMuU3VtV3I6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VTdW1Xcml0ZVJlcShhZHNSZXEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuaW5kZXhHcm91cHMuU3VtUmRXcjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUhhbmRsZXMoYWRzUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZVJlYWRSZXEoYWRzUmVxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2FsbCB0aGUgT24tQ29tcGxldGUtU2NyaXB0LlxuICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2NkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGFkc1JlcS5yZXFEZXNjci5vYywgYWRzUmVxLnJlcURlc2NyLm9jZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub2MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBoYW5kbGVzIGZyb20gdGhlIFBMQy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJTeW1OYW1lcyAgIEFycmF5IHdpdGggdGhlIHN5bWJvbCBuYW1lcy5cbiAgICAgKi9cbiAgICBnZXRIYW5kbGVzKHJlcURlc2NyKSB7XG5cbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgcmVxQnVmZmVyID0gW10sXG4gICAgICAgICAgICBhcnJsZW4gPSByZXFEZXNjci5zeW1ib2xzLmxlbmd0aCxcbiAgICAgICAgICAgIGJ5dGVzLCBpZHgsIGxlbiwgcHdyRGF0YSwgZm9ybWF0LCBzeW1uYW1lLCBpO1xuXG4gICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRmV0Y2hpbmcgaGFuZGxlcyBmcm9tIHRoZSBQTEMuJyk7XG5cbiAgICAgICAgLy9SZWFkIGxlbnRoIHdpdGggdGhlIG51bWJlciBvZiBieXRlIGZvciBlcnJvciBjb2Rlcy5cbiAgICAgICAgLy80IGJ5dGVzIHJlcXVlc3RlZCBkYXRhLCA0IGJ5dGVzIGZvciBlcnJvcmNvZGUgYW5kIDQgYnl0ZXMgZm9yIHRoZSBsZW5ndGhcbiAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCA9IGFycmxlbiAqIDEyO1xuXG4gICAgICAgIC8vQnVpbGQgdGhlIFJlcXVlc3QgQnVmZmVyXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAvL0J1aWxkIHRoZSByZXF1ZXN0IGJ1ZmZlci5cbiAgICAgICAgICAgIC8vSW5kZXhHcm91cFxuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih0aGlzLmluZGV4R3JvdXBzLkhhbmRsZUJ5TmFtZSwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgLy9JbmRleE9mZnNldCBpcyBhbHdheXMgMFxuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycigwLCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICAvL0hhbmRsZSBzaXplICg0IGJ5dGVzKVxuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycig0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICAvL1N0cmluZyBsZW5ndGhcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIocmVxRGVzY3Iuc3ltYm9sc1tpZHhdLmxlbmd0aCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQWRkIHN5bWJvbCBuYW1lc1xuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGFycmxlbjsgaWR4KyspIHtcbiAgICAgICAgICAgIHN5bW5hbWUgPSByZXFEZXNjci5zeW1ib2xzW2lkeF0udG9VcHBlckNhc2UoKTtcblxuICAgICAgICAgICAgLy9TdG9yZSBpdCBmb3IgbGF0ZXIgdXNlXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU5hbWVzW2lkeF0gPSBzeW1uYW1lO1xuXG4gICAgICAgICAgICAvL0FkZCBzeW1ib2wgbmFtZXMgdG8gdGhlIGJ1ZmZlclxuICAgICAgICAgICAgYnl0ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzeW1uYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXNbaV0gPSBzeW1uYW1lLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9Db252ZXJ0IHRoZSByZXF1ZXN0IGJ1ZmZlciB0byBCYXNlNjQgY29kZWQgZGF0YS5cbiAgICAgICAgaWYgKHJlcUJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwd3JEYXRhID0gdGhpcy5lbmNvZGVCYXNlNjQocmVxQnVmZmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZFdyaXRlJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuaW5kZXhHcm91cHMuU3VtUmRXcixcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiBhcnJsZW4sXG4gICAgICAgICAgICBwd3JEYXRhOiBwd3JEYXRhLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpLnNlbmQoKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiBmb3IgcmVsZWFzaW5nIHRoZSBjYWNoZWQgaGFuZGxlcy5cbiAgICAgKiBcbiAgICAgKi9cbiAgICByZWxlYXNlSGFuZGxlcyhyZXFEZXNjcikge1xuICAgICAgICB2YXIgYWRzUmVxID0ge30sXG4gICAgICAgICAgICByZXFCdWZmZXIgPSBbXSxcbiAgICAgICAgICAgIGJ5dGVzID0gW10sXG4gICAgICAgICAgICBhcnJsZW4gPSAwLFxuICAgICAgICAgICAgc3ltTmFtZXMgPSBbXSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaWR4LCBwd3JEYXRhO1xuXG4gICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogUmVsZWFzaW5nIGhhbmRsZXMuJyk7XG5cbiAgICAgICAgLy9DaGVjayBpZiBhIHJlcXVlc3QgZGVzY3JpcHRvciBleGlzdHNcbiAgICAgICAgaWYgKHJlcURlc2NyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcURlc2NyID0ge307XG4gICAgICAgIH1cbiAgICAgICAgLy9DaGVjayBpZiBhIHVzZXIgZGVmaW5lZCBoYW5kbGUgbGlzdCBleGlzdHNcbiAgICAgICAgaWYgKHJlcURlc2NyLnN5bWJvbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXJybGVuID0gcmVxRGVzY3Iuc3ltYm9scy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGFycmxlbjsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICBzeW1OYW1lc1tpZHhdID0gcmVxRGVzY3Iuc3ltYm9sc1tpZHhdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJsZW4gPSB0aGlzLmhhbmRsZU5hbWVzLmxlbmd0aDtcbiAgICAgICAgICAgIHN5bU5hbWVzID0gdGhpcy5oYW5kbGVOYW1lcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vUHJlc2V0IHRoZSByZWFkIGxlbmd0aCB3aXRoIHRoZSBudW1iZXIgb2YgYnl0ZSBmb3IgZXJyb3IgY29kZXMuXG4gICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggPSBhcnJsZW4gKiA0O1xuXG4gICAgICAgIC8vV3JpdGUgdGhlIGdlbmVyYWwgY29tbWFuZCBpbmZvcm1hdGlvbiB0byB0aGUgUmVxdWVzdCBCdWZmZXJcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIC8vQnVpbGQgdGhlIHJlcXVlc3QgYnVmZmVyLlxuICAgICAgICAgICAgLy9JbmRleEdyb3VwXG4gICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHRoaXMuaW5kZXhHcm91cHMuUmVsZWFzZUhhbmRsZSwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgLy9JbmRleE9mZnNldCBpcyBhbHdheXMgMFxuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycigwLCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICAvL0hhbmRsZSBzaXplICg0IGJ5dGVzKVxuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycig0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BZGQgaGFuZGxlcyBjb2Rlc1xuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGFycmxlbjsgaWR4KyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5oYW5kbGVDYWNoZVtzeW1OYW1lc1tpZHhdXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHRoaXMuaGFuZGxlQ2FjaGVbc3ltTmFtZXNbaWR4XV0sIDQpO1xuICAgICAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBIYW5kbGUgZm9yIHN5bWJvbCBuYW1lICcgKyBzeW1OYW1lc1tpZHhdICsgJyBkb2VzIG5vdCBleGlzdCBpbiBoYW5kbGUgY2FjaGUhJyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ1JlbGVhc2luZyBIYW5kbGVzIGFib3J0ZWQhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ29udmVydCB0aGUgcmVxdWVzdCBidWZmZXIgdG8gQmFzZTY0IGNvZGVkIGRhdGEuXG4gICAgICAgIGlmIChyZXFCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcHdyRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHJlcUJ1ZmZlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FkZCB0aGUgc3ltYm9sIG5hbWVzIGZvciBwYXJzaW5nIHRoZSByZXNwb25zZVxuICAgICAgICByZXFEZXNjci5pdGVtcyA9IHN5bU5hbWVzO1xuXG4gICAgICAgIC8vVGhpcyBpcyBhIFJlbGVhc2UgSGFuZGxlcyBSZXF1ZXN0XG4gICAgICAgIHJlcURlc2NyLmlzUmVsSGRsUmVxID0gdHJ1ZTtcblxuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWRXcml0ZScsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmluZGV4R3JvdXBzLlN1bVdyLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IGFycmxlbixcbiAgICAgICAgICAgIHB3ckRhdGE6IHB3ckRhdGEsXG4gICAgICAgICAgICByZXFEZXNjcjogcmVxRGVzY3JcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSkuc2VuZCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2hvcnRjdXRzIGZvciByZWFkaW5nIGFuZCB3cml0aW5nIGRhdGEuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFyZ3NcbiAgICAgKi9cbiAgICB3cml0ZUJvb2wgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnQk9PTCcsIGFyZ3MpXG4gICAgd3JpdGVCeXRlID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0JZVEUnLCBhcmdzKVxuICAgIHdyaXRlVXNpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnVVNJTlQnLCBhcmdzKVxuICAgIHdyaXRlU2ludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdTSU5UJywgYXJncylcbiAgICB3cml0ZVdvcmQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnV09SRCcsIGFyZ3MpXG4gICAgd3JpdGVVaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1VJTlQnLCBhcmdzKVxuICAgIHdyaXRlSW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0lOVCcsIGFyZ3MpXG4gICAgd3JpdGVJbnQxRHAgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnSU5UMURQJywgYXJncylcbiAgICB3cml0ZUludDJEcCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdJTlQyRFAnLCBhcmdzKVxuICAgIHdyaXRlRHdvcmQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnRFdPUkQnLCBhcmdzKVxuICAgIHdyaXRlVWRpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnVURJTlQnLCBhcmdzKVxuICAgIHdyaXRlRGludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdESU5UJywgYXJncylcbiAgICB3cml0ZVJlYWwgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnUkVBTCcsIGFyZ3MpXG4gICAgd3JpdGVMcmVhbCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdMUkVBTCcsIGFyZ3MpXG4gICAgd3JpdGVTdHJpbmcgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnU1RSSU5HJywgYXJncylcbiAgICB3cml0ZVRpbWUgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnVElNRScsIGFyZ3MpXG4gICAgd3JpdGVUb2QgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnVE9EJywgYXJncylcbiAgICB3cml0ZURhdGUgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnREFURScsIGFyZ3MpXG4gICAgd3JpdGVEdCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdEVCcsIGFyZ3MpXG5cbiAgICByZWFkQm9vbCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnQk9PTCcsIGFyZ3MpXG4gICAgcmVhZEJ5dGUgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0JZVEUnLCBhcmdzKVxuICAgIHJlYWRVc2ludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnVVNJTlQnLCBhcmdzKVxuICAgIHJlYWRTaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdTSU5UJywgYXJncylcbiAgICByZWFkV29yZCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnV09SRCcsIGFyZ3MpXG4gICAgcmVhZFVpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1VJTlQnLCBhcmdzKVxuICAgIHJlYWRJbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0lOVCcsIGFyZ3MpXG4gICAgcmVhZEludDFEcCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnSU5UMURQJywgYXJncylcbiAgICByZWFkSW50MkRwID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdJTlQyRFAnLCBhcmdzKVxuICAgIHJlYWREd29yZCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnRFdPUkQnLCBhcmdzKVxuICAgIHJlYWRVZGludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnVURJTlQnLCBhcmdzKVxuICAgIHJlYWREaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdESU5UJywgYXJncylcbiAgICByZWFkUmVhbCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnUkVBTCcsIGFyZ3MpXG4gICAgcmVhZExyZWFsID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdMUkVBTCcsIGFyZ3MpXG4gICAgcmVhZFN0cmluZyA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnU1RSSU5HJywgYXJncylcbiAgICByZWFkVGltZSA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnVElNRScsIGFyZ3MpXG4gICAgcmVhZFRvZCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnVE9EJywgYXJncylcbiAgICByZWFkRGF0ZSA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnREFURScsIGFyZ3MpXG4gICAgcmVhZER0ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdEVCcsIGFyZ3MpXG5cbiAgICB3cml0ZVN0cnVjdCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZVN0cnVjdERlc2NyaXB0b3IoJ1dyaXRlJywgYXJncylcbiAgICByZWFkU3RydWN0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlU3RydWN0RGVzY3JpcHRvcignUmVhZCcsIGFyZ3MpXG5cbiAgICB3cml0ZUFycmF5T2ZCb29sID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdCT09MJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZCeXRlID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdCWVRFJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZVc2ludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnVVNJTlQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlNpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1NJTlQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZldvcmQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1dPUkQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlVpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1VJTlQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnSU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZJbnQxRHAgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0lOVDFEUCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mSW50MkRwID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdJTlQyRFAnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkR3b3JkID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdEV09SRCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mVWRpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1VESU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZEaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdESU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZSZWFsID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdSRUFMJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZMcmVhbCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnTFJFQUwnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlN0cmluZyA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnU1RSSU5HJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZUaW1lID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdUSU1FJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZUb2QgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1RPRCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mRGF0ZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnREFURScsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mRHQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0RUJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZTdHJ1Y3QgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1NUUlVDVCcsIGFyZ3MpXG5cbiAgICByZWFkQXJyYXlPZkJvb2wgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnQk9PTCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZCeXRlID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0JZVEUnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mVXNpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnVVNJTlQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mU2ludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdTSU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZldvcmQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnV09SRCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZVaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1VJTlQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mSW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0lOVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZJbnQxRHAgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnSU5UMURQJywgYXJncylcbiAgICByZWFkQXJyYXlPZkludDJEcCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdJTlQyRFAnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mRHdvcmQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnRFdPUkQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mVWRpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnVURJTlQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mRGludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdESU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZlJlYWwgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnUkVBTCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZMcmVhbCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdMUkVBTCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZTdHJpbmcgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnU1RSSU5HJywgYXJncylcbiAgICByZWFkQXJyYXlPZlRpbWUgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnVElNRScsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZUb2QgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnVE9EJywgYXJncylcbiAgICByZWFkQXJyYXlPZkRhdGUgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnREFURScsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZEdCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdEVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZTdHJ1Y3QgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnU1RSVUNUJywgYXJncylcbiAgICBcblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vICAgICAgICAgICAgICAgICAgIE1ldGhvZHMgZm9yIENyZWF0aW5nIHRoZSBTeW1ib2wgVGFibGUgZnJvbSBVcGxvYWRcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHRoZSBUUFkgRmlsZVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gICBcblxuICAgIC8qKlxuICAgICAqICBHZXQgdGhlIHVwbG9hZCBpbmZvLiBcbiAgICAgKi9cblxuICAgIGdldFVwbG9hZEluZm8oKSB7XG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgdmFyIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWQnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5pbmRleEdyb3Vwcy5VcGxvYWRJbmZvLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IDAsXG4gICAgICAgICAgICByZXFEZXNjcjoge1xuICAgICAgICAgICAgICAgIHJlYWRMZW5ndGg6IDhcbiAgICAgICAgICAgICAgICAvL3N5bmM6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpLnNlbmQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIHRoZSB1cGxvYWQgaW5mb3JtYXRpb24gYW5kIGNhbGwgdGhlIHJlcXVlc3QgZm9yIFxuICAgICAqIHJlYWRpbmcgdGhlIHVwbG9hZCBkYXRhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBBbiBBRFMgUmVxdWVzdCBEZXNjcmlwdG9yLlxuICAgICAqL1xuICAgIHBhcnNlVXBsb2FkSW5mbyhhZHNSZXEpIHtcbiAgICAgICAgdmFyIHJlc3BvbnNlLCBkYXRhU3RyaW5nLCBkYXRhU3ViU3RyaW5nLCBkYXRhLCBhZHNSZXEyO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBkYXRhU3RyaW5nID0gdGhpcy5kZWNvZGVCYXNlNjQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BwRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG4gICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoMCwgNCk7XG4gICAgICAgICAgICB0aGlzLnN5bWJvbENvdW50ID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG4gICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoNCwgNCk7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZExlbmd0aCA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIFVwbG9hZEluZm8gZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkc1JlcTIgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuaW5kZXhHcm91cHMuVXBsb2FkLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IDAsXG4gICAgICAgICAgICByZXFEZXNjcjoge1xuICAgICAgICAgICAgICAgIHJlYWRMZW5ndGg6IHRoaXMudXBsb2FkTGVuZ3RoXG4gICAgICAgICAgICAgICAgLy9zeW5jOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxMikuc2VuZCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgdGhlIHVwbG9hZCBkYXRhIGFuZCBhbiBvYmplY3QgKHN5bVRhYmxlKSB3aXRoIHRoZSBzeW1ib2wgbmFtZXMgXG4gICAgICogYXMgdGhlIHByb3BlcnRpZXMuIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBBbiBBRFMgUmVxdWVzdCBEZXNjcmlwdG9yLlxuICAgICAqL1xuICAgIHBhcnNlVXBsb2FkKGFkc1JlcSkge1xuICAgICAgICB2YXIgcmVzcG9uc2UsXG4gICAgICAgICAgICBzdHJBZGRyID0gMCxcbiAgICAgICAgICAgIGlnT2ZmcyA9IDQsXG4gICAgICAgICAgICBpb09mZnMgPSA4LFxuICAgICAgICAgICAgc2l6ZU9mZnMgPSAxMixcbiAgICAgICAgICAgIG5hbWVPZmZzID0gMzAsXG4gICAgICAgICAgICBkYXRhU3RyaW5nLCBkYXRhU3ViU3RyaW5nLCBkYXRhLCBjbnQsIGluZm9MZW4sIG5hbWVBbmRUeXBlLCB0eXBlQXJyLCBhcnJheUxlbmd0aCwgdHlwZSwgZWxlbTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcERhdGEnKVswXS5maXJzdENoaWxkLmRhdGEpO1xuXG4gICAgICAgICAgICBmb3IgKGNudCA9IDA7IGNudCA8IHRoaXMuc3ltYm9sQ291bnQ7IGNudCsrKSB7XG4gICAgICAgICAgICAgICAgLy9HZXQgdGhlIGxlbmd0aCBvZiB0aGUgc3ltYm9sIGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCA0KTtcbiAgICAgICAgICAgICAgICBpbmZvTGVuID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG5cbiAgICAgICAgICAgICAgICAvL0dldCBuYW1lIGFuZCB0eXBlLlxuICAgICAgICAgICAgICAgIG5hbWVBbmRUeXBlID0gZGF0YVN0cmluZy5zdWJzdHJpbmcoc3RyQWRkciArIG5hbWVPZmZzLCAoc3RyQWRkciArIGluZm9MZW4pKS5zcGxpdChTdHJpbmcuZnJvbUNoYXJDb2RlKDApKTtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG5hbWVBbmRUeXBlWzBdLnRvVXBwZXJDYXNlKCk7XG5cblxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGFuIGVudHJ5LlxuICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVTdHJpbmc6IG5hbWVBbmRUeXBlWzFdLFxuICAgICAgICAgICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyICsgaWdPZmZzLCA0KSwgJ0RXT1JEJyksXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0OiB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyICsgaW9PZmZzLCA0KSwgJ0RXT1JEJyksXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIgKyBzaXplT2ZmcywgNCksICdEV09SRCcpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vU2V0IGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgICAgdHlwZUFyciA9IG5hbWVBbmRUeXBlWzFdLnNwbGl0KFwiIFwiKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlQXJyWzBdID09PSAnQVJSQVknKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9UeXBlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9IHR5cGVBcnJbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgLy9BcnJheSBMZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSB0eXBlQXJyWzFdLnN1YnN0cmluZygxLCB0eXBlQXJyWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IGFycmF5TGVuZ3RoLnNwbGl0KCcuLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFyclN0YXJ0SWR4ID0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMF0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBwYXJzZUludChhcnJheUxlbmd0aFsxXSwgMTApIC0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMF0sIDEwKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlMZW5ndGggPSBhcnJheUxlbmd0aDtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vRGF0YSB0eXBlIG9mIHRoZSBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHR5cGVBcnJbM10uc3BsaXQoJygnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVsxXSA9IHR5cGVbMV0uc3Vic3RyKDAsIHR5cGVbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZUFyclswXSArICcuJyArIGFycmF5TGVuZ3RoICsgJy4nICsgdHlwZVswXSArICcuJyArIHR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnN0cmluZ0xlbmd0aCA9IHBhcnNlSW50KHR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlQXJyWzBdICsgJy4nICsgYXJyYXlMZW5ndGggKyAnLicgKyB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9JdGVtIGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLml0ZW1TaXplID0gdGhpcy5zeW1UYWJsZVtuYW1lXS5zaXplIC8gYXJyYXlMZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB2YXJpYWJsZSBpcyBhIHVzZXIgZGVmaW5lZCBkYXRhIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlEYXRhVHlwZSA9ICdVU0VSJztcbiAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIHRoaXMucGxjVHlwZUxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxjVHlwZUxlbi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzBdID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlEYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5RGF0YVR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5kYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzBdLnNwbGl0KCcoJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9TdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVbMV0gPSB0eXBlWzFdLnN1YnN0cigwLCB0eXBlWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5zdHJpbmdMZW5ndGggPSBwYXJzZUludCh0eXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoZWxlbSBpbiB0aGlzLnBsY1R5cGVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RyQWRkciArPSBpbmZvTGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVJlYWR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBFbmQgb2YgZmV0Y2hpbmcgdGhlIHN5bWJvbHMuJyk7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN5bWJvbCB0YWJsZSByZWFkeS4nKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZS5zeW5jWG1sSHR0cCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25SZWFkeSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBhcnNpbmcgb2YgdXBsb2FkZWQgc3ltYm9sIGluZm9ybWF0aW9uIGZhaWxlZDonICsgZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdYbWxIdHRwUmVxID0gbnVsbFxuICAgIC8qKlxuICAgICogR2V0IHRoZSBzeW1ib2wtZmlsZSAoKi50cHkpIGZyb20gdGhlIHNlcnZlciBhbmQgY3JlYXRlXG4gICAgKiBhbiBvYmplY3QgKHN5bVRhYmxlKSB3aXRoIHRoZSBzeW1ib2wgbmFtZXMgYXMgdGhlIHByb3BlcnRpZXMuIFxuICAgICovXG4gICAgYXN5bmMgZ2V0Q29uZmlnRmlsZSgpIHtcblxuICAgICAgICB0aGlzLmNvbmZpZ1htbEh0dHBSZXEgPSB0aGlzLmNyZWF0ZVhNTEh0dHBSZXEoKVxuICAgICAgICB2YXIgc3ltYm9sQXJyYXkgPSBbXSxcbiAgICAgICAgICAgIGNvbmZpZ0ZpbGUsIG5hbWUsIGFsbFN5bWJvbHMsIHR5cGVBcnIsIGFycmF5TGVuZ3RoLCB0eXBlLCBlbGVtLFxuICAgICAgICAgICAgdGNWZXJzaW9uLCBpO1xuXG4gICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3RhcnQgcmVhZGluZyB0aGUgVFBZIGZpbGUuJyk7XG5cbiAgICAgICAgLy9IVFRQUmVxdWVzdFxuICAgICAgICB0aGlzLmNvbmZpZ1htbEh0dHBSZXEub3BlbignR0VUJywgdGhpcy5zZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwsICF0aGlzLnNlcnZpY2Uuc3luY1htbEh0dHAsIHRoaXMuc2VydmljZS5zZXJ2aWNlVXNlciwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VQYXNzd29yZCk7XG4gICAgICAgIHRoaXMuY29uZmlnWG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ1htbEh0dHBSZXEub25sb2FkID0gYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIERPTSBvYmplY3QgZnJvbSBYTUxcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRE9NUGFyc2VyICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnRmlsZSA9IChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyh0aGlzLmNvbmZpZ1htbEh0dHBSZXEucmVzcG9uc2VUZXh0LCBcInRleHQveG1sXCIpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ3JlYXRpbmcgYSBET00gb2JqZWN0IGZyb20gVFBZIGZhaWxlZDonICsgZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENhblxcJ3QgcGFyc2UgdGhlIHN5bWJvbCBmaWxlIGNhdXNlIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBwcm92aWRlIGEgRE9NUGFyc2VyIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vR2V0IHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgUExDIGFuZCB0aGUgcm91dGluZ1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlcnZpY2UuYW1zTmV0SWQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aGlzLnNlcnZpY2UuYW1zUG9ydCAhPT0gJ3N0cmluZycgfHwgdGhpcy5hbGlnbm1lbnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IHJlYWRpbmcgdGhlIHNlcnZpY2UgaW5mb3JtYXRpb24gZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldElkOiBjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOZXRJZCcpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydDogY29uZmlnRmlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnUG9ydCcpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdGNWZXJzaW9uID0gY29uZmlnRmlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHdpbkNBVFZlcnNpb24nKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS5jaGFyQXQoMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRjVmVyc2lvbiA9PT0gJzInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbmZvLmFsaWdubWVudCA9IHBhcnNlSW50KGNvbmZpZ0ZpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1BhY2tTaXplJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0Y1ZlcnNpb24gPT09ICczJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSW5mby5hbGlnbm1lbnQgPSA4O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGRldGVybWluZSB0aGUgVHdpbkNBVCB2ZXJzaW9uLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRW5kIG9mIHJlYWRpbmcgdGhlIHNlcnZpY2UgaW5mb3JtYXRpb24gZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHJlYWRpbmcgc2VydmljZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBUUFkgZmlsZTonKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IE5ldElkLCBwb3J0IGFuZCBhbGlnbm1lbnQgbWFudWFsbHkgc2V0LiBTa2lwIHJlYWRpbmcgdGhlIHNlcnZpY2UgaW5mb3JtYXRpb24gZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIHN5bWJvbCB0YWJsZVxuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZS5mb3JjZVVwbG9hZFVzYWdlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTdGFydCByZWFkaW5nIHRoZSBzeW1ib2xzIGZyb20gdGhlIFRQWSBmaWxlLicpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGFuIEFycmF5IG9mIHRoZSBFbGVtZW50cyB3aXRoIFwiU3ltYm9sXCIgYXMgdGFnIG5hbWUuXG4gICAgICAgICAgICAgICAgICAgIGFsbFN5bWJvbHMgPSBjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdTeW1ib2xzJylbMF07XG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbEFycmF5ID0gYWxsU3ltYm9scy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnU3ltYm9sJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIG5hbWUgb2YgdGhlIHN5bWJvbCBhbmQgY3JlYXRlIGFuIG9iamVjdCBwcm9wZXJ0eSB3aXRoIGl0LlxuICAgICAgICAgICAgICAgICAgICAvL3N5bVRhYmxlIGlzIGRlY2xhcmVkIG91dHNpZGUgaW4gdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3ltYm9sQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBzeW1ib2xBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnTmFtZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVTdHJpbmc6IHN5bWJvbEFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUeXBlJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleEdyb3VwOiBwYXJzZUludChzeW1ib2xBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnSUdyb3VwJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldDogcGFyc2VJbnQoc3ltYm9sQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0lPZmZzZXQnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdFNpemU6IHBhcnNlSW50KHN5bWJvbEFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdCaXRTaXplJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uc2l6ZSA9ICh0aGlzLnN5bVRhYmxlW25hbWVdLmJpdFNpemUgPj0gOCkgPyB0aGlzLnN5bVRhYmxlW25hbWVdLmJpdFNpemUgLyA4IDogdGhpcy5zeW1UYWJsZVtuYW1lXS5iaXRTaXplO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlQXJyID0gdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlU3RyaW5nLnNwbGl0KFwiIFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVBcnJbMF0gPT09ICdBUlJBWScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9IHR5cGVBcnJbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0FycmF5IGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gdHlwZUFyclsxXS5zdWJzdHJpbmcoMSwgdHlwZUFyclsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IGFycmF5TGVuZ3RoLnNwbGl0KCcuLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyU3RhcnRJZHggPSBwYXJzZUludChhcnJheUxlbmd0aFswXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMV0sIDEwKSAtIHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlMZW5ndGggPSBhcnJheUxlbmd0aDtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0RhdGEgdHlwZSBvZiB0aGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHR5cGVBcnJbM10uc3BsaXQoJygnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVbMV0gPSB0eXBlWzFdLnN1YnN0cigwLCB0eXBlWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZUFyclswXSArICcuJyArIGFycmF5TGVuZ3RoICsgJy4nICsgdHlwZVswXSArICcuJyArIHR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uc3RyaW5nTGVuZ3RoID0gcGFyc2VJbnQodHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlQXJyWzBdICsgJy4nICsgYXJyYXlMZW5ndGggKyAnLicgKyB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSXRlbSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLml0ZW1TaXplID0gdGhpcy5zeW1UYWJsZVtuYW1lXS5zaXplIC8gYXJyYXlMZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5RGF0YVR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIHRoaXMucGxjVHlwZUxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlEYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlEYXRhVHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclswXS5zcGxpdCgnKCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1N0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnN0cmluZ0xlbmd0aCA9IHBhcnNlSW50KHR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIHRoaXMucGxjVHlwZUxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVSZWFkeSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBFbmQgb2YgcmVhZGluZyB0aGUgc3ltYm9scyBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTeW1ib2wgdGFibGUgcmVhZHkuJyk7XG5cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgcGFyc2luZyB0aGUgc3ltYm9sIGZpbGU6Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBSZWFkaW5nIHRoZSBzeW1ib2xzIGZyb20gdGhlIFRQWSBmaWxlIGlzIGRlYWN0aXZhdGVkLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vR2V0IHRoZSBkYXRhIHR5cGVzLlxuICAgICAgICAgICAgdmFyIGFsbERhdGFUeXBlcywgZGF0YVR5cGVBcnJheSwgc3ViSXRlbUFycmF5LCBzTmFtZSwgZnVsbE5hbWU7XG5cbiAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTdGFydCByZWFkaW5nIHRoZSBkYXRhIHR5cGVzIGZyb20gdGhlIFRQWSBmaWxlLicpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGFuIEFycmF5IG9mIHRoZSBFbGVtZW50cyB3aXRoIFwiRGF0YVR5cGVcIiBhcyB0YWcgbmFtZS5cbiAgICAgICAgICAgICAgICAgICAgYWxsRGF0YVR5cGVzID0gY29uZmlnRmlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnRGF0YVR5cGVzJylbMF07XG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlQXJyYXkgPSBhbGxEYXRhVHlwZXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0RhdGFUeXBlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIG5hbWUgb2YgdGhlIGRhdGEgdHlwZSBhbmQgY3JlYXRlIGFuIG9iamVjdCBwcm9wZXJ0eSB3aXRoIGl0LlxuICAgICAgICAgICAgICAgICAgICAvL2RhdGFUeXBlVGFibGUgaXMgZGVjbGFyZWQgb3V0c2lkZSBpbiB0aGUgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vQXJyYXlzIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhVHlwZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsTmFtZSA9IGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ05hbWUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGZ1bGxOYW1lLnNwbGl0KFwiIFwiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSAnQVJSQVknKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbZnVsbE5hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3R5cGU6IGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R5cGUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXRTaXplOiBwYXJzZUludChkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdCaXRTaXplJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW2Z1bGxOYW1lXS5zaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW2Z1bGxOYW1lXS5iaXRTaXplIC8gODtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1RoZW4gdGhlIHJlc3RcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGFUeXBlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lID0gZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnTmFtZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gZnVsbE5hbWUuc3BsaXQoXCIgXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgIT09ICdBUlJBWScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90eXBlOiBkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUeXBlJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0U2l6ZTogcGFyc2VJbnQoZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQml0U2l6ZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykl0ZW1zOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uYml0U2l6ZSAvIDg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0dldCB0aGUgU3ViSXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJJdGVtQXJyYXkgPSBkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdTdWJJdGVtJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN1Ykl0ZW1BcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzTmFtZSA9IHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnTmFtZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vT25seSBTdWJJdGVtcyB3aXRoIHR5cGUgaW5mb3JtYXRpb24gKHByb2JsZW0gb2NjdXJzIHdpdGggVEMzIGFuZCBzb21lIGxpYnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R5cGUnKS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc05hbWUgPSBzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ05hbWUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nOiBzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R5cGUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpWzBdLmhhc0F0dHJpYnV0ZSgnUG9pbnRlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdFNpemU6IHBhcnNlSW50KHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQml0U2l6ZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdCaXRPZmZzJylbMF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYml0T2Zmc2V0ID0gcGFyc2VJbnQoc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdCaXRPZmZzJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnNpemUgPSAodGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5iaXRTaXplID49IDgpID8gdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5iaXRTaXplIC8gOCA6IHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYml0U2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUFyciA9IHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZVN0cmluZy5zcGxpdChcIiBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlQXJyWzBdID09PSAnQVJSQVknKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1R5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGUgPSB0eXBlQXJyWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BcnJheSBMZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IHR5cGVBcnJbMV0uc3Vic3RyaW5nKDEsIHR5cGVBcnJbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBhcnJheUxlbmd0aC5zcGxpdCgnLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmFyclN0YXJ0SWR4ID0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMF0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IHBhcnNlSW50KGFycmF5TGVuZ3RoWzFdLCAxMCkgLSBwYXJzZUludChhcnJheUxlbmd0aFswXSwgMTApICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmFycmF5TGVuZ3RoID0gYXJyYXlMZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRGF0YSB0eXBlIG9mIHRoZSBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclszXS5zcGxpdCgnKCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVsxXSA9IHR5cGVbMV0uc3Vic3RyKDAsIHR5cGVbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uZnVsbFR5cGUgPSB0eXBlQXJyWzBdICsgJy4nICsgYXJyYXlMZW5ndGggKyAnLicgKyB0eXBlWzBdICsgJy4nICsgdHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5zdHJpbmdMZW5ndGggPSBwYXJzZUludCh0eXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBhZGRlZCBjYXVzZSB0aGVyZSBhcmUgdW5kZWZpbmVkIGRhdGEgdHlwZXMgc29tZSBUd2luQ0FUIGxpYnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2Uuc2tpcE1pc3NpbmdUeXBlcyA9PT0gdHJ1ZSAmJiB0aGlzLmRhdGFUeXBlVGFibGVbdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlU3RyaW5nXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IERhdGEgdHlwZSBtaXNzaW5nIGluIFRQWSBmaWxlOicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyh0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBBY2Nlc3MgdG8gc3ltYm9scyB1c2luZyB0aGlzIGRhdGEgdHlwZSB3aWxsIHJldHVybiB3cm9uZyByZXN1bHRzOicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBVc2UgaGFuZGxlcyB0byBhY2Nlc3Mgc3ltYm9scyB1c2luZyB0aGlzIGRhdGEgdHlwZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhVHlwZVRhYmxlW3RoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZVN0cmluZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogRGF0YSB0eXBlIG1pc3NpbmcgaW4gVFBZIGZpbGUhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IElmIHlvdSBkb25cXCd0IHVzZSB0aGlzIGRhdGEgdHlwZSB5b3UgY2FuIHNldCB0aGUgY2xpZW50IHBhcmFtZXRlciBcInNraXBNaXNzaW5nVHlwZXNcIiB0byB0cnVlLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYml0U2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVt0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGVTdHJpbmddLmJpdFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uc2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVt0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGVTdHJpbmddLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0l0ZW0gbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5pdGVtU2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uc2l6ZSAvIGFycmF5TGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB2YXJpYWJsZSBpcyBhIHVzZXIgZGVmaW5lZCBkYXRhIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5hcnJheURhdGFUeXBlID0gJ1VTRVInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZWxlbSBpbiB0aGlzLnBsY1R5cGVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxjVHlwZUxlbi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT09IGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmFycmF5RGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmFycmF5RGF0YVR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmRhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHR5cGVBcnJbMF0uc3BsaXQoJygnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVsxXSA9IHR5cGVbMV0uc3Vic3RyKDAsIHR5cGVbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uZnVsbFR5cGUgPSB0eXBlWzBdICsgJy4nICsgdHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5zdHJpbmdMZW5ndGggPSBwYXJzZUludCh0eXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5mdWxsVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB2YXJpYWJsZSBpcyBhIHVzZXIgZGVmaW5lZCBkYXRhIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlID0gJ1VTRVInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZWxlbSBpbiB0aGlzLnBsY1R5cGVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxjVHlwZUxlbi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT09IGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmRhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFNraXBwaW5nIFN1Ykl0ZW0gd2l0aCBubyB0eXBlIGluZm9ybWF0aW9uOiBEYXRhIHR5cGU6ICcgKyBuYW1lICsgJyAsU3ViSXRlbTogJyArIHNOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEVuZCBvZiByZWFkaW5nIHRoZSBkYXRhIHR5cGVzIGZyb20gdGhlIFRQWSBmaWxlLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IERhdGEgdHlwZSB0YWJsZSByZWFkeS4nKTtcblxuICAgICAgICAgICAgICAgICAgICAvL0dldCBVcGxvYWQgSW5mb1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNoZWNrR2V0VXBsb2FkSW5mbygpO1xuXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIGNyZWF0aW5nIHRoZSBkYXRhIHR5cGUgaW5mb3JtYXRpb246Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUeXBlOiAnICsgZnVsbE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnU3ViSXRlbTogJyArIHNOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY29uZmlnWG1sSHR0cFJlcS5zZW5kKG51bGwpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgU2V0IHRoZSBzZXJ2aWNlIHBhcmFtZXRlciB3aXRoIHRoZSB2YWx1ZXMgcmVhZCBmcm9tIHRoZSBUUFkgZmlsZS5cbiAgICAgKi9cbiAgICBzZXRTZXJ2aWNlUGFyYW1Gcm9tVFBZKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZS5hbXNOZXRJZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5hbXNOZXRJZCA9IHRoaXMuc2VydmljZUluZm8ubmV0SWQ7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IE5vIE5ldElkIGRlZmluaXRpb24gZm91bmQuIE5ldElkIGZyb20gVFBZIGZpbGUgd2lsbCBiZSB1c2VkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlcnZpY2UuYW1zUG9ydCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5hbXNQb3J0ID0gdGhpcy5zZXJ2aWNlSW5mby5wb3J0O1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBObyBBTVMgcG9ydCBkZWZpbml0aW9uIGZvdW5kLiBQb3J0IG51bWJlciBmcm9tIFRQWSBmaWxlIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZUluZm8uYWxpZ25tZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IHRoaXMuc2VydmljZUluZm8uYWxpZ25tZW50O1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogTm8gYWxpZ25tZW50IHBhcmFtZXRlciBmb3VuZC4gQWxpZ25tZW50IGZyb20gVFBZIGZpbGUgd2lsbCBiZSB1c2VkLicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBDYW5cXCd0IGdldCBhIHZhbHVlIGZvciB0aGUgZGF0YSBhbGlnbWVudC4gRGVmYXVsdCB2YWx1ZSBmb3IgYWxpZ25tZW50IGlzIHVzZWQgKDEpLiBUaGlzIHdvcmtzIG9ubHkgd2l0aCBUQzIgYW5kIHg4NiBwcm9jZXNzb3JzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ICE9PSAxICYmIHRoaXMuYWxpZ25tZW50ICE9PSA0ICYmIHRoaXMuYWxpZ25tZW50ICE9PSA4KSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFRoZSB2YWx1ZSBmb3IgdGhlIGFsaWdubWVudCBzaG91bGQgYmUgMSwgNCBvciA4LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUYXJnZXQgaW5mb3JtYXRpb246IE5ldElkOiAnICsgdGhpcy5zZXJ2aWNlLmFtc05ldElkICsgJywgQU1TIHBvcnQ6ICcgKyB0aGlzLnNlcnZpY2UuYW1zUG9ydCArICcgLCBhbGlnbm1lbnQ6ICcgKyB0aGlzLmFsaWdubWVudCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgVXBsb2FkSW5mbyBoYXMgdG8gYmUgZmV0Y2hlZC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja0dldFVwbG9hZEluZm8oKSB7XG5cbiAgICAgICAgdGhpcy5zZXRTZXJ2aWNlUGFyYW1Gcm9tVFBZKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlcnZpY2UuY29uZmlnRmlsZVVybCAhPSAnc3RyaW5nJyB8fCB0aGlzLnNlcnZpY2UuZm9yY2VVcGxvYWRVc2FnZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTdGFydCBmZXRjaGluZyB0aGUgc3ltYm9scyBmcm9tIFBMQy4nKTtcbiAgICAgICAgICAgIC8vR2V0IHRoZSBVcGxvYWRJbmZvLlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldFVwbG9hZEluZm8oKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZFxcJ250IGZldGNoIHRoZSBzeW1ib2wgaW5mb3JtYXRpb24gZnJvbSB0aGUgUExDOicgKyBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLnN5bmNYbWxIdHRwICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlYWR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIHRoZSBvblJlYWR5IGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vT24tcmVhZHktZnVuY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlcnZpY2Uub25SZWFkeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBDYWxsaW5nIHRoZSBcIm9uUmVhZHlcIiBmdW5jdGlvbi4nKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5vblJlYWR5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBcIm9uUmVhZHlcIiBmdW5jdGlvbiBkZWZpbmVkLiBDaGVjayB0aGUgbWFudWFsLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vU3RhcnQgY3ljbGljIEFEUyBjaGVja3MgaWYgZGVmaW5lZFxuICAgICAgICBpZiAoIWlzTmFOKHRoaXMuc2VydmljZS5hZHNDaGVja0ludGVydmFsKSAmJiB0aGlzLnNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IGN5Y2xpYyByZWFkaW5nIG9mIEFEUyBzdGF0ZS4nKTtcbiAgICAgICAgICAgIHNldEludGVydmFsKHRoaXMucmVhZEFkc1N0YXRlLCB0aGlzLnNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==