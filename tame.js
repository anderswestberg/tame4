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
            //Generate the SOAP request.
            let soapReq = '<?xml version=\'1.0\' encoding=\'utf-8\'?>';
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
            this.xmlHttpReq.open('POST', this.service.serviceUrl, true, this.service.serviceUser, this.service.servicePassword);
            this.xmlHttpReq.setRequestHeader('SOAPAction', 'http://beckhoff.org/action/TcAdsSync.' + adsReq.method);
            this.xmlHttpReq.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
            let options = {
                method: 'POST',
                headers: [
                    ['SOAPAction', 'http://beckhoff.org/action/TcAdsSync.' + adsReq.method],
                    ['Content-Type', 'text/xml; charset=utf-8']
                ],
                body: soapReq
            };
            if (this.service.serviceUser || this.service.servicePassword)
                options.headers.push(['Authorization', 'Basic ' + btoa(this.service.serviceUser + ":" + this.service.servicePassword)]);
            let response = yield fetch(this.service.serviceUrl, options);
            return this.parseResponse(adsReq);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFhLElBQUk7SUFpSGIsWUFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUFoSC9CLFlBQU8sR0FBRyxlQUFlLENBQUE7UUFDekIsb0JBQWUsR0FBRztZQUNkLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUM5QyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDeEQsQ0FBQTtRQUNELG1CQUFjLEdBQUc7WUFDYixFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFDckYsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO1NBQ3JGLENBQUE7UUFDRCxxQkFBZ0IsR0FBRztZQUNmLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3hGLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFD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QUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzNFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3ZFLGdCQUFXLEdBQUcsQ0FBTyxJQUFJLEVBQUUsRUFBRSxnREFBQyxPQUFBLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBLEdBQUEsQ0FBQTtRQUM3RSxnQkFBVyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDN0UsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsY0FBUyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDekUsY0FBUyxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDekUsZUFBVSxHQUFHLENBQU8sSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUE7UUFDM0UsZ0JBQVcsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzdFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3ZFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3pFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBRXJFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLFlBQU8sR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3BFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQzFFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3RFLGNBQVMsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFBO1FBQ3hFLGVBQVUsR0FBRyxDQUFPLElBQUksRUFBRSxFQUFFLGdE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QyxFQUFFO29CQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsMEVBQTBFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pGLE9BQU87aUJBQ1Y7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtvQkFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNsQjthQUNKO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0gsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsc0VBQXNFLENBQUMsQ0FBQztTQUNwRjtRQUNELG9DQUFvQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixJQUFJLENBQUMsRUFBRTtZQUM3RSxJQUFJLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7WUFDbEUsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0wsQ0FBQztDQUVKO0FBL3VKRCxvQkErdUpDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRBTUUge1xuICAgIHZlcnNpb24gPSAnVjQuMy4xIDE3MTEyMCdcbiAgICB3ZWVrZFNob3J0TmFtZXMgPSB7XG4gICAgICAgIGdlOiBbJ1NvJywgJ01vJywgJ0RpJywgJ01pJywgJ0RvJywgJ0ZyJywgJ1NhJ10sXG4gICAgICAgIGVuOiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddXG4gICAgfVxuICAgIHdlZWtkTG9uZ05hbWVzID0ge1xuICAgICAgICBnZTogWydTb25udGFnJywgJ01vbnRhZycsICdEaWVuc3RhZycsICdNaXR0d29jaCcsICdEb25uZXJzdGFnJywgJ0ZyZWl0YWcnLCAnU2Ftc3RhZyddLFxuICAgICAgICBlbjogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG4gICAgfVxuICAgIG1vbnRoc1Nob3J0TmFtZXMgPSB7XG4gICAgICAgIGdlOiBbJ0phbicsICdGZWInLCAnTXJ6JywgJ0FwcicsICdNYWknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09rdCcsICdOb3YnLCAnRGV6J10sXG4gICAgICAgIGVuOiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZXonXVxuICAgIH1cbiAgICBtb250aHNMb25nTmFtZXMgPSB7XG4gICAgICAgIGdlOiBbJ0phbnVhcicsICdGZWJydWFyJywgJ03DpHJ6JywgJ0FwcmlsJywgJ01haScsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPa3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlemVtYmVyJ10sXG4gICAgICAgIGVuOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXVxuICAgIH1cbiAgICBkYXRlTmFtZXM6IHsgd2Vla2RTaG9ydDogYW55OyB3ZWVrZExvbmc6IGFueTsgbW9udGhzU2hvcnQ6IGFueTsgbW9udGhzTG9uZzogYW55IH1cbiAgICBtYXhTdHJpbmdMZW46IG51bWJlclxuICAgIG1heERyb3BSZXE6IG51bWJlclxuICAgIHVzZUNoZWNrQm91bmRzOiBib29sZWFuXG4gICAgYWRzU3RhdGU6IGFueVxuICAgIGFkc1N0YXRlVHh0OiBzdHJpbmdcbiAgICBkZXZpY2VTdGF0ZTogYW55XG4gICAgc3ltVGFibGVSZWFkeTogYm9vbGVhblxuICAgIGRhdGFUeXBlVGFibGVSZWFkeTogYm9vbGVhblxuICAgIGhhbmRsZUNhY2hlUmVhZHk6IGJvb2xlYW5cbiAgICB4bWxIdHRwUmVxVGltZW91dDogbnVtYmVyXG5cbiAgICBpbmRleEdyb3VwcyA9IHtcbiAgICAgICAgTTogMTY0MTYsICAgIC8vUExDIG1lbW9yeSByYW5nZSglTSBmaWVsZCksIFJFQURfTSAtIFdSSVRFX01cbiAgICAgICAgTVg6IDE2NDE3LCAgIC8vUExDIG1lbW9yeSByYW5nZSglTVggZmllbGQpLCBSRUFEX01YIC0gV1JJVEVfTVhcbiAgICAgICAgREI6IDE2NDQ4LCAgIC8vRGF0YSByYW5nZVxuICAgICAgICBJOiA2MTQ3MiwgICAgLy9QTEMgcHJvY2VzcyBkaWFncmFtIG9mIHRoZSBwaHlzaWNhbCBpbnB1dHMoJUkgZmllbGQpLCBSRUFEX0kgLSBXUklURV9JXG4gICAgICAgIElYOiA2MTQ3MywgICAvL1BMQyBwcm9jZXNzIGRpYWdyYW0gb2YgdGhlIHBoeXNpY2FsIGlucHV0cyglSVggZmllbGQpLCBSRUFEX0lYIC0gV1JJVEVfSVhcbiAgICAgICAgUTogNjE0ODgsICAgIC8vUExDIHByb2Nlc3MgZGlhZ3JhbSBvZiB0aGUgcGh5c2ljYWwgb3V0cHV0cyglUSBmaWVsZCksIFJFQURfUSAtIFdSSVRFX1FcbiAgICAgICAgUVg6IDYxNDg5LCAgIC8vUExDIHByb2Nlc3MgZGlhZ3JhbSBvZiB0aGUgcGh5c2ljYWwgb3V0cHV0cyglUVggZmllbGQpLCBSRUFEX1FYIC0gV1JJVEVfUVhcbiAgICAgICAgVXBsb2FkOiA2MTQ1MSwgICAgICAvL0NvbnRhaW5zIHRoZSBzeW1ib2wgaW5mb3JtYXRpb25cbiAgICAgICAgVXBsb2FkSW5mbzogNjE0NTIsICAvL0xlbmd0aCBhbmQgbnVtYmVyIG9mIHRoZSBzeW1ib2wgaW5mb3JtYXRpb24gICAgICAgIFxuICAgICAgICBIYW5kbGVCeU5hbWU6IDYxNDQzLFxuICAgICAgICBWYWx1ZUJ5SGFuZGxlOiA2MTQ0NSxcbiAgICAgICAgUmVsZWFzZUhhbmRsZTogNjE0NDYsXG4gICAgICAgIFN1bVJkOiA2MTU2OCwgICAgICAgLy9TdW1VcFJlYWRSZXF1ZXN0XG4gICAgICAgIFN1bVdyOiA2MTU2OSwgICAgICAgLy9TdW1VcFdyaXRlUmVxdWVzdFxuICAgICAgICBTdW1SZFdyOiA2MTU3MCAgICAgIC8vU3VtVXBSZWFkV3JpdGVSZXF1ZXN0XG4gICAgfVxuXG4gICAgLy9MZW5naHQgb2YgUExDIGRhdGEgdHlwZXMgaW4gYnl0ZXMuXG4gICAgcGxjVHlwZUxlbiA9IHtcbiAgICAgICAgQk9PTDogMSxcbiAgICAgICAgQllURTogMSxcbiAgICAgICAgVVNJTlQ6IDEsXG4gICAgICAgIFNJTlQ6IDEsXG4gICAgICAgIFdPUkQ6IDIsXG4gICAgICAgIFVJTlQ6IDIsXG4gICAgICAgIElOVDogMixcbiAgICAgICAgSU5UMTY6IDIsXG4gICAgICAgIElOVDFEUDogMixcbiAgICAgICAgSU5UMkRQOiAyLFxuICAgICAgICBEV09SRDogNCxcbiAgICAgICAgVURJTlQ6IDQsXG4gICAgICAgIERJTlQ6IDQsXG4gICAgICAgIFRJTUU6IDQsICAgICAgICAgIC8vdGltZSBiYXNlIGluIFBMQzogbWlsbGlzZWNvbmRzXG4gICAgICAgIFRPRDogNCwgICAgICAgICAgIC8vdGltZSBiYXNlIGluIFBMQzogbWlsbGlzZWNvbmRzXG4gICAgICAgIFRJTUVfT0ZfREFZOiA0LCAgIC8vVHdpbkNBVDMsIHRpbWUgYmFzZSBpbiBQTEM6IG1pbGxpc2Vjb25kc1xuICAgICAgICBEQVRFOiA0LCAgICAgICAgICAvL3RpbWUgYmFzZSBpbiBQTEM6IHNlY29uZHNcbiAgICAgICAgRFQ6IDQsICAgICAgICAgICAgLy90aW1lIGJhc2UgaW4gUExDOiBzZWNvbmRzXG4gICAgICAgIERBVEVfQU5EX1RJTUU6IDQsIC8vVHdpbkNBVDMsIHRpbWUgYmFzZSBpbiBQTEM6IHNlY29uZHNcbiAgICAgICAgUE9JTlRFUjogNCxcbiAgICAgICAgUkVBTDogNCxcbiAgICAgICAgTFJFQUw6IDgsXG4gICAgICAgIFNUUklORzogODAsICAgIC8vd2l0aG91dCB0ZXJtaW5hdGlvblxuICAgICAgICBFbmRTdHJ1Y3Q6IDAgICAvL3Nob3VsZCBiZSAwIVxuICAgIH1cblxuICAgIC8vQURTIHN0YXRlc1xuICAgIGFkc1N0YXRlcyA9IFtcbiAgICAgICAgXCJJTlZBTElEXCIsXG4gICAgICAgIFwiSURMRVwiLFxuICAgICAgICBcIlJFU0VUXCIsXG4gICAgICAgIFwiSU5JVFwiLFxuICAgICAgICBcIlNUQVJUXCIsXG4gICAgICAgIFwiUlVOXCIsXG4gICAgICAgIFwiU1RPUFwiLFxuICAgICAgICBcIlNBVkVDRkdcIixcbiAgICAgICAgXCJQT1dFUkdPT0RcIixcbiAgICAgICAgXCJFUlJPUlwiLFxuICAgICAgICBcIlNIVVRET1dOXCIsXG4gICAgICAgIFwiU1VTUEVORFwiLFxuICAgICAgICBcIlJFU1VNRVwiLFxuICAgICAgICBcIkNPTkZJR1wiLFxuICAgICAgICBcIlJFQ09ORklHXCJcbiAgICBdXG4gICAgbGFuZzogYW55XG4gICAgYWxpZ25tZW50OiBudW1iZXJcbiAgICBjdXJyUmVxOiBudW1iZXJbXVxuICAgIHN5bVRhYmxlID0ge31cbiAgICBkYXRhVHlwZVRhYmxlID0ge31cbiAgICBzZXJ2aWNlSW5mbyA9IHt9IGFzIGFueVxuICAgIHN5bWJvbENvdW50OiBudW1iZXJcbiAgICB1cGxvYWRMZW5ndGg6IG51bWJlclxuICAgIGhhbmRsZUNhY2hlID0ge31cbiAgICBoYW5kbGVOYW1lczogYW55W11cbiAgICB4bWxIdHRwUmVxOiBhbnlcbiAgICBsb2cobWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhbGVydChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzZXJ2aWNlOiBhbnkpIHtcblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHZlcnNpb246ICcgKyB0aGlzLnZlcnNpb24pO1xuXG4gICAgICAgIC8vU2V0IGxhbmd1YWdlIGZvciBuYW1lcyBvZiBkYXlzIGFuZCBtb250aHMsIGRlZmF1bHQgaXMgZ2VybWFuLlxuICAgICAgICB0aGlzLmxhbmcgPSAodHlwZW9mIHNlcnZpY2UubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSA/IHNlcnZpY2UubGFuZ3VhZ2UgOiAnZ2UnLFxuXG4gICAgICAgIC8vQWxpZ25tZW50XG4gICAgICAgIHRoaXMuYWxpZ25tZW50ID0gMCxcblxuICAgICAgICAvL0FycmF5IGZvciB0aGUgcmVxdWVzdCBhY2tub3dsZWRnZW1lbnQgY291bnRlci5cbiAgICAgICAgdGhpcy5jdXJyUmVxID0gWzBdLFxuXG4gICAgICAgIC8vVGhlIFN5bWJvbCBUYWJsZSBmb3IgYWNjZXNzaW5nIHZhcmlhYmxlcyBwZXIgbmFtZS5cbiAgICAgICAgdGhpcy5zeW1UYWJsZSA9IHt9LFxuICAgICAgICAvL3RoaXMuc3ltVGFibGVPayA9IGZhbHNlLFxuICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGUgPSB7fSxcbiAgICAgICAgLy90aGlzLmRhdGFUeXBlVGFibGVPayA9IGZhbHNlLFxuICAgICAgICB0aGlzLnNlcnZpY2VJbmZvID0ge30sXG5cbiAgICAgICAgLy9WYXJpYWJsZXMgb2YgdGhlIFVwbG9hZEluZm8gXG4gICAgICAgIHRoaXMuc3ltYm9sQ291bnQgPSAwLCB0aGlzLnVwbG9hZExlbmd0aCA9IDAsXG5cbiAgICAgICAgLy9PYmplY3QgdG8gc3RvcmUgdGhlIGhhbmRsZXNcbiAgICAgICAgdGhpcy5oYW5kbGVDYWNoZSA9IHt9LFxuICAgICAgICB0aGlzLmhhbmRsZU5hbWVzID0gW107XG5cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGVjayBDbGllbnQgUGFyYW1ldGVyXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvL1VSTCBvZiB0aGUgVGNBZHNXZWJTZXJ2aWNlLmRsbFxuICAgICAgICBpZiAodHlwZW9mIHNlcnZpY2Uuc2VydmljZVVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFNlcnZpY2UgVVJMIGlzIG5vdCBhIHN0cmluZyEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQU1TIE5ldElEIG9mIHRoZSBQTENcbiAgICAgICAgaWYgKHR5cGVvZiBzZXJ2aWNlLmFtc05ldElkICE9PSAnc3RyaW5nJyAmJiAodHlwZW9mIHNlcnZpY2UuY29uZmlnRmlsZVVybCAhPT0gJ3N0cmluZycgfHwgc2VydmljZS5kb250RmV0Y2hTeW1ib2xzID09PSB0cnVlKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTmV0SWQgaXMgbm90IGRlZmluZWQgYW5kIHRoZXJlIGlzIG5vIFVSTCBmb3IgZmV0Y2hpbmcgdGhlIFRQWSBmaWxlIG9yIGZldGNoaW5nIHRoZSBzeW1ib2xzIGlzIGRlYWN0aXZhdGVkIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BTVMgUG9ydCBOdW1iZXIgb2YgdGhlIFJ1bnRpbWUgU3lzdGVtXG4gICAgICAgIGlmIChzZXJ2aWNlLmFtc1BvcnQgPT09IHVuZGVmaW5lZCAmJiAodHlwZW9mIHNlcnZpY2UuY29uZmlnRmlsZVVybCAhPT0gJ3N0cmluZycgfHwgc2VydmljZS5kb250RmV0Y2hTeW1ib2xzID09PSB0cnVlKSkge1xuICAgICAgICAgICAgc2VydmljZS5hbXNQb3J0ID0gJzgwMSc7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IEFNUyBwb3J0IG51bWJlciBpcyBub3Qgc2V0ISBEZWZhdWx0IHBvcnQgODAxIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VydmljZS5hbXNQb3J0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBBTVMgcG9ydCBudW1iZXIgaXMgbm90IGEgc3RyaW5nISBUcnlpbmcgdG8gY29udmVydCBpdC4nKTtcbiAgICAgICAgICAgIHNlcnZpY2UuYW1zUG9ydCA9IHNlcnZpY2UuYW1zUG9ydC50b1N0cmluZygxMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnNlSW50KHNlcnZpY2UuYW1zUG9ydCwgMTApIDwgODAxIHx8IHBhcnNlSW50KHNlcnZpY2UuYW1zUG9ydCwgMTApID4gODkxKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBTVMgUG9ydCBOdW1iZXIgKCcgKyBwYXJzZUludChzZXJ2aWNlLmFtc1BvcnQsIDEwKSArICcpIGlzIG91dCBvZiByYW5nZSAoODAxLTg5MSkhJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL0RhdGEgYWxpZ25tZW50LCB4ODYgYW5kIFRDMiB1c2VzIGEgMSBieXRlIGFsaWdubWVudCwgZm9yIGFuIEFSTSBhbmQgVEMyIHNldCBpdCB0byA0IGFuZFxuICAgICAgICAvL2ZvciBUQzMgZ2VuZXJhbGx5IHRvIDg7IFxuICAgICAgICAvL2RhdGFBbGlnbjQgaXMgZGVwcmljYXRlZFxuICAgICAgICBpZiAoc2VydmljZS5kYXRhQWxpZ240ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VydmljZS5hbGlnbm1lbnQgPT09IHVuZGVmaW5lZCAmJiAodHlwZW9mIHNlcnZpY2UuY29uZmlnRmlsZVVybCAhPT0gJ3N0cmluZycgfHwgc2VydmljZS5kb250RmV0Y2hTeW1ib2xzID09PSB0cnVlKSkge1xuICAgICAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXJ2aWNlLmFsaWdubWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuYWxpZ25tZW50ID0gcGFyc2VJbnQoc2VydmljZS5hbGlnbm1lbnQsIDEwKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VydmljZS5hbGlnbm1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IHNlcnZpY2UuYWxpZ25tZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HbG9iYWwgc3luY2hyb25vdXMgWE1MSFRUUFJlcXVlc3RzXG4gICAgICAgIGlmIChzZXJ2aWNlLnN5bmNYbWxIdHRwID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFRoZSBcInN5bmNYbWxIdHRwXCIgcGFyYW1ldGVyIGlzIHNldCB0byB0cnVlLiBTeW5jaHJvbm91cyBYTUxIdHRwUmVxdWVzdHMgd2lsbCBiZSB1c2VkIGJ5IGRlZmF1bHQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0Rvbid0IGxldCBpdCB1bmRlZmluZWRcbiAgICAgICAgICAgIHNlcnZpY2Uuc3luY1htbEh0dHAgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vVXNlcm5hbWUvcGFzc3dvcmRcbiAgICAgICAgaWYgKHR5cGVvZiBzZXJ2aWNlLnNlcnZpY2VVc2VyID09PSAnc3RyaW5nJyAmJiB0eXBlb2Ygc2VydmljZS5zZXJ2aWNlUGFzc3dvcmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFVzZXJuYW1lIGFuZCBwYXNzd29yZCBzZXQuIEF1dGhlbnRpY2F0ZWQgcmVxdWVzdHMgd2lsbCBiZSB1c2VkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlVXNlciA9IG51bGw7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VQYXNzd29yZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dsb2JhbCB1c2Ugb2YgaGFuZGxlc1xuICAgICAgICBpZiAoc2VydmljZS51c2VIYW5kbGVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFRoZSBcInVzZUhhbmRsZXNcIiBwYXJhbWV0ZXIgaXMgc2V0IHRvIHRydWUuIEhhbmRsZXMgd2lsbCBiZSB1c2VkIGJ5IGRlZmF1bHQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Rvbid0IGNoZWNrIGZvciBtaXNzaW5nIGRhdGEgdHlwZXMgKHRoYXRzIGEgcHJvYmxlbSB3aXRoIHNvbWUgVHdpbkNBVCBsaWJzKVxuICAgICAgICBpZiAoc2VydmljZS5za2lwTWlzc2luZ1R5cGVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFRoZSBcInNraXBNaXNzaW5nVHlwZXNcIiBwYXJhbWV0ZXIgaXMgc2V0IHRvIHRydWUuIFRBTUUganVzdCBkcm9wcyBhIGxvZyBtZXNzYWdlIGlmIHRoZXJlIGFyZSBUd2luQ0FUIGxpYnMgd2l0aCBtaXNzaW5nIGRhdGEgdHlwZXMuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNraXBNaXNzaW5nVHlwZXMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ3ljbGljIEFEUyBjaGVja3MgKGV4cGVyaW1lbnRhbCkuXG4gICAgICAgIGlmICghaXNOYU4oc2VydmljZS5hZHNDaGVja0ludGVydmFsKSAmJiBzZXJ2aWNlLmFkc0NoZWNrSW50ZXJ2YWwgPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBDeWNsaWMgQURTIHN0YXRlIGNoZWNrcyBlbmFibGVkLiBJbnRlcnZhbCB0aW1lOiAnICsgc2VydmljZS5hZHNDaGVja0ludGVydmFsICsgJyBtcy4nKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluaXRpYWxpemUgUHJvcGVydGllc1xuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLy9TZXQgbGFuZ3VhZ2Ugc3BlY2lmaWMgbmFtZXMgb2YgZGF5cyBhbmQgbW9udGhzLlxuICAgICAgICB0aGlzLmRhdGVOYW1lcyA9IHtcbiAgICAgICAgICAgIHdlZWtkU2hvcnQ6IHRoaXMud2Vla2RTaG9ydE5hbWVzW3RoaXMubGFuZ10sXG4gICAgICAgICAgICB3ZWVrZExvbmc6IHRoaXMud2Vla2RMb25nTmFtZXNbdGhpcy5sYW5nXSxcbiAgICAgICAgICAgIG1vbnRoc1Nob3J0OiB0aGlzLm1vbnRoc1Nob3J0TmFtZXNbdGhpcy5sYW5nXSxcbiAgICAgICAgICAgIG1vbnRoc0xvbmc6IHRoaXMubW9udGhzTG9uZ05hbWVzW3RoaXMubGFuZ11cbiAgICAgICAgfTtcblxuICAgICAgICAvL01heGltdW0gc3RyaW5nIGxlbmd0aC5cbiAgICAgICAgdGhpcy5tYXhTdHJpbmdMZW4gPSAyNTU7XG5cbiAgICAgICAgLy9NYXhpbXVtIGNvdW50IG9mIGRyb3BwZWQgcmVxdWVzdHMgYWZ0ZXIgYSByZXF1ZXN0XG4gICAgICAgIC8vd2FzIG5vdCBhY2tub3dsZWRnZWQgKGluIGNvbmp1bmN0aW9uIHdpdGggYSByZXFlc3QgSUQpLlxuICAgICAgICB0aGlzLm1heERyb3BSZXEgPSAxMDtcblxuICAgICAgICAvL0NoZWNrIGxpbWl0cyBvZiBudW1lcmljIHZhcmlhYmxlcyBiZWZvcmUgc2VuZGluZyB0aGVtIHRvIHRoZSBQTENcbiAgICAgICAgdGhpcy51c2VDaGVja0JvdW5kcyA9IHRydWU7XG5cbiAgICAgICAgLy9BRFMgc3RhdGVzXG4gICAgICAgIHRoaXMuYWRzU3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLmFkc1N0YXRlVHh0ID0gJyc7XG4gICAgICAgIHRoaXMuZGV2aWNlU3RhdGUgPSBudWxsO1xuXG4gICAgICAgIC8vUmVhZHkgc3RhdGVzXG4gICAgICAgIHRoaXMuc3ltVGFibGVSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhbmRsZUNhY2hlUmVhZHkgPSBmYWxzZTtcblxuICAgICAgICAvL1hNTEh0dHBSZXF1ZXN0IHRpbWVvdXRcbiAgICAgICAgdGhpcy54bWxIdHRwUmVxVGltZW91dCA9IDUwMDA7XG4gICAgfVxuXG4gICAgYXN5bmMgb3BlbigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgbmFtZXMgb2YgdGhlIFBMQyB2YXJpYWJsZXMgdXNpbmcgdGhlIHVwbG9hZCBpbmZvLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHRoaXMuc2VydmljZS5kb250RmV0Y2hTeW1ib2xzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFJlYWRpbmcgb2YgdGhlIFVwbG9hZEluZm8gYW5kIHRoZSBUUFkgZmlsZSBkZWFjdGl2YXRlZC4gU3ltYm9sIFRhYmxlIGNvdWxkIG5vdCBiZSBjcmVhdGVkLicpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgIT09IDEgJiYgdGhpcy5hbGlnbm1lbnQgIT09IDQgJiYgdGhpcy5hbGlnbm1lbnQgIT09IDgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFRoZSB2YWx1ZSBmb3IgdGhlIGFsaWdubWVudCBzaG91bGQgYmUgMSwgNCBvciA4LicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFRhcmdldCBpbmZvcm1hdGlvbjogTmV0SWQ6ICcgKyB0aGlzLnNlcnZpY2UuYW1zTmV0SWQgKyAnLCBBTVMgcG9ydDogJyArIHRoaXMuc2VydmljZS5hbXNQb3J0ICsgJyAsIGFsaWdubWVudDogJyArIHRoaXMuYWxpZ25tZW50KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZS5zeW5jWG1sSHR0cCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMub25SZWFkeSwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEZldGNoaW5nIHRoZSBUUFkgZmlsZSBmcm9tIHRoZSB3ZWJzZXJ2ZXIuJyk7XG4gICAgICAgICAgICAgICAgLy9HZXQgdGhlIHN5bWJvbCBmaWxlIGFuZCBwYXJzZSBpdC4gVXBsb2FkIEluZm8gd2lsbCBiZSBmZXRjaGVkIGFmdGVyLlxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0Q29uZmlnRmlsZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL1N0YXJ0IGdldHRpbmcgdGhlIFVwbG9hZCBJbmZvLlxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hlY2tHZXRVcGxvYWRJbmZvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWxwZXIgRnVuY3Rpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIHZhcmlhYmxlIG5hbWVzIHBhc3NlZCBhcyBzdHJpbmdzIGFuZCByZXR1cm4gdGhlIG9iamVjdCxcbiAgICAgKiBzdG9yZSBkYXRhIHZhbHVlcyBpZiB0aGV5IGFyZSBwYXNzZWQgdG9vLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAgICBUaGUgbmFtZSBvZiBhIEphdmFTY3JpcHQgdmFyaWFibGUgb3IgYSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAgICAgRGF0YSB2YWx1ZXMgdG8gc3RvcmUgaW4gdGhlIHZhcmlhYmxlL3Byb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogICAgICBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHByb3BlcnR5IHRvIHN0b3JlIHRoZSBkYXRhIGluLiBcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlZCB3aXRoIGNyZWF0ZUFycmF5RGVzY3JpcHRvciBhbmQgY3JlYXRlU3RydWN0RGVzY3JpcHRvciBcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5cbiAgICAgKi9cbiAgICBwYXJzZVZhck5hbWUobmFtZSwgZGF0YT8sIG9iaj8sIHByZWZpeD8sIHN1ZmZpeD8pIHtcblxuICAgICAgICB2YXIgYXJyID0gW10sXG4gICAgICAgICAgICBsYXN0ID0gMCxcbiAgICAgICAgICAgIGEgPSBbXSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGFyclswXSA9IG5hbWUudG9TdHJpbmcoMTApO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYXJyID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ2FuXFwndCBwYXJzZSBuYW1lIG9mIG9iamVjdC92YXJpYWJsZS4gTmFtZSBpcyBub3QgYSBzdHJpbmcgb3IgbnVtYmVyIScpO1xuICAgICAgICAgICAgdGhpcy5sb2cobmFtZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9iaiA9IHdpbmRvdztcbiAgICAgICAgfVxuICAgICAgICBsYXN0ID0gYXJyLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgLy9XYWxrIHRocm91Z2ggdGhlIHRpZXJzXG4gICAgICAgIHdoaWxlIChpIDwgbGFzdCkge1xuICAgICAgICAgICAgLy9DaGVjayBpZiB0aGUgcGFzc2VkIG5hbWUgcG9pbnRzIHRvIGFuIGFycmF5LlxuICAgICAgICAgICAgaWYgKGFycltpXS5jaGFyQXQoYXJyW2ldLmxlbmd0aCAtIDEpID09PSAnXScpIHtcbiAgICAgICAgICAgICAgICBhID0gYXJyW2ldLnN1YnN0cmluZygwLCBhcnJbaV0ubGVuZ3RoIC0gMSkuc3BsaXQoJ1snKTtcbiAgICAgICAgICAgICAgICBvYmogPSBvYmpbYVswXV1bYVsxXV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGFuIGFycmF5IGlmIG9iamVjdCBpcyBub3QgZGVmaW5lZC5cbiAgICAgICAgICAgICAgICAvL1RoaXMgY2FuIGhhcHBlbiB3aGVuIGFuIGFycmF5IG9mIHN0cnVjdHVyZSBpc1xuICAgICAgICAgICAgICAgIC8vbm90IGRlZmluZWQuXG4gICAgICAgICAgICAgICAgaWYgKG9ialthcnJbaV1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW2FycltpXV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqID0gb2JqW2FycltpXV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICAvL0xhc3QgZWxlbWVudFxuICAgICAgICBpZiAoYXJyW2ldLmNoYXJBdChhcnJbaV0ubGVuZ3RoIC0gMSkgPT09ICddJykge1xuICAgICAgICAgICAgLy9JZiBsYXN0IGl0ZW0gb2YgdGhlIG5hbWUgaXMgYW4gYXJyYXlcbiAgICAgICAgICAgIGEgPSBhcnJbaV0uc3Vic3RyaW5nKDAsIGFycltpXS5sZW5ndGggLSAxKS5zcGxpdCgnWycpO1xuICAgICAgICAgICAgb2JqID0gb2JqW2FbMF1dO1xuXG4gICAgICAgICAgICAvL1N0b3JlIGRhdGEgaWYgcGFzc2VkLlxuICAgICAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJlZml4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gcHJlZml4ICsgZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWZmaXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhICsgc3VmZml4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYmpbYVsxXV0gPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9ialthWzFdXTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy9TdG9yZSBkYXRhIGlmIHBhc3NlZC5cbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmVmaXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHByZWZpeCArIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1ZmZpeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSArIHN1ZmZpeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ialthcnJbaV1dID0gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqW2FycltpXV07XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgcGFzc2VkIHN0cmluZyBsZW5ndGggaXMgdmFsaWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlblxuICAgICAqL1xuICAgIGlzVmFsaWRTdHJpbmdMZW4obGVuKSB7XG4gICAgICAgIGlmIChsZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNOYU4obGVuKSAmJiBsZW4gPiAwICYmIGxlbiA8PSB0aGlzLm1heFN0cmluZ0xlbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVXNlciBkZWZpbmVkIHN0cmluZyBsZW5ndGggbm90IHZhbGlkISBsZW5ndGg6ICcgKyBsZW4pO1xuICAgICAgICB0aGlzLmxvZygnTWF4LiBzdHJpbmcgbGVuZ3RoOiAnICsgdGhpcy5tYXhTdHJpbmdMZW4pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gcmV0dXJucyB0aGUgSW5kZXhHcm91cCBmb3IgYSBQTEMgdmFyaWFibGUgYWRkcmVzcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVxICAgICAgICAgIEFuIG9iamVjdCB3aXRoIHRoZSBhZGRyZXNzIG9yIHRoZSBuYW1lIGZvciB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGluZGV4R3JvdXAgIFRoZSBJbmRleEdyb3VwIGZvciB0aGUgQURTIHJlcXVlc3QuIFxuICAgICAqL1xuICAgIGdldEluZGV4R3JvdXAocmVxKSB7XG4gICAgICAgIHZhciBpbmRleEdyb3VwO1xuXG4gICAgICAgIGlmIChyZXEuYWRkcikge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSBJbmRleEdyb3VwIGJ5IGFkZHJlc3NcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLmFkZHIgPT09ICdzdHJpbmcnICYmIHJlcS5hZGRyLmNoYXJBdCgwKSA9PT0gJyUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5hZGRyLmNoYXJBdCgyKSA9PT0gJ1gnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQml0IGFkZHJlc3Nlcy5cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhHcm91cCA9IHRoaXMuaW5kZXhHcm91cHNbcmVxLmFkZHIuc3Vic3RyKDEsIDIpXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL0J5dGUgYWRkcmVzc2VzLlxuICAgICAgICAgICAgICAgICAgICBpbmRleEdyb3VwID0gdGhpcy5pbmRleEdyb3Vwc1tyZXEuYWRkci5zdWJzdHIoMSwgMSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogV3JvbmcgYWRkcmVzcyBkZWZpbml0aW9uLCBzaG91bGQgYmUgYSBzdHJpbmcgYW5kIHN0YXJ0IHdpdGggXCIlXCIhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVxLnVzZUhhbmRsZSA9PT0gdHJ1ZSB8fCB0aGlzLnNlcnZpY2UudXNlSGFuZGxlcyA9PT0gdHJ1ZSAmJiByZXEudXNlSGFuZGxlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgLy9HZXQgdGhlIEluZGV4R3JvdXAgZm9yIHRoZSBWYWx1ZSBCeSBIYW5kbGUgUmVxdWVzdFxuICAgICAgICAgICAgaW5kZXhHcm91cCA9IHRoaXMuaW5kZXhHcm91cHMuVmFsdWVCeUhhbmRsZTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXEuc3ltYm9sTmFtZSkge1xuICAgICAgICAgICAgLy9UcnkgdG8gZ2V0IHRoZSBJbmRleEdyb3VwIGJ5IG5hbWVcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLnN5bWJvbE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhHcm91cCA9IHRoaXMuc3ltVGFibGVbcmVxLnN5bWJvbE5hbWVdLmluZGV4R3JvdXA7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDYW5cXCd0IGdldCB0aGUgSW5kZXhHcm91cCBmb3IgdGhpcyByZXF1ZXN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQbGVhc2UgY2hlY2sgdGhlIHZhcmlhYmxlIG5hbWUuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBWYXJpYmxlIG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gbmFtZSwgYWRkcmVzcyBvciBoYW5kbGUgZm9yIHRoZSB2YXJpYWJsZS9yZXF1ZXN0IGRlZmluZWQhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKGluZGV4R3JvdXApKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBJbmRleEdyb3VwIGlzIG5vdCBhIG51bWJlciwgY2hlY2sgYWRkcmVzcyBvciBuYW1lIGRlZmluaXRpb24gb2YgdGhlIHZhcmlhYmxlL3JlcXVlc3QhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4R3JvdXA7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gcmV0dXJucyB0aGUgSW5kZXhPZmZzZXQgZm9yIGEgUExDIHZhcmlhYmxlIGFkZHJlc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlcSAgICAgICAgICBBbiBvYmplY3Qgd2l0aCB0aGUgYWRkcmVzcyBvciB0aGUgbmFtZSBmb3IgdGhlIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBpbmRleE9mZnNldCBUaGUgSW5kZXhPZmZzZXQgZm9yIHRoZSBBRFMgcmVxdWVzdC4gXG4gICAgICovXG4gICAgZ2V0SW5kZXhPZmZzZXQocmVxKSB7XG4gICAgICAgIHZhciBpbmRleE9mZnNldCwgbnVtU3RyaW5nID0gJycsIG14YWRkciA9IFtdLCBpLCBkYXRhVHlwZSwgaXRlbUFycmF5LCBzcGxpdHRlZFR5cGUsIGJpdG9mZnMsIHN1Yml0ZW07XG5cbiAgICAgICAgaWYgKHJlcS5hZGRyKSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIEluZGV4T2Zmc2V0IGJ5IGFkZHJlc3NcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLmFkZHIgPT09ICdzdHJpbmcnICYmIHJlcS5hZGRyLmNoYXJBdCgwKSA9PT0gJyUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5hZGRyLmNoYXJBdCgyKSA9PT0gJ1gnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQml0IHJlcS5hZGRyZXNzZXMuXG4gICAgICAgICAgICAgICAgICAgIG51bVN0cmluZyA9IHJlcS5hZGRyLnN1YnN0cigzKTtcbiAgICAgICAgICAgICAgICAgICAgbXhhZGRyID0gbnVtU3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gcGFyc2VJbnQobXhhZGRyWzBdLCAxMCkgKiA4ICsgcGFyc2VJbnQobXhhZGRyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9CeXRlIGFkZHJlc3Nlcy5cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSBwYXJzZUludChyZXEuYWRkci5zdWJzdHIoMyksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgLy9BZGRyZXNzIG9mZnNldCBpcyB1c2VkIGlmIG9ubHkgb25lIGl0ZW0gb2YgYW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgLy9zaG91bGQgYmUgc2VudC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXEuYWRkck9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ICs9IHJlcS5hZGRyT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBXcm9uZyBhZGRyZXNzIGRlZmluaXRpb24sIHNob3VsZCBiZSBhIHN0cmluZyBhbmQgc3RhcnQgd2l0aCBcIiVcIiEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXEudXNlSGFuZGxlID09PSB0cnVlIHx8IHRoaXMuc2VydmljZS51c2VIYW5kbGVzID09PSB0cnVlICYmIHJlcS51c2VIYW5kbGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvL1RyeSB0byBnZXQgdGhlIGhhbmRsZSBmb3IgdGhpcyByZXF1ZXN0XG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVDYWNoZVJlYWR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy9HZXQgaGFuZGxlIGNvZGVcbiAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IHRoaXMuaGFuZGxlQ2FjaGVbcmVxLmZ1bGxTeW1ib2xOYW1lXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc05hTihpbmRleE9mZnNldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgaGFuZGxlIGZvciB0aGlzIHN5bWJvbCBuYW1lOiAnICsgcmVxLmZ1bGxTeW1ib2xOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgaGFuZGxlIGZvciB0aGlzIHJlcXVlc3QuIEhhbmRsZSBjYWNoZSBpcyBub3QgcmVhZHkuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVxLnN5bWJvbE5hbWUpIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgSW5kZXhPZmZzZXQgYnkgbmFtZS5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLnN5bWJvbE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIG9mZnNldCBmcm9tIHRoZSBzeW1ib2wgdGFibGVcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSB0aGlzLnN5bVRhYmxlW3JlcS5zeW1ib2xOYW1lXS5pbmRleE9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5zeW1ib2xOYW1lQXJySWR4ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gdGhpcy5zeW1UYWJsZVtyZXEuc3ltYm9sTmFtZV0uaXRlbVNpemUgKiAocmVxLnN5bWJvbE5hbWVBcnJJZHggLSB0aGlzLnN5bVRhYmxlW3JlcS5zeW1ib2xOYW1lXS5hcnJTdGFydElkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL0FkZHJlc3Mgb2Zmc2V0IGlzIHVzZWQgaWYgb25seSBvbmUgaXRlbSBvZiBhbiBhcnJheVxuICAgICAgICAgICAgICAgICAgICAvL3Nob3VsZCBiZSBzZW50LlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5hZGRyT2Zmc2V0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gcmVxLmFkZHJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgYSBtYW51YWxseSBkZWZpbmVkIGJpdCBvZmZzZXQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxLm9mZnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSBwYXJzZUludChyZXEub2ZmcywgMTApIC8gODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVxLm9mZnMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSByZXEub2ZmcyAvIDg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIGJpdCBvZmZzZXQgaWYgYSBzdWJpdGVtIGlzIGdpdmVuLlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLmRhdGFUeXBlTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUFycmF5ID0gcmVxLmRhdGFUeXBlTmFtZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IHRoaXMuc3ltVGFibGVbcmVxLnN5bWJvbE5hbWVdLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9HbyB0aHJvdWdoIHRoZSBhcnJheSB3aXRoIHRoZSBzdWJpdGVtcyBhbmQgYWRkIHRoZSBvZmZzZXRzXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViaXRlbSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbaXRlbUFycmF5W2ldXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCArPSBzdWJpdGVtLmJpdE9mZnNldCAvIDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIG9mZnNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcS5kYXRhVHlwZUFycklkeFtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgKz0gc3ViaXRlbS5pdGVtU2l6ZSAqIChyZXEuZGF0YVR5cGVBcnJJZHhbaV0gLSBzdWJpdGVtLmFyclN0YXJ0SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIGRhdGEgdHlwZSBmb3IgdGhlIG5leHQgcm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbaXRlbUFycmF5W2ldXS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDYW5cXCd0IGdldCB0aGUgSW5kZXhPZmZzZXQgZm9yIHRoaXMgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGxlYXNlIGNoZWNrIHRoZSB2YXJpYWJsZSBkZWZpbml0aW9uIChuYW1lL29mZnMvc3ViaXRlbSkuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBWYXJpYmxlIG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTmVpdGhlciBhIG5hbWUgbm9yIGFuIGFkZHJlc3MgZm9yIHRoZSB2YXJpYWJsZS9yZXF1ZXN0IGRlZmluZWQhJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhyZXEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKGluZGV4T2Zmc2V0KSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogSW5kZXhPZmZzZXQgaXMgbm90IGEgbnVtYmVyLCBjaGVjayBhZGRyZXNzIG9yIG5hbWUgZGVmaW5pdGlvbiBvZiB0aGUgdmFyaWFibGUvcmVxdWVzdC4nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdJbmRleE9mZnNldDogJyArIGluZGV4T2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMubG9nKHJlcSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhPZmZzZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHBhcnNlcyB0aGUgUExDIHZhcmlhYmxlIG5hbWUsIGxvb2tzIGluIHRoZSBzeW1ib2wgYW5kIGRhdGEgdHlwZSB0YWJsZSBhbmQgXG4gICAgICogcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgbmVjZXNzYXJ5IGluZm9ybWF0aW9uLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtICAgICAgICAgIEFuIG9iamVjdCB3aXRoIGF0IGxlYXN0IHRoZSBhZGRyZXNzIG9yIHRoZSBuYW1lIGZvciB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY2N0fSBpdGVtSW5mbyAgICBBbiBvYmplY3Qgd2l0aCB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGl0ZW0uXG4gICAgICogXG4gICAgICovXG4gICAgZ2V0SXRlbUluZm9ybWF0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIGl0ZW1JbmZvID0ge30gYXMgYW55LCBhcnJQbGNWYXJOYW1lLCBzcGxpdFR5cGU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBpdGVtLm5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGFyclBsY1Zhck5hbWUgPSBpdGVtLm5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vUmV0dXJuIGlmIG5vIHN5bWJvbCBuYW1lIGlzIGdpdmVuXG4gICAgICAgICAgICByZXR1cm4gaXRlbUluZm87XG4gICAgICAgIH1cblxuICAgICAgICAvL0dldCB0aGUgc3ltYm9sIG5hbWUuXG4gICAgICAgIGl0ZW1JbmZvLmZ1bGxTeW1ib2xOYW1lID0gaXRlbS5uYW1lO1xuICAgICAgICBpZiAoYXJyUGxjVmFyTmFtZVswXSA9PT0gJycpIHtcbiAgICAgICAgICAgIC8vR2xvYmFsIHZhcmlhYmxlXG4gICAgICAgICAgICBpdGVtSW5mby5zeW1ib2xOYW1lID0gJy4nICsgYXJyUGxjVmFyTmFtZVsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vVmFyaWFibGUgb2YgYW4gaW5zdGFuY2VcbiAgICAgICAgICAgIGl0ZW1JbmZvLnN5bWJvbE5hbWUgPSBhcnJQbGNWYXJOYW1lWzBdICsgJy4nICsgYXJyUGxjVmFyTmFtZVsxXTtcbiAgICAgICAgfVxuICAgICAgICAvL0N1dCBhbiBhcnJheSBpbmRleFxuICAgICAgICBpZiAoaXRlbUluZm8uc3ltYm9sTmFtZS5jaGFyQXQoaXRlbUluZm8uc3ltYm9sTmFtZS5sZW5ndGggLSAxKSA9PT0gJ10nKSB7XG4gICAgICAgICAgICAvL0N1dCB0aGUgYXJyYXkgaW5kZXggYW5kIHN0b3JlIGl0XG4gICAgICAgICAgICBzcGxpdFR5cGUgPSBpdGVtSW5mby5zeW1ib2xOYW1lLnN1YnN0cmluZygwLCBpdGVtSW5mby5zeW1ib2xOYW1lLmxlbmd0aCAtIDEpLnNwbGl0KCdbJyk7XG4gICAgICAgICAgICBpdGVtSW5mby5zeW1ib2xOYW1lID0gc3BsaXRUeXBlWzBdO1xuICAgICAgICAgICAgaXRlbUluZm8uc3ltYm9sTmFtZUFycklkeCA9IHBhcnNlSW50KHNwbGl0VHlwZVsxXSwgMTApO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL0xlYXZlIHRoZSByZXN0IGFzIGFuIGFycmF5IGFuZCBhZGQgaXQgdG8gdGhlIGl0ZW1JbmZvXG4gICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXMgPSBhcnJQbGNWYXJOYW1lLnNsaWNlKDIpO1xuXG4gICAgICAgIHZhciBhcnIgPSBbXSwgdHlwZUFycmF5LCBkYXRhVHlwZSwgaTtcblxuICAgICAgICAvL0dldCBpbmZvcm1hdGlvbiBmcm9tIHRoZSB0YWJsZXNcbiAgICAgICAgaWYgKHRoaXMuc3ltVGFibGVSZWFkeSAmJiB0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSAmJiBpdGVtSW5mby5kYXRhVHlwZU5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgc3ViaXRlbSB0eXBlIGZyb20gdGhlIHN5bWJvbCB0YWJsZSAmJiBkYXRhIHR5cGUgdGFibGVcbiAgICAgICAgICAgIHR5cGVBcnJheSA9IGl0ZW1JbmZvLmRhdGFUeXBlTmFtZXM7XG4gICAgICAgICAgICBkYXRhVHlwZSA9IHRoaXMuc3ltVGFibGVbaXRlbUluZm8uc3ltYm9sTmFtZV0uZGF0YVR5cGU7XG4gICAgICAgICAgICBpdGVtSW5mby5kYXRhVHlwZUFycklkeCA9IFtdO1xuICAgICAgICAgICAgLy9HbyBmb3IgdGhlIGxhc3Qgc3ViaXRlbVxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHRoZSBzdWJpdGVtIGlzIGFuIGFycmF5XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVBcnJheVtpXS5jaGFyQXQodHlwZUFycmF5W2ldLmxlbmd0aCAtIDEpID09PSAnXScpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9DdXQgdGhlIGFycmF5IGluZGV4IGFuZCBzdG9yZSBpdCBpbiBhbiBleHRyYSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBzcGxpdFR5cGUgPSB0eXBlQXJyYXlbaV0uc3Vic3RyaW5nKDAsIHR5cGVBcnJheVtpXS5sZW5ndGggLSAxKS5zcGxpdCgnWycpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlQXJyYXlbaV0gPSBzcGxpdFR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4W2ldID0gcGFyc2VJbnQoc3BsaXRUeXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5wb2ludGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBMQyB2YXJpYWJsZSAnICsgW3R5cGVBcnJheVtpXV0gKyAnIGlzIGEgcG9pbnRlciEgQ2FuXFwndCBnZXQgdGhlIHZhcmlhYmxlIHZhbHVlLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSB0eXBlIG9mIHRoZSBuZXh0IHN1Yml0ZW1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdHlwZUFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgfSB3aGlsZSAoaSA8IHR5cGVBcnJheS5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvL0dldCB0aGUgdHlwZSBvZiB0aGUgc3ViaXRlbVxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnR5cGUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0udHlwZTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheUxlbmd0aCA9IHRoaXMuZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5hcnJheUxlbmd0aDtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheURhdGFUeXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uaXRlbVNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uaXRlbVNpemU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtSW5mby5iaXRPZmZzZXQgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uYml0T2Zmc2V0O1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLm9mZnMgPSBpdGVtLm9mZnM7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8udHlwZSA9PT0gJ1NUUklORycgfHwgaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoOyAvL2NvbXBhdGliaWxpdHlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5kZWNQbGFjZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZGVjUGxhY2VzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZHAgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW0uZHA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4W2ldICE9PSB1bmRlZmluZWQgJiYgaXRlbUluZm8udHlwZSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby50eXBlID0gdGhpcy5kYXRhVHlwZVRhYmxlW2RhdGFUeXBlXS5zdWJJdGVtc1t0eXBlQXJyYXlbaV1dLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uaXRlbVNpemU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQSBwcm9ibGVtIG9jY3VyZWQgd2hpbGUgcmVhZGluZyBhIGRhdGEgdHlwZSBmcm9tIHRoZSBkYXRhIHR5cGUgdGFibGUhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN5bVRhYmxlUmVhZHkpIHtcbiAgICAgICAgICAgIC8vVHJ5IHRvIGdldCB0aGUgdHlwZSBmcm9tIHRoZSBzeW1ib2wgdGFibGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby50eXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5TGVuZ3RoID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmFycmF5TGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheURhdGFUeXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5pdGVtU2l6ZSA9IHRoaXMuc3ltVGFibGVbaXRlbS5uYW1lXS5pdGVtU2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLnNpemU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5iaXRPZmZzZXQgPSB0aGlzLnN5bVRhYmxlW2l0ZW0ubmFtZV0uYml0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5vZmZzID0gaXRlbS5vZmZzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby50eXBlID09PSAnU1RSSU5HJyB8fCBpdGVtSW5mby5hcnJheURhdGFUeXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDsgLy9jb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZGVjUGxhY2VzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5kZWNQbGFjZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZHAgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmRwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLnN5bWJvbE5hbWVBcnJJZHggIT09IHVuZGVmaW5lZCAmJiBpdGVtSW5mby50eXBlID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby50eXBlID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLmFycmF5RGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gdGhpcy5zeW1UYWJsZVtpdGVtLm5hbWVdLml0ZW1TaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEEgcHJvYmxlbSBvY2N1cmVkIHdoaWxlIHJlYWRpbmcgYSBkYXRhIHR5cGUgZnJvbSB0aGUgc3ltYm9sIHRhYmxlIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udHlwZSAhPSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBOZWl0aGVyIGFuIGVudHJ5IGZvciB0aGlzIHN5bWJvbCBpbiB0aGUgc3ltYm9sIHRhYmxlIG5vciB0aGUgdHlwZSBkZWZpbmVkIGJ5IHVzZXIhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy9PdmVycmlkZSB0eXBlIGlmIGRlZmluZWQgYnkgdXNlclxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0udHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy9UeXBlIGlzIGRlZmluZWQgYnkgdXNlciwgdHJ5IHRvIHNwbGl0IGl0XG4gICAgICAgICAgICBhcnIgPSBpdGVtLnR5cGUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIC8vSm9pbiB0aGUgZm9ybWF0dGluZyBzdHJpbmcgaWYgdGhlcmUgd2VyZSBwb2ludHMgaW4gaXQuXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gYXJyLnNsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU2V0IHRoZSB1c2VyIGRlZmluZWQgdHlwZSBpZiBpdCdzIG5vdCBhbiBhcnJheSBvciBzdHJ1Y3R1cmVcbiAgICAgICAgICAgIGlmIChpdGVtSW5mby50eXBlICE9PSAnQVJSQVknICYmIGl0ZW1JbmZvLnR5cGUgIT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnR5cGUgPSBhcnJbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1R5cGUgZGVwZW5kaW5nIGNvZGVcbiAgICAgICAgICAgIGlmIChpdGVtSW5mby50eXBlID09PSAnU1RSSU5HJyAmJiBhcnJbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFyclsxXSA9IHBhcnNlSW50KGFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oYXJyWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBhcnJbMV07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JbmZvLnN0cmluZ0xlbmd0aCA9IGl0ZW1JbmZvLmZvcm1hdDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uc2l6ZSA9IGl0ZW1JbmZvLmZvcm1hdCsrOyAvL1Rlcm1pbmF0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gdGhpcy5wbGNUeXBlTGVuLlNUUklORztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMZW5ndGggb2Ygc3RyaW5nIHZhcmlhYmxlIG5vdCBkZWZpbmVkOiAnICsgaXRlbS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBBIGxlbmd0aCBvZiA4MCBjaGFyYWN0ZXJzIChUd2luQ0FUIGRlZmF1bHQpIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtSW5mby50eXBlID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgLy9RdWljayBhbmQgZGlydHlcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheURhdGFUeXBlID0gYXJyWzBdO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGFyclsxXTtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmFycmF5TGVuZ3RoID0gZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5hcnJheUxlbmd0aDtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5hcnJheURhdGFUeXBlID0gZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5hcnJheURhdGFUeXBlO1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmRhdGFUeXBlID0gZGF0YVR5cGVUYWJsZVtkYXRhVHlwZV0uc3ViSXRlbXNbdHlwZUFycmF5W2ldXS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5pdGVtU2l6ZSA9IGRhdGFUeXBlVGFibGVbZGF0YVR5cGVdLnN1Ykl0ZW1zW3R5cGVBcnJheVtpXV0uaXRlbVNpemU7XG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbUluZm8udHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBNYXliZSBpbiBhIGZ1dHVyZSB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW1JbmZvLmZvcm1hdCA9IGFyclsxXTtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5zaXplID0gdGhpcy5wbGNUeXBlTGVuW2l0ZW1JbmZvLnR5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9PdmVycmlkZSBmb3JtYXQgaWYgZXh0cmEgaW5mb3JtYXRpb24gaXMgZ2l2ZW5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5mb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5mb3JtYXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRlY1BsYWNlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBpdGVtSW5mby5mb3JtYXQgPSBpdGVtLmRlY1BsYWNlcztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZHAgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZm8uZm9ybWF0ID0gaXRlbS5kcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICB0aGlzLmxvZygnaXRlbScpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICB0aGlzLmxvZygnaXRlbUluZm8nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW1JbmZvKTtcbiAgICAgICAgICAgICovXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGl0ZW1JbmZvLnR5cGUgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIHR5cGUgb2YgdGhlIGl0ZW0hJyk7XG4gICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMubG9nKCdpdGVtSW5mbycpO1xuICAgICAgICB0aGlzLmxvZyhpdGVtSW5mbyk7XG4gICAgICAgICovXG5cbiAgICAgICAgcmV0dXJuIGl0ZW1JbmZvO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gICAgICogXG4gICAgICogQHJldHVybiB7T2JqZWN0fSB4bWxIdHRwUmVxICBBIFhNTEh0dHBSZXF1ZXN0LlxuICAgICAqL1xuICAgIGNyZWF0ZVhNTEh0dHBSZXEoKSB7XG4gICAgICAgIHZhciB4bWxIdHRwUmVxO1xuXG4gICAgICAgIGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gICAgICAgICAgICAvL01vemlsbGEsIE9wZXJhLCBTYWZhcmkgYW5kIEludGVybmV0IEV4cGxvcmVyICg+IHY3KVxuICAgICAgICAgICAgeG1sSHR0cFJlcSA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vSW50ZXJuZXQgRXhwbG9yZXIgNiBhbmQgb2xkZXJcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeG1sSHR0cFJlcSA9IG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB4bWxIdHRwUmVxID0gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHhtbEh0dHBSZXEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBGYWlsZWQgQ3JlYXRpbmcgWE1MSHR0cFJlcXVlc3QtT2JqZWN0IScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geG1sSHR0cFJlcTtcbiAgICB9XG5cblxuICAgIGFkc1JlcVNlbmQoYWRzUmVxKSB7XG5cbiAgICAgICAgdmFyIHNvYXBSZXE7XG5cbiAgICAgICAgLy9DYW5jZWwgdGhlIHJlcXVlc3QsIGlmIHRoZSBsYXN0IG9uIHdpdGggdGhlIHNhbWUgSUQgaXMgbm90IGZpbmlzaGVkLlxuICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5pZCA9PT0gJ251bWJlcicgJiYgdGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFJlcXVlc3QgZHJvcHBlZCAobGFzdCByZXF1ZXN0IHdpdGggSUQgJyArIGFkc1JlcS5yZXFEZXNjci5pZCArICcgbm90IGZpbmlzaGVkISknKTtcbiAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdKys7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyUmVxW2Fkc1JlcS5yZXFEZXNjci5pZF0gPD0gdGhpcy5tYXhEcm9wUmVxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9BdXRvbWF0aWMgYWNrbm93bGVkaW5nIGFmdGVyIGEgY291bnQgb2YgJ21heERyb3BSZXEnIHRvXG4gICAgICAgICAgICAvL3ByZXZlbnQgc3R1Y2tpbmcuXG4gICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA9IDA7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vQ3JlYXRlIHRoZSBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gICAgICAgIHRoaXMueG1sSHR0cFJlcSA9IHRoaXMuY3JlYXRlWE1MSHR0cFJlcSgpO1xuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIFNPQVAgcmVxdWVzdC5cbiAgICAgICAgc29hcFJlcSA9ICc8P3htbCB2ZXJzaW9uPVxcJzEuMFxcJyBlbmNvZGluZz1cXCd1dGYtOFxcJz8+JztcbiAgICAgICAgc29hcFJlcSArPSAnPHNvYXA6RW52ZWxvcGUgeG1sbnM6eHNpPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlXFwnICc7XG4gICAgICAgIHNvYXBSZXEgKz0gJ3htbG5zOnhzZD1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYVxcJyAnO1xuICAgICAgICBzb2FwUmVxICs9ICd4bWxuczpzb2FwPVxcJ2h0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3NvYXAvZW52ZWxvcGUvXFwnPic7XG4gICAgICAgIHNvYXBSZXEgKz0gJzxzb2FwOkJvZHk+PHExOic7XG4gICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLm1ldGhvZDtcbiAgICAgICAgc29hcFJlcSArPSAnIHhtbG5zOnExPVxcJ2h0dHA6Ly9iZWNraG9mZi5vcmcvbWVzc2FnZS9cXCc+PG5ldElkIHhzaTp0eXBlPVxcJ3hzZDpzdHJpbmdcXCc+JztcbiAgICAgICAgc29hcFJlcSArPSB0aGlzLnNlcnZpY2UuYW1zTmV0SWQ7XG4gICAgICAgIHNvYXBSZXEgKz0gJzwvbmV0SWQ+PG5Qb3J0IHhzaTp0eXBlPVxcJ3hzZDppbnRcXCc+JztcbiAgICAgICAgc29hcFJlcSArPSB0aGlzLnNlcnZpY2UuYW1zUG9ydDtcbiAgICAgICAgc29hcFJlcSArPSAnPC9uUG9ydD4nO1xuXG4gICAgICAgIGlmIChhZHNSZXEuaW5kZXhHcm91cCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8aW5kZXhHcm91cCB4c2k6dHlwZT1cXCd4c2Q6dW5zaWduZWRJbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLmluZGV4R3JvdXA7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L2luZGV4R3JvdXA+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzUmVxLmluZGV4T2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxpbmRleE9mZnNldCB4c2k6dHlwZT1cXCd4c2Q6dW5zaWduZWRJbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLmluZGV4T2Zmc2V0O1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9pbmRleE9mZnNldD4nO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWQnIHx8IGFkc1JlcS5tZXRob2QgPT09ICdSZWFkV3JpdGUnKSAmJiBhZHNSZXEucmVxRGVzY3IucmVhZExlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxjYlJkTGVuIHhzaTp0eXBlPVxcJ3hzZDppbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnJlcURlc2NyLnJlYWRMZW5ndGg7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L2NiUmRMZW4+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzUmVxLnBEYXRhICYmIGFkc1JlcS5wRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8cERhdGEgeHNpOnR5cGU9XFwneHNkOmJhc2U2NEJpbmFyeVxcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEucERhdGE7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L3BEYXRhPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkc1JlcS5wd3JEYXRhICYmIGFkc1JlcS5wd3JEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxwd3JEYXRhIHhzaTp0eXBlPVxcJ3hzZDpiYXNlNjRCaW5hcnlcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnB3ckRhdGE7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L3B3ckRhdGE+JztcbiAgICAgICAgfVxuICAgICAgICBzb2FwUmVxICs9ICc8L3ExOic7XG4gICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLm1ldGhvZDtcbiAgICAgICAgc29hcFJlcSArPSAnPjwvc29hcDpCb2R5Pjwvc29hcDpFbnZlbG9wZT4nO1xuXG4gICAgICAgIC8vU2VuZCB0aGUgQUpBWCByZXF1ZXN0LlxuICAgICAgICBpZiAodHlwZW9mIHRoaXMueG1sSHR0cFJlcSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLm9wZW4oJ1BPU1QnLCB0aGlzLnNlcnZpY2Uuc2VydmljZVVybCwgdHJ1ZSwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VVc2VyLCB0aGlzLnNlcnZpY2Uuc2VydmljZVBhc3N3b3JkKTtcblxuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ1NPQVBBY3Rpb24nLCAnaHR0cDovL2JlY2tob2ZmLm9yZy9hY3Rpb24vVGNBZHNTeW5jLicgKyBhZHNSZXEubWV0aG9kKTtcbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC94bWw7IGNoYXJzZXQ9dXRmLTgnKTtcblxuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLnRpbWVvdXQgPSB0aGlzLnhtbEh0dHBSZXFUaW1lb3V0O1xuICAgICAgICAgICAgdGhpcy54bWxIdHRwUmVxLm9udGltZW91dCA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogWE1MSHR0cFJlcXVlc3QgdGltZWQgb3V0LiBUaW1lb3V0ICcgKyB0aGlzLnhtbEh0dHBSZXFUaW1lb3V0ICsgJyBtaWxsaXNlY29uZHMuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9vbiB0aW1lb3V0IGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueG1sSHR0cFJlcS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnhtbEh0dHBSZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVxdWVzdCBPS1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVJlc3BvbnNlKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlcXVlc3QgZmFpbGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBYTUxIdHRwUmVxdWVzdCByZXR1cm5zIGFuIGVycm9yLiBTdGF0dXMgY29kZSA6ICcgKyB0aGlzLnhtbEh0dHBSZXEuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vbiBlcnJvciBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjci5vZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMueG1sSHR0cFJlcS5zZW5kKHNvYXBSZXEpO1xuXG4gICAgICAgICAgICAvL1JlcXVlc3Qgd2l0aCBpbmRleCAnaWQnIHNlbnQuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5pZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJSZXFbYWRzUmVxLnJlcURlc2NyLmlkXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBhZHNSZXFTZW5kQXN5bmMoYWRzUmVxKSB7XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgU09BUCByZXF1ZXN0LlxuICAgICAgICBsZXQgc29hcFJlcSA9ICc8P3htbCB2ZXJzaW9uPVxcJzEuMFxcJyBlbmNvZGluZz1cXCd1dGYtOFxcJz8+JztcbiAgICAgICAgc29hcFJlcSArPSAnPHNvYXA6RW52ZWxvcGUgeG1sbnM6eHNpPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlXFwnICc7XG4gICAgICAgIHNvYXBSZXEgKz0gJ3htbG5zOnhzZD1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYVxcJyAnO1xuICAgICAgICBzb2FwUmVxICs9ICd4bWxuczpzb2FwPVxcJ2h0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3NvYXAvZW52ZWxvcGUvXFwnPic7XG4gICAgICAgIHNvYXBSZXEgKz0gJzxzb2FwOkJvZHk+PHExOic7XG4gICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLm1ldGhvZDtcbiAgICAgICAgc29hcFJlcSArPSAnIHhtbG5zOnExPVxcJ2h0dHA6Ly9iZWNraG9mZi5vcmcvbWVzc2FnZS9cXCc+PG5ldElkIHhzaTp0eXBlPVxcJ3hzZDpzdHJpbmdcXCc+JztcbiAgICAgICAgc29hcFJlcSArPSB0aGlzLnNlcnZpY2UuYW1zTmV0SWQ7XG4gICAgICAgIHNvYXBSZXEgKz0gJzwvbmV0SWQ+PG5Qb3J0IHhzaTp0eXBlPVxcJ3hzZDppbnRcXCc+JztcbiAgICAgICAgc29hcFJlcSArPSB0aGlzLnNlcnZpY2UuYW1zUG9ydDtcbiAgICAgICAgc29hcFJlcSArPSAnPC9uUG9ydD4nO1xuXG4gICAgICAgIGlmIChhZHNSZXEuaW5kZXhHcm91cCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8aW5kZXhHcm91cCB4c2k6dHlwZT1cXCd4c2Q6dW5zaWduZWRJbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLmluZGV4R3JvdXA7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L2luZGV4R3JvdXA+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzUmVxLmluZGV4T2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxpbmRleE9mZnNldCB4c2k6dHlwZT1cXCd4c2Q6dW5zaWduZWRJbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLmluZGV4T2Zmc2V0O1xuICAgICAgICAgICAgc29hcFJlcSArPSAnPC9pbmRleE9mZnNldD4nO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWQnIHx8IGFkc1JlcS5tZXRob2QgPT09ICdSZWFkV3JpdGUnKSAmJiBhZHNSZXEucmVxRGVzY3IucmVhZExlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxjYlJkTGVuIHhzaTp0eXBlPVxcJ3hzZDppbnRcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnJlcURlc2NyLnJlYWRMZW5ndGg7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L2NiUmRMZW4+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzUmVxLnBEYXRhICYmIGFkc1JlcS5wRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8cERhdGEgeHNpOnR5cGU9XFwneHNkOmJhc2U2NEJpbmFyeVxcJz4nO1xuICAgICAgICAgICAgc29hcFJlcSArPSBhZHNSZXEucERhdGE7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L3BEYXRhPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkc1JlcS5wd3JEYXRhICYmIGFkc1JlcS5wd3JEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gJzxwd3JEYXRhIHhzaTp0eXBlPVxcJ3hzZDpiYXNlNjRCaW5hcnlcXCc+JztcbiAgICAgICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLnB3ckRhdGE7XG4gICAgICAgICAgICBzb2FwUmVxICs9ICc8L3B3ckRhdGE+JztcbiAgICAgICAgfVxuICAgICAgICBzb2FwUmVxICs9ICc8L3ExOic7XG4gICAgICAgIHNvYXBSZXEgKz0gYWRzUmVxLm1ldGhvZDtcbiAgICAgICAgc29hcFJlcSArPSAnPjwvc29hcDpCb2R5Pjwvc29hcDpFbnZlbG9wZT4nO1xuXG4gICAgICAgIHRoaXMueG1sSHR0cFJlcS5vcGVuKCdQT1NUJywgdGhpcy5zZXJ2aWNlLnNlcnZpY2VVcmwsIHRydWUsIHRoaXMuc2VydmljZS5zZXJ2aWNlVXNlciwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VQYXNzd29yZCk7XG5cbiAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ1NPQVBBY3Rpb24nLCAnaHR0cDovL2JlY2tob2ZmLm9yZy9hY3Rpb24vVGNBZHNTeW5jLicgKyBhZHNSZXEubWV0aG9kKTtcbiAgICAgICAgdGhpcy54bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbDsgY2hhcnNldD11dGYtOCcpO1xuXG4gICAgICAgIGxldCBvcHRpb25zID0gIHsgXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IFtcbiAgICAgICAgICAgICAgICBbJ1NPQVBBY3Rpb24nLCAnaHR0cDovL2JlY2tob2ZmLm9yZy9hY3Rpb24vVGNBZHNTeW5jLicgKyBhZHNSZXEubWV0aG9kXSxcbiAgICAgICAgICAgICAgICBbJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbDsgY2hhcnNldD11dGYtOCddXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYm9keTogc29hcFJlcVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlcnZpY2Uuc2VydmljZVVzZXIgfHwgdGhpcy5zZXJ2aWNlLnNlcnZpY2VQYXNzd29yZClcbiAgICAgICAgICAgIG9wdGlvbnMuaGVhZGVycy5wdXNoKFsnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgYnRvYSh0aGlzLnNlcnZpY2Uuc2VydmljZVVzZXIgKyBcIjpcIiArIHRoaXMuc2VydmljZS5zZXJ2aWNlUGFzc3dvcmQpXSlcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGhpcy5zZXJ2aWNlLnNlcnZpY2VVcmwsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVJlc3BvbnNlKGFkc1JlcSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIG9iamVjdHMgZm9yIFNPQVAgYW5kIFhNTEh0dHBSZXF1ZXN0IGFuZCBzZW5kIHRoZSByZXF1ZXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGFyZ3VtZW50cyBvZiB0aGUgQURTIHJlcXVlc3QuXG4gICAgICovXG4gICAgY3JlYXRlUmVxdWVzdChhZHNSZXEpIHtcblxuICAgICAgICBpZiAoYWRzUmVxLnJlcURlc2NyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFkc1JlcS5yZXFEZXNjciA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKGFkc1JlcS5yZXFEZXNjci5kZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy5sb2coYWRzUmVxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkc1JlcS5zZW5kID0gKCkgPT4gdGhpcy5hZHNSZXFTZW5kKGFkc1JlcSlcbiAgICAgICAgcmV0dXJuIGFkc1JlcTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGZvciBjaGVja2luZyB0aGUgaW5wdXQgdmFsdWVzIHdoZW4gd3JpdGluZyBudW1lcmljIFBMQyB2YXJpYWJsZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4XG4gICAgICovXG4gICAgY2hlY2tWYWx1ZShpdGVtOiB7IHZhbDogc3RyaW5nIH0sIHR5cGU6IHN0cmluZywgbWluOiBzdHJpbmcgfCBudW1iZXIsIG1heDogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHZhciB2YWw7XG5cbiAgICAgICAgLy9UZXN0IGlmIHZhbHVlIGlzIHZhbGlkLlxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdSRUFMJyB8fCB0eXBlID09PSAnTFJFQUwnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gcGFyc2VGbG9hdChpdGVtLnZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbCA9IHBhcnNlSW50KGl0ZW0udmFsLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsID0gaXRlbS52YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBXcm9uZyB2YXJpYWJsZSB0eXBlIGZvciBhIG51bWVyaWMgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhcmlhYmxlIHR5cGUgc2hvdWxkIGJlIG51bWJlciBvciBzdHJpbmcsIGJ1dCBpcyAnICsgdHlwZW9mIGl0ZW0udmFsKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTih2YWwpKSB7XG4gICAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVmFsdWUgb2YgYSBudW1lcmljIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgaXMgbm90IGEgbnVtYmVyLicpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoZWNrIGJvdW5kc1xuICAgICAgICBpZiAodGhpcy51c2VDaGVja0JvdW5kcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdMUkVBTCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMaW1pdCBmb3IgTFJFQUwgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdVcHBlciBsaW1pdDogJyArIE51bWJlci5NQVhfVkFMVUUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnTG93ZXIgbGltaXQ6ICcgKyBOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnUkVBTCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsIDwgMS4xNzU0OTVlLTM4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IExvd2VyIGxpbWl0IGZvciBwb3NpdGl2ZSBSRUFMIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAxLjE3NTQ5NWUtMzgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IDEuMTc1NDk1ZS0zODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiAzLjQwMjgyM2UrMzgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVXBwZXIgbGltaXQgZm9yIHBvc2l0aXZlIFJFQUwgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGltaXQ6IDMuNDAyODIzZSszOCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gMy40MDI4MjNlKzM4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPiAtMS4xNzU0OTVlLTM4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFVwcGVyIGxpbWl0IGZvciBuZWdhdGl2ZSBSRUFMIHZhbHVlIGV4Y2VlZGVkIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAtMS4xNzU0OTVlLTM4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSAtMS4xNzU0OTVlLTM4O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA8IC0zLjQwMjgyM2UrMzgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogTG93ZXIgbGltaXQgZm9yIG5lZ2F0aXZlIFJFQUwgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGltaXQ6IC0zLjQwMjgyM2UrMzgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IC0zLjQwMjgyM2UrMzg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBMb3dlciBsaW1pdCBmb3IgbnVtZXJpYyB2YWx1ZSBleGNlZWRlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3R5cGU6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpbWl0OiAnICsgbWluKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ3ZhbHVlOiAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IG1pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVXBwZXIgbGltaXQgZm9yIG51bWVyaWMgdmFsdWUgZXhjZWVkZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd0eXBlOiAnICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaW1pdDogJyArIG1heCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCd2YWx1ZTogJyArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBtYXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0eXBlIGFuZCBmb3JtYXQgYW5kIHJldHVybiBpdCBpbiBhbiBhcnJheS4gQ3JlYXRlIGFuXG4gICAgICogaXRlbS50eXBlIGVudHJ5IGlmIGl0IGRvZXNuJ3QgZXhpc3QuIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtICAgICBBbiBpdGVtIG9mIGEgdmFyaWFibGUgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYXJyICAgICAgQW4gYXJyYXkgd2l0aCB0eXBlIGFuZCBmb3JtYXQuIFxuICAgICAqL1xuICAgIGdldFR5cGVBbmRGb3JtYXQoaXRlbSkge1xuICAgICAgICB2YXIgYXJyID0gW10sIHR5cGVBcnJheSwgZGF0YVR5cGUsIGk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvL1R5cGUgaXMgZGVmaW5lZFxuICAgICAgICAgICAgYXJyID0gaXRlbS50eXBlLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAvL0pvaW4gdGhlIGZvcm1hdHRpbmcgc3RyaW5nIGlmIHRoZXJlIHdlcmUgcG9pbnRzIGluIGl0LlxuICAgICAgICAgICAgICAgIGFyclsxXSA9IGFyci5zbGljZSgxKS5qb2luKCcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSB0eXBlIG9mIHRoZSBpdGVtIChmdW5jdGlvbiBnZXRUeXBlQW5kRm9ybWF0KCkpIScpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBzdHJ1Y3R1cmUgZGVmaW5pdGlvbiBiYXNlZCBvbiB0aGUgaW5mb3JtYXRpb24gaW4gdGhlIGRhdGEgdGFibGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBzdHJ1Y3RuYW1lICBUaGUgbmFtZSBvZiB0aGUgc3RydWN0dXJlIGluIHRoZSBkYXRhIHRhYmxlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gc3RydWN0ICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGl0ZW1zIG9mIHRoZSBzdHJ1Y3R1cmUuIFxuICAgICAqL1xuICAgIGNyZWF0ZVN0cnVjdERlZihzdHJ1Y3RuYW1lKSB7XG4gICAgICAgIHZhciBzdHJ1Y3QgPSB7fSwgc3ViaXRlbSwgc3ViaXRlbXM7XG5cbiAgICAgICAgc3ViaXRlbXMgPSB0aGlzLmRhdGFUeXBlVGFibGVbc3RydWN0bmFtZV0uc3ViSXRlbXM7XG5cbiAgICAgICAgZm9yIChzdWJpdGVtIGluIHN1Yml0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoc3ViaXRlbXNbc3ViaXRlbV0udHlwZSA9PT0gXCJVU0VSXCIpIHtcbiAgICAgICAgICAgICAgICAvL0NyZWF0aW5nIGEgbmVzdGVkIHN0cnVjdHVlIGRlZmluaXRpb24gd29ya3MsIGJ1dCBwYXJzaW5nIGRvZXNuJ3RcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBdXRvbWF0aWMgY3JlYXRpbmcgb2YgbmVzdGVkIHN0cnVjdHVyZXMgaXMgbm90IHN1cHBvcnRlZCAoeWV0KSEnKTtcbiAgICAgICAgICAgICAgICBzdHJ1Y3Rbc3ViaXRlbV0gPSB0aGlzLmNyZWF0ZVN0cnVjdERlZihzdWJpdGVtc1tzdWJpdGVtXS5kYXRhVHlwZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdWJpdGVtcy5oYXNPd25Qcm9wZXJ0eShzdWJpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBzdHJ1Y3Rbc3ViaXRlbV0gPSBzdWJpdGVtc1tzdWJpdGVtXS5mdWxsVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cnVjdDtcbiAgICB9XG5cblxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuY29kZXIgRnVuY3Rpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogQ29udmVyc2lvbiBvZiBBU0NJSSgwLTksIGEtZiwgQS1GKSBjaGFyY29kZXMgdG8gbnVtYmVycyAwLTE1XG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGNoYXJjb2RlXG4gICAgICovXG4gICAgY2hhcmNvZGVUb0R1YWwoY2hhcmNvZGUpIHtcbiAgICAgICAgaWYgKChjaGFyY29kZSA+PSAweDYxKSAmJiAoY2hhcmNvZGUgPD0gMHg2NikpIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmNvZGUgLSAweDU3KTsgIC8vYS1mXG4gICAgICAgIH1cbiAgICAgICAgaWYgKChjaGFyY29kZSA+PSAweDQxKSAmJiAoY2hhcmNvZGUgPD0gMHg0NikpIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmNvZGUgLSAweDM3KTsgIC8vQS1GXG4gICAgICAgIH1cbiAgICAgICAgaWYgKChjaGFyY29kZSA+PSAweDMwKSAmJiAoY2hhcmNvZGUgPD0gMHgzOSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmNvZGUgLSAweDMwKTsgIC8vMC05XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIG51bWJlciBpbnRvIGFuIGFycmF5IG9mIGJ5dGVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YXJsZW5cbiAgICAgKi9cbiAgICBudW1Ub0J5dGVBcnIodmFsdWUsIHZhcmxlbikge1xuICAgICAgICB2YXIgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIGhleCA9IHZhbHVlLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgd2hpbGUgKGhleC5sZW5ndGggPCB2YXJsZW4gKiAyKSB7XG4gICAgICAgICAgICBoZXggPSAnMCcgKyBoZXg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmFybGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ5dGVzWyh2YXJsZW4gLSAxKSAtIGldID1cbiAgICAgICAgICAgICAgICAoKHRoaXMuY2hhcmNvZGVUb0R1YWwoaGV4LmNoYXJDb2RlQXQoaSAqIDIpKSAqIDE2KSArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmNvZGVUb0R1YWwoaGV4LmNoYXJDb2RlQXQoKGkgKiAyKSArIDEpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBKYXZhU2NyaXB0IGZsb2F0aW5nIHBvaW50IG51bWJlciB0byBhIFBMQyBSRUFMIHZhbHVlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1cbiAgICAgKi9cbiAgICBmbG9hdFRvUmVhbChudW0pIHtcblxuICAgICAgICB2YXIgbWFudCA9IDAsXG4gICAgICAgICAgICByZWFsID0gMCxcbiAgICAgICAgICAgIGJhcywgYWJzLCB0bXAsIGV4cCwgaTtcblxuICAgICAgICBhYnMgPSBNYXRoLmFicyhudW0pO1xuXG4gICAgICAgIGlmIChudW0gIT09IDApIHtcbiAgICAgICAgICAgIC8vRmluZCBleHBvbmVudCBhbmQgYmFzZS5cbiAgICAgICAgICAgIGZvciAoaSA9IDEyODsgaSA+IC0xMjc7IGktLSkge1xuICAgICAgICAgICAgICAgIHRtcCA9IGFicyAvIE1hdGgucG93KDIsIGkpO1xuICAgICAgICAgICAgICAgIGlmICh0bXAgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhwID0gaTtcbiAgICAgICAgICAgICAgICBiYXMgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHAgKz0gMTI3O1xuICAgICAgICAgICAgYmFzID0gYmFzLnRvU3RyaW5nKDIpO1xuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIG1hbnRpc3NhLlxuICAgICAgICAgICAgZm9yIChpID0gMjsgaSA8IDI1OyBpKyspIHtcbiAgICAgICAgICAgICAgICBtYW50IDw8PSAxO1xuICAgICAgICAgICAgICAgIGlmIChiYXMuY2hhckF0KGkpID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFudCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiYXMuY2hhckF0KDI1KSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgbWFudCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIFJFQUwgdmFsdWUuXG4gICAgICAgICAgICByZWFsID0gZXhwOyAvL2V4cG9uZW50XG4gICAgICAgICAgICByZWFsIDw8PSAyMztcbiAgICAgICAgICAgIHJlYWwgKz0gbWFudDsgLy9tYW50aXNzYVxuICAgICAgICAgICAgaWYgKG51bSA8IDApIHtcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBuZWdhdGl2ZSBzaWduLlxuICAgICAgICAgICAgICAgIHJlYWwgKz0gMjE0NzQ4MzY0ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAgICogQ29udmVydCBhIEphdmFTY3JpcHQgZmxvYXRpbmcgcG9pbnQgbnVtYmVyIHRvIGEgUExDIExSRUFMIHZhbHVlLlxuICAgICAgICAgKiBDYXVzZSBpdCdzIGEgNjQgYml0IHZhbHVlLCB3ZSBoYXZlIHRvIHNwbGl0IGl0IGluIHR3byAzMiBiaXQgaW50ZWdlci5cbiAgICAgICAgICogXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1cbiAgICAgICAgICovXG4gICAgZmxvYXRUb0xyZWFsKG51bSkge1xuICAgICAgICB2YXIgbWFudCA9IDAsXG4gICAgICAgICAgICBtYW50MiA9IDAsXG4gICAgICAgICAgICBscmVhbCA9IHtcbiAgICAgICAgICAgICAgICBwYXJ0MTogMCxcbiAgICAgICAgICAgICAgICBwYXJ0MjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFicywgdG1wLCBleHAsIGZpcnN0Yml0LCBiYXMsIGk7XG5cbiAgICAgICAgYWJzID0gTWF0aC5hYnMobnVtKTtcblxuICAgICAgICBpZiAobnVtICE9PSAwKSB7XG4gICAgICAgICAgICAvL0ZpbmQgZXhwb25lbnQgYW5kIGJhc2UuXG4gICAgICAgICAgICBmb3IgKGkgPSAxMDI0OyBpID49IC0xMDIzOyBpLS0pIHtcbiAgICAgICAgICAgICAgICB0bXAgPSBhYnMgLyBNYXRoLnBvdygyLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAodG1wID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV4cCA9IGk7XG4gICAgICAgICAgICAgICAgYmFzID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwICs9IDEwMjM7XG4gICAgICAgICAgICBiYXMgPSBiYXMudG9TdHJpbmcoMik7XG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgbWFudGlzc2EuXG4gICAgICAgICAgICBmb3IgKGkgPSAyOyBpIDwgMjI7IGkrKykge1xuICAgICAgICAgICAgICAgIG1hbnQgPDw9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGJhcy5jaGFyQXQoaSkgPT09ICcxJykge1xuICAgICAgICAgICAgICAgICAgICBtYW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJhcy5jaGFyQXQoaSkgPT09ICcxJykge1xuICAgICAgICAgICAgICAgIGZpcnN0Yml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGZvciAoaTsgaSA8IDU0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBtYW50MiA8PD0gMTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzLmNoYXJBdChpKSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hbnQyICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9DcmVhdGUgdGhlIExSRUFMIHZhbHVlLlxuICAgICAgICAgICAgbHJlYWwucGFydDEgPSBleHA7IC8vZXhwb25lbnRcbiAgICAgICAgICAgIGxyZWFsLnBhcnQxIDw8PSAyMDtcbiAgICAgICAgICAgIGxyZWFsLnBhcnQxICs9IG1hbnQ7IC8vbWFudGlzc2FcbiAgICAgICAgICAgIGlmIChudW0gPCAwKSB7XG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgbmVnYXRpdmUgc2lnbi5cbiAgICAgICAgICAgICAgICBscmVhbC5wYXJ0MSArPSAyMTQ3NDgzNjQ4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbHJlYWwucGFydDIgPSBtYW50MjtcbiAgICAgICAgICAgIGlmIChmaXJzdGJpdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGxyZWFsLnBhcnQyICs9IDIxNDc0ODM2NDg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxyZWFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSB2YWx1ZSB0byB2YWx1ZSBpbiBtaWxsaXNlY29uZHMsIGRlcGVuZGluZ1xuICAgICAqIG9uIHRoZSBmb3JtYXQgc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHRvTWlsbGlzZWModGltZSwgZm9ybWF0KSB7XG4gICAgICAgIHZhciB0bXA7XG4gICAgICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgICAgICBjYXNlICcjZCc6XG4gICAgICAgICAgICBjYXNlICcjZGQnOlxuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgKiA4NjQwMDAwMDsvL2RheXNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJyNoJzpcbiAgICAgICAgICAgIGNhc2UgJyNoaCc6XG4gICAgICAgICAgICAgICAgdG1wID0gdGltZSAqIDM2MDAwMDA7IC8vaG91cnNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJyNtJzpcbiAgICAgICAgICAgIGNhc2UgJyNtbSc6XG4gICAgICAgICAgICAgICAgdG1wID0gdGltZSAqIDYwMDAwOyAgIC8vbWludXRlc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnI3MnOlxuICAgICAgICAgICAgY2FzZSAnI3NzJzpcbiAgICAgICAgICAgICAgICB0bXAgPSB0aW1lICogMTAwMDsgICAgLy9zZWNvbmRzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcjbXMnOlxuICAgICAgICAgICAgY2FzZSAnI21zbXNtcyc6ICAgICAgICAgICAvL21pbGxpc2Vjb25kc1xuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRtcCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRtcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgVE9EIHN0cmluZyB0byBhIHZhbHVlIG9mIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICBzdHJpbmdUb1RpbWUodGltZXN0cmluZywgZm9ybWF0KSB7XG4gICAgICAgIHZhciBhcnJGb3JtYXQgPSBmb3JtYXQuc3BsaXQoJyMnKSxcbiAgICAgICAgICAgIGFycmxlbiA9IGFyckZvcm1hdC5sZW5ndGgsXG4gICAgICAgICAgICByZWdleCA9IC86fFxcLnwtfF8vLFxuICAgICAgICAgICAgdGltZSA9IDAsXG4gICAgICAgICAgICBjbnQgPSAwLFxuICAgICAgICAgICAgdG1wLCBpLCBhcnJWYWx1ZXMsIHNwbGl0dGVyT2s7XG5cbiAgICAgICAgLy9DaGVjayBpZiBhIHZhbGlkIHNwbGl0dGVyIGlzIGdpdmVuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcnJsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlZ2V4LnRlc3QoYXJyRm9ybWF0W2ldKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwbGl0dGVyT2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNwbGl0dGVyT2sgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIHNlcGFyYXRvciAoIDogLiAtIF8gKSBmb3IgVE9EIHN0cmluZyBmb3VuZCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdTdHJpbmc6ICcgKyB0aW1lc3RyaW5nKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdGb3JtYXQ6ICcgKyBmb3JtYXQpO1xuICAgICAgICAgICAgLy9BbHRob3VnaCB3ZSBjb3VsZCB0cnkgdG8gc3BsaXQgdGhlIHRpbWVzdHJpbmcgaW4gY2FzZSBvZiBhIFxuICAgICAgICAgICAgLy93cm9uZyBmb3JtYXR0aW5nIHN0cmluZywgd2UgZG9uJ3QgZG8gaXQuXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyclZhbHVlcyA9IHRpbWVzdHJpbmcuc3BsaXQocmVnZXgpO1xuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcnJsZW47IGkrKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFyckZvcm1hdFtpXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gcGFyc2VJbnQoYXJyVmFsdWVzW2NudF0sIDEwKSAqIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHBhcnNlSW50KGFyclZhbHVlc1tjbnRdLCAxMCkgKiA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NzJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gcGFyc2VJbnQoYXJyVmFsdWVzW2NudF0sIDEwKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtcyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbXNtc21zJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gcGFyc2VJbnQoYXJyVmFsdWVzW2NudF0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lICs9IHRtcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCYXNlNjQgZW5jb2RlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGFcbiAgICAgKi9cbiAgICBlbmNvZGVCYXNlNjQoZGF0YSkge1xuICAgICAgICByZXR1cm4gYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLmRhdGEpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGZvciBjb252ZXJ0aW5nIHRoZSBkYXRhIHZhbHVlcyB0byBhIGJ5dGUgYXJyYXkuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gICAgIEFuIGl0ZW0gb2YgdGhlIGl0ZW0gbGlzdCBvZiBhIHJlcXVlc3QgZGVzY3JpcHRvci5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAgICAgQ29udGFpbnMgdGhlIGRhdGEgdHlwZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXQgICBUaGUgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbiAgICAgIERhdGEgbGVuZ3RoLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBieXRlcyAgICBBbiBhcnJheSBjb250YWluaW5nIHRoZSBkYXRhIGFzIGJ5dGUgdmFsdWVzLlxuICAgICAqL1xuICAgIGRhdGFUb0J5dGVBcnJheShpdGVtLCB0eXBlLCBmb3JtYXQsIGxlbikge1xuXG4gICAgICAgIHZhciBieXRlcyA9IFtdLFxuICAgICAgICAgICAgdmFsLCBzdHJsZW4sIHNsLCBpO1xuXG4gICAgICAgIC8vSWYgbm8gdmFsdWUgaXMgcGFzc2VkLCBzZXQgdmFsdWUgdG8gemVybyBhbmQgbG9nIGFuIGVycm9yIG1lc3NhZ2UuXG4gICAgICAgIGlmIChpdGVtLnZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnVE9EJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUSU1FX09GX0RBWSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnREFURV9BTkRfVElNRSc6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogVmFsdWUgb2YgYSB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGlzIG5vdCBkZWZpbmVkIScpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0RlcGVuZGluZyBvbiB0aGUgZGF0YSB0eXBlLCBjb252ZXJ0IHRoZSB2YWx1ZXMgdG8gYSBieXRlIGFycmF5LlxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0JPT0wnOlxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnZhbCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlc1swXSA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZXNbMF0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0JZVEUnOlxuICAgICAgICAgICAgY2FzZSAnVVNJTlQnOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAwLCAyNTUpO1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU0lOVCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0xMjgsIDEyNyk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsICsgMjU2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1dPUkQnOlxuICAgICAgICAgICAgY2FzZSAnVUlOVCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIDAsIDY1NTM1KTtcbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVCc6XG4gICAgICAgICAgICBjYXNlICdJTlQxNic6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0zMjc2OCwgMzI3NjcpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCArIDY1NTM2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVDFEUCc6XG4gICAgICAgICAgICAgICAgaXRlbS52YWwgPSBNYXRoLnJvdW5kKGl0ZW0udmFsICogMTApO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuY2hlY2tWYWx1ZShpdGVtLCB0eXBlLCAtMzI3NjgsIDMyNzY3KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwgKyA2NTUzNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQyRFAnOlxuICAgICAgICAgICAgICAgIGl0ZW0udmFsID0gTWF0aC5yb3VuZChpdGVtLnZhbCAqIDEwMCk7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0zMjc2OCwgMzI3NjcpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCArIDY1NTM2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RXT1JEJzpcbiAgICAgICAgICAgIGNhc2UgJ1VESU5UJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgMCwgNDI5NDk2NzI5NSk7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdESU5UJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmNoZWNrVmFsdWUoaXRlbSwgdHlwZSwgLTIxNDc0ODM2NDgsIDIxNDc0ODM2NDcpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCArIDQyOTQ5NjcyOTY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnUkVBTCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0yMTQ3NDgzNjQ4LCAyMTQ3NDgzNjQ3KTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmZsb2F0VG9SZWFsKHZhbCk7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdMUkVBTCc6XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5jaGVja1ZhbHVlKGl0ZW0sIHR5cGUsIC0yMTQ3NDgzNjQ4LCAyMTQ3NDgzNjQ3KTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmZsb2F0VG9McmVhbCh2YWwpO1xuICAgICAgICAgICAgICAgIC8vTGVuZ3RoIHNldCB0byA0LCBjYXVzZSB0eXBlIGxlbmd0aCBpcyA4IGFuZCB0aGVyZSBhcmUgMiBwYXJ0c1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLnBhcnQyLCA0KTtcbiAgICAgICAgICAgICAgICBieXRlcyA9IGJ5dGVzLmNvbmNhdCh0aGlzLm51bVRvQnl0ZUFycih2YWwucGFydDEsIDQpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS52YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vRGVsZXRlIHRoZSB0aW1lIHBvcnRpb24uXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsLnNldEhvdXJzKDApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRNaW51dGVzKDApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRTZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGUgb2JqZWN0IGluIHNlY29uZHMgc2luY2UgMS4xLjE5NzAgYW5kXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSB0aW1lIHpvbmUgdG8gVVRDLlxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBpdGVtLnZhbC5nZXRUaW1lKCkgLyAxMDAwIC0gaXRlbS52YWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhbHVlIG9mIGEgREFURSB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGlzIG5vdCBhIGRhdGUgb2JqZWN0IScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih2YWwsIGxlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICBjYXNlICdEQVRFX0FORF9USU1FJzpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGUgb2JqZWN0IGluIHNlY29uZHMgc2luY2UgMS4xLjE5NzAgYW5kXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSB0aW1lIHpvbmUgdG8gVVRDLlxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBpdGVtLnZhbC5nZXRUaW1lKCkgLyAxMDAwIC0gaXRlbS52YWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFZhbHVlIG9mIGEgRFQgdmFyaWFibGUgaW4gd3JpdGUgcmVxdWVzdCBpcyBub3QgYSBkYXRlIG9iamVjdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodmFsLCBsZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVE9EJzpcbiAgICAgICAgICAgIGNhc2UgJ1RJTUVfT0ZfREFZJzpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvL0RlbGV0ZSB0aGUgZGF0ZSBwb3J0aW9uLlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRZZWFyKDE5NzApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbC5zZXRNb250aCgwKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWwuc2V0RGF0ZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRlIG9iamVjdCBpbiBzZWNvbmRzIHNpbmNlIDEuMS4xOTcwIGFuZFxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgdGltZSB6b25lIHRvIFVUQy5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gaXRlbS52YWwuZ2V0VGltZSgpIC0gaXRlbS52YWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0udmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSB0aW1lIHZhbHVlIGlzIGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICcnIHx8IGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSAnI2hoIzojbW0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBObyBmb3JtYXQgZ2l2ZW4gZm9yIFRPRCBzdHJpbmchIFVzaW5nIGRlZmF1bHQgI2hoIzojbW0uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnN0cmluZ1RvVGltZShpdGVtLnZhbCwgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBUT0QgdmFsdWUgaW4gd3JpdGUgcmVxdWVzdCBpcyB3ZXRoZXIgYSBkYXRlIG9iamVjdCBub3IgYSBzdHJpbmchJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICAgICAgICAgICAgLy9JZiBubyBsZW5ndGggaXMgZ2l2ZW4sIHNldCBpdCB0byA4MCBjaGFyYWN0ZXJzIChUd2luQ0FUIGRlZmF1bHQpLiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3RybGVuID0gKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSA/IHRoaXMucGxjVHlwZUxlbi5TVFJJTkcgOiBwYXJzZUludChmb3JtYXQsIDEwKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSkge1xuICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBnaXZlbiBzdHJpbmcgbGVuZ3RoIGlzIHZhbGlkIGFuZCBzaG9ydGVyIHRoZW4gdGhlIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAvL3RoZW4gdXNlIHRoZSBnaXZlbiB2YWx1ZSB0byBhdm9pZCBhbiBvdmVyZmxvdywgb3RoZXJ3aXNlIHVzZVxuICAgICAgICAgICAgICAgICAgICAvL3RoZSByZWFsIHN0cmluZyBsZW5ndGguXG4gICAgICAgICAgICAgICAgICAgIHNsID0gc3RybGVuIDwgaXRlbS52YWwubGVuZ3RoID8gc3RybGVuIDogaXRlbS52YWwubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2w7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXNbaV0gPSBpdGVtLnZhbC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vRmlsbCB0aGUgc3RyaW5nIHVwIHRvIHRoZSBnaXZlbiBsZW5ndGgsIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpOyBpIDwgc3RybGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzW2ldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1Rlcm1pbmF0aW9uLCB0aGUgcmVhbCBzdHJpbmcgbGVuZ3RoIGluIHRoZSBQTEMgaXNcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgZGVmaW5lZCBsZW5ndGggKyAxLlxuICAgICAgICAgICAgICAgICAgICBieXRlc1tpXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVElNRSc6XG4gICAgICAgICAgICAgICAgdmFsID0gcGFyc2VJbnQoaXRlbS52YWwsIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4odmFsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFZhbHVlIG9mIGEgVElNRSB2YXJpYWJsZSBpbiB3cml0ZSByZXF1ZXN0IGlzIG5vdCBkZWZpbmVkIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50b01pbGxpc2VjKHZhbCwgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IExvd2VyIGxpbWl0IGZvciBUSU1FIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgZXhjZWVkZWQhKScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyBpdGVtLnZhbCArIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsID4gNDI5NDk2NzI5NSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSA0Mjk0OTY3Mjk1O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IHdhcm5pbmc6IFVwcGVyIGxpbWl0IGZvciBUSU1FIHZhcmlhYmxlIGluIHdyaXRlIHJlcXVlc3QgZXhjZWVkZWQhKScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygndmFsdWU6ICcgKyBpdGVtLnZhbCArIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHZhbCwgbGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0VuZFN0cnVjdCc6XG4gICAgICAgICAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBVbmtub3duIGRhdGEgdHlwZSBpbiB3cml0ZSByZXF1ZXN0IDogJyArIHR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuXG4gICAgfVxuXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWNvZGVyIEZ1bmN0aW9uc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBudW1iZXIgdG8gYSBoZXggc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqL1xuICAgIG51bVRvSGV4U3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSB2YWx1ZS50b1N0cmluZygxNik7XG4gICAgICAgIGlmICgocmV0Lmxlbmd0aCAlIDIpICE9PSAwKSB7XG4gICAgICAgICAgICByZXQgPSAnMCcgKyByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBmaXhlZCBsZW5ndGggb2YgYW4gaW50ZWdlciBieSBhZGRpbmcgbGVhZGluZyBcbiAgICAgKiB6ZXJvcyhpLmUuIGNoYW5nZSAyIHRvIDAyKS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtYlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwbGFjZXNcbiAgICAgKi9cbiAgICBmaXhOdW1iTGVuZ3RoKG51bWIsIHBsYWNlcykge1xuICAgICAgICBwbGFjZXMgPSAoaXNOYU4ocGxhY2VzKSkgPyAwIDogcGxhY2VzO1xuICAgICAgICB2YXIgc3RyID0gbnVtYi50b1N0cmluZygxMCk7XG4gICAgICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgcGxhY2VzKSB7XG4gICAgICAgICAgICBzdHIgPSAnMCcgKyBzdHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgZGF0ZSBvYmplY3QgdG8gYSBmb3JtYXR0ZWQgc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RGF0ZX0gdGltZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXRcbiAgICAgKi9cbiAgICBkYXRlVG9TdHJpbmcodGltZSwgZm9ybWF0KSB7XG5cbiAgICAgICAgdmFyIGFyciA9IGZvcm1hdC5zcGxpdCgnIycpLFxuICAgICAgICAgICAgYXJybGVuID0gYXJyLmxlbmd0aCxcbiAgICAgICAgICAgIHRzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgIHRtcCwgaTtcblxuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJybGVuOyBpKyspIHtcblxuICAgICAgICAgICAgc3dpdGNoIChhcnJbaV0pIHtcbiAgICAgICAgICAgICAgICAvL0RhdGUgZm9ybWF0dGluZy5cbiAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0REJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdXRCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0RGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1dLRCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZGF0ZU5hbWVzLndlZWtkU2hvcnRbdGltZS5nZXREYXkoKV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1dFRUtEQVknOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmRhdGVOYW1lcy53ZWVrZExvbmdbdGltZS5nZXREYXkoKV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZml4TnVtYkxlbmd0aCh0bXAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNT04nOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmRhdGVOYW1lcy5tb250aHNTaG9ydFt0aW1lLmdldE1vbnRoKCldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNT05USCc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZGF0ZU5hbWVzLm1vbnRoc0xvbmdbdGltZS5nZXRNb250aCgpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnWVknOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRtcCA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wIC09IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdZWVlZJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIC8vVGltZSBmb3JtYXR0aW5nLlxuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldEhvdXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZS5nZXRIb3VycygpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0U2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzcyc6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUuZ2V0U2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbXMnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtc21zbXMnOlxuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aW1lLmdldE1pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmZpeE51bWJMZW5ndGgodG1wLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gYXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRzdHJpbmcgPSB0c3RyaW5nICsgdG1wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0c3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBudW1iZXIgd2l0aCBhIHZhbHVlIGluIG1pbGxpc2Vjb25kcyB0byBhIGZvcm1hdHRlZCBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gICAgICovXG4gICAgdGltZVRvU3RyaW5nKHRpbWUsIGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyID0gZm9ybWF0LnNwbGl0KCcjJyksXG4gICAgICAgICAgICBhcnJsZW4gPSBhcnIubGVuZ3RoLFxuICAgICAgICAgICAgdHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgdG1wLCBpO1xuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcnJsZW47IGkrKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFycltpXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyA4NjQwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDg2NDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgODY0MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGQnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyA4NjQwMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDg2NDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgODY0MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyAzNjAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gMzYwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGgnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyAzNjAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gMzYwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDYwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgNjAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW0nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IE1hdGguZmxvb3IodGltZSAvIDYwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICUgNjAwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3MnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJybGVuIDw9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRpbWUgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aW1lIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gdGltZSAlIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21zJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbXNtc21zJzpcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGltZTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5maXhOdW1iTGVuZ3RoKHRtcCwgMyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IGFycltpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0c3RyaW5nID0gdHN0cmluZyArIHRtcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHN0cmluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIFVTSU5UL0JZVEUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjVXNpbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBoZXhzID0gdGhpcy5udW1Ub0hleFN0cmluZyhzdHJpbmcuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgIHJldHVybiBwYXJzZUludChoZXhzLCAxNik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBTSU5ULlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1NpbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBkZWMgPSB0aGlzLnBhcnNlUGxjVXNpbnQoc3RyaW5nKTtcbiAgICAgICAgaWYgKGRlYyA+IDEyNykge1xuICAgICAgICAgICAgZGVjID0gZGVjIC0gMjU2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBVSU5UL1dPUkQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjVWludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGhleHMgPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDEpKTtcbiAgICAgICAgaGV4cyArPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGhleHMsIDE2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIElOVC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNJbnQoc3RyaW5nKSB7XG4gICAgICAgIHZhciBkZWMgPSB0aGlzLnBhcnNlUGxjVWludChzdHJpbmcpO1xuICAgICAgICBpZiAoZGVjID4gMzI3NjcpIHtcbiAgICAgICAgICAgIGRlYyA9IGRlYyAtIDY1NTM2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBVRElOVC9EV09SRC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgcGFyc2VQbGNVZGludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGhleHMgPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDMpKTtcbiAgICAgICAgaGV4cyArPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDIpKTtcbiAgICAgICAgaGV4cyArPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDEpKTtcbiAgICAgICAgaGV4cyArPSB0aGlzLm51bVRvSGV4U3RyaW5nKHN0cmluZy5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGhleHMsIDE2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIERJTlQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgICAqL1xuICAgIHBhcnNlUGxjRGludChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRlYyA9IHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcpO1xuICAgICAgICBpZiAoZGVjID4gMjE0NzQ4MzY0Nykge1xuICAgICAgICAgICAgZGVjID0gZGVjIC0gNDI5NDk2NzI5NjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVjO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZGF0YSBzdHJpbmcgdG8gYSBmb3JtYXR0ZWQgdGltZSBzdHJpbmdcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHBhcnNlUGxjVGltZShzdHJpbmcsIGZvcm1hdCkge1xuICAgICAgICB2YXIgdGltZSA9IHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcpO1xuICAgICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lOyAgICAvL1VuZm9ybWF0dGVkOiB2YWx1ZSBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLnRpbWVUb1N0cmluZyh0aW1lLCBmb3JtYXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIGEgZm9ybWF0dGVkIHRpbWUgb2YgZGF5IHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHBhcnNlUGxjVG9kKHN0cmluZywgZm9ybWF0KSB7XG4gICAgICAgIC8vQ3JlYXRlIGEgZGF0ZSBvYmplY3QgKHRpbWUgYmFzZSBpbiB0aGUgUExDIGFyZSBtaWxsaXNlY29uZHMpXG4gICAgICAgIHZhciB0aW1lID0gbmV3IERhdGUodGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZykpO1xuXG4gICAgICAgIC8vVGltZSB6b25lIGNvcnJlY3Rpb24uXG4gICAgICAgIHRpbWUgPSBuZXcgRGF0ZSh0aW1lLmdldFRpbWUoKSArIHRpbWUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcblxuICAgICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlVG9TdHJpbmcodGltZSwgZm9ybWF0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyB0byBhIGZvcm1hdHRlZCBkYXRlL3RpbWUgb2YgZGF5IHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdFxuICAgICAqL1xuICAgIHBhcnNlUGxjRGF0ZShzdHJpbmcsIGZvcm1hdCkge1xuICAgICAgICAvL0NvbnZlcnRlIHRvIG1pbGxpc2Vjb25kcyBhbiBjcmVhdGUgYSBkYXRlIG9iamVjdFxuICAgICAgICAvLyh0aW1lIGJhc2Ugb2YgREFURS9EVCB2YXJpYWJsZXMgaW4gdGhlIFBMQyBhcmUgc2Vjb25kcyBzaW5jZSAxLjEuMTk3MClcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nKSAqIDEwMDApO1xuXG4gICAgICAgIC8vVGltZSB6b25lIGNvcnJlY3Rpb24uXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcblxuICAgICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlVG9TdHJpbmcoZGF0ZSwgZm9ybWF0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBkYXRhIHN0cmluZyBvZiBhIFJFQUwgdmFyaWFibGVcbiAgICAgKiB0byBhIEphdmFTY3JpcHQgZmxvYXRpbmcgcG9pbnQgbnVtYmVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1JlYWwoc3RyaW5nKSB7XG4gICAgICAgIHZhciBtYW50ID0gMSxcbiAgICAgICAgICAgIGR1YWwgPSAwLjUsXG4gICAgICAgICAgICBudW0gPSB0aGlzLnBhcnNlUGxjVWRpbnQoc3RyaW5nKSxcbiAgICAgICAgICAgIHNpZ24sIGV4cCwgaTtcblxuICAgICAgICAvL1JldHVybiBpZiB2YWx1ZSBpcyB6ZXJvLiBcbiAgICAgICAgaWYgKG51bSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgLy9DaGVjayB0aGUgc2lnbiBiaXQuXG4gICAgICAgIHNpZ24gPSAoKG51bSA+Pj4gMzEpID09PSAxKSA/ICctJyA6ICcrJztcbiAgICAgICAgbnVtIDw8PSAxOyAvL0RlbGV0ZSB0aGUgc2lnbiBiaXQuXG4gICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBleHBvbmVudC5cbiAgICAgICAgZXhwID0gKG51bSA+Pj4gMjQpIC0gMTI3O1xuICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgMjMgYml0IG1hbnRpc3NhOiBTaGlmdCBiaXRzIHRvIGxlZnQgYW5kIGV2YWx1YXRlIHRoZW0uXG4gICAgICAgIG51bSA8PD0gODtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8PSAyMzsgaSsrKSB7XG4gICAgICAgICAgICBtYW50ICs9IG51bSA8IDAgPyBkdWFsIDogMDsgLy9BZGQgaWYgbGVmdCAoc2lnbiBiaXQpIGJpdCBpcyB0cnVlLlxuICAgICAgICAgICAgbnVtIDw8PSAxO1xuICAgICAgICAgICAgZHVhbCAvPSAyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNpZ24gKyAobWFudCAqIE1hdGgucG93KDIsIGV4cCkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIG9mIGEgTFJFQUwgdmFyaWFibGVcbiAgICAgKiB0byBhIEphdmFTY3JpcHQgZmxvYXRpbmcgcG9pbnQgbnVtYmVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY0xyZWFsKHN0cmluZykge1xuICAgICAgICB2YXIgbnVtID0gdGhpcy5wYXJzZVBsY1VkaW50KHN0cmluZy5zdWJzdHJpbmcoNCwgOCkpLFxuICAgICAgICAgICAgbnVtMiA9IHRoaXMucGFyc2VQbGNVZGludChzdHJpbmcuc3Vic3RyaW5nKDAsIDQpKSxcbiAgICAgICAgICAgIGkgPSAxMixcbiAgICAgICAgICAgIG1hbnQgPSAxLFxuICAgICAgICAgICAgZHVhbCA9IDAuNSxcbiAgICAgICAgICAgIHNpZ24sIGV4cDtcblxuICAgICAgICAvL1JldHVybiBpZiB2YWx1ZSBpcyB6ZXJvLiBcbiAgICAgICAgaWYgKG51bSA9PT0gMCAmJiBudW0yID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICAvL0NoZWNrIHRoZSBzaWduIGJpdC5cbiAgICAgICAgc2lnbiA9ICgobnVtID4+PiAzMSkgPT09IDEpID8gJy0nIDogJysnO1xuICAgICAgICBudW0gPDw9IDE7IC8vRGVsZXRlIHRoZSBzaWduIGJpdC5cbiAgICAgICAgLy9DYWxjdWxhdGUgdGhlIGV4cG9uZW50LlxuICAgICAgICBleHAgPSAobnVtID4+PiAyMSkgLSAxMDIzO1xuICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgbWFudGlzc2EuIFNoaWZ0IGJpdHMgdG8gbGVmdCBhbmQgZXZhbHVhdGUgdGhlbS5cbiAgICAgICAgLy9QYXJ0IDEuXG4gICAgICAgIG51bSA8PD0gMTE7XG4gICAgICAgIHdoaWxlIChpIDwgMzIpIHtcbiAgICAgICAgICAgIG1hbnQgKz0gbnVtIDwgMCA/IGR1YWwgOiAwOyAvL0FkZCBpZiBsZWZ0IChzaWduIGJpdCkgYml0IGlzIHRydWUuXG4gICAgICAgICAgICBudW0gPDw9IDE7XG4gICAgICAgICAgICBkdWFsIC89IDI7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgLy9QYXJ0IDIuXG4gICAgICAgIGlmICgobnVtMiA+Pj4gMzEpID09PSAxKSB7XG4gICAgICAgICAgICBtYW50ICs9IGR1YWw7XG4gICAgICAgICAgICBudW0yIDw8PSAxO1xuICAgICAgICAgICAgZHVhbCAvPSAyO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpIDwgNjQpIHtcbiAgICAgICAgICAgIG1hbnQgKz0gbnVtMiA8IDAgPyBkdWFsIDogMDsgLy9BZGQgaWYgbGVmdCAoc2lnbiBiaXQpIGJpdCBpcyB0cnVlLlxuICAgICAgICAgICAgbnVtMiA8PD0gMTtcbiAgICAgICAgICAgIGR1YWwgLz0gMjtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzaWduICsgKG1hbnQgKiBNYXRoLnBvdygyLCBleHApKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGRhdGEgc3RyaW5nIHRvIHN0cmluZyBieSBzaW1wbHkgY3V0dGluZyBvZiBzdXBlcmZsdW91cyBjaGFyYWN0ZXJzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBwYXJzZVBsY1N0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgLypcbiAgICAgICAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdHJpbmcuY2hhckNvZGVBdChpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJpbmcuc3Vic3RyKDAsIGkpO1xuICAgICAgICAqL1xuICAgICAgICByZXR1cm4gc3RyaW5nLnNwbGl0KFN0cmluZy5mcm9tQ2hhckNvZGUoMCkpWzBdO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQmFzZTY0IGRlY29kZXJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICAgICAqL1xuICAgIGRlY29kZUJhc2U2NChkYXRhKSB7XG4gICAgICAgIHJldHVybiBhdG9iKGRhdGEpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBCNjQtc3Vic3RyaW5ncyB0byBkYXRhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhU3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZywgTnVtYmVyfSBmb3JtYXRcbiAgICAgKiBAcmV0dXJuIHtNaXhlZH0gZGF0YVxuICAgICAqIFxuICAgICAqL1xuICAgIHN1YlN0cmluZ1RvRGF0YShkYXRhU3RyaW5nLCB0eXBlLCBmb3JtYXQ/KSB7XG4gICAgICAgIHZhciBkYXRhO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnQk9PTCc6XG4gICAgICAgICAgICAgICAgLy9Eb2VzIHRoaXMgd29yaz8/Pz8/IFNlZW1zIGxpa2UuXG4gICAgICAgICAgICAgICAgZGF0YSA9IChkYXRhU3RyaW5nLmNoYXJDb2RlQXQoMCkgIT0gJzAnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0JZVEUnOlxuICAgICAgICAgICAgY2FzZSAnVVNJTlQnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjVXNpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTSU5UJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1NpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdXT1JEJzpcbiAgICAgICAgICAgIGNhc2UgJ1VJTlQnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjVWludChkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0lOVCc6XG4gICAgICAgICAgICBjYXNlICdJTlQxNic6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNJbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQxRFAnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSAoKHRoaXMucGFyc2VQbGNJbnQoZGF0YVN0cmluZykpIC8gMTApLnRvRml4ZWQoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJTlQyRFAnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSAoKHRoaXMucGFyc2VQbGNJbnQoZGF0YVN0cmluZykpIC8gMTAwKS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRFdPUkQnOlxuICAgICAgICAgICAgY2FzZSAnVURJTlQnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjVWRpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdESU5UJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY0RpbnQoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdSRUFMJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1JlYWwoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnRvRml4ZWQocGFyc2VJbnQoZm9ybWF0LCAxMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0xSRUFMJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY0xyZWFsKGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS50b0ZpeGVkKHBhcnNlSW50KGZvcm1hdCwgMTApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjU3RyaW5nKGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVE9EJzpcbiAgICAgICAgICAgIGNhc2UgJ1RJTUVfT0ZfREFZJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZVBsY1RvZChkYXRhU3RyaW5nLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVElNRSc6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucGFyc2VQbGNUaW1lKGRhdGFTdHJpbmcsIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgIGNhc2UgJ0RBVEVfQU5EX1RJTUUnOlxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnBhcnNlUGxjRGF0ZShkYXRhU3RyaW5nLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRW5kU3RydWN0JzpcbiAgICAgICAgICAgICAgICAvL0p1c3QgZG8gbm90aGluZy5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVW5rbm93biBkYXRhIHR5cGUgYXQgcGFyc2luZyByZWFkIHJlcXVlc3Q6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY29kZSB0aGUgcmVzcG9uc2Ugc3RyaW5nIG9mIGEgUmVhZCBSZXF1ZXN0IGFuZCBzdG9yZSB0aGUgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQURTIFJlcWVzdCBPYmplY3RcbiAgICAgKi9cbiAgICBwYXJzZVJlYWRSZXEoYWRzUmVxKSB7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlLFxuICAgICAgICAgICAgaXRlbUxpc3QgPSBhZHNSZXEucmVxRGVzY3IuaXRlbXMsXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICBzdHJBZGRyID0gMCxcbiAgICAgICAgICAgIGl0ZW0sIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIHN0cmxlbiwgbGVuLCBwbGVuLCBtb2QsIHR5cGUsIGZvcm1hdCwgaWR4LCBsaXN0bGVuLCBzdGFydGFkZHI7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueVxuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgPSB0aGlzLmRlY29kZUJhc2U2NChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHBEYXRhJylbMF0uZmlyc3RDaGlsZC5kYXRhKTtcblxuICAgICAgICAgICAgLy9SdW4gdGhyb3VnaCB0aGUgZWxlbWVudHMgaW4gdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgICAgIGZvciAoaWR4ID0gMCwgbGlzdGxlbiA9IGl0ZW1MaXN0Lmxlbmd0aDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtTGlzdFtpZHhdO1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICAgICAgYXJyVHlwZSA9IHRoaXMuZ2V0VHlwZUFuZEZvcm1hdChpdGVtKTtcbiAgICAgICAgICAgICAgICB0eXBlID0gYXJyVHlwZVswXTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBhcnJUeXBlWzFdO1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgdGhlIGxlbmd0aCBvZiB0aGUgZGF0YSB0eXBlcy5cbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IHBhcnNlSW50KGZvcm1hdCwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihzdHJsZW4pID8gc3RybGVuIDogbGVuKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRW5kU3RydWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBsZW5ndGggb2YgdGhlIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1wiRW5kU3RydWN0XCIgaXMgb25seSB1c2VkIHdpdGggXCJyZWFkQXJyYXlPZlN0cnVjdHVyZXMvd3JpdGVBcnJheU9mU3RydWN0dXJlc1wiLlxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gaXRlbS52YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIGZvciBjYWxjdWxhdGluZyBwYWRkaW5nIGJ5dGVzXG4gICAgICAgICAgICAgICAgcGxlbiA9IGxlbiA8IHRoaXMuYWxpZ25tZW50ID8gbGVuIDogdGhpcy5hbGlnbm1lbnQ7XG5cbiAgICAgICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgcGxhY2Ugb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGRhdGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWYgKGFkc1JlcS5yZXFEZXNjci5zZXEgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JZiB2YXJpYWJsZSBhZGRyZXNzZXMgYXJlIHVzZWQuXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0YWRkciA9IHRoaXMuZ2V0SW5kZXhPZmZzZXQoYWRzUmVxLnJlcURlc2NyKTtcbiAgICAgICAgICAgICAgICAgICAgc3RyQWRkciA9IGl0ZW0uYWRkciAtIHN0YXJ0YWRkcjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFkc1JlcS5yZXFEZXNjci5jYWxjQWxpZ25tZW50ID09PSB0cnVlICYmIHBsZW4gPiAxICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHN0ckFkZHIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29tcHV0ZSB0aGUgYWRkcmVzcyBmb3IgdGhlIGFsaWdubWVudCBpbiBjYXNlIG9mIGEgc3RydWN0dXJlLlxuICAgICAgICAgICAgICAgICAgICBtb2QgPSBzdHJBZGRyICUgcGxlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gcGxlbiAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vU2xpY2UgdGhlIHN0cmluZyBhbmQgZGVjb2RlIHRoZSBkYXRhXG4gICAgICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIGxlbik7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgdHlwZSwgZm9ybWF0KTtcblxuICAgICAgICAgICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIEphdmFTY3JpcHQgdmFyaWFibGUgYW5kIHdyaXRlIHRoZSBkYXRhIHRvIGl0XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VWYXJOYW1lKGl0ZW0uanZhciwgcmVzdWx0LCBhZHNSZXEucmVxRGVzY3IuZGF0YU9iaiwgaXRlbS5wcmVmaXgsIGl0ZW0uc3VmZml4KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgbmV4dCBhZGRyZXNzXG4gICAgICAgICAgICAgICAgaWYgKGFkc1JlcS5yZXFEZXNjci5zZXEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyQWRkciArPSBsZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIFJlYWQgUmVxdWVzdCBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgdGhlIHJlc3BvbnNlIHN0cmluZyBvZiBhIFN1bVJlYWRSZXF1ZXN0IGFuZCBzdG9yZSB0aGUgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQURTIFJlcXVlc3QgT2JqZWN0XG4gICAgICovXG4gICAgcGFyc2VTdW1SZWFkUmVxKGFkc1JlcSkge1xuXG4gICAgICAgIHZhciByZXNwb25zZSxcbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gYWRzUmVxLnJlcURlc2NyLml0ZW1zLFxuICAgICAgICAgICAgYXJyVHlwZSA9IFtdLFxuICAgICAgICAgICAgc3RyQWRkciA9IDAsXG4gICAgICAgICAgICBzdWJTdHJBZGRyID0gMCxcbiAgICAgICAgICAgIGRhdGFPYmogPSB3aW5kb3csXG4gICAgICAgICAgICB2bGVuTWF4ID0gMCxcbiAgICAgICAgICAgIGl0ZW0sIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIGRhdGEsIGxlbiwgdHlwZSwgZm9ybWF0LCBpZHgsIGxpc3RsZW4sIGVycm9yQ29kZSwganZhciwgaSxcbiAgICAgICAgICAgIGFycmF5TGVuZ3RoLCBpdGVtU2l6ZSwgaXRlbUluZm87XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2xpY2UgYSBwaWVjZSBvdXQgb2YgdGhlIHN1YnN0cmluZywgY29udmVydCB0aGUgZGF0YSBhbmQgd3JpdGUgaXRcbiAgICAgICAgICogdG8gdGhlIEphdmFTY3JpcHQgdmFyaWFibGUuICBcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHBhcnNlU3ViU3RyaW5nU2xpY2UgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBzdHJsZW4sIHN1YlN0clNsaWNlO1xuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ1NUUklORycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RybGVuID0gcGFyc2VJbnQoZm9ybWF0LCAxMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbUluZm8uc3RyaW5nTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxlbiA9ICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSA/IHN0cmxlbiA6IGxlbikgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1Rha2UgYSBwaWVjZSBvZiB0aGUgZGF0YSBzdWIgc3RyaW5nXG4gICAgICAgICAgICBzdWJTdHJTbGljZSA9IGRhdGFTdWJTdHJpbmcuc3Vic3RyKHN1YlN0ckFkZHIsIGxlbik7XG4gICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGFcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShzdWJTdHJTbGljZSwgdHlwZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIEphdmFTY3JpcHQgdmFyaWFibGUgYW5kIHdyaXRlIHRoZSBkYXRhIHRvIGl0XG4gICAgICAgICAgICB0aGlzLnBhcnNlVmFyTmFtZShqdmFyLCBkYXRhLCBkYXRhT2JqLCBpdGVtLnByZWZpeCwgaXRlbS5zdWZmaXgpO1xuXG4gICAgICAgICAgICBzdWJTdHJBZGRyICs9IGxlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXJzZSB0aGUgc3R1Y3R1cmUgZGVmaW5pdGlvbiBhbmQgY29tcHV0ZSB0aGUgZGF0YSBvZlxuICAgICAgICAgKiB0aGUgc3Vic3RyaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcGFyc2VTdHJ1Y3R1cmUgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBqLCBkZWZBcnIsIGxlbkFyckVsZW0sIGxhc3REZWZBcnIsIG1vZCwgZWxlbTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBGdW5jdGlvbiBmb3IgYWRqdXN0aW5nIHRoZSBhZGRyZXNzIG9mIHRoZSBkYXRhIGluIHRoZSBzdHJpbmdcbiAgICAgICAgICAgICAqIGlmIGFuIGFsaWdubWVudCBpcyB1c2VkLiBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgY2hlY2tBbGlnbm1lbnQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmxlbiwgbW9kO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB0eXBlICE9PSAnU1RSSU5HJyAmJiB0eXBlICE9PSAnRW5kU3RydWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIGZvciBjYWxjdWxhdGluZyBwYWRkaW5nIGJ5dGVzXG4gICAgICAgICAgICAgICAgICAgIHZsZW4gPSBsZW4gPCB0aGlzLmFsaWdubWVudCA/IGxlbiA6IHRoaXMuYWxpZ25tZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQ29tcHV0ZSB0aGUgYWRkcmVzcyBmb3IgdGhlIGFsaWdubWVudC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZsZW4gPiAxICYmIHN1YlN0ckFkZHIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2QgPSBzdWJTdHJBZGRyICUgdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViU3RyQWRkciArPSB2bGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9TdG9yZSB0aGUgbWF4aW11bSBsZW5ndGggb2YgdGhlIFBMQyB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICAgICAgLy9mb3IgaW5zZXJ0aW5nIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodmxlbiA+IHZsZW5NYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZsZW5NYXggPSB2bGVuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NoZWNrIHN0cnVjdHVyZSBkZWZpbml0aW9uXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGVmID0gdGhpcy5wYXJzZVZhck5hbWUoaXRlbS5kZWYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSA9PT0gdHJ1ZSAmJiBpdGVtLmRlZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kZWYgPSB0aGlzLmNyZWF0ZVN0cnVjdERlZihpdGVtSW5mby5kYXRhVHlwZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLmRlZiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBzdHJ1Y3R1cmUgZGVmaW5pbml0aW9uIGZvdW5kIChwYXJzZVN1bVJlYWRSZXEoKSkhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoZWxlbSBpbiBpdGVtLmRlZikge1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGVmLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmQXJyID0gaXRlbS5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IHBhcnNlSW50KGRlZkFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERlZkFyciA9IGRlZkFyci5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbkFyckVsZW07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBkZWZBcnJbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gZWxlbSArIGo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGVmQXJyID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyci5zbGljZSgzLCAtMSkuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhciA9IGVsZW0gKyAnLicgKyBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBkZWZBcnIuc2xpY2UoMykuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQWRkIGluZGV4IGluIGNhc2Ugb2YgYW4gYXJyYXkgb2Ygc3RydWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhciA9IGkgKyAnLicgKyBqdmFyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FsaWdubWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3ViU3RyaW5nU2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgd2UgYXJlIGluIGFuIGFycmF5IG9mIHN0cnVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gaSArICcuJyArIGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXIgPSBlbGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gZGVmQXJyWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyci5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyWzFdID0gZGVmQXJyLnNsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxpZ25tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1YlN0cmluZ1NsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DYWxjdWxhdGUgdGhlIHBhZGRpbmcgYnl0ZXMgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlXG4gICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxICYmIHZsZW5NYXggPiAxICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZsZW5NYXggPiB0aGlzLmFsaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2bGVuTWF4ID0gdGhpcy5hbGlnbm1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZCA9IHN1YlN0ckFkZHIgJSB2bGVuTWF4O1xuICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YlN0ckFkZHIgKz0gdmxlbk1heCAtIG1vZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcFJkRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG5cbiAgICAgICAgICAgIC8vUmVhZCB0aGUgZXJyb3IgY29kZXMgb2YgdGhlIEFEUyBzdWIgY29tbWFuZHMuXG4gICAgICAgICAgICBmb3IgKGlkeCA9IDAsIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGg7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICAgICAgZXJyb3JDb2RlID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFEUyBzdWIgY29tbWFuZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIGEgU3VtUmVhZFJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBjb2RlOiAnICsgZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbUxpc3RbaWR4XSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RyQWRkciArPSA0O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vUnVuIHRocm91Z2ggdGhlIGVsZW1lbnRzIGluIHRoZSBpdGVtIGxpc3QuXG4gICAgICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0eXBlIGFuZCBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgICAgICAgICAgICB0eXBlID0gaXRlbUluZm8udHlwZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBpdGVtSW5mby5mb3JtYXQ7XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0aGUgbGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGVzLlxuICAgICAgICAgICAgICAgIGl0ZW1TaXplID0gaXRlbUluZm8uc2l6ZTtcblxuICAgICAgICAgICAgICAgIC8vUmVzZXQgY291bnRlciBmb3IgYXJyYXlzLlxuICAgICAgICAgICAgICAgIGkgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgLy9TbGljZSB0aGUgc3RyaW5nIGFuZCBkZWNvZGUgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgaXRlbVNpemUpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQVJSQVknOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU9iaiA9IHRoaXMucGFyc2VWYXJOYW1lKGl0ZW0uanZhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJTdHJBZGRyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gaXRlbUluZm8uYXJyYXlMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uYXJyYXlEYXRhVHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdHJ1Y3R1cmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBpdGVtSW5mby5hcnJheURhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdWJTdHJpbmdTbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdVU0VSJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFPYmogPSB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmp2YXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViU3RyQWRkciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN0cnVjdHVyZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnZlcnQgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFPYmogPSB3aW5kb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgdHlwZSwgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIEphdmFTY3JpcHQgdmFyaWFibGUgYW5kIHdyaXRlIHRoZSBkYXRhIHRvIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmp2YXIsIGRhdGEsIGRhdGFPYmosIGl0ZW0ucHJlZml4LCBpdGVtLnN1ZmZpeCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIG5leHQgc3RyaW5nIGFkZHJlc3NcbiAgICAgICAgICAgICAgICBzdHJBZGRyICs9IGl0ZW1TaXplO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFBhcnNpbmcgb2YgU3VtUmVhZFJlcXVlc3QgZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgdGhlIHJlc3BvbnNlIHN0cmluZyBvZiBhIFN1bVdyaXRlUmVxdWVzdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQURTIFJlcXVlc3QgT2JqZWN0XG4gICAgICovXG4gICAgcGFyc2VTdW1Xcml0ZVJlcShhZHNSZXEpIHtcblxuICAgICAgICB2YXIgcmVzcG9uc2UsXG4gICAgICAgICAgICBpdGVtTGlzdCA9IGFkc1JlcS5yZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIGFyckRlbGV0ZWRIZGwgPSBbXSxcbiAgICAgICAgICAgIHN0ckFkZHIgPSAwLFxuICAgICAgICAgICAgc3ViU3RyQWRkciA9IDAsXG4gICAgICAgICAgICBkYXRhT2JqID0gd2luZG93LFxuICAgICAgICAgICAgaXRlbSwgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgZGF0YSwgbGVuLCB0eXBlLCBmb3JtYXQsIGlkeCwgbGlzdGxlbiwgZXJyb3JDb2RlLCBkZWxJZHgsIHN5bU5hbWU7XG5cblxuICAgICAgICAvL0p1c3QgbG9vayBmb3IgZXJyb3JzLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcFJkRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG5cbiAgICAgICAgICAgIC8vUmVhZCB0aGUgZXJyb3IgY29kZXMgb2YgdGhlIEFEUyBzdWIgY29tbWFuZHMuXG4gICAgICAgICAgICBmb3IgKGlkeCA9IDAsIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGg7IGlkeCA8IGxpc3RsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICAgICAgZXJyb3JDb2RlID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JDb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vUmVsZWFzZSBoYW5kbGVzIHJlcXVlc3Q/XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZHNSZXEucmVxRGVzY3IuaXNSZWxIZGxSZXEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5bU5hbWUgPSBpdGVtTGlzdFtpZHhdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGUgaGFuZGxlIGZyb20gdGhlIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5oYW5kbGVDYWNoZVtzeW1OYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRGVsZXRlIHRoZSBoYW5kbGUgaW4gdGhlIGhhbmRsZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxJZHggPSB0aGlzLmhhbmRsZU5hbWVzLmluZGV4T2Yoc3ltTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5oYW5kbGVOYW1lc1tkZWxJZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyRGVsZXRlZEhkbFtpZHhdID0gc3ltTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFEUyBzdWIgY29tbWFuZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIGEgU3VtUmVhZFJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBjb2RlOiAnICsgZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbUxpc3RbaWR4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gNDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9SZWxlYXNlIGhhbmRsZXMgcmVxdWVzdD9cbiAgICAgICAgICAgIGlmIChhZHNSZXEucmVxRGVzY3IuaXNSZWxIZGxSZXEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSBkZWxldGVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgZm9yIChpZHggPSB0aGlzLmhhbmRsZU5hbWVzLmxlbmd0aCAtIDE7IGlkeCA+PSAwOyBpZHgtLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVOYW1lc1tpZHhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTmFtZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FjaGVSZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEFsbCBoYW5kbGVzIHJlbGVhc2VkLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogUmVsZWFzZWQgaGFuZGxlczonKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coYXJyRGVsZXRlZEhkbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIFN1bVdyaXRlUmVxdWVzdCBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIHRoZSByZXNwb25zZSBzdHJpbmcgb2YgYSBBRFMgU3RhdGUgUmVxdWVzdCBhbmQgc3RvcmUgdGhlIGRhdGEuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkc1JlcSAgIEFEUyBSZXFlc3QgT2JqZWN0XG4gICAgICovXG4gICAgcGFyc2VBZHNTdGF0ZShhZHNSZXEpIHtcblxuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuYWRzU3RhdGUgPSBwYXJzZUludChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncEFkc1N0YXRlJylbMF0uZmlyc3RDaGlsZC5kYXRhLCAxMCk7XG4gICAgICAgICAgICB0aGlzLmFkc1N0YXRlVHh0ID0gdGhpcy5hZHNTdGF0ZXNbdGhpcy5hZHNTdGF0ZV07XG4gICAgICAgICAgICB0aGlzLmRldmljZVN0YXRlID0gcGFyc2VJbnQocmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BEZXZpY2VTdGF0ZScpWzBdLmZpcnN0Q2hpbGQuZGF0YSwgMTApO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIEFEUyBSZWFkIFN0YXRlIFJlcXVlc3QgZmFpbGVkOicgKyBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY29kZSB0aGUgcmVzcG9uc2Ugc3RyaW5nIG9mIGEgUmVhZFdyaXRlIFJlcXVlc3QgYW5kIHN0b3JlIHRoZSBoYW5kbGVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhZHNSZXEgICBBRFMgUmVxdWVzdCBPYmplY3RcbiAgICAgKi9cbiAgICBwYXJzZUhhbmRsZXMoYWRzUmVxKSB7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlLFxuICAgICAgICAgICAgYXJyU3ltTmFtZXMgPSB0aGlzLmhhbmRsZU5hbWVzLFxuICAgICAgICAgICAgc3RyQWRkciA9IDAsXG4gICAgICAgICAgICBzdWJTdHJBZGRyID0gMCxcbiAgICAgICAgICAgIGRhdGFTdHJpbmcsIGRhdGFTdWJTdHJpbmcsIGhhbmRsZVZhbCwgaWR4LCBhcnJsZW4sIGVycm9yQ29kZSwgcmV0dXJuTGVuO1xuXG4gICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcFJkRGF0YScpWzBdLmZpcnN0Q2hpbGQuZGF0YSk7XG5cbiAgICAgICAgLy9SZWFkIHRoZSBlcnJvciBjb2RlcyBhbmQgdGhlIHJldHVybiBsZW5ndGggb2YgdGhlIEFEUyBzdWIgY29tbWFuZHMuXG4gICAgICAgIGZvciAoaWR4ID0gMCwgYXJybGVuID0gYXJyU3ltTmFtZXMubGVuZ3RoOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIGRhdGFTdWJTdHJpbmcgPSBkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyLCA0KTtcbiAgICAgICAgICAgIGVycm9yQ29kZSA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuICAgICAgICAgICAgc3RyQWRkciArPSA0O1xuXG4gICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICByZXR1cm5MZW4gPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcbiAgICAgICAgICAgIHN0ckFkZHIgKz0gNDtcblxuICAgICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEVycm9yIHdoaWxlIHJlYWRpbmcgYSBoYW5kbGUgZnJvbSB0aGUgUExDIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBjb2RlOiAnICsgZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnSGFuZGxlOiAnICsgYXJyU3ltTmFtZXNbaWR4XSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0hhbmRsZSByZXF1ZXN0IGFib3J0ZWQhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vUnVuIHRocm91Z2ggdGhlIGVsZW1lbnRzIGluIHRoZSBzeW1ib2xOYW1lIGxpc3QsXG4gICAgICAgIC8vZ2V0IHRoZSBkYXRhIG91dCBvZiB0aGUgc3RyaW5nIGFuZCBzdG9yZSBpdCBpbiB0aGUgY2FjaGUuXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAvL1NsaWNlIHRoZSBzdHJpbmcgYW5kIGRlY29kZSB0aGUgZGF0YVxuICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKHN0ckFkZHIsIDQpO1xuICAgICAgICAgICAgaGFuZGxlVmFsID0gdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN1YlN0cmluZywgJ0RXT1JEJyk7XG4gICAgICAgICAgICBzdHJBZGRyICs9IDQ7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FjaGVbYXJyU3ltTmFtZXNbaWR4XV0gPSBoYW5kbGVWYWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZUNhY2hlUmVhZHkgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogSGFuZGxlIGNhY2hlIHJlYWR5LicpO1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlU2luZ2xlKG1ldGhvZCwgdHlwZSwgYXJncykge1xuICAgICAgICBsZXQgcmVxRGVzY3IgPSB0aGlzLmNyZWF0ZVNpbmdsZURlc2NyaXB0b3IobWV0aG9kLCB0eXBlLCBhcmdzKVxuICAgICAgICBsZXQgYWRzUmVxID0gdGhpcy53cml0ZVJlcShyZXFEZXNjcilcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcSlcbiAgICAgICAgbGV0IHZhbHVlID0gYXdhaXQgdGhpcy5hZHNSZXFTZW5kQXN5bmMoYWRzUmVxKVxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICBhc3luYyByZWFkU2luZ2xlKG1ldGhvZCwgdHlwZSwgYXJncykge1xuICAgICAgICBsZXQgcmVxRGVzY3IgPSB0aGlzLmNyZWF0ZVNpbmdsZURlc2NyaXB0b3IobWV0aG9kLCB0eXBlLCBhcmdzKVxuICAgICAgICBsZXQgYWRzUmVxID0gdGhpcy5yZWFkUmVxKHJlcURlc2NyKVxuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKVxuICAgICAgICBsZXQgdmFsdWUgPSBhd2FpdCB0aGlzLmFkc1JlcVNlbmRBc3luYyhhZHNSZXEpXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIEZ1bmN0aW9ucyBmb3IgQ3JlYXRpbmcgUmVxdWVzdCBEZXNjcmlwdG9yc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gIFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBSZXF1ZXN0IERlc2NyaXB0b3IgZm9yIGEgc2luZ2xlIHZhcmlhYmxlLiBBbiBpdGVtIGxpc3RcbiAgICAgKiB3aXRoIGEgc2luZ2xlIGFycmF5IGl0ZW0gaXMgZ2VuZXJhdGVkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgICBUaGUgbWV0aG9kLCBlaXRoZXIgXCJSZWFkXCIgb3IgXCJXcml0ZVwiLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlICAgICBUaGUgUExDIGRhdGEgdHlwZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAgICAgVGhlIGFyZ3VtZW50cyBmb3IgYnVpbGRpbmcgZm9yIHRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuXG4gICAgICovXG4gICAgY3JlYXRlU2luZ2xlRGVzY3JpcHRvcihtZXRob2QsIHR5cGUsIGFyZ3MpIHtcblxuICAgICAgICB2YXIgcmVxRGVzY3IgPSB7fSxcbiAgICAgICAgICAgIGxlbiwgaXRlbUluZm87XG5cbiAgICAgICAgYXJncy50eXBlID0gdHlwZTsgLy9UbyBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzIGluIGdldEl0ZW1JbmZvcm1hdGlvbigpXG5cbiAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihhcmdzKTtcbiAgICAgICAgbGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICAvL0NoYW5nZSB0aGUgcmVhZCBsZW5ndGggaWYgYSB2YWx1ZSBpcyBnaXZlbi5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKGFyZ3Muc3RybGVuKSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3Muc3RybGVuO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSBhcmdzLnN0cmxlbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtSW5mby5zdHJpbmdMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBsZW47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcgZm9yIHRoaXMgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxlbisrOyAvL1Rlcm1pbmF0aW9uXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdUSU1FJzpcbiAgICAgICAgICAgIGNhc2UgJ1RPRCc6XG4gICAgICAgICAgICBjYXNlICdEVCc6XG4gICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgIGNhc2UgJ0RBVEVfQU5EX1RJTUUnOlxuICAgICAgICAgICAgY2FzZSAnVElNRV9PRl9EQVknOlxuICAgICAgICAgICAgICAgIC8vQXBwZW5kIHRoZSBmb3JtYXQgc3RyaW5nIHRvIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmZvcm1hdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdSRUFMJzpcbiAgICAgICAgICAgIGNhc2UgJ0xSRUFMJzpcbiAgICAgICAgICAgICAgICAvL0FwcGVuZCB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmRlY1BsYWNlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmRlY1BsYWNlcztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmRwID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3MuZHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DcmVhdGUgdGhlIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgICAgcmVxRGVzY3IgPSB7XG4gICAgICAgICAgICBhZGRyOiBhcmdzLmFkZHIsXG4gICAgICAgICAgICBzeW1ib2xOYW1lOiBpdGVtSW5mby5zeW1ib2xOYW1lLFxuICAgICAgICAgICAgZGF0YVR5cGVOYW1lczogaXRlbUluZm8uZGF0YVR5cGVOYW1lcyxcbiAgICAgICAgICAgIGRhdGFUeXBlQXJySWR4OiBpdGVtSW5mby5kYXRhVHlwZUFycklkeCxcbiAgICAgICAgICAgIHN5bWJvbE5hbWVBcnJJZHg6IGl0ZW1JbmZvLnN5bWJvbE5hbWVBcnJJZHgsXG4gICAgICAgICAgICBmdWxsU3ltYm9sTmFtZTogYXJncy5uYW1lLFxuICAgICAgICAgICAgdXNlSGFuZGxlOiBhcmdzLmhhbmRsZSxcbiAgICAgICAgICAgIGlkOiBhcmdzLmlkLFxuICAgICAgICAgICAgb2M6IGFyZ3Mub2MsXG4gICAgICAgICAgICBvY2Q6IGFyZ3Mub2NkLFxuICAgICAgICAgICAgb2U6IGFyZ3Mub2UsXG4gICAgICAgICAgICBvdDogYXJncy5vdCxcbiAgICAgICAgICAgIHJlYWRMZW5ndGg6IGxlbixcbiAgICAgICAgICAgIGRlYnVnOiBhcmdzLmRlYnVnLFxuICAgICAgICAgICAgc3luYzogYXJncy5zeW5jLFxuICAgICAgICAgICAgb2ZmczogYXJncy5vZmZzLFxuICAgICAgICAgICAgc2VxOiB0cnVlLFxuICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgdmFsOiBhcmdzLnZhbCxcbiAgICAgICAgICAgICAgICBqdmFyOiBhcmdzLmp2YXIsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBwcmVmaXg6IGFyZ3MucHJlZml4LFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogYXJncy5zdWZmaXhcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXFEZXNjclxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgUmVxdWVzdCBEZXNjcmlwdG9yIGZvciBhbiBhcnJheS4gQW4gaXRlbSBsaXN0IG9mXG4gICAgICogc2luZ2xlIHZhcmlhYmxlcyBpcyBnZW5lcmF0ZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCAgIFRoZSBtZXRob2QsIGVpdGhlciBcIlJlYWRcIiBvciBcIldyaXRlXCIuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgICAgIFRoZSBkYXRhIHR5cGUgb2YgdGhlIFBMQyB2YXJpYWJsZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAgICAgVGhlIGFyZ3VtZW50cyBmb3IgYnVpbGRpbmcgdGhlIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBjcmVhdGVBcnJheURlc2NyaXB0b3IobWV0aG9kLCB0eXBlLCBhcmdzKSB7XG5cbiAgICAgICAgdmFyIHJlcURlc2NyID0ge30gYXMgYW55LFxuICAgICAgICAgICAgZGF0YU9iaiA9IHt9LFxuICAgICAgICAgICAgYXJyYXlMZW5ndGgsXG4gICAgICAgICAgICBhZGRyT2Zmc2V0LFxuICAgICAgICAgICAgY250ID0gMCxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBsZW4sXG4gICAgICAgICAgICBkZWZBcnIgPSBbXSxcbiAgICAgICAgICAgIGxlbkFyckVsZW0sXG4gICAgICAgICAgICBsYXN0RGVmQXJyLFxuICAgICAgICAgICAgc3RydWN0Qnl0ZUxlbiA9IDAsXG4gICAgICAgICAgICBzdHJsZW4sXG4gICAgICAgICAgICB2bGVuLFxuICAgICAgICAgICAgdmxlbk1heCA9IDAsXG4gICAgICAgICAgICBlbmRQYWRMZW4gPSAwLFxuICAgICAgICAgICAgbW9kLFxuICAgICAgICAgICAgYWRkcixcbiAgICAgICAgICAgIHdydE9uZU9ubHksXG4gICAgICAgICAgICBhcnJTeW1UeXBlLFxuICAgICAgICAgICAgaXRlbUluZm87XG5cbiAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihhcmdzKTtcblxuICAgICAgICAvL0dldCB0aGUgb2JqZWN0IG9mIHRoZSBzdG9yZWQgZGF0YSwgZGlyZWN0IHdpdGggJ3ZhbCdcbiAgICAgICAgLy9mb3IgYSB3cml0ZSByZXF1ZXN0IG9yIHBhcnNpbmcgdGhlIG5hbWUgaWYgJ2p2YXInIGlzIGdpdmVuLlxuICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnICYmIHR5cGVvZiBhcmdzLnZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGRhdGFPYmogPSBhcmdzLnZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJncy5qdmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YU9iaiA9IHRoaXMucGFyc2VWYXJOYW1lKGFyZ3MuanZhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBkYXRhIG9iamVjdCBmb3IgdGhpcyAnICsgbWV0aG9kICsgJy1SZXF1ZXN0IGRlZmluZWQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZ3MuYXJybGVuID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgLy9PdmVycmlkZSBhcnJheSBsZW5ndGggaWYgbWFudWFsbHkgc2V0XG4gICAgICAgICAgICBhcnJheUxlbmd0aCA9IGFyZ3MuYXJybGVuO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1JbmZvLmFycmF5TGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vR2V0IHRoZSBhcnJheSBsZW5ndGggZnJvbSB0aGUgc3ltYm9sIHRhYmxlLlxuICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBpdGVtSW5mby5hcnJheUxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENhblxcJ3QgZ2V0IHRoZSBhcnJheSBsZW5ndGggZm9yIHRoaXMgcmVxdWVzdCEnKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGVjayBpZiBvbmx5IG9uZSBpdGVtIHNob3VsZCBiZSB3cml0dGVuLlxuICAgICAgICBpZiAodHlwZW9mIGFyZ3MuaXRlbSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKGFyZ3MuaXRlbSkgJiYgbWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICB3cnRPbmVPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChhcmdzLml0ZW0gPCAwIHx8IGFyZ3MuaXRlbSA+IGFycmF5TGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFdyb25nIHZhbHVlIGZvciBcIml0ZW1cIiEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnaXRlbTogJyArIGFyZ3MuaXRlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ0xhc3QgYXJyYXkgaW5kZXg6ICcgKyAoYXJyYXlMZW5ndGggLSAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRnVuY3Rpb24gZm9yIGNyZWF0aW5nIGFuIGRlc2NyaXB0b3IgZm9yIGFycmF5IG9mIHN0cnVjdHVyZXMuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBjcmVhdGVTdHJ1Y3RBcnIgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBlbGVtO1xuICAgICAgICAgICAgLy9QYXJzZSB0aGUgbmFtZSBvZiB0aGUgc3RydWN0dXJlIGRlZmluaXRvbiwgaWYgaXQgaXMgcGFzc2VkXG4gICAgICAgICAgICAvL2FzIGEgc3RyaW5nLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzLmRlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBhcmdzLmRlZiA9IHRoaXMucGFyc2VWYXJOYW1lKGFyZ3MuZGVmKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPT09IHRydWUgJiYgYXJncy5kZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFyZ3MuZGVmID0gdGhpcy5jcmVhdGVTdHJ1Y3REZWYoaXRlbUluZm8uZGF0YVR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJncy5kZWYgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gc3RydWN0dXJlIGRlZmluaXRpb24gZm91bmQhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBsZW5ndGggb2YgdGhlIHN0cnVjdHVyZSBhbmQgdGhlIHBhZGRpbmcgYnl0ZXNcbiAgICAgICAgICAgIGZvciAoZWxlbSBpbiBhcmdzLmRlZikge1xuXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGVmLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9TZXBhcmF0ZSBkYXRhIHR5cGUgYW5kIGxlbmd0aC5cbiAgICAgICAgICAgICAgICAgICAgZGVmQXJyID0gYXJncy5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyWzBdID09PSAnQVJSQVknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5BcnJFbGVtID0gcGFyc2VJbnQoZGVmQXJyWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZBcnIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZkFyci5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuQXJyRWxlbTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyWzBdID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmQXJyWzFdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmxlbiA9ICh0aGlzLmlzVmFsaWRTdHJpbmdMZW4oc3RybGVuKSA/IHN0cmxlbiA6IHRoaXMucGxjVHlwZUxlbltkZWZBcnJbMF1dKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZsZW4gPSB0aGlzLnBsY1R5cGVMZW5bZGVmQXJyWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB2bGVuID4gMSAmJiBkZWZBcnJbMF0gIT09ICdTVFJJTkcnICYmIHN0cnVjdEJ5dGVMZW4gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kID0gc3RydWN0Qnl0ZUxlbiAlIHZsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RydWN0Qnl0ZUxlbiArPSB2bGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cnVjdEJ5dGVMZW4gKz0gdmxlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1N0b3JlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICAvL2ZvciBpbnNlcnRpbmcgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdmxlbiA+IHZsZW5NYXggJiYgZGVmQXJyWzBdICE9PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmxlbk1heCA9IHZsZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID4gMSAmJiB2bGVuTWF4ID4gMSAmJiBkZWZBcnJbMF0gIT09ICdTVFJJTkcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZsZW5NYXggPiB0aGlzLmFsaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2bGVuTWF4ID0gdGhpcy5hbGlnbm1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZCA9IHN0cnVjdEJ5dGVMZW4gJSB2bGVuTWF4O1xuICAgICAgICAgICAgICAgIGlmIChtb2QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZFBhZExlbiA9IHZsZW5NYXggLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgIHN0cnVjdEJ5dGVMZW4gKz0gZW5kUGFkTGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9TZXQgdGhlIGFkZHJlc3Mgb2Zmc2V0IGFuZCB0aGUgbGVuZ3RoIHRvIDEgXG4gICAgICAgICAgICAvL2lmIG9ubHkgb25lIGl0ZW0gc2hvdWxkIGJlIHNlbnQuXG4gICAgICAgICAgICBpZiAod3J0T25lT25seSkge1xuICAgICAgICAgICAgICAgIGFkZHJPZmZzZXQgPSBzdHJ1Y3RCeXRlTGVuICogYXJncy5pdGVtO1xuICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxRGVzY3IgPSB7XG4gICAgICAgICAgICAgICAgYWRkcjogYXJncy5hZGRyLFxuICAgICAgICAgICAgICAgIHN5bWJvbE5hbWU6IGl0ZW1JbmZvLnN5bWJvbE5hbWUsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVOYW1lczogaXRlbUluZm8uZGF0YVR5cGVOYW1lcyxcbiAgICAgICAgICAgICAgICBmdWxsU3ltYm9sTmFtZTogYXJncy5uYW1lLFxuICAgICAgICAgICAgICAgIGFkZHJPZmZzZXQ6IGFkZHJPZmZzZXQsXG4gICAgICAgICAgICAgICAgdXNlSGFuZGxlOiBhcmdzLmhhbmRsZSxcbiAgICAgICAgICAgICAgICBpZDogYXJncy5pZCxcbiAgICAgICAgICAgICAgICBvYzogYXJncy5vYyxcbiAgICAgICAgICAgICAgICBvY2Q6IGFyZ3Mub2NkLFxuICAgICAgICAgICAgICAgIG9lOiBhcmdzLm9lLFxuICAgICAgICAgICAgICAgIG90OiBhcmdzLm90LFxuICAgICAgICAgICAgICAgIGRlYnVnOiBhcmdzLmRlYnVnLFxuICAgICAgICAgICAgICAgIHJlYWRMZW5ndGg6IHN0cnVjdEJ5dGVMZW4gKiBhcnJheUxlbmd0aCxcbiAgICAgICAgICAgICAgICBzZXE6IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsY0FsaWdubWVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkYXRhT2JqOiBkYXRhT2JqLFxuICAgICAgICAgICAgICAgIHN5bmM6IGFyZ3Muc3luYyxcbiAgICAgICAgICAgICAgICBvZmZzOiBhcmdzLm9mZnMsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgaXRlbSBsaXN0LlxuICAgICAgICAgICAgLy9BbHRob3VnaCBqdmFyIGlzbid0IG5lY2Vzc2FyeSBmb3Igd3JpdGUgcmVxdWVzdHMsXG4gICAgICAgICAgICAvL2l0J3MgZ29vZCBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gYXJncy5kZWYpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5kZWYuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyID0gYXJncy5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbkFyckVsZW0gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGVmQXJyID0gZGVmQXJyLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGVuQXJyRWxlbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhcjogaSArICcuJyArIGVsZW0gKyBqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl0gKyAnLicgKyBkZWZBcnJbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganZhcjogaSArICcuJyArIGVsZW0gKyAnLicgKyBqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl0gKyAnLicgKyBkZWZBcnJbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3cnRPbmVPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFycltsYXN0RGVmQXJyXSA9PT0gJ1NQJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbYXJncy5pdGVtXVtlbGVtICsgal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2FyZ3MuaXRlbV1bZWxlbV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialtpXVtlbGVtICsgal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2ldW2VsZW1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGkgKyAnLicgKyBlbGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBhcmdzLmRlZltlbGVtXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod3J0T25lT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2FyZ3MuaXRlbV1bZWxlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbaV1bZWxlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TZXQgYW4gaXRlbSBhcyBhIG1hcmsgYXQgdGhlIGVuZCBvZiB0aGUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgLy9mb3IgaW5zZXJ0aW5nIHBhZGRpbmcgYnl0ZXMgaW4gXCJ3cml0ZVJlcVwiIGFuZCBcInJlYWRSZXFcIiBsYXRlci5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRW5kU3RydWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogZW5kUGFkTGVuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBkZXNjcmlwdG9yIGZvciBhIHNpbXBsZSBhcnJheS5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGNyZWF0ZVNpbXBsZUFyciA9ICgpID0+IHtcbiAgICAgICAgICAgIGxlbiA9IHRoaXMucGxjVHlwZUxlblt0eXBlXTtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihhcmdzLnN0cmxlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hhbmdlIHRoZSByZWFkIGxlbmd0aCBpZiBhIHZhbHVlIGlzIGdpdmVuLlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLnN0cmxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IGFyZ3Muc3RybGVuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtSW5mby5zdHJpbmdMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zdHJpbmdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGxlbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgc3RyaW5nIGZvciB0aGlzIHJlcXVlc3QhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZW4rKzsgLy9UZXJtaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdUSU1FJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUT0QnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RUJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEQVRFJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEQVRFX0FORF9USU1FJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUSU1FX09GX0RBWSc6XG4gICAgICAgICAgICAgICAgICAgIC8vQXBwZW5kIHRoZSBmb3JtYXQgc3RyaW5nIHRvIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncy5mb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICs9ICcuJyArIGFyZ3MuZm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JFQUwnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0xSRUFMJzpcbiAgICAgICAgICAgICAgICAgICAgLy9BcHBlbmQgdGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB0byB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3MuZGVjUGxhY2VzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSArPSAnLicgKyBhcmdzLmRlY1BsYWNlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgYXJncy5kcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgKz0gJy4nICsgYXJncy5kcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9TZXQgdGhlIGFkZHJlc3Mgb2Zmc2V0IGFuZCB0aGUgbGVuZ3RoIHRvIDEgXG4gICAgICAgICAgICAvL2lmIG9ubHkgb25lIGl0ZW0gc2hvdWxkIGJlIHNlbnQuXG4gICAgICAgICAgICBpZiAod3J0T25lT25seSkge1xuICAgICAgICAgICAgICAgIGFkZHJPZmZzZXQgPSBhcmdzLml0ZW0gKiBsZW47XG4gICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXFEZXNjciA9IHtcbiAgICAgICAgICAgICAgICBhZGRyOiBhcmdzLmFkZHIsXG4gICAgICAgICAgICAgICAgc3ltYm9sTmFtZTogaXRlbUluZm8uc3ltYm9sTmFtZSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZU5hbWVzOiBpdGVtSW5mby5kYXRhVHlwZU5hbWVzLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlQXJySWR4OiBpdGVtSW5mby5kYXRhVHlwZUFycklkeCxcbiAgICAgICAgICAgICAgICBzeW1ib2xOYW1lQXJySWR4OiBpdGVtSW5mby5zeW1ib2xOYW1lQXJySWR4LFxuICAgICAgICAgICAgICAgIGZ1bGxTeW1ib2xOYW1lOiBhcmdzLm5hbWUsXG4gICAgICAgICAgICAgICAgdXNlSGFuZGxlOiBhcmdzLmhhbmRsZSxcbiAgICAgICAgICAgICAgICBhZGRyT2Zmc2V0OiBhZGRyT2Zmc2V0LFxuICAgICAgICAgICAgICAgIGlkOiBhcmdzLmlkLFxuICAgICAgICAgICAgICAgIG9jOiBhcmdzLm9jLFxuICAgICAgICAgICAgICAgIG9jZDogYXJncy5vY2QsXG4gICAgICAgICAgICAgICAgb2U6IGFyZ3Mub2UsXG4gICAgICAgICAgICAgICAgb3Q6IGFyZ3Mub3QsXG4gICAgICAgICAgICAgICAgcmVhZExlbmd0aDogbGVuICogYXJyYXlMZW5ndGgsXG4gICAgICAgICAgICAgICAgZGVidWc6IGFyZ3MuZGVidWcsXG4gICAgICAgICAgICAgICAgc2VxOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGFPYmo6IGRhdGFPYmosXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL0NyZWF0ZSB0aGUgaXRlbSBsaXN0LlxuICAgICAgICAgICAgLy9BbHRob3VnaCBqdmFyIGlzbid0IG5lY2Vzc2FyeSBmb3Igd3JpdGUgcmVxdWVzdHMsXG4gICAgICAgICAgICAvL2l0J3MgZ29vZCBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGp2YXI6IGksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdydE9uZU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2ldLnZhbCA9IGRhdGFPYmpbYXJncy5pdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2ldLnZhbCA9IGRhdGFPYmpbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0eXBlID09PSAnU1RSVUNUJykge1xuICAgICAgICAgICAgY3JlYXRlU3RydWN0QXJyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGVTaW1wbGVBcnIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1dyaXRlJykge1xuICAgICAgICAgICAgdGhpcy53cml0ZVJlcShyZXFEZXNjcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRSZXEocmVxRGVzY3IpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBSZXF1ZXN0IERlc2NyaXB0b3IgZm9yIGEgc3RydWN0dXJlLFxuICAgICAqIGEgc3RydWN0dXJlIGRlZmluaXRpb24gaGFzIHRvIGJlIHBhc3NlZCBhcyBvbmUgb2YgdGhlIGFyZ3VtZW50cyxcbiAgICAgKiBmcm9tIHdpY2ggdGhlIGl0ZW0gbGlzdCBpcyBjcmVhdGVkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgICBUaGUgbWV0aG9kLCBlaXRoZXIgXCJSZWFkXCIgb3IgXCJXcml0ZVwiLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzICAgICBUaGUgYXJndW1lbnRzIGZvciBidWlsZGluZyB0aGUgUmVxdWVzdCBEZXNjcmlwdG9yLlxuICAgICAqL1xuICAgIGNyZWF0ZVN0cnVjdERlc2NyaXB0b3IobWV0aG9kLCBhcmdzKSB7XG5cbiAgICAgICAgdmFyIHJlcURlc2NyID0ge30gYXMgYW55LCAgICAgIC8vUmVxdWVzdCBEZXNjcmlwdG9yXG4gICAgICAgICAgICBkYXRhT2JqID0ge30sICAgICAgIC8vb2JqZWN0IHdpY2ggaG9sZHMgdGhlIGRhdGEgZm9yIHdyaXRlIHJlcXVlc3RzIFxuICAgICAgICAgICAgZGVmQXJyID0gW10sICAgICAgICAvL3N1YmVsZW1lbnRzIG9mIGEgc3RydWN0dXJlIGRlZmluaXRpb24gaXRlbVxuICAgICAgICAgICAgY250ID0gMCxcbiAgICAgICAgICAgIGxhc3REZWZBcnIsXG4gICAgICAgICAgICBsZW5BcnJFbGVtLFxuICAgICAgICAgICAgZWxlbSxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBpdGVtSW5mbztcblxuICAgICAgICBpdGVtSW5mbyA9IHRoaXMuZ2V0SXRlbUluZm9ybWF0aW9uKGFyZ3MpO1xuXG4gICAgICAgIC8vR2V0IHRoZSBvYmplY3Qgb2YgdGhlIHN0b3JlZCBkYXRhLCBkaXJlY3Qgd2l0aCAndmFsJ1xuICAgICAgICAvL2ZvciBhIHdyaXRlIHJlcXVlc3Qgb3IgcGFyc2luZyB0aGUgbmFtZSBpZiAnanZhcicgaXMgZ2l2ZW4uXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScgJiYgdHlwZW9mIGFyZ3MudmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZGF0YU9iaiA9IGFyZ3MudmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmp2YXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhT2JqID0gdGhpcy5wYXJzZVZhck5hbWUoYXJncy5qdmFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIGRhdGEgb2JqZWN0IGZvciB0aGlzICcgKyBtZXRob2QgKyAnLVJlcXVlc3QgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vUGFyc2UgdGhlIG5hbWUgb2YgdGhlIHN0cnVjdHVyZSBkZWZpbml0b24sIGlmIGl0IGlzIHBhc3NlZFxuICAgICAgICAvL2FzIGEgc3RyaW5nLlxuICAgICAgICBpZiAodHlwZW9mIGFyZ3MuZGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYXJncy5kZWYgPSB0aGlzLnBhcnNlVmFyTmFtZShhcmdzLmRlZik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhVHlwZVRhYmxlUmVhZHkgPT09IHRydWUgJiYgYXJncy5kZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXJncy5kZWYgPSB0aGlzLmNyZWF0ZVN0cnVjdERlZihpdGVtSW5mby5kYXRhVHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MuZGVmICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gc3RydWN0dXJlIGRlZmluaW5pdGlvbiBmb3VuZCAoY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCkpIScpO1xuICAgICAgICAgICAgdGhpcy5sb2coYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXFEZXNjciA9IHtcbiAgICAgICAgICAgIGFkZHI6IGFyZ3MuYWRkcixcbiAgICAgICAgICAgIHN5bWJvbE5hbWU6IGl0ZW1JbmZvLnN5bWJvbE5hbWUsXG4gICAgICAgICAgICBkYXRhVHlwZU5hbWVzOiBpdGVtSW5mby5kYXRhVHlwZU5hbWVzLFxuICAgICAgICAgICAgZGF0YVR5cGVBcnJJZHg6IGl0ZW1JbmZvLmRhdGFUeXBlQXJySWR4LFxuICAgICAgICAgICAgc3ltYm9sTmFtZUFycklkeDogaXRlbUluZm8uc3ltYm9sTmFtZUFycklkeCxcbiAgICAgICAgICAgIGZ1bGxTeW1ib2xOYW1lOiBhcmdzLm5hbWUsXG4gICAgICAgICAgICB1c2VIYW5kbGU6IGFyZ3MuaGFuZGxlLFxuICAgICAgICAgICAgaWQ6IGFyZ3MuaWQsXG4gICAgICAgICAgICBvYzogYXJncy5vYyxcbiAgICAgICAgICAgIG9jZDogYXJncy5vY2QsXG4gICAgICAgICAgICBvZTogYXJncy5vZSxcbiAgICAgICAgICAgIG90OiBhcmdzLm90LFxuICAgICAgICAgICAgZGVidWc6IGFyZ3MuZGVidWcsXG4gICAgICAgICAgICBzZXE6IHRydWUsXG4gICAgICAgICAgICBjYWxjQWxpZ25tZW50OiB0cnVlLFxuICAgICAgICAgICAgZGF0YU9iajogZGF0YU9iaixcbiAgICAgICAgICAgIHN5bmM6IGFyZ3Muc3luYyxcbiAgICAgICAgICAgIG9mZnM6IGFyZ3Mub2ZmcyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vQ3JlYXRlIHRoZSBpdGVtIGxpc3QuXG4gICAgICAgIC8vQWx0aG91Z2gganZhciBpc24ndCBuZWNlc3NhcnkgZm9yIHdyaXRlIHJlcXVlc3RzLFxuICAgICAgICAvL2l0J3MgZ29vZCBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAgICAgICAgZm9yIChlbGVtIGluIGFyZ3MuZGVmKSB7XG5cbiAgICAgICAgICAgIGlmIChhcmdzLmRlZi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuXG4gICAgICAgICAgICAgICAgZGVmQXJyID0gYXJncy5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbMF0gPT09ICdBUlJBWScpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuQXJyRWxlbSA9IHBhcnNlSW50KGRlZkFyclsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBsYXN0RGVmQXJyID0gZGVmQXJyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5BcnJFbGVtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZBcnJbbGFzdERlZkFycl0gPT09ICdTUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdmFyOiBlbGVtICsgalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REZWZBcnIgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdICsgJy4nICsgZGVmQXJyWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udHlwZSA9IGRlZkFyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGVsZW0gKyAnLicgKyBqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnR5cGUgPSBkZWZBcnJbMl0gKyAnLicgKyBkZWZBcnJbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS50eXBlID0gZGVmQXJyWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLml0ZW1zW2NudF0udmFsID0gZGF0YU9ialtlbGVtICsgal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XS52YWwgPSBkYXRhT2JqW2VsZW1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxRGVzY3IuaXRlbXNbY250XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGp2YXI6IGVsZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBhcmdzLmRlZltlbGVtXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnV3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5pdGVtc1tjbnRdLnZhbCA9IGRhdGFPYmpbZWxlbV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9DYWxsIHRoZSBzZW5kIGZ1bmN0aW9uXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdXcml0ZScpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVSZXEocmVxRGVzY3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWFkUmVxKHJlcURlc2NyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFB1YmxpYyBNZXRob2RzXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgd3JpdGUgcmVxdWVzdC4gRGVwZW5kaW5nIG9uIHRoZVxuICAgICAqIHZhbHVlcyBhbmQgUExDIGRhdGEgdHlwZXMgcGFzc2VkIGluIHRoZSB2YXJpYWJsZSBsaXN0IGEgYnl0ZSBhcnJheSBpc1xuICAgICAqIGNyZWF0ZWQgYW5kIHRoZSBmdW5jdGlvbiBmb3Igc2VuZGluZyB0aGUgcmVxdWVzdCBpcyBjYWxsZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICByZXFEZXNjciAgICBUaGUgUmVxdWVzdCBEZXNjcmlwdG9yLiBCZXNpZGVzIG90aGVyIGluZm9ybWF0aW9uXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9iamVjdCBjb250YWlucyB0aGUgYWxsb2NhdGlvbiBvZiBQTEMgYW5kXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IHZhcmlhYmxlcyBpbiBhbiBpdGVtIGxpc3QuXG4gICAgICovXG4gICAgd3JpdGVSZXEocmVxRGVzY3IpIHtcblxuICAgICAgICB2YXIgaXRlbUxpc3QgPSByZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgcERhdGEgPSBbXSBhcyBhbnksXG4gICAgICAgICAgICBhcnJUeXBlID0gW10sXG4gICAgICAgICAgICBieXRlcyA9IFtdLFxuICAgICAgICAgICAgdHlwZSwgZm9ybWF0LCBsaXN0bGVuLCBsZW4sIHZhbCwgcGNvdW50LCBtb2QsIGl0ZW0sIGksIGlkeDtcblxuICAgICAgICAvL1NldCB0aGUgdmFyaWFibGUgbmFtZSB0byB1cHBlciBjYXNlLlxuICAgICAgICBpZiAodHlwZW9mIHJlcURlc2NyLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXFEZXNjci5uYW1lID0gcmVxRGVzY3IubmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9SdW4gdGhyb3VnaCB0aGUgZWxlbWVudHMgaW4gdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgZm9yIChpZHggPSAwLCBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICBhcnJUeXBlID0gdGhpcy5nZXRUeXBlQW5kRm9ybWF0KGl0ZW0pO1xuICAgICAgICAgICAgdHlwZSA9IGFyclR5cGVbMF07XG4gICAgICAgICAgICBmb3JtYXQgPSBhcnJUeXBlWzFdO1xuXG4gICAgICAgICAgICAvL0xlbmd0aCBvZiB0aGUgZGF0YSB0eXBlLlxuICAgICAgICAgICAgLy9NYXhpbXVtIGxlbmdodCBpcyBsaW1pdGVkIHRvIDQgKGR1ZSB0byBzdHJ1Y3R1cmUgcGFkZGluZyksXG4gICAgICAgICAgICAvL3RoZSBsZW5naHQgb2Ygc3RyaW5ncyBpcyBjYWxjdWxhdGVkIGxhdGVyLlxuICAgICAgICAgICAgaWYgKGlzTmFOKHRoaXMucGxjVHlwZUxlblt0eXBlXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDb3VsZCBub3QgZ2V0IHRoZSBsZW5ndGggb2YgdGhlIGRhdGEgdHlwZTogJyArIHR5cGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IFByb2JhYmx5IHdyb25nIHR5cGUgZGVmaW5pdGlvbi4gUGxlYXNlIGNoZWNrIHRoZSBtYW51YWwuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxRGVzY3IpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9QYWRkaW5nIHdpdGhpbiBzdHJ1Y3R1cmVzLlxuICAgICAgICAgICAgLy9cImNhbGNBbGlnbm1lbnRcIiBpcyBvbmx5IHNldCBpbiBcIndyaXRlU3RydWN0L3JlYWRTdHJ1Y3RcIiBhbmRcbiAgICAgICAgICAgIC8vXCJ3cml0ZUFycmF5T2ZTdHJ1Y3QvcmVhZEFycmF5T2ZTdHJ1Y3RcIlxuICAgICAgICAgICAgbGVuID0gKHRoaXMucGxjVHlwZUxlblt0eXBlXSA8IHRoaXMuYWxpZ25tZW50KSA/IHRoaXMucGxjVHlwZUxlblt0eXBlXSA6IHRoaXMuYWxpZ25tZW50O1xuXG4gICAgICAgICAgICBpZiAocmVxRGVzY3IuY2FsY0FsaWdubWVudCA9PT0gdHJ1ZSAmJiBsZW4gPiAxICYmIHR5cGUgIT09ICdTVFJJTkcnICYmIHR5cGUgIT09ICdFbmRTdHJ1Y3QnICYmIHBEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBtb2QgPSBwRGF0YS5sZW5ndGggJSBsZW47XG4gICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGNvdW50ID0gbGVuIC0gbW9kO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IHBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwRGF0YS5wdXNoKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NvbnZlcnQgZGF0YSwgZGVwZW5kaW5nIG9uIHRoZSB0eXBlXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ0VuZFN0cnVjdCcpIHtcbiAgICAgICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aGUgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAvL1wiRW5kU3RydWN0XCIgaXMgb25seSB1c2VkIHdpdGggXCJyZWFkQXJyYXlPZlN0cnVjdHVyZXMvd3JpdGVBcnJheU9mU3RydWN0dXJlc1wiLlxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDE7IGkgPD0gaXRlbS52YWw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwRGF0YS5wdXNoKDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9Db252ZXJ0IHRoZSBkYXRhIHRvIGEgYnl0ZSBhcnJheS5cbiAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGl0ZW0sIHR5cGUsIGZvcm1hdCwgdGhpcy5wbGNUeXBlTGVuW3R5cGVdKTtcbiAgICAgICAgICAgICAgICAvL1N1bW1hcmlzZSB0aGUgZGF0YS4gICAgIFxuICAgICAgICAgICAgICAgIHBEYXRhID0gcERhdGEuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ29udmVydCB0aGUgZGF0YSB0byBCYXNlNjQuXG4gICAgICAgIGlmIChwRGF0YSAmJiBwRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHBEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnV3JpdGUnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5nZXRJbmRleEdyb3VwKHJlcURlc2NyKSxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiB0aGlzLmdldEluZGV4T2Zmc2V0KHJlcURlc2NyKSxcbiAgICAgICAgICAgIHBEYXRhOiBwRGF0YSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYWRzUmVxXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgcmVhZCByZXF1ZXN0LiBJZiBubyB2YWx1ZSBmb3IgdGhlXG4gICAgICogZGF0YSBsZW5ndGggaXN0IHBhc3NlZCwgY2FsY3VsYXRlIHRoZSB2YWx1ZSBhbmQgdGhlbiBjYWxsIHRoZSBmdW5jdGlvbiBcbiAgICAgKiBmb3Igc2VuZGluZyB0aGUgcmVxdWVzdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gIHJlcURlc2NyICAgIFRoZSBSZXF1ZXN0IERlc2NyaXB0b3IuIEJlc2lkZXMgb3RoZXIgaW5mb3JtYXRpb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb2JqZWN0IGNvbnRhaW5zIHRoZSBhbGxvY2F0aW9uIG9mIFBMQyBhbmRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEphdmFTY3JpcHQgdmFyaWFibGVzIGluIGFuIGl0ZW0gbGlzdC5cbiAgICAgKi9cbiAgICByZWFkUmVxKHJlcURlc2NyKSB7XG5cbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgaXRlbUxpc3QgPSByZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIGl0ZW0sIGZvcm1hdCwgdHlwZSwgbGlzdGxlbiwgbW9kLCB2bGVuLCBzdHJsZW4sIGlkeCwgc3RhcnRhZGRyO1xuXG4gICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBkYXRhIGxlbmd0aCBpZiBubyBhcmd1bWVudCBpcyBnaXZlbi5cbiAgICAgICAgaWYgKHR5cGVvZiByZXFEZXNjci5yZWFkTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gMDtcblxuICAgICAgICAgICAgZm9yIChpZHggPSAwLCBsaXN0bGVuID0gaXRlbUxpc3QubGVuZ3RoOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgICAgICAvL0dldCB0eXBlIGFuZCBmb3JtYXR0aW5nIHN0cmluZy5cbiAgICAgICAgICAgICAgICBhcnJUeXBlID0gdGhpcy5nZXRUeXBlQW5kRm9ybWF0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBhcnJUeXBlWzBdO1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGFyclR5cGVbMV07XG5cbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIG9mIHRoZSBQTEMgdmFyaWFibGUuXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHRoaXMucGxjVHlwZUxlblt0eXBlXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGU6ICcgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUHJvYmFibHkgd3JvbmcgdHlwZSBkZWZpbml0aW9uLiBQbGVhc2UgY2hlY2sgdGhlIG1hbnVhbC4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cocmVxRGVzY3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IHBhcnNlSW50KGZvcm1hdCwgMTApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZsZW4gPSAodGhpcy5pc1ZhbGlkU3RyaW5nTGVuKHN0cmxlbikgPyBzdHJsZW4gOiB0aGlzLnBsY1R5cGVMZW5bdHlwZV0pICsgMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2bGVuID0gdGhpcy5wbGNUeXBlTGVuW3R5cGVdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXFEZXNjci5zZXEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlcyBpZiBjb250aW51b3VzbHkgYWRkcmVzc2luZyBpcyB1c2VkLlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxRGVzY3IuY2FsY0FsaWdubWVudCA9PT0gdHJ1ZSAmJiB2bGVuID4gMSAmJiB0eXBlICE9PSAnRW5kU3RydWN0JyAmJiB0eXBlICE9PSAnU1RSSU5HJyAmJiByZXFEZXNjci5yZWFkTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kID0gcmVxRGVzY3IucmVhZExlbmd0aCAlIHZsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggKz0gdmxlbiAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoICs9IHZsZW47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9MYXN0IGVsZW1lbnQgaWYgc2luZ2xlIGFkZHJlc3NlcyBhcmUgZ2l2ZW4uXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0YWRkciA9IHRoaXMuZ2V0SW5kZXhPZmZzZXQocmVxRGVzY3IpO1xuICAgICAgICAgICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gdmxlbiArIGl0ZW0uYWRkciAtIHN0YXJ0YWRkcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZCcsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmdldEluZGV4R3JvdXAocmVxRGVzY3IpLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IHRoaXMuZ2V0SW5kZXhPZmZzZXQocmVxRGVzY3IpLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhZHNSZXFcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzdW0gcmVhZCByZXF1ZXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgcmVxRGVzY3IgICAgVGhlIFJlcXVlc3QgRGVzY3JpcHRvci4gQmVzaWRlcyBvdGhlciBpbmZvcm1hdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGFsbG9jYXRpb24gb2YgUExDIGFuZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSmF2YVNjcmlwdCB2YXJpYWJsZXMgaW4gYW4gaXRlbSBsaXN0LlxuICAgICAqL1xuICAgIHN1bVJlYWRSZXEocmVxRGVzY3IpIHtcbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgaXRlbUxpc3QgPSByZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IFtdLFxuICAgICAgICAgICAgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGgsXG4gICAgICAgICAgICBkdW1teSA9IHt9IGFzIGFueSxcbiAgICAgICAgICAgIHR5cGUsIGZvcm1hdCwgaXRlbSwgaWR4LCBsZW4sIHB3ckRhdGEsIGl0ZW1JbmZvO1xuXG4gICAgICAgIC8vUHJlc2V0IHRoZSByZWFkIGxlbnRoIHdpdGggdGhlIG51bWJlciBvZiBieXRlIGZvciBlcnJvciBjb2Rlcy5cbiAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCA9IGxpc3RsZW4gKiA0O1xuXG4gICAgICAgIC8vQnVpbGQgdGhlIFJlcXVlc3QgQnVmZmVyXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oaXRlbSk7XG5cbiAgICAgICAgICAgIC8vTGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zaXplO1xuXG4gICAgICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoICs9IGxlbjtcblxuICAgICAgICAgICAgLy9CdWlsZCB0aGUgcmVxdWVzdCBidWZmZXIuXG4gICAgICAgICAgICAvL1RoZSBmdW5jdGlvbiBkYXRhVG9CeXRlQXJyYXkgZXhwZWN0cyBhbiBpdGVtIHdpdGggYSB2YWx1ZSBmb3JcbiAgICAgICAgICAgIC8vY29udmVydGluZywgc28gYSBkdW1teSBvYmplY3QgaXMgdXNlZCBoZXJlLlxuICAgICAgICAgICAgZHVtbXkudmFsID0gdGhpcy5nZXRJbmRleEdyb3VwKGl0ZW1JbmZvKTtcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksICdVRElOVCcsIGZvcm1hdCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgZHVtbXkudmFsID0gdGhpcy5nZXRJbmRleE9mZnNldChpdGVtSW5mbyk7XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IGxlbjtcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksICdVRElOVCcsIGZvcm1hdCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy9Db252ZXJ0IHRoZSByZXF1ZXN0IGJ1ZmZlciB0byBCYXNlNjQgY29kZWQgZGF0YS5cbiAgICAgICAgaWYgKHJlcUJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwd3JEYXRhID0gdGhpcy5lbmNvZGVCYXNlNjQocmVxQnVmZmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2VuZXJhdGUgdGhlIEFEUyByZXF1ZXN0IG9iamVjdCBhbmQgY2FsbCB0aGUgc2VuZCBmdW5jdGlvbi5cbiAgICAgICAgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZFdyaXRlJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuaW5kZXhHcm91cHMuU3VtUmQsXG4gICAgICAgICAgICBpbmRleE9mZnNldDogaXRlbUxpc3QubGVuZ3RoLFxuICAgICAgICAgICAgcHdyRGF0YTogcHdyRGF0YSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgc3VtIHdyaXRlIHJlcXVlc3QuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICByZXFEZXNjciAgICBUaGUgUmVxdWVzdCBEZXNjcmlwdG9yLiBCZXNpZGVzIG90aGVyIGluZm9ybWF0aW9uXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9iamVjdCBjb250YWlucyB0aGUgYWxsb2NhdGlvbiBvZiBQTEMgYW5kXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IHZhcmlhYmxlcyBpbiBhbiBpdGVtIGxpc3QuXG4gICAgICovXG4gICAgc3VtV3JpdGVSZXEocmVxRGVzY3IpIHtcbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgaXRlbUxpc3QgPSByZXFEZXNjci5pdGVtcyxcbiAgICAgICAgICAgIGFyclR5cGUgPSBbXSxcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IFtdLFxuICAgICAgICAgICAgYnl0ZXMgPSBbXSxcbiAgICAgICAgICAgIGxpc3RsZW4gPSBpdGVtTGlzdC5sZW5ndGgsXG4gICAgICAgICAgICBkdW1teSA9IHt9IGFzIGFueSxcbiAgICAgICAgICAgIHZsZW5NYXggPSAwLFxuICAgICAgICAgICAgdHlwZSwgZm9ybWF0LCBpdGVtLCBpZHgsIGxlbiwgcHdyRGF0YSwgaSwgaywgYXJyYXlMZW5ndGgsIG1vZCwgcGNvdW50LCBpdGVtSW5mbztcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbiBmb3IgZ2V0dGluZyB0aGUgbGVuZ3RoIG9mIGEgdmFyaWFibGUuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBnZXRWYXJMZW5ndGggPSAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RybGVuO1xuXG4gICAgICAgICAgICBsZW4gPSB0aGlzLnBsY1R5cGVMZW5bdHlwZV07XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdHJsZW4gPSBwYXJzZUludChmb3JtYXQsIDEwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtSW5mby5zdHJpbmdMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmxlbiA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gKHRoaXMuaXNWYWxpZFN0cmluZ0xlbihzdHJsZW4pID8gc3RybGVuIDogbGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICAqIFBhcnNlIHRoZSBzdHVjdHVyZSBkZWZpbml0aW9uLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcGFyc2VTdHJ1Y3QgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBqLCBkZWZBcnIsIGxlbkFyckVsZW0sIGxhc3REZWZBcnIsIG1vZCwgZWxlbSwgc3ViQnVmZmVyID0gW107XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRnVuY3Rpb24gZm9yIGFkZGluZyBwYWRkaW5nIGJ5dGVzIGlmIGFuIGFsaWdubWVudCBpcyB1c2VkLiBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgY2hlY2tBbGlnbm1lbnQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmxlbiwgaztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdHlwZSAhPT0gJ1NUUklORycgJiYgdHlwZSAhPT0gJ0VuZFN0cnVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIGxlbmd0aCBmb3IgY2FsY3VsYXRpbmcgcGFkZGluZyBieXRlc1xuICAgICAgICAgICAgICAgICAgICB2bGVuID0gbGVuIDwgdGhpcy5hbGlnbm1lbnQgPyBsZW4gOiB0aGlzLmFsaWdubWVudDtcblxuICAgICAgICAgICAgICAgICAgICAvL0NvbXB1dGUgdGhlIHBhZGRpbmcgYnl0ZXMgZm9yIHRoZSBhbGlnbm1lbnQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2bGVuID4gMSAmJiBzdWJCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kID0gc3ViQnVmZmVyLmxlbmd0aCAlIHZsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBjb3VudCA9IHZsZW4gLSBtb2Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChrID0gMTsgayA8PSBwY291bnQ7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJCdWZmZXIucHVzaCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL1N0b3JlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgUExDIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICAvL2ZvciBpbnNlcnRpbmcgcGFkZGluZyBieXRlcyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJ1Y3R1cmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2bGVuID4gdmxlbk1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmxlbk1heCA9IHZsZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2hlY2sgc3RydWN0dXJlIGRlZmluaXRpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kZWYgPSB0aGlzLnBhcnNlVmFyTmFtZShpdGVtLmRlZik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID09PSB0cnVlICYmIGl0ZW0uZGVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmRlZiA9IHRoaXMuY3JlYXRlU3RydWN0RGVmKGl0ZW1JbmZvLmRhdGFUeXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0uZGVmICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIHN0cnVjdHVyZSBkZWZpbmluaXRpb24gZm91bmQgKHN1bVdyaXRlUmVxKCkpIScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1dhbGsgdGhyb3VnaCB0aGUgc3RydWN0dXJlIGRlZmluaXRvblxuICAgICAgICAgICAgZm9yIChlbGVtIGluIGl0ZW0uZGVmKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kZWYuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmQXJyID0gaXRlbS5kZWZbZWxlbV0uc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyclswXSA9PT0gJ0FSUkFZJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbkFyckVsZW0gPSBwYXJzZUludChkZWZBcnJbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGVmQXJyID0gZGVmQXJyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbkFyckVsZW07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gZGVmQXJyWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZGVmQXJyLnNsaWNlKDMsIC0xKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERlZkFyciA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZGVmQXJyLnNsaWNlKDMpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQWRkIGluZGV4IGluIGNhc2Ugb2YgYW4gYXJyYXkgb2Ygc3RydWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmQXJyW2xhc3REZWZBcnJdID09PSAnU1AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkudmFsID0gaXRlbS52YWxbaV1bZWxlbSArIGpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1teS52YWwgPSBpdGVtLnZhbFtpXVtlbGVtXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2VsZW1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VmFyTGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxpZ25tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5kYXRhVG9CeXRlQXJyYXkoZHVtbXksIHR5cGUsIGZvcm1hdCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViQnVmZmVyID0gc3ViQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgd2UgYXJlIGluIGFuIGFycmF5IG9mIHN0cnVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2ldW2VsZW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15LnZhbCA9IGl0ZW0udmFsW2VsZW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBkZWZBcnJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZkFyci5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkFyclsxXSA9IGRlZkFyci5zbGljZSgxKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGRlZkFyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRWYXJMZW5ndGgoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxpZ25tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgdHlwZSwgZm9ybWF0LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkJ1ZmZlciA9IHN1YkJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBzZXQgdmFsdWVzIGZvciBhIHN0cnVjdHVyZSBpbiBTdW1Xcml0ZVJlcTogJyArIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHRoZSBwYWRkaW5nIGJ5dGVzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cnVjdHVyZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmFsaWdubWVudCA+IDEgJiYgdmxlbk1heCA+IDEgJiYgZGVmQXJyWzBdICE9PSAnU1RSSU5HJyAmJiBkZWZBcnJbMF0gIT09ICdFbmRTdHJ1Y3QnKSB7XG4gICAgICAgICAgICAgICAgbW9kID0gc3ViQnVmZmVyLmxlbmd0aCAlIHZsZW5NYXg7XG4gICAgICAgICAgICAgICAgaWYgKG1vZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGNvdW50ID0gdmxlbk1heCAtIG1vZDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChrID0gMTsgayA8PSBwY291bnQ7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViQnVmZmVyLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQWRkIHRoZSBzdWJQdWZmZXIgd2l0aCB0aGUgc3RydWN0dXJlIGRhdGEgdG8gdGhlIHJlcXVlc3QgYnVmZmVyLlxuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChzdWJCdWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9QcmVzZXQgdGhlIHJlYWQgbGVuZ3RoIHdpdGggdGhlIG51bWJlciBvZiBieXRlIGZvciBlcnJvciBjb2Rlcy5cbiAgICAgICAgcmVxRGVzY3IucmVhZExlbmd0aCA9IGxpc3RsZW4gKiA0O1xuXG4gICAgICAgIC8vV3JpdGUgdGhlIGdlbmVyYWwgY29tbWFuZCBpbmZvcm1hdGlvbiB0byB0aGUgUmVxdWVzdCBCdWZmZXJcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBsaXN0bGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICBpdGVtID0gaXRlbUxpc3RbaWR4XTtcblxuICAgICAgICAgICAgaXRlbUluZm8gPSB0aGlzLmdldEl0ZW1JbmZvcm1hdGlvbihpdGVtKTtcblxuICAgICAgICAgICAgLy9HZXQgdHlwZSBhbmQgZm9ybWF0dGluZyBzdHJpbmcuXG4gICAgICAgICAgICB0eXBlID0gaXRlbUluZm8udHlwZTtcbiAgICAgICAgICAgIGZvcm1hdCA9IGl0ZW1JbmZvLmZvcm1hdDtcblxuICAgICAgICAgICAgLy9MZW5ndGggb2YgdGhlIGRhdGEgdHlwZS5cbiAgICAgICAgICAgIGxlbiA9IGl0ZW1JbmZvLnNpemU7XG5cbiAgICAgICAgICAgIC8vQnVpbGQgdGhlIHJlcXVlc3QgYnVmZmVyLlxuICAgICAgICAgICAgLy9UaGUgZnVuY3Rpb24gZGF0YVRvQnl0ZUFycmF5IGV4cGVjdHMgYW4gaXRlbSB3aXRoIGEgdmFsdWUgZm9yXG4gICAgICAgICAgICAvL2NvbnZlcnRpbmcsIHNvIGEgZHVtbXkgb2JqZWN0IGlzIHVzZWQgaGVyZS5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IHRoaXMuZ2V0SW5kZXhHcm91cChpdGVtSW5mbyk7XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIGR1bW15LnZhbCA9IHRoaXMuZ2V0SW5kZXhPZmZzZXQoaXRlbUluZm8pO1xuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgJ1VESU5UJywgZm9ybWF0LCA0KTtcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuXG4gICAgICAgICAgICBkdW1teS52YWwgPSBsZW47XG4gICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGR1bW15LCAnVURJTlQnLCBmb3JtYXQsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vV3JpdGUgdGhlIGRhdGEgdG8gdGhlIFJlcXVlc3QgQnVmZmVyXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgbGlzdGxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgaXRlbSA9IGl0ZW1MaXN0W2lkeF07XG5cbiAgICAgICAgICAgIGl0ZW1JbmZvID0gdGhpcy5nZXRJdGVtSW5mb3JtYXRpb24oaXRlbSk7XG5cbiAgICAgICAgICAgIC8vR2V0IHR5cGUgYW5kIGZvcm1hdHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgdHlwZSA9IGl0ZW1JbmZvLnR5cGU7XG4gICAgICAgICAgICBmb3JtYXQgPSBpdGVtSW5mby5mb3JtYXQ7XG5cbiAgICAgICAgICAgIC8vTGVuZ3RoIG9mIHRoZSBkYXRhIHR5cGUuXG4gICAgICAgICAgICBsZW4gPSBpdGVtSW5mby5zaXplO1xuXG4gICAgICAgICAgICAvL1Jlc2V0IGNvdW50ZXIgZm9yIGFycmF5cy5cbiAgICAgICAgICAgIGkgPSBudWxsO1xuXG4gICAgICAgICAgICAvL0J1aWxkIHRoZSByZXF1ZXN0IGJ1ZmZlci5cbiAgICAgICAgICAgIC8vVGhlIGZ1bmN0aW9uIGRhdGFUb0J5dGVBcnJheSBleHBlY3RzIGFuIGl0ZW0gd2l0aCBhIHZhbHVlIGZvclxuICAgICAgICAgICAgLy9jb252ZXJ0aW5nLCBzbyBhIGR1bW15IG9iamVjdCBpcyB1c2VkIGhlcmUuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0FSUkFZJzpcblxuICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IHBhcnNlSW50KGl0ZW1JbmZvLmFycmF5TGVuZ3RoLCAxMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5TGVuZ3RoICE9PSBpdGVtLnZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IEFycmF5IGxlbmd0aCBpbiBKUyBkaWZmZXJzIGZyb20gdGhlIGxlbmd0aCBpbiB0aGUgUExDIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ0xlbmd0aCBpbiBKUzogJyArIGl0ZW0udmFsLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnTGVuZ3RoIGluIFBMQzogJyArIGFycmF5TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLmFycmF5RGF0YVR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9BcnJheSBvZiBzdHJ1Y3R1cmVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN0cnVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1BsYWluIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGl0ZW1JbmZvLmFycmF5RGF0YVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGl0ZW1JbmZvLnN0cmluZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uaXRlbVNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkudmFsID0gaXRlbS52YWxbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLmRhdGFUb0J5dGVBcnJheShkdW1teSwgdHlwZSwgZm9ybWF0LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcUJ1ZmZlciA9IHJlcUJ1ZmZlci5jb25jYXQoYnl0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1VTRVInOlxuICAgICAgICAgICAgICAgICAgICAvL1N0cnVjdHVyZXMuXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlU3RydWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vU2ltcGxlIGRhdGEgdHlwZXMuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnU1RSSU5HJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gaXRlbUluZm8uc3RyaW5nTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gaXRlbUluZm8uc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBieXRlcyA9IHRoaXMuZGF0YVRvQnl0ZUFycmF5KGl0ZW0sIHR5cGUsIGZvcm1hdCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0NvbnZlcnQgdGhlIHJlcXVlc3QgYnVmZmVyIHRvIEJhc2U2NCBjb2RlZCBkYXRhLlxuICAgICAgICBpZiAocmVxQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHB3ckRhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChyZXFCdWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkV3JpdGUnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5pbmRleEdyb3Vwcy5TdW1XcixcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiBpdGVtTGlzdC5sZW5ndGgsXG4gICAgICAgICAgICBwd3JEYXRhOiBwd3JEYXRhLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpLnNlbmQoKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiBmb3IgcmVhZGluZyB0aGUgQURTIHN0YXRlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgcmVxRGVzY3IgICAgVGhlIFJlcXVlc3QgRGVzY3JpcHRvci4gQmVzaWRlcyBvdGhlciBpbmZvcm1hdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGFsbG9jYXRpb24gb2YgUExDIGFuZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSmF2YVNjcmlwdCB2YXJpYWJsZXMgaW4gYW4gaXRlbSBsaXN0LlxuICAgICAqL1xuICAgIHJlYWRBZHNTdGF0ZShyZXFEZXNjcikge1xuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG5cbiAgICAgICAgdmFyIG9lZnVuY3Q7XG5cbiAgICAgICAgaWYgKHJlcURlc2NyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcURlc2NyID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcURlc2NyLm9lID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vU2F2ZSB0aGUgb3JpZ2luYWwgb24tZXJyb3IgZnVuY3Rpb24gaWYgZXhpc3QuXG4gICAgICAgICAgICBvZWZ1bmN0ID0gcmVxRGVzY3Iub2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL09uLWVycm9yLWZ1bmN0aW9uLCByZXNldCB0aGUgc3RhdGVcbiAgICAgICAgcmVxRGVzY3Iub2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBRFMgc3RhdGUgcmVxdWVzdCBmYWlsZWQuJyk7XG4gICAgICAgICAgICB0aGlzLmFkc1N0YXRlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYWRzU3RhdGVUeHQgPSAnJztcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlU3RhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9lZnVuY3QgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9lZnVuY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgYWRzUmVxID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZFN0YXRlJyxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogIFByaW50cyB0aGUgY2FjaGVkIGhhbmRsZXMgdG8gdGhlIGNvbnNvbGUuXG4gICAgICovXG4gICAgbG9nSGFuZGxlQ2FjaGUgKCkge1xuICAgICAgICB0aGlzLmxvZyh0aGlzLmhhbmRsZUNhY2hlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIFByaW50cyB0aGUgc3ltYm9sIHRhYmxlIHRvIHRoZSBjb25zb2xlLlxuICAgICAqL1xuICAgIGxvZ1N5bWJvbHMoKSB7XG4gICAgICAgIHRoaXMubG9nKHRoaXMuc3ltVGFibGUpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqICBQcmludHMgdGhlIGRhdGEgdHlwZSB0YWJsZSB0byB0aGUgY29uc29sZS5cbiAgICAgKi9cbiAgICBsb2dEYXRhVHlwZXMoKSB7XG4gICAgICAgIHRoaXMubG9nKHRoaXMuZGF0YVR5cGVUYWJsZSk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIFN5bWJvbCBUYWJsZSB0byBhIEpTT04gc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge0FycmF5fSAganN0ciAgICBUaGUgU3ltYm9sIFRhYmxlIGFzIGEgSlNPTiBzdHJpbmcgLiBcbiAgICAgKi9cbiAgICBnZXRTeW1ib2xzQXNKU09OKCkge1xuICAgICAgICB2YXIganN0cjtcblxuICAgICAgICBpZiAodHlwZW9mIEpTT04gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBKU09OIHBhcnNlciBmb3VuZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAganN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc3ltVGFibGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBqc3RyO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBjb252ZXJ0IHRoZSBTeW1ib2wgVGFibGUgdG8gSlNPTjonICsgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyB0aGUgU3ltYm9sIFRhYmxlIGZyb20gYSBKU09OIHN0cmluZ1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAganN0ciAgICBBIEpTT04gc3RyaW5nIHdpdGggdGhlIHN5bWJvbHMuXG4gICAgICovXG4gICAgc2V0U3ltYm9sc0Zyb21KU09OKGpzdHIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBKU09OICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gSlNPTiBwYXJzZXIgZm91bmQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGUgPSBKU09OLnBhcnNlKGpzdHIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBjcmVhdGUgdGhlIFN5bWJvbCBUYWJsZSBmcm9tIEpTT046JyArIGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ltVGFibGVSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN5bWJvbCBUYWJsZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCBmcm9tIEpTT04gZGF0YS4nKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBEYXRhIFR5cGUgVGFibGUgdG8gYSBKU09OIHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gIGpzdHIgICAgVGhlIERhdGEgVHlwZSBUYWJsZSBhcyBhIEpTT04gc3RyaW5nIC4gXG4gICAgICovXG4gICAgZ2V0RGF0YVR5cGVzQXNKU09OKCkge1xuICAgICAgICB2YXIganN0cjtcblxuICAgICAgICBpZiAodHlwZW9mIEpTT04gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBObyBKU09OIHBhcnNlciBmb3VuZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAganN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YVR5cGVUYWJsZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzdHI7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGQgbm90IGNvbnZlcnQgdGhlIERhdGEgVHlwZSBUYWJsZSB0byBKU09OOicgKyBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIHRoZSBEYXRhIFR5cGUgVGFibGUgZnJvbSBhIEpTT04gc3RyaW5nXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBqc3RyICAgIEEgSlNPTiBzdHJpbmcgd2l0aCB0aGUgZGF0YSB0eXBlcy5cbiAgICAgKi9cbiAgICBzZXREYXRhVHlwZXNGcm9tSlNPTihqc3RyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgSlNPTiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IE5vIEpTT04gcGFyc2VyIGZvdW5kLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGUgPSBKU09OLnBhcnNlKGpzdHIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBjcmVhdGUgdGhlIERhdGEgVHlwZSBUYWJsZSBmcm9tIEpTT046JyArIGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRGF0YSBUeXBlIFRhYmxlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIGZyb20gSlNPTiBkYXRhLicpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgd2Vic2VydmljZSdzIHNlcnZlciByZXNwb25zZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgVGhlIG9iamVjdCBjb250YWluaW5nIHRoZSBhcmd1bWVudHMgb2YgdGhlIEFEUyByZXF1ZXN0LlxuICAgICAqL1xuICAgIHBhcnNlUmVzcG9uc2UoYWRzUmVxKSB7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlLCBlcnJvckNvZGUsIGVycm9yVGV4dDtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55XG5cbiAgICAgICAgLy9BY2tub3dsZWRnZSB0aGUgcmVjZWl2ZSBvZiBhIHJlcXVlc3Qgd2l0aCBpbmRleCAnaWQnLlxuICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5pZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VyclJlcVthZHNSZXEucmVxRGVzY3IuaWRdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hlY2sgaWYgdGhlIFhNTCBkYXRhIG9iamVjdCBpcyB2YWxpZC5cbiAgICAgICAgaWYgKHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVhNTCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUmVxdWVzdCBjb250YWlucyBubyBYTUwgZGF0YS4gT2JqZWN0IFwicmVzcG9uc2VYTUxcIiBpcyBudWxsLicpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogVGhpcyBpcyB0aGUgXCJyZXNwb25zZVRleHRcIjonKTtcbiAgICAgICAgICAgIHRoaXMubG9nKHRoaXMueG1sSHR0cFJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvL29uIGVycm9yIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm9lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL0dldCB0aGUgcmVzcG9uc2VcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gWE1MIGRhdGEgaW4gc2VydmVyIHJlc3BvbnNlOiAnICsgZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vb24gZXJyb3IgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vTG9vayBmb3IgZXJyb3JzIGluIHRoZSByZXNwb25zZSBzdHJpbmcgKGkuZS4gQURTIGVycm9ycykuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvL0dldCBlcnJvcnNcbiAgICAgICAgICAgIGVycm9yVGV4dCA9IHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmYXVsdHN0cmluZycpWzBdLmZpcnN0Q2hpbGQuZGF0YTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDb2RlID0gcmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Vycm9yY29kZScpWzBdLmZpcnN0Q2hpbGQuZGF0YTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvckNvZGUgPSAnLSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBNZXNzYWdlIGZyb20gc2VydmVyOiAgJyArIGVycm9yVGV4dCArICcgKCcgKyBlcnJvckNvZGUgKyAnKScpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFkc1JlcS5yZXFEZXNjci5vZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vb24gZXJyb3IgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBhZHNSZXEucmVxRGVzY3Iub2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIC8vQWxsIGZpbmVcbiAgICAgICAgICAgIGVycm9yQ29kZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL05vcm1hbGl6ZSBkYXRhIChlc3AuIGZvciBGaXJlZm94LCB3aG8gc3BsaXRzIGRhdGEgaW4gNGsgY2h1bmtzKS5cbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5ub3JtYWxpemUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLm5vcm1hbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9EZWNvZGUgZGF0YSBpZiBpdCdzIGEgcmVhZCByZXF1ZXN0LlxuICAgICAgICBpZiAoYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWRTdGF0ZScpIHtcblxuICAgICAgICAgICAgdGhpcy5wYXJzZUFkc1N0YXRlKGFkc1JlcSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChhZHNSZXEubWV0aG9kID09PSAnUmVhZCcgfHwgYWRzUmVxLm1ldGhvZCA9PT0gJ1JlYWRXcml0ZScpIHtcblxuICAgICAgICAgICAgc3dpdGNoIChhZHNSZXEuaW5kZXhHcm91cCkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5pbmRleEdyb3Vwcy5VcGxvYWRJbmZvOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVXBsb2FkSW5mbyhhZHNSZXEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuaW5kZXhHcm91cHMuVXBsb2FkOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVXBsb2FkKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5pbmRleEdyb3Vwcy5TdW1SZDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVN1bVJlYWRSZXEoYWRzUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmluZGV4R3JvdXBzLlN1bVdyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlU3VtV3JpdGVSZXEoYWRzUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmluZGV4R3JvdXBzLlN1bVJkV3I6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VIYW5kbGVzKGFkc1JlcSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucGFyc2VSZWFkUmVxKGFkc1JlcSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0NhbGwgdGhlIE9uLUNvbXBsZXRlLVNjcmlwdC5cbiAgICAgICAgaWYgKHR5cGVvZiBhZHNSZXEucmVxRGVzY3Iub2MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWRzUmVxLnJlcURlc2NyLm9jZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChhZHNSZXEucmVxRGVzY3Iub2MsIGFkc1JlcS5yZXFEZXNjci5vY2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRzUmVxLnJlcURlc2NyLm9jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaGFuZGxlcyBmcm9tIHRoZSBQTEMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyU3ltTmFtZXMgICBBcnJheSB3aXRoIHRoZSBzeW1ib2wgbmFtZXMuXG4gICAgICovXG4gICAgZ2V0SGFuZGxlcyhyZXFEZXNjcikge1xuXG4gICAgICAgIHZhciBhZHNSZXEgPSB7fSxcbiAgICAgICAgICAgIHJlcUJ1ZmZlciA9IFtdLFxuICAgICAgICAgICAgYXJybGVuID0gcmVxRGVzY3Iuc3ltYm9scy5sZW5ndGgsXG4gICAgICAgICAgICBieXRlcywgaWR4LCBsZW4sIHB3ckRhdGEsIGZvcm1hdCwgc3ltbmFtZSwgaTtcblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEZldGNoaW5nIGhhbmRsZXMgZnJvbSB0aGUgUExDLicpO1xuXG4gICAgICAgIC8vUmVhZCBsZW50aCB3aXRoIHRoZSBudW1iZXIgb2YgYnl0ZSBmb3IgZXJyb3IgY29kZXMuXG4gICAgICAgIC8vNCBieXRlcyByZXF1ZXN0ZWQgZGF0YSwgNCBieXRlcyBmb3IgZXJyb3Jjb2RlIGFuZCA0IGJ5dGVzIGZvciB0aGUgbGVuZ3RoXG4gICAgICAgIHJlcURlc2NyLnJlYWRMZW5ndGggPSBhcnJsZW4gKiAxMjtcblxuICAgICAgICAvL0J1aWxkIHRoZSBSZXF1ZXN0IEJ1ZmZlclxuICAgICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGFycmxlbjsgaWR4KyspIHtcblxuICAgICAgICAgICAgLy9CdWlsZCB0aGUgcmVxdWVzdCBidWZmZXIuXG4gICAgICAgICAgICAvL0luZGV4R3JvdXBcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIodGhpcy5pbmRleEdyb3Vwcy5IYW5kbGVCeU5hbWUsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIC8vSW5kZXhPZmZzZXQgaXMgYWx3YXlzIDBcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIoMCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgLy9IYW5kbGUgc2l6ZSAoNCBieXRlcylcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIoNCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgLy9TdHJpbmcgbGVuZ3RoXG4gICAgICAgICAgICBieXRlcyA9IHRoaXMubnVtVG9CeXRlQXJyKHJlcURlc2NyLnN5bWJvbHNbaWR4XS5sZW5ndGgsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FkZCBzeW1ib2wgbmFtZXNcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG4gICAgICAgICAgICBzeW1uYW1lID0gcmVxRGVzY3Iuc3ltYm9sc1tpZHhdLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIC8vU3RvcmUgaXQgZm9yIGxhdGVyIHVzZVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVOYW1lc1tpZHhdID0gc3ltbmFtZTtcblxuICAgICAgICAgICAgLy9BZGQgc3ltYm9sIG5hbWVzIHRvIHRoZSBidWZmZXJcbiAgICAgICAgICAgIGJ5dGVzID0gW107XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3ltbmFtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGJ5dGVzW2ldID0gc3ltbmFtZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vQ29udmVydCB0aGUgcmVxdWVzdCBidWZmZXIgdG8gQmFzZTY0IGNvZGVkIGRhdGEuXG4gICAgICAgIGlmIChyZXFCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcHdyRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHJlcUJ1ZmZlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIGFkc1JlcSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1JlYWRXcml0ZScsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmluZGV4R3JvdXBzLlN1bVJkV3IsXG4gICAgICAgICAgICBpbmRleE9mZnNldDogYXJybGVuLFxuICAgICAgICAgICAgcHdyRGF0YTogcHdyRGF0YSxcbiAgICAgICAgICAgIHJlcURlc2NyOiByZXFEZXNjclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gZm9yIHJlbGVhc2luZyB0aGUgY2FjaGVkIGhhbmRsZXMuXG4gICAgICogXG4gICAgICovXG4gICAgcmVsZWFzZUhhbmRsZXMocmVxRGVzY3IpIHtcbiAgICAgICAgdmFyIGFkc1JlcSA9IHt9LFxuICAgICAgICAgICAgcmVxQnVmZmVyID0gW10sXG4gICAgICAgICAgICBieXRlcyA9IFtdLFxuICAgICAgICAgICAgYXJybGVuID0gMCxcbiAgICAgICAgICAgIHN5bU5hbWVzID0gW10sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGlkeCwgcHdyRGF0YTtcblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFJlbGVhc2luZyBoYW5kbGVzLicpO1xuXG4gICAgICAgIC8vQ2hlY2sgaWYgYSByZXF1ZXN0IGRlc2NyaXB0b3IgZXhpc3RzXG4gICAgICAgIGlmIChyZXFEZXNjciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXFEZXNjciA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIC8vQ2hlY2sgaWYgYSB1c2VyIGRlZmluZWQgaGFuZGxlIGxpc3QgZXhpc3RzXG4gICAgICAgIGlmIChyZXFEZXNjci5zeW1ib2xzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFycmxlbiA9IHJlcURlc2NyLnN5bWJvbHMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgc3ltTmFtZXNbaWR4XSA9IHJlcURlc2NyLnN5bWJvbHNbaWR4XS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJybGVuID0gdGhpcy5oYW5kbGVOYW1lcy5sZW5ndGg7XG4gICAgICAgICAgICBzeW1OYW1lcyA9IHRoaXMuaGFuZGxlTmFtZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvL1ByZXNldCB0aGUgcmVhZCBsZW5ndGggd2l0aCB0aGUgbnVtYmVyIG9mIGJ5dGUgZm9yIGVycm9yIGNvZGVzLlxuICAgICAgICByZXFEZXNjci5yZWFkTGVuZ3RoID0gYXJybGVuICogNDtcblxuICAgICAgICAvL1dyaXRlIHRoZSBnZW5lcmFsIGNvbW1hbmQgaW5mb3JtYXRpb24gdG8gdGhlIFJlcXVlc3QgQnVmZmVyXG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgYXJybGVuOyBpZHgrKykge1xuXG4gICAgICAgICAgICAvL0J1aWxkIHRoZSByZXF1ZXN0IGJ1ZmZlci5cbiAgICAgICAgICAgIC8vSW5kZXhHcm91cFxuICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih0aGlzLmluZGV4R3JvdXBzLlJlbGVhc2VIYW5kbGUsIDQpO1xuICAgICAgICAgICAgcmVxQnVmZmVyID0gcmVxQnVmZmVyLmNvbmNhdChieXRlcyk7XG5cbiAgICAgICAgICAgIC8vSW5kZXhPZmZzZXQgaXMgYWx3YXlzIDBcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIoMCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcblxuICAgICAgICAgICAgLy9IYW5kbGUgc2l6ZSAoNCBieXRlcylcbiAgICAgICAgICAgIGJ5dGVzID0gdGhpcy5udW1Ub0J5dGVBcnIoNCwgNCk7XG4gICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQWRkIGhhbmRsZXMgY29kZXNcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBhcnJsZW47IGlkeCsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuaGFuZGxlQ2FjaGVbc3ltTmFtZXNbaWR4XV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm51bVRvQnl0ZUFycih0aGlzLmhhbmRsZUNhY2hlW3N5bU5hbWVzW2lkeF1dLCA0KTtcbiAgICAgICAgICAgICAgICByZXFCdWZmZXIgPSByZXFCdWZmZXIuY29uY2F0KGJ5dGVzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogSGFuZGxlIGZvciBzeW1ib2wgbmFtZSAnICsgc3ltTmFtZXNbaWR4XSArICcgZG9lcyBub3QgZXhpc3QgaW4gaGFuZGxlIGNhY2hlIScpO1xuICAgICAgICAgICAgICAgIHRocm93ICdSZWxlYXNpbmcgSGFuZGxlcyBhYm9ydGVkISc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0NvbnZlcnQgdGhlIHJlcXVlc3QgYnVmZmVyIHRvIEJhc2U2NCBjb2RlZCBkYXRhLlxuICAgICAgICBpZiAocmVxQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHB3ckRhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChyZXFCdWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BZGQgdGhlIHN5bWJvbCBuYW1lcyBmb3IgcGFyc2luZyB0aGUgcmVzcG9uc2VcbiAgICAgICAgcmVxRGVzY3IuaXRlbXMgPSBzeW1OYW1lcztcblxuICAgICAgICAvL1RoaXMgaXMgYSBSZWxlYXNlIEhhbmRsZXMgUmVxdWVzdFxuICAgICAgICByZXFEZXNjci5pc1JlbEhkbFJlcSA9IHRydWU7XG5cbiAgICAgICAgLy9HZW5lcmF0ZSB0aGUgQURTIHJlcXVlc3Qgb2JqZWN0IGFuZCBjYWxsIHRoZSBzZW5kIGZ1bmN0aW9uLlxuICAgICAgICBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkV3JpdGUnLFxuICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5pbmRleEdyb3Vwcy5TdW1XcixcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiBhcnJsZW4sXG4gICAgICAgICAgICBwd3JEYXRhOiBwd3JEYXRhLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHJlcURlc2NyXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdChhZHNSZXEpLnNlbmQoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNob3J0Y3V0cyBmb3IgcmVhZGluZyBhbmQgd3JpdGluZyBkYXRhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzXG4gICAgICovXG4gICAgd3JpdGVCb29sID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0JPT0wnLCBhcmdzKVxuICAgIHdyaXRlQnl0ZSA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdCWVRFJywgYXJncylcbiAgICB3cml0ZVVzaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1VTSU5UJywgYXJncylcbiAgICB3cml0ZVNpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnU0lOVCcsIGFyZ3MpXG4gICAgd3JpdGVXb3JkID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1dPUkQnLCBhcmdzKVxuICAgIHdyaXRlVWludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdVSU5UJywgYXJncylcbiAgICB3cml0ZUludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLndyaXRlU2luZ2xlKCdXcml0ZScsICdJTlQnLCBhcmdzKVxuICAgIHdyaXRlSW50MURwID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0lOVDFEUCcsIGFyZ3MpXG4gICAgd3JpdGVJbnQyRHAgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnSU5UMkRQJywgYXJncylcbiAgICB3cml0ZUR3b3JkID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0RXT1JEJywgYXJncylcbiAgICB3cml0ZVVkaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1VESU5UJywgYXJncylcbiAgICB3cml0ZURpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnRElOVCcsIGFyZ3MpXG4gICAgd3JpdGVSZWFsID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1JFQUwnLCBhcmdzKVxuICAgIHdyaXRlTHJlYWwgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnTFJFQUwnLCBhcmdzKVxuICAgIHdyaXRlU3RyaW5nID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1NUUklORycsIGFyZ3MpXG4gICAgd3JpdGVUaW1lID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1RJTUUnLCBhcmdzKVxuICAgIHdyaXRlVG9kID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ1RPRCcsIGFyZ3MpXG4gICAgd3JpdGVEYXRlID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMud3JpdGVTaW5nbGUoJ1dyaXRlJywgJ0RBVEUnLCBhcmdzKVxuICAgIHdyaXRlRHQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy53cml0ZVNpbmdsZSgnV3JpdGUnLCAnRFQnLCBhcmdzKVxuXG4gICAgcmVhZEJvb2wgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0JPT0wnLCBhcmdzKVxuICAgIHJlYWRCeXRlID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdCWVRFJywgYXJncylcbiAgICByZWFkVXNpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1VTSU5UJywgYXJncylcbiAgICByZWFkU2ludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnU0lOVCcsIGFyZ3MpXG4gICAgcmVhZFdvcmQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1dPUkQnLCBhcmdzKVxuICAgIHJlYWRVaW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdVSU5UJywgYXJncylcbiAgICByZWFkSW50ID0gYXN5bmMgKGFyZ3MpID0+IGF3YWl0IHRoaXMucmVhZFNpbmdsZSgnUmVhZCcsICdJTlQnLCBhcmdzKVxuICAgIHJlYWRJbnQxRHAgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0lOVDFEUCcsIGFyZ3MpXG4gICAgcmVhZEludDJEcCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnSU5UMkRQJywgYXJncylcbiAgICByZWFkRHdvcmQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0RXT1JEJywgYXJncylcbiAgICByZWFkVWRpbnQgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1VESU5UJywgYXJncylcbiAgICByZWFkRGludCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnRElOVCcsIGFyZ3MpXG4gICAgcmVhZFJlYWwgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1JFQUwnLCBhcmdzKVxuICAgIHJlYWRMcmVhbCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnTFJFQUwnLCBhcmdzKVxuICAgIHJlYWRTdHJpbmcgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1NUUklORycsIGFyZ3MpXG4gICAgcmVhZFRpbWUgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1RJTUUnLCBhcmdzKVxuICAgIHJlYWRUb2QgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ1RPRCcsIGFyZ3MpXG4gICAgcmVhZERhdGUgPSBhc3luYyAoYXJncykgPT4gYXdhaXQgdGhpcy5yZWFkU2luZ2xlKCdSZWFkJywgJ0RBVEUnLCBhcmdzKVxuICAgIHJlYWREdCA9IGFzeW5jIChhcmdzKSA9PiBhd2FpdCB0aGlzLnJlYWRTaW5nbGUoJ1JlYWQnLCAnRFQnLCBhcmdzKVxuXG4gICAgd3JpdGVTdHJ1Y3QgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVTdHJ1Y3REZXNjcmlwdG9yKCdXcml0ZScsIGFyZ3MpXG4gICAgcmVhZFN0cnVjdCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZVN0cnVjdERlc2NyaXB0b3IoJ1JlYWQnLCBhcmdzKVxuXG4gICAgd3JpdGVBcnJheU9mQm9vbCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnQk9PTCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mQnl0ZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnQllURScsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mVXNpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1VTSU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZTaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdTSU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZXb3JkID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdXT1JEJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZVaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdVSU5UJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZJbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0lOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mSW50MURwID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdJTlQxRFAnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkludDJEcCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnSU5UMkRQJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZEd29yZCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnRFdPUkQnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZlVkaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdVRElOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mRGludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnRElOVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mUmVhbCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnUkVBTCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mTHJlYWwgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0xSRUFMJywgYXJncylcbiAgICB3cml0ZUFycmF5T2ZTdHJpbmcgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ1NUUklORycsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mVGltZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignV3JpdGUnLCAnVElNRScsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mVG9kID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdUT0QnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkRhdGUgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1dyaXRlJywgJ0RBVEUnLCBhcmdzKVxuICAgIHdyaXRlQXJyYXlPZkR0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdEVCcsIGFyZ3MpXG4gICAgd3JpdGVBcnJheU9mU3RydWN0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdXcml0ZScsICdTVFJVQ1QnLCBhcmdzKVxuXG4gICAgcmVhZEFycmF5T2ZCb29sID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0JPT0wnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mQnl0ZSA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdCWVRFJywgYXJncylcbiAgICByZWFkQXJyYXlPZlVzaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1VTSU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZlNpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnU0lOVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZXb3JkID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1dPUkQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mVWludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdVSU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZkludCA9IChhcmdzKSA9PiB0aGlzLmNyZWF0ZUFycmF5RGVzY3JpcHRvcignUmVhZCcsICdJTlQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mSW50MURwID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0lOVDFEUCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZJbnQyRHAgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnSU5UMkRQJywgYXJncylcbiAgICByZWFkQXJyYXlPZkR3b3JkID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0RXT1JEJywgYXJncylcbiAgICByZWFkQXJyYXlPZlVkaW50ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1VESU5UJywgYXJncylcbiAgICByZWFkQXJyYXlPZkRpbnQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnRElOVCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZSZWFsID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1JFQUwnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mTHJlYWwgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnTFJFQUwnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mU3RyaW5nID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1NUUklORycsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZUaW1lID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1RJTUUnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mVG9kID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1RPRCcsIGFyZ3MpXG4gICAgcmVhZEFycmF5T2ZEYXRlID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ0RBVEUnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mRHQgPSAoYXJncykgPT4gdGhpcy5jcmVhdGVBcnJheURlc2NyaXB0b3IoJ1JlYWQnLCAnRFQnLCBhcmdzKVxuICAgIHJlYWRBcnJheU9mU3RydWN0ID0gKGFyZ3MpID0+IHRoaXMuY3JlYXRlQXJyYXlEZXNjcmlwdG9yKCdSZWFkJywgJ1NUUlVDVCcsIGFyZ3MpXG4gICAgXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAgICAgICAgICAgICAgICAgICBNZXRob2RzIGZvciBDcmVhdGluZyB0aGUgU3ltYm9sIFRhYmxlIGZyb20gVXBsb2FkXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciB0aGUgVFBZIEZpbGVcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICAgXG5cbiAgICAvKipcbiAgICAgKiAgR2V0IHRoZSB1cGxvYWQgaW5mby4gXG4gICAgICovXG5cbiAgICBnZXRVcGxvYWRJbmZvKCkge1xuICAgICAgICAvL0dlbmVyYXRlIHRoZSBBRFMgcmVxdWVzdCBvYmplY3QgYW5kIGNhbGwgdGhlIHNlbmQgZnVuY3Rpb24uXG4gICAgICAgIHZhciBhZHNSZXEgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdSZWFkJyxcbiAgICAgICAgICAgIGluZGV4R3JvdXA6IHRoaXMuaW5kZXhHcm91cHMuVXBsb2FkSW5mbyxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiAwLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHtcbiAgICAgICAgICAgICAgICByZWFkTGVuZ3RoOiA4XG4gICAgICAgICAgICAgICAgLy9zeW5jOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QoYWRzUmVxKS5zZW5kKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSB0aGUgdXBsb2FkIGluZm9ybWF0aW9uIGFuZCBjYWxsIHRoZSByZXF1ZXN0IGZvciBcbiAgICAgKiByZWFkaW5nIHRoZSB1cGxvYWQgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQW4gQURTIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBwYXJzZVVwbG9hZEluZm8oYWRzUmVxKSB7XG4gICAgICAgIHZhciByZXNwb25zZSwgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgZGF0YSwgYWRzUmVxMjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnhtbEh0dHBSZXEucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZGF0YVN0cmluZyA9IHRoaXMuZGVjb2RlQmFzZTY0KHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcERhdGEnKVswXS5maXJzdENoaWxkLmRhdGEpO1xuICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKDAsIDQpO1xuICAgICAgICAgICAgdGhpcy5zeW1ib2xDb3VudCA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuICAgICAgICAgICAgZGF0YVN1YlN0cmluZyA9IGRhdGFTdHJpbmcuc3Vic3RyKDQsIDQpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRMZW5ndGggPSB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3ViU3RyaW5nLCAnRFdPUkQnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogUGFyc2luZyBvZiBVcGxvYWRJbmZvIGZhaWxlZDonICsgZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhZHNSZXEyID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUmVhZCcsXG4gICAgICAgICAgICBpbmRleEdyb3VwOiB0aGlzLmluZGV4R3JvdXBzLlVwbG9hZCxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0OiAwLFxuICAgICAgICAgICAgcmVxRGVzY3I6IHtcbiAgICAgICAgICAgICAgICByZWFkTGVuZ3RoOiB0aGlzLnVwbG9hZExlbmd0aFxuICAgICAgICAgICAgICAgIC8vc3luYzogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXF1ZXN0KGFkc1JlcTIpLnNlbmQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIHRoZSB1cGxvYWQgZGF0YSBhbmQgYW4gb2JqZWN0IChzeW1UYWJsZSkgd2l0aCB0aGUgc3ltYm9sIG5hbWVzIFxuICAgICAqIGFzIHRoZSBwcm9wZXJ0aWVzLiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYWRzUmVxICAgQW4gQURTIFJlcXVlc3QgRGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBwYXJzZVVwbG9hZChhZHNSZXEpIHtcbiAgICAgICAgdmFyIHJlc3BvbnNlLFxuICAgICAgICAgICAgc3RyQWRkciA9IDAsXG4gICAgICAgICAgICBpZ09mZnMgPSA0LFxuICAgICAgICAgICAgaW9PZmZzID0gOCxcbiAgICAgICAgICAgIHNpemVPZmZzID0gMTIsXG4gICAgICAgICAgICBuYW1lT2ZmcyA9IDMwLFxuICAgICAgICAgICAgZGF0YVN0cmluZywgZGF0YVN1YlN0cmluZywgZGF0YSwgY250LCBpbmZvTGVuLCBuYW1lQW5kVHlwZSwgdHlwZUFyciwgYXJyYXlMZW5ndGgsIHR5cGUsIGVsZW07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gdGhpcy54bWxIdHRwUmVxLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgPSB0aGlzLmRlY29kZUJhc2U2NChyZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHBEYXRhJylbMF0uZmlyc3RDaGlsZC5kYXRhKTtcblxuICAgICAgICAgICAgZm9yIChjbnQgPSAwOyBjbnQgPCB0aGlzLnN5bWJvbENvdW50OyBjbnQrKykge1xuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBsZW5ndGggb2YgdGhlIHN5bWJvbCBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICBkYXRhU3ViU3RyaW5nID0gZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciwgNCk7XG4gICAgICAgICAgICAgICAgaW5mb0xlbiA9IHRoaXMuc3ViU3RyaW5nVG9EYXRhKGRhdGFTdWJTdHJpbmcsICdEV09SRCcpO1xuXG4gICAgICAgICAgICAgICAgLy9HZXQgbmFtZSBhbmQgdHlwZS5cbiAgICAgICAgICAgICAgICBuYW1lQW5kVHlwZSA9IGRhdGFTdHJpbmcuc3Vic3RyaW5nKHN0ckFkZHIgKyBuYW1lT2ZmcywgKHN0ckFkZHIgKyBpbmZvTGVuKSkuc3BsaXQoU3RyaW5nLmZyb21DaGFyQ29kZSgwKSk7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBuYW1lQW5kVHlwZVswXS50b1VwcGVyQ2FzZSgpO1xuXG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhbiBlbnRyeS5cbiAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nOiBuYW1lQW5kVHlwZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhHcm91cDogdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciArIGlnT2ZmcywgNCksICdEV09SRCcpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldDogdGhpcy5zdWJTdHJpbmdUb0RhdGEoZGF0YVN0cmluZy5zdWJzdHIoc3RyQWRkciArIGlvT2ZmcywgNCksICdEV09SRCcpLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiB0aGlzLnN1YlN0cmluZ1RvRGF0YShkYXRhU3RyaW5nLnN1YnN0cihzdHJBZGRyICsgc2l6ZU9mZnMsIDQpLCAnRFdPUkQnKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvL1NldCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgICAgIHR5cGVBcnIgPSBuYW1lQW5kVHlwZVsxXS5zcGxpdChcIiBcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZUFyclswXSA9PT0gJ0FSUkFZJykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vVHlwZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPSB0eXBlQXJyWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQXJyYXkgTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gdHlwZUFyclsxXS5zdWJzdHJpbmcoMSwgdHlwZUFyclsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBhcnJheUxlbmd0aC5zcGxpdCgnLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJTdGFydElkeCA9IHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMV0sIDEwKSAtIHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5TGVuZ3RoID0gYXJyYXlMZW5ndGg7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL0RhdGEgdHlwZSBvZiB0aGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzNdLnNwbGl0KCcoJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVbMV0gPSB0eXBlWzFdLnN1YnN0cigwLCB0eXBlWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5zdHJpbmdMZW5ndGggPSBwYXJzZUludCh0eXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZUFyclswXSArICcuJyArIGFycmF5TGVuZ3RoICsgJy4nICsgdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vSXRlbSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5pdGVtU2l6ZSA9IHRoaXMuc3ltVGFibGVbbmFtZV0uc2l6ZSAvIGFycmF5TGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5RGF0YVR5cGUgPSAnVVNFUic7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoZWxlbSBpbiB0aGlzLnBsY1R5cGVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5RGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZUFyclswXS5zcGxpdCgnKCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlWzBdICsgJy4nICsgdHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uc3RyaW5nTGVuZ3RoID0gcGFyc2VJbnQodHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHZhcmlhYmxlIGlzIGEgdXNlciBkZWZpbmVkIGRhdGEgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gJ1VTRVInO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGNUeXBlTGVuLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT09IGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZSA9PT0gJ1VTRVInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmRhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN0ckFkZHIgKz0gaW5mb0xlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ltVGFibGVSZWFkeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRW5kIG9mIGZldGNoaW5nIHRoZSBzeW1ib2xzLicpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTeW1ib2wgdGFibGUgcmVhZHkuJyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2Uuc3luY1htbEh0dHAgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVhZHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBQYXJzaW5nIG9mIHVwbG9hZGVkIHN5bWJvbCBpbmZvcm1hdGlvbiBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWG1sSHR0cFJlcSA9IG51bGxcbiAgICAvKipcbiAgICAqIEdldCB0aGUgc3ltYm9sLWZpbGUgKCoudHB5KSBmcm9tIHRoZSBzZXJ2ZXIgYW5kIGNyZWF0ZVxuICAgICogYW4gb2JqZWN0IChzeW1UYWJsZSkgd2l0aCB0aGUgc3ltYm9sIG5hbWVzIGFzIHRoZSBwcm9wZXJ0aWVzLiBcbiAgICAqL1xuICAgIGFzeW5jIGdldENvbmZpZ0ZpbGUoKSB7XG5cbiAgICAgICAgdGhpcy5jb25maWdYbWxIdHRwUmVxID0gdGhpcy5jcmVhdGVYTUxIdHRwUmVxKClcbiAgICAgICAgdmFyIHN5bWJvbEFycmF5ID0gW10sXG4gICAgICAgICAgICBjb25maWdGaWxlLCBuYW1lLCBhbGxTeW1ib2xzLCB0eXBlQXJyLCBhcnJheUxlbmd0aCwgdHlwZSwgZWxlbSxcbiAgICAgICAgICAgIHRjVmVyc2lvbiwgaTtcblxuICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IFN0YXJ0IHJlYWRpbmcgdGhlIFRQWSBmaWxlLicpO1xuXG4gICAgICAgIC8vSFRUUFJlcXVlc3RcbiAgICAgICAgdGhpcy5jb25maWdYbWxIdHRwUmVxLm9wZW4oJ0dFVCcsIHRoaXMuc2VydmljZS5jb25maWdGaWxlVXJsLCAhdGhpcy5zZXJ2aWNlLnN5bmNYbWxIdHRwLCB0aGlzLnNlcnZpY2Uuc2VydmljZVVzZXIsIHRoaXMuc2VydmljZS5zZXJ2aWNlUGFzc3dvcmQpO1xuICAgICAgICB0aGlzLmNvbmZpZ1htbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQveG1sJyk7XG5cbiAgICAgICAgdGhpcy5jb25maWdYbWxIdHRwUmVxLm9ubG9hZCA9IGFzeW5jICgpID0+IHtcblxuICAgICAgICAgICAgLy9DcmVhdGUgYSBET00gb2JqZWN0IGZyb20gWE1MXG4gICAgICAgICAgICBpZiAodHlwZW9mIERPTVBhcnNlciAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ0ZpbGUgPSAobmV3IERPTVBhcnNlcigpKS5wYXJzZUZyb21TdHJpbmcodGhpcy5jb25maWdYbWxIdHRwUmVxLnJlc3BvbnNlVGV4dCwgXCJ0ZXh0L3htbFwiKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENyZWF0aW5nIGEgRE9NIG9iamVjdCBmcm9tIFRQWSBmYWlsZWQ6JyArIGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBDYW5cXCd0IHBhcnNlIHRoZSBzeW1ib2wgZmlsZSBjYXVzZSB5b3VyIGJyb3dzZXIgZG9lcyBub3QgcHJvdmlkZSBhIERPTVBhcnNlciBmdW5jdGlvbi4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL0dldCB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIFBMQyBhbmQgdGhlIHJvdXRpbmdcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXJ2aWNlLmFtc05ldElkICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGhpcy5zZXJ2aWNlLmFtc1BvcnQgIT09ICdzdHJpbmcnIHx8IHRoaXMuYWxpZ25tZW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTdGFydCByZWFkaW5nIHRoZSBzZXJ2aWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIFRQWSBmaWxlLicpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXRJZDogY29uZmlnRmlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnTmV0SWQnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQ6IGNvbmZpZ0ZpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1BvcnQnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRjVmVyc2lvbiA9IGNvbmZpZ0ZpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R3aW5DQVRWZXJzaW9uJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUuY2hhckF0KDApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0Y1ZlcnNpb24gPT09ICcyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSW5mby5hbGlnbm1lbnQgPSBwYXJzZUludChjb25maWdGaWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdQYWNrU2l6ZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGNWZXJzaW9uID09PSAnMycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUluZm8uYWxpZ25tZW50ID0gODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IENvdWxkIG5vdCBkZXRlcm1pbmUgdGhlIFR3aW5DQVQgdmVyc2lvbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IEVuZCBvZiByZWFkaW5nIHRoZSBzZXJ2aWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIFRQWSBmaWxlLicpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSByZWFkaW5nIHNlcnZpY2UgaW5mb3JtYXRpb24gZnJvbSB0aGUgVFBZIGZpbGU6Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBOZXRJZCwgcG9ydCBhbmQgYWxpZ25tZW50IG1hbnVhbGx5IHNldC4gU2tpcCByZWFkaW5nIHRoZSBzZXJ2aWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIFRQWSBmaWxlLicpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBzeW1ib2wgdGFibGVcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2UuZm9yY2VVcGxvYWRVc2FnZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3RhcnQgcmVhZGluZyB0aGUgc3ltYm9scyBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhbiBBcnJheSBvZiB0aGUgRWxlbWVudHMgd2l0aCBcIlN5bWJvbFwiIGFzIHRhZyBuYW1lLlxuICAgICAgICAgICAgICAgICAgICBhbGxTeW1ib2xzID0gY29uZmlnRmlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnU3ltYm9scycpWzBdO1xuICAgICAgICAgICAgICAgICAgICBzeW1ib2xBcnJheSA9IGFsbFN5bWJvbHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1N5bWJvbCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBuYW1lIG9mIHRoZSBzeW1ib2wgYW5kIGNyZWF0ZSBhbiBvYmplY3QgcHJvcGVydHkgd2l0aCBpdC5cbiAgICAgICAgICAgICAgICAgICAgLy9zeW1UYWJsZSBpcyBkZWNsYXJlZCBvdXRzaWRlIGluIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHN5bWJvbEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gc3ltYm9sQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ05hbWUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nOiBzeW1ib2xBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhHcm91cDogcGFyc2VJbnQoc3ltYm9sQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0lHcm91cCcpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQ6IHBhcnNlSW50KHN5bWJvbEFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdJT2Zmc2V0JylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXRTaXplOiBwYXJzZUludChzeW1ib2xBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQml0U2l6ZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnNpemUgPSAodGhpcy5zeW1UYWJsZVtuYW1lXS5iaXRTaXplID49IDgpID8gdGhpcy5zeW1UYWJsZVtuYW1lXS5iaXRTaXplIC8gOCA6IHRoaXMuc3ltVGFibGVbbmFtZV0uYml0U2l6ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUFyciA9IHRoaXMuc3ltVGFibGVbbmFtZV0udHlwZVN0cmluZy5zcGxpdChcIiBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlQXJyWzBdID09PSAnQVJSQVknKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1R5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPSB0eXBlQXJyWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BcnJheSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IHR5cGVBcnJbMV0uc3Vic3RyaW5nKDEsIHR5cGVBcnJbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBhcnJheUxlbmd0aC5zcGxpdCgnLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFyclN0YXJ0SWR4ID0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMF0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUxlbmd0aCA9IHBhcnNlSW50KGFycmF5TGVuZ3RoWzFdLCAxMCkgLSBwYXJzZUludChhcnJheUxlbmd0aFswXSwgMTApICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5TGVuZ3RoID0gYXJyYXlMZW5ndGg7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EYXRhIHR5cGUgb2YgdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzNdLnNwbGl0KCcoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzFdID0gdHlwZVsxXS5zdWJzdHIoMCwgdHlwZVsxXS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVBcnJbMF0gKyAnLicgKyBhcnJheUxlbmd0aCArICcuJyArIHR5cGVbMF0gKyAnLicgKyB0eXBlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnN0cmluZ0xlbmd0aCA9IHBhcnNlSW50KHR5cGVbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmZ1bGxUeXBlID0gdHlwZUFyclswXSArICcuJyArIGFycmF5TGVuZ3RoICsgJy4nICsgdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0l0ZW0gbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5pdGVtU2l6ZSA9IHRoaXMuc3ltVGFibGVbbmFtZV0uc2l6ZSAvIGFycmF5TGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB2YXJpYWJsZSBpcyBhIHVzZXIgZGVmaW5lZCBkYXRhIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5hcnJheURhdGFUeXBlID0gJ1VTRVInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZWxlbSBpbiB0aGlzLnBsY1R5cGVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxjVHlwZUxlbi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT09IGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5RGF0YVR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN5bVRhYmxlW25hbWVdLmFycmF5RGF0YVR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmRhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHR5cGVBcnJbMF0uc3BsaXQoJygnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVsxXSA9IHR5cGVbMV0uc3Vic3RyKDAsIHR5cGVbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ltVGFibGVbbmFtZV0uZnVsbFR5cGUgPSB0eXBlWzBdICsgJy4nICsgdHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5zdHJpbmdMZW5ndGggPSBwYXJzZUludCh0eXBlWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS5mdWxsVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB2YXJpYWJsZSBpcyBhIHVzZXIgZGVmaW5lZCBkYXRhIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW1UYWJsZVtuYW1lXS50eXBlID0gJ1VTRVInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZWxlbSBpbiB0aGlzLnBsY1R5cGVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxjVHlwZUxlbi5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT09IGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN5bVRhYmxlW25hbWVdLnR5cGUgPT09ICdVU0VSJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlW25hbWVdLmRhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bVRhYmxlUmVhZHkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogRW5kIG9mIHJlYWRpbmcgdGhlIHN5bWJvbHMgZnJvbSB0aGUgVFBZIGZpbGUuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3ltYm9sIHRhYmxlIHJlYWR5LicpO1xuXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHBhcnNpbmcgdGhlIHN5bWJvbCBmaWxlOicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogUmVhZGluZyB0aGUgc3ltYm9scyBmcm9tIHRoZSBUUFkgZmlsZSBpcyBkZWFjdGl2YXRlZC4nKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL0dldCB0aGUgZGF0YSB0eXBlcy5cbiAgICAgICAgICAgIHZhciBhbGxEYXRhVHlwZXMsIGRhdGFUeXBlQXJyYXksIHN1Ykl0ZW1BcnJheSwgc05hbWUsIGZ1bGxOYW1lO1xuXG4gICAgICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3RhcnQgcmVhZGluZyB0aGUgZGF0YSB0eXBlcyBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhbiBBcnJheSBvZiB0aGUgRWxlbWVudHMgd2l0aCBcIkRhdGFUeXBlXCIgYXMgdGFnIG5hbWUuXG4gICAgICAgICAgICAgICAgICAgIGFsbERhdGFUeXBlcyA9IGNvbmZpZ0ZpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0RhdGFUeXBlcycpWzBdO1xuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZUFycmF5ID0gYWxsRGF0YVR5cGVzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdEYXRhVHlwZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBuYW1lIG9mIHRoZSBkYXRhIHR5cGUgYW5kIGNyZWF0ZSBhbiBvYmplY3QgcHJvcGVydHkgd2l0aCBpdC5cbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhVHlwZVRhYmxlIGlzIGRlY2xhcmVkIG91dHNpZGUgaW4gdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvL0FycmF5cyBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YVR5cGVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWUgPSBkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOYW1lJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBmdWxsTmFtZS5zcGxpdChcIiBcIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ0FSUkFZJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW2Z1bGxOYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90eXBlOiBkYXRhVHlwZUFycmF5W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUeXBlJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0U2l6ZTogcGFyc2VJbnQoZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQml0U2l6ZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtmdWxsTmFtZV0uc2l6ZSA9IHRoaXMuZGF0YVR5cGVUYWJsZVtmdWxsTmFtZV0uYml0U2l6ZSAvIDg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9UaGVuIHRoZSByZXN0XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhVHlwZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsTmFtZSA9IGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ05hbWUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGZ1bGxOYW1lLnNwbGl0KFwiIFwiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lICE9PSAnQVJSQVknKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdHlwZTogZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVHlwZScpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdFNpemU6IHBhcnNlSW50KGRhdGFUeXBlQXJyYXlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdFNpemUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJJdGVtczoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zaXplID0gdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLmJpdFNpemUgLyA4O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9HZXQgdGhlIFN1Ykl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViSXRlbUFycmF5ID0gZGF0YVR5cGVBcnJheVtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnU3ViSXRlbScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdWJJdGVtQXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc05hbWUgPSBzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ05hbWUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL09ubHkgU3ViSXRlbXMgd2l0aCB0eXBlIGluZm9ybWF0aW9uIChwcm9ibGVtIG9jY3VycyB3aXRoIFRDMyBhbmQgc29tZSBsaWJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUeXBlJykubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NOYW1lID0gc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdOYW1lJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVN0cmluZzogc3ViSXRlbUFycmF5W2pdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdUeXBlJylbMF0uY2hpbGROb2Rlc1swXS5ub2RlVmFsdWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1R5cGUnKVswXS5oYXNBdHRyaWJ1dGUoJ1BvaW50ZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXRTaXplOiBwYXJzZUludChzdWJJdGVtQXJyYXlbal0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0JpdFNpemUnKVswXS5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSwgMTApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQml0T2ZmcycpWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmJpdE9mZnNldCA9IHBhcnNlSW50KHN1Ykl0ZW1BcnJheVtqXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQml0T2ZmcycpWzBdLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5zaXplID0gKHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYml0U2l6ZSA+PSA4KSA/IHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYml0U2l6ZSAvIDggOiB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmJpdFNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVBcnIgPSB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGVTdHJpbmcuc3BsaXQoXCIgXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZUFyclswXSA9PT0gJ0FSUkFZJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlID0gdHlwZUFyclswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQXJyYXkgTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSB0eXBlQXJyWzFdLnN1YnN0cmluZygxLCB0eXBlQXJyWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5TGVuZ3RoID0gYXJyYXlMZW5ndGguc3BsaXQoJy4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5hcnJTdGFydElkeCA9IHBhcnNlSW50KGFycmF5TGVuZ3RoWzBdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBwYXJzZUludChhcnJheUxlbmd0aFsxXSwgMTApIC0gcGFyc2VJbnQoYXJyYXlMZW5ndGhbMF0sIDEwKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5hcnJheUxlbmd0aCA9IGFycmF5TGVuZ3RoO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0RhdGEgdHlwZSBvZiB0aGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHR5cGVBcnJbM10uc3BsaXQoJygnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVbMV0gPSB0eXBlWzFdLnN1YnN0cigwLCB0eXBlWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmZ1bGxUeXBlID0gdHlwZUFyclswXSArICcuJyArIGFycmF5TGVuZ3RoICsgJy4nICsgdHlwZVswXSArICcuJyArIHR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uc3RyaW5nTGVuZ3RoID0gcGFyc2VJbnQodHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uZnVsbFR5cGUgPSB0eXBlQXJyWzBdICsgJy4nICsgYXJyYXlMZW5ndGggKyAnLicgKyB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgYWRkZWQgY2F1c2UgdGhlcmUgYXJlIHVuZGVmaW5lZCBkYXRhIHR5cGVzIHNvbWUgVHdpbkNBVCBsaWJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLnNraXBNaXNzaW5nVHlwZXMgPT09IHRydWUgJiYgdGhpcy5kYXRhVHlwZVRhYmxlW3RoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZVN0cmluZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGVycm9yOiBEYXRhIHR5cGUgbWlzc2luZyBpbiBUUFkgZmlsZTonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2codGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogQWNjZXNzIHRvIHN5bWJvbHMgdXNpbmcgdGhpcyBkYXRhIHR5cGUgd2lsbCByZXR1cm4gd3JvbmcgcmVzdWx0czonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogVXNlIGhhbmRsZXMgdG8gYWNjZXNzIHN5bWJvbHMgdXNpbmcgdGhpcyBkYXRhIHR5cGUuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGVUYWJsZVt0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnR5cGVTdHJpbmddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgZXJyb3I6IERhdGEgdHlwZSBtaXNzaW5nIGluIFRQWSBmaWxlIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBJZiB5b3UgZG9uXFwndCB1c2UgdGhpcyBkYXRhIHR5cGUgeW91IGNhbiBzZXQgdGhlIGNsaWVudCBwYXJhbWV0ZXIgXCJza2lwTWlzc2luZ1R5cGVzXCIgdG8gdHJ1ZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmJpdFNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlU3RyaW5nXS5iaXRTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlU3RyaW5nXS5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JdGVtIGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uaXRlbVNpemUgPSB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLnNpemUgLyBhcnJheUxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uYXJyYXlEYXRhVHlwZSA9ICdVU0VSJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzBdID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5hcnJheURhdGFUeXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5hcnJheURhdGFUeXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5kYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlQXJyWzBdLnNwbGl0KCcoJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVbMV0gPSB0eXBlWzFdLnN1YnN0cigwLCB0eXBlWzFdLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVbbmFtZV0uc3ViSXRlbXNbc05hbWVdLmZ1bGxUeXBlID0gdHlwZVswXSArICcuJyArIHR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uc3RyaW5nTGVuZ3RoID0gcGFyc2VJbnQodHlwZVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0uZnVsbFR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdmFyaWFibGUgaXMgYSB1c2VyIGRlZmluZWQgZGF0YSB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVR5cGVUYWJsZVtuYW1lXS5zdWJJdGVtc1tzTmFtZV0udHlwZSA9ICdVU0VSJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGVsZW0gaW4gdGhpcy5wbGNUeXBlTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsY1R5cGVMZW4uaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlWzBdID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlID0gdHlwZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS50eXBlID09PSAnVVNFUicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVHlwZVRhYmxlW25hbWVdLnN1Ykl0ZW1zW3NOYW1lXS5kYXRhVHlwZSA9IHR5cGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBTa2lwcGluZyBTdWJJdGVtIHdpdGggbm8gdHlwZSBpbmZvcm1hdGlvbjogRGF0YSB0eXBlOiAnICsgbmFtZSArICcgLFN1Ykl0ZW06ICcgKyBzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUeXBlVGFibGVSZWFkeSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBFbmQgb2YgcmVhZGluZyB0aGUgZGF0YSB0eXBlcyBmcm9tIHRoZSBUUFkgZmlsZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBEYXRhIHR5cGUgdGFibGUgcmVhZHkuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9HZXQgVXBsb2FkIEluZm9cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGVja0dldFVwbG9hZEluZm8oKTtcblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSBjcmVhdGluZyB0aGUgZGF0YSB0eXBlIGluZm9ybWF0aW9uOicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnVHlwZTogJyArIGZ1bGxOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1N1Ykl0ZW06ICcgKyBzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNvbmZpZ1htbEh0dHBSZXEuc2VuZChudWxsKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIFNldCB0aGUgc2VydmljZSBwYXJhbWV0ZXIgd2l0aCB0aGUgdmFsdWVzIHJlYWQgZnJvbSB0aGUgVFBZIGZpbGUuXG4gICAgICovXG4gICAgc2V0U2VydmljZVBhcmFtRnJvbVRQWSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlcnZpY2UuYW1zTmV0SWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuYW1zTmV0SWQgPSB0aGlzLnNlcnZpY2VJbmZvLm5ldElkO1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBObyBOZXRJZCBkZWZpbml0aW9uIGZvdW5kLiBOZXRJZCBmcm9tIFRQWSBmaWxlIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXJ2aWNlLmFtc1BvcnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuYW1zUG9ydCA9IHRoaXMuc2VydmljZUluZm8ucG9ydDtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogTm8gQU1TIHBvcnQgZGVmaW5pdGlvbiBmb3VuZC4gUG9ydCBudW1iZXIgZnJvbSBUUFkgZmlsZSB3aWxsIGJlIHVzZWQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2VJbmZvLmFsaWdubWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSB0aGlzLnNlcnZpY2VJbmZvLmFsaWdubWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnVEFNRSBsaWJyYXJ5IGluZm86IE5vIGFsaWdubWVudCBwYXJhbWV0ZXIgZm91bmQuIEFsaWdubWVudCBmcm9tIFRQWSBmaWxlIHdpbGwgYmUgdXNlZC4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgd2FybmluZzogQ2FuXFwndCBnZXQgYSB2YWx1ZSBmb3IgdGhlIGRhdGEgYWxpZ21lbnQuIERlZmF1bHQgdmFsdWUgZm9yIGFsaWdubWVudCBpcyB1c2VkICgxKS4gVGhpcyB3b3JrcyBvbmx5IHdpdGggVEMyIGFuZCB4ODYgcHJvY2Vzc29ycy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFsaWdubWVudCAhPT0gMSAmJiB0aGlzLmFsaWdubWVudCAhPT0gNCAmJiB0aGlzLmFsaWdubWVudCAhPT0gOCkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSB3YXJuaW5nOiBUaGUgdmFsdWUgZm9yIHRoZSBhbGlnbm1lbnQgc2hvdWxkIGJlIDEsIDQgb3IgOC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogVGFyZ2V0IGluZm9ybWF0aW9uOiBOZXRJZDogJyArIHRoaXMuc2VydmljZS5hbXNOZXRJZCArICcsIEFNUyBwb3J0OiAnICsgdGhpcy5zZXJ2aWNlLmFtc1BvcnQgKyAnICwgYWxpZ25tZW50OiAnICsgdGhpcy5hbGlnbm1lbnQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIFVwbG9hZEluZm8gaGFzIHRvIGJlIGZldGNoZWQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tHZXRVcGxvYWRJbmZvKCkge1xuXG4gICAgICAgIHRoaXMuc2V0U2VydmljZVBhcmFtRnJvbVRQWSgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXJ2aWNlLmNvbmZpZ0ZpbGVVcmwgIT0gJ3N0cmluZycgfHwgdGhpcy5zZXJ2aWNlLmZvcmNlVXBsb2FkVXNhZ2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogU3RhcnQgZmV0Y2hpbmcgdGhlIHN5bWJvbHMgZnJvbSBQTEMuJyk7XG4gICAgICAgICAgICAvL0dldCB0aGUgVXBsb2FkSW5mby5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRVcGxvYWRJbmZvKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogQ291bGRcXCdudCBmZXRjaCB0aGUgc3ltYm9sIGluZm9ybWF0aW9uIGZyb20gdGhlIFBMQzonICsgZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZS5zeW5jWG1sSHR0cCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25SZWFkeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCB0aGUgb25SZWFkeSBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBvblJlYWR5KCkge1xuICAgICAgICAvL09uLXJlYWR5LWZ1bmN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXJ2aWNlLm9uUmVhZHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdUQU1FIGxpYnJhcnkgaW5mbzogQ2FsbGluZyB0aGUgXCJvblJlYWR5XCIgZnVuY3Rpb24uJyk7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uub25SZWFkeSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBlcnJvcjogTm8gXCJvblJlYWR5XCIgZnVuY3Rpb24gZGVmaW5lZC4gQ2hlY2sgdGhlIG1hbnVhbC4nKTtcbiAgICAgICAgfVxuICAgICAgICAvL1N0YXJ0IGN5Y2xpYyBBRFMgY2hlY2tzIGlmIGRlZmluZWRcbiAgICAgICAgaWYgKCFpc05hTih0aGlzLnNlcnZpY2UuYWRzQ2hlY2tJbnRlcnZhbCkgJiYgdGhpcy5zZXJ2aWNlLmFkc0NoZWNrSW50ZXJ2YWwgPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1RBTUUgbGlicmFyeSBpbmZvOiBTdGFydCBjeWNsaWMgcmVhZGluZyBvZiBBRFMgc3RhdGUuJyk7XG4gICAgICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLnJlYWRBZHNTdGF0ZSwgdGhpcy5zZXJ2aWNlLmFkc0NoZWNrSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=