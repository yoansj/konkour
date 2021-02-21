# System modules
import os
import time
import datetime
import random

# Dependencies
import tweepy
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

class Contest():
    def __init__(self, author: str, url: str, rt, fav, follow, comment, tweetDate, date, text):
        self.author = author
        self.url = url
        self.rt = rt
        self.fav = fav
        self.follow = follow
        self.comment = comment
        self.tweetDate = tweetDate
        self.date = date
        self.text = text

class Bot(tweepy.StreamListener):
    """This class is used as a StreamListener to stream tweets
    """

    def __init__(self, api):
        self.contestsToSend = []
        self.api = api
        self.lastSend = None

    def sendContest(self, contest: Contest):
        db.collection(u'waiting-contests').document().set({
            u'author': contest.author,
            u'contestDate': contest.tweetDate,
            u'harvestDate': contest.date,
            u'url': contest.url,
            u'sourceType': "twitter",
            u'twComment': contest.comment,
            u'twFav': contest.fav,
            u'twFollow': contest.follow,
            u'twRt': contest.rt,
            u'originalText': contest.text,
        })

    def updateStatus(self, status: str, contest: Contest):
        if contest != None:
            status_ref.update({
                u'status': status,
                u'lastUpdate': firestore.SERVER_TIMESTAMP,
                u'contest': {
                    u'author': contest.author,
                    u'contestDate': contest.tweetDate,
                    u'harvestDate': contest.date,
                    u'url': contest.url,
                    u'sourceType': "twitter",
                    u'twComment': contest.comment,
                    u'twFav': contest.fav,
                    u'twFollow': contest.follow,
                    u'twRt': contest.rt,
                    u'originalText': contest.text,
                }
            })
        else:
            status_ref.update({
                u'status': status,
                u'lastUpdate': firestore.SERVER_TIMESTAMP,
            })

    def sendWaitingContests(self):
        if self.lastSend == None and len(self.contestsToSend) >= 10:
            print("Sending contests...")
            for contest in self.contestsToSend:
                self.sendContest(contest)
            self.contestsToSend = []
            self.lastSend = datetime.datetime.now()
        else:
            if self.lastSend != None:
                minutes = (datetime.datetime.now() - self.lastSend).total_seconds() / 60
                if len(self.contestsToSend) >= 10 and minutes > 60:
                    print("Sending contests...")
                    for contest in self.contestsToSend:
                        self.sendContest(contest)
                    self.contestsToSend = []
                    self.lastSend = datetime.datetime.now()

    def checkDuplicateContest(self, url):
        print("Checking duplicates !")
        for contest in self.contestsToSend:
            if url == contest.url:
                return True
        for doc in db.collection(u'waiting-contests').stream():
            if doc.to_dict()["url"] == url:
                return True
        return False

    def processRetweet(self, status):
        print("[RETWEET] URL: {}".format("https://twitter.com/" + status.retweeted_status.user.screen_name + "/status/" + status.retweeted_status.id_str))
        if self.checkDuplicateContest("https://twitter.com/" + status.retweeted_status.user.screen_name + "/status/" + status.retweeted_status.id_str) == True:
            print("Contest already processed exiting !");
            return
        try:
            if searchArrayInText(BANWORDS, status.retweeted_status.full_text)[0] != 0:
                print("Banword found exit !")
                return
            contest, contestMax = searchArrayInText(CONTEST_WORDS, status.retweeted_status.full_text)
            if contest == 0:
                print("Not enough contest words exit")
                return
            rt, rtMax = searchArrayInText(RT_WORDS, status.retweeted_status.full_text)
            fav, favMax = searchArrayInText(FAV_WORDS, status.retweeted_status.full_text)
            follow, followMax = searchArrayInText(FOLLOW_WORDS, status.retweeted_status.full_text)
            comment, commentMax = searchArrayInText(COMMENT_WORDS, status.retweeted_status.full_text)
            text = status.retweeted_status.full_text
        except AttributeError:
            if searchArrayInText(BANWORDS, status.retweeted_status.text)[0] != 0:
                print("Banword found exit !")
                return
            contest, contestMax = searchArrayInText(CONTEST_WORDS, status.retweeted_status.text)
            if contest == 0:
                print("Not enough contest words exit")
                return
            rt, rtMax = searchArrayInText(RT_WORDS, status.retweeted_status.text)
            fav, favMax = searchArrayInText(FAV_WORDS, status.retweeted_status.text)
            follow, followMax = searchArrayInText(FOLLOW_WORDS, status.retweeted_status.text)
            comment, commentMax = searchArrayInText(COMMENT_WORDS, status.retweeted_status.text)
            text = status.retweeted_status.text
        print("RT:{} RTMAX:{} FAV:{} FAVMAX:{} FOLLOW:{} FOLLOWMAX:{} COM:{} COMMAX:{}".format(rt, rtMax, fav, favMax, follow, followMax, comment, commentMax))
        if rt == 0 and fav == 0 and follow == 0 and comment == 0:
            print("Probably not a contest exit")
            return
        self.contestsToSend.append(
            Contest(
                status.retweeted_status.user.screen_name,
                "https://twitter.com/" + status.retweeted_status.user.screen_name + "/status/" + status.retweeted_status.id_str,
                [rt, rtMax],
                [fav, favMax],
                [follow, followMax],
                [comment, commentMax],
                status.retweeted_status.created_at,
                datetime.datetime.now(),
                text
            ))

    def processTweet(self, status):
        print("[TWEET] URL: {}".format("https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str))
        if self.checkDuplicateContest("https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str) == True:
            print("Contest already processed exiting !");
            return
        try:
            if searchArrayInText(BANWORDS, status.extended_tweet.full_text)[0] != 0:
                print("Banword found exit !")
                return
            contest, contestMax = searchArrayInText(CONTEST_WORDS, status.extended_tweet.full_text)
            if contest == 0:
                print("Not enough contest words exit")
                return
            rt, rtMax = searchArrayInText(RT_WORDS, status.extended_tweet.full_text)
            fav, favMax = searchArrayInText(FAV_WORDS, status.extended_tweet.full_text)
            follow, followMax = searchArrayInText(FOLLOW_WORDS, status.extended_tweet.full_text)
            comment, commentMax = searchArrayInText(COMMENT_WORDS, status.extended_tweet.full_text)
            text = status.extended_tweet.full_text
        except AttributeError:
            if searchArrayInText(BANWORDS, status.text)[0] != 0:
                print("Banword found exit !")
                return
            contest, contestMax = searchArrayInText(CONTEST_WORDS, status.text)
            if contest == 0:
                print("Not enough contest words exit")
                return
            rt, rtMax = searchArrayInText(RT_WORDS, status.text)
            fav, favMax = searchArrayInText(FAV_WORDS, status.text)
            follow, followMax = searchArrayInText(FOLLOW_WORDS, status.text)
            comment, commentMax = searchArrayInText(COMMENT_WORDS, status.text)
            text = status.text
        print("RT:{} RTMAX:{} FAV:{} FAVMAX:{} FOLLOW:{} FOLLOWMAX:{} COM:{} COMMAX:{}".format(rt, rtMax, fav, favMax, follow, followMax, comment, commentMax))
        if rt == 0 and fav == 0 and follow == 0 and comment == 0:
            print("Probably not a contest exit")
            return
        self.updateStatus("tweet_processed", Contest(
                status.user.screen_name,
                "https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str,
                [rt, rtMax],
                [fav, favMax],
                [follow, followMax],
                [comment, commentMax],
                status.created_at,
                datetime.datetime.now(),
                text
            ))
        self.contestsToSend.append(
            Contest(
                status.user.screen_name,
                "https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str,
                [rt, rtMax],
                [fav, favMax],
                [follow, followMax],
                [comment, commentMax],
                status.created_at,
                datetime.datetime.now(),
                text
            ))

    def on_status(self, status):
        print("== New tweet at {} ==".format(datetime.datetime.now()))
        if hasattr(status, "retweeted_status"):
            self.processRetweet(status)
        else:
            self.processTweet(status)
        self.sendWaitingContests()
        self.updateStatus("sleep", None);
        time.sleep(random.randrange(MIN_WAIT, MAX_WAIT))

def checkEnv(variable):
    """This function is used to check for an environnment variable, exits program with code 42 if variable is not found

    Args:
        variable ([string]): [Name of the environnment variable to look for]
    """
    if os.getenv(variable) != None:
        print("✅ {} found !".format(variable))
    else:
        print("❎ {} not found !".format(variable))
        exit(42)

def searchArrayInText(array, text: str):
    """This function searches for arrays element in a string, it is mainly used to parse the tweet

    Args:
        array ([array]): [An array of strings]
        text ([string]): [Text to look into]

    Returns:
        [tuple]: [Returns a tuple with the number of words found and the length of the array]
    """
    foundWords = 0
    for elem in array:
        if text.lower().find(elem.lower()) != -1:
            foundWords = foundWords + 1
            #print("Found word: {}".format(elem))
    return foundWords, len(array)

print("🐦 Looking for Twitter Variables...")

checkEnv("API_KEY")
checkEnv("API_SECRET")
checkEnv("ACCESS_TOKEN")
checkEnv("ACCESS_SECRET")

print("🔥 Loading firebase config...")

checkEnv("FIREBASE_CONFIG")

cred = credentials.Certificate(os.getenv("FIREBASE_CONFIG"))
firebase_admin.initialize_app(cred)

db = firestore.client()

print("🤖 Looking for Bot Variables...")

config_ref = db.collection(u'bot').document(u'config')
status_ref = db.collection(u'bot').document(u'status')
config = config_ref.get()
config = config.to_dict()
print("[FIREBASE CONFIG]\n", config, "[FIREBASE CONFIG]")

CONTEST_WORDS = config["CONTEST"]
RT_WORDS = config["RT"]
FAV_WORDS = config["FAV"]
FOLLOW_WORDS = config["FOLLOW"]
COMMENT_WORDS = config["COMMENT"]
BANWORDS = config["BANWORDS"]
MIN_WAIT = config["MIN_WAIT"]
MAX_WAIT = config["MAX_WAIT"]
TRACK = config["TRACK"]

print("⏲️ Trying to log in to Twitter...")

auth = tweepy.OAuthHandler(os.getenv("API_KEY"), os.getenv("API_SECRET"))
auth.set_access_token(os.getenv("ACCESS_TOKEN"), os.getenv("ACCESS_SECRET"))

api = tweepy.API(auth)

contestBot = Bot(api)
Stream = tweepy.Stream(auth = api.auth, listener=contestBot)

print("All good starting to harvest contests 😃")
Bot.updateStatus(Bot, "boot", None)

try:
    Stream.filter(track=TRACK, languages=["fr"])
except:
    print("Error happened relaunching")
    Stream.filter(track=TRACK, languages=["fr"])