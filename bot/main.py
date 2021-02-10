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
    def __init__(self, author: str, url: str, rt, fav, follow, comment, tweetDate, date):
        self.author = author
        self.url = url
        self.rt = rt
        self.fav = fav
        self.follow = follow
        self.comment = comment
        self.tweetDate = tweetDate
        self.date = date

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
            u'sourceTyoe': "twitter",
            u'twComment': contest.comment,
            u'twFav': contest.fav,
            u'twFollow': contest.follow,
            u'twRt': contest.rt,
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
            #print(doc.to_dict()["url"])
            if doc.to_dict()["url"] == url:
                return True
        return False

    def processRetweet(self, status):
        print("[RETWEET] URL: {}".format("https://twitter.com/" + status.retweeted_status.user.screen_name + "/status/" + status.retweeted_status.id_str))
        if self.checkDuplicateContest("https://twitter.com/" + status.retweeted_status.user.screen_name + "/status/" + status.retweeted_status.id_str) == True:
            print("Contest already processed exiting !");
            return
        try:
            contest, contestMax = searchArrayInText(CONTEST_WORDS, status.retweeted_status.full_text)
            if contest == 0:
                print("Not enough contest words exit")
                return
            rt, rtMax = searchArrayInText(RT_WORDS, status.retweeted_status.full_text)
            fav, favMax = searchArrayInText(FAV_WORDS, status.retweeted_status.full_text)
            follow, followMax = searchArrayInText(FOLLOW_WORDS, status.retweeted_status.full_text)
            comment, commentMax = searchArrayInText(COMMENT_WORDS, status.retweeted_status.full_text)
        except AttributeError:
            contest, contestMax = searchArrayInText(CONTEST_WORDS, status.retweeted_status.text)
            if contest == 0:
                print("Not enough contest words exit")
                return
            rt, rtMax = searchArrayInText(RT_WORDS, status.retweeted_status.text)
            fav, favMax = searchArrayInText(FAV_WORDS, status.retweeted_status.text)
            follow, followMax = searchArrayInText(FOLLOW_WORDS, status.retweeted_status.text)
            comment, commentMax = searchArrayInText(COMMENT_WORDS, status.retweeted_status.text)
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
                datetime.datetime.now()
            ))

    def processTweet(self, status):
        print("[TWEET] URL: {}".format("https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str))
        if self.checkDuplicateContest("https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str) == True:
            print("Contest already processed exiting !");
            return
        try:
            contest, contestMax = searchArrayInText(CONTEST_WORDS, status.extended_tweet.full_text)
            if contest == 0:
                print("Not enough contest words exit")
                return
            rt, rtMax = searchArrayInText(RT_WORDS, status.extended_tweet.full_text)
            fav, favMax = searchArrayInText(FAV_WORDS, status.extended_tweet.full_text)
            follow, followMax = searchArrayInText(FOLLOW_WORDS, status.extended_tweet.full_text)
            comment, commentMax = searchArrayInText(COMMENT_WORDS, status.extended_tweet.full_text)
        except AttributeError:
            contest, contestMax = searchArrayInText(CONTEST_WORDS, status.text)
            if contest == 0:
                print("Not enough contest words exit")
                return
            rt, rtMax = searchArrayInText(RT_WORDS, status.text)
            fav, favMax = searchArrayInText(FAV_WORDS, status.text)
            follow, followMax = searchArrayInText(FOLLOW_WORDS, status.text)
            comment, commentMax = searchArrayInText(COMMENT_WORDS, status.text)
        print("RT:{} RTMAX:{} FAV:{} FAVMAX:{} FOLLOW:{} FOLLOWMAX:{} COM:{} COMMAX:{}".format(rt, rtMax, fav, favMax, follow, followMax, comment, commentMax))
        if rt == 0 and fav == 0 and follow == 0 and comment == 0:
            print("Probably not a contest exit")
            return
        self.contestsToSend.append(
            Contest(
                status.user.screen_name,
                "https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str,
                [rt, rtMax],
                [fav, favMax],
                [follow, followMax],
                [comment, commentMax],
                status.created_at,
                datetime.datetime.now()
            ))

    def on_status(self, status):
        print("== New tweet at {} ==".format(datetime.datetime.now()))
        if hasattr(status, "retweeted_status"):
            self.processRetweet(status)
        else:
            self.processTweet(status)
        self.sendWaitingContests()
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

print("🤖 Looking for Bot Variables...")

checkEnv("BOT_TRACK")
checkEnv("BOT_CONTEST")
checkEnv("BOT_RT")
checkEnv("BOT_FAV")
checkEnv("BOT_FOLLOW")
checkEnv("BOT_COMMENT")
checkEnv("BOT_MIN_WAIT")
checkEnv("BOT_MAX_WAIT")

print("⏲️ Trying to log in...")

auth = tweepy.OAuthHandler(os.getenv("API_KEY"), os.getenv("API_SECRET"))
auth.set_access_token(os.getenv("ACCESS_TOKEN"), os.getenv("ACCESS_SECRET"))

api = tweepy.API(auth)

print("🔥 Loading firebase config...")

checkEnv("FIREBASE_CONFIG")

cred = credentials.Certificate(os.getenv("FIREBASE_CONFIG"))
firebase_admin.initialize_app(cred)

db = firestore.client()

contestBot = Bot(api)
Stream = tweepy.Stream(auth = api.auth, listener=contestBot)

CONTEST_WORDS = os.getenv("BOT_CONTEST").split(",")
RT_WORDS = os.getenv("BOT_RT").split(",")
FAV_WORDS = os.getenv("BOT_FAV").split(",")
FOLLOW_WORDS = os.getenv("BOT_FOLLOW").split(",")
COMMENT_WORDS = os.getenv("BOT_COMMENT").split(",")
MIN_WAIT = int(os.getenv("BOT_MIN_WAIT"))
MAX_WAIT = int(os.getenv("BOT_MAX_WAIT"))

print(CONTEST_WORDS, RT_WORDS, FAV_WORDS, FOLLOW_WORDS, COMMENT_WORDS)

print("All good starting to harvest contests 😃")

try:
    Stream.filter(track=os.getenv("BOT_TRACK").split(","), languages=["fr"])
except:
    print("Error happened relaunching")
    Stream.filter(track=os.getenv("BOT_TRACK").split(","), languages=["fr"])