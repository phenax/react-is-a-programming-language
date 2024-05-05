import React, { FC, useEffect, Suspense, use, useMemo, useRef, ReactNode, Children, useReducer, useCallback, useContext } from 'react'

declare module 'react' {
  export function use<T>(x: Promise<T>): T | undefined;
}

export const PickChild: FC<{ n: number; children: ReactNode }> = ({ n, children }) =>
  Children.toArray(children)[n];

export const IfElse: FC<{ condition: boolean; children: [ReactNode, ReactNode] }> = ({ condition, children }) =>
  <PickChild n={+!condition}>{children}</PickChild>;

export const CallFunction: FC<{ fn: () => void }> = ({ fn }) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => fnRef.current(), []);
  return null;
}

export const AwaitResource: FC<{ resource: Promise<any>, children: (n: any) => ReactNode }> = ({ resource, children }) => {
  const result = use(resource);
  return children(result);
}

export const Return = React.createContext<(x: any) => void>((_) => {});

export const CallElement: FC<{
  fn: ReactNode,
  children: (result: any) => ReactNode,
}> = ({ fn, children }) => {
  const [_, forceUpdate] = useReducer((n) => n + 1, 0)
  const resolve = useRef((_: any) => {});
  const promise = useMemo(() => new Promise((res) => {
    resolve.current = res
  }), [])

  const onReturn = useCallback((n: number) => {
    resolve.current(n)
    forceUpdate()
  }, [])

  return (
    <Suspense fallback={<Return.Provider value={onReturn}>{fn}</Return.Provider>}>
      <AwaitResource resource={promise}>{children}</AwaitResource>
    </Suspense>
  )
}

export const EvaluateAll: FC<{ fns: ReactNode[] }> = ({ fns }) => {
  const onReturn = useContext(Return);
  const resultList = useRef<any[]>([]);
  const resultCount = useRef(0);

  const resolve = useCallback((result: any, i: number) => {
    resultList.current[i] = result;
    resultCount.current += 1;
    if (resultCount.current === fns.length) {
      onReturn(resultList.current);
    }
  }, [fns.length, onReturn])

  return (
    <>
      {fns.map((fn, i) => (
        <CallElement key={i} fn={fn}>
          {result => <CallFunction fn={() => resolve(result, i)} />}
        </CallElement>
      ))}
    </>
  )
}

