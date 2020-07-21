export default (opts = {}) => {
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
        Bodies.rectangle(width - halfPadding, halfHeight, padding, height, {
            isStatic: true,
        }),
        // bottom
        Bodies.rectangle(halfWidth, height - halfPadding, width, padding, {
            isStatic: true,
        }),
        // left
        Bodies.rectangle(halfPadding, halfHeight, padding, height, {
            isStatic: true,
        }),
    ]
    World.add(world, walls)

    return walls
}
