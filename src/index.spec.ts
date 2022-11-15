import {createRequestListener, createServer, parseSystemInfo} from "./index";
import * as http from "http";


describe('index test suite', () => {
    it('should return cpuInfos', async () => {
        //test of the function parseSystemInfo
        const sysInfo = await parseSystemInfo();
        expect(sysInfo).toBeDefined();
        // use then to get the result of the promise and put it in the variable cpuName
        const cpuName = sysInfo.cpu.manufacturer.toString();
        // test if the cpuName is defined
        expect(cpuName).toBeDefined();
        console.log(cpuName);
        expect(cpuName).toBe('AMDDD');

        // expect(sysInfo).toHaveProperty('memoryInfos');
        // expect(sysInfo).toHaveProperty('osInfos');
        // expect(sysInfo).toHaveProperty('diskInfos');
        //
        //
        // expect.assertions(1);
        //
        // let cpuManufacturer = "Intel®";
        // const sysInfo = parseSystemInfo();
        // // eslint-disable-next-line jest/valid-expect-in-promise
        // sysInfo.then(data => {
        //     console.log('data', data.toString());
        //     cpuManufacturer = data.cpu.manufacturer;
        // });
        //
        // console.log('Le cpuManufacturer est : ', cpuManufacturer);
        //
        // expect(1).toBe(0);
        //
        //
        //
        // //create mock function for si.cpu()
        // const mockCpu = jest.fn().mockImplementation(() => {'Intel'});
        // //mock the si.cpu() function
        // jest.mock('systeminformation', () => ({ cpu: mockCpu }));
        //
        // //call the parseSystemInfo function
        // parseSystemInfo().then((value) => { cpuManufacturer = value.cpu.manufacturer; });
        // //expect the cpuManufacturer to be Intel
        // expect(cpuManufacturer).toBe('Intel');


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
