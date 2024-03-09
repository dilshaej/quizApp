import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { data } from '../Redux/data';

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const checkAns = (e, ans) => {
    if (!answerSelected) {
      setSelectedAnswer(ans);
      setAnswerSelected(true);

      const correctAnswerIndex = question.ans - 1;
      const clickedAnswerIndex = ans - 1;

      const listItems = e.target.parentElement.children;

      listItems[clickedAnswerIndex].style.backgroundColor =
        ans === question.ans ? 'green' : 'red';
      listItems[clickedAnswerIndex].style.color = 'white';

      listItems[correctAnswerIndex].style.backgroundColor = 'green';
      listItems[correctAnswerIndex].style.color = 'white';

      if (ans === question.ans) {
        setScore(score + 1);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
      }
    }
  };

  const handleNext = () => {
    const newIndex = index + 1;
    if (newIndex < data.length) {
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setSelectedAnswer(null);
      setAnswerSelected(false);

      const listItems = document.querySelectorAll('.list-group-item');
      listItems.forEach((item) => {
        item.style.backgroundColor = 'transparent';
        item.style.color = 'black';
      });
    } else {
      setShowScore(true);
    }
  };

  const handleReset = () => {
    setIndex(0);
    setScore(0);
    setQuestion(data[0]);
    setSelectedAnswer(null);
    setAnswerSelected(false);
    setShowScore(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
  };

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
        <div style={{ width: '600px' }} className='bg-dark p-5 rounded shadow'>
          <h1 style={{ textAlign: 'center', color: 'white' }}>Quiz App</h1>
          <div className='d-flex justify-content-center bg-light p-3 rounded shadow flex-column '>
            <div><h3>{index + 1}/{data.length}</h3></div>
            {showScore ? (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Your Score <br /> {score} / {data.length}</h2>
                <div className='d-flex justify-content-between'>
                  <h5>Correct Answers: {correctAnswers}</h5>
                  <h5>Incorrect Answers: {incorrectAnswers}</h5>
                </div>
                <button onClick={handleReset} className='btn btn-danger mt-3'>Reset</button>
              </div>
            ) : (
              <>
                <h4>{question.question}</h4>
                <ListGroup as='ol' numbered className='m-4 text-black'>
                  <ListGroup.Item
                    onClick={(e) => { checkAns(e, 1); }}
                    style={{
                      border: '2px solid black',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    className='mb-2'
                    as='li'
                  >
                    {question.option1}
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={(e) => { checkAns(e, 2); }}
                    style={{
                      border: '2px solid black',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    className='mb-2'
                    as='li'
                  >
                    {question.option2}
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={(e) => { checkAns(e, 3); }}
                    style={{
                      border: '2px solid black',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    className='mb-2'
                    as='li'
                  >
                    {question.option3}
                  </ListGroup.Item>
                  <ListGroup.Item
                    onClick={(e) => { checkAns(e, 4); }}
                    style={{
                      border: '2px solid black',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    className='mb-2'
                    as='li'
                  >
                    {question.option4}
                  </ListGroup.Item>
                </ListGroup>
                {selectedAnswer && (
                  <button onClick={handleNext} className='btn btn-primary w-25 mt-3'>Next</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
