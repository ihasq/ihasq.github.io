class TWAM {
  getInfo() {
    return {
      id: 'turbowarpadvancedmath',
      name: 'Advanced Operator',
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
              defaultValue: 3
            }
          }
        },
        {
          opcode: 'twammeth2',
          blockType: Scratch.BlockType.REPORTER,
          text: '[INPUT1][POW][INPUT2]',
          arguments: {
            INPUT1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 3
            },
            POW: {
              type: Scratch.ArgumentType.STRING,
              menu: "pows",
              defaultValue: '^'
            },
            INPUT2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        },
        {
          opcode: 'twambase',
          blockType: Scratch.BlockType.REPORTER,
          text: '[INPUT] base[BASE1]to[BASE2]',
          arguments: {
            INPUT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 3
            },
            BASE1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 10
            },
            BASE2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        },
        {
          opcode: 'twamjudge',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[INPUT] is prime',
          arguments: {
            INPUT: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        },
        {
          opcode: 'twamfill',
          blockType: Scratch.BlockType.REPORTER,
          text: 'fill [INPUT] up to [DIGIT] digits',
          arguments: {
            INPUT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 2
            },
            DIGIT: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 16
            }
          }
        },
        {
          opcode: 'twampi',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VAR]',
          arguments: {
            VAR: {
              type: Scratch.ArgumentType.STRING,
              menu: "var",
              defaultValue: "π"
            }
          }
        },
        {
          opcode: 'twamvar',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VAR]',
          arguments: {
            VAR: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 3
            }
          }
        },
        {
          opcode: 'twamangle',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VAR]',
          arguments: {
            VAR: {
              type: Scratch.ArgumentType.ANGLE,
              defaultValue: 90
            }
          }
        },
        {
          opcode: 'twamcolor',
          blockType: Scratch.BlockType.REPORTER,
          text: '[VAR]',
          arguments: {
            VAR: {
              type: Scratch.ArgumentType.COLOR,
              defaultValue: "#ff00ff"
            }
          }
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
            'hypot',
            'log1p',
            'sign',
            'trunc'
          ]
        },
        pows: {
          acceptReporters: true,
          items: [
            '^',
            '√',
            'log',
          ]
        },
        var: {
          acceptReporters: true,
          items: [
            'π',
            '∞',
            'e',
            'ln2',
            'ln10',
            'log2e',
            'log10e',
            'sqrt2',
            'sqrt1_2',
            'last modified date'
          ]
        }
      },
      translation_map: {
        ja: {
          'name': '高度な演算',
          'twambase': '[BASE1]進数の[INPUT]を[BASE2]進数化',
          'twamjudge': '[INPUT] は素数'
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
  twammeth2({INPUT1, POW, INPUT2}) {
    if(POW==="^") {
      return Math.pow(INPUT1, INPUT2)
    } else if(POW==="√") {
      return Math.pow(INPUT1, 1/INPUT2)
    } else if(POW==="log") {
      return Math.log(INPUT1, INPUT2)
    }
  }
  twampi({VAR}) { 
    if(VAR==="π") {
      return Math.PI;
    } else if(VAR==="∞") {
      return Infinity;
    } else if(VAR==="e") {
      return Math.E;
    } else if(VAR==="ln2") {
      return Math.LN2;
    } else if(VAR==="ln10") {
      return Math.LN10;
    } else if(VAR==="log2e") {
      return Math.LOG2E;
    } else if(VAR==="log10e") {
      return Math.LOG10E;
    } else if(VAR==="sqrt2") {
      return Math.SQRT2;
    } else if(VAR==="sqrt1_2") {
      return Math.SQRT1_2;
    } else if(VAR==="last modified date") {
      return "2022-07-13 09:25:45";
    }
  }
  twamfill({INPUT, DIGIT}) {
    return ( Array(DIGIT).join('0') + INPUT ).slice( -DIGIT );
  }
  twamvar({VAR}) {
    return VAR;
  }
  twamangle({VAR}) {
    return VAR;
  }
  twamcolor({VAR}) {
    return VAR;
  }
  twambase({INPUT, BASE1, BASE2}) {
    return parseInt(INPUT, BASE1).toString(BASE2);
  }
  twamjudge({INPUT}) {
    if(INPUT < 2 || INPUT %2 == 0 && INPUT != 2) {
      return false;
    }
    let num = Math.sqrt(INPUT);
    for(var i = 3; i <=num; i += 2) {
      if (INPUT % i == 0) {
        return false;
      }
    }
    return true;
  }
}
Scratch.extensions.register(new TWAM());