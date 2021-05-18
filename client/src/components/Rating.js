import { IconButton } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

import { makeStyles } from "@material-ui/core/styles";

import { URL } from "../utils";
import { axiosInterceptorInstance } from "../interceptors/axiosInterceptors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: `flex`,
    justifyContent: `space-evenly`,
    flexDirection: "column",
    width: "70vmax",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
  },
  star: {
    fill: "#d4af37",
  },
  questionOptions: {
    display: `flex`,
    justifyContent: `center`,
    flexDirection: "column",
  },
  questionOptionsInner: {
    display: `flex`,
    justifyContent: `center`,
  },
  optionButton: {
    textTransform: "none",
    margin: "0.8vh",
    width: "50%",
    flexGrow: 1,
    border: "3px red solid",
    "&:hover": {
      border: "3px red solid",
      background: "none",
      cursor: "auto",
    },
  },
  correctOption: {
    border: "3px green solid",
    "&:hover": {
      border: "3px green solid",
    },
  },
  largeIcon: {
    fontSize: "1.5em",
  },
}));

function Rating({
  question,
  setCurrentlyDisplayed,
  refetch,
  wasAnswerCorrect,
}) {
  const classes = useStyles();

  const [fullStars, setFullStars] = useState(0);
  const [remainingRatingTime, setRemainingRatingTime] = useState(5);
  const [progress, setProgress] = useState(100);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress <= 0 ? 100 : prevProgress - 2
      );
    }, 100);
    
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  
  useEffect(() => {
    setRemainingRatingTime(remainingRatingTime - 0.1);
    if (progress <= 0) {
      clearInterval(timerRef.current);
      console.log("Rating TIME'S UP!!");
      getNextQuestion();
    }
  }, [progress]);

  const getNextQuestion = async () => {
    await refetch();
    setCurrentlyDisplayed("question");
  };

  const handleStarHover = (event) => {
    const value = event.target.getAttribute("value");
    setFullStars(+value);
  };

  const handleStarClick = async (event) => {
    console.log(`${fullStars} stars`);
    const questionWithRating = {
      ...question,
      rating: fullStars,
    };
    console.log(questionWithRating);
    try {
      const response = await axiosInterceptorInstance({
        method: "POST",
        url: `${URL}/rate`,
        headers: { "Content-Type": "application/json" },
        data: questionWithRating,
      });
      console.log(response.data);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setCurrentlyDisplayed("question");
    }
  };

  let fiveStars = [];
  for (let i = 1; i <= 5; i++) {
    fiveStars.push(
      <IconButton
        onMouseEnter={handleStarHover}
        onClick={handleStarClick}
        value={i}
        key={`star-${i}`}
      >
        {i <= fullStars && (
          <StarIcon className={`${classes.star} ${classes.largeIcon}`} />
        )}
        {i > fullStars && (
          <StarOutlineIcon className={`${classes.star} ${classes.largeIcon}`} />
        )}
      </IconButton>
    );
  }

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel
        value={progress}
        remainingTime={remainingRatingTime}
      />
      <div className={classes.ratingContainer}>
        <div className={classes.ratingText}>
          <h1>Please rate the previous question</h1>
        </div>
        <div className={classes.stars}>{fiveStars}</div>
      </div>
      <div className={classes.prevQuestionContainer}>
        {wasAnswerCorrect ? <h2>Correct!</h2> : <h2>Incorrect!</h2>}
        {question && (
          <div className={classes.questionOptions}>
            <div className={classes.questionOptionsInner}>
              <Button
                disableRipple
                className={`${classes.optionButton} ${
                  question.answer === question.option1
                    ? classes.correctOption
                    : null
                }`}
                variant="outlined"
                color="primary"
              >
                {question.option1}
              </Button>
              <Button
                disableRipple
                className={`${classes.optionButton} ${
                  question.answer === question.option2
                    ? classes.correctOption
                    : null
                }`}
                variant="outlined"
                color="primary"
              >
                {question.option2}
              </Button>
            </div>

            <div className={classes.questionOptionsInner}>
              {question.option3 && (
                <Button
                  disableRipple
                  className={`${classes.optionButton} ${
                    question.answer === question.option3
                      ? classes.correctOption
                      : null
                  }`}
                  variant="outlined"
                  color="primary"
                >
                  {question.option3}
                </Button>
              )}
              {question.option4 && (
                <Button
                  disableRipple
                  className={`${classes.optionButton} ${
                    question.answer === question.option4
                      ? classes.correctOption
                      : null
                  }`}
                  variant="outlined"
                  color="primary"
                >
                  {question.option4}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rating;
