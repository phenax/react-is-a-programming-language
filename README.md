# Reactjs is a turing complete programming language

Note: Uses react canary (19)

Our [App.tsx](./src/App.tsx) here calculates factorial of a number, fibonacci sequence and does a bit of arithmetics but it does all that using react (not JS). What I mean by that is:
- No function recursion
- No loops
- No if-else/`?:` ternaries/`&& ||` ternaries
- No switch-case
- No arithmetic operators

**So every bit of computation in this repo (as much as possible) is done using react only.**

![Screenshot](./screenshot.jpg)


## Example
Here's how the factorial component looks like:
```tsx
const Factorial: FC<any> = React.memo(({ n }) => {
  const [count, setCount] = useState(n);
  const [result, setResult] = useState(<One />);

  useLoop();

  return (
    <>
      Calculating factorial of {n}...
      <IfElse condition={count <= 1}>
        <Add>{result}</Add>
        <CallElement key={count} fn={
          <EvaluateAll fns={[
            <Add><Decrement>{numberToNode(count)}</Decrement></Add>,
            <Multiply a={result} b={numberToNode(count)} />
          ]} />
        }>
          {([newCount, newResult]) => <CallFunction fn={() => {
            setCount(newCount);
            setResult(numberToNode(newResult))
          }} />}
        </CallElement>
      </IfElse>
    </>
  );
});

const App = () => {
  return (
    <CallElement fn={<Factorial n={5} />}>
      {result => (<div>5! = {result}</div>)}
    </CallElement>
  );
};
```


## How it works
Not that anyone needs this information but here it is anyway...

#### useLoop
Just a forever loop created by updating a state inside a `useEffect` with a dependency on the state itself. (Has a tiny delay to get the render to run reliably)

#### CallElement
Removing some of the noise, the core of what happens looks like this:
```tsx
    <Suspense fallback={<Return.Provider>{computation}</Return.Provider>}>
      <AwaitResource>{getResultOfComputation}</AwaitResource>
    </Suspense>
```

`Suspense` wraps the computation where `AwaitResource` is waiting for some promise to resolve. So react renders the fallback.
`Return` context provides a function inside your computation which is meant to be invoked when the computation is done.
When the function is invoked, it resolves the promise which the `AwaitResource` component is waiting for.
This then renders the `AwaitResource` along with the result of the computation.


#### CallFunction
Just a useEffect that calls the function when rendered.


#### IfElse
Nothing fancy. Renders the first child if the condition is true, otherwise renders the second child.

Index of child picked = `Number(!condition)`


#### Natural numbers
Numbers are represented as react elements.
- `0` is `<></>`
- `1` is `<div data-type="nat" />`
- `2` is `<><div data-type="nat" /><div data-type="nat" /></>`
- ...

So, the number of the `nat` dom nodes is what represents our number.
- Addition, is a combination of 2 nat react elements that represent natural numbers `<><One /><One /><One /></>`.
- Multiplication is just the react element for the second number repeated the first number of times.
- Decrement removes the `data-type` attribute from one of the nodes. (No subtraction implemented yet but it'd be this multiple times)

Note: `Add` component also doubles as a natural number node to number converter.

> Sort of cheating here by using dom nodes so if anyone knows a way to do arithmetics without the dom, please let me know!

#### EvaluateAll
Just `CallElement` for each react element in the array. Essentially `Promise.all` for react elements.


## How to run it?
Why would you want to do something like that? But if you're sure you want to...

- Clone this thing
- Install dependencies `bun i` (Uses bun because I'm cool like that)
- `bun run dev`
- Open `localhost:5173` in your browser

