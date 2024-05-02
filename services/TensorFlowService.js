import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
class CustomL2Regularizer {
  constructor(l2) {
      this.l2 = l2; // L2 regularization factor
  }

  apply(x) {
      // Apply L2 regularization: 0.5 * lambda * sum(square(weights))
      return tf.mul(tf.scalar(0.5 * this.l2), tf.sum(tf.square(x)));
  }

  getConfig() {
      // Method for serialization
      return { l2: this.l2 };
  }

  static get className() {
      // Class name for TensorFlow.js to use during serialization
      return 'L2';
  }
}
class TensorFlowService {
  constructor() {
    this.model = null;
  }

  async loadModel() {
    await tf.ready();
    tf.serialization.registerClass(CustomL2Regularizer);
    const modelJson = require('../models/model.json');
    const weights = require('../models/shared.bin');
    this.model = await tf.loadLayersModel(bundleResourceIO(modelJson, weights));
  }

  async predictImage(uri) {
    const imageTensor = await this.imageToTensor(uri);
    const prediction = await this.model.predict(imageTensor);
    return prediction.data();
  }

  async imageToTensor(uri) {
    const response = await fetch(uri, {}, { isBinary: true });
    const rawImageData = await response.arrayBuffer();
    const { width, height, data } = jpeg.decode(rawImageData, { useTArray: true });

    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }

    const img = tf.tensor3d(buffer, [width, height, 3]);
    const resizedImg = tf.image.resizeBilinear(img, [128, 128]);
    return resizedImg.expandDims(0).toFloat().div(tf.scalar(255));
  }
}

const tensorFlowService = new TensorFlowService();
export default tensorFlowService;
