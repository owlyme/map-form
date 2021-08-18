const isObject = (value:any) => Object.prototype.toString.call(value) === '[object Object]'
const isArray = (value:any) => Array.isArray(value)

export const fromPorpertiesParseToString = (obj: object) => {
    if (typeof obj !== 'object') {
        return obj
    }
    const newObj = {};
    
    for (const key in obj) {
        const value = obj[key];
        if (isObject(value)) {
            const stepValue = fromPorpertiesParseToString(value);
            Object.keys(stepValue).forEach(stepKey => {
                newObj[`${key}.${stepKey}`] = stepValue[stepKey];
            });
        } else if (isArray(value)) {
            const arr = value
            for (let index = 0; index < arr.length; index++) {
                
                const indexRes = fromPorpertiesParseToString(arr[index])
                
                if (isObject(indexRes)) {
                    const stepValue = fromPorpertiesParseToString(indexRes);
                    Object.keys(stepValue).forEach(stepKey => {
                        newObj[`${key}.${index}.${stepKey}`] = stepValue[stepKey];
                    });
                } else {
                    newObj[`${key}.${index}`] = indexRes
                }

               
            }
        } else {
            newObj[key] = value;
        }
    }
    return newObj;
};

export const fromPorpertiesParseToObject = (obj: object) => {
    const newObj:object = {};
    const fn = (arr:any, value:any) => {
        const len = arr.length;
        let index = 0;
        arr.reduce((acc:object, key:string) => {
            if (index < len - 1) {
                acc[key] = acc[key] || {};
                ++index;
                return acc[key];
            } else {
                acc[key] = value;
            }
        }, newObj);
    };

    for (const key in obj) {
        const keys = key.split('.');
        const value = obj[key];
        fn(keys, value);
    }
    return newObj;
};
