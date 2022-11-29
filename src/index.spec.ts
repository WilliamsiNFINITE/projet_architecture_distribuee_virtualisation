import {createRequestListener, createServer, parseSystemInfo} from "./index";
import * as http from "http";
// import {cpu} from "systeminformation";


describe('index test suite', () => {
    jest.setTimeout(10000);
    it('1 shoulb be equal to 1', () => {
        expect(1).toBe(1);
    });


    it('should return cpuInfos', async () => {
        //test of the function parseSystemInfo
        const sysInfo = await parseSystemInfo();
        const cpuName = sysInfo.cpu.manufacturer.toString();
        console.log('cpuName', cpuName);
        //list of cpu names
        const cpuNames = ['AMD', 'Intel', 'ARM', 'IBM', 'Motorola', 'Qualcomm', 'Samsung', 'Texas Instruments', 'VIA', 'Vortex', 'Other'];
        //verify that the cpu name is in the list
        expect(cpuNames).toContain(cpuName);
    });


    it('should be a 404 response from the server', () => {
        //test of the function createRequestListener with the url 'test'
        //if the server return a 404 response, the test is passed
        // const requestListener = createRequestListener();
        // const server = createServer(requestListener);
        const options = {
            hostname: '0.0.0.0',
            port: 8000,
            path: '/test',
            method: 'GET'
        };
        const req = http.request(options, res => {
            expect(res.statusCode).toBe(404);
            // server.close();
        });
        req.end();
    });

    it('should be a 200 response from the server', () => {
        //test of the function createRequestListener with the url /api/v1/sysinfo

        const options = { hostname: '0.0.0.0', port: 8000, path: '/api/v1/sysinfo', method: 'GET' };
        const req = http.request(options, res => { expect(res.statusCode).toBe(200);});
        req.end();

    });
});
