import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.mjs';

//
//
//
//
//
//
//
//

var script = {
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
      const list = [];
      for (let i = 0; i < this.threshold; i++) {
        list.push(...this.rollList);
      }
      list.push(this.value);
      return list
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        setTimeout(() => {
          this.start();
        }, 0);
      }
    },
    canStart(val) {
      if (val) this.start();
    }
  },
  mounted() {
    this.animateRef = this.$refs.animate;
    this.rollRef = this.$refs.roll;
    this.height = this.rollRef.getBoundingClientRect().height;
    this.animateRef.addEventListener('transitionend', () => {
      this.$emit('transitionend');
      this.rolling = false;
    });
  },
  methods: {
    start() {
      if (this.transitionDuration <= 0 || !this.canStart || (this.rolling && !this.restart)) return
      const len = this.list.length - 1;
      this.animateRef.style.transitionDuration = '0s';
      this.animateRef.style.transform = 'translate3d(0,0,0)';
      setTimeout(() => {
        this.rolling = true;
        this.animateRef.style.transition = `all ${this.transitionDuration}ms ${this.transitionTimingFunction}`;
        this.animateRef.style.transform = `translate3d(0,-${this.height * len}px,0)`;
      }, 50);
    },
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "roll", staticClass: "roll-container" }, [
    _c(
      "div",
      { ref: "animate", staticClass: "content" },
      _vm._l(_vm.list, function(item, index) {
        return _c(
          "span",
          { key: index, style: { height: _vm.height + "px" } },
          [_vm._v(_vm._s(item))]
        )
      }),
      0
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".roll-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.content {\n  position: relative;\n  width: 100%; }\n  .content span {\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n";
styleInject(css_248z);

__vue_component__.install = function (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};

export { __vue_component__ as Roll };
