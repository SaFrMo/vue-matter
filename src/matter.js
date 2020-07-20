import { Engine, Render, World, Bodies } from 'matter-js'
import { debounce, get } from 'lodash'
import mouse from './parts/mouse'

export default {
    data() {
        return {
            matter: {},
        }
    },
    mounted() {
        window.addEventListener('resize', debounce(this.onResize, 150))
    },
    computed: {
        width() {
            return get(this.matter.render, 'canvas.width', -1)
        },
        height() {
            return get(this.matter.render, 'canvas.height', -1)
        },
    },
    methods: {
        onResize() {
            this.matterInit()
        },
        matterInit(opts = {}) {
            opts = {
                clear: true,
                ...opts,
            }

            // clear existing engine & canvas
            if (opts.clear && this.matter.engine) {
                Engine.clear(this.matter.engine)

                const { canvas } = this.matter.render

                if (this.matter.render && canvas) {
                    canvas.parentElement.removeChild(canvas)
                }
            }

            // create an engine
            this.matter.engine = Engine.create()

            // save some vars
            const width = document.body.offsetWidth
            const height = document.body.offsetHeight

            // create a renderer
            this.matter.render = Render.create({
                element: document.body,
                engine: this.matter.engine,
                options: { width, height },
            })

            // run the engine
            Engine.run(this.matter.engine)

            // run the renderer
            Render.run(this.matter.render)
        },
        matterWalls(opts = {}) {
            // set defaults
            opts = {
                padding: 20,
                world: null,
                canvas: null,
                ...opts,
            }

            // make sure we have a world
            const world = opts.world || this.matter.engine.world
            if (!world) {
                console.warn('No world found. Canceling wall creation.')
                return
            }

            // make sure we have a canvas
            const canvas = opts.canvas || this.matter.render.canvas
            if (!canvas) {
                console.warn('No canvas found. Canceling wall creation.')
                return
            }

            // deconstruct other opts
            const { padding } = opts
            const halfPadding = padding * 0.5
            const { width, height } = canvas
            const halfWidth = width * 0.5
            const halfHeight = height * 0.5

            // add walls
            const walls = [
                // top
                Bodies.rectangle(halfWidth, halfPadding, width, padding, {
                    isStatic: true,
                }),
                // right
                Bodies.rectangle(
                    width - halfPadding,
                    halfHeight,
                    padding,
                    height,
                    { isStatic: true }
                ),
                // bottom
                Bodies.rectangle(
                    halfWidth,
                    height - halfPadding,
                    width,
                    padding,
                    {
                        isStatic: true,
                    }
                ),
                // left
                Bodies.rectangle(halfPadding, halfHeight, padding, height, {
                    isStatic: true,
                }),
            ]
            World.add(world, walls)

            return walls
        },
        matterAdd(items, opts = {}) {
            opts = {
                world: this.matter.engine.world,
                ...opts,
            }

            if (Array.isArray(items)) {
                items.forEach((item) => World.add(opts.world, item))
            } else {
                World.add(opts.world, items)
            }
        },
        matterMouse: mouse,
    },
}
