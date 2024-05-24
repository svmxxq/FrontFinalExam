import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import Fade from 'react-reveal/Fade'; // Добавляем импорт анимации

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#333',
  },
  cardContainer: {
    marginBottom: '20px',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardText: {
    textAlign: 'center',
    marginTop: '10px',
  },
};

function Skills({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((res) => {
          console.log('Data fetched:', res);
          setData(res);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
        });
  }, []);

  const renderSkillsIntro = (intro) => (
      <h4 style={styles.introTextContainer}>
        <ReactMarkdown children={intro} />
      </h4>
  );

  return (
      <>
        <Header title={header} />
        <Fade> {/* Обертка для анимации */}
          <div className="section-content-container">
            <Container>
              {data ? (
                  <>
                    {renderSkillsIntro(data.intro)}
                    <Row>
                      {data.skills?.map((rows) =>
                          rows.items.map((item) => (
                              <Col md={4} key={item.title} style={styles.cardContainer}>
                                <Card>
                                  <Card.Body style={styles.cardBody}>
                                    <Card.Title style={styles.cardTitle}>{rows.title}</Card.Title>
                                    <img
                                        style={styles.iconStyle}
                                        src={item.icon}
                                        alt={item.title}
                                    />
                                    <p style={styles.cardText}>{item.title}</p>
                                  </Card.Body>
                                </Card>
                              </Col>
                          ))
                      )}
                    </Row>
                  </>
              ) : (
                  <FallbackSpinner />
              )}
            </Container>
          </div>
        </Fade>
      </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
