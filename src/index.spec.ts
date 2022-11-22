import {createRequestListener, createServer, parseSystemInfo} from "./index";
import * as http from "http";


describe('index test suite', () => {
    jest.setTimeout(10000);
    it('should return cpuInfos', async () => {
        //test of the function parseSystemInfo
        const sysInfo = await parseSystemInfo();
        const cpuName = sysInfo.cpu.manufacturer.toString();
        console.log('cpuName', cpuName);
        // expect('go').toBe('go');
    });
    it('should be a 404 response from the server', () => {
        //test of the function createRequestListener with the url 'test'
        const requestListener = createRequestListener();
        const server = createServer(requestListener);
        const options = { hostname: 'localhost', port: 8000, path: '/test', method: 'GET' };
        const req = http.request(options, res => { expect(res.statusCode).toBe(404); });
        req.end();
        server.close();
    });

    it('should be a 200 response from the server', () => {
        //test of the function createRequestListener with the url /api/v1/sysinfo
        const requestListener = createRequestListener();
        const server = createServer(requestListener);
        const options = { hostname: 'localhost', port: 8000, path: '/api/v1/sysinfo', method: 'GET' };
        const req = http.request(options, res => { expect(res.statusCode).toBe(200);});
        req.end();
        server.close();
    });
});
