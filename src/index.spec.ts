import {createRequestListener, createServer, parseSystemInfo} from "./index";
// import * as http from "http";
// import {cpu} from "systeminformation";


describe('index test suite', () => {
    jest.setTimeout(10000);
    it('1 shoulb be equal to 1', () => {
        expect(1).toBe(1);
    });
});
