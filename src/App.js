import React, { useState } from 'react';
import './App.scss';
import SearchInput from './components/SearchInput/SearchInput';
import Modal from './components/Modal/Modal';
import logo from './images/giphy-logo-1.svg';
import { Col, Row, Spinner } from 'react-bootstrap';
import useGifSearch from './hooks/useGifSearch';
import InfiniteScroll from 'react-infinite-scroll-component';
import uuid from 'react-uuid';

function App() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [modalState, setModalState] = useState(false);
  const [gifLink, setGifLink] = useState('');

  // data from useGifSearch hook
  const { gifs, error, totalGifsCount } = useGifSearch(
    userSearchTerm,
    offset,
    data
  );

  // save user search input
  const userSearchInput = (string) => {
    setUserSearchTerm(string);
  };

  // load more gifs wwhen user scrolls to the bottom of the page
  const loadMoreGifs = () => {
    // if fetched gifs count is equal or greater than totalGifsCount (api) then return
    if (gifs.length >= totalGifsCount) {
      return;
    } else {
      setLoader(true);
      setTimeout(() => {
        setOffset((prevOffset) => {
          return prevOffset + 12;
        });
        setLoader(false);
      }, 1000);
    }
  };
  // show modal and set clicked gif link
  const showModal = (link) => {
    setModalState(true);
    setGifLink(link);
  };

  return (
    <div className="app">
      <Modal
        show={modalState}
        onHide={() => setModalState(false)}
        link={gifLink}
        keyword={userSearchTerm}
      />
      <div className="body">
        <header>
          <nav>
            <img src={logo} alt="logo" />
            <h1>GIPHY</h1>
          </nav>
          <SearchInput userSearchInput={userSearchInput} />
          <h2>{error ? error : userSearchTerm}</h2>
        </header>
        <div className="gifs__container">
          <InfiniteScroll
            dataLength={gifs.length}
            next={loadMoreGifs}
            hasMore={true}
            loader={
              loader && (
                <Spinner animation="border" role="status" variant="light">
                  <span className="sr-only" style={{ color: '#fff' }}>
                    Loading...
                  </span>
                </Spinner>
              )
            }
            style={{
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Row>
              {gifs &&
                gifs.map((gif, index) => {
                  return (
                    <Col lg="3" sm="2" className="gif__column" key={uuid()}>
                      <img
                        src={gif}
                        alt="gif"
                        onClick={() => showModal(gif.images.original.url)}
                      />
                    </Col>
                  );
                })}
            </Row>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default App;
