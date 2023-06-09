import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';
// import styled from 'styled-components';
// import { Context1 } from './../App.js';
import { useSelector, useDispatch } from 'react-redux';
import { toCart } from './../store.js';

// let YellowBtn = styled.button`
//   background: yellow;
// `;

function Detail(props) {
  // const { stock } = useContext(Context1);
  let { id } = useParams();
  const find = props.shoes.find(n => n.id == id);

  const [display, setDisplay] = useState(true);
  const [tab, setTab] = useState(0);
  const [fade, setFade] = useState('start');

  const dispatch = useDispatch();

  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem('watched'));
    // console.log(getItem);
    if (!getItem) {
      const set = new Set([find.id]);
      const arr = [...set];
      const items = JSON.stringify(arr);
      localStorage.setItem('watched', items);
    } else {
      const getItem = JSON.parse(localStorage.getItem('watched'));
      const set = new Set([...getItem]);
      set.add(find.id);
      const arr = [...set];
      const items = JSON.stringify(arr);
      localStorage.setItem('watched', items);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      setFade('start');
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 2000);
  }, []);
  return (
    <div className={`container ${fade}`}>
      {display === true ? (
        <div className='alert alert-warning'>2秒以内</div>
      ) : null}

      {/* <YellowBtn>button</YellowBtn> */}
      <div className='row'>
        <div className='col-md-6'>
          <img src={find.img} width='100%' />
        </div>
        <div className='col-md-6'>
          <Input></Input>
          <h4 className='pt-5'>{find.title}</h4>
          <p>{find.content}</p>
          <p>{find.price}</p>
          <button
            className='btn btn-danger'
            onClick={() => {
              dispatch(toCart(find));
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant='tabs' defaultActiveKey='link0'>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(0)} eventKey='link0'>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(1)} eventKey='link1'>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(2)} eventKey='link2'>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  // const { stock } = useContext(Context1);
  const stock = useSelector(state => state.stock);
  const [fade, setFade] = useState('start');
  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      setFade('start');
    };
  }, [tab]);
  return (
    <div className={`start ${fade}`}>
      {
        [
          <div>{stock[tab]}</div>,
          <div>{stock[tab]}</div>,
          <div>{stock[tab]}</div>,
        ][tab]
      }
    </div>
  );
  // if (tab == 0) {
  //   return <div>내용0</div>;
  // }
  // if (tab == 1) {
  //   return <div>내용1</div>;
  // }
  // if (tab == 2) {
  //   return <div>내용2</div>;
  // }
}

function Input() {
  let [check, setCheck] = useState(false);
  let [val, setVal] = useState('');
  useEffect(() => {
    if (isNaN(val) == true) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [val]);
  return (
    <>
      {check === true ? <p>数字</p> : null}
      <input
        type='text'
        style={{ width: '200px', height: '30px' }}
        value={val}
        onChange={e => {
          setVal(e.target.value);
        }}
      />
    </>
  );
}

export default Detail;
