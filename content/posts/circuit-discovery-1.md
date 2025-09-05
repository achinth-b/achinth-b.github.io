---
date: "2024-12-10"
draft: false
tags:
- circuit-discovery
- mechanistic interpretability
title: "[PART 1] circuit discovery: what the hell is it?"
---

_This is part one of a series of posts about learning biased circuits in vision/language models. I want to publish a paper to ICML at the end of this._

Like most people, I don't know anything about this entire sub-field. 
It's exhausting, humbling and most of all - exciting to learn something new about how we can understand generative models. 

Thanks to [perplexity](https://www.perplexity.ai/), I get to learn what this subfield is. Let's get started.

## what is circuit discovery and how did we get here?

Circuit discovery is a technique from mechanistic interpretability which aims to identify and analyze the internals of generative models.
The abstraction tis technique interfaces with is on identifying 'circuits' - or more precisely, pathways through which transformers process information.

### contextual decomposition
One method method of circuit discovery in transformers is 'contextual decomposition (CD) for transformers'. This works by:

* recursive computation: CD recursively computes the contributions of all nodes (eg. attention heads, neurons) in the model's computational graph. This means that for each output, the method assesses how much each component controbutes to the output based on its interactions with other components. 

* equations: this method uses a set of well-defined equations which isolate the contributions of one model feature from another. This allows for a clear understanding of how specific features affect the overall behaviour of the model. 

* pruning: after the contributions have been calculated, CD applies a pruning step to removes node that insignificantly impact the output. THis step simplifies the discovered circuit and focuses on the most relevant components. 

#### advantages and disadvantages of contextual decomposition
Having been evaluated over several circuit evaluation tasks such as indiret object identification and greater-than comparisons, CD has a high degree of faithfulness to the original model's behaviour, replicating its performance for fewer nodes than competing approaches. It also doesn't require manual crafting of examples or additional training, making it applicable across various transformer architectures.


### sparse autoencoders
Sparse autoencoders (SAEs) are a specialized type of autoencoder which focuses on learning efficient represntations of data by enforcing sparsity in encoded representations. This works by: 

* compressing input data into a lower-dimensional representation and a decoder that reconstructs the original input from this representation - with the added benefit of enforcing a sparsity constraint in the latent space by adding it to the loss function (which I just was reminded - is L1 regularization.)

* breaking down neural networks into understandable components without requiring labelled examples. Since sparsity is enforced, most noisy variables are ignored as well as irrelevant information. 