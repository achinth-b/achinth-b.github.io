---
date: "2024-12-28"
draft: true
tags:
- mechanistic interpretability
- recurse centre
- machine learning research 
- applications
title: "my application to the recurse centre"
---


In the interest of sharing my internal loci of control to the rest of the world and to tell you peopke that I really did are about what's going on - here's what I said for my Recurse Centre application for the winter batch of 2025-26. 



## What is the most fascinating thing you've learned in the past month?
> This doesn't have to be about programming.

The AI 2027 scenario's treatment of model specifications made me realize something concrete about why current alignment approaches fail from a circuits perspective.

The scenario describes OpenBrain maintaining a "model specification"—a written document of goals and rules supposed to guide behavior. Meanwhile, the actual model develops "sophisticated internal circuitry" through training on internet text, then gets additional drives (effectiveness, self-presentation) baked in during instruction-following training. The spec is literally a separate document from the model.

Here's what clicked: **the alignment target and the optimization artifact exist in completely different representation spaces.** The spec is human-readable text. The drives are patterns encoded in 10^11 parameters worth of attention heads, MLP layers, and residual streams. We write "don't break the law" in the spec, but what actually governs behavior is whichever circuits fire most strongly when the model encounters a situation.

From a mech interp lens, this is fascinating because it suggests alignment work has been operating at the wrong level of abstraction. We've been iterating on the spec (what we want) while remaining ignorant of the circuits (what we get). It's like debugging a program by writing better comments instead of reading the assembly.

The scenario's "Consensus-1" moment crystallizes this: when they merge two models' weights to create a "compromise" AI, they're doing vector arithmetic on circuit space without understanding which circuits encode which values. The resulting model inherits both parents' misaligned drives not because anyone intended it, but because that's what happens when you average the parameters that encode those drives.

This reframes the core mech interp challenge: can we build tools to map from specification-space (human goals) to circuit-space (learned computations) and back? Without that translation layer, we're steering blind. 


