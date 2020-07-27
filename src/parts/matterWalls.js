import { Bodies, World } from 'matter-js'

export default function (opts = {}) {
    // set defaults
    opts = {
        padding: 20,
        world: null,
        canvas: null,
        fullscreen: true,
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
    const { padding, fullscreen } = opts
    const halfPadding = padding * 0.5
    const { width, height } = canvas
    const halfWidth = width * 0.5
    const halfHeight = height * 0.5

    // add walls
    const walls = [
        // top
        Bodies.rectangle(
            halfWidth,
            fullscreen ? -halfPadding : padding,
            width,
            padding,
            {
                isStatic: true,
            }
        ),
        // right
        Bodies.rectangle(
            fullscreen ? width + halfPadding : width - halfPadding,
            halfHeight,
            padding,
            height,
            {
                isStatic: true,
            }
        ),
        // bottom
        Bodies.rectangle(
            halfWidth,
            fullscreen ? height + halfPadding : height - halfPadding,
            width,
            padding,
            {
                isStatic: true,
            }
        ),
        // left
        Bodies.rectangle(
            fullscreen ? -halfPadding : halfPadding,
            halfHeight,
            padding,
            height,
            {
                isStatic: true,
            }
        ),
    ]
    World.add(world, walls)

    return walls
}
