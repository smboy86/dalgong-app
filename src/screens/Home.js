import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  Pressable,
  FlatList,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Container = styled.View`
  /* justify-content: center; */
  flex: 1;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FlatListContainer = styled.View`
  width: 95%;
  margin-top: 20px;
  background-color: #fff;
`;

const OrderBox = styled.View`
  /* height: 300px; */
  flex-direction: row;
  background-color: #fff;
  border-bottom-width: 1px;
  border-color: #606060;
`;

const OrderLeft = styled.View`
  width: 4px;
  border: 3px solid ${() => (Math.round(Math.random()) ? '#F9CB47' : '#FF0000')};
`;

const OrderCenter = styled.View`
  width: 19%;
  justify-content: center;
  align-items: center;
`;

const OrderRight = styled.View`
  width: 79%;
  padding-left: 4px;
  padding-bottom: 12px;
`;

const OrderHeader = styled.View`
  flex-direction: row;
  padding-top: 10px;
`;

const HeaderTitle = styled.Text`
  padding-left: 12px;
  font-weight: 700;
`;

const OrderContent = styled.View`
  padding-left: 28px;
`;

const ContentText = styled.Text``;

const OrderBtnBox = styled.View`
  align-items: center;
  margin-left: -11%;
  padding: 20px 0;
`;

const OrderBtn = styled(Pressable)`
  padding: 10px 24px;
  border-radius: 8px;
  /* background-color: #92d9b8; */
  background-color: ${() =>
    Math.round(Math.random()) ? '#92d9b8' : '#FF8888'};
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      orderList: [],
    };
  }

  componentDidMount() {
    this.loadOrderList();
  }

  loadOrderList = async () => {
    await axios
      .get('https://randomuser.me/api/?results=10')
      .then((response) => {
        this.setState({
          isLoading: false,
          orderList: tempOrderList,
        });
      })
      .catch((error) => {
        console.log('error  ::: ', error);
      });
  };

  testAxios = async () => {
    await axios
      .get('https://randomuser.me/api/?results=10')
      .then((response) => {
        console.log('axios test ::: ', response);
      })
      .catch((error) => {
        console.log('error  ::: ', error);
      });
  };

  onRefresh = async () => {
    this.setState({isLoading: true});

    await this.loadOrderList();

    this.setState({isLoading: false});
  };

  orderBtn = () => {
    Alert.alert(null, '주문확인');
  };

  render() {
    return (
      <Container>
        <FlatListContainer>
          <FlatList
            data={this.state.orderList}
            keyExtractor={(item) => item.orderId}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this.onRefresh}
              />
            }
            renderItem={({item, index}) => {
              return (
                <OrderBox>
                  <OrderLeft />
                  <OrderCenter>
                    <Text>2020</Text>
                    <Text>07/17</Text>
                  </OrderCenter>
                  <OrderRight>
                    <OrderHeader>
                      <FontAwesome name="pencil" size={24} color="black" />
                      <HeaderTitle>주문번호</HeaderTitle>
                    </OrderHeader>
                    <OrderContent>
                      <ContentText>{item.orderTel}</ContentText>
                    </OrderContent>
                    <OrderHeader>
                      <MaterialIcons
                        name="mode-comment"
                        size={24}
                        color="black"
                      />
                      <HeaderTitle>메모</HeaderTitle>
                    </OrderHeader>
                    <OrderContent>
                      <ContentText>{item.memo}</ContentText>
                    </OrderContent>
                    <OrderHeader>
                      <MaterialIcons
                        name="restaurant-menu"
                        size={24}
                        color="black"
                      />
                      <HeaderTitle>주문 내역</HeaderTitle>
                    </OrderHeader>
                    <OrderContent>
                      <ContentText>{item.macaronList}</ContentText>
                    </OrderContent>
                    <OrderBtnBox>
                      <OrderBtn onPress={this.orderBtn}>
                        <Text>
                          {Math.round(Math.random())
                            ? '예약 대기'
                            : '주문 완료'}
                        </Text>
                      </OrderBtn>
                    </OrderBtnBox>
                  </OrderRight>
                </OrderBox>
              );
            }}
          />
        </FlatListContainer>
      </Container>
    );
  }
}

const tempOrderList = [
  {
    orderId: '1',
    orderTel: '010-7123-0816',
    memo: '마카롱 1개랑, 케이크크크크크크크크크크크크크크크크크크크1111111111',
    macaronList: '크림치즈 - 1 당근케이크4.0 - 1 쫀득브라우니3.0 - 1',
  },
  {
    orderId: '2',
    orderTel: '123',
    memo: '15분 뒤에 갈게요',
    macaronList: '초쿄마카롱 1개',
  },
  {
    orderId: '3',
    orderTel: '010-1111-2222',
    memo: '피어리점 오늘도 문 여나요??',
    macaronList: '크림치즈 - 1 당근케이크4.0 - 1 쫀득브라우니3.0 - 1',
  },
  {
    orderId: '4',
    orderTel: '010-1111-3333',
    memo: '',
    macaronList: '주문 없음',
  },
];

export default Home;
