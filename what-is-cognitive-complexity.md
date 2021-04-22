# What is Cognitive Complexity and how to use it ?

## Definition

In the domain of software development, the Cognitive Complexity could be approximately defined as *"the difficulty for a human being to understand some code snippet"*. This definition seems to be clear and without ambiguities, but it is not. The main problem is in the word "difficulty": what does it mean and how to measure it ? That's why, in this article, I will use a more precise definition, which uses a notion which could be measure in the real world: the time.

> **Definition**
>
> The Cognitive Complexity is the time required by a human being to understand some code snippet.
>
Unfortunately, this definition is still ambiguous: who is this human being ? What means *"understand"* ? All these questions are important and should be clarified. I'll try to do it in a future article. For now, let's use the definition above.

## What is the purpose of the Cognitive Complexity ?

The understandability of the code is probably the most important component of the maintainability of a software. It is hard and painful to modify or fix bugs in a code which is difficult to understand, especially if it's not you which wrote it. A non-understandable code is a dead code.

The cost of the implementation of the code is only a part of its life-cycle cost of a software: its maintenance is frequently more expensive than its creation. That's why the cognitive complexity is a so important indicator: it is a good way to evaluate the difficulty to maintain the code, and therefore a good indicator of its future cost.

## How to measure the Cognitive Complexity ?

The research area around the idea of cognitive complexity is active and fertile since more than 20 years. Unfortunately, the definition of this concept is different for each author, which leads to a lot of confusion. Given that the concept itself is not well-defined, each researcher uses its own definition, and his own measurement technique.

Furthermore, in the purpose to differentiate their different results, the authors must use different terminologies to talk about very close concepts. For example, you will find in the academic literature the notions of *"psychological complexity"*, *"code understandability"*, *"software understandability"*, etc. All these terms are describing something close to the intuitive notion of cognitive complexity described above.

Since the objective of this article is only the vulgarisation of the concept of cognitive complexity, I will not enter in details of all these definitions, and I will simply describe how the cognitive complexity is "measured" by the well-known quality tool SonarQube©.

## The Cognitive Complexity for SonarQube©

### The tool

SonarQube© is probably the most well-known open-source software quality tool (and my favourite). As far as I know, it's the only one which uses explicitly the concept of Cognitive Complexity. They explain how they measure it in a document called [*"Cognitive complexity: a new way to measure understandability"*](https://www.sonarsource.com/docs/CognitiveComplexity.pdf) written by Ann Campbell for the SonarSource© company in 2017. I will explain now its main ideas.

At first, SonarQube© assigns some "weight" to code structures which should increase cognitive complexity. For example, they assign the weight 1 to a `if` or a `for`. If this `if` or this `for` is nested in another `if` or `for` or something else breaking the linear flow, they add 1 for each nesting rank. When all the weights are assigned to the different elements of the code snippet, they calculate a "cognitive complexity score" by adding all these weights.

This is a well-known technique which is used in many academic papers since decades, and it is on my opinion a good way to "measure" the cognitive complexity. Their methodology is described here :

> **Basic criteria and methodology**
>
> A Cognitive Complexity score is assessed according to three basic rules:
> 1. Ignore structures that allow multiple statements to be readably shorthanded into one
> 2. Increment (add one) for each break in the linear flow of the code
> 3. Increment when flow-breaking structures are nested

**Example** (in TypeScript)
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
} // Cognitive Complexity = 9
```

SonarQube© uses some other rules to increase or decrease the score when something is intuitively increasing or decreasing the difficulty to understand the code. For example, they don't increase the score when you use an optional-chaining operator instead a `if`:

**Example** (in TypeScript)
```ts
let name: string;
if (a) { // +1
    name = a.name;
} // Cognitive Complexity = 1
```
```ts
let name: string;
name = a?.name; // Cognitive Complexity = 0
```

As I said above, the principle of using weights and rules to calculate something called "cognitive complexity" is not new, far from it. However, the rules and the weights used by SonarQube© are specific to SonarQube©. Are they relevant ? Let's look at that.

### Is SonarQube©'s cognitive complexity score relevant ?

At first, let's remember the most important: the cognitive complexity is a notion relative to human cognition. Consequently, we will ***never*** be able to write an algorithm which will return a score reflecting the exact value of the cognitive complexity (defined as above). Never. We *maybe* could calculate a good approximation of something measuring the time needed to understand a snippet code for a human being, but never an exact value. This point is probably the most important of this article.

Now, can we consider the SonarQube©'s algorithm as a good approximation of the cognitive complexity defined as above ? Let's leave aside the ambiguities about the terms *understand* and *human being* of the definition of the cognitive complexity, and let us concentrate on what we should measure: the time.

It is very likely that no one tried to measure the mean time to understand some code snippet with the help of the SonarQube©'s algorithm. So, my first conclusion is: nothing demonstrates the correlation between the results of this algorithm and the measure of the cognitive complexity with the definition written above. That doesn't mean that there is no correlation, but that we can't assert it.

However, intuitively, the rules and the weights of their algorithm seem to be consistent with our intuitive idea of complexity. So, for now, let us assume that there is a real correlation. In this case, what are the limits of the validity of their algorithm ? And how could it be improved ?

### Limitations of the SonarQube©'s algorithm

* **A problem of weight**

  At first, let's remember the main idea of the SonarQube©'s algorithm: it is more difficult to understand a `if` which is nested in another `if` than a `if` which is alone. That's not proven, but we can reasonably think that it is true.

  **Example**
  ```ts
  if (a > 0) {      // +1
    if (b > 0) {    // +2 (nesting=1)
        // Do something
    }
  } // Cognitive Complexity = 3
  ```
  OK, it is probably true that it is more complicated to understand the second `if` because it is nested inside the first one. However, is it really *2 times* more complicated than the first `if` ? Why not 3, or 1.5 ? Do we really need 2 more time to understand the second `if` ? If *in reality* it's not 2 but 1.9, the approximation is good. If it's nearer to 1.1, we should seriously doubt of the validity of the score given by SonarQube©.

* **A problem of differentiation**

  Now, let's think about what really implies the fact to assign the same weight to each `if` (not nested). That means that the two code snippets below will have the same cognitive complexity score :

  ```ts
  if (a > 0) { ... } // Cognitive Complexity = 1
  ```

  ```ts
  if (this.someMethod(a) > this.someProperty[2] + this.otherProperty - 1) { ... } // Cognitive Complexity = 1
  ```

  There is no doubt that the second example is more difficult to read and understand than the first one, but the score given by SonarQube© is the same. It is a problem.

* **A problem of length**

  In reality, the cognitive complexity score returned by the SonarQube©'s algorithm not depends on the length of the code snippet. For example, a method with 50 lines without elements increasing the cognitive complexity (defined on SonarQube©'s sense) will have a score which will simply be equal to 0 !

  If we admit that the cognitive complexity is defined by *the time required by a human being to understand some code snippet*, all the code snippets should have a score strictly higher than zero. Even if there is only one word, you must read this word and understand it, and you will need some time for that.

  Other little problem: in the real world, two identical lines should have different cognitive complexity !

  **Example**
  ```ts
    let a = 1; // cognitive complexity: x
    a = a * 2; // cognitive complexity: y
    a = a * 2; // cognitive complexity: z > y
  ```

  In the example above, the third line has a complexity `z` strictly higher than the complexity `y` of the second line. Why ? Because on the third line, you must remember what happened in the previous lines to be able to calculate the new value of `a`.
  This problem is not taken into account in the SonarQube©'s algorithm.

* **A problem of missing rules**

  No one set of rules will ever be able to measure perfectly the cognitive complexity of a code snippet. As we said above, we only can try to give an approximative value. The SonarQube©'s rules are no exception to the rule (excuse the bad pun). Some important things slip through the cracks...

  **Example**
  ```ts
  function hyperComplex<T>(object: Object, path: string | string[] = '', value: any): CallbacksMock<T> {
    path = path.toString().match(/[^.[\]]+/g);
    path.slice(0, -1).reduce((acc: any, curr: any, index: number) => {
        const arg = Math.round(index) % 3;
        acc(0);
        return Object(acc[curr]) === acc[curr + arg][0];
    }, object)[path[path.length - 1]] = value;
    return new CallbacksMock<T>(object);
  }
  ```

  Do you understand what is doing the function above ? Yes ? Congratulations ! Me, no...
  If you had not understood, you should be a little offended, because for SonarQube©'s algorithm, the cognitive complexity of this function is equal to 0 !

  Normal: no `if`, no `switch`, no `for`, no `while`, etc. Of course, this example is an extreme case, but it shows clearly that a code snippet which is very difficult to understand may have a low SonarQube©'s cognitive complexity score.

### Should we continue to use the SonarQube©'s Cognitive Complexity score ?

Yes, of course ! Their algorithm is not perfect, that's sure, but as far as I know, SonarQube© is the only open-source tool which gives an approximation of the cognitive complexity.

Even if this tool is far from perfect, it will highlight some functions which have too many nested `if` or `for`, for example, and you'll be able to refactor them. That's why, on my opinion, you should continue to use this tool.

## Could we write a better algorithm ?

Absolutely ! It is not so difficult to add some rules to fix the problems described above. In fact, it will not be a real fix because, as we said, we will never be able to give the exact value of the cognitive complexity. However, we can add rules which will give us a better approximation of the reality.

That's what I did: I created an open-source module which is able to give, on my opinion, a much better "measure" of the cognitive complexity. Of course, it is just my opinion, and as no one measured the cognitive complexity in the real world, it is impossible to prove it. You will form your own opinion.

This module, [@genese/complexity](https://github.com/geneseframework/complexity), is now a part of *@TheComplexityProject*, which is a collective open-source project whose aim is to provide a better knowledge on software complexity.

@genese/complexity takes into account the length of the code, the loops (`for`, `while`, ...), the logic doors (`AND`, `OR`), the conditions (`if`, `else`, `switch`, ...), the recursions, the callbacks, the nesting, the aggregation and a lot of other little things.

Like on the SonarQube©'s algorithm, I use weights which are arbitrary by nature. That's only when we will experimentally measure the time required to understand some code snippets that we will be able to use non-arbitrary coefficients.

## Contribute to the improvement of the knowledge !

The main idea of *@TheComplexityProject* is this one: we will never be able to measure exactly the cognitive complexity, but we could write an algorithm which will return every day a better approximation than the day before.

The weights used in the @genese/complexity module are not fixed for the eternity: they will change each time that the experimentation or the opinion of the community will tell us that we should change it. *@Complexity* is a collective project, and we need your help. Do you have a different opinion on the weights that we should assign ? Tell us. Are you able to demonstrate that some elements of our algorithm are wrong ? Tell us ! Are you a scientific, a researcher which is studying the concept of cognitive complexity ? You are welcome !

## Acknowledgements

I'm not the only one which worked on the *@TheComplexityProject*: many friends or colleagues helped me, and I want to thank all of them for the trust they placed in me and for their contribution to the code of the @genese/complexity module :

By alphabetical order :

* M'hamad Abbas
* Fabien Brisset
* Thibault Fischer
* Cédric Girard
* Albert Grisvard
* Bachir Guendouz
* Laurenne Kocher
* Alexandre Kueny
* Vincent Marignier
* Gabriel Martin
* Samir Mimoun
* François Planet
* Thibaud Thedon

