import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
if (typeof window !== "undefined") {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CDBG6CZ6DPMULBZP3UMUROTHQQO7KBAFKBXOSLKAXECJBIODY5QJ4A6W",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAF1XaXRoZHJhdyBmdW5kcyBmcm9tIHRoZSBUcmVhc3VyeS4KT05MWSB0aGUgcmVnaXN0ZXJlZCBHb3Zlcm5hbmNlIGNvbnRyYWN0IGNhbiBhdXRob3JpemUgdGhpcy4AAAAAAAAId2l0aGRyYXcAAAADAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAJcmVjaXBpZW50AAAAAAAAEwAAAAA=",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAQAAAAAAAAAAAAAACkdvdmVybmFuY2UAAA==",
            "AAAAAAAAAERJbml0aWFsaXplIHRoZSBUcmVhc3VyeSB3aXRoIHRoZSBhZGRyZXNzIG9mIHRoZSBHb3Zlcm5hbmNlIGNvbnRyYWN0LgAAAA1pbml0X3RyZWFzdXJ5AAAAAAAAAQAAAAAAAAAKZ292ZXJuYW5jZQAAAAAAEwAAAAA="]), options);
        this.options = options;
    }
    fromJSON = {
        withdraw: (this.txFromJSON),
        init_treasury: (this.txFromJSON)
    };
}
