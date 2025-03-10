export const addHeaders = (req: any, rep: any, payload: any, done: any) => {
    rep.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    rep.header('X-Content-Type-Options', 'nosniff');
    done();
};
