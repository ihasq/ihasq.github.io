class TWAM {
  getInfo() {
    return {
      id: 'turbowarpadvancedmath',
      name: 'Advanced Math Reporters',
      blocks: [
        {
          opcode: 'twammeth1',
          blockType: Scratch.BlockType.REPORTER,
          text: '[METHOD][INPUT]',
          arguments: {
            METHOD: {
              type: Scratch.ArgumentType.STRING,
              menu: "method1",
              defaultValue: 'sinh'
            },
            INPUT: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 3,
            }
          }
        },
        {
          opcode: 'twammeth2',
          blockType: Scratch.BlockType.REPORTER,
          text: 'pow[INPUT1][INPUT2]',
          arguments: {
            INPUT1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 3,
            },
            INPUT2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2,
            }
          }
        },
        {
          opcode: 'twampi',
          blockType: Scratch.BlockType.REPORTER,
          text: 'π',
        }
      ],
      menus: {
        method1: {
          acceptReporters: true,
          items: [
            'sinh',
            'asinh',
            'cosh',
            'acosh',
            'tanh',
            'atanh',
            'atan2',
            'cbrt',
            'clz32',
            'expm1',
            'fround',
            'log1p',
            'sign',
            'trunc'
          ]
        }
      }
    };
  }
  twammeth1({METHOD, INPUT}) {
    if(METHOD==="sinh") {
      return Math.sinh(INPUT);
    } else if(METHOD==="asinh") {
      return Math.asinh(INPUT);
    } else if(METHOD==="cosh") {
      return Math.cosh(INPUT);
    } else if(METHOD==="acosh") {
      return Math.acosh(INPUT);
    } else if(METHOD==="tanh") {
      return Math.tanh(INPUT);
    } else if(METHOD==="atanh") {
      return Math.atanh(INPUT);
    } else if(METHOD==="atan2") {
      return Math.atan2(INPUT);
    } else if(METHOD==="cbrt") {
      return Math.cbrt(INPUT);
    } else if(METHOD==="clz32") {
      return Math.clz32(INPUT);
    } else if(METHOD==="expm1") {
      return Math.expm1(INPUT);
    } else if(METHOD==="fround") {
      return Math.fround(INPUT);
    } else if(METHOD==="log1p") {
      return Math.log1p(INPUT);
    } else if(METHOD==="sign") {
      return Math.sign(INPUT);
    } else if(METHOD==="trunc") {
      return Math.trunc(INPUT);
    }
  }
  twammeth2({INPUT1, INPUT2}) {
    return Math.pow(INPUT1, INPUT2);
  }
  twampi() {
    return Math.PI;
  }
}
Scratch.extensions.register(new TWAM());