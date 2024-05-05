import React, { FC, useEffect, useRef, useState } from 'react';
import { CallElement, CallFunction, IfElse, EvaluateAll } from './program/compute';
import { Add, Multiply, N, One, numberToNode } from './program/natural-numbers';

const Factorial: FC<any> = React.memo(({ n }) => {
  const [count, setCount] = useState(n);
  const [result, setResult] = useState(<One />);

  useEffect(() => {
    if ((window as any).PLEASE_STOP) return;
    // TODO: Subtraction in react
    // TODO: Fix timeout
    setTimeout(() => setCount(count - 1), 50)
  }, [count]);

  return (
    <>
      Calculating factorial of {n}...
      <IfElse condition={count <= 1}>
        <Add>{result}</Add>
        <CallElement key={count} fn={<Multiply a={result} b={numberToNode(count)} />}>
          {product => <CallFunction fn={() => setResult(numberToNode(product))} />}
        </CallElement>
      </IfElse>
    </>
  );
});

const Fibonacci: FC<any> = React.memo(({ n }) => {
  const [count, setCount] = useState(n);
  const prevResult = useRef(<></>);
  const [result, setResult] = useState(<One />);

  useEffect(() => {
    if ((window as any).PLEASE_STOP) return;
    setTimeout(() => setCount(count - 1), 50);
  }, [count, result]);

  return (
    <>
      Calculating fibonacci number {n}...
      <IfElse condition={count < 1}>
        <Add>{result}</Add>
        <CallElement key={count} fn={<Add>{prevResult.current}{result}</Add>}>
          {sum => <CallFunction fn={() => {
            prevResult.current = result;
            setResult(numberToNode(sum));
          }} />}
        </CallElement>
      </IfElse>
    </>
  );
});

const App: FC = () => {
  return (
    <div>
      <div>
        <CallElement fn={<Add> <N._5 /> <N._3 /> <N._4 /> </Add>}>
          {(result) => <>5 + 3 + 4 = {result}</>}
        </CallElement>
      </div>
      <div>
        <CallElement fn={<Multiply a={<><N._3 /><N._5 /></>} b={<N._3 />} />}>
          {(result) => <>8 * 3 = {result}</>}
        </CallElement>
      </div>
      <div>
        <CallElement fn={<Factorial n={5} />}>
          {(result) => <>Factorial(5): {result}</>}
        </CallElement>
      </div>
      <div>
        <CallElement fn={<EvaluateAll fns={Array.from({ length: 10 }, (_, i) => <Fibonacci n={i} key={i} />)} />}>
          {(result) => <>Fibo: {result.join(', ')}</>}
        </CallElement>
      </div>
    </div>
  );
};

export default App;
