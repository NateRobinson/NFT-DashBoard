/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import useAsync from 'react-use/lib/useAsync';
import api from '../libs/api';
import OrderOne from '../images/order1.png';
import OrderTwo from '../images/order2.png';
import OrderThree from '../images/order3.png';
import TicketIcon from '../images/ticket_icon.png';
import BadgeIcon from '../images/badge_icon.png';
import CertIcon from '../images/cert_icon.png';

async function fetchSorts() {
  const sorts = await api.get('/api/sorts');
  return sorts.data;
}

export default function SortsPage() {
  const state = useAsync(fetchSorts);
  return (
    <Main>
      <p className="header">排行榜 TOP10</p>
      {state.value
        && state.value.result
        && state.value.result.length > 0
        && state.value.result.map((item, index) => (
          <a
            href={`https://xenon.network.arcblockio.cn/node/explorer/accounts/${item._id}`}
            className="sort-item"
            key={item._id}>
            {index === 0 && <img className="sort-img" src={OrderOne} alt="" />}
            {index === 1 && <img className="sort-img" src={OrderTwo} alt="" />}
            {index === 2 && <img className="sort-img" src={OrderThree} alt="" />}
            {index > 2 && <span className="sort-num">{index + 1}</span>}
            <span className="did-address">
              {`${item._id.slice(0, 4)}***${item._id.slice(item._id.length - 4, item._id.length)}`}
            </span>
            <div className="detail-out">
              <img className="ticket-icon" src={TicketIcon} alt="" />
              <span className="number">{item.totalTicketCount}</span>
              <img className="badge-icon" src={BadgeIcon} alt="" />
              <span className="number">{item.totalBadgeCount}</span>
              <img className="cert-icon" src={CertIcon} alt="" />
              <span className="number">{item.totalCertificateCount}</span>
            </div>
          </a>
        ))}
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
  .sort-item {
    margin: 15px 0;
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    color: #222222;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background: #efefef;
      bottom: -15px;
    }
    .sort-img {
      width: 30px;
    }
    .sort-num {
      width: 40px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      font-style: italic;
    }
    .did-address {
      flex: 1;
      margin-left: 10px;
      font-size: 14px;
    }
    .detail-out {
      display: flex;
      align-items: center;
      .ticket-icon {
        width: 20px;
        margin-right: 6px;
      }
      .badge-icon {
        width: 14px;
        margin-right: 6px;
      }
      .cert-icon {
        width: 14px;
        margin-right: 6px;
      }
      .number {
        font-size: 12px;
        text-align: center;
        margin-right: 6px;
      }
    }
  }
`;
