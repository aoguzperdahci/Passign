import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom"
import { makeStyles } from '@mui/styles';
import defaultLogo from "../images/default.png"
import facebookLogo from "../images/facebook.png"
import twitterLogo from "../images/twitter.png"
import twitchLogo from "../images/twitch.png"
import instagramLogo from "../images/instagram.png"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  record: {
    marginLeft: theme.spacing(2),
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
  img: {
    width: 80,
    height: 80,
    display: "inline-block"
  }
}));


const FeedItem = ({ record }) => {
  const classes = useStyles();
  const { id } = useParams();

  const imageSrc = () => {
    if (record.website.includes("facebook")) {
      return facebookLogo;
    } else if (record.website.includes("twitter")) {
      return twitterLogo;
    } else if (record.website.includes("twitch")) {
      return twitchLogo;
    } else if (record.website.includes("instagram")) {
      return instagramLogo;
    } else {
      return defaultLogo;
    }
  }

  return (
    <Paper className={classes.paper}>
      <Link to={"/passwords/" + record.id} style={{ textDecoration: "none" }}>

        <div className={classes.record}>
          <img src={imageSrc()} alt={record.website} className={classes.img} />
          <h2 className={classes.text}>{record.website}</h2>
          <h2 className={classes.text} style={{ opacity: 0.6, top: 25 }}>{record.username}</h2>
          {id == record.id && <span style={{ fontSize: 34, color: "#ffffff", right: 20, top: 25, position: "absolute" }} className="material-icons md-48">arrow_forward_ios</span>}
        </div>

      </Link>

    </Paper>
  );
};

export default FeedItem;