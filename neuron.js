

// A class that implements the workings of an atomic neuron in a neural network
function Neuron(weights, bias) {
	this.inputs = [];
	this.value = null
	this.weights = [];
	this.bias = 0;
	if (typeof bias != 'undefined') {
		this.bias = bias;
	}
	weights.forEach(w => this.weights.push(w));
} Neuron.prototype = {

	constructor: Neuron,

	setNextInput: function(inputValue) {
		this.inputs.push(inputValue);
		if (this.inputs.length == this.weights.length) {
			this.calculateValue();
		}
	},

	calculateValue: function() {
		v = 0;

		for(i=0;i<this.inputs.length;i++) {
			v += this.weights[i]*this.inputs[i];
		}

		v += this.bias;

		v = this.sigmoid(v);

		this.value = v;
	},

	sigmoid: function(n) {
		return Math.pow(Math.E, n) / (1 + Math.pow(Math.E, n));
	},

	getOutput: function() {
		return this.value;
	},

	reinit: function() {
		this.inputs = [];
		this.value = null;
	}

};


// You can get a result from a neural network for a given input data vector
function ForwardPass(neurons, inputs) {
	
	for(var layerNo=0;layerNo<neurons.length;layerNo++) { 
		if (layerNo == 0) {
			for(var inputItemNo=0;inputItemNo<inputs.length;inputItemNo++) {
				for(var currentLayerNeuronNo=0;currentLayerNeuronNo<neurons[layerNo].length;currentLayerNeuronNo++) {
					neuron = neurons[layerNo][currentLayerNeuronNo];
					neuron.setNextInput(inputs[inputItemNo]);
				}
			}
		} else {
			for(var prevLayerNeuronNo=0;prevLayerNeuronNo<neurons[layerNo-1].length;prevLayerNeuronNo++) {
				for(var currentLayerNeuronNo=0;currentLayerNeuronNo<neurons[layerNo].length;currentLayerNeuronNo++) {
					currentNeuron = neurons[layerNo][currentLayerNeuronNo];
					prevNeuron = neurons[layerNo-1][prevLayerNeuronNo];
					currentNeuron.setNextInput(prevNeuron.getOutput());
				}
			}
		}
	}

	result = [];

	for(var i=0;i<neurons[neurons.length-1].length;i++) {
		outputNeuron = neurons[neurons.length-1][i];
		result.push(outputNeuron.getOutput());
	}

	return result;

}


// Resets the inputs and the values of the neurons in the neural network, so you can
// use it again with an other input vector
// (It does not touch the trainable parameters - weights and bias)
function ReinitializeNeurons(neurons) {
	for(var layerNo=0;layerNo<neurons.length;layerNo++) {
		for(var currentLayerNeuronNo=0;currentLayerNeuronNo<neurons[layerNo].length;currentLayerNeuronNo++) {
			neuron = neurons[layerNo][currentLayerNeuronNo];
			neuron.reinit();
		}
	}
	return neurons;
} 

