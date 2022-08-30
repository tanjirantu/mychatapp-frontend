export default () => {
    const service = <any>{};
    service.id = process.env.SERVICE_ID;
    service.name = process.env.SERVICE_NAME;
    service.zone = process.env.SERVICE_ZONE;
    return service;
};