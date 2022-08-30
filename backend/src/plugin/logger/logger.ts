import serviceInformation from './serviceInformation';
import util from 'util';
 
export default  (request: any ,responseDateTime: any) => {
    const log = <any>{};
    
    const service = serviceInformation();
    log.service = service;
    if (request) {
        log.eventId = request.headers?.eventid;
        log.ip = request.info.remoteAddress;
        log.method = request.method.toUpperCase();
        log.url = request.path;
        log.query = JSON.stringify(request.query);
        if (request && request.response && request.response._payload && request.response._payload._data) {
            const response = JSON.parse(request.response._payload._data);
            log.response = {
                statusCode: response.statusCode,
                message: response.message
            }
            if (response.error) log.response.error = response.error;
        }
    }
    log.responseTime = responseDateTime.dateTime;
    log.responseTimestamp = responseDateTime.timestamp;
    console.info(util.inspect(log, false, null));
}
