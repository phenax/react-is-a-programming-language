import { FC, useEffect, useState, Suspense, use, useMemo, useRef, ReactNode, Children, useReducer, useCallback } from 'react'

declare module 'react' {
  export function use<T>(x: Promise<T>): T | undefined;
}

const PickChild: FC<{ n: number; children: ReactNode }> = ({ n, children }) =>
  Children.toArray(children)[n];

const IfElse: FC<{ condition: boolean; children: [ReactNode, ReactNode] }> = ({ condition, children }) =>
  <PickChild n={+!condition}>{children}</PickChild>;

const CallFunction: FC<{ fn: () => void }> = ({ fn }) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => fnRef.current(), []);
  return null;
}

const Factorial: FC<any> = ({ n, resolve }) => {
  const [count, setCount] = useState(n)
  const [result, setResult] = useState(1)

  useEffect(() => {
    setCount(count - 1)
    setResult(result => count * result)
  }, [count, resolve, result])

  return (
    <>
      Calculating factorial of {n}...
      <IfElse condition={count > 1}>
        <CallFunction fn={() => resolve(result)} />
        <></>
      </IfElse>
    </>
  )
}

const ShowResult: FC<{ promise: Promise<any> }> = ({ promise }) => {
  const result = use(promise);
  return <>Result: {result}</>
}

const App: FC = () => {
  const [_, forceUpdate] = useReducer((n) => n + 1, 0)
  const resolve = useRef((_: any) => {});
  const promise = useMemo(() => {
    return new Promise((res) => {
      resolve.current = res
    })
  }, [])

  const onReturn = useCallback((n: number) => {
    resolve.current(n)
    forceUpdate()
  }, [])

  return (
    <Suspense fallback={<Factorial n={5} resolve={onReturn} />}>
      <ShowResult promise={promise} />
    </Suspense>
  )
}

export default App
