import { Mouse, MouseConstraint, World } from 'matter-js'

export default function (opts = {}) {
    opts = {
        canvas: this.matter.render.canvas,
        engine: this.matter.engine,
        world: this.matter.engine.world,
        constraint: {
            stiffness: 0.1,
            render: {
                visible: false,
            },
        },
        ...opts,
    }

    // add mouse control
    const mouse = Mouse.create(opts.canvas)
    const mouseConstraint = MouseConstraint.create(opts.engine, {
        mouse,
        constraint: opts.constraint,
    })
    World.add(opts.world, mouseConstraint)
}
