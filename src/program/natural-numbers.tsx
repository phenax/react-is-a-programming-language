import React, { FC, ReactNode, useContext, useEffect } from "react";
import { Return } from "./compute";
import TestRenderer from 'react-test-renderer'

export const One: FC = () => <div data-type="nat" />;
export const Two: FC = () => <><One /><One /></>;

export const nodeToNumber = (node: ReactNode) => {
  const renderer = TestRenderer.create(<>{node}</>);
  const ones = renderer.root?.findAllByType(One);
  return ones.length ?? 0;
}

export const numberToNode = (n: number) => {
  const ones = Array.from({ length: n }, (_, i) => <One key={i} />);
  return <>{ones}</>;
}

export const multiplyNodes = (a: ReactNode, b: ReactNode) => {
  const renderer = TestRenderer.create(<>{b}</>);
  return renderer.root?.findAllByType(One).map(_ => React.cloneElement(a as any));
}

export const Add: FC<{ children?: ReactNode }> = ({ children }) => {
  const onReturn = useContext(Return);

  useEffect(() => {
    onReturn(nodeToNumber(children));
  }, [children, onReturn]);

  return null;
}

export const Multiply: FC<{ a: ReactNode, b: ReactNode }> = ({ a, b }) =>
  <Add>{multiplyNodes(a, b)}</Add>;
