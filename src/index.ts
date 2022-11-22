/**
 * Mandatory Hello World function.
 * @returns A string which contains "Hello world!"
 */
import {Cpu} from "./Utils/cpu";
import si, {Systeminformation} from "systeminformation";
import {ISystemInformation} from "./SystemInformation";
import * as http from "http";

// function to parse the system information
export const parseSystemInfo = async (): Promise<ISystemInformation> => {
    const systemInformation: ISystemInformation = {
        cpu: null,
        system: null,
        mem: null,
        os: null,
        currentLoad: null,
        processes: null,
        diskLayout: null,
        networkInterfaces: null
    }

    // get the system information and wait for the promise to resolve
    await si.cpu().then(data => systemInformation.cpu = data).catch(error => console.error(error));
    await si.system().then(data => systemInformation.system = data).catch(error => console.error(error));
    await si.mem().then(data => systemInformation.mem = data).catch(error => console.error(error));
    await si.osInfo().then(data => systemInformation.os = data).catch(error => console.error(error));
    await si.currentLoad().then(data => systemInformation.currentLoad = data).catch(error => console.error(error));
    await si.processes().then(data => systemInformation.processes = data).catch(error => console.error(error));
    await si.diskLayout().then(data => systemInformation.diskLayout = data).catch(error => console.error(error));
    await si.networkInterfaces().then(data => systemInformation.networkInterfaces = data).catch(error => console.error(error));

    // http create server (port : 8000, hots : localhost)
  return systemInformation;
};
// use of the previous function
const p = parseSystemInfo();

// function to create a request listener
export const createRequestListener = () => {
    const requestListener = function (req, res) {
            if (req.url === '/api/v1/sysinfo') {
            res.writeHead(200);
            p.then((value) => {
                res.end(JSON.stringify(value));
            }).catch((err) => {
                console.log(err);
            });
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({error: 'Not found'}));
        }
    }
    return requestListener;
}
// use of the previous function
const requestListener = createRequestListener();

// function to create a server
export const createServer = (requestListener) => {
    const server = http.createServer(requestListener);
    server.listen(8000, '0.0.0.0', () => {
        console.log('Server is running on port 8000');
    });
    return server;
}
// use of the previous function
createServer(requestListener);














