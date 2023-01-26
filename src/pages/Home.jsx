import React from 'react'
import Main from '../Components/Main'
import requests from '../Requests'
import Row from '../Components/Row'

const Home = () => {
  return (
    <>
        <Main/>
        <Row rowId="1" title="Popular" url={requests.requestPopular}/>
        <Row rowId="2" title="Top Rated" url={requests.requestTopRated}/>
        <Row rowId="3" title="Latest" url={requests.requestLatest}/>
        <Row rowId="4" title="Horror" url={requests.requestHorror}/>
        <Row rowId="5" title="Up Coming" url={requests.requestUpcoming}/>
    </>
  )
}

export default Home