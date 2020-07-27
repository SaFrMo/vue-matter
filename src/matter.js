import { Engine, Render, World, Bodies } from 'matter-js'
import debounce from 'lodash/debounce'
import get from 'lodash/get'

import matterMouse from './parts/mouse'
import matterInit from './parts/matterInit'
import matterAdd from './parts/matterAdd'
import matterWalls from './parts/matterWalls'
import matterDom from './parts/matterDom'

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
        matterInit,
        matterWalls,
        matterAdd,
        matterMouse,
        matterDom,
    },
}
