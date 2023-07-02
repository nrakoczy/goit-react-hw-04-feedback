import { useState } from "react";
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics'
import Section from "./Section/Section";
import Notification from './Notification/Notification';


export default function App() {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

   const { good, neutral, bad } = feedbacks;

  const showFeedback = option => {
    setFeedbacks(prevState => ({
      ...prevState, [option]: prevState[option] + 1
    }));
  };

  function countTotalFeedback() {
    return good + neutral + bad;
  };
    
  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback) {
      return Math.round((good / countTotalFeedback()) * 100);
    }
    return 0;
  };
  
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Section title="Please leave feedback" >  
          <FeedbackOptions
            options={Object.keys(feedbacks)}
            onLeaveFeedback={showFeedback}
          />{' '}
          </Section>

        <Section title="Statistics" > 
          {countTotalFeedback() !== 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (<Notification message="There is no feedback"></Notification>)
          }
          </Section> 
      </div>
    );
  };
