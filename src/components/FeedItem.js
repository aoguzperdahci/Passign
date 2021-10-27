import Paper from "@material-ui/core/Paper";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core';

import adobeLogo from "../images/adobe.png";
import aliexpressLogo from "../images/aliexpress.png";
import amazonLogo from "../images/amazon.png";
import appstoreLogo from "../images/appstore.png";
import battlenetLogo from "../images/battlenet.png";
import beinconnectLogo from "../images/beinconnect.png";
import binanceLogo from "../images/binance.png";
import bitbucketLogo from "../images/bitbucket.png";
import blutvLogo from "../images/blutv.jpg";
import clubhouseLogo from "../images/clubhouse.png";
import deezerLogo from "../images/deezer.jpg";
import defaultLogo from "../images/default.png";
import discordLogo from "../images/discord.png";
import disneyLogo from "../images/disney.png";
import dropboxLogo from "../images/dropbox.png";
import ebayLogo from "../images/ebay.png";
import epicgamesLogo from "../images/epicgames.png";
import evernoteLogo from "../images/evernote.png";
import facebookLogo from "../images/facebook.png";
import githubLogo from "../images/github.png";
import gitlabLogo from "../images/gitlab.png";
import gittigidiyorLogo from "../images/gittigidiyor.jpg";
import gmailLogo from "../images/gmail.png";
import googleLogo from "../images/google.jpg";
import hboLogo from "../images/hbo.png";
import hepsiburadaLogo from "../images/hepsiburada.png";
import huluLogo from "../images/hulu.png";
import instagramLogo from "../images/instagram.png";
import linkedinLogo from "../images/linkedin.png";
import mediumLogo from "../images/medium.png";
import miLogo from "../images/mi.png";
import microsoftLogo from "../images/microsoft.png";
import mubiLogo from "../images/mubi.jpg";
import myspaceLogo from "../images/myspace.png";
import netfilixLogo from "../images/netfilix.jpg";
import nintendoLogo from "../images/nintendo.png";
import okLogo from "../images/ok.png";
import onedriveLogo from "../images/onedrive.png";
import originLogo from "../images/origin.png";
import outlookLogo from "../images/outlook.png";
import patreonLogo from "../images/patreon.png";
import paypalLogo from "../images/paypal.png";
import pinterestLogo from "../images/pinterest.png";
import puhutvLogo from "../images/puhutv.jpg";
import quoraLogo from "../images/quora.png";
import redditLogo from "../images/reddit.png";
import shazamLogo from "../images/shazam.png";
import skypeLogo from "../images/skype.png";
import slackLogo from "../images/slack.png";
import snapchatLogo from "../images/snapchat.png";
import soundcloudLogo from "../images/soundcloud.png";
import spotifyLogo from "../images/spotify.png";
import stackoverflowLogo from "../images/stackoverflow.png";
import steamLogo from "../images/steam.png";
import teamsLogo from "../images/teams.png";
import tiktokLogo from "../images/tiktok.png";
import tinderLogo from "../images/tinder.png";
import trelloLogo from "../images/trello.png";
import trendyolLogo from "../images/trendyol.jpg";
import tumblrLogo from "../images/tumblr.png";
import twitchLogo from "../images/twitch.png";
import twitterLogo from "../images/twitter.png";
import uberLogo from "../images/uber.png";
import uplayLogo from "../images/uplay.png";
import viberLogo from "../images/viber.png";
import vkLogo from "../images/vk.png";
import wifiLogo from "../images/wifi.png";
import xboxLogo from "../images/xbox.png";
import yahooLogo from "../images/yahoo.png";
import youtubeLogo from "../images/youtube.png";
import zoomLogo from "../images/zoom.png";

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
    if (record.website.includes("adobe")) {
      return adobeLogo;
    } else if (record.website.toLowerCase().includes("aliexpress")) {
      return aliexpressLogo;
    } else if (record.website.toLowerCase().includes("amazon")) {
      return amazonLogo;
    } else if (record.website.toLowerCase().includes("appstore")) {
      return appstoreLogo;
    } else if (record.website.toLowerCase().includes("battlenet")) {
      return battlenetLogo;
    } else if (record.website.toLowerCase().includes("beinconnect")) {
      return beinconnectLogo;
    } else if (record.website.toLowerCase().includes("binance")) {
      return binanceLogo;
    } else if (record.website.toLowerCase().includes("bitbucket")) {
      return bitbucketLogo;
    } else if (record.website.toLowerCase().includes("blutv")) {
      return blutvLogo;
    } else if (record.website.toLowerCase().includes("clubhouse")) {
      return clubhouseLogo;
    } else if (record.website.toLowerCase().includes("deezer")) {
      return deezerLogo;
    } else if (record.website.toLowerCase().includes("discord")) {
      return discordLogo;
    } else if (record.website.toLowerCase().includes("disney")) {
      return disneyLogo;
    } else if (record.website.toLowerCase().includes("dropbox")) {
      return dropboxLogo;
    } else if (record.website.toLowerCase().includes("ebay")) {
      return ebayLogo;
    } else if (record.website.toLowerCase().includes("epicgames")) {
      return epicgamesLogo;
    } else if (record.website.toLowerCase().includes("evernote")) {
      return evernoteLogo;
    } else if (record.website.toLowerCase().includes("facebook")) {
      return facebookLogo;
    } else if (record.website.toLowerCase().includes("github")) {
      return githubLogo;
    } else if (record.website.toLowerCase().includes("gitlab")) {
      return gitlabLogo;
    } else if (record.website.toLowerCase().includes("gittigidiyor")) {
      return gittigidiyorLogo;
    } else if (record.website.toLowerCase().includes("gmail")) {
      return gmailLogo;
    } else if (record.website.toLowerCase().includes("google")) {
      return googleLogo;
    } else if (record.website.toLowerCase().includes("hbo")) {
      return hboLogo;
    } else if (record.website.toLowerCase().includes("hepsiburada")) {
      return hepsiburadaLogo;
    } else if (record.website.toLowerCase().includes("hulu")) {
      return huluLogo;
    } else if (record.website.toLowerCase().includes("instagram")) {
      return instagramLogo;
    } else if (record.website.toLowerCase().includes("linkedin")) {
      return linkedinLogo;
    } else if (record.website.toLowerCase().includes("medium")) {
      return mediumLogo;
    } else if (record.website.toLowerCase().includes("microsoft")) {
      return microsoftLogo;
    } else if (record.website.toLowerCase().includes("myspace")) {
      return myspaceLogo;
    } else if (record.website.toLowerCase().includes("netfilix")) {
      return netfilixLogo;
    } else if (record.website.toLowerCase().includes("nintendo")) {
      return nintendoLogo;
    } else if (record.website.toLowerCase().includes("onedrive")) {
      return onedriveLogo;
    } else if (record.website.toLowerCase().includes("outlook")) {
      return outlookLogo;
    } else if (record.website.toLowerCase().includes("patreon")) {
      return patreonLogo;
    } else if (record.website.toLowerCase().includes("paypal")) {
      return paypalLogo;
    } else if (record.website.toLowerCase().includes("pinterest")) {
      return pinterestLogo;
    } else if (record.website.toLowerCase().includes("puhutv")) {
      return puhutvLogo;
    } else if (record.website.toLowerCase().includes("quora")) {
      return quoraLogo;
    } else if (record.website.toLowerCase().includes("reddit")) {
      return redditLogo;
    } else if (record.website.toLowerCase().includes("shazam")) {
      return shazamLogo;
    } else if (record.website.toLowerCase().includes("skype")) {
      return skypeLogo;
    } else if (record.website.toLowerCase().includes("slack")) {
      return slackLogo;
    } else if (record.website.toLowerCase().includes("snapchat")) {
      return snapchatLogo;
    } else if (record.website.toLowerCase().includes("soundcloud")) {
      return soundcloudLogo;
    } else if (record.website.toLowerCase().includes("spotify")) {
      return spotifyLogo;
    } else if (record.website.toLowerCase().includes("stackoverflow")) {
      return stackoverflowLogo;
    } else if (record.website.toLowerCase().includes("steam")) {
      return steamLogo;
    } else if (record.website.toLowerCase().includes("tiktok")) {
      return tiktokLogo;
    } else if (record.website.toLowerCase().includes("tinder")) {
      return tinderLogo;
    } else if (record.website.toLowerCase().includes("trello")) {
      return trelloLogo;
    } else if (record.website.toLowerCase().includes("trendyol")) {
      return trendyolLogo;
    } else if (record.website.toLowerCase().includes("tumblr")) {
      return tumblrLogo;
    } else if (record.website.toLowerCase().includes("twitch")) {
      return twitchLogo;
    } else if (record.website.toLowerCase().includes("twitter")) {
      return twitterLogo;
    } else if (record.website.toLowerCase().includes("viber")) {
      return viberLogo;
    } else if (record.website.toLowerCase().includes("yahoo")) {
      return yahooLogo;
    } else if (record.website.toLowerCase().includes("youtube")) {
      return youtubeLogo;
    } else if (record.website.toLowerCase().includes("zoom")) {
      return zoomLogo;
    } else if (record.website.toLowerCase().includes("xbox")) {
      return xboxLogo;
    } else if (record.website.toLowerCase().includes("wifi")) {
      return wifiLogo;
    } else if (record.website.toLowerCase().includes("vk")) {
      return vkLogo;
    } else if (record.website.toLowerCase().includes("uplay")) {
      return uplayLogo;
    } else if (record.website.toLowerCase().includes("uber")) {
      return uberLogo;
    } else if (record.website.toLowerCase().includes("teams")) {
      return teamsLogo;
    } else if (record.website.toLowerCase().includes("origin")) {
      return originLogo;
    } else if (record.website.toLowerCase().includes("ok.ru")) {
      return okLogo;
    } else if (record.website.toLowerCase().includes("mubi")) {
      return mubiLogo;
    } else if (record.website.toLowerCase().includes("xiaomi")) {
      return miLogo;
    } else {
      return defaultLogo;
    }
  }

  return (
    <Paper className={classes.paper}>
      <Link to={"/records/" + record.id} style={{ textDecoration: "none" }}>

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