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
          opcode: 'logic',
          blockType: Scratch.BlockType.REPORTER,
          text: '[A][menu][B]',
          arguments: {
            A: {
              type: 'string',
              defaultValue: '',
            },
            menu: {
              type: 'string',
              menu: 'menu',
              defaultValue: '>',
            },
            B: {
              type: 'string',
              defaultValue: '',
            }
          }
        }
      ],
      menus: {
        menu: {
          items: ['=', '≠', '>', '>=', '<', '<='],
        },
      }
    };
  }
  ihasq(){
    return 'Let it go';
  }
  second(args){
    return args.A === args.B;
  }
  logic({A,menu,B}){
    if(menu==='='){
      return A===B;
    } else if(menu==='≠'){
      return A!==B;
    } else if(menu==='>'){
      return A > B;
    } else if(menu==='>='){
      return A >= B;
    } else if(menu==='<'){
      return A < B;
    } else if(menu==='<='){
      return A <= B;
    }
  }
}
Scratch.extensions.register(new ExampleExtension());