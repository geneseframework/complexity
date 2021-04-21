# What is Cognitive Complexity and how to use it ?

## Definition

In the domain of software development, the Cognitive Complexity could be approximately defined as "the difficulty for a human being to understand some code snippet". This definition seems to be clear and without ambiguities, but it is not. On my opinion, the main problem is in the word "difficulty": what does it mean and how to measure it ? That's why, in this article, I will use a more precise definition, which uses a notion which could be measure in the real world: the time.

> **Definition**
>
> The Cognitive Complexity is the time required by a human being to understand some code snippet.
>
This definition is still ambiguous: who is this human being ? What means "understand" ? All these questions are important and should be clarified. I'll try to do it in a future article. For now, let's use the definition above.

## What is the purpose of the Cognitive Complexity ?

The understandability of the code is probably the most important component of the maintainability of a software. It is hard and painful to modify or fix bugs in a code which is difficult to understand, especially if it's not you which wrote it. A non-understandable code is a dead code.

The cost of the creation of a software is only a part of its life-cycle cost: its maintenance is sometimes much more expensive than its creation. That's why the cognitive complexity is a so important indicator: it is a good indication of the difficulty to maintain the code, and so a good indicator of its future cost.

## How to measure the Cognitive Complexity ?

The cognitive complexity is an active research area since more than 20 years. Unfortunately, its definition is different for each author, which leads to a lot of confusion. Given that the concept itself is not well-defined, each researcher uses its own definition, and his own proposition to measure it. Furthermore, in the purpose to differentiate their different results, they must use different terminologies to talk about very close concepts. For example, you will find in the academic literature some words like "psychological complexity", "code understandability", "software understandability", etc. Since the objective of this article are the vulgarisation of the notion of cognitive complexity, I will not enter in details of all these definitions and simply describe how the cognitive complexity is "measured" by the well-known quality tool SonarQube.

### The Cognitive Complexity for SonarQube

SonarQube is probably the most well-known open-source software quality tool. As far as I know, it's the only one which uses explicitly the concept of Cognitive Complexity. They explain how they measure it in a document called "Cognitive complexity: a new way to measure understandability" written by Ann Campbell for the SonarSource company in 2017. You will find all information about it on this document, but I will explain here the main principles of their algorithm.

At first, they assign some "weight" to code structures which should increase cognitive complexity. For example, they assign the weight 1 to an `if` or a `for` which is not nested in another `if`, `for`, or something else breaking the linear flow. Then, they calculate a "cognitive complexity score" by adding all the weights of the code snippet.

This is a well-known technique which is used in many academic papers since decades, and it is on my opinion a good approach of the measure of the cognitive complexity. Their methodology is described here :

> **Basic criteria and methodology**
>
> A Cognitive Complexity score is assessed according to three basic rules:
> 1. Ignore structures that allow multiple statements to be readably shorthanded into one
> 2. Increment (add one) for each break in the linear flow of the code
> 3. Increment when flow-breaking structures are nested
>
>
> Additionally, a complexity score is made up of four different types of increments:
>
> 1. Nesting - assessed for nesting control flow structures inside each other
> 2. Structural - assessed on control flow structures that are subject to a nesting increment, and that increase the nesting count
> 3. Fundamental - assessed on statements not subject to a nesting increment
> 4. Hybrid - assessed on control flow structures that are not subject to a nesting increment, but which do increase the nesting count

**Example (in TypeScript)**
```ts
function myMethod(): void {
  try {
    if (condition1) { // +1
        for (int i = 0; i < 10; i++) { // +2 (nesting=1)
            while (condition2) { … } // +3 (nesting=2)
        }
    }
  } catch (err) { // +1
       if (condition2) { … } // +2 (nesting=1)
  }
} // Cognitive Complexity 9
```

SonarQube is using some other rules to increase or decrease the score when something is intuitively increasing or decreasing the difficulty to understand the code. For example, they don't increase the score when you use a nullish-coalescing operator instead a `if`, because it's intuitively easier to understand with this short-handing:

**Example (in TypeScript)**
```ts
let name: string;
if (a) {
    name = a.name;
} // Cognitive Complexity 1
```
```ts
let name = a?.name; // Cognitive Complexity 0
```
## References

- Software understandability

  J. Lin and K. Wu. A Model for Measuring Software
  Understandability. In Computer and Information
  Technology, 2006. CIT’06. The Sixth IEEE
  International Conference on, page 192. IEEE, 2006

