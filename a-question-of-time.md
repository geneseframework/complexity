# Cognitive Complexity: a question of time

## Abstract

In the domain of software development, the Cognitive Complexity could be approximately defined as "the difficulty for a human being to understand some code snippet". This definition seems to be clear and without ambiguities, but it is not, as we will see in this article.

At first, why should we interested in the cognitive complexity ? Because it is probably the main part of the maintainability e.g. the ability for the future developers to understand the code you wrote. A non-maintainable code is a dead code, and its value is near to zero. That's why we use so many tools to control the code quality: to guarantee our clients that our code is maintainable.

However, even if we understand intuitively what means the definition above, how could we measure the cognitive complexity ? Some commercial or non-commercial tools are able to analyze your code and to give you a score which is supposed to represent the cognitive complexity for each code snippet. But what are they really measuring ? Is this score really represents what we have in mind when we read the definition above ? That's not so sure...

As far as I know, no one tool is able to measure Cognitive Complexity, even approximately. In this article, I will explain a reasoning which highly improves the relevance of the score given by the actual algorithm of the main commercial tool of software quality analysis, but which will not claim to represent the exact value of the cognitive complexity defined as above. Secondly, I will discuss more theoretical points, like the reformulation of the definition above or how to set up experimental protocols to be able to measure the cognitive complexity in the real world. At the end, I'll make an appeal to coordinate our efforts to better understand the cognitive complexity by participating in a collective open-source project, Genese.

## Introduction

I work as developer in a multinational company specialized in software engineering. We create web or mobile applications for our clients which are big companies like Airbus, Sanofi, Peugeot, etc. We can create them from scratch or simply maintain an existing application created by another service provider. In the first case, the client impose to respect some quality norms, like the code coverage, or some specific coding style rules.

Conversely, we can simply maintain applications created by other developers. In this case, our role is to fix the bugs identified by the users and eventually add or two minor features. That's usually when we read the code at the first time that we know if we will suffer or not... We all know how painful is to try to understand a code which was written without any try to reduce its complexity. We know that in this case, we will need two or three more time to fix bugs, and we will probably never be able to add new features without adding new bugs.

What does it mean ? That simply means that the app will be two or three times more expensive to maintain. How is it possible ? That's simple: the quality rules requested by the clients are not able to control the cognitive complexity of the code.

I heard about this concept for the first time when I needed to audit the code written by another service provider. I searched all the indicators which could help me to say objectively if a code was good or not. A lot of them are interesting, like the code duplication rate or the code coverage, but that's not enough to be able to say if a code is easily understandable or not. That's only when I searched thoroughly in my preferred software analysis tool, a well-known commercial tool, that I found the holy graal, hidden at the bottom of the page : the cognitive complexity !

Surprisingly, as far as I know, no one client asked us something about cognitive complexity: they give us some quality rules, but the cognitive complexity is never explicitly expected. Of course, some of these rules are clearly in relation with the cognitive complexity, but the clients never said something like "your methods must have a cognitive complexity score lower than 20", for example. Why ?

In my opinion, the main reason is simply because most of the developers never heard about it. At first, I thought that the problem came from the ergonomics of the analysis tool : the cognitive complexity is a little hidden, and even when we found it, we just see a table with the list of files and a score for each of them. That's all. There is no possibility to find the cognitive complexity method by method, which should be much more relevant: when we try to understand some code or to fix some bug, we read the concerned method, not the entire file. Admittedly, we can configure a threshold which will give us an alert if a method exceed it, but we can't have an overview of all the methods on the same time, with their respective score.

That's for this reason that I created an open-source module, @genese/complexity, which is able to display with only one command-line the cognitive complexity of all the methods of a given project, with beautiful charts displaying at a glance the percentage of methods with correct cognitive complexity score, the methods which should be inspected to verify if they could be simplified, and the methods which should absolutely refactored now.

And that's when I created this wonderful module that I understood that the problem was not only a problem of ergonomics...

## Where is the problem ?

The ***real*** problem is that the cognitive complexity score provided by this tool has little to do with the cognitive complexity defined as above.

## Proposition

## Related work

## Theoretical discussion

## Experimentation

## Conclusion

## *@TheComplexityProject*

The main idea of *@TheComplexityProject* is to contribute to the improvement of the knowledge around the notions of software complexity and maintainability. Its members are researchers or developers which are interested in these themes.  and which want to share ideas, articles.   On this article, I talked only about the cognitive complexity, which is on my opinion the best indicator of the time needed to maintain a software, and so a good way to estimate its cost.

We will never be able to measure exactly the cognitive complexity, but we could write an algorithm which will return every day a better approximation than the day before. That's the main goal of *@TheComplexityProject*, and each contribution to the development of this algorithm

The weights used in the @genese/complexity module are not fixed for the eternity: they will change each time that the experimentation or the opinion of the community will tell us that we should change it. *@TheComplexityProject* is a collective project, and we need your help. Do you have a different opinion on the weights that we should assign ? Tell us. Are you able to demonstrate that some elements of our algorithm are wrong ? Tell us ! Are you a scientific, a researcher which is studying the concept of cognitive complexity ? You are welcome !
