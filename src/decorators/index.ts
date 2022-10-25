import {createDecorator} from 'vue-class-component';

// Declare Log decorator.
export const Log = (msg?: string)=>{
  return createDecorator((comp, key) => {
    console.log(comp, key);
  });
};

