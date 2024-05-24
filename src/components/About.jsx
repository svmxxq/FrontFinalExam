import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/about.css'; // Импорт стилей

const styles = {
    introTextContainer: {
        marginBottom: '30px',
        textAlign: 'left',
        fontSize: '1.2em',
        fontWeight: 500,
        color: '#e0bd90',
    },
    introImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

function About(props) {
    const { header } = props;
    const [data, setData] = useState(null);

    const parseIntro = (text) => (
        <ReactMarkdown children={text} />
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(endpoints.about);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Можно установить состояние ошибки и вывести сообщение пользователю
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header title={header} />
            <div className="sectionContainer">
                <Container>
                    {data ? (
                        <Fade>
                            <Row>
                                <Col md={6} style={styles.introTextContainer}>
                                    {parseIntro(data.about)}
                                </Col>
                                <Col md={6} style={styles.introImageContainer}>
                                    <img src={data?.imageSource} alt="profile" className="profileImage" />
                                </Col>
                            </Row>
                        </Fade>
                    ) : <FallbackSpinner />}
                </Container>
            </div>
        </>
    );
}

About.propTypes = {
    header: PropTypes.string.isRequired,
};

export default About;
