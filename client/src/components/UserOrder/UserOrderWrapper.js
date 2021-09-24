import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  MenuWrapper,
  MenuItemWrapper,
  MenuItemDetail,
  OrderH3,
  SubscriptAndOrderInfoWrapper,
  MenuUl,
  ButtonWrapper,
} from "./StyledUserOrder";
import SubscriptionInfo from './SubscriptionInfo';
import OrderInfo from "./OrderInfo";
import { MiddleButton } from "../common/Button/Button";
import { addOrder } from '../../_actions/user_action';
import { Container, Wrapper, Title } from "../GlobalStyle";
import useInput from "../../utils/useInput";
import Modal from "../common/Modal/Modal";

function UserOrderWrapper() {
  const state = useSelector((state) => state);
  const menu = state.cart.menu;
  console.log(menu)
  const dispatch = useDispatch();
  const [mobileCheck, setMobileCheck] = useState(false);
  const mobileChecker = () => setMobileCheck((mobileCheck) => !mobileCheck);
  const [paymentCheck, setPaymentCheck] = useState(false);
  const paymentChecker = () => setPaymentCheck((paymentCheck) => !paymentCheck);

  const [orderMobile, setOrderMobile] = useState("");
  const [deliveryName, onChangeDeliveryName] = useInput('')

  const [openModal, setOpenModal]= useState(false)
  // console.log("orderMobile", orderMobile);
  // console.log("mobileCheck", mobileCheck);
  // console.log("paymentCheck", paymentCheck);
 
  const orderHander = useCallback(() => {
    console.log(orderMobile.length)
    console.log("orderMobile", orderMobile);
    console.log("mobileCheck", mobileCheck);
    console.log("paymentCheck", paymentCheck);

    if (!mobileCheck && orderMobile.length >= 11 && paymentCheck) {
      const selected_mobile = orderMobile;
      dispatch(addOrder(state.cart, selected_mobile, deliveryName))
        .then((res) => {
        if (res.payload.message === 'Your order has been completed') {
          setOpenModal(true);
        }
      }).catch((err)=> alert("err입니다", err))
    } else if (mobileCheck && paymentCheck) {
      const selected_mobile = state.user.mobile;
      dispatch(addOrder(state.cart, selected_mobile, deliveryName)).
        then((res) => {
        if (res.payload.message === 'Your order has been completed') {
          setOpenModal(true);
        }
      }).catch((err)=> alert("err입니다", err));
    } else {
      alert("erro3");
    }

    
  }, [paymentCheck, mobileCheck, orderMobile, state]);


const onChangeMobileHandler = useCallback((e) => {
  let mobileRegExp = /^[0-9\b -]{0,13}$/;
  if (mobileRegExp.test(e.target.value)) {
    setOrderMobile(e.target.value);
  }
}, []);

useEffect(() => {
  if (orderMobile.length === 10) {
    setOrderMobile(orderMobile.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
  }
  if (orderMobile.length === 13) {
    setOrderMobile(
      orderMobile.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
    );
  }
}, [orderMobile]);

  if (state === undefined) return null;
  return (
    <Container>
      <Title>주문 전 확인</Title>
      <div>
        <Wrapper>
          <OrderH3 primary>정기구독 상품 정보</OrderH3>
          <MenuWrapper>
            <MenuUl>
              <li>상품 정보</li>
              <li>수량</li>
              <li>가격</li>
            </MenuUl>
            {/* 사용설명 nav 느낌 */}
            {menu &&
              menu.map((item) => {
                return (
                  <MenuItemWrapper key={item.id}>
                    <img src={item.image} alt="" />
                    <MenuItemDetail>
                      <h5>{item.name}</h5>
                      <div>
                        <span>수량</span> {item.quantity} 개
                      </div>
                      <div>
                        <span>가격</span> {item.price} 원
                      </div>
                    </MenuItemDetail>
                  </MenuItemWrapper>
                );
              })}
          </MenuWrapper>
        </Wrapper>
        <SubscriptAndOrderInfoWrapper>
          <SubscriptionInfo />
          <OrderInfo
            onChangeMobileHandler={onChangeMobileHandler}
            setOrderMobile={setOrderMobile}
            orderMobile={orderMobile}
            mobileCheck={mobileCheck}
            paymentChecker={paymentChecker}
            mobileChecker={mobileChecker}
            onChangeDeliveryName={onChangeDeliveryName}
          />
        </SubscriptAndOrderInfoWrapper>

        <ButtonWrapper>
          <MiddleButton type="button" onClick={orderHander}>
            결제하기
          </MiddleButton>
          <MiddleButton>뒤로가기</MiddleButton>
        </ButtonWrapper>
      </div>
      {openModal ? <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitleText="주문 완료"
        modalText="주문이 완료되었습니다. 감사합니다."
        url="/"
        modalBtn="확인"
      />
      : null
      }
    </Container>
  );
}

export default UserOrderWrapper;
