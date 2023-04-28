export default class GPU {
    constructor(whenReady) {

        this.initied = false;
        this.adapter = null;
        this.device = null;
        this.adapterInfo = null;
        this.encoder = null;
        this.canvas = null;
        this.context = null;
        
        this.init();
        this.whenReady = whenReady;

    }
    async init() {

        this.adapter = await navigator.gpu.requestAdapter();
        this.device = await this.adapter.requestDevice();
        this.adapterInfo = await this.adapter.requestAdapterInfo();
        this.initied = true;
        this.whenReady();

    }
    async createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'WebGPU';
        this.canvas.height = 400;
        this.canvas.width = 600;

        this.context = this.canvas.getContext('webgpu');

        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });

        this.encoder = this.device.createCommandEncoder();

        const pass = this.encoder.beginRenderPass({
            colorAttachments: [{
                view: this.context.getCurrentTexture().createView(),
                loadOp: "clear",
                storeOp: "store",
            }]
        });

        pass.end();

        const commandBuffer = this.encoder.finish();

        this.device.queue.submit([commandBuffer]);

        return this.canvas;
    }
}
