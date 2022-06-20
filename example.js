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
        }
      ]
    };
  }
  ihasq(){
    return 'Let it go';
  }
}

Scratch.extensions.register(new ExampleExtension());