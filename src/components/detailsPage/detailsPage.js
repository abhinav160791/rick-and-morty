import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import {Container, Row, Col, Image} from 'react-bootstrap'
import Header from "../common/Header";

const DetailsPage = () => {
  let params = useParams();
  const CHARACTER = gql`
  query { character(id:${params.characterId}){
    name, status, species, type, gender, origin{name, type}, location{name, type}, image, created
    }
  }
`;

const { data, loading, error } = useQuery(CHARACTER);

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
    <Container fluid>
      <Row>
        <Col>
          <div className="Image-Wrapper">
            <Image src={data.character.image}/>
          </div>
        </Col>
        <Col>
          <div className="App">
            <div className="App-header">
              <div>{data.character.name}</div>
              <div>{data.character.species}</div>
              <div>{data.character.gender}</div>
              <div>{data.character.origin.name}</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default DetailsPage;
