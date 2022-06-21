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
          opcode: 'Hash',
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
  Hash(hash){
    var msgUint8 = new TextEncoder("utf-8").encode(hash.data);
    crypto.subtle.digest(hash.algorithm, msgUint8).then(
      function(hashBuffer){
        var hashArray = Array.from(new Uint8Array(hashBuffer));
        var hashHex = hashArray.map(function(b){return b.toString(16).padStart(2, '0')}).join('');
        return resolve(hashHex);
      }
    );
  }
}
Scratch.extensions.register(new ExampleExtension());