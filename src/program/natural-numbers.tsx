import { FC, Fragment, ReactNode, useContext, useEffect, useRef } from 'react';
import { CallElement, Return } from './compute';

export const One = () => <div data-type="nat" />;

export const N = {
  _0: () => <></>,
  _1: () => <One />,
  _2: () => <><One /><One /></>,
  _3: () => <><One /><One /><One /></>,
  _4: () => <><One /><One /><One /><One /></>,
  _5: () => <><One /><One /><One /><One /><One /></>,
}

export const numberToNode = (n: number) => {
  const ones = Array.from({ length: n }, (_, i) => <One key={i} />);
  return <>{ones}</>;
}

export const Add: FC<{ children?: ReactNode }> = ({ children }) => {
  const onReturn = useContext(Return);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const count = Array.from(ref.current?.querySelectorAll('[data-type="nat"]') ?? []).length;
    onReturn(count);
  }, [children, onReturn]);

  return <div ref={ref as any}>{children}</div>;
}

export const Multiply: FC<{ a: ReactNode, b: ReactNode }> = ({ a, b }) => {
  return <CallElement fn={<Add>{a}</Add>}>
    {aNum => <Add>{Array.from({ length: aNum }, (_, i) => (
      <Fragment key={i}>{b}</Fragment>
    ))}</Add>}
  </CallElement>
};

export const Decrement: FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    const one = ref.current?.querySelector('[data-type="nat"]') as HTMLDivElement | null;
    if (one?.dataset) one.dataset.type = '';
  }, []);
  return <div ref={ref as any}>{children}</div>
}
