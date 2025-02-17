import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ButtonWrapper, MypageUl, MypageLi } from "./StyledMypage";
import {
  Container,
  Title,
  Wrapper,
  PageWrapper,
  PageProfileBtnWrapper,
  PageProfileWrapper,
  PageContent,
} from "../GlobalStyle";

import { AdminStoreGetData } from "../../_actions/admin_action";
import { END_POINTS } from "../../_actions/type";
import axios from "axios";
import MyOrderDetail from "./MyOrderDetail";
import MyOrderList from "./MyOrderList";

import Auth from "../../hoc/auth";
import Signin from "../common/Signin/SigninModal";

import { RootReducerType } from "../../store/store";
import { User } from "../../@type/userInfo";
import { getNextPayDay, getToday } from "../../utils/calculateDate";
import { UserOrders } from "../../@type/userInfo";
import { AdminInfo } from "../../@type/adminInfo";

function MyProfileWrapper(): JSX.Element {
  const user: User = useSelector((state: RootReducerType) => state.user);
  const admin: AdminInfo = useSelector((state: RootReducerType) => state.admin);
  const dispatch: any = useDispatch();
  const history = useHistory();
  const [orderList, setOrderList] = useState<UserOrders[] | []>([]);
  const [orderitem, setOrderItem] = useState<UserOrders | any>({});
  const [cur, setCur] = useState<number | 0>(0);
  const [loginModal, setLoginModal] = useState<boolean>(false);

  const moveDetailHandler = (id: number) => {
    const filtered = orderList.filter((el: any) => {
      return el.id === id;
    })[0];
    setOrderItem(filtered);
    setCur(1);
  };
  const listbackHandler = () => {
    setOrderItem("");
    setCur(0);
  };

  const moveAdminPageHandler = () => {
    dispatch(AdminStoreGetData()).then((res: any) => {
      if (res.payload.message === "ok") {
        history.push("/admin");
      }
    });
  };

  useEffect(() => {
    const request = Auth(true);
    if (request === undefined) {
      setLoginModal(true);
    }
  }, []);

  useEffect(() => {
    setCur(0);
    setOrderItem({});

    axios.get(`${END_POINTS}/users/userinfo`).then((res) => {
      const order = res.data.userdata.user_orders.map((el: any) => {
        const delivery_day = el.order.order_deliveries.map(
          (el: any) => el.delivery_day
        );
        const { delivery_term, delivery_time } = el.order.order_deliveries[0];

        const nextPayDay = getNextPayDay(el.order.createdAt);
        const today = getToday();

        if (el.order.state === "cancel") {
          if (new Date(nextPayDay) > new Date(today)) {
            el.order.state = "canceling";
          }
        }
        const {
          state,
          totalprice,
          order_menus,
          store,
          user_name,
          selected_address,
          selected_address_detail,
          selected_mobile,
          createdAt,
          id,
          delivery_detail,
          plus_money,
        } = el.order;
        const final = {
          id,
          state,
          user_name,
          totalprice,
          store,
          selected_address,
          selected_address_detail,
          selected_mobile,
          createdAt,
          delivery_detail,
          plusMoney: plus_money,
          delivery_time,
          delivery_term,
          delivery_day,
          menu: order_menus,
          nextPayDay,
        };
        return final;
      });
      setOrderList(order.reverse());
    });
  }, []);
  console.log("333", admin.id, user.position);
  return (
    <Container>
      <Title>프로필</Title>
      <Wrapper>
        <PageWrapper>
          <PageProfileBtnWrapper>
            <PageProfileWrapper>
              <PageContent>
                <h3>안녕하세요. {user.nickname}님</h3>
                <p>{user.email}</p>
                {user.mainAddress && user.mainAddressDetail ? (
                  <>
                    <p>{user.mainAddress}</p>
                    <p>{user.mainAddressDetail}</p>
                  </>
                ) : user.subAddress && user.subAddressDetail ? (
                  <>
                    <p>{user.subAddress}</p>
                    <p>{user.subAddressDetail}</p>
                  </>
                ) : (
                  <p>동네인증이 필요합니다.</p>
                )}
              </PageContent>
              <ButtonWrapper>
                {user.position === "1" || admin.id ? (
                  <button onClick={moveAdminPageHandler}>관리자 페이지</button>
                ) : (
                  <button>
                    <Link to="/post">가게 등록</Link>
                  </button>
                )}
                <button>
                  <Link to="/profile">프로필 수정</Link>
                </button>
              </ButtonWrapper>
            </PageProfileWrapper>
            <MypageUl>
              <MypageLi>구독관리</MypageLi>
            </MypageUl>
          </PageProfileBtnWrapper>

          {cur === 1 ? (
            <MyOrderDetail
              userNickname={user.nickname}
              orderitem={orderitem}
              listbackHandler={listbackHandler}
            />
          ) : (
            <MyOrderList
              orderList={orderList}
              moveDetailHandler={moveDetailHandler}
            />
          )}
        </PageWrapper>
      </Wrapper>

      {loginModal ? (
        <Signin
          modalOpen={loginModal}
          setModalOpen={setLoginModal}
          request={Auth(true) === undefined}
          url="/mypage"
        />
      ) : null}
    </Container>
  );
}

export default MyProfileWrapper;
