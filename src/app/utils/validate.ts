export class Validate {

    static isEmail(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    static isNumber(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static isInteger(n: any) {
        return this.isNumber(n) && Number.isInteger(parseFloat(n));
    }
}
