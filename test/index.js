import  GPU from '../main.js';

const gpu = new GPU(async () => {

    const canvas = await gpu.createCanvas();

    document.body.appendChild(canvas);

});

window.gpu = gpu;