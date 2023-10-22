import { notification } from 'antd';
import Swal from 'sweetalert2';
import _ from 'lodash';

export default class Utils {
    static autoError(f, opts) {
        return async (...args) => {
            try {
                return await Promise.resolve(f(...args))
            }
            catch (err) {
                console.log(err)
                const msg = _.get(err, 'response.data.err.message', _.get(err, 'message', opts?.msg ?? 'Unknown error'))
                const title = opts?.title ?? 'Error'
                return notification.error({
                    message: title,
                    description: msg
                })
            }
        }
    }

    static noReturn(f) {
        return (...args) => {
            f(...args)
            return undefined
        }
    }

    static confirmAction(title, description, f) {
        return async (...args) => {
            const res = await Swal.fire({
                title,
                text: description,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            })

            if (res.isConfirmed) {
                return await Promise.resolve(f(...args))
            }
        }
    }

    static objDescription(obj) {
        return _.chain(_.entries(obj)).sortBy(([v, k]) => k).map(e => e.join(': ')).join('; ').value()
    }

    static upsert(arr, elem, pred) {
        const idx = arr.findIndex(pred)
        if (idx >= 0) {
            arr[idx] = elem
        }
        else {
            arr.push(elem)
        }
    }

    static wrapBy(fTarget) {
        return new Proxy({}, {
            apply(_target, thisArg, args) {
                const target = fTarget()
                return target && Reflect.apply(target, thisArg, args)
            },
            construct(_target, ...args) {
                const target = fTarget()
                return target && Reflect.construct(target, ...args)
            },
            defineProperty(_target, ...args) {
                const target = fTarget()
                return target && Reflect.defineProperty(target, ...args)
            },
            deleteProperty(_target, ...args) {
                const target = fTarget()
                return target && Reflect.deleteProperty(target, ...args)
            },
            getOwnPropertyDescriptor(_target, ...args) {
                const target = fTarget()
                return target && Reflect.getOwnPropertyDescriptor(target, ...args)
            },
            getPrototypeOf(_target, ...args) {
                const target = fTarget()
                return target && Reflect.getPrototypeOf(target, ...args)
            },
            has(_target, ...args) {
                const target = fTarget()
                return target && Reflect.has(target, ...args)
            },
            isExtensible(_target, ...args) {
                const target = fTarget()
                return target && Reflect.isExtensible(target, ...args)
            },
            ownKeys(_target, ...args) {
                const target = fTarget()
                return target && Reflect.ownKeys(target, ...args)
            },
            preventExtensions(_target, ...args) {
                const target = fTarget()
                return target && Reflect.preventExtensions(target, ...args)
            },
            setPrototypeOf(_target, ...args) {
                const target = fTarget()
                return target && Reflect.setPrototypeOf(target, ...args)
            },
            get(_target, prop, receiver) {
                const target = fTarget()
                return target && Reflect.get(target, prop, receiver)
            },
            set(_target, key, value, receiver) {
                const target = fTarget()
                return target && Reflect.set(target, key, value, receiver)
            }
        })
    }
}