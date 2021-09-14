import { 
  SIGNUP ,
  SIGNIN , 
  SIGNOUT , 
  MYPAGE_USER ,
  DELETE_USER,ADD_MAIN_ADDRESS,ADD_SUB_ADDRESS } from './type'

// import axios from 'axios'
// axios.defaults.withCredentials = true

//!유저 signup post 요청
export const signUp = (userinfo) => {
  // const result = 
  // axios.post('https://uptodoor.cf\/users/signup',
  // userinfo)
  // .then((res)=>res.data처럼, 콘솔찍어확인하고 작성, 성공시 result payload 에 담기)
  // .catch((err)=>console.log('==userinfo 받아오기실패==',err))
  return {
    type : SIGNUP,
    payload : {userinfo} //응답받은 유저인포 reducer 전달
  }
}

//유저 signin post 요청
export const signIn = (userinfo) => {
  //axios코드 result

  return {
    type: SIGNIN,
    payload: {
      userinfo,
    },
  };
};

//유저 signout post 요청
export const signOut = (userinfo) => {
  return {
    type : SIGNOUT,
    payload : {
      userinfo
    }
  }
}
//마이페이지 patch 요청
export const mypageUser = (userinfo) => {
  return {
    type : MYPAGE_USER,
    payload : {
      userinfo
    }
  }
}
//회원탈퇴 delete 요청
export const deleteUser = (userinfo) => {
  return {
    type : DELETE_USER,
    payload : {
      userinfo
    }
  }
}

//main email 보내기
export const addMainAddress = (mainAddress, mainAddressDetail) => {
  const main = {
    mainAddress,
    mainAddressDetail,
  };
  console.log(main); 
  return {
    type: ADD_MAIN_ADDRESS,
    payload: {
      mainAddress,
      mainAddressDetail
    },
  };
};

export const addSubAddress = (subAddress, subAddressDetail) => {
  const sub = {
    subAddress,
    subAddressDetail,
  };
    console.log(sub)
  return {
    type: ADD_SUB_ADDRESS,
    payload: {
      subAddress,
      subAddressDetail
    },
  };
};