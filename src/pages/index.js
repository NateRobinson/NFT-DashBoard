/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IssuerIcon from '../images/issue_icon.png';
import TypeIcon from '../images/type_icon.png';
import SortIcon from '../images/sort_icon.png';
import MoreIcon from '../images/more_icon.png';

export default function MiniPage() {
  const cards = [
    {
      cardClass: 'card-item card-issuer',
      logo: IssuerIcon,
      logoClass: 'logo-issuer',
      title: '颁发者统计',
      desc: '根据 NFT 颁发者进行链上数据统计',
      path: '/issuers',
    },
    // {
    //   cardClass: 'card-item card-types',
    //   logo: TypeIcon,
    //   logoClass: 'logo-types',
    //   title: 'NFT 类别统计',
    //   desc: '根据 NFT 类别进行链上数据统计',
    //   path: '/types',
    // },
    {
      cardClass: 'card-item card-sort',
      logo: SortIcon,
      logoClass: 'logo-sort',
      title: 'NFT 持有排行榜',
      desc: '根据 NFT 持有者进行链上数据统计',
      path: '/sorts',
    },
  ];

  return (
    <Main>
      <p className="header">NFT Analysis</p>
      {cards.map(item => (
        <Link to={item.path} className={item.cardClass}>
          <img className={item.logoClass} src={item.logo} alt="" />
          <div className="left">
            <p className="title">{item.title}</p>
            <p className="desc">{item.desc}</p>
          </div>
        </Link>
      ))}
      <div className="card-item card-more">
        <img className="logo-more" src={MoreIcon} alt="" />
        <div className="left">
          <p className="title">挖掘更多数据价值…</p>
        </div>
      </div>
    </Main>
  );
}

const Main = styled.main`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin: 10px 0;
  }
  .card-item {
    height: 120px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 30px 20px;
    margin: 20px 20px 0 20px;
    text-decoration: none;
    .logo-issuer {
      width: 53px;
      height: 57px;
    }
    .logo-types {
      width: 53px;
      height: 50.2px;
    }
    .logo-sort {
      width: 53px;
      height: 44.7px;
    }
    .logo-more {
      width: 44px;
      height: 64px;
    }
    .left {
      height: 100%;
      color: #ffffff;
      margin-left: 17px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 22px;
        margin: 0;
      }
      .desc {
        font-size: 14px;
        margin: 0;
      }
    }
  }
  .card-issuer {
    background-color: #0078c3;
  }
  .card-types {
    background-color: #599bc8;
  }
  .card-sort {
    background-color: #599bc8;
  }
  .card-more {
    background-color: #5FD8E1;
    .left {
      justify-content: center;
      .title {
        font-size: 20px;
      }
    }
  }
`;
