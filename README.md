# @genese/complexity [![npm version](https://badge.fury.io/js/%40genese%2Fcomplexity.svg)](https://badge.fury.io/js/%40genese%2Fcomplexity)

@genese/complexity analyzes the source code of your project and "measures" the cognitive complexity of each code snippet. It creates an HTML report displaying an overview of the complexities index for each folder, file or method of your project. Moreover, you will find for each method the elements increasing the cognitive complexity, which will help you to refactor your code.

This module is a part of the [@genese]('https://github.com/geneseframework/genese') tool suite which is an opensource project whose aim is to provide tools helping developers to code faster and with a better code quality.

@genese/complexity is also a part of the [*@TheComplexityProject*](#8-thecomplexityproject).

![Dashboard @genese/complexity](./readme-dashboard.png?raw=true "Dashboard")

## Table of Contents
* [Why use @genese/complexity ?](#1-why-use-genesecomplexity-)
* [Installation](#2-installation)
* [Usage](#3-usage)
* [Interpretation of results](#4-interpretation-of-results)
    * [Folder reports](#41-folder-reports)
    * [File reports](#42-file-reports)
* [Configuration](#5-configuration)
    * [Thresholds](#51-thresholds)
    * [Folders to ignore](#52-folders-to-ignore)
    * [Path of folder to analyze](#53-path-of-folder-to-analyse)
    * [Reports path](#54-reports-path)
    * [Frameworks](#55-frameworks)
* [Cyclomatic complexity](#6-cyclomatic-complexity)
    * [Definition](#61-definition)
* [Cognitive complexity](#7-cognitive-complexity)
    * [Definition](#71-definition)
    * [Measure unit](#72-measure-unit)
    * [Complexity Index](#73-complexity-index)
    * [Complexity Factors](#74-complexity-factors)
    * [Factor categories](#741-factor-categories)
    * [Table of weights](#742-table-of-weights-v100)
* [*@TheComplexityProject*](#8-thecomplexityproject)
    * [How to contribute ?](#81-how-to-contribute-)
    * [Add new languages](#82-add-new-languages)
    * [Add use-complexity for other languages and libraries](#83-add-use-complexity-values-for-other-languages-or-libraries)
* [Specifications](#9-specifications)
    * [Kinds of nodes](#91-kinds-of-nodes)
    * [JsonAst specifications](#92-jsonast-specifications)
    * [Structure of the AST nodes](#93-structure-of-the-ast-nodes)
    * [Exhaustive list of the kinds of node](#94-exhaustive-list-of-the-kinds-of-node)


## 1. Why use @genese/complexity ?

@genese/complexity is an audit tool which allows you to identify quickly the bad practices concerning cognitive or cyclomatic complexity.
With this module, you will be able to find quickly the methods with too high complexity index and which should be examined carefully.
@genese/complexity is available for JS, TS, JSX, TSX and JAVA.

[Top](#table-of-contents)
## 2. Installation

@genese/complexity is used through the [@genese/cli](https://www.npmjs.com/package/@genese/cli). You need to install it first:

```sh
npm i -g @genese/cli
```

Then, you can install the @genese/complexity module:

```sh
npm i -g @genese/complexity
```

[Top](#table-of-contents)
## 3. Usage

@genese/complexity is launched with the Genese CLI module. The main command-line is

```sh
genese cpx [pathDir]
```

The "pathDir" param is the folder of the project to audit. It can be relative or absolute.

***Example:***
```sh
genese cpx ./src
```

By default, @genese/complexity is launched for TS files.
You can modify this with the `-l` option

***Exemple:***
```sh
genese cpx -l java ./src
```
Available options are: `ts`, `js`, `tsx`, `jsx` and `java`.

This command line will generate a report in the folder `genese/complexity/reports` (it can be customized) named `folder-report.html`. You just need to open it in a browser to display the results.

[Top](#table-of-contents)
## 4. Interpretation of results

### 4.1 Folder reports

The dashboard's header presents the global statistics of the analyzed project. These scores will give you an overview of its global complexity.

The main part of the page consist in two pairs of charts : the left one is about cognitive complexity and the other one about cyclomatic complexity. The "doughnut chart" is an overview of the distribution of the project's methods statuses (correct, warning and error). The statistics near this chart are reminding warning and error thresholds (which can be customized), and display the number of methods by status.

The bar charts display the number of methods by complexity score.

Below these charts, the first array displays the detailed information of each subfolder. The second presents information of the files inside the current folder (but not inside its subfolders), and the third array displays the complexity indexes of each method of each file located in the current folder or its subfolders, sorted by decreasing cognitive complexity index.

### 4.2 File reports

As folder reports, the file reports display complexity statistics of files methods. In addition, you will find detailed information of each of these methods, with explanations of the calculation mode of their cognitive complexity.

[Top](#table-of-contents)
## 5. Configuration

Some parameters are configurable by creating a file `geneseconfig.json` located on the folder where you enter the command-line. This file must have this format :

 ```json
{
    "complexity": {
        "option": "value"
    }
}
```

### 5.1 Thresholds

You can customize the warning and error thresholds of each kind of complexity like this :

 ```json
{
    "complexity": {
        "cognitiveCpx": {
            "errorThreshold": 15,
            "warningThreshold": 10
        },
        "cyclomaticCpx": {
            "errorThreshold": 15,
            "warningThreshold": 10
        },
    }
}
```

The values by default are :

 ```json
{
    "complexity": {
        "cognitiveCpx": {
            "errorThreshold": 10,
            "warningThreshold": 5
        },
        "cyclomaticCpx": {
            "errorThreshold": 10,
            "warningThreshold": 5
        },
    }
}
```

### 5.2 Folders to ignore

You can ignore some folders like this :

```json
{
    "complexity": {
        "ignore": [
            ".git",
            ".idea",
            "api",
            "/node_modules",
            "./genese"
        ]
    }
}
```

The folders ignored by default are `/node_modules` and `./genese`.

### 5.3 Path of folder to analyse

By default, the folder to analyse is the folder where you enter the command-line. You can change it like this :

```json
{
    "complexity": {
        "pathFolderToAnalyze": "./src/"
    }
}
```

The last character must be a slash.

### 5.4 Reports path

By default, the genese complexity report will be located here : `current_folder/genese/`. You can change it like this:

```json
{
    "complexity": {
        "pathReports": "./my-report-folder"
    }
}
```

### 5.5 Frameworks

Some frameworks may need specific calculations to be able to display a report relevant with their specificities.

* **React**

The React functional components are huge arrow functions containing some logic and Jsx code. Without specific configuration, @genese/complexity would only display the complexity index of this huge arrow function, which is not very relevant: a component may be huge without any bad coding practice.

The option in command-line `-f react` activates the analysis specific to React. With this option, the React hooks and the arrow functions nested in the ReactComponent are extracted and analyzed separately.

**Example**

```
genese cpx ./src -f react
```

[Top](#table-of-contents)
## 6. Cyclomatic complexity

### 6.1 Definition

The cyclomatic complexity is defined as below :

>#### Cyclomatic Complexity
> The cyclomatic complexity is a quantitative measure of the number of linearly independent paths through a program’s source code

This notion is a good way to calculate the number of unit tests that we must do to validate the behavior of a method for every possible case. The cyclomatic complexity is highly correlated to the time required to cover all the source code by unit tests.

The force of the cyclomatic complexity is its simplicity: approximately, all breakflows (for, if, switch, ...) increase the complexity score of 1. However, this score is weakly correlated to the maintainability of the source code, which is much more important: even if your code coverage is excellent, a source code which is too complex to understand will be unmaintainable.

If you are a developer, you will read your code differently than a machine would do it. So if you want to know if your code is really maintainable, you must look at its cognitive complexity.

[Top](#table-of-contents)
## 7. Cognitive complexity

A project is maintainable if each method of each file is easy to understand. That is the goal of the cognitive complexity, which should probably be seen as the most important indicator of the code maintainability.

### 7.1 Definition

The cognitive complexity could be defined as below :

>#### Cognitive Complexity
> The Cognitive Complexity of a code snippet is the time required by a human being to understand it.

The definition above needs to be clarified: who is this human being ? What means exactly "understand" ? And how could we measure this time in the real world ? All of these questions are important, and will be detailed in a future article.

For now, let's use this approximative definition, and let's try to clarify another question : what is difficult to understand and what is not ? Is an `if - else` more complex than a `for`, a `while` or a `switch` ? How many times a recursive method is more complex than a "normal" one ? Optional chaining or nullish coalescing clearly decrease the complexity of a method, but in which proportion ? There are no indisputable responses.

In the future, when we will agree with some experimental protocol, we will be able to do some measures in the real world. At this moment, we will be able to check if, for example, a `if` nested in another `if` is more difficult to understand than a `if` alone, and if yes, how many times more complex it is.

Today, we only can weight each code structure according to our experience and our intuition. To be able to do that, we need to define the measure unit of the cognitive complexity.

### 7.2 Measure unit

The cognitive complexity is *the time required by a human being to understand some code snippet*. That means that when we want to measure the cognitive complexity, we need to measure a duration. That's why the measure unit of the cognitive complexity is the same than the measure unit of time, *i.e.* the second.

>#### Measure unit
> The measure unit of the Cognitive Complexity is the second.

>#### The Cognitive Complexity function
> We call *c* the function *c: **S** -> **R**<sup>+</sup>* where **S** is the set of all code snippets and **R**<sup>+</sup> the set of real positive numbers which assign to a given code snippet its cognitive complexity.
>
> In other terms, if *s* is a given code snippet, *c(s) = cognitiveComplexity(s)*.

### 7.3 Complexity Index

Even if the natural measure unit of the cognitive complexity is the second, it is clear that it is not very convenient to write it directly in this unit. For example, the cognitive complexity for a simple `if` is probably around some milliseconds, and it will not be handy to write something like `c("if()") = 0.001023 s`. That's why we will define a score called the *complexity index* which represents the ratio between the cognitive complexity (in seconds) of a given code snippet, and the cognitive complexity (in seconds) of a code snippet *"reference"* that we will now define.

This complexity index must be relative to a piece of code "reference", something which can be defined accurately :

>#### Complexity Index
> The Complexity Index is the ratio between the cognitive complexity (in seconds) of a given code snippet, and the cognitive complexity (in seconds) of the code snippet *"reference"* equal to the keyword `if`.

In other words, the cognitive complexity of the keyword `if` is equal to the time required for a human being to understand that there is a conditional expression.

>#### The Complexity Index function
> We call *i* the function *i: **S** -> **R**<sup>+</sup>* where **S** is the set of all code snippets and **R**<sup>+</sup> the set of real positive numbers which assign to a given code snippet its complexity index.
> In other terms, if *s* is a given code snippet, *i(s) = complexityIndex(s)*.

>#### Consequence
> The Complexity Index of the keyword `if` is equal to 1.
> This affirmation is equivalent to the equation : `i('if') = 1`.

Let us try to be more explicit: Let's call *s* the code snippet below :
```ts
if (a) {
    console.log(a);
}
```

We can affirm that *i(s) > 1* because *s* strictly includes the keyword `if`. The difficulty to understand a `console.log` is low, but not null.

That's the same with the code snippet *t* below :
```ts
if (a) {

}
```

We can affirm that *i(t) > 1* because *t* strictly includes the keyword `if`. The identifier `a` is not "nothing" and me bust be understood too.

>#### Conjecture
> The cognitive complexity of the code snippet "reference" `if` is equal to the lower limit of the cognitive complexities corresponding to the code snippets of type `if(...)`.

* Example

Assume that a `if` nested in another `if` is 1.5 times more long to understand than a `if` alone. In this case, we can write *i("nested keyword `if`") = 1.5*.

Generally speaking, if a code snippet *s* is two times longer to understand than a code snippet *t*, we can write *i(s) = 2i(t)* (and also *c(s) = 2c(s)*).

The following chapters provide an overview of the different ways to evaluate the Complexity Index.

### 7.4 Complexity Factors

The Complexity Index depends on multiple factors of different weights which can be grouped in several categories. These factors, weights and categories are for now only based on intuition and feedbacks: *they SHOULD NOT be interpreted as immutable and definitive values*. These elements are only the best way as things stand to measure the Complexity Index. With the help of the community and the increase of knowledge, the weights will be revalued, other factors will appear and other categories will be discovered.

Every time someone will demonstrate that a factor should be weighted differently or that another category should be taken into account, this page will be updated with a new version number.

#### 7.4.1 Factor categories

- ***Atomic***

Each unbreakable piece of code have a Complexity Index which is weak, but not null. The name of a variable or a method, a keyword like `this`, `import`, `class`, `if`, ... are trivial, but they need to be red, taken in account and memorized by the human brain. A long method, even without particular problems, is more difficult to understand than a short function having the same "density of complexity".

Each of these trivial nodes have a non-null Complexity Index due to their existence. @genese/complexity uses an "atomic weight" equal to 0.1.

- Example

```ts
if (a) {  // ------------------------- + 0.2 (0.1 for the "if" and 0.1 for the "a")
    console.log(a);  // -------------- + 0.3 (0.1 for the "console", 0.1 for the "log" and 0.1 for the "a")
}
```
=> Total of atomic complexity : 0.5

- ***Structural***

Some code structures present an intrinsic difficulty which implies that the human brain needs a significant time to take in account their logic implications. The cognitive complexity relative to the intrinsic difficulty of these code structures is called the ***structural complexity***.

The structural category contains different factors: the loops (`for`, `while`, ...), the logic doors (`&&`, `||`), the conditions (`if`, `else`, `switch`, ...), the recursions, the callbacks, the regular expressions, etc. All the methods (language methods like `slice`, `map`, `push`, ... and methods of the project and its imported libraries) are increasing structural complexity too. You will find the exhaustive list of the structural factors [in the table below](#632-table-of-weights-v100).

- ***Nesting***

Independently of their intrinsic complexity, some elements add specific difficulty due to the nesting of other elements inside them.

- Example

  The complexity of the code below is only due to the addition of the complexities of the two `if` : there is no nesting complexity.

```ts
if (a) { // ------------------------------ + x
    // ----
}
if (b) { // ------------------------------ + y
    // ----
}
```
=> Complexity Index : `x + y`

If the first condition has a Complexity Index equals to `x` and the second equals to `y`, the total Complexity Index will be equal to `x + y`.

Now, if the same conditions are nested, an additional difficulty is due to the obligation in the second `if` to remember that the condition `a` must be true to be here. This additional complexity is called `nesting complexity` and increases the Complexity Index of the source code, which will be strictly higher than `x + y`.

- Example
 ```ts
if (a) { // ---------------------------------- + x
    if (b) { // ------------------------------ + y + n (the nesting complexity due to the imbrication in the first "if")
        // ----
    }
}
```
=> Complexity Index : `x + y + n`

@genese/complexity adds nesting complexity for the loops (`for`, `while`, ...), the conditions (`if`, `else`, `switch`, ...), the ternaries (`a = b ? 0 : 1`), the arrays (`a[b[c]]`) and the functions (`a = b.f(e => e + 1))`).

- ***Aggregation***

Aggregation complexity is almost the same that nesting complexity, but is relative to consecutive elements and not to nested elements. The idea is simple : an array is simple to understand, but an array of arrays is clearly less trivial. This additional complexity is due to the aggregation of the different elements.

- Example
```ts
const arr = a[b][c];  // ------------------------ + 1 aggregation cpx
```

We find this problematic with array of arrays, but also in other cases, like regular expressions : they have at first a structural complexity (a regex is difficult for itself), but they have too a specific difficulty in relation with their length, that is, the aggregation of their characters. increases considerably their difficulty. Of course, other factors affect the complexity of the regular expressions, but we use for now their length as a first approximation.

- Example
```ts
const regex = /[^.[\]]+/;  // ------------------------ + 0.8 aggregation cpx (0.1 by character)
```

Another use case of the aggregation complexity is logic doors, which are simple to understand when they are similar and complicated when they are different and without brackets.

- Example
```ts
if (a && b && c) { // ---------------------- Easy to understand (same logic doors)
    // ---
}
if (a && (b || c)) { // -------------------- Easy to understand (thanks to brackets)
    // ---
}
if (a && b || c) { // ----------------- Difficult to understand (due to the lack of brackets) => + 1 aggregation cpx
    // ---
}
```
The third example is more difficult to understand than the first and the second one because of the aggregation of different logic doors without brackets.

- ***Recursion***

Recursivity is easy for machines, but not for humans. A developer will always need to take care about the implications of a recursion and its side effects.

The category "recursion" includes `recursive methods` and `callbacks`.

- Examples

```ts
function f(a) {
    return f(a + 1);
}
```

```ts
function f(a) {
    return a(1);
}
```

- ***Use***

The other categories were relative to the complexity relative with the structure of the code (loops, conditions, recursivity, etc.). There is another kind of cognitive complexity which is induced by the difficulty to understand the role and the use of a Node. It's typically important when the Node is a method : we need to understand what is its role and how to use it correctly.

- Examples

```ts
function f(a: string) {
    return a.toString();        // The method 'toString()' is easy to understand, no 'use complexity' to add
}
```

```ts
function f(a) {
    return a.map(...).reduce(...);      // The method 'reduce()' is difficult to understand and to use : we must add some 'use complexity'
}
```


#### 7.4.2 Table of weights (v1.0.0)

This table of weights should never be seen as the exact way to calculate the Complexity Index. It's only the best approximation on the basis of the current knowledge.

| Category | Factor | Weight | Example | Comments |
| ---      | ---    | :---:  | ---     | --- |
| Aggregation | Arrays | 1 | ```a[b][c] // ---- Aggregation cpx = 1```| |
| Aggregation | Regex | 0.1 by char | ```/[^.[\]]+/ // ---- Aggregation cpx = 0.8``` | |
| Aggregation | Different logic doors | 1 | ```if (a && b \|\| c) // - Aggregation cpx = 1``` | The brackets cancel the aggregation complexity |
| Atomic | Atomic | 0.1 | ```console.log(3) // ---- Atomic cpx = 0.3 (3 atoms)``` | Applies to each identifier, parameter, keyword, literal, etc. |
| Nesting | Arrays | 1.5 | ```a[b[c]]``` | |
| Nesting | Conditions | 0.5 | ```if (a) { ```<br/>  ``` if (b) { // ---- Nesting cpx = 0.5```<br/>    ``` if (c) { // ---- Nesting cpx = 1 ```<br/>    ``` } ```<br/>  ``` }```<br/>```}``` | Applies to `if`, `else`, `else if`, `switch` |
| Nesting | Loops | 0.5 | ```for (const a of arr) { ```<br/>  ```for (const b of otherArr) { // ---- Nesting cpx = 0.5 ```<br/>  ```    } ```<br/>``` }``` | Applies to `for`, `forEach`, `do ... while` |
| Nesting | Ternaries | 1 | ```a = b ? c ? : 0 : 1;``` | |
| Recursion | Recursive methods | 3 | ```f(a) { ```<br/>  ``` return f(a + 1); ```<br/>``` }``` | |
| Recursion | Callbacks | 2 | ```f(a) { ```<br/>  ```return a(2); ```<br/>``` }``` | |
| Structural | Conditions | 1 | ```if (a) { ... }``` |  Applies to `if`, `else`, `else if`, `switch` |
| Structural | Functions | 1 | ```a.filter(elt => { ... })``` |  |
| Structural | Jumps | 1 | ```for (const a of arr) { ```<br/>  ```if (b) { ```<br/>    ```continue;```<br/>  ```}```<br/>```}``` |  Applies to elements breaking loops |
| Structural | Logic door | 1 | `&&` or <code>&#124;&#124;</code> | |
| Structural | Bit door | 1 | `<<` or `>>` or `>>>` or `&` or <code>&#124;</code> or `^` | |
| Structural | Loops | 1 | ```for (const a of arr) { ... }``` |  Applies to `for`, `forEach`, `do ... while` |
| Structural | Methods | 1 | ```a.slice(1)``` | Applies to each method, defined in the current language or in the project itself |
| Structural | Regex | 1 | ```/[^.[\]]+/ // ---- Structural cpx = 1``` | |
| Structural | Ternary | 1 | ```const a = b ? 0 : 1;``` | |



[Top](#table-of-contents)
## 8. *@TheComplexityProject*

### 8.1 How to contribute ?

@genese/complexity is a part of *@TheComplexityProject*, which is a collective open-source project whose aim is to provide a better knowledge on software complexity. You can contribute to this project in many ways.

The measure of the cognitive complexity will always be a simple approximation. The time required for a human to understand a source code depends on thousands of factors which must be studied severely. Our goal is only to give the better approximation of the measure of the Cognitive Complexity, that is, the Complexity Index.

You can help in many ways by confirming, refuting or specifying the actual mode of computation of the Cognitive Complexity. This page is the receptacle of the different propositions coming from the community. Of course, we accept results coming from research labs or statistic studies, but simple feedbacks coming from developers themselves are welcome ! Each element or idea which is able to improve our algorithm is welcome. If you think that something is wrong in our approach, your opinion is welcome. If you think about a new complexity factor or a new way to estimate some kind of complexity, your idea is welcome too !

Each time the algorithm will be updated, the version indicated at the top of the Table of Weights will be updated too.

### 8.2 Add new languages

@genese/complexity is available for JS, TS, JSX, TSX and JAVA, but you can "plug" any language into this module.
What does it mean ? To be simple, @genese/complexity parses a Json file with a specific format : [JsonAst](#92-jsonast-specifications).
This format corresponds to a simplified AST (Abstract Syntax Tree) of the source code.
So if you want to be able to "plug" your language into @genese/complexity, you "just" need to convert the specific AST structure of your language into JsonAst format.
In other words, your AST nodes must "match" with the nodes of the JsonAst format.
If your plugin is correct, we will add it to @genese/complexity module.

There are hundreds kinds of TypeScript AST nodes, so it can be fastidious to "bind" all of them to the AST nodes of your language. Fortunately, JsonAst only needs few kinds of nodes; you will find them [below](#81-kinds-of-nodes).

### 8.3 Add 'use complexity' values for other languages or libraries

In @genese/complexity, the `use complexity` is defined in Json files defining the `use complexity` values for methods which can increase significantly the difficulty to understand them. This is an 'in progress' feature, which is only able for now to add `use complexity` for TypeScript methods. We need at first to complete the list of TypeScript methods which have a significant `use complexity`. In a second time, we need to do the same for other languages : any help will be appreciated. And last but not least, we need to add `use complexity` Json files for libraries which are widely used.



[Top](#table-of-contents)
## 9. Specifications

### 9.1 Kinds of nodes

You will find below the list of all the different kinds of AST nodes. If you want to understand exactly what they mean, you may refer to the TypeScript documentation : for example, the node's kind `IfStatement` refers to the TypeScript AST node `ts.SyntaxKind.IfStatement`. The exhaustive list of TypeScript SyntaxKinds are accessible [here](https://github.com/microsoft/TypeScript/blob/master/lib/typescript.d.ts) (from line 77 to 447).

| Node Kind | Example | Comments |
| ------------ | ------- | -------- |
| AmpersandAmpersandToken | `&&` | The AND logic door. |
| ArrayType | `a: string[];` | The declaration of a type which is an array type |
| ArrowFunction | `() => { ... }`  | An arrowed function or method |
| BarBarToken | `\|\|` | The OR logic door. |
| BinaryExpression | `a > 0`<br/> `a === b`  | Comparison between two elements. |
| Block | `{ .... }`  | Abstract node containing some children nodes, like `IfStatement`. This node doesn't increase complexity (empty category). |
| CallExpression |  `a.filter(e => e + 1)` | Abstract node containing a call to a function. In this example, the CallExpression contains a first child which is a PropertyExpression (`a.filter`) and a second one which is an ArrowFunction (`e => e + 1`). |
| CatchClause | `try { ... }` <br/>`catch(error) { ... }` | This node is considered as a conditional node and increases the nesting complexity in the same way. |
| ClassDeclaration | `class MyClass { ... }` | Abstract node designating a declaration of a class. This node is the root node of a class. It doesn't increase complexity (empty category). |
| ConditionalExpression | `a = b ? 0 : 1;` | This node is a conditional node and increases the nesting complexity. In this example, the ConditionalExpression node have 5 children : Identifier `b`, QuestionToken `?`, NumericLiteral `0`, ColonToken `:` and NumericLiteral `1`. |
| DoStatement | `do { ... }` | Do instruction. Increases the nesting complexity. |
| ElementAccessExpression | `a[b]` | Considered as an array by`@genese/complexity. In this example, the ElementAccessExpression is a node with two children : an Identifier `a` and another Identifier `b`. |
| EndOfFileToken | `... }` | The last element of the source code. |
| ExpressionStatement | `a = b ? 0 : 1;`<br/> `a.filter(e => e + 1)` | Abstract node containing an expression, like a BinaryExpression or a CallExpression. This node doesn't increase complexity (empty category). |
| FirstAssignment | `let a = b === 1` | Abstract node corresponding to the `EqualsToken` in a binary expression. It doesn't increase complexity (empty category). |
| FirstStatement | `let a = 3;` | Abstract node declaring a variable (alias of VariableStatement). This node doesn't increase complexity (empty category). |
| ForStatement | `for (let i = 0; i < 2; i++) { ... }`  | For loop. Increases the nesting complexity. <br/>Caution : `a.forEach(...)` is considered by TypeScript as a PropertyAccessExpression and not as a ForStatement, but`@genese/complexity consider it as a classic `for` loop. |
| ForInStatement | `for (let a of arr) { ... }` | For loop with `in` statement. Increases the nesting complexity. |
| ForOfStatement | `for (let a of arr) { ... }` | For loop with `of` statement. Increases the nesting complexity. |
| FunctionDeclaration | `function f() { ... }` | Abstract node designating a declaration of a function. This node doesn't increase complexity (empty category). |
| FunctionExpression | `f(function(b) { ... }` | Abstract node designating a function expression. Increases the nesting complexity. |
| Identifier | `f(a) { ... }` | The node corresponding to the identifier of a variable, a function, etc. In this example, there are two identifiers : `f` and `a`. An identifier is considered by`@genese/complexity as an atomic node which increases the atomic complexity. |
| IfStatement | `if(a) { ... }` | The IF condition. Increases the nesting complexity. |
| Keyword | `return` | Alias for any language keyword (`let`, `const`, `var`, `export`, `return`, ...). Increases atomic complexity. |
| Literal | `2` <br/> `'a'` | Alias for any kind of literal assignment (`StringLiteral`, `NumericLiteral`, ...). Increases atomic complexity. |
| MethodDeclaration | `myMethod() { ... }` | Abstract node designating a declaration of a method. This node is the root node of the method. It doesn't increase complexity (empty category). |
| Parameter | `myMethod(a) { ... }` | Abstract node designating a parameter. <br/>Caution : the Parameter `a` is different than the Identifier `a`, which is a child of the AST node "Parameter". This node doesn't increase complexity (empty category). |
| PropertyAccessExpression | `a.b = 3;` | Abstract node designating the access to a given property. The first child (`a`) is the expression and the second (`b`) is the property. This node doesn't increase complexity (empty category). |
| RegularExpressionLiteral | `/a-z/g` | Regular expression. |
| SwitchStatement | `switch(a) { ... }` | Switch statement. Increases the nesting complexity. |
| ThisKeyword | `this.a = 3` | This keyword (returning context). Increases the atomic complexity |
| Union Type | `a: string \| number` | Union of two types. Increases the atomic complexity |
| VariableDeclarationList | `for (const elt of arr) { ... }` | Abstract node declaring a list of variables. In this example, the VariableDeclarationList is `const elt`. This node doesn't increase complexity (empty category). |
| WhileStatement | `while (a < 10) { ... }` | While loop. Increases the nesting complexity. |


@genese/complexity will consider all the other kinds of nodes as atomic nodes. This means that every node in the JsonAst which is not in the previous list file will add a cognitive complexity corresponding to atomic nodes, as `StringLiteral`, `TrueKeyword`, etc. If you don't want to increase complexity for a given kind of node, you will be able to set a property "empty" to true in the corresponding field of the JsonAst file.


### 9.2 JsonAst specifications


#### ***JsonAst***

This is the root document (the .json file itself)

- Fixed fields

| Field name | Type | Required | Description |
| ---------- | ---- | -------- | ----------- |
| astFolder  | AstFolder | yes | The object containing all the information about the folder to analyze |



#### ***astFolder***

Corresponds to a folder to analyze.

- Fixed fields

| Field name | Type | Required | Description |
| ---------- | ---- | -------- | ----------- |
| astFiles  | AstFile[] | no | The array of AstFile corresponding to the files inside the folder (but not inside its subfolders) |
| children | AstFolder[] | no | The array of AstFolder corresponding to the subfolders of this AstFolder |
| path | String | yes | The absolute path of the folder |


#### ***astFile***

Corresponds to a file to analyze.

- Fixed fields

| Field name | Type | Required | Description |
| ---------- | ---- | -------- | ----------- |
| astNode  | AstNode | yes | The AstNode corresponding to the sourceFile itself (in Typescript, it is `ts.SourceFile`) |
| name | String | yes | The name of the file |
| text | String | yes | The source code of the file, including break lines |


#### ***astNode***

Corresponds to an AST node of the source code of a file.

- Fixed fields

| Field name | Type | Required | Description |
| ---------- | ---- | -------- | ----------- |
| children | AstNode[] | no | The array of AstNode corresponding to the children of the AST node |
| empty | Boolean | no | If true, the corresponding AstNode will not add any complexity |
| end  | Integer | yes | The position of the last character of the AST node in the source code of the file |
| kind | SyntaxKind | yes | The kind of the AST node |
| name | String | yes/no | The name of the AST node. This field MUST be present in the following cases: `ClassDeclaration`, `MethodDeclaration`, `FunctionDeclaration`, `Parameter`, `Identifier` |
| pos  | Integer | yes | The position of the first character of the AST node in the source code of the file |


### 9.3 Structure of the AST nodes

You must respect some conventions to be able to create JsonAst files correctly interpreted by @genese/complexity.

-  ***IfStatement***

   Supposing to be in this case :

```ts
if (a) {
    // ---
} else if (b) {
    // ---
} else {
    // ---
}
```

Your JsonAst MUST be structured like this :

```json
{
    "kind": "IfStatement",
    "children": [
        {
            "kind": "Identifier",
            "name": "a"
        },
        {
            "kind": "Block"
        },
        {
            "kind": "IfStatement",
            "children": [
                {
                    "kind": "Identifier",
                    "name": "b"
                },
                {
                    "kind": "Block"
                },
                {
                    "kind": "Block"
                }
            ]
        }
    ]
}
```

The AstNode "IfStatement" always have a first son which is what is inside the `if` brackets and a second son which is what is inside the `if` condition (the curly brackets). This AstNode MAY has a third son which is the AstNode corresponding to the `ElseStatement`, like in the example above.

### 9.4 Exhaustive list of the kinds of node

This list corresponds to the [ts.SyntaxKind enum](https://github.com/microsoft/TypeScript/blob/master/lib/typescript.d.ts) (from line 77 to 447)
```
    AbstractKeyword
    AmpersandAmpersandToken
    AmpersandEqualsToken
    AmpersandToken
    AnyKeyword
    ArrayBindingPattern
    ArrayLiteralExpression
    ArrayType
    ArrowFunction
    AsExpression
    AsKeyword
    AssertsKeyword
    AsteriskAsteriskEqualsToken
    AsteriskAsteriskToken
    AsteriskEqualsToken
    AsteriskToken
    AsyncKeyword
    AtToken
    AwaitExpression
    AwaitKeyword
    BacktickToken
    BarBarToken
    BarEqualsToken
    BarToken
    BigIntKeyword
    BigIntLiteral
    BinaryExpression
    BindingElement
    Block
    BooleanKeyword
    BreakKeyword
    BreakStatement
    Bundle
    CallExpression
    CallSignature
    CaretEqualsToken
    CaretToken
    CaseBlock
    CaseClause
    CaseKeyword
    CatchClause
    CatchKeyword
    ClassDeclaration
    ClassExpression
    ClassKeyword
    CloseBraceToken
    CloseBracketToken
    CloseParenToken
    ColonToken
    CommaListExpression
    CommaToken
    ComputedPropertyName
    ConditionalExpression
    ConditionalType
    ConflictMarkerTrivia
    ConstKeyword
    Constructor
    ConstructorKeyword
    ConstructorType
    ConstructSignature
    ContinueKeyword
    ContinueStatement
    Count
    DebuggerKeyword
    DebuggerStatement
    DeclareKeyword
    Decorator
    DefaultClause
    DefaultKeyword
    DeleteExpression
    DeleteKeyword
    DoKeyword
    DoStatement
    DotDotDotToken
    DotToken
    ElementAccessExpression
    ElseKeyword
    EmptyStatement
    EndOfDeclarationMarker
    EndOfFileToken
    EnumDeclaration
    EnumKeyword
    EnumMember
    EqualsEqualsEqualsToken
    EqualsEqualsToken
    EqualsGreaterThanToken
    EqualsToken
    ExclamationEqualsEqualsToken
    ExclamationEqualsToken
    ExclamationToken
    ExportAssignment
    ExportDeclaration
    ExportKeyword
    ExportSpecifier
    ExpressionStatement
    ExpressionWithTypeArguments
    ExtendsKeyword
    ExternalModuleReference
    FalseKeyword
    FinallyKeyword
    FirstAssignment
    FirstBinaryOperator
    FirstCompoundAssignment
    FirstFutureReservedWord
    FirstJSDocNode
    FirstJSDocTagNode
    FirstKeyword
    FirstLiteralToken
    FirstNode
    FirstPunctuation
    FirstReservedWord
    FirstStatement
    FirstTemplateToken
    FirstToken
    FirstTriviaToken
    FirstTypeNode
    ForInStatement
    ForKeyword
    ForOfStatement
    ForStatement
    FromKeyword
    FunctionDeclaration
    FunctionExpression
    FunctionKeyword
    FunctionType
    GetAccessor
    GetKeyword
    GlobalKeyword
    GreaterThanEqualsToken
    GreaterThanGreaterThanEqualsToken
    GreaterThanGreaterThanGreaterThanEqualsToken
    GreaterThanGreaterThanGreaterThanToken
    GreaterThanGreaterThanToken
    GreaterThanToken
    HeritageClause
    Identifier
    IfKeyword
    IfStatement
    ImplementsKeyword
    ImportClause
    ImportDeclaration
    ImportEqualsDeclaration
    ImportKeyword
    ImportSpecifier
    ImportType
    IndexedAccessType
    IndexSignature
    InferKeyword
    InferType
    InKeyword
    InputFiles
    InstanceOfKeyword
    InterfaceDeclaration
    InterfaceKeyword
    IntersectionType
    IsKeyword
    JSDocAllType
    JSDocAugmentsTag
    JSDocAuthorTag
    JSDocCallbackTag
    JSDocClassTag
    JSDocComment
    JSDocEnumTag
    JSDocFunctionType
    JSDocImplementsTag
    JSDocNamepathType
    JSDocNonNullableType
    JSDocNullableType
    JSDocOptionalType
    JSDocParameterTag
    JSDocPrivateTag
    JSDocPropertyTag
    JSDocProtectedTag
    JSDocPublicTag
    JSDocReadonlyTag
    JSDocReturnTag
    JSDocSignature
    JSDocTag
    JSDocTemplateTag
    JSDocThisTag
    JSDocTypedefTag
    JSDocTypeExpression
    JSDocTypeLiteral
    JSDocTypeTag
    JSDocUnknownType
    JSDocVariadicType
    JsxAttribute
    JsxAttributes
    JsxClosingElement
    JsxClosingFragment
    JsxElement
    JsxExpression
    JsxFragment
    JsxOpeningElement
    JsxOpeningFragment
    JsxSelfClosingElement
    JsxSpreadAttribute
    JsxText
    JsxTextAllWhiteSpaces
    KeyOfKeyword
    LabeledStatement
    LastAssignment
    LastBinaryOperator
    LastCompoundAssignment
    LastFutureReservedWord
    LastJSDocNode
    LastJSDocTagNode
    LastKeyword
    LastLiteralToken
    LastPunctuation
    LastReservedWord
    LastStatement
    LastTemplateToken
    LastToken
    LastTriviaToken
    LastTypeNode
    LessThanEqualsToken
    LessThanLessThanEqualsToken
    LessThanLessThanToken
    LessThanSlashToken
    LessThanToken
    LetKeyword
    LiteralType
    MappedType
    MergeDeclarationMarker
    MetaProperty
    MethodDeclaration
    MethodSignature
    MinusEqualsToken
    MinusMinusToken
    MinusToken
    MissingDeclaration
    ModuleBlock
    ModuleDeclaration
    ModuleKeyword
    MultiLineCommentTrivia
    NamedExports
    NamedImports
    NamespaceExport
    NamespaceExportDeclaration
    NamespaceImport
    NamespaceKeyword
    NeverKeyword
    NewExpression
    NewKeyword
    NewLineTrivia
    NonNullExpression
    NoSubstitutionTemplateLiteral
    NotEmittedStatement
    NullKeyword
    NumberKeyword
    NumericLiteral
    ObjectBindingPattern
    ObjectKeyword
    ObjectLiteralExpression
    OfKeyword
    OmittedExpression
    OpenBraceToken
    OpenBracketToken
    OpenParenToken
    OptionalType
    PackageKeyword
    Parameter
    ParenthesizedExpression
    ParenthesizedType
    PartiallyEmittedExpression
    PercentEqualsToken
    PercentToken
    PlusEqualsToken
    PlusPlusToken
    PlusToken
    PostfixUnaryExpression
    PrefixUnaryExpression
    PrivateIdentifier
    PrivateKeyword
    PropertyAccessExpression
    PropertyAssignment
    PropertyDeclaration
    PropertySignature
    ProtectedKeyword
    PublicKeyword
    QualifiedName
    QuestionDotToken
    QuestionQuestionToken
    QuestionToken
    ReadonlyKeyword
    RegularExpressionLiteral
    RequireKeyword
    RestType
    ReturnKeyword
    ReturnStatement
    SemicolonClassElement
    SemicolonToken
    SetAccessor
    SetKeyword
    ShebangTrivia
    ShorthandPropertyAssignment
    SingleLineCommentTrivia
    SlashEqualsToken
    SlashToken
    SourceFile
    SpreadAssignment
    SpreadElement
    StaticKeyword
    StringKeyword
    StringLiteral
    SuperKeyword
    SwitchKeyword
    SwitchStatement
    SymbolKeyword
    SyntaxList
    SyntheticExpression
    SyntheticReferenceExpression
    TaggedTemplateExpression
    TemplateExpression
    TemplateHead
    TemplateMiddle
    TemplateSpan
    TemplateTail
    ThisKeyword
    ThisType
    ThrowKeyword
    ThrowStatement
    TildeToken
    TrueKeyword
    TryKeyword
    TryStatement
    TupleType
    TypeAliasDeclaration
    TypeAssertionExpression
    TypeKeyword
    TypeLiteral
    TypeOfExpression
    TypeOfKeyword
    TypeOperator
    TypeParameter
    TypePredicate
    TypeQuery
    TypeReference
    UndefinedKeyword
    UnionType
    UniqueKeyword
    Unknown
    UnknownKeyword
    UnparsedInternalText
    UnparsedPrepend
    UnparsedPrologue
    UnparsedSource
    UnparsedSyntheticReference
    UnparsedText
    VariableDeclaration
    VariableDeclarationList
    VariableStatement
    VarKeyword
    VoidExpression
    VoidKeyword
    WhileKeyword
    WhileStatement
    WhitespaceTrivia
    WithKeyword
    WithStatement
    YieldExpression
    YieldKeyword

```
