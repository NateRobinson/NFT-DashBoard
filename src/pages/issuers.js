/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import styled from 'styled-components';
import api from '../libs/api';

async function fetchIssuers() {
  const issuers = await api.get('/api/issuers');
  return issuers.data;
}

export default function IssuerPage() {
  const state = useAsync(fetchIssuers);
  return (
    <Main>
      <p className="header">颁发者统计</p>
      <p className="desc">本次我们选取 ArcBlock DevCon 官方颁发者数据进行分析</p>
      <div className="count-item">
        <span className="title">送出总计</span>
        <p className="number-out">
          <span className="number">{state.value ? state.value.result.totalSendCount : '...'}</span>
        </p>
      </div>
      <div className="count-item">
        <span className="title">门票数量</span>
        <p className="number-out">
          <span className="number">{state.value ? state.value.result.totalSendTicketCount : '...'}</span>
        </p>
      </div>
      <div className="count-item">
        <span className="title">徽章数量</span>
        <p className="number-out">
          <span className="number">{state.value ? state.value.result.totalSendBadgeCount : '...'}</span>
        </p>
      </div>
      <div className="count-item">
        <span className="title">证书数量</span>
        <p className="number-out">
          <span className="number">{state.value ? state.value.result.totalSendCertCount : '...'}</span>
        </p>
      </div>
    </Main>
  );
}

const Main = styled.main`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  .header {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin: 10px 0;
  }
  .desc {
    margin: 0px;
    font-size: 16px;
    text-align: center;
  }
  .count-item {
    height: 80px;
    border: 1px solid #0078c3;
    border-radius: 10px;
    margin-top: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      background-color: #0078c3;
      color: #ffffff;
      padding: 8px;
      position: absolute;
      top: -18px;
      left: 18px;
      border-radius: 7px;
      font-size: 14px;
    }
    .number-out {
      text-align: center;
      display: flex;
      align-items: baseline;
      .number {
        color: #0078c3;
        font-size: 30px;
        font-weight: bold;
      }
      .unit {
        font-size: 20px;
        margin-left: 8px;
        color: #999;
      }
    }
  }
`;
