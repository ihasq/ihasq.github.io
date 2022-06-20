class ExampleExtension {
  getInfo() {
    return {
      id: 'turbowarpextensionexample',
      name: 'test extension made by ihasq',
      blocks: [
        {
          opcode: 'ihasq',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Welcome!'
        },
        {
          opcode: 'second',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Again! [A] [B]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'First'
            },
            B: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Second'
            }
          }
        }
      ]
    };
  }
  ihasq(){
    return 'Let it go';
  }
  second(){
    return args.A === args.B;
  }
}

Scratch.extensions.register(new ExampleExtension());