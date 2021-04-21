import Vue from "vue"

export class Roll extends Vue {
  static install(vue: typeof Vue): void

  value: number
  canStart: boolean
  restart: boolean
  transitionTimingFunction: string
  transitionDuration: number
  threshold: number
  rollList: number[]
}