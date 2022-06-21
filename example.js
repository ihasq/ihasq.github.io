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
        },
        {
          opcode: 'downloader',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Hash [data] as [algorithm]',
          arguments: {
            data: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'input'
            },
            algorithm: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'SHA-256'
            }
          }
        }
      ]
    };
  }
  ihasq(){
    return 'Let it go';
  }
  second(args){
    return args.A === args.B;
  }
  downloader(hash){
    const digest = crypto.subtle.digest(hash.algorithm, hash.data);
    return digest;
  }
}

Scratch.extensions.register(new ExampleExtension());