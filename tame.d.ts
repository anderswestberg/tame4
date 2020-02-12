export as namespace TAME

export = TAME

declare const TAME = { 
    WebServiceClient: {
        createClient: null as (options: any) => Client
    }
}

declare class Client {
    readDint: ({ name: string, jvar: string }) => any    
    writeTime: ({ name: string, val: any }) => any
}

