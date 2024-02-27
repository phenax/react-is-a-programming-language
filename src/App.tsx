import { FC, useContext, useEffect, useRef, useState } from "react";
import { CallElement, CallFunction, Return, IfElse } from "./program";

const Factorial: FC<any> = ({ n }) => {
  const onReturn = useContext(Return);
  const [count, setCount] = useState(n);
  const [result, setResult] = useState(1);

  useEffect(() => {
    setCount(count - 1);
    setResult((result) => count * result);
  }, [count]);

  return (
    <>
      Calculating factorial of {n}...
      <IfElse condition={count <= 1}>
        <CallFunction fn={() => onReturn(result)} />
        <></>
      </IfElse>
    </>
  );
};

const Fibonacci: FC<any> = ({ n }) => {
  const onReturn = useContext(Return);
  const [count, setCount] = useState(n);
  const prevResult = useRef(0);
  const [result, setResult] = useState(1);

  useEffect(() => {
    setCount(count - 1);
    const prev = prevResult.current;
    prevResult.current = result;
    setResult((result) => result + prev);
  }, [count, result]);

  return (
    <>
      Calculating fibonacci number {n}...
      <IfElse condition={count <= 1}>
        <CallFunction fn={() => onReturn(result)} />
        <></>
      </IfElse>
    </>
  );
};

const App: FC = () => {
  return (
    <>
      <div>
        <CallElement fn={<Factorial n={10} />}>
          {(result) => <>Facto: {result}</>}
        </CallElement>
      </div>
      <div>
        <CallElement fn={<Fibonacci n={8} />}>
          {(result) => <>Fibo: {result}</>}
        </CallElement>
      </div>
    </>
  );
};

export default App;
