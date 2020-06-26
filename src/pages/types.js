/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';

export default function TypesPage() {
  return (
    <Main>
      <p className="header">类别统计</p>
    </Main>
  );
}

const Main = styled.main`
  margin: 0;
  .header{
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin: 0;
  }
`;
