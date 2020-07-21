export default (opts = {}) => {
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
}