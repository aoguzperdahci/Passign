import Paper from "@material-ui/core/Paper";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import logoFind from "../images/logoFind";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  record: {
    width: "100%",
    height: 80,
    position: "relative"
  },
  text: {
    color: "white",
    textDecoration: "none",
    display: "inline-block",
    position: "absolute",
    top: -10,
    paddingLeft: 20
  },
  fontSize: {
    opacity: 0.6,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3rem',
      top: 25
  },
  [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
      top: 35
  },
  },
  img: {
    width: 80,
    height: 80,
    display: "inline-block"
  }
}));

const FeedItem = ({ record }) => {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <Paper className={classes.paper}>
      <Link to={"/records/" + record.id} style={{ textDecoration: "none" }}>

        <div className={classes.record}>
          <img src={logoFind(record.website.toLowerCase())} alt={record.website} className={classes.img} />
          <h2 className={classes.text}>{record.website}</h2>
          <h2 className={[classes.fontSize, classes.text].join(" ")}>{record.username}</h2>
          {id == record.id && <span style={{ fontSize: 34, color: "#ffffff", right: 20, top: 25, position: "absolute" }} className="material-icons md-48">arrow_forward_ios</span>}
        </div>

      </Link>

    </Paper>
  );
};

export default FeedItem;