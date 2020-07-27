import { World } from 'matter-js'

export default function (items, opts = {}) {
    opts = {
        world: this.matter.engine.world,
        ...opts,
    }

    if (Array.isArray(items)) {
        items.forEach((item) => World.add(opts.world, item))
    } else {
        World.add(opts.world, items)
    }
}
