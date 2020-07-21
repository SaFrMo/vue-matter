**Nuxt**: Copy and paste the contents of `src` to `/mixins`. Then:

```html
<script>
    import matter from '~/mixins/matter'

    export default {
        mixins: [matter],
        mounted() {
            // create a matter world and add walls to it
            this.matterInit()
            this.matterWalls()
        },
    }
</script>
```

### Docs

```html
<script>
    import matter from '~/mixins/matter'

    export default {
        mixins: [matter],
        mounted() {
            // default options shown throughout

            // create a simple matter scene
            this.matterInit({
                // whether or not to clear the current scene, if any
                clear: true,
            })

            // add walls around the scene. returns array of wall bodies
            this.matterWalls({
                // wall padding, in px
                padding: 20,
                // target world (null == world created in `matterInit`)
                world: null,
                // target canvas (null == canvas created in `matterInit`)
                canvas: null,
            })

            // create your bodies - for example:
            const body = Bodies.rectangle(
                // width and height are computed props that return matterInit's created canvas's width and height
                this.width / 2,
                this.height / 2,
                50,
                50
            )
        },
    }
</script>
```
