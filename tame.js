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
        var xmlHttpReq = this.createXMLHttpReq(), symbolArray = [], configFile, name, allSymbols, typeArr, arrayLength, type, elem, tcVersion, i;
        this.log('TAME library info: Start reading the TPY file.');
        //HTTPRequest
        xmlHttpReq.open('GET', this.service.configFileUrl, !this.service.syncXmlHttp, this.service.serviceUser, this.service.servicePassword);
        xmlHttpReq.setRequestHeader('Content-Type', 'text/xml');
        xmlHttpReq.onload = () => {
            //Create a DOM object from XML
            if (typeof DOMParser != 'undefined') {
                try {
                    configFile = (new DOMParser()).parseFromString(xmlHttpReq.responseText, "text/xml");
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
        xmlHttpReq.send(null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFhLElBQUk7SUF1SWIsWUFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUF0SS9CLFlBQU8sR0FBRyxlQUFlLENBQUE7UUFDekIsb0JBQWUsR0FBRztZQUNkLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUM5QyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDeEQsQ0FBQTtRQUNELG1CQUFjLEdBQUc7WUFDYixFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFDckYsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO1NBQ3JGLENBQUE7UUFDRCxxQkFBZ0IsR0FBRztZQUNmLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3hGLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFD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QSxDQUFBO1FBQ3pFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3ZFLGdCQUFXLEdBQUcsQ0FBTyxJQUFJLEVBQUUsRUFBRSxnREFBQyxPQUFBLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBLEdBQUEsQ0FBQTtRQUM3RSxnQkFBVyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDN0UsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsY0FBUyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDekUsY0FBUyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDekUsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsZ0JBQVcsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzdFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3ZFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBRXJFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3BFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFB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ekYsT0FBTzthQUNWO1NBQ0o7YUFBTTtZQUNILElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEI7U0FDSjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU87UUFDSCxtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjthQUFNO1lBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0Qsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxFQUFFO1lBQzdFLElBQUksQ0FBQyxHQUFHLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUNsRSxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDO0NBRUo7QUFwekpELG9CQW96SkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVEFNRSB7XG4gICAgdmVyc2lvbiA9ICdWNC4zLjEgMTcxMTIwJ1xuICAgIHdlZWtkU2hvcnROYW1lcyA9IHtcbiAgICAgICAgZ2U6IFsnU28nLCAnTW8nLCAnRGknLCAnTWknLCAnRG8nLCAnRnInLCAnU2EnXSxcbiAgICAgICAgZW46IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J11cbiAgICB9XG4gICAgd2Vla2RMb25nTmFtZXMgPSB7XG4gICAgICAgIGdlOiBbJ1Nvbm50YWcnLCAnTW9udGFnJywgJ0RpZW5zdGFnJywgJ01pdHR3b2NoJywgJ0Rvbm5lcnN0YWcnLCAnRnJlaXRhZycsICdTYW1zdGFnJ10sXG4gICAgICAgIGVuOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J11cbiAgICB9XG4gICAgbW9udGhzU2hvcnROYW1lcyA9IHtcbiAgICAgICAgZ2U6IFsnSmFuJywgJ0ZlYicsICdNcnonLCAnQXByJywgJ01haScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2t0JywgJ05vdicsICdEZXonXSxcbiAgICAgICAgZW46IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RleiddXG4gICAgfVxuICAgIG1vbnRoc0xvbmdOYW1lcyA9IHtcbiAgICAgICAgZ2U6IFsnSmFudWFyJywgJ0ZlYnJ1YXInLCAnTcOkcnonLCAnQXByaWwnLCAnTWFpJywgJ0p1bmknLCAnSnVsaScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09rdG9iZXInLCAnTm92ZW1iZXInLCAnRGV6ZW1iZXInXSxcbiAgICAgICAgZW46IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG4gICAgfVxuICAgIGRhdGVOYW1lczogeyB3ZWVrZFNob3J0OiBhbnk7IHdlZWtkTG9uZzogYW55OyBtb250aHNTaG9ydDogYW55OyBtb250aHNMb25nOiBhbnkgfVxuICAgIG1heFN0cmluZ0xlbjogbnVtYmVyXG4gICAgbWF4RHJvcFJlcTogbnVtYmVyXG4gICAgdXNlQ2hlY2tCb3VuZHM6IGJvb2xlYW5cbiAgICBhZHNTdGF0ZTogYW55XG4gICAgYWRzU3RhdGVUeHQ6IHN0cmluZ1xuICAgIGRldmljZVN0YXRlOiBhbnlcbiAgICBzeW1UYWJsZVJlYWR5OiBib29sZWFuXG4gICAgZGF0YVR5cGVUYWJsZVJlYWR5OiBib29sZWFuXG4gICAgaGFuZGxlQ2FjaGVSZWFkeTogYm9vbGVhblxuICAgIHhtbEh0dHBSZXFUaW1lb3V0OiBudW1iZXJcblxuICAgIGluZGV4R3JvdXBzID0ge1xuICAgICAgICBNOiAxNjQxNiwgICAgLy9QTEMgbWVtb3J5IHJhbmdlKCVNIGZpZWxkKSwgUkVBRF9NIC0gV1JJVEVfTVxuICAgICAgICBNWDogMTY0MTcsICAgLy9QTEMgbWVtb3J5IHJhbmdlKCVNWCBmaWVsZCksIFJFQURfTVggLSBXUklURV9NWFxuICAgICAgICBEQjogMTY0NDgsICAgLy9EYXRhIHJhbmdlXG4gICAgICAgIEk6IDYxNDcyLCAgICAvL1BMQyBwcm9jZXNzIGRpYWdyYW0gb2YgdGhlIHBoeXNpY2FsIGlucHV0cyglSSBmaWVsZCksIFJFQURfSSAtIFdSSVRFX0lcbiAgICAgICAgSVg6IDYxNDczLCAgIC8vUExDIHByb2Nlc3MgZGlhZ3JhbSBvZiB0aGUgcGh5c2ljYWwgaW5wdXRzKCVJWCBmaWVsZCksIFJFQURfSVggLSBXUklURV9JWFxuICAgICAgICBROiA2MTQ4OCwgICAgLy9QTEMgcHJvY2VzcyBkaWFncmFtIG9mIHRoZSBwaHlzaWNhbCBvdXRwdXRzKCVRIGZpZWxkKSwgUkVBRF9RIC0gV1JJVEVfUVxuICAgICAgICBRWDogNjE0ODksICAgLy9QTEMgcHJvY2VzcyBkaWFncmFtIG9mIHRoZSBwaHlzaWNhbCBvdXRwdXRzKCVRWCBmaWVsZCksIFJFQURfUVggLSBXUklURV9RWFxuICAgICAgICBVcGxvYWQ6IDYxNDUxLCAgICAgIC8vQ29udGFpbnMgdGhlIHN5bWJvbCBpbmZvcm1hdGlvblxuICAgICAgICBVcGxvYWRJbmZvOiA2MTQ1MiwgIC8vTGVuZ3RoIGFuZCBudW1iZXIgb2YgdGhlIHN5bWJvbCBpbmZvcm1hdGlvbiAgICAgICAgXG4gICAgICAgIEhhbmRsZUJ5TmFtZTogNjE0NDMsXG4gICAgICAgIFZhbHVlQnlIYW5kbGU6IDYxNDQ1LFxuICAgICAgICBSZWxlYXNlSGFuZGxlOiA2MTQ0NixcbiAgICAgICAgU3VtUmQ6IDYxNTY4LCAgICAgICAvL1N1bVVwUmVhZFJlcXVlc3RcbiAgICAgICAgU3VtV3I6IDYxNTY5LCAgICAgICAvL1N1bVVwV3JpdGVSZXF1ZXN0XG4gICAgICAgIFN1bVJkV3I6IDYxNTcwICAgICAgLy9TdW1VcFJlYWRXcml0ZVJlcXVlc3RcbiAgICB9XG5cbiAgICAvL0xlbmdodCBvZiBQTEMgZGF0YSB0eXBlcyBpbiBieXRlcy5cbiAgICBwbGNUeXBlTGVuID0ge1xuICAgICAgICBCT09MOiAxLFxuICAgICAgICBCWVRFOiAxLFxuICAgICAgICBVU0lOVDogMSxcbiAgICAgICAgU0lOVDogMSxcbiAgICAgICAgV09SRDogMixcbiAgICAgICAgVUlOVDogMixcbiAgICAgICAgSU5UOiAyLFxuICAgICAgICBJTlQxNjogMixcbiAgICAgICAgSU5UMURQOiAyLFxuICAgICAgICBJTlQyRFA6IDIsXG4gICAgICAgIERXT1JEOiA0LFxuICAgICAgICBVRElOVDogNCxcbiAgICAgICAgRElOVDogNCxcbiAgICAgICAgVElNRTogNCwgICAgICAgICAgLy90aW1lIGJhc2UgaW4gUExDOiBtaWxsaXNlY29uZHNcbiAgICAgICAgVE9EOiA0LCAgICAgICAgICAgLy90aW1lIGJhc2UgaW4gUExDOiBtaWxsaXNlY29uZHNcbiAgICAgICAgVElNRV9PRl9EQVk6IDQsICAgLy9Ud2luQ0FUMywgdGltZSBiYXNlIGluIFBMQzogbWlsbGlzZWNvbmRzXG4gICAgICAgIERBVEU6IDQsICAgICAgICAgIC8vdGltZSBiYXNlIGluIFBMQzogc2Vjb25kc1xuICAgICAgICBEVDogNCwgICAgICAgICAgICAvL3RpbWUgYmFzZSBpbiBQTEM6IHNlY29uZHNcbiAgICAgICAgREFURV9BTkRfVElNRTogNCwgLy9Ud2luQ0FUMywgdGltZSBiYXNlIGluIFBMQzogc2Vjb25kc1xuICAgICAgICBQT0lOVEVSOiA0LFxuICAgICAgICBSRUFMOiA0LFxuICAgICAgICBMUkVBTDogOCxcbiAgICAgICAgU1RSSU5HOiA4MCwgICAgLy93aXRob3V0IHRlcm1pbmF0aW9uXG4gICAgICAgIEVuZFN0cnVjdDogMCAgIC8vc2hvdWxkIGJlIDAhXG4gICAgfVxuXG4gICAgLy9BRFMgc3RhdGVzXG4gICAgYWRzU3RhdGVzID0gW1xuICAgICAgICBcIklOVkFMSURcIixcbiAgICAgICAgXCJJRExFXCIsXG4gICAgICAgIFwiUkVTRVRcIixcbiAgICAgICAgXCJJTklUXCIsXG4gICAgICAgIFwiU1RBUlRcIixcbiAgICAgICAgXCJSVU5cIixcbiAgICAgICAgXCJTVE9QXCIsXG4gICAgICAgIFwiU0FWRUNGR1wiLFxuICAgICAgICBcIlBPV0VSR09PRFwiLFxuICAgICAgICBcIkVSUk9SXCIsXG4gICAgICAgIFwiU0hVVERPV05cIixcbiAgICAgICAgXCJTVVNQRU5EXCIsXG4gICAgICAgIFwiUkVTVU1FXCIsXG4gICAgICAgIFwiQ09ORklHXCIsXG4gICAgICAgIFwiUkVDT05GSUdcIlxuICAgIF1cbiAgICBsYW5nOiBhbnlcbiAgICBhbGlnbm1lbnQ6IG51bWJlclxuICAgIGN1cnJSZXE6IG51bWJlcltdXG4gICAgc3ltVGFibGUgPSB7fVxuICAgIGRhdGFUeXBlVGFibGUgPSB7fVxuICAgIHNlcnZpY2VJbmZvID0ge30gYXMgYW55XG4gICAgc3ltYm9sQ291bnQ6IG51bWJlclxuICAgIHVwbG9hZExlbmd0aDogbnVtYmVyXG4gICAgaGFuZGxlQ2FjaGUgPSB7fVxuICAgIGhhbmRsZU5hbWVzOiBhbnlbXVxuICAgIHhtbEh0dHBSZXE6IGFueVxuICAgIGxvZyhtZXNzYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vR2VuZXJhdGUgYSBCYXNlNjQgYWxwaGFiZXQgZm9yIHRoZSBlbmNvZGVyLiBVc2luZyBhbiBhcnJheSBvciBvYmplY3QgdG9cbiAgICAvL3N0b3JlIHRoZSBhbHBoYWJldCB0aGUgZW4tL2RlY29kZXIgcnVucyBmYXN0ZXIgdGhhbiB3aXRoIHRoZSBjb21tb25seVxuICAgIC8vdXNlZCBzdHJpbmcuIEF0IGxlYXN0IHdpdGggdGhlIGJyb3dzZXJzIG9mIDIwMDkuIDstKVxuICAgIGI2NEVuYyA9ICgoKSA9PiB7XG4gICAgICAgIHZhciByZXQgPSB7fSxcbiAgICAgICAgICAgIHN0ciA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcbiAgICAgICAgICAgIGk6IG51bWJlcjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmV0W2ldID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0pKCk7XG5cbiAgICAvL0dlbmVyYXRlIGEgQmFzZTY0IGFscGhhYmV0IGZvciB0aGUgZGVjb2Rlci5cbiAgICBiNjREZWMgPSAoKCkgPT4ge1xuICAgICAgICB2YXIgcmV0ID0ge30sXG4gICAgICAgICAgICBzdHIgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nLFxuICAgICAgICAgICAgaTogbnVtYmVyO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXRbc3RyLmNoYXJBdChpKV0gPSBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSkoKTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VydmljZTogYW55KSB7XG5cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB2ZXJzaW9uOiAnICsgdGhpcy52ZXJzaW9uKTtcblxuICAgICAgICAvL1NldCBsYW5ndWFnZSBmb3IgbmFtZXMgb2YgZGF5cyBhbmQgbW9udGhzLCBkZWZhdWx0IGlzIGdlcm1hbi5cbiAgICAgICAgdGhpcy5sYW5nID0gKHR5cGVvZiBzZXJ2aWNlLmxhbmd1YWdlID09PSAnc3RyaW5nJykgPyBzZXJ2aWNlLmxhbmd1YWdlIDogJ2dlJyxcblxuICAgICAgICAvL0FsaWdubWVudFxuICAgICAgICB0aGlzLmFsaWdubWVudCA9IDAsXG5cbiAgICAgICAgLy9BcnJheSBmb3IgdGhlIHJlcXVlc3QgYWNrbm93bGVkZ2VtZW50IGNvdW50ZXIuXG4gICAgICAgIHRoaXMuY3VyclJlcSA9IFswXSxcblxuICAgICAgICAvL1RoZSBTeW1ib2wgVGFibGUgZm9yIGFjY2Vzc2luZyB2YXJpYWJsZXMgcGVyIG5hbWUuXG4gICAgICAgIHRoaXMuc3ltVGFibGUgPSB7fSxcbiAgICAgICAgLy90aGlzLnN5bVRhYmxlT2sgPSBmYWxzZSxcbiAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlID0ge30sXG4gICAgICAgIC8vdGhpcy5kYXRhVHlwZVRhYmxlT2sgPSBmYWxzZSxcbiAgICAgICAgdGhpcy5zZXJ2aWNlSW5mbyA9IHt9LFxuXG4gICAgICAgIC8vVmFyaWFibGVzIG9mIHRoZSBVcGxvYWRJbmZvIFxuICAgICAgICB0aGlzLnN5bWJvbENvdW50ID0gMCwgdGhpcy51cGxvYWRMZW5ndGggPSAwLFxuXG4gICAgICAgIC8vT2JqZWN0IHRvIHN0b3JlIHRoZSBoYW5kbGVzXG4gICAgICAgIHRoaXMuaGFuZGxlQ2FjaGUgPSB7fSxcbiAgICAgICAgdGhpcy5oYW5kbGVOYW1lcyA9IFtdO1xuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hlY2sgQ2xpZW50IFBhcmFtZXRlclxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLy9VUkwgb2YgdGhlIFRjQWRzV2ViU2VydmljZS5kbGxcbiAgICAgICAgaWYgKHR5cGVvZiBzZXJ2aWNlLnNlcnZpY2VVcmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBTZXJ2aWNlIFVSTCBpcyBub3QgYSBzdHJpbmchJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL0FNUyBOZXRJRCBvZiB0aGUgUExDXG4gICAgICAgIGlmICh0eXBlb2Ygc2VydmljZS5hbXNOZXRJZCAhPT0gJ3N0cmluZycgJiYgKHR5cGVvZiBzZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgIT09ICdzdHJpbmcnIHx8IHNlcnZpY2UuZG9udEZldGNoU3ltYm9scyA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5ldElkIGlzIG5vdCBkZWZpbmVkIGFuZCB0aGVyZSBpcyBubyBVUkwgZm9yIGZldGNoaW5nIHRoZSBUUFkgZmlsZSBvciBmZXRjaGluZyB0aGUgc3ltYm9scyBpcyBkZWFjdGl2YXRlZCEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQU1TIFBvcnQgTnVtYmVyIG9mIHRoZSBSdW50aW1lIFN5c3RlbVxuICAgICAgICBpZiAoc2VydmljZS5hbXNQb3J0ID09PSB1bmRlZmluZWQgJiYgKHR5cGVvZiBzZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgIT09ICdzdHJpbmcnIHx8IHNlcnZpY2UuZG9udEZldGNoU3ltYm9scyA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHNlcnZpY2UuYW1zUG9ydCA9ICc4MDEnO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBBTVMgcG9ydCBudW1iZXIgaXMgbm90IHNldCEgRGVmYXVsdCBwb3J0IDgwMSB3aWxsIGJlIHVzZWQuJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlcnZpY2UuYW1zUG9ydCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogQU1TIHBvcnQgbnVtYmVyIGlzIG5vdCBhIHN0cmluZyEgVHJ5aW5nIHRvIGNvbnZlcnQgaXQuJyk7XG4gICAgICAgICAgICBzZXJ2aWNlLmFtc1BvcnQgPSBzZXJ2aWNlLmFtc1BvcnQudG9TdHJpbmcoMTApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJzZUludChzZXJ2aWNlLmFtc1BvcnQsIDEwKSA8IDgwMSB8fCBwYXJzZUludChzZXJ2aWNlLmFtc1BvcnQsIDEwKSA+IDg5MSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQU1TIFBvcnQgTnVtYmVyICgnICsgcGFyc2VJbnQoc2VydmljZS5hbXNQb3J0LCAxMCkgKyAnKSBpcyBvdXQgb2YgcmFuZ2UgKDgwMS04OTEpIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9EYXRhIGFsaWdubWVudCwgeDg2IGFuZCBUQzIgdXNlcyBhIDEgYnl0ZSBhbGlnbm1lbnQsIGZvciBhbiBBUk0gYW5kIFRDMiBzZXQgaXQgdG8gNCBhbmRcbiAgICAgICAgLy9mb3IgVEMzIGdlbmVyYWxseSB0byA4OyBcbiAgICAgICAgLy9kYXRhQWxpZ240IGlzIGRlcHJpY2F0ZWRcbiAgICAgICAgaWYgKHNlcnZpY2UuZGF0YUFsaWduNCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSA0O1xuICAgICAgICB9IGVsc2UgaWYgKHNlcnZpY2UuYWxpZ25tZW50ID09PSB1bmRlZmluZWQgJiYgKHR5cGVvZiBzZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgIT09ICdzdHJpbmcnIHx8IHNlcnZpY2UuZG9udEZldGNoU3ltYm9scyA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWxpZ25tZW50ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VydmljZS5hbGlnbm1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IHBhcnNlSW50KHNlcnZpY2UuYWxpZ25tZW50LCAxMCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlcnZpY2UuYWxpZ25tZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSBzZXJ2aWNlLmFsaWdubWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2xvYmFsIHN5bmNocm9ub3VzIFhNTEhUVFBSZXF1ZXN0c1xuICAgICAgICBpZiAoc2VydmljZS5zeW5jWG1sSHR0cCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUaGUgXCJzeW5jWG1sSHR0cFwiIHBhcmFtZXRlciBpcyBzZXQgdG8gdHJ1ZS4gU3luY2hyb25vdXMgWE1MSHR0cFJlcXVlc3RzIHdpbGwgYmUgdXNlZCBieSBkZWZhdWx0LicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9Eb24ndCBsZXQgaXQgdW5kZWZpbmVkXG4gICAgICAgICAgICBzZXJ2aWNlLnN5bmNYbWxIdHRwID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL1VzZXJuYW1lL3Bhc3N3b3JkXG4gICAgICAgIGlmICh0eXBlb2Ygc2VydmljZS5zZXJ2aWNlVXNlciA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHNlcnZpY2Uuc2VydmljZVBhc3N3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBVc2VybmFtZSBhbmQgcGFzc3dvcmQgc2V0LiBBdXRoZW50aWNhdGVkIHJlcXVlc3RzIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZVVzZXIgPSBudWxsO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlUGFzc3dvcmQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HbG9iYWwgdXNlIG9mIGhhbmRsZXNcbiAgICAgICAgaWYgKHNlcnZpY2UudXNlSGFuZGxlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUaGUgXCJ1c2VIYW5kbGVzXCIgcGFyYW1ldGVyIGlzIHNldCB0byB0cnVlLiBIYW5kbGVzIHdpbGwgYmUgdXNlZCBieSBkZWZhdWx0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Eb24ndCBjaGVjayBmb3IgbWlzc2luZyBkYXRhIHR5cGVzICh0aGF0cyBhIHByb2JsZW0gd2l0aCBzb21lIFR3aW5DQVQgbGlicylcbiAgICAgICAgaWYgKHNlcnZpY2Uuc2tpcE1pc3NpbmdUeXBlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUaGUgXCJza2lwTWlzc2luZ1R5cGVzXCIgcGFyYW1ldGVyIGlzIHNldCB0byB0cnVlLiBUQU1FIGp1c3QgZHJvcHMgYSBsb2cgbWVzc2FnZSBpZiB0aGVyZSBhcmUgVHdpbkNBVCBsaWJzIHdpdGggbWlzc2luZyBkYXRhIHR5cGVzLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VydmljZS5za2lwTWlzc2luZ1R5cGVzID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL0N5Y2xpYyBBRFMgY2hlY2tzIChleHBlcmltZW50YWwpLlxuICAgICAgICBpZiAoIWlzTmFOKHNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCkgJiYgc2VydmljZS5hZHNDaGVja0ludGVydmFsID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogQ3ljbGljIEFEUyBzdGF0ZSBjaGVja3MgZW5hYmxlZC4gSW50ZXJ2YWwgdGltZTogJyArIHNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCArICcgbXMuJyk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbml0aWFsaXplIFByb3BlcnRpZXNcbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC8vU2V0IGxhbmd1YWdlIHNwZWNpZmljIG5hbWVzIG9mIGRheXMgYW5kIG1vbnRocy5cbiAgICAgICAgdGhpcy5kYXRlTmFtZXMgPSB7XG4gICAgICAgICAgICB3ZWVrZFNob3J0OiB0aGlzLndlZWtkU2hvcnROYW1lc1t0aGlzLmxhbmddLFxuICAgICAgICAgICAgd2Vla2RMb25nOiB0aGlzLndlZWtkTG9uZ05hbWVzW3RoaXMubGFuZ10sXG4gICAgICAgICAgICBtb250aHNTaG9ydDogdGhpcy5tb250aHNTaG9ydE5hbWVzW3RoaXMubGFuZ10sXG4gICAgICAgICAgICBtb250aHNMb25nOiB0aGlzLm1vbnRoc0xvbmdOYW1lc1t0aGlzLmxhbmddXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9NYXhpbXVtIHN0cmluZyBsZW5ndGguXG4gICAgICAgIHRoaXMubWF4U3RyaW5nTGVuID0gMjU1O1xuXG4gICAgICAgIC8vTWF4aW11bSBjb3VudCBvZiBkcm9wcGVkIHJlcXVlc3RzIGFmdGVyIGEgcmVxdWVzdFxuICAgICAgICAvL3dhcyBub3QgYWNrbm93bGVkZ2VkIChpbiBjb25qdW5jdGlvbiB3aXRoIGEgcmVxZXN0IElEKS5cbiAgICAgICAgdGhpcy5tYXhEcm9wUmVxID0gMTA7XG5cbiAgICAgICAgLy9DaGVjayBsaW1pdHMgb2YgbnVtZXJpYyB2YXJpYWJsZXMgYmVmb3JlIHNlbmRpbmcgdGhlbSB0byB0aGUgUExDXG4gICAgICAgIHRoaXMudXNlQ2hlY2tCb3VuZHMgPSB0cnVlO1xuXG4gICAgICAgIC8vQURTIHN0YXRlc1xuICAgICAgICB0aGlzLmFkc1N0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZHNTdGF0ZVR4dCA9ICcnO1xuICAgICAgICB0aGlzLmRldmljZVN0YXRlID0gbnVsbDtcblxuICAgICAgICAvL1JlYWR5IHN0YXRlc1xuICAgICAgICB0aGlzLnN5bVRhYmxlUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYW5kbGVDYWNoZVJlYWR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy9YTUxIdHRwUmVxdWVzdCB0aW1lb3V0XG4gICAgICAgIHRoaXMueG1sSHR0cFJlcVRpbWVvdXQgPSA1MDAwO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgbmFtZXMgb2YgdGhlIFBMQyB2YXJpYWJsZXMgdXNpbmcgdGhlIHVwbG9hZCBpbmZvLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHNlcnZpY2UuZG9udEZldGNoU3ltYm9scyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBSZWFkaW5nIG9mIHRoZSBVcGxvYWRJbmZvIGFuZCB0aGUgVFBZIGZpbGUgZGVhY3RpdmF0ZWQuIFN5bWJvbCBUYWJsZSBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ICE9PSAxICYmIHRoaXMuYWxpZ25tZW50ICE9PSA0ICYmIHRoaXMuYWxpZ25tZW50ICE9PSA4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBUaGUgdmFsdWUgZm9yIHRoZSBhbGlnbm1lbnQgc2hvdWxkIGJlIDEsIDQgb3IgOC4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUYXJnZXQgaW5mb3JtYXRpb246IE5ldElkOiAnICsgc2VydmljZS5hbXNOZXRJZCArICcsIEFNUyBwb3J0OiAnICsgc2VydmljZS5hbXNQb3J0ICsgJyAsIGFsaWdubWVudDogJyArIHRoaXMuYWxpZ25tZW50KTtcblxuICAgICAgICAgICAgaWYgKHNlcnZpY2Uuc3luY1htbEh0dHAgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLm9uUmVhZHksIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlcnZpY2UuY29uZmlnRmlsZVVybCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRmV0Y2hpbmcgdGhlIFRQWSBmaWxlIGZyb20gdGhlIHdlYnNlcnZlci4nKTtcbiAgICAgICAgICAgICAgICAvL0dldCB0aGUgc3ltYm9sIGZpbGUgYW5kIHBhcnNlIGl0LiBVcGxvYWQgSW5mbyB3aWxsIGJlIGZldGNoZWQgYWZ0ZXIuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb25maWdGaWxlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vU3RhcnQgZ2V0dGluZyB0aGUgVXBsb2FkIEluZm8uXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0dldFVwbG9hZEluZm8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbHBlciBGdW5jdGlvbnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgdmFyaWFibGUgbmFtZXMgcGFzc2VkIGFzIHN0cmluZ3MgYW5kIHJldHVybiB0aGUgb2JqZWN0LFxuICAgICAqIHN0b3JlIGRhdGEgdmFsdWVzIGlmIHRoZXkgYXJlIHBhc3NlZCB0b28uXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgICAgIFRoZSBuYW1lIG9mIGEgSmF2YVNjcmlwdCB2YXJpYWJsZSBvciBhIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhICAgICBEYXRhIHZhbHVlcyB0byBzdG9yZSBpbiB0aGUgdmFyaWFibGUvcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAgICAgIFRoZSBvYmplY3QgY29udGFpbmluZyB0aGUgcHJvcGVydHkgdG8gc3RvcmUgdGhlIGRhdGEgaW4uIFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VkIHdpdGggY3JlYXRlQXJyYXlEZXNjcmlwdG9yIGFuZCBjcmVhdGVTdHJ1Y3REZXNjcmlwdG9yIFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLlxuICAgICAqL1xuICAgIHBhcnNlVmFyTmFtZShuYW1lLCBkYXRhPywgb2JqPywgcHJlZml4Pywgc3VmZml4Pykge1xuXG4gICAgICAgIHZhciBhcnIgPSBbXSxcbiAgICAgICAgICAgIGxhc3QgPSAwLFxuICAgICAgICAgICAgYSA9IFtdLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgYXJyWzBdID0gbmFtZS50b1N0cmluZygxMCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBhcnIgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDYW5cXCd0IHBhcnNlIG5hbWUgb2Ygb2JqZWN0L3ZhcmlhYmxlLiBOYW1lIGlzIG5vdCBhIHN0cmluZyBvciBudW1iZXIhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhuYW1lKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2JqID0gd2luZG93O1xuICAgICAgICB9XG4gICAgICAgIGxhc3QgPSBhcnIubGVuZ3RoIC0gMTtcblxuICAgICAgICAvL1dhbGsgdGhyb3VnaCB0aGUgdGllcnNcbiAgICAgICAgd2hpbGUgKGkgPCBsYXN0KSB7XG4gICAgICAgICAgICAvL0NoZWNrIGlmIHRoZSBwYXNzZWQgbmFtZSBwb2ludHMgdG8gYW4gYXJyYXkuXG4gICAgICAgICAgICBpZiAoYXJyW2ldLmNoYXJBdChhcnJbaV0ubGVuZ3RoIC0gMSkgPT09ICddJykge1xuICAgICAgICAgICAgICAgIGEgPSBhcnJbaV0uc3Vic3RyaW5nKDAsIGFycltpXS5sZW5ndGggLSAxKS5zcGxpdCgnWycpO1xuICAgICAgICAgICAgICAgIG9iaiA9IG9ialthWzBdXVthWzFdXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYW4gYXJyYXkgaWYgb2JqZWN0IGlzIG5vdCBkZWZpbmVkLlxuICAgICAgICAgICAgICAgIC8vVGhpcyBjYW4gaGFwcGVuIHdoZW4gYW4gYXJyYXkgb2Ygc3RydWN0dXJlIGlzXG4gICAgICAgICAgICAgICAgLy9ub3QgZGVmaW5lZC5cbiAgICAgICAgICAgICAgICBpZiAob2JqW2FycltpXV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvYmpbYXJyW2ldXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYmogPSBvYmpbYXJyW2ldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vTGFzdCBlbGVtZW50XG4gICAgICAgIGlmIChhcnJbaV0uY2hhckF0KGFycltpXS5sZW5ndGggLSAxKSA9PT0gJ10nKSB7XG4gICAgICAgICAgICAvL0lmIGxhc3QgaXRlbSBvZiB0aGUgbmFtZSBpcyBhbiBhcnJheVxuICAgICAgICAgICAgYSA9IGFycltpXS5zdWJzdHJpbmcoMCwgYXJyW2ldLmxlbmd0aCAtIDEpLnNwbGl0KCdbJyk7XG4gICAgICAgICAgICBvYmogPSBvYmpbYVswXV07XG5cbiAgICAgICAgICAgIC8vU3RvcmUgZGF0YSBpZiBwYXNzZWQuXG4gICAgICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmVmaXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBwcmVmaXggKyBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1ZmZpeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEgKyBzdWZmaXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ialthWzFdXSA9IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqW2FbMV1dO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvL1N0b3JlIGRhdGEgaWYgcGFzc2VkLlxuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByZWZpeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gcHJlZml4ICsgZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3VmZml4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhICsgc3VmZml4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqW2FycltpXV0gPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmpbYXJyW2ldXTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBwYXNzZWQgc3RyaW5nIGxlbmd0aCBpcyB2YWxpZC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuXG4gICAgICovXG4gICAgaXNWYWxpZFN0cmluZ0xlbihsZW4pIHtcbiAgICAgICAgaWYgKGxlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc05hTihsZW4pICYmIGxlbiA+IDAgJiYgbGVuIDw9IHRoaXMubWF4U3RyaW5nTGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBVc2VyIGRlZmluZWQgc3RyaW5nIGxlbmd0aCBub3QgdmFsaWQhIGxlbmd0aDogJyArIGxlbik7XG4gICAgICAgIHRoaXMubG9nKCdNYXguIHN0cmluZyBsZW5ndGg6ICcgKyB0aGlzLm1heFN0cmluZ0xlbik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiByZXR1cm5zIHRoZSBJbmRleEdyb3VwIGZvciBhIFBMQyB2YXJpYWJsZSBhZGRyZXNzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXEgICAgICAgICAgQW4gb2JqZWN0IHdpdGggdGhlIGFkZHJlc3Mgb3IgdGhlIG5hbWUgZm9yIHRoZSByZXF1ZXN0LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gaW5kZXhHcm91cCAgVGhlIEluZGV4R3JvdXAgZm9yIHRoZSBBRFMgcmVxdWVzdC4gXG4gICAgICovXG4gICAgZ2V0SW5kZXhHcm91cChyZXEpIHtcbiAgICAgICAgdmFyIGluZGV4R3JvdXA7XG5cbiAgICAgICAgaWYgKHJlcS5hZGRyKSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIEluZGV4R3JvdXAgYnkgYWRkcmVzc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuYWRkciA9PT0gJ3N0cmluZycgJiYgcmVxLmFkZHIuY2hhckF0KDApID09PSAnJScpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxLmFkZHIuY2hhckF0KDIpID09PSAnWCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9CaXQgYWRkcmVzc2VzLlxuICAgICAgICAgICAgICAgICAgICBpbmRleEdyb3VwID0gdGhpcy5pbmRleEdyb3Vwc1tyZXEuYWRkci5zdWJzdHIoMSwgMildO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQnl0ZSBhZGRyZXNzZXMuXG4gICAgICAgICAgICAgICAgICAgIGluZGV4R3JvdXAgPSB0aGlzLmluZGV4R3JvdXBzW3JlcS5hZGRyLnN1YnN0cigxLCAxKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBXcm9uZyBhZGRyZXNzIGRlZmluaXRpb24sIHNob3VsZCBiZSBhIHN0cmluZyBhbmQgc3RhcnQgd2l0aCBcIiVcIiEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXEudXNlSGFuZGxlID09PSB0cnVlIHx8IHRoaXMuc2VydmljZS51c2VIYW5kbGVzID09PSB0cnVlICYmIHJlcS51c2VIYW5kbGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvL0dldCB0aGUgSW5kZXhHcm91cCBmb3IgdGhlIFZhbHVlIEJ5IEhhbmRsZSBSZXF1ZXN0XG4gICAgICAgICAgICBpbmRleEdyb3VwID0gdGhpcy5pbmRleEdyb3Vwcy5WYWx1ZUJ5SGFuZGxlO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcS5zeW1ib2xOYW1lKSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIEluZGV4R3JvdXAgYnkgbmFtZVxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuc3ltYm9sTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleEdyb3VwID0gdGhpcy5zeW1UYWJsZVtyZXEuc3ltYm9sTmFtZV0uaW5kZXhHcm91cDtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENhblxcJ3QgZ2V0IHRoZSBJbmRleEdyb3VwIGZvciB0aGlzIHJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBsZWFzZSBjaGVjayB0aGUgdmFyaWFibGUgbmFtZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhcmlibGUgbmFtZSBzaG91bGQgYmUgYSBzdHJpbmchJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBuYW1lLCBhZGRyZXNzIG9yIGhhbmRsZSBmb3IgdGhlIHZhcmlhYmxlL3JlcXVlc3QgZGVmaW5lZCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4oaW5kZXhHcm91cCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEluZGV4R3JvdXAgaXMgbm90IGEgbnVtYmVyLCBjaGVjayBhZGRyZXNzIG9yIG5hbWUgZGVmaW5pdGlvbiBvZiB0aGUgdmFyaWFibGUvcmVxdWVzdCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhHcm91cDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiByZXR1cm5zIHRoZSBJbmRleE9mZnNldCBmb3IgYSBQTEMgdmFyaWFibGUgYWRkcmVzcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVxICAgICAgICAgIEFuIG9iamVjdCB3aXRoIHRoZSBhZGRyZXNzIG9yIHRoZSBuYW1lIGZvciB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGluZGV4T2Zmc2V0IFRoZSBJbmRleE9mZnNldCBmb3IgdGhlIEFEUyByZXF1ZXN0LiBcbiAgICAgKi9cbiAgICBnZXRJbmRleE9mZnNldChyZXEpIHtcbiAgICAgICAgdmFyIGluZGV4T2Zmc2V0LCBudW1TdHJpbmcgPSAnJywgbXhhZGRyID0gW10sIGksIGRhdGFUeXBlLCBpdGVtQXJyYXksIHNwbGl0dGVkVHlwZSwgYml0b2Zmcywgc3ViaXRlbTtcblxuICAgICAgICBpZiAocmVxLmFkZHIpIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgSW5kZXhPZmZzZXQgYnkgYWRkcmVzc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuYWRkciA9PT0gJ3N0cmluZycgJiYgcmVxLmFkZHIuY2hhckF0KDApID09PSAnJScpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxLmFkZHIuY2hhckF0KDIpID09PSAnWCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9CaXQgcmVxLmFkZHJlc3Nlcy5cbiAgICAgICAgICAgICAgICAgICAgbnVtU3RyaW5nID0gcmVxLmFkZHIuc3Vic3RyKDMpO1xuICAgICAgICAgICAgICAgICAgICBteGFkZHIgPSBudW1TdHJpbmcuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSBwYXJzZUludChteGFkZHJbMF0sIDEwKSAqIDggKyBwYXJzZUludChteGFkZHJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL0J5dGUgYWRkcmVzc2VzLlxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IHBhcnNlSW50KHJlcS5hZGRyLnN1YnN0cigzKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAvL0FkZHJlc3Mgb2Zmc2V0IGlzIHVzZWQgaWYgb25seSBvbmUgaXRlbSBvZiBhbiBhcnJheVxuICAgICAgICAgICAgICAgICAgICAvL3Nob3VsZCBiZSBzZW50LlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5hZGRyT2Zmc2V0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gcmVxLmFkZHJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFdyb25nIGFkZHJlc3MgZGVmaW5pdGlvbiwgc2hvdWxkIGJlIGEgc3RyaW5nIGFuZCBzdGFydCB3aXRoIFwiJVwiIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcS51c2VIYW5kbGUgPT09IHRydWUgfHwgdGhpcy5zZXJ2aWNlLnVzZUhhbmRsZXMgPT09IHRydWUgJiYgcmVxLnVzZUhhbmRsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgaGFuZGxlIGZvciB0aGlzIHJlcXVlc3RcbiAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZUNhY2hlUmVhZHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvL0dldCBoYW5kbGUgY29kZVxuICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gdGhpcy5oYW5kbGVDYWNoZVtyZXEuZnVsbFN5bWJvbE5hbWVdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKGluZGV4T2Zmc2V0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSBoYW5kbGUgZm9yIHRoaXMgc3ltYm9sIG5hbWU6ICcgKyByZXEuZnVsbFN5bWJvbE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSBoYW5kbGUgZm9yIHRoaXMgcmVxdWVzdC4gSGFuZGxlIGNhY2hlIGlzIG5vdCByZWFkeS4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXEuc3ltYm9sTmFtZSkge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSBJbmRleE9mZnNldCBieSBuYW1lLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuc3ltYm9sTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvL0dldCB0aGUgb2Zmc2V0IGZyb20gdGhlIHN5bWJvbCB0YWJsZVxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IHRoaXMuc3ltVGFibGVbcmVxLnN5bWJvbE5hbWVdLmluZGV4T2Zmc2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLnN5bWJvbE5hbWVBcnJJZHggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSB0aGlzLnN5bVRhYmxlW3JlcS5zeW1ib2xOYW1lXS5pdGVtU2l6ZSAqIChyZXEuc3ltYm9sTmFtZUFycklkeCAtIHRoaXMuc3ltVGFibGVbcmVxLnN5bWJvbE5hbWVdLmFyclN0YXJ0SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vQWRkcmVzcyBvZmZzZXQgaXMgdXNlZCBpZiBvbmx5IG9uZSBpdGVtIG9mIGFuIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIC8vc2hvdWxkIGJlIHNlbnQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLmFkZHJPZmZzZXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSByZXEuYWRkck9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL0FkZCBhIG1hbnVhbGx5IGRlZmluZWQgYml0IG9mZnNldC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEub2ZmcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ICs9IHBhcnNlSW50KHJlcS5vZmZzLCAxMCkgLyA4O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXEub2ZmcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ICs9IHJlcS5vZmZzIC8gODtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL0dldCB0aGUgYml0IG9mZnNldCBpZiBhIHN1Yml0ZW0gaXMgZ2l2ZW4uXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXEuZGF0YVR5cGVOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtQXJyYXkgPSByZXEuZGF0YVR5cGVOYW1lcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlID0gdGhpcy5zeW1UYWJsZVtyZXEuc3ltYm9sTmFtZV0uZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0dvIHRocm91Z2ggdGhlIGFycmF5IHdpdGggdGhlIHN1Yml0ZW1zIGFuZCBhZGQgdGhlIG9mZnNldHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJpdGVtID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1tpdGVtQXJyYXlbaV1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ICs9IHN1Yml0ZW0uYml0T2Zmc2V0IC8gODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgb2Zmc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLmRhdGFUeXBlQXJySWR4W2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSBzdWJpdGVtLml0ZW1TaXplICogKHJlcS5kYXRhVHlwZUFycklkeFtpXSAtIHN1Yml0ZW0uYXJyU3RhcnRJZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0dldCB0aGUgZGF0YSB0eXBlIGZvciB0aGUgbmV4dCByb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1tpdGVtQXJyYXlbaV1dLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENhblxcJ3QgZ2V0IHRoZSBJbmRleE9mZnNldCBmb3IgdGhpcyByZXF1ZXN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQbGVhc2UgY2hlY2sgdGhlIHZhcmlhYmxlIGRlZmluaXRpb24gKG5hbWUvb2Zmcy9zdWJpdGVtKS4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhcmlibGUgbmFtZSBzaG91bGQgYmUgYSBzdHJpbmchJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBOZWl0aGVyIGEgbmFtZSBub3IgYW4gYWRkcmVzcyBmb3IgdGhlIHZhcmlhYmxlL3JlcXVlc3QgZGVmaW5lZCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4oaW5kZXhPZmZzZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBJbmRleE9mZnNldCBpcyBub3QgYSBudW1iZXIsIGNoZWNrIGFkZHJlc3Mgb3IgbmFtZSBkZWZpbml0aW9uIG9mIHRoZSB2YXJpYWJsZS9yZXF1ZXN0LicpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ0luZGV4T2Zmc2V0OiAnICsgaW5kZXhPZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleE9mZnNldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gcGFyc2VzIHRoZSBQTEMgdmFyaWFibGUgbmFtZSwgbG9va3MgaW4gdGhlIHN5bWJvbCBhbmQgZGF0YSB0eXBlIHRhYmxlIGFuZCBcbiAgICAgKiByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBuZWNlc3NhcnkgaW5mb3JtYXRpb24uXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gICAgICAgICAgQW4gb2JqZWN0IHdpdGggYXQgbGVhc3QgdGhlIGFkZHJlc3Mgb3IgdGhlIG5hbWUgZm9yIHRoZSByZXF1ZXN0LlxuICAgICAqIEByZXR1cm4ge09iamVjY3R9IGl0ZW1JbmZvICAgIEFuIG9iamVjdCB3aXRoIHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgaXRlbS5cbiAgICAgKiBcbiAgICAgKi9cbiAgICBnZXRJdGVtSW5mb3JtYXRpb24oaXRlbSkge1xuICAgICAgICB2YXIgaXRlbUluZm8gPSB7fSBhcyBhbnksIGFyclBsY1Zhck5hbWUsIHNwbGl0VHlwZTtcblxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0ubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0ubmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgYXJyUGxjVmFyTmFtZSA9IGl0ZW0ubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9SZXR1cm4gaWYgbm8gc3ltYm9sIG5hbWUgaXMgZ2l2ZW5cbiAgICAgICAgICAgIHJldHVybiBpdGVtSW5mbztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2V0IHRoZSBzeW1ib2wgbmFtZS5cbiAgICAgICAgaXRlbUluZm8uZnVsbFN5bWJvbE5hbWUgPSBpdGVtLm5hbWU7XG4gICAgICAgIGlmIChhcnJQbGNWYXJOYW1lWzBdID09PSAnJykge1xuICAgICAgICAgICAgLy9HbG9iYWwgdmFyaWFibGVcbiAgICAgICAgICAgIGl0ZW1JbmZvLnN5bWJvbE5hbWUgPSAnLicgKyBhcnJQbGNWYXJOYW1lWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9WYXJpYWJsZSBvZiBhbiBpbnN0YW5jZVxuICAgICAgICAgICAgaXRlbUluZm8uc3ltYm9sTmFtZSA9IGFyclBsY1Zhck5hbWVbMF0gKyAnLicgKyBhcnJQbGNWYXJOYW1lWzFdO1xuICAgICAgICB9XG4gICAgICAgIC8vQ3V0IGFuIGFycmF5IGluZGV4XG4gICAgICAgIGlmIChpdGVtSW5mby5zeW1ib2xOYW1lLmNoYXJBdChpdGVtSW5mby5zeW1ib2xOYW1lLmxlbmd0aCAtIDEpID09PSAnXScpIHtcbiAgICAgICAgICAgIC8vQ3V0IHRoZSBhcnJheSBpbmRleCBhbmQgc3RvcmUgaXRcbiAgICAgICAgICAgIHNwbGl0VHlwZSA9IGl0ZW1JbmZvLnN5bWJvbE5hbWUuc3Vic3RyaW5nKDAsIGl0ZW1JbmZvLnN5bWJvbE5hbWUubGVuZ3RoIC0gMSkuc3BsaXQoJ1snKTtcbiAgICAgICAgICAgIGl0ZW1JbmZvLnN5bWJvbE5hbWUgPSBzcGxpdFR5cGVbMF07XG4gICAgICAgICAgICBpdGVtSW5mby5zeW1ib2xOYW1lQXJySWR4ID0gcGFyc2VJbnQoc3BsaXRUeXBlWzFdLCAxMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vTGVhdmUgdGhlIHJlc3QgYXMgYW4gYXJyYXkgYW5kIGFkZCBpdCB0byB0aGUgaXRlbUluZm9cbiAgICAgICAgaXRlbUluZm8uZGF0YVR5cGVOYW1lcyA9IGFyclBsY1Zhck5hbWUuc2xpY2UoMik7XG5cbiAgICAgICAgdmFyIGFyciA9IFtdLCB0eXBlQXJyYXksIGRhdGFUeXBlLCBpO1xuXG4gICAgICAgIC8vR2V0IGluZm9ybWF0aW9uIGZyb20gdGhlIHRhYmxlc1xuICAgICAgICBpZiAodGhpcy5zeW1UYWJsZVJlYWR5ICYmIHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ICYmIGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSBzdWJpdGVtIHR5cGUgZnJvbSB0aGUgc3ltYm9sIHRhYmxlICYmIGRhdGEgdHlwZSB0YWJsZVxuICAgICAgICAgICAgdHlwZUFycmF5ID0gaXRlbUluZm8uZGF0YVR5cGVOYW1lcztcbiAgICAgICAgICAgIGRhdGFUeXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtSW5mby5zeW1ib2xOYW1lXS5kYXRhVHlwZTtcbiAgICAgICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4ID0gW107XG4gICAgICAgICAgICAvL0dvIGZvciB0aGUgbGFzdCBzdWJpdGVtXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdGhlIHN1Yml0ZW0gaXMgYW4gYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAodHlwZUFycmF5W2ldLmNoYXJBdCh0eXBlQXJyYXlbaV0ubGVuZ3RoIC0gMSkgPT09ICddJykge1xuICAgICAgICAgICAgICAgICAgICAvL0N1dCB0aGUgYXJyYXkgaW5kZXggYW5kIHN0b3JlIGl0IGluIGFuIGV4dHJhIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHNwbGl0VHlwZSA9IHR5cGVBcnJheVtpXS5zdWJzdHJpbmcoMCwgdHlwZUFycmF5W2ldLmxlbmd0aCAtIDEpLnNwbGl0KCdbJyk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVBcnJheVtpXSA9IHNwbGl0VHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZGF0YVR5cGVBcnJJZHhbaV0gPSBwYXJzZUludChzcGxpdFR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLnBvaW50ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUExDIHZhcmlhYmxlICcgKyBbdHlwZUFycmF5W2ldXSArICcgaXMgYSBwb2ludGVyISBDYW5cXCd0IGdldCB0aGUgdmFyaWFibGUgdmFsdWUuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9HZXQgdGhlIHR5cGUgb2YgdGhlIG5leHQgc3ViaXRlbVxuICAgICAgICAgICAgICAgIGlmIChpID09PSB0eXBlQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgaSsrO1xuXG4gICAgICAgICAgICB9IHdoaWxlIChpIDwgdHlwZUFycmF5Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vR2V0IHRoZSB0eXBlIG9mIHRoZSBzdWJpdGVtXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgaXRlbUluZm8udHlwZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS50eXBlO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5TGVuZ3RoID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmFycmF5TGVuZ3RoO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uYXJyYXlEYXRhVHlwZTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5pdGVtU2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5pdGVtU2l6ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby5zaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5zaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmJpdE9mZnNldCA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5iaXRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8ub2ZmcyA9IGl0ZW0ub2ZmcztcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby50eXBlID09PSAnU1RSSU5HJyB8fCBpdGVtSW5mby5hcnJheURhdGFUeXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zdHJpbmdMZW5ndGggPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7IC8vY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmZvcm1hdDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRlY1BsYWNlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5kZWNQbGFjZXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5kcDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uZGF0YVR5cGVBcnJJZHhbaV0gIT09IHVuZGVmaW5lZCAmJiBpdGVtSW5mby50eXBlID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnR5cGUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uYXJyYXlEYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5pdGVtU2l6ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBIHByb2JsZW0gb2NjdXJlZCB3aGlsZSByZWFkaW5nIGEgZGF0YSB0eXBlIGZyb20gdGhlIGRhdGEgdHlwZSB0YWJsZSEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3ltVGFibGVSZWFkeSkge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSB0eXBlIGZyb20gdGhlIHN5bWJvbCB0YWJsZVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnR5cGUgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0udHlwZTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uYXJyYXlMZW5ndGggPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uYXJyYXlMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uYXJyYXlEYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZGF0YVR5cGUgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLml0ZW1TaXplID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLml0ZW1TaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby5zaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnNpemUgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmJpdE9mZnNldCA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5iaXRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLm9mZnMgPSBpdGVtLm9mZnM7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLnR5cGUgPT09ICdTVFJJTkcnIHx8IGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zdHJpbmdMZW5ndGggPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoOyAvL2NvbXBhdGliaWxpdHlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5mb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmZvcm1hdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kZWNQbGFjZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmRlY1BsYWNlcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZHA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uc3ltYm9sTmFtZUFycklkeCAhPT0gdW5kZWZpbmVkICYmIGl0ZW1JbmZvLnR5cGUgPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnR5cGUgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uYXJyYXlEYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnNpemUgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uaXRlbVNpemU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQSBwcm9ibGVtIG9jY3VyZWQgd2hpbGUgcmVhZGluZyBhIGRhdGEgdHlwZSBmcm9tIHRoZSBzeW1ib2wgdGFibGUhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS50eXBlICE9ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5laXRoZXIgYW4gZW50cnkgZm9yIHRoaXMgc3ltYm9sIGluIHRoZSBzeW1ib2wgdGFibGUgbm9yIHRoZSB0eXBlIGRlZmluZWQgYnkgdXNlciEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvL092ZXJyaWRlIHR5cGUgaWYgZGVmaW5lZCBieSB1c2VyXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbS50eXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvL1R5cGUgaXMgZGVmaW5lZCBieSB1c2VyLCB0cnkgdG8gc3BsaXQgaXRcbiAgICAgICAgICAgIGFyciA9IGl0ZW0udHlwZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgLy9Kb2luIHRoZSBmb3JtYXR0aW5nIHN0cmluZyBpZiB0aGVyZSB3ZXJlIHBvaW50cyBpbiBpdC5cbiAgICAgICAgICAgICAgICBhcnJbMV0gPSBhcnIuc2xpY2UoMSkuam9pbignLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9TZXQgdGhlIHVzZXIgZGVmaW5lZCB0eXBlIGlmIGl0J3Mgbm90IGFuIGFycmF5IG9yIHN0cnVjdHVyZVxuICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLnR5cGUgIT09ICdBUlJBWScgJiYgaXRlbUluZm8udHlwZSAhPT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8udHlwZSA9IGFyclswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vVHlwZSBkZXBlbmRpbmcgY29kZVxuICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLnR5cGUgPT09ICdTVFJJTkcnICYmIGFyclsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYXJyWzFdID0gcGFyc2VJbnQoYXJyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihhcnJbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGFyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID0gaXRlbUluZm8uZm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gaXRlbUluZm8uZm9ybWF0Kys7IC8vVGVybWluYXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSB0aGlzLnBsY1R5cGVMZW4uU1RSSU5HO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IExlbmd0aCBvZiBzdHJpbmcgdmFyaWFibGUgbm90IGRlZmluZWQ6ICcgKyBpdGVtLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IEEgbGVuZ3RoIG9mIDgwIGNoYXJhY3RlcnMgKFR3aW5DQVQgZGVmYXVsdCkgd2lsbCBiZSB1c2VkLicpO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1JbmZvLnR5cGUgPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAvL1F1aWNrIGFuZCBkaXJ0eVxuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPSBhcnJbMF07XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gYXJyWzFdO1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgaXRlbUluZm8uYXJyYXlMZW5ndGggPSBkYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmFycmF5TGVuZ3RoO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPSBkYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZGF0YVR5cGUgPSBkYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLml0ZW1TaXplID0gZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5pdGVtU2l6ZTtcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtSW5mby50eXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIE1heWJlIGluIGEgZnV0dXJlIHZlcnNpb24uXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gYXJyWzFdO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnNpemUgPSB0aGlzLnBsY1R5cGVMZW5baXRlbUluZm8udHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL092ZXJyaWRlIGZvcm1hdCBpZiBleHRyYSBpbmZvcm1hdGlvbiBpcyBnaXZlblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmZvcm1hdDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZGVjUGxhY2VzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZGVjUGxhY2VzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmRwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIHRoaXMubG9nKCdpdGVtJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdpdGVtSW5mbycpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbUluZm8pO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbUluZm8udHlwZSAhPSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgdHlwZSBvZiB0aGUgaXRlbSEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgdGhpcy5sb2coJ2l0ZW1JbmZvJyk7XG4gICAgICAgIHRoaXMubG9nKGl0ZW1JbmZvKTtcbiAgICAgICAgKi9cblxuICAgICAgICByZXR1cm4gaXRlbUluZm87XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHhtbEh0dHBSZXEgIEEgWE1MSHR0cFJlcXVlc3QuXG4gICAgICovXG4gICAgY3JlYXRlWE1MSHR0cFJlcSgpIHtcbiAgICAgICAgdmFyIHhtbEh0dHBSZXE7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCkge1xuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cbiAgICAgICAgICAgIC8vTW96aWxsYSwgT3BlcmEsIFNhZmFyaSBhbmQgSW50ZXJuZXQgRXhwbG9yZXIgKD4gdjcpXG4gICAgICAgICAgICB4bWxIdHRwUmVxID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9JbnRlcm5ldCBFeHBsb3JlciA2IGFuZCBvbGRlclxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB4bWxIdHRwUmVxID0gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHhtbEh0dHBSZXEgPSBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgeG1sSHR0cFJlcSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEZhaWxlZCBDcmVhdGluZyBYTUxIdHRwUmVxdWVzdC1PYmplY3QhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4bWxIdHRwUmVxO1xuICAgIH1cblxuXG4gICAgYWRzUmVxU2VuZChhZHNSZXEpIHtcblxuICAgICAgICB2YXIgc29hcFJlcTtcblxuICAgICAgICAvL0NhbmNlbCB0aGUgcmVxdWVzdCwgaWYgdGhlIGxhc3Qgb24gd2l0aCB0aGUgc2FtZSBJRCBpcyBub3QgZmluaXNoZWQuXG4gICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLmlkID09PSAnbnVtYmVyJyAmJiB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogUmVxdWVzdCBkcm9wcGVkIChsYXN0IHJlcXVlc3Qgd2l0aCBJRCAnICsgYWRzUmVxLnJlcURlc2NyLmlkICsgJyBub3QgZmluaXNoZWQhKScpO1xuICAgICAgICAgICAgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0rKztcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA8PSB0aGlzLm1heERyb3BSZXEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0F1dG9tYXRpYyBhY2tub3dsZWRpbmcgYWZ0ZXIgYSBjb3VudCBvZiAnbWF4RHJvcFJlcScgdG9cbiAgICAgICAgICAgIC8vcHJldmVudCBzdHVja2luZy5cbiAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdID0gMDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9DcmVhdGUgdGhlIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cbiAgICAgICAgdGhpcy54bWxIdHRwUmVxID0gdGhpcy5jcmVhdGVYTUxIdHRwUmVxKCk7XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgU09BUCByZXF1ZXN0LlxuICAgICAgICBzb2FwUmVxID0gJzw/eG1sIHZlcnNpb249XFwnMS4wXFwnIGVuY29kaW5nPVxcJ3V0Zi04XFwnPz4nO1xuICAgICAgICBzb2FwUmVxICs9ICc8c29hcDpFbnZlbG9wZSB4bWxuczp4c2k9XFwnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2VcXCcgJztcbiAgICAgICAgc29hcFJlcSArPSAneG1sbnM6eHNkPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hXFwnICc7XG4gICAgICAgIHNvYXBSZXEgKz0gJ3htbG5zOnNvYXA9XFwnaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS9cXCc+JztcbiAgICAgICAgc29hcFJlcSArPSAnPHNvYXA6Qm9keT48cTE6JztcbiAgICAgICAgc29hcFJlcSArPSBhZHNSZXEubWV0aG9kO1xuICAgICAgICBzb2FwUmVxICs9ICcgeG1sbnM6cTE9XFwnaHR0cDovL2JlY2tob2ZmLm9yZy9tZXNzYWdlL1xcJz48bmV0SWQgeHNpOnR5cGU9XFwneHNkOnN0cmluZ1xcJz4nO1xuICAgICAgICBzb2FwUmVxICs9IHRoaXMuc2VydmljZS5hbXNOZXRJZDtcbiAgICAgICAgc29hcFJlcSArPSAnPC9uZXRJZD48blBvcnQgeHNpOnR5cGU9XFwneHNkOmludFxcJz4nO1xuICAgICAgICBzb2FwUmVxICs9IHRoaXMuc2VydmljZS5hbXNQb3J0O1xuICAgICAgICBzb2FwUmVxICs9ICc8L25Qb3J0Pic7XG5cbiAgICAgICAgaWYgKGFkc1JlcS5pbmRleEdyb3VwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxpbmRleEdyb3VwIHhzaTp0eXBlPVxcJ3hzZDp1bnNpZ25lZEludFxcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEuaW5kZXhHcm91cDtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvaW5kZXhHcm91cD4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZHNSZXEuaW5kZXhPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPGluZGV4T2Zmc2V0IHhzaTp0eXBlPVxcJ3hzZDp1bnNpZ25lZEludFxcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEuaW5kZXhPZmZzZXQ7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L2luZGV4T2Zmc2V0Pic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChhZHNSZXEubWV0aG9kID09PSAnUmVhZCcgfHwgYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWRXcml0ZScpICYmIGFkc1JlcS5yZXFEZXNjci5yZWFkTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPGNiUmRMZW4geHNpOnR5cGU9XFwneHNkOmludFxcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEucmVxRGVzY3IucmVhZExlbmd0aDtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvY2JSZExlbj4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZHNSZXEucERhdGEgJiYgYWRzUmVxLnBEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxwRGF0YSB4c2k6dHlwZT1cXCd4c2Q6YmFzZTY0QmluYXJ5XFwnPic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5wRGF0YTtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvcERhdGE+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzUmVxLnB3ckRhdGEgJiYgYWRzUmVxLnB3ckRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPHB3ckRhdGEgeHNpOnR5cGU9XFwneHNkOmJhc2U2NEJpbmFyeVxcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEucHdyRGF0YTtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvcHdyRGF0YT4nO1xuICAgICAgICB9XG4gICAgICAgIHNvYXBSZXEgKz0gJzwvcTE6JztcbiAgICAgICAgc29hcFJlcSArPSBhZHNSZXEubWV0aG9kO1xuICAgICAgICBzb2FwUmVxICs9ICc+PC9zb2FwOkJvZHk+PC9zb2FwOkVudmVsb3BlPic7XG5cbiAgICAgICAgLy9TZW5kIHRoZSBBSkFYIHJlcXVlc3QuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy54bWxIdHRwUmVxID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEub3BlbignUE9TVCcsIHRoaXMuc2VydmljZS5zZXJ2aWNlVXJsLCB0cnVlLCB0aGlzLnNlcnZpY2Uuc2VydmljZVVzZXIsIHRoaXMuc2VydmljZS5zZXJ2aWNlUGFzc3dvcmQpO1xuXG4gICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcignU09BUEFjdGlvbicsICdodHRwOi8vYmVja2hvZmYub3JnL2FjdGlvbi9UY0Fkc1N5bmMuJyArIGFkc1JlcS5tZXRob2QpO1xuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbDsgY2hhcnNldD11dGYtOCcpO1xuXG4gICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEudGltZW91dCA9IHRoaXMueG1sSHR0cFJlcVRpbWVvdXQ7XG4gICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEub250aW1lb3V0ID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBYTUxIdHRwUmVxdWVzdCB0aW1lZCBvdXQuIFRpbWVvdXQgJyArIHRoaXMueG1sSHR0cFJlcVRpbWVvdXQgKyAnIG1pbGxpc2Vjb25kcy4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL29uIHRpbWVvdXQgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm90KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54bWxIdHRwUmVxLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueG1sSHR0cFJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXF1ZXN0IE9LXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlUmVzcG9uc2UoYWRzUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVxdWVzdCBmYWlsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFhNTEh0dHBSZXF1ZXN0IHJldHVybnMgYW4gZXJyb3IuIFN0YXR1cyBjb2RlIDogJyArIHRoaXMueG1sSHR0cFJlcS5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL29uIGVycm9yIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm9lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNlbmQoc29hcFJlcSk7XG5cbiAgICAgICAgICAgIC8vUmVxdWVzdCB3aXRoIGluZGV4ICdpZCcgc2VudC5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLmlkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGFkc1JlcVNlbmRBc3luYyhhZHNSZXEpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgc29hcFJlcTtcblxuICAgICAgICAgICAgLy9DYW5jZWwgdGhlIHJlcXVlc3QsIGlmIHRoZSBsYXN0IG9uIHdpdGggdGhlIHNhbWUgSUQgaXMgbm90IGZpbmlzaGVkLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3IuaWQgPT09ICdudW1iZXInICYmIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogUmVxdWVzdCBkcm9wcGVkIChsYXN0IHJlcXVlc3Qgd2l0aCBJRCAnICsgYWRzUmVxLnJlcURlc2NyLmlkICsgJyBub3QgZmluaXNoZWQhKScpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdKys7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdIDw9IHRoaXMubWF4RHJvcFJlcSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vQXV0b21hdGljIGFja25vd2xlZGluZyBhZnRlciBhIGNvdW50IG9mICdtYXhEcm9wUmVxJyB0b1xuICAgICAgICAgICAgICAgIC8vcHJldmVudCBzdHVja2luZy5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA9IDA7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcSA9IHRoaXMuY3JlYXRlWE1MSHR0cFJlcSgpO1xuXG4gICAgICAgICAgICAvL0dlbmVyYXRlIHRoZSBTT0FQIHJlcXVlc3QuXG4gICAgICAgICAgICBzb2FwUmVxID0gJzw/eG1sIHZlcnNpb249XFwnMS4wXFwnIGVuY29kaW5nPVxcJ3V0Zi04XFwnPz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPHNvYXA6RW52ZWxvcGUgeG1sbnM6eHNpPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlXFwnICc7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICd4bWxuczp4c2Q9XFwnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWFcXCcgJztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJ3htbG5zOnNvYXA9XFwnaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS9cXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxzb2FwOkJvZHk+PHExOic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5tZXRob2Q7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICcgeG1sbnM6cTE9XFwnaHR0cDovL2JlY2tob2ZmLm9yZy9tZXNzYWdlL1xcJz48bmV0SWQgeHNpOnR5cGU9XFwneHNkOnN0cmluZ1xcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSB0aGlzLnNlcnZpY2UuYW1zTmV0SWQ7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L25ldElkPjxuUG9ydCB4c2k6dHlwZT1cXCd4c2Q6aW50XFwnPic7XG4gICAgICAgICAgICBzb2FwUmVxICs9IHRoaXMuc2VydmljZS5hbXNQb3J0O1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9uUG9ydD4nO1xuXG4gICAgICAgICAgICBpZiAoYWRzUmVxLmluZGV4R3JvdXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxpbmRleEdyb3VwIHhzaTp0eXBlPVxcJ3hzZDp1bnNpZ25lZEludFxcJz4nO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLmluZGV4R3JvdXA7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPC9pbmRleEdyb3VwPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWRzUmVxLmluZGV4T2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8aW5kZXhPZmZzZXQgeHNpOnR5cGU9XFwneHNkOnVuc2lnbmVkSW50XFwnPic7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEuaW5kZXhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPC9pbmRleE9mZnNldD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChhZHNSZXEubWV0aG9kID09PSAnUmVhZCcgfHwgYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWRXcml0ZScpICYmIGFkc1JlcS5yZXFEZXNjci5yZWFkTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxjYlJkTGVuIHhzaTp0eXBlPVxcJ3hzZDppbnRcXCc+JztcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9IGFkc1JlcS5yZXFEZXNjci5yZWFkTGVuZ3RoO1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvY2JSZExlbj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkc1JlcS5wRGF0YSAmJiBhZHNSZXEucERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxwRGF0YSB4c2k6dHlwZT1cXCd4c2Q6YmFzZTY0QmluYXJ5XFwnPic7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEucERhdGE7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSAnPC9wRGF0YT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkc1JlcS5wd3JEYXRhICYmIGFkc1JlcS5wd3JEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8cHdyRGF0YSB4c2k6dHlwZT1cXCd4c2Q6YmFzZTY0QmluYXJ5XFwnPic7XG4gICAgICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEucHdyRGF0YTtcbiAgICAgICAgICAgICAgICBzb2FwUmVxICs9ICc8L3B3ckRhdGE+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzwvcTE6JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLm1ldGhvZDtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJz48L3NvYXA6Qm9keT48L3NvYXA6RW52ZWxvcGU+JztcblxuICAgICAgICAgICAgLy9TZW5kIHRoZSBBSkFYIHJlcXVlc3QuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMueG1sSHR0cFJlcSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5vcGVuKCdQT1NUJywgdGhpcy5zZXJ2aWNlLnNlcnZpY2VVcmwsIHRydWUsIHRoaXMuc2VydmljZS5zZXJ2aWNlVXNlciwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VQYXNzd29yZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcignU09BUEFjdGlvbicsICdodHRwOi8vYmVja2hvZmYub3JnL2FjdGlvbi9UY0Fkc1N5bmMuJyArIGFkc1JlcS5tZXRob2QpO1xuICAgICAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWw7IGNoYXJzZXQ9dXRmLTgnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS50aW1lb3V0ID0gdGhpcy54bWxIdHRwUmVxVGltZW91dDtcbiAgICAgICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEub250aW1lb3V0ID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogWE1MSHR0cFJlcXVlc3QgdGltZWQgb3V0LiBUaW1lb3V0ICcgKyB0aGlzLnhtbEh0dHBSZXFUaW1lb3V0ICsgJyBtaWxsaXNlY29uZHMuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9vbiB0aW1lb3V0IGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueG1sSHR0cFJlcS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54bWxIdHRwUmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXF1ZXN0IE9LICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnBhcnNlUmVzcG9uc2UoYWRzUmVxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXF1ZXN0IGZhaWxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFhNTEh0dHBSZXF1ZXN0IHJldHVybnMgYW4gZXJyb3IuIFN0YXR1cyBjb2RlIDogJyArIHRoaXMueG1sSHR0cFJlcS5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vb24gZXJyb3IgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm9lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnVEFNRSBsaWJyYXJ5IGVycm9yOiBYTUxIdHRwUmVxdWVzdCByZXR1cm5zIGFuIGVycm9yLiBTdGF0dXMgY29kZSA6ICcgKyB0aGlzLnhtbEh0dHBSZXEuc3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnhtbEh0dHBSZXEuc2VuZChzb2FwUmVxKTtcblxuICAgICAgICAgICAgICAgIC8vUmVxdWVzdCB3aXRoIGluZGV4ICdpZCcgc2VudC5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5pZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIG9iamVjdHMgZm9yIFNPQVAgYW5kIFhNTEh0dHBSZXF1ZXN0IGFuZCBzZW5kIHRoZSByZXF1ZXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGFyZ3VtZW50cyBvZiB0aGUgQURTIHJlcXVlc3QuXG4gICAgICovXG4gICAgY3JlYXRlUmVxdWVzdChhZHNSZXEpIHtcblxuICAgICAgICBpZiAoYWRzUmVxLnJlcURlc2NyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjciA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKGFkc1JlcS5yZXFEZXNjci5kZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy5sb2coYWRzUmVxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkc1JlcS5zZW5kID0gKCkgPT4gdGhpcy5hZHNSZXFTZW5kKGFkc1JlcSlcbiAgICAgICAgcmV0dXJuIGFkc1JlcTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGZvciBjaGVja2luZyB0aGUgaW5wdXQgdmFsdWVzIHdoZW4gd3JpdGluZyBudW1lcmljIFBMQyB2YXJpYWJsZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4XG4gICAgICovXG4gICAgY2hlY2tWYWx1ZShpdGVtOiB7IHZhbDogc3RyaW5nIH0sIHR5cGU6IHN0cmluZywgbWluOiBzdHJpbmcgfCBudW1iZXIsIG1heDogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHZhciB2YWw7XG5cbiAgICAgICAgLy9UZXN0IGlmIHZhbHVlIGlzIHZhbGlkLlxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdSRUFMJyB8fCB0eXBlID09PSAnTFJFQUwnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gcGFyc2VGbG9hdChpdGVtLnZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbCA9IHBhcnNlSW50KGl0ZW0udmFsLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsID0gaXRlbS52YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBXcm9uZyB2YXJpYWJsZSB0eXBlIGZvciBhIG51bWVyaWMgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhcmlhYmxlIHR5cGUgc2hvdWxkIGJlIG51bWJlciBvciBzdHJpbmcsIGJ1dCBpcyAnICsgdHlwZW9mIGl0ZW0udmFsKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTih2YWwpKSB7XG4gICAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVmFsdWUgb2YgYSBudW1lcmljIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgaXMgbm90IGEgbnVtYmVyLicpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoZWNrIGJvdW5kc1xuICAgICAgICBpZiAodGhpcy51c2VDaGVja0JvdW5kcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdMUkVBTCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMaW1pdCBmb3IgTFJFQUwgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdVcHBlciBsaW1pdDogJyArIE51bWJlci5NQVhfVkFMVUUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnTG93ZXIgbGltaXQ6ICcgKyBOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnUkVBTCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsIDwgMS4xNzU0OTVlLTM4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IExvd2VyIGxpbWl0IGZvciBwb3NpdGl2ZSBSRUFMIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAxLjE3NTQ5NWUtMzgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IDEuMTc1NDk1ZS0zODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiAzLjQwMjgyM2UrMzgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVXBwZXIgbGltaXQgZm9yIHBvc2l0aXZlIFJFQUwgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGltaXQ6IDMuNDAyODIzZSszOCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gMy40MDI4MjNlKzM4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPiAtMS4xNzU0OTVlLTM4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFVwcGVyIGxpbWl0IGZvciBuZWdhdGl2ZSBSRUFMIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAtMS4xNzU0OTVlLTM4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSAtMS4xNzU0OTVlLTM4O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA8IC0zLjQwMjgyM2UrMzgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogTG93ZXIgbGltaXQgZm9yIG5lZ2F0aXZlIFJFQUwgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGltaXQ6IC0zLjQwMjgyM2UrMzgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IC0zLjQwMjgyM2UrMzg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMb3dlciBsaW1pdCBmb3IgbnVtZXJpYyB2YWx1ZSBleGNlZWRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3R5cGU6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAnICsgbWluKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IG1pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVXBwZXIgbGltaXQgZm9yIG51bWVyaWMgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd0eXBlOiAnICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaW1pdDogJyArIG1heCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBtYXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0eXBlIGFuZCBmb3JtYXQgYW5kIHJldHVybiBpdCBpbiBhbiBhcnJheS4gQ3JlYXRlIGFuXG4gICAgICogaXRlbS50eXBlIGVudHJ5IGlmIGl0IGRvZXNuJ3QgZXhpc3QuIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtICAgICBBbiBpdGVtIG9mIGEgdmFyaWFibGUgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYXJyICAgICAgQW4gYXJyYXkgd2l0aCB0eXBlIGFuZCBmb3JtYXQuIFxuICAgICAqL1xuICAgIGdldFR5cGVBbmRGb3JtYXQoaXRlbSkge1xuICAgICAgICB2YXIgYXJyID0gW10sIHR5cGVBcnJheSwgZGF0YVR5cGUsIGk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvL1R5cGUgaXMgZGVmaW5lZFxuICAgICAgICAgICAgYXJyID0gaXRlbS50eXBlLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAvL0pvaW4gdGhlIGZvcm1hdHRpbmcgc3RyaW5nIGlmIHRoZXJlIHdlcmUgcG9pbnRzIGluIGl0LlxuICAgICAgICAgICAgICAgIGFyclsxXSA9IGFyci5zbGljZSgxKS5qb2luKCcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSB0eXBlIG9mIHRoZSBpdGVtIChmdW5jdGlvbiBnZXRUeXBlQW5kRm9ybWF0KCkpIScpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBzdHJ1Y3R1cmUgZGVmaW5pdGlvbiBiYXNlZCBvbiB0aGUgaW5mb3JtYXRpb24gaW4gdGhlIGRhdGEgdGFibGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBzdHJ1Y3RuYW1lICBUaGUgbmFtZSBvZiB0aGUgc3RydWN0dXJlIGluIHRoZSBkYXRhIHRhYmxlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gc3RydWN0ICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGl0ZW1zIG9mIHRoZSBzdHJ1Y3R1cmUuIFxuICAgICAqL1xuICAgIGNyZWF0ZVN0cnVjdERlZihzdHJ1Y3RuYW1lKSB7XG4gICAgICAgIHZhciBzdHJ1Y3QgPSB7fSwgc3ViaXRlbSwgc3ViaXRlbXM7XG5cbiAgICAgICAgc3ViaXRlbXMgPSB0aGlzLmRhdGFUeXBlVGFibGVbc3RydWN0bmFtZV0uc3ViSXRlbXM7XG5cbiAgICAgICAgZm9yIChzdWJpdGVtIGluIHN1Yml0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoc3ViaXRlbXNbc3ViaXRlbV0udHlwZSA9PT0gXCJVU0VSXCIpIHtcbiAgICAgICAgICAgICAgICAvL0NyZWF0aW5nIGEgbmVzdGVkIHN0cnVjdHVlIGRlZmluaXRpb24gd29ya3MsIGJ1dCBwYXJzaW5nIGRvZXNuJ3RcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBdXRvbWF0aWMgY3JlYXRpbmcgb2YgbmVzdGVkIHN0cnVjdHVyZXMgaXMgbm90IHN1cHBvcnRlZCAoeWV0KSEnKTtcbiAgICAgICAgICAgICAgICBzdHJ1Y3Rbc3ViaXRlbV0gPSB0aGlzLmNyZWF0ZVN0cnVjdERlZihzdWJpdGVtc1tzdWJpdGVtXS5kYXRhVHlwZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdWJpdGVtcy5oYXNPd25Qcm9wZXJ0eShzdWJpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBzdHJ1Y3Rbc3ViaXRlbV0gPSBzdWJpdGVtc1tzdWJpdGVtXS5mdWxsVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cnVjdDtcbiAgICB9XG5cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuY29kZXIgRnVuY3Rpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogQ29udmVyc2lvbiBvZiBBU0NJSSgwLTksIGEtZiwgQS1GKSBjaGFyY29kZXMgdG8gbnVtYmVycyAwLTE1XG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGNoYXJjb2RlXG4gICAgICovXG4gICAgY2hhcmNvZGVUb0R1YWwoY2hhcmNvZGUpIHtcbiAgICAgICAgaWYgKChjaGFyY29kZSA+PSAweDYxKSAmJiAoY2hhcmNvZGUgPD0gMHg2NikpIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmNvZGUgLSAweDU3KTsgIC8vYS1mXG4gICAgICAgIH1cbiAgICAgICAgaWYgKChjaGFyY29kZSA+PSAweDQxKSAmJiAoY2hhcmNvZGUgPD0gMHg0NikpIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmNvZGUgLSAweDM3KTsgIC8vQS1GXG4gICAgICAgIH1cbiAgICAgICAgaWYgKChjaGFyY29kZSA+PSAweDMwKSAmJiAoY2hhcmNvZGUgPD0gMHgzOSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmNvZGUgLSAweDMwKTsgIC8vMC05XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIG51bWJlciBpbnRvIGFuIGFycmF5IG9mIGJ5dGVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YXJsZW5cbiAgICAgKi9cbiAgICBudW1Ub0J5dGVBcnIodmFsdWUsIHZhcmxlbikge1xuICAgICAgICB2YXIgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIGhleCA9IHZhbHVlLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgd2hpbGUgKGhleC5sZW5ndGggPCB2YXJsZW4gKiAyKSB7XG4gICAgICAgICAgICBoZXggPSAnMCcgKyBoZXg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmFybGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ5dGVzWyh2YXJsZW4gLSAxKSAtIGldID1cbiAgICAgICAgICAgICAgICAoKHRoaXMuY2hhcmNvZGVUb0R1YWwoaGV4LmNoYXJDb2RlQXQoaSAqIDIpKSAqIDE2KSArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmNvZGVUb0R1YWwoaGV4LmNoYXJDb2RlQXQoKGkgKiAyKSArIDEpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBKYXZhU2NyaXB0IGZsb2F0aW5nIHBvaW50IG51bWJlciB0byBhIFBMQyBSRUFMIHZhbHVlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1cbiAgICAgKi9cbiAgICBmbG9hdFRvUmVhbChudW0pIHtcblxuICAgICAgICB2YXIgbWFudCA9IDAsXG4gICAgICAgICAgICByZWFsID0gMCxcbiAgICAgICAgICAgIGJhcywgYWJzLCB0bXAsIGV4cCwgaTtcblxuICAgICAgICBhYnMgPSBNYXRoLmFicyhudW0pO1xuXG4gICAgICAgIGlmIChudW0gIT09IDApIHtcbiAgICAgICAgICAgIC8vRmluZCBleHBvbmVudCBhbmQgYmFzZS5cbiAgICAgICAgICAgIGZvciAoaSA9IDEyODsgaSA+IC0xMjc7IGktLSkge1xuICAgICAgICAgICAgICAgIHRtcCA9IGFicyAvIE1hdGgucG93KDIsIGkpO1xuICAgICAgICAgICAgICAgIGlmICh0bXAgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhwID0gaTtcbiAgICAgICAgICAgICAgICBiYXMgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHAgKz0gMTI3O1xuICAgICAgICAgICAgYmFzID0gYmFzLnRvU3RyaW5nKDIpO1xuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIG1hbnRpc3NhLlxuICAgICAgICAgICAgZm9yIChpID0gMjsgaSA8IDI1OyBpKyspIHtcbiAgICAgICAgICAgICAgICBtYW50IDw8PSAxO1xuICAgICAgICAgICAgICAgIGlmIChiYXMuY2hhckF0KGkpID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFudCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiYXMuY2hhckF0KDI1KSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgbWFudCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIFJFQUwgdmFsdWUuXG4gICAgICAgICAgICByZWFsID0gZXhwOyAvL2V4cG9uZW50XG4gICAgICAgICAgICByZWFsIDw8PSAyMztcbiAgICAgICAgICAgIHJlYWwgKz0gbWFudDsgLy9tYW50aXNzYVxuICAgICAgICAgICAgaWYgKG51bSA8IDApIHtcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBuZWdhdGl2ZSBzaWduLlxuICAgICAgICAgICAgICAgIHJlYWwgKz0gMjE0NzQ4MzY0ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAgICogQ29udmVydCBhIEphdmFTY3JpcHQgZmxvYXRpbmcgcG9pbnQgbnVtYmVyIHRvIGEgUExDIExSRUFMIHZhbHVlLlxuICAgICAgICAgKiBDYXVzZSBpdCdzIGEgNjQgYml0IHZhbHVlLCB3ZSBoYXZlIHRvIHNwbGl0IGl0IGluIHR3byAzMiBiaXQgaW50ZWdlci5cbiAgICAgICAgICogXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1cbiAgICAgICAgICovXG4gICAgZmxvYXRUb0xyZWFsKG51bSkge1xuICAgICAgICB2YXIgbWFudCA9IDAsXG4gICAgICAgICAgICBtYW50MiA9IDAsXG4gICAgICAgICAgICBscmVhbCA9IHtcbiAgICAgICAgICAgICAgICBwYXJ0MTogMCxcbiAgICAgICAgICAgICAgICBwYXJ0MjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFicywgdG1wLCBleHAsIGZpcnN0Yml0LCBiYXMsIGk7XG5cbiAgICAgICAgYWJzID0gTWF0aC5hYnMobnVtKTtcblxuICAgICAgICBpZiAobnVtICE9PSAwKSB7XG4gICAgICAgICAgICAvL0ZpbmQgZXhwb25lbnQgYW5kIGJhc2UuXG4gICAgICAgICAgICBmb3IgKGkgPSAxMDI0OyBpID49IC0xMDIzOyBpLS0pIHtcbiAgICAgICAgICAgICAgICB0bXAgPSBhYnMgLyBNYXRoLnBvdygyLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAodG1wID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV4cCA9IGk7XG4gICAgICAgICAgICAgICAgYmFzID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwICs9IDEwMjM7XG4gICAgICAgICAgICBiYXMgPSBiYXMudG9TdHJpbmcoMik7XG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgbWFudGlzc2EuXG4gICAgICAgICAgICBmb3IgKGkgPSAyOyBpIDwgMjI7IGkrKykge1xuICAgICAgICAgICAgICAgIG1hbnQgPDw9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGJhcy5jaGFyQXQoaSkgPT09ICcxJykge1xuICAgICAgICAgICAgICAgICAgICBtYW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJhcy5jaGFyQXQoaSkgPT09ICcxJykge1xuICAgICAgICAgICAgICAgIGZpcnN0Yml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGZvciAoaTsgaSA8IDU0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBtYW50MiA8PD0gMTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzLmNoYXJBdChpKSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hbnQyICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIExSRUFMIHZhbHVlLlxuICAgICAgICAgICAgbHJlYWwucGFydDEgPSBleHA7IC8vZXhwb25lbnRcbiAgICAgICAgICAgIGxyZWFsLnBhcnQxIDw8PSAyMDtcbiAgICAgICAgICAgIGxyZWFsLnBhcnQxICs9IG1hbnQ7IC8vbWFudGlzc2FcbiAgICAgICAgICAgIGlmIChudW0gPCAwKSB7XG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgbmVnYXRpdmUgc2lnbi5cbiAgICAgICAgICAgICAgICBscmVhbC5wYXJ0MSArPSAyMTQ3NDgzNjQ4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbHJlYWwucGFydDIgPSBtYW50MjtcbiAgICAgICAgICAgIGlmIChmaXJzdGJpdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGxyZWFsLnBhcnQyICs9IDIxNDc0ODM2NDg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxyZWFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSB2YWx1ZSB0byB2YWx1ZSBpbiBtaWxsaXNlY29uZHMsIGRlcGVuZGluZ1xuICAgICAqIG9uIHRoZSBmb3JtYXQgc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHRvTWlsbGlzZWModGltZSwgZm9ybWF0KSB7XG4gICAgICAgIHZhciB0bXA7XG4gICAgICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgICAgICBjYXNlICcjZCc6XG4gICAgICAgICAgICBjYXNlICcjZGQnOlxuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgKiA4NjQwMDAwMDsvL2RheXNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJyNoJzpcbiAgICAgICAgICAgIGNhc2UgJyNoaCc6XG4gICAgICAgICAgICAgICAgdG1wID0gdGltZSAqIDM2MDAwMDA7IC8vaG91cnNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJyNtJzpcbiAgICAgICAgICAgIGNhc2UgJyNtbSc6XG4gICAgICAgICAgICAgICAgdG1wID0gdGltZSAqIDYwMDAwOyAgIC8vbWludXRlc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnI3MnOlxuICAgICAgICAgICAgY2FzZSAnI3NzJzpcbiAgICAgICAgICAgICAgICB0bXAgPSB0aW1lICogMTAwMDsgICAgLy9zZWNvbmRzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcjbXMnOlxuICAgICAgICAgICAgY2FzZSAnI21zbXNtcyc6ICAgICAgICAgICAvL21pbGxpc2Vjb25kc1xuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRtcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgVE9EIHN0cmluZyB0byBhIHZhbHVlIG9mIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICBzdHJpbmdUb1RpbWUodGltZXN0cmluZywgZm9ybWF0KSB7XG4gICAgICAgIHZhciBhcnJGb3JtYXQgPSBmb3JtYXQuc3BsaXQoJyMnKSxcbiAgICAgICAgICAgIGFycmxlbiA9IGFyckZvcm1hdC5sZW5ndGgsXG4gICAgICAgICAgICByZWdleCA9IC86fFxcLnwtfF8vLFxuICAgICAgICAgICAgdGltZSA9IDAsXG4gICAgICAgICAgICBjbnQgPSAwLFxuICAgICAgICAgICAgdG1wLCBpLCBhcnJWYWx1ZXMsIHNwbGl0dGVyT2s7XG5cbiAgICAgICAgLy9DaGVjayBpZiBhIHZhbGlkIHNwbGl0dGVyIGlzIGdpdmVuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcnJsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlZ2V4LnRlc3QoYXJyRm9ybWF0W2ldKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwbGl0dGVyT2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNwbGl0dGVyT2sgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIHNlcGFyYXRvciAoIDogLiAtIF8gKSBmb3IgVE9EIHN0cmluZyBmb3VuZCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdTdHJpbmc6ICcgKyB0aW1lc3RyaW5nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdGb3JtYXQ6ICcgKyBmb3JtYXQpO1xuICAgICAgICAgICAgLy9BbHRob3VnaCB3ZSBjb3VsZCB0cnkgdG8gc3BsaXQgdGhlIHRpbWVzdHJpbmcgaW4gY2FzZSBvZiBhIFxuICAgICAgICAgICAgLy93cm9uZyBmb3JtYXR0aW5nIHN0cmluZywgd2UgZG9uJ3QgZG8gaXQuXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyclZhbHVlcyA9IHRpbWVzdHJpbmcuc3BsaXQocmVnZXgpO1xuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcnJsZW47IGkrKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFyckZvcm1hdFtpXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gcGFyc2VJbnQoYXJyVmFsdWVzW2NudF0sIDEwKSAqIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHBhcnNlSW50KGFyclZhbHVlc1tjbnRdLCAxMCkgKiA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NzJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gcGFyc2VJbnQoYXJyVmFsdWVzW2NudF0sIDEwKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtcyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbXNtc21zJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gcGFyc2VJbnQoYXJyVmFsdWVzW2NudF0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lICs9IHRtcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCYXNlNjQgZW5jb2RlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGFcbiAgICAgKi9cbiAgICBlbmNvZGVCYXNlNjQoZGF0YSkge1xuICAgICAgICByZXR1cm4gYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLmRhdGEpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGZvciBjb252ZXJ0aW5nIHRoZSBkYXRhIHZhbHVlcyB0byBhIGJ5dGUgYXJyYXkuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gICAgIEFuIGl0ZW0gb2YgdGhlIGl0ZW0gbGlzdCBvZiBhIHJlcXVlc3QgZGVzY3JpcHRvci5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAgICAgQ29udGFpbnMgdGhlIGRhdGEgdHlwZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXQgICBUaGUgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbiAgICAgIERhdGEgbGVuZ3RoLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBieXRlcyAgICBBbiBhcnJheSBjb250YWluaW5nIHRoZSBkYXRhIGFzIGJ5dGUgdmFsdWVzLlxuICAgICAqL1xuICAgIGRhdGFUb0J5dGVBcnJheShpdGVtLCB0eXBlLCBmb3JtYXQsIGxlbikge1xuXG4gICAgICAgIHZhciBieXRlcyA9IFtdLFxuICAgICAgICAgICAgdmFsLCBzdHJsZW4sIHNsLCBpO1xuXG4gICAgICAgIC8vSWYgbm8gdmFsdWUgaXMgcGFzc2VkLCBzZXQgdmFsdWUgdG8gemVybyBhbmQgbG9nIGFuIGVycm9yIG1lc3NhZ2UuXG4gICAgICAgIGlmIChpdGVtLnZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnVE9EJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUSU1FX09GX0RBWSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnREFURV9BTkRfVElNRSc6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVmFsdWUgb2YgYSB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGlzIG5vdCBkZWZpbmVkIScpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0RlcGVuZGluZyBvbiB0aGUgZGF0YSB0eXBlLCBjb252ZXJ0IHRoZSB2YWx1ZXMgdG8gYSBieXRlIGFycmF5LlxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0JPT0wnOlxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnZhbCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlc1swXSA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZXNbMF0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0JZVEUnOlxuICAgICAgICAgICAgY2FzZSAnVVNJTlQnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAwLCAyNTUpO1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU0lOVCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0xMjgsIDEyNyk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsICsgMjU2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1dPUkQnOlxuICAgICAgICAgICAgY2FzZSAnVUlOVCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIDAsIDY1NTM1KTtcbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVCc6XG4gICAgICAgICAgICBjYXNlICdJTlQxNic6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0zMjc2OCwgMzI3NjcpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCArIDY1NTM2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVDFEUCc6XG4gICAgICAgICAgICAgICAgaXRlbS52YWwgPSBNYXRoLnJvdW5kKGl0ZW0udmFsICogMTApO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAtMzI3NjgsIDMyNzY3KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwgKyA2NTUzNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQyRFAnOlxuICAgICAgICAgICAgICAgIGl0ZW0udmFsID0gTWF0aC5yb3VuZChpdGVtLnZhbCAqIDEwMCk7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0zMjc2OCwgMzI3NjcpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCArIDY1NTM2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RXT1JEJzpcbiAgICAgICAgICAgIGNhc2UgJ1VESU5UJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgMCwgNDI5NDk2NzI5NSk7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdESU5UJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgLTIxNDc0ODM2NDgsIDIxNDc0ODM2NDcpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCArIDQyOTQ5NjcyOTY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnUkVBTCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0yMTQ3NDgzNjQ4LCAyMTQ3NDgzNjQ3KTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmZsb2F0VG9SZWFsKHZhbCk7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdMUkVBTCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0yMTQ3NDgzNjQ4LCAyMTQ3NDgzNjQ3KTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmZsb2F0VG9McmVhbCh2YWwpO1xuICAgICAgICAgICAgICAgIC8vTGVuZ3RoIHNldCB0byA0LCBjYXVzZSB0eXBlIGxlbmd0aCBpcyA4IGFuZCB0aGVyZSBhcmUgMiBwYXJ0c1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLnBhcnQyLCA0KTtcbiAgICAgICAgICAgICAgICBieXRlcyA9IGJ5dGVzLmNvbmNhdCh0aGlzLm51bVRvQnl0ZUFycih2YWwucGFydDEsIDQpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS52YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vRGVsZXRlIHRoZSB0aW1lIHBvcnRpb24uXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsLnNldEhvdXJzKDApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRNaW51dGVzKDApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRTZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGUgb2JqZWN0IGluIHNlY29uZHMgc2luY2UgMS4xLjE5NzAgYW5kXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSB0aW1lIHpvbmUgdG8gVVRDLlxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBpdGVtLnZhbC5nZXRUaW1lKCkgLyAxMDAwIC0gaXRlbS52YWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhbHVlIG9mIGEgREFURSB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGlzIG5vdCBhIGRhdGUgb2JqZWN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICBjYXNlICdEQVRFX0FORF9USU1FJzpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGUgb2JqZWN0IGluIHNlY29uZHMgc2luY2UgMS4xLjE5NzAgYW5kXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSB0aW1lIHpvbmUgdG8gVVRDLlxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBpdGVtLnZhbC5nZXRUaW1lKCkgLyAxMDAwIC0gaXRlbS52YWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhbHVlIG9mIGEgRFQgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCBpcyBub3QgYSBkYXRlIG9iamVjdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVE9EJzpcbiAgICAgICAgICAgIGNhc2UgJ1RJTUVfT0ZfREFZJzpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvL0RlbGV0ZSB0aGUgZGF0ZSBwb3J0aW9uLlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRZZWFyKDE5NzApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRNb250aCgwKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwuc2V0RGF0ZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRlIG9iamVjdCBpbiBzZWNvbmRzIHNpbmNlIDEuMS4xOTcwIGFuZFxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgdGltZSB6b25lIHRvIFVUQy5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gaXRlbS52YWwuZ2V0VGltZSgpIC0gaXRlbS52YWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSB0aW1lIHZhbHVlIGlzIGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICcnIHx8IGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSAnI2hoIzojbW0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBObyBmb3JtYXQgZ2l2ZW4gZm9yIFRPRCBzdHJpbmchIFVzaW5nIGRlZmF1bHQgI2hoIzojbW0uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnN0cmluZ1RvVGltZShpdGVtLnZhbCwgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBUT0QgdmFsdWUgaW4gd3JpdGUgcmVxdWVzdCBpcyB3ZXRoZXIgYSBkYXRlIG9iamVjdCBub3IgYSBzdHJpbmchJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICAgICAgICAgICAgLy9JZiBubyBsZW5ndGggaXMgZ2l2ZW4sIHNldCBpdCB0byA4MCBjaGFyYWN0ZXJzIChUd2luQ0FUIGRlZmF1bHQpLiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3RybGVuID0gKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSA/IHRoaXMucGxjVHlwZUxlbi5TVFJJTkcgOiBwYXJzZUludChmb3JtYXQsIDEwKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSkge1xuICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBnaXZlbiBzdHJpbmcgbGVuZ3RoIGlzIHZhbGlkIGFuZCBzaG9ydGVyIHRoZW4gdGhlIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAvL3RoZW4gdXNlIHRoZSBnaXZlbiB2YWx1ZSB0byBhdm9pZCBhbiBvdmVyZmxvdywgb3RoZXJ3aXNlIHVzZVxuICAgICAgICAgICAgICAgICAgICAvL3RoZSByZWFsIHN0cmluZyBsZW5ndGguXG4gICAgICAgICAgICAgICAgICAgIHNsID0gc3RybGVuIDwgaXRlbS52YWwubGVuZ3RoID8gc3RybGVuIDogaXRlbS52YWwubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2w7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXNbaV0gPSBpdGVtLnZhbC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vRmlsbCB0aGUgc3RyaW5nIHVwIHRvIHRoZSBnaXZlbiBsZW5ndGgsIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpOyBpIDwgc3RybGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzW2ldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1Rlcm1pbmF0aW9uLCB0aGUgcmVhbCBzdHJpbmcgbGVuZ3RoIGluIHRoZSBQTEMgaXNcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgZGVmaW5lZCBsZW5ndGggKyAxLlxuICAgICAgICAgICAgICAgICAgICBieXRlc1tpXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVElNRSc6XG4gICAgICAgICAgICAgICAgdmFsID0gcGFyc2VJbnQoaXRlbS52YWwsIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4odmFsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFZhbHVlIG9mIGEgVElNRSB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGlzIG5vdCBkZWZpbmVkIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50b01pbGxpc2VjKHZhbCwgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IExvd2VyIGxpbWl0IGZvciBUSU1FIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgZXhjZWVkZWQhKScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyBpdGVtLnZhbCArIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsID4gNDI5NDk2NzI5NSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSA0Mjk0OTY3Mjk1O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFVwcGVyIGxpbWl0IGZvciBUSU1FIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgZXhjZWVkZWQhKScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyBpdGVtLnZhbCArIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0VuZFN0cnVjdCc6XG4gICAgICAgICAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBVbmtub3duIGRhdGEgdHlwZSBpbiB3cml0ZSByZXF1ZXN0IDogJyArIHR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuXG4gICAgfVxuXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWNvZGVyIEZ1bmN0aW9uc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBudW1iZXIgdG8gYSBoZXggc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqL1xuICAgIG51bVRvSGV4U3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSB2YWx1ZS50b1N0cmluZygxNik7XG4gICAgICAgIGlmICgocmV0Lmxlbmd0aCAlIDIpICE9PSAwKSB7XG4gICAgICAgICAgICByZXQgPSAnMCcgKyByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBmaXhlZCBsZW5ndGggb2YgYW4gaW50ZWdlciBieSBhZGRpbmcgbGVhZGluZyBcbiAgICAgKiB6ZXJvcyhpLmUuIGNoYW5nZSAyIHRvIDAyKS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtYlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwbGFjZXNcbiAgICAgKi9cbiAgICBmaXhOdW1iTGVuZ3RoKG51bWIsIHBsYWNlcykge1xuICAgICAgICBwbGFjZXMgPSAoaXNOYU4ocGxhY2VzKSkgPyAwIDogcGxhY2VzO1xuICAgICAgICB2YXIgc3RyID0gbnVtYi50b1N0cmluZygxMCk7XG4gICAgICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgcGxhY2VzKSB7XG4gICAgICAgICAgICBzdHIgPSAnMCcgKyBzdHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgZGF0ZSBvYmplY3QgdG8gYSBmb3JtYXR0ZWQgc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RGF0ZX0gdGltZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICBkYXRlVG9TdHJpbmcodGltZSwgZm9ybWF0KSB7XG5cbiAgICAgICAgdmFyIGFyciA9IGZvcm1hdC5zcGxpdCgnIycpLFxuICAgICAgICAgICAgYXJybGVuID0gYXJyLmxlbmd0aCxcbiAgICAgICAgICAgIHRzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgIHRtcCwgaTtcblxuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJybGVuOyBpKyspIHtcblxuICAgICAgICAgICAgc3dpdGNoIChhcnJbaV0pIHtcbiAgICAgICAgICAgICAgICAvL0RhdGUgZm9ybWF0dGluZy5cbiAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0REJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdXRCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0RGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1dLRCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZGF0ZU5hbWVzLndlZWtkU2hvcnRbdGltZS5nZXREYXkoKV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1dFRUtEQVknOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmRhdGVOYW1lcy53ZWVrZExvbmdbdGltZS5nZXREYXkoKV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNT04nOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmRhdGVOYW1lcy5tb250aHNTaG9ydFt0aW1lLmdldE1vbnRoKCldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNT05USCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZGF0ZU5hbWVzLm1vbnRoc0xvbmdbdGltZS5nZXRNb250aCgpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnWVknOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRtcCA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wIC09IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdZWVlZJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIC8vVGltZSBmb3JtYXR0aW5nLlxuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldEhvdXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRIb3VycygpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0U2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzcyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0U2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbXMnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtc21zbXMnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gYXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRzdHJpbmcgPSB0c3RyaW5nICsgdG1wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0c3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBudW1iZXIgd2l0aCBhIHZhbHVlIGluIG1pbGxpc2Vjb25kcyB0byBhIGZvcm1hdHRlZCBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gICAgICovXG4gICAgdGltZVRvU3RyaW5nKHRpbWUsIGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyID0gZm9ybWF0LnNwbGl0KCcjJyksXG4gICAgICAgICAgICBhcnJsZW4gPSBhcnIubGVuZ3RoLFxuICAgICAgICAgICAgdHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgdG1wLCBpO1xuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcnJsZW47IGkrKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFycltpXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyA4NjQwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDg2NDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgODY0MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGQnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyA4NjQwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDg2NDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgODY0MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyAzNjAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gMzYwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGgnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyAzNjAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gMzYwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDYwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgNjAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW0nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDYwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgNjAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3MnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21zJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbXNtc21zJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IGFycltpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0c3RyaW5nID0gdHN0cmluZyArIHRtcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHN0cmluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIFVTSU5UL0JZVEUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjVXNpbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBoZXhzID0gdGhpcy5udW1Ub0hleFN0cmluZyhzdHJpbmcuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgIHJldHVybiBwYXJzZUludChoZXhzLCAxNik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBTSU5ULlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1NpbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBkZWMgPSB0aGlzLnBhcnNlUGxjVXNpbnQoc3RyaW5nKTtcbiAgICAgICAgaWYgKGRlYyA+IDEyNykge1xuICAgICAgICAgICAgZGVjID0gZGVjIC0gMjU2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBVSU5UL1dPUkQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjVWludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGhleHMgPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDEpKTtcbiAgICAgICAgaGV4cyArPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGhleHMsIDE2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIElOVC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNJbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBkZWMgPSB0aGlzLnBhcnNlUGxjVWludChzdHJpbmcpO1xuICAgICAgICBpZiAoZGVjID4gMzI3NjcpIHtcbiAgICAgICAgICAgIGRlYyA9IGRlYyAtIDY1NTM2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBVRElOVC9EV09SRC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNVZGludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGhleHMgPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDMpKTtcbiAgICAgICAgaGV4cyArPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDIpKTtcbiAgICAgICAgaGV4cyArPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDEpKTtcbiAgICAgICAgaGV4cyArPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGhleHMsIDE2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIERJTlQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjRGludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRlYyA9IHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcpO1xuICAgICAgICBpZiAoZGVjID4gMjE0NzQ4MzY0Nykge1xuICAgICAgICAgICAgZGVjID0gZGVjIC0gNDI5NDk2NzI5NjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVjO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gYSBmb3JtYXR0ZWQgdGltZSBzdHJpbmdcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHBhcnNlUGxjVGltZShzdHJpbmcsIGZvcm1hdCkge1xuICAgICAgICB2YXIgdGltZSA9IHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcpO1xuICAgICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lOyAgICAvL1VuZm9ybWF0dGVkOiB2YWx1ZSBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLnRpbWVUb1N0cmluZyh0aW1lLCBmb3JtYXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIGEgZm9ybWF0dGVkIHRpbWUgb2YgZGF5IHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHBhcnNlUGxjVG9kKHN0cmluZywgZm9ybWF0KSB7XG4gICAgICAgIC8vQ3JlYXRlIGEgZGF0ZSBvYmplY3QgKHRpbWUgYmFzZSBpbiB0aGUgUExDIGFyZSBtaWxsaXNlY29uZHMpXG4gICAgICAgIHZhciB0aW1lID0gbmV3IERhdGUodGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZykpO1xuXG4gICAgICAgIC8vVGltZSB6b25lIGNvcnJlY3Rpb24uXG4gICAgICAgIHRpbWUgPSBuZXcgRGF0ZSh0aW1lLmdldFRpbWUoKSArIHRpbWUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcblxuICAgICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlVG9TdHJpbmcodGltZSwgZm9ybWF0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBhIGZvcm1hdHRlZCBkYXRlL3RpbWUgb2YgZGF5IHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHBhcnNlUGxjRGF0ZShzdHJpbmcsIGZvcm1hdCkge1xuICAgICAgICAvL0NvbnZlcnRlIHRvIG1pbGxpc2Vjb25kcyBhbiBjcmVhdGUgYSBkYXRlIG9iamVjdFxuICAgICAgICAvLyh0aW1lIGJhc2Ugb2YgREFURS9EVCB2YXJpYWJsZXMgaW4gdGhlIFBMQyBhcmUgc2Vjb25kcyBzaW5jZSAxLjEuMTk3MClcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nKSAqIDEwMDApO1xuXG4gICAgICAgIC8vVGltZSB6b25lIGNvcnJlY3Rpb24uXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcblxuICAgICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlVG9TdHJpbmcoZGF0ZSwgZm9ybWF0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyBvZiBhIFJFQUwgdmFyaWFibGVcbiAgICAgKiB0byBhIEphdmFTY3JpcHQgZmxvYXRpbmcgcG9pbnQgbnVtYmVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1JlYWwoc3RyaW5nKSB7XG4gICAgICAgIHZhciBtYW50ID0gMSxcbiAgICAgICAgICAgIGR1YWwgPSAwLjUsXG4gICAgICAgICAgICBudW0gPSB0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nKSxcbiAgICAgICAgICAgIHNpZ24sIGV4cCwgaTtcblxuICAgICAgICAvL1JldHVybiBpZiB2YWx1ZSBpcyB6ZXJvLiBcbiAgICAgICAgaWYgKG51bSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgLy9DaGVjayB0aGUgc2lnbiBiaXQuXG4gICAgICAgIHNpZ24gPSAoKG51bSA+Pj4gMzEpID09PSAxKSA/ICctJyA6ICcrJztcbiAgICAgICAgbnVtIDw8PSAxOyAvL0RlbGV0ZSB0aGUgc2lnbiBiaXQuXG4gICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBleHBvbmVudC5cbiAgICAgICAgZXhwID0gKG51bSA+Pj4gMjQpIC0gMTI3O1xuICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgMjMgYml0IG1hbnRpc3NhOiBTaGlmdCBiaXRzIHRvIGxlZnQgYW5kIGV2YWx1YXRlIHRoZW0uXG4gICAgICAgIG51bSA8PD0gODtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8PSAyMzsgaSsrKSB7XG4gICAgICAgICAgICBtYW50ICs9IG51bSA8IDAgPyBkdWFsIDogMDsgLy9BZGQgaWYgbGVmdCAoc2lnbiBiaXQpIGJpdCBpcyB0cnVlLlxuICAgICAgICAgICAgbnVtIDw8PSAxO1xuICAgICAgICAgICAgZHVhbCAvPSAyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNpZ24gKyAobWFudCAqIE1hdGgucG93KDIsIGV4cCkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIG9mIGEgTFJFQUwgdmFyaWFibGVcbiAgICAgKiB0byBhIEphdmFTY3JpcHQgZmxvYXRpbmcgcG9pbnQgbnVtYmVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY0xyZWFsKHN0cmluZykge1xuICAgICAgICB2YXIgbnVtID0gdGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZy5zdWJzdHJpbmcoNCwgOCkpLFxuICAgICAgICAgICAgbnVtMiA9IHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcuc3Vic3RyaW5nKDAsIDQpKSxcbiAgICAgICAgICAgIGkgPSAxMixcbiAgICAgICAgICAgIG1hbnQgPSAxLFxuICAgICAgICAgICAgZHVhbCA9IDAuNSxcbiAgICAgICAgICAgIHNpZ24sIGV4cDtcblxuICAgICAgICAvL1JldHVybiBpZiB2YWx1ZSBpcyB6ZXJvLiBcbiAgICAgICAgaWYgKG51bSA9PT0gMCAmJiBudW0yID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICAvL0NoZWNrIHRoZSBzaWduIGJpdC5cbiAgICAgICAgc2lnbiA9ICgobnVtID4+PiAzMSkgPT09IDEpID8gJy0nIDogJysnO1xuICAgICAgICBudW0gPDw9IDE7IC8vRGVsZXRlIHRoZSBzaWduIGJpdC5cbiAgICAgICAgLy9DYWxjdWxhdGUgdGhlIGV4cG9uZW50LlxuICAgICAgICBleHAgPSAobnVtID4+PiAyMSkgLSAxMDIzO1xuICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgbWFudGlzc2EuIFNoaWZ0IGJpdHMgdG8gbGVmdCBhbmQgZXZhbHVhdGUgdGhlbS5cbiAgICAgICAgLy9QYXJ0IDEuXG4gICAgICAgIG51bSA8PD0gMTE7XG4gICAgICAgIHdoaWxlIChpIDwgMzIpIHtcbiAgICAgICAgICAgIG1hbnQgKz0gbnVtIDwgMCA/IGR1YWwgOiAwOyAvL0FkZCBpZiBsZWZ0IChzaWduIGJpdCkgYml0IGlzIHRydWUuXG4gICAgICAgICAgICBudW0gPDw9IDE7XG4gICAgICAgICAgICBkdWFsIC89IDI7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgLy9QYXJ0IDIuXG4gICAgICAgIGlmICgobnVtMiA+Pj4gMzEpID09PSAxKSB7XG4gICAgICAgICAgICBtYW50ICs9IGR1YWw7XG4gICAgICAgICAgICBudW0yIDw8PSAxO1xuICAgICAgICAgICAgZHVhbCAvPSAyO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpIDwgNjQpIHtcbiAgICAgICAgICAgIG1hbnQgKz0gbnVtMiA8IDAgPyBkdWFsIDogMDsgLy9BZGQgaWYgbGVmdCAoc2lnbiBiaXQpIGJpdCBpcyB0cnVlLlxuICAgICAgICAgICAgbnVtMiA8PD0gMTtcbiAgICAgICAgICAgIGR1YWwgLz0gMjtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzaWduICsgKG1hbnQgKiBNYXRoLnBvdygyLCBleHApKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIHN0cmluZyBieSBzaW1wbHkgY3V0dGluZyBvZiBzdXBlcmZsdW91cyBjaGFyYWN0ZXJzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1N0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgLypcbiAgICAgICAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdHJpbmcuY2hhckNvZGVBdChpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJpbmcuc3Vic3RyKDAsIGkpO1xuICAgICAgICAqL1xuICAgICAgICByZXR1cm4gc3RyaW5nLnNwbGl0KFN0cmluZy5mcm9tQ2hhckNvZGUoMCkpWzBdO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQmFzZTY0IGRlY29kZXJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICAgICAqL1xuICAgIGRlY29kZUJhc2U2NChkYXRhKSB7XG4gICAgICAgIHJldHVybiBhdG9iKGRhdGEpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBCNjQtc3Vic3RyaW5ncyB0byBkYXRhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhU3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZywgTnVtYmVyfSBmb3JtYXRcbiAgICAgKiBAcmV0dXJuIHtNaXhlZH0gZGF0YVxuICAgICAqIFxuICAgICAqL1xuICAgIHN1YlN0cmluZ1RvRGF0YShkYXRhU3RyaW5nLCB0eXBlLCBmb3JtYXQ/KSB7XG4gICAgICAgIHZhciBkYXRhO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnQk9PTCc6XG4gICAgICAgICAgICAgICAgLy9Eb2VzIHRoaXMgd29yaz8/Pz8/IFNlZW1zIGxpa2UuXG4gICAgICAgICAgICAgICAgZGF0YSA9IChkYXRhU3RyaW5nLmNoYXJDb2RlQXQoMCkgIT0gJzAnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0JZVEUnOlxuICAgICAgICAgICAgY2FzZSAnVVNJTlQnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjVXNpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTSU5UJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1NpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdXT1JEJzpcbiAgICAgICAgICAgIGNhc2UgJ1VJTlQnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjVWludChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVCc6XG4gICAgICAgICAgICBjYXNlICdJTlQxNic6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNJbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQxRFAnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSAoKHRoaXMucGFyc2VQbGNJbnQoZGF0YVN0cmluZykpIC8gMTApLnRvRml4ZWQoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQyRFAnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSAoKHRoaXMucGFyc2VQbGNJbnQoZGF0YVN0cmluZykpIC8gMTAwKS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRFdPUkQnOlxuICAgICAgICAgICAgY2FzZSAnVURJTlQnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjVWRpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdESU5UJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY0RpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdSRUFMJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1JlYWwoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnRvRml4ZWQocGFyc2VJbnQoZm9ybWF0LCAxMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0xSRUFMJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY0xyZWFsKGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS50b0ZpeGVkKHBhcnNlSW50KGZvcm1hdCwgMTApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjU3RyaW5nKGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVE9EJzpcbiAgICAgICAgICAgIGNhc2UgJ1RJTUVfT0ZfREFZJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1RvZChkYXRhU3RyaW5nLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVElNRSc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNUaW1lKGRhdGFTdHJpbmcsIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgIGNhc2UgJ0RBVEVfQU5EX1RJTUUnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjRGF0ZShkYXRhU3RyaW5nLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRW5kU3RydWN0JzpcbiAgICAgICAgICAgICAgICAvL0p1c3QgZG8gbm90aGluZy5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVW5rbm93biBkYXRhIHR5cGUgYXQgcGFyc2luZyByZWFkIHJlcXVlc3Q6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY29kZSB0aGUgcmVzcG9uc2Ugc3RyaW5nIG9mIGEgUmVhZCBSZXF1ZXN0IGFuZCBzdG9yZSB0aGUgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQURTIFJlcWVzdCBPYmplY3RcbiAgICAgKi9cbiAgICBwYXJzZVJlYWRSZXEoYWRzUmVxKSB7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlLFxuICAgICAgICAgICAgaXRlbUxpc3QgPSBhZHNSZXEucmVxRGVzY3IuaXRlbXMsXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICBzdHJBZGRyID0gMCxcbiAgICAgICAgICAgIGl0ZW0sIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIHN0cmxlbiwgbGVuLCBwbGVuLCBtb2QsIHR5cGUsIGZvcm1hdCwgaWR4LCBsaXN0bGVuLCBzdGFydGFkZHI7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueVxuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgPSB0aGlzLmRlY29kZUJhc2U2NChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHBEYXRhJylbMF0uZmlyc3RDaGlsZC5kYXRhKTtcblxuICAgICAgICAgICAgLy9SdW4gdGhyb3VnaCB0aGUgZWxlbWVudHMgaW4gdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgICAgIGZvciAoaWR4ID0gMCwgbGlzdGxlbiA9IGl0ZW1MaXN0Lmxlbmd0aDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtTGlzdFtpZHhdO1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICAgICAgYXJyVHlwZSA9IHRoaXMuZ2V0VHlwZUFuZEZvcm1hdChpdGVtKTtcbiAgICAgICAgICAgICAgICB0eXBlID0gYXJyVHlwZVswXTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBhcnJUeXBlWzFdO1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgdGhlIGxlbmd0aCBvZiB0aGUgZGF0YSB0eXBlcy5cbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IHBhcnNlSW50KGZvcm1hdCwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihzdHJsZW4pID8gc3RybGVuIDogbGVuKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRW5kU3RydWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBsZW5ndGggb2YgdGhlIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1wiRW5kU3RydWN0XCIgaXMgb25seSB1c2VkIHdpdGggXCJyZWFkQXJyYXlPZlN0cnVjdHVyZXMvd3JpdGVBcnJheU9mU3RydWN0dXJlc1wiLlxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gaXRlbS52YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIGZvciBjYWxjdWxhdGluZyBwYWRkaW5nIGJ5dGVzXG4gICAgICAgICAgICAgICAgcGxlbiA9IGxlbiA8IHRoaXMuYWxpZ25tZW50ID8gbGVuIDogdGhpcy5hbGlnbm1lbnQ7XG5cbiAgICAgICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgcGxhY2Ugb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGRhdGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWYgKGFkc1JlcS5yZXFEZXNjci5zZXEgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JZiB2YXJpYWJsZSBhZGRyZXNzZXMgYXJlIHVzZWQuXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0YWRkciA9IHRoaXMuZ2V0SW5kZXhPZmZzZXQoYWRzUmVxLnJlcURlc2NyKTtcbiAgICAgICAgICAgICAgICAgICAgc3RyQWRkciA9IGl0ZW0uYWRkciAtIHN0YXJ0YWRkcjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFkc1JlcS5yZXFEZXNjci5jYWxjQWxpZ25tZW50ID09PSB0cnVlICYmIHBsZW4gPiAxICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHN0ckFkZHIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29tcHV0ZSB0aGUgYWRkcmVzcyBmb3IgdGhlIGFsaWdubWVudCBpbiBjYXNlIG9mIGEgc3RydWN0dXJlLlxuICAgICAgICAgICAgICAgICAgICBtb2QgPSBzdHJBZGRyICUgcGxlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gcGxlbiAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vU2xpY2UgdGhlIHN0cmluZyBhbmQgZGVjb2RlIHRoZSBkYXRhXG4gICAgICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIGxlbik7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgdHlwZSwgZm9ybWF0KTtcblxuICAgICAgICAgICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIEphdmFTY3JpcHQgdmFyaWFibGUgYW5kIHdyaXRlIHRoZSBkYXRhIHRvIGl0XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VWYXJOYW1lKGl0ZW0uanZhciwgcmVzdWx0LCBhZHNSZXEucmVxRGVzY3IuZGF0YU9iaiwgaXRlbS5wcmVmaXgsIGl0ZW0uc3VmZml4KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgbmV4dCBhZGRyZXNzXG4gICAgICAgICAgICAgICAgaWYgKGFkc1JlcS5yZXFEZXNjci5zZXEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyQWRkciArPSBsZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIFJlYWQgUmVxdWVzdCBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgdGhlIHJlc3BvbnNlIHN0cmluZyBvZiBhIFN1bVJlYWRSZXF1ZXN0IGFuZCBzdG9yZSB0aGUgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQURTIFJlcXVlc3QgT2JqZWN0XG4gICAgICovXG4gICAgcGFyc2VTdW1SZWFkUmVxKGFkc1JlcSkge1xuXG4gICAgICAgIHZhciByZXNwb25zZSxcbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gYWRzUmVxLnJlcURlc2NyLml0ZW1zLFxuICAgICAgICAgICAgYXJyVHlwZSA9IFtdLFxuICAgICAgICAgICAgc3RyQWRkciA9IDAsXG4gICAgICAgICAgICBzdWJTdHJBZGRyID0gMCxcbiAgICAgICAgICAgIGRhdGFPYmogPSB3aW5kb3csXG4gICAgICAgICAgICB2bGVuTWF4ID0gMCxcbiAgICAgICAgICAgIGl0ZW0sIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIGRhdGEsIGxlbiwgdHlwZSwgZm9ybWF0LCBpZHgsIGxpc3RsZW4sIGVycm9yQ29kZSwganZhciwgaSxcbiAgICAgICAgICAgIGFycmF5TGVuZ3RoLCBpdGVtU2l6ZSwgaXRlbUluZm87XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2xpY2UgYSBwaWVjZSBvdXQgb2YgdGhlIHN1YnN0cmluZywgY29udmVydCB0aGUgZGF0YSBhbmQgd3JpdGUgaXRcbiAgICAgICAgICogdG8gdGhlIEphdmFTY3JpcHQgdmFyaWFibGUuICBcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHBhcnNlU3ViU3RyaW5nU2xpY2UgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBzdHJsZW4sIHN1YlN0clNsaWNlO1xuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RybGVuID0gcGFyc2VJbnQoZm9ybWF0LCAxMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxlbiA9ICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSA/IHN0cmxlbiA6IGxlbikgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1Rha2UgYSBwaWVjZSBvZiB0aGUgZGF0YSBzdWIgc3RyaW5nXG4gICAgICAgICAgICBzdWJTdHJTbGljZSA9IGRhdGFTdWJTdHJpbmcuc3Vic3RyKHN1YlN0ckFkZHIsIGxlbik7XG4gICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGFcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShzdWJTdHJTbGljZSwgdHlwZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIEphdmFTY3JpcHQgdmFyaWFibGUgYW5kIHdyaXRlIHRoZSBkYXRhIHRvIGl0XG4gICAgICAgICAgICB0aGlzLnBhcnNlVmFyTmFtZShqdmFyLCBkYXRhLCBkYXRhT2JqLCBpdGVtLnByZWZpeCwgaXRlbS5zdWZmaXgpO1xuXG4gICAgICAgICAgICBzdWJTdHJBZGRyICs9IGxlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXJzZSB0aGUgc3R1Y3R1cmUgZGVmaW5pdGlvbiBhbmQgY29tcHV0ZSB0aGUgZGF0YSBvZlxuICAgICAgICAgKiB0aGUgc3Vic3RyaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcGFyc2VTdHJ1Y3R1cmUgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBqLCBkZWZBcnIsIGxlbkFyckVsZW0sIGxhc3REZWZBcnIsIG1vZCwgZWxlbTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBGdW5jdGlvbiBmb3IgYWRqdXN0aW5nIHRoZSBhZGRyZXNzIG9mIHRoZSBkYXRhIGluIHRoZSBzdHJpbmdcbiAgICAgICAgICAgICAqIGlmIGFuIGFsaWdubWVudCBpcyB1c2VkLiBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgY2hlY2tBbGlnbm1lbnQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmxlbiwgbW9kO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB0eXBlICE9PSAnU1RSSU5HJyAmJiB0eXBlICE9PSAnRW5kU3RydWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIGZvciBjYWxjdWxhdGluZyBwYWRkaW5nIGJ5dGVzXG4gICAgICAgICAgICAgICAgICAgIHZsZW4gPSBsZW4gPCB0aGlzLmFsaWdubWVudCA/IGxlbiA6IHRoaXMuYWxpZ25tZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQ29tcHV0ZSB0aGUgYWRkcmVzcyBmb3IgdGhlIGFsaWdubWVudC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZsZW4gPiAxICYmIHN1YlN0ckFkZHIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2QgPSBzdWJTdHJBZGRyICUgdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViU3RyQWRkciArPSB2bGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9TdG9yZSB0aGUgbWF4aW11bSBsZW5ndGggb2YgdGhlIFBMQyB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICAgICAgLy9mb3IgaW5zZXJ0aW5nIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodmxlbiA+IHZsZW5NYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZsZW5NYXggPSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NoZWNrIHN0cnVjdHVyZSBkZWZpbml0aW9uXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGVmID0gdGhpcy5wYXJzZVZhck5hbWUoaXRlbS5kZWYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSA9PT0gdHJ1ZSAmJiBpdGVtLmRlZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kZWYgPSB0aGlzLmNyZWF0ZVN0cnVjdERlZihpdGVtSW5mby5kYXRhVHlwZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRlZiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBzdHJ1Y3R1cmUgZGVmaW5pbml0aW9uIGZvdW5kIChwYXJzZVN1bVJlYWRSZXEoKSkhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoZWxlbSBpbiBpdGVtLmRlZikge1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGVmLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmQXJyID0gaXRlbS5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IHBhcnNlSW50KGRlZkFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERlZkFyciA9IGRlZkFyci5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbkFyckVsZW07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBkZWZBcnJbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gZWxlbSArIGo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyci5zbGljZSgzLCAtMSkuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhciA9IGVsZW0gKyAnLicgKyBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBkZWZBcnIuc2xpY2UoMykuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQWRkIGluZGV4IGluIGNhc2Ugb2YgYW4gYXJyYXkgb2Ygc3RydWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhciA9IGkgKyAnLicgKyBqdmFyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FsaWdubWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3ViU3RyaW5nU2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgd2UgYXJlIGluIGFuIGFycmF5IG9mIHN0cnVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gaSArICcuJyArIGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXIgPSBlbGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gZGVmQXJyWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyci5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyWzFdID0gZGVmQXJyLnNsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxpZ25tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1YlN0cmluZ1NsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlXG4gICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxICYmIHZsZW5NYXggPiAxICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZsZW5NYXggPiB0aGlzLmFsaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2bGVuTWF4ID0gdGhpcy5hbGlnbm1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZCA9IHN1YlN0ckFkZHIgJSB2bGVuTWF4O1xuICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YlN0ckFkZHIgKz0gdmxlbk1heCAtIG1vZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcFJkRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG5cbiAgICAgICAgICAgIC8vUmVhZCB0aGUgZXJyb3IgY29kZXMgb2YgdGhlIEFEUyBzdWIgY29tbWFuZHMuXG4gICAgICAgICAgICBmb3IgKGlkeCA9IDAsIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGg7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICAgICAgZXJyb3JDb2RlID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFEUyBzdWIgY29tbWFuZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIGEgU3VtUmVhZFJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBjb2RlOiAnICsgZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbUxpc3RbaWR4XSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RyQWRkciArPSA0O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vUnVuIHRocm91Z2ggdGhlIGVsZW1lbnRzIGluIHRoZSBpdGVtIGxpc3QuXG4gICAgICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0eXBlIGFuZCBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgICAgICAgICAgICB0eXBlID0gaXRlbUluZm8udHlwZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBpdGVtSW5mby5mb3JtYXQ7XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0aGUgbGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGVzLlxuICAgICAgICAgICAgICAgIGl0ZW1TaXplID0gaXRlbUluZm8uc2l6ZTtcblxuICAgICAgICAgICAgICAgIC8vUmVzZXQgY291bnRlciBmb3IgYXJyYXlzLlxuICAgICAgICAgICAgICAgIGkgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgLy9TbGljZSB0aGUgc3RyaW5nIGFuZCBkZWNvZGUgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgaXRlbVNpemUpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQVJSQVknOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU9iaiA9IHRoaXMucGFyc2VWYXJOYW1lKGl0ZW0uanZhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJTdHJBZGRyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gaXRlbUluZm8uYXJyYXlMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdHJ1Y3R1cmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBpdGVtSW5mby5hcnJheURhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdWJTdHJpbmdTbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdVU0VSJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFPYmogPSB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmp2YXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViU3RyQWRkciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN0cnVjdHVyZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFPYmogPSB3aW5kb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgdHlwZSwgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIEphdmFTY3JpcHQgdmFyaWFibGUgYW5kIHdyaXRlIHRoZSBkYXRhIHRvIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmp2YXIsIGRhdGEsIGRhdGFPYmosIGl0ZW0ucHJlZml4LCBpdGVtLnN1ZmZpeCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIG5leHQgc3RyaW5nIGFkZHJlc3NcbiAgICAgICAgICAgICAgICBzdHJBZGRyICs9IGl0ZW1TaXplO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBhcnNpbmcgb2YgU3VtUmVhZFJlcXVlc3QgZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgdGhlIHJlc3BvbnNlIHN0cmluZyBvZiBhIFN1bVdyaXRlUmVxdWVzdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQURTIFJlcXVlc3QgT2JqZWN0XG4gICAgICovXG4gICAgcGFyc2VTdW1Xcml0ZVJlcShhZHNSZXEpIHtcblxuICAgICAgICB2YXIgcmVzcG9uc2UsXG4gICAgICAgICAgICBpdGVtTGlzdCA9IGFkc1JlcS5yZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIGFyckRlbGV0ZWRIZGwgPSBbXSxcbiAgICAgICAgICAgIHN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgc3ViU3RyQWRkciA9IDAsXG4gICAgICAgICAgICBkYXRhT2JqID0gd2luZG93LFxuICAgICAgICAgICAgaXRlbSwgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgZGF0YSwgbGVuLCB0eXBlLCBmb3JtYXQsIGlkeCwgbGlzdGxlbiwgZXJyb3JDb2RlLCBkZWxJZHgsIHN5bU5hbWU7XG5cblxuICAgICAgICAvL0p1c3QgbG9vayBmb3IgZXJyb3JzLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcFJkRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG5cbiAgICAgICAgICAgIC8vUmVhZCB0aGUgZXJyb3IgY29kZXMgb2YgdGhlIEFEUyBzdWIgY29tbWFuZHMuXG4gICAgICAgICAgICBmb3IgKGlkeCA9IDAsIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGg7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICAgICAgZXJyb3JDb2RlID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JDb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vUmVsZWFzZSBoYW5kbGVzIHJlcXVlc3Q/XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZHNSZXEucmVxRGVzY3IuaXNSZWxIZGxSZXEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5bU5hbWUgPSBpdGVtTGlzdFtpZHhdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGUgaGFuZGxlIGZyb20gdGhlIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5oYW5kbGVDYWNoZVtzeW1OYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRGVsZXRlIHRoZSBoYW5kbGUgaW4gdGhlIGhhbmRsZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxJZHggPSB0aGlzLmhhbmRsZU5hbWVzLmluZGV4T2Yoc3ltTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5oYW5kbGVOYW1lc1tkZWxJZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyRGVsZXRlZEhkbFtpZHhdID0gc3ltTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFEUyBzdWIgY29tbWFuZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIGEgU3VtUmVhZFJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBjb2RlOiAnICsgZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbUxpc3RbaWR4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gNDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9SZWxlYXNlIGhhbmRsZXMgcmVxdWVzdD9cbiAgICAgICAgICAgIGlmIChhZHNSZXEucmVxRGVzY3IuaXNSZWxIZGxSZXEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSBkZWxldGVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgZm9yIChpZHggPSB0aGlzLmhhbmRsZU5hbWVzLmxlbmd0aCAtIDE7IGlkeCA+PSAwOyBpZHgtLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVOYW1lc1tpZHhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTmFtZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FjaGVSZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEFsbCBoYW5kbGVzIHJlbGVhc2VkLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogUmVsZWFzZWQgaGFuZGxlczonKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coYXJyRGVsZXRlZEhkbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIFN1bVdyaXRlUmVxdWVzdCBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIHRoZSByZXNwb25zZSBzdHJpbmcgb2YgYSBBRFMgU3RhdGUgUmVxdWVzdCBhbmQgc3RvcmUgdGhlIGRhdGEuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIEFEUyBSZXFlc3QgT2JqZWN0XG4gICAgICovXG4gICAgcGFyc2VBZHNTdGF0ZShhZHNSZXEpIHtcblxuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuYWRzU3RhdGUgPSBwYXJzZUludChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncEFkc1N0YXRlJylbMF0uZmlyc3RDaGlsZC5kYXRhLCAxMCk7XG4gICAgICAgICAgICB0aGlzLmFkc1N0YXRlVHh0ID0gdGhpcy5hZHNTdGF0ZXNbdGhpcy5hZHNTdGF0ZV07XG4gICAgICAgICAgICB0aGlzLmRldmljZVN0YXRlID0gcGFyc2VJbnQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BEZXZpY2VTdGF0ZScpWzBdLmZpcnN0Q2hpbGQuZGF0YSwgMTApO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIEFEUyBSZWFkIFN0YXRlIFJlcXVlc3QgZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY29kZSB0aGUgcmVzcG9uc2Ugc3RyaW5nIG9mIGEgUmVhZFdyaXRlIFJlcXVlc3QgYW5kIHN0b3JlIHRoZSBoYW5kbGVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBBRFMgUmVxdWVzdCBPYmplY3RcbiAgICAgKi9cbiAgICBwYXJzZUhhbmRsZXMoYWRzUmVxKSB7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlLFxuICAgICAgICAgICAgYXJyU3ltTmFtZXMgPSB0aGlzLmhhbmRsZU5hbWVzLFxuICAgICAgICAgICAgc3RyQWRkciA9IDAsXG4gICAgICAgICAgICBzdWJTdHJBZGRyID0gMCxcbiAgICAgICAgICAgIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIGhhbmRsZVZhbCwgaWR4LCBhcnJsZW4sIGVycm9yQ29kZSwgcmV0dXJuTGVuO1xuXG4gICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcFJkRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG5cbiAgICAgICAgLy9SZWFkIHRoZSBlcnJvciBjb2RlcyBhbmQgdGhlIHJldHVybiBsZW5ndGggb2YgdGhlIEFEUyBzdWIgY29tbWFuZHMuXG4gICAgICAgIGZvciAoaWR4ID0gMCwgYXJybGVuID0gYXJyU3ltTmFtZXMubGVuZ3RoOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCA0KTtcbiAgICAgICAgICAgIGVycm9yQ29kZSA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuICAgICAgICAgICAgc3RyQWRkciArPSA0O1xuXG4gICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICByZXR1cm5MZW4gPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcbiAgICAgICAgICAgIHN0ckFkZHIgKz0gNDtcblxuICAgICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEVycm9yIHdoaWxlIHJlYWRpbmcgYSBoYW5kbGUgZnJvbSB0aGUgUExDIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBjb2RlOiAnICsgZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnSGFuZGxlOiAnICsgYXJyU3ltTmFtZXNbaWR4XSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0hhbmRsZSByZXF1ZXN0IGFib3J0ZWQhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vUnVuIHRocm91Z2ggdGhlIGVsZW1lbnRzIGluIHRoZSBzeW1ib2xOYW1lIGxpc3QsXG4gICAgICAgIC8vZ2V0IHRoZSBkYXRhIG91dCBvZiB0aGUgc3RyaW5nIGFuZCBzdG9yZSBpdCBpbiB0aGUgY2FjaGUuXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAvL1NsaWNlIHRoZSBzdHJpbmcgYW5kIGRlY29kZSB0aGUgZGF0YVxuICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIDQpO1xuICAgICAgICAgICAgaGFuZGxlVmFsID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG4gICAgICAgICAgICBzdHJBZGRyICs9IDQ7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FjaGVbYXJyU3ltTmFtZXNbaWR4XV0gPSBoYW5kbGVWYWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZUNhY2hlUmVhZHkgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogSGFuZGxlIGNhY2hlIHJlYWR5LicpO1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlU2luZ2xlKG1ldGhvZCwgdHlwZSwgYXJncykge1xuICAgICAgICBsZXQgcmVxRGVzY3IgPSB0aGlzLmNyZWF0ZVNpbmdsZURlc2NyaXB0b3IobWV0aG9kLCB0eXBlLCBhcmdzKVxuICAgICAgICBsZXQgYWRzUmVxID0gdGhpcy53cml0ZVJlcShyZXFEZXNjcilcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSlcbiAgICAgICAgbGV0IHZhbHVlID0gYXdhaXQgdGhpcy5hZHNSZXFTZW5kQXN5bmMoYWRzUmVxKVxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICBhc3luYyByZWFkU2luZ2xlKG1ldGhvZCwgdHlwZSwgYXJncykge1xuICAgICAgICBsZXQgcmVxRGVzY3IgPSB0aGlzLmNyZWF0ZVNpbmdsZURlc2NyaXB0b3IobWV0aG9kLCB0eXBlLCBhcmdzKVxuICAgICAgICBsZXQgYWRzUmVxID0gdGhpcy5yZWFkUmVxKHJlcURlc2NyKVxuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKVxuICAgICAgICBsZXQgdmFsdWUgPSBhd2FpdCB0aGlzLmFkc1JlcVNlbmRBc3luYyhhZHNSZXEpXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIEZ1bmN0aW9ucyBmb3IgQ3JlYXRpbmcgUmVxdWVzdCBEZXNjcmlwdG9yc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gIFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBSZXF1ZXN0IERlc2NyaXB0b3IgZm9yIGEgc2luZ2xlIHZhcmlhYmxlLiBBbiBpdGVtIGxpc3RcbiAgICAgKiB3aXRoIGEgc2luZ2xlIGFycmF5IGl0ZW0gaXMgZ2VuZXJhdGVkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgICBUaGUgbWV0aG9kLCBlaXRoZXIgXCJSZWFkXCIgb3IgXCJXcml0ZVwiLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlICAgICBUaGUgUExDIGRhdGEgdHlwZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAgICAgVGhlIGFyZ3VtZW50cyBmb3IgYnVpbGRpbmcgZm9yIHRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuXG4gICAgICovXG4gICAgY3JlYXRlU2luZ2xlRGVzY3JpcHRvcihtZXRob2QsIHR5cGUsIGFyZ3MpIHtcblxuICAgICAgICB2YXIgcmVxRGVzY3IgPSB7fSxcbiAgICAgICAgICAgIGxlbiwgaXRlbUluZm87XG5cbiAgICAgICAgYXJncy50eXBlID0gdHlwZTsgLy9UbyBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzIGluIGdldEl0ZW1JbmZvcm1hdGlvbigpXG5cbiAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihhcmdzKTtcbiAgICAgICAgbGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICAvL0NoYW5nZSB0aGUgcmVhZCBsZW5ndGggaWYgYSB2YWx1ZSBpcyBnaXZlbi5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKGFyZ3Muc3RybGVuKSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3Muc3RybGVuO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSBhcmdzLnN0cmxlbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtSW5mby5zdHJpbmdMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBsZW47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcgZm9yIHRoaXMgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxlbisrOyAvL1Rlcm1pbmF0aW9uXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdUSU1FJzpcbiAgICAgICAgICAgIGNhc2UgJ1RPRCc6XG4gICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgIGNhc2UgJ0RBVEVfQU5EX1RJTUUnOlxuICAgICAgICAgICAgY2FzZSAnVElNRV9PRl9EQVknOlxuICAgICAgICAgICAgICAgIC8vQXBwZW5kIHRoZSBmb3JtYXQgc3RyaW5nIHRvIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmZvcm1hdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdSRUFMJzpcbiAgICAgICAgICAgIGNhc2UgJ0xSRUFMJzpcbiAgICAgICAgICAgICAgICAvL0FwcGVuZCB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmRlY1BsYWNlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmRlY1BsYWNlcztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmRwID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3MuZHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DcmVhdGUgdGhlIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgICAgcmVxRGVzY3IgPSB7XG4gICAgICAgICAgICBhZGRyOiBhcmdzLmFkZHIsXG4gICAgICAgICAgICBzeW1ib2xOYW1lOiBpdGVtSW5mby5zeW1ib2xOYW1lLFxuICAgICAgICAgICAgZGF0YVR5cGVOYW1lczogaXRlbUluZm8uZGF0YVR5cGVOYW1lcyxcbiAgICAgICAgICAgIGRhdGFUeXBlQXJySWR4OiBpdGVtSW5mby5kYXRhVHlwZUFycklkeCxcbiAgICAgICAgICAgIHN5bWJvbE5hbWVBcnJJZHg6IGl0ZW1JbmZvLnN5bWJvbE5hbWVBcnJJZHgsXG4gICAgICAgICAgICBmdWxsU3ltYm9sTmFtZTogYXJncy5uYW1lLFxuICAgICAgICAgICAgdXNlSGFuZGxlOiBhcmdzLmhhbmRsZSxcbiAgICAgICAgICAgIGlkOiBhcmdzLmlkLFxuICAgICAgICAgICAgb2M6IGFyZ3Mub2MsXG4gICAgICAgICAgICBvY2Q6IGFyZ3Mub2NkLFxuICAgICAgICAgICAgb2U6IGFyZ3Mub2UsXG4gICAgICAgICAgICBvdDogYXJncy5vdCxcbiAgICAgICAgICAgIHJlYWRMZW5ndGg6IGxlbixcbiAgICAgICAgICAgIGRlYnVnOiBhcmdzLmRlYnVnLFxuICAgICAgICAgICAgc3luYzogYXJncy5zeW5jLFxuICAgICAgICAgICAgb2ZmczogYXJncy5vZmZzLFxuICAgICAgICAgICAgc2VxOiB0cnVlLFxuICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgdmFsOiBhcmdzLnZhbCxcbiAgICAgICAgICAgICAgICBqdmFyOiBhcmdzLmp2YXIsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBwcmVmaXg6IGFyZ3MucHJlZml4LFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogYXJncy5zdWZmaXhcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXFEZXNjclxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgUmVxdWVzdCBEZXNjcmlwdG9yIGZvciBhbiBhcnJheS4gQW4gaXRlbSBsaXN0IG9mXG4gICAgICogc2luZ2xlIHZhcmlhYmxlcyBpcyBnZW5lcmF0ZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCAgIFRoZSBtZXRob2QsIGVpdGhlciBcIlJlYWRcIiBvciBcIldyaXRlXCIuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgICAgIFRoZSBkYXRhIHR5cGUgb2YgdGhlIFBMQyB2YXJpYWJsZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAgICAgVGhlIGFyZ3VtZW50cyBmb3IgYnVpbGRpbmcgdGhlIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBjcmVhdGVBcnJheURlc2NyaXB0b3IobWV0aG9kLCB0eXBlLCBhcmdzKSB7XG5cbiAgICAgICAgdmFyIHJlcURlc2NyID0ge30gYXMgYW55LFxuICAgICAgICAgICAgZGF0YU9iaiA9IHt9LFxuICAgICAgICAgICAgYXJyYXlMZW5ndGgsXG4gICAgICAgICAgICBhZGRyT2Zmc2V0LFxuICAgICAgICAgICAgY250ID0gMCxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBsZW4sXG4gICAgICAgICAgICBkZWZBcnIgPSBbXSxcbiAgICAgICAgICAgIGxlbkFyckVsZW0sXG4gICAgICAgICAgICBsYXN0RGVmQXJyLFxuICAgICAgICAgICAgc3RydWN0Qnl0ZUxlbiA9IDAsXG4gICAgICAgICAgICBzdHJsZW4sXG4gICAgICAgICAgICB2bGVuLFxuICAgICAgICAgICAgdmxlbk1heCA9IDAsXG4gICAgICAgICAgICBlbmRQYWRMZW4gPSAwLFxuICAgICAgICAgICAgbW9kLFxuICAgICAgICAgICAgYWRkcixcbiAgICAgICAgICAgIHdydE9uZU9ubHksXG4gICAgICAgICAgICBhcnJTeW1UeXBlLFxuICAgICAgICAgICAgaXRlbUluZm87XG5cbiAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihhcmdzKTtcblxuICAgICAgICAvL0dldCB0aGUgb2JqZWN0IG9mIHRoZSBzdG9yZWQgZGF0YSwgZGlyZWN0IHdpdGggJ3ZhbCdcbiAgICAgICAgLy9mb3IgYSB3cml0ZSByZXF1ZXN0IG9yIHBhcnNpbmcgdGhlIG5hbWUgaWYgJ2p2YXInIGlzIGdpdmVuLlxuICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnICYmIHR5cGVvZiBhcmdzLnZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGRhdGFPYmogPSBhcmdzLnZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJncy5qdmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YU9iaiA9IHRoaXMucGFyc2VWYXJOYW1lKGFyZ3MuanZhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBkYXRhIG9iamVjdCBmb3IgdGhpcyAnICsgbWV0aG9kICsgJy1SZXF1ZXN0IGRlZmluZWQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZ3MuYXJybGVuID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgLy9PdmVycmlkZSBhcnJheSBsZW5ndGggaWYgbWFudWFsbHkgc2V0XG4gICAgICAgICAgICBhcnJheUxlbmd0aCA9IGFyZ3MuYXJybGVuO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1JbmZvLmFycmF5TGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vR2V0IHRoZSBhcnJheSBsZW5ndGggZnJvbSB0aGUgc3ltYm9sIHRhYmxlLlxuICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBpdGVtSW5mby5hcnJheUxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENhblxcJ3QgZ2V0IHRoZSBhcnJheSBsZW5ndGggZm9yIHRoaXMgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGVjayBpZiBvbmx5IG9uZSBpdGVtIHNob3VsZCBiZSB3cml0dGVuLlxuICAgICAgICBpZiAodHlwZW9mIGFyZ3MuaXRlbSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKGFyZ3MuaXRlbSkgJiYgbWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICB3cnRPbmVPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChhcmdzLml0ZW0gPCAwIHx8IGFyZ3MuaXRlbSA+IGFycmF5TGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFdyb25nIHZhbHVlIGZvciBcIml0ZW1cIiEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnaXRlbTogJyArIGFyZ3MuaXRlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ0xhc3QgYXJyYXkgaW5kZXg6ICcgKyAoYXJyYXlMZW5ndGggLSAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRnVuY3Rpb24gZm9yIGNyZWF0aW5nIGFuIGRlc2NyaXB0b3IgZm9yIGFycmF5IG9mIHN0cnVjdHVyZXMuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBjcmVhdGVTdHJ1Y3RBcnIgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBlbGVtO1xuICAgICAgICAgICAgLy9QYXJzZSB0aGUgbmFtZSBvZiB0aGUgc3RydWN0dXJlIGRlZmluaXRvbiwgaWYgaXQgaXMgcGFzc2VkXG4gICAgICAgICAgICAvL2FzIGEgc3RyaW5nLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmRlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBhcmdzLmRlZiA9IHRoaXMucGFyc2VWYXJOYW1lKGFyZ3MuZGVmKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPT09IHRydWUgJiYgYXJncy5kZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFyZ3MuZGVmID0gdGhpcy5jcmVhdGVTdHJ1Y3REZWYoaXRlbUluZm8uZGF0YVR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJncy5kZWYgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gc3RydWN0dXJlIGRlZmluaXRpb24gZm91bmQhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBsZW5ndGggb2YgdGhlIHN0cnVjdHVyZSBhbmQgdGhlIHBhZGRpbmcgYnl0ZXNcbiAgICAgICAgICAgIGZvciAoZWxlbSBpbiBhcmdzLmRlZikge1xuXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGVmLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9TZXBhcmF0ZSBkYXRhIHR5cGUgYW5kIGxlbmd0aC5cbiAgICAgICAgICAgICAgICAgICAgZGVmQXJyID0gYXJncy5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyWzBdID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5BcnJFbGVtID0gcGFyc2VJbnQoZGVmQXJyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZBcnIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZkFyci5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuQXJyRWxlbTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyWzBdID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmQXJyWzFdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmxlbiA9ICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSA/IHN0cmxlbiA6IHRoaXMucGxjVHlwZUxlbltkZWZBcnJbMF1dKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZsZW4gPSB0aGlzLnBsY1R5cGVMZW5bZGVmQXJyWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB2bGVuID4gMSAmJiBkZWZBcnJbMF0gIT09ICdTVFJJTkcnICYmIHN0cnVjdEJ5dGVMZW4gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kID0gc3RydWN0Qnl0ZUxlbiAlIHZsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RydWN0Qnl0ZUxlbiArPSB2bGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cnVjdEJ5dGVMZW4gKz0gdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1N0b3JlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICAvL2ZvciBpbnNlcnRpbmcgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdmxlbiA+IHZsZW5NYXggJiYgZGVmQXJyWzBdICE9PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmxlbk1heCA9IHZsZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB2bGVuTWF4ID4gMSAmJiBkZWZBcnJbMF0gIT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZsZW5NYXggPiB0aGlzLmFsaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2bGVuTWF4ID0gdGhpcy5hbGlnbm1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZCA9IHN0cnVjdEJ5dGVMZW4gJSB2bGVuTWF4O1xuICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZFBhZExlbiA9IHZsZW5NYXggLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgIHN0cnVjdEJ5dGVMZW4gKz0gZW5kUGFkTGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9TZXQgdGhlIGFkZHJlc3Mgb2Zmc2V0IGFuZCB0aGUgbGVuZ3RoIHRvIDEgXG4gICAgICAgICAgICAvL2lmIG9ubHkgb25lIGl0ZW0gc2hvdWxkIGJlIHNlbnQuXG4gICAgICAgICAgICBpZiAod3J0T25lT25seSkge1xuICAgICAgICAgICAgICAgIGFkZHJPZmZzZXQgPSBzdHJ1Y3RCeXRlTGVuICogYXJncy5pdGVtO1xuICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxRGVzY3IgPSB7XG4gICAgICAgICAgICAgICAgYWRkcjogYXJncy5hZGRyLFxuICAgICAgICAgICAgICAgIHN5bWJvbE5hbWU6IGl0ZW1JbmZvLnN5bWJvbE5hbWUsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVOYW1lczogaXRlbUluZm8uZGF0YVR5cGVOYW1lcyxcbiAgICAgICAgICAgICAgICBmdWxsU3ltYm9sTmFtZTogYXJncy5uYW1lLFxuICAgICAgICAgICAgICAgIGFkZHJPZmZzZXQ6IGFkZHJPZmZzZXQsXG4gICAgICAgICAgICAgICAgdXNlSGFuZGxlOiBhcmdzLmhhbmRsZSxcbiAgICAgICAgICAgICAgICBpZDogYXJncy5pZCxcbiAgICAgICAgICAgICAgICBvYzogYXJncy5vYyxcbiAgICAgICAgICAgICAgICBvY2Q6IGFyZ3Mub2NkLFxuICAgICAgICAgICAgICAgIG9lOiBhcmdzLm9lLFxuICAgICAgICAgICAgICAgIG90OiBhcmdzLm90LFxuICAgICAgICAgICAgICAgIGRlYnVnOiBhcmdzLmRlYnVnLFxuICAgICAgICAgICAgICAgIHJlYWRMZW5ndGg6IHN0cnVjdEJ5dGVMZW4gKiBhcnJheUxlbmd0aCxcbiAgICAgICAgICAgICAgICBzZXE6IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsY0FsaWdubWVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkYXRhT2JqOiBkYXRhT2JqLFxuICAgICAgICAgICAgICAgIHN5bmM6IGFyZ3Muc3luYyxcbiAgICAgICAgICAgICAgICBvZmZzOiBhcmdzLm9mZnMsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgaXRlbSBsaXN0LlxuICAgICAgICAgICAgLy9BbHRob3VnaCBqdmFyIGlzbid0IG5lY2Vzc2FyeSBmb3Igd3JpdGUgcmVxdWVzdHMsXG4gICAgICAgICAgICAvL2l0J3MgZ29vZCBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gYXJncy5kZWYpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5kZWYuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyID0gYXJncy5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbkFyckVsZW0gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGVmQXJyID0gZGVmQXJyLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGVuQXJyRWxlbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhcjogaSArICcuJyArIGVsZW0gKyBqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl0gKyAnLicgKyBkZWZBcnJbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhcjogaSArICcuJyArIGVsZW0gKyAnLicgKyBqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl0gKyAnLicgKyBkZWZBcnJbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3cnRPbmVPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbYXJncy5pdGVtXVtlbGVtICsgal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2FyZ3MuaXRlbV1bZWxlbV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialtpXVtlbGVtICsgal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2ldW2VsZW1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGkgKyAnLicgKyBlbGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBhcmdzLmRlZltlbGVtXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod3J0T25lT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2FyZ3MuaXRlbV1bZWxlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbaV1bZWxlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TZXQgYW4gaXRlbSBhcyBhIG1hcmsgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgLy9mb3IgaW5zZXJ0aW5nIHBhZGRpbmcgYnl0ZXMgaW4gXCJ3cml0ZVJlcVwiIGFuZCBcInJlYWRSZXFcIiBsYXRlci5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRW5kU3RydWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogZW5kUGFkTGVuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBkZXNjcmlwdG9yIGZvciBhIHNpbXBsZSBhcnJheS5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGNyZWF0ZVNpbXBsZUFyciA9ICgpID0+IHtcbiAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihhcmdzLnN0cmxlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hhbmdlIHRoZSByZWFkIGxlbmd0aCBpZiBhIHZhbHVlIGlzIGdpdmVuLlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLnN0cmxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IGFyZ3Muc3RybGVuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtSW5mby5zdHJpbmdMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGxlbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgc3RyaW5nIGZvciB0aGlzIHJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZW4rKzsgLy9UZXJtaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdUSU1FJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUT0QnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RUJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEQVRFX0FORF9USU1FJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUSU1FX09GX0RBWSc6XG4gICAgICAgICAgICAgICAgICAgIC8vQXBwZW5kIHRoZSBmb3JtYXQgc3RyaW5nIHRvIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncy5mb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3MuZm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JFQUwnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0xSRUFMJzpcbiAgICAgICAgICAgICAgICAgICAgLy9BcHBlbmQgdGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB0byB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3MuZGVjUGxhY2VzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmRlY1BsYWNlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgYXJncy5kcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5kcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9TZXQgdGhlIGFkZHJlc3Mgb2Zmc2V0IGFuZCB0aGUgbGVuZ3RoIHRvIDEgXG4gICAgICAgICAgICAvL2lmIG9ubHkgb25lIGl0ZW0gc2hvdWxkIGJlIHNlbnQuXG4gICAgICAgICAgICBpZiAod3J0T25lT25seSkge1xuICAgICAgICAgICAgICAgIGFkZHJPZmZzZXQgPSBhcmdzLml0ZW0gKiBsZW47XG4gICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXFEZXNjciA9IHtcbiAgICAgICAgICAgICAgICBhZGRyOiBhcmdzLmFkZHIsXG4gICAgICAgICAgICAgICAgc3ltYm9sTmFtZTogaXRlbUluZm8uc3ltYm9sTmFtZSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZU5hbWVzOiBpdGVtSW5mby5kYXRhVHlwZU5hbWVzLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlQXJySWR4OiBpdGVtSW5mby5kYXRhVHlwZUFycklkeCxcbiAgICAgICAgICAgICAgICBzeW1ib2xOYW1lQXJySWR4OiBpdGVtSW5mby5zeW1ib2xOYW1lQXJySWR4LFxuICAgICAgICAgICAgICAgIGZ1bGxTeW1ib2xOYW1lOiBhcmdzLm5hbWUsXG4gICAgICAgICAgICAgICAgdXNlSGFuZGxlOiBhcmdzLmhhbmRsZSxcbiAgICAgICAgICAgICAgICBhZGRyT2Zmc2V0OiBhZGRyT2Zmc2V0LFxuICAgICAgICAgICAgICAgIGlkOiBhcmdzLmlkLFxuICAgICAgICAgICAgICAgIG9jOiBhcmdzLm9jLFxuICAgICAgICAgICAgICAgIG9jZDogYXJncy5vY2QsXG4gICAgICAgICAgICAgICAgb2U6IGFyZ3Mub2UsXG4gICAgICAgICAgICAgICAgb3Q6IGFyZ3Mub3QsXG4gICAgICAgICAgICAgICAgcmVhZExlbmd0aDogbGVuICogYXJyYXlMZW5ndGgsXG4gICAgICAgICAgICAgICAgZGVidWc6IGFyZ3MuZGVidWcsXG4gICAgICAgICAgICAgICAgc2VxOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGFPYmo6IGRhdGFPYmosXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgaXRlbSBsaXN0LlxuICAgICAgICAgICAgLy9BbHRob3VnaCBqdmFyIGlzbid0IG5lY2Vzc2FyeSBmb3Igd3JpdGUgcmVxdWVzdHMsXG4gICAgICAgICAgICAvL2l0J3MgZ29vZCBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGp2YXI6IGksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdydE9uZU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2ldLnZhbCA9IGRhdGFPYmpbYXJncy5pdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2ldLnZhbCA9IGRhdGFPYmpbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0eXBlID09PSAnU1RSVUNUJykge1xuICAgICAgICAgICAgY3JlYXRlU3RydWN0QXJyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGVTaW1wbGVBcnIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgdGhpcy53cml0ZVJlcShyZXFEZXNjcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRSZXEocmVxRGVzY3IpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBSZXF1ZXN0IERlc2NyaXB0b3IgZm9yIGEgc3RydWN0dXJlLFxuICAgICAqIGEgc3RydWN0dXJlIGRlZmluaXRpb24gaGFzIHRvIGJlIHBhc3NlZCBhcyBvbmUgb2YgdGhlIGFyZ3VtZW50cyxcbiAgICAgKiBmcm9tIHdpY2ggdGhlIGl0ZW0gbGlzdCBpcyBjcmVhdGVkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgICBUaGUgbWV0aG9kLCBlaXRoZXIgXCJSZWFkXCIgb3IgXCJXcml0ZVwiLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzICAgICBUaGUgYXJndW1lbnRzIGZvciBidWlsZGluZyB0aGUgUmVxdWVzdCBEZXNjcmlwdG9yLlxuICAgICAqL1xuICAgIGNyZWF0ZVN0cnVjdERlc2NyaXB0b3IobWV0aG9kLCBhcmdzKSB7XG5cbiAgICAgICAgdmFyIHJlcURlc2NyID0ge30gYXMgYW55LCAgICAgIC8vUmVxdWVzdCBEZXNjcmlwdG9yXG4gICAgICAgICAgICBkYXRhT2JqID0ge30sICAgICAgIC8vb2JqZWN0IHdpY2ggaG9sZHMgdGhlIGRhdGEgZm9yIHdyaXRlIHJlcXVlc3RzIFxuICAgICAgICAgICAgZGVmQXJyID0gW10sICAgICAgICAvL3N1YmVsZW1lbnRzIG9mIGEgc3RydWN0dXJlIGRlZmluaXRpb24gaXRlbVxuICAgICAgICAgICAgY250ID0gMCxcbiAgICAgICAgICAgIGxhc3REZWZBcnIsXG4gICAgICAgICAgICBsZW5BcnJFbGVtLFxuICAgICAgICAgICAgZWxlbSxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBpdGVtSW5mbztcblxuICAgICAgICBpdGVtSW5mbyA9IHRoaXMuZ2V0SXRlbUluZm9ybWF0aW9uKGFyZ3MpO1xuXG4gICAgICAgIC8vR2V0IHRoZSBvYmplY3Qgb2YgdGhlIHN0b3JlZCBkYXRhLCBkaXJlY3Qgd2l0aCAndmFsJ1xuICAgICAgICAvL2ZvciBhIHdyaXRlIHJlcXVlc3Qgb3IgcGFyc2luZyB0aGUgbmFtZSBpZiAnanZhcicgaXMgZ2l2ZW4uXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScgJiYgdHlwZW9mIGFyZ3MudmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZGF0YU9iaiA9IGFyZ3MudmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmp2YXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhT2JqID0gdGhpcy5wYXJzZVZhck5hbWUoYXJncy5qdmFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIGRhdGEgb2JqZWN0IGZvciB0aGlzICcgKyBtZXRob2QgKyAnLVJlcXVlc3QgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIHN0cnVjdHVyZSBkZWZpbml0b24sIGlmIGl0IGlzIHBhc3NlZFxuICAgICAgICAvL2FzIGEgc3RyaW5nLlxuICAgICAgICBpZiAodHlwZW9mIGFyZ3MuZGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYXJncy5kZWYgPSB0aGlzLnBhcnNlVmFyTmFtZShhcmdzLmRlZik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPT09IHRydWUgJiYgYXJncy5kZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXJncy5kZWYgPSB0aGlzLmNyZWF0ZVN0cnVjdERlZihpdGVtSW5mby5kYXRhVHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MuZGVmICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gc3RydWN0dXJlIGRlZmluaW5pdGlvbiBmb3VuZCAoY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCkpIScpO1xuICAgICAgICAgICAgdGhpcy5sb2coYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXFEZXNjciA9IHtcbiAgICAgICAgICAgIGFkZHI6IGFyZ3MuYWRkcixcbiAgICAgICAgICAgIHN5bWJvbE5hbWU6IGl0ZW1JbmZvLnN5bWJvbE5hbWUsXG4gICAgICAgICAgICBkYXRhVHlwZU5hbWVzOiBpdGVtSW5mby5kYXRhVHlwZU5hbWVzLFxuICAgICAgICAgICAgZGF0YVR5cGVBcnJJZHg6IGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4LFxuICAgICAgICAgICAgc3ltYm9sTmFtZUFycklkeDogaXRlbUluZm8uc3ltYm9sTmFtZUFycklkeCxcbiAgICAgICAgICAgIGZ1bGxTeW1ib2xOYW1lOiBhcmdzLm5hbWUsXG4gICAgICAgICAgICB1c2VIYW5kbGU6IGFyZ3MuaGFuZGxlLFxuICAgICAgICAgICAgaWQ6IGFyZ3MuaWQsXG4gICAgICAgICAgICBvYzogYXJncy5vYyxcbiAgICAgICAgICAgIG9jZDogYXJncy5vY2QsXG4gICAgICAgICAgICBvZTogYXJncy5vZSxcbiAgICAgICAgICAgIG90OiBhcmdzLm90LFxuICAgICAgICAgICAgZGVidWc6IGFyZ3MuZGVidWcsXG4gICAgICAgICAgICBzZXE6IHRydWUsXG4gICAgICAgICAgICBjYWxjQWxpZ25tZW50OiB0cnVlLFxuICAgICAgICAgICAgZGF0YU9iajogZGF0YU9iaixcbiAgICAgICAgICAgIHN5bmM6IGFyZ3Muc3luYyxcbiAgICAgICAgICAgIG9mZnM6IGFyZ3Mub2ZmcyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vQ3JlYXRlIHRoZSBpdGVtIGxpc3QuXG4gICAgICAgIC8vQWx0aG91Z2gganZhciBpc24ndCBuZWNlc3NhcnkgZm9yIHdyaXRlIHJlcXVlc3RzLFxuICAgICAgICAvL2l0J3MgZ29vZCBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAgICAgICAgZm9yIChlbGVtIGluIGFyZ3MuZGVmKSB7XG5cbiAgICAgICAgICAgIGlmIChhcmdzLmRlZi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuXG4gICAgICAgICAgICAgICAgZGVmQXJyID0gYXJncy5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbMF0gPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IHBhcnNlSW50KGRlZkFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBsYXN0RGVmQXJyID0gZGVmQXJyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5BcnJFbGVtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyOiBlbGVtICsgalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdICsgJy4nICsgZGVmQXJyWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGVsZW0gKyAnLicgKyBqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl0gKyAnLicgKyBkZWZBcnJbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialtlbGVtICsgal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2VsZW1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGVsZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBhcmdzLmRlZltlbGVtXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbZWxlbV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9DYWxsIHRoZSBzZW5kIGZ1bmN0aW9uXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVSZXEocmVxRGVzY3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWFkUmVxKHJlcURlc2NyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFB1YmxpYyBNZXRob2RzXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgd3JpdGUgcmVxdWVzdC4gRGVwZW5kaW5nIG9uIHRoZVxuICAgICAqIHZhbHVlcyBhbmQgUExDIGRhdGEgdHlwZXMgcGFzc2VkIGluIHRoZSB2YXJpYWJsZSBsaXN0IGEgYnl0ZSBhcnJheSBpc1xuICAgICAqIGNyZWF0ZWQgYW5kIHRoZSBmdW5jdGlvbiBmb3Igc2VuZGluZyB0aGUgcmVxdWVzdCBpcyBjYWxsZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICByZXFEZXNjciAgICBUaGUgUmVxdWVzdCBEZXNjcmlwdG9yLiBCZXNpZGVzIG90aGVyIGluZm9ybWF0aW9uXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9iamVjdCBjb250YWlucyB0aGUgYWxsb2NhdGlvbiBvZiBQTEMgYW5kXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IHZhcmlhYmxlcyBpbiBhbiBpdGVtIGxpc3QuXG4gICAgICovXG4gICAgd3JpdGVSZXEocmVxRGVzY3IpIHtcblxuICAgICAgICB2YXIgaXRlbUxpc3QgPSByZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgcERhdGEgPSBbXSBhcyBhbnksXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICBieXRlcyA9IFtdLFxuICAgICAgICAgICAgdHlwZSwgZm9ybWF0LCBsaXN0bGVuLCBsZW4sIHZhbCwgcGNvdW50LCBtb2QsIGl0ZW0sIGksIGlkeDtcblxuICAgICAgICAvL1NldCB0aGUgdmFyaWFibGUgbmFtZSB0byB1cHBlciBjYXNlLlxuICAgICAgICBpZiAodHlwZW9mIHJlcURlc2NyLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXFEZXNjci5uYW1lID0gcmVxRGVzY3IubmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9SdW4gdGhyb3VnaCB0aGUgZWxlbWVudHMgaW4gdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgZm9yIChpZHggPSAwLCBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICBhcnJUeXBlID0gdGhpcy5nZXRUeXBlQW5kRm9ybWF0KGl0ZW0pO1xuICAgICAgICAgICAgdHlwZSA9IGFyclR5cGVbMF07XG4gICAgICAgICAgICBmb3JtYXQgPSBhcnJUeXBlWzFdO1xuXG4gICAgICAgICAgICAvL0xlbmd0aCBvZiB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgLy9NYXhpbXVtIGxlbmdodCBpcyBsaW1pdGVkIHRvIDQgKGR1ZSB0byBzdHJ1Y3R1cmUgcGFkZGluZyksXG4gICAgICAgICAgICAvL3RoZSBsZW5naHQgb2Ygc3RyaW5ncyBpcyBjYWxjdWxhdGVkIGxhdGVyLlxuICAgICAgICAgICAgaWYgKGlzTmFOKHRoaXMucGxjVHlwZUxlblt0eXBlXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSBsZW5ndGggb2YgdGhlIGRhdGEgdHlwZTogJyArIHR5cGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFByb2JhYmx5IHdyb25nIHR5cGUgZGVmaW5pdGlvbi4gUGxlYXNlIGNoZWNrIHRoZSBtYW51YWwuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxRGVzY3IpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9QYWRkaW5nIHdpdGhpbiBzdHJ1Y3R1cmVzLlxuICAgICAgICAgICAgLy9cImNhbGNBbGlnbm1lbnRcIiBpcyBvbmx5IHNldCBpbiBcIndyaXRlU3RydWN0L3JlYWRTdHJ1Y3RcIiBhbmRcbiAgICAgICAgICAgIC8vXCJ3cml0ZUFycmF5T2ZTdHJ1Y3QvcmVhZEFycmF5T2ZTdHJ1Y3RcIlxuICAgICAgICAgICAgbGVuID0gKHRoaXMucGxjVHlwZUxlblt0eXBlXSA8IHRoaXMuYWxpZ25tZW50KSA/IHRoaXMucGxjVHlwZUxlblt0eXBlXSA6IHRoaXMuYWxpZ25tZW50O1xuXG4gICAgICAgICAgICBpZiAocmVxRGVzY3IuY2FsY0FsaWdubWVudCA9PT0gdHJ1ZSAmJiBsZW4gPiAxICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnICYmIHBEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBtb2QgPSBwRGF0YS5sZW5ndGggJSBsZW47XG4gICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGNvdW50ID0gbGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IHBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwRGF0YS5wdXNoKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NvbnZlcnQgZGF0YSwgZGVwZW5kaW5nIG9uIHRoZSB0eXBlXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ0VuZFN0cnVjdCcpIHtcbiAgICAgICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAvL1wiRW5kU3RydWN0XCIgaXMgb25seSB1c2VkIHdpdGggXCJyZWFkQXJyYXlPZlN0cnVjdHVyZXMvd3JpdGVBcnJheU9mU3RydWN0dXJlc1wiLlxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDE7IGkgPD0gaXRlbS52YWw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwRGF0YS5wdXNoKDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRhIHRvIGEgYnl0ZSBhcnJheS5cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGl0ZW0sIHR5cGUsIGZvcm1hdCwgdGhpcy5wbGNUeXBlTGVuW3R5cGVdKTtcbiAgICAgICAgICAgICAgICAvL1N1bW1hcmlzZSB0aGUgZGF0YS4gICAgIFxuICAgICAgICAgICAgICAgIHBEYXRhID0gcERhdGEuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ29udmVydCB0aGUgZGF0YSB0byBCYXNlNjQuXG4gICAgICAgIGlmIChwRGF0YSAmJiBwRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHBEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnV3JpdGUnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5nZXRJbmRleEdyb3VwKHJlcURlc2NyKSxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiB0aGlzLmdldEluZGV4T2Zmc2V0KHJlcURlc2NyKSxcbiAgICAgICAgICAgIHBEYXRhOiBwRGF0YSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYWRzUmVxXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgcmVhZCByZXF1ZXN0LiBJZiBubyB2YWx1ZSBmb3IgdGhlXG4gICAgICogZGF0YSBsZW5ndGggaXN0IHBhc3NlZCwgY2FsY3VsYXRlIHRoZSB2YWx1ZSBhbmQgdGhlbiBjYWxsIHRoZSBmdW5jdGlvbiBcbiAgICAgKiBmb3Igc2VuZGluZyB0aGUgcmVxdWVzdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gIHJlcURlc2NyICAgIFRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuIEJlc2lkZXMgb3RoZXIgaW5mb3JtYXRpb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb2JqZWN0IGNvbnRhaW5zIHRoZSBhbGxvY2F0aW9uIG9mIFBMQyBhbmRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEphdmFTY3JpcHQgdmFyaWFibGVzIGluIGFuIGl0ZW0gbGlzdC5cbiAgICAgKi9cbiAgICByZWFkUmVxKHJlcURlc2NyKSB7XG5cbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgaXRlbUxpc3QgPSByZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIGl0ZW0sIGZvcm1hdCwgdHlwZSwgbGlzdGxlbiwgbW9kLCB2bGVuLCBzdHJsZW4sIGlkeCwgc3RhcnRhZGRyO1xuXG4gICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBkYXRhIGxlbmd0aCBpZiBubyBhcmd1bWVudCBpcyBnaXZlbi5cbiAgICAgICAgaWYgKHR5cGVvZiByZXFEZXNjci5yZWFkTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gMDtcblxuICAgICAgICAgICAgZm9yIChpZHggPSAwLCBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0eXBlIGFuZCBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgICAgICAgICAgICBhcnJUeXBlID0gdGhpcy5nZXRUeXBlQW5kRm9ybWF0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBhcnJUeXBlWzBdO1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGFyclR5cGVbMV07XG5cbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGUuXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHRoaXMucGxjVHlwZUxlblt0eXBlXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGU6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUHJvYmFibHkgd3JvbmcgdHlwZSBkZWZpbml0aW9uLiBQbGVhc2UgY2hlY2sgdGhlIG1hbnVhbC4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxRGVzY3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IHBhcnNlSW50KGZvcm1hdCwgMTApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZsZW4gPSAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKHN0cmxlbikgPyBzdHJsZW4gOiB0aGlzLnBsY1R5cGVMZW5bdHlwZV0pICsgMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2bGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXFEZXNjci5zZXEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlcyBpZiBjb250aW51b3VzbHkgYWRkcmVzc2luZyBpcyB1c2VkLlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxRGVzY3IuY2FsY0FsaWdubWVudCA9PT0gdHJ1ZSAmJiB2bGVuID4gMSAmJiB0eXBlICE9PSAnRW5kU3RydWN0JyAmJiB0eXBlICE9PSAnU1RSSU5HJyAmJiByZXFEZXNjci5yZWFkTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kID0gcmVxRGVzY3IucmVhZExlbmd0aCAlIHZsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggKz0gdmxlbiAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoICs9IHZsZW47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9MYXN0IGVsZW1lbnQgaWYgc2luZ2xlIGFkZHJlc3NlcyBhcmUgZ2l2ZW4uXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0YWRkciA9IHRoaXMuZ2V0SW5kZXhPZmZzZXQocmVxRGVzY3IpO1xuICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gdmxlbiArIGl0ZW0uYWRkciAtIHN0YXJ0YWRkcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZCcsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmdldEluZGV4R3JvdXAocmVxRGVzY3IpLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IHRoaXMuZ2V0SW5kZXhPZmZzZXQocmVxRGVzY3IpLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhZHNSZXFcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzdW0gcmVhZCByZXF1ZXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgcmVxRGVzY3IgICAgVGhlIFJlcXVlc3QgRGVzY3JpcHRvci4gQmVzaWRlcyBvdGhlciBpbmZvcm1hdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGFsbG9jYXRpb24gb2YgUExDIGFuZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSmF2YVNjcmlwdCB2YXJpYWJsZXMgaW4gYW4gaXRlbSBsaXN0LlxuICAgICAqL1xuICAgIHN1bVJlYWRSZXEocmVxRGVzY3IpIHtcbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgaXRlbUxpc3QgPSByZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IFtdLFxuICAgICAgICAgICAgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGgsXG4gICAgICAgICAgICBkdW1teSA9IHt9IGFzIGFueSxcbiAgICAgICAgICAgIHR5cGUsIGZvcm1hdCwgaXRlbSwgaWR4LCBsZW4sIHB3ckRhdGEsIGl0ZW1JbmZvO1xuXG4gICAgICAgIC8vUHJlc2V0IHRoZSByZWFkIGxlbnRoIHdpdGggdGhlIG51bWJlciBvZiBieXRlIGZvciBlcnJvciBjb2Rlcy5cbiAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCA9IGxpc3RsZW4gKiA0O1xuXG4gICAgICAgIC8vQnVpbGQgdGhlIFJlcXVlc3QgQnVmZmVyXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oaXRlbSk7XG5cbiAgICAgICAgICAgIC8vTGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zaXplO1xuXG4gICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoICs9IGxlbjtcblxuICAgICAgICAgICAgLy9CdWlsZCB0aGUgcmVxdWVzdCBidWZmZXIuXG4gICAgICAgICAgICAvL1RoZSBmdW5jdGlvbiBkYXRhVG9CeXRlQXJyYXkgZXhwZWN0cyBhbiBpdGVtIHdpdGggYSB2YWx1ZSBmb3JcbiAgICAgICAgICAgIC8vY29udmVydGluZywgc28gYSBkdW1teSBvYmplY3QgaXMgdXNlZCBoZXJlLlxuICAgICAgICAgICAgZHVtbXkudmFsID0gdGhpcy5nZXRJbmRleEdyb3VwKGl0ZW1JbmZvKTtcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksICdVRElOVCcsIGZvcm1hdCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgZHVtbXkudmFsID0gdGhpcy5nZXRJbmRleE9mZnNldChpdGVtSW5mbyk7XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IGxlbjtcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksICdVRElOVCcsIGZvcm1hdCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy9Db252ZXJ0IHRoZSByZXF1ZXN0IGJ1ZmZlciB0byBCYXNlNjQgY29kZWQgZGF0YS5cbiAgICAgICAgaWYgKHJlcUJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwd3JEYXRhID0gdGhpcy5lbmNvZGVCYXNlNjQocmVxQnVmZmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZFdyaXRlJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuaW5kZXhHcm91cHMuU3VtUmQsXG4gICAgICAgICAgICBpbmRleE9mZnNldDogaXRlbUxpc3QubGVuZ3RoLFxuICAgICAgICAgICAgcHdyRGF0YTogcHdyRGF0YSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgc3VtIHdyaXRlIHJlcXVlc3QuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICByZXFEZXNjciAgICBUaGUgUmVxdWVzdCBEZXNjcmlwdG9yLiBCZXNpZGVzIG90aGVyIGluZm9ybWF0aW9uXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9iamVjdCBjb250YWlucyB0aGUgYWxsb2NhdGlvbiBvZiBQTEMgYW5kXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IHZhcmlhYmxlcyBpbiBhbiBpdGVtIGxpc3QuXG4gICAgICovXG4gICAgc3VtV3JpdGVSZXEocmVxRGVzY3IpIHtcbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgaXRlbUxpc3QgPSByZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IFtdLFxuICAgICAgICAgICAgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGgsXG4gICAgICAgICAgICBkdW1teSA9IHt9IGFzIGFueSxcbiAgICAgICAgICAgIHZsZW5NYXggPSAwLFxuICAgICAgICAgICAgdHlwZSwgZm9ybWF0LCBpdGVtLCBpZHgsIGxlbiwgcHdyRGF0YSwgaSwgaywgYXJyYXlMZW5ndGgsIG1vZCwgcGNvdW50LCBpdGVtSW5mbztcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbiBmb3IgZ2V0dGluZyB0aGUgbGVuZ3RoIG9mIGEgdmFyaWFibGUuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBnZXRWYXJMZW5ndGggPSAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RybGVuO1xuXG4gICAgICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBwYXJzZUludChmb3JtYXQsIDEwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtSW5mby5zdHJpbmdMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihzdHJsZW4pID8gc3RybGVuIDogbGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICAqIFBhcnNlIHRoZSBzdHVjdHVyZSBkZWZpbml0aW9uLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcGFyc2VTdHJ1Y3QgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBqLCBkZWZBcnIsIGxlbkFyckVsZW0sIGxhc3REZWZBcnIsIG1vZCwgZWxlbSwgc3ViQnVmZmVyID0gW107XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRnVuY3Rpb24gZm9yIGFkZGluZyBwYWRkaW5nIGJ5dGVzIGlmIGFuIGFsaWdubWVudCBpcyB1c2VkLiBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgY2hlY2tBbGlnbm1lbnQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmxlbiwgaztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdHlwZSAhPT0gJ1NUUklORycgJiYgdHlwZSAhPT0gJ0VuZFN0cnVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIGxlbmd0aCBmb3IgY2FsY3VsYXRpbmcgcGFkZGluZyBieXRlc1xuICAgICAgICAgICAgICAgICAgICB2bGVuID0gbGVuIDwgdGhpcy5hbGlnbm1lbnQgPyBsZW4gOiB0aGlzLmFsaWdubWVudDtcblxuICAgICAgICAgICAgICAgICAgICAvL0NvbXB1dGUgdGhlIHBhZGRpbmcgYnl0ZXMgZm9yIHRoZSBhbGlnbm1lbnQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2bGVuID4gMSAmJiBzdWJCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kID0gc3ViQnVmZmVyLmxlbmd0aCAlIHZsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBjb3VudCA9IHZsZW4gLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChrID0gMTsgayA8PSBwY291bnQ7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJCdWZmZXIucHVzaCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL1N0b3JlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICAvL2ZvciBpbnNlcnRpbmcgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2bGVuID4gdmxlbk1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmxlbk1heCA9IHZsZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2hlY2sgc3RydWN0dXJlIGRlZmluaXRpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kZWYgPSB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmRlZik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID09PSB0cnVlICYmIGl0ZW0uZGVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmRlZiA9IHRoaXMuY3JlYXRlU3RydWN0RGVmKGl0ZW1JbmZvLmRhdGFUeXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZGVmICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIHN0cnVjdHVyZSBkZWZpbmluaXRpb24gZm91bmQgKHN1bVdyaXRlUmVxKCkpIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1dhbGsgdGhyb3VnaCB0aGUgc3RydWN0dXJlIGRlZmluaXRvblxuICAgICAgICAgICAgZm9yIChlbGVtIGluIGl0ZW0uZGVmKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kZWYuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyID0gaXRlbS5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbkFyckVsZW0gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGVmQXJyID0gZGVmQXJyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbkFyckVsZW07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gZGVmQXJyWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZGVmQXJyLnNsaWNlKDMsIC0xKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZGVmQXJyLnNsaWNlKDMpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQWRkIGluZGV4IGluIGNhc2Ugb2YgYW4gYXJyYXkgb2Ygc3RydWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkudmFsID0gaXRlbS52YWxbaV1bZWxlbSArIGpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1teS52YWwgPSBpdGVtLnZhbFtpXVtlbGVtXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2VsZW1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VmFyTGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxpZ25tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksIHR5cGUsIGZvcm1hdCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViQnVmZmVyID0gc3ViQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgd2UgYXJlIGluIGFuIGFycmF5IG9mIHN0cnVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2ldW2VsZW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2VsZW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBkZWZBcnJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyci5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkFyclsxXSA9IGRlZkFyci5zbGljZSgxKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRWYXJMZW5ndGgoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxpZ25tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgdHlwZSwgZm9ybWF0LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkJ1ZmZlciA9IHN1YkJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBzZXQgdmFsdWVzIGZvciBhIHN0cnVjdHVyZSBpbiBTdW1Xcml0ZVJlcTogJyArIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdmxlbk1heCA+IDEgJiYgZGVmQXJyWzBdICE9PSAnU1RSSU5HJyAmJiBkZWZBcnJbMF0gIT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgbW9kID0gc3ViQnVmZmVyLmxlbmd0aCAlIHZsZW5NYXg7XG4gICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGNvdW50ID0gdmxlbk1heCAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChrID0gMTsgayA8PSBwY291bnQ7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViQnVmZmVyLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQWRkIHRoZSBzdWJQdWZmZXIgd2l0aCB0aGUgc3RydWN0dXJlIGRhdGEgdG8gdGhlIHJlcXVlc3QgYnVmZmVyLlxuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChzdWJCdWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9QcmVzZXQgdGhlIHJlYWQgbGVuZ3RoIHdpdGggdGhlIG51bWJlciBvZiBieXRlIGZvciBlcnJvciBjb2Rlcy5cbiAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCA9IGxpc3RsZW4gKiA0O1xuXG4gICAgICAgIC8vV3JpdGUgdGhlIGdlbmVyYWwgY29tbWFuZCBpbmZvcm1hdGlvbiB0byB0aGUgUmVxdWVzdCBCdWZmZXJcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihpdGVtKTtcblxuICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICB0eXBlID0gaXRlbUluZm8udHlwZTtcbiAgICAgICAgICAgIGZvcm1hdCA9IGl0ZW1JbmZvLmZvcm1hdDtcblxuICAgICAgICAgICAgLy9MZW5ndGggb2YgdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLnNpemU7XG5cbiAgICAgICAgICAgIC8vQnVpbGQgdGhlIHJlcXVlc3QgYnVmZmVyLlxuICAgICAgICAgICAgLy9UaGUgZnVuY3Rpb24gZGF0YVRvQnl0ZUFycmF5IGV4cGVjdHMgYW4gaXRlbSB3aXRoIGEgdmFsdWUgZm9yXG4gICAgICAgICAgICAvL2NvbnZlcnRpbmcsIHNvIGEgZHVtbXkgb2JqZWN0IGlzIHVzZWQgaGVyZS5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IHRoaXMuZ2V0SW5kZXhHcm91cChpdGVtSW5mbyk7XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IHRoaXMuZ2V0SW5kZXhPZmZzZXQoaXRlbUluZm8pO1xuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgJ1VESU5UJywgZm9ybWF0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICBkdW1teS52YWwgPSBsZW47XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vV3JpdGUgdGhlIGRhdGEgdG8gdGhlIFJlcXVlc3QgQnVmZmVyXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oaXRlbSk7XG5cbiAgICAgICAgICAgIC8vR2V0IHR5cGUgYW5kIGZvcm1hdHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgdHlwZSA9IGl0ZW1JbmZvLnR5cGU7XG4gICAgICAgICAgICBmb3JtYXQgPSBpdGVtSW5mby5mb3JtYXQ7XG5cbiAgICAgICAgICAgIC8vTGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zaXplO1xuXG4gICAgICAgICAgICAvL1Jlc2V0IGNvdW50ZXIgZm9yIGFycmF5cy5cbiAgICAgICAgICAgIGkgPSBudWxsO1xuXG4gICAgICAgICAgICAvL0J1aWxkIHRoZSByZXF1ZXN0IGJ1ZmZlci5cbiAgICAgICAgICAgIC8vVGhlIGZ1bmN0aW9uIGRhdGFUb0J5dGVBcnJheSBleHBlY3RzIGFuIGl0ZW0gd2l0aCBhIHZhbHVlIGZvclxuICAgICAgICAgICAgLy9jb252ZXJ0aW5nLCBzbyBhIGR1bW15IG9iamVjdCBpcyB1c2VkIGhlcmUuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0FSUkFZJzpcblxuICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IHBhcnNlSW50KGl0ZW1JbmZvLmFycmF5TGVuZ3RoLCAxMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5TGVuZ3RoICE9PSBpdGVtLnZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFycmF5IGxlbmd0aCBpbiBKUyBkaWZmZXJzIGZyb20gdGhlIGxlbmd0aCBpbiB0aGUgUExDIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ0xlbmd0aCBpbiBKUzogJyArIGl0ZW0udmFsLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnTGVuZ3RoIGluIFBMQzogJyArIGFycmF5TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9BcnJheSBvZiBzdHJ1Y3R1cmVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN0cnVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1BsYWluIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGl0ZW1JbmZvLmFycmF5RGF0YVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uaXRlbVNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkudmFsID0gaXRlbS52YWxbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgdHlwZSwgZm9ybWF0LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1VTRVInOlxuICAgICAgICAgICAgICAgICAgICAvL1N0cnVjdHVyZXMuXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlU3RydWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vU2ltcGxlIGRhdGEgdHlwZXMuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGl0ZW0sIHR5cGUsIGZvcm1hdCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0NvbnZlcnQgdGhlIHJlcXVlc3QgYnVmZmVyIHRvIEJhc2U2NCBjb2RlZCBkYXRhLlxuICAgICAgICBpZiAocmVxQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHB3ckRhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChyZXFCdWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkV3JpdGUnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5pbmRleEdyb3Vwcy5TdW1XcixcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiBpdGVtTGlzdC5sZW5ndGgsXG4gICAgICAgICAgICBwd3JEYXRhOiBwd3JEYXRhLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpLnNlbmQoKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiBmb3IgcmVhZGluZyB0aGUgQURTIHN0YXRlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgcmVxRGVzY3IgICAgVGhlIFJlcXVlc3QgRGVzY3JpcHRvci4gQmVzaWRlcyBvdGhlciBpbmZvcm1hdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGFsbG9jYXRpb24gb2YgUExDIGFuZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSmF2YVNjcmlwdCB2YXJpYWJsZXMgaW4gYW4gaXRlbSBsaXN0LlxuICAgICAqL1xuICAgIHJlYWRBZHNTdGF0ZShyZXFEZXNjcikge1xuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG5cbiAgICAgICAgdmFyIG9lZnVuY3Q7XG5cbiAgICAgICAgaWYgKHJlcURlc2NyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcURlc2NyID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcURlc2NyLm9lID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vU2F2ZSB0aGUgb3JpZ2luYWwgb24tZXJyb3IgZnVuY3Rpb24gaWYgZXhpc3QuXG4gICAgICAgICAgICBvZWZ1bmN0ID0gcmVxRGVzY3Iub2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL09uLWVycm9yLWZ1bmN0aW9uLCByZXNldCB0aGUgc3RhdGVcbiAgICAgICAgcmVxRGVzY3Iub2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBRFMgc3RhdGUgcmVxdWVzdCBmYWlsZWQuJyk7XG4gICAgICAgICAgICB0aGlzLmFkc1N0YXRlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYWRzU3RhdGVUeHQgPSAnJztcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlU3RhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9lZnVuY3QgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9lZnVuY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZFN0YXRlJyxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogIFByaW50cyB0aGUgY2FjaGVkIGhhbmRsZXMgdG8gdGhlIGNvbnNvbGUuXG4gICAgICovXG4gICAgbG9nSGFuZGxlQ2FjaGUgKCkge1xuICAgICAgICB0aGlzLmxvZyh0aGlzLmhhbmRsZUNhY2hlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIFByaW50cyB0aGUgc3ltYm9sIHRhYmxlIHRvIHRoZSBjb25zb2xlLlxuICAgICAqL1xuICAgIGxvZ1N5bWJvbHMoKSB7XG4gICAgICAgIHRoaXMubG9nKHRoaXMuc3ltVGFibGUpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqICBQcmludHMgdGhlIGRhdGEgdHlwZSB0YWJsZSB0byB0aGUgY29uc29sZS5cbiAgICAgKi9cbiAgICBsb2dEYXRhVHlwZXMoKSB7XG4gICAgICAgIHRoaXMubG9nKHRoaXMuZGF0YVR5cGVUYWJsZSk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIFN5bWJvbCBUYWJsZSB0byBhIEpTT04gc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge0FycmF5fSAganN0ciAgICBUaGUgU3ltYm9sIFRhYmxlIGFzIGEgSlNPTiBzdHJpbmcgLiBcbiAgICAgKi9cbiAgICBnZXRTeW1ib2xzQXNKU09OKCkge1xuICAgICAgICB2YXIganN0cjtcblxuICAgICAgICBpZiAodHlwZW9mIEpTT04gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBKU09OIHBhcnNlciBmb3VuZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAganN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc3ltVGFibGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBqc3RyO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBjb252ZXJ0IHRoZSBTeW1ib2wgVGFibGUgdG8gSlNPTjonICsgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyB0aGUgU3ltYm9sIFRhYmxlIGZyb20gYSBKU09OIHN0cmluZ1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAganN0ciAgICBBIEpTT04gc3RyaW5nIHdpdGggdGhlIHN5bWJvbHMuXG4gICAgICovXG4gICAgc2V0U3ltYm9sc0Zyb21KU09OKGpzdHIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBKU09OICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gSlNPTiBwYXJzZXIgZm91bmQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGUgPSBKU09OLnBhcnNlKGpzdHIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBjcmVhdGUgdGhlIFN5bWJvbCBUYWJsZSBmcm9tIEpTT046JyArIGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ltVGFibGVSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN5bWJvbCBUYWJsZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCBmcm9tIEpTT04gZGF0YS4nKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBEYXRhIFR5cGUgVGFibGUgdG8gYSBKU09OIHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gIGpzdHIgICAgVGhlIERhdGEgVHlwZSBUYWJsZSBhcyBhIEpTT04gc3RyaW5nIC4gXG4gICAgICovXG4gICAgZ2V0RGF0YVR5cGVzQXNKU09OKCkge1xuICAgICAgICB2YXIganN0cjtcblxuICAgICAgICBpZiAodHlwZW9mIEpTT04gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBKU09OIHBhcnNlciBmb3VuZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAganN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YVR5cGVUYWJsZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzdHI7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGNvbnZlcnQgdGhlIERhdGEgVHlwZSBUYWJsZSB0byBKU09OOicgKyBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIHRoZSBEYXRhIFR5cGUgVGFibGUgZnJvbSBhIEpTT04gc3RyaW5nXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBqc3RyICAgIEEgSlNPTiBzdHJpbmcgd2l0aCB0aGUgZGF0YSB0eXBlcy5cbiAgICAgKi9cbiAgICBzZXREYXRhVHlwZXNGcm9tSlNPTihqc3RyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgSlNPTiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIEpTT04gcGFyc2VyIGZvdW5kLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGUgPSBKU09OLnBhcnNlKGpzdHIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBjcmVhdGUgdGhlIERhdGEgVHlwZSBUYWJsZSBmcm9tIEpTT046JyArIGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRGF0YSBUeXBlIFRhYmxlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIGZyb20gSlNPTiBkYXRhLicpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgd2Vic2VydmljZSdzIHNlcnZlciByZXNwb25zZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgVGhlIG9iamVjdCBjb250YWluaW5nIHRoZSBhcmd1bWVudHMgb2YgdGhlIEFEUyByZXF1ZXN0LlxuICAgICAqL1xuICAgIHBhcnNlUmVzcG9uc2UoYWRzUmVxKSB7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlLCBlcnJvckNvZGUsIGVycm9yVGV4dDtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55XG5cbiAgICAgICAgLy9BY2tub3dsZWRnZSB0aGUgcmVjZWl2ZSBvZiBhIHJlcXVlc3Qgd2l0aCBpbmRleCAnaWQnLlxuICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5pZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hlY2sgaWYgdGhlIFhNTCBkYXRhIG9iamVjdCBpcyB2YWxpZC5cbiAgICAgICAgaWYgKHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUmVxdWVzdCBjb250YWlucyBubyBYTUwgZGF0YS4gT2JqZWN0IFwicmVzcG9uc2VYTUxcIiBpcyBudWxsLicpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVGhpcyBpcyB0aGUgXCJyZXNwb25zZVRleHRcIjonKTtcbiAgICAgICAgICAgIHRoaXMubG9nKHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvL29uIGVycm9yIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm9lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL0dldCB0aGUgcmVzcG9uc2VcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gWE1MIGRhdGEgaW4gc2VydmVyIHJlc3BvbnNlOiAnICsgZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vb24gZXJyb3IgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vTG9vayBmb3IgZXJyb3JzIGluIHRoZSByZXNwb25zZSBzdHJpbmcgKGkuZS4gQURTIGVycm9ycykuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvL0dldCBlcnJvcnNcbiAgICAgICAgICAgIGVycm9yVGV4dCA9IHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmYXVsdHN0cmluZycpWzBdLmZpcnN0Q2hpbGQuZGF0YTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDb2RlID0gcmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Vycm9yY29kZScpWzBdLmZpcnN0Q2hpbGQuZGF0YTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvckNvZGUgPSAnLSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBNZXNzYWdlIGZyb20gc2VydmVyOiAgJyArIGVycm9yVGV4dCArICcgKCcgKyBlcnJvckNvZGUgKyAnKScpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vb24gZXJyb3IgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIC8vQWxsIGZpbmVcbiAgICAgICAgICAgIGVycm9yQ29kZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL05vcm1hbGl6ZSBkYXRhIChlc3AuIGZvciBGaXJlZm94LCB3aG8gc3BsaXRzIGRhdGEgaW4gNGsgY2h1bmtzKS5cbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5ub3JtYWxpemUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLm5vcm1hbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9EZWNvZGUgZGF0YSBpZiBpdCdzIGEgcmVhZCByZXF1ZXN0LlxuICAgICAgICBpZiAoYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWRTdGF0ZScpIHtcblxuICAgICAgICAgICAgdGhpcy5wYXJzZUFkc1N0YXRlKGFkc1JlcSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChhZHNSZXEubWV0aG9kID09PSAnUmVhZCcgfHwgYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWRXcml0ZScpIHtcblxuICAgICAgICAgICAgc3dpdGNoIChhZHNSZXEuaW5kZXhHcm91cCkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5pbmRleEdyb3Vwcy5VcGxvYWRJbmZvOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVXBsb2FkSW5mbyhhZHNSZXEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuaW5kZXhHcm91cHMuVXBsb2FkOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVXBsb2FkKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5pbmRleEdyb3Vwcy5TdW1SZDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVN1bVJlYWRSZXEoYWRzUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmluZGV4R3JvdXBzLlN1bVdyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlU3VtV3JpdGVSZXEoYWRzUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmluZGV4R3JvdXBzLlN1bVJkV3I6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VIYW5kbGVzKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucGFyc2VSZWFkUmVxKGFkc1JlcSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0NhbGwgdGhlIE9uLUNvbXBsZXRlLVNjcmlwdC5cbiAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9jZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChhZHNSZXEucmVxRGVzY3Iub2MsIGFkc1JlcS5yZXFEZXNjci5vY2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm9jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaGFuZGxlcyBmcm9tIHRoZSBQTEMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyU3ltTmFtZXMgICBBcnJheSB3aXRoIHRoZSBzeW1ib2wgbmFtZXMuXG4gICAgICovXG4gICAgZ2V0SGFuZGxlcyhyZXFEZXNjcikge1xuXG4gICAgICAgIHZhciBhZHNSZXEgPSB7fSxcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IFtdLFxuICAgICAgICAgICAgYXJybGVuID0gcmVxRGVzY3Iuc3ltYm9scy5sZW5ndGgsXG4gICAgICAgICAgICBieXRlcywgaWR4LCBsZW4sIHB3ckRhdGEsIGZvcm1hdCwgc3ltbmFtZSwgaTtcblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEZldGNoaW5nIGhhbmRsZXMgZnJvbSB0aGUgUExDLicpO1xuXG4gICAgICAgIC8vUmVhZCBsZW50aCB3aXRoIHRoZSBudW1iZXIgb2YgYnl0ZSBmb3IgZXJyb3IgY29kZXMuXG4gICAgICAgIC8vNCBieXRlcyByZXF1ZXN0ZWQgZGF0YSwgNCBieXRlcyBmb3IgZXJyb3Jjb2RlIGFuZCA0IGJ5dGVzIGZvciB0aGUgbGVuZ3RoXG4gICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggPSBhcnJsZW4gKiAxMjtcblxuICAgICAgICAvL0J1aWxkIHRoZSBSZXF1ZXN0IEJ1ZmZlclxuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGFycmxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgLy9CdWlsZCB0aGUgcmVxdWVzdCBidWZmZXIuXG4gICAgICAgICAgICAvL0luZGV4R3JvdXBcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodGhpcy5pbmRleEdyb3Vwcy5IYW5kbGVCeU5hbWUsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIC8vSW5kZXhPZmZzZXQgaXMgYWx3YXlzIDBcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIoMCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgLy9IYW5kbGUgc2l6ZSAoNCBieXRlcylcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIoNCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgLy9TdHJpbmcgbGVuZ3RoXG4gICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHJlcURlc2NyLnN5bWJvbHNbaWR4XS5sZW5ndGgsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FkZCBzeW1ib2wgbmFtZXNcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG4gICAgICAgICAgICBzeW1uYW1lID0gcmVxRGVzY3Iuc3ltYm9sc1tpZHhdLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIC8vU3RvcmUgaXQgZm9yIGxhdGVyIHVzZVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVOYW1lc1tpZHhdID0gc3ltbmFtZTtcblxuICAgICAgICAgICAgLy9BZGQgc3ltYm9sIG5hbWVzIHRvIHRoZSBidWZmZXJcbiAgICAgICAgICAgIGJ5dGVzID0gW107XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3ltbmFtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGJ5dGVzW2ldID0gc3ltbmFtZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vQ29udmVydCB0aGUgcmVxdWVzdCBidWZmZXIgdG8gQmFzZTY0IGNvZGVkIGRhdGEuXG4gICAgICAgIGlmIChyZXFCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcHdyRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHJlcUJ1ZmZlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWRXcml0ZScsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmluZGV4R3JvdXBzLlN1bVJkV3IsXG4gICAgICAgICAgICBpbmRleE9mZnNldDogYXJybGVuLFxuICAgICAgICAgICAgcHdyRGF0YTogcHdyRGF0YSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIHJlbGVhc2luZyB0aGUgY2FjaGVkIGhhbmRsZXMuXG4gICAgICogXG4gICAgICovXG4gICAgcmVsZWFzZUhhbmRsZXMocmVxRGVzY3IpIHtcbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgcmVxQnVmZmVyID0gW10sXG4gICAgICAgICAgICBieXRlcyA9IFtdLFxuICAgICAgICAgICAgYXJybGVuID0gMCxcbiAgICAgICAgICAgIHN5bU5hbWVzID0gW10sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGlkeCwgcHdyRGF0YTtcblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFJlbGVhc2luZyBoYW5kbGVzLicpO1xuXG4gICAgICAgIC8vQ2hlY2sgaWYgYSByZXF1ZXN0IGRlc2NyaXB0b3IgZXhpc3RzXG4gICAgICAgIGlmIChyZXFEZXNjciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXFEZXNjciA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIC8vQ2hlY2sgaWYgYSB1c2VyIGRlZmluZWQgaGFuZGxlIGxpc3QgZXhpc3RzXG4gICAgICAgIGlmIChyZXFEZXNjci5zeW1ib2xzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFycmxlbiA9IHJlcURlc2NyLnN5bWJvbHMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgc3ltTmFtZXNbaWR4XSA9IHJlcURlc2NyLnN5bWJvbHNbaWR4XS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJybGVuID0gdGhpcy5oYW5kbGVOYW1lcy5sZW5ndGg7XG4gICAgICAgICAgICBzeW1OYW1lcyA9IHRoaXMuaGFuZGxlTmFtZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvL1ByZXNldCB0aGUgcmVhZCBsZW5ndGggd2l0aCB0aGUgbnVtYmVyIG9mIGJ5dGUgZm9yIGVycm9yIGNvZGVzLlxuICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gYXJybGVuICogNDtcblxuICAgICAgICAvL1dyaXRlIHRoZSBnZW5lcmFsIGNvbW1hbmQgaW5mb3JtYXRpb24gdG8gdGhlIFJlcXVlc3QgQnVmZmVyXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAvL0J1aWxkIHRoZSByZXF1ZXN0IGJ1ZmZlci5cbiAgICAgICAgICAgIC8vSW5kZXhHcm91cFxuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih0aGlzLmluZGV4R3JvdXBzLlJlbGVhc2VIYW5kbGUsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIC8vSW5kZXhPZmZzZXQgaXMgYWx3YXlzIDBcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIoMCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgLy9IYW5kbGUgc2l6ZSAoNCBieXRlcylcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIoNCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQWRkIGhhbmRsZXMgY29kZXNcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuaGFuZGxlQ2FjaGVbc3ltTmFtZXNbaWR4XV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih0aGlzLmhhbmRsZUNhY2hlW3N5bU5hbWVzW2lkeF1dLCA0KTtcbiAgICAgICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogSGFuZGxlIGZvciBzeW1ib2wgbmFtZSAnICsgc3ltTmFtZXNbaWR4XSArICcgZG9lcyBub3QgZXhpc3QgaW4gaGFuZGxlIGNhY2hlIScpO1xuICAgICAgICAgICAgICAgIHRocm93ICdSZWxlYXNpbmcgSGFuZGxlcyBhYm9ydGVkISc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0NvbnZlcnQgdGhlIHJlcXVlc3QgYnVmZmVyIHRvIEJhc2U2NCBjb2RlZCBkYXRhLlxuICAgICAgICBpZiAocmVxQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHB3ckRhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChyZXFCdWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BZGQgdGhlIHN5bWJvbCBuYW1lcyBmb3IgcGFyc2luZyB0aGUgcmVzcG9uc2VcbiAgICAgICAgcmVxRGVzY3IuaXRlbXMgPSBzeW1OYW1lcztcblxuICAgICAgICAvL1RoaXMgaXMgYSBSZWxlYXNlIEhhbmRsZXMgUmVxdWVzdFxuICAgICAgICByZXFEZXNjci5pc1JlbEhkbFJlcSA9IHRydWU7XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkV3JpdGUnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5pbmRleEdyb3Vwcy5TdW1XcixcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiBhcnJsZW4sXG4gICAgICAgICAgICBwd3JEYXRhOiBwd3JEYXRhLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpLnNlbmQoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNob3J0Y3V0cyBmb3IgcmVhZGluZyBhbmQgd3JpdGluZyBkYXRhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzXG4gICAgICovXG4gICAgd3JpdGVCb29sID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0JPT0wnLCBhcmdzKVxuICAgIHdyaXRlQnl0ZSA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdCWVRFJywgYXJncylcbiAgICB3cml0ZVVzaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1VTSU5UJywgYXJncylcbiAgICB3cml0ZVNpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnU0lOVCcsIGFyZ3MpXG4gICAgd3JpdGVXb3JkID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1dPUkQnLCBhcmdzKVxuICAgIHdyaXRlVWludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdVSU5UJywgYXJncylcbiAgICB3cml0ZUludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdJTlQnLCBhcmdzKVxuICAgIHdyaXRlSW50MURwID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0lOVDFEUCcsIGFyZ3MpXG4gICAgd3JpdGVJbnQyRHAgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnSU5UMkRQJywgYXJncylcbiAgICB3cml0ZUR3b3JkID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0RXT1JEJywgYXJncylcbiAgICB3cml0ZVVkaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1VESU5UJywgYXJncylcbiAgICB3cml0ZURpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnRElOVCcsIGFyZ3MpXG4gICAgd3JpdGVSZWFsID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1JFQUwnLCBhcmdzKVxuICAgIHdyaXRlTHJlYWwgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnTFJFQUwnLCBhcmdzKVxuICAgIHdyaXRlU3RyaW5nID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1NUUklORycsIGFyZ3MpXG4gICAgd3JpdGVUaW1lID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1RJTUUnLCBhcmdzKVxuICAgIHdyaXRlVG9kID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1RPRCcsIGFyZ3MpXG4gICAgd3JpdGVEYXRlID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0RBVEUnLCBhcmdzKVxuICAgIHdyaXRlRHQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnRFQnLCBhcmdzKVxuXG4gICAgcmVhZEJvb2wgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0JPT0wnLCBhcmdzKVxuICAgIHJlYWRCeXRlID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdCWVRFJywgYXJncylcbiAgICByZWFkVXNpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1VTSU5UJywgYXJncylcbiAgICByZWFkU2ludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnU0lOVCcsIGFyZ3MpXG4gICAgcmVhZFdvcmQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1dPUkQnLCBhcmdzKVxuICAgIHJlYWRVaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdVSU5UJywgYXJncylcbiAgICByZWFkSW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdJTlQnLCBhcmdzKVxuICAgIHJlYWRJbnQxRHAgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0lOVDFEUCcsIGFyZ3MpXG4gICAgcmVhZEludDJEcCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnSU5UMkRQJywgYXJncylcbiAgICByZWFkRHdvcmQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0RXT1JEJywgYXJncylcbiAgICByZWFkVWRpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1VESU5UJywgYXJncylcbiAgICByZWFkRGludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnRElOVCcsIGFyZ3MpXG4gICAgcmVhZFJlYWwgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1JFQUwnLCBhcmdzKVxuICAgIHJlYWRMcmVhbCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnTFJFQUwnLCBhcmdzKVxuICAgIHJlYWRTdHJpbmcgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1NUUklORycsIGFyZ3MpXG4gICAgcmVhZFRpbWUgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1RJTUUnLCBhcmdzKVxuICAgIHJlYWRUb2QgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1RPRCcsIGFyZ3MpXG4gICAgcmVhZERhdGUgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0RBVEUnLCBhcmdzKVxuICAgIHJlYWREdCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnRFQnLCBhcmdzKVxuXG4gICAgd3JpdGVTdHJ1Y3QgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVTdHJ1Y3REZXNjcmlwdG9yKCdXcml0ZScsIGFyZ3MpXG4gICAgcmVhZFN0cnVjdCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZVN0cnVjdERlc2NyaXB0b3IoJ1JlYWQnLCBhcmdzKVxuXG4gICAgd3JpdGVBcnJheU9mQm9vbCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnQk9PTCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mQnl0ZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnQllURScsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mVXNpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1VTSU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZTaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdTSU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZXb3JkID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdXT1JEJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZVaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdVSU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZJbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0lOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mSW50MURwID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdJTlQxRFAnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkludDJEcCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnSU5UMkRQJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZEd29yZCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnRFdPUkQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlVkaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdVRElOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mRGludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnRElOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mUmVhbCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnUkVBTCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mTHJlYWwgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0xSRUFMJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZTdHJpbmcgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1NUUklORycsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mVGltZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnVElNRScsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mVG9kID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdUT0QnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkRhdGUgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0RBVEUnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkR0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdEVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mU3RydWN0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdTVFJVQ1QnLCBhcmdzKVxuXG4gICAgcmVhZEFycmF5T2ZCb29sID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0JPT0wnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mQnl0ZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdCWVRFJywgYXJncylcbiAgICByZWFkQXJyYXlPZlVzaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1VTSU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZlNpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnU0lOVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZXb3JkID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1dPUkQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mVWludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdVSU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZkludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdJTlQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mSW50MURwID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0lOVDFEUCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZJbnQyRHAgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnSU5UMkRQJywgYXJncylcbiAgICByZWFkQXJyYXlPZkR3b3JkID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0RXT1JEJywgYXJncylcbiAgICByZWFkQXJyYXlPZlVkaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1VESU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZkRpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnRElOVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZSZWFsID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1JFQUwnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mTHJlYWwgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnTFJFQUwnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mU3RyaW5nID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1NUUklORycsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZUaW1lID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1RJTUUnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mVG9kID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1RPRCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZEYXRlID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0RBVEUnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mRHQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnRFQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mU3RydWN0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1NUUlVDVCcsIGFyZ3MpXG4gICAgXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICBNZXRob2RzIGZvciBDcmVhdGluZyB0aGUgU3ltYm9sIFRhYmxlIGZyb20gVXBsb2FkXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciB0aGUgVFBZIEZpbGVcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICAgXG5cbiAgICAvKipcbiAgICAgKiAgR2V0IHRoZSB1cGxvYWQgaW5mby4gXG4gICAgICovXG5cbiAgICBnZXRVcGxvYWRJbmZvKCkge1xuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIHZhciBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuaW5kZXhHcm91cHMuVXBsb2FkSW5mbyxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiAwLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHtcbiAgICAgICAgICAgICAgICByZWFkTGVuZ3RoOiA4XG4gICAgICAgICAgICAgICAgLy9zeW5jOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSB0aGUgdXBsb2FkIGluZm9ybWF0aW9uIGFuZCBjYWxsIHRoZSByZXF1ZXN0IGZvciBcbiAgICAgKiByZWFkaW5nIHRoZSB1cGxvYWQgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQW4gQURTIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBwYXJzZVVwbG9hZEluZm8oYWRzUmVxKSB7XG4gICAgICAgIHZhciByZXNwb25zZSwgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgZGF0YSwgYWRzUmVxMjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcERhdGEnKVswXS5maXJzdENoaWxkLmRhdGEpO1xuICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKDAsIDQpO1xuICAgICAgICAgICAgdGhpcy5zeW1ib2xDb3VudCA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKDQsIDQpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRMZW5ndGggPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGFyc2luZyBvZiBVcGxvYWRJbmZvIGZhaWxlZDonICsgZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhZHNSZXEyID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZCcsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmluZGV4R3JvdXBzLlVwbG9hZCxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiAwLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHtcbiAgICAgICAgICAgICAgICByZWFkTGVuZ3RoOiB0aGlzLnVwbG9hZExlbmd0aFxuICAgICAgICAgICAgICAgIC8vc3luYzogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcTIpLnNlbmQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIHRoZSB1cGxvYWQgZGF0YSBhbmQgYW4gb2JqZWN0IChzeW1UYWJsZSkgd2l0aCB0aGUgc3ltYm9sIG5hbWVzIFxuICAgICAqIGFzIHRoZSBwcm9wZXJ0aWVzLiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQW4gQURTIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBwYXJzZVVwbG9hZChhZHNSZXEpIHtcbiAgICAgICAgdmFyIHJlc3BvbnNlLFxuICAgICAgICAgICAgc3RyQWRkciA9IDAsXG4gICAgICAgICAgICBpZ09mZnMgPSA0LFxuICAgICAgICAgICAgaW9PZmZzID0gOCxcbiAgICAgICAgICAgIHNpemVPZmZzID0gMTIsXG4gICAgICAgICAgICBuYW1lT2ZmcyA9IDMwLFxuICAgICAgICAgICAgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgZGF0YSwgY250LCBpbmZvTGVuLCBuYW1lQW5kVHlwZSwgdHlwZUFyciwgYXJyYXlMZW5ndGgsIHR5cGUsIGVsZW07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgPSB0aGlzLmRlY29kZUJhc2U2NChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHBEYXRhJylbMF0uZmlyc3RDaGlsZC5kYXRhKTtcblxuICAgICAgICAgICAgZm9yIChjbnQgPSAwOyBjbnQgPCB0aGlzLnN5bWJvbENvdW50OyBjbnQrKykge1xuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBsZW5ndGggb2YgdGhlIHN5bWJvbCBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICAgICAgaW5mb0xlbiA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgbmFtZSBhbmQgdHlwZS5cbiAgICAgICAgICAgICAgICBuYW1lQW5kVHlwZSA9IGRhdGFTdHJpbmcuc3Vic3RyaW5nKHN0ckFkZHIgKyBuYW1lT2ZmcywgKHN0ckFkZHIgKyBpbmZvTGVuKSkuc3BsaXQoU3RyaW5nLmZyb21DaGFyQ29kZSgwKSk7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBuYW1lQW5kVHlwZVswXS50b1VwcGVyQ2FzZSgpO1xuXG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhbiBlbnRyeS5cbiAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nOiBuYW1lQW5kVHlwZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciArIGlnT2ZmcywgNCksICdEV09SRCcpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldDogdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciArIGlvT2ZmcywgNCksICdEV09SRCcpLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyICsgc2l6ZU9mZnMsIDQpLCAnRFdPUkQnKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvL1NldCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgICAgIHR5cGVBcnIgPSBuYW1lQW5kVHlwZVsxXS5zcGxpdChcIiBcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZUFyclswXSA9PT0gJ0FSUkFZJykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vVHlwZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPSB0eXBlQXJyWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQXJyYXkgTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gdHlwZUFyclsxXS5zdWJzdHJpbmcoMSwgdHlwZUFyclsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBhcnJheUxlbmd0aC5zcGxpdCgnLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJTdGFydElkeCA9IHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMV0sIDEwKSAtIHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5TGVuZ3RoID0gYXJyYXlMZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL0RhdGEgdHlwZSBvZiB0aGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzNdLnNwbGl0KCcoJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVbMV0gPSB0eXBlWzFdLnN1YnN0cigwLCB0eXBlWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5zdHJpbmdMZW5ndGggPSBwYXJzZUludCh0eXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZUFyclswXSArICcuJyArIGFycmF5TGVuZ3RoICsgJy4nICsgdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vSXRlbSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5pdGVtU2l6ZSA9IHRoaXMuc3ltVGFibGVbbmFtZV0uc2l6ZSAvIGFycmF5TGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5RGF0YVR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoZWxlbSBpbiB0aGlzLnBsY1R5cGVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5RGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclswXS5zcGxpdCgnKCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlWzBdICsgJy4nICsgdHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uc3RyaW5nTGVuZ3RoID0gcGFyc2VJbnQodHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gJ1VTRVInO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT09IGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmRhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gaW5mb0xlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ltVGFibGVSZWFkeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRW5kIG9mIGZldGNoaW5nIHRoZSBzeW1ib2xzLicpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTeW1ib2wgdGFibGUgcmVhZHkuJyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2Uuc3luY1htbEh0dHAgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVhZHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIHVwbG9hZGVkIHN5bWJvbCBpbmZvcm1hdGlvbiBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqIEdldCB0aGUgc3ltYm9sLWZpbGUgKCoudHB5KSBmcm9tIHRoZSBzZXJ2ZXIgYW5kIGNyZWF0ZVxuICAgICogYW4gb2JqZWN0IChzeW1UYWJsZSkgd2l0aCB0aGUgc3ltYm9sIG5hbWVzIGFzIHRoZSBwcm9wZXJ0aWVzLiBcbiAgICAqL1xuICAgIGdldENvbmZpZ0ZpbGUoKSB7XG5cbiAgICAgICAgdmFyIHhtbEh0dHBSZXEgPSB0aGlzLmNyZWF0ZVhNTEh0dHBSZXEoKSxcbiAgICAgICAgICAgIHN5bWJvbEFycmF5ID0gW10sXG4gICAgICAgICAgICBjb25maWdGaWxlLCBuYW1lLCBhbGxTeW1ib2xzLCB0eXBlQXJyLCBhcnJheUxlbmd0aCwgdHlwZSwgZWxlbSxcbiAgICAgICAgICAgIHRjVmVyc2lvbiwgaTtcblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IHJlYWRpbmcgdGhlIFRQWSBmaWxlLicpO1xuXG4gICAgICAgIC8vSFRUUFJlcXVlc3RcbiAgICAgICAgeG1sSHR0cFJlcS5vcGVuKCdHRVQnLCB0aGlzLnNlcnZpY2UuY29uZmlnRmlsZVVybCwgIXRoaXMuc2VydmljZS5zeW5jWG1sSHR0cCwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VVc2VyLCB0aGlzLnNlcnZpY2Uuc2VydmljZVBhc3N3b3JkKTtcbiAgICAgICAgeG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKTtcblxuICAgICAgICB4bWxIdHRwUmVxLm9ubG9hZCA9ICgpID0+IHtcblxuICAgICAgICAgICAgLy9DcmVhdGUgYSBET00gb2JqZWN0IGZyb20gWE1MXG4gICAgICAgICAgICBpZiAodHlwZW9mIERPTVBhcnNlciAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ0ZpbGUgPSAobmV3IERPTVBhcnNlcigpKS5wYXJzZUZyb21TdHJpbmcoeG1sSHR0cFJlcS5yZXNwb25zZVRleHQsIFwidGV4dC94bWxcIik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDcmVhdGluZyBhIERPTSBvYmplY3QgZnJvbSBUUFkgZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ2FuXFwndCBwYXJzZSB0aGUgc3ltYm9sIGZpbGUgY2F1c2UgeW91ciBicm93c2VyIGRvZXMgbm90IHByb3ZpZGUgYSBET01QYXJzZXIgZnVuY3Rpb24uJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9HZXQgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBQTEMgYW5kIHRoZSByb3V0aW5nXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZS5hbXNOZXRJZCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIHRoaXMuc2VydmljZS5hbXNQb3J0ICE9PSAnc3RyaW5nJyB8fCB0aGlzLmFsaWdubWVudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3RhcnQgcmVhZGluZyB0aGUgc2VydmljZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV0SWQ6IGNvbmZpZ0ZpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ05ldElkJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0OiBjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdQb3J0JylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0Y1ZlcnNpb24gPSBjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUd2luQ0FUVmVyc2lvbicpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLmNoYXJBdCgwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGNWZXJzaW9uID09PSAnMicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUluZm8uYWxpZ25tZW50ID0gcGFyc2VJbnQoY29uZmlnRmlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnUGFja1NpemUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRjVmVyc2lvbiA9PT0gJzMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbmZvLmFsaWdubWVudCA9IDg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZGV0ZXJtaW5lIHRoZSBUd2luQ0FUIHZlcnNpb24uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBFbmQgb2YgcmVhZGluZyB0aGUgc2VydmljZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgcmVhZGluZyBzZXJ2aWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIFRQWSBmaWxlOicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogTmV0SWQsIHBvcnQgYW5kIGFsaWdubWVudCBtYW51YWxseSBzZXQuIFNraXAgcmVhZGluZyB0aGUgc2VydmljZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgc3ltYm9sIHRhYmxlXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLmZvcmNlVXBsb2FkVXNhZ2UgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IHJlYWRpbmcgdGhlIHN5bWJvbHMgZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgYW4gQXJyYXkgb2YgdGhlIEVsZW1lbnRzIHdpdGggXCJTeW1ib2xcIiBhcyB0YWcgbmFtZS5cbiAgICAgICAgICAgICAgICAgICAgYWxsU3ltYm9scyA9IGNvbmZpZ0ZpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1N5bWJvbHMnKVswXTtcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sQXJyYXkgPSBhbGxTeW1ib2xzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdTeW1ib2wnKTtcblxuICAgICAgICAgICAgICAgICAgICAvL0dldCB0aGUgbmFtZSBvZiB0aGUgc3ltYm9sIGFuZCBjcmVhdGUgYW4gb2JqZWN0IHByb3BlcnR5IHdpdGggaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vc3ltVGFibGUgaXMgZGVjbGFyZWQgb3V0c2lkZSBpbiB0aGUgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzeW1ib2xBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHN5bWJvbEFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOYW1lJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVN0cmluZzogc3ltYm9sQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R5cGUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4R3JvdXA6IHBhcnNlSW50KHN5bWJvbEFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdJR3JvdXAnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0OiBwYXJzZUludChzeW1ib2xBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnSU9mZnNldCcpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0U2l6ZTogcGFyc2VJbnQoc3ltYm9sQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdFNpemUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5zaXplID0gKHRoaXMuc3ltVGFibGVbbmFtZV0uYml0U2l6ZSA+PSA4KSA/IHRoaXMuc3ltVGFibGVbbmFtZV0uYml0U2l6ZSAvIDggOiB0aGlzLnN5bVRhYmxlW25hbWVdLmJpdFNpemU7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVBcnIgPSB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGVTdHJpbmcuc3BsaXQoXCIgXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZUFyclswXSA9PT0gJ0FSUkFZJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gdHlwZUFyclswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQXJyYXkgbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSB0eXBlQXJyWzFdLnN1YnN0cmluZygxLCB0eXBlQXJyWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gYXJyYXlMZW5ndGguc3BsaXQoJy4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJTdGFydElkeCA9IHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBwYXJzZUludChhcnJheUxlbmd0aFsxXSwgMTApIC0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMF0sIDEwKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheUxlbmd0aCA9IGFycmF5TGVuZ3RoO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRGF0YSB0eXBlIG9mIHRoZSBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclszXS5zcGxpdCgnKCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVsxXSA9IHR5cGVbMV0uc3Vic3RyKDAsIHR5cGVbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlQXJyWzBdICsgJy4nICsgYXJyYXlMZW5ndGggKyAnLicgKyB0eXBlWzBdICsgJy4nICsgdHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5zdHJpbmdMZW5ndGggPSBwYXJzZUludCh0eXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JdGVtIGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uaXRlbVNpemUgPSB0aGlzLnN5bVRhYmxlW25hbWVdLnNpemUgLyBhcnJheUxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uYXJyYXlEYXRhVHlwZSA9ICdVU0VSJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzBdID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5kYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzBdLnNwbGl0KCcoJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVbMV0gPSB0eXBlWzFdLnN1YnN0cigwLCB0eXBlWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZVswXSArICcuJyArIHR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uc3RyaW5nTGVuZ3RoID0gcGFyc2VJbnQodHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9ICdVU0VSJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzBdID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5kYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVJlYWR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEVuZCBvZiByZWFkaW5nIHRoZSBzeW1ib2xzIGZyb20gdGhlIFRQWSBmaWxlLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN5bWJvbCB0YWJsZSByZWFkeS4nKTtcblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSBwYXJzaW5nIHRoZSBzeW1ib2wgZmlsZTonKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFJlYWRpbmcgdGhlIHN5bWJvbHMgZnJvbSB0aGUgVFBZIGZpbGUgaXMgZGVhY3RpdmF0ZWQuJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9HZXQgdGhlIGRhdGEgdHlwZXMuXG4gICAgICAgICAgICB2YXIgYWxsRGF0YVR5cGVzLCBkYXRhVHlwZUFycmF5LCBzdWJJdGVtQXJyYXksIHNOYW1lLCBmdWxsTmFtZTtcblxuICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IHJlYWRpbmcgdGhlIGRhdGEgdHlwZXMgZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgYW4gQXJyYXkgb2YgdGhlIEVsZW1lbnRzIHdpdGggXCJEYXRhVHlwZVwiIGFzIHRhZyBuYW1lLlxuICAgICAgICAgICAgICAgICAgICBhbGxEYXRhVHlwZXMgPSBjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdEYXRhVHlwZXMnKVswXTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGVBcnJheSA9IGFsbERhdGFUeXBlcy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnRGF0YVR5cGUnKTtcblxuICAgICAgICAgICAgICAgICAgICAvL0dldCB0aGUgbmFtZSBvZiB0aGUgZGF0YSB0eXBlIGFuZCBjcmVhdGUgYW4gb2JqZWN0IHByb3BlcnR5IHdpdGggaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vZGF0YVR5cGVUYWJsZSBpcyBkZWNsYXJlZCBvdXRzaWRlIGluIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgLy9BcnJheXMgZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGFUeXBlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lID0gZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnTmFtZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gZnVsbE5hbWUuc3BsaXQoXCIgXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdBUlJBWScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtmdWxsTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdHlwZTogZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdFNpemU6IHBhcnNlSW50KGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdFNpemUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbZnVsbE5hbWVdLnNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZnVsbE5hbWVdLmJpdFNpemUgLyA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vVGhlbiB0aGUgcmVzdFxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YVR5cGVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWUgPSBkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOYW1lJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBmdWxsTmFtZS5zcGxpdChcIiBcIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSAhPT0gJ0FSUkFZJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3R5cGU6IGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R5cGUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXRTaXplOiBwYXJzZUludChkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdCaXRTaXplJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViSXRlbXM6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5iaXRTaXplIC8gODtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBTdWJJdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykl0ZW1BcnJheSA9IGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1N1Ykl0ZW0nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3ViSXRlbUFycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNOYW1lID0gc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOYW1lJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Pbmx5IFN1Ykl0ZW1zIHdpdGggdHlwZSBpbmZvcm1hdGlvbiAocHJvYmxlbSBvY2N1cnMgd2l0aCBUQzMgYW5kIHNvbWUgbGlicylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zTmFtZSA9IHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnTmFtZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVTdHJpbmc6IHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUeXBlJylbMF0uaGFzQXR0cmlidXRlKCdQb2ludGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0U2l6ZTogcGFyc2VJbnQoc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdCaXRTaXplJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdE9mZnMnKVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5iaXRPZmZzZXQgPSBwYXJzZUludChzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdE9mZnMnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uc2l6ZSA9ICh0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmJpdFNpemUgPj0gOCkgPyB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmJpdFNpemUgLyA4IDogdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5iaXRTaXplO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlQXJyID0gdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlU3RyaW5nLnNwbGl0KFwiIFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVBcnJbMF0gPT09ICdBUlJBWScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZSA9IHR5cGVBcnJbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0FycmF5IExlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gdHlwZUFyclsxXS5zdWJzdHJpbmcoMSwgdHlwZUFyclsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IGFycmF5TGVuZ3RoLnNwbGl0KCcuLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyU3RhcnRJZHggPSBwYXJzZUludChhcnJheUxlbmd0aFswXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMV0sIDEwKSAtIHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyYXlMZW5ndGggPSBhcnJheUxlbmd0aDtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EYXRhIHR5cGUgb2YgdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzNdLnNwbGl0KCcoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnN0cmluZ0xlbmd0aCA9IHBhcnNlSW50KHR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmZ1bGxUeXBlID0gdHlwZUFyclswXSArICcuJyArIGFycmF5TGVuZ3RoICsgJy4nICsgdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGFkZGVkIGNhdXNlIHRoZXJlIGFyZSB1bmRlZmluZWQgZGF0YSB0eXBlcyBzb21lIFR3aW5DQVQgbGlicyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZS5za2lwTWlzc2luZ1R5cGVzID09PSB0cnVlICYmIHRoaXMuZGF0YVR5cGVUYWJsZVt0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGVTdHJpbmddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogRGF0YSB0eXBlIG1pc3NpbmcgaW4gVFBZIGZpbGU6Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IEFjY2VzcyB0byBzeW1ib2xzIHVzaW5nIHRoaXMgZGF0YSB0eXBlIHdpbGwgcmV0dXJuIHdyb25nIHJlc3VsdHM6Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFVzZSBoYW5kbGVzIHRvIGFjY2VzcyBzeW1ib2xzIHVzaW5nIHRoaXMgZGF0YSB0eXBlLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFUeXBlVGFibGVbdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlU3RyaW5nXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBEYXRhIHR5cGUgbWlzc2luZyBpbiBUUFkgZmlsZSEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogSWYgeW91IGRvblxcJ3QgdXNlIHRoaXMgZGF0YSB0eXBlIHlvdSBjYW4gc2V0IHRoZSBjbGllbnQgcGFyYW1ldGVyIFwic2tpcE1pc3NpbmdUeXBlc1wiIHRvIHRydWUuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5iaXRTaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW3RoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZVN0cmluZ10uYml0U2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5zaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW3RoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZVN0cmluZ10uc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSXRlbSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLml0ZW1TaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5zaXplIC8gYXJyYXlMZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmFycmF5RGF0YVR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIHRoaXMucGxjVHlwZUxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyYXlEYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyYXlEYXRhVHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclswXS5zcGxpdCgnKCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1N0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5mdWxsVHlwZSA9IHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnN0cmluZ0xlbmd0aCA9IHBhcnNlSW50KHR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmZ1bGxUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtIGluIHRoaXMucGxjVHlwZUxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogU2tpcHBpbmcgU3ViSXRlbSB3aXRoIG5vIHR5cGUgaW5mb3JtYXRpb246IERhdGEgdHlwZTogJyArIG5hbWUgKyAnICxTdWJJdGVtOiAnICsgc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRW5kIG9mIHJlYWRpbmcgdGhlIGRhdGEgdHlwZXMgZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRGF0YSB0eXBlIHRhYmxlIHJlYWR5LicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vR2V0IFVwbG9hZCBJbmZvXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tHZXRVcGxvYWRJbmZvKCk7XG5cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgY3JlYXRpbmcgdGhlIGRhdGEgdHlwZSBpbmZvcm1hdGlvbjonKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1R5cGU6ICcgKyBmdWxsTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdTdWJJdGVtOiAnICsgc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeG1sSHR0cFJlcS5zZW5kKG51bGwpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgU2V0IHRoZSBzZXJ2aWNlIHBhcmFtZXRlciB3aXRoIHRoZSB2YWx1ZXMgcmVhZCBmcm9tIHRoZSBUUFkgZmlsZS5cbiAgICAgKi9cbiAgICBzZXRTZXJ2aWNlUGFyYW1Gcm9tVFBZKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZS5hbXNOZXRJZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5hbXNOZXRJZCA9IHRoaXMuc2VydmljZUluZm8ubmV0SWQ7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IE5vIE5ldElkIGRlZmluaXRpb24gZm91bmQuIE5ldElkIGZyb20gVFBZIGZpbGUgd2lsbCBiZSB1c2VkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlcnZpY2UuYW1zUG9ydCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5hbXNQb3J0ID0gdGhpcy5zZXJ2aWNlSW5mby5wb3J0O1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBObyBBTVMgcG9ydCBkZWZpbml0aW9uIGZvdW5kLiBQb3J0IG51bWJlciBmcm9tIFRQWSBmaWxlIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZUluZm8uYWxpZ25tZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IHRoaXMuc2VydmljZUluZm8uYWxpZ25tZW50O1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogTm8gYWxpZ25tZW50IHBhcmFtZXRlciBmb3VuZC4gQWxpZ25tZW50IGZyb20gVFBZIGZpbGUgd2lsbCBiZSB1c2VkLicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBDYW5cXCd0IGdldCBhIHZhbHVlIGZvciB0aGUgZGF0YSBhbGlnbWVudC4gRGVmYXVsdCB2YWx1ZSBmb3IgYWxpZ25tZW50IGlzIHVzZWQgKDEpLiBUaGlzIHdvcmtzIG9ubHkgd2l0aCBUQzIgYW5kIHg4NiBwcm9jZXNzb3JzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ICE9PSAxICYmIHRoaXMuYWxpZ25tZW50ICE9PSA0ICYmIHRoaXMuYWxpZ25tZW50ICE9PSA4KSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFRoZSB2YWx1ZSBmb3IgdGhlIGFsaWdubWVudCBzaG91bGQgYmUgMSwgNCBvciA4LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBUYXJnZXQgaW5mb3JtYXRpb246IE5ldElkOiAnICsgdGhpcy5zZXJ2aWNlLmFtc05ldElkICsgJywgQU1TIHBvcnQ6ICcgKyB0aGlzLnNlcnZpY2UuYW1zUG9ydCArICcgLCBhbGlnbm1lbnQ6ICcgKyB0aGlzLmFsaWdubWVudCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgVXBsb2FkSW5mbyBoYXMgdG8gYmUgZmV0Y2hlZC5cbiAgICAgKi9cbiAgICBjaGVja0dldFVwbG9hZEluZm8oKSB7XG5cbiAgICAgICAgdGhpcy5zZXRTZXJ2aWNlUGFyYW1Gcm9tVFBZKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlcnZpY2UuY29uZmlnRmlsZVVybCAhPSAnc3RyaW5nJyB8fCB0aGlzLnNlcnZpY2UuZm9yY2VVcGxvYWRVc2FnZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTdGFydCBmZXRjaGluZyB0aGUgc3ltYm9scyBmcm9tIFBMQy4nKTtcbiAgICAgICAgICAgIC8vR2V0IHRoZSBVcGxvYWRJbmZvLlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFVwbG9hZEluZm8oKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZFxcJ250IGZldGNoIHRoZSBzeW1ib2wgaW5mb3JtYXRpb24gZnJvbSB0aGUgUExDOicgKyBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLnN5bmNYbWxIdHRwICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlYWR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIHRoZSBvblJlYWR5IGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vT24tcmVhZHktZnVuY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlcnZpY2Uub25SZWFkeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBDYWxsaW5nIHRoZSBcIm9uUmVhZHlcIiBmdW5jdGlvbi4nKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5vblJlYWR5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBcIm9uUmVhZHlcIiBmdW5jdGlvbiBkZWZpbmVkLiBDaGVjayB0aGUgbWFudWFsLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vU3RhcnQgY3ljbGljIEFEUyBjaGVja3MgaWYgZGVmaW5lZFxuICAgICAgICBpZiAoIWlzTmFOKHRoaXMuc2VydmljZS5hZHNDaGVja0ludGVydmFsKSAmJiB0aGlzLnNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IGN5Y2xpYyByZWFkaW5nIG9mIEFEUyBzdGF0ZS4nKTtcbiAgICAgICAgICAgIHNldEludGVydmFsKHRoaXMucmVhZEFkc1N0YXRlLCB0aGlzLnNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==