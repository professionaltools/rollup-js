<template>
  <div class="roll-container" ref="roll">
    <div class="content" ref="animate">
      <span v-for="(item,index) in list" :key="index" :style="{height:height+'px'}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "roll",
    data() {
      return {
        rollRef: null,
        animateRef: null,
        rolling: false,
        height: 0,
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      canStart: {
        type: Boolean,
        default: true,
      },
      restart: {
        type: Boolean,
        default: true,
      },
      transitionTimingFunction: {
        type: String,
        default: 'ease-in'
      },
      transitionDuration: {
        type: Number,
        default: 1000
      },
      threshold: {
        type: Number,
        default: 6,
      },
      rollList: {
        type: Array,
        default: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    computed: {
      list() {
        if (this.transitionDuration <= 0 || !this.canStart) return [this.value]
        const list = []
        for (let i = 0; i < this.threshold; i++) {
          list.push(...this.rollList)
        }
        list.push(this.value)
        return list
      }
    },
    watch: {
      value: {
        immediate: true,
        handler() {
          setTimeout(() => {
            this.start()
          }, 0)
        }
      },
      canStart(val) {
        if (val) this.start()
      }
    },
    mounted() {
      this.animateRef = this.$refs.animate
      this.rollRef = this.$refs.roll
      this.height = this.rollRef.getBoundingClientRect().height
      this.animateRef.addEventListener('transitionend', () => {
        this.$emit('transitionend')
        this.rolling = false
      })
    },
    methods: {
      start() {
        if (this.transitionDuration <= 0 || !this.canStart || (this.rolling && !this.restart)) return
        const len = this.list.length - 1
        this.animateRef.style.transitionDuration = '0s'
        this.animateRef.style.transform = 'translate3d(0,0,0)'
        setTimeout(() => {
          this.rolling = true
          this.animateRef.style.transition = `all ${this.transitionDuration}ms ${this.transitionTimingFunction}`
          this.animateRef.style.transform = `translate3d(0,-${this.height * len}px,0)`
        }, 50)
      },
    }
  }
</script>