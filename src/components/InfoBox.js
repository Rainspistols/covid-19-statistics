import React from 'react';
import './InfoBox.css';
// Material UI
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, total, casesType, type, ...props }) {
  return (
    <Card
      className={`infoBox ${type} ${casesType === type ? 'active' : null}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__lastday">{cases}</h2>
        <Typography className="infoBox__total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
