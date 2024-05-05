# Reactjs is a turing complete programming language

Note: Uses react canary (19)

Our [App.tsx](./src/App.tsx) here calculates factorial of a number, fibonacci sequence and does a bit of arithmetics but it does all that using react (not JS). What I mean by that is:
- No function recursion
- No loops
- No if-else/ternaries/`&& ||` ternaries
- No switch-case
- No arithmetic operators (Currently I'm still minus for convinience but that'll change)

## How it works

It's all a blur now. I was in a state of trance when I wrote this. But basically, it uses Suspense and react's ability to get stuck in infinite render/state-update loop to calculate things.

Don't want to spend more time on this so if you need more details, go through the code or ask me. I'll be happy to explain.

