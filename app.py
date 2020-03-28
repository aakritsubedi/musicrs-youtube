import os
from flask import Flask, render_template
from apiclient.discovery import build
from apiclient.errors import HttpError
from dotenv import load_dotenv

load_dotenv()

DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/youtube/id/<string:id>')
def youtubeData(id):
    youtube = build(YOUTUBE_API_SERVICE_NAME,
                    YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)
    request = youtube.videos().list(part="snippet", id= id)
    response = request.execute()
    return response


@app.route('/youtube/title/<string:title>')
def youtubeSearchList(title):
    youtube = build(YOUTUBE_API_SERVICE_NAME,
                    YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    request = youtube.search().list(q=title,
                                    type="video",
                                    pageToken=None,
                                    order="relevance",
                                    part="id,snippet",
                                    maxResults=5)

    response = request.execute()

    return response
