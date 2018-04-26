module.exports = {
    "prompts": {
      "name": {
        "type": "input",
        "required": true,
        "message": "Project name"
      },
      "description": {
        "type": "input",
        "required": false,
        "message": "Project description",
        "default": "cain-design-pro"
      },
      "author": {
        "type": "input",
        "message": "Author"
      },
    //   "login": {
    //       "type": "confirm",
    //       "message": "Use logical unit?"
    //   },
      "charts": {
          "type": "confirm",
          "message": "Install echarts and Use echarts' unit?"
      }
    },
    "skipInterpolation": [
      "src/components/**/*",
      "src/components/*",
      "src/views/**/*",
      "src/views/*",
      "static/**"
    ],
    "filters": {
        "src/views/echarts/*": "charts"
    }
  }


// prompts---inquire.js 用于询问后赋值给metalsmith.metadata()做全局参数
// skipInterpolation---multimatch,过滤数组中的路径不做任何处理，直接原样复制
// helpers---Handlebars 用于该模板引擎制作块help函数，例如定义了if_or help  实际在使用中是{{#if_or}}{{/if_or}}在这个块内会调用函数处理 返回处理后的结果
// filters---minimatch,用来过滤文件，prompts中返回的对象中，只要对应的键的值为false，就会把对应的文件路径的文件删除

// Handlebars 源码分析
// // 对于{{#name}}，作为重头戏，渲染section。
// // 在value = context.lookup(name)是trusy时才渲染section的内层tokens
// renderSection(token, context, partials, originalTemplate) {
//     let buffer = ''
//     const value = context.lookup(token[1])
//     const subRender = (template) => {
//         return this.render(template, context, partials)
//     }

//     if (!value) return

//     // value 是数组，构造子context，数组的每个元素作为data，渲染内层tokens
//     if (isArray(value)) {
//         for (let j = 0, valueLength = value.length; j < valueLength; ++j) {
//             buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate)
//         }
//     }
//     // value 是对象，字符串，数字，value作为data构造子context，渲染内层tokens
//     else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
//         buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate)
//     }
//     // value 是函数，函数执行返回值作为渲染后的html直接返回
//     else if (isFunction(value)) {
//         if (typeof originalTemplate !== 'string')
//             throw new Error('Cannot use higher-order sections without the original template')

//         value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender)

//         if (value != null)
//             buffer += value
//     }
//     // value 是 `true`，不用构造子context，直接渲染内层tokens
//     else {
//         buffer += this.renderTokens(token[4], context, partials, originalTemplate)
//     }
//     return buffer
// }

// {{#echarts }}{{/echarts}}
// 当遇到#开头是会调用上面的方法，若echarts为false 直接return 不做渲染
// 如果为true，直接渲染内部tokens
