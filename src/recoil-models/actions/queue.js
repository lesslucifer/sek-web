export class ExecutionQueue {
    queue = []
    idx = 0
    running = null

    constructor(handler) {
        this.handler = handler
    }

    add(...items) {
        this.queue.push(...items)
        this._trigger()
    }

    clear() {
        this.queue.clear()
        this.idx = 0
    }

    _trigger() {
        if (this.running) return
        if (this.idx >= this.queue.length) return

        this.running = this.queue[this.idx++]
        const ret = this.handler(this.running)
        if (ret instanceof Promise) {
            ret.finally(() => {
                this.running = null
                this._trigger()
            })
        }
        else {
            this.running = null
            this._trigger()
        }
    }
}