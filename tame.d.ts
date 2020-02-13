export declare class TAME {
    service: any;
    version: string;
    weekdShortNames: {
        ge: string[];
        en: string[];
    };
    weekdLongNames: {
        ge: string[];
        en: string[];
    };
    monthsShortNames: {
        ge: string[];
        en: string[];
    };
    monthsLongNames: {
        ge: string[];
        en: string[];
    };
    dateNames: {
        weekdShort: any;
        weekdLong: any;
        monthsShort: any;
        monthsLong: any;
    };
    maxStringLen: number;
    maxDropReq: number;
    useCheckBounds: boolean;
    adsState: any;
    adsStateTxt: string;
    deviceState: any;
    symTableReady: boolean;
    dataTypeTableReady: boolean;
    handleCacheReady: boolean;
    xmlHttpReqTimeout: number;
    indexGroups: {
        M: number;
        MX: number;
        DB: number;
        I: number;
        IX: number;
        Q: number;
        QX: number;
        Upload: number;
        UploadInfo: number;
        HandleByName: number;
        ValueByHandle: number;
        ReleaseHandle: number;
        SumRd: number;
        SumWr: number;
        SumRdWr: number;
    };
    plcTypeLen: {
        BOOL: number;
        BYTE: number;
        USINT: number;
        SINT: number;
        WORD: number;
        UINT: number;
        INT: number;
        INT16: number;
        INT1DP: number;
        INT2DP: number;
        DWORD: number;
        UDINT: number;
        DINT: number;
        TIME: number;
        TOD: number;
        TIME_OF_DAY: number;
        DATE: number;
        DT: number;
        DATE_AND_TIME: number;
        POINTER: number;
        REAL: number;
        LREAL: number;
        STRING: number;
        EndStruct: number;
    };
    adsStates: string[];
    lang: any;
    alignment: number;
    currReq: number[];
    symTable: {};
    dataTypeTable: {};
    serviceInfo: any;
    symbolCount: number;
    uploadLength: number;
    handleCache: {};
    handleNames: any[];
    xmlHttpReq: any;
    log(message: any): void;
    constructor(service: any);
    open(): Promise<void>;
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
    parseVarName(name: any, data?: any, obj?: any, prefix?: any, suffix?: any): any;
    /**
     * Check if a passed string length is valid.
     *
     * @param {Number} len
     */
    isValidStringLen(len: any): boolean;
    /**
     * The function returns the IndexGroup for a PLC variable address.
     *
     * @param {Object} req          An object with the address or the name for the request.
     * @return {Number} indexGroup  The IndexGroup for the ADS request.
     */
    getIndexGroup(req: any): any;
    /**
     * The function returns the IndexOffset for a PLC variable address.
     *
     * @param {Object} req          An object with the address or the name for the request.
     * @return {Number} indexOffset The IndexOffset for the ADS request.
     */
    getIndexOffset(req: any): any;
    /**
     * The function parses the PLC variable name, looks in the symbol and data type table and
     * returns an object with the necessary information.
     *
     * @param {Object} item          An object with at least the address or the name for the request.
     * @return {Objecct} itemInfo    An object with the information about the item.
     *
     */
    getItemInformation(item: any): any;
    /**
     * This function creates a XMLHttpRequest object.
     *
     * @return {Object} xmlHttpReq  A XMLHttpRequest.
     */
    createXMLHttpReq(): any;
    adsReqSendAsync(adsReq: any): Promise<any>;
    /**
     * Create the objects for SOAP and XMLHttpRequest and send the request.
     *
     * @param {Object} adsReq   The object containing the arguments of the ADS request.
     */
    createRequest(adsReq: any): any;
    /**
     * Function for checking the input values when writing numeric PLC variables.
     *
     * @param {Object} item
     * @param {String} type
     * @param {Number} min
     * @param {Number} max
     */
    checkValue(item: {
        val: string;
    }, type: string, min: string | number, max: string | number): any;
    /**
     * Get type and format and return it in an array. Create an
     * item.type entry if it doesn't exist.
     *
     * @param {Object} item     An item of a variable list.
     * @return {Array} arr      An array with type and format.
     */
    getTypeAndFormat(item: any): any[];
    /**
     * Create a structure definition based on the information in the data table.
     *
     * @param {String}  structname  The name of the structure in the data table.
     * @return {Object} struct      An object containing the items of the structure.
     */
    createStructDef(structname: any): {};
    /**
     * Conversion of ASCII(0-9, a-f, A-F) charcodes to numbers 0-15
     *
     * @param {Number} charcode
     */
    charcodeToDual(charcode: any): number;
    /**
     * Convert a number into an array of bytes.
     *
     * @param {Number} value
     * @param {Number} varlen
     */
    numToByteArr(value: any, varlen: any): any[];
    /**
     * Convert a JavaScript floating point number to a PLC REAL value.
     *
     * @param {Number} num
     */
    floatToReal(num: any): number;
    /**
         * Convert a JavaScript floating point number to a PLC LREAL value.
         * Cause it's a 64 bit value, we have to split it in two 32 bit integer.
         *
         * @param {Number} num
         */
    floatToLreal(num: any): {
        part1: number;
        part2: number;
    };
    /**
     * Convert a value to value in milliseconds, depending
     * on the format string.
     *
     * @param {Number} time
     * @param {String} format
     */
    toMillisec(time: any, format: any): any;
    /**
     * Convert a TOD string to a value of milliseconds.
     *
     * @param {Number} time
     * @param {String} format
     */
    stringToTime(timestring: any, format: any): number;
    /**
     * Base64 encoder
     *
     * @param {Array} data
     */
    encodeBase64(data: any): string;
    /**
     * Function for converting the data values to a byte array.
     *
     * @param {Object} item     An item of the item list of a request descriptor.
     * @param {String} type     Contains the data type
     * @param {String} format   The formatting string.
     * @param {Number} len      Data length.
     * @return {Array} bytes    An array containing the data as byte values.
     */
    dataToByteArray(item: any, type: any, format: any, len: any): any[];
    /**
     * Convert a number to a hex string.
     *
     * @param {Number} value
     */
    numToHexString(value: any): any;
    /**
     * Set a fixed length of an integer by adding leading
     * zeros(i.e. change 2 to 02).
     *
     * @param {Number} numb
     * @param {Number} places
     */
    fixNumbLength(numb: any, places: any): any;
    /**
     * Convert a date object to a formatted string.
     *
     * @param {Date} time
     * @param {String} format
     */
    dateToString(time: any, format: any): string;
    /**
     * Convert a number with a value in milliseconds to a formatted string.
     *
     * @param {Number} time
     * @param {String} format
     */
    timeToString(time: any, format: any): string;
    /**
     * Convert data string to USINT/BYTE.
     *
     * @param {String} string
     */
    parsePlcUsint(string: any): number;
    /**
     * Convert data string to SINT.
     *
     * @param {String} string
     */
    parsePlcSint(string: any): number;
    /**
     * Convert data string to UINT/WORD.
     *
     * @param {String} string
     */
    parsePlcUint(string: any): number;
    /**
     * Convert data string to INT.
     *
     * @param {String} string
     */
    parsePlcInt(string: any): number;
    /**
     * Convert data string to UDINT/DWORD.
     *
     * @param {String} string
     */
    parsePlcUdint(string: any): number;
    /**
     * Convert data string to DINT.
     *
     * @param {String} string
     */
    parsePlcDint(string: any): number;
    /**
     * Convert data string to a formatted time string
     *
     * @param {String} string
     * @param {String} format
     */
    parsePlcTime(string: any, format: any): string | number;
    /**
     * Convert data string to a formatted time of day string.
     *
     * @param {String} string
     * @param {String} format
     */
    parsePlcTod(string: any, format: any): string | Date;
    /**
     * Convert data string to a formatted date/time of day string.
     *
     * @param {String} string
     * @param {String} format
     */
    parsePlcDate(string: any, format: any): string | Date;
    /**
     * Convert data string of a REAL variable
     * to a JavaScript floating point number.
     *
     * @param {String} string
     */
    parsePlcReal(string: any): number;
    /**
     * Convert data string of a LREAL variable
     * to a JavaScript floating point number.
     *
     * @param {String} string
     */
    parsePlcLreal(string: any): number;
    /**
     * Convert data string to string by simply cutting of superfluous characters.
     *
     * @param {String} string
     */
    parsePlcString(string: any): any;
    /**
     * Base64 decoder
     *
     * @param {String} data
     */
    decodeBase64(data: any): string;
    /**
     * Convert B64-substrings to data.
     *
     * @param {String} dataString
     * @param {String} type
     * @param {String, Number} format
     * @return {Mixed} data
     *
     */
    subStringToData(dataString: any, type: any, format?: any): any;
    /**
     * Decode the response string of a Read Request and store the data.
     *
     * @param {Object} adsReq   ADS Reqest Object
     */
    parseReadReq(adsReq: any): any;
    /**
     * Decode the response string of a SumReadRequest and store the data.
     *
     * @param {Object} adsReq   ADS Request Object
     */
    parseSumReadReq(adsReq: any): void;
    /**
     * Decode the response string of a SumWriteRequest.
     *
     * @param {Object} adsReq   ADS Request Object
     */
    parseSumWriteReq(adsReq: any): void;
    /**
     * Decode the response string of a ADS State Request and store the data.
     *
     * @param {Object} adsReq   ADS Reqest Object
     */
    parseAdsState(adsReq: any): void;
    /**
     * Decode the response string of a ReadWrite Request and store the handles.
     *
     * @param {Object} adsReq   ADS Request Object
     */
    parseHandles(adsReq: any): void;
    writeSingle(method: any, type: any, args: any): Promise<any>;
    readSingle(method: any, type: any, args: any): Promise<any>;
    /**
     * Create the Request Descriptor for a single variable. An item list
     * with a single array item is generated.
     *
     * @param {String} method   The method, either "Read" or "Write".
     * @param {String} type     The PLC data type.
     * @param {Object} args     The arguments for building for the Request Descriptor.
     */
    createSingleDescriptor(method: any, type: any, args: any): {};
    /**
     * Create a Request Descriptor for an array. An item list of
     * single variables is generated.
     *
     * @param {String} method   The method, either "Read" or "Write".
     * @param {String} type     The data type of the PLC variable.
     * @param {Object} args     The arguments for building the Request Descriptor.
     */
    createArrayDescriptor(method: any, type: any, args: any): void;
    /**
     * Create a Request Descriptor for a structure,
     * a structure definition has to be passed as one of the arguments,
     * from wich the item list is created.
     *
     * @param {String} method   The method, either "Read" or "Write".
     * @param {Object} args     The arguments for building the Request Descriptor.
     */
    createStructDescriptor(method: any, args: any): void;
    /**
     * This is the function for creating a write request. Depending on the
     * values and PLC data types passed in the variable list a byte array is
     * created and the function for sending the request is called.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    writeReq(reqDescr: any): {};
    /**
     * This is the function for creating a read request. If no value for the
     * data length ist passed, calculate the value and then call the function
     * for sending the request.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    readReq(reqDescr: any): {};
    /**
     * This is the function for creating a sum read request.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    sumReadReq(reqDescr: any): void;
    /**
     * This is the function for creating a sum write request.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    sumWriteReq(reqDescr: any): void;
    /**
     * This is the function for reading the ADS state.
     *
     * @param {Object}  reqDescr    The Request Descriptor. Besides other information
     *                              this object contains the allocation of PLC and
     *                              JavaScript variables in an item list.
     */
    readAdsState(reqDescr: any): void;
    /**
     *  Prints the cached handles to the console.
     */
    logHandleCache(): void;
    /**
     *  Prints the symbol table to the console.
     */
    logSymbols(): void;
    /**
     *  Prints the data type table to the console.
     */
    logDataTypes(): void;
    /**
     * Converts the Symbol Table to a JSON string.
     *
     * @return {Array}  jstr    The Symbol Table as a JSON string .
     */
    getSymbolsAsJSON(): any;
    /**
     * Reads the Symbol Table from a JSON string
     *
     * @param {String}  jstr    A JSON string with the symbols.
     */
    setSymbolsFromJSON(jstr: any): void;
    /**
     * Converts the Data Type Table to a JSON string.
     *
     * @return {Array}  jstr    The Data Type Table as a JSON string .
     */
    getDataTypesAsJSON(): any;
    /**
     * Reads the Data Type Table from a JSON string
     *
     * @param {String}  jstr    A JSON string with the data types.
     */
    setDataTypesFromJSON(jstr: any): void;
    /**
     * Process the webservice's server response.
     *
     * @param {Object} adsReq   The object containing the arguments of the ADS request.
     */
    parseResponse(adsReq: any, xmlDocument: XMLDocument): any;
    /**
     * Get the handles from the PLC.
     *
     * @param {Array} arrSymNames   Array with the symbol names.
     */
    getHandles(reqDescr: any): void;
    /**
     * This is the function for releasing the cached handles.
     *
     */
    releaseHandles(reqDescr: any): void;
    /**
     * The shortcuts for reading and writing data.
     *
     * @param {Object} args
     */
    writeBool: (args: any) => Promise<any>;
    writeByte: (args: any) => Promise<any>;
    writeUsint: (args: any) => Promise<any>;
    writeSint: (args: any) => Promise<any>;
    writeWord: (args: any) => Promise<any>;
    writeUint: (args: any) => Promise<any>;
    writeInt: (args: any) => Promise<any>;
    writeInt1Dp: (args: any) => Promise<any>;
    writeInt2Dp: (args: any) => Promise<any>;
    writeDword: (args: any) => Promise<any>;
    writeUdint: (args: any) => Promise<any>;
    writeDint: (args: any) => Promise<any>;
    writeReal: (args: any) => Promise<any>;
    writeLreal: (args: any) => Promise<any>;
    writeString: (args: any) => Promise<any>;
    writeTime: (args: any) => Promise<any>;
    writeTod: (args: any) => Promise<any>;
    writeDate: (args: any) => Promise<any>;
    writeDt: (args: any) => Promise<any>;
    readBool: (args: any) => Promise<any>;
    readByte: (args: any) => Promise<any>;
    readUsint: (args: any) => Promise<any>;
    readSint: (args: any) => Promise<any>;
    readWord: (args: any) => Promise<any>;
    readUint: (args: any) => Promise<any>;
    readInt: (args: any) => Promise<any>;
    readInt1Dp: (args: any) => Promise<any>;
    readInt2Dp: (args: any) => Promise<any>;
    readDword: (args: any) => Promise<any>;
    readUdint: (args: any) => Promise<any>;
    readDint: (args: any) => Promise<any>;
    readReal: (args: any) => Promise<any>;
    readLreal: (args: any) => Promise<any>;
    readString: (args: any) => Promise<any>;
    readTime: (args: any) => Promise<any>;
    readTod: (args: any) => Promise<any>;
    readDate: (args: any) => Promise<any>;
    readDt: (args: any) => Promise<any>;
    writeStruct: (args: any) => void;
    readStruct: (args: any) => void;
    writeArrayOfBool: (args: any) => void;
    writeArrayOfByte: (args: any) => void;
    writeArrayOfUsint: (args: any) => void;
    writeArrayOfSint: (args: any) => void;
    writeArrayOfWord: (args: any) => void;
    writeArrayOfUint: (args: any) => void;
    writeArrayOfInt: (args: any) => void;
    writeArrayOfInt1Dp: (args: any) => void;
    writeArrayOfInt2Dp: (args: any) => void;
    writeArrayOfDword: (args: any) => void;
    writeArrayOfUdint: (args: any) => void;
    writeArrayOfDint: (args: any) => void;
    writeArrayOfReal: (args: any) => void;
    writeArrayOfLreal: (args: any) => void;
    writeArrayOfString: (args: any) => void;
    writeArrayOfTime: (args: any) => void;
    writeArrayOfTod: (args: any) => void;
    writeArrayOfDate: (args: any) => void;
    writeArrayOfDt: (args: any) => void;
    writeArrayOfStruct: (args: any) => void;
    readArrayOfBool: (args: any) => void;
    readArrayOfByte: (args: any) => void;
    readArrayOfUsint: (args: any) => void;
    readArrayOfSint: (args: any) => void;
    readArrayOfWord: (args: any) => void;
    readArrayOfUint: (args: any) => void;
    readArrayOfInt: (args: any) => void;
    readArrayOfInt1Dp: (args: any) => void;
    readArrayOfInt2Dp: (args: any) => void;
    readArrayOfDword: (args: any) => void;
    readArrayOfUdint: (args: any) => void;
    readArrayOfDint: (args: any) => void;
    readArrayOfReal: (args: any) => void;
    readArrayOfLreal: (args: any) => void;
    readArrayOfString: (args: any) => void;
    readArrayOfTime: (args: any) => void;
    readArrayOfTod: (args: any) => void;
    readArrayOfDate: (args: any) => void;
    readArrayOfDt: (args: any) => void;
    readArrayOfStruct: (args: any) => void;
    /**
     *  Get the upload info.
     */
    getUploadInfo(): Promise<void>;
    /**
     * Parse the upload information and call the request for
     * reading the upload data.
     *
     * @param {Object} adsReq   An ADS Request Descriptor.
     */
    parseUploadInfo(adsReq: any): void;
    /**
     * Parse the upload data and an object (symTable) with the symbol names
     * as the properties.
     *
     * @param {Object} adsReq   An ADS Request Descriptor.
     */
    parseUpload(adsReq: any): void;
    configXmlHttpReq: any;
    /**
    * Get the symbol-file (*.tpy) from the server and create
    * an object (symTable) with the symbol names as the properties.
    */
    getConfigFile(): Promise<void>;
    /**
     *  Set the service parameter with the values read from the TPY file.
     */
    setServiceParamFromTPY(): void;
    /**
     * Check if the UploadInfo has to be fetched.
     */
    checkGetUploadInfo(): Promise<void>;
    /**
     * Call the onReady function.
     */
    onReady(): void;
}
