import { Bodies } from 'matter-js'

class MatterDom {
    constructor(opts) {
        opts = {
            el: null,
            bodyOpts: { render: { opacity: 0 } },
            running: true,
            ...opts,
        }
        Object.keys(opts).forEach((key) => (this[key] = opts[key]))

        // get measurements
        const { width, height, x } = this.el.getBoundingClientRect()
        const halfWidth = width * 0.5
        const halfHeight = height * 0.5
        const center = { x: x + halfWidth, y: this.el.offsetTop + halfHeight }

        // save measurements
        this.el.style.setProperty('--starting-width', width + 'px')
        this.el.style.setProperty('--starting-height', height + 'px')

        // add processed class
        this.el.setAttribute('data-matter-processed', 'true')

        // create body
        this.body = Bodies.rectangle(
            center.x,
            center.y,
            width,
            height,
            this.bodyOpts
        )

        // create update func
        this.update = () => {
            // cancel if no el
            if (!this) {
                return
            }
            if (!this.el || !this.running) {
                this.kill()
                return
            }

            this.el.style.setProperty(
                '--left',
                this.body.position.x - halfWidth + 'px'
            )
            this.el.style.setProperty(
                '--top',
                this.body.position.y - halfHeight + 'px'
            )
            this.el.style.setProperty(
                '--rotationDegrees',
                this.body.angle * 57.2958 + 'deg'
            )

            requestAnimationFrame(this.update)
        }

        // kick update
        this.update()
    }

    kill() {
        this.running = false
    }
}

export default function (el, opts = {}) {
    if (!el) {
        console.warn('not found:', el)
        return
    }

    return new MatterDom({ el, ...opts })
}
