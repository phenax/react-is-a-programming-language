import { FC, useContext, useEffect, useRef, useState } from "react";
import { CallElement, CallFunction, Return, IfElse } from "./program/compute";
import { Add, Multiply, One, Two, multiplyNodes, nodeToNumber, numberToNode } from "./program/natural-numbers";

const Factorial: FC<any> = ({ n }) => {
  const onReturn = useContext(Return);
  const [count, setCount] = useState(n); // TODO: Subtraction
  const [result, setResult] = useState(<One />);

  useEffect(() => {
    setCount(count - 1);
    setResult((result) => <>{multiplyNodes(numberToNode(count), result)}</>);
  }, [count]);

  return (
    <>
      Calculating factorial of {n}...
      <IfElse condition={count <= 1}>
        <CallElement fn={<Add>{result}</Add>}>
          {result => <CallFunction fn={() => onReturn(result)} />}
        </CallElement>
        <></>
      </IfElse>
    </>
  );
};

const Fibonacci: FC<any> = ({ n }) => {
  const onReturn = useContext(Return);
  const [count, setCount] = useState(n);
  const prevResult = useRef(<></>);
  const [result, setResult] = useState(<One />);

  useEffect(() => {
    setCount(count - 1);
    const prev = prevResult.current;
    prevResult.current = result;
    setResult((result) => <>{result}{prev}</>);
  }, [count, result]);

  return (
    <>
      Calculating fibonacci number {n}...
      <IfElse condition={count <= 1}>
        <CallElement fn={<Add>{result}</Add>}>
          {result => <CallFunction fn={() => onReturn(result)} />}
        </CallElement>
        <></>
      </IfElse>
    </>
  );
};

const App: FC = () => {
  return (
    <>
      <div>
        <CallElement fn={<Multiply a={<><Two /><One /></>} b={<Two />} />}>
          {(result) => <>3 * 2 = {result}</>}
        </CallElement>
      </div>
      <div>
        <CallElement fn={<Add> <One /> <Two /> <Two /> </Add>}>
          {(result) => <>1 + 2 + 2 = {result}</>}
        </CallElement>
      </div>
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
