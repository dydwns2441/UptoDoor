import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,
  Title,
  Wrapper,
  PageWrapper,
  PageProfileBtnWrapper,
  PageProfileWrapper,
  PageContent,
  PageBtnWrapper,
} from "../GlobalStyle";
import {
  MypageLi,
} from '../Mypage/StyledMypage';
import {
  AdimUl,
  AdminLi,
  AdminUlListWrapper,
  AminpageUl,
} from "./StyledAdminPage";

import AdminOrderList from './AdminOrderList';
import AdminOrderInfo from './AdminOrderInfo';
import AdminStoreInfo from "./AdminStoreInfo";


function AdminWrapper() {
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  console.log(admin);
  const store = admin;
  const { orders } = store;

  const [filteredData, setFilteredData] = useState([]);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const [selectedDay, setSelectedDay] = useState(days[new Date().getDay()]);
  const [currentTab, setCurrentTab] = useState(new Date().getDay());
  const [orderitem, setOrderItem] = useState({});
  const [cur, setCur] = useState(0);
  const [changeListItem, setChangeListItem] = useState(0);

  const moveDetailHandler = (id) => {
    const filtered = filteredData.filter((el) => {
      return el.id === id;
    })[0];
    setOrderItem(filtered);
    setCur(1);
  };
  const listbackHandler = () => {
    setOrderItem("");
    setCur(0);
  };

  const changeDayList = (id, day) => {
    setCur(0);
    setCurrentTab(id);
    setSelectedDay(day);
    console.log("11111", orders);
    const filtered = orders.filter((el) => {
      const { delivery_day } = el.order_deliveries;
      const deliveryDay = delivery_day.split(",");
      return deliveryDay.includes(day);
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    setCur(0);
    const filtered = orders.filter((el) => {
      const { delivery_day } = el.order_deliveries;
      const deliveryDay = delivery_day.split(",");
      return deliveryDay.includes(selectedDay);
    });
    setFilteredData(filtered);
  }, []);
  const listItem = ["주문관리", "가게 정보"];
  return (
    <Container>
      <Title>관리자 페이지</Title>
      <Wrapper>
        <PageWrapper>
          <PageProfileBtnWrapper>
            <PageProfileWrapper>
              <PageContent>
                <h3>안녕하세요. {user.nickname}님</h3>
                {user.title === "" ? (
                  <p>가게를 등록해주세요.</p>
                ) : (
                  <>
                    <h3>{admin.name}</h3>
                    <p>{user.email}</p>
                    <p>{user.mobile}</p>
                    <p>{admin.address}</p>
                    <p>({admin.address_detail})</p>
                  </>
                )}
              </PageContent>
              <PageBtnWrapper>
                <button type="button">
                  <Link to="/adminedit">내 가게 관리</Link>
                </button>
              </PageBtnWrapper>
            </PageProfileWrapper>
            <AminpageUl>
              {listItem.map((list, idx) => {
                return (
                  <MypageLi
                    key={list}
                    onClick={() => {
                      setChangeListItem(idx);
                    }}
                    className={changeListItem === idx ? "focus" : null}
                  >
                    {list}
                  </MypageLi>
                );
              })}
            </AminpageUl>
          </PageProfileBtnWrapper>

          {changeListItem === 1 ? (
            <AdminStoreInfo store={admin} />
          ) : cur === 0 ? (
            <AdminUlListWrapper>
              <AdimUl>
                {days.map((day, idx) => {
                  return (
                    <AdminLi key={day}>
                      <button
                        type="button"
                        onClick={() => {
                          changeDayList(idx, day);
                        }}
                        className={currentTab === idx ? "focus" : ""}
                      >
                        {day}
                      </button>
                    </AdminLi>
                  );
                })}
              </AdimUl>
              <AdminOrderList
                moveDetailHandler={moveDetailHandler}
                data={filteredData}
                selectedDay={selectedDay}
              />
            </AdminUlListWrapper>
          ) : (
            <AdminUlListWrapper>
              <AdimUl>
                {days.map((day, idx) => {
                  return (
                    <AdminLi key={day}>
                      <button
                        type="button"
                        onClick={() => {
                          changeDayList(idx, day);
                        }}
                        className={currentTab === idx ? "focus" : ""}
                      >
                        {day}
                      </button>
                    </AdminLi>
                  );
                })}
              </AdimUl>
              <AdminOrderInfo
                orderitem={orderitem}
                listbackHandler={listbackHandler}
              />
            </AdminUlListWrapper>
          )}
        </PageWrapper>
      </Wrapper>
    </Container>
  );
}

export default AdminWrapper;