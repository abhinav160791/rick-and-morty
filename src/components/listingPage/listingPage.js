import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';

import Header from "../common/Header";

const ListingPage = () => {

    const [characters, setCharacters] = useState([])

    const CHARACTERS_LIST = gql`
    query getCharacter($page: Int) { characters(page:$page){
            results{
                name, id, status, species, type, gender, origin{name, type}, location{name, type}, image, created
            }
            info{
                count, pages
            }
        }
    }
`;

const { data, loading, error, refetch } = useQuery(CHARACTERS_LIST, {
    variables: { page: 1 }
});

useEffect(() => {
    if(data){
        let char = characters
        if(char.length){
            char.push(...data?.characters?.results)
            setCharacters(char)
        } else {
            setCharacters([...data?.characters?.results])
        }
    }
},[data])

const fetchData = (page) => {
    refetch({ page })
}

if(loading){
    return <div className="App">
    <header className="App-header">
      <div>Loading...</div>
    </header>
  </div>
}

if(error){
    return <p>Error loading the API: {error}</p>
}

return (
        <>
        <Header/>
        {characters.length && 
        <div className="listing_wrapper">
            <Container fluid>
            <InfiniteScroll
                    pageStart={1}
                    loadMore={fetchData}
                    hasMore={true}
                    loader={<Spinner animation="border" variant="danger" style={{margin:"0 auto"}} />}
                >
                <Row>
                    {characters.map(char => 
                        <Col key={char.name} sm={3} style={{ marginBottom: '1.7rem' }}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={char.image} />
                                <Card.Body>
                                <Card.Title>{char.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{char.gender}, {char.species}</Card.Subtitle>
                                <Link to={`/character/${char.id}`}>
                                    <Button variant="primary">More Details</Button>
                                </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )} 
                </Row>
                </InfiniteScroll>
            </Container>
        </div>}
        </>
    );
  }
  
  export default ListingPage;
  