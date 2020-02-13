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
        this.writeBool = (args) => this.writeSingle('Write', 'BOOL', args);
        this.writeByte = (args) => this.writeSingle('Write', 'BYTE', args);
        this.writeUsint = (args) => this.writeSingle('Write', 'USINT', args);
        this.writeSint = (args) => this.writeSingle('Write', 'SINT', args);
        this.writeWord = (args) => this.writeSingle('Write', 'WORD', args);
        this.writeUint = (args) => this.writeSingle('Write', 'UINT', args);
        this.writeInt = (args) => this.writeSingle('Write', 'INT', args);
        this.writeInt1Dp = (args) => this.writeSingle('Write', 'INT1DP', args);
        this.writeInt2Dp = (args) => this.writeSingle('Write', 'INT2DP', args);
        this.writeDword = (args) => this.writeSingle('Write', 'DWORD', args);
        this.writeUdint = (args) => this.writeSingle('Write', 'UDINT', args);
        this.writeDint = (args) => this.writeSingle('Write', 'DINT', args);
        this.writeReal = (args) => this.writeSingle('Write', 'REAL', args);
        this.writeLreal = (args) => this.writeSingle('Write', 'LREAL', args);
        this.writeString = (args) => this.writeSingle('Write', 'STRING', args);
        this.writeTime = (args) => this.writeSingle('Write', 'TIME', args);
        this.writeTod = (args) => this.writeSingle('Write', 'TOD', args);
        this.writeDate = (args) => this.writeSingle('Write', 'DATE', args);
        this.writeDt = (args) => this.writeSingle('Write', 'DT', args);
        this.readBool = (args) => this.readSingle('Read', 'BOOL', args);
        this.readByte = (args) => this.readSingle('Read', 'BYTE', args);
        this.readUsint = (args) => this.readSingle('Read', 'USINT', args);
        this.readSint = (args) => this.readSingle('Read', 'SINT', args);
        this.readWord = (args) => this.readSingle('Read', 'WORD', args);
        this.readUint = (args) => this.readSingle('Read', 'UINT', args);
        this.readInt = (args) => this.readSingle('Read', 'INT', args);
        this.readInt1Dp = (args) => this.readSingle('Read', 'INT1DP', args);
        this.readInt2Dp = (args) => this.readSingle('Read', 'INT2DP', args);
        this.readDword = (args) => this.readSingle('Read', 'DWORD', args);
        this.readUdint = (args) => this.readSingle('Read', 'UDINT', args);
        this.readDint = (args) => this.readSingle('Read', 'DINT', args);
        this.readReal = (args) => this.readSingle('Read', 'REAL', args);
        this.readLreal = (args) => this.readSingle('Read', 'LREAL', args);
        this.readString = (args) => this.readSingle('Read', 'STRING', args);
        this.readTime = (args) => this.readSingle('Read', 'TIME', args);
        this.readTod = (args) => this.readSingle('Read', 'TOD', args);
        this.readDate = (args) => this.readSingle('Read', 'DATE', args);
        this.readDt = (args) => this.readSingle('Read', 'DT', args);
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
            //Test with timeout
            //experimental, seems like it doesn't work with all browsers (05/2017)
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
    ;
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
        var response, itemList = adsReq.reqDescr.items, arrType = [], strAddr = 0, item, dataString, dataSubString, data, strlen, len, plen, mod, type, format, idx, listlen, startaddr;
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
                data = this.subStringToData(dataSubString, type, format);
                //Parse the name of the JavaScript variable and write the data to it
                if (type !== 'EndStruct') {
                    this.parseVarName(item.jvar, data, adsReq.reqDescr.dataObj, item.prefix, item.suffix);
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
            return;
        }
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
        let reqDescr = this.createSingleDescriptor(method, type, args);
        let adsReq = this.writeReq(reqDescr);
        this.createRequest(adsReq);
        this.adsReqSend(adsReq);
        return true;
    }
    readSingle(method, type, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqDescr = this.createSingleDescriptor(method, type, args);
            let adsReq = this.readReq(reqDescr);
            this.createRequest(adsReq);
            this.adsReqSend(adsReq);
            return 42;
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
        var response, errorCode, errorText;
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
                    this.parseReadReq(adsReq);
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
        xmlHttpReq.onreadystatechange = () => {
            if ((xmlHttpReq.readyState === 4) && (xmlHttpReq.status === 200)) {
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
