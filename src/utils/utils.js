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

            console.log('confirmAction', res.isConfirmed)
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
}