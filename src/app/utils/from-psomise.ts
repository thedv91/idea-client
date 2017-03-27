import { Observable } from "rxjs/Observable";

export const fromPromise = (promise) => {
    return Observable.create(observer => {
        promise
            .then(o => {
                observer.next(o);
                observer.complete();
            })
            .catch(e => observer.error(e));

    });
};
