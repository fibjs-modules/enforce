import util = require('util');

export type IValidateCtxUserData = Record<string | symbol | number, any>;
type IValidateContext<TCTX extends IValidateCtxUserData = {}> = {
    property: string;
    // data to be validated
    data: object
    u: TCTX;
};

export interface IValidationProc<TCTX extends IValidateCtxUserData = {}> {
    (
        value: any,
        next: (errorMessage?: string) => any,
        contexts: IValidateContext<TCTX>
    ): void;
}

export default class Validator<TCTX extends IValidateCtxUserData = {}> {
    private validator: IValidationProc<TCTX>;
    private _thisArg: object = {};

    constructor (validate: IValidationProc<TCTX>) {
        this.validator = validate;
    }
    
    validate(data: any, next: (message?: string) => void, contexts: TCTX = {} as TCTX) {
        this.validator.apply(this._thisArg, [data, next, contexts]);
    }

    validateSync(data: any, contexts: TCTX = {} as TCTX): string | void {
        const wrapper = (data: any, contexts: TCTX = {} as TCTX, cb: Function) => {
            this.validate(data, (message?: string) => {
                cb(null, message);
            }, contexts);
        };

        return util.sync(wrapper)(data, contexts);
    }

    _setThisArg(thisArg: object) {
        this._thisArg = thisArg;
    }

    /**
     * @description enforce validating if data field defined.
     */
    ifDefined(): Validator<TCTX> {
        return new Validator<TCTX>((value, next, contexts) => {
            if (value === undefined || value === null) return next();
            return this.validator(value, next, contexts);
        });
    }
    
    /**
     * @description enforce validating if data field not empty string.
     */
    ifNotEmptyString(): Validator<TCTX> {
        return new Validator<TCTX>((value, next, contexts) => {
            if (value === undefined || value === null) return next();
            if (typeof value !== 'string') return next();
            if (value.length === 0) return next();
            return this.validator(value, next, contexts);
        });
    }

    /**
     * @description enforce validating if data field's type equals to `type`
     */
    ifType(type: string): Validator<TCTX> {
        return new Validator<TCTX>((value, next, contexts) => {
            if (typeof value != type)
                return next();

            return this.validator(value, next, contexts);
        });
    }

    ifNotType(type: string): Validator<TCTX> {
        return new Validator<TCTX>((value, next, contexts) => {
            if (typeof value != type)
                return this.validator(value, next, contexts);

            return next();
        });
    }
}