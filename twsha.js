class SHA {
  getInfo() {
    return {
      id: 'turbowarpsha',
      name: 'SHA-2 for Turbowarp',
      blocks: [
        {
          opcode: 'sha2',
          blockType: Scratch.BlockType.REPORTER,
          text: 'SHA-2 [ALGORITHM] [INPUT]',
          arguments: {
            ALGORITHM: {
              type: Scratch.ArgumentType.STRING,
              menu: "algo",
              defaultValue: '256'
            },
            INPUT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello, world!'
            }
          }
        }
      ],
      menus: {
        algo: {
          acceptReporters: true,
          items: ['224','256','384','512'],
        }
      }
    };
  }
  sha2({ALGORITHM, INPUT}) {
    return ALGORITHM === INPUT;
  }
}
Scratch.extensions.register(new SHA());