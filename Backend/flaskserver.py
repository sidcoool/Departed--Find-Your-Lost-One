from flask import Flask, request, render_template, url_for, jsonify
from flask_cors import CORS
from scipy.spatial.distance import cosine
import extractFace
import calcScore
from keras import backend as K
import pymongo
from pymongo import MongoClient
from flask_pymongo import PyMongo
import urllib.request
from bson.binary import Binary
import pickle
import json
import base64


app = Flask(__name__)
CORS(app)
cluster = MongoClient("mongodb+srv://rishi:mongo@cluster0-3sil9.mongodb.net/test?retryWrites=true&w=majority")
app.config['MONGO_URI'] = "mongodb+srv://rishi:mongo@cluster0-3sil9.mongodb.net/test?retryWrites=true&w=majority"
mongo = PyMongo(app)

db = cluster.minor
testdb = cluster.test
colUser = db.user
cntr = db.counter
chnk = testdb.fs.chunks

def store_image(url, local_file_name):
  with urllib.request.urlopen(url) as resource:
    with open(local_file_name, 'wb') as f:
      f.write(resource.read())


@app.route('/')
def enter():
    return render_template('index.html')

mydict = {}


@app.route('/childInfo' , methods = ['POST'])
def submit_pic():
    if request.method == 'POST':

        name = request.form['name']
        age = request.form['age']
        city = request.form['city']
        gname = request.form['gname']
        email = request.form['email']
        f = request.files['childImage']

        image_string = base64.b64encode(f.read())
        image_string = image_string.decode('utf-8')
        
        curid = colUser.count_documents({}) + 1

        path = './static/' 
        imgURL = ""
        imgURL = "data:image/jpeg;base64," + image_string
        store_image(imgURL,path + f.filename)

        face = extractFace.extract_face_from_image(path + f.filename)
        score = calcScore.get_model_scores(face)

        ismatched = False
        curChildData = {"name" : name,
                        "age" : age,
                        "city" : city,
                        "gname" : gname, 
                        "email" : email,
                        "imgURL" : imgURL,
                        "db_img": f.filename,
                        "score" : Binary(pickle.dumps(score, protocol=2), subtype=128 ),
                        "isFound" : False}
        foundChildData = {}

        
        if(curid==1):
            colUser.insert_one(curChildData)
        else:
            for data in colUser.find():
                scoreArr = pickle.loads(data['score'])
                if cosine(score, scoreArr) <= 0.4:
                    ismatched = True
                    foundChildData = data
                    del foundChildData['_id']
                    del foundChildData['score']
                    break

        if(ismatched):
            curChildData["isFound"] = True
            colUser.insert_one(curChildData)
            colUser.update_one({"imgURL" : foundChildData["imgURL"]},
                               {"$set" : {"isFound" : True}})
        elif curid !=1 and ismatched == False:
            colUser.insert_one(curChildData)


        del curChildData['_id']
        del curChildData['score']

        K.clear_session()
        return jsonify({"curChild":curChildData, "foundChild": foundChildData})

@app.route('/findAll', methods = ['GET'])
def findAll():
    allChildrenData = colUser.find({})
    dataList = []
    for data in allChildrenData:
        del data['_id']
        del data['score']
        dataList.append(data)
        
    return jsonify(dataList)





# if __name__ == "__main__":
app.run(threaded = False) 

# cd ~/Face-Recognition && python flaskserver.py